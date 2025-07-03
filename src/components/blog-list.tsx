'use client'

import { useState, useEffect } from 'react'
import { PostCard } from './post-card'
import { Pagination } from './pagination'
import { LoadingSpinner } from './loading-spinner'

interface BlogListProps {
  page?: number
  category?: string
  tag?: string
}

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt: string
  mainImage?: {
    url: string
  }
  author?: {
    name: string
    image?: {
      asset: {
        url: string
      }
    }
  }
  category?: {
    title: string
    slug: { current: string }
  }
  tags?: Array<{
    title: string
    slug: { current: string }
  }>
  readingTime?: number
}

export function BlogList({ page = 1, category, tag }: BlogListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPosts, setTotalPosts] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return; // Solo ejecutar en el cliente
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (category) params.set('category', category)
        if (tag) params.set('tag', tag)
        params.set('page', page.toString())

        // Usar URL absoluta para evitar problemas de parsing
        const baseUrl = window.location.origin
        const response = await fetch(`${baseUrl}/api/posts?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Error al cargar los artículos')
        }

        const data = await response.json()
        
        // Transformar los datos para que coincidan con la estructura esperada por PostCard
        const transformedPosts = data.posts.map((post: any) => ({
          ...post,
          // Tomar la primera categoría como category (para compatibilidad con PostCard)
          category: post.categories && post.categories.length > 0 ? post.categories[0] : undefined,
          // Asegurar que mainImage tenga la estructura correcta
          mainImage: post.mainImage ? { url: post.mainImage.url } : undefined,
          // Asegurar que author.image tenga la estructura correcta
          author: post.author ? {
            ...post.author,
            image: post.author.image ? { asset: { url: post.author.image.url } } : undefined
          } : undefined
        }))
        
        setPosts(transformedPosts)
        setTotalPosts(data.total)
      } catch (err) {
        console.error('BlogList fetch error:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido')
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page, category, tag])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Error al cargar artículos
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Intentar de nuevo
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No se encontraron artículos
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {category && `en la categoría "${category}"`}
          {tag && `con la etiqueta "${tag}"`}
          {!category && !tag && 'disponibles en este momento.'}
        </p>
      </div>
    )
  }

  // Paginación
  const limit = 12
  const totalPages = Math.ceil(totalPosts / limit)

  // Build base URL for pagination
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (tag) params.set('tag', tag)
  const baseUrl = `/blog?${params.toString()}`

  return (
    <div>
      {/* Results Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {category ? `Artículos de ${category}` : 'Todos los Artículos'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {totalPosts} artículo{totalPosts !== 1 ? 's' : ''} encontrado{totalPosts !== 1 ? 's' : ''}
          {tag && ` con la etiqueta "${tag}"`}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination 
          currentPage={page}
          totalPages={totalPages}
          baseUrl={baseUrl}
        />
      )}
    </div>
  )
} 