// "2026-02" → "Feb 2026" in the visitor's language. UTC avoids month shifts from server timezones.
export const formatMonth = (yearMonth: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${yearMonth}-01T00:00:00Z`),
  )

export const formatRange = (start: string, end: string | null, locale: string, present: string) =>
  `${formatMonth(start, locale)} – ${end ? formatMonth(end, locale) : present}`

export const formatDay = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(iso),
  )

export const pad2 = (n: number) => String(n).padStart(2, '0')
