import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'Company Native — Ditt första CRM, byggt runt hur du arbetar',
  description: 'Gör kalkylblad, inkorgar och minne till ett CRM byggt runt hur företaget redan arbetar.',
  alternates: {
    canonical: '/se',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function SwedishPage() {
  return <div lang="sv"><Site locale="se" /></div>;
}
