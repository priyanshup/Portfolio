/**
 * scripts/check-content.js
 *
 * Content rules the build can't see, checked by `npm run verify` (CI, predeploy):
 *   - every testimonial `highlight` is a verbatim substring of its `text`
 *     (recommendations are quoted, so a paraphrase is a misquote)
 *   - every published case study's `slug` has src/content/case-studies/<slug>/index.jsx
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { testimonials } from '../src/data/testimonials.js';
import { caseStudies } from '../src/data/work.js';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];

for (const t of testimonials) {
  if (t.highlight && !t.text.includes(t.highlight)) {
    problems.push(`testimonials.js: ${t.name}'s highlight is not a verbatim part of their text`);
  }
}

for (const cs of caseStudies) {
  if (!existsSync(path.join(rootDir, 'src', 'content', 'case-studies', cs.slug, 'index.jsx'))) {
    problems.push(`work.js: case study "${cs.slug}" has no src/content/case-studies/${cs.slug}/index.jsx`);
  }
}

if (problems.length) {
  console.error('\n✖ Content check failed:\n' + problems.map((p) => '  - ' + p).join('\n') + '\n');
  process.exit(1);
}
console.log(`✓ Content: ${testimonials.length} testimonial highlights verbatim, ${caseStudies.length} case studies have content`);
