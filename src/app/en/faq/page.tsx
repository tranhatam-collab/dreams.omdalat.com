const faqs = [
  {
    q: 'What is Dreams Om Dalat?',
    a: 'Dreams Om Dalat is a program that helps people name what they still want to live, understand their current circumstances, and find a practical first step. It is not therapy, coaching, or an accelerator.',
  },
  {
    q: 'Is Dreams Om Dalat only for people in Dalat?',
    a: 'No. While the program is rooted in Dalat and many activities happen here, you can participate from anywhere. Some programs are online, and some require being in Dalat.',
  },
  {
    q: 'Does Dreams guarantee my dream will come true?',
    a: 'No. Dreams does not promise to make a dream come true. It helps place the dream in real context and identify a step that can be tested.',
  },
  {
    q: 'How long does the program take?',
    a: 'It depends on the program. Name a Dream is 1 session or 3 days. Dream Map takes 7 days. The 21-Day Dream Experiment runs for 21 days. Dream Residency is 3-28 days.',
  },
  {
    q: 'Is there a cost?',
    a: 'Some programs are free, some have a fee. Details are provided when you apply. The 100 Dreams of Om Dalat program may have subsidized slots.',
  },
  {
    q: 'Can I participate anonymously?',
    a: 'Yes. You can choose to keep your dream private, share it anonymously in the story collection, or make it public.',
  },
  {
    q: 'What happens after I submit my Dream Statement?',
    a: 'Your statement is reviewed. You may be invited to a Dream Map session to explore your context. From there, a pathway or program is suggested based on your situation.',
  },
  {
    q: 'Who runs Dreams Om Dalat?',
    a: 'Dreams Om Dalat is a project of Om Dalat, a community ecosystem in Dalat, Vietnam. It is built and operated by a small team with backgrounds in design, technology, and community work.',
  },
]

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <div className="mt-12 space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-stone-200 pb-8">
              <h2 className="text-lg font-semibold text-stone-800">
                {faq.q}
              </h2>
              <p className="mt-3 text-stone-500 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
