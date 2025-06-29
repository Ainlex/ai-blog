import { NextRequest, NextResponse } from 'next/server'
import { searchPosts } from '@/lib/notion'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().min(1).max(100),
  category: z.string().optional(),
  tag: z.string().optional(),
  page: z.coerce.number().min(1).max(100).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Validate query parameters
    const validatedParams = searchSchema.parse({
      query: searchParams.get('query'),
      category: searchParams.get('category'),
      tag: searchParams.get('tag'),
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    })

    const { query, category, tag, page, limit } = validatedParams

    // Build search query
    let searchQuery = query
    if (category) {
      searchQuery += ` category:${category}`
    }
    if (tag) {
      searchQuery += ` tag:${tag}`
    }

    // Search posts
    const posts = await searchPosts(searchQuery)

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = posts.slice(startIndex, endIndex)

    // Calculate pagination info
    const totalPosts = posts.length
    const totalPages = Math.ceil(totalPosts / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    return NextResponse.json({
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          currentPage: page,
          totalPages,
          totalPosts,
          hasNextPage,
          hasPrevPage,
          limit,
        },
        search: {
          query,
          category,
          tag,
        },
      },
    })
  } catch (error) {
    console.error('Search API error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid search parameters',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    )
  }
} 