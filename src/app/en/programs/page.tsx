import Link from 'next/link'
import { programs } from '@/data/site'

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Programs
        </h1>
        <p className="mt-6 text-lg text-stone-500 leading-relaxed">
          Structured pathways that match where you are. Each program is designed to help you move from one stage to the next, at your own pace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program) => (
          <Link
            key={program.id}
            href={`/en/programs/${program.slugEn}`}
            className="group block bg-white rounded-xl p-6 border border-stone-200 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <h2 className="text-xl font-semibold text-stone-800 group-hover:text-purple-600 transition-colors">
              {program.titleEn}
            </h2>
            <p className="mt-2 text-sm text-purple-600 font-medium">
              {program.durationEn}
            </p>
            <p className="mt-3 text-sm text-stone-500 leading-relaxed">
              {program.descEn}
            </p>
            <p className="mt-4 text-xs text-stone-400">
              By {program.owner}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
