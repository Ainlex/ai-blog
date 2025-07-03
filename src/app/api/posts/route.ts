import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { allArticlesQuery, articlesByCategoryQuery } from '@/lib/queries'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const category = searchParams.get('category') || ''
    const tag = searchParams.get('tag') || ''

    console.log('API Posts - Params:', { page, category, tag })

    let posts: any[] = []
    
    // Usar query específica por categoría si se especifica
    if (category) {
      console.log('Fetching posts by category:', category)
      posts = await sanityClient.fetch(articlesByCategoryQuery, { category })
      console.log('Posts found for category:', category, 'Count:', posts.length)
    } else {
      // Obtener todos los artículos publicados
      console.log('Fetching all published posts')
      posts = await sanityClient.fetch(allArticlesQuery)
      console.log('Total posts found:', posts.length)
    }

    // Filtrar por tag si se especifica (mantener filtro en JS para tags)
    if (tag) {
      console.log('Filtering by tag:', tag)
      posts = posts.filter((post: any) =>
        post.tags?.some((t: any) => t.title.toLowerCase() === tag.toLowerCase())
      )
      console.log('Posts after tag filter:', posts.length)
    }

    // Paginación
    const limit = 12
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = posts.slice(startIndex, endIndex)

    console.log('Pagination:', { 
      total: posts.length, 
      page, 
      startIndex, 
      endIndex, 
      paginatedCount: paginatedPosts.length 
    })

    return NextResponse.json({
      posts: paginatedPosts,
      total: posts.length,
      page,
      totalPages: Math.ceil(posts.length / limit),
      hasNextPage: endIndex < posts.length,
      hasPrevPage: page > 1
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { posts: [], total: 0, page: 1, totalPages: 1, hasNextPage: false, hasPrevPage: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 