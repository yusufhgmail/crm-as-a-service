import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'Company Native — Your CRM should fit your business',
  description: 'Get a CRM built around how your company works, with design, development, data migration, training and continuous improvement handled end to end.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function EnglishPage() {
  return <Site locale="en" />;
}
