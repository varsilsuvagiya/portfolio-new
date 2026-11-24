'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const INTERACTIVE = 'a, button, summary, label, input, textarea, select, [data-cursor]'

// Desktop-only cursor: an instant dot plus a trailing ring that grows over interactive elements.
// Off for touch / coarse pointers and for users who prefer reduced motion (native cursor stays).
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => setHovering(!!(e.target as Element | null)?.closest?.(INTERACTIVE))
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div
        className="bg-accent absolute top-0 left-0 size-1.5 rounded-full"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className={`absolute top-0 left-0 size-9 rounded-full border transition-colors duration-300 ${
          hovering ? 'border-accent bg-accent/10' : 'border-neutral/30'
        }`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: pressed ? 0.8 : hovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </div>
  )
}
