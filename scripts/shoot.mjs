// Dev-only helper: screenshots the homepage at several scroll depths
// so scroll-linked animations (timeline, bus, bg shift) can be verified.
import puppeteer from 'puppeteer-core';

const url = process.argv[2] ?? 'http://localhost:4322/vi/';
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1500));

const height = await page.evaluate(() => document.body.scrollHeight);
console.log('page height:', height);

const stops = [0, 0.22, 0.4, 0.55, 0.7, 0.85, 1];
for (let i = 0; i < stops.length; i++) {
  const y = Math.round((height - 900) * stops[i]);
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  // a few micro-scrolls so scroll-driven lerps (car heading) settle
  for (let k = 0; k < 12; k++) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y + (k % 2));
    await new Promise((r) => setTimeout(r, 60));
  }
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: `/tmp/shot-${i}-y${y}.png` });
}
await browser.close();
console.log('done');
