import { education } from '@/appData/education'
import { experience } from '@/appData/experience'
import { personal } from '@/appData/personal'
import { projects } from '@/appData/projects'
import { skillGroups } from '@/appData/skills'
import { getDictionary } from '@/dictionaries'
import { defaultLocale } from '@/i18n'
import { WEBSITE_ID, abs, breadcrumbs, identity, jsonLd, personSchema } from '@/lib/site'
import { formatRange } from '@/utils'
import type { Metadata } from 'next'
import Link from 'next/link'

const description = `${identity.name} is a ${identity.jobTitle} based in ${identity.location}, currently a ${experience[0].role} at ${experience[0].company}. Experience, education, skills and projects.`

export const metadata: Metadata = {
  title: { absolute: `About ${identity.name} — ${identity.jobTitle}` },
  description,
  alternates: { canonical: '/about' },
  openGraph: { type: 'profile', url: '/about', title: `About ${identity.name}`, description, images: ['/opengraph-image'] },
}

// Plain, server-rendered profile: every fact is in the HTML (no animation/canvas dependency),
// so search engines and AI search systems can read and cite it.
export default async function AboutPage() {
  const dict = await getDictionary()
  const present = dict.experience.present

  const schema = jsonLd([
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
    {
      '@type': 'ProfilePage',
      '@id': `${abs('/about')}#webpage`,
      url: abs('/about'),
      name: `About ${identity.name}`,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: personSchema,
    },
  ])

  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <article className="mx-auto max-w-3xl px-5 md:px-0">
        <nav aria-label="Breadcrumb" className="text-tertiary-content text-sm">
          <Link href="/" className="hover:text-neutral">
            Home
          </Link>{' '}
          / <span className="text-neutral">About</span>
        </nav>

        <header className="mt-8">
          <h1 className="text-neutral text-[clamp(2.6rem,6vw,4.5rem)] leading-[1] font-semibold tracking-[-0.045em]">
            {identity.name}
          </h1>
          <p className="text-accent mt-4 text-xl font-medium">{identity.jobTitle}</p>
          <p className="text-tertiary-content mt-1">{identity.location}</p>
        </header>

        <section className="mt-12" aria-labelledby="summary">
          <h2 id="summary" className="sr-only">
            Summary
          </h2>
          <p className="text-neutral text-xl leading-relaxed">
            {identity.name} is a {identity.jobTitle.toLowerCase()} based in {identity.location}. He currently works as a{' '}
            {experience[0].role} at {experience[0].company}, building and maintaining production web applications with
            Next.js, Node.js, NestJS, REST APIs, PostgreSQL/Supabase, MongoDB and AWS.
          </p>
          <p className="text-tertiary-content mt-5 text-lg leading-relaxed">{dict.about.body}</p>
        </section>

        <section className="mt-16" aria-labelledby="experience">
          <h2 id="experience" className="text-neutral text-3xl font-semibold tracking-[-0.03em]">
            Experience
          </h2>
          <ol className="mt-6 space-y-10">
            {experience.map((job) => (
              <li key={job.id} className="border-border border-t pt-6">
                <h3 className="text-neutral text-xl font-semibold">
                  {job.role} — {job.company}
                </h3>
                <p className="text-tertiary-content mt-1 font-mono text-sm">
                  {formatRange(job.start, job.end, defaultLocale, present)} · {job.location}
                </p>
                <ul className="text-neutral/85 mt-4 list-disc space-y-2 pl-5 leading-relaxed">
                  {dict.experience.entries[job.id].bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="education">
          <h2 id="education" className="text-neutral text-3xl font-semibold tracking-[-0.03em]">
            Education
          </h2>
          <ul className="mt-6 space-y-6">
            {education.map((e) => (
              <li key={e.id} className="border-border border-t pt-6">
                <h3 className="text-neutral text-xl font-semibold">
                  {e.degree} ({e.short})
                </h3>
                <p className="text-tertiary-content mt-1">
                  {e.institution} · {formatRange(e.start, e.end, defaultLocale, present)} · CGPA {e.cgpa}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="skills">
          <h2 id="skills" className="text-neutral text-3xl font-semibold tracking-[-0.03em]">
            Technical skills
          </h2>
          <dl className="mt-6 space-y-4">
            {skillGroups.map((g) => (
              <div key={g.id} className="border-border grid gap-1 border-t pt-4 sm:grid-cols-3">
                <dt className="text-tertiary-content">{dict.expertise.groups[g.id]}</dt>
                <dd className="text-neutral sm:col-span-2">{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16" aria-labelledby="projects">
          <h2 id="projects" className="text-neutral text-3xl font-semibold tracking-[-0.03em]">
            Projects
          </h2>
          <ul className="mt-6 space-y-4">
            {projects.map((p) => (
              <li key={p.slug} className="border-border border-t pt-4">
                <Link href={`/projects/${p.slug}`} className="text-neutral hover:text-accent font-medium">
                  {p.name}
                </Link>
                <span className="text-tertiary-content"> — {dict.projects[p.slug].tagline}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16" aria-labelledby="profiles">
          <h2 id="profiles" className="text-neutral text-3xl font-semibold tracking-[-0.03em]">
            Official profiles
          </h2>
          <ul className="mt-6 space-y-2">
            <li>
              GitHub:{' '}
              <a href={personal.github} rel="me noopener" target="_blank" className="text-accent hover:underline">
                {personal.github}
              </a>
            </li>
            <li>
              LinkedIn:{' '}
              <a href={personal.linkedin} rel="me noopener" target="_blank" className="text-accent hover:underline">
                {personal.linkedin}
              </a>
            </li>
            <li>
              Email:{' '}
              <a href={`mailto:${personal.email}`} className="text-accent hover:underline">
                {personal.email}
              </a>
            </li>
            <li>
              Resume:{' '}
              <a href={personal.resume} download={personal.resumeFileName} className="text-accent hover:underline">
                Download PDF
              </a>
            </li>
          </ul>
        </section>
      </article>
    </main>
  )
}
