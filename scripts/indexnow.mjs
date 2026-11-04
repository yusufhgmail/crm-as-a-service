// Tells Bing and Copilot (and other IndexNow engines) which pages changed, so
// new guides are picked up within days instead of weeks. Google ignores IndexNow.
//
//   INDEXNOW_KEY=... node scripts/indexnow.mjs            # every URL in the live sitemap
//   INDEXNOW_KEY=... node scripts/indexnow.mjs /en/crm-agency /en/guides
//
// The key must also be served at https://crmfromwithin.com/indexnow-key.txt
// (app/indexnow-key.txt/route.ts reads the same INDEXNOW_KEY var).

const SITE = 'https://crmfromwithin.com';
const key = process.env.INDEXNOW_KEY;
if (!key) { console.error('INDEXNOW_KEY is not set'); process.exit(1); }

const keyLocation = `${SITE}/indexnow-key.txt`;
const served = await fetch(keyLocation).then((r) => (r.ok ? r.text() : ''), () => '');
if (served.trim() !== key) { console.error(`${keyLocation} does not serve the key; deploy with INDEXNOW_KEY set first`); process.exit(1); }

let urls = process.argv.slice(2).map((p) => (p.startsWith('http') ? p : SITE + p));
if (urls.length === 0) {
  const xml = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const response = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'crmfromwithin.com', key, keyLocation, urlList: urls }),
});
console.log(`IndexNow: ${response.status} for ${urls.length} URL(s)`);
if (!response.ok) { console.error(await response.text()); process.exit(1); }
