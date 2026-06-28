import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export const metadata: Metadata = {
  title: 'Dreams Ôm Đà Lạt',
  description: 'Dreams Ôm Đà Lạt giúp bạn gọi tên điều mình vẫn muốn sống, hiểu bối cảnh hiện tại và tìm một bước bắt đầu phù hợp.',
}

export default async function RootPage() {
  const headersList = await headers()
  const acceptLang = headersList.get('accept-language') || ''
  const prefersVi = acceptLang.startsWith('vi')
  redirect(prefersVi ? '/vi' : '/en')
}
