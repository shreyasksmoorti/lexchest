import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LexChest — Every Legal Need. One Platform.',
  description: 'Jurisdiction-specific legal documents, verified lawyers, litigation support, virtual ILA and notary services across all 63 Canadian provinces and US states.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className={`${inter.className} antialiased`} style={{ background: '#FAFAF8', color: '#1A1917' }}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
