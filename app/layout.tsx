import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import ParticleCanvas from '@/components/ParticleCanvas'
import Ticker from '@/components/Ticker'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'VOWZA — Where Businesses Find Their Next Chapter',
  description: 'The private marketplace for buying, selling and investing in verified businesses across Hyderabad. Discreet. Verified. Exclusive.',
  openGraph: {
    title: 'VOWZA — The Private Business Marketplace',
    description: 'Access Hyderabad\'s most exclusive verified business opportunities. Every listing is vetted. Every buyer is serious.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <ParticleCanvas />
          <Navbar />
          <Ticker />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
