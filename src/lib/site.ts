import { education } from '@/appData/education'
import { experience } from '@/appData/experience'
import { personal } from '@/appData/personal'
import { skillGroups } from '@/appData/skills'

/**
 * Absolute production URL, used for canonical links, sitemap, robots.txt, Open Graph and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://varsilsuvagiya.com). On Vercel it falls back to the production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'http://localhost:3000'
).replace(/\/$/, '')

export const abs = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`

// One consistent professional identity, reused by every page, metadata tag and schema.
export const identity = {
  name: personal.name,
  jobTitle: 'Full-Stack Software Engineer',
  location: 'Surat, Gujarat, India',
  title: `${personal.name} | Full-Stack Software Engineer | Surat, India`,
  description: `Official portfolio of ${personal.name}, a Full-Stack Software Engineer from Surat, India. Explore his professional experience, software engineering projects, and technical expertise in Next.js, React, Node.js, NestJS and AWS.`,
}

// Stable @id anchors so schemas on different pages describe the same entities instead of duplicates.
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const personSchema = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: personal.name,
  url: abs('/about'),
  jobTitle: identity.jobTitle,
  description: identity.description,
  email: `mailto:${personal.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: personal.address.city,
    addressRegion: personal.address.region,
    addressCountry: personal.address.country,
  },
  worksFor: { '@type': 'Organization', name: experience[0].company },
  alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
  sameAs: [personal.github, personal.linkedin],
  knowsAbout: [...new Set([...skillGroups.flatMap((g) => g.items), 'NestJS', 'REST APIs'])],
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: abs('/'),
  name: `${personal.name} — Portfolio`,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
}

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
})

/** Serialises JSON-LD safely for a <script> tag. */
export const jsonLd = (graph: object[]) =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
