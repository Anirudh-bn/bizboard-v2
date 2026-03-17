export default function Ticker() {
  const items = [
    { name: 'Jubilee Hills Café', price: '₹1.5 Cr', type: 'Restaurant' },
    { name: 'Cloud Kitchen · Madhapur', price: '₹50L', type: 'Partnership' },
    { name: 'Banjara Hills Boutique', price: '₹75L', type: 'Retail' },
    { name: 'IT Startup · HITEC City', price: '₹3.2 Cr', type: '25% Equity' },
    { name: 'Auto Workshop · Madhapur', price: '₹90L', type: 'For Sale' },
    { name: 'Education Centre · LB Nagar', price: '₹60L', type: 'Lease' },
  ]

  return (
    <div style={{
      position: 'fixed', top: 72, left: 0, right: 0, zIndex: 99,
      background: 'var(--navy)', color: 'var(--gold-light)',
      height: 34, overflow: 'hidden', display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        background: 'var(--gold)', color: 'var(--navy)',
        padding: '0 16px', height: '100%', display: 'flex', alignItems: 'center',
        fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600,
        letterSpacing: '1.5px', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0,
      }}>
        Live Opportunities
      </div>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div className="ticker-animate" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          {[...items, ...items].map((item, i) => (
            <div key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '0 40px', fontFamily: "'DM Mono', monospace",
              fontSize: 11, color: 'rgba(250,250,250,0.6)',
            }}>
              <strong style={{ color: 'var(--gold-light)', fontWeight: 500 }}>{item.name}</strong>
              {item.price} · {item.type}
              <span style={{ width: 4, height: 4, background: 'var(--gold)', borderRadius: '50%', opacity: 0.6, display: 'inline-block' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
