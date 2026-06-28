/**
 * components/modals/TestimonialModal.jsx
 *
 * Full-text modal for a single testimonial.
 * Opens when the user clicks a testimonial card.
 *
 * - Max height 82vh with internal scroll for long text
 * - Fixed header (quote mark + close button)
 * - Fixed footer (name, title, relation)
 * - Closes on: Escape key, backdrop click, close button
 *
 * Props:
 *   t        – testimonial object { text, name, title, company, relation }
 *   onClose  – callback to close the modal
 */

import { useEffect } from 'react';
import { CloseIcon } from '../ui/Icons';

const TestimonialModal = ({ t, onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    // Lock scroll on both html and body for cross-browser reliability
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card relative w-full max-w-lg flex flex-col rounded-3xl bg-cardBg dark:border-gray-600 border-slate-200 border shadow-2xl"
        style={{ maxHeight: '82vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 flex-shrink-0">
          <p className="text-4xl dark:text-gray-600 text-slate-500 font-serif leading-none select-none">"</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="dark:text-gray-500 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto scroll-section px-8 pb-4 flex-1">
          <p className="dark:text-gray-200 text-slate-700 text-base leading-relaxed">{t.text}</p>
        </div>

        {/* Fixed footer */}
        <div className="dark:border-gray-700 border-slate-200 border-t px-8 py-5 flex-shrink-0">
          <p className="dark:text-white text-slate-900 font-bold">{t.name}</p>
          <p className="dark:text-gray-400 text-slate-600 text-sm mt-1">{t.title} · {t.company}</p>
          <p className="font-mono-pp dark:text-gray-500 text-slate-500 text-[10px] uppercase tracking-widest mt-1">
            {t.relation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;
