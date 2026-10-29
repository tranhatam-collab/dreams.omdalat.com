export const siteConfig = {
  name: 'Dreams Ôm Đà Lạt',
  domain: 'dreams.omdalat.com',
  descriptionVi:
    'Gọi tên một ước mơ và tìm bước bắt đầu phù hợp với bối cảnh thật của bạn.',
  descriptionEn:
    'Name a dream and find a first step that fits your real context.',
}

export interface NavItem {
  labelVi: string
  labelEn: string
  hrefVi: string
  hrefEn: string
}

export const mainNav: NavItem[] = [
  {
    labelVi: 'Dreams là gì',
    labelEn: 'What is Dreams',
    hrefVi: '/vi/dreams-la-gi',
    hrefEn: '/en/what-is-dreams',
  },
  {
    labelVi: 'Hành trình',
    labelEn: 'Journey',
    hrefVi: '/vi/hanh-trinh',
    hrefEn: '/en/journey',
  },
  {
    labelVi: 'Chương trình',
    labelEn: 'Programs',
    hrefVi: '/vi/chuong-trinh',
    hrefEn: '/en/programs',
  },
  {
    labelVi: 'Câu chuyện',
    labelEn: 'Stories',
    hrefVi: '/vi/cau-chuyen',
    hrefEn: '/en/stories',
  },
  {
    labelVi: 'Liên hệ',
    labelEn: 'Contact',
    hrefVi: '/vi/lien-he',
    hrefEn: '/en/contact',
  },
]

export interface DreamIntent {
  id: string
  icon: string
  titleVi: string
  titleEn: string
  descVi: string
  descEn: string
  slugVi: string
  slugEn: string
}

export const nineDreamIntents: DreamIntent[] = [
  {
    id: 'live-in-dalat',
    icon: '\u{1F3D4}',
    titleVi: 'Sống tại Đà Lạt',
    titleEn: 'Live in Da Lat',
    descVi:
      'Bạn muốn chuyển đến Đà Lạt sống, làm việc hoặc xây dựng cuộc sống mới ở đây.',
    descEn:
      'You want to relocate to Da Lat to live, work, or build a new life here.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
  {
    id: 'career-change',
    icon: '\u{1F500}',
    titleVi: 'Đổi hướng nghề nghiệp',
    titleEn: 'Change career direction',
    descVi:
      'Bạn muốn rời bỏ công việc hiện tại để theo đuổi một hướng đi mới phù hợp hơn.',
    descEn:
      'You want to leave your current job and pursue a direction that fits you better.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
  {
    id: 'learn-skills',
    icon: '\u{1F4DA}',
    titleVi: 'Học kỹ năng mới',
    titleEn: 'Learn new skills',
    descVi:
      'Bạn muốn học thêm kỹ năng để mở ra cơ hội mới hoặc phục vụ ước mơ đang có.',
    descEn:
      'You want to learn new skills to unlock opportunities or serve an existing dream.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
  {
    id: 'start-business',
    icon: '\u{1F680}',
    titleVi: 'Khởi nghiệp',
    titleEn: 'Start a business',
    descVi:
      'Bạn muốn biến một ý tưởng thành sản phẩm, dịch vụ hoặc doanh nghiệp nhỏ.',
    descEn:
      'You want to turn an idea into a product, service, or small business.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
  {
    id: 'build-technology',
    icon: '\u{1F4BB}',
    titleVi: 'Xây dựng công nghệ',
    titleEn: 'Build technology',
    descVi:
      'Bạn muốn tạo ra một sản phẩm công nghệ, ứng dụng hoặc giải pháp kỹ thuật.',
    descEn:
      'You want to create a tech product, app, or technical solution.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
  {
    id: 'build-brand',
    icon: '\u{2728}',
    titleVi: 'Xây thương hiệu',
    titleEn: 'Build a brand',
    descVi:
      'Bạn muốn xây dựng thương hiệu cá nhân hoặc thương hiệu cho sản phẩm của mình.',
    descEn:
      'You want to build a personal brand or a brand for your product.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
  {
    id: 'give-back',
    icon: '\u{1F91D}',
    titleVi: 'Đóng góp cho cộng đồng',
    titleEn: 'Give back to the community',
    descVi:
      'Bạn muốn dùng năng lực, thời gian hoặc nguồn lực để đóng góp cho nơi bạn sống.',
    descEn:
      'You want to use your abilities, time, or resources to contribute to where you live.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
  {
    id: 'create',
    icon: '\u{1F3A8}',
    titleVi: 'Sáng tạo',
    titleEn: 'Create',
    descVi:
      'Bạn muốn viết, vẽ, thiết kế, làm phim hoặc theo đuổi một dự án sáng tạo.',
    descEn:
      'You want to write, draw, design, make films, or pursue a creative project.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
  {
    id: 'find-direction',
    icon: '\u{1F9ED}',
    titleVi: 'Tìm hướng sống mới',
    titleEn: 'Find a new direction',
    descVi:
      'Bạn chưa biết rõ mình muốn gì, nhưng biết cuộc sống hiện tại không còn phù hợp.',
    descEn:
      'You are not sure what you want yet, but you know your current life no longer fits.',
    slugVi: '/vi/hanh-trinh',
    slugEn: '/en/journey',
  },
]

export interface Program {
  id: string
  slugVi: string
  slugEn: string
  titleVi: string
  titleEn: string
  descVi: string
  descEn: string
  durationVi: string
  durationEn: string
  owner: string
  pathwayVi: string[]
  pathwayEn: string[]
}

export const programs: Program[] = [
  {
    id: 'name-a-dream',
    slugVi: 'goi-ten-mot-uoc-mo',
    slugEn: 'name-a-dream',
    titleVi: 'Gọi Tên Một Ước Mơ',
    titleEn: 'Name a Dream',
    descVi:
      'Chương trình nhập môn giúp bạn gọi tên điều đang muốn, phân biệt mong muốn thật và áp lực, ghi nhận bối cảnh và tìm một câu hỏi cần tiếp tục.',
    descEn:
      'An introductory program to help you name what you truly want, distinguish real desire from pressure, acknowledge your context, and find the next question to pursue.',
    durationVi: '1 buổi hoặc 3 ngày',
    durationEn: '1 session or 3 days',
    owner: 'Dreams Ôm Đà Lạt',
    pathwayVi: [
      'Gọi tên điều bạn đang muốn',
      'Phân biệt mong muốn thật và áp lực',
      'Ghi nhận bối cảnh hiện tại',
      'Tìm một câu hỏi để tiếp tục',
    ],
    pathwayEn: [
      'Name what you truly want',
      'Distinguish real desire from external pressure',
      'Acknowledge your current context',
      'Find a question to pursue',
    ],
  },
  {
    id: 'dream-map',
    slugVi: 'ban-do-uoc-mo',
    slugEn: 'dream-map',
    titleVi: 'Bản Đồ Ước Mơ',
    titleEn: 'Dream Map',
    descVi:
      'Xác định rõ điều bạn muốn, điều bạn đang có, điều còn thiếu, giới hạn, rủi ro và bước thử đầu tiên.',
    descEn:
      'Identify what you want, what you have, what is missing, your limits, risks, and your first experimental step.',
    durationVi: '7 ngày',
    durationEn: '7 days',
    owner: 'Dreams Ôm Đà Lạt',
    pathwayVi: [
      'Xác định điều bạn muốn và lý do',
      'Nhìn rõ điều bạn đang có và điều còn thiếu',
      'Ghi nhận giới hạn và rủi ro',
      'Xác định người cần gặp và nơi cần đến',
      'Chọn bước thử đầu tiên',
    ],
    pathwayEn: [
      'Define what you want and why',
      'See what you have and what is missing',
      'Acknowledge limits and risks',
      'Identify people to meet and places to visit',
      'Choose your first experimental step',
    ],
  },
  {
    id: '21-day-dream',
    slugVi: '21-ngay-cham-mot-uoc-mo',
    slugEn: '21-day-dream-experiment',
    titleVi: '21 Ngày Chạm Một Ước Mơ',
    titleEn: '21-Day Dream Experiment',
    descVi:
      'Một hành trình phối hợp giữa Dreams Ôm Đà Lạt và Chạm Ôm Đà Lạt, giúp người tham gia chuyển một ước mơ thành một thử nghiệm nhỏ có đầu ra.',
    descEn:
      'A collaborative journey between Dreams and Cham Om Da Lat, helping participants turn a dream into a small experiment with a tangible outcome.',
    durationVi: '21 ngày',
    durationEn: '21 days',
    owner: 'Dreams + Chạm Ôm Đà Lạt',
    pathwayVi: [
      'Intake và Dream Statement',
      'Tạo Dream Map',
      'Xây dựng giả thuyết và thiết kế thử nghiệm',
      'Thực hiện thử nghiệm nhỏ',
      'Đánh giá kết quả và chọn bước tiếp theo',
    ],
    pathwayEn: [
      'Intake and Dream Statement',
      'Create a Dream Map',
      'Build hypothesis and design experiment',
      'Run the experiment',
      'Review outcome and choose next step',
    ],
  },
  {
    id: 'dream-residency',
    slugVi: 'dream-residency',
    slugEn: 'dream-residency',
    titleVi: 'Dream Residency',
    titleEn: 'Dream Residency',
    descVi:
      'Chương trình lưu trú tại Đà Lạt để thử nghiệm ước mơ trong bối cảnh thực địa, từ 3 ngày định hướng đến 28 ngày residency.',
    descEn:
      'A residency program in Da Lat to test your dream in a real-world setting, from a 3-day orientation to a 28-day full residency.',
    durationVi: '3 / 7 / 14 / 28 ngày',
    durationEn: '3 / 7 / 14 / 28 days',
    owner: 'Dreams + Lily Ôm Đà Lạt',
    pathwayVi: [
      'Intake và dream context',
      'Chọn hình thức lưu trú phù hợp',
      'Thiết kế thử nghiệm tại chỗ',
      'Thực hiện và thu thập bằng chứng',
      'Đánh giá và lộ trình tiếp theo',
    ],
    pathwayEn: [
      'Intake and dream context',
      'Choose residency format',
      'Design on-site experiment',
      'Execute and gather evidence',
      'Review and plan next steps',
    ],
  },
  {
    id: 'dream-to-project',
    slugVi: 'dream-to-project',
    slugEn: 'dream-to-project',
    titleVi: 'Dream to Project',
    titleEn: 'Dream to Project',
    descVi:
      'Dành cho người đã có Dream Statement, một thử nghiệm và tín hiệu tiếp tục. Chuyển ước mơ thành dự án, sản phẩm, dịch vụ hoặc startup.',
    descEn:
      'For those who already have a Dream Statement, an experiment, and a signal to continue. Turn your dream into a project, product, service, or startup.',
    durationVi: 'Linh hoạt',
    durationEn: 'Flexible',
    owner: 'Dreams Ôm Đà Lạt',
    pathwayVi: [
      'Xác nhận Dream Statement và kết quả thử nghiệm',
      'Chọn hình thức dự án phù hợp',
      'Xây dựng kế hoạch thực hiện',
      'Thực hiện và kiểm chứng',
      'Đánh giá và quyết định mở rộng hoặc dừng',
    ],
    pathwayEn: [
      'Confirm Dream Statement and experiment results',
      'Choose the right project format',
      'Build an execution plan',
      'Execute and validate',
      'Review and decide to scale or stop',
    ],
  },
]

export const consentVersions = {
  processing: '2026.1',
  marketing: '2026.1',
  story: '2026.1',
}
