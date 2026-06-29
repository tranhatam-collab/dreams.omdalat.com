'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface StoryRow {
  id: string
  title_vi: string | null
  title_en: string | null
  author_name: string
  publication_status: string
  created_at: string
}

export default function AdminStoriesPage() {
  const router = useRouter()
  const [stories, setStories] = useState<StoryRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStories = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stories', { credentials: 'include' })
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setStories(data.stories || [])
    } catch {
      setStories([])
    }
    setLoading(false)
  }, [router])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStories()
  }, [fetchStories])

  const handleStatusChange = async (id: string, publicationStatus: string) => {
    try {
      const res = await fetch(`/api/admin/stories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ publicationStatus }),
      })
      if (res.ok) fetchStories()
    } catch {}
  }

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Loading...</div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Stories</h1>
        <Link href="/admin" className="text-sm text-purple-600 hover:text-purple-800">Dashboard</Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Title (VI)</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Title (EN)</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Author</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Created</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {stories.map((s) => (
              <tr key={s.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium text-stone-800">{s.title_vi || '-'}</td>
                <td className="px-4 py-3 text-stone-600">{s.title_en || '-'}</td>
                <td className="px-4 py-3 text-stone-600">{s.author_name}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    s.publication_status === 'published' ? 'bg-green-100 text-green-800' :
                    s.publication_status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    s.publication_status === 'review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-stone-100 text-stone-600'
                  }`}>{s.publication_status}</span>
                </td>
                <td className="px-4 py-3 text-stone-500 text-xs">{new Date(s.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 flex gap-2">
                  {s.publication_status === 'draft' && (
                    <button onClick={() => handleStatusChange(s.id, 'review')}
                      className="text-xs text-blue-600 hover:text-blue-800">Send to Review</button>
                  )}
                  {s.publication_status === 'review' && (
                    <button onClick={() => handleStatusChange(s.id, 'approved')}
                      className="text-xs text-green-600 hover:text-green-800">Approve</button>
                  )}
                  {s.publication_status === 'approved' && (
                    <button onClick={() => handleStatusChange(s.id, 'published')}
                      className="text-xs text-purple-600 hover:text-purple-800">Publish</button>
                  )}
                  {s.publication_status === 'published' && (
                    <button onClick={() => handleStatusChange(s.id, 'withdrawn')}
                      className="text-xs text-red-600 hover:text-red-800">Withdraw</button>
                  )}
                </td>
              </tr>
            ))}
            {stories.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-stone-400">No stories yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
