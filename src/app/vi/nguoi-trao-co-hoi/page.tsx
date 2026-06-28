import Link from 'next/link'

const opportunities = [
  'Mở project thực tế cho người đang thử nghiệm ước mơ',
  'Làm mentor đồng hành cùng một hành trình cụ thể',
  'Cho feedback chuyên môn về ý tưởng, sản phẩm hoặc hướng đi',
  'Tài trợ học bổng, thiết bị, không gian hoặc chi phí thử nghiệm',
  'Cung cấp không gian làm việc, studio, vườn hoặc địa điểm thí điểm',
]

export default function NguoiTraoCoHoiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Người Trao Cơ Hội</h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8">
          Dành cho mentor, founder, doanh nghiệp và chuyên gia muốn tạo cơ hội cho người khác.
          Bạn có thể đóng góp từ kiến thức, thời gian, không gian đến các nguồn lực cụ thể.
        </p>

        <h2 className="text-2xl font-bold text-stone-800 mb-6">Bạn có thể đóng góp</h2>
        <ul className="space-y-4 mb-12">
          {opportunities.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="text-purple-500 mt-1 flex-shrink-0">&#x2022;</span>
              <span className="text-stone-600">{item}</span>
            </li>
          ))}
        </ul>

        <div className="bg-stone-50 rounded-xl p-8 md:p-12">
          <h2 className="text-xl font-semibold text-stone-800 mb-3">Trở thành Người Trao Cơ Hội</h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Nếu bạn muốn đồng hành cùng những ước mơ đang được thử nghiệm tại Đà Lạt,
            hãy liên hệ với chúng tôi.
          </p>
          <Link
            href="/vi/lien-he"
            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors"
          >
            Liên hệ với chúng tôi
          </Link>
        </div>
      </div>
    </div>
  )
}
