/**
 * utils/analytics.js
 *
 * Central analytics utility.
 * All tracking calls go through here — never call gtag() directly
 * from components. This keeps tracking logic out of UI code and
 * makes it easy to swap analytics providers later.
 *
 * Usage:
 *   import { trackEvent, trackPageView, trackSectionView } from '../utils/analytics';
 */

/* ── Safety wrapper ──────────────────────────────────────────────────
   gtag is loaded by the script tag in index.html.
   This wrapper prevents errors if the script hasn't loaded yet
   (e.g. ad blockers, slow connections) so the app never crashes.
─────────────────────────────────────────────────────────────────────── */
const gtag = (...args) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

/* ── Page view tracking ──────────────────────────────────────────────
   Called when the route changes (HashRouter).
   The GA4 snippet in index.html handles the initial page load —
   this handles subsequent navigation within the SPA.
─────────────────────────────────────────────────────────────────────── */
export const trackPageView = (path) => {
  gtag('config', 'G-43E3DDMJLM', {   // ← replace with your ID
    page_path: path,
  });
};

/* ── Generic event tracker ───────────────────────────────────────────
   Base function used by all specific trackers below.

   eventName  – snake_case string, e.g. 'resume_download'
   params     – optional additional properties
─────────────────────────────────────────────────────────────────────── */
export const trackEvent = (eventName, params = {}) => {
  gtag('event', eventName, params);
};

/* ── Link click trackers ─────────────────────────────────────────────
   Call these from onClick handlers on the relevant links.
─────────────────────────────────────────────────────────────────────── */
export const trackResumeDownload = () =>
  trackEvent('resume_download', { event_category: 'engagement' });

export const trackLinkedInClick = () =>
  trackEvent('linkedin_click', { event_category: 'social' });

export const trackGitHubClick = () =>
  trackEvent('github_click', { event_category: 'social' });

export const trackInstagramClick = () =>
  trackEvent('instagram_click', { event_category: 'social' });

export const trackFacebookClick = () =>
  trackEvent('facebook_click', { event_category: 'social' });

export const trackCaseStudyOpen = (slug) =>
  trackEvent('case_study_open', { event_category: 'content', case_study: slug });

export const trackViewMoreOpen = (section) =>
  trackEvent('view_more_open', { event_category: 'content', section });

/* ── Section visibility tracker ─────────────────────────────────────
   Called by useSectionTracking hook when a section enters the viewport.
─────────────────────────────────────────────────────────────────────── */
export const trackSectionView = (sectionId) =>
  trackEvent('view_section', {
    event_category: 'engagement',
    section: sectionId,
  });

/* ── Scroll depth tracker ────────────────────────────────────────────
   Called by useScrollTracking hook at 25 / 50 / 75 / 100% thresholds.
─────────────────────────────────────────────────────────────────────── */
export const trackScrollDepth = (percent) =>
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    percent_scrolled: percent,
  });