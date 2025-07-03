'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import { BlogHeader } from '@/components/blog-header'
import { BlogList } from '@/components/blog-list'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function BlogPage() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1
  const category = searchParams.get('category') || ''
  const tag = searchParams.get('tag') || ''

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