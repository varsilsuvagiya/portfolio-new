'use client'

import { experience } from '@/appData/experience'
import { personal } from '@/appData/personal'
import type { Dictionary } from '@/dictionaries'
import { ArrowUpRightIcon, DownloadIcon, GithubIcon, LinkedIn } from '@/utils/icons'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import Magnetic from '../UI/Magnetic'
import MaskText from '../UI/MaskText'
import { EASE_OUT_EXPO } from '../UI/ScrollReveal'

const current = experience[0]
const [firstName, ...rest] = personal.name.toUpperCase().split(' ')
const lastName = rest.join(' ')

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
})

type HeroProps = {
  dict: Dictionary['hero']
}

const Hero = ({ dict }: HeroProps) => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Swiss column grid — draws in once, one line carries a slow light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto grid w-full max-w-[1440px] grid-cols-4 px-5 md:grid-cols-12 md:px-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.6, delay: 0.04 * i, ease: EASE_OUT_EXPO }}
            className={`border-border relative origin-top overflow-hidden border-l ${i >= 4 ? 'hidden md:block' : ''} ${
              i === 3 ? 'border-r md:border-r-0' : ''
            } ${i === 11 ? 'border-r' : ''}`}>
            {i === 8 && (
              <span className="via-accent animate-scan absolute top-0 -left-px hidden h-48 w-px bg-gradient-to-b from-transparent to-transparent md:block" />
            )}
          </motion.span>
        ))}
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-between px-5 pt-28 pb-10 md:px-10 md:pt-32">
        {/* Metadata row */}
        <motion.dl {...fadeUp(0.3)} className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-3">
            <dt className="text-tertiary-content font-mono text-[11px] tracking-[0.18em] uppercase">{dict.currently}</dt>
            <dd className="text-neutral mt-2 leading-snug">
              {current.role}
              <br />
              <span className="text-tertiary-content">{current.company}</span>
            </dd>
          </div>
          <div className="md:col-span-3">
            <dt className="sr-only">Location</dt>
            <dd className="text-neutral leading-snug md:mt-[1.6rem]">{dict.location}</dd>
          </div>
          <div className="col-span-2 md:col-span-3 md:col-start-10 md:text-right">
            <a
              href={personal.resume}
              download={personal.resumeFileName}
              className="group/cv text-neutral inline-flex items-center gap-2 md:mt-[1.6rem]">
              <DownloadIcon />
              <span className="relative">
                {dict.downloadResume}
                <span className="bg-accent absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover/cv:scale-x-100" />
              </span>
            </a>
          </div>
        </motion.dl>

        {/* Name — dominates the composition */}
        <h1 className="my-14 md:my-10">
          <span className="sr-only">
            {personal.name} — {dict.role}
          </span>
          <motion.span
            aria-hidden="true"
            style={{ y: nameY }}
            className="text-neutral block text-[17vw] leading-[0.84] font-semibold tracking-[-0.065em] md:text-[clamp(3.6rem,14vw,13rem)]">
            <MaskText text={firstName} by="char" onMount delay={0.35} stagger={0.05} className="block" />
            <MaskText text={lastName} by="char" onMount delay={0.6} stagger={0.05} className="block md:pl-[16.666%]" />
          </motion.span>
        </h1>

        {/* Role, statement, actions — offset to the right half */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <motion.a
            href="/#about"
            {...fadeUp(1.4)}
            className="text-tertiary-content hover:text-neutral hidden items-end gap-3 self-end font-mono text-[11px] tracking-[0.2em] uppercase transition-colors md:col-span-3 md:flex">
            <span aria-hidden="true" className="border-border flex h-10 w-6 justify-center rounded-full border pt-2">
              <span className="bg-accent animate-scroll-dot block h-1.5 w-0.5 rounded-full" />
            </span>
            {dict.scroll}
          </motion.a>

          <div className="md:col-span-6 md:col-start-7">
            <motion.p
              {...fadeUp(0.95)}
              className="text-neutral flex items-start gap-3 text-3xl font-medium tracking-[-0.02em] md:text-[2.4rem] md:leading-tight">
              <span aria-hidden="true" className="bg-accent mt-[0.5em] size-2 shrink-0" />
              {dict.role}
            </motion.p>
            <motion.p {...fadeUp(1.05)} className="text-tertiary-content mt-5 max-w-lg text-lg text-pretty">
              {dict.description}
            </motion.p>

            <motion.div {...fadeUp(1.2)} className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-3">
              <Magnetic>
                <Link
                  href="/#work"
                  className="group/btn bg-neutral text-primary inline-flex h-14 items-center gap-3 px-7 text-sm font-medium">
                  {dict.viewProjects}
                  <ArrowUpRightIcon className="rotate-90 transition-transform duration-500 group-hover/btn:translate-y-0.5" />
                </Link>
              </Magnetic>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tertiary-content hover:text-neutral inline-flex h-14 items-center gap-2 px-4 text-sm transition-colors">
                <LinkedIn className="size-4" />
                {dict.linkedIn}
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tertiary-content hover:text-neutral inline-flex h-14 items-center gap-2 px-4 text-sm transition-colors">
                <GithubIcon className="size-4" />
                {dict.github}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
