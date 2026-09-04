import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'Company Native — Own and control your CRM replacement',
  description: 'Replace HubSpot or Salesforce with a CRM your company owns, can self-host and can keep changing with any qualified team.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function EnglishPage() {
  return <Site locale="en" />;
}
