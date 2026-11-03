import type { MetadataRoute } from 'next';
import { PAGE_DATES, PAGES, SITE } from './seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ page, path }) => ({
    url: `${SITE}${path}`,
    lastModified: PAGE_DATES[page],
    alternates: {
      languages: { en: `${SITE}/en${page}`, sv: `${SITE}/se${page}`, 'x-default': `${SITE}/en${page}` },
    },
  }));
}
