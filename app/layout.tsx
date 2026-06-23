import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import '@/shared/base.css'

/* The reference's real custom faces (self-hosted from public/assests/fonts). */
const breton = localFont({
  src: '../public/assests/fonts/Breton.woff2',
  variable: '--font-breton',
  display: 'block',
})

const other = localFont({
  src: '../public/assests/fonts/Machine.otf',
  variable: '--font-other',
  display: 'block',
})

const zirena = localFont({
  src: '../public/assests/fonts/Zirena.woff2',
  weight: '800',
  variable: '--font-zirena',
  display: 'block',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Taufique Ansari, Full Stack Engineer',
  description:
    'Full stack engineer specialized in web development, backend and production-grade systems. Discover my projects and work.',
  authors: [{ name: 'Taufique Ansari' }],
  openGraph: {
    type: 'website',
    title: 'Taufique Ansari, Full Stack Engineer',
    description:
      'Full stack engineer specialized in web development, backend and production-grade systems.',
  },
  other: {
    'theme-color': '#0a0a0a',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${breton.variable} ${other.variable} ${zirena.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
