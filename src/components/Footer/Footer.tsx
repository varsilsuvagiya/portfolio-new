import { languages } from '@/appData'
import { socials } from '@/appData/personal'
import Logo from '../Navbar/Logo'
import Link from 'next/link'

type FooterProps = {
  dict: Record<string, string>
  locale: string
}

const Footer = ({ dict, locale }: FooterProps) => {
  const footerLinks = [
    { title: dict.projects || 'Projects', href: `/${locale}/#projects` },
    { title: dict.experience || 'Experience', href: `/${locale}/#experience` },
    { title: dict.services || 'Services', href: `/${locale}/#services` },
    { title: dict.testimonials || 'Testimonials', href: `/${locale}/#testimonials` },
  ]

  return (
    <footer className="bg-secondary relative flex flex-col gap-10 overflow-hidden px-6 py-12 md:px-16 md:py-16">
      <div className="relative z-20 flex flex-col justify-between gap-10 md:flex-row md:items-start">
        <div className="max-w-md">
          <h5 className="mb-4 flex items-center gap-2">
            <Logo width={30} height={24} />
            <span className="text-neutral text-xl font-semibold tracking-tight">Varsil_Suvagiya</span>
          </h5>
          <p className="text-tertiary-content text-sm leading-relaxed">
            Building robust and scalable web applications with a focus on modern 
            technologies and exceptional user experiences. Transforming ideas into 
            elegant digital solutions.
          </p>
          <div className="mt-8">
            <h5 className="text-neutral mb-3 text-sm font-medium uppercase tracking-wider">Socials</h5>
            <ul className="flex gap-5">
              {socials.map((item, index) => (
                <li key={index} className="transition-transform duration-300 hover:-translate-y-1">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral transition-colors hover:text-neutral/70 block">
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:gap-20">
          <div>
            <h5 className="text-neutral mb-5 text-sm font-medium uppercase tracking-wider">Navigation</h5>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.href}
                  className="text-tertiary-content hover:text-neutral text-sm transition-colors duration-300">
                  {link.title}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-neutral mb-5 text-sm font-medium uppercase tracking-wider">Contact</h5>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:varsilsuvagiya@gmail.com"
                className="text-tertiary-content hover:text-neutral text-sm transition-colors duration-300">
                varsilsuvagiya@gmail.com
              </a>
              <a
                href="tel:+919664976355"
                className="text-tertiary-content hover:text-neutral text-sm transition-colors duration-300">
                +91 9664976355
              </a>
              <address className="text-tertiary-content not-italic text-sm">
                Surat, Gujarat, India
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mt-10 flex flex-col items-center justify-between border-t border-neutral/10 pt-8 md:flex-row">
        <p className="text-tertiary-content mb-4 text-xs md:mb-0" suppressHydrationWarning>
          © {new Date().getFullYear()} — <span className="font-medium text-neutral">Varsil Suvagiya</span>. All Rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <p className="text-neutral text-xs font-medium uppercase tracking-wider">Languages</p>
          <div className="flex gap-4">
            {languages.map((language) => (
              <Link
                key={language}
                href={`/${language.toLowerCase()}`}
                className={`text-xs transition-colors duration-300 ${
                  locale === language.toLowerCase() 
                    ? 'font-semibold text-neutral underline underline-offset-4' 
                    : 'text-tertiary-content hover:text-neutral'
                }`}>
                {language}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="bg-neutral/5 absolute -right-20 -bottom-20 z-0 h-64 w-64 rounded-full blur-3xl" />
      <div className="bg-neutral/5 absolute -left-20 -top-20 z-0 h-64 w-64 rounded-full blur-3xl" />
    </footer>
  )
}

export default Footer
