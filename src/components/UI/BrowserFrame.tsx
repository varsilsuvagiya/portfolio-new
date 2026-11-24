import { ReactNode } from 'react'

// Minimal browser window around a real screenshot or live preview. Stays still on hover so the live site can be scrolled.
export default function BrowserFrame({
  host,
  children,
  className = '',
}: {
  host: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`${className}`}>
      <div className="bg-card border-border shadow-soft overflow-hidden rounded-2xl border">
        <div className="border-border flex items-center gap-3 border-b px-4 py-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="bg-secondary text-tertiary-content mx-auto max-w-[70%] truncate rounded-md px-3 py-1 font-mono text-[11px]">
            {host}
          </span>
          <span aria-hidden="true" className="w-[42px]" />
        </div>
        {children}
      </div>
    </div>
  )
}
