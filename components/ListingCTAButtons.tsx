'use client'

export default function ListingCTAButtons() {
  return (
    <>
      <button
        style={{
          width: '100%', background: 'var(--navy)', color: 'var(--ivory)',
          padding: '16px', borderRadius: 6, fontSize: 14, fontWeight: 600,
          border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)' }}
        onClick={() => alert('A Vowza advisor will contact you within 24 hours.')}
      >
        Request Confidential Access
      </button>
      <button
        style={{
          width: '100%', background: 'transparent', color: 'var(--navy)',
          padding: '14px', borderRadius: 6, fontSize: 14, fontWeight: 500,
          border: '2px solid var(--border)', cursor: 'pointer', transition: 'all 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
      >
        Schedule a Call
      </button>
    </>
  )
}
