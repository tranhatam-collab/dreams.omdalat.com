import Link from 'next/link'

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <article className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Apply
        </h1>

        <div className="mt-10 space-y-6 text-lg text-stone-600 leading-relaxed">
          <p>
            The 100 Dreams of Om Dalat program is currently accepting applications. If you are ready to name your dream, work through the map, and take a first step, this program is for you.
          </p>
          <p>
            To apply, you will need to submit a Dream Statement, answer a few questions about your current context, and indicate your interest in one or more dream groups.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/en/my-dream"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Start your application
          </Link>
          <Link
            href="/en/programs"
            className="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-colors"
          >
            View programs
          </Link>
        </div>
      </article>
    </div>
  )
}
