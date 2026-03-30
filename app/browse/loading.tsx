function SkeletonCard() {
  return (
    <div style={{ background: 'var(--white)', overflow: 'hidden', borderRadius: 0 }}>
      <div style={{ height: 200, background: 'var(--ivory-dark)', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
      <div style={{ padding: 24 }}>
        <div style={{ height: 10, width: '40%', background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 12, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 22, width: '75%', background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 8, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 14, width: '55%', background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 24, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--ivory-dark)' }}>
          {[56, 64, 44].map((w, i) => (
            <div key={i}>
              <div style={{ height: 20, width: w, background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
              <div style={{ height: 10, width: w - 8, background: 'var(--ivory-dark)', borderRadius: 4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[70, 80, 60].map((w, i) => (
            <div key={i} style={{ height: 22, width: w, background: 'var(--ivory-dark)', borderRadius: 100, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ height: 12, width: 60, background: 'var(--ivory-dark)', borderRadius: 4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: 36, width: 120, background: 'var(--ivory-dark)', borderRadius: 5, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  )
}

export default function BrowseLoading() {
  return (
    <>
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        <div style={{ padding: '60px 60px 40px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ height: 12, width: 180, background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 16, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: 52, width: '55%', background: 'var(--ivory-dark)', borderRadius: 6, marginBottom: 32, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: 48, width: '60%', background: 'var(--ivory-dark)', borderRadius: 8, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0 }}>
          <div style={{ padding: '40px 32px', borderRight: '1px solid var(--border)' }}>
            {[100, 80, 90, 70, 85].map((w, i) => (
              <div key={i} style={{ height: 12, width: w, background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 16, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
          <div style={{ padding: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    </>
  )
}
