'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { FileText, Users, Scale, Briefcase, Shield, BookOpen } from 'lucide-react'

const jurisdictions = ['Ontario', 'California', 'British Columbia', 'New York', 'Alberta', 'Texas', 'Quebec', 'Florida']

const docs = [
  { name: 'Residential Lease Agreement', jurisdiction: 'Ontario, Canada', price: '$99' },
  { name: 'Non-Disclosure Agreement', jurisdiction: 'California, USA', price: '$49' },
  { name: 'Last Will and Testament', jurisdiction: 'British Columbia, Canada', price: '$199' },
  { name: 'Employment Agreement', jurisdiction: 'New York, USA', price: '$199' },
  { name: 'Power of Attorney', jurisdiction: 'Alberta, Canada', price: '$199' },
  { name: 'Independent Contractor Agreement', jurisdiction: 'Texas, USA', price: '$99' },
  { name: 'Shareholder Agreement', jurisdiction: 'Ontario, Canada', price: '$99' },
  { name: 'Demand Letter', jurisdiction: 'Florida, USA', price: '$49' },
]

const services = [
  { icon: FileText, name: 'Documents', description: 'Generate jurisdiction-precise legal documents instantly.', href: '/documents' },
  { icon: Users, name: 'Lawyers', description: 'Find verified lawyers. Transparent rates, instant booking.', href: '/lawyers' },
  { icon: Scale, name: 'Litigation', description: 'Emergency and standard litigation counsel.', href: '/litigation' },
  { icon: Briefcase, name: 'Staff', description: 'Hire verified legal staff per transaction.', href: '/staff' },
  { icon: Shield, name: 'Legal Consultation', description: 'Virtual ILA, notary, commissioner of oaths.', href: '/legal-consultation' },
  { icon: BookOpen, name: 'Blog', description: 'Legal insights, guides and jurisdiction updates.', href: '/blog' },
]

const featuredDocs = [
  { name: 'Ontario Residential Lease', jurisdiction: 'CA-ON', price: '$99', description: 'Residential Tenancies Act 2006 compliant' },
  { name: 'California LLC Agreement', jurisdiction: 'US-CA', price: '$199', description: 'Corp Code §17701 compliant' },
  { name: 'Ontario Last Will & Testament', jurisdiction: 'CA-ON', price: '$199', description: 'SLRA compliant, two witnesses' },
  { name: 'NDA — Mutual', jurisdiction: 'Multi', price: '$49', description: 'Bilateral confidentiality agreement' },
]

const blogPosts = [
  { title: 'Ontario Lease Agreement: Complete Landlord Guide 2026', excerpt: 'Everything Ontario landlords need to know about the standard lease form, required disclosures, and RTA compliance.', category: 'Canadian Law', readTime: '8 min', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80' },
  { title: 'California Non-Compete Ban: SB 699 Guide', excerpt: 'SB 699 voids non-compete clauses for California workers regardless of where the agreement was signed.', category: 'US Law', readTime: '6 min', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80' },
  { title: 'Power of Attorney in Ontario: Complete Guide', excerpt: 'Understanding continuing and non-continuing powers of attorney for property and personal care in Ontario.', category: 'Canadian Law', readTime: '7 min', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
]

function RolodexCard() {
  const [index, setIndex] = useState(0)
  const [flipping, setFlipping] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setFlipping(true)
      setTimeout(() => {
        setIndex(i => (i + 1) % docs.length)
        setFlipping(false)
      }, 300)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  const doc = docs[index]

  return (
    <div style={{ position: 'relative', width: '340px', margin: '0 auto' }}>
      {/* Stack cards behind */}
      <div style={{ position: 'absolute', top: 12, left: 10, right: -10, bottom: -12, background: '#D9D6CE', borderRadius: '14px' }} />
      <div style={{ position: 'absolute', top: 6, left: 5, right: -5, bottom: -6, background: '#E8E6E1', borderRadius: '14px' }} />
      {/* Main card */}
      <div style={{
        position: 'relative',
        background: '#FFFFFF',
        borderRadius: '14px',
        padding: '28px',
        boxShadow: '0 8px 32px rgba(26,25,23,0.12)',
        transform: flipping ? 'perspective(1000px) rotateX(-15deg)' : 'perspective(1000px) rotateX(0deg)',
        opacity: flipping ? 0.7 : 1,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        transformOrigin: 'top center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1917', lineHeight: 1.3, marginBottom: '4px' }}>{doc.name}</div>
            <div style={{ fontSize: '12px', color: '#9C9890' }}>{doc.jurisdiction}</div>
          </div>
          <div style={{ background: '#1D4ED8', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', whiteSpace: 'nowrap' }}>{doc.price}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          {[92, 78, 85, 65].map((w, i) => (
            <div key={i} style={{ height: '7px', background: '#F5F4F1', borderRadius: '100px', width: `${w}%` }} />
          ))}
        </div>
        <div style={{ paddingTop: '16px', borderTop: '0.5px solid #E8E6E1', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: '11px', color: '#6B6862' }}>Jurisdiction verified · Instant PDF</span>
        </div>
      </div>
    </div>
  )
}

function AnimatedCounter({ target, suffix = '' }: { target: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1200
        const start = performance.now()
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <div ref={ref}>{count}{suffix}</div>
}

function CyclingJurisdiction() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % jurisdictions.length)
        setVisible(true)
      }, 250)
    }, 2500)
    return () => clearInterval(timer)
  }, [])

  return (
    <span style={{
      color: '#1D4ED8',
      display: 'inline-block',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      transition: 'opacity 0.25s ease, transform 0.25s ease',
      caretColor: 'transparent',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {jurisdictions[index]}
    </span>
  )
}

export default function HomePage() {
  return (
    <>
      <Navigation />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #F5F4F1 0%, #FAFAF8 50%, #F5F4F1 100%)', padding: '100px 40px 80px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '64px' }}>
          {/* Left */}
          <div style={{ width: '55%' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#1D4ED8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>EVERY LEGAL NEED. ONE PLATFORM.</p>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 800, color: '#1A1917', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Legal services built for<br />
              <CyclingJurisdiction /><br />
              Ready now.
            </h1>
            <p style={{ fontSize: '18px', fontWeight: 400, color: '#6B6862', lineHeight: 1.7, maxWidth: '480px', marginTop: '24px' }}>
              Documents. Lawyers. Litigation. Staff. Certification. Everything your legal life needs — jurisdiction-precise, instantly accessible.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '40px' }}>
              <Link href="/documents" style={{ fontSize: '15px', fontWeight: 600, color: '#FAFAF8', background: '#1A1917', borderRadius: '8px', padding: '13px 28px', textDecoration: 'none', display: 'inline-block' }}>
                Explore Platform
              </Link>
              <Link href="/lawyers" style={{ fontSize: '15px', fontWeight: 600, color: '#1A1917', border: '1px solid #1A1917', borderRadius: '8px', padding: '13px 28px', textDecoration: 'none', background: 'transparent', display: 'inline-block' }}>
                Find a Lawyer
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '48px', paddingTop: '20px', borderTop: '1px solid #E8E6E1', flexWrap: 'wrap' }}>
              {['63 Jurisdictions', '150+ Documents', '500+ Lawyers', '24/7 Emergency'].map((item, i, arr) => (
                <>
                  <span key={item} style={{ fontSize: '14px', color: '#9C9890' }}>{item}</span>
                  {i < arr.length - 1 && <span key={`sep-${i}`} style={{ color: '#E8E6E1' }}>|</span>}
                </>
              ))}
            </div>
          </div>
          {/* Right: Rolodex */}
          <div style={{ width: '45%' }}>
            <RolodexCard />
          </div>
        </div>
      </section>

      {/* SIX SERVICES */}
      <section style={{ background: '#F7F6F3', padding: '96px 40px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#9C9890', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>THE COMPLETE PLATFORM</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 800, color: '#1A1917', letterSpacing: '-0.03em', marginBottom: '12px' }}>Six integrated services.</h2>
            <p style={{ fontSize: '18px', color: '#6B6862' }}>Everything you need legally — built to work together.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {services.map(({ icon: Icon, name, description, href }) => (
              <Link key={name} href={href} style={{
                background: '#FFFFFF',
                border: '0.5px solid #E8E6E1',
                borderRadius: '14px',
                padding: '32px',
                textDecoration: 'none',
                display: 'block',
                transition: 'all 200ms ease',
                color: 'inherit',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(26,25,23,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.borderColor = '#1A1917' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = '#E8E6E1' }}
              >
                <div style={{ width: '48px', height: '48px', background: '#F5F4F1', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Icon size={24} color="#1A1917" />
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#1A1917', marginBottom: '8px' }}>{name}</div>
                <p style={{ fontSize: '14px', color: '#6B6862', lineHeight: 1.6, marginBottom: '16px' }}>{description}</p>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#6B6862' }}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#1A1917', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center' }}>
          {[
            { target: 63, suffix: '', label: 'Jurisdictions' },
            { target: 150, suffix: '+', label: 'Documents' },
            { target: 6, suffix: '', label: 'Services' },
          ].map(({ target, suffix, label }) => (
            <div key={label} style={{ padding: '40px 20px', borderRight: '0.5px solid rgba(250,250,248,0.1)' }}>
              <div style={{ fontSize: '56px', fontWeight: 800, color: '#FAFAF8', lineHeight: 1, marginBottom: '12px' }}>
                <AnimatedCounter target={target} suffix={suffix} />
              </div>
              <div style={{ fontSize: '16px', color: 'rgba(250,250,248,0.5)' }}>{label}</div>
            </div>
          ))}
          <div style={{ padding: '40px 20px' }}>
            <div style={{ fontSize: '56px', fontWeight: 800, color: '#FAFAF8', lineHeight: 1, marginBottom: '12px' }}>24/7</div>
            <div style={{ fontSize: '16px', color: 'rgba(250,250,248,0.5)' }}>Emergency</div>
          </div>
        </div>
      </section>

      {/* FEATURED DOCUMENTS */}
      <section style={{ background: '#F7F6F3', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#9C9890', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>DOCUMENTS</p>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1A1917', letterSpacing: '-0.03em' }}>Most requested documents</h2>
            </div>
            <Link href="/documents" style={{ fontSize: '14px', fontWeight: 500, color: '#6B6862', textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {featuredDocs.map(doc => (
              <Link key={doc.name} href="/documents" style={{
                background: '#FFFFFF',
                border: '0.5px solid #E8E6E1',
                borderRadius: '14px',
                padding: '24px',
                textDecoration: 'none',
                display: 'block',
                color: 'inherit',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(26,25,23,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B6862', background: '#F5F4F1', border: '0.5px solid #E8E6E1', borderRadius: '100px', padding: '3px 10px' }}>{doc.jurisdiction}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: '#1D4ED8', borderRadius: '100px', padding: '3px 10px' }}>{doc.price}</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1917', marginBottom: '8px', lineHeight: 1.3 }}>{doc.name}</div>
                <p style={{ fontSize: '13px', color: '#6B6862', lineHeight: 1.5, marginBottom: '16px' }}>{doc.description}</p>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1917' }}>Get Document →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section style={{ background: '#FFFFFF', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, color: '#9C9890', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>INSIGHTS</p>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#1A1917', letterSpacing: '-0.03em' }}>Legal insights and guides</h2>
            </div>
            <Link href="/blog" style={{ fontSize: '14px', fontWeight: 500, color: '#6B6862', textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {blogPosts.map(post => (
              <Link key={post.title} href="/blog" style={{
                background: '#FFFFFF',
                border: '0.5px solid #E8E6E1',
                borderRadius: '14px',
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'block',
                color: 'inherit',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(26,25,23,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B6862', background: '#F5F4F1', borderRadius: '100px', padding: '3px 10px' }}>{post.category}</span>
                    <span style={{ fontSize: '12px', color: '#9C9890' }}>{post.readTime} read</span>
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 700, color: '#1A1917', lineHeight: 1.4, marginBottom: '10px' }}>{post.title}</div>
                  <p style={{ fontSize: '14px', color: '#6B6862', lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{post.excerpt}</p>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1917' }}>Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP BANNER */}
      <section style={{ background: '#1A1917', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, color: '#FAFAF8', letterSpacing: '-0.03em', marginBottom: '16px' }}>Introducing LexChest Membership</h2>
          <p style={{ fontSize: '18px', color: 'rgba(250,250,248,0.7)', lineHeight: 1.6, marginBottom: '40px' }}>$19/month or $149/year — 30% off every document you generate.</p>
          <Link href="/membership" style={{ fontSize: '15px', fontWeight: 600, color: '#1A1917', background: '#FAFAF8', borderRadius: '8px', padding: '13px 28px', textDecoration: 'none', display: 'inline-block' }}>
            Learn More
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1A1917', padding: '64px 40px 32px', borderTop: '0.5px solid rgba(250,250,248,0.08)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <Link href="/" style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', color: '#FAFAF8', textDecoration: 'none', display: 'inline-block', marginBottom: '16px' }}>
                Lex<span style={{ color: '#1D4ED8' }}>Chest</span>
              </Link>
              <p style={{ fontSize: '14px', color: 'rgba(250,250,248,0.5)', lineHeight: 1.7, maxWidth: '260px' }}>Jurisdiction-precise legal documents, verified lawyers, and legal services for North America.</p>
            </div>
            {[
              { title: 'Platform', links: [['Documents', '/documents'], ['Lawyers', '/lawyers'], ['Litigation', '/litigation'], ['Staff', '/staff'], ['Legal Consultation', '/legal-consultation']] as [string, string][] },
              { title: 'Resources', links: [['Blog', '/blog'], ['FAQ', '/faq'], ['Map', '/map'], ['Bundles', '/bundles']] as [string, string][] },
              { title: 'Legal', links: [['Terms', '/terms'], ['Privacy', '/privacy'], ['About', '/about']] as [string, string][] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(250,250,248,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>{col.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {col.links.map(([label, href]) => (
                    <Link key={href} href={href} style={{ fontSize: '14px', color: 'rgba(250,250,248,0.6)', textDecoration: 'none' }}>{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '0.5px solid rgba(250,250,248,0.08)', paddingTop: '24px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(250,250,248,0.3)', textAlign: 'center' }}>© 2026 LexChest Legal Technologies. Not a law firm. Not legal advice.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
