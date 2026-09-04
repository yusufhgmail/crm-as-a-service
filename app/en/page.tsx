import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'CRM From Within — The CRM that adapts to your company',
  description: 'A production-ready CRM that learns how your company works and is safely adapted for your team—without making you administer it.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function EnglishPage() {
  return <Site locale="en" />;
}
