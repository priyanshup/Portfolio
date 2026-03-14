/**
 * components/ui/BrandLogo.jsx
 *
 * Renders the logo.png from /public.
 * Used in Nav, MobileMenu, and Footer.
 *
 * Props:
 *   className  – Tailwind size classes, default "h-9 w-9"
 */

const BrandLogo = ({ className = 'h-9 w-9' }) => (
  <img
    src="logo.png"
    alt="Priyanshu Pushpam"
    className={`${className} object-contain`}
  />
);

export default BrandLogo;
