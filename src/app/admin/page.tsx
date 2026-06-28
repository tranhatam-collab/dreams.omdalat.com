'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [auth, setAuth] = useState<{ authenticated: boolean; user?: { name: string; role: string } } | null>(null)
  const [stats, setStats] = useState<{ total: number } | null>(null)

  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin/login')
          return
        }
        setAuth(data)
      })
      .catch(() => router.push('/admin/login'))
  }, [router])

  useEffect(() => {
    if (!auth?.authenticated) return
    fetch('/api/admin/dreams?limit=5', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setStats({ total: data.pagination.total })
      })
      .catch(() => {})
  }, [auth])

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE', credentials: 'include' })
    router.push('/admin/login')
  }

  if (!auth?.authenticated) {
    return <div className="p-8 text-center text-stone-500">Checking authentication...</div>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Admin Dashboard</h1>
          <p className="text-sm text-stone-500">Welcome, {auth.user?.name}</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-800">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-3xl font-bold text-purple-600">{stats?.total || 0}</p>
          <p className="text-sm text-stone-500 mt-1">Total Dreams</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-3xl font-bold text-purple-600">0</p>
          <p className="text-sm text-stone-500 mt-1">Active Programs</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-3xl font-bold text-purple-600">0</p>
          <p className="text-sm text-stone-500 mt-1">Published Stories</p>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-6">
          <p className="text-3xl font-bold text-purple-600">0</p>
          <p className="text-sm text-stone-500 mt-1">Pending Referrals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/dreams" className="rounded-xl border border-stone-200 bg-white p-6 hover:border-purple-300 transition-colors">
          <h3 className="font-semibold text-stone-800">Dreams</h3>
          <p className="text-sm text-stone-500 mt-1">View and manage all dream submissions</p>
        </Link>
        <Link href="/admin/dream-maps" className="rounded-xl border border-stone-200 bg-white p-6 hover:border-purple-300 transition-colors">
          <h3 className="font-semibold text-stone-800">Dream Maps</h3>
          <p className="text-sm text-stone-500 mt-1">Review and manage dream maps</p>
        </Link>
        <Link href="/admin/programs" className="rounded-xl border border-stone-200 bg-white p-6 hover:border-purple-300 transition-colors">
          <h3 className="font-semibold text-stone-800">Programs</h3>
          <p className="text-sm text-stone-500 mt-1">Create and manage programs</p>
        </Link>
        <Link href="/admin/stories" className="rounded-xl border border-stone-200 bg-white p-6 hover:border-purple-300 transition-colors">
          <h3 className="font-semibold text-stone-800">Stories</h3>
          <p className="text-sm text-stone-500 mt-1">Review and publish stories</p>
        </Link>
        <Link href="/admin/referrals" className="rounded-xl border border-stone-200 bg-white p-6 hover:border-purple-300 transition-colors">
          <h3 className="font-semibold text-stone-800">Referrals</h3>
          <p className="text-sm text-stone-500 mt-1">Manage referral requests</p>
        </Link>
        <Link href={auth.user?.role === 'admin' ? '/admin/users' : '#'} className="rounded-xl border border-stone-200 bg-white p-6 hover:border-purple-300 transition-colors">
          <h3 className="font-semibold text-stone-800">Users</h3>
          <p className="text-sm text-stone-500 mt-1">Manage admin users</p>
        </Link>
      </div>
    </div>
  )
}
