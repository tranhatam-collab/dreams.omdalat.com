import Link from 'next/link'
import { nineDreamIntents } from '@/data/site'

export default function JourneyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Your Journey
        </h1>
        <p className="mt-6 text-lg text-stone-500 leading-relaxed">
          Every dream starts somewhere. These nine paths represent the most common directions people bring to Dreams Om Dalat. None of them is a fixed track. Each is a starting point for exploration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {nineDreamIntents.map((dream) => (
          <Link
            key={dream.id}
            href={dream.slugEn}
            className="group block bg-white rounded-xl p-6 border border-stone-200 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <span className="text-3xl mb-4 block">{dream.icon}</span>
            <h2 className="text-xl font-semibold text-stone-800 group-hover:text-purple-600 transition-colors">
              {dream.titleEn}
            </h2>
            <p className="mt-3 text-sm text-stone-500 leading-relaxed">
              {dream.descEn}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-purple-600 group-hover:text-purple-700">
              Explore this path &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
