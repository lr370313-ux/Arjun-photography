import { writeFile } from 'node:fs/promises';
const assets = {
  'birthday-cake': '1464349095431-e9a21285b5f3',
  'birthday-balloons': '1530103862676-de8c9debad1d',
  'birthday-party': '1513151233558-d860c5398176',
  'baby-sleeping': '1519689680058-324335c77eba',
  'baby-portrait': '1522771930-78848d9293e8',
  'family-moment': '1492725764893-90b379c2b6e7',
  'event-table': '1511795409834-ef04bbd61622',
};
const tasks = Object.entries(assets).flatMap(([name,id]) => [480,1200].map(width => async () => {
  const response = await fetch(`https://images.unsplash.com/photo-${id}?w=${width}&q=78&fm=webp&fit=crop`, {signal: AbortSignal.timeout(45000)});
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  await writeFile(`public/images/${name}${width===480?'-small':''}.webp`, Buffer.from(await response.arrayBuffer()));
  console.log(`${name} ${width}`);
}));
await Promise.all(Array.from({length:4},async()=> {while(tasks.length) await tasks.shift()();}));
