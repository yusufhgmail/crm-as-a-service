import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const brand = path.join(root, 'brand');
const logos = path.join(brand, 'assets', 'logos');
const social = path.join(brand, 'assets', 'social');
const templates = path.join(brand, 'assets', 'templates');
const web = path.join(brand, 'assets', 'web');
const fonts = path.join(brand, 'assets', 'fonts');

const colors = {
  ink: '#102B2C',
  inkSoft: '#335151',
  deep: '#061A1B',
  paper: '#F4F1E9',
  cream: '#FBFAF6',
  mint: '#B9F6CA',
  mintStrong: '#78DF9A',
  coral: '#FF7048',
  line: '#D9DDD5',
  white: '#FFFFFF',
};

const fontPath = path.join(root, 'node_modules', 'next', 'dist', 'next-devtools', 'server', 'font', 'geist-latin.woff2');
const fontData = (await fs.readFile(fontPath)).toString('base64');

const fontStyle = `
  @font-face {
    font-family: 'Company Native Sans';
    src: url(data:font/woff2;base64,${fontData}) format('woff2');
    font-weight: 100 900;
  }
  .sans { font-family: 'Company Native Sans', Arial, Helvetica, sans-serif; }
  .serif { font-family: Georgia, 'Times New Roman', serif; }
`;

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function svg(width, height, body, title = 'Company Native', includeFont = true) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(title)}">
  ${includeFont ? `<defs><style>${fontStyle}</style></defs>` : ''}
  ${body}
</svg>`.replace(/^[ \t]+$/gm, '');
}

function coremark({ x = 0, y = 0, size = 96, frame = colors.ink, core = colors.coral } = {}) {
  const scale = size / 96;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path fill="${frame}" d="M52 14H38C24.745 14 14 24.745 14 38v20c0 13.255 10.745 24 24 24h14V68H38c-5.523 0-10-4.477-10-10V38c0-5.523 4.477-10 10-10h14V14Z"/>
    <rect x="48" y="35" width="34" height="26" rx="6" fill="${core}"/>
  </g>`;
}

function darkIcon(size = 1024) {
  const pad = size * 0.16;
  return svg(size, size, `
    <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${colors.ink}"/>
    ${coremark({ x: pad, y: pad, size: size - pad * 2, frame: colors.mint, core: colors.coral })}
  `, 'Company Native Coremark', false);
}

function markSvg(frame, core) {
  return svg(96, 96, coremark({ frame, core }), 'Company Native Coremark', false);
}

function lockupSvg({ reverse = false } = {}) {
  const frame = reverse ? colors.mint : colors.ink;
  const text = reverse ? colors.white : colors.ink;
  return svg(720, 120, `
    ${coremark({ x: 8, y: 8, size: 104, frame, core: colors.coral })}
    <text class="sans" x="136" y="77" fill="${text}" font-size="55" font-weight="720" letter-spacing="-2.4">Company Native</text>
  `, 'Company Native');
}

function wordmark(x, y, size, fill = colors.ink, markSize = 58) {
  return `${coremark({ x, y: y - markSize * 0.73, size: markSize, frame: fill, core: colors.coral })}
  <text class="sans" x="${x + markSize + 17}" y="${y}" fill="${fill}" font-size="${size}" font-weight="720" letter-spacing="${-size * 0.042}">Company Native</text>`;
}

function pill(x, y, text, { fill = colors.ink, textColor = colors.paper, width = 180 } = {}) {
  return `<rect x="${x}" y="${y}" width="${width}" height="34" rx="17" fill="${fill}"/>
  <text class="sans" x="${x + width / 2}" y="${y + 22}" fill="${textColor}" font-size="11" font-weight="700" letter-spacing=".5" text-anchor="middle">${escapeXml(text)}</text>`;
}

function systemMotif(x, y, scale = 1, dark = false) {
  const line = dark ? colors.mint : colors.ink;
  const faint = dark ? '#335151' : '#C8D0C8';
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M0 28H85c30 0 34 48 66 48h58" fill="none" stroke="${faint}" stroke-width="3" stroke-linecap="round"/>
    <path d="M0 76H151c32 0 33-48 66-48h55" fill="none" stroke="${line}" stroke-width="3" stroke-linecap="round"/>
    <path d="M0 124H87c30 0 34-48 66-48h119" fill="none" stroke="${colors.coral}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="0" cy="28" r="9" fill="${line}"/><circle cx="0" cy="76" r="9" fill="${colors.mintStrong}"/><rect x="-9" y="115" width="18" height="18" rx="5" fill="${colors.coral}"/>
    <circle cx="272" cy="28" r="9" fill="${line}"/><circle cx="272" cy="76" r="9" fill="${line}"/><circle cx="272" cy="124" r="9" fill="${line}"/>
  </g>`;
}

function ogCard() {
  return svg(1200, 630, `
    <rect width="1200" height="630" fill="${colors.paper}"/>
    <path d="M0 0h1200v630H0z" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <g opacity=".32">${Array.from({ length: 15 }, (_, i) => `<circle cx="${715 + (i % 5) * 92}" cy="${98 + Math.floor(i / 5) * 92}" r="2" fill="${colors.ink}"/>`).join('')}</g>
    ${wordmark(64, 92, 31, colors.ink, 48)}
    <text class="serif" x="64" y="237" fill="${colors.ink}" font-size="70" font-weight="500" letter-spacing="-3">
      <tspan x="64" dy="0">Software built around</tspan>
      <tspan x="64" dy="78">your company.</tspan>
    </text>
    <text class="sans" x="66" y="454" fill="${colors.inkSoft}" font-size="21" font-weight="500">Custom CRM - designed, built, migrated and improved end to end.</text>
    ${pill(66, 510, 'OWNED BY YOU', { width: 152 })}
    ${pill(230, 510, 'SAFE MIGRATION', { fill: colors.mint, textColor: colors.ink, width: 166 })}
    ${pill(408, 510, 'IMPROVES CONTINUOUSLY', { fill: colors.cream, textColor: colors.ink, width: 220 })}
    <g transform="translate(815 172)">
      <rect x="0" y="0" width="292" height="292" rx="67" fill="${colors.ink}"/>
      ${coremark({ x: 40, y: 40, size: 212, frame: colors.mint, core: colors.coral })}
    </g>
  `, 'Company Native social preview');
}

function squarePost(locale = 'en') {
  const swedish = locale === 'se';
  const lines = swedish
    ? ['Ert CRM ska', 'passa er', 'verksamhet.', 'Inte tvärtom.']
    : ['Your CRM should', 'fit your business.', 'Not the other', 'way around.'];
  return svg(1080, 1080, `
    <rect width="1080" height="1080" fill="${colors.paper}"/>
    <rect x="39" y="39" width="1002" height="1002" rx="12" fill="none" stroke="${colors.line}" stroke-width="2"/>
    ${wordmark(82, 119, 30, colors.ink, 48)}
    <text class="serif" x="82" y="318" fill="${colors.ink}" font-size="89" font-weight="500" letter-spacing="-4">
      ${lines.map((line, index) => `<tspan x="82" dy="${index === 0 ? 0 : 102}"${index >= 2 ? ` fill="${colors.coral}" font-style="italic"` : ''}>${escapeXml(line)}</tspan>`).join('')}
    </text>
    ${systemMotif(704, 716, .82)}
    <line x1="82" y1="952" x2="998" y2="952" stroke="${colors.line}" stroke-width="2"/>
    <text class="sans" x="82" y="998" fill="${colors.inkSoft}" font-size="20" font-weight="650">companynative.com/${swedish ? 'se' : 'en'}</text>
    <text class="sans" x="998" y="998" fill="${colors.inkSoft}" font-size="16" font-weight="700" letter-spacing="1.4" text-anchor="end">COMPANY-NATIVE CRM</text>
  `, `Company Native ${swedish ? 'Swedish' : 'English'} social post`);
}

function linkedinCover() {
  return svg(1128, 191, `
    <rect width="1128" height="191" fill="${colors.ink}"/>
    <g opacity=".22">${systemMotif(20, 28, .72, true)}</g>
    <text class="serif" x="386" y="86" fill="${colors.white}" font-size="40" font-weight="500" letter-spacing="-1.6">Software built around your company.</text>
    <text class="sans" x="389" y="124" fill="${colors.mint}" font-size="14" font-weight="650">Custom CRM - handled end to end - owned by you</text>
    ${coremark({ x: 1000, y: 48, size: 96, frame: colors.mint, core: colors.coral })}
  `, 'Company Native LinkedIn cover');
}

function xHeader() {
  return svg(1500, 500, `
    <rect width="1500" height="500" fill="${colors.paper}"/>
    <rect x="44" y="44" width="1412" height="412" rx="18" fill="none" stroke="${colors.line}" stroke-width="2"/>
    <g transform="translate(334 106)">
      <rect width="284" height="284" rx="64" fill="${colors.ink}"/>
      ${coremark({ x: 38, y: 38, size: 208, frame: colors.mint, core: colors.coral })}
    </g>
    <text class="serif" x="694" y="197" fill="${colors.ink}" font-size="63" font-weight="500" letter-spacing="-2.8">
      <tspan x="694" dy="0">Software built around</tspan><tspan x="694" dy="72">your company.</tspan>
    </text>
    <text class="sans" x="698" y="369" fill="${colors.inkSoft}" font-size="19" font-weight="600">CRM is the first system we rebuild.</text>
  `, 'Company Native X header');
}

function onePager(locale = 'en') {
  const swedish = locale === 'se';
  const copy = swedish ? {
    eyebrow: 'COMPANY-NATIVE CRM',
    headline: ['Ert CRM ska passa', 'er verksamhet.', 'Inte tvärtom.'],
    lead: ['Vi lär oss hur ert företag faktiskt arbetar, bygger det CRM ni behöver,', 'migrerar er data och fortsätter förbättra systemet - utan att störa teamet.'],
    proof: ['10+ år inom CRM och automation', '450+ svenska företag hjälpta genom FunnelBud'],
    pathTitle: 'EN TRYGG VÄG FRÅN IDAG TILL ER FULLA POTENTIAL',
    phases: [
      ['V0', 'Värde nu', 'En liten förbättring. Ingen migrering. Pengarna tillbaka om teamet inte använder den.'],
      ['V1', 'Allt ni behöver', 'Det ni har idag, fast enklare. Först 1-2 användare. Ingen flyttar till ett hopp.'],
      ['V2', 'Ett bättre arbetssätt', 'Ta bort arbete, automatisera mer och koppla ihop kundresan.'],
      ['NORDSTJÄRNAN', 'Er fulla potential', 'Ett system format av er strategi, ert varumärke och era värderingar.'],
    ],
    reasons: ['Vi gör hela jobbet', 'Ni äger all programvara', 'Egen hosting och modellval', 'Systemet fortsätter lära och förbättra'],
    cta: 'Börja med en konkret möjlighet utan migrering.',
    button: 'companynative.com/se',
  } : {
    eyebrow: 'COMPANY-NATIVE CRM',
    headline: ['Your CRM should fit', 'your business.', 'Not the other way around.'],
    lead: ['We learn how your company really works, build the CRM you need, migrate', 'your data and keep improving the system - without disrupting your team.'],
    proof: ['10+ years in CRM and automation', '450+ Swedish companies served through FunnelBud'],
    pathTitle: 'A SAFE PATH FROM TODAY TO YOUR FULL POTENTIAL',
    phases: [
      ['V0', 'Value now', 'One small improvement. No migration. Money back if your team does not use it.'],
      ['V1', 'Everything you rely on', 'What you have today, only easier. Start with 1-2 users. Never migrate to hope.'],
      ['V2', 'A better way to work', 'Remove work, automate more and connect the full customer journey.'],
      ['NORTH STAR', 'Your full potential', 'A system shaped by your strategy, brand and values.'],
    ],
    reasons: ['We handle everything', 'You own all the software', 'Your choice of hosting and models', 'The system keeps learning and improving'],
    cta: 'Start with one concrete opportunity before any migration.',
    button: 'companynative.com/en',
  };

  return svg(1240, 1754, `
    <rect width="1240" height="1754" fill="${colors.paper}"/>
    <rect x="44" y="44" width="1152" height="1666" rx="14" fill="none" stroke="${colors.line}" stroke-width="2"/>
    ${wordmark(86, 120, 31, colors.ink, 50)}
    <text class="sans" x="1152" y="116" fill="${colors.inkSoft}" font-size="13" font-weight="780" letter-spacing="2" text-anchor="end">${copy.eyebrow}</text>
    <text class="serif" x="86" y="318" fill="${colors.ink}" font-size="79" font-weight="500" letter-spacing="-3.5">
      ${copy.headline.map((line, i) => `<tspan x="86" dy="${i === 0 ? 0 : 88}"${i === 2 ? ` fill="${colors.coral}" font-style="italic"` : ''}>${escapeXml(line)}</tspan>`).join('')}
    </text>
    <text class="sans" x="88" y="600" fill="${colors.inkSoft}" font-size="23" font-weight="500">
      ${copy.lead.map((line, i) => `<tspan x="88" dy="${i === 0 ? 0 : 35}">${escapeXml(line)}</tspan>`).join('')}
    </text>
    <g transform="translate(88 696)">
      <rect width="1064" height="106" rx="12" fill="${colors.ink}"/>
      <text class="sans" x="36" y="45" fill="${colors.mint}" font-size="15" font-weight="760">${escapeXml(copy.proof[0])}</text>
      <text class="sans" x="36" y="74" fill="${colors.white}" font-size="16" font-weight="570">${escapeXml(copy.proof[1])}</text>
      ${coremark({ x: 950, y: 13, size: 80, frame: colors.mint, core: colors.coral })}
    </g>
    <text class="sans" x="88" y="880" fill="${colors.inkSoft}" font-size="13" font-weight="800" letter-spacing="2">${copy.pathTitle}</text>
    <g transform="translate(88 915)">
      ${copy.phases.map((phase, i) => {
        const x = i * 267;
        const highlight = i === 3;
        return `<g transform="translate(${x} 0)">
          <rect width="245" height="308" rx="12" fill="${highlight ? colors.ink : colors.cream}" stroke="${highlight ? colors.ink : colors.line}" stroke-width="2"/>
          <text class="sans" x="24" y="39" fill="${highlight ? colors.mint : colors.coral}" font-size="12" font-weight="820" letter-spacing="1.3">${escapeXml(phase[0])}</text>
          <text class="serif" x="24" y="92" fill="${highlight ? colors.white : colors.ink}" font-size="27" font-weight="500">
            ${wrapWords(phase[1], 15).map((line, j) => `<tspan x="24" dy="${j === 0 ? 0 : 31}">${escapeXml(line)}</tspan>`).join('')}
          </text>
          <text class="sans" x="24" y="169" fill="${highlight ? '#B9CBC7' : colors.inkSoft}" font-size="16" font-weight="500">
            ${wrapWords(phase[2], 25).map((line, j) => `<tspan x="24" dy="${j === 0 ? 0 : 24}">${escapeXml(line)}</tspan>`).join('')}
          </text>
        </g>`;
      }).join('')}
    </g>
    <g transform="translate(88 1285)">
      ${copy.reasons.map((reason, i) => {
        const x = (i % 2) * 530;
        const y = Math.floor(i / 2) * 62;
        return `<g transform="translate(${x} ${y})"><rect width="24" height="24" rx="6" fill="${colors.mint}"/><path d="M7 12l4 4 7-9" fill="none" stroke="${colors.ink}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><text class="sans" x="38" y="18" fill="${colors.ink}" font-size="17" font-weight="650">${escapeXml(reason)}</text></g>`;
      }).join('')}
    </g>
    <g transform="translate(88 1465)">
      <rect width="1064" height="160" rx="13" fill="${colors.mint}"/>
      <text class="serif" x="34" y="66" fill="${colors.ink}" font-size="34" font-weight="500">${escapeXml(copy.cta)}</text>
      <rect x="34" y="91" width="320" height="45" rx="7" fill="${colors.coral}"/>
      <text class="sans" x="194" y="120" fill="${colors.ink}" font-size="15" font-weight="780" text-anchor="middle">${copy.button}</text>
    </g>
    <text class="sans" x="88" y="1670" fill="${colors.inkSoft}" font-size="12" font-weight="600">Software built around your company.</text>
    <text class="sans" x="1152" y="1670" fill="${colors.inkSoft}" font-size="12" font-weight="600" text-anchor="end">Company Native</text>
  `, `Company Native one-pager ${locale.toUpperCase()}`);
}

function wrapWords(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines.slice(0, 6);
}

function documentCover(kind = 'assessment') {
  const proposal = kind === 'proposal';
  const title = proposal ? ['CRM transformation', 'proposal'] : ['Your CRM', 'opportunity assessment'];
  const label = proposal ? 'PREPARED FOR: [COMPANY]' : 'PREPARED FOR: [COMPANY]';
  const sub = proposal
    ? 'A safe path from one useful improvement to company-native software.'
    : 'The strongest small improvement, who it helps and why it belongs before migration.';
  return svg(1240, 1754, `
    <rect width="1240" height="1754" fill="${colors.paper}"/>
    <rect x="58" y="58" width="1124" height="1638" rx="16" fill="none" stroke="${colors.line}" stroke-width="2"/>
    ${wordmark(94, 137, 31, colors.ink, 50)}
    <text class="sans" x="1144" y="133" fill="${colors.inkSoft}" font-size="13" font-weight="780" letter-spacing="2" text-anchor="end">${proposal ? 'PROPOSAL' : 'ASSESSMENT'}</text>
    <text class="serif" x="94" y="500" fill="${colors.ink}" font-size="91" font-weight="500" letter-spacing="-4">
      <tspan x="94" dy="0">${title[0]}</tspan><tspan x="94" dy="104" fill="${colors.coral}" font-style="italic">${title[1]}</tspan>
    </text>
    <text class="sans" x="98" y="713" fill="${colors.inkSoft}" font-size="23" font-weight="500">${escapeXml(sub)}</text>
    <g transform="translate(98 970)"><rect width="1044" height="420" rx="20" fill="${colors.ink}"/>${coremark({ x: 728, y: 55, size: 310, frame: colors.mint, core: colors.coral })}
      <text class="sans" x="46" y="79" fill="${colors.mint}" font-size="14" font-weight="800" letter-spacing="1.8">${label}</text>
      <line x1="46" y1="118" x2="600" y2="118" stroke="#406260" stroke-width="2"/>
      <text class="sans" x="46" y="194" fill="${colors.white}" font-size="18" font-weight="620">DATE: [YYYY-MM-DD]</text>
      <text class="sans" x="46" y="239" fill="${colors.white}" font-size="18" font-weight="620">PREPARED BY: COMPANY NATIVE</text>
      <text class="sans" x="46" y="346" fill="#9FB7B3" font-size="15" font-weight="520">Confidential - for discussion with the named company</text>
    </g>
    <text class="sans" x="98" y="1608" fill="${colors.inkSoft}" font-size="15" font-weight="650">companynative.com</text>
    <text class="sans" x="1142" y="1608" fill="${colors.inkSoft}" font-size="15" font-weight="650" text-anchor="end">Software built around your company.</text>
  `, `Company Native ${kind} cover`);
}

function presentationCover() {
  return svg(1920, 1080, `
    <rect width="1920" height="1080" fill="${colors.ink}"/>
    ${wordmark(112, 128, 37, colors.white, 58)}
    <text class="sans" x="1808" y="126" fill="${colors.mint}" font-size="16" font-weight="780" letter-spacing="2" text-anchor="end">COMPANY-NATIVE CRM</text>
    <text class="serif" x="112" y="418" fill="${colors.white}" font-size="106" font-weight="500" letter-spacing="-5">
      <tspan x="112" dy="0">Your CRM should fit</tspan><tspan x="112" dy="118">your business.</tspan><tspan x="112" dy="118" fill="${colors.coral}" font-style="italic">Not the other way around.</tspan>
    </text>
    <text class="sans" x="117" y="862" fill="#B9CBC7" font-size="27" font-weight="520">Design, build, migration and continuous improvement - handled end to end.</text>
    ${coremark({ x: 1510, y: 708, size: 285, frame: colors.mint, core: colors.coral })}
  `, 'Company Native presentation cover');
}

const emailSignature = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Company Native email signature</title></head>
<body style="margin:24px;background:#fff;color:#102b2c;font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
    <tr>
      <td style="padding-right:16px;vertical-align:top">
        <img src="https://companynative.com/company-native-logo.png" width="58" height="58" alt="Company Native" style="display:block;border:0;border-radius:13px">
      </td>
      <td style="padding-left:16px;border-left:2px solid #b9f6ca;vertical-align:top">
        <div style="font-size:16px;font-weight:700;line-height:1.25;color:#102b2c">Yusuf Young</div>
        <div style="margin-top:3px;font-size:13px;line-height:1.35;color:#335151">Founder, Company Native</div>
        <div style="margin-top:9px;font-size:12px;line-height:1.4">
          <a href="https://companynative.com/en" style="color:#102b2c;text-decoration:none;font-weight:700">companynative.com</a>
          <span style="color:#a4b1ab"> &nbsp;|&nbsp; </span>
          <a href="https://www.linkedin.com/company/companynative/" style="color:#102b2c;text-decoration:none">LinkedIn</a>
        </div>
        <div style="margin-top:7px;font-size:11px;line-height:1.4;color:#687b77">Software built around your company.</div>
      </td>
    </tr>
  </table>
</body></html>`;

async function writeSvg(target, content) {
  await fs.writeFile(target, content);
}

async function writePng(target, content, width) {
  await sharp(Buffer.from(content)).resize({ width }).png().toFile(target);
}

async function exportPair(dir, stem, content, width) {
  await writeSvg(path.join(dir, `${stem}.svg`), content);
  await writePng(path.join(dir, `${stem}.png`), content, width);
}

for (const dir of [logos, social, templates, web, fonts]) await fs.mkdir(dir, { recursive: true });

await fs.copyFile(fontPath, path.join(fonts, 'geist-sans.woff2'));

await writeSvg(path.join(logos, 'company-native-mark-color.svg'), markSvg(colors.ink, colors.coral));
await writeSvg(path.join(logos, 'company-native-mark-reverse.svg'), markSvg(colors.mint, colors.coral));
await writeSvg(path.join(logos, 'company-native-mark-mono.svg'), markSvg('#000000', '#000000'));
await exportPair(logos, 'company-native-mark-dark-1024', darkIcon(1024), 1024);
await exportPair(logos, 'company-native-lockup-color', lockupSvg(), 1440);
await exportPair(logos, 'company-native-lockup-reverse', lockupSvg({ reverse: true }), 1440);

await writeSvg(path.join(web, 'favicon.svg'), darkIcon(512));
for (const size of [32, 180, 192, 512]) await writePng(path.join(web, `company-native-icon-${size}.png`), darkIcon(1024), size);

await exportPair(social, 'company-native-og-1200x630', ogCard(), 1200);
await exportPair(social, 'linkedin-avatar-400', darkIcon(800), 400);
await exportPair(social, 'linkedin-cover-1128x191', linkedinCover(), 1128);
await exportPair(social, 'x-avatar-400', darkIcon(800), 400);
await exportPair(social, 'x-header-1500x500', xHeader(), 1500);
await exportPair(social, 'launch-post-en-1080', squarePost('en'), 1080);
await exportPair(social, 'launch-post-se-1080', squarePost('se'), 1080);

await exportPair(templates, 'one-pager-en', onePager('en'), 1240);
await exportPair(templates, 'one-pager-se', onePager('se'), 1240);
await exportPair(templates, 'assessment-cover', documentCover('assessment'), 1240);
await exportPair(templates, 'proposal-cover', documentCover('proposal'), 1240);
await exportPair(templates, 'presentation-cover-1920x1080', presentationCover(), 1920);
await fs.writeFile(path.join(templates, 'email-signature.html'), emailSignature);

await fs.copyFile(path.join(web, 'favicon.svg'), path.join(root, 'public', 'company-native-logo.svg'));
await fs.copyFile(path.join(web, 'company-native-icon-512.png'), path.join(root, 'public', 'company-native-logo.png'));
await fs.copyFile(path.join(social, 'company-native-og-1200x630.png'), path.join(root, 'public', 'og-company-native.png'));
await fs.copyFile(path.join(social, 'company-native-og-1200x630.png'), path.join(root, 'public', 'og.png'));

console.log('Generated Company Native brand assets.');
