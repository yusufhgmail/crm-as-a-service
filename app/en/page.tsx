import type { Metadata } from 'next';
import { Site } from '../page';

export const metadata: Metadata = {
  title: 'CRM That Fits — Your CRM should fit your business',
  description: 'We learn how your company works, design and build the CRM you actually need, migrate your data, train your team and keep improving it.',
  alternates: {
    canonical: '/en',
    languages: { en: '/en', sv: '/se' },
  },
};

export default function EnglishPage() {
  return <Site locale="en" />;
}
