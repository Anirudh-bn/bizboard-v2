export default function ListingLoading() {
  return (
    <>
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        {/* Hero skeleton */}
        <div style={{ height: '50vh', background: 'var(--ivory-dark)', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 0, maxWidth: 1200, margin: '0 auto', padding: '60px 60px' }}>
          <div style={{ paddingRight: 60 }}>
            <div style={{ height: 28, width: '40%', background: 'var(--ivory-dark)', borderRadius: 6, marginBottom: 24, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginBottom: 32 }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{ height: 80, background: 'var(--white)', border: '1px solid var(--border)', padding: 20 }}>
                  <div style={{ height: 18, width: '60%', background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 8, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: 10, width: '40%', background: 'var(--ivory-dark)', borderRadius: 4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
                </div>
              ))}
            </div>
            <div style={{ height: 200, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          </div>
          <div>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: 32 }}>
              <div style={{ height: 32, width: '70%', background: 'var(--ivory-dark)', borderRadius: 6, marginBottom: 12, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
              <div style={{ height: 12, width: '40%', background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 32, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
              <div style={{ height: 48, background: 'var(--ivory-dark)', borderRadius: 6, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
