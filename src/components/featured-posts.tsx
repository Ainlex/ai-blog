import { getFeaturedPosts } from '@/lib/notion'
import { PostCard } from './post-card'

export async function FeaturedPosts() {
  const posts = await getFeaturedPosts()

  if (posts.length === 0) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">No hay artículos destacados.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} featured />
      ))}
    </div>
  )
} 