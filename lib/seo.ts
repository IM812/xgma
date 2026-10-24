import type { Metadata } from 'next'
import { legal, site, trademark } from '@/lib/site'

// Canonical, sitemap и микроразметка всегда указывают на боевой домен, даже на *.vercel.app.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://xgma-rus.com').replace(/\/$/, '')

export const isIndexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'

export const absoluteUrl = (path = '/') => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

const defaultImage = '/photos/loaders-lineup.jpg'

type PageMetadataInput = {
  path: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  noindex?: boolean
}

const maxTitleWithBrand = 70
const maxDescription = 160

function clampAtWord(text: string, max: number) {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:—–-]+$/, '')}…`
}

export function pageMetadata({ path, title, description: rawDescription, image = defaultImage, type = 'website', publishedTime, noindex }: PageMetadataInput): Metadata {
  const description = clampAtWord(rawDescription, maxDescription)
  // Long headlines drop the brand suffix so search snippets keep the meaningful part.
  const fitsWithBrand = `${title} | ${site.name}`.length <= maxTitleWithBrand
  return {
    title: fitsWithBrand ? title : { absolute: title },
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      locale: 'ru_RU',
      siteName: site.name,
      url: path,
      title,
      description,
      images: [{ url: image }],
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': absoluteUrl('/#organization'),
  name: site.name,
  legalName: legal.owner,
  url: siteUrl,
  logo: absoluteUrl('/brand/xgma-logo.png'),
  description: `${site.status}. ${trademark.notice}`,
  email: site.email,
  telephone: site.phoneE164,
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'RU' },
  areaServed: { '@type': 'Country', name: 'Россия' },
  brand: { '@type': 'Brand', name: 'XGMA' },
  knowsAbout: ['Фронтальные погрузчики', 'Экскаваторы', 'Дорожная техника', 'Складская техника', 'Запчасти и сервис спецтехники'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: site.phoneE164,
    email: site.email,
    areaServed: 'RU',
    availableLanguage: 'ru',
  },
}

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': absoluteUrl('/#website'),
  url: siteUrl,
  name: site.name,
  inLanguage: 'ru-RU',
  publisher: { '@id': absoluteUrl('/#organization') },
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function productLd(input: { name: string; description: string; path: string; image: string; category: string; specs: { label: string; value: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    image: absoluteUrl(input.image),
    category: input.category,
    brand: { '@type': 'Brand', name: 'XGMA' },
    manufacturer: { '@type': 'Organization', name: trademark.holder },
    additionalProperty: input.specs.map((spec) => ({ '@type': 'PropertyValue', name: spec.label, value: spec.value })),
  }
}

export function articleLd(input: { title: string; description: string; path: string; image: string; date: string; kind: 'news' | 'article' }) {
  return {
    '@context': 'https://schema.org',
    '@type': input.kind === 'news' ? 'NewsArticle' : 'Article',
    headline: input.title,
    description: input.description,
    image: [absoluteUrl(input.image)],
    datePublished: input.date,
    dateModified: input.date,
    inLanguage: 'ru-RU',
    mainEntityOfPage: absoluteUrl(input.path),
    author: { '@type': 'Organization', name: site.name, url: siteUrl },
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/brand/xgma-logo.png') } },
  }
}
