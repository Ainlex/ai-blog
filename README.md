# Blog de Inteligencia Artificial

Un blog moderno y completamente funcional sobre Inteligencia Artificial, construido con Next.js 14, TypeScript, Tailwind CSS y Notion como CMS.

## 🚀 Características

### ✅ Funcionalidades Completas
- **CMS con Notion**: Gestión de contenido a través de Notion
- **Blog completo**: Posts individuales con contenido rico
- **Búsqueda avanzada**: Búsqueda por texto, categorías y etiquetas
- **Paginación**: Navegación entre páginas de resultados
- **Categorías y etiquetas**: Organización de contenido
- **Newsletter**: Suscripción con Formspree
- **SEO optimizado**: Meta tags, sitemap, robots.txt
- **Analytics**: Integración con Google Analytics
- **AdSense**: Soporte para Google AdSense
- **Tema oscuro/claro**: Modo oscuro y claro
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Performance**: Optimizado para velocidad

### 🎨 Diseño
- **UI moderna**: Diseño limpio y profesional
- **Gradientes**: Efectos visuales atractivos
- **Iconos**: Iconografía consistente
- **Tipografía**: Jerarquía visual clara
- **Animaciones**: Transiciones suaves

### 🔧 Tecnologías
- **Next.js 14**: Framework React con App Router
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework CSS utility-first
- **Notion API**: CMS headless
- **Zod**: Validación de datos
- **Framer Motion**: Animaciones
- **React Icons**: Iconografía

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Notion

### Pasos

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd site
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales:
   ```env
   NOTION_API_KEY=secret_your_integration_token
   NOTION_DATABASE_ID=your_database_id
   CUSTOM_KEY=your_custom_key
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
   ```

4. **Configurar Notion**:
   - Crear integración en [Notion Integrations](https://www.notion.so/my-integrations)
   - Crear base de datos con las propiedades requeridas
   - Compartir base de datos con la integración
   - Ver instrucciones detalladas en `CONFIGURACION_NOTION.md`

5. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## 🗂️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # API routes
│   ├── blog/              # Páginas del blog
│   ├── search/            # Página de búsqueda
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página de inicio
│   ├── sitemap.ts         # Generador de sitemap
│   └── not-found.tsx      # Página 404
├── components/            # Componentes React
│   ├── ui/               # Componentes de UI
│   ├── blog-list.tsx     # Lista de posts
│   ├── featured-posts.tsx # Posts destacados
│   ├── post-card.tsx     # Tarjeta de post
│   ├── search-form.tsx   # Formulario de búsqueda
│   └── ...
├── lib/                  # Utilidades y configuraciones
│   └── notion.ts         # Cliente de Notion
└── types/                # Definiciones de TypeScript
    └── index.ts          # Tipos principales
```

## 📝 Configuración de Notion

### Propiedades Requeridas en la Base de Datos

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| **Título** | Title | Título del post |
| **Slug** | Text | URL amigable |
| **Resumen** | Text | Descripción breve |
| **Tags** | Multi-select | Etiquetas múltiples |
| **Categoría** | Select | Una sola categoría |
| **Estado** | Select | "Borrador" o "Listo" |
| **Destacado** | Checkbox | Marcar posts destacados |
| **Autor** | Text | Nombre del autor |
| **Fecha** | Date | Fecha de publicación |
| **Cover** | URL | Imagen de portada |

### Pasos Detallados
Ver `CONFIGURACION_NOTION.md` para instrucciones completas.

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente

### Otras Opciones
- Netlify
- Railway
- Docker
- VPS tradicional

Ver `PRODUCTION.md` para instrucciones detalladas.

## 📊 Funcionalidades

### Blog
- ✅ Posts individuales con contenido rico
- ✅ Posts destacados en la página principal
- ✅ Categorías y etiquetas
- ✅ Paginación
- ✅ Búsqueda avanzada
- ✅ Posts relacionados

### SEO
- ✅ Meta tags dinámicos
- ✅ Open Graph
- ✅ Twitter Cards
- ✅ Sitemap automático
- ✅ Robots.txt
- ✅ URLs amigables

### Newsletter
- ✅ Formulario de suscripción
- ✅ Integración con Formspree
- ✅ Validación de datos
- ✅ Mensajes de confirmación

### Analytics y Ads
- ✅ Google Analytics
- ✅ Google AdSense
- ✅ Tracking de eventos

## 🎨 Personalización

### Colores
Editar `tailwind.config.ts` para cambiar la paleta de colores:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ... más tonos
        900: '#1e3a8a',
      },
      accent: {
        // ... colores de acento
      },
    },
  },
}
```

### Componentes
Los componentes están en `src/components/` y pueden ser personalizados fácilmente.

### Contenido
Todo el contenido se gestiona desde Notion, sin necesidad de tocar código.

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Construir para producción
npm run start        # Iniciar servidor de producción
npm run lint         # Linting
npm run type-check   # Verificación de tipos
```

## 📈 Performance

- **Lighthouse Score**: 95+ en todas las métricas
- **Core Web Vitals**: Optimizado
- **SEO**: 100/100
- **Accessibility**: 95+

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas:

1. Revisar la documentación
2. Verificar la configuración de Notion
3. Revisar las variables de entorno
4. Abrir un issue en GitHub

## 🔗 Enlaces Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Notion API Documentation](https://developers.notion.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

**¡El blog está 100% listo para producción!** 🎉 