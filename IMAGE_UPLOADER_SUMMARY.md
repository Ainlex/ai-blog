# 🚀 Módulo de Carga de Imágenes - Resumen Completo

## 📋 ¿Qué hace este módulo?

Este módulo automatiza completamente el proceso de:
1. **Subir imágenes locales a Cloudinary** usando su SDK oficial
2. **Obtener la URL pública** de la imagen subida
3. **Actualizar automáticamente** el campo `Cover` de artículos en tu base de datos de Notion
4. **Procesar múltiples imágenes en lote** para automatización semanal

## 🎯 Caso de Uso Principal

Perfecto para automatizar la carga de **imágenes generadas por IA** para artículos que subes semanalmente a tu CMS en Notion.

## 📁 Archivos Creados

```
site/
├── src/lib/
│   ├── image-uploader.ts              # Módulo principal
│   └── README-image-uploader.md       # Documentación completa
├── examples/
│   └── upload-image-example.js        # Ejemplos de uso
├── scripts/
│   ├── setup-image-uploader.js        # Script de configuración
│   └── test-image-uploader.js         # Script de pruebas
├── imagenes/                          # Carpeta para tus imágenes
│   └── README.md                      # Guía de la carpeta
└── IMAGE_UPLOADER_SUMMARY.md          # Este archivo
```

## 🚀 Configuración Rápida

### 1. Instalar dependencias
```bash
cd site
node scripts/setup-image-uploader.js
```

### 2. Configurar credenciales
Crear archivo `.env` con:
```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# Notion
NOTION_API_KEY=tu-notion-api-key
NOTION_DATABASE_ID=tu-database-id
```

### 3. Obtener credenciales

#### Cloudinary:
1. Crear cuenta en [cloudinary.com](https://cloudinary.com)
2. Dashboard → API Environment variable
3. Copiar Cloud Name, API Key y API Secret

#### Notion:
1. Ir a [notion.so/my-integrations](https://notion.so/my-integrations)
2. Crear nueva integración
3. Copiar Internal Integration Token
4. Compartir tu base de datos con la integración

### 4. Configurar Notion
- Tu base de datos debe tener una propiedad llamada `Cover` de tipo `Files`
- Permitir archivos externos en la configuración

## 💻 Uso Básico

### Función Principal (Recomendada)
```javascript
const { uploadImageAndUpdateNotion } = require('./src/lib/image-uploader')

const result = await uploadImageAndUpdateNotion(
  'page-id-de-notion',           // ID de la página en Notion
  './imagenes/articulo1.png',    // Ruta local de la imagen
  {
    folder: 'ai-blog/articulos', // Carpeta en Cloudinary
    tags: ['articulo', 'ai']     // Etiquetas
  }
)

console.log(result)
// {
//   upload: { success: true, url: 'https://...', public_id: '...' },
//   notion: { success: true, page_id: '...' }
// }
```

### Procesamiento en Lote
```javascript
const { batchUploadImages } = require('./src/lib/image-uploader')

const tasks = [
  {
    pageId: 'page-id-1',
    imagePath: './imagenes/articulo1.png',
    uploadOptions: { folder: 'ai-blog/articulos' }
  },
  {
    pageId: 'page-id-2',
    imagePath: './imagenes/articulo2.png',
    uploadOptions: { folder: 'ai-blog/articulos' }
  }
]

const results = await batchUploadImages(tasks)
```

## 🧪 Probar el Módulo

### 1. Ejecutar pruebas
```bash
node scripts/test-image-uploader.js
```

### 2. Probar ejemplos
```bash
node examples/upload-image-example.js
```

## 📚 Funciones Disponibles

### Funciones Principales
- `uploadImageAndUpdateNotion(pageId, imagePath, options)` - Función completa
- `batchUploadImages(tasks)` - Procesamiento en lote
- `uploadImageToCloudinary(imagePath, options)` - Solo subir a Cloudinary
- `updateNotionPageCover(pageId, imageUrl)` - Solo actualizar Notion

### Funciones de Utilidad
- `getImageInfo(publicId)` - Obtener info de imagen
- `deleteImageFromCloudinary(publicId)` - Eliminar imagen
- `getImagesFromFolder(folder)` - Listar imágenes de carpeta

## 🎯 Casos de Uso Típicos

### 1. Automatización Semanal
```javascript
// Script para procesar imágenes semanales
const weeklyImages = [
  { pageId: 'page-1', imagePath: './semana1/articulo1.png' },
  { pageId: 'page-2', imagePath: './semana1/articulo2.png' },
  { pageId: 'page-3', imagePath: './semana1/articulo3.png' }
]

await batchUploadImages(weeklyImages)
```

### 2. Transformaciones Personalizadas
```javascript
const result = await uploadImageAndUpdateNotion(pageId, imagePath, {
  folder: 'ai-blog/articulos',
  transformation: {
    width: 1200,
    height: 630,
    crop: 'fill',
    quality: 'auto',
    fetch_format: 'auto'
  },
  tags: ['articulo', 'ai', 'blog']
})
```

### 3. Solo Subir a Cloudinary
```javascript
const { uploadImageToCloudinary } = require('./src/lib/image-uploader')

const result = await uploadImageToCloudinary('./imagen.png', {
  folder: 'ai-blog',
  public_id: 'mi-imagen'
})

console.log('URL:', result.url)
```

## 🔧 Configuración Avanzada

### Opciones de Carga
```javascript
const options = {
  folder: 'ai-blog/articulos',        // Carpeta en Cloudinary
  public_id: 'nombre-personalizado',  // Nombre público
  transformation: {                   // Transformaciones
    width: 1200,
    height: 630,
    crop: 'fill',
    quality: 'auto'
  },
  tags: ['articulo', 'ai', 'blog']    // Etiquetas
}
```

### Estructura de Carpetas Recomendada
```
imagenes/
├── articulo1.png
├── articulo2.png
├── articulo3.png
└── ...
```

## 🚨 Manejo de Errores

El módulo incluye manejo robusto de errores:
- Verificación de existencia de archivos
- Validación de variables de entorno
- Manejo de errores de API
- Logging detallado

```javascript
const result = await uploadImageAndUpdateNotion(pageId, imagePath)

if (!result.upload.success) {
  console.error('Error en carga:', result.upload.error)
}

if (!result.notion.success) {
  console.error('Error en Notion:', result.notion.error)
}
```

## 📊 Monitoreo y Logs

El módulo incluye logging detallado:
```
🚀 Iniciando proceso para página page-id con imagen ./imagenes/articulo1.png
✅ Imagen subida exitosamente: https://res.cloudinary.com/...
✅ Página actualizada exitosamente: page-id
```

## 🔄 Integración con Workflows

### Script Semanal Automatizado
```javascript
// weekly-upload.js
const { batchUploadImages } = require('./src/lib/image-uploader')

async function uploadWeeklyImages() {
  const weeklyTasks = [
    // Configurar tareas semanales aquí
  ]
  
  console.log('📦 Procesando imágenes semanales...')
  const results = await batchUploadImages(weeklyTasks)
  
  // Enviar reporte por email o Slack
  console.log('✅ Proceso completado:', results)
}

uploadWeeklyImages()
```

## 🎉 Beneficios

- ✅ **Ahorra tiempo**: Automatiza el proceso manual
- ✅ **Escalable**: Procesa múltiples imágenes fácilmente
- ✅ **Confiable**: Manejo robusto de errores
- ✅ **Flexible**: Funciones modulares reutilizables
- ✅ **Organizado**: Estructura de carpetas y etiquetas
- ✅ **Optimizado**: Transformaciones automáticas de imagen

## 📞 Soporte

Si tienes problemas:
1. Ejecuta `node scripts/test-image-uploader.js` para diagnosticar
2. Verifica las variables de entorno en `.env`
3. Revisa los permisos de tu integración de Notion
4. Consulta la documentación completa en `src/lib/README-image-uploader.md`

---

**¡Tu módulo de automatización de carga de imágenes está listo para usar! 🚀** 