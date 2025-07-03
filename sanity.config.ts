'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import {theme} from './src/sanity/theme'

export default defineConfig({
  name: 'default',
  title: 'PromptLab Studio',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  theme,
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode: (S) => S.document().views([])
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  // Optimizaciones para mejor rendimiento
  api: {
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Deshabilitar CDN en desarrollo para mejor rendimiento
  },
  document: {
    // Deshabilitar las acciones de publicación/borrador por defecto
    actions: (prev) => prev.filter((action) => !['unpublish', 'discardChanges'].includes(action.action)),
    productionUrl: async (prev, context) => {
      const { document } = context;
      if (!document._id) return prev;

      const slug = document.slug?.current;
      if (!slug) return prev;

      const type = document._type;
      switch (type) {
        case 'article':
          return `${process.env.NEXT_PUBLIC_URL}/blog/${slug}`;
        case 'category':
          return `${process.env.NEXT_PUBLIC_URL}/categorias/${slug}`;
        case 'aiTool':
          return `${process.env.NEXT_PUBLIC_URL}/herramientas/${document.category}`;
        default:
          return prev;
      }
    },
  },
  form: {
    // Configuración del formulario para evitar problemas de transición
    components: {
      input: (props) => {
        const {disableTransition, ...rest} = props;
        return props.renderDefault({...rest});
      },
    },
  },
  studio: {
    components: {
      root: (props: any) => {
        const {disableTransition, ...rest} = props;
        return props.renderDefault(rest);
      }
    },
  }
})
