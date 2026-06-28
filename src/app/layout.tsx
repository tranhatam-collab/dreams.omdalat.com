import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Dreams Ôm Đà Lạt | Gọi tên một ước mơ và tìm bước bắt đầu',
  description: 'Dreams Ôm Đà Lạt giúp bạn gọi tên điều mình vẫn muốn sống, hiểu bối cảnh hiện tại và tìm một bước bắt đầu phù hợp.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white text-stone-800 antialiased">
        {children}
      </body>
    </html>
  )
}
