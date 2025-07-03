'use client';

import Image from 'next/image';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import { InformationCircleIcon, CubeIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

type PriceType = 'free' | 'freemium' | 'premium' | 'usage' | 'contact';

interface HerramientaCardProps {
  tool: {
    name: string;
    slug: string;
    icon: {
      url: string;
      alt?: string;
    };
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
  };
  onInfoClick?: (tool: any) => void;
}

const priceTypeColors: { [key in PriceType]: string } = {
  free: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  freemium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  premium: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  usage: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  contact: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

const priceTypeLabels: { [key in PriceType]: string } = {
  free: 'Gratis',
  freemium: 'Freemium',
  premium: 'Premium',
  usage: 'Por uso',
  contact: 'Contactar',
};

export default function HerramientaCard({ tool, onInfoClick }: HerramientaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const trackClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_click', {
        tool_name: tool.name,
        price_type: tool.priceType,
        value: 1
      });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(true);
    trackClick();
    // Retrasar el reseteo del estado para mostrar el feedback visual
    setTimeout(() => setIsClicked(false), 200);
  };

  const getAffiliateUrl = (url: string) => {
    if (!url) return '#';
    const utm = `?utm_source=promptlab&utm_medium=tools&utm_campaign=${encodeURIComponent(tool.name)}`;
    return url + utm;
  };

  const renderIcon = () => {
    if (!tool.icon?.url || imageError) {
      return (
        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
          <CubeIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
      );
    }

    return (
      <div className="relative w-12 h-12">
        <Image
          src={tool.icon.url}
          alt={tool.icon.alt || tool.name}
          fill
          className="object-contain rounded-lg"
          onError={() => setImageError(true)}
          sizes="48px"
        />
      </div>
    );
  };

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {tool.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            ⭐ Destacado
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Logo */}
          {renderIcon()}

          {/* Price Badge */}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priceTypeColors[tool.priceType]}`}>
            {priceTypeLabels[tool.priceType]}
          </span>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {tool.shortDescription}
          </p>
        </div>

        {/* Rating and Users */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < tool.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          {tool.usersCount && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {tool.usersCount} usuarios
            </span>
          )}
        </div>

        {/* Price and Discount Amount */}
        {(tool.price || tool.discount?.amount) && (
          <div className="mb-4">
            {tool.price && (
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {tool.price}
              </span>
            )}
            {tool.discount?.amount && (
              <span className="ml-2 text-xs font-medium text-green-600 dark:text-green-400">
                {tool.discount.amount} de descuento
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 relative z-20">
          <a
            href={getAffiliateUrl(tool.affiliateUrl)}
            onClick={handleClick}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 
              border border-transparent rounded-lg shadow-sm text-sm font-medium 
              text-white bg-blue-600 hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-all duration-200
              ${isClicked ? 'transform scale-95 bg-blue-700' : ''}
              ${!tool.affiliateUrl ? 'cursor-not-allowed opacity-50' : ''}
            `}
            tabIndex={0}
            role="button"
            aria-label={`Probar ${tool.name}`}
          >
            <span>Probar ahora</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </a>
          {onInfoClick && (
            <button
              onClick={() => onInfoClick(tool)}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
              aria-label={`Más información sobre ${tool.name}`}
            >
              <InformationCircleIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Hover Overlay with Discount */}
      {tool.discount?.code && isHovered && (
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-center p-6 transition-opacity duration-300">
          <div className="text-center text-white bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
            <p className="text-sm font-medium mb-1">¡{tool.discount.amount} de descuento!</p>
            <p className="text-lg font-bold">Código: {tool.discount.code}</p>
            {tool.discount.expiresAt && (
              <p className="text-xs mt-1">
                Expira: {new Date(tool.discount.expiresAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 