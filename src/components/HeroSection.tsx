'use client';

interface HeroSectionProps {
  category: 'principiantes' | 'profesionales' | 'empresas';
}

const categoryContent = {
  principiantes: {
    title: 'Herramientas IA para Principiantes',
    description: 'Descubre las mejores herramientas de IA para comenzar tu viaje en la inteligencia artificial. Soluciones fáciles de usar y accesibles para todos.',
    gradient: 'from-blue-600 to-purple-600',
    icon: '🎯',
    stats: [
      { label: 'Herramientas gratuitas', value: '50+' },
      { label: 'Tutoriales', value: '100+' },
      { label: 'Usuarios activos', value: '10K+' }
    ]
  },
  profesionales: {
    title: 'Herramientas IA para Profesionales',
    description: 'Potencia tu trabajo con herramientas de IA avanzadas. Soluciones profesionales para optimizar tu flujo de trabajo y aumentar tu productividad.',
    gradient: 'from-purple-600 to-pink-600',
    icon: '💼',
    stats: [
      { label: 'Herramientas premium', value: '30+' },
      { label: 'Integraciones', value: '50+' },
      { label: 'Profesionales', value: '5K+' }
    ]
  },
  empresas: {
    title: 'Herramientas IA para Empresas',
    description: 'Transforma tu empresa con soluciones de IA empresariales. Herramientas escalables y seguras para equipos y organizaciones.',
    gradient: 'from-blue-600 to-cyan-600',
    icon: '🏢',
    stats: [
      { label: 'Soluciones enterprise', value: '20+' },
      { label: 'Casos de éxito', value: '100+' },
      { label: 'ROI promedio', value: '300%' }
    ]
  }
};

export default function HeroSection({ category }: HeroSectionProps) {
  const content = categoryContent[category];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${content.gradient}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        {/* Content */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{content.icon}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {content.title}
            </h1>
          </div>
          
          <p className="text-lg sm:text-xl text-white/90 mb-8">
            {content.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 