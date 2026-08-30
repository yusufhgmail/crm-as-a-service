import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'CRM From Within — Your first CRM, built around how you work',
  description: 'Get a CRM built around how your company works—whether it is your first system or a replacement. Paid data migration is available.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function EnglishPage() {
  return <Site locale="en" />;
}
