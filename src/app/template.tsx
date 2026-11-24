'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// Subtle fade between routes (e.g. switching language). Kept short so it never delays reading.
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}
