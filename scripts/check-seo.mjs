// Checks the SEO surface of a running copy of the site: every page, the
// sitemap, robots.txt and llms.txt must point at the canonical host and at
// URLs that answer 200. Catches a build that still carries another brand's
// domain, which is how the live site ended up canonicalised to companynative.com.
//
//   npm run check:seo                                # http://localhost:3030
//   npm run check:seo -- https://crmfromwithin.com   # the live site

const BASE = (process.argv[2] ?? process.env.SEO_BASE ?? 'http://localhost:3030').replace(/\/$/, '');
const SITE = 'https://crmfromwithin.com';

const PAGES = [
  { path: '/en', lang: 'en', alternates: { en: '/en', sv: '/se', 'x-default': '/en' } },
  { path: '/se', lang: 'sv', alternates: { en: '/en', sv: '/se', 'x-default': '/en' } },
  { path: '/en/privacy', lang: 'en', alternates: { en: '/en/privacy', sv: '/se/privacy', 'x-default': '/en/privacy' } },
  { path: '/se/privacy', lang: 'sv', alternates: { en: '/en/privacy', sv: '/se/privacy', 'x-default': '/en/privacy' } },
  // Guides: English only, so no hreflang; each carries an Article with dates.
  ...['custom-crm-development', 'custom-crm-cost', 'crm-agency', 'hubspot-alternative', 'crm-for-quickbooks', 'crm-for-distributors', 'crm-for-contractors', 'build-your-own-crm']
    .map((slug) => ({ path: `/en/${slug}`, lang: 'en', alternates: {}, article: true })),
];

// Earlier brands this codebase has carried. "CRM That Fits" is matched by case
// only, so the plain phrase "a CRM that fits" still passes.
const FOREIGN = /companynative|company native|CRM That Fits/i;
const isForeign = (text) => /companynative|company native/i.test(text) || /CRM That Fits/.test(text);

const failures = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

async function get(path, { redirect = 'manual' } = {}) {
  const url = path.startsWith('http') ? path.replace(SITE, BASE) : BASE + path;
  const response = await fetch(url, { redirect });
  return { status: response.status, location: response.headers.get('location'), text: await response.text() };
}

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
const meta = (html, key) => tags(html, 'meta').map((tag) => [attr(tag, 'name') ?? attr(tag, 'property'), attr(tag, 'content')]).filter(([k]) => k === key).map(([, v]) => v);
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

async function checkPage({ path, lang, alternates, article = false }) {
  const { status, text: html } = await get(path);
  if (status !== 200) return fail(path, `status ${status}`);

  const head = html.slice(0, html.indexOf('</head>'));
  if (isForeign(head)) fail(path, `head mentions another brand: ${head.match(FOREIGN)[0]}`);

  const htmlLang = attr(html.match(/<html\b[^>]*>/i)?.[0] ?? '', 'lang');
  if (htmlLang !== lang) fail(path, `<html lang="${htmlLang}">, expected "${lang}"`);

  const titles = [...head.matchAll(/<title>([^<]*)<\/title>/gi)].map((m) => decode(m[1]));
  if (titles.length !== 1) fail(path, `${titles.length} <title> tags`);
  else if (titles[0].length > 60) fail(path, `title is ${titles[0].length} chars (max 60): ${titles[0]}`);

  const descriptions = meta(head, 'description');
  if (descriptions.length !== 1) fail(path, `${descriptions.length} meta descriptions`);
  else if (decode(descriptions[0]).length > 160) fail(path, `description is ${decode(descriptions[0]).length} chars (max 160)`);

  const links = tags(head, 'link');
  const canonical = links.filter((t) => attr(t, 'rel') === 'canonical').map((t) => attr(t, 'href'));
  if (canonical.length !== 1 || canonical[0] !== SITE + path) fail(path, `canonical ${JSON.stringify(canonical)}, expected ${SITE + path}`);

  const hreflang = Object.fromEntries(links.filter((t) => attr(t, 'rel') === 'alternate' && attr(t, 'hreflang'))
    .map((t) => [attr(t, 'hreflang'), attr(t, 'href')]));
  const expected = Object.fromEntries(Object.entries(alternates).map(([k, v]) => [k, SITE + v]));
  if (JSON.stringify(hreflang, Object.keys(expected).sort()) !== JSON.stringify(expected, Object.keys(expected).sort())
    || Object.keys(hreflang).length !== Object.keys(expected).length) {
    fail(path, `hreflang ${JSON.stringify(hreflang)}, expected ${JSON.stringify(expected)}`);
  }

  for (const key of ['og:url', 'og:image', 'twitter:image']) {
    const values = meta(head, key);
    if (values.length !== 1) { fail(path, `${values.length} ${key}`); continue; }
    if (!values[0].startsWith(SITE + '/')) { fail(path, `${key} is off-site: ${values[0]}`); continue; }
    const asset = await get(values[0]);
    if (asset.status !== 200) fail(path, `${key} ${values[0]} answers ${asset.status}`);
  }
  if (meta(head, 'og:url')[0] && meta(head, 'og:url')[0] !== SITE + path) fail(path, `og:url ${meta(head, 'og:url')[0]}`);
  const ogLocale = meta(head, 'og:locale')[0];
  if (ogLocale !== (lang === 'sv' ? 'sv_SE' : 'en_US')) fail(path, `og:locale ${ogLocale}`);

  if (meta(head, 'robots').some((v) => /noindex/i.test(v))) fail(path, 'noindex');

  const h1s = html.match(/<h1\b/gi) ?? [];
  if (h1s.length !== 1) fail(path, `${h1s.length} <h1>`);

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (blocks.length === 0) fail(path, 'no JSON-LD');
  for (const [, json] of blocks) {
    let graph;
    try { graph = JSON.parse(json); } catch (error) { fail(path, `JSON-LD does not parse: ${error.message}`); continue; }
    const text = JSON.stringify(graph);
    if (isForeign(text)) fail(path, 'JSON-LD mentions another brand');
    for (const url of text.match(/https?:\/\/[^"\s]+/g) ?? []) {
      if (url.includes('crmfromwithin') && !url.startsWith(SITE)) fail(path, `JSON-LD has a non-canonical own URL: ${url}`);
    }
    const page = (graph['@graph'] ?? [graph]).find((node) => node['@type'] === 'WebPage');
    if (!page) fail(path, 'JSON-LD has no WebPage');
    else if (page.url !== SITE + path) fail(path, `WebPage.url ${page.url}`);
    if (article) {
      const node = (graph['@graph'] ?? [graph]).find((n) => n['@type'] === 'Article');
      if (!node) fail(path, 'JSON-LD has no Article');
      else {
        for (const key of ['headline', 'datePublished', 'dateModified', 'author', 'publisher']) if (!node[key]) fail(path, `Article has no ${key}`);
        if (node.dateModified && page?.dateModified && node.dateModified !== page.dateModified) fail(path, 'Article.dateModified differs from WebPage.dateModified');
      }
    }
  }
}

async function checkSitemap() {
  const { status, text } = await get('/sitemap.xml');
  if (status !== 200) return fail('/sitemap.xml', `status ${status}`);
  const locs = [...text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const want = PAGES.map((p) => SITE + p.path).sort();
  if (JSON.stringify([...locs].sort()) !== JSON.stringify(want)) fail('/sitemap.xml', `lists ${JSON.stringify(locs)}, expected ${JSON.stringify(want)}`);
  for (const loc of locs) {
    const page = await get(loc);
    if (page.status !== 200) fail('/sitemap.xml', `${loc} answers ${page.status}`);
  }
  if (/<changefreq>/.test(text)) fail('/sitemap.xml', 'changefreq is ignored by Google; drop it');
}

async function checkRobots() {
  const { status, text } = await get('/robots.txt');
  if (status !== 200) return fail('/robots.txt', `status ${status}`);
  const sitemaps = [...text.matchAll(/^sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (sitemaps.length !== 1 || sitemaps[0] !== `${SITE}/sitemap.xml`) fail('/robots.txt', `Sitemap lines ${JSON.stringify(sitemaps)}`);
  for (const bot of ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot']) {
    if (!new RegExp(`^user-agent:\\s*${bot}\\s*$`, 'im').test(text)) fail('/robots.txt', `does not name ${bot}`);
  }
}

async function checkLlms() {
  const { status, text } = await get('/llms.txt');
  if (status !== 200) return fail('/llms.txt', `status ${status}`);
  if (isForeign(text)) fail('/llms.txt', 'mentions another brand');
  for (const page of PAGES) {
    if (!text.includes(`(${SITE}${page.path})`)) fail('/llms.txt', `does not link ${page.path}`);
  }
}

async function checkRedirects() {
  const root = await get('/');
  if (![301, 308].includes(root.status) || !/\/en$/.test(root.location ?? '')) fail('/', `answers ${root.status} ${root.location ?? ''}, expected a permanent redirect to /en`);
  const slash = await get('/en/');
  if (![301, 308].includes(slash.status)) fail('/en/', `answers ${slash.status}, expected a permanent redirect`);
}

await Promise.all([...PAGES.map(checkPage), checkSitemap(), checkRobots(), checkLlms(), checkRedirects()]);

if (failures.length) {
  console.error(`SEO check against ${BASE}: ${failures.length} problem(s)\n`);
  for (const line of failures.sort()) console.error(`  ✗ ${line}`);
  process.exit(1);
}
console.log(`SEO check against ${BASE}: all good (${PAGES.length} pages, sitemap, robots.txt, llms.txt, redirects)`);
