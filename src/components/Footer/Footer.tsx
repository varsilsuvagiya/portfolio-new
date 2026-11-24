import { personal } from '@/appData/personal'
import type { Dictionary } from '@/dictionaries'

type FooterProps = {
  dict: Dictionary
}

const Footer = ({ dict }: FooterProps) => {
  const f = dict.footer
  const nav = (['about', 'expertise', 'work', 'experience', 'contact'] as const).map((id) => ({
    label: dict.navigation[id],
    href: `/#${id}`,
  }))
  const socials = [
    { label: 'GitHub', href: personal.github },
    { label: 'LinkedIn', href: personal.linkedin },
    { label: 'Email', href: `mailto:${personal.email}` },
  ]

  return (
    <footer className="border-border overflow-hidden border-t">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <p className="text-tertiary-content max-w-sm leading-relaxed md:col-span-4">
            {f.description}
          </p>

          <nav aria-label={f.navigation} className="md:col-span-2 md:col-start-7">
            <h2 className="text-tertiary-content font-mono text-[11px] tracking-[0.2em] uppercase">
              {f.navigation}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-neutral hover:text-accent transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="text-tertiary-content font-mono text-[11px] tracking-[0.2em] uppercase">
              {f.socials}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="text-neutral hover:text-accent transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-tertiary-content mt-16 flex flex-col gap-4 font-mono text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {personal.name}. {f.rights}
          </p>
          <a href="#top" className="hover:text-neutral transition-colors">
            {f.backToTop} ↑
          </a>
        </div>

        {/* Oversized wordmark, cropped by the page edge */}
        <p
          aria-hidden="true"
          className="text-neutral mt-10 -mb-[0.22em] text-[19vw] leading-none font-semibold tracking-[-0.07em] whitespace-nowrap select-none md:text-[17.5vw]"
        >
          {personal.name.split(' ')[0]}
          <span className="text-accent">.</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
