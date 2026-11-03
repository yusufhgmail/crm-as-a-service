import type { Metadata } from 'next';
import { faq } from '../faq';
import { Site } from '../page';
import { JsonLd, jsonLd, pageMetadata, type PageCopy } from '../seo';

const copy: PageCopy = {
  title: 'CRM-system byggt efter ditt företag | CRM From Within',
  description: 'Ett CRM-system byggt runt hur ditt företag redan arbetar och som anpassas när ni växer, utan att någon i teamet behöver administrera det.',
  ogTitle: 'Ett produktionsklart CRM som formar sig efter ditt företag.',
  ogDescription: 'CRM From Within lär sig hur kundarbetet går till, ställer fokuserade frågor och anpassas tryggt för teamet.',
};

export const metadata: Metadata = pageMetadata('se', '', copy);

export default function SwedishPage() {
  return (
    <>
      <JsonLd data={jsonLd('se', '', copy, faq.se)} />
      <Site locale="se" />
    </>
  );
}
