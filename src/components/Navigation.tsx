'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { href: '/documents', label: 'Documents' },
  { href: '/lawyers', label: 'Lawyers' },
  { href: '/litigation', label: 'Litigation' },
  { href: '/staff', label: 'Staff' },
  { href: '/legal-consultation', label: 'Legal Consultation' },
  { href: '/blog', label: 'Blog' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: '68px',
      background: scrolled ? 'rgba(250,250,248,0.92)' : '#FAFAF8',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: '0.5px solid #E8E6E1',
      display: 'flex',
      alignItems: 'center',
      padding: '0 40px',
      gap: '0',
    }}>
      <Link href="/" style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1917', textDecoration: 'none', flexShrink: 0, marginRight: '48px' }}>
        Lex<span style={{ color: '#1D4ED8' }}>Chest</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flex: 1 }}>
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} style={{
            fontSize: '14px',
            fontWeight: 500,
            color: pathname.startsWith(link.href) ? '#1A1917' : '#6B6862',
            textDecoration: 'none',
          }}>
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link href="/map" style={{ fontSize: '13px', fontWeight: 500, color: '#1A1917', border: '0.5px solid #D9D6CE', borderRadius: '20px', padding: '7px 16px', textDecoration: 'none' }}>
          Select Jurisdiction
        </Link>
        <Link href="/documents" style={{ fontSize: '13px', fontWeight: 600, color: '#FAFAF8', background: '#1A1917', borderRadius: '8px', padding: '9px 20px', textDecoration: 'none' }}>
          Get Started
        </Link>
      </div>
    </nav>
  )
}
