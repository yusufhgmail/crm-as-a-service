import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'CRM From Within — CRM-systemet som anpassar sig efter ditt företag',
  description: 'Ett produktionsklart CRM som lär sig hur företaget arbetar och anpassas tryggt för teamet—utan att teamet behöver administrera det.',
  alternates: {
    canonical: '/se',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function SwedishPage() {
  return <div lang="sv"><Site locale="se" /></div>;
}
