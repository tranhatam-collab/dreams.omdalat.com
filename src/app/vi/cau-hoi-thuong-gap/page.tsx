const faqs = [
  {
    q: 'Dreams có biến ước mơ của tôi thành hiện thực không?',
    a: 'Không. Dreams giúp bạn gọi tên ước mơ, hiểu bối cảnh và tìm bước bắt đầu. Việc biến nó thành hiện thực phụ thuộc vào hành động của bạn.',
  },
  {
    q: 'Tôi có phải trả phí không?',
    a: 'Một số chương trình có phí, một số miễn phí. Thông tin chi tiết được công bố khi bạn đăng ký.',
  },
  {
    q: 'Tôi có thể giữ câu chuyện riêng tư không?',
    a: 'Có. Bạn chọn mức độ chia sẻ: riêng tư, ẩn danh hoặc công khai. Dreams không công bố thông tin nếu không có sự đồng ý của bạn.',
  },
  {
    q: 'Dreams khác gì với Chạm?',
    a: 'Dreams tập trung vào gọi tên ước mơ và tìm hướng đi. Chạm tập trung vào thử nghiệm và tạo bằng chứng. Hai bên phối hợp trong một số chương trình.',
  },
  {
    q: 'Tôi không ở Đà Lạt, có tham gia được không?',
    a: 'Có. Một số chương trình có thể tham gia trực tuyến. Các chương trình offline yêu cầu có mặt tại Đà Lạt.',
  },
]

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-10">Câu hỏi thường gặp</h1>
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="border border-stone-200 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-stone-800 mb-3">{faq.q}</h2>
              <p className="text-stone-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
