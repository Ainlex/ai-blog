import { NextRequest, NextResponse } from 'next/server'
import { sanityClient } from '@/lib/sanity'
import { allCategoriesQuery } from '@/lib/queries'

export async function GET(request: NextRequest) {
  try {
    const categories = await sanityClient.fetch(allCategoriesQuery)
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ categories: [] })
  }
} 