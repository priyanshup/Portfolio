/**
 * components/ui/BrandLogo.jsx
 *
 * Renders the logo.png from /public.
 * Used in Nav and Footer.
 *
 * Props:
 *   className  – Tailwind size classes, default "h-9 w-9"
 */

import { asset } from '../../utils/asset';

const BrandLogo = ({ className = 'h-9 w-9' }) => (
  <img
    src={asset('logo.png')}
    alt="Priyanshu Pushpam"
    className={`${className} object-contain`}
  />
);

export default BrandLogo;
