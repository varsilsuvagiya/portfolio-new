import { projects } from '@/appData/projects'
import ScrollShot from '@/components/Projects/ScrollShot'
import SectionHeading from '@/components/SectionHeading/SectionHeading'
import BrowserFrame from '@/components/UI/BrowserFrame'
import ScrollReveal from '@/components/UI/ScrollReveal'
import { getDictionary } from '@/dictionaries'
import { hostOf } from '@/lib/embed'
import { PERSON_ID, WEBSITE_ID, abs, breadcrumbs, jsonLd } from '@/lib/site'
import { pad2 } from '@/utils'
import { ArrowUpRightIcon } from '@/utils/icons'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const description =
  'Software projects by Varsil Suvagiya, Full-Stack Software Engineer: SaaS platforms, marketplaces, e-commerce and internal systems built with Next.js, Node.js, Laravel and AWS.'

export const metadata: Metadata = {
  title: 'Projects',
  description,
  alternates: { canonical: '/projects' },
  openGraph: { url: '/projects', title: 'Projects — Varsil Suvagiya', description, images: ['/opengraph-image'] },
}

export default async function ProjectsPage() {
  const dict = await getDictionary()
  const total = pad2(projects.length)
  const schema = jsonLd([
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name: dict.work.allTitle, path: '/projects' },
    ]),
    {
      '@type': 'CollectionPage',
      '@id': `${abs('/projects')}#webpage`,
      url: abs('/projects'),
      name: `Projects — Varsil Suvagiya`,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(`/projects/${p.slug}`),
          name: p.name,
        })),
      },
    },
  ])

  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeading
          index={total}
          label={dict.work.label}
          as="h1"
          title={dict.work.allTitle}
          subtitle={dict.work.allSubtitle}
        />

        <ul className="mt-16 grid gap-x-10 gap-y-20 md:mt-24 md:grid-cols-2">
          {projects.map((project, i) => {
            const copy = dict.projects[project.slug]
            const alt = dict.work.screenshotAlt.replace('{name}', project.name)
            return (
              <li key={project.slug}>
                <ScrollReveal delay={(i % 2) * 0.08}>
                  <BrowserFrame host={hostOf(project.url)}>
                    <div className="bg-secondary relative aspect-[2/1]">
                      {project.fullImage ? (
                        <ScrollShot
                          {...project.fullImage}
                          alt={dict.work.screenshotAlt.replace('{name}', project.name)}
                          sizes="(min-width: 768px) 60vw, 100vw"
                        />
                      ) : (
                        project.image && (
                          <Image
                            src={project.image}
                            alt={alt}
                            fill
                            sizes="(min-width: 768px) 45vw, 100vw"
                            className={
                              project.fit === 'contain'
                                ? 'object-contain'
                                : 'object-cover object-top'
                            }
                          />
                        )
                      )}
                    </div>
                  </BrowserFrame>
                  <div className="mt-6 flex items-baseline justify-between gap-6">
                    <h2 className="text-neutral text-3xl font-semibold tracking-[-0.04em]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {project.name}
                      </Link>
                    </h2>
                    <span className="text-tertiary-content shrink-0 font-mono text-xs">
                      {pad2(i + 1)} / {total}
                    </span>
                  </div>
                  <p className="text-tertiary-content mt-2 text-lg">{copy.tagline}</p>
                  <p className="text-neutral/85 mt-4 leading-relaxed text-pretty">{copy.summary}</p>
                  {project.stack.length > 0 && (
                    <p className="text-neutral mt-5 font-mono text-xs">
                      {project.stack.join(' / ')}
                    </p>
                  )}
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-accent inline-flex items-center gap-2 hover:underline"
                    >
                      {dict.work.details} →
                    </Link>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral hover:text-accent inline-flex items-center gap-2 transition-colors"
                    >
                      {dict.work.visit}
                      <ArrowUpRightIcon />
                    </a>
                  </div>
                </ScrollReveal>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
