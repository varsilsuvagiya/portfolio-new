'use client'

import { useChat } from '@ai-sdk/react'
import { UIMessage } from 'ai'
import { useEffect, useRef, useState } from 'react'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat()

  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768)
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useEffect(() => {
    const toggle = () => setIsOpen((o) => !o)
    window.addEventListener('portfolio:toggle-chat', toggle)
    return () => window.removeEventListener('portfolio:toggle-chat', toggle)
  }, [])

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('portfolio:chat-state', { detail: isOpen }))
  }, [isOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    sendMessage({ text })
  }

  function getMessageText(m: UIMessage): string {
    return m.parts
      .filter((p) => p.type === 'text')
      .map((p) => (p as { type: 'text'; text: string }).text)
      .join('')
  }

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '5.5rem' : '6.75rem',
            right: isMobile ? '1rem' : '2rem',
            zIndex: 9998,
            width: 'min(380px, calc(100vw - 2rem))',
            height: isMobile ? 'calc(100dvh - 10rem)' : 'min(560px, calc(100dvh - 11rem))',
            background: 'var(--s)',
            border: '1px solid var(--b)',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '0.875rem 1rem',
              background: 'var(--sc)',
              color: 'white',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderRadius: '50%',
                background: 'color-mix(in srgb, var(--p) 20%, transparent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0,
              }}
            >
              🤖
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.2 }}>Varsil&apos;s Assistant</div>
              <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>Ask me anything about the portfolio</div>
            </div>
            <div
              style={{
                marginLeft: 'auto',
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                background: 'var(--a)',
                flexShrink: 0,
              }}
            />
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {messages.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  color: 'var(--tc)',
                  fontSize: '0.82rem',
                  marginTop: '1rem',
                  lineHeight: 1.6,
                }}
              >
                👋 Hi! I&apos;m Varsil&apos;s AI assistant.
                <br />
                Ask me about his skills, projects, or experience!
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '0.6rem 0.9rem',
                    borderRadius: m.role === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                    background: m.role === 'user' ? 'var(--sc)' : 'var(--p)',
                    color: m.role === 'user' ? 'white' : 'var(--n)',
                    fontSize: '0.85rem',
                    lineHeight: 1.55,
                    border: m.role === 'assistant' ? '1px solid var(--b)' : 'none',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {getMessageText(m)}
                </div>
              </div>
            ))}

            {/* Streaming indicator */}
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '0.6rem 0.9rem',
                    borderRadius: '1rem 1rem 1rem 0.25rem',
                    background: 'var(--p)',
                    border: '1px solid var(--b)',
                    display: 'flex',
                    gap: '0.3rem',
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: '0.4rem',
                        height: '0.4rem',
                        borderRadius: '50%',
                        background: 'var(--tc)',
                        display: 'inline-block',
                        animation: `chatBounce 1s ${i * 0.2}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div
                style={{
                  color: 'var(--n)',
                  fontSize: '0.78rem',
                  textAlign: 'center',
                  padding: '0.4rem 0.75rem',
                  background: 'var(--p)',
                  borderRadius: '0.5rem',
                  border: '1px solid var(--b)',
                }}
              >
                ⚠️ Something went wrong. Please try again.
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '0.75rem',
              borderTop: '1px solid var(--b)',
              display: 'flex',
              gap: '0.5rem',
              background: 'var(--s)',
              flexShrink: 0,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              disabled={isLoading}
              autoComplete="off"
              style={{
                flex: 1,
                padding: '0.55rem 0.85rem',
                borderRadius: '0.75rem',
                border: '1px solid var(--b)',
                background: 'var(--p)',
                color: 'var(--n)',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--sc)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--b)')}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              style={{
                padding: '0.55rem 0.75rem',
                borderRadius: '0.75rem',
                background: 'var(--sc)',
                border: 'none',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'opacity 0.15s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Keyframe animation for loading dots */}
      <style>{`
        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  )
}
