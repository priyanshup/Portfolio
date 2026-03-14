/**
 * hooks/useScrollReveal.js
 *
 * Adds the "in-view" class to any element with className="reveal"
 * when it enters the viewport.
 *
 * Includes a MutationObserver so newly mounted .reveal elements
 * (e.g. from conditional carousel ↔ grid switching) are observed
 * immediately without a page reload — fixes the "disappearing
 * certifications on resize" bug.
 */

import { useEffect } from 'react';

const useScrollReveal = () => {
  useEffect(() => {
    const intersectionObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        }),
      { threshold: 0.08 }
    );

    const observe = (el) => {
      if (el.classList?.contains('reveal') && !el.classList.contains('in-view')) {
        intersectionObs.observe(el);
      }
    };

    // Observe everything already in the DOM
    document.querySelectorAll('.reveal').forEach(observe);

    // Watch for elements added later (layout switching)
    const mutationObs = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          observe(node);
          node.querySelectorAll?.('.reveal').forEach(observe);
        });
      });
    });
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObs.disconnect();
      mutationObs.disconnect();
    };
  }, []);
};

export default useScrollReveal;
