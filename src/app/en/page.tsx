import Link from 'next/link'
import { nineDreamIntents } from '@/data/site'

export default function EnHomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium text-purple-600 tracking-widest uppercase mb-6">
              Dreams Om Dalat &middot; Where a dream is named
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight tracking-tight">
              Is there something you still want to live, but do not know where to begin?
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-stone-500 leading-relaxed max-w-2xl mx-auto">
              Dreams Om Dalat helps you name it, understand your current circumstances, and find a first step small enough to begin.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/en/my-dream"
                className="inline-flex items-center rounded-full bg-purple-600 px-8 py-3.5 text-base font-medium text-white hover:bg-purple-700 transition-colors"
              >
                Share your dream
              </Link>
              <Link
                href="/en/journey"
                className="inline-flex items-center rounded-full border border-stone-300 px-8 py-3.5 text-base font-medium text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-colors"
              >
                Explore the journeys
              </Link>
            </div>
            <p className="mt-8 text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
              Dreams does not promise to make a dream come true. It helps place it in real context and identify a step that can be tested.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              A dream needs to be named
            </h2>
            <p className="mt-6 text-lg text-stone-500 leading-relaxed">
              Most people know what they do not want. Few can say clearly what they do want. The difference between a vague frustration and a direction you can walk is the ability to name it. Dreams Om Dalat exists because naming a dream is the first real step toward living it.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            A dream needs real context
          </h2>
          <p className="text-lg text-stone-500 mb-12 max-w-2xl">
            A dream does not exist in a vacuum. It lives inside your life, your responsibilities, your resources, and your willingness to try. These four questions shape the map.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg mb-4">1</div>
              <h3 className="font-semibold text-stone-800 mb-2">What I want</h3>
              <p className="text-sm text-stone-500 leading-relaxed">Not what I should want, not what sounds impressive, but what I actually want.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg mb-4">2</div>
              <h3 className="font-semibold text-stone-800 mb-2">What I have</h3>
              <p className="text-sm text-stone-500 leading-relaxed">Skills, time, money, relationships, experiences I can build on.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg mb-4">3</div>
              <h3 className="font-semibold text-stone-800 mb-2">What I am responsible for</h3>
              <p className="text-sm text-stone-500 leading-relaxed">Obligations I cannot ignore, people I care for, commitments I have made.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg mb-4">4</div>
              <h3 className="font-semibold text-stone-800 mb-2">What I am ready to try</h3>
              <p className="text-sm text-stone-500 leading-relaxed">A small step I can actually take, not a perfect plan I will never start.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            From dream to first step
          </h2>
          <p className="text-lg text-stone-500 mb-12 max-w-2xl">
            A structured but human path that turns uncertainty into direction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
              <h3 className="font-semibold text-stone-800 mb-1">Name</h3>
              <p className="text-sm text-stone-500">Articulate what you truly want</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
              <h3 className="font-semibold text-stone-800 mb-1">Understand context</h3>
              <p className="text-sm text-stone-500">Map your real circumstances</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
              <h3 className="font-semibold text-stone-800 mb-1">Map</h3>
              <p className="text-sm text-stone-500">Identify paths and constraints</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">4</div>
              <h3 className="font-semibold text-stone-800 mb-1">Choose small step</h3>
              <p className="text-sm text-stone-500">Pick one thing you can test</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 font-bold text-lg">5</div>
              <h3 className="font-semibold text-stone-800 mb-1">Find suitable journey</h3>
              <p className="text-sm text-stone-500">Match with a program or pathway</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-12">
            Nine dream groups
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nineDreamIntents.map((dream) => (
              <Link
                key={dream.id}
                href={dream.slugEn}
                className="group block bg-white rounded-xl p-6 border border-stone-200 hover:border-purple-300 hover:shadow-md transition-all"
              >
                <span className="text-2xl mb-3 block">{dream.icon}</span>
                <h3 className="font-semibold text-stone-800 group-hover:text-purple-600 transition-colors">
                  {dream.titleEn}
                </h3>
                <p className="mt-2 text-sm text-stone-500 leading-relaxed">
                  {dream.descEn}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              100 Dreams of Om Dalat
            </h2>
            <p className="mt-6 text-lg text-stone-500 leading-relaxed">
              A validation program for 100 people who are ready to name their dream, work through the map, and take a first step. Participants receive guided support, access to the Dream Map tool, and connection to relevant pathways or programs. The goal is not to make every dream come true, but to help each person find a real next step.
            </p>
            <Link
              href="/en/apply"
              className="mt-8 inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
            >
              Apply for the program
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight max-w-2xl mx-auto">
            Your dream does not need to be complete before it can begin.
          </h2>
          <p className="mt-6 text-lg text-stone-500 max-w-xl mx-auto">
            You only need to be willing to name it and see what happens next.
          </p>
          <Link
            href="/en/my-dream"
            className="mt-8 inline-flex items-center rounded-full bg-purple-600 px-8 py-3.5 text-base font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Write your first Dream Statement
          </Link>
        </div>
      </section>
    </div>
  )
}
