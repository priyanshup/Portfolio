/**
 * utils/initials.js
 *
 * Shared by the testimonial card and the testimonial modal so the
 * monogram avatar is computed identically in both places.
 */
export const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
};
