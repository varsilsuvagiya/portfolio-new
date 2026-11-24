'use client'

import { PointerEvent, ReactNode } from 'react'

// Soft accent light that follows the pointer inside the element. Writes CSS variables only — no re-renders.
export default function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div onPointerMove={onMove} className={`group/spot relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            'radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--a) 9%, transparent), transparent 65%)',
        }}
      />
      {children}
    </div>
  )
}
