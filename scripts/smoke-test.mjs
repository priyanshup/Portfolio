/**
 * scripts/smoke-test.mjs
 *
 * End-to-end smoke test: drives a real (headless) Chromium-family browser over
 * the DevTools protocol against a RUNNING site and checks the behaviours that
 * matter — nav + scroll, accordion, recommendations, /work filter, case study
 * navigation, skip link, mobile menu, the phone layout (collapsed rows, tap
 * targets, nav that hides on scroll, scroll-to-top, "On this page" menu),
 * reduced motion, 12px text floor, and no console errors. No dependencies (uses Node's built-in fetch + WebSocket).
 *
 *   1. npm run dev            (or: npm run build && npm run preview)
 *   2. npm run smoke
 *
 * Env:  BASE_URL  default http://localhost:5173/Portfolio/
 *       CHROME_PATH  path to Chrome/Edge/Chromium (auto-detected on Windows/macOS/Linux)
 */
import { spawn } from 'node:child_process';
import { mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:5173/Portfolio/';

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
const prof = mkdtempSync(path.join(tmpdir(), 'edge-'));
const edge = spawn(browser, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break; } catch { /* retry */ } await sleep(250); }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const errors = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); }
  if (d.method === 'Runtime.exceptionThrown') errors.push('EXC ' + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text));
  if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.push('CONSOLE ' + d.params.args.map((a) => a.value || a.description).join(' ').slice(0, 300));
};
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;

const key = async (k, code, vk) => {
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: k, code, windowsVirtualKeyCode: vk });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk });
};

const results = [];
const check = (name, ok, extra = '') => { results.push(ok); console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? '  [' + extra + ']' : '')); };

await send('Runtime.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: BASE });
await sleep(2500);
await ev(`localStorage.setItem('theme','dark'); true`);

// 1. structure
check('home renders 6 sections', (await ev(`['about','work','experience','what-i-bring','recognition','currently'].every(i=>document.getElementById(i))`)) === true);
check('hero shows 3 proof points', (await ev(`document.querySelectorAll('#about ul[aria-label=Highlights] li').length`)) === 3);
check('exactly 3 featured work rows on home', (await ev(`document.querySelectorAll('#work a[href*="case-studies"].card-lift').length`)) === 3);

// 2. nav from home: scrolls, URL stays clean
await ev(`[...document.querySelectorAll('nav a')].find(a=>a.textContent.trim()==='Experience').click()`); await sleep(1600);
const y1 = await ev('window.scrollY');
check('nav link scrolls to Experience', y1 > 500, 'scrollY=' + Math.round(y1));
check('hash stays "#/" after nav click', (await ev('location.hash')) === '#/', await ev('location.hash'));
check('active nav link highlighted', (await ev(`[...new Set([...document.querySelectorAll('nav a[aria-current=true]')].map(a=>a.textContent.trim()))].join()`)) === 'Experience');

// 3. experience accordion: one open at a time
check('newest role expanded by default', (await ev(`document.querySelector('#role-btn-heineken').getAttribute('aria-expanded')`)) === 'true');
await ev(`document.querySelector('#role-btn-vidaxl').click()`); await sleep(700);
check('opening VidaXL collapses Heineken', (await ev(`document.querySelector('#role-btn-heineken').getAttribute('aria-expanded')`)) === 'false' && (await ev(`document.querySelector('#role-btn-vidaxl').getAttribute('aria-expanded')`)) === 'true');
check('collapsed panel is inert', (await ev(`document.querySelector('#role-panel-heineken .accordion-inner').inert`)) === true);

// 4. recognition
await ev(`document.getElementById('recognition').scrollIntoView()`); await sleep(500);
const cardHeights = `[...document.querySelectorAll('#recognition ul > li > div')].slice(0,3).map(e=>Math.round(e.getBoundingClientRect().height)).join()`;
const openPanel = `document.querySelector('#recognition .accordion-body.open')`;
const heightsBefore = await ev(cardHeights);
const cardQuote = await ev(`document.querySelector('#recognition blockquote').textContent.length`);
await ev(`[...document.querySelectorAll('#recognition button')].find(b=>/Read full/.test(b.textContent)).click()`); await sleep(900);
check('desktop: "Read full recommendation" opens the whole text in a wide panel under the row, cards keep their height', (await ev(`(()=>{const p=${openPanel}; if(!p) return false; const a=p.querySelector('article'); const cards=[...document.querySelectorAll('#recognition ul > li > div')].slice(0,3); const cardsBottom=Math.max(...cards.map(c=>c.getBoundingClientRect().bottom)); const r=p.getBoundingClientRect(); return a.textContent.length>${cardQuote}*3 && r.width>900 && r.top>=cardsBottom-1 && r.height>100 && r.height<600 && !p.querySelector('.accordion-inner').inert})()`)) === true && (await ev(cardHeights)) === heightsBefore, heightsBefore + ' -> ' + (await ev(cardHeights)));
await ev(`[...document.querySelectorAll('#recognition button')].filter(b=>/Read full/.test(b.textContent))[0].click()`); await sleep(900);
check('desktop: one recommendation is open at a time (opening another replaces it)', (await ev(`document.querySelectorAll('#recognition .accordion-body.open').length`)) === 1 && (await ev(`${openPanel}.querySelector('article').getAttribute('aria-label')`)).includes('Anup Mittal') && (await ev(`[...document.querySelectorAll('#recognition ul > li button')].filter(b=>b.getAttribute('aria-expanded')==='true').length`)) === 1);
await ev(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`); await sleep(700);
check('desktop: Escape closes the recommendation panel (and it is inert again)', (await ev(`document.querySelectorAll('#recognition .accordion-body.open').length`)) === 0 && (await ev(`[...document.querySelectorAll('#recognition .accordion-inner')].every(e=>e.inert)`)) === true);
check('3 recommendations visible initially', (await ev(`document.querySelectorAll('#recognition ul > li > div').length`)) === 3);
await ev(`[...document.querySelectorAll('#recognition button')].find(b=>/Show all/.test(b.textContent)).click()`); await sleep(300);
check('"Show all" reveals all 6', (await ev(`document.querySelectorAll('#recognition ul > li > div').length`)) === 6);

// 5. /work page + filter
await ev(`document.getElementById('work').scrollIntoView()`); await sleep(400);
await ev(`[...document.querySelectorAll('#work a')].find(a=>/All work/.test(a.textContent)).click()`); await sleep(1200);
check('"All work" opens /#/work', (await ev('location.hash')) === '#/work', await ev('location.hash'));
check('/work lists all 11 items', (await ev(`document.querySelectorAll('main ul > li > a, main ul > li > div').length`)) >= 11);
await ev(`[...document.querySelectorAll('main button')].find(b=>/^Gaming/.test(b.textContent.trim())).click()`); await sleep(500);
check('filter narrows list and writes ?domain= to URL', (await ev(`location.hash`)).includes('domain=Gaming') && (await ev(`document.querySelectorAll('main ul > li').length`)) === 1, await ev('location.hash'));
check('document title set on /work', (await ev('document.title')).startsWith('All work'));

// 6. nav from an inner page returns home and scrolls
await ev(`[...document.querySelectorAll('nav a')].find(a=>a.textContent.trim()==='Recognition').click()`); await sleep(2000);
check('nav from /work returns to home', (await ev('location.hash')) === '#/', await ev('location.hash'));
check('...and scrolls to Recognition', (await ev(`Math.abs(document.getElementById('recognition').getBoundingClientRect().top)`)) < 200, 'top=' + Math.round(await ev(`document.getElementById('recognition').getBoundingClientRect().top`)));
check('title restored to homepage title', (await ev('document.title')).includes('Technical Product Leader'));

// 7. case study, next link, back link scroll target
await ev(`document.getElementById('work').scrollIntoView()`); await sleep(400);
await ev(`document.querySelector('#work a.card-lift').click()`); await sleep(1500);
check('featured row opens case study route', (await ev('location.hash')).startsWith('#/case-studies/'), await ev('location.hash'));
check('breadcrumb + read time + next-case link present', (await ev(`!!document.querySelector('nav[aria-label=Breadcrumb]') && /min read/i.test(document.body.innerText) && /Next case study/i.test(document.body.innerText)`)) === true);
await sleep(1500);
check('case study body lazy-loaded', (await ev(`/The problem/i.test(document.body.innerText)`)) === true);
await ev(`[...document.querySelectorAll('a')].find(a=>/Next case study/.test(a.textContent)).click()`); await sleep(1500);
check('"Next case study" navigates to another study', (await ev('location.hash')).startsWith('#/case-studies/'), await ev('location.hash'));
await ev(`[...document.querySelectorAll('nav[aria-label=Breadcrumb] a')].find(a=>a.textContent.trim()==='Work').click()`); await sleep(2000);
check('breadcrumb "Work" lands in the Work section', (await ev('location.hash')) === '#/' && (await ev(`Math.abs(document.getElementById('work').getBoundingClientRect().top)`)) < 200);

// 8. unknown case study -> 404 content
await ev(`location.hash='#/case-studies/nope'`); await sleep(800);
check('unknown case study shows 404', (await ev(`/Case study not found/.test(document.body.innerText)`)) === true);

// 9. skip link moves focus without changing route
await ev(`location.hash='#/'`); await sleep(800);
await ev(`document.querySelector('a[href="#main-content"]').click()`); await sleep(300);
check('skip link focuses <main> and keeps route', (await ev(`document.activeElement.id`)) === 'main-content' && (await ev('location.hash')) === '#/');

// 10. mobile menu
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 800, deviceScaleFactor: 1, mobile: true });
await sleep(500);
check('closed mobile menu is not focusable (visibility hidden)', (await ev(`getComputedStyle(document.getElementById('nav-dropdown')).visibility`)) === 'hidden');
await ev(`document.querySelector('button[aria-controls=nav-dropdown]').click()`); await sleep(500);
check('menu opens (aria-expanded + visible)', (await ev(`document.querySelector('button[aria-controls=nav-dropdown]').getAttribute('aria-expanded')`)) === 'true' && (await ev(`getComputedStyle(document.getElementById('nav-dropdown')).visibility`)) === 'visible');
await ev(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`); await sleep(400);
check('Escape closes menu and returns focus to its button', (await ev(`document.querySelector('button[aria-controls=nav-dropdown]').getAttribute('aria-expanded')`)) === 'false' && (await ev(`document.activeElement.getAttribute('aria-controls')`)) === 'nav-dropdown');
check('no horizontal overflow at 390px', (await ev(`document.documentElement.scrollWidth <= 390`)) === true, 'scrollWidth=' + (await ev('document.documentElement.scrollWidth')));
check('no text smaller than 12px on the homepage', (await ev(`(()=>{const bad=[];document.querySelectorAll('body *').forEach(e=>{if(!e.childNodes.length)return;const t=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!t)return;const fs=parseFloat(getComputedStyle(e).fontSize);if(fs<11.99&&getComputedStyle(e).visibility!=='hidden')bad.push(e.tagName+':'+fs+':'+e.textContent.trim().slice(0,20));});return bad.length?bad.slice(0,5).join(' | '):'ok'})()`)) === 'ok', await ev(`(()=>{const bad=[];document.querySelectorAll('body *').forEach(e=>{const t=[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!t)return;const fs=parseFloat(getComputedStyle(e).fontSize);if(fs<11.99)bad.push(e.tagName+':'+fs+':'+e.textContent.trim().slice(0,20));});return bad.slice(0,5).join(' | ')})()`));

// 12. sticky page bar + origin-aware trail (desktop)
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await ev(`location.hash='#/case-studies/uhg-claims-transformation'`); await sleep(1800);
await ev('window.scrollTo(0, 2500)'); await sleep(700);
check('page bar stays pinned under the nav while scrolling', (await ev(`Math.round(document.querySelector('nav[aria-label=Breadcrumb]').parentElement.getBoundingClientRect().top)`)) === 64);
check('bar links every level above the page (Portfolio, Work)', (await ev(`[...document.querySelectorAll('nav[aria-label=Breadcrumb] a')].map(a=>a.textContent.trim()).join('|')`)) === 'Portfolio|Work');
await ev(`location.hash='#/work'`); await sleep(1200);
await ev(`document.querySelector('main ul .card-lift a').click()`); await sleep(1600);
check('case study opened from /work leads back to "All work"', (await ev(`[...document.querySelectorAll('nav[aria-label=Breadcrumb] a')].map(a=>a.textContent.trim()).join('|')`)) === 'Portfolio|All work', await ev(`[...document.querySelectorAll('nav[aria-label=Breadcrumb] a')].map(a=>a.textContent.trim()).join('|')`));
check('case study opens with the "short version" (problem, did, result, takeaway)', (await ev(`(()=>{const s=document.querySelector('section[aria-label="The short version"]'); if(!s) return false; const t=[...s.querySelectorAll('dt')].map(d=>d.textContent.trim().toLowerCase()).join('|'); return t.startsWith('the problem|what i did|the result|the takeaway')})()`)) === true);
check('company logo shown in the case study header', (await ev(`!!document.querySelector('article header .company-logo')`)) === true);

// 13. employer logos + theme + equal-height cards + unique ids
await ev(`location.hash='#/'`); await sleep(1500);
check('hero shows 4 employer logos', (await ev(`document.querySelectorAll('#about [role=img]').length`)) === 4);
check('every experience row carries its employer logo', (await ev(`document.querySelectorAll('#experience .company-logo').length`)) >= 5);
check('logo colour follows the theme (dark vs light differ)', (await ev(`(()=>{const el=document.querySelector('.company-logo'); const a=getComputedStyle(el).color; document.documentElement.classList.toggle('dark'); const b=getComputedStyle(el).color; document.documentElement.classList.toggle('dark'); return a!==b})()`)) === true);
check('Heineken star keeps its brand red in both themes', (await ev(`(()=>{const r=()=>getComputedStyle(document.querySelector('.hk-red')).fill; const a=r(); document.documentElement.classList.toggle('dark'); const b=r(); document.documentElement.classList.toggle('dark'); return a==='rgb(227, 0, 15)' && b==='rgb(227, 0, 15)'})()`)) === true);
check('no duplicate element ids', (await ev(`(()=>{const ids=[...document.querySelectorAll('[id]')].map(e=>e.id); return ids.length===new Set(ids).size})()`)) === true);
await ev(`document.getElementById('recognition').scrollIntoView()`); await sleep(500);
check('recommendation cards in a row are equal height', (await ev(`(()=>{const h=[...document.querySelectorAll('#recognition ul > li > div')].slice(0,3).map(e=>Math.round(e.getBoundingClientRect().height)); return new Set(h).size===1})()`)) === true, await ev(`[...document.querySelectorAll('#recognition ul > li > div')].slice(0,3).map(e=>Math.round(e.getBoundingClientRect().height)).join(',')`));

check('"Read full recommendation" buttons line up across the row', (await ev(`(()=>{const t=[...document.querySelectorAll('#recognition ul > li > div')].slice(0,3).map(c=>Math.round(c.querySelector('button').getBoundingClientRect().top - c.getBoundingClientRect().top)); return new Set(t).size===1})()`)) === true, await ev(`[...document.querySelectorAll('#recognition ul > li > div')].slice(0,3).map(c=>Math.round(c.querySelector('button').getBoundingClientRect().top - c.getBoundingClientRect().top)).join(',')`));

// 14. same page bar on mobile
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 800, deviceScaleFactor: 1, mobile: true });
await ev(`location.hash='#/case-studies/techmojo-sportsbook-gtm'`); await sleep(1800);
await ev('window.scrollTo(0, 2200)'); await sleep(700);
check('mobile: page bar stays pinned (top of screen while the nav is away) and no horizontal overflow', [0, 64].includes(await ev(`Math.round(document.querySelector('nav[aria-label=Breadcrumb]').parentElement.getBoundingClientRect().top)`)) && (await ev('document.documentElement.scrollWidth <= 390')) === true);

// 15. phone layout (390px): the mobile fixes
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 800, deviceScaleFactor: 1, mobile: true });
await send('Page.navigate', { url: BASE }); await sleep(2500);
const vis = (sel) => `(()=>{const e=document.querySelector(${JSON.stringify(sel)}); return !!e && e.offsetParent!==null})()`;
check('phone: viewport allows the page to draw under the home bar (viewport-fit=cover)', (await ev(`document.querySelector('meta[name=viewport]').content.includes('viewport-fit=cover')`)) === true);
check('phone: hero has a round face-crop photo beside the name; the big photo column is hidden', (await ev(vis('#about .hero-avatar img'))) === true && (await ev(`(()=>{const a=document.querySelector('#about .hero-avatar'); const r=a.getBoundingClientRect(); const i=[...document.querySelectorAll('#about img')].filter(i=>!a.contains(i)); return r.width>=88 && i.length>0 && i.every(e=>e.offsetParent===null)})()`)) === true);
check('phone: hero proof points and the main button all land in the first screen', (await ev(`(()=>{const b=document.querySelector('#about .cta-btn-primary').getBoundingClientRect().bottom; return b>0 && b<800})()`)) === true, 'cta bottom=' + (await ev(`Math.round(document.querySelector('#about .cta-btn-primary').getBoundingClientRect().bottom)`)));
check('phone: hero Resume is a text link, not a second button', (await ev(vis('#about a.link-accent'))) === true && (await ev(`[...document.querySelectorAll('#about .cta-btn-secondary')].every(e=>e.offsetParent===null)`)) === true);
check('phone: "Worked at" logos sit in a 2x2 grid of equal cells, each logo centred in its cell', (await ev(`(()=>{const li=[...document.querySelectorAll('#about ul[aria-label="Companies I have worked at"] li')]; const r=li.map(e=>e.getBoundingClientRect()); if(r.length!==4 || new Set(r.map(x=>Math.round(x.top))).size!==2 || new Set(r.map(x=>Math.round(x.left))).size!==2) return false; if(new Set(r.map(x=>Math.round(x.width))).size!==1 || new Set(r.map(x=>Math.round(x.height))).size!==1) return false; return li.every((e,i)=>{const l=e.querySelector('.company-logo').getBoundingClientRect(); return Math.abs((l.left+l.width/2)-(r[i].left+r[i].width/2))<2})})()`)) === true);
check('phone: featured work rows hide summary and chips visually but keep them in the page', (await ev(`(()=>{const p=[...document.querySelectorAll('#work a.card-lift p')].find(p=>/AI content engine/.test(p.textContent)); if(!p) return false; const r=p.getBoundingClientRect(); return getComputedStyle(p).position==='absolute' && r.width<=1 && p.textContent.length>40})()`)) === true);
check('phone: every experience row starts collapsed and shows its headline result', (await ev(`[...document.querySelectorAll('#experience button[aria-expanded]')].every(b=>b.getAttribute('aria-expanded')==='false')`)) === true && (await ev(`document.querySelector('#role-btn-heineken').textContent.includes('digital ordering')`)) === true);
check('phone: What I bring is one sentence per item, full text kept for screen readers', (await ev(`(()=>{const li=[...document.querySelectorAll('#what-i-bring li')]; return li.length===4 && li.every(l=>{const short=l.querySelector('p[aria-hidden=true]'); const full=[...l.querySelectorAll('p')].find(p=>!p.hasAttribute('aria-hidden')); return short && short.offsetParent!==null && full && getComputedStyle(full).position==='absolute' && full.textContent.length>short.textContent.length})})()`)) === true);
await ev(`document.getElementById('recognition').scrollIntoView()`); await sleep(400);
check('phone: credentials are two per row', (await ev(`(()=>{const h=[...document.querySelectorAll('#recognition h3')].find(x=>/Credentials/.test(x.textContent)); const li=[...h.nextElementSibling.querySelectorAll('li')].map(e=>Math.round(e.getBoundingClientRect().top)); return li.length>=2 && li[0]===li[1] && (li.length<3 || li[2]>li[0])})()`)) === true);
check('phone: no forced min-height gap above a recommendation attribution', (await ev(`(()=>{const a=document.querySelector('#recognition ul > li > div .border-t'); const m=getComputedStyle(a).minHeight; return m==='auto' || parseFloat(m)===0})()`)) === true);
check('phone: tap targets are 44px (home logo, "More work" links, Quor chips)', (await ev(`(()=>{const h=(e)=>e.getBoundingClientRect().height; const logo=h(document.querySelector('nav a[aria-label*=home]')); const more=[...document.querySelectorAll('#work ul a')].map(h); const chips=[...document.querySelectorAll('#recognition a.font-mono-pp')].map(h); return logo>=43.5 && more.length>0 && more.every(x=>x>=43.5) && chips.length>=3 && chips.every(x=>x>=43.5)})()`)) === true, await ev(`'logo '+Math.round(document.querySelector('nav a[aria-label*=home]').getBoundingClientRect().height)+' more '+[...document.querySelectorAll('#work ul a')].map(e=>Math.round(e.getBoundingClientRect().height)).join(',')+' chips '+[...document.querySelectorAll('#recognition a.font-mono-pp')].map(e=>Math.round(e.getBoundingClientRect().height)).join(',')`));
check('phone: meta lines are 13px or larger, sentence case', (await ev(`(()=>{const m=[...document.querySelectorAll('#work .meta-line')]; return m.length>0 && m.every(e=>parseFloat(getComputedStyle(e).fontSize)>=12.99 && getComputedStyle(e).textTransform==='none')})()`)) === true);
check('phone: homepage stays under 8,500px (about 10 screens)', (await ev('document.documentElement.scrollHeight')) <= 8500, 'height=' + (await ev('document.documentElement.scrollHeight')));

await ev(`location.hash='#/work'`); await sleep(1500);
const workRow = `document.querySelector('main ul li .card-lift')`;
const closedFirst = await ev(`(()=>{const row=${workRow}; return row.querySelector('.accordion-inner').inert && row.querySelector('button[aria-expanded]').getAttribute('aria-expanded')==='false'})()`);
await ev(`${workRow}.querySelector('button[aria-expanded]').click()`); await sleep(400);
check('phone /work: rows start compact and the summary opens on tap', closedFirst === true && (await ev(`(()=>{const row=${workRow}; return !row.querySelector('.accordion-inner').inert && row.querySelector('button[aria-expanded]').getAttribute('aria-expanded')==='true'})()`)) === true);
check('phone /work: stays under 4,200px (was 6,500)', (await ev('document.documentElement.scrollHeight')) <= 4200, 'height=' + (await ev('document.documentElement.scrollHeight')));

await ev(`location.hash='#/case-studies/vidaxl-ai-content-automation'`); await sleep(2200);
check('phone case study: the plain-language line is in the first screen', (await ev(`(()=>{const p=document.querySelector('section[aria-label="The short version"] p.font-display'); const r=p.getBoundingClientRect(); return r.top<500 && r.bottom<700})()`)) === true);
check('phone case study: role, team and timeline collapse into one Details line', (await ev(`(()=>{const s=document.querySelector('section[aria-label="The short version"]'); const p=[...s.querySelectorAll('p')].find(p=>/^Details/.test(p.textContent.trim())); return !!p && p.offsetParent!==null && /Team:/.test(p.textContent) && /Timeline:/.test(p.textContent)})()`)) === true);
check('phone case study: topic tags collapse behind a toggle but stay in the page', (await ev(`(()=>{const b=[...document.querySelectorAll('article header button')].find(b=>/Topics/.test(b.textContent)); if(!b) return false; const p=document.getElementById(b.getAttribute('aria-controls')); return b.getAttribute('aria-expanded')==='false' && p.querySelector('.accordion-inner').inert && p.textContent.includes('Automation')})()`)) === true);
check('titles wrap balanced (no orphaned last word)', (await ev(`(()=>{const c=getComputedStyle(document.querySelector('article h1')); return (c.textWrap||c.textWrapStyle||'').includes('balance')})()`)) === true);
check('phone case study: long sections start collapsed, inert, and keep their text in the page', (await ev(`(()=>['what-we-built','what-id-do-differently'].every(id=>{const b=document.querySelector('#'+id+' button'); if(!b) return false; const p=document.getElementById(b.getAttribute('aria-controls')); return b.getAttribute('aria-expanded')==='false' && p.querySelector('.accordion-inner').inert && p.textContent.length>300}))()`)) === true);
await ev(`[...document.querySelectorAll('nav[aria-label=Breadcrumb] button')].find(b=>/On this page/.test(b.textContent)).click()`); await sleep(300);
check('phone case study: "On this page" menu lists the sections', (await ev(`document.querySelectorAll('ul[aria-label="On this page"] button').length`)) >= 6);
await ev(`[...document.querySelectorAll('ul[aria-label="On this page"] button')].find(b=>/What we built/.test(b.textContent)).click()`); await sleep(1300);
check('phone case study: choosing a section opens it and scrolls to it', (await ev(`(()=>{const b=document.querySelector('#what-we-built button'); const t=document.getElementById('what-we-built').getBoundingClientRect().top; return b.getAttribute('aria-expanded')==='true' && t>0 && t<400})()`)) === true, 'top=' + (await ev(`Math.round(document.getElementById('what-we-built').getBoundingClientRect().top)`)));

// nav that hides on scroll (phones), scroll-to-top that shows only on the way up
await ev('window.scrollTo(0, 0)'); await sleep(600);
await ev('window.scrollTo(0, 2200)'); await sleep(1100);
const barTop = `Math.round(document.querySelector('nav[aria-label=Breadcrumb]').parentElement.getBoundingClientRect().top)`;
const navTop = `Math.round(document.querySelector('nav[aria-label=Primary]').getBoundingClientRect().top)`;
check('phone: nav slides away while scrolling down and the page bar moves to the top', (await ev(navTop)) < -60 && (await ev(barTop)) === 0, 'nav ' + (await ev(navTop)) + ' bar ' + (await ev(barTop)));
check('phone: scroll-to-top is hidden while scrolling down', (await ev(`getComputedStyle(document.querySelector('.scroll-top-btn')).opacity`)) === '0');
await key('Tab', 'Tab', 9); // switch to keyboard modality, then land on the nav the way Shift+Tab from the content would
await ev(`document.querySelector('nav[aria-label=Primary] a').focus()`); await sleep(500);
check('phone: keyboard focus brings the hidden nav back', (await ev(`document.activeElement.closest('nav')!==null && document.activeElement.closest('nav').getAttribute('aria-label')==='Primary'`)) === true && (await ev(navTop)) === 0, 'active=' + (await ev('document.activeElement.tagName + ":" + (document.activeElement.getAttribute("aria-label")||"")')));
await ev('document.activeElement.blur()'); await sleep(300);
await ev('window.scrollTo(0, 2600)'); await sleep(900);
await ev('window.scrollBy(0, -250)'); await sleep(900);
check('phone: nav returns on the first scroll up, page bar sits under it', (await ev(navTop)) === 0 && (await ev(barTop)) === 64, 'nav ' + (await ev(navTop)) + ' bar ' + (await ev(barTop)));
check('phone: scroll-to-top appears while scrolling up', (await ev(`getComputedStyle(document.querySelector('.scroll-top-btn')).opacity`)) === '1');
await sleep(3300);
check('phone: ...and fades out again once scrolling stops', (await ev(`getComputedStyle(document.querySelector('.scroll-top-btn')).opacity`)) === '0');

// 11. reduced motion: reveal content is visible immediately
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await send('Page.navigate', { url: BASE }); await sleep(2000);
check('prefers-reduced-motion: reveals are not hidden', (await ev(`[...document.querySelectorAll('.reveal')].every(e=>getComputedStyle(e).opacity==='1')`)) === true);

check('no console errors or exceptions', errors.length === 0, errors.slice(0, 3).join(' || '));
console.log(`\n${results.filter(Boolean).length}/${results.length} checks passed`);
ws.close(); edge.kill(); process.exit(results.every(Boolean) ? 0 : 1);
