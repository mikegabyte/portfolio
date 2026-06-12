// Dev-only helper: rings the front-desk bell and captures the receptionist
// stepping out to greet (click path; the car-crash path reuses the same code).
import puppeteer from 'puppeteer-core';

const url = process.argv[2] ?? 'http://localhost:4322/vi/';
const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1200));

// scroll the bell into view
await page.evaluate(() => {
  document.querySelector('[data-bell]')?.scrollIntoView({ block: 'center' });
});
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: '/tmp/bell-0-before.png' });

await page.evaluate(() => document.querySelector('[data-bell]')?.click());

// capture the greet as it plays out
for (const [i, ms] of [400, 900, 1600].entries()) {
  await new Promise((r) => setTimeout(r, i === 0 ? ms : ms - [0, 400, 900][i]));
  await page.screenshot({ path: `/tmp/bell-${i + 1}-t${ms}.png` });
}
await browser.close();
console.log('done');
