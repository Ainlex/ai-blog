import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | AI Blog MVP',
  description: 'Información sobre el uso de cookies en AI Blog MVP y cómo gestionarlas.',
  alternates: { canonical: '/politica-de-cookies' }
};

export default function PoliticaDeCookies() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4">
      <section className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Política de Cookies</h1>
        <p className="mb-4">Este sitio web utiliza cookies para mejorar la experiencia del usuario, analizar el tráfico y ofrecer contenido personalizado.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">¿Qué son las cookies?</h2>
        <p className="mb-4">Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Tipos de cookies que usamos:</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>Cookies estrictamente necesarias:</strong> imprescindibles para el funcionamiento del sitio.</li>
          <li><strong>Cookies de rendimiento:</strong> recopilan información sobre el uso del sitio para mejorar su funcionamiento.</li>
          <li><strong>Cookies funcionales:</strong> permiten recordar preferencias del usuario.</li>
          <li><strong>Cookies de publicidad:</strong> usadas para mostrar anuncios personalizados.</li>
        </ul>
        <h2 className="text-xl font-semibold mt-6 mb-2">Consentimiento</h2>
        <p className="mb-4">Al continuar navegando, usted acepta el uso de cookies según esta política. Puede configurar o rechazar las cookies desde su navegador.</p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Cómo gestionar las cookies</h2>
        <p className="mb-4">Puede configurar su navegador para bloquear o eliminar cookies. Sin embargo, esto puede afectar la funcionalidad del sitio.</p>
        <p className="mb-4">Para más información sobre cookies y cómo gestionarlas, visite <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">www.aboutcookies.org</a></p>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Fecha de última actualización: [dd/mm/aaaa]</p>
      </section>
    </main>
  );
} 