// Dev-only helper: verifies ClientRouter navigation resets the sepia bg
// and the other pages render in the light theme.
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto('http://localhost:4322/vi/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 800));

// scroll to the bottom so --page-bg goes full sepia
await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
await new Promise((r) => setTimeout(r, 600));
const sepiaBg = await page.evaluate(() =>
  getComputedStyle(document.body).backgroundColor
);

// navigate via the header link (goes through ClientRouter)
await Promise.all([
  page.click('a[href="/vi/projects"]'),
  page.waitForFunction(() => location.pathname.startsWith('/vi/projects')),
]);
await new Promise((r) => setTimeout(r, 1200));
const projectsBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
console.log('bg at homepage bottom:', sepiaBg, '→ bg on /vi/projects:', projectsBg);
await page.screenshot({ path: '/tmp/nav-projects.png' });

await page.goto('http://localhost:4322/vi/about/', { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 1000));
await page.screenshot({ path: '/tmp/nav-about.png' });

await page.goto('http://localhost:4322/vi/blog/seo-audit-ai-deterministic-checks-and-streaming/', {
  waitUntil: 'networkidle0',
});
await new Promise((r) => setTimeout(r, 800));
await page.screenshot({ path: '/tmp/nav-blogpost.png' });

await browser.close();
console.log('done');
