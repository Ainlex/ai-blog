import { Metadata } from 'next'
import { CategoriesSection } from '@/components/categories-section'
import Script from 'next/script'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Categorías - Artículos sobre Inteligencia Artificial',
  description: 'Explora todas las categorías de nuestro blog sobre Inteligencia Artificial. Encuentra contenido específico sobre IA, machine learning, herramientas y más.',
  keywords: ['categorías', 'inteligencia artificial', 'IA', 'machine learning', 'blog'],
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Explora por <span className="gradient-text">Categorías</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Encuentra contenido específico sobre los temas que más te interesan
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb visual y JSON-LD */}
      <nav className="mb-6">
        <Link href="/" className="text-gray-500 hover:text-blue-600">Inicio</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-700 dark:text-white">Categorías</span>
      </nav>
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
              name: 'Categorías',
              item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/categorias`,
            },
          ],
        })}
      </Script>

      {/* Categories */}
      <div className="container mx-auto px-4 py-16">
        <CategoriesSection />
      </div>
    </div>
  )
} 