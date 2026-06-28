'use client'

import { useState } from 'react'

interface MapFormData {
  existingAssets: string
  constraints: string
  risks: string
  peopleNeeded: string
  placesNeeded: string
  firstStep: string
}

export default function DreamMapPage() {
  const [dreamId, setDreamId] = useState('')
  const [dreamLoaded, setDreamLoaded] = useState(false)
  const [dreamInfo, setDreamInfo] = useState<{ fullName: string; dreamStatement: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingDream, setLoadingDream] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<string | null>(null)

  const [form, setForm] = useState<MapFormData>({
    existingAssets: '',
    constraints: '',
    risks: '',
    peopleNeeded: '',
    placesNeeded: '',
    firstStep: '',
  })

  const update = (field: keyof MapFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const loadDream = async () => {
    if (!dreamId.trim()) {
      setError('Please enter your Dream ID')
      return
    }
    setError('')
    setLoadingDream(true)
    try {
      const res = await fetch(`/api/dreams/${dreamId.trim()}`)
      if (!res.ok) {
        setError('Dream not found with this ID')
        setLoadingDream(false)
        return
      }
      const data = await res.json()
      setDreamInfo({ fullName: data.fullName, dreamStatement: data.dreamStatement })
      setDreamLoaded(true)
    } catch {
      setError('Unable to connect to server')
    }
    setLoadingDream(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const body: Record<string, unknown> = {
        dreamId: dreamId.trim(),
        existingAssets: form.existingAssets.split('\n').filter(Boolean),
        constraints: form.constraints.split('\n').filter(Boolean),
        risks: form.risks.split('\n').filter(Boolean),
        peopleNeeded: form.peopleNeeded.split('\n').filter(Boolean),
        placesNeeded: form.placesNeeded.split('\n').filter(Boolean),
        firstStep: form.firstStep,
      }

      const res = await fetch('/api/dream-maps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }
      setSuccess(data.id)
    } catch {
      setError('Unable to connect to server')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="rounded-2xl bg-green-50 border border-green-200 p-8">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Dream Map Created</h1>
          <p className="text-sm text-green-600 mb-4">
            Map ID: <span className="font-mono font-bold">{success}</span>
          </p>
          <p className="text-green-700">The Dreams team will review and get back to you soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Dream Map</h1>
      <p className="text-stone-500 mb-8">
        Define what you want, why, what you already have, and your first step.
      </p>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!dreamLoaded ? (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-stone-700 mb-1">Your Dream ID</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={dreamId}
              onChange={(e) => setDreamId(e.target.value)}
              className="flex-1 rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter the Dream ID you received after submitting the form"
            />
            <button
              onClick={loadDream}
              disabled={loadingDream}
              className="rounded-lg bg-purple-600 px-6 py-2 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
            >
              {loadingDream ? 'Loading...' : 'Load Dream'}
            </button>
          </div>
        </div>
      ) : (
        <>
          {dreamInfo && (
            <div className="mb-8 p-4 rounded-lg bg-purple-50 border border-purple-200">
              <p className="font-medium text-purple-800">{dreamInfo.fullName}</p>
              <p className="text-sm text-purple-700 mt-1 italic">&ldquo;{dreamInfo.dreamStatement.substring(0, 200)}...&rdquo;</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">What I want</label>
              <textarea
                value={form.existingAssets}
                onChange={(e) => update('existingAssets', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="One per line"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Why</label>
              <textarea
                value={form.constraints}
                onChange={(e) => update('constraints', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="One reason per line"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">What I already have</label>
              <textarea
                value={form.risks}
                onChange={(e) => update('risks', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Existing assets, skills, relationships"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">What is missing</label>
              <textarea
                value={form.peopleNeeded}
                onChange={(e) => update('peopleNeeded', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Missing knowledge, skills, resources"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Constraints</label>
              <textarea
                value={form.placesNeeded}
                onChange={(e) => update('placesNeeded', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Time, financial, geographical constraints..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Risks</label>
              <textarea
                onChange={(e) => update('existingAssets', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="What could go wrong?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">People to meet</label>
              <textarea
                onChange={(e) => update('peopleNeeded', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Who can help you move forward?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Places to go</label>
              <textarea
                onChange={(e) => update('placesNeeded', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Locations, spaces, environments to explore"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">First step to try</label>
              <textarea
                value={form.firstStep}
                onChange={(e) => update('firstStep', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="The smallest thing you can do this week"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Submitting...' : 'Create Dream Map'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
