export default function QuyenRiengTuPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <article className="max-w-3xl prose prose-stone">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8">Quyền riêng tư</h1>

        <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4">Dữ liệu chúng tôi thu thập</h2>
        <p className="text-stone-600 leading-relaxed mb-4">
          Chúng tôi thu thập thông tin bạn cung cấp khi đăng ký tham gia chương trình: họ tên, email,
          số điện thoại, vị trí địa lý, câu chuyện về ước mơ và các thông tin bối cảnh khác. Chúng tôi
          cũng có thể thu thập dữ liệu sử dụng trang web thông qua cookie và công cụ phân tích.
        </p>

        <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4">Các loại đồng ý</h2>
        <p className="text-stone-600 leading-relaxed mb-4">
          Dreams sử dụng cơ chế đồng ý rõ ràng cho từng mục đích xử lý dữ liệu:
        </p>
        <ul className="space-y-2 text-stone-600 mb-4 list-disc pl-6">
          <li><strong>Xử lý:</strong> đồng ý cho Dreams lưu trữ và xử lý dữ liệu để phục vụ hành trình của bạn.</li>
          <li><strong>Tiếp thị:</strong> đồng ý nhận thông tin về chương trình và sự kiện.</li>
          <li><strong>Liên hệ câu chuyện:</strong> đồng ý để Dreams liên hệ xin phép công bố câu chuyện.</li>
          <li><strong>Công bố câu chuyện:</strong> đồng ý cụ thể cho từng câu chuyện được công bố.</li>
          <li><strong>Giới thiệu:</strong> đồng ý chuyển dữ liệu sang đối tác phù hợp.</li>
        </ul>
        <p className="text-stone-600 leading-relaxed mb-4">
          Bạn có thể rút lại đồng ý bất kỳ lúc nào bằng cách liên hệ với chúng tôi.
        </p>

        <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4">Mục đích sử dụng</h2>
        <p className="text-stone-600 leading-relaxed mb-4">
          Dữ liệu của bạn được sử dụng để: xử lý đăng ký tham gia chương trình, xây dựng bản đồ ước mơ,
          đề xuất hành trình phù hợp, liên hệ trao đổi về hành trình của bạn, cải thiện dịch vụ và
          (nếu có đồng ý) gửi thông tin về chương trình.
        </p>

        <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4">Lưu trữ dữ liệu</h2>
        <p className="text-stone-600 leading-relaxed mb-4">
          Chúng tôi lưu trữ dữ liệu của bạn trong thời gian cần thiết để phục vụ hành trình của bạn
          và tuân thủ nghĩa vụ pháp lý. Khi không còn cần thiết, dữ liệu sẽ được xóa hoặc ẩn danh.
        </p>

        <h2 className="text-2xl font-bold text-stone-800 mt-10 mb-4">Quyền của bạn</h2>
        <p className="text-stone-600 leading-relaxed mb-4">
          Bạn có quyền: yêu cầu truy cập dữ liệu, yêu cầu chỉnh sửa dữ liệu không chính xác,
          yêu cầu xóa dữ liệu, rút lại đồng ý, yêu cầu hạn chế xử lý và yêu cầu chuyển dữ liệu.
          Để thực hiện các quyền này, vui lòng liên hệ hello@omdalat.com.
        </p>
      </article>
    </div>
  )
}
