import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const nav = JSON.parse(fs.readFileSync(path.join(root, 'nav.json'), 'utf8'));
const missing = [];
const broken = [];
const validPaths = new Set(nav.flatMap(group => group.items.map(item => item.path)));
for (const group of nav) for (const item of group.items) {
  const source = path.join(root, 'content', item.file);
  if (!fs.existsSync(source)) { missing.push(item.file); continue; }
  const text = fs.readFileSync(source, 'utf8');
  const links = [...text.matchAll(/(?:\]\(|href=["'])([^"')]+\.html)(?:\)|["'])/g)].map(match => match[1]);
  for (const link of links) {
    const target = path.posix.normalize(path.posix.join(path.posix.dirname(item.path), link));
    if (!validPaths.has(target)) broken.push(`${item.file} -> ${link}`);
  }
}
if (missing.length) throw new Error(`Missing content files: ${missing.join(', ')}`);
if (broken.length) throw new Error(`Broken internal links: ${broken.join(', ')}`);
const sources = fs.readFileSync(path.join(root, 'content/reference/sources.md'), 'utf8');
if (!sources.includes('2026-07-13')) throw new Error('Source review date is missing');
console.log(`Checked ${nav.flatMap(g => g.items).length} content pages; internal links and source review date present.`);
