import { education } from '@/appData/education'
import type { Dictionary } from '@/dictionaries'
import { formatRange } from '@/utils'
import SectionHeading from '../SectionHeading/SectionHeading'
import ScrollReveal from '../UI/ScrollReveal'

type EducationProps = {
  dict: Dictionary['education']
  locale: string
  present: string
}

// Degrees as typographic specimens — the CGPA is the hero number.
const Education = ({ dict, locale, present }: EducationProps) => {
  return (
    <section id="education" className="border-border border-t py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeading index="05" label={dict.label} title={dict.title} />

        <ul className="mt-20 grid gap-x-10 md:mt-28 md:grid-cols-12">
          {education.map((item, i) => (
            <li key={item.id} className={`border-border border-t ${i === 0 ? 'md:col-span-6' : 'md:col-span-5 md:col-start-8'}`}>
              <ScrollReveal delay={i * 0.1} className="py-8">
                <div className="flex items-start justify-between gap-6">
                  <p className="text-neutral text-5xl md:text-6xl">{item.short}</p>
                  <p className="text-tertiary-content pt-3 font-mono text-xs">
                    {formatRange(item.start, item.end, locale, present)}
                  </p>
                </div>
                <p className="text-neutral mt-10 flex items-baseline gap-3">
                  <span className="text-[clamp(4rem,9vw,8rem)] leading-none font-semibold tracking-[-0.06em] tabular-nums">
                    {item.cgpa}
                  </span>
                  <span className="text-tertiary-content font-mono text-xs tracking-[0.2em] uppercase">{dict.cgpa}</span>
                </p>
                <h3 className="text-neutral mt-8 text-xl font-medium tracking-[-0.02em]">{item.degree}</h3>
                <p className="text-tertiary-content mt-1">{item.institution}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Education
