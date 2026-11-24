'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const offsets = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
}

interface ScrollRevealProps {
  children: ReactNode
  direction?: keyof typeof offsets
  delay?: number
  duration?: number
  className?: string
}

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
      className={className}>
      {children}
    </motion.div>
  )
}
