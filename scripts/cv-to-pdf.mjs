// Convert LeMinhY_CV_2026.html → public/cv.pdf
// Usage: node scripts/cv-to-pdf.mjs   (run from portfolio/)
import puppeteer from 'puppeteer-core';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const htmlPath = resolve(__dir, '../cv/LeMinhY_CV_2026.html');
const outPath = resolve(__dir, '../public/cv.pdf');

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: 'new',
});

const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

await page.pdf({
  path: outPath,
  format: 'A4',
  printBackground: true,
});

await browser.close();
console.log(`✓ Saved → ${outPath}`);
