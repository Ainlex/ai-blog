import { NextResponse } from 'next/server'

export const revalidate = 60

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tusitio.com'
  const content = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml`

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
} 