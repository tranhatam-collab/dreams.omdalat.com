import Link from 'next/link'

const flow = [
  { title: 'Gọi tên', desc: 'Đặt tên cho điều bạn vẫn muốn sống, không cần hoàn chỉnh.' },
  { title: 'Bối cảnh', desc: 'Nhìn rõ điều bạn đang có, điều bạn chịu trách nhiệm, điều bạn sẵn sàng thử.' },
  { title: 'Bản đồ', desc: 'Xác định hướng đi, con người, nơi chốn và bước thử đầu tiên.' },
  { title: 'Bước nhỏ', desc: 'Một thử nghiệm có thể kiểm chứng, không phải một quyết định lớn.' },
  { title: 'Hành trình', desc: 'Chọn chương trình hoặc lộ trình phù hợp với bối cảnh của bạn.' },
]

export default function DreamsLaGiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <article className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8">Dreams Ôm Đà Lạt là gì?</h1>

        <p className="text-lg text-stone-600 leading-relaxed mb-6">
          Dreams Ôm Đà Lạt là một nền tảng đồng hành giúp bạn gọi tên điều mình thực sự muốn sống,
          hiểu bối cảnh hiện tại của mình và tìm một bước bắt đầu phù hợp. Dreams không phải một trường học,
          một công ty tư vấn hay một chương trình coaching. Đây là một không gian — nơi một ước mơ có thể
          được đặt tên, thử nghiệm và tìm thấy con đường để trở thành thật.
        </p>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <p className="text-amber-800 font-medium mb-2">Cam kết thương hiệu</p>
          <p className="text-amber-700 text-lg leading-relaxed">
            &ldquo;Một ước mơ không cần bắt đầu bằng một quyết định lớn.&rdquo;
          </p>
          <p className="text-amber-700 mt-3 leading-relaxed">
            Hãy bắt đầu bằng việc gọi tên điều ấy và chọn một bước đủ thật.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-stone-800 mb-4 mt-12">Sứ mệnh</h2>
        <p className="text-stone-600 leading-relaxed mb-6">
          Giúp mỗi người có thể sống một cuộc đời gắn với điều họ thực sự muốn, thay vì chỉ phản ứng
          với những gì xảy đến. Chúng tôi tin rằng một ước mơ — dù nhỏ, dù mơ hồ — xứng đáng được
          lắng nghe, đặt vào bối cảnh thật và có cơ hội được thử.
        </p>

        <h2 className="text-2xl font-bold text-stone-800 mb-4 mt-12">Hành trình từ ước mơ đến bước bắt đầu</h2>
        <div className="space-y-4 mb-8">
          {flow.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-sm font-bold text-purple-600 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-stone-800">{step.title}</h3>
                <p className="text-sm text-stone-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <Link
            href="/vi/uoc-mo-cua-toi"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Bắt đầu gọi tên ước mơ của bạn
          </Link>
        </div>
      </article>
    </div>
  )
}
