import { projects, type Project } from '@/appData/projects'
import type { Dictionary } from '@/dictionaries'
import { pad2 } from '@/utils'
import { ArrowUpRightIcon, PlusIcon } from '@/utils/icons'
import Image from 'next/image'
import SectionHeading from '../SectionHeading/SectionHeading'
import BrowserFrame from '../UI/BrowserFrame'
import ImageReveal from '../UI/ImageReveal'
import MaskText from '../UI/MaskText'
import Link from 'next/link'
import ScrollReveal from '../UI/ScrollReveal'
import { hostOf } from '@/lib/embed'
import ScrollShot from './ScrollShot'
import ProjectIndex from './ProjectIndex'

type Copy = Dictionary['projects'][keyof Dictionary['projects']]
type WorkDict = Dictionary['work']

function Shot({
  project,
  dict,
  className,
  sizes,
}: {
  project: Project
  dict: WorkDict
  className: string
  sizes: string
}) {
  return (
    <BrowserFrame
      host={hostOf(project.url)}
      className={className.replace(/aspect-\[[^\]]+\]/g, '').trim()}
    >
      <ImageReveal className="bg-secondary aspect-[2/1]">
        {project.fullImage ? (
          <ScrollShot
            {...project.fullImage}
            alt={dict.screenshotAlt.replace('{name}', project.name)}
            sizes="(min-width: 768px) 60vw, 100vw"
          />
        ) : (
          project.image && (
            <Image
              src={project.image}
              alt={dict.screenshotAlt.replace('{name}', project.name)}
              fill
              sizes={sizes}
              className={project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}
            />
          )
        )}
      </ImageReveal>
    </BrowserFrame>
  )
}

function Meta({ project, copy, dict }: { project: Project; copy: Copy; dict: WorkDict }) {
  return (
    <>
      {project.stack.length > 0 && (
        <p className="mt-6 font-mono text-xs tracking-wide">
          <span className="text-tertiary-content mr-3 tracking-[0.18em] uppercase">
            {dict.stack}
          </span>
          <span className="text-neutral">{project.stack.join(' / ')}</span>
        </p>
      )}
      <Link
        href={`/projects/${project.slug}`}
        className="text-accent mt-6 mr-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
      >
        {dict.details} →
      </Link>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/link text-neutral mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium"
      >
        <span className="relative">
          {dict.visit}
          <span className="bg-accent absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover/link:scale-x-100" />
        </span>
        <span className="text-tertiary-content font-mono text-xs">{hostOf(project.url)}</span>
        <ArrowUpRightIcon className="transition-transform duration-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
      </a>
      {copy.highlights.length > 0 && (
        <details className="group/details border-border mt-8 border-t pt-5">
          <summary className="text-neutral flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
            <span>
              {dict.contribution}{' '}
              <span className="text-tertiary-content font-mono text-xs">
                ({copy.highlights.length})
              </span>
            </span>
            <PlusIcon className="shrink-0 transition-transform duration-300 group-open/details:rotate-45" />
          </summary>
          <ul className="mt-5 space-y-3">
            {copy.highlights.map((item: string) => (
              <li key={item} className="text-tertiary-content relative pl-5 leading-relaxed">
                <span
                  aria-hidden="true"
                  className="bg-accent absolute top-[0.75em] left-0 h-px w-2.5"
                />
                {item}
              </li>
            ))}
          </ul>
        </details>
      )}
    </>
  )
}

function Title({
  project,
  copy,
  n,
  total,
}: {
  project: Project
  copy: Copy
  n: number
  total: string
}) {
  return (
    <>
      <p className="text-tertiary-content font-mono text-xs">
        <span className="text-accent">({pad2(n)})</span> — {total}
      </p>
      <h3 className="text-neutral mt-4 text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-balance">
        <MaskText text={project.name} />
      </h3>
      <p className="text-tertiary-content mt-3 text-xl md:text-2xl">{copy.tagline}</p>
    </>
  )
}

// Six featured projects, each in a different composition: full-bleed, split left/right, cinematic wide.
const LAYOUTS = ['full', 'left', 'right', 'wide', 'left', 'right'] as const

const Work = async ({ dict, copy }: { dict: WorkDict; copy: Dictionary['projects'] }) => {
  const total = pad2(projects.length)
  const featured = projects.filter((p) => p.featured)
  const more = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="border-border border-t py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeading index="03" label={dict.label} title={dict.title} subtitle={dict.subtitle} />

        <div className="mt-20 space-y-28 md:mt-32 md:space-y-48">
          {featured.map((project, i) => {
            const c = copy[project.slug]
            const layout = LAYOUTS[i % LAYOUTS.length]

            if (layout === 'full' || layout === 'wide') {
              return (
                <article key={project.slug}>
                  <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-10">
                    <div className="md:col-span-8">
                      <Title project={project} copy={c} n={i + 1} total={total} />
                    </div>
                  </div>
                  <Shot
                    project={project}
                    dict={dict}
                    sizes="(min-width: 1440px) 1360px, 100vw"
                    className="mt-10 aspect-[2/1]"
                  />
                  <ScrollReveal className="mt-10 grid gap-8 md:grid-cols-12 md:gap-10">
                    <p className="text-neutral text-xl leading-relaxed text-pretty md:col-span-6 md:text-2xl md:leading-snug">
                      {c.summary}
                    </p>
                    <div className="md:col-span-5 md:col-start-8">
                      <Meta project={project} copy={c} dict={dict} />
                    </div>
                  </ScrollReveal>
                </article>
              )
            }

            const imageLeft = layout === 'left'
            return (
              <article
                key={project.slug}
                className="grid gap-10 md:grid-cols-12 md:items-end md:gap-10"
              >
                <Shot
                  project={project}
                  dict={dict}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className={`${
                    imageLeft
                      ? 'aspect-[2/1] md:col-span-7'
                      : 'aspect-[2/1] md:order-2 md:col-span-8 md:col-start-5'
                  }`}
                />
                <ScrollReveal className={imageLeft ? 'md:col-span-5' : 'md:order-1 md:col-span-4'}>
                  <Title project={project} copy={c} n={i + 1} total={total} />
                  <p className="text-neutral mt-6 text-lg leading-relaxed text-pretty">
                    {c.summary}
                  </p>
                  <Meta project={project} copy={c} dict={dict} />
                </ScrollReveal>
              </article>
            )
          })}
        </div>

        {/* Remaining work as an editorial index */}
        <div className="mt-32 md:mt-48">
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="text-neutral text-4xl md:text-5xl">{dict.more}</h3>
            <span className="text-tertiary-content font-mono text-xs">
              ({pad2(featured.length + 1)}–{total})
            </span>
          </div>
          <ProjectIndex
            start={featured.length}
            total={total}
            dict={dict}
            items={more.map((p) => ({ project: p, copy: copy[p.slug] }))}
          />
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href={`/projects`}
            className="bg-secondary-content inline-flex h-12 items-center gap-2 rounded-full px-7 text-[15px] font-medium text-white"
          >
            {dict.viewAll} →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Work
