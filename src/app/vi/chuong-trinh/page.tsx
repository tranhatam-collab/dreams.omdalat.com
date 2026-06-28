import Link from 'next/link'
import { programs } from '@/data/site'

export default function ChuongTrinhPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Chương trình</h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          Các chương trình được thiết kế để đồng hành cùng bạn ở từng giai đoạn của hành trình —
          từ gọi tên ước mơ đến biến nó thành một dự án có thể kiểm chứng.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Link
            key={program.id}
            href={`/vi/chuong-trinh/${program.slugVi}`}
            className="group bg-white rounded-xl p-6 border border-stone-200 hover:border-purple-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-xl font-semibold text-stone-800 group-hover:text-purple-600 transition-colors">
                {program.titleVi}
              </h2>
              <span className="text-xs text-stone-400 bg-stone-100 rounded-full px-3 py-1">
                {program.durationVi}
              </span>
            </div>
            <p className="text-sm text-stone-500 leading-relaxed mb-3">{program.descVi}</p>
            <span className="text-xs text-stone-400">{program.owner}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
