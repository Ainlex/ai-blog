import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | AI Blog MVP',
  description: 'Conoce cómo protegemos y tratamos tus datos personales en AI Blog MVP.',
  alternates: { canonical: '/politica-de-privacidad' }
};

export default function PoliticaDePrivacidad() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <section className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Política de Privacidad</h1>
        <p className="mb-4">En <strong>[Nombre de tu empresa/sitio]</strong>, nos comprometemos a proteger y respetar su privacidad.</p>
        <ol className="list-decimal pl-6 space-y-3 mb-4">
          <li>
            <strong>Información que recopilamos</strong><br />
            Recopilamos información personal que usted nos proporciona directamente, como nombre, correo electrónico, y cualquier dato que facilite al usar nuestro sitio.
          </li>
          <li>
            <strong>Uso de la información</strong><br />
            La información recogida se utiliza para proporcionar y mejorar nuestros servicios, comunicarnos con usted y cumplir con obligaciones legales.
          </li>
          <li>
            <strong>Compartir información</strong><br />
            No vendemos ni alquilamos su información personal a terceros. Podemos compartir datos con proveedores de servicios que nos ayudan a operar el sitio, siempre bajo acuerdos de confidencialidad.
          </li>
          <li>
            <strong>Seguridad</strong><br />
            Implementamos medidas técnicas y organizativas para proteger sus datos contra acceso no autorizado, pérdida o alteración.
          </li>
          <li>
            <strong>Derechos del usuario</strong><br />
            Usted puede acceder, rectificar o eliminar sus datos, así como oponerse a su tratamiento enviando un correo a <a href="mailto:[email de contacto]" className="text-blue-600 underline">[email de contacto]</a>.
          </li>
          <li>
            <strong>Cambios en la política</strong><br />
            Podemos actualizar esta política. Los cambios serán publicados en esta página con la fecha de revisión.
          </li>
        </ol>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Fecha de última actualización: [dd/mm/aaaa]</p>
        <p className="text-sm">Si tiene preguntas, contáctenos en: <a href="mailto:[email de contacto]" className="text-blue-600 underline">[email de contacto]</a></p>
      </section>
    </main>
  );
} 