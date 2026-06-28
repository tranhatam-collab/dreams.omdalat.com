import Link from 'next/link'

export default function WhatIsDreamsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <article className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          What is Dreams Om Dalat?
        </h1>

        <div className="mt-10 space-y-8 text-lg text-stone-600 leading-relaxed">
          <p>
            Dreams Om Dalat is a program that helps people name what they still want to live, understand their current circumstances, and find a practical first step.
          </p>

          <p>
            It is not a therapy program, a coaching service, a startup accelerator, or a wish-fulfillment platform. It is a structured reflective process combined with local context, grounded in the real conditions of Dalat and the people who come here or live here.
          </p>

          <p>
            Dreams works with individuals who feel stuck between what they have and what they want. It does not promise to make a dream come true. It helps place the dream in real context and identify a step that can be tested.
          </p>

          <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 my-10">
            <p className="text-lg font-medium text-purple-900">
              A dream does not need to begin with a major decision.
            </p>
            <p className="mt-2 text-purple-700">
              It begins with naming it. Then looking at where you are. Then choosing one small thing you can try.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-4">
            Mission
          </h2>
          <p>
            To help people who feel uncertain about their next direction find clarity by naming their dream, mapping their real context, and taking a step small enough to test. We do this through guided reflection, local programs, and a community of people who choose to try before they commit.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200 flex flex-col sm:flex-row gap-4">
          <Link
            href="/en/my-dream"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Name your dream
          </Link>
          <Link
            href="/en/journey"
            className="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-colors"
          >
            Explore journeys
          </Link>
        </div>
      </article>
    </div>
  )
}
