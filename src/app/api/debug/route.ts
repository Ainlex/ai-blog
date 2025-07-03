import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'all'

    let result: any = {}

    switch (action) {
      case 'categories':
        // Debug categorías
        const categoriesQuery = `
          *[_type == "category"] {
            _id,
            title,
            "slug": slug.current,
            "articleCount": count(*[_type == "article" && publishedAt <= now() && references(^._id)])
          } | order(title asc)
        `
        result.categories = await sanityClient.fetch(categoriesQuery)
        break

      case 'articles':
        // Debug artículos
        const articlesQuery = `
          *[_type == "article" && publishedAt <= now()] {
            _id,
            title,
            "slug": slug.current,
            categories[]-> {
              _id,
              title,
              "slug": slug.current
            },
            "hasCategories": count(categories) > 0,
            "categorySlugs": categories[]->slug.current
          } | order(publishedAt desc)
        `
        result.articles = await sanityClient.fetch(articlesQuery)
        break

      case 'testing':
        // Debug específico del artículo Testing
        const testingQuery = `
          *[_type == "article" && title == "Testing"] {
            _id,
            title,
            "slug": slug.current,
            categories[]-> {
              _id,
              title,
              "slug": slug.current
            },
            "hasCategories": count(categories) > 0,
            "categorySlugs": categories[]->slug.current
          }
        `
        result.testing = await sanityClient.fetch(testingQuery)
        break

      case 'herramientas':
        // Debug específico de la categoría herramientas
        const herramientasQuery = `
          *[_type == "article" && publishedAt <= now() && "herramientas" in categories[]->slug.current] {
            _id,
            title,
            "slug": slug.current,
            categories[]-> {
              _id,
              title,
              "slug": slug.current
            }
          }
        `
        result.herramientas = await sanityClient.fetch(herramientasQuery)
        break

      default:
        // Debug completo
        const categoriesQuery = `
          *[_type == "category"] {
            _id,
            title,
            "slug": slug.current,
            "articleCount": count(*[_type == "article" && publishedAt <= now() && references(^._id)])
          } | order(title asc)
        `
        const articlesQuery = `
          *[_type == "article" && publishedAt <= now()] {
            _id,
            title,
            "slug": slug.current,
            categories[]-> {
              _id,
              title,
              "slug": slug.current
            },
            "hasCategories": count(categories) > 0,
            "categorySlugs": categories[]->slug.current
          } | order(publishedAt desc)
        `
        result.categories = await sanityClient.fetch(categoriesQuery)
        result.articles = await sanityClient.fetch(articlesQuery)
    }

    return NextResponse.json({
      success: true,
      action,
      result
    })
  } catch (error) {
    console.error('Debug API Error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  }
}

export async function GETTools(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'principiantes';

  const toolsQuery = `*[_type == "aiTool" && category == $category] {
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    priceType,
    price,
    rating,
    featured,
    usersCount,
    discount,
    affiliateUrl,
    category,
    "icon": {
      "url": icon.asset->url,
      "alt": icon.alt
    },
    tags,
    _createdAt,
    _updatedAt
  }`;

  try {
    const tools = await sanityClient.fetch(toolsQuery, { category });
    
    return NextResponse.json({
      success: true,
      category,
      count: tools.length,
      tools
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 