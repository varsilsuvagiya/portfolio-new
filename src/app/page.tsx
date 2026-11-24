import { experience } from '@/appData/experience'
import About from '@/components/About/About'
import ContactSection from '@/components/Contact/ContactSection'
import Education from '@/components/Education/Education'
import Experience from '@/components/Experience/Experience'
import GithubActivity from '@/components/Github/GithubActivity'
import Hero from '@/components/Hero/Hero'
import Work from '@/components/Projects/Work'
import Expertise from '@/components/Skills/Expertise'
import { getDictionary } from '@/dictionaries'
import { defaultLocale } from '@/i18n'
import { formatRange } from '@/utils'

export default async function Home() {
  const locale = defaultLocale
  const dict = await getDictionary()

  const timeline = experience.map((job) => ({
    id: job.id,
    role: job.role,
    company: job.company,
    location: job.location,
    tech: [...job.tech],
    dates: formatRange(job.start, job.end, locale, dict.experience.present),
    bullets: dict.experience.entries[job.id].bullets,
  }))

  return (
    <main id="main">
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Expertise dict={dict.expertise} />
      <Work dict={dict.work} copy={dict.projects} />
      <Experience label={dict.experience.label} title={dict.experience.title} entries={timeline} />
      <Education dict={dict.education} locale={locale} present={dict.experience.present} />
      <GithubActivity dict={dict.github} locale={locale} />
      <ContactSection dict={dict.contact} />
    </main>
  )
}
