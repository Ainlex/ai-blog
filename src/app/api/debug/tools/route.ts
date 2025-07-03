import { NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity';

export async function GET(request: Request) {
  console.log('🔍 DEBUG - API Debug Tools');
  
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'principiantes';
  
  console.log('📋 Parámetros:', { category });

  const toolsQuery = `*[_type == "aiTool" && category == $category && !(_id in path("drafts.**"))] {
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

  console.log('📝 Query a ejecutar:', toolsQuery);

  try {
    console.log('🔄 Iniciando fetch de datos');
    const tools = await sanityClient.fetch(toolsQuery, { category });
    console.log('✅ Datos recibidos:', {
      count: tools.length,
      toolNames: tools.map((t: any) => t.name)
    });
    
    // Verificar campos requeridos
    const missingFields = tools.map((tool: any) => ({
      name: tool.name,
      missingFields: [
        !tool.shortDescription && 'shortDescription',
        !tool.priceType && 'priceType',
        !tool.icon?.url && 'icon',
        !tool.affiliateUrl && 'affiliateUrl',
      ].filter(Boolean)
    })).filter(item => item.missingFields.length > 0);

    if (missingFields.length > 0) {
      console.log('⚠️ Campos faltantes detectados:', missingFields);
    }

    return NextResponse.json({
      success: true,
      category,
      count: tools.length,
      tools,
      _debug: {
        missingFields,
        query: toolsQuery,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('❌ Error en API Debug Tools:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      _debug: {
        query: toolsQuery,
        params: { category },
        timestamp: new Date().toISOString(),
        errorStack: error instanceof Error ? error.stack : undefined
      }
    }, { status: 500 });
  }
} 