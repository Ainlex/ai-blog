# Módulo de Carga de Imágenes - AI Blog MVP

Este módulo automatiza la carga de imágenes locales a Cloudinary y la actualización de artículos en Notion CMS.

## 🚀 Características

- ✅ Subida automática de imágenes a Cloudinary
- ✅ Actualización automática del campo `Cover` en Notion
- ✅ Procesamiento en lote de múltiples imágenes
- ✅ Manejo de errores robusto
- ✅ Configuración mediante variables de entorno
- ✅ Funciones reutilizables y escalables
- ✅ Transformaciones de imagen automáticas
- ✅ Logging detallado del proceso

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install cloudinary @notionhq/client dotenv
```

### 2. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

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

#### Cloudinary
1. Crear cuenta en [cloudinary.com](https://cloudinary.com)
2. Ir a Dashboard → API Environment variable
3. Copiar Cloud Name, API Key y API Secret

#### Notion
1. Ir a [notion.so/my-integrations](https://notion.so/my-integrations)
2. Crear nueva integración
3. Copiar Internal Integration Token
4. Compartir la base de datos con la integración

## 🔧 Uso Básico

### Función Principal

```javascript
const { uploadImageAndUpdateNotion } = require('./src/lib/image-uploader')

// Cargar imagen y actualizar artículo
const result = await uploadImageAndUpdateNotion(
  'page-id-de-notion',
  './imagenes/articulo1.png',
  {
    folder: 'ai-blog/articulos',
    tags: ['articulo', 'ai']
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

## 📚 API Reference

### `uploadImageToCloudinary(imagePath, options)`

Sube una imagen local a Cloudinary.

**Parámetros:**
- `imagePath` (string): Ruta local de la imagen
- `options` (object, opcional):
  - `folder` (string): Carpeta en Cloudinary (default: 'ai-blog')
  - `public_id` (string): Nombre público de la imagen
  - `transformation` (object): Transformaciones de imagen
  - `tags` (array): Etiquetas para la imagen

**Retorna:** `Promise<UploadResult>`

### `updateNotionPageCover(pageId, imageUrl)`

Actualiza el campo Cover de una página en Notion.

**Parámetros:**
- `pageId` (string): ID de la página en Notion
- `imageUrl` (string): URL de la imagen en Cloudinary

**Retorna:** `Promise<NotionUpdateResult>`

### `uploadImageAndUpdateNotion(pageId, imagePath, uploadOptions)`

Función principal que combina carga y actualización.

**Parámetros:**
- `pageId` (string): ID de la página en Notion
- `imagePath` (string): Ruta local de la imagen
- `uploadOptions` (object, opcional): Opciones de carga

**Retorna:** `Promise<{upload: UploadResult, notion: NotionUpdateResult}>`

### `batchUploadImages(tasks)`

Procesa múltiples imágenes en lote.

**Parámetros:**
- `tasks` (array): Array de objetos con `pageId`, `imagePath` y `uploadOptions`

**Retorna:** `Promise<Array<{pageId: string, result: object}>>`

## 🎯 Casos de Uso

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

## 🔍 Funciones de Utilidad

### `getImageInfo(publicId)`
Obtiene información de una imagen en Cloudinary.

### `deleteImageFromCloudinary(publicId)`
Elimina una imagen de Cloudinary.

### `getImagesFromFolder(folder)`
Lista todas las imágenes de una carpeta en Cloudinary.

## 🛠️ Configuración de Notion

### Estructura de la Base de Datos

La base de datos debe tener una propiedad llamada `Cover` de tipo `Files`:

1. Crear nueva propiedad en la base de datos
2. Nombre: `Cover`
3. Tipo: `Files`
4. Configuración: Permitir archivos externos

### Permisos de Integración

1. Ir a la base de datos en Notion
2. Click en "Share" (arriba a la derecha)
3. Buscar tu integración por nombre
4. Dar permisos de "Edit"

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

## 📝 Ejemplos Completos

Ver el archivo `examples/upload-image-example.js` para ejemplos detallados de uso.

## 🔧 Desarrollo

### Estructura del Proyecto

```
src/lib/
├── image-uploader.ts    # Módulo principal
└── README-image-uploader.md  # Esta documentación

examples/
└── upload-image-example.js   # Ejemplos de uso
```

### Testing

```bash
# Probar con imagen de ejemplo
node examples/upload-image-example.js
```

## 📄 Licencia

Este módulo es parte del proyecto AI Blog MVP. 