// The site is English-only and served from the root (no language prefix in URLs).
export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

// Languages the site used to offer — their URLs now redirect to English.
export const retiredLocales = ['es', 'fr', 'de', 'ru']
