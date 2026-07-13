const guide = window.__GUIDE__;
const sidebar = document.querySelector('[data-sidebar]');
document.querySelector('[data-menu]')?.addEventListener('click', () => sidebar.classList.toggle('open'));
document.addEventListener('click', event => {
  if (sidebar?.classList.contains('open') && !sidebar.contains(event.target) && !event.target.closest('[data-menu]')) sidebar.classList.remove('open');
});

const dialog = document.querySelector('[data-search]');
const input = document.querySelector('[data-search-input]');
const results = document.querySelector('[data-search-results]');
let index;
async function openSearch() {
  dialog.showModal(); input.focus();
  index ||= await fetch(`${guide.base}/search-index.json`).then(r => r.json());
  render('');
}
function render(query) {
  if (!index) return;
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const found = index.map(page => {
    const haystack = `${page.title} ${page.section} ${page.text}`.toLowerCase();
    const score = terms.reduce((n, term) => n + (page.title.toLowerCase().includes(term) ? 5 : 0) + (haystack.includes(term) ? 1 : 0), 0);
    return {...page, score};
  }).filter(p => !terms.length || p.score >= terms.length).sort((a,b) => b.score-a.score).slice(0,8);
  results.innerHTML = found.map(p => `<a href="${p.url}"><small>${p.section}</small><strong>${p.title}</strong><span>${p.text.slice(0,110)}…</span></a>`).join('') || '<p class="empty">没有找到。换一个更短的关键词试试。</p>';
}
document.querySelector('[data-search-open]')?.addEventListener('click', openSearch);
input?.addEventListener('input', e => render(e.target.value));
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
  if (event.key === 'Escape' && dialog.open) dialog.close();
});

for (const pre of document.querySelectorAll('pre')) {
  const button = document.createElement('button'); button.className = 'copy'; button.textContent = 'COPY';
  button.addEventListener('click', async () => { await navigator.clipboard.writeText(pre.innerText); button.textContent='COPIED'; setTimeout(()=>button.textContent='COPY',1200); });
  pre.append(button);
}

const progress = document.querySelector('[data-progress]');
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = total > 0 ? `${Math.min(100, (window.scrollY / total) * 100)}%` : '0';
}
addEventListener('scroll', updateProgress, { passive: true });
addEventListener('resize', updateProgress);
updateProgress();

const tocLinks = [...document.querySelectorAll('.toc nav a')];
const headings = tocLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
if (headings.length) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    tocLinks.forEach(link => link.classList.toggle('current', link.hash === `#${visible.target.id}`));
  }, { rootMargin: '-15% 0px -70% 0px' });
  headings.forEach(heading => observer.observe(heading));
}

for (const anchor of document.querySelectorAll('.heading-anchor')) {
  anchor.addEventListener('click', async () => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(anchor.href);
    anchor.textContent = '✓';
    setTimeout(() => { anchor.textContent = '#'; }, 1000);
  });
}
