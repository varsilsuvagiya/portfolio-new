'use client'

import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { PointerEvent, ReactNode } from 'react'

const spring = { stiffness: 220, damping: 18, mass: 0.3 }

// Pulls its child toward a mouse pointer. Inert for touch/pen input and reduced-motion users.
export default function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const x = useSpring(0, spring)
  const y = useSpring(0, spring)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  )
}
