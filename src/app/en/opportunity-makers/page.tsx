import Link from 'next/link'

export default function OpportunityMakersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <article className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Opportunity Makers
        </h1>

        <div className="mt-10 space-y-6 text-lg text-stone-600 leading-relaxed">
          <p>
            Opportunity Makers are individuals and organizations who create space for dreams to be tested. They offer internships, apprenticeships, project collaborations, workspace, mentorship, or practical resources to people who have named their dream and are ready to try a first step.
          </p>
          <p>
            If you have a project, a role, or a resource that could help someone take their first step, you can become an Opportunity Maker.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/en/contact"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Become an Opportunity Maker
          </Link>
        </div>
      </article>
    </div>
  )
}
