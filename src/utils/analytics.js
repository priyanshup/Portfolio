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
   Called by RouteTracker (App.jsx) for every page, including the first:
   index.html's config call uses send_page_view: false.
   `path` excludes the /Portfolio base, e.g. "/work".
─────────────────────────────────────────────────────────────────────── */
const GA_ID = 'G-43E3DDMJLM'; // same ID as index.html

export const trackPageView = (path) => {
  gtag('config', GA_ID, {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
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

export const trackProjectLinkClick = (project, linkLabel) =>
  trackEvent('project_link_click', { event_category: 'content', project, link: linkLabel });

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