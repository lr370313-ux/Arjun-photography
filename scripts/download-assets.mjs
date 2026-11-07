import { mkdir, writeFile } from 'node:fs/promises';
const images = {
  'hero-left': '1519741497674-611481863552',
  'hero-center': '1537633552985-df8429e8048b',
  'hero-right': '1597157639073-69284dc0fdaf',
  'wedding-1': '1537633552985-df8429e8048b',
  'wedding-2': '1511285560929-80b456fea0bc',
  'wedding-3': '1519741497674-611481863552',
  'wedding-4': '1597157639073-69284dc0fdaf',
  'couple-1': '1537633552985-df8429e8048b',
  'couple-2': '1516589178581-6cd7833ae3b2',
  'couple-3': '1511285560929-80b456fea0bc',
  'couple-4': '1597157639073-69284dc0fdaf',
  'portrait-1': '1524504388940-b1c1722653e1',
  'portrait-2': '1524250502761-1ac6f2e30d43',
  'detail-1': '1519225421980-715cb0215aed',
  'detail-2': '1478146896981-b80fe463b330'
};
await mkdir('public/images', { recursive: true });
await mkdir('public/fonts', { recursive: true });
const tasks = Object.entries(images).flatMap(([name, id]) => [480, 1200].map(width => async () => {
  const response = await fetch(`https://images.unsplash.com/photo-${id}?w=${width}&q=78&fm=webp&fit=crop`, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  await writeFile(`public/images/${name}${width === 480 ? '-small' : ''}.webp`, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${name} ${width}`);
}));
await Promise.all(Array.from({ length: 5 }, async () => { while (tasks.length) await tasks.shift()(); }));
for (const [style, filename] of [['normal', 'editorial'], ['italic', 'editorial-italic']]) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@${style === 'italic' ? 1 : 0},400&display=swap`, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)];
  if (!urls.length) throw new Error('Font URL missing');
  const font = await fetch(urls.at(-1)[1]);
  if (!font.ok) throw new Error('Font download failed');
  await writeFile(`public/fonts/${filename}.ttf`, Buffer.from(await font.arrayBuffer()));
}
