import 'server-only'

export type Locale = 'en' | 'es' | 'fr' | 'de' | 'ru'

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  es: () => import('./es.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
  de: () => import('./de.json').then((module) => module.default),
  ru: () => import('./ru.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en()
}
