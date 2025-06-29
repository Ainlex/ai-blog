import { Metadata } from 'next'
import { Suspense } from 'react'
import { HeroSection } from '@/components/hero-section'
import { FeaturedPosts } from '@/components/featured-posts'
import { CategoriesSection } from '@/components/categories-section'
import { NewsletterSection } from '@/components/newsletter-section'
import { AdSenseBanner } from '@/components/adsense-banner'
import { LoadingSpinner } from '@/components/loading-spinner'

export const metadata: Metadata = {
  title: 'Bienvenido a AI Blog MVP',
  description: 'Descubre las últimas noticias, herramientas y guías sobre Inteligencia Artificial.',
  alternates: {
    canonical: 'https://tudominio.com',
  },
  openGraph: {
    title: 'Bienvenido a AI Blog MVP',
    description: 'Descubre las últimas noticias, herramientas y guías sobre Inteligencia Artificial.',
    url: 'https://tudominio.com'
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Artículos <span className="gradient-text">Destacados</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Descubre los contenidos más relevantes sobre Inteligencia Artificial
            </p>
          </div>
          
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedPosts />
          </Suspense>
        </div>
      </section>

      {/* AdSense Banner */}
      <AdSenseBanner slot="1234567890" />

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explora por <span className="gradient-text">Categorías</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Encuentra contenido específico sobre los temas que más te interesan
            </p>
          </div>
          
          <CategoriesSection />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="container mx-auto px-4">
          <NewsletterSection />
        </div>
      </section>
    </div>
  )
} 