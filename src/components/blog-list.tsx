import { getPosts, getPostsByCategory } from '@/lib/notion'
import { PostCard } from './post-card'
import { Pagination } from './pagination'

interface BlogListProps {
  page?: number
  category?: string
  tag?: string
}

export async function BlogList({ page = 1, category, tag }: BlogListProps) {
  // Get posts based on filters
  let posts = category 
    ? await getPostsByCategory(category)
    : await getPosts()

  // Filter by tag if specified
  if (tag) {
    posts = posts.filter(post => post.tags.includes(tag))
  }

  // Pagination
  const limit = 12
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPosts = posts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(posts.length / limit)

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
          {posts.length} artículo{posts.length !== 1 ? 's' : ''} encontrado{posts.length !== 1 ? 's' : ''}
          {tag && ` con la etiqueta "${tag}"`}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
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