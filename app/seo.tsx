import type { Metadata } from 'next';
import { articles, type Faq } from './articles';

export const SITE = 'https://crmfromwithin.com';
export const OG_IMAGE = `${SITE}/og-crm-from-within.png`;

export type SiteLocale = 'en' | 'se';

/** Set by proxy.ts on every request; the root layout reads it to set `<html lang>`. */
export const LOCALE_HEADER = 'x-site-locale';

/** One-line description of the company, used in the Organization markup and llms.txt. */
export const ORG_DESCRIPTION =
  "Builds a small or mid-sized company's CRM around how that company already handles leads and customers, then keeps adapting it as the work changes, so the team never has to configure or administer the CRM.";

const LANGUAGE: Record<SiteLocale, { hreflang: string; og: string }> = {
  en: { hreflang: 'en', og: 'en_US' },
  se: { hreflang: 'sv', og: 'sv_SE' },
};

export const htmlLang = (locale: SiteLocale) => LANGUAGE[locale].hreflang;

/**
 * The day each shared (English + Swedish) page's content last changed. The
 * sitemap's lastmod and the JSON-LD dateModified both read from here, so they
 * always agree. Bump the date when the page's text changes, not on every deploy.
 * Guides carry their own dates in articles.ts.
 */
export const PAGE_DATES: Record<string, string> = {
  '': '2026-09-04',
  '/privacy': '2026-08-30',
};

export type SitePage = {
  locale: SiteLocale;
  /** Path without the locale prefix, '' for the home page. */
  page: string;
  /** Full path, e.g. /en/privacy. */
  path: string;
  date: string;
  /** Locales the page exists in. One locale means no hreflang links. */
  languages: SiteLocale[];
};

/** Every indexable page. The sitemap, llms.txt and the SEO check list the same set. */
export const PAGES: SitePage[] = [
  ...(['en', 'se'] as const).flatMap((locale) =>
    Object.entries(PAGE_DATES).map(([page, date]) => ({ locale, page, path: `/${locale}${page}`, date, languages: ['en', 'se'] as SiteLocale[] })),
  ),
  { locale: 'en', page: '/guides', path: '/en/guides', date: articles.map((a) => a.modified).sort().at(-1)!, languages: ['en'] },
  ...articles.map((article) => ({ locale: 'en' as const, page: `/${article.slug}`, path: `/en/${article.slug}`, date: article.modified, languages: ['en'] as SiteLocale[] })),
];

export const pageDate = (page: string) => PAGES.find((entry) => entry.page === page)?.date;

export type PageCopy = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
};

export const hreflangLinks = (page: string, languages: SiteLocale[]) =>
  languages.length < 2
    ? undefined
    : {
        en: `${SITE}/en${page}`,
        sv: `${SITE}/se${page}`,
        'x-default': `${SITE}/en${page}`,
      };

/** Canonical, reciprocal hreflang (with x-default), Open Graph and Twitter tags for one locale of a page. */
export function pageMetadata(locale: SiteLocale, page: string, copy: PageCopy, languages: SiteLocale[] = ['en', 'se']): Metadata {
  const url = `${SITE}/${locale}${page}`;
  const ogTitle = copy.ogTitle ?? copy.title;
  const ogDescription = copy.ogDescription ?? copy.description;
  const other = languages.find((candidate) => candidate !== locale);
  return {
    title: copy.title,
    description: copy.description,
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    alternates: {
      canonical: url,
      languages: hreflangLinks(page, languages),
    },
    openGraph: {
      type: 'website',
      url,
      siteName: 'CRM From Within',
      locale: LANGUAGE[locale].og,
      alternateLocale: other ? LANGUAGE[other].og : undefined,
      title: ogTitle,
      description: ogDescription,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'CRM From Within' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [OG_IMAGE],
    },
  };
}

export type ArticleDates = { published: string; modified: string; headline: string };

/**
 * One JSON-LD graph: the company, the site, the founder and this page, plus
 * its FAQ when it shows one and an Article node when it is a guide.
 */
export function jsonLd(locale: SiteLocale, page: string, copy: PageCopy, faq: Faq[] = [], article?: ArticleDates) {
  const url = `${SITE}/${locale}${page}`;
  const inLanguage = htmlLang(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE}/#org`,
        name: 'CRM From Within',
        legalName: 'Yusuf Young AB',
        description: ORG_DESCRIPTION,
        url: SITE,
        address: { '@type': 'PostalAddress', addressCountry: 'SE' },
        logo: `${SITE}/crm-from-within-logo.png`,
        founder: { '@id': `${SITE}/#founder` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE}/#founder`,
        name: 'Yusuf Young',
        jobTitle: 'Founder',
        image: `${SITE}/yusuf-young.jpg`,
        worksFor: { '@id': `${SITE}/#org` },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        name: 'CRM From Within',
        url: SITE,
        inLanguage: ['en', 'sv'],
        publisher: { '@id': `${SITE}/#org` },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#page`,
        url,
        name: copy.title,
        description: copy.description,
        inLanguage,
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': `${SITE}/#org` },
        dateModified: article?.modified ?? pageDate(page),
      },
      ...(article ? [{
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: article.headline,
        description: copy.description,
        inLanguage,
        datePublished: article.published,
        dateModified: article.modified,
        author: { '@id': `${SITE}/#founder` },
        publisher: { '@id': `${SITE}/#org` },
        image: OG_IMAGE,
        mainEntityOfPage: { '@id': `${url}#page` },
      }] : []),
      ...(faq.length ? [{
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage,
        isPartOf: { '@id': `${url}#page` },
        mainEntity: faq.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      }] : []),
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  // `<` is escaped so page text can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
