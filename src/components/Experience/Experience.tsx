'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import ScrollReveal from '../UI/ScrollReveal'

export interface TimelineEntry {
  id: string
  role: string
  company: string
  location: string
  dates: string
  tech: string[]
  bullets: string[]
}

interface ExperienceProps {
  label: string
  title: string
  entries: TimelineEntry[]
}

// Timeline on the Swiss grid: dates in the rail, a progress line that fills with scroll, content across 9 columns.
const Experience = ({ label, title, entries }: ExperienceProps) => {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" className="border-border border-t py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeading index="04" label={label} title={title} />

        <ol ref={ref} className="relative mt-20 md:mt-32">
          <span aria-hidden="true" className="bg-border absolute top-0 bottom-0 left-[3px] w-px md:left-[25%]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="bg-accent absolute top-0 bottom-0 left-[3px] w-px origin-top md:left-[25%]"
          />

          {entries.map((entry) => (
            <li key={entry.id} className="relative grid gap-5 pb-20 pl-8 last:pb-0 md:grid-cols-12 md:gap-10 md:pb-28 md:pl-0">
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ margin: '0px 0px -45% 0px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-accent absolute top-2 left-0 size-[7px] md:left-[calc(25%-3px)]"
              />

              <ScrollReveal className="md:col-span-3 md:pr-10">
                <p className="text-neutral font-mono text-sm">{entry.dates}</p>
                <p className="text-tertiary-content mt-1 font-mono text-xs">{entry.location}</p>
              </ScrollReveal>

              <ScrollReveal delay={0.08} className="md:col-span-8 md:col-start-5">
                <h3 className="text-neutral text-[clamp(1.9rem,3.6vw,3.25rem)] leading-none font-semibold tracking-[-0.045em]">
                  {entry.role}
                </h3>
                <p className="text-tertiary-content mt-3 text-2xl">{entry.company}</p>
                <ul className="mt-8 grid gap-x-10 gap-y-4 lg:grid-cols-2">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet} className="text-tertiary-content border-border border-t pt-4 leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="text-neutral mt-8 font-mono text-xs">{entry.tech.join(' / ')}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
