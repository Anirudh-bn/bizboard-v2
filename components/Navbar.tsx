'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { data: session } = useSession()
  const dropRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const user = session?.user as any
  const initial = user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? '?'

  const navBg = scrolled
    ? 'rgba(13,27,42,0.97)'
    : 'rgba(250,250,250,0.90)'

  const linkColor = scrolled ? 'rgba(250,250,250,0.75)' : 'var(--navy-light)'
  const linkHover = scrolled ? '#FAFAFA' : 'var(--navy)'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 60px', height: scrolled ? 60 : 72,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: navBg,
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(250,250,250,0.08)' : '1px solid var(--border)',
      transition: 'all 0.4s ease',
    }}>
      <Link href="/" style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 22,
        fontWeight: 700,
        color: scrolled ? '#C9A84C' : 'var(--navy)',
        letterSpacing: 3,
        textDecoration: 'none',
        textTransform: 'uppercase' as const,
      }}>
        VOWZA
      </Link>

      {/* Desktop nav */}
      <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }} className="desktop-nav">
        {[
          { href: '/browse', label: 'Explore' },
          { href: '/invest', label: 'Invest' },
          { href: '/#how', label: 'How It Works' },
          { href: '/about', label: 'About' },
        ].map(link => (
          <li key={link.href}>
            <Link href={link.href}
              style={{ fontSize: 12, fontWeight: 500, color: linkColor, textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' as const, transition: 'color 0.2s', fontFamily: "'DM Mono', monospace" }}
              onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
              onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
            >{link.label}</Link>
          </li>
        ))}

        {session ? (
          <li style={{ position: 'relative' }} ref={dropRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold)', color: 'var(--navy)', border: '2px solid var(--gold)', cursor: 'pointer', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif" }}
            >
              {initial}
            </button>
            {dropdownOpen && (
              <div style={{ position: 'absolute', top: '110%', right: 0, background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 8px 32px rgba(13,27,42,0.12)', minWidth: 200, padding: '8px 0', zIndex: 200 }}>
                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--navy-light)', fontFamily: "'DM Mono', monospace" }}>{user?.name ?? user?.email}</div>
                <Link href="/requests" onClick={() => setDropdownOpen(false)}
                  style={{ display: 'block', padding: '12px 16px', fontSize: 13, color: 'var(--navy)', textDecoration: 'none', fontWeight: 500 }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--ivory)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >My Requests</Link>
                {user?.role === 'ADMIN' && (
                  <Link href="/admin" onClick={() => setDropdownOpen(false)}
                    style={{ display: 'block', padding: '12px 16px', fontSize: 13, color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--ivory)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >Command Centre</Link>
                )}
                <button onClick={() => signOut({ callbackUrl: '/' })}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', fontSize: 13, color: '#8B3A3A', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: "'Cormorant Garant', serif" }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--ivory)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >Sign Out</button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link href="/login"
                style={{ fontSize: 12, fontWeight: 500, color: linkColor, textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' as const, transition: 'color 0.2s', fontFamily: "'DM Mono', monospace" }}
                onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={e => (e.currentTarget.style.color = linkColor)}
              >Join Vowza</Link>
            </li>
            <li>
              <Link href="/sell"
                style={{ background: 'var(--gold)', color: 'var(--navy)', padding: '10px 22px', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', letterSpacing: '0.5px', display: 'inline-block', fontFamily: "'DM Mono', monospace", textTransform: 'uppercase' as const }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >Submit Business</Link>
            </li>
          </>
        )}
      </ul>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} className="hamburger" aria-label="Toggle menu">
        <span style={{ display: 'block', width: 24, height: 2, background: scrolled ? '#FAFAFA' : 'var(--navy)', margin: '5px 0', transition: 'all 0.3s' }} />
        <span style={{ display: 'block', width: 24, height: 2, background: scrolled ? '#FAFAFA' : 'var(--navy)', margin: '5px 0', transition: 'all 0.3s' }} />
        <span style={{ display: 'block', width: 24, height: 2, background: scrolled ? '#FAFAFA' : 'var(--navy)', margin: '5px 0', transition: 'all 0.3s' }} />
      </button>

      {menuOpen && (
        <div style={{ position: 'fixed', top: scrolled ? 60 : 72, left: 0, right: 0, background: 'rgba(13,27,42,0.98)', backdropFilter: 'blur(20px)', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 16, borderBottom: '1px solid rgba(250,250,250,0.08)', zIndex: 99 }}>
          {[
            { href: '/browse', label: 'Explore Opportunities' },
            { href: '/invest', label: 'Invest' },
            { href: '/about', label: 'About' },
            { href: '/sell', label: 'Submit Your Business' },
          ].map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 16, color: '#FAFAFA', textDecoration: 'none', fontWeight: 500, padding: '8px 0', borderBottom: '1px solid rgba(250,250,250,0.08)' }}
            >{link.label}</Link>
          ))}
          {session ? (
            <button onClick={() => signOut()} style={{ background: 'none', border: 'none', fontSize: 16, color: '#C9A84C', textAlign: 'left', cursor: 'pointer', fontFamily: "'Cormorant Garant', serif", padding: '8px 0' }}>Sign Out</button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, padding: '8px 0' }}>Join Vowza</Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 0 24px !important; }
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
