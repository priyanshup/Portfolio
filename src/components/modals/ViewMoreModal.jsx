/**
 * components/modals/ViewMoreModal.jsx
 *
 * Generic "View All" overlay used by Projects and Case Studies.
 * Renders all items in a responsive 2-column scrollable grid.
 *
 * - Fixed header with section title and close button
 * - Scrollable card grid (max-height 88vh)
 * - Closes on: Escape key, backdrop click, close button
 *
 * Props:
 *   title       – modal heading  (e.g. "Key Projects")
 *   eyebrow     – small label    (e.g. "All Shipped Work")
 *   items       – full data array
 *   renderItem  – (item, index) => JSX  — same renderer as the section uses
 *   onClose     – callback to close the modal
 */

import { useEffect } from 'react';
import { CloseIcon } from '../ui/Icons';

const ViewMoreModal = ({ title, eyebrow, items, renderItem, onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    // position:fixed is required for iOS Safari — overflow:hidden alone is ignored
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top      = `-${scrollY}px`;
    document.body.style.width    = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-card relative w-full max-w-4xl flex flex-col rounded-3xl bg-darkBg dark:border-gray-700 border-slate-200 border shadow-2xl"
        style={{ maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed header */}
        <div className="flex items-start justify-between p-6 dark:border-b dark:border-gray-800 border-b border-slate-200 flex-shrink-0 bg-darkBg rounded-t-3xl">
          <div>
            <p className="font-mono-pp text-accent text-[10px] uppercase tracking-[0.3em] mb-1">
              {eyebrow}
            </p>
            <h3 className="font-display text-2xl font-bold dark:text-white text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="dark:text-gray-500 text-slate-500 dark:hover:text-white hover:text-slate-900 transition-colors p-1 flex-shrink-0 mt-1"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable grid */}
        <div className="overflow-y-auto scroll-section p-6 bg-darkBg rounded-b-3xl">
          <div className="grid sm:grid-cols-2 gap-5">
            {items.map((item, i) => (
              <div key={i}>{renderItem(item, i)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMoreModal;
