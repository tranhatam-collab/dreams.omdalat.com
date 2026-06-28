'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Program } from '@/lib/types'

interface ProgramRow {
  id: string
  title_vi: string
  title_en: string | null
  status: string
  publication_status: string
  created_at: string
}

export default function AdminProgramsPage() {
  const router = useRouter()
  const [programs, setPrograms] = useState<ProgramRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    titleVi: '',
    titleEn: '',
    slugVi: '',
    slugEn: '',
    descriptionVi: '',
    descriptionEn: '',
    ownerProject: '',
    deliveryMode: '',
    duration: '',
    status: 'draft' as Program['status'],
    publicationStatus: 'private' as Program['publicationStatus'],
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchPrograms = async () => {
    try {
      const res = await fetch('/api/admin/programs', { credentials: 'include' })
      if (res.status === 401) { router.push('/admin/login'); return }
      const data = await res.json()
      setPrograms(data.programs || [])
    } catch {
      setPrograms([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPrograms()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const res = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to create program')
        setSaving(false)
        return
      }

      setShowForm(false)
      setForm({
        titleVi: '', titleEn: '', slugVi: '', slugEn: '', descriptionVi: '', descriptionEn: '',
        ownerProject: '', deliveryMode: '', duration: '', status: 'draft', publicationStatus: 'private',
      })
      fetchPrograms()
    } catch {
      setError('Failed to create program')
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Loading...</div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-800">Programs</h1>
        <div className="flex gap-3">
          <Link href="/admin" className="text-sm text-purple-600 hover:text-purple-800">Dashboard</Link>
          <button onClick={() => setShowForm(!showForm)} className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            {showForm ? 'Cancel' : 'New Program'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-red-700 text-sm">{error}</div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="mb-8 rounded-xl border border-stone-200 bg-white p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Title (VI) *</label>
              <input type="text" value={form.titleVi} onChange={(e) => setForm({ ...form, titleVi: e.target.value })}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Title (EN)</label>
              <input type="text" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Slug (VI) *</label>
              <input type="text" value={form.slugVi} onChange={(e) => setForm({ ...form, slugVi: e.target.value })}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Slug (EN)</label>
              <input type="text" value={form.slugEn} onChange={(e) => setForm({ ...form, slugEn: e.target.value })}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Description (VI) *</label>
            <textarea value={form.descriptionVi} onChange={(e) => setForm({ ...form, descriptionVi: e.target.value })}
              rows={3} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Description (EN)</label>
            <textarea value={form.descriptionEn} onChange={(e) => setForm({ ...form, descriptionEn: e.target.value })}
              rows={3} className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Owner Project *</label>
              <input type="text" value={form.ownerProject} onChange={(e) => setForm({ ...form, ownerProject: e.target.value })}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Delivery Mode</label>
              <input type="text" value={form.deliveryMode} onChange={(e) => setForm({ ...form, deliveryMode: e.target.value })}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Duration</label>
              <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Program['status'] })}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={saving}
            className="rounded-lg bg-purple-600 px-6 py-2 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50">
            {saving ? 'Creating...' : 'Create Program'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto rounded-lg border border-stone-200">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Title (VI)</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Title (EN)</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Status</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Publication</th>
              <th className="text-left px-4 py-3 font-medium text-stone-600">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            {programs.map((p) => (
              <tr key={p.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium text-stone-800">{p.title_vi}</td>
                <td className="px-4 py-3 text-stone-600">{p.title_en || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600'
                  }`}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-stone-600">{p.publication_status}</td>
                <td className="px-4 py-3 text-stone-500 text-xs">{new Date(p.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {programs.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-stone-400">No programs yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
