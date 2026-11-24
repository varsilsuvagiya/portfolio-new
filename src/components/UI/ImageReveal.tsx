'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { EASE_OUT_EXPO } from './ScrollReveal'

// Wipes an image in from the bottom when it enters view. No zoom, so screenshots are never cropped.
export default function ImageReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
      className={`relative overflow-hidden ${className}`}>
      {children}
    </motion.div>
  )
}
