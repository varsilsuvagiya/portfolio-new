'use client'

import { MoonIcon, SunIcon } from '@/utils/icons'
import { useEffect, useState } from 'react'

// Light/dark switch for the header. The icons swap through the `light:` CSS variant (globals.css),
// so the correct one is visible before hydration — no flash, no hydration mismatch.
const ThemeToggle = ({ label }: { label: string }) => {
  const [isDark, setIsDark] = useState<boolean>()

  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') !== 'light')
  }, [])

  const toggle = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    setIsDark(next === 'dark')
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className="text-tertiary-content hover:text-neutral hover:bg-secondary grid size-11 place-items-center rounded-full transition-colors duration-300">
      <SunIcon className="light:scale-50 light:-rotate-90 light:opacity-0 col-start-1 row-start-1 transition-all duration-500" />
      <MoonIcon className="light:scale-100 light:rotate-0 light:opacity-100 col-start-1 row-start-1 scale-50 rotate-90 opacity-0 transition-all duration-500" />
    </button>
  )
}

export default ThemeToggle
