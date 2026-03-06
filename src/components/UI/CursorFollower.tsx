'use client'

import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CursorFollower = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add smoothing to the motion
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] size-[250px] rounded-full opacity-50 blur-[60px] md:opacity-60"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, var(--a) 0%, transparent 70%)',
      }}
    />
  )
}

export default CursorFollower
