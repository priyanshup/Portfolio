import { useEffect } from 'react';
import { CONFIG } from '../config';

/**
 * Sets <title>, meta description and canonical for a page and restores the
 * homepage defaults on unmount. Used by every non-home route so the browser
 * tab and (JS-executing) crawlers get the right metadata.
 *
 *   title       – full document title
 *   description – meta description
 *   path        – hash path for the canonical URL, e.g. "/work"
 */
const useDocumentMeta = ({ title, description, path }) => {
  useEffect(() => {
    document.title = title;

    const descTag = document.querySelector('meta[name="description"]');
    if (descTag && description) descTag.setAttribute('content', description);

    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.rel = 'canonical';
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.href = path ? `${CONFIG.siteUrl}#${path}` : CONFIG.siteUrl;

    return () => {
      document.title = CONFIG.siteTitle;
      if (descTag) descTag.setAttribute('content', CONFIG.siteDescription);
      canonicalTag.href = CONFIG.siteUrl;
    };
  }, [title, description, path]);
};

export default useDocumentMeta;
