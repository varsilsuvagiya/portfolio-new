'use client'

import { useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { techIcons } from '../Skills/techIcons'
import { NODE_IDS, type NodeId } from './ArchitectureScene'
import { useCan3D } from './useCan3D'

// Three.js is only downloaded when the scene is actually shown (desktop, WebGL, motion allowed).
const ArchitectureScene = dynamic(() => import('./ArchitectureScene'), { ssr: false })

/**
 * System map: a layer list (always readable, works everywhere) synced with an interactive 3D graph.
 * One layer is always selected, so the technologies are visible without having to discover hover.
 */
export function Architecture3D({
  label,
  hint,
  labels,
  tech,
}: {
  label: string
  hint: string
  labels: Record<NodeId, string>
  tech: Record<NodeId, string[]>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '100px' })
  const can = useCan3D()
  const [active, setActive] = useState<NodeId>('backend')

  return (
    <div ref={ref} className="grid lg:grid-cols-12">
      {/* Layer list */}
      <div className="border-border p-6 md:p-10 lg:col-span-5 lg:border-r">
        <p className="text-accent font-mono text-xs">{label}</p>
        <p className="text-tertiary-content mt-1 text-sm">{hint}</p>

        <ul className="mt-8 space-y-2" role="tablist" aria-label={label}>
          {NODE_IDS.map((id, i) => {
            const on = active === id
            return (
              <li key={id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(id)}
                  onMouseEnter={() => setActive(id)}
                  className={`w-full rounded-2xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                    on ? 'border-accent/30 bg-accent/[0.06]' : 'hover:bg-secondary border-transparent'
                  }`}>
                  <span className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${on ? 'text-accent' : 'text-tertiary-content'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-neutral text-lg font-medium tracking-[-0.01em]">
                      {labels[id]}
                    </span>
                    <span className="text-tertiary-content ml-auto font-mono text-xs">{tech[id].length}</span>
                  </span>
                  {on && (
                    <span className="mt-3 flex flex-wrap gap-1.5 pl-8">
                      {tech[id].map((t) => {
                        const Icon = techIcons[t]?.icon
                        return (
                          <span
                            key={t}
                            className="bg-card border-border text-neutral inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[13px]">
                            {Icon && (
                              <Icon
                                aria-hidden="true"
                                className="size-3.5"
                                style={{ color: techIcons[t]?.color ?? undefined }}
                              />
                            )}
                            {t}
                          </span>
                        )
                      })}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* 3D graph (desktop with WebGL); hidden elsewhere — the list above carries the same content */}
      <div className="relative hidden min-h-[30rem] lg:col-span-7 lg:block">
        {can && <ArchitectureScene labels={labels} active={active} onSelect={setActive} running={inView} />}
        {can === false && (
          <div className="text-tertiary-content absolute inset-0 grid place-items-center p-10 text-center text-sm">
            {labels[active]} — {tech[active].join(' · ')}
          </div>
        )}
      </div>
    </div>
  )
}
