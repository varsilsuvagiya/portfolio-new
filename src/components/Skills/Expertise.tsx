import { skillGroups } from '@/appData/skills'
import type { Dictionary } from '@/dictionaries'
import { pad2 } from '@/utils'
import SectionHeading from '../SectionHeading/SectionHeading'
import { Architecture3D } from '../Three/Lazy3D'
import { techIcons } from './techIcons'
import ScrollReveal from '../UI/ScrollReveal'

// Typographic index of skills. Hovering a row brings it forward; each technology highlights individually.
const items = (id: string) => [...(skillGroups.find((g) => g.id === id)?.items ?? [])]

// Every technology here appears in the resume (skills section, or the Cloudus role for NestJS / REST APIs).
const tech = {
  frontend: [...items('frontend'), ...items('languages').filter((l) => l !== 'PHP')],
  backend: [...items('backend'), 'NestJS', 'REST APIs'],
  database: items('databases'),
  cloud: items('devops'),
  ai: items('ai'),
}

const Expertise = ({ dict }: { dict: Dictionary['expertise'] }) => {
  return (
    <section id="expertise" className="border-border border-t py-24 md:py-40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHeading index="02" label={dict.label} title={dict.title} subtitle={dict.subtitle} />

        {/* System map: layer list + synced 3D graph */}
        <ScrollReveal className="bg-card border-border shadow-soft mt-16 overflow-hidden rounded-3xl border md:mt-24">
          <Architecture3D
            label={dict.architecture.label}
            hint={dict.architecture.hint}
            labels={dict.architecture.nodes}
            tech={tech}
          />
        </ScrollReveal>

        <ul className="group/list border-border mt-20 border-t md:mt-28">
          {skillGroups.map((group, i) => (
            <li
              key={group.id}
              className="border-border border-b transition-opacity duration-500 group-hover/list:opacity-35 hover:opacity-100!">
              <ScrollReveal
                delay={i * 0.04}
                className="grid gap-4 py-7 md:grid-cols-12 md:items-baseline md:gap-10 md:py-9">
                <div className="flex items-baseline gap-4 md:col-span-4">
                  <span className="text-tertiary-content font-mono text-xs">{pad2(i + 1)}</span>
                  <h3 className="text-neutral text-3xl md:text-4xl">{dict.groups[group.id]}</h3>
                </div>
                <ul className="flex flex-wrap items-center gap-x-2 gap-y-3 md:col-span-8">
                  {group.items.map((skill) => {
                    const tech = techIcons[skill]
                    const Icon = tech?.icon
                    return (
                      <li
                        key={skill}
                        style={{ '--brand': tech?.color ?? 'var(--n)' } as React.CSSProperties}
                        className="group/tech border-border bg-card hover:border-neutral/20 inline-flex cursor-default items-center gap-2.5 rounded-full border py-2 pr-4 pl-3 transition-colors duration-300">
                        {Icon && (
                          <Icon
                            aria-hidden="true"
                            className="text-tertiary-content size-[18px] shrink-0 transition-colors duration-300 group-hover/tech:text-[var(--brand)]"
                          />
                        )}
                        <span className="text-neutral text-base font-medium tracking-[-0.01em] md:text-lg">{skill}</span>
                      </li>
                    )
                  })}
                </ul>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Expertise
