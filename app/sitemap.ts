import type { MetadataRoute } from 'next'
import { categories, machines } from '@/lib/catalog'
import { news } from '@/lib/news'
import { absoluteUrl } from '@/lib/seo'

const reviewed = new Date('2026-10-12')

const staticPages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/catalog', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/service', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/parts', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/leasing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/dealers', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/news', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contacts', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: reviewed,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...categories.map((category) => ({
      url: absoluteUrl(`/catalog/category/${category.slug}`),
      lastModified: reviewed,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...machines.map((machine) => ({
      url: absoluteUrl(`/catalog/${machine.slug}`),
      lastModified: reviewed,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...news.map((item) => ({
      url: absoluteUrl(`/news/${item.slug}`),
      lastModified: new Date(item.date),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ]
}
