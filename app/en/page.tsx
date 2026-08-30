import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'CRM From Within — Your first CRM, built around how you work',
  description: 'Turn spreadsheets, inboxes and memory into one CRM built around how your company already works.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function EnglishPage() {
  return <Site locale="en" />;
}
