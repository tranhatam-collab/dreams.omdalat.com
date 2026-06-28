import Link from 'next/link'
import { notFound } from 'next/navigation'
import { programs } from '@/data/site'

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = programs.find((p) => p.slugVi === params.slug)

  if (!program) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <Link
        href="/vi/chuong-trinh"
        className="inline-flex items-center text-sm text-stone-500 hover:text-purple-600 mb-8 transition-colors"
      >
        &larr; Về danh sách chương trình
      </Link>

      <article className="max-w-3xl">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900">{program.titleVi}</h1>
          <span className="text-sm text-stone-400 bg-stone-100 rounded-full px-3 py-1 flex-shrink-0 mt-2">
            {program.durationVi}
          </span>
        </div>

        <p className="text-lg text-stone-600 leading-relaxed mb-4">{program.descVi}</p>

        <p className="text-sm text-stone-400 mb-8">
          Đơn vị thực hiện: <span className="text-stone-600">{program.owner}</span>
        </p>

        <div className="bg-stone-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Lộ trình</h2>
          <div className="space-y-3">
            {program.pathwayVi.map((step, i) => (
              <div key={step} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-600 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-stone-600">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/vi/uoc-mo-cua-toi"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Đăng ký tham gia
          </Link>
        </div>
      </article>
    </div>
  )
}
