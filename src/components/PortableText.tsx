import { PortableText as PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface PortableTextProps {
  value: any
  className?: string
}

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <div className="my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Imagen'}
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
            priority={false}
          />
          {value.caption && (
            <p className="mt-2 text-sm text-gray-600 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    cloudinaryImage: ({ value }: any) => {
      if (!value?.url) {
        return null
      }

      return (
        <div className="my-8">
          <Image
            src={value.url}
            alt={value.alt || 'Imagen'}
            width={value.width || 800}
            height={value.height || 600}
            className="rounded-lg shadow-lg"
            priority={false}
          />
          {value.caption && (
            <p className="mt-2 text-sm text-gray-600 text-center italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4">
          <code>{value.code}</code>
        </pre>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-bold mb-2 mt-4">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      )
    },
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: ({ children }: any) => (
    <li className="ml-4">{children}</li>
  ),
}

export default function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) {
    return null
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableTextComponent value={value} components={components} />
    </div>
  )
} 