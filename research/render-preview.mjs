// Renders the email to PNG with Playwright/Chromium.
// usage: node research/render-preview.mjs <file.html> <out.png> [width=640] [--offline-images]
// --offline-images: for sandboxes that cannot reach covered.ro / cdn.shopify.com. Product images are served from
// research/preview-images/ (cut-outs taken from earlier renders, see research/preview-crop.py) and the logo is
// drawn as text. With network access, leave the flag off and the real images load.
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require('/opt/node22/lib/node_modules/playwright'); }

const [file, out, w = '640'] = process.argv.slice(2).filter(a => !a.startsWith('--'));
const offline = process.argv.includes('--offline-images');
const dir = path.join(path.dirname(new URL(import.meta.url).pathname), 'preview-images');

const browser = await pw.chromium.launch();
const page = await browser.newPage({ viewport: { width: +w, height: 900 }, deviceScaleFactor: 1 });

let logo;
if (offline) {
  const lp = await browser.newPage();
  await lp.setContent(`<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,800&display=swap" rel="stylesheet"><span id="l" style="display:inline-block;padding:0 2px;font:800 46px/1 Archivo;font-stretch:112%;letter-spacing:-.04em;color:#F3F3EF">covered</span>`);
  await lp.waitForTimeout(1500);
  logo = await lp.locator('#l').screenshot({ omitBackground: true });
  await lp.close();
  await page.route(/cdn\.shopify\.com|covered\.ro\/cdn/, route => {
    const url = route.request().url();
    if (url.includes('covered_logo_white')) return route.fulfill({ contentType: 'image/png', body: logo });
    const name = decodeURIComponent(url.split('?')[0].split('/').pop());
    const f = path.join(dir, name);
    if (!fs.existsSync(f)) console.log('missing', name);
    return fs.existsSync(f) ? route.fulfill({ path: f, contentType: 'image/png' }) : route.abort();
  });
}
await page.goto('file://' + path.resolve(file));
await page.waitForTimeout(2500);
await page.screenshot({ path: out, fullPage: true });
const sw = await page.evaluate(() => document.documentElement.scrollWidth);
console.log(out, 'scrollWidth', sw);
await browser.close();
