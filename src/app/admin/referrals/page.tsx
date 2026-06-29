'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ReferralRow {
  id: string
  dream_id: string
  destination_project: string
  status: string
  created_at: string
}

export default function AdminReferralsPage() {
  const router = useRouter()
  const [referrals, setReferrals] = useState<ReferralRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReferrals = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/referrals', { credentials: 'include' })
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setReferrals(data.referrals || [])
    } catch {
      setReferrals([])
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReferrals()
  }, [fetchReferrals])

  const handleAction = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/referrals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      })
      if (res.ok) fetchReferrals()
    } catch {}
  }

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Loading...</div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Referrals</h1>
        <Link href="/admin" className="text-sm text-purple-600 hover:text-purple-800">Dashboard</Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Referral ID</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Dream ID</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Destination</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Created</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {referrals.map((r) => (
              <tr key={r.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-mono text-xs text-stone-500">{r.id.substring(0, 8)}...</td>
                <td className="px-4 py-3 font-mono text-xs text-stone-500">{r.dream_id.substring(0, 8)}...</td>
                <td className="px-4 py-3 text-stone-700">{r.destination_project}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.status === 'requested' ? 'bg-yellow-100 text-yellow-800' :
                    r.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    r.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    r.status === 'revoked' ? 'bg-stone-100 text-stone-600' :
                    'bg-stone-100 text-stone-600'
                  }`}>{r.status}</span>
                </td>
                <td className="px-4 py-3 text-stone-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 flex gap-2">
                  {r.status === 'requested' && (
                    <>
                      <button onClick={() => handleAction(r.id, 'accepted')}
                        className="text-xs text-green-600 hover:text-green-800 font-medium">Accept</button>
                      <button onClick={() => handleAction(r.id, 'rejected')}
                        className="text-xs text-red-600 hover:text-red-800 font-medium">Reject</button>
                    </>
                  )}
                  {r.status === 'accepted' && (
                    <button onClick={() => handleAction(r.id, 'revoked')}
                      className="text-xs text-red-600 hover:text-red-800 font-medium">Revoke</button>
                  )}
                </td>
              </tr>
            ))}
            {referrals.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-400">No referrals yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
