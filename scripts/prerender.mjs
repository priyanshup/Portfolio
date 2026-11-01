/**
 * scripts/prerender.mjs — last step of `npm run build`.
 *
 * Needs the client build (dist/) and the server bundle (dist-ssr/, from
 * `vite build --ssr src/entry-server.jsx`). For every page in
 * src/utils/pageMeta.js it writes dist/<path>/index.html with:
 *   - the page rendered to HTML inside #root (crawlers, AI tools, no-JS readers)
 *   - its own <title>, description, canonical, og:* and twitter:* tags
 *     (what LinkedIn/Slack/X show when the link is shared)
 * plus dist/404.html (GitHub Pages serves it for unknown paths; the app's
 * catch-all takes over), dist/sitemap.xml and dist/llms.txt, all generated
 * from the same data, so a new case study needs no edits here.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, allPageMeta, pageUrl, CONFIG, caseStudies } = ssr;

const template = readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html: no empty #root to fill');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Swap one attribute value on the tag whose name/property/rel is `key`. */
const setTag = (html, key, value) => {
  const re = new RegExp(`(<(?:meta|link)\\s+(?:name|property|rel)="${key}"\\s+(?:content|href)=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html is missing the ${key} tag`);
  return html.replace(re, `$1${esc(value)}$2`);
};

const page = (meta, body, extraHead = '') => {
  const url = pageUrl(meta.path);
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace('<div id="root"></div>', `<div id="root" data-prerendered>${body}</div>`);
  for (const [key, value] of [
    ['description', meta.description],
    ['og:title', meta.title],
    ['og:description', meta.description],
    ['og:url', url],
    ['twitter:title', meta.title],
    ['twitter:description', meta.description],
    ['twitter:url', url],
    ['canonical', url],
  ]) html = setTag(html, key, value);
  return extraHead ? html.replace('</head>', `${extraHead}\n  </head>`) : html;
};

/* The employer logos are large inline SVGs repeated per placement (~120 KB of
   the homepage). Readers of this HTML get the name from aria-label, and the
   live app draws the real logo, so keep only the empty <svg> shell. */
const lighten = (body) => body.replace(/(<svg\b[^>]*>)([\s\S]*?)(<\/svg>)/g, (m, open, inner, close) =>
  inner.length > 2000 ? open + close : m);

const pages = allPageMeta();
for (const meta of pages) {
  const html = page(meta, lighten(await render(meta.path)));
  const dir = path.join(dist, ...meta.path.split('/').filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`prerendered ${meta.path}`);
}

/* Unknown paths: GitHub Pages serves this with a 404 status; the app then
   shows the homepage (or "Case study not found"). Never indexed. */
const home = pages[0];
writeFileSync(
  path.join(dist, '404.html'),
  page(home, lighten(await render(home.path)), '    <meta name="robots" content="noindex" />'),
);

writeFileSync(
  path.join(dist, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((m) => `  <url><loc>${esc(pageUrl(m.path))}</loc></url>`).join('\n') +
  '\n</urlset>\n',
);

/* llms.txt (llmstxt.org): a plain summary with links, for AI tools */
const caseStudyMetas = pages.filter((m) => m.path.startsWith('/case-studies/'));
writeFileSync(
  path.join(dist, 'llms.txt'),
  [
    `# ${CONFIG.siteTitle.split(' | ')[0]}`,
    '',
    `> ${CONFIG.siteDescription}`,
    '',
    '## Pages',
    '',
    `- [Portfolio](${pageUrl('/')}): experience, selected work, recommendations and credentials`,
    `- [All work](${pageUrl('/work/')}): ${pages.find((m) => m.path === '/work/').description}`,
    '',
    '## Case studies',
    '',
    ...caseStudies.map((cs, i) => `- [${cs.title}](${pageUrl(caseStudyMetas[i].path)}): ${cs.summary}`),
    '',
    '## Elsewhere',
    '',
    `- [Resume (PDF)](${CONFIG.siteUrl}${CONFIG.resumeUrl})`,
    `- [LinkedIn](${CONFIG.social.linkedin})`,
    `- [GitHub](${CONFIG.social.github})`,
    '',
  ].join('\n'),
);

rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`wrote ${pages.length} pages, 404.html, sitemap.xml, llms.txt`);
