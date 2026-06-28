'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface DreamDetail {
  id: string
  fullName: string
  email: string
  locale: string
  status: string
  dreamStatement: string
  createdAt: string
}

export default function AdminDreamDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [dream, setDream] = useState<DreamDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [newStatus, setNewStatus] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/me`, { credentials: 'include' })
      .then((res) => {
        if (res.status === 401) { router.push('/admin/login'); return null }
        return fetch(`/api/dreams/${id}`)
      })
      .then((res) => res?.json())
      .then((data) => {
        if (data && !data.error) {
          setDream(data)
          setNewStatus(data.status)
        }
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false))
  }, [id, router])

  const handleStatusChange = async () => {
    if (!newStatus || newStatus === dream?.status) return
    setUpdating(true)
    try {
      const res = await fetch(`/api/admin/dreams`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: dream!.id, status: newStatus }),
      })
      if (res.ok) {
        setDream((prev) => prev ? { ...prev, status: newStatus } : null)
      }
    } catch {}
    setUpdating(false)
  }

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Loading...</div>
  }

  if (!dream) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-stone-800 mb-4">Dream not found</h1>
        <Link href="/admin/dreams" className="text-purple-600 hover:text-purple-800">Back to Dreams</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Dream Detail</h1>
        <Link href="/admin/dreams" className="text-sm text-purple-600 hover:text-purple-800">Back to Dreams</Link>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Name</label>
            <p className="text-stone-800">{dream.fullName}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Email</label>
            <p className="text-stone-800">{dream.email}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Locale</label>
            <p className="text-stone-800">{dream.locale}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Created</label>
            <p className="text-stone-800">{new Date(dream.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide">Dream Statement</label>
          <p className="text-stone-800 mt-1 whitespace-pre-wrap">{dream.dreamStatement}</p>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-2">Status</label>
          <div className="flex items-center gap-3">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="clarification_needed">Clarification Needed</option>
              <option value="mapped">Mapped</option>
              <option value="pathway_suggested">Pathway Suggested</option>
              <option value="referred">Referred</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
            <button
              onClick={handleStatusChange}
              disabled={updating || newStatus === dream.status}
              className="rounded-lg bg-purple-600 px-4 py-2 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-2">Quick Actions</label>
          <div className="flex gap-3">
            <Link
              href={`/admin/dream-maps?dreamId=${dream.id}`}
              className="rounded-lg bg-green-600 px-4 py-2 text-white text-sm font-medium hover:bg-green-700"
            >
              Create Dream Map
            </Link>
            <Link
              href={`/admin/referrals?dreamId=${dream.id}`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700"
            >
              View Referrals
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
