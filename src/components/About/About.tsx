import type { Dictionary } from '@/dictionaries'
import { pad2 } from '@/utils'
import SectionHeading from '../SectionHeading/SectionHeading'
import ScrollReveal from '../UI/ScrollReveal'
import ScrollText from '../UI/ScrollText'

const About = ({ dict }: { dict: Dictionary['about'] }) => {
  return (
    <section id="about" className="border-border border-t py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeading index="01" label={dict.label} title={dict.title} />

        {/* Statement brightens word by word while scrolling */}
        <div className="mt-20 md:mt-32 md:grid md:grid-cols-12 md:gap-10">
          <ScrollText
            text={dict.body}
            className="text-neutral text-[clamp(1.6rem,3.2vw,2.9rem)] leading-[1.18] font-medium tracking-[-0.025em] md:col-span-9 md:col-start-4"
          />
        </div>

        {/* Capabilities as an editorial index, not cards */}
        <ol className="mt-24 grid gap-x-10 sm:grid-cols-2 md:mt-32 lg:grid-cols-3">
          {dict.pillars.map((pillar, i) => (
            <li key={pillar.title} className="border-border border-t">
              <ScrollReveal delay={(i % 3) * 0.08} className="py-8 pr-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-neutral text-xl font-medium tracking-[-0.02em]">{pillar.title}</h3>
                  <span className="text-tertiary-content font-mono text-xs">{pad2(i + 1)}</span>
                </div>
                <p className="text-tertiary-content mt-3 leading-relaxed">{pillar.text}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default About
