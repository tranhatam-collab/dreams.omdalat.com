'use client'

import { useState } from 'react'
import { consentVersions } from '@/data/site'

interface FormData {
  fullName: string
  email: string
  phone: string
  currentLocation: string
  preferredLanguage: string
  dreamStatement: string
  firstThoughtDate: string
  whyItMatters: string
  blockers: string
  attempts: string
  firstSmallStep: string
  dalatConnection: string
  currentRole: string
  responsibilities: string
  availableTime: string
  financialConstraints: string
  relocationInterest: string
  startWindow: string
  privacyLevel: 'private' | 'anonymous' | 'public'
  processingConsent: boolean
  marketingConsent: boolean
  storyContactConsent: boolean
}

export default function MyDreamPage() {
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    currentLocation: '',
    preferredLanguage: '',
    dreamStatement: '',
    firstThoughtDate: '',
    whyItMatters: '',
    blockers: '',
    attempts: '',
    firstSmallStep: '',
    dalatConnection: '',
    currentRole: '',
    responsibilities: '',
    availableTime: '',
    financialConstraints: '',
    relocationInterest: '',
    startWindow: '',
    privacyLevel: 'private',
    processingConsent: false,
    marketingConsent: false,
    storyContactConsent: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<{ dreamId: string } | null>(null)

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.fullName.trim()) {
      setError('Please enter your full name')
      return
    }
    if (!form.email.trim()) {
      setError('Please enter your email')
      return
    }
    if (!form.dreamStatement.trim() || form.dreamStatement.trim().length < 20) {
      setError('Please describe your dream (minimum 20 characters)')
      return
    }
    if (!form.processingConsent) {
      setError('You must agree to data processing to submit your dream')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/dreams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          locale: 'en',
          consentVersion: consentVersions.processing,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setSubmitting(false)
        return
      }
      setSuccess({ dreamId: data.dreamId })
    } catch {
      setError('Unable to connect to server')
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="rounded-2xl bg-green-50 border border-green-200 p-8">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Your Dream Has Been Recorded</h1>
          <p className="text-green-700 mb-2">
            Thank you for sharing your dream. We will review it and get back to you soon.
          </p>
          <p className="text-sm text-green-600 mb-6">
            Your Dream ID: <span className="font-mono font-bold">{success.dreamId}</span>
          </p>
          <p className="text-sm text-green-600">
            Keep this ID for future reference. You can use it to create a Dream Map.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Share Your Dream</h1>
      <p className="text-stone-500 mb-8">
        Take your time to write about what you truly want. Every answer matters.
      </p>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Contact</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="example@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="+84 123 456 789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Current Location</label>
            <input
              type="text"
              value={form.currentLocation}
              onChange={(e) => update('currentLocation', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ho Chi Minh City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Preferred Language</label>
            <select
              value={form.preferredLanguage}
              onChange={(e) => update('preferredLanguage', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select language</option>
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Your Dream</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              What is it that you still want to live? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.dreamStatement}
              onChange={(e) => update('dreamStatement', e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Write as naturally as you can..."
            />
            <p className="text-xs text-stone-400 mt-1">{form.dreamStatement.length} characters (minimum 20)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">When did you first think about this?</label>
            <textarea
              value={form.firstThoughtDate}
              onChange={(e) => update('firstThoughtDate', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Why does this matter to you?</label>
            <textarea
              value={form.whyItMatters}
              onChange={(e) => update('whyItMatters', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">What is holding you back?</label>
            <textarea
              value={form.blockers}
              onChange={(e) => update('blockers', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">What have you tried so far?</label>
            <textarea
              value={form.attempts}
              onChange={(e) => update('attempts', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">What small step are you willing to try?</label>
            <textarea
              value={form.firstSmallStep}
              onChange={(e) => update('firstSmallStep', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Would you like this to be connected to Dalat?</label>
            <textarea
              value={form.dalatConnection}
              onChange={(e) => update('dalatConnection', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Current Context</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Current Role</label>
            <input
              type="text"
              value={form.currentRole}
              onChange={(e) => update('currentRole', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Responsibilities</label>
            <textarea
              value={form.responsibilities}
              onChange={(e) => update('responsibilities', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Available Time</label>
            <input
              type="text"
              value={form.availableTime}
              onChange={(e) => update('availableTime', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g. 2-3 hours per week"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Financial Constraints</label>
            <textarea
              value={form.financialConstraints}
              onChange={(e) => update('financialConstraints', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Interested in Relocating?</label>
            <select
              value={form.relocationInterest}
              onChange={(e) => update('relocationInterest', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Select...</option>
              <option value="yes">Yes, I want to move to Dalat</option>
              <option value="maybe">Maybe, I am considering it</option>
              <option value="no">No, I want to stay where I am</option>
              <option value="partial">I want to stay part of the year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Preferred Start Time</label>
            <input
              type="text"
              value={form.startWindow}
              onChange={(e) => update('startWindow', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="e.g. Within the next 3 months"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Privacy</h2>
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-50">
              <input
                type="radio"
                name="privacyLevel"
                checked={form.privacyLevel === 'private'}
                onChange={() => update('privacyLevel', 'private')}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-stone-700">Keep Private</p>
                <p className="text-sm text-stone-500">Your information is used for internal processing only</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-50">
              <input
                type="radio"
                name="privacyLevel"
                checked={form.privacyLevel === 'anonymous'}
                onChange={() => update('privacyLevel', 'anonymous')}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-stone-700">Allow Anonymous Research</p>
                <p className="text-sm text-stone-500">Your dream may be used as anonymous research data</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-lg border border-stone-200 cursor-pointer hover:bg-stone-50">
              <input
                type="radio"
                name="privacyLevel"
                checked={form.privacyLevel === 'public'}
                onChange={() => update('privacyLevel', 'public')}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-stone-700">Allow Story Contact</p>
                <p className="text-sm text-stone-500">The team may contact you to ask about telling your story</p>
              </div>
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Consent</h2>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.processingConsent}
              onChange={(e) => update('processingConsent', e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-stone-700">
              I agree to Dreams Om Dalat processing the information I provide to create a Dream Statement, review suitable pathways, and contact me. <span className="text-red-500">*</span>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.marketingConsent}
              onChange={(e) => update('marketingConsent', e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-stone-600">
              I agree to receive emails about Dreams programs and content.
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.storyContactConsent}
              onChange={(e) => update('storyContactConsent', e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-stone-600">
              I agree to the team contacting me to discuss the possibility of telling my story.
            </span>
          </label>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Submitting...' : 'Submit My Dream'}
        </button>
      </form>
    </div>
  )
}
