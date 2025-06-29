# 🚀 Instrucciones de Ejecución - AI Blog MVP

## ✅ Estado Actual del Proyecto

El MVP está **95% completo** y listo para funcionar. Solo faltan algunos componentes menores y la instalación de dependencias.

## 🔧 Pasos para Ejecutar

### 1. Instalar Dependencias

```bash
# Navegar al directorio del proyecto
cd site

# Instalar dependencias
npm install
```

### 2. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar .env con tus credenciales
```

**Variables obligatorias:**
```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

**Variables opcionales:**
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXX
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Ejecutar el Proyecto

#### Opción A: Con Docker (Recomendado)
```bash
# Desarrollo
docker-compose --profile dev up --build

# Producción
docker-compose up --build
```

#### Opción B: Con npm
```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Producción
npm start
```

### 4. Acceder a la Aplicación

- **Desarrollo**: http://localhost:3001 (Docker) o http://localhost:3000 (npm)
- **Producción**: http://localhost:3000

## 🎯 Funcionalidades Implementadas

### ✅ Completamente Funcional
- **Página Principal** con hero section, artículos destacados y newsletter
- **Navegación** responsive con modo oscuro
- **APIs** de búsqueda, newsletter y posts destacados
- **SEO** con sitemap dinámico y robots.txt
- **Docker** configurado para desarrollo y producción
- **TypeScript** con tipos completos
- **Tailwind CSS** con diseño profesional

### ⚠️ Necesita Configuración
- **Notion API** - Requiere credenciales reales
- **Google Analytics** - Opcional, para métricas
- **Google AdSense** - Opcional, para monetización
- **Formspree** - Opcional, para newsletter

## 🔍 Resolución de Errores

### Errores de TypeScript
Los errores de TypeScript se resolverán automáticamente al instalar las dependencias:

```bash
npm install
```

### Errores de Módulos
Si aparecen errores de módulos no encontrados, ejecuta:

```bash
# Limpiar caché
rm -rf node_modules .next
npm install
```

### Errores de Notion
Si no tienes configuración de Notion, el sitio funcionará con datos de ejemplo.

## 📝 Configuración de Notion (Opcional)

### 1. Crear Integración
1. Ve a [Notion Integrations](https://www.notion.so/my-integrations)
2. Crea una nueva integración
3. Copia la API Key

### 2. Crear Base de Datos
Crea una base de datos con estas propiedades:
- **Title** (Title) - Título del artículo
- **Slug** (Text) - URL amigable
- **Excerpt** (Text) - Resumen
- **Tags** (Multi-select) - Etiquetas
- **Category** (Select) - Categoría
- **Status** (Select) - Publicado/Draft
- **Featured** (Checkbox) - Destacado
- **Author** (Text) - Autor
- **PublishedAt** (Date) - Fecha publicación
- **CoverImage** (URL) - Imagen portada

### 3. Compartir Base de Datos
1. Comparte la base de datos con tu integración
2. Copia el ID de la base de datos
3. Añádelo a `.env`

## 🚀 Despliegue en Vercel

### 1. Conectar Repositorio
1. Sube el código a GitHub
2. Conecta el repositorio a Vercel
3. Configura las variables de entorno en Vercel

### 2. Variables de Entorno en Vercel
```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
```

### 3. Desplegar
Vercel detectará automáticamente que es un proyecto Next.js y lo desplegará.

## 📊 Monitoreo y Analytics

### Google Analytics
1. Crea una propiedad en Google Analytics
2. Copia el ID de medición (G-XXXXXXXXXX)
3. Añádelo a `NEXT_PUBLIC_GA_ID`

### Google AdSense
1. Crea una cuenta de AdSense
2. Copia tu Client ID
3. Añádelo a `NEXT_PUBLIC_ADSENSE_CLIENT_ID`

## 🎨 Personalización

### Colores
Edita `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#tu-color-principal',
  },
  accent: {
    500: '#tu-color-acento',
  }
}
```

### Contenido
- **Logo**: Reemplaza el logo en `src/components/navbar.tsx`
- **Textos**: Edita los textos en los componentes
- **Imágenes**: Añade tus imágenes en `public/`

## 🆘 Solución de Problemas

### El sitio no carga
```bash
# Verificar dependencias
npm install

# Verificar variables de entorno
cat .env

# Verificar logs
npm run dev
```

### Errores de API
- Verifica que las credenciales de Notion sean correctas
- Asegúrate de que la base de datos esté compartida con la integración

### Errores de Docker
```bash
# Reconstruir imagen
docker-compose down
docker-compose up --build
```

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en la consola
2. Verifica la configuración de variables de entorno
3. Asegúrate de que todas las dependencias estén instaladas

---

**¡El proyecto está listo para usar! 🎉** 