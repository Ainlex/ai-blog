# PromptLab

Blog y directorio de herramientas de IA construido con Next.js 14, Sanity CMS y TailwindCSS.

## Requisitos

- Node.js 18.x o superior
- npm 9.x o superior

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

## Tecnologías Principales

- Next.js 14
- Sanity CMS
- TailwindCSS
- TypeScript

## Estructura del Proyecto

```
src/
  ├── app/          # Rutas y páginas de Next.js
  ├── components/   # Componentes React
  ├── lib/         # Utilidades y configuraciones
  ├── sanity/      # Configuración y schemas de Sanity
  └── types/       # Definiciones de TypeScript
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter
- `npm run type-check` - Verifica tipos de TypeScript

## Licencia

MIT 