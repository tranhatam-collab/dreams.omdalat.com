import Link from 'next/link'

export default function CauChuyenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Câu chuyện</h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-4">
          Những câu chuyện về ước mơ được gọi tên, thử nghiệm và tìm thấy hướng đi.
        </p>
        <p className="text-sm text-stone-400 italic mb-12">
          Câu chuyện được chia sẻ với sự đồng ý của người tham gia.
        </p>

        <div className="bg-stone-50 rounded-xl p-8 md:p-12 text-center">
          <p className="text-stone-500 mb-4">
            Hiện chưa có câu chuyện nào được công bố. Hãy quay lại sau.
          </p>
          <Link
            href="/vi/uoc-mo-cua-toi"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Chia sẻ ước mơ của bạn
          </Link>
        </div>
      </div>
    </div>
  )
}
