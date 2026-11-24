'use client'

import type { Project } from '@/appData/projects'
import type { Dictionary } from '@/dictionaries'
import { pad2 } from '@/utils'
import { ArrowUpRightIcon, PlusIcon } from '@/utils/icons'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PointerEvent, useState } from 'react'

type Item = { project: Project; copy: Dictionary['projects'][keyof Dictionary['projects']] }

const hostOf = (url: string) => new URL(url).host.replace(/^www\./, '')

// Index rows; on mouse devices a preview image follows the pointer over the hovered row.
export default function ProjectIndex({
  items,
  start,
  total,
  dict,
}: {
  items: Item[]
  start: number
  total: string
  dict: Dictionary['work']
}) {
  const [hovered, setHovered] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 })

  const track = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <div onPointerMove={track} onPointerLeave={() => setHovered(null)} className="relative mt-10">
      <ul className="border-border border-t">
        {items.map(({ project, copy }, i) => (
          <li
            key={project.slug}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
            className="border-border border-b"
          >
            <details className="group/row">
              <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-6 md:grid-cols-12 md:gap-x-10 md:py-8 [&::-webkit-details-marker]:hidden">
                <span className="text-tertiary-content font-mono text-xs md:col-span-1">
                  {pad2(start + i + 1)}
                </span>
                <span className="text-neutral group-hover/row:text-accent text-2xl font-semibold tracking-[-0.04em] transition-colors duration-300 md:col-span-5 md:text-4xl">
                  {project.name}
                </span>
                <span className="text-tertiary-content hidden text-lg md:col-span-4 md:block">
                  {copy.tagline}
                </span>
                <span className="text-neutral flex justify-end md:col-span-2">
                  <PlusIcon className="transition-transform duration-300 group-open/row:rotate-45" />
                </span>
              </summary>

              <div className="grid gap-8 pb-10 md:grid-cols-12 md:gap-10">
                {project.image && (
                  <div className="bg-secondary relative aspect-[2/1] md:hidden">
                    <Image
                      src={project.image}
                      alt={dict.screenshotAlt.replace('{name}', project.name)}
                      fill
                      sizes="100vw"
                      className={
                        project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
                      }
                    />
                  </div>
                )}
                <div className="md:col-span-5 md:col-start-2">
                  <p className="text-tertiary-content text-lg md:hidden">{copy.tagline}</p>
                  <p className="text-neutral mt-2 text-lg leading-relaxed text-pretty md:mt-0">
                    {copy.summary}
                  </p>
                  {project.stack.length > 0 && (
                    <p className="mt-6 font-mono text-xs">
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
                    <span className="text-tertiary-content font-mono text-xs">
                      {hostOf(project.url)}
                    </span>
                    <ArrowUpRightIcon />
                  </a>
                </div>
                {copy.highlights.length > 0 && (
                  <ul className="space-y-3 md:col-span-5 md:col-start-8">
                    {copy.highlights.map((h: string) => (
                      <li key={h} className="text-tertiary-content relative pl-5 leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="bg-accent absolute top-[0.75em] left-0 h-px w-2.5"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          </li>
        ))}
      </ul>
      <p className="text-tertiary-content mt-4 text-right font-mono text-xs">/ {total}</p>

      {/* Floating preview (mouse only) */}
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy, translateX: '24px', translateY: '-50%' }}
        animate={{ opacity: hovered === null ? 0 : 1, scale: hovered === null ? 0.92 : 1 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none fixed top-0 left-0 z-30 hidden aspect-[2/1] w-[22rem] overflow-hidden md:block"
      >
        {items.map(({ project }, i) =>
          project.image ? (
            <Image
              key={project.slug}
              src={project.image}
              alt=""
              fill
              sizes="352px"
              className={`bg-secondary transition-opacity duration-300 ${hovered === i ? 'opacity-100' : 'opacity-0'} ${
                project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
              }`}
            />
          ) : null,
        )}
      </motion.div>
    </div>
  )
}
