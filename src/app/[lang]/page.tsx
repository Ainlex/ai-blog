import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang
  const title = lang === 'en' ? 'Welcome to AI Blog MVP' : 'Bienvenido a AI Blog MVP'
  const description = lang === 'en'
    ? 'Discover the latest news, tools and guides about Artificial Intelligence.'
    : 'Descubre las últimas noticias, herramientas y guías sobre Inteligencia Artificial.'
  return {
    title,
    description,
    alternates: {
      canonical: `https://tudominio.com/${lang}`,
      languages: {
        'es': 'https://tudominio.com/es',
        'en': 'https://tudominio.com/en'
      }
    },
    openGraph: {
      title,
      description,
      url: `https://tudominio.com/${lang}`
    }
  }
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang
  const title = lang === 'en' ? 'Welcome to AI Blog MVP' : 'Bienvenido a AI Blog MVP'
  const description = lang === 'en'
    ? 'Discover the latest news, tools and guides about Artificial Intelligence.'
    : 'Descubre las últimas noticias, herramientas y guías sobre Inteligencia Artificial.'
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl text-center">{description}</p>
    </main>
  )
} 