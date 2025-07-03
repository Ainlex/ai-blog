import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/post-card'
import { Pagination } from '@/components/pagination'
import Script from 'next/script'
import { sanityClient } from '@/lib/sanity'
import { articlesByCategoryQuery, allArticlesQuery } from '@/lib/queries'

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    page?: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const categoryName = getCategoryName(slug)
  
  if (!categoryName) {
    return {
      title: 'Categoría no encontrada',
    }
  }

  return {
    title: `${categoryName} - Artículos sobre Inteligencia Artificial`,
    description: `Explora todos los artículos sobre ${categoryName} en nuestro blog de Inteligencia Artificial.`,
    keywords: [categoryName.toLowerCase(), 'inteligencia artificial', 'IA', 'blog'],
  }
}

function getCategoryName(slug: string): string | null {
  const categories: Record<string, string> = {
    'herramientas': 'Herramientas',
    'guias': 'Guías',
    'noticias': 'Noticias',
    'tutoriales': 'Tutoriales',
    'tendencias': 'Tendencias',
    'casos-de-uso': 'Casos de Uso',
    'inteligencia-artificial': 'Inteligencia Artificial',
    'machine-learning': 'Machine Learning',
    'deep-learning': 'Deep Learning',
    'procesamiento-de-lenguaje': 'Procesamiento de Lenguaje',
    'automatizacion': 'Automatización',
    'etica-en-ia': 'Ética en IA',
  }
  
  return categories[slug] || null
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params
  const { page } = await searchParams
  const categoryName = getCategoryName(slug)
  const pageNumber = page ? parseInt(page) : 1
  
  if (!categoryName) {
    notFound()
  }

  let posts: any[] = []
  let totalPosts = 0
  let totalPages = 1
  let apiError = false

  try {
    console.log(`[CategoryPage] Fetching posts for category: ${slug}`)
    
    // Usar Sanity Client directamente en lugar de fetch
    if (slug) {
      console.log('Fetching posts by category:', slug)
      posts = await sanityClient.fetch(articlesByCategoryQuery, { category: slug })
      console.log('Posts found for category:', slug, 'Count:', posts.length)
    } else {
      console.log('Fetching all published posts')
      posts = await sanityClient.fetch(allArticlesQuery)
      console.log('Total posts found:', posts.length)
    }

    totalPosts = posts.length
    const limit = 12
    totalPages = Math.ceil(totalPosts / limit)

    // Aplicar paginación
    const startIndex = (pageNumber - 1) * limit
    const endIndex = startIndex + limit
    posts = posts.slice(startIndex, endIndex)

    console.log('Pagination:', { 
      total: totalPosts, 
      page: pageNumber, 
      startIndex, 
      endIndex, 
      paginatedCount: posts.length 
    })

  } catch (e) {
    console.error(`[CategoryPage] Error:`, e)
    apiError = true
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {totalPosts} artículo{totalPosts !== 1 ? 's' : ''} encontrado{totalPosts !== 1 ? 's' : ''} en esta categoría
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {apiError ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error al cargar los artículos de la categoría
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Intenta recargar la página o vuelve más tarde.
            </p>
          </div>
        ) : (posts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No hay artículos en esta categoría
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Pronto agregaremos contenido sobre {categoryName}.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={pageNumber}
                totalPages={totalPages}
                baseUrl={`/categorias/${slug}`}
              />
            )}
          </>
        ))}
      </div>

      {/* BreadcrumbList JSON-LD para SEO */}
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
              name: 'Categorías',
              item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/categorias`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: categoryName,
              item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/categorias/${slug}`,
            },
          ],
        })}
      </Script>
    </div>
  )
} 