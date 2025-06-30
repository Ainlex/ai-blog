import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@/components/analytics'
import CookieBanner from '@/components/CookieBanner'
import { DynamicFavicon } from '@/components/dynamic-favicon'
import { getSiteConfig } from '@/lib/notion'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AI Blog MVP - Noticias y Herramientas de Inteligencia Artificial',
    template: '%s | AI Blog MVP'
  },
  description: 'Descubre las últimas noticias, herramientas y guías sobre Inteligencia Artificial. Mantente actualizado con las tendencias más importantes en IA.',
  keywords: ['inteligencia artificial', 'IA', 'machine learning', 'deep learning', 'herramientas IA', 'noticias IA'],
  authors: [{ name: 'AI Blog MVP' }],
  creator: 'AI Blog MVP',
  publisher: 'AI Blog MVP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tudominio.com'),
  alternates: {
    canonical: 'https://tudominio.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://tudominio.com',
    title: 'AI Blog MVP - Noticias y Herramientas de Inteligencia Artificial',
    description: 'Descubre las últimas noticias, herramientas y guías sobre Inteligencia Artificial.',
    siteName: 'AI Blog MVP',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Blog MVP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Blog MVP - Noticias y Herramientas de Inteligencia Artificial',
    description: 'Descubre las últimas noticias, herramientas y guías sobre Inteligencia Artificial.',
    images: ['/og-image.jpg'],
    creator: '@aiblogmvp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tu-google-verification-code',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteConfig = await getSiteConfig()
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <DynamicFavicon />
          <div className="min-h-screen flex flex-col">
            <Navbar logoUrl={siteConfig.logoUrl} siteName={siteConfig.siteName} />
            <main className="flex-1">
              {children}
            </main>
            <Footer logoUrl={siteConfig.logoUrl} siteName={siteConfig.siteName} siteDescription={siteConfig.siteDescription} />
          </div>
          <CookieBanner />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
} 