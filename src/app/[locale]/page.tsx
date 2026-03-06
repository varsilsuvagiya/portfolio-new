import ContactSection from '@/components/Contact/ContactSection'
import Experience from '@/components/Experience/Experience'
import Hero from '@/components/Hero/Hero'
import ProjectSection from '@/components/Projects/ProjectSection'
import ServiceSection from '@/components/Services/ServiceSection'
import Skills from '@/components/Skills/Skills'
import TestimonialSection from '@/components/Testimonials/TestimonialSection'
import ScrollReveal from '@/components/UI/ScrollReveal'
import { getAllProjects, getAllTestimonials } from '@/services'

import { getDictionary, Locale } from '@/dictionaries'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  const projects = await getAllProjects()
  const testimonials = await getAllTestimonials()
  const { experienceData } = await import('@/appData')

  return (
    <main>
      <Hero dict={dict.hero} />
      <ScrollReveal>
        <Skills dict={dict.skills} />
      </ScrollReveal>
      <Experience data={experienceData} dict={dict.experience} />
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <ScrollReveal duration={0.6}>
          <ProjectSection projects={projects} dict={dict.projects} />
        </ScrollReveal>
        <ScrollReveal duration={0.6}>
          <ServiceSection dict={dict.services} />
        </ScrollReveal>
        <ScrollReveal duration={0.6}>
          <TestimonialSection testimonials={testimonials} dict={dict.testimonials} />
        </ScrollReveal>
        <ScrollReveal duration={0.6}>
          <ContactSection dict={dict.contact} />
        </ScrollReveal>
      </div>
    </main>
  )
}
