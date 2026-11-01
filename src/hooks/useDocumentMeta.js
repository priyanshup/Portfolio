import { useEffect } from 'react';
import { homeMeta, pageUrl } from '../utils/pageMeta';

/* Tags kept in step with the page; the prerender writes the same values into
   each page's static HTML (scripts/prerender.mjs). */
const setMeta = ({ title, description, path }) => {
  document.title = title;
  const url = pageUrl(path);
  const set = (selector, attr, value) => document.querySelector(selector)?.setAttribute(attr, value);
  set('meta[name="description"]', 'content', description);
  set('meta[property="og:title"]', 'content', title);
  set('meta[property="og:description"]', 'content', description);
  set('meta[property="og:url"]', 'content', url);
  set('meta[name="twitter:title"]', 'content', title);
  set('meta[name="twitter:description"]', 'content', description);
  set('meta[name="twitter:url"]', 'content', url);
  set('link[rel="canonical"]', 'href', url);
};

/**
 * Sets <title>, meta description, canonical and share tags for a page and
 * restores the homepage values on unmount. Takes an entry from
 * utils/pageMeta.js: { title, description, path }.
 */
const useDocumentMeta = ({ title, description, path }) => {
  useEffect(() => {
    setMeta({ title, description: description ?? homeMeta.description, path: path ?? homeMeta.path });
    return () => setMeta(homeMeta);
  }, [title, description, path]);
};

export default useDocumentMeta;
