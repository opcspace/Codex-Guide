import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const root = process.cwd();
const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const nav = JSON.parse(fs.readFileSync(path.join(root, 'nav.json'), 'utf8'));
const out = path.join(root, 'site');
const base = config.basePath.replace(/\/$/, '');

marked.use({ gfm: true, breaks: false });
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
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

function sidebar(current) {
  return nav.map(group => `<section class="nav-group"><p>${esc(group.label)}</p>${group.items.map(item =>
    `<a class="nav-link${item.path === current ? ' active' : ''}" href="${base}/${item.path}">${esc(item.title)}</a>`
  ).join('')}</section>`).join('');
}

function shell({title, description, body, current}) {
  return `<!doctype html>
<html lang="zh-CN" style="--accent:${config.accent};--accent-rgb:${config.accentRgb};--ink:${config.ink};--canvas:${config.canvas}">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)} · ${esc(config.title)}</title>
  <meta name="description" content="${esc(description || config.description)}"><meta name="theme-color" content="${config.canvas}">
  <link rel="stylesheet" href="${base}/assets/site.css">
  <script>window.__GUIDE__=${JSON.stringify({base, title:config.title})}</script>
  <script defer src="${base}/assets/site.js"></script>
</head>
<body>
  <div class="noise" aria-hidden="true"></div>
  <header class="topbar"><a class="brand" href="${base}/index.html"><span class="brand-mark">&gt;_</span><span>${esc(config.shortTitle)}</span></a><div class="top-actions"><button class="search-button" data-search-open><span>搜索知识库</span><kbd>⌘ K</kbd></button><a class="repo-link" href="${config.repo}">GitHub ↗</a><button class="menu-button" data-menu aria-label="打开目录">目录</button></div></header>
  <div class="layout"><aside class="sidebar" data-sidebar><div class="sidebar-intro"><span class="eyebrow">PRACTICE WIKI</span><strong>${esc(config.title)}</strong><small>更新于 ${esc(config.updated)}</small></div>${sidebar(current)}</aside>
  <main class="content"><article class="article">${body}</article><footer><span>${esc(config.footer)}</span><span>基于官方资料整理 · 非官方镜像</span></footer></main></div>
  <dialog class="search" data-search><form method="dialog"><button aria-label="关闭">×</button></form><label>SEARCH / 搜索<input data-search-input autocomplete="off" placeholder="输入关键词，例如 AGENTS.md、自动化、权限"></label><div class="search-results" data-search-results></div></dialog>
</body></html>`;
}

const pages = [];
for (const group of nav) for (const item of group.items) {
  const source = path.join(root, 'content', item.file);
  const [meta, markdown] = parseFrontmatter(fs.readFileSync(source, 'utf8'));
  const html = marked.parse(markdown);
  const target = path.join(out, item.path);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, shell({title: meta.title || item.title, description: meta.description, body: html, current: item.path}));
  pages.push({title: meta.title || item.title, section: group.label, url:`${base}/${item.path}`, text:strip(html).slice(0, 7000)});
}

fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
for (const file of ['site.css','site.js']) fs.copyFileSync(path.join(root, 'assets', file), path.join(out, 'assets', file));
fs.writeFileSync(path.join(out, 'search-index.json'), JSON.stringify(pages));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`Built ${pages.length} pages in ${path.relative(root, out)}/`);
