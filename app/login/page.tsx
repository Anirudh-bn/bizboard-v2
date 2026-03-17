'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--white)',
    fontSize: 14, color: 'var(--navy)', outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 8,
    display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px',
  }

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email, password, redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      setError('Invalid email or password.')
    } else {
      router.push('/')
    }
  }

  const handleGoogle = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 72 }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 440, padding: '48px 40px', background: 'var(--white)', borderRadius: 16, border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(13,27,42,0.08)' }}
      >
        <Link href="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'var(--navy)', letterSpacing: 3, textDecoration: 'none', display: 'block', marginBottom: 32, textTransform: 'uppercase' as const }}>
          VOWZA
        </Link>

        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>— Welcome Back to Vowza</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-1px', marginBottom: 32 }}>Sign In</h1>

        <button
          onClick={handleGoogle}
          style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: 14, fontWeight: 600, color: 'var(--navy)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24, transition: 'all 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--navy)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--navy-light)' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {error && (
          <div style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.2)', color: '#8B3A3A', padding: '12px 16px', borderRadius: 8, fontSize: 13, marginBottom: 20 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleCredentials} style={{ display: 'grid', gap: 20 }}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'} />
          </div>
          <button type="submit" disabled={loading} style={{ background: 'var(--navy)', color: 'var(--ivory)', padding: '15px', borderRadius: 8, fontSize: 14, fontWeight: 600, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition: 'all 0.3s' }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'var(--gold)' }}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--navy)'}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ fontSize: 13, color: 'var(--navy-light)', marginTop: 24, textAlign: 'center' }}>
          Not a member yet?{' '}
          <Link href="/register" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>Apply for Membership</Link>
        </p>
      </motion.div>
    </div>
  )
}
