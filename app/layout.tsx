import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lora Sovkoska - Frontend Developer & Creative Designer',
  description: 'Portfolio of Lora Sovkoska, a frontend developer and creative designer crafting beautiful, intuitive digital experiences where design meets code.',
  keywords: ['frontend developer', 'creative designer', 'react', 'next.js', 'typescript', 'UI/UX', 'web design', 'portfolio'],
  authors: [{ name: 'Lora Sovkoska' }],
  openGraph: {
    title: 'Lora Sovkoska - Frontend Developer & Creative Designer',
    description: 'Portfolio of Lora Sovkoska, crafting beautiful digital experiences where design meets code.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lora Sovkoska Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lora Sovkoska - Frontend Developer & Creative Designer',
    description: 'Crafting beautiful digital experiences where design meets code.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

