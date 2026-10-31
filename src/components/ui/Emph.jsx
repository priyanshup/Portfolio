/**
 * components/ui/Emph.jsx
 *
 * Renders a data string with **double-asterisk** phrases in bold ink, so the
 * data files can mark the one result a skimmer should catch (DESIGN.md §3:
 * at most one bold phrase per paragraph, and it is the result).
 *
 *   <Emph text="Revenue grew **200%** in three months" />
 */

const Emph = ({ text }) =>
  text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 ? <strong key={i} className="font-semibold text-ink">{part}</strong> : part,
  );

export default Emph;
