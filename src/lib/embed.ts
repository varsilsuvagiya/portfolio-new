export const hostOf = (url: string) => new URL(url).host.replace(/^www\./, '')
