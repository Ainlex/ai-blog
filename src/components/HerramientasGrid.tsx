'use client';

import { useState, useCallback } from 'react';
import FiltrosComponent from './FiltrosComponent';
import HerramientaCard from './HerramientaCard';

type PriceType = 'free' | 'freemium' | 'premium' | 'usage';

interface Tool {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  priceType: PriceType;
  price?: string;
  rating: number;
  featured?: boolean;
  usersCount?: string;
  discount?: {
    code?: string;
    amount?: string;
    expiresAt?: string;
  };
  affiliateUrl: string;
  icon: {
    url: string;
    alt?: string;
  };
  tags: string[];
}

interface HerramientasGridProps {
  tools: Tool[];
  tags: string[];
  category: 'principiantes' | 'profesionales' | 'empresas';
}

export default function HerramientasGrid({ tools: initialTools, tags, category }: HerramientasGridProps) {
  const [filteredTools, setFilteredTools] = useState(initialTools);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleFilterChange = useCallback((filters: {
    tags: string[];
    priceTypes: string[];
    sortBy: string;
    searchTerm: string;
  }) => {
    let filtered = [...initialTools];

    // Filtrar por tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter(tool => 
        tool.tags?.some(tag => filters.tags.includes(tag))
      );
    }

    // Filtrar por tipo de precio
    if (filters.priceTypes.length > 0) {
      filtered = filtered.filter(tool => 
        filters.priceTypes.includes(tool.priceType)
      );
    }

    // Filtrar por término de búsqueda
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(searchLower) ||
        tool.shortDescription.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'recent':
          return b._id.localeCompare(a._id);
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
      }
    });

    setFilteredTools(filtered);
  }, [initialTools]);

  return (
    <div className="mt-12 lg:grid lg:grid-cols-4 lg:gap-8">
      {/* Sidebar con filtros */}
      <div className="lg:col-span-1">
        <FiltrosComponent
          tags={tags}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Grid de herramientas */}
      <div className="mt-6 lg:mt-0 lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <HerramientaCard
              key={tool._id}
              tool={tool}
              onInfoClick={setSelectedTool}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No se encontraron herramientas
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta ajustar los filtros para ver más resultados
            </p>
          </div>
        )}
      </div>

      {/* Modal de información detallada */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16">
                <img
                  src={selectedTool.icon.url}
                  alt={selectedTool.icon.alt || selectedTool.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedTool.name}
                </h2>
                {selectedTool.price && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedTool.price}
                  </p>
                )}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {selectedTool.shortDescription}
            </p>

            {selectedTool.discount && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-blue-700 dark:text-blue-300 font-medium">
                  ¡Oferta especial!
                </p>
                {selectedTool.discount.code && (
                  <p className="text-blue-600 dark:text-blue-400 mt-1">
                    Código: <span className="font-mono">{selectedTool.discount.code}</span>
                  </p>
                )}
                {selectedTool.discount.amount && (
                  <p className="text-blue-600 dark:text-blue-400">
                    Descuento: {selectedTool.discount.amount}
                  </p>
                )}
                {selectedTool.discount.expiresAt && (
                  <p className="text-sm text-blue-500 dark:text-blue-300 mt-2">
                    Expira: {new Date(selectedTool.discount.expiresAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setSelectedTool(null)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cerrar
              </button>
              <a
                href={selectedTool.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                onClick={() => {
                  // Tracking de clicks
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'affiliate_click', {
                      tool_name: selectedTool.name,
                      category,
                      value: 1
                    });
                  }
                }}
              >
                Probar ahora
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 