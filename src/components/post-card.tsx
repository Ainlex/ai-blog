'use client'

import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useOptimizedNavigation } from '@/hooks/useOptimizedNavigation'

interface PostCardProps {
  post: {
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
  featured?: boolean
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const { navigate, isNavigating } = useOptimizedNavigation()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isNavigating) return
    
    const href = `/blog/${post.slug.current}`
    navigate(href)
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: es })
    } catch {
      return 'Fecha no disponible'
    }
  }

  const readingTime = post.readingTime || Math.ceil((post.excerpt?.length || 0) / 200)

  return (
    <article className={`group ${featured ? 'lg:col-span-2' : ''}`}>
      <Link 
        href={`/blog/${post.slug.current}`}
        onClick={handleClick}
        className={`block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 ${featured ? 'lg:flex lg:items-center' : ''}`}
      >
        {/* Imagen */}
        <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : ''}`}>
          {post.mainImage?.url ? (
            <Image
              src={post.mainImage.url}
              alt={post.title}
              width={featured ? 600 : 400}
              height={featured ? 300 : 250}
              className="w-full h-48 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-100 dark:bg-gray-700"
              priority={featured}
            />
          ) : (
            <div className="w-full h-48 lg:h-64 bg-gradient-to-br from-gray-200 via-blue-100 to-purple-200 dark:from-gray-800 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-600 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Badge de categoría */}
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                {post.category.title}
              </span>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className={`p-6 ${featured ? 'lg:w-1/2 lg:p-8' : ''}`}>
          {/* Meta información */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span>•</span>
            <span>{readingTime} min de lectura</span>
          </div>

          {/* Título */}
          <h3 className={`font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2`}>
            {post.title}
          </h3>

          {/* Extracto */}
          {post.excerpt && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.slug.current}
                  className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          )}

          {/* Autor */}
          <div className="flex items-center gap-3">
            {post.author?.image?.asset?.url ? (
              <Image
                src={post.author.image.asset.url}
                alt={post.author.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z" />
                </svg>
              </div>
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {post.author?.name || 'Anónimo'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
} 