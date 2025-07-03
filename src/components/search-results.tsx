import { useEffect, useState } from 'react'
import { sanityClient } from '@/lib/sanity'
import { searchArticlesQuery } from '@/lib/queries'
import { PostCard } from './post-card'
import { Pagination } from './pagination'

interface SearchResultsProps {
  query: string
  category?: string
  tag?: string
  page: number
}

export function SearchResults({ query, category, tag, page }: SearchResultsProps) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchData = async () => {
      try {
        let searchTerm = query || ''
        const params: Record<string, any> = { searchTerm }
        const result = await sanityClient.fetch(searchArticlesQuery, params)
        setPosts(result)
      } catch (err) {
        setError('Error al buscar artículos')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [query, category, tag])

  const limit = 9
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPosts = posts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(posts.length / limit)

  if (loading) {
    return <div className="text-center py-12">Buscando artículos...</div>
  }
  if (error) {
    return <div className="text-center py-12 text-red-500">{error}</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Results Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Resultados de búsqueda
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {posts.length === 0 
            ? 'No se encontraron artículos'
            : `Se encontraron ${posts.length} artículo${posts.length !== 1 ? 's' : ''}`
          }
          {query && ` para "${query}"`}
          {category && ` en la categoría "${category}"`}
          {tag && ` con la etiqueta "${tag}"`}
        </p>
      </div>

      {/* No Results */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No se encontraron resultados
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Intenta con otros términos de búsqueda o revisa la ortografía
          </p>
        </div>
      )}

      {/* Results Grid */}
      {posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedPosts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination 
              currentPage={page}
              totalPages={totalPages}
              baseUrl={`/search?query=${encodeURIComponent(query)}${category ? `&category=${encodeURIComponent(category)}` : ''}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
            />
          )}
        </>
      )}
    </div>
  )
} 