// Dev-only helper: scrolls in fine steps and records the car's translate
// position, then reports the sharpest heading change between steps — a
// smooth path should show no abrupt angle jumps mid-route.
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
const pts = [];
for (let i = 0; i <= 200; i++) {
  const y = Math.round(((height - 900) * i) / 200);
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y);
  await new Promise((r) => setTimeout(r, 25));
  const p = await page.evaluate(() => {
    const el = document.querySelector('[data-car]');
    const m = el?.style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/);
    return m ? [Number(m[1]), Number(m[2])] : null;
  });
  if (p) pts.push(p);
}
await browser.close();

// dedupe consecutive identical points, then measure heading changes
const path = pts.filter((p, i) => !i || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
let maxTurn = 0;
for (let i = 1; i < path.length - 1; i++) {
  const a1 = Math.atan2(path[i][1] - path[i - 1][1], path[i][0] - path[i - 1][0]);
  const a2 = Math.atan2(path[i + 1][1] - path[i][1], path[i + 1][0] - path[i][0]);
  let d = ((a2 - a1) * 180) / Math.PI;
  d = ((d + 540) % 360) - 180;
  if (Math.abs(d) > Math.abs(maxTurn)) maxTurn = d;
}
console.log('samples:', path.length);
console.log('max heading change between steps:', maxTurn.toFixed(1), 'deg');
console.log(path.map(([x, y]) => `${x},${y}`).join(' '));
