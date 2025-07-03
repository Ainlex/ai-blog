'use client';

import { useState, useEffect, useCallback } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FiltrosComponentProps {
  tags: string[];
  onFilterChange: (filters: {
    tags: string[];
    priceTypes: string[];
    sortBy: string;
    searchTerm: string;
  }) => void;
}

const priceTypes = [
  { value: 'free', label: 'Gratis' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'premium', label: 'Premium' },
  { value: 'usage', label: 'Por uso' },
] as const;

type PriceType = typeof priceTypes[number]['value'];

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'rating', label: 'Mejor valorados' },
  { value: 'name', label: 'Alfabético' },
  { value: 'recent', label: 'Más recientes' },
];

export default function FiltrosComponent({ tags, onFilterChange }: FiltrosComponentProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPriceTypes, setSelectedPriceTypes] = useState<PriceType[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Memoizar el objeto de filtros para evitar recreaciones innecesarias
  const currentFilters = useCallback(() => ({
    tags: selectedTags,
    priceTypes: selectedPriceTypes,
    sortBy,
    searchTerm,
  }), [selectedTags, selectedPriceTypes, sortBy, searchTerm]);

  // Llamar a onFilterChange solo cuando los filtros cambien
  useEffect(() => {
    onFilterChange(currentFilters());
  }, [currentFilters, onFilterChange]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const togglePriceType = (type: PriceType) => {
    setSelectedPriceTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedPriceTypes([]);
    setSortBy('featured');
    setSearchTerm('');
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedPriceTypes.length > 0 || searchTerm;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Mobile Filters Button */}
      <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300"
        >
          <span className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5" />
            Filtros
          </span>
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {selectedTags.length + selectedPriceTypes.length}
            </span>
          )}
        </button>
      </div>

      {/* Filters Content */}
      <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block p-4 space-y-6`}>
        {/* Search */}
        <div>
          <div className="relative">
            <input
              type="search"
              placeholder="Buscar herramientas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ordenar por
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Types */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tipo de precio
          </h3>
          <div className="space-y-2">
            {priceTypes.map(type => (
              <label
                key={type.value}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedPriceTypes.includes(type.value as PriceType)}
                  onChange={() => togglePriceType(type.value as PriceType)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {type.label}
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <XMarkIcon className="w-4 h-4" />
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 