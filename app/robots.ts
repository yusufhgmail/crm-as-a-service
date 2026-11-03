import type { MetadataRoute } from 'next';
import { SITE } from './seo';

// AI assistants that fetch pages to answer a question or cite a source (not
// training crawlers). Named so a blanket AI-bot block can't silently cover them.
const AI_SEARCH_AGENTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      ...AI_SEARCH_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow: '/api/' })),
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
