import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(1, 'El nombre es requerido').max(100),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Validar usando Zod y devolver solo strings de error
    const parsed = newsletterSchema.safeParse(body)
    if (!parsed.success) {
      // Devuelve solo los mensajes de error como array de strings (message, msg o JSON.stringify)
      return NextResponse.json({
        success: false,
        error: parsed.error.errors.map(e =>
          typeof e.message === 'string' ? e.message : JSON.stringify(e)
        ),
      }, { status: 400 })
    }
    const { email, name } = parsed.data
    // Log para depuración: mostrar todas las variables de entorno
    console.log('Todas las variables de entorno:', process.env)
    const apiKey = process.env.BUTTONDOWN_API_KEY
    if (!apiKey) {
      return NextResponse.json({ success: false, error: 'API Key de Buttondown no configurada.' }, { status: 500 })
    }
    // Llamar a la API de Buttondown
    const res = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${apiKey}`,
      },
      body: JSON.stringify({ email_address: email, metadata: { name } })
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return NextResponse.json({ success: false, error: data.detail || 'Error al suscribir.' }, { status: 400 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error inesperado.' }, { status: 500 })
  }
}

// Optional: GET method to check if newsletter is available
export async function GET() {
  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
  
  return NextResponse.json({
    success: true,
    available: !!formspreeEndpoint,
    service: formspreeEndpoint ? 'Formspree' : 'None',
  })
} 