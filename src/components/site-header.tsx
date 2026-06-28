'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav } from '@/data/site'
import { useState } from 'react'

export function SiteHeader() {
  const pathname = usePathname()
  const lang = pathname.startsWith('/en') ? 'en' : 'vi'
  const [mobileOpen, setMobileOpen] = useState(false)

  const otherLang = lang === 'vi' ? 'en' : 'vi'
  const switchHref = pathname
    .replace('/vi/', `/${otherLang}/`)
    .replace('/en/', `/${otherLang}/`)
    .replace(/^\/$/, `/${otherLang}`)
  const switchLabel = lang === 'vi' ? 'English' : 'Tiếng Việt'

  return (
    <header className="border-b border-stone-200 bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href={lang === 'vi' ? '/vi' : '/en'} className="flex items-center gap-2">
            <span className="text-xl font-semibold text-stone-800">Dreams</span>
            <span className="hidden sm:inline text-sm text-stone-500">Ôm Đà Lạt</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {mainNav.map((item) => {
              const href = lang === 'vi' ? item.hrefVi : item.hrefEn
              const label = lang === 'vi' ? item.labelVi : item.labelEn
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={item.labelEn}
                  href={href}
                  className={`transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  {label}
                </Link>
              )
            })}
            <Link
              href={switchHref}
              className="text-xs text-stone-400 hover:text-stone-600 uppercase tracking-wider"
            >
              {switchLabel}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={lang === 'vi' ? '/vi/uoc-mo-cua-toi' : '/en/my-dream'}
              className="hidden sm:inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
            >
              {lang === 'vi' ? 'Kể về ước mơ của bạn' : 'Share your dream'}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-stone-600"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3">
          {mainNav.map((item) => {
            const href = lang === 'vi' ? item.hrefVi : item.hrefEn
            const label = lang === 'vi' ? item.labelVi : item.labelEn
            return (
              <Link key={item.labelEn} href={href} onClick={() => setMobileOpen(false)}
                className="block text-stone-700 hover:text-purple-600 py-1">
                {label}
              </Link>
            )
          })}
          <Link href={switchHref} onClick={() => setMobileOpen(false)}
            className="block text-stone-400 hover:text-stone-600 text-sm py-1">
            {switchLabel}
          </Link>
          <Link href={lang === 'vi' ? '/vi/uoc-mo-cua-toi' : '/en/my-dream'} onClick={() => setMobileOpen(false)}
            className="block text-center rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white mt-3">
            {lang === 'vi' ? 'Kể về ước mơ của bạn' : 'Share your dream'}
          </Link>
        </div>
      )}
    </header>
  )
}
