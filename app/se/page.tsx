import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'Company Native — Ditt CRM ska passa din verksamhet',
  description: 'Få ett CRM byggt runt hur ditt företag arbetar, med design, utveckling, datamigrering, utbildning och löpande förbättring hela vägen.',
  alternates: {
    canonical: '/se',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function SwedishPage() {
  return <div lang="sv"><Site locale="se" /></div>;
}
