import { sanityClient } from '@/lib/sanity'
import { relatedArticlesQuery } from '@/lib/queries'
import { PostCard } from './post-card'
import { Post } from '@/types'

interface RelatedPostsProps {
  currentPostId: string
  category: string
  tags: string[]
}

export async function RelatedPosts({ currentPostId, category, tags }: RelatedPostsProps) {
  // Obtener artículos relacionados desde Sanity
  const relatedPosts = await sanityClient.fetch(relatedArticlesQuery, {
    currentId: currentPostId,
    category,
    tags,
    limit: 3,
  })

  if (!relatedPosts || relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Artículos Relacionados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post: any) => (
          <PostCard key={post._id} post={{
            id: post._id,
            title: post.title,
            slug: post.slug.current,
            excerpt: post.excerpt,
            coverImage: post.mainImage?.url,
            publishedAt: post.publishedAt,
            tags: post.tags?.map((t: any) => t.title) || [],
            category: post.categories?.[0]?.title || '',
            author: post.author?.name || '',
            readTime: post.readTime || 1,
          }} />
        ))}
      </div>
    </section>
  )
} 