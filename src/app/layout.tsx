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
import { sanityClient } from '@/lib/sanity'
import { siteConfigQuery } from '@/lib/queries'
import { seoConfig } from '@/lib/seo-config'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.siteName}`
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.pages.home.keywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(seoConfig.siteUrl),
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
  },
  twitter: {
    card: seoConfig.social.twitter.card,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.defaultImage],
    creator: seoConfig.social.twitter.creator,
    site: seoConfig.social.twitter.site,
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteConfig = await sanityClient.fetch(siteConfigQuery) || {
    title: 'PromptLab',
    description: 'Blog sobre Inteligencia Artificial y Tecnología',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tusitio.com',
    logo: { url: null, alt: 'Logo del blog' },
    siteName: 'PromptLab',
    siteDescription: 'Blog sobre IA y Tecnología'
  }
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
        {/* Preload critical resources */}
        <link rel="preload" href="/api/categorias-extra-counts" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <DynamicFavicon />
          <div className="min-h-screen flex flex-col">
            <Navbar logoUrl={siteConfig.logo?.url} siteName={siteConfig.title} />
            <main className="flex-1">
              {children}
            </main>
            <Footer logoUrl={siteConfig.logo?.url} siteName={siteConfig.title} siteDescription={siteConfig.description} />
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