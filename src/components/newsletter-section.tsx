'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [consent, setConsent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !name) {
      toast.error('Por favor completa todos los campos')
      return
    }

    if (!email.includes('@')) {
      toast.error('Por favor ingresa un email válido')
      return
    }

    if (!consent) {
      toast.error('Debes aceptar la política de privacidad para suscribirte')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('¡Gracias por suscribirte! Revisa tu correo para confirmar tu suscripción.')
        setEmail('')
        setName('')
      } else {
        if (Array.isArray(data.error)) {
          const firstError = data.error[0];
          toast.error(typeof firstError === 'string' ? firstError : JSON.stringify(firstError));
        } else {
          toast.error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
        }
      }
    } catch (error) {
      console.error('Newsletter error:', error)
      toast.error('Error de conexión. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="newsletter" className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Mantente <span className="text-yellow-300">Actualizado</span>!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Suscríbete a nuestro newsletter y recibe las últimas noticias, herramientas y guías sobre Inteligencia Artificial directamente en tu email.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/20 focus:outline-none text-gray-900"
                  required
                />
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/20 focus:outline-none text-gray-900"
                  required
                />
              </div>
            </div>
            <div className="flex items-center mt-4 mb-2 text-left">
              <input
                type="checkbox"
                id="privacy-consent"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mr-2 accent-blue-600"
                required
              />
              <label htmlFor="privacy-consent" className="text-white text-sm select-none">
                Acepto la <a href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer" className="underline text-blue-200 hover:text-blue-400">política de privacidad</a> y el uso de mis datos para este fin.
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading || !consent}
              className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Suscribiendo...
                </div>
              ) : (
                'Suscribirse'
              )}
            </button>
          </form>

          <p className="text-white/70 text-sm mt-4">
            No spam, solo contenido valioso. Puedes cancelar la suscripción en cualquier momento.
          </p>
        </div>
      </div>
    </section>
  )
} 