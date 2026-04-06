'use client'
import { useState } from 'react'
import Navigation from '@/components/Navigation'

const DOCUMENTS = [
  { id: 'ont-lease', name: 'Residential Lease Agreement', jurisdiction: 'Ontario, CA', badge: 'CA-ON', price: 99, category: 'Real Estate', description: 'Residential Tenancies Act 2006 compliant. Covers all mandatory clauses.' },
  { id: 'ca-llc', name: 'LLC Operating Agreement', jurisdiction: 'California, USA', badge: 'US-CA', price: 199, category: 'Business', description: 'California Corp Code §17701 compliant. Single or multi-member.' },
  { id: 'ont-will', name: 'Last Will and Testament', jurisdiction: 'Ontario, CA', badge: 'CA-ON', price: 199, category: 'Estate', description: 'SLRA compliant. Requires two witnesses. Covers all assets.' },
  { id: 'multi-nda', name: 'NDA — Mutual', jurisdiction: 'Multi-Jurisdiction', badge: 'Multi', price: 49, category: 'Business', description: 'Bilateral confidentiality. Covers trade secrets and proprietary information.' },
  { id: 'ny-employ', name: 'Employment Agreement', jurisdiction: 'New York, USA', badge: 'US-NY', price: 199, category: 'Employment', description: 'NY Labor Law compliant. Covers compensation, duties, termination.' },
  { id: 'bc-poa', name: 'Power of Attorney', jurisdiction: 'British Columbia, CA', badge: 'CA-BC', price: 199, category: 'Estate', description: 'REPPA compliant. Enduring and non-enduring options.' },
  { id: 'tx-ic', name: 'Independent Contractor Agreement', jurisdiction: 'Texas, USA', badge: 'US-TX', price: 99, category: 'Employment', description: 'Covers scope, payment, IP ownership, and termination.' },
  { id: 'ont-sha', name: 'Shareholder Agreement', jurisdiction: 'Ontario, CA', badge: 'CA-ON', price: 99, category: 'Business', description: 'Covers voting rights, dividends, drag-along, tag-along.' },
  { id: 'fl-demand', name: 'Demand Letter — Debt', jurisdiction: 'Florida, USA', badge: 'US-FL', price: 49, category: 'Litigation', description: 'Formal demand for repayment. References amount owed and deadline.' },
  { id: 'ab-lease', name: 'Residential Lease Agreement', jurisdiction: 'Alberta, CA', badge: 'CA-AB', price: 99, category: 'Real Estate', description: 'Alberta RTA compliant. Fixed-term and month-to-month options.' },
  { id: 'us-nda', name: 'NDA — One-Way', jurisdiction: 'Multi-Jurisdiction', badge: 'Multi', price: 49, category: 'Business', description: 'Unilateral confidentiality for disclosing party protection.' },
  { id: 'ont-sep', name: 'Separation Agreement', jurisdiction: 'Ontario, CA', badge: 'CA-ON', price: 199, category: 'Family', description: 'Covers property, support, custody, and access arrangements.' },
]

const CATEGORIES = ['All', 'Business', 'Real Estate', 'Employment', 'Estate', 'Litigation', 'Family']

type Document = typeof DOCUMENTS[0]

async function triggerCheckout(doc: Document) {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentId: doc.id, documentName: doc.name, price: doc.price }),
  })
  const { url } = await res.json()
  if (url) window.location.href = url
}

export default function DocumentsPage() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const filtered = DOCUMENTS.filter(doc => {
    if (category !== 'All' && doc.category !== category) return false
    if (search && !doc.name.toLowerCase().includes(search.toLowerCase())) return false
    if (maxPrice && doc.price > maxPrice) return false
    return true
  })

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: '1280px', margin: '32px auto', padding: '0 24px', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <aside style={{ width: '260px', flexShrink: 0, position: 'sticky', top: '88px', background: '#fff', border: '0.5px solid #E8E6E1', borderRadius: '12px', padding: '24px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#9C9890', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>FILTERS</p>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '10px' }}>Search</p>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search documents..."
              style={{ width: '100%', border: '0.5px solid #E8E6E1', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', color: '#1A1917', outline: 'none', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '10px' }}>Category</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)} style={{
                  textAlign: 'left', padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit',
                  background: category === cat ? '#1A1917' : 'transparent',
                  color: category === cat ? '#FAFAF8' : '#6B6862',
                  fontWeight: category === cat ? 600 : 400,
                }}>{cat}</button>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '10px' }}>Price Tier</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[null, 49, 99, 199].map(price => (
                <button key={price ?? 'all'} onClick={() => setMaxPrice(price)} style={{
                  textAlign: 'left', padding: '6px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit',
                  background: maxPrice === price ? '#1A1917' : 'transparent',
                  color: maxPrice === price ? '#FAFAF8' : '#6B6862',
                  fontWeight: maxPrice === price ? 600 : 400,
                }}>
                  {price === null ? 'All prices' : `Up to $${price}`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Document Grid */}
        <main style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1A1917', letterSpacing: '-0.03em' }}>Legal Documents</h1>
            <span style={{ fontSize: '14px', color: '#9C9890' }}>{filtered.length} documents</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {filtered.map(doc => (
              <div key={doc.id} style={{ background: '#FFFFFF', border: '0.5px solid #E8E6E1', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 500, color: '#6B6862', background: '#F5F4F1', border: '0.5px solid #E8E6E1', borderRadius: '100px', padding: '3px 10px' }}>{doc.badge}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', background: '#1D4ED8', borderRadius: '100px', padding: '3px 10px' }}>${doc.price}</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1917', marginBottom: '8px', lineHeight: 1.3 }}>{doc.name}</div>
                <p style={{ fontSize: '13px', color: '#6B6862', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>{doc.description}</p>
                <button
                  onClick={() => triggerCheckout(doc)}
                  style={{ width: '100%', background: '#1A1917', color: '#FAFAF8', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Get Document — ${doc.price}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
