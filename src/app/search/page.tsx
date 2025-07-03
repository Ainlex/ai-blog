'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchForm } from '@/components/search-form'
import { SearchResults } from '@/components/search-results'
import { LoadingSpinner } from '@/components/loading-spinner'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const category = searchParams.get('category') || ''
  const tag = searchParams.get('tag') || ''
  const page = searchParams.get('page') || '1'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Buscar <span className="gradient-text">Artículos</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Encuentra contenido específico sobre Inteligencia Artificial
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="container mx-auto px-4 py-8">
        <SearchForm 
          initialQuery={query}
          initialCategory={category}
          initialTag={tag}
        />
      </div>

      {/* Search Results */}
      {query && (
        <div className="container mx-auto px-4 pb-16">
          <Suspense fallback={<LoadingSpinner />}>
            <SearchResults 
              query={query}
              category={category}
              tag={tag}
              page={parseInt(page)}
            />
          </Suspense>
        </div>
      )}
    </div>
  )
} 