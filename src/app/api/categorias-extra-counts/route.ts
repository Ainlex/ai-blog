import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const databaseId = process.env.NOTION_DATABASE_ID!

export async function GET() {
  try {
    // Obtener todos los artículos publicados
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Estado',
        select: { equals: 'Listo' },
      },
      page_size: 100,
    })
    // Contar por cada opción de CategoriasExtra
    const counts: Record<string, number> = {}
    for (const page of response.results) {
      const categorias = page.properties?.CategoriasExtra?.multi_select || []
      for (const cat of categorias) {
        if (!counts[cat.name]) counts[cat.name] = 0
        counts[cat.name]++
      }
    }
    return NextResponse.json({ success: true, counts })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error al contar categorías.' }, { status: 500 })
  }
} 