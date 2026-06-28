import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Contact
        </h1>

        <div className="mt-10 space-y-6 text-lg text-stone-600 leading-relaxed">
          <p>
            Have a question, a suggestion, or want to partner with us? Reach out.
          </p>

          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 mt-8">
            <h2 className="font-semibold text-stone-800 mb-4">Email</h2>
            <p className="text-stone-500">
              <a href="mailto:hello@omdalat.com" className="text-purple-600 hover:text-purple-700">
                hello@omdalat.com
              </a>
            </p>
          </div>

          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h2 className="font-semibold text-stone-800 mb-4">Location</h2>
            <p className="text-stone-500">
              Dalat, Lam Dong, Vietnam
            </p>
          </div>

          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
            <h2 className="font-semibold text-stone-800 mb-4">Partnership inquiries</h2>
            <p className="text-stone-500">
              <a href="mailto:partners@omdalat.com" className="text-purple-600 hover:text-purple-700">
                partners@omdalat.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-200">
          <Link
            href="/en/my-dream"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Share your dream
          </Link>
        </div>
      </div>
    </div>
  )
}
