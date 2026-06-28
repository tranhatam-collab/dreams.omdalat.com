import Link from 'next/link'

const areas = [
  'Môi trường',
  'Giáo dục',
  'Văn hóa',
  'Nhà vườn',
  'Du lịch có trách nhiệm',
  'Cộng đồng',
]

const workflow = [
  { title: 'Ý tưởng', desc: 'Một điều bạn muốn làm cho Đà Lạt.' },
  { title: 'Xác minh vấn đề', desc: 'Có thật đây là nhu cầu? Ai đang gặp vấn đề này?' },
  { title: 'Tìm cộng đồng', desc: 'Ai cùng quan tâm? Ai đã làm trước đó?' },
  { title: 'Thử nghiệm nhỏ', desc: 'Một bước có thể kiểm chứng — không cần lớn.' },
  { title: 'Đánh giá', desc: 'Kết quả thế nào? Có nên tiếp tục?' },
  { title: 'Mở rộng hoặc dừng', desc: 'Dựa trên bằng chứng, không dựa trên cảm hứng.' },
]

export default function DreamsForDalatPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Dreams for Dalat</h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8">
          Dreams for Dalat là nhánh dành cho những ước mơ phục vụ cộng đồng Đà Lạt — từ môi trường,
          giáo dục, văn hóa đến phát triển kinh tế địa phương. Không phải dự án từ thiện một chiều,
          mà là sự đồng hành với những người muốn đóng góp cho nơi họ sống.
        </p>

        <h2 className="text-2xl font-bold text-stone-800 mb-6">Lĩnh vực</h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {areas.map((area) => (
            <span
              key={area}
              className="bg-purple-50 text-purple-700 text-sm px-4 py-2 rounded-full border border-purple-100"
            >
              {area}
            </span>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-stone-800 mb-6">Cách thức hoạt động</h2>
        <div className="space-y-4 mb-12">
          {workflow.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-600 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-stone-800">{step.title}</h3>
                <p className="text-sm text-stone-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-stone-50 rounded-xl p-8">
          <h2 className="text-xl font-semibold text-stone-800 mb-3">Bạn có một ý tưởng cho Đà Lạt?</h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Nếu bạn muốn thử nghiệm một ý tưởng phục vụ cộng đồng Đà Lạt, hãy bắt đầu bằng cách
            kể về ước mơ của bạn.
          </p>
          <Link
            href="/vi/uoc-mo-cua-toi"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Kể về ý tưởng của bạn
          </Link>
        </div>
      </div>
    </div>
  )
}
