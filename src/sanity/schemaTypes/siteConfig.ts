import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Sitio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción del Sitio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'object',
      description: 'Opcional - Deja vacío si no quieres mostrar un logo',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'URL de Cloudinary',
          description: 'URL completa del logo en Cloudinary (opcional)',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https'],
            allowRelative: false,
          }).optional(),
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          description: 'Descripción del logo para accesibilidad (opcional)',
        },
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'url',
      title: 'URL del Sitio',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'social',
      title: 'Redes Sociales',
      type: 'object',
      fields: [
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Información de Contacto',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email',
        },
        {
          name: 'phone',
          title: 'Teléfono',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Dirección',
          type: 'text',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Global',
      type: 'object',
      fields: [
        defineField({
          name: 'defaultMetaTitle',
          title: 'Meta Título por Defecto',
          type: 'string',
        }),
        defineField({
          name: 'defaultMetaDescription',
          title: 'Meta Descripción por Defecto',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'defaultMetaImage',
          title: 'Meta Imagen por Defecto',
          type: 'image',
        }),
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        }),
        defineField({
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Características del Sitio',
      type: 'object',
      fields: [
        {
          name: 'enableComments',
          title: 'Habilitar Comentarios',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'enableNewsletter',
          title: 'Habilitar Newsletter',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'enableSearch',
          title: 'Habilitar Búsqueda',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'postsPerPage',
          title: 'Artículos por Página',
          type: 'number',
          initialValue: 10,
          validation: (Rule) => Rule.min(1).max(50),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
}) 