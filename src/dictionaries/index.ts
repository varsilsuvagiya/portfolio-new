import 'server-only'

import en from './en.json'
import type { Locale } from '@/i18n'

export type { Locale }
export type Dictionary = typeof en

// Single language: the locale argument is accepted for call-site compatibility only.
export const getDictionary = async (...args: [Locale?]): Promise<Dictionary> => (void args, en)
