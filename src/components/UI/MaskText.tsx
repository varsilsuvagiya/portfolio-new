'use client'

import { motion, Variants } from 'framer-motion'
import { Fragment } from 'react'
import { EASE_OUT_EXPO } from './ScrollReveal'

interface MaskTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  /** 'word' (default) or 'char' — char reveals letter by letter, words never break mid-line. */
  by?: 'word' | 'char'
  /** Animate on mount instead of when scrolled into view (used above the fold). */
  onMount?: boolean
}

const piece: Variants = {
  hidden: { y: '115%' },
  show: { y: '0%', transition: { duration: 1, ease: EASE_OUT_EXPO } },
}

// Reveal through a clipping mask. Screen readers get the plain sentence.
export default function MaskText({ text, className, delay = 0, stagger = 0.06, by = 'word', onMount }: MaskTextProps) {
  const words = text.split(' ')
  const trigger = onMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Fragment key={i}>
            {by === 'char' ? (
              <span className="inline-block whitespace-nowrap">
                {[...w].map((c, j) => (
                  <span key={j} className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                    <motion.span className="inline-block will-change-transform" variants={piece}>
                      {c}
                    </motion.span>
                  </span>
                ))}
              </span>
            ) : (
              <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span className="inline-block will-change-transform" variants={piece}>
                  {w}
                </motion.span>
              </span>
            )}
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </motion.span>
  )
}
