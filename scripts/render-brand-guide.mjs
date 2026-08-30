import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const source = path.join(root, 'brand', 'crm-from-within-brand-guide.html');
const output = path.join(root, 'output', 'pdf', 'crm-from-within-brand-guide.pdf');

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((candidate) => candidate && existsSync(candidate));

if (!chrome) throw new Error('Google Chrome or Chromium is required to render the brand guide.');

await fs.mkdir(path.dirname(output), { recursive: true });
const previousModified = await fs.stat(output).then((file) => file.mtimeMs).catch(() => 0);
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'crm-from-within-brand-guide-'));

const child = spawn(chrome, [
  '--headless',
  '--disable-background-networking',
  '--disable-gpu',
  '--disable-sync',
  '--no-first-run',
  '--no-pdf-header-footer',
  `--user-data-dir=${profile}`,
  `--print-to-pdf=${output}`,
  pathToFileURL(source).href,
], { stdio: ['ignore', 'ignore', 'pipe'] });

let errors = '';
child.stderr.on('data', (chunk) => { errors += String(chunk); });
const exited = new Promise((resolve) => child.once('exit', resolve));
const deadline = Date.now() + 20_000;
let rendered = false;

while (Date.now() < deadline) {
  const file = await fs.stat(output).catch(() => null);
  if (file && file.size > 10_000 && file.mtimeMs > previousModified) {
    rendered = true;
    break;
  }
  await new Promise((resolve) => setTimeout(resolve, 200));
}

if (child.exitCode === null) child.kill('SIGTERM');
await Promise.race([exited, new Promise((resolve) => setTimeout(resolve, 2_000))]);
await fs.rm(profile, { recursive: true, force: true });

if (!rendered) throw new Error(`Brand guide PDF was not created. ${errors.trim()}`);
console.log(output);
