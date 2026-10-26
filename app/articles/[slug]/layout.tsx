import { notFound } from 'next/navigation'
import { getTopic } from '@/lib/articles'

// Validated here rather than in the page: loading.tsx starts streaming with a 200 before the page could call notFound().
export default async function ArticleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  if (!getTopic((await params).slug)) notFound()
  return children
}
