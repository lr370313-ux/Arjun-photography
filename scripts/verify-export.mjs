import { existsSync, readFileSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';
const html = readFileSync('out/index.html', 'utf8');
const assets = [...html.matchAll(/(?:src|href)="(\/[^"#?]+)[^"]*"/g)]
  .map(match => match[1]).filter(path => !path.startsWith('//'));
const missing = [...new Set(assets)].filter(path => !existsSync(`out${path}`));
assert.deepEqual(missing, [], 'Exported asset references must resolve');
const positions = ['home', 'about', 'our-work', 'weddings', 'pre-weddings', 'birthdays', 'engagements', 'maternity-baby', 'events', 'films', 'albums', 'portfolio', 'creative-process', 'testimonials', 'contact'].map(id => html.indexOf(`id="${id}"`));
assert.ok(positions.every((position, i) => position >= 0 && (i === 0 || position > positions[i - 1])), 'Collections must follow the requested order');
assert.ok(existsSync('out/robots.txt') && existsSync('out/sitemap.xml'), 'SEO routes must export');
assert.ok(!html.includes('http://localhost:'), 'Production metadata must not invent a localhost domain');
assert.ok(existsSync('out/contact/index.html'), 'Booking page must export');
assert.ok(existsSync('out/portfolio/index.html'), 'Full portfolio page must export');
const portfolioHtml = readFileSync('out/portfolio/index.html', 'utf8');
const portfolioAssets = [...portfolioHtml.matchAll(/(?:src|href)="(\/[^"#?]+)[^"]*"/g)].map(match => match[1]).filter(path => !path.startsWith('//'));
assert.deepEqual([...new Set(portfolioAssets)].filter(path => !existsSync(`out${path}`)), [], 'Full portfolio asset references must resolve');
const films = readFileSync('src/data/workVideos.ts', 'utf8');
for (const [, original, preview] of films.matchAll(/src: '([^']+)', preview: '([^']+)'/g)) {
  assert.ok(existsSync(`out${preview}`), `Lazy-loaded preview must export: ${preview}`);
  assert.ok(statSync(`out${preview}`).size < statSync(`out${original}`).size, 'Previews must be lighter than full-screen originals');
}
if (!process.env.NEXT_PUBLIC_BOOKING_PHONE) assert.ok(!html.includes('href="tel:'), 'Dummy phone contacts must stay inactive');
if (!process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) assert.ok(!html.includes('href="https://wa.me/'), 'Dummy WhatsApp contacts must stay inactive');
console.log('Static export verified: all local assets resolve, collections are in order, SEO files exist, and metadata contains no localhost URLs.');


