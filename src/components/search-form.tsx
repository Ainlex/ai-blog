'use client'

import { useState, useEffect, Fragment } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useOptimizedNavigation } from '@/hooks/useOptimizedNavigation'
import { sanityClient } from '@/lib/sanity'
import { allCategoriesQuery, allTagsQuery } from '@/lib/queries'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface SearchFormProps {
  initialQuery?: string
  initialCategory?: string
  initialTag?: string
}

export function SearchForm({ initialQuery = '', initialCategory = '', initialTag = '' }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState(initialCategory)
  const [tag, setTag] = useState(initialTag)
  const [isSearching, setIsSearching] = useState(false)
  const [categories, setCategories] = useState<{ title: string, slug: { current: string } }[]>([])
  const [tags, setTags] = useState<{ title: string, slug: { current: string } }[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const { navigate, isNavigating } = useOptimizedNavigation()

  // Cargar categorías y tags dinámicamente desde Sanity
  useEffect(() => {
    sanityClient.fetch(allCategoriesQuery).then((data) => {
      setCategories(data)
    })
    sanityClient.fetch(allTagsQuery).then((data) => {
      setTags(data)
    })
  }, [])

  // Actualizar el formulario cuando cambien los parámetros de búsqueda
  useEffect(() => {
    const currentQuery = searchParams.get('query') || ''
    const currentCategory = searchParams.get('category') || ''
    const currentTag = searchParams.get('tag') || ''
    setQuery(currentQuery)
    setCategory(currentCategory)
    setTag(currentTag)
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() && !category && !tag) return
    setIsSearching(true)
    const params = new URLSearchParams()
    if (query.trim()) params.set('query', query.trim())
    if (category) params.set('category', category)
    if (tag) params.set('tag', tag)
    params.set('page', '1')
    const searchUrl = `/search?${params.toString()}`
    navigate(searchUrl)
    setTimeout(() => setIsSearching(false), 300)
  }

  const handleClear = () => {
    setQuery('')
    setCategory('')
    setTag('')
    router.push('/search')
  }

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion)
    setIsSearching(true)
    const params = new URLSearchParams()
    params.set('query', suggestion)
    params.set('page', '1')
    const searchUrl = `/search?${params.toString()}`
    navigate(searchUrl)
    setTimeout(() => setIsSearching(false), 300)
  }

  const hasFilters = query || category || tag

  // Utilidades para Listbox
  const selectedCategory = categories.find(cat => cat.slug.current === category) || null
  const selectedTag = tags.find(t => t.slug.current === tag) || null

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Barra de búsqueda principal */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar artículos sobre IA..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200 shadow-lg hover:shadow-xl"
            disabled={isSearching || isNavigating}
          />
        </div>

        {/* Filtros adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filtro por categoría */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoría
            </label>
            <Listbox value={selectedCategory} onChange={cat => setCategory(cat ? cat.slug.current : '')} disabled={isSearching || isNavigating}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 py-2 pl-4 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                  <span className="block truncate">{selectedCategory ? selectedCategory.title : 'Todas las categorías'}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <Listbox.Option value={null} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>Todas las categorías</Listbox.Option>
                    {categories.map(cat => (
                      <Listbox.Option key={cat.slug.current} value={cat} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{cat.title}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          {/* Filtro por tag */}
          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Etiqueta
            </label>
            <Listbox value={selectedTag} onChange={t => setTag(t ? t.slug.current : '')} disabled={isSearching || isNavigating}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 py-2 pl-4 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200">
                  <span className="block truncate">{selectedTag ? selectedTag.title : 'Todas las etiquetas'}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <Listbox.Options className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <Listbox.Option value={null} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>Todas las etiquetas</Listbox.Option>
                    {tags.map(tag => (
                      <Listbox.Option key={tag.slug.current} value={tag} className={({ active }) => `cursor-pointer select-none relative py-2 pl-10 pr-4 ${active ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{tag.title}</span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={isSearching || isNavigating || (!query.trim() && !category && !tag)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            {isSearching || isNavigating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Buscando...
              </span>
            ) : (
              'Buscar Artículos'
            )}
          </button>

          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              disabled={isSearching || isNavigating}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors duration-200"
            >
              Limpiar
            </button>
          )}
        </div>
      </form>

      {/* Sugerencias de búsqueda */}
      {!hasFilters && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Búsquedas populares
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'ChatGPT',
              'Machine Learning',
              'Deep Learning',
              'Inteligencia Artificial',
              'OpenAI',
              'Tutoriales IA'
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm font-medium transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 