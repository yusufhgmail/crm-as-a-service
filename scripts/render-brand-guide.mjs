import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = process.cwd();
const source = path.join(root, 'brand', 'company-native-brand-guide.html');
const output = path.join(root, 'output', 'pdf', 'company-native-brand-guide.pdf');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 990 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(source).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: output, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();
console.log(output);
