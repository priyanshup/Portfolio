/**
 * scripts/a11y-audit.mjs
 *
 * Runs axe-core (WCAG 2.x A/AA + best practices) in a real headless browser
 * against the homepage, /work and two case studies, at desktop and mobile
 * widths, in BOTH the dark and the light theme (Lighthouse only tests one).
 * Exits non-zero if any rule is violated.
 *
 *   1. npm run dev            (or: npm run build && npm run preview)
 *   2. npm run a11y
 *
 * Env:  BASE_URL     default http://localhost:5173/Portfolio/
 *       CHROME_PATH  Chrome/Edge/Chromium binary (auto-detected otherwise)
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = process.env.BASE_URL || 'http://localhost:5173/Portfolio/';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const axeSrc = readFileSync(path.join(root, 'node_modules', 'axe-core', 'axe.min.js'), 'utf8');

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);
const browser = CANDIDATES.find((p) => existsSync(p));
if (!browser) {
  console.error('No Chrome/Edge/Chromium found. Set CHROME_PATH.');
  process.exit(2);
}

const port = 9333 + Math.floor(Math.random() * 500);
const prof = mkdtempSync(path.join(tmpdir(), 'a11y-'));
const proc = spawn(browser, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch { /* retry */ } await sleep(250); }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;

const ROUTES = [
  ['home', '#/'],
  ['work', '#/work'],
  ['case', '#/case-studies/vidaxl-ai-content-automation'],
  ['case-2', '#/case-studies/uhg-zero-downtime-migration'],
];
const RULES = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

await send('Page.enable');
let total = 0;
for (const width of [1280, 390]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: width < 600 ? 800 : 900, deviceScaleFactor: 1, mobile: width < 600 });
  for (const theme of ['dark', 'light']) {
    for (const [name, hash] of ROUTES) {
      await send('Page.navigate', { url: 'about:blank' }); await sleep(200);
      await send('Page.navigate', { url: BASE + hash }); await sleep(2200);
      await ev(`localStorage.setItem('theme','${theme}'); document.documentElement.classList.toggle('dark', '${theme}'==='dark'); document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in-view')); true`);
      await sleep(1300);
      await ev(axeSrc);
      const json = await ev(`axe.run(document, { runOnly: { type: 'tag', values: ${JSON.stringify(RULES)} } }).then(r => JSON.stringify(r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length, sample: v.nodes.slice(0, 3).map(n => n.target.join(' ') + ' :: ' + ((n.any[0] || n.all[0] || n.none[0] || {}).message || '').slice(0, 160)) }))))`);
      const violations = JSON.parse(json || '[]');
      total += violations.length;
      console.log(`${String(width).padEnd(5)}${theme.padEnd(6)}${name.padEnd(7)} ${violations.length ? 'FAIL' : 'ok  '} (${violations.length})`);
      for (const v of violations) {
        console.log(`     - ${v.id} (${v.impact}) x${v.n}`);
        for (const s of v.sample) console.log('         ' + s);
      }
    }
  }
}
console.log(total === 0 ? '\nAll pages pass in both themes.' : `\n${total} rule violation(s).`);
ws.close(); proc.kill();
process.exit(total === 0 ? 0 : 1);
