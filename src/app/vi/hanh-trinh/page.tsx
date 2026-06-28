import Link from 'next/link'
import { nineDreamIntents } from '@/data/site'

export default function HanhTrinhPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Hành trình của bạn</h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          Mỗi người đến với Dreams từ một điều còn dang dở, một cảm giác chưa gọi tên được,
          một hướng đi chưa rõ ràng. Dreams giúp bạn tìm con đường phù hợp — không phải con đường
          duy nhất, mà là con đường có thể bắt đầu từ bối cảnh thật của bạn.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-stone-800 mb-8">Chín nhóm hành trình</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nineDreamIntents.map((item) => (
            <Link
              key={item.id}
              href={item.slugVi}
              className="group bg-white rounded-xl p-6 border border-stone-200 hover:border-purple-200 hover:shadow-sm transition-all"
            >
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h3 className="text-lg font-semibold text-stone-800 group-hover:text-purple-600 transition-colors mb-2">
                {item.titleVi}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">{item.descVi}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-stone-50 rounded-xl p-8 md:p-12">
        <h2 className="text-2xl font-bold text-stone-800 mb-4">Mỗi hành trình bắt đầu bằng một câu chuyện</h2>
        <p className="text-stone-600 leading-relaxed mb-6 max-w-2xl">
          Không có lộ trình cố định cho tất cả. Hành trình của bạn bắt đầu từ câu chuyện của bạn —
          điều bạn muốn, lý do nó quan trọng và bối cảnh bạn đang đứng. Từ đó, Dreams cùng bạn xác
          định hướng đi và chọn bước đầu tiên.
        </p>
        <Link
          href="/vi/uoc-mo-cua-toi"
          className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
        >
          Kể câu chuyện của bạn
        </Link>
      </div>
    </div>
  )
}
