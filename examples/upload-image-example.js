// Ejemplo de uso del módulo de carga de imágenes
// Ejecutar con: node examples/upload-image-example.js

require('dotenv').config()
const { 
  uploadImageAndUpdateNotion, 
  batchUploadImages,
  uploadImageToCloudinary,
  updateNotionPageCover 
} = require('../src/lib/image-uploader')

// Ejemplo 1: Cargar una sola imagen y actualizar un artículo
async function ejemploUno() {
  console.log('📝 Ejemplo 1: Cargar una imagen y actualizar artículo')
  
  const pageId = 'tu-page-id-de-notion-aqui'
  const imagePath = './imagenes/articulo1.png'
  
  const result = await uploadImageAndUpdateNotion(pageId, imagePath, {
    folder: 'ai-blog/articulos',
    tags: ['articulo', 'ai', 'blog']
  })
  
  console.log('Resultado:', result)
}

// Ejemplo 2: Cargar múltiples imágenes en lote
async function ejemploDos() {
  console.log('📦 Ejemplo 2: Cargar múltiples imágenes en lote')
  
  const tasks = [
    {
      pageId: 'page-id-1',
      imagePath: './imagenes/articulo1.png',
      uploadOptions: {
        folder: 'ai-blog/articulos',
        tags: ['articulo1', 'ai']
      }
    },
    {
      pageId: 'page-id-2', 
      imagePath: './imagenes/articulo2.png',
      uploadOptions: {
        folder: 'ai-blog/articulos',
        tags: ['articulo2', 'ai']
      }
    }
  ]
  
  const results = await batchUploadImages(tasks)
  
  console.log('Resultados del lote:', results)
}

// Ejemplo 3: Solo subir imagen a Cloudinary
async function ejemploTres() {
  console.log('☁️ Ejemplo 3: Solo subir imagen a Cloudinary')
  
  const imagePath = './imagenes/articulo1.png'
  
  const result = await uploadImageToCloudinary(imagePath, {
    folder: 'ai-blog/articulos',
    public_id: 'mi-articulo-ai',
    transformation: {
      quality: 'auto',
      fetch_format: 'auto',
      width: 1200,
      height: 630,
      crop: 'fill'
    }
  })
  
  console.log('URL de la imagen:', result.url)
}

// Ejemplo 4: Solo actualizar página en Notion
async function ejemploCuatro() {
  console.log('📄 Ejemplo 4: Solo actualizar página en Notion')
  
  const pageId = 'tu-page-id-de-notion-aqui'
  const imageUrl = 'https://res.cloudinary.com/tu-cloud/image/upload/v123/ai-blog/articulo1.png'
  
  const result = await updateNotionPageCover(pageId, imageUrl)
  
  console.log('Resultado de actualización:', result)
}

// Función principal
async function main() {
  try {
    // Verificar variables de entorno
    const requiredEnvVars = [
      'CLOUDINARY_CLOUD_NAME',
      'CLOUDINARY_API_KEY', 
      'CLOUDINARY_API_SECRET',
      'NOTION_API_KEY'
    ]
    
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      console.error('❌ Variables de entorno faltantes:', missingVars)
      console.log('💡 Asegúrate de tener un archivo .env con las siguientes variables:')
      console.log('CLOUDINARY_CLOUD_NAME=tu-cloud-name')
      console.log('CLOUDINARY_API_KEY=tu-api-key')
      console.log('CLOUDINARY_API_SECRET=tu-api-secret')
      console.log('NOTION_API_KEY=tu-notion-api-key')
      return
    }
    
    console.log('✅ Variables de entorno configuradas correctamente')
    
    // Ejecutar ejemplos (descomenta el que quieras probar)
    
    // await ejemploUno()
    // await ejemploDos()
    // await ejemploTres()
    // await ejemploCuatro()
    
    console.log('🎉 Ejemplos completados')
    
  } catch (error) {
    console.error('❌ Error en el ejemplo:', error)
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main()
}

module.exports = {
  ejemploUno,
  ejemploDos,
  ejemploTres,
  ejemploCuatro
} 