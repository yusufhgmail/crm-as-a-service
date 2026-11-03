import type { Metadata } from 'next';
import { faq } from '../faq';
import { Site } from '../page';
import { JsonLd, jsonLd, pageMetadata, type PageCopy } from '../seo';

const copy: PageCopy = {
  title: 'Custom CRM for small businesses | CRM From Within',
  description: 'A custom CRM built around how your small business already works, then adapted as you grow, without anyone on your team administering it.',
  ogTitle: 'A production-ready CRM that shapes itself around your company.',
  ogDescription: 'CRM From Within learns how customer work happens, asks focused questions and is safely adapted for your team.',
};

export const metadata: Metadata = pageMetadata('en', '', copy);

export default function EnglishPage() {
  return (
    <>
      <JsonLd data={jsonLd('en', '', copy, faq.en)} />
      <Site locale="en" />
    </>
  );
}
