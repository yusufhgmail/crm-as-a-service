import type { MetadataRoute } from 'next';
import { hreflangLinks, PAGES, SITE } from './seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ page, path, date, languages }) => {
    const alternates = hreflangLinks(page, languages);
    return {
      url: `${SITE}${path}`,
      lastModified: date,
      ...(alternates ? { alternates: { languages: alternates } } : {}),
    };
  });
}
