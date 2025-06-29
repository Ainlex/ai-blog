# Configuración de Notion para el Blog

## Estado Actual
La aplicación está configurada para consumir contenido real de Notion. Necesitas configurar las variables de entorno y crear la base de datos para que funcione correctamente.

## Configuración Requerida

### 1. Crear Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Configuración de Notion
NOTION_API_KEY=secret_your_integration_token_here
NOTION_DATABASE_ID=your_database_id_here

# Configuración de Next.js
CUSTOM_KEY=your_custom_key_here
```

### 2. Crear una Integración en Notion

1. Ve a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Haz clic en "New integration"
3. Dale un nombre como "AI Blog Integration"
4. Selecciona el workspace donde está tu base de datos
5. Haz clic en "Submit"
6. Copia el **Internal Integration Token** y reemplaza `secret_your_integration_token_here` en `.env.local`

### 3. Crear una Base de Datos en Notion

1. En tu workspace de Notion, crea una nueva página
2. Escribe `/database` y selecciona "Table - Full page"
3. Configura las siguientes propiedades:

#### Propiedades Requeridas:
- **Título** (Title) - Para el título del post
- **Slug** (Text) - Para la URL del post
- **Resumen** (Text) - Para el resumen del post
- **Tags** (Multi-select) - Para las etiquetas
- **Categoría** (Select) - Para la categoría
- **Estado** (Select) - Con opciones: "Borrador", "Listo"
- **Destacado** (Checkbox) - Para marcar posts destacados
- **Autor** (Text) - Para el nombre del autor
- **Fecha** (Date) - Para la fecha de publicación
- **Cover** (URL) - Para la imagen del post

### 4. Compartir la Base de Datos

1. En tu base de datos, haz clic en "Share" (arriba a la derecha)
2. Haz clic en "Invite"
3. Busca tu integración por nombre
4. Dale permisos de "Can edit"
5. Haz clic en "Invite"

### 5. Obtener el ID de la Base de Datos

1. Abre tu base de datos en Notion
2. En la URL, verás algo como:
   ```
   https://www.notion.so/workspace/21f58865-e7f3-80a3-a273-e860f5880594?v=...
   ```
3. El ID es la parte larga después del workspace: `21f58865-e7f3-80a3-a273-e860f5880594`
4. Reemplaza `your_database_id_here` en `.env.local` con este ID

### 6. Agregar Contenido de Prueba

1. En tu base de datos de Notion, crea algunos posts de prueba
2. Asegúrate de que tengan:
   - **Título**: Título del artículo
   - **Slug**: URL amigable (sin espacios, solo letras, números y guiones)
   - **Resumen**: Breve descripción del artículo
   - **Tags**: Al menos una etiqueta
   - **Categoría**: Categoría del artículo
   - **Estado**: "Listo" (para que aparezca publicado)
   - **Destacado**: Marcado (para que aparezca en la sección destacada)
   - **Autor**: Nombre del autor
   - **Fecha**: Fecha de publicación
   - **Cover**: URL de la imagen de portada

### 7. Verificar la Configuración

1. Reinicia el servidor de desarrollo: `npm run dev`
2. Ve a `http://localhost:3000`
3. Deberías ver los posts de Notion cargándose correctamente

## Estructura de Datos Esperada

```typescript
interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  category: string
  author: string
  readTime: number
  featured: boolean
  status: 'published' | 'draft'
}
```

## Troubleshooting

### Error: "Could not find database"
- Verifica que el ID de la base de datos sea correcto en `.env.local`
- Asegúrate de que la base de datos esté compartida con tu integración
- Verifica que la integración tenga permisos de edición

### Error: "API key invalid"
- Verifica que el `NOTION_API_KEY` sea correcto en `.env.local`
- Asegúrate de que la integración esté activa

### No se cargan los posts
- Verifica que los posts tengan estado "Listo"
- Asegúrate de que tengan todas las propiedades requeridas
- Revisa la consola del navegador para errores específicos

### Página en blanco o error
- Verifica que el archivo `.env.local` esté en la raíz del proyecto
- Reinicia el servidor después de crear/modificar `.env.local`
- Verifica que las variables de entorno estén cargadas correctamente

## Archivos Importantes

- `src/components/featured-posts.tsx` - Componente que consume Notion
- `src/lib/notion.ts` - Funciones para conectar con Notion
- `.env.local` - Variables de entorno (crear este archivo)
- `CONFIGURACION_NOTION.md` - Este archivo con instrucciones 