# Configuración de Logos en Notion

Este documento explica cómo configurar los logos y elementos visuales del blog desde Notion.

## Estructura de la Base de Datos de Configuración

Crea una base de datos en Notion llamada "Configuración del Sitio" con las siguientes propiedades:

### Propiedades Requeridas:

1. **Tipo** (Select)
   - Valor: "Configuración"
   - Descripción: Para identificar la fila de configuración

2. **NombreSitio** (Title)
   - Descripción: Nombre del blog
   - Ejemplo: "AI Blog MVP"

3. **Descripcion** (Text)
   - Descripción: Descripción del blog
   - Ejemplo: "Blog sobre Inteligencia Artificial"

4. **URLSitio** (URL)
   - Descripción: URL principal del sitio
   - Ejemplo: "https://tu-dominio.com"

### Propiedades de Logos e Imágenes:

5. **Logo** (Files & Media)
   - Descripción: Logo principal del blog
   - Formato recomendado: PNG o SVG
   - Tamaño recomendado: 200x200px mínimo

6. **LogoAlt** (Text)
   - Descripción: Texto alternativo del logo
   - Ejemplo: "Logo de AI Blog MVP"

7. **Favicon** (Files & Media)
   - Descripción: Favicon del sitio
   - Formato recomendado: ICO, PNG
   - Tamaño recomendado: 32x32px

8. **ImagenOG** (Files & Media)
   - Descripción: Imagen para Open Graph
   - Formato recomendado: PNG o JPG
   - Tamaño recomendado: 1200x630px

### Propiedades de Redes Sociales (Opcionales):

9. **Twitter** (URL)
   - Descripción: URL del perfil de Twitter

10. **GitHub** (URL)
    - Descripción: URL del perfil de GitHub

11. **LinkedIn** (URL)
    - Descripción: URL del perfil de LinkedIn

## Variables de Entorno

Agrega estas variables a tu archivo `.env.local`:

```env
NOTION_CONFIG_DATABASE_ID=tu_config_database_id_aqui
```

## Cómo Obtener el Database ID

1. Abre tu base de datos de configuración en Notion
2. Copia la URL
3. El ID está en la URL: `https://notion.so/workspace/[DATABASE_ID]?v=...`

## Subir Imágenes

### Opción 1: Subir directamente a Notion
- Arrastra las imágenes a los campos correspondientes
- Notion las alojará automáticamente

### Opción 2: Usar Cloudinary (Recomendado)
1. Sube tu imagen a Cloudinary
2. Copia la URL pública
3. Pega la URL en el campo correspondiente en Notion

## Fallbacks

Si no se encuentra configuración en Notion, el sistema usará:
- Logo: Un icono con "AI" en gradiente azul-púrpura
- Nombre: "AI Blog MVP"
- Descripción: "Blog sobre Inteligencia Artificial"

## Componentes que Usan los Logos

- `Logo`: Componente principal del logo (navbar y footer)
- `DynamicFavicon`: Maneja el favicon dinámico
- `getSiteConfig()`: Función para obtener toda la configuración

## Troubleshooting

### El logo no aparece
1. Verifica que la propiedad "Logo" tenga una imagen
2. Revisa la consola del navegador para errores
3. Asegúrate de que la imagen sea accesible públicamente

### El favicon no se actualiza
1. Limpia la caché del navegador
2. Verifica que la propiedad "Favicon" tenga una imagen
3. Revisa que la URL sea válida

### Error de configuración
1. Verifica que `NOTION_CONFIG_DATABASE_ID` esté configurado
2. Asegúrate de que exista una fila con "Tipo" = "Configuración"
3. Revisa los logs del servidor para más detalles 