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
        className="modal-card relative w-full max-w-lg flex flex-col rounded-3xl bg-cardBg border border-gray-600 shadow-2xl"
        style={{ maxHeight: '82vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 flex-shrink-0">
          <p className="text-4xl text-gray-600 font-serif leading-none select-none">"</p>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto scroll-section px-8 pb-4 flex-1">
          <p className="text-gray-200 text-base leading-relaxed">{t.text}</p>
        </div>

        {/* Fixed footer */}
        <div className="border-t border-gray-700 px-8 py-5 flex-shrink-0">
          <p className="text-white font-bold">{t.name}</p>
          <p className="text-gray-400 text-sm mt-1">{t.title} · {t.company}</p>
          <p className="font-mono-pp text-gray-500 text-[10px] uppercase tracking-widest mt-1">
            {t.relation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialModal;
