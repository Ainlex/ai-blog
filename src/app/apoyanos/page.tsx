import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Apóyanos | AI Blog MVP',
  description: 'Ayudá a que este blog de Inteligencia Artificial siga creciendo. Descubrí cómo podés apoyar nuestro trabajo.',
  alternates: {
    canonical: 'https://tudominio.com/apoyanos',
  },
  openGraph: {
    title: 'Apóyanos | AI Blog MVP',
    description: 'Ayudá a que este blog de Inteligencia Artificial siga creciendo. Descubrí cómo podés apoyar nuestro trabajo.',
    url: 'https://tudominio.com/apoyanos',
  },
}

export default function ApoyanosPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">Apóyanos</h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">¿Por qué apoyar este blog?</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-2">Tu apoyo nos permite seguir creando contenido de calidad sobre Inteligencia Artificial, mantener el sitio libre de muros de pago y mejorar la experiencia para toda la comunidad.</p>
        </section>
        <section className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-lg font-bold text-yellow-700 dark:text-yellow-300 mb-2">Invitá un café ☕</h2>
            <p className="text-gray-700 dark:text-gray-200 text-center mb-4">Contribuí con una donación única a través de Ko-fi. ¡Cada café nos ayuda a crecer!</p>
            <a
              href="https://ko-fi.com/TUNOMBREAQUI"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Invitar un café vía Ko-fi"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Invitar un café en Ko-fi
            </a>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2">Otras formas de apoyar</h2>
            <ul className="text-gray-700 dark:text-gray-200 text-center space-y-2">
              <li>🔗 Compartí nuestros artículos en tus redes</li>
              <li>📧 Suscribite al newsletter</li>
              <li>🤝 Seguinos en <a href="https://twitter.com/aiblogmvp" className="underline hover:text-blue-500">Twitter</a> y <a href="https://linkedin.com/company/aiblogmvp" className="underline hover:text-blue-500">LinkedIn</a></li>
            </ul>
          </div>
        </section>
        <section className="text-center text-gray-500 dark:text-gray-400 text-sm mt-6">
          ¡Gracias por ser parte de la comunidad!
        </section>
        <Script id="faq-apoyanos-jsonld" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': '¿Por qué apoyar este blog?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Tu apoyo nos permite seguir creando contenido de calidad sobre Inteligencia Artificial, mantener el sitio libre de muros de pago y mejorar la experiencia para toda la comunidad.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Cómo se usan las donaciones?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Las donaciones se destinan a cubrir los costos de hosting, herramientas, investigación y desarrollo de nuevos contenidos.'
                }
              },
              {
                '@type': 'Question',
                'name': '¿Qué otras formas de apoyar existen?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Además de donar, podés compartir nuestros artículos, suscribirte al newsletter y seguirnos en redes sociales.'
                }
              }
            ]
          })}
        </Script>
      </div>
    </main>
  )
} 