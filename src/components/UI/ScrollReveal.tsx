'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null)
  
  // Trigger animation when the component is vertically mostly in view
  const isInView = useInView(ref, { once, margin: '-10% 0px' })

  const getVariants = () => {
    switch (direction) {
      case 'up':
        return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }
      case 'down':
        return { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } }
      case 'left':
        return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }
      case 'right':
        return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }
      case 'none':
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } }
      default:
        return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }
    }
  }

  const variants = getVariants()

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
