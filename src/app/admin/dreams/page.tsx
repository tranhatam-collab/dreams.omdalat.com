'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface DreamRow {
  id: string
  fullName: string
  email: string
  status: string
  dreamStatement: string | null
  createdAt: string
}

export default function AdminDreamsPage() {
  const router = useRouter()
  const [dreams, setDreams] = useState<DreamRow[]>([])
  const [pagination, setPagination] = useState({ page: 1, total: 0, totalPages: 0 })
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchDreams = async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' })
      if (statusFilter) params.set('status', statusFilter)

      const res = await fetch(`/api/admin/dreams?${params}`, { credentials: 'include' })
      if (res.status === 401) {
        router.push('/admin/login')
        return
      }
      const data = await res.json()
      setDreams(data.dreams)
      setPagination(data.pagination)
    } catch {
      router.push('/admin/login')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchDreams()
  }, [statusFilter])

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Dreams</h1>
        <Link href="/admin" className="text-sm text-purple-600 hover:text-purple-800">Back to Dashboard</Link>
      </div>

      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="">All statuses</option>
          <option value="submitted">Submitted</option>
          <option value="under_review">Under Review</option>
          <option value="mapped">Mapped</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <p className="text-stone-500">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border border-stone-200">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-stone-600">ID</th>
                  <th className="text-left px-4 py-3 font-medium text-stone-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-stone-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-stone-600">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-stone-600">Created</th>
                  <th className="text-left px-4 py-3 font-medium text-stone-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {dreams.map((dream) => (
                  <tr key={dream.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3 font-mono text-xs text-stone-500">{dream.id.substring(0, 8)}...</td>
                    <td className="px-4 py-3 font-medium text-stone-800">{dream.fullName}</td>
                    <td className="px-4 py-3 text-stone-600">{dream.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        dream.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                        dream.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                        dream.status === 'mapped' ? 'bg-green-100 text-green-800' :
                        dream.status === 'active' ? 'bg-purple-100 text-purple-800' :
                        dream.status === 'closed' ? 'bg-stone-100 text-stone-600' :
                        'bg-stone-100 text-stone-600'
                      }`}>
                        {dream.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-500 text-xs">{new Date(dream.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/dreams/${dream.id}`} className="text-purple-600 hover:text-purple-800 text-xs font-medium">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {dreams.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-stone-400">No dreams found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => fetchDreams(p)}
                  className={`px-3 py-1 text-sm rounded ${
                    p === pagination.page ? 'bg-purple-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
