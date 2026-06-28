import Link from 'next/link'

export default function DangKyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Đăng ký tham gia</h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8">
          Để tham gia các chương trình của Dreams, bước đầu tiên là kể về ước mơ của bạn.
          Chúng tôi sẽ tìm hiểu bối cảnh của bạn và đề xuất chương trình phù hợp.
        </p>

        <div className="bg-stone-50 rounded-xl p-8 md:p-12 text-center">
          <p className="text-stone-600 mb-6">
            Vui lòng điền vào mẫu đăng ký trực tuyến để bắt đầu hành trình.
          </p>
          <Link
            href="/vi/uoc-mo-cua-toi"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Điền mẫu đăng ký
          </Link>
        </div>

        <div className="mt-12 p-6 bg-stone-50 rounded-xl">
          <h2 className="text-lg font-semibold text-stone-800 mb-3">Thông tin liên hệ</h2>
          <p className="text-sm text-stone-500 mb-2">
            Nếu bạn gặp khó khăn khi đăng ký trực tuyến, vui lòng liên hệ:
          </p>
          <p className="text-sm text-stone-600">Email: hello@omdalat.com</p>
        </div>
      </div>
    </div>
  )
}
