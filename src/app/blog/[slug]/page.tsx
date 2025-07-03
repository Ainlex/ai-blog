import { notFound } from 'next/navigation'
import Image from 'next/image'
import { sanityClient, getDataWithRevalidation } from '@/lib/sanity'
import { articleQuery, relatedArticlesQuery, siteConfigQuery } from '@/lib/queries'
import { getSanityImageUrl, getSEOImageUrl } from '@/lib/sanityImage'
import SEOHead from '@/components/SEOHead'
import PortableText from '@/components/PortableText'
import StructuredData, { createArticleStructuredData } from '@/components/StructuredData'
import GiscusComments from '@/components/giscus-comments'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Generar rutas estáticas
export async function generateStaticParams() {
  const query = `*[_type == "article" && publishedAt <= now()] {
    slug
  }`
  
  const articles = await sanityClient.fetch(query)
  
  return articles.map((article: any) => ({
    slug: article.slug.current,
  }))
}

// Obtener datos del artículo
async function getArticle(slug: string) {
  try {
    const article = await sanityClient.fetch(articleQuery, { slug })
    
    if (!article) {
      return null
    }

    return article
  } catch (error) {
    console.warn('Error fetching article:', error)
    return null
  }
}

// Obtener artículos relacionados
async function getRelatedArticles(currentId: string, categories: string[], tags: string[]) {
  if (!categories.length && !tags.length) {
    return []
  }

  const category = categories[0] || ''
  const tagSlugs = tags.map((tag: any) => tag.slug?.current).filter(Boolean)

  const related = await sanityClient.fetch(
    relatedArticlesQuery,
    {
      currentId,
      category,
      tags: tagSlugs,
      limit: 3,
    }
  )

  return related || []
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(
    article._id,
    article.categories || [],
    article.tags || []
  )

  // Preparar datos para SEO
  const seoTitle = article.seo?.metaTitle || article.title
  const seoDescription = article.seo?.metaDescription || article.excerpt
  const seoImage = article.seo?.metaImage || article.mainImage
  const seoUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`
  const seoKeywords = article.seo?.keywords || []

  // Obtener configuración del sitio para el logo
  const siteConfig = await sanityClient.fetch(siteConfigQuery) || {
    title: 'PromptLab',
    logo: { url: null }
  }

  // Structured Data
  const structuredData = createArticleStructuredData({
    title: article.title,
    description: seoDescription,
    image: seoImage ? getSEOImageUrl(seoImage) : '',
    url: seoUrl,
    publishedAt: article.publishedAt,
    author: article.author?.name || 'Autor',
    publisher: siteConfig.title || 'PromptLab',
    keywords: seoKeywords,
    logo: siteConfig.logo?.url,
  })

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={seoImage ? getSEOImageUrl(seoImage) : undefined}
        url={seoUrl}
        type="article"
        publishedAt={article.publishedAt}
        author={article.author?.name}
        keywords={seoKeywords}
        canonicalUrl={article.seo?.canonicalUrl}
      />
      <StructuredData data={structuredData} />

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header del artículo */}
        <header className="mb-8">
          <div className="mb-4">
            {article.categories?.map((category: any) => (
              <span
                key={category._id}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
                style={{ backgroundColor: category.color + '20', color: category.color }}
              >
                {category.title}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          {article.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>
          )}

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {article.author?.image && (
                <Image
                  src={getSanityImageUrl({ src: article.author.image })}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold">{article.author?.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            
            {article.readingTime && (
              <span className="text-sm text-gray-500">
                {article.readingTime} min de lectura
              </span>
            )}
          </div>
        </header>

        {/* Imagen principal */}
        {article.mainImage && (
          <div className="mb-8">
            <Image
              src={getSanityImageUrl({ src: article.mainImage })}
              alt={article.mainImage.alt || article.title}
              width={1200}
              height={630}
              className="w-full rounded-lg shadow-lg"
              priority
            />
            {article.mainImage.caption && (
              <p className="mt-2 text-sm text-gray-600 text-center italic">
                {article.mainImage.caption}
              </p>
            )}
          </div>
        )}

        {/* Contenido del artículo */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={article.body} />
        </div>

        {/* Caja de comentarios Giscus */}
        <div className="mt-12">
          <GiscusComments />
        </div>

        {/* Etiquetas */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Etiquetas:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: any) => (
                <span
                  key={tag._id}
                  className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                  style={{ backgroundColor: tag.color + '20', color: tag.color }}
                >
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Artículos relacionados */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((related: any) => (
                <article key={related._id} className="border rounded-lg overflow-hidden">
                  {related.mainImage && (
                    <Image
                      src={getSanityImageUrl({ src: related.mainImage })}
                      alt={related.mainImage.alt || related.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">
                      <a
                        href={`/blog/${related.slug.current}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {related.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{related.excerpt}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(related.publishedAt).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
} 