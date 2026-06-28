import Link from 'next/link'

export default function DreamsForDalatPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <article className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Dreams for Dalat
        </h1>

        <div className="mt-10 space-y-6 text-lg text-stone-600 leading-relaxed">
          <p>
            Dreams for Dalat is a community initiative that connects people who have dreams tied to Dalat with the people, places, and resources already here. Whether you want to move here, start something here, or contribute to the local community, this initiative helps you find your place.
          </p>
          <p>
            Dalat has always been a place where people come to think, rest, and begin again. Dreams for Dalat honors that tradition by offering a structured way to turn a Dalat-connected dream into something real.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/en/my-dream"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Share your Dalat dream
          </Link>
          <Link
            href="/en/contact"
            className="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-colors"
          >
            Get involved
          </Link>
        </div>
      </article>
    </div>
  )
}
