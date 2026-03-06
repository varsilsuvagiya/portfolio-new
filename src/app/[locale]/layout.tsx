import type { Metadata } from 'next'
import '../globals.css'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import CursorFollower from '@/components/UI/CursorFollower'
import ThemeMenu from '@/components/Theme/ThemeMenu'
import { getDictionary, Locale } from '@/dictionaries'
import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

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
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)
  return (
    <html lang={locale} data-theme="dark">
      <body className={`${firaCode.className}`}>
        <header>
          <Navbar dict={dict.navigation} locale={locale} />
        </header>
        {children}
        <CursorFollower />
        <ThemeMenu />
        <Footer dict={dict.navigation} locale={locale} />
      </body>
    </html>
  )
}
