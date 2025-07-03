'use client'

import Link from 'next/link'
import { useOptimizedNavigation } from '@/hooks/useOptimizedNavigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams?: Record<string, string>
}

export function Pagination({ currentPage, totalPages, baseUrl, searchParams = {} }: PaginationProps) {
  const { navigate, isNavigating } = useOptimizedNavigation()

  if (totalPages <= 1) return null

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault()
    if (isNavigating) return
    
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    const url = `${baseUrl}?${params.toString()}`
    navigate(url)
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // Primera página
    if (startPage > 1) {
      pages.push(1)
      if (startPage > 2) {
        pages.push('...')
      }
    }

    // Páginas del medio
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()

  return (
    <nav className="flex items-center justify-center space-x-2 my-8" aria-label="Navegación de páginas">
      {/* Botón Anterior */}
      {currentPage > 1 && (
        <Link
          href="#"
          onClick={(e) => handlePageClick(e, currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          aria-label="Página anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      )}

      {/* Números de página */}
      {pageNumbers.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
              ...
            </span>
          ) : (
            <Link
              href="#"
              onClick={(e) => handlePageClick(e, page as number)}
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                page === currentPage
                  ? 'bg-blue-600 text-white font-medium'
                  : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              aria-label={`Página ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Link>
          )}
        </div>
      ))}

      {/* Botón Siguiente */}
      {currentPage < totalPages && (
        <Link
          href="#"
          onClick={(e) => handlePageClick(e, currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          aria-label="Página siguiente"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </nav>
  )
} 