'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from './logo'
import { getSiteConfig } from '@/lib/notion'

interface FooterProps {
  logoUrl?: string | null
  siteName?: string
  siteDescription?: string
}

export function Footer({ logoUrl, siteName = 'PromptLab', siteDescription = 'Blog sobre Inteligencia Artificial' }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 200)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const footerLinks = {
    contenido: [
      { href: '/blog', label: 'Blog' },
      { href: '/categorias', label: 'Categorías' },
      { href: '/herramientas', label: 'Herramientas' },
      { href: '/guias', label: 'Guías' },
    ],
    empresa: [
      { href: '/acerca', label: 'Acerca de' },
      { href: '/contacto', label: 'Contacto' },
      { href: '/privacidad', label: 'Privacidad' },
      { href: '/terminos', label: 'Términos' },
    ],
    recursos: [
      { href: '/newsletter', label: 'Newsletter' },
      { href: '/rss', label: 'RSS Feed' },
      { href: '/sitemap', label: 'Sitemap' },
      { href: '/api', label: 'API' },
      { href: '/apoyanos', label: 'Apóyanos' },
    ],
  }

  const socialLinks = [
    { href: 'https://twitter.com/aiblogmvp', label: 'Twitter' },
    { href: 'https://github.com/aiblogmvp', label: 'GitHub' },
    { href: 'https://linkedin.com/company/aiblogmvp', label: 'LinkedIn' },
    { href: 'mailto:hola@aiblogmvp.com', label: 'Email' },
  ]

  return (
    <footer className="bg-white text-gray-900 dark:bg-neutral-900 dark:text-white pt-6 pb-4 mt-12 border-t border-gray-200 dark:border-neutral-800 text-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Brand Section */}
          <div className="flex flex-col items-start mb-2 md:mb-0 min-w-[180px]">
            <div className="flex items-center gap-2">
              <Logo showText={false} size={90} logoUrl={logoUrl} />
              <span className="text-base font-bold text-gray-900 dark:text-white flex items-center" style={{lineHeight: '28px', height: '28px'}}>{siteName}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 max-w-xs">
              {siteDescription}
            </p>
          </div>
          <p className="text-gray-500 dark:text-gray-400 max-w-md text-xs md:text-sm mb-0">
            Tu fuente confiable de noticias, herramientas y guías sobre Inteligencia Artificial.
          </p>
          {/* Social Links */}
          <div className="flex space-x-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-200 dark:bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label={social.label}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-2">
          {/* Content Links */}
          <div>
            <h3 className="text-xs font-semibold mb-2">Contenido</h3>
            <ul className="space-y-1">
              {footerLinks.contenido.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Company Links */}
          <div>
            <h3 className="text-xs font-semibold mb-2">Empresa</h3>
            <ul className="space-y-1">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-semibold mb-2">Recursos</h3>
            <ul className="space-y-1">
              {footerLinks.recursos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-200 text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs mb-1 md:mb-0">
              © {currentYear} PromptLab. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>Hecho con</span>
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>en España</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs text-gray-400">
            <Link href="/politica-de-privacidad" className="underline hover:text-blue-600 dark:hover:text-white">Política de Privacidad</Link>
            <span>|</span>
            <Link href="/politica-de-cookies" className="underline hover:text-blue-600 dark:hover:text-white">Política de Cookies</Link>
          </div>
        </div>
      </div>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Ir arriba"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </footer>
  )
} 