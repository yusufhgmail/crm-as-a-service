import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'Company Native — Äg och styr CRM-systemet som ersätter det gamla',
  description: 'Ersätt HubSpot eller Salesforce med ett CRM som företaget äger, kan driva själv och kan fortsätta ändra med valfritt kvalificerat team.',
  alternates: {
    canonical: '/se',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function SwedishPage() {
  return <div lang="sv"><Site locale="se" /></div>;
}
