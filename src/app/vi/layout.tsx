import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function ViLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[70vh]">{children}</main>
      <SiteFooter />
    </>
  )
}
