import Link from 'next/link'

export default function ForOrganizationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <article className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          For Organizations
        </h1>

        <div className="mt-10 space-y-6 text-lg text-stone-600 leading-relaxed">
          <p>
            Dreams Om Dalat partners with organizations that want to support dreamers. If your organization works with young adults, professionals in transition, or people exploring new directions, Dreams can be a resource for your community.
          </p>
          <p>
            Partnership options include hosting Dream Map workshops, referring individuals to our programs, co-creating custom pathways for your team or community, and becoming an Opportunity Maker.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/en/contact"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Partner with us
          </Link>
        </div>
      </article>
    </div>
  )
}
