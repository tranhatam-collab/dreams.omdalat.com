import type { MetadataRoute } from 'next'
import { siteConfig } from '@/data/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'Dreams Ôm Đà Lạt',
    description: siteConfig.descriptionVi,
    start_url: '/vi',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8B5CF6',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
  }
}
