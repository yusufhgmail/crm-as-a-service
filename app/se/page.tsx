import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'Company Native — Ert CRM ska passa er verksamhet',
  description: 'Vi lär oss hur ert företag arbetar, designar och bygger det CRM ni behöver, migrerar er data, utbildar teamet och fortsätter förbättra systemet.',
  alternates: {
    canonical: '/se',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function SwedishPage() {
  return <div lang="sv"><Site locale="se" /></div>;
}
