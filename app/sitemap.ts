import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://companynative.com';
  return [
    { url: `${base}/en`, lastModified: new Date('2026-08-30'), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/se`, lastModified: new Date('2026-08-30'), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/en/privacy`, lastModified: new Date('2026-08-30'), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/se/privacy`, lastModified: new Date('2026-08-30'), changeFrequency: 'yearly', priority: 0.2 },
  ];
}
