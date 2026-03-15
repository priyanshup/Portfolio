/**
 * hooks/useSectionTracking.js
 *
 * Tracks which portfolio sections a user actually sees.
 * Uses IntersectionObserver with a 40% visibility threshold —
 * a section is only counted as "viewed" when nearly half of it
 * is on screen, not just a pixel at the edge.
 *
 * Each section fires only once per page load.
 *
 * Usage: call useSectionTracking() once in HomePage.
 * It automatically finds all elements with a data-section attribute.
 *
 * Add data-section="section-name" to each <section> element,
 * or use the SECTION_IDS list below which matches existing id attributes.
 */

import { useEffect } from 'react';
import { trackSectionView } from '../utils/analytics.js';

/*
 * These match the id attributes already on your section elements:
 *   <section id="about">
 *   <section id="journey">
 *   etc.
 */
const SECTION_IDS = [
  'about',
  'journey',
  'experience',
  'projects',
  'case-studies',
  'testimonials',
];

const useSectionTracking = () => {
  useEffect(() => {
    const fired = new Set();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting && id && !fired.has(id)) {
            fired.add(id);
            trackSectionView(id);
          }
        });
      },
      {
        threshold: 0.4, // 40% of section must be visible
      }
    );

    // Observe all known sections
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);
};

export default useSectionTracking;