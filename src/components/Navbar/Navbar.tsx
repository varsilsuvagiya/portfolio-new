'use client'

import type { Dictionary } from '@/dictionaries'
import { BurgerIcon, CloseIcon } from '@/utils/icons'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeToggle from '../Theme/ThemeToggle'
import { EASE_OUT_EXPO } from '../UI/ScrollReveal'

const SECTIONS = ['about', 'expertise', 'work', 'experience', 'contact'] as const

type NavbarProps = {
  dict: Dictionary['navigation']
}

// Minimal floating pill: transparent at the top, frosted once scrolled; active section gets a sliding highlight.
const Navbar = ({ dict }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const items = SECTIONS.map((id) => ({ id, label: dict[id], href: `/#${id}` }))

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT_EXPO }}
        className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5">
        <nav
          aria-label="Primary"
          className={`pointer-events-auto flex w-full max-w-[1440px] items-center justify-between rounded-full border py-1.5 pr-1.5 pl-5 transition-[background-color,border-color,box-shadow] duration-500 md:w-auto md:justify-start md:gap-2 ${
            scrolled || open
              ? 'bg-primary/75 border-border shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl'
              : 'border-transparent'
          }`}>
          <Link href="/" className="text-neutral flex items-center gap-2 pr-2 font-mono text-sm">
            <span aria-hidden="true" className="bg-accent size-1.5 rounded-full" />
            <span>varsil.suvagiya</span>
          </Link>

          <span aria-hidden="true" className="bg-border hidden h-4 w-px md:block" />

          <ul className="hidden items-center md:flex">
            {items.map(({ id, label, href }) => (
              <li key={id} className="relative">
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="bg-secondary absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={href}
                  aria-current={active === id ? 'location' : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active === id ? 'text-neutral' : 'text-tertiary-content hover:text-neutral'
                  }`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            <ThemeToggle label={dict.theme} />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.close : dict.menu}
              className="text-neutral grid size-11 place-items-center md:hidden">
              {open ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-primary fixed inset-0 z-40 overflow-y-auto px-5 pt-24 md:hidden">
            <ul className="flex flex-col">
              {items.map(({ id, label, href }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: EASE_OUT_EXPO }}
                  className="border-border border-b">
                  <a
                    href={href}
                    onClick={() => setOpen(false)}
                    className="text-neutral flex items-baseline justify-between py-5 text-4xl font-semibold tracking-[-0.04em]">
                    {label}
                    <span className="text-tertiary-content font-mono text-xs">({String(i + 1).padStart(2, '0')})</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
