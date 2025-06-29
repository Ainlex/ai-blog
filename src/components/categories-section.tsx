'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import SidebarCategories from './sidebar-categories'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  postCount: number
}

const CATEGORIES = [
  {
    id: 'herramientas',
    name: 'Herramientas',
    slug: 'herramientas',
    description: 'Descubre las mejores herramientas de IA para tu trabajo',
    color: 'bg-blue-500',
  },
  {
    id: 'guias',
    name: 'Guías',
    slug: 'guias',
    description: 'Tutoriales paso a paso para dominar la IA',
    color: 'bg-green-500',
  },
  {
    id: 'noticias',
    name: 'Noticias',
    slug: 'noticias',
    description: 'Las últimas novedades del mundo de la IA',
    color: 'bg-purple-500',
  },
  {
    id: 'tutoriales',
    name: 'Tutoriales',
    slug: 'tutoriales',
    description: 'Aprende a programar con IA de forma práctica',
    color: 'bg-orange-500',
  },
  {
    id: 'tendencias',
    name: 'Tendencias',
    slug: 'tendencias',
    description: 'Lo que está marcando el futuro de la IA',
    color: 'bg-red-500',
  },
  {
    id: 'casos-uso',
    name: 'Casos de Uso',
    slug: 'casos-uso',
    description: 'Aplicaciones reales de IA en diferentes industrias',
    color: 'bg-indigo-500',
  },
]

export function CategoriesSection() {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    // Fetch artículos publicados y contar por CategoriasExtra
    fetch('/api/categorias-extra-counts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCategoryCounts(data.counts)
        }
      })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          href={`/categorias/${category.slug}`}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-6">
            {/* Icon and Title */}
            <div className="flex items-center mb-4">
              <div className={`${category.color} p-3 rounded-lg mr-4 hover:scale-110 transition-transform duration-200`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {categoryCounts[category.name] || 0} artículos
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {category.description}
            </p>

            {/* Arrow */}
            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200">
              <svg
                className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 