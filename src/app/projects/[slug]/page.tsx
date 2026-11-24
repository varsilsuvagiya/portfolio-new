import { projects } from '@/appData/projects'
import ScrollShot from '@/components/Projects/ScrollShot'
import BrowserFrame from '@/components/UI/BrowserFrame'
import MaskText from '@/components/UI/MaskText'
import ScrollReveal from '@/components/UI/ScrollReveal'
import { getDictionary } from '@/dictionaries'
import { hostOf } from '@/lib/embed'
import { PERSON_ID, WEBSITE_ID, abs, breadcrumbs, jsonLd } from '@/lib/site'
import { pad2 } from '@/utils'
import { ArrowUpRightIcon } from '@/utils/icons'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Params = Promise<{ slug: string }>

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const dict = await getDictionary()
  const copy = dict.projects[project.slug]
  const path = `/projects/${project.slug}`
  const title = `${project.name} — ${copy.tagline}`
  return {
    title,
    description: copy.summary,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title, description: copy.summary, images: ['/opengraph-image'] },
  }
}

// Full case study for one project: auto-scrolling capture (or screenshot), summary, every contribution, stack, link.
export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  const project = projects[index]
  const dict = await getDictionary()
  const copy = dict.projects[project.slug]
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const alt = dict.work.screenshotAlt.replace('{name}', project.name)
  const path = `/projects/${project.slug}`
  const schema = jsonLd([
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name: dict.work.allTitle, path: '/projects' },
      { name: project.name, path },
    ]),
    {
      '@type': 'WebPage',
      '@id': `${abs(path)}#webpage`,
      url: abs(path),
      name: `${project.name} — ${copy.tagline}`,
      description: copy.summary,
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
      about: {
        '@type': 'CreativeWork',
        name: project.name,
        description: copy.summary,
        url: project.url,
        creator: { '@id': PERSON_ID },
        ...(project.stack.length ? { keywords: project.stack.join(', ') } : {}),
        ...(project.image ? { image: abs(project.image) } : {}),
      },
    },
  ])

  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
      <article className="mx-auto max-w-[1440px] px-5 md:px-10">
        <Link
          href={`/projects`}
          className="text-tertiary-content hover:text-neutral inline-flex items-center gap-2 text-sm transition-colors"
        >
          ← {dict.work.back}
        </Link>

        <header className="mt-10 grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-8">
            <p className="text-accent font-mono text-xs">
              {pad2(index + 1)} / {pad2(projects.length)}
            </p>
            <h1 className="text-neutral mt-4 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-balance">
              <MaskText text={project.name} onMount />
            </h1>
            <p className="text-tertiary-content mt-4 text-xl md:text-2xl">{copy.tagline}</p>
            <p className="text-tertiary-content mt-4 text-sm">
              Case study by{' '}
              <Link href="/about" className="text-neutral hover:text-accent underline-offset-4 hover:underline">
                Varsil Suvagiya
              </Link>
              , Full-Stack Software Engineer
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary-content inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-white"
            >
              {dict.work.visit}
              <ArrowUpRightIcon />
            </a>
            <p className="text-tertiary-content mt-3 font-mono text-xs">{hostOf(project.url)}</p>
          </div>
        </header>

        <ScrollReveal className="mt-12 md:mt-16">
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
                    priority
                    sizes="(min-width: 1440px) 1360px, 100vw"
                    className={
                      project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
                    }
                  />
                )
              )}
            </div>
          </BrowserFrame>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
          <aside className="space-y-8 md:col-span-4">
            <div>
              <h2 className="text-tertiary-content font-mono text-[11px] tracking-[0.18em] uppercase">
                {dict.work.overview}
              </h2>
              <p className="text-neutral mt-3 text-lg leading-relaxed">{copy.summary}</p>
            </div>
            {project.stack.length > 0 && (
              <div>
                <h2 className="text-tertiary-content font-mono text-[11px] tracking-[0.18em] uppercase">
                  {dict.work.stack}
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <li
                      key={t}
                      className="bg-card border-border text-neutral rounded-full border px-3 py-1 font-mono text-xs"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {copy.highlights.length > 0 && (
            <section className="md:col-span-7 md:col-start-6">
              <h2 className="text-neutral text-3xl font-semibold tracking-[-0.03em]">
                {dict.work.contribution}
              </h2>
              <ol className="mt-8">
                {copy.highlights.map((h: string, i: number) => (
                  <li
                    key={h}
                    className="border-border grid grid-cols-[3rem_1fr] gap-4 border-t py-6"
                  >
                    <span className="text-accent font-mono text-sm">{pad2(i + 1)}</span>
                    <p className="text-neutral/85 text-lg leading-relaxed">{h}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <nav
          aria-label="Projects"
          className="border-border mt-24 grid gap-6 border-t pt-10 md:grid-cols-2"
        >
          <Link href={`/projects/${prev.slug}`} className="group/p">
            <p className="text-tertiary-content font-mono text-xs">← {dict.work.previous}</p>
            <p className="text-neutral group-hover/p:text-accent mt-2 text-2xl font-semibold tracking-[-0.03em] transition-colors">
              {prev.name}
            </p>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group/n md:text-right">
            <p className="text-tertiary-content font-mono text-xs">{dict.work.next} →</p>
            <p className="text-neutral group-hover/n:text-accent mt-2 text-2xl font-semibold tracking-[-0.03em] transition-colors">
              {next.name}
            </p>
          </Link>
        </nav>
      </article>
    </main>
  )
}
