import Link from 'next/link'
import { nineDreamIntents } from '@/data/site'

const contextCards = [
  {
    title: 'Điều tôi muốn',
    desc: 'Không phải điều người khác nghĩ tôi nên muốn. Điều tôi thực sự muốn, dù chưa dám nói ra.',
  },
  {
    title: 'Điều tôi đang có',
    desc: 'Năng lực, thời gian, mối quan hệ, tài chính — kể cả khi chưa đủ, vẫn cần nhìn rõ.',
  },
  {
    title: 'Điều tôi chịu trách nhiệm',
    desc: 'Gia đình, công việc hiện tại, cam kết — những ràng buộc thật, cần được tính đến.',
  },
  {
    title: 'Điều tôi sẵn sàng thử',
    desc: 'Bước nhỏ có thể kiểm chứng — không phải quyết định lớn, chỉ một thử nghiệm.',
  },
]

const flowSteps = [
  { number: '01', title: 'Gọi tên', desc: 'Đặt tên cho điều bạn vẫn muốn sống.' },
  { number: '02', title: 'Hiểu bối cảnh', desc: 'Nhìn rõ điều bạn có, điều bạn thiếu.' },
  { number: '03', title: 'Vẽ bản đồ', desc: 'Xác định hướng đi và những điểm cần kiểm tra.' },
  { number: '04', title: 'Chọn bước nhỏ', desc: 'Một bước có thể kiểm chứng, không cần hoàn chỉnh.' },
  { number: '05', title: 'Tìm hành trình phù hợp', desc: 'Chọn chương trình hoặc lộ trình tương ứng.' },
]

export default function ViHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-medium tracking-widest text-purple-600 uppercase mb-4">
              Dreams Ôm Đà Lạt · Nơi một ước mơ được gọi tên
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6">
              Có một điều bạn vẫn muốn sống, nhưng chưa biết bắt đầu từ đâu?
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8 max-w-2xl">
              Dreams giúp bạn gọi tên điều ấy, hiểu bối cảnh thật của mình và tìm một bước bắt đầu phù hợp.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/vi/uoc-mo-cua-toi"
                className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
              >
                Kể về ước mơ của bạn
              </Link>
              <Link
                href="/vi/hanh-trinh"
                className="inline-flex items-center rounded-full border border-stone-300 px-6 py-3 text-base font-medium text-stone-700 hover:border-purple-300 hover:text-purple-600 transition-colors"
              >
                Khám phá các hành trình
              </Link>
            </div>
            <p className="mt-8 text-sm text-stone-400 italic max-w-xl">
              Dreams không hứa biến ước mơ thành hiện thực. Chúng tôi giúp bạn đặt nó vào bối cảnh thật và tìm một bước có thể kiểm chứng.
            </p>
          </div>
        </div>
      </section>

      {/* Gọi tên section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">Một ước mơ cần được gọi tên</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              Nhiều người biết rõ điều họ không muốn, nhưng không thể gọi tên điều họ thực sự muốn.
              Ước mơ không phải là một kế hoạch hoàn chỉnh. Nó có thể chỉ là một tia cảm thấy, một điều cũ
              chưa nguôi, một hướng mới chưa rõ ràng. Dreams giúp bạn đặt tên cho nó — trước khi nghĩ đến
              chuyện làm sao để đạt được.
            </p>
          </div>
        </div>
      </section>

      {/* Bối cảnh thật section */}
      <section className="py-20 bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Ước mơ cần bối cảnh thật</h2>
          <p className="text-lg text-stone-600 mb-12 max-w-2xl">
            Một ước mơ không tồn tại trong chân không. Nó nằm giữa những điều bạn có, điều bạn chịu trách nhiệm
            và điều bạn sẵn sàng thử.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contextCards.map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-6 border border-stone-200">
                <h3 className="text-lg font-semibold text-stone-800 mb-3">{card.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Từ ước mơ đến bước bắt đầu</h2>
          <p className="text-lg text-stone-600 mb-12 max-w-2xl">
            Hành trình từ một cảm giác mơ hồ đến một bước có thể kiểm chứng.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {flowSteps.map((step) => (
              <div key={step.number} className="relative bg-purple-50 rounded-xl p-6 border border-purple-100">
                <span className="text-sm font-bold text-purple-500">{step.number}</span>
                <h3 className="text-lg font-semibold text-stone-800 mt-2 mb-2">{step.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chín nhóm ước mơ */}
      <section className="py-20 bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Chín nhóm ước mơ</h2>
          <p className="text-lg text-stone-600 mb-12 max-w-2xl">
            Những hướng đi phổ biến mà Dreams đã gặp và đồng hành.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nineDreamIntents.map((item) => (
              <Link
                key={item.id}
                href={item.slugVi}
                className="group bg-white rounded-xl p-6 border border-stone-200 hover:border-purple-200 hover:shadow-sm transition-all"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="text-lg font-semibold text-stone-800 group-hover:text-purple-600 transition-colors mb-2">
                  {item.titleVi}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.descVi}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 100 Ước Mơ Ôm Đà Lạt */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">100 Ước Mơ Ôm Đà Lạt</h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-4">
              100 Ước Mơ là chương trình kiểm chứng hành trình ước mơ trong bối cảnh Đà Lạt. Người tham gia
              được hỗ trợ gọi tên ước mơ, xác định bối cảnh và thử nghiệm một bước đi thực tế.
            </p>
            <p className="text-sm text-stone-500 italic">
              Chúng tôi không cam kết 100 ước mơ sẽ thành hiện thực. Chúng tôi cam kết mỗi ước mơ sẽ được
              lắng nghe, ghi nhận và có cơ hội được thử nghiệm một bước thật.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-purple-600">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto">
            Ước mơ của bạn không cần hoàn chỉnh để được bắt đầu.
          </h2>
          <Link
            href="/vi/uoc-mo-cua-toi"
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-purple-600 hover:bg-purple-50 transition-colors"
          >
            Viết Dream Statement đầu tiên
          </Link>
        </div>
      </section>
    </>
  )
}
