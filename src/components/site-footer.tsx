import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-stone-800 mb-3">Dreams Ôm Đà Lạt</h3>
            <p className="text-sm text-stone-500 leading-relaxed">
              Nơi một ước mơ được gọi tên, thử nghiệm và tìm thấy con đường để trở thành thật.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-stone-700 mb-3">Khám phá</h4>
            <div className="space-y-2 text-sm text-stone-500">
              <Link href="/vi/dreams-la-gi" className="block hover:text-purple-600">Dreams là gì</Link>
              <Link href="/vi/hanh-trinh" className="block hover:text-purple-600">Hành trình</Link>
              <Link href="/vi/chuong-trinh" className="block hover:text-purple-600">Chương trình</Link>
              <Link href="/vi/cau-chuyen" className="block hover:text-purple-600">Câu chuyện</Link>
              <Link href="/vi/100-uoc-mo-om-da-lat" className="block hover:text-purple-600">100 Ước Mơ</Link>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-stone-700 mb-3">Pháp lý</h4>
            <div className="space-y-2 text-sm text-stone-500">
              <Link href="/vi/quyen-rieng-tu" className="block hover:text-purple-600">Quyền riêng tư</Link>
              <Link href="/vi/dieu-khoan" className="block hover:text-purple-600">Điều khoản</Link>
              <Link href="/vi/cau-hoi-thuong-gap" className="block hover:text-purple-600">Câu hỏi thường gặp</Link>
              <Link href="/vi/lien-he" className="block hover:text-purple-600">Liên hệ</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 mt-8 pt-8 text-center text-sm text-stone-400">
          <p>&copy; {new Date().getFullYear()} Dreams Ôm Đà Lạt. Một sản phẩm của Ôm Đà Lạt.</p>
          <p className="mt-1 text-xs">
            Dreams không hứa biến ước mơ thành hiện thực. Chúng tôi giúp bạn đặt nó vào bối cảnh thật và tìm một bước có thể kiểm chứng.
          </p>
        </div>
      </div>
    </footer>
  )
}
