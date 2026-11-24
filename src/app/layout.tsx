import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

import { education } from '@/appData/education'
import { experience } from '@/appData/experience'
import { personal } from '@/appData/personal'
import { skillGroups } from '@/appData/skills'
import ChatWidget from '@/components/ChatWidget/ChatWidget'
import FloatingDock from '@/components/UI/FloatingDock'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import TabnavScript from '@/components/TabnavScript/TabnavScript'
import Cursor from '@/components/UI/Cursor'
import MotionProvider from '@/components/UI/MotionProvider'
import { getDictionary } from '@/dictionaries'
import { defaultLocale } from '@/i18n'
import { Fira_Code, Geist, Inter } from 'next/font/google'

// Geist: all text. Inter: Cyrillic fallback only (Geist has none).
const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist', display: 'swap' })
const inter = Inter({ subsets: ['cyrillic'], variable: '--font-inter', display: 'swap' })
const firaCode = Fira_Code({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-fira',
  display: 'swap',
})

const title = 'Varsil Suvagiya | Full-Stack Web Developer in Surat'

const description =
  "Skilled full-stack web developer in Surat. I build responsive, user-friendly websites with React, NextJS, and NodeJS. Let's bring your vision to life. Hire me today!"

const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const siteUrl = new URL(url)

export const metadata: Metadata = {
  title,
  description,
  category: 'technology',
  metadataBase: siteUrl,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: 'Varsil Suvagiya Portfolio',
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@VarsilSuvagiya',
  },
  other: {
    'google-adsense-account': 'ca-pub-4530721102662876',
  },
}

// Structured data generated from the same source files as the page content.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personal.name,
  url,
  email: `mailto:${personal.email}`,
  jobTitle: experience[0].role,
  worksFor: { '@type': 'Organization', name: experience[0].company },
  alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
  address: {
    '@type': 'PostalAddress',
    addressLocality: personal.address.city,
    addressRegion: personal.address.region,
    addressCountry: personal.address.country,
  },
  sameAs: [personal.github, personal.linkedin],
  knowsAbout: skillGroups.flatMap((g) => g.items),
}

// Applies the saved theme before first paint so dark mode doesn't flash light. Unknown/stale values keep the light default.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = defaultLocale
  const dict = await getDictionary()
  return (
    <html lang={locale} data-theme="light" className={`${geist.variable} ${inter.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4530721102662876"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <a
          href="#main"
          className="bg-neutral text-primary sr-only z-[60] rounded-full px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          {dict.navigation.skip}
        </a>
        <MotionProvider>
          <Navbar dict={dict.navigation} />
          {children}
          <Footer dict={dict} />
          <Cursor />
        </MotionProvider>
        <FloatingDock />
        <ChatWidget />
        <TabnavScript />
      </body>
    </html>
  )
}
