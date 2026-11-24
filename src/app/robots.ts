import { SITE_URL } from '@/lib/site'
import type { MetadataRoute } from 'next'

// Search and AI-search crawlers may read every public page. Only the chat API is excluded.
// CSS/JS/images (/_next, /projects/*.png) stay crawlable so pages render fully for indexing.
const SEARCH_BOTS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot', // ChatGPT Search
  'ChatGPT-User', // links opened from ChatGPT
  'PerplexityBot',
  'Applebot',
  'DuckDuckBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow: '/api/' })),
      // GPTBot collects AI *training* data (separate from ChatGPT Search). Allowed here;
      // change to `disallow: '/'` to opt out of training without affecting search visibility.
      { userAgent: 'GPTBot', allow: '/', disallow: '/api/' },
      { userAgent: '*', allow: '/', disallow: '/api/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
