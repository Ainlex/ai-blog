import { Suspense } from 'react'
import { Metadata } from 'next'
import { BlogList } from '@/components/blog-list'
import { BlogHeader } from '@/components/blog-header'
import { LoadingSpinner } from '@/components/loading-spinner'
import Script from 'next/script'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - Artículos sobre Inteligencia Artificial',
  description: 'Explora nuestra colección de artículos sobre IA, machine learning, herramientas y tendencias tecnológicas.',
  keywords: ['blog', 'artículos', 'inteligencia artificial', 'IA', 'machine learning'],
  openGraph: {
    title: 'Blog - Artículos sobre Inteligencia Artificial',
    description: 'Explora nuestra colección de artículos sobre IA, machine learning, herramientas y tendencias tecnológicas.',
    type: 'website',
  },
}

interface BlogPageProps {
  searchParams: {
    page?: string
    category?: string
    tag?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const category = searchParams.category
  const tag = searchParams.tag

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <BlogHeader />

      {/* Breadcrumb visual y JSON-LD */}
      <nav className="mb-6">
        <Link href="/" className="text-gray-500 hover:text-blue-600">Inicio</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700 dark:text-white">Blog</span>
      </nav>
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`,
            },
          ],
        })}
      </Script>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner size="lg" className="py-12" />}>
          <BlogList 
            page={page}
            category={category}
            tag={tag}
          />
        </Suspense>
      </div>
    </div>
  )
} 