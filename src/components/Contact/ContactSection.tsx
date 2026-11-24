import { personal } from '@/appData/personal'
import type { Dictionary } from '@/dictionaries'
import { ArrowUpRightIcon, DownloadIcon } from '@/utils/icons'
import Magnetic from '../UI/Magnetic'
import MaskText from '../UI/MaskText'
import ScrollReveal from '../UI/ScrollReveal'
import ContactForm from './ContactForm'

const ContactSection = ({ dict }: { dict: Dictionary['contact'] }) => {
  const channels = [
    { label: dict.phone, value: personal.phone, href: personal.phoneHref },
    { label: 'LinkedIn', value: 'in/varsil-suvagiya', href: personal.linkedin, external: true },
    { label: 'GitHub', value: personal.githubUser, href: personal.github, external: true },
  ]

  return (
    <section id="contact" className="border-border border-t py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="flex items-baseline gap-4">
          <span className="text-tertiary-content font-mono text-xs">(07)</span>
          <span className="text-neutral text-2xl md:text-3xl">{dict.label}</span>
        </p>

        <h2 className="text-neutral mt-8 text-[clamp(2.9rem,8.5vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.06em] text-balance">
          <MaskText text={dict.title} stagger={0.05} />
        </h2>

        {/* The email is the primary call to action */}
        <ScrollReveal className="mt-14 md:mt-20">
          <a
            href={`mailto:${personal.email}`}
            className="group/mail text-neutral inline-flex max-w-full items-center gap-4 text-[clamp(1.6rem,4.5vw,4rem)] break-all">
            <span className="relative">
              {personal.email}
              <span className="bg-accent absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-700 group-hover/mail:scale-x-0" />
            </span>
            <ArrowUpRightIcon className="size-[0.6em] shrink-0 transition-transform duration-500 group-hover/mail:translate-x-1 group-hover/mail:-translate-y-1" />
          </a>
          <p className="text-tertiary-content mt-6 max-w-xl text-lg">{dict.subtitle}</p>
        </ScrollReveal>

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-10">
          <ScrollReveal className="md:col-span-4">
            <dl className="border-border divide-border divide-y border-y">
              {channels.map((c) => (
                <div key={c.label} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-5">
                  <dt className="text-tertiary-content font-mono text-[11px] tracking-[0.2em] uppercase">{c.label}</dt>
                  <dd>
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-neutral hover:text-accent inline-flex items-center gap-2 transition-colors">
                      {c.value}
                      <ArrowUpRightIcon className="shrink-0" />
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
            <Magnetic className="mt-10">
              <a
                href={personal.resume}
                download={personal.resumeFileName}
                className="bg-secondary-content inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-white">
                <DownloadIcon />
                {dict.resume}
              </a>
            </Magnetic>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="md:col-span-7 md:col-start-6">
            <ContactForm dict={dict} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
