'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer style={{ background: 'var(--navy)', color: 'rgba(250,250,250,0.55)', padding: 60, display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, borderTop: '1px solid rgba(250,250,250,0.05)' }}>
        <div>
          <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'var(--gold)', letterSpacing: 3, textDecoration: 'none', display: 'block', marginBottom: 16, textTransform: 'uppercase' }}>
            VOWZA
          </Link>
          <p style={{ fontSize: 15, lineHeight: 1.8, maxWidth: 240 }}>The private marketplace for buying, selling and investing in verified businesses across Hyderabad.</p>
        </div>
        {[
          { heading: 'Explore', links: [
            { label: 'Explore Opportunities', href: '/browse' },
            { label: 'Investment Desk', href: '/invest' },
            { label: 'Submit Your Business', href: '/sell' },
            { label: 'How It Works', href: '/#how' },
          ]},
          { heading: 'Industries', links: [
            { label: 'Restaurants & Cafes', href: '/browse?industry=restaurant' },
            { label: 'Retail Stores', href: '/browse?industry=retail' },
            { label: 'IT & Software', href: '/browse?industry=it-software' },
            { label: 'Manufacturing', href: '/browse?industry=manufacturing' },
          ]},
          { heading: 'Contact', links: [
            { label: 'Hyderabad, Telangana', href: '#' },
            { label: 'Support Centre', href: '#' },
          ]},
        ].map(col => (
          <div key={col.heading}>
            <h4 style={{ fontSize: 10, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(250,250,250,0.85)', marginBottom: 20, fontFamily: "'DM Mono', monospace" }}>{col.heading}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {col.links.map(link => (
                <li key={link.label}>
                  <Link href={link.href}
                    style={{ fontSize: 14, color: 'rgba(250,250,250,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-light)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(250,250,250,0.45)')}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <style>{`
          @media (max-width: 1024px) {
            footer { grid-template-columns: 1fr 1fr !important; padding: 48px 32px !important; }
          }
          @media (max-width: 768px) {
            footer { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
          @media (max-width: 640px) {
            footer { padding: 48px 20px !important; }
            .footer-bottom { flex-direction: column !important; gap: 8px; text-align: center; padding: 20px !important; }
          }
        `}</style>
      </footer>
      <div className="footer-bottom" style={{ background: 'var(--navy)', borderTop: '1px solid rgba(250,250,250,0.05)', padding: '24px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 12, color: 'rgba(250,250,250,0.25)', fontFamily: "'DM Mono', monospace", margin: 0 }}>© 2026 VOWZA · Built in Hyderabad, India 🤍</p>
        <p style={{ fontSize: 12, color: 'rgba(250,250,250,0.25)', fontFamily: "'DM Mono', monospace", margin: 0 }}>Discreet · Verified · Exclusive</p>
      </div>
    </>
  )
}
