import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'
import Loader from '@/components/ui/Loader'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Nav from '@/components/ui/Nav'

export const metadata: Metadata = {
  metadataBase: new URL('https://pawantripathi.vercel.app'),
  title: 'Pawan Tripathi — Web Developer & UI/UX Designer',
  description:
    'Computer Science graduate from NSUT. Building live learning products at PhysicsWallah. UI/UX, front-end development, and GenAI integration — turning rough ideas into clean, engaging digital experiences.',
  keywords: [
    'Pawan Tripathi',
    'Web Developer',
    'UI/UX Designer',
    'React Developer',
    'Frontend Engineer',
    'GenAI',
    'NSUT',
    'PhysicsWallah',
  ],
  authors: [{ name: 'Pawan Tripathi', url: 'https://pawantripathi.vercel.app' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pawantripathi.vercel.app',
    title: 'Pawan Tripathi — Web Developer & UI/UX Designer',
    description:
      'Computer Science graduate from NSUT. Building live learning products at PhysicsWallah. UI/UX, front-end development, and GenAI integration.',
    siteName: 'Pawan Tripathi Portfolio',
    images: [{ url: '/og.svg', width: 1200, height: 630, alt: 'Pawan Tripathi Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pawan Tripathi — Web Developer & UI/UX Designer',
    description: 'UI/UX, front-end development, and GenAI integration — turning rough ideas into clean digital experiences.',
    images: ['/og.svg'],
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pawan Tripathi',
  url: 'https://pawantripathi.vercel.app',
  email: 'pawantripathi@example.com',
  jobTitle: 'Web Developer & UI/UX Designer',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'NSUT (Netaji Subhas University of Technology)',
    url: 'https://nsut.ac.in',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'PhysicsWallah',
    url: 'https://pw.live',
  },
  sameAs: [
    'https://linkedin.com/in/pawantripathi',
    'https://github.com/tripathipawan',
    'https://instagram.com/pawantripathi',
  ],
  knowsAbout: [
    'Web Development', 'UI/UX Design', 'React', 'TypeScript',
    'GenAI Integration', 'Prompt Engineering', 'Python', 'Figma',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <Loader />
          <CustomCursor />
          <Nav />
          <ScrollProgress />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
