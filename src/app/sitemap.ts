import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${siteConfig.domain}`

  const staticRoutes = [
    { url: `${baseUrl}/vi`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/dreams-la-gi`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/uoc-mo-cua-toi`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/ban-do-uoc-mo`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/hanh-trinh`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/chuong-trinh`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/cau-chuyen`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/nguoi-trao-co-hoi`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/dreams-for-dalat`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/danh-cho-to-chuc`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/dang-ky`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/cau-hoi-thuong-gap`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/quyen-rieng-tu`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/dieu-khoan`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/vi/lien-he`, lang: 'vi', lastModified: new Date() },
    { url: `${baseUrl}/en`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/what-is-dreams`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/my-dream`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/dream-map`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/journey`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/programs`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/stories`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/opportunity-makers`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/dreams-for-dalat`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/for-organizations`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/apply`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/faq`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/privacy`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/terms`, lang: 'en', lastModified: new Date() },
    { url: `${baseUrl}/en/contact`, lang: 'en', lastModified: new Date() },
  ]

  const programRoutes = [
    { slugVi: 'goi-ten-mot-uoc-mo', slugEn: 'name-a-dream' },
    { slugVi: 'ban-do-uoc-mo', slugEn: 'dream-map' },
    { slugVi: '21-ngay-cham-mot-uoc-mo', slugEn: '21-day-dream-experiment' },
    { slugVi: 'dream-residency', slugEn: 'dream-residency' },
    { slugVi: 'dream-to-project', slugEn: 'dream-to-project' },
  ]

  const allRoutes = [
    ...staticRoutes,
    ...programRoutes.flatMap((p) => [
      { url: `${baseUrl}/vi/chuong-trinh/${p.slugVi}`, lang: 'vi' as const, lastModified: new Date() },
      { url: `${baseUrl}/en/programs/${p.slugEn}`, lang: 'en' as const, lastModified: new Date() },
    ]),
  ]

  return allRoutes.map((route) => ({
    url: route.url,
    lastModified: route.lastModified,
    changeFrequency: 'monthly' as const,
    priority: route.url === `${baseUrl}/vi` || route.url === `${baseUrl}/en` ? 1 : 0.8,
    alternates: {
      languages: route.lang === 'vi'
        ? { vi: route.url, en: route.url.replace('/vi/', '/en/') }
        : { en: route.url, vi: route.url.replace('/en/', '/vi/') },
    },
  }))
}
