import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FiTag } from 'react-icons/fi'

const CATEGORIES = [
  { id: 'herramientas', name: 'Herramientas', slug: 'herramientas', color: 'bg-blue-500' },
  { id: 'guias', name: 'Guías', slug: 'guias', color: 'bg-green-500' },
  { id: 'noticias', name: 'Noticias', slug: 'noticias', color: 'bg-purple-500' },
  { id: 'tutoriales', name: 'Tutoriales', slug: 'tutoriales', color: 'bg-orange-500' },
  { id: 'tendencias', name: 'Tendencias', slug: 'tendencias', color: 'bg-red-500' },
  { id: 'casos-uso', name: 'Casos de Uso', slug: 'casos-uso', color: 'bg-indigo-500' },
]

export default function SidebarCategories({ onClick }: { onClick?: () => void }) {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/categorias-extra-counts')
        const data = await response.json()
        if (data.success) {
          setCategoryCounts(data.counts)
        }
      } catch (error) {
        console.error('Error fetching category counts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCounts()
  }, [])

  const handleCategoryClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Categorías</h2>
        <button
          onClick={onClick}
          className="text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-1"
          aria-label="Cerrar menú"
        >
          ✕
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/categorias/${category.slug}`}
            onClick={handleCategoryClick}
            className="flex items-center gap-3 px-5 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-base font-medium border border-gray-100 dark:border-gray-800 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className={`w-8 h-8 flex items-center justify-center rounded-lg ${category.color} text-white text-xl`}>
              <FiTag />
            </span>
            <span className="flex-1 text-gray-900 dark:text-white">{category.name}</span>
            <span className="text-xs text-gray-500 ml-2">
              {isLoading ? (
                <div className="w-4 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              ) : (
                `${categoryCounts[category.name] || 0} artículos`
              )}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
} 