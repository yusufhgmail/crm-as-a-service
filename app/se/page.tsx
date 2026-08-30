import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'CRM From Within — Ditt första CRM, byggt runt hur du arbetar',
  description: 'Få ett CRM byggt runt hur ditt företag arbetar—som ditt första system eller som en ersättare. Hjälp med datamigrering finns som betald tjänst.',
  alternates: {
    canonical: '/se',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function SwedishPage() {
  return <div lang="sv"><Site locale="se" /></div>;
}
