'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Category {
  _id: string
  title: string
  slug: { current: string }
  color: string
  articleCount: number
}

const ICONS: Record<string, string> = {
  'Herramientas': 'text-blue-500 bg-blue-100',
  'Guías': 'text-green-500 bg-green-100',
  'Noticias': 'text-purple-500 bg-purple-100',
  'Tutoriales': 'text-orange-500 bg-orange-100',
  'Tendencias': 'text-red-500 bg-red-100',
  'Casos de Uso': 'text-blue-600 bg-blue-100',
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/categories')
        if (!res.ok) throw new Error('Error al cargar categorías')
        const data = await res.json()
        setCategories(data.categories)
      } catch (err) {
        setError('No se pudieron cargar las categorías')
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando categorías...</div>
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-2">Categorías</h2>
      <div className="space-y-3">
        {categories.map(cat => (
          <Link
            key={cat._id}
            href={`/categorias/${cat.slug.current}`}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-lg font-bold ${ICONS[cat.title] || 'text-blue-500 bg-blue-100'}`}> 
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10M7 15h6" />
                </svg>
              </span>
              <span className="font-medium text-gray-900 dark:text-white text-base">{cat.title}</span>
            </div>
            <span className="text-sm text-gray-500">{cat.articleCount} artículo{cat.articleCount !== 1 ? 's' : ''}</span>
          </Link>
        ))}
      </div>
    </div>
  )
} 