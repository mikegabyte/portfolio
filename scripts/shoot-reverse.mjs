// Dev-only: scroll down past the bell, then back up to the road,
// to verify the car U-turns and faces Da Nang on the way back.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:4322/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1500));

const height = await page.evaluate(() => document.body.scrollHeight);
const down = Math.round((height - 900) * 0.95);
const road = Math.round((height - 900) * 0.7);

// drive all the way down (smooth-ish steps)
for (let y = 0; y <= down; y += 150) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  await new Promise((r) => setTimeout(r, 40));
}
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: '/tmp/rev-parked.png' });

// now scroll back up to the road area
for (let y = down; y >= road; y -= 120) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  await new Promise((r) => setTimeout(r, 40));
}
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: '/tmp/rev-road.png' });

await browser.close();
console.log('done');
