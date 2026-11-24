import { projects } from '@/appData/projects'
import { abs } from '@/lib/site'
import type { MetadataRoute } from 'next'

// Only canonical, indexable, 200-status URLs (no redirects such as /en, no hash fragments).
// Single language, so no hreflang alternates are needed.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: abs('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: abs('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: abs('/projects'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...projects.map((p) => ({
      url: abs(`/projects/${p.slug}`),
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
