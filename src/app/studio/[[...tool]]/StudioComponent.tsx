'use client'

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'
import './studio.css'

// Importar NextStudio dinámicamente para evitar problemas de SSR
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
)

export default function StudioComponent() {
  return <NextStudio config={config} />
} 