import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

import ChatWidget from '@/components/ChatWidget/ChatWidget'
import FloatingDock from '@/components/UI/FloatingDock'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import TabnavScript from '@/components/TabnavScript/TabnavScript'
import Cursor from '@/components/UI/Cursor'
import MotionProvider from '@/components/UI/MotionProvider'
import { getDictionary } from '@/dictionaries'
import { defaultLocale } from '@/i18n'
import { SITE_URL, abs, identity, jsonLd, personSchema, websiteSchema } from '@/lib/site'
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Child pages set their own title via the template; the homepage uses the default.
  title: { default: identity.title, template: `%s | ${identity.name}` },
  description: identity.description,
  applicationName: `${identity.name} — Portfolio`,
  authors: [{ name: identity.name, url: abs('/about') }],
  creator: identity.name,
  category: 'technology',
  // Only the homepage is canonical to '/'; every other page declares its own canonical.
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: `${identity.name} — Portfolio`,
    title: identity.title,
    description: identity.description,
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', title: identity.title, description: identity.description, images: ['/opengraph-image'] },
  verification: {
    // Set these in the hosting env after adding the site in Google Search Console / Bing Webmaster Tools.
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined,
  },
  other: {
    'google-adsense-account': 'ca-pub-4530721102662876',
  },
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
          dangerouslySetInnerHTML={{ __html: jsonLd([personSchema, websiteSchema]) }}
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
