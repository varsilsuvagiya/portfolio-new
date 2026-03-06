'use client'

import React from 'react'
import ScrollReveal from '../UI/ScrollReveal'

interface ExperienceItem {
  type: 'experience' | 'education'
  title: string
  company: string
  date: string
  description: string
}

interface ExperienceProps {
  data: ExperienceItem[]
  dict: Record<string, string>
}

const Experience: React.FC<ExperienceProps> = ({ data, dict }) => {
  return (
    <section className="py-12 md:py-20" id="experience">
      <div className="mx-auto max-w-[1200px] px-4">
        <ScrollReveal>
          <h2 className="text-secondary-content mb-12 text-center text-3xl font-bold md:text-4xl">
            {dict.title}
          </h2>
        </ScrollReveal>

        <div className="relative mx-auto mt-12 max-w-4xl px-4 md:mt-20">
          {/* Vertical Line */}
          <div className="bg-border absolute top-0 bottom-0 left-4 w-0.5 md:left-1/2 md:-translate-x-1/2"></div>

          <div className="space-y-12 md:space-y-24">
            {data.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={index} className="relative">
                  {/* Dot */}
                  <div className="bg-accent absolute top-1 left-[15px] z-10 size-4 -translate-x-1/2 rounded-full border-4 border-primary ring-2 ring-primary md:left-1/2"></div>

                  <ScrollReveal direction={isEven ? 'right' : 'left'} delay={index * 0.1}>
                    <div className={`flex w-full flex-col md:flex-row ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                      <div className={`md:w-5/12 ml-8 md:ml-0 ${isEven ? 'md:text-right md:mr-12' : 'md:text-left md:ml-12'}`}>
                        <div className="bg-secondary border-border rounded-2xl border p-6 shadow-sm transition-all hover:border-accent/50">
                          <span className="text-accent mb-2 block text-sm font-semibold uppercase tracking-wider">
                            {item.date}
                          </span>
                          <h3 className="text-secondary-content text-xl font-bold">
                            {item.title}
                          </h3>
                          <p className="text-tertiary-content mb-3 text-base">
                            {item.company}
                          </p>
                          <p className="text-neutral text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
