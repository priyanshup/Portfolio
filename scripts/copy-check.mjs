/**
 * scripts/copy-check.mjs
 *
 * Flags the most common AI-writing tells in the site's own prose, so the
 * voice doesn't drift back after the humanizer pass (see DESIGN.md, "Writing
 * voice"). It is deliberately small: it catches the mechanical tells, not
 * everything. A clean run doesn't mean the copy is good, and a hit is a
 * prompt to reread the sentence, not always an error.
 *
 *   npm run copy
 *
 * Checked: src/data (except testimonials.js, which is other people's words),
 * src/content, src/sections, src/pages, src/components, index.html.
 * Comment lines are skipped. Exit code 1 if anything is flagged.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_FILES = new Set(['testimonials.js']);
const DIRS = ['src/data', 'src/content', 'src/sections', 'src/pages', 'src/components'];
const EXTRA_FILES = ['index.html'];

const RULES = [
  { name: 'dash used as a connector', re: /[—–]/, hint: 'use a comma, colon, period or "to" (2 to 3)' },
  { name: 'stock AI vocabulary', re: /\b(delve|delving|tapestry|testament|pivotal|crucial|landscape|seamless(ly)?|robust|leverag(e|es|ed|ing)|showcas(e|es|ing)|underscor(e|es|ing)|foster(s|ing)?|garner(s|ed)?|vibrant|meticulous(ly)?|intricate|intricacies|enduring|interplay|holistic|synerg(y|ies)|cutting-edge|state-of-the-art|world-class|best-in-class|game-?chang(er|ing)|empower(s|ed|ing)?|elevat(e|es|ed|ing)|spearhead(ed|ing)?|passionate|unlock(s|ed|ing)?)\b/i, hint: 'say the plain thing' },
  { name: '"not just / not only / not merely"', re: /\bnot (just|only|merely)\b/i, hint: 'state the point directly' },
  { name: 'staged phrase', re: /\b(at its core|the real question|here'?s the thing|let'?s dive|in today'?s|how might we|it'?s worth noting|it is important to note)\b/i, hint: 'cut the run-up' },
  { name: 'chatbot residue', re: /\b(i hope this helps|great question|let me know if)\b/i, hint: 'remove' },
  { name: 'arrow used as decoration', re: /→/, hint: 'write it out ("3 weeks to 3 days")', onlyIn: ['src/data', 'src/content', 'index.html'] },
  { name: 'Title Case heading in a case study', re: /<H2>[A-Z][a-z]+( [A-Z][a-z]+){2,}<\/H2>/, hint: 'sentence case', onlyIn: ['src/content'] },
];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const files = [
  ...DIRS.flatMap((d) => walk(path.join(root, d))),
  ...EXTRA_FILES.map((f) => path.join(root, f)),
].filter((f) => /\.(jsx?|html)$/.test(f) && !SKIP_FILES.has(path.basename(f)));

const isComment = (line) => /^\s*(\/\/|\/\*|\*|\{\/\*|<!--)/.test(line);

let hits = 0;
for (const file of files) {
  const rel = path.relative(root, file).replaceAll('\\', '/');
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  let inBlock = false;
  let inHtmlComment = false;
  lines.forEach((line, i) => {
    if (inHtmlComment) { if (line.includes('-->')) inHtmlComment = false; return; }
    if (/<!--/.test(line) && !line.includes('-->')) { inHtmlComment = true; return; }
    if (inBlock) { if (line.includes('*/')) inBlock = false; return; }
    if (/^\s*\/\*/.test(line) && !line.includes('*/')) { inBlock = true; return; }
    if (isComment(line)) return;
    for (const rule of RULES) {
      if (rule.onlyIn && !rule.onlyIn.some((p) => rel.startsWith(p))) continue;
      const m = line.match(rule.re);
      if (m) {
        hits += 1;
        console.log(`${rel}:${i + 1}  ${rule.name}: "${m[0]}"  (${rule.hint})`);
      }
    }
  });
}

console.log(hits === 0 ? `Copy check: ${files.length} files, nothing flagged.` : `\nCopy check: ${hits} thing(s) flagged.`);
process.exit(hits === 0 ? 0 : 1);
