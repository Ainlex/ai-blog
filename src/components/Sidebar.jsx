import { useState, useRef, useEffect } from 'react';
import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

// Datos mock para desarrollo
const mockData = {
  aiTools: {
    principiantes: [
      { name: 'ChatGPT Plus', price: '$20/mes', discount: 'Prueba gratis', url: '#' },
      { name: 'Notion AI', price: '$10/mes', discount: '7 días gratis', url: '#' }
    ],
    profesionales: [
      { name: 'Jasper AI', price: '$40/mes', discount: '30% OFF', url: '#' },
      { name: 'Copy.ai', price: '$49/mes', discount: '20% OFF', url: '#' }
    ],
    empresas: [
      { name: 'Claude API', price: 'Por uso', discount: 'Créditos gratis', url: '#' }
    ]
  },
  popularPosts: [
    { title: 'Guía completa de ChatGPT', slug: '/guia-chatgpt', readingTime: 10 },
    { title: 'IA para principiantes', slug: '/ia-principiantes', readingTime: 5 }
  ]
};

const badgeColors = {
  'Prueba gratis': 'bg-green-600',
  '7 días gratis': 'bg-green-500',
  '30% OFF': 'bg-pink-600',
  '20% OFF': 'bg-yellow-500',
  'Créditos gratis': 'bg-purple-600',
};

// Simulación de items del menú desde Sanity (puedes reemplazar por fetch real)
const menuItems = [
  { label: 'Inicio', icon: '🏠', url: '/' },
  { label: 'Guías Gratuitas', icon: '📚', url: '/guias' },
  { label: 'Artículos Populares', icon: '🔥', url: '/articulos-populares' },
  { label: 'Herramientas IA', icon: '🛠️', isAITools: true },
  { label: 'Newsletter', icon: '📧', url: '/newsletter' },
  { label: 'Casos de Uso', icon: '💡', url: '/casos-de-uso' },
  { label: 'Empezar con IA', icon: '🎯', url: '/empezar' },
];

export default function Sidebar({ isOpen, onClose, currentPage }) {
  const [openAITools, setOpenAITools] = useState(false);
  const [openSub, setOpenSub] = useState({
    principiantes: false,
    profesionales: false,
    empresas: false,
  });
  const sidebarRef = useRef(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Cerrar con ESC
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Evitar scroll fondo
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Render badge
  const renderBadge = (discount) => (
    <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded ${badgeColors[discount] || 'bg-blue-600'}`}>{discount}</span>
  );

  // Render submenú Herramientas IA
  const renderAITools = () => (
    <div className="mb-2">
      <button
        className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-base gap-3"
        onClick={() => setOpenAITools((prev) => !prev)}
        aria-expanded={openAITools}
      >
        <span>🛠️</span>
        <span>Herramientas IA</span>
        <ArrowRightIcon className={`w-4 h-4 ml-auto transform transition-transform ${openAITools ? 'rotate-90' : ''}`} />
      </button>
      {openAITools && (
        <div className="pl-4 mt-2 space-y-2">
          {['principiantes', 'profesionales', 'empresas'].map(cat => (
            <div key={cat}>
              <button
                className="flex items-center w-full px-2 py-2 rounded hover:bg-gray-800 transition-colors font-medium gap-2"
                onClick={() => setOpenSub(t => ({ ...t, [cat]: !t[cat] }))}
                aria-expanded={openSub[cat]}
              >
                <span>
                  {cat === 'principiantes' && '🎯'}
                  {cat === 'profesionales' && '💼'}
                  {cat === 'empresas' && '🏢'}
                </span>
                <span>
                  {cat === 'principiantes' && 'Para Principiantes'}
                  {cat === 'profesionales' && 'Para Profesionales'}
                  {cat === 'empresas' && 'Para Empresas'}
                </span>
                <ArrowRightIcon className={`w-4 h-4 ml-auto transform transition-transform ${openSub[cat] ? 'rotate-90' : ''}`} />
              </button>
              {openSub[cat] && (
                <ul className="pl-4 mt-1 space-y-1">
                  {(mockData.aiTools[cat] || []).map(tool => (
                    <li key={tool.name} className="flex items-center justify-between group">
                      <a
                        href={tool.url}
                        className="flex items-center gap-2 w-full text-left py-2 px-2 rounded hover:bg-gray-800 transition"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="truncate">{tool.name}</span>
                        <span className="text-xs text-gray-400">{tool.price}</span>
                        {tool.discount && renderBadge(tool.discount)}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300" aria-hidden="true" onClick={onClose} />
      )}
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 h-full w-80 max-w-full bg-gray-900 text-gray-100 shadow-2xl flex flex-col transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Menú lateral"
        style={{ transitionProperty: 'transform' }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <span className="text-xl font-bold tracking-tight">Menú</span>
          <button onClick={onClose} aria-label="Cerrar menú" className="p-2 rounded hover:bg-gray-800 transition">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
          {menuItems.map(item =>
            item.isAITools
              ? renderAITools()
              : (
                <a
                  key={item.label}
                  href={item.url}
                  className={`flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-base gap-3 ${currentPage === item.url ? 'bg-gray-800 text-blue-400' : ''}`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              )
          )}
        </nav>
        {/* Sección de artículos populares */}
        <div className="border-t border-gray-800 px-4 py-3">
          <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
            <span>🔥</span> ARTÍCULOS POPULARES
          </div>
          <ul className="space-y-1">
            {mockData.popularPosts.map(post => (
              <li key={post.slug}>
                <a
                  href={post.slug}
                  className="block text-gray-200 hover:text-blue-400 transition-colors text-sm truncate"
                >
                  {post.title} <span className="text-xs text-gray-400 ml-2">{post.readingTime} min</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
} 