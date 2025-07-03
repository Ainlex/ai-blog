import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    // Query para obtener conteos de artículos por categoría
    const query = `
      *[_type == "category"] {
        _id,
        title,
        "slug": slug.current,
        "articleCount": count(*[_type == "article" && publishedAt <= now() && references(^._id)])
      } | order(title asc)
    `
    
    const categories = await sanityClient.fetch(query)
    
    // Convertir a formato de conteos por nombre de categoría
    const counts: Record<string, number> = {}
    categories.forEach((cat: any) => {
      counts[cat.title] = cat.articleCount
    })
    
    return NextResponse.json({
      success: true,
      counts,
      categories
    })
  } catch (error) {
    console.error('Error fetching category counts:', error)
    return NextResponse.json({
      success: false,
      counts: {},
      categories: [],
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
} 