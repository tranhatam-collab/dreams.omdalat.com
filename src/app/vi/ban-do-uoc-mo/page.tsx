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

export default function BanDoUocMoPage() {
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
      setError('Vui lòng nhập mã ước mơ')
      return
    }
    setError('')
    setLoadingDream(true)
    try {
      const res = await fetch(`/api/dreams/${dreamId.trim()}`)
      if (!res.ok) {
        setError('Không tìm thấy ước mơ với mã này')
        setLoadingDream(false)
        return
      }
      const data = await res.json()
      setDreamInfo({ fullName: data.fullName, dreamStatement: data.dreamStatement })
      setDreamLoaded(true)
    } catch {
      setError('Không thể kết nối đến máy chủ')
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
        setError(data.error || 'Có lỗi xảy ra')
        setLoading(false)
        return
      }
      setSuccess(data.id)
    } catch {
      setError('Không thể kết nối đến máy chủ')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="rounded-2xl bg-green-50 border border-green-200 p-8">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Bản đồ ước mơ đã được tạo</h1>
          <p className="text-sm text-green-600 mb-4">
            Mã bản đồ: <span className="font-mono font-bold">{success}</span>
          </p>
          <p className="text-green-700">Đội ngũ Dreams sẽ xem xét và phản hồi sớm nhất.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Bản Đồ Ước Mơ</h1>
      <p className="text-stone-500 mb-8">
        Xác định rõ điều bạn muốn, lý do, điều đã có và bước thử đầu tiên.
      </p>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!dreamLoaded ? (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-stone-700 mb-1">Mã ước mơ của bạn</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={dreamId}
              onChange={(e) => setDreamId(e.target.value)}
              className="flex-1 rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Nhập mã ước mơ bạn nhận được sau khi gửi form"
            />
            <button
              onClick={loadDream}
              disabled={loadingDream}
              className="rounded-lg bg-purple-600 px-6 py-2 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
            >
              {loadingDream ? 'Đang tải...' : 'Tải ước mơ'}
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
              <label className="block text-sm font-medium text-stone-700 mb-1">Điều tôi muốn</label>
              <textarea
                value={form.existingAssets}
                onChange={(e) => update('existingAssets', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Mỗi dòng một điều"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Lý do</label>
              <textarea
                value={form.constraints}
                onChange={(e) => update('constraints', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Mỗi dòng một lý do"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Điều tôi đang có</label>
              <textarea
                value={form.risks}
                onChange={(e) => update('risks', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Tài sản, kỹ năng, mối quan hệ hiện có"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Điều còn thiếu</label>
              <textarea
                value={form.peopleNeeded}
                onChange={(e) => update('peopleNeeded', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Kiến thức, kỹ năng, nguồn lực còn thiếu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Giới hạn</label>
              <textarea
                value={form.placesNeeded}
                onChange={(e) => update('placesNeeded', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Giới hạn về thời gian, tài chính, địa lý..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Rủi ro</label>
              <textarea
                onChange={(e) => update('existingAssets', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Điều gì có thể không ổn?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Người cần gặp</label>
              <textarea
                onChange={(e) => update('peopleNeeded', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Ai có thể giúp bạn tiến xa hơn?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Nơi cần đến</label>
              <textarea
                onChange={(e) => update('placesNeeded', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Địa điểm, không gian, môi trường cần tới"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Bước thử đầu tiên</label>
              <textarea
                value={form.firstStep}
                onChange={(e) => update('firstStep', e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Việc nhỏ nhất bạn có thể làm trong tuần này"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Đang gửi...' : 'Tạo bản đồ ước mơ'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
