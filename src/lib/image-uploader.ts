import { v2 as cloudinary } from 'cloudinary'
import { Client } from '@notionhq/client'
import * as fs from 'fs'
import * as path from 'path'

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Configuración de Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const DATABASE_ID = process.env.NOTION_DATABASE_ID

/**
 * Interfaz para las opciones de carga de imagen
 */
interface UploadOptions {
  folder?: string
  public_id?: string
  transformation?: any
  tags?: string[]
}

/**
 * Interfaz para el resultado de la carga
 */
interface UploadResult {
  success: boolean
  url?: string
  public_id?: string
  error?: string
}

/**
 * Interfaz para el resultado de la actualización en Notion
 */
interface NotionUpdateResult {
  success: boolean
  page_id?: string
  error?: string
}

/**
 * Sube una imagen local a Cloudinary
 * @param imagePath - Ruta local de la imagen
 * @param options - Opciones de carga (carpeta, nombre público, transformaciones, etiquetas)
 * @returns Promise<UploadResult>
 */
export async function uploadImageToCloudinary(
  imagePath: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    // Verificar que el archivo existe
    if (!fs.existsSync(imagePath)) {
      return {
        success: false,
        error: `El archivo no existe: ${imagePath}`
      }
    }

    // Configurar opciones por defecto
    const uploadOptions = {
      folder: options.folder || 'ai-blog',
      public_id: options.public_id || path.parse(imagePath).name,
      transformation: options.transformation || {
        quality: 'auto',
        fetch_format: 'auto'
      },
      tags: options.tags || ['ai-blog', 'auto-upload']
    }

    // Subir imagen a Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, uploadOptions)

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    }
  } catch (error) {
    console.error('Error al subir imagen a Cloudinary:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

/**
 * Actualiza el campo Cover de una página en Notion con la URL de la imagen
 * @param pageId - ID de la página en Notion
 * @param imageUrl - URL de la imagen en Cloudinary
 * @returns Promise<NotionUpdateResult>
 */
export async function updateNotionPageCover(
  pageId: string,
  imageUrl: string
): Promise<NotionUpdateResult> {
  try {
    // Verificar que tenemos las credenciales necesarias
    if (!process.env.NOTION_API_KEY) {
      return {
        success: false,
        error: 'NOTION_API_KEY no está configurada'
      }
    }

    // Actualizar la página en Notion
    const response = await notion.pages.update({
      page_id: pageId,
      properties: {
        Cover: {
          files: [
            {
              name: 'Cover Image',
              type: 'external',
              external: {
                url: imageUrl
              }
            }
          ]
        }
      }
    })

    return {
      success: true,
      page_id: response.id
    }
  } catch (error) {
    console.error('Error al actualizar página en Notion:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

/**
 * Función principal que combina la carga de imagen y actualización de Notion
 * @param pageId - ID de la página en Notion
 * @param imagePath - Ruta local de la imagen
 * @param uploadOptions - Opciones de carga para Cloudinary
 * @returns Promise<{upload: UploadResult, notion: NotionUpdateResult}>
 */
export async function uploadImageAndUpdateNotion(
  pageId: string,
  imagePath: string,
  uploadOptions: UploadOptions = {}
): Promise<{upload: UploadResult, notion: NotionUpdateResult}> {
  console.log(`🚀 Iniciando proceso para página ${pageId} con imagen ${imagePath}`)

  // Paso 1: Subir imagen a Cloudinary
  const uploadResult = await uploadImageToCloudinary(imagePath, uploadOptions)
  
  if (!uploadResult.success) {
    console.error('❌ Error al subir imagen:', uploadResult.error)
    return {
      upload: uploadResult,
      notion: {
        success: false,
        error: 'No se pudo subir la imagen'
      }
    }
  }

  console.log(`✅ Imagen subida exitosamente: ${uploadResult.url}`)

  // Paso 2: Actualizar página en Notion
  const notionResult = await updateNotionPageCover(pageId, uploadResult.url!)

  if (notionResult.success) {
    console.log(`✅ Página actualizada exitosamente: ${notionResult.page_id}`)
  } else {
    console.error('❌ Error al actualizar página:', notionResult.error)
  }

  return {
    upload: uploadResult,
    notion: notionResult
  }
}

/**
 * Función para procesar múltiples imágenes en lote
 * @param tasks - Array de tareas {pageId, imagePath, uploadOptions}
 * @returns Promise<Array de resultados>
 */
export async function batchUploadImages(
  tasks: Array<{
    pageId: string
    imagePath: string
    uploadOptions?: UploadOptions
  }>
): Promise<Array<{pageId: string, result: {upload: UploadResult, notion: NotionUpdateResult}}>> {
  const results = []

  for (const task of tasks) {
    console.log(`\n📦 Procesando lote: ${task.pageId}`)
    const result = await uploadImageAndUpdateNotion(
      task.pageId,
      task.imagePath,
      task.uploadOptions
    )
    
    results.push({
      pageId: task.pageId,
      result
    })

    // Pequeña pausa entre operaciones para evitar rate limits
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return results
}

/**
 * Función de utilidad para obtener información de una imagen en Cloudinary
 * @param publicId - ID público de la imagen en Cloudinary
 * @returns Promise con información de la imagen
 */
export async function getImageInfo(publicId: string) {
  try {
    const result = await cloudinary.api.resource(publicId)
    return {
      success: true,
      data: result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

/**
 * Función de utilidad para eliminar una imagen de Cloudinary
 * @param publicId - ID público de la imagen en Cloudinary
 * @returns Promise con resultado de la eliminación
 */
export async function deleteImageFromCloudinary(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return {
      success: true,
      data: result
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

/**
 * Función de utilidad para obtener todas las imágenes de una carpeta en Cloudinary
 * @param folder - Nombre de la carpeta
 * @returns Promise con lista de imágenes
 */
export async function getImagesFromFolder(folder: string) {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 100
    })
    return {
      success: true,
      data: result.resources
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
} 