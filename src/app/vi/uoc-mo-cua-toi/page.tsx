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

export default function UocMoCuaToiPage() {
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
      setError('Vui lòng nhập họ và tên')
      return
    }
    if (!form.email.trim()) {
      setError('Vui lòng nhập email')
      return
    }
    if (!form.dreamStatement.trim() || form.dreamStatement.trim().length < 20) {
      setError('Vui lòng nhập ước mơ của bạn (tối thiểu 20 ký tự)')
      return
    }
    if (!form.processingConsent) {
      setError('Bạn cần đồng ý xử lý thông tin để gửi ước mơ')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/dreams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          locale: 'vi',
          consentVersion: consentVersions.processing,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Có lỗi xảy ra')
        setSubmitting(false)
        return
      }
      setSuccess({ dreamId: data.dreamId })
    } catch {
      setError('Không thể kết nối đến máy chủ')
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="rounded-2xl bg-green-50 border border-green-200 p-8">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Ước mơ của bạn đã được ghi nhận</h1>
          <p className="text-green-700 mb-2">
            Cảm ơn bạn đã chia sẻ ước mơ của mình. Chúng tôi sẽ xem xét và liên hệ với bạn trong thời gian sớm nhất.
          </p>
          <p className="text-sm text-green-600 mb-6">
            Mã ước mơ của bạn: <span className="font-mono font-bold">{success.dreamId}</span>
          </p>
          <p className="text-sm text-green-600">
            Hãy giữ mã này để tra cứu sau. Bạn có thể dùng nó để tạo Bản đồ Ước mơ.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-800 mb-2">Kể Về Ước Mơ Của Bạn</h1>
      <p className="text-stone-500 mb-8">
        Hãy dành thời gian để viết về điều bạn thực sự mong muốn. Mọi câu trả lời đều có giá trị.
      </p>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Liên hệ</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Nguyễn Văn A"
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
            <label className="block text-sm font-medium text-stone-700 mb-1">Số điện thoại</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="+84 123 456 789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Nơi ở hiện tại</label>
            <input
              type="text"
              value={form.currentLocation}
              onChange={(e) => update('currentLocation', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Thành phố Hồ Chí Minh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ngôn ngữ ưa thích</label>
            <select
              value={form.preferredLanguage}
              onChange={(e) => update('preferredLanguage', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Chọn ngôn ngữ</option>
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Ước mơ của bạn</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Điều bạn vẫn muốn sống là gì? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.dreamStatement}
              onChange={(e) => update('dreamStatement', e.target.value)}
              rows={5}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Hãy viết một cách tự nhiên nhất..."
            />
            <p className="text-xs text-stone-400 mt-1">{form.dreamStatement.length} ký tự (tối thiểu 20)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Khi nào bạn bắt đầu nghĩ về điều đó?</label>
            <textarea
              value={form.firstThoughtDate}
              onChange={(e) => update('firstThoughtDate', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Vì sao điều này quan trọng?</label>
            <textarea
              value={form.whyItMatters}
              onChange={(e) => update('whyItMatters', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Điều gì đang ngăn bạn?</label>
            <textarea
              value={form.blockers}
              onChange={(e) => update('blockers', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Bạn đã thử điều gì?</label>
            <textarea
              value={form.attempts}
              onChange={(e) => update('attempts', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Bạn sẵn sàng thử bước nhỏ nào?</label>
            <textarea
              value={form.firstSmallStep}
              onChange={(e) => update('firstSmallStep', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Bạn có muốn điều này gắn với Đà Lạt không?</label>
            <textarea
              value={form.dalatConnection}
              onChange={(e) => update('dalatConnection', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Bối cảnh hiện tại</h2>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Công việc hiện tại</label>
            <input
              type="text"
              value={form.currentRole}
              onChange={(e) => update('currentRole', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Trách nhiệm</label>
            <textarea
              value={form.responsibilities}
              onChange={(e) => update('responsibilities', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Thời gian có thể dành</label>
            <input
              type="text"
              value={form.availableTime}
              onChange={(e) => update('availableTime', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ví dụ: 2-3 giờ mỗi tuần"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Ràng buộc tài chính</label>
            <textarea
              value={form.financialConstraints}
              onChange={(e) => update('financialConstraints', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Quan tâm chuyển chỗ ở?</label>
            <select
              value={form.relocationInterest}
              onChange={(e) => update('relocationInterest', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">Chọn...</option>
              <option value="yes">Có, tôi muốn chuyển đến Đà Lạt</option>
              <option value="maybe">Có thể, tôi đang cân nhắc</option>
              <option value="no">Không, tôi muốn gắn bó với nơi hiện tại</option>
              <option value="partial">Tôi muốn ở lại một thời gian trong năm</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Thời điểm mong muốn bắt đầu</label>
            <input
              type="text"
              value={form.startWindow}
              onChange={(e) => update('startWindow', e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ví dụ: Trong 3 tháng tới"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Quyền riêng tư</h2>
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
                <p className="font-medium text-stone-700">Giữ riêng tư</p>
                <p className="text-sm text-stone-500">Thông tin của bạn chỉ được dùng để xử lý nội bộ</p>
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
                <p className="font-medium text-stone-700">Cho phép nghiên cứu ẩn danh</p>
                <p className="text-sm text-stone-500">Ước mơ của bạn có thể được dùng làm dữ liệu nghiên cứu ẩn danh</p>
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
                <p className="font-medium text-stone-700">Cho phép liên hệ về câu chuyện</p>
                <p className="text-sm text-stone-500">Team có thể liên hệ để xin phép kể lại câu chuyện của bạn</p>
              </div>
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-700 border-b border-stone-200 pb-2">Đồng ý xử lý</h2>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.processingConsent}
              onChange={(e) => update('processingConsent', e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-stone-700">
              Tôi đồng ý để Dreams Ôm Đà Lạt xử lý thông tin tôi cung cấp nhằm tạo Dream Statement, xem xét hành trình phù hợp và liên hệ với tôi. <span className="text-red-500">*</span>
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
              Tôi đồng ý nhận email về chương trình và nội dung Dreams.
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
              Tôi đồng ý cho team liên hệ để thảo luận khả năng kể lại câu chuyện của tôi.
            </span>
          </label>
        </section>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Đang gửi...' : 'Gửi ước mơ của tôi'}
        </button>
      </form>
    </div>
  )
}
