'use client'

import { personal } from '@/appData/personal'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import { EASE_OUT_EXPO } from './ScrollReveal'

const WHATSAPP_MESSAGE = "Hi Varsil, I visited your portfolio and I'd like to connect."

// One contact button (bottom right) that fans out WhatsApp and the AI assistant.
// Keeps the corner clean instead of a column of round buttons. Back-to-top appears above it after scrolling.
export default function FloatingDock() {
  const [open, setOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setShowTop(y > 700))

  useEffect(() => {
    const onState = (e: Event) => setChatOpen((e as CustomEvent<boolean>).detail)
    window.addEventListener('portfolio:chat-state', onState)
    return () => window.removeEventListener('portfolio:chat-state', onState)
  }, [])

  // close the menu on outside click / Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggleChat = () => window.dispatchEvent(new Event('portfolio:toggle-chat'))
  const mainClick = () => (chatOpen ? toggleChat() : setOpen((o) => !o))
  const active = open || chatOpen

  const actions = [
    {
      label: 'WhatsApp',
      icon: <FaWhatsapp className="size-[18px]" />,
      tone: 'bg-[#25d366] text-white',
      href: `https://wa.me/${personal.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
      external: true,
    },
    {
      label: 'AI assistant',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
      tone: 'bg-accent text-white',
      onClick: () => {
        setOpen(false)
        toggleChat()
      },
    },
  ]

  return (
    <div ref={ref} className="fixed right-5 bottom-5 z-[9990] flex flex-col items-end gap-3 md:right-8 md:bottom-8">
      <AnimatePresence>
        {showTop && !active && (
          <motion.button
            key="top"
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="bg-card border-border text-tertiary-content hover:text-neutral mr-1.5 grid size-11 place-items-center rounded-full border shadow-sm transition-colors">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        )}

        {open && (
          <motion.ul
            key="menu"
            id="contact-menu"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
            className="bg-card border-border shadow-soft origin-bottom-right overflow-hidden rounded-2xl border p-1.5">
            {actions.map((a) => {
              const inner = (
                <>
                  <span className={`grid size-9 place-items-center rounded-full ${a.tone}`}>{a.icon}</span>
                  <span className="text-neutral pr-3 text-[15px] font-medium">{a.label}</span>
                </>
              )
              const cls = 'hover:bg-secondary flex w-full items-center gap-3 rounded-xl p-1.5 transition-colors'
              return (
                <li key={a.label}>
                  {a.href ? (
                    <a
                      href={a.href}
                      {...(a.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={() => setOpen(false)}
                      className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <button type="button" onClick={a.onClick} className={cls}>
                      {inner}
                    </button>
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={mainClick}
        aria-expanded={open}
        aria-controls="contact-menu"
        aria-label={chatOpen ? 'Close chat' : open ? 'Close contact menu' : 'Contact options'}
        className="bg-secondary-content grid size-14 place-items-center rounded-full text-white shadow-[0_12px_30px_-10px_rgba(54,92,245,0.65)] transition-transform duration-300 hover:scale-105">
        <span className="relative grid size-6 place-items-center">
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`absolute transition-all duration-300 ${active ? 'scale-50 rotate-90 opacity-0' : 'opacity-100'}`}>
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10v2H7V9zm6 5H7v-2h6v2zm4-6H7V6h10v2z" />
          </svg>
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className={`absolute transition-all duration-300 ${active ? 'opacity-100' : 'scale-50 -rotate-90 opacity-0'}`}>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </span>
      </button>
    </div>
  )
}
