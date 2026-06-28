import Link from 'next/link'
import { notFound } from 'next/navigation'
import { programs } from '@/data/site'

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = programs.find((p) => p.slugEn === params.slug)

  if (!program) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <article className="max-w-3xl">
        <Link
          href="/en/programs"
          className="inline-flex text-sm text-stone-400 hover:text-purple-600 mb-8 transition-colors"
        >
          &larr; Back to programs
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          {program.titleEn}
        </h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-purple-700 font-medium">
            {program.durationEn}
          </span>
          <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-stone-600">
            By {program.owner}
          </span>
        </div>

        <p className="mt-8 text-lg text-stone-600 leading-relaxed">
          {program.descEn}
        </p>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <Link
            href="/en/my-dream"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Start your journey
          </Link>
        </div>
      </article>
    </div>
  )
}
