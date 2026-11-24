import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { defaultLocale, retiredLocales } from './i18n'

// The site lives at the root (English only). Old language-prefixed URLs (/en, /de, /es/...) redirect permanently.
const OLD_PREFIXES = [defaultLocale, ...retiredLocales]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, first] = pathname.split('/')
  if (!OLD_PREFIXES.includes(first)) return NextResponse.next()

  request.nextUrl.pathname = pathname.slice(first.length + 1) || '/'
  return NextResponse.redirect(request.nextUrl, 308)
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (images, PDFs, …).
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
