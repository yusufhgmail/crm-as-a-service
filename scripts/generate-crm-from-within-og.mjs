import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="CRM From Within social preview">
  <rect width="1200" height="630" fill="#F4F1E9"/>
  <rect x="1" y="1" width="1198" height="628" fill="none" stroke="#D9DDD5" stroke-width="2"/>
  <g opacity=".32" fill="#102B2C">
    <circle cx="715" cy="98" r="2"/><circle cx="807" cy="98" r="2"/><circle cx="899" cy="98" r="2"/><circle cx="991" cy="98" r="2"/><circle cx="1083" cy="98" r="2"/>
    <circle cx="715" cy="190" r="2"/><circle cx="807" cy="190" r="2"/><circle cx="899" cy="190" r="2"/><circle cx="991" cy="190" r="2"/><circle cx="1083" cy="190" r="2"/>
    <circle cx="715" cy="282" r="2"/><circle cx="807" cy="282" r="2"/><circle cx="899" cy="282" r="2"/><circle cx="991" cy="282" r="2"/><circle cx="1083" cy="282" r="2"/>
  </g>
  <g transform="translate(67 63) scale(.5)">
    <path fill="#102B2C" d="M52 14H38C24.745 14 14 24.745 14 38v20c0 13.255 10.745 24 24 24h14V68H38c-5.523 0-10-4.477-10-10V38c0-5.523 4.477-10 10-10h14V14Z"/>
    <rect x="48" y="35" width="34" height="26" rx="6" fill="#FF7048"/>
  </g>
  <text x="130" y="93" fill="#102B2C" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" letter-spacing="-1.2">CRM From Within</text>
  <text x="64" y="237" fill="#102B2C" font-family="Georgia, 'Times New Roman', serif" font-size="70" letter-spacing="-3">
    <tspan x="64" dy="0">Your first CRM, built</tspan>
    <tspan x="64" dy="78">around how you work.</tspan>
  </text>
  <text x="66" y="454" fill="#335151" font-family="Arial, Helvetica, sans-serif" font-size="21">Designed, built and improved around your company.</text>
  <g transform="translate(66 510)" font-family="Arial, Helvetica, sans-serif" font-size="11" font-weight="700" text-anchor="middle">
    <rect width="152" height="34" rx="17" fill="#102B2C"/><text x="76" y="22" fill="#F4F1E9">BUILT AROUND YOU</text>
    <rect x="164" width="166" height="34" rx="17" fill="#B9F6CA"/><text x="247" y="22" fill="#102B2C">SAFE TO ADOPT</text>
    <rect x="342" width="220" height="34" rx="17" fill="#FBFAF6"/><text x="452" y="22" fill="#102B2C">IMPROVES CONTINUOUSLY</text>
  </g>
  <g transform="translate(815 172)">
    <rect width="292" height="292" rx="67" fill="#102B2C"/>
    <g transform="translate(40 40) scale(2.2083333333)">
      <path fill="#B9F6CA" d="M52 14H38C24.745 14 14 24.745 14 38v20c0 13.255 10.745 24 24 24h14V68H38c-5.523 0-10-4.477-10-10V38c0-5.523 4.477-10 10-10h14V14Z"/>
      <rect x="48" y="35" width="34" height="26" rx="6" fill="#FF7048"/>
    </g>
  </g>
</svg>`;

const output = fileURLToPath(new URL('../public/og-crm-from-within.png', import.meta.url));
await sharp(Buffer.from(svg)).png().toFile(output);
