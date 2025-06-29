import { NextResponse } from 'next/server'
import { getFeaturedPosts } from '@/lib/notion'

export async function GET() {
  try {
    const posts = await getFeaturedPosts()

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
    })
  } catch (error) {
    console.error('Featured posts API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Error al cargar los posts destacados',
        posts: [],
        count: 0,
      },
      { status: 500 }
    )
  }
} 