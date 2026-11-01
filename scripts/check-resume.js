/**
 * scripts/check-resume.js
 *
 * Guards against the resume link silently 404ing in production.
 *
 * The Hero/Nav/Footer resume links are plain <a target="_blank"> tags
 * pointing at a static PDF — there's no way for client-side JS to detect
 * or gracefully recover from that file 404ing in a new tab (GitHub Pages
 * would serve the site's 404 page, which shows the homepage, so the visitor
 * gets no explanation and the resume never opens). The real fix is catching the mismatch
 * before it ships: this script verifies CONFIG.resumeUrl actually matches
 * a file in /public and fails the deploy loudly if it doesn't.
 *
 * Part of `npm run verify` (CI and predeploy) — see package.json.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { CONFIG } from '../src/config/index.js';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const resumePath = path.join(rootDir, '..', 'public', CONFIG.resumeUrl);

if (!existsSync(resumePath)) {
  console.error(
    `\n✖ Resume file not found: public/${CONFIG.resumeUrl}\n` +
    `  CONFIG.resumeUrl (src/config/index.js) doesn't match any file in /public.\n` +
    `  Fix the filename in /public, or update CONFIG.resumeUrl, before deploying.\n`
  );
  process.exit(1);
}

console.log(`✓ Resume file found: public/${CONFIG.resumeUrl}`);
