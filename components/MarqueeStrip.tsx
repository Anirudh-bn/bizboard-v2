export default function MarqueeStrip() {
  const items = [
    { label: 'Restaurants', highlight: true },
    { label: 'Cloud Kitchens', highlight: false },
    { label: 'Retail Stores', highlight: true },
    { label: 'IT Companies', highlight: false },
    { label: 'Cafes & Bars', highlight: true },
    { label: 'Education Centres', highlight: false },
    { label: 'Manufacturing', highlight: true },
    { label: 'Salons & Spas', highlight: false },
  ]

  return (
    <div className="marquee-strip" style={{ background: 'var(--navy)', padding: '22px 0', overflow: 'hidden', display: 'flex' }}>
      <div className="marquee-animate" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} className="marquee-item" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '0 32px',
            fontFamily: "'Playfair Display', serif",
            fontSize: 15,
            fontStyle: 'italic',
            color: item.highlight ? 'var(--gold-light)' : 'rgba(247,243,238,0.4)',
            fontWeight: 400,
          }}>
            {item.label}
            <span style={{ color: 'var(--gold)', fontStyle: 'normal', fontSize: 12 }}>✦</span>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .marquee-strip { padding: 16px 0 !important; }
          .marquee-item { padding: 0 20px !important; font-size: 13px !important; gap: 12px !important; }
        }
      `}</style>
    </div>
  )
}
