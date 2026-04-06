'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

function SuccessContent() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')
  const doc = params.get('doc')

  return (
    <div style={{ maxWidth: '560px', margin: '120px auto', textAlign: 'center', padding: '0 24px' }}>
      <div style={{ width: '64px', height: '64px', background: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '28px', color: '#fff' }}>✓</div>
      <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1917', letterSpacing: '-0.03em', marginBottom: '16px' }}>Payment successful</h1>
      <p style={{ fontSize: '18px', color: '#6B6862', lineHeight: 1.6, marginBottom: '40px' }}>Your document is ready to download. A confirmation email has been sent.</p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => {
            const link = document.createElement('a')
            link.href = `/api/generate-pdf?doc=${doc}&session=${sessionId}`
            link.download = `${doc}.pdf`
            link.click()
          }}
          style={{ background: '#1A1917', color: '#FAFAF8', border: 'none', borderRadius: '8px', padding: '13px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Download PDF
        </button>
        <Link href="/documents" style={{ background: 'transparent', color: '#1A1917', border: '1px solid #1A1917', borderRadius: '8px', padding: '13px 28px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
          Browse More
        </Link>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '120px 24px' }}>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </>
  )
}
