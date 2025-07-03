import { notFound } from 'next/navigation'
import { sanityClient, getDataWithRevalidation } from '@/lib/sanity'
import { pageQuery } from '@/lib/queries'
import SEOHead from '@/components/SEOHead'
import PortableText from '@/components/PortableText'
import StructuredData, { createWebsiteStructuredData } from '@/components/StructuredData'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const query = `*[_type == "page"] { slug }`
  const pages = await sanityClient.fetch(query)
  return pages.map((page: any) => ({ slug: page.slug.current }))
}

async function getPage(slug: string) {
  try {
    const page = await sanityClient.fetch(pageQuery, { slug })
    if (!page) return null
    return page
  } catch (error) {
    console.warn('Error fetching page:', error)
    return null
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  const seoTitle = page.seo?.metaTitle || page.title
  const seoDescription = page.seo?.metaDescription
  const seoImage = page.seo?.metaImage
  const seoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${params.slug}`

  const structuredData = createWebsiteStructuredData({
    name: seoTitle,
    description: seoDescription,
    url: seoUrl,
    logo: '',
  })

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={seoUrl}
        type="website"
      />
      <StructuredData data={structuredData} />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <PortableText value={page.content} />
      </main>
    </>
  )
} 