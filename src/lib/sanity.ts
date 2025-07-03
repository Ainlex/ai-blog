import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
}

// Cliente para el lado del servidor
export const sanityClient = createClient(config)

// Cliente para el lado del cliente
export const sanityClientForPreview = createClient({
  ...config,
  useCdn: false,
})

// Builder para imágenes
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Función para obtener el cliente correcto según el contexto
export function getClient(preview: boolean = false) {
  if (preview) {
    return sanityClientForPreview
  }
  return sanityClient
}

// Función para obtener datos con preview
export async function getData(query: string, preview: boolean = false) {
  const client = getClient(preview)
  return await client.fetch(query)
}

// Función para obtener datos con revalidación
export async function getDataWithRevalidation(query: string, revalidate: number = 60) {
  const data = await sanityClient.fetch(query, {}, {
    next: { revalidate }
  })
  return data
} 