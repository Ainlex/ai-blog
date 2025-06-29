'use client'

export function BlogHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog de Inteligencia Artificial
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Descubre las últimas noticias, herramientas, guías y tendencias del mundo de la IA. 
            Mantente actualizado con contenido de calidad sobre inteligencia artificial.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-blue-100 text-sm">Artículos Publicados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-blue-100 text-sm">Lectores Mensuales</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">6</div>
              <div className="text-blue-100 text-sm">Categorías</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 