import { ImageResponse } from 'next/og'

// Social preview (Open Graph + Twitter fallback). Same identity as the site.
// Edge runtime: next/og loads its bundled font reliably there (the Node runtime fails on Windows builds).
export const runtime = 'edge'
export const alt = 'Varsil Suvagiya — Full-Stack Software Engineer, Surat, India'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#f8f9fb',
          color: '#17191d',
          fontFamily: 'sans-serif',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: '#6b717b' }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: '#365cf5' }} />
          varsil.suvagiya
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>Varsil Suvagiya</div>
          <div style={{ fontSize: 44, marginTop: 24, color: '#365cf5', fontWeight: 600 }}>Full-Stack Software Engineer</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#6b717b' }}>
          <span>Surat, Gujarat, India</span>
          <span>Next.js · React · Node.js · NestJS · AWS</span>
        </div>
      </div>
    ),
    size,
  )
}
