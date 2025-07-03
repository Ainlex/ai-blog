/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import StudioComponent from './StudioComponent'

export const dynamic = 'force-static'

// Metadata y viewport para Next.js
export const metadata = {
  title: 'Studio',
  description: 'Administra tu contenido con Sanity Studio',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function StudioPage() {
  return <StudioComponent />
}
