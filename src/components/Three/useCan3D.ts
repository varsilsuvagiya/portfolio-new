'use client'

import { useEffect, useState } from 'react'

/**
 * Whether to render interactive WebGL: needs WebGL support, a viewport at least `minWidth` wide,
 * and no reduced-motion preference. `null` until checked on the client (render nothing/fallback).
 */
export function useCan3D(minWidth = 768) {
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let webgl = false
    try {
      const c = document.createElement('canvas')
      webgl = !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch {}
    setOk(webgl && !reduce && window.innerWidth >= minWidth)
  }, [minWidth])

  return ok
}
