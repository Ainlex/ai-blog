import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/lib/notion'
import { PostContent } from '@/components/post-content'
import { PostHeader } from '@/components/post-header'
import { RelatedPosts } from '@/components/related-posts'
import { AdSenseBanner } from '@/components/adsense-banner'
import { NewsletterSection } from '@/components/newsletter-section'
import dynamic from 'next/dynamic'
import Script from 'next/script'

// Componente Giscus (carga dinámica solo en cliente)
const Giscus = dynamic(() => import('@/components/giscus-comments'), { ssr: false })

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Artículo no encontrado',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [...post.tags, 'inteligencia artificial', 'IA'],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.coverImage ? [post.coverImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900" itemScope itemType="https://schema.org/Article">
      {/* SEO: Datos estructurados JSON-LD */}
      <Script id="article-jsonld" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`,
          },
        })}
      </Script>

      {/* SEO: Datos estructurados BreadcrumbList en JSON-LD */}
      <Script id="breadcrumb-jsonld" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`,
            },
          ],
        })}
      </Script>

      {/* Post Header */}
      <PostHeader post={post} />

      {/* AdSense Banner superior */}
      <div className="container mx-auto px-4 pt-8">
        <AdSenseBanner slot="post-top" format="rectangle" responsive />
      </div>

      {/* Post Content */}
      <main className="container mx-auto px-4 py-8" itemProp="articleBody">
        <div className="max-w-4xl mx-auto">
          <PostContent content={post.content} />
        </div>
      </main>

      {/* AdSense Banner inferior */}
      <div className="container mx-auto px-4 pb-8">
        <AdSenseBanner slot="post-bottom" format="rectangle" responsive />
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 pb-8">
        <NewsletterSection />
      </div>

      {/* Caja de comentarios Giscus */}
      <footer className="container mx-auto px-4 pb-16">
        <section aria-label="Comentarios" className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Comentarios</h2>
          <hr className="border-gray-700 mb-2 w-24" />
          <div className="max-w-lg ml-0 md:ml-8 mt-0">
            <Giscus />
          </div>
        </section>
      </footer>

      {/* Related Posts */}
      <div className="container mx-auto px-4 pb-16">
        <RelatedPosts 
          currentPostId={post.id}
          category={post.category}
          tags={post.tags}
        />
      </div>
    </article>
  )
} 