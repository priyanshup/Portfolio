/**
 * utils/sectionEvents.js
 *
 * The "On this page" menu (PageBar) asks a phone-collapsed case study section
 * to open before it scrolls there: it dispatches this window event with the
 * section's id as `detail`, and <Collapsible> (case-studies/components.jsx)
 * opens the matching section.
 */
export const OPEN_SECTION_EVENT = 'cs:open-section';

export const openSection = (id) =>
  window.dispatchEvent(new CustomEvent(OPEN_SECTION_EVENT, { detail: id }));
