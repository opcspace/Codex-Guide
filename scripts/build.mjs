import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const nav = JSON.parse(fs.readFileSync(path.join(root, 'nav.json'), 'utf8'));
const out = path.join(root, 'docs');
const base = config.basePath.replace(/\/$/, '');
const flatNav = nav.flatMap(group => group.items.map(item => ({ ...item, section: group.label })));

marked.use({ gfm: true, breaks: false });
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return [{}, raw];
  const end = raw.indexOf('\n---\n', 4);
  if (end < 0) return [{}, raw];
  const meta = {};
  for (const line of raw.slice(4, end).split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^['"]|['"]$/g, '');
  }
  return [meta, raw.slice(end + 5)];
}

function strip(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function withHeadingIds(html) {
  const used = new Map();
  const toc = [];
  const body = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
    const text = strip(inner);
    const seed = text.toLowerCase().replace(/[^\p{Letter}\p{Number}]+/gu, '-').replace(/^-|-$/g, '') || 'section';
    const count = used.get(seed) || 0;
    used.set(seed, count + 1);
    const id = count ? `${seed}-${count + 1}` : seed;
    toc.push({ level: Number(level), id, text });
    return `<h${level} id="${esc(id)}">${inner}<a class="heading-anchor" href="#${esc(id)}" aria-label="复制此章节链接">#</a></h${level}>`;
  });
  return { body, toc };
}

function sidebar(current) {
  return nav.map(group => `<section class="nav-group"><p>${esc(group.label)}</p>${group.items.map(item =>
    `<a class="nav-link${item.path === current ? ' active' : ''}" ${item.path === current ? 'aria-current="page"' : ''} href="${base}/${item.path}">${esc(item.title)}</a>`
  ).join('')}</section>`).join('');
}

function tocMarkup(toc) {
  if (!toc.length) return '';
  return `<aside class="toc" aria-label="页内目录"><p>ON THIS PAGE</p><nav>${toc.map(item =>
    `<a class="toc-level-${item.level}" href="#${esc(item.id)}">${esc(item.text)}</a>`
  ).join('')}</nav><a class="toc-top" href="#top">返回顶部 ↑</a></aside>`;
}

function pageNav(previous, next) {
  if (!previous && !next) return '';
  return `<nav class="page-nav" aria-label="文章导航">
    ${previous ? `<a class="previous" href="${base}/${previous.path}"><small>← 上一篇</small><strong>${esc(previous.title)}</strong></a>` : '<span></span>'}
    ${next ? `<a class="next" href="${base}/${next.path}"><small>下一篇 →</small><strong>${esc(next.title)}</strong></a>` : '<span></span>'}
  </nav>`;
}

function shell({ title, description, body, current, toc, section, readTime, previous, next }) {
  const canonical = `${config.siteUrl || ''}${current === 'index.html' ? '/' : `/${current}`}`;
  return `<!doctype html>
<html lang="zh-CN" style="--accent:${config.accent};--accent-rgb:${config.accentRgb};--ink:${config.ink};--canvas:${config.canvas}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)} · ${esc(config.title)}</title>
  <meta name="description" content="${esc(description || config.description)}"><meta name="theme-color" content="${config.canvas}">
  <meta property="og:title" content="${esc(title)} · ${esc(config.title)}"><meta property="og:description" content="${esc(description || config.description)}"><meta property="og:type" content="article">
  ${canonical ? `<link rel="canonical" href="${esc(canonical)}">` : ''}
  <link rel="stylesheet" href="${base}/assets/site.css"><link rel="stylesheet" href="${base}/assets/reading.css">
  <script>window.__GUIDE__=${JSON.stringify({ base, title: config.title })}</script>
  <script defer src="${base}/assets/site.js"></script>
</head>
<body id="top">
  <div class="reading-progress" data-progress aria-hidden="true"></div>
  <div class="noise" aria-hidden="true"></div>
  <header class="topbar"><a class="brand" href="${base}/index.html"><span class="brand-mark">&gt;_</span><span>${esc(config.shortTitle)}</span></a><div class="top-actions"><button class="search-button" data-search-open><span>搜索知识库</span><kbd>⌘ K</kbd></button><a class="repo-link" href="${config.repo}">GitHub ↗</a><button class="menu-button" data-menu aria-label="打开目录">目录</button></div></header>
  <div class="layout"><aside class="sidebar" data-sidebar><div class="sidebar-intro"><span class="eyebrow">PRACTICE WIKI</span><strong>${esc(config.title)}</strong><small>${flatNav.length} 篇指南 · 更新于 ${esc(config.updated)}</small></div>${sidebar(current)}</aside>
  <main class="content">
    <div class="page-meta"><span>${esc(section)}</span><i></i><span>约 ${readTime} 分钟</span><i></i><span>核查于 ${esc(config.updated)}</span></div>
    <article class="article">${body}</article>
    ${pageNav(previous, next)}
    <footer><span>${esc(config.footer)}</span><span>基于官方资料整理 · 非官方指南</span></footer>
  </main>
  ${tocMarkup(toc)}</div>
  <dialog class="search" data-search><form method="dialog"><button aria-label="关闭">×</button></form><label>SEARCH / 搜索<input data-search-input autocomplete="off" placeholder="输入关键词，快速定位实践"></label><div class="search-results" data-search-results></div></dialog>
</body></html>`;
}

const pages = [];
for (const [index, item] of flatNav.entries()) {
  const source = path.join(root, 'content', item.file);
  const [meta, markdown] = parseFrontmatter(fs.readFileSync(source, 'utf8'));
  const rendered = withHeadingIds(marked.parse(markdown));
  const target = path.join(out, item.path);
  const text = strip(rendered.body);
  const readTime = Math.max(2, Math.ceil(text.length / 500));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, shell({
    title: meta.title || item.title,
    description: meta.description,
    body: rendered.body,
    current: item.path,
    toc: rendered.toc,
    section: item.section,
    readTime,
    previous: flatNav[index - 1],
    next: flatNav[index + 1]
  }));
  pages.push({ title: meta.title || item.title, section: item.section, url: `${base}/${item.path}`, text: text.slice(0, 7000) });
}

fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
for (const file of ['site.css', 'reading.css', 'site.js']) fs.copyFileSync(path.join(root, 'assets', file), path.join(out, 'assets', file));
fs.writeFileSync(path.join(out, 'search-index.json'), JSON.stringify(pages));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`Built ${pages.length} pages in ${path.relative(root, out)}/`);
