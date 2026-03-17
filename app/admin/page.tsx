'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

type Tab = 'requests' | 'submissions' | 'listings'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('requests')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') { router.push('/login'); return }
    if (status === 'authenticated' && session?.user?.role !== 'ADMIN') router.push('/')
  }, [status, session, router])

  const fetchData = () => {
    fetch('/api/admin/data')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }

  useEffect(() => {
    if (status === 'authenticated') fetchData()
  }, [status])

  const action = async (url: string, body?: any) => {
    await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
    fetchData()
  }

  const statusColor = (s: string) => {
    const map: Record<string, string> = { PENDING: '#C9923A', APPROVED: '#2A5C45', ACTIVE: '#2A5C45', REJECTED: '#8B3A3A', CONVERTED: '#1A4B8C', SOLD: '#1A4B8C' }
    return map[s] ?? '#6B5F57'
  }

  const Badge = ({ s }: { s: string }) => (
    <span style={{ background: `${statusColor(s)}20`, color: statusColor(s), padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>{s}</span>
  )

  const thStyle: React.CSSProperties = { textAlign: 'left', padding: '12px 16px', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--navy-light)', fontFamily: "'DM Mono', monospace", borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }
  const tdStyle: React.CSSProperties = { padding: '14px 16px', fontSize: 13, color: 'var(--navy)', borderBottom: '1px solid var(--border)', verticalAlign: 'middle' }

  if (status === 'loading' || (status === 'authenticated' && session?.user?.role !== 'ADMIN') || loading) {
    return <div style={{ paddingTop: 140, textAlign: 'center', color: 'var(--navy-light)' }}>Loading...</div>
  }

  return (
    <div style={{ paddingTop: 106, minHeight: '100vh', background: '#F0EDE8' }}>
      <div style={{ padding: '48px 60px 0', borderBottom: '1px solid var(--border)', background: 'var(--ivory)' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>— Admin</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, letterSpacing: '-1.5px', color: 'var(--navy)', marginBottom: 32 }}>Vowza Command Centre</h1>
        <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--border)' }}>
          {(['requests', 'submissions', 'listings'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: tab === t ? 'var(--navy)' : 'var(--navy-light)', borderBottom: tab === t ? '2px solid var(--navy)' : '2px solid transparent', marginBottom: -2, textTransform: 'capitalize', fontFamily: "'DM Sans', sans-serif", transition: 'color 0.2s' }}>
              {t === 'requests' ? `Requests (${data?.requests?.filter((r: any) => r.status === 'PENDING').length ?? 0})` : t === 'submissions' ? `Submissions (${data?.submissions?.filter((s: any) => s.status === 'PENDING').length ?? 0})` : `Listings (${data?.listings?.length ?? 0})`}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '32px 60px' }}>
        {tab === 'requests' && (
          <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--ivory)' }}>
                    {['Buyer', 'Email', 'Phone', 'Listing', 'Budget', 'Date', 'Status', 'Actions'].map(h => <th key={h} style={thStyle}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data?.requests?.map((r: any) => (
                    <tr key={r.id} style={{ transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--ivory)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={tdStyle}><div style={{ fontWeight: 600 }}>{r.user?.name}</div></td>
                      <td style={tdStyle}>{r.user?.email}</td>
                      <td style={tdStyle}>{r.user?.phone ?? '—'}</td>
                      <td style={tdStyle}><div>{r.listing?.businessType}</div><div style={{ fontSize: 11, color: 'var(--navy-light)' }}>{r.listing?.neighbourhood}</div></td>
                      <td style={tdStyle}>{r.budget}</td>
                      <td style={{ ...tdStyle, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{new Date(r.createdAt).toLocaleDateString('en-IN')}</td>
                      <td style={tdStyle}><Badge s={r.status} /></td>
                      <td style={tdStyle}>
                        {r.status === 'PENDING' && (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => action(`/api/admin/requests/${r.id}/approve`)} style={{ background: 'rgba(42,92,69,0.1)', color: '#2A5C45', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Approve</button>
                            <button onClick={() => action(`/api/admin/requests/${r.id}/reject`)} style={{ background: 'rgba(139,58,58,0.1)', color: '#8B3A3A', border: 'none', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {(!data?.requests?.length) && (
                    <tr><td colSpan={8} style={{ ...tdStyle, textAlign: 'center', padding: '48px', color: 'var(--navy-light)' }}>No requests yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'submissions' && (
          <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--ivory)' }}>
                    {['Seller', 'Phone', 'Business', 'Location', 'Asking', 'Revenue', 'Date', 'Status', 'Actions'].map(h => <th key={h} style={thStyle}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data?.submissions?.map((s: any) => (
                    <tr key={s.id} onMouseEnter={e => (e.currentTarget.style.background = 'var(--ivory)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={tdStyle}><div style={{ fontWeight: 600 }}>{s.sellerName}</div><div style={{ fontSize: 11, color: 'var(--navy-light)' }}>{s.sellerEmail}</div></td>
                      <td style={tdStyle}>{s.sellerPhone}</td>
                      <td style={tdStyle}>{s.businessType}</td>
                      <td style={tdStyle}>{s.neighbourhood}, {s.city}</td>
                      <td style={{ ...tdStyle, fontFamily: "'DM Mono', monospace" }}>₹{Number(s.askingPrice).toLocaleString('en-IN')}</td>
                      <td style={{ ...tdStyle, fontFamily: "'DM Mono', monospace" }}>₹{Number(s.monthlyRevenue).toLocaleString('en-IN')}</td>
                      <td style={{ ...tdStyle, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{new Date(s.createdAt).toLocaleDateString('en-IN')}</td>
                      <td style={tdStyle}><Badge s={s.status} /></td>
                      <td style={tdStyle}>
                        {s.status === 'PENDING' && (
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={() => action(`/api/admin/submissions/${s.id}/status`, { status: 'CONVERTED' })} style={{ background: 'rgba(42,92,69,0.1)', color: '#2A5C45', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Convert</button>
                            <button onClick={() => action(`/api/admin/submissions/${s.id}/status`, { status: 'REJECTED' })} style={{ background: 'rgba(139,58,58,0.1)', color: '#8B3A3A', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {(!data?.submissions?.length) && (
                    <tr><td colSpan={9} style={{ ...tdStyle, textAlign: 'center', padding: '48px', color: 'var(--navy-light)' }}>No submissions yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'listings' && (
          <div style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--ivory)' }}>
                    {['Business Type', 'Category', 'Location', 'Price Range', 'Date Added', 'Status', 'Actions'].map(h => <th key={h} style={thStyle}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data?.listings?.map((l: any) => (
                    <tr key={l.id} onMouseEnter={e => (e.currentTarget.style.background = 'var(--ivory)')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>{l.businessType}</td>
                      <td style={tdStyle}>{l.category}</td>
                      <td style={tdStyle}>{l.neighbourhood}</td>
                      <td style={{ ...tdStyle, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>₹{(l.askingPriceRangeMin/100000).toFixed(0)}L–{(l.askingPriceRangeMax/100000).toFixed(0)}L</td>
                      <td style={{ ...tdStyle, fontFamily: "'DM Mono', monospace", fontSize: 11 }}>{new Date(l.createdAt).toLocaleDateString('en-IN')}</td>
                      <td style={tdStyle}><Badge s={l.status} /></td>
                      <td style={tdStyle}>
                        <select value={l.status} onChange={e => action(`/api/admin/listings/${l.id}/status`, { status: e.target.value })} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid var(--border)', fontSize: 12, background: 'var(--ivory)', cursor: 'pointer', color: 'var(--navy)' }}>
                          {['PENDING', 'ACTIVE', 'SOLD', 'REJECTED'].map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                  {(!data?.listings?.length) && (
                    <tr><td colSpan={7} style={{ ...tdStyle, textAlign: 'center', padding: '48px', color: 'var(--navy-light)' }}>No listings yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
