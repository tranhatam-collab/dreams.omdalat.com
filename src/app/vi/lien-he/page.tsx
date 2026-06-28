export default function LienHePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Liên hệ</h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-12">
          Nếu bạn có thắc mắc, muốn hợp tác hoặc cần hỗ trợ, hãy liên hệ với chúng tôi.
        </p>

        <div className="space-y-6">
          <div className="bg-stone-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-2">Email</h2>
            <p className="text-stone-600">hello@omdalat.com</p>
          </div>

          <div className="bg-stone-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-2">Địa điểm</h2>
            <p className="text-stone-600">Đà Lạt, Lâm Đồng, Việt Nam</p>
          </div>

          <div className="bg-stone-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-2">Mạng xã hội</h2>
            <p className="text-stone-600">
              Facebook: fb.com/omdalat<br />
              Instagram: @omdalat
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
