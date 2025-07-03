import { urlFor } from './sanity'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Tipo para imágenes de Cloudinary
export interface CloudinaryImage {
  url: string
  alt?: string
  width?: number
  height?: number
  caption?: string
}

// Tipo unificado para imágenes
export type ImageSource = SanityImageSource | CloudinaryImage | string

export interface SanityImageProps {
  src: ImageSource
  alt?: string
  width?: number
  height?: number
  quality?: number
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint' | 'entropy'
  format?: 'webp' | 'jpg' | 'png'
  blur?: number
  sharpen?: number
}

export function getSanityImageUrl({
  src,
  width,
  height,
  quality = 80,
  fit = 'crop',
  crop = 'center',
  format = 'webp',
  blur,
  sharpen,
}: SanityImageProps): string {
  // Si es una URL de Cloudinary (string o objeto con url)
  if (typeof src === 'string') {
    return src
  }
  
  if (typeof src === 'object' && 'url' in src && typeof src.url === 'string') {
    // Es una imagen de Cloudinary
    let cloudinaryUrl = src.url
    
    // Aplicar transformaciones de Cloudinary si se especifican
    if (width || height || quality || format) {
      const transformations: string[] = []
      
      if (width && height) {
        transformations.push(`c_fill,w_${width},h_${height}`)
      } else if (width) {
        transformations.push(`c_scale,w_${width}`)
      } else if (height) {
        transformations.push(`c_scale,h_${height}`)
      }
      
      if (quality) {
        transformations.push(`q_${quality}`)
      }
      
      if (format) {
        transformations.push(`f_${format}`)
      }
      
      if (transformations.length > 0) {
        cloudinaryUrl = cloudinaryUrl.replace('/upload/', `/upload/${transformations.join(',')}/`)
      }
    }
    
    return cloudinaryUrl
  }

  // Es una imagen de Sanity, usar urlFor
  let imageUrl = urlFor(src as SanityImageSource)

  if (width) imageUrl = imageUrl.width(width)
  if (height) imageUrl = imageUrl.height(height)
  if (quality) imageUrl = imageUrl.quality(quality)
  if (fit) imageUrl = imageUrl.fit(fit)
  if (crop) imageUrl = imageUrl.crop(crop)
  if (format) imageUrl = imageUrl.format(format)
  if (blur) imageUrl = imageUrl.blur(blur)
  if (sharpen) imageUrl = imageUrl.sharpen(sharpen)

  return imageUrl.url()
}

export function getSanityImageSrcSet({
  src,
  alt,
  width,
  height,
  quality = 80,
  fit = 'crop',
  crop = 'center',
  format = 'webp',
}: SanityImageProps): {
  src: string
  srcSet: string
  sizes: string
} {
  const baseUrl = getSanityImageUrl({
    src,
    width,
    height,
    quality,
    fit,
    crop,
    format,
  })

  // Generar diferentes tamaños para responsive
  const sizes = [400, 800, 1200, 1600, 2000]
  const srcSet = sizes
    .map((size) => {
      const url = getSanityImageUrl({
        src,
        width: size,
        height: height ? Math.round((height * size) / (width || 1)) : undefined,
        quality,
        fit,
        crop,
        format,
      })
      return `${url} ${size}w`
    })
    .join(', ')

  const sizesAttr = width
    ? `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, ${width}px`
    : '100vw'

  return {
    src: baseUrl,
    srcSet,
    sizes: sizesAttr,
  }
}

export function getSanityImageMetadata(src: ImageSource) {
  // Si es una imagen de Cloudinary
  if (typeof src === 'object' && 'url' in src && typeof src.url === 'string') {
    return {
      width: src.width,
      height: src.height,
      aspectRatio: src.width && src.height ? src.width / src.height : undefined,
    }
  }
  
  // Si es una URL string
  if (typeof src === 'string') {
    return {
      width: undefined,
      height: undefined,
      aspectRatio: undefined,
    }
  }

  // Es una imagen de Sanity
  const imageUrl = urlFor(src as SanityImageSource)
  return {
    width: imageUrl.options?.width,
    height: imageUrl.options?.height,
    aspectRatio: imageUrl.options?.width && imageUrl.options?.height
      ? imageUrl.options.width / imageUrl.options.height
      : undefined,
  }
}

// Función para obtener imagen optimizada para SEO
export function getSEOImageUrl(src: ImageSource, width = 1200, height = 630) {
  return getSanityImageUrl({
    src,
    width,
    height,
    quality: 90,
    fit: 'crop',
    crop: 'center',
    format: 'webp',
  })
}

// Función para obtener imagen optimizada para thumbnails
export function getThumbnailUrl(src: ImageSource, size = 400) {
  return getSanityImageUrl({
    src,
    width: size,
    height: size,
    quality: 70,
    fit: 'crop',
    crop: 'center',
    format: 'webp',
  })
}

// Función para obtener imagen optimizada para avatares
export function getAvatarUrl(src: ImageSource, size = 100) {
  return getSanityImageUrl({
    src,
    width: size,
    height: size,
    quality: 80,
    fit: 'crop',
    crop: 'center',
    format: 'webp',
  })
} 