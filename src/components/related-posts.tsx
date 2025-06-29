import { getPosts } from '@/lib/notion'
import { PostCard } from './post-card'
import { Post } from '@/types'

interface RelatedPostsProps {
  currentPostId: string
  category: string
  tags: string[]
}

export async function RelatedPosts({ currentPostId, category, tags }: RelatedPostsProps) {
  const allPosts = await getPosts()
  
  // Filtrar posts relacionados (misma categoría o tags similares)
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPostId)
    .filter(post => 
      post.category === category || 
      post.tags.some(tag => tags.includes(tag))
    )
    .slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Artículos Relacionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
} 