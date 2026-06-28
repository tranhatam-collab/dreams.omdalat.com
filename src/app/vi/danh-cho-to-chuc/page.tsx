import Link from 'next/link'

export default function DanhChoToChucPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Dành cho tổ chức</h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8">
          Tổ chức của bạn muốn hỗ trợ những người đang thử nghiệm ước mơ của họ? Dreams kết nối
          các tổ chức với những cá nhân có định hướng rõ ràng, đang cần nguồn lực, cố vấn hoặc
          không gian để thử nghiệm.
        </p>

        <p className="text-stone-600 leading-relaxed mb-4">
          Hợp tác với Dreams, tổ chức của bạn có thể:
        </p>

        <ul className="space-y-3 mb-12 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="text-purple-500 mt-1 flex-shrink-0">&#x2022;</span>
            <span>Tài trợ học bổng tham gia chương trình cho các dreamer</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 mt-1 flex-shrink-0">&#x2022;</span>
            <span>Cung cấp mentor, chuyên gia hoặc cố vấn kỹ thuật</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 mt-1 flex-shrink-0">&#x2022;</span>
            <span>Mở không gian làm việc, studio hoặc địa điểm thử nghiệm</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-purple-500 mt-1 flex-shrink-0">&#x2022;</span>
            <span>Đồng tổ chức các chương trình theo lĩnh vực phù hợp</span>
          </li>
        </ul>

        <div className="bg-stone-50 rounded-xl p-8 md:p-12">
          <h2 className="text-xl font-semibold text-stone-800 mb-3">Quan tâm hợp tác?</h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Hãy liên hệ với chúng tôi để thảo luận về hình thức hợp tác phù hợp.
          </p>
          <Link
            href="/vi/lien-he"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Liên hệ hợp tác
          </Link>
        </div>
      </div>
    </div>
  )
}
