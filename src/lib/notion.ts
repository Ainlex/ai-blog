import { Client } from '@notionhq/client'
import { Post, NotionPage } from '@/types'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const databaseId = process.env.NOTION_DATABASE_ID!
console.log('🧪 Notion config check:')
console.log('NOTION_API_KEY:', process.env.NOTION_API_KEY ? '✅ cargada' : '❌ NO cargada')
console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID ? '✅ cargado' : '❌ NO cargado')


export async function getPosts(): Promise<Post[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Estado',
        select: {
          equals: 'Listo',
        },
      },
      sorts: [
        {
          property: 'Fecha',
          direction: 'descending',
        },
      ],
    })

    console.log('NOTION RAW RESPONSE:', JSON.stringify(response.results, null, 2))

    return response.results.map((page: any) => transformNotionPage(page))
  } catch (error) {
    console.error('Error fetching posts from Notion:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Slug',
            rich_text: {
              equals: slug,
            },
          },
          {
            property: 'Estado',
            select: {
              equals: 'Listo',
            },
          },
        ],
      },
    })

    if (response.results.length === 0) {
      return null
    }

    const page = response.results[0] as any
    const post = transformNotionPage(page)

    // Get full content
    const blocks = await notion.blocks.children.list({
      block_id: page.id,
    })

    post.content = await parseNotionBlocks(blocks.results)

    return post
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Estado',
            select: {
              equals: 'Listo',
            },
          },
          {
            property: 'Destacado',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Fecha',
          direction: 'descending',
        },
      ],
      page_size: 6,
    })

    return response.results.map((page: any) => transformNotionPage(page))
  } catch (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }
}

export async function searchPosts(query: string, category?: string, tag?: string): Promise<Post[]> {
  try {
    // Filtros base
    const filters: any[] = [
      {
        property: 'Estado',
        select: {
          equals: 'Listo',
        },
      },
    ]

    // Filtro de búsqueda por texto
    if (query) {
      filters.push({
        or: [
          {
            property: 'Título',
            title: {
              contains: query,
            },
          },
          {
            property: 'Tags',
            multi_select: {
              contains: query,
            },
          },
        ],
      })
    }

    // Filtro de categoría
    if (category) {
      console.log('🟣 Filtro de categoría recibido:', category)
      filters.push({
        or: [
          {
            property: 'CategoriasExtra',
            multi_select: {
              contains: category,
            },
          },
          {
            property: 'Categoría',
            select: {
              equals: category,
            },
          },
        ],
      })
    }

    // Filtro de etiqueta
    if (tag) {
      filters.push({
        property: 'Tags',
        multi_select: {
          contains: tag,
        },
      })
    }

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: filters,
      },
      sorts: [
        {
          property: 'Fecha',
          direction: 'descending',
        },
      ],
    })

    // Log de categorías de los artículos devueltos
    response.results.forEach((page: any) => {
      const categorias = page.properties?.CategoriasExtra?.multi_select?.map((c: any) => c.name)
      console.log('🟢 CategoriasExtra del artículo:', categorias)
    })

    return response.results.map((page: any) => transformNotionPage(page))
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Estado',
            select: {
              equals: 'Listo',
            },
          },
          {
            property: 'CategoriasExtra',
            multi_select: {
              contains: category,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'Fecha',
          direction: 'descending',
        },
      ],
    })

    return response.results.map((page: any) => transformNotionPage(page))
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return []
  }
}

function transformNotionPage(page: any): Post {
  const properties = page.properties

  return {
    id: page.id,
    title: properties.Título?.title?.[0]?.plain_text || 'Sin título',
    slug: properties.Slug?.rich_text?.[0]?.plain_text || `post-${page.id}`,
    excerpt: properties.Resumen?.rich_text?.[0]?.plain_text || 'Sin resumen disponible',
    content: '',
    coverImage: properties.Cover?.rich_text?.[0]?.plain_text || properties.Cover?.url || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    publishedAt: properties.Fecha?.date?.start || page.created_time,
    updatedAt: page.last_edited_time,
    tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || ['Sin etiquetas'],
    category: properties.Categoría?.select?.name || 'Sin categoría',
    author: properties.Autor?.rich_text?.[0]?.plain_text || 'Autor desconocido',
    readTime: calculateReadTime(properties.Resumen?.rich_text?.[0]?.plain_text || ''),
    featured: properties.Destacado?.checkbox || false,
    status: properties.Estado?.select?.name === 'Listo' ? 'published' : 'draft',
  }
}

async function parseNotionBlocks(blocks: any[]): Promise<string> {
  let content = ''

  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        content += `<p>${block.paragraph.rich_text.map((text: any) => text.plain_text).join('')}</p>\n`
        break
      case 'heading_1':
        content += `<h1>${block.heading_1.rich_text.map((text: any) => text.plain_text).join('')}</h1>\n`
        break
      case 'heading_2':
        content += `<h2>${block.heading_2.rich_text.map((text: any) => text.plain_text).join('')}</h2>\n`
        break
      case 'heading_3':
        content += `<h3>${block.heading_3.rich_text.map((text: any) => text.plain_text).join('')}</h3>\n`
        break
      case 'bulleted_list_item':
        content += `<li>${block.bulleted_list_item.rich_text.map((text: any) => text.plain_text).join('')}</li>\n`
        break
      case 'numbered_list_item':
        content += `<li>${block.numbered_list_item.rich_text.map((text: any) => text.plain_text).join('')}</li>\n`
        break
      case 'image':
        content += `<img src="${block.image.file?.url || block.image.external?.url}" alt="${block.image.caption?.[0]?.plain_text || ''}" />\n`
        break
      case 'code':
        content += `<pre><code class="language-${block.code.language}">${block.code.rich_text.map((text: any) => text.plain_text).join('')}</code></pre>\n`
        break
      case 'quote':
        content += `<blockquote>${block.quote.rich_text.map((text: any) => text.plain_text).join('')}</blockquote>\n`
        break
    }
  }

  return content
}

function calculateReadTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(' ').length
  return Math.ceil(words / wordsPerMinute)
}

export async function getSiteConfig() {
  console.log('🟢 getSiteConfig llamada');
  try {
    const configDatabaseId = process.env.NOTION_CONFIG_DATABASE_ID || databaseId
    const response = await notion.databases.query({
      database_id: configDatabaseId,
      filter: {
        property: 'Tipo',
        select: {
          equals: 'Configuración',
        },
      },
      page_size: 1,
    })

    console.log('🟡 [getSiteConfig] Respuesta cruda de Notion:', JSON.stringify(response, null, 2))

    if (response.results.length === 0) {
      console.log('⚠️ No se encontró configuración del sitio en Notion')
      return getDefaultSiteConfig()
    }

    const page = response.results[0] as any
    const properties = page.properties
    console.log('🟠 [getSiteConfig] Propiedades extraídas:', JSON.stringify(properties, null, 2))

    return {
      siteName: properties?.NombreSitio?.title?.[0]?.plain_text || 'AI Blog MVP',
      siteDescription: properties?.Descripcion?.rich_text?.[0]?.plain_text || 'Blog sobre Inteligencia Artificial',
      siteUrl: properties?.URLSitio?.url || 'https://tu-dominio.com',
      logoUrl: properties?.Logo?.url || null,
      logoAlt: properties?.LogoAlt?.rich_text?.[0]?.plain_text || 'Logo del blog',
      faviconUrl: properties?.Favicon?.url || null,
      ogImage: properties?.ImagenOG?.url || null,
      twitterHandle: properties?.Twitter?.url || null,
      githubUrl: properties?.GitHub?.url || null,
      linkedinUrl: properties?.LinkedIn?.url || null,
    }
  } catch (error) {
    console.error('Error fetching site config from Notion:', error)
    return getDefaultSiteConfig()
  }
}

function getDefaultSiteConfig() {
  return {
    siteName: 'AI Blog MVP',
    siteDescription: 'Blog sobre Inteligencia Artificial',
    siteUrl: 'https://tu-dominio.com',
    logoUrl: null,
    logoAlt: 'Logo del blog',
    faviconUrl: null,
    ogImage: null,
    twitterHandle: null,
    githubUrl: null,
    linkedinUrl: null,
  }
}

export async function getLogoUrl(): Promise<string | null> {
  console.log('🟢 getLogoUrl llamada');
  try {
    const config = await getSiteConfig()
    return config.logoUrl
  } catch (error) {
    console.error('Error getting logo URL:', error)
    return null
  }
} 