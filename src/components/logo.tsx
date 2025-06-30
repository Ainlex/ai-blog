'use client'

import Link from 'next/link'

interface LogoProps {
  className?: string
  showText?: boolean | string
  logoUrl?: string | null
  size?: number
}

export default function Logo({ className = '', showText = true, logoUrl, size = 80 }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt="Logo del blog"
          className="object-contain mr-2"
          style={{ width: size, height: size, minWidth: size, minHeight: size }}
        />
      ) : (
        <div className="flex items-center justify-center mr-2" style={{ width: size, height: size }}>
          <span className="text-blue-700 font-bold text-3xl">AI</span>
        </div>
      )}
      {showText && (
        <span className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          {typeof showText === 'string' ? showText : 'AI Blog MVP'}
        </span>
      )}
    </Link>
  )
} 