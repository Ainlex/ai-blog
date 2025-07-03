import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Artículo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'object',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'URL de Cloudinary',
          description: 'URL completa de la imagen en Cloudinary (ej: https://res.cloudinary.com/tu-cloud/image/upload/v1234567890/folder/image.jpg)',
          validation: (Rule) => Rule.required().uri({
            scheme: ['http', 'https'],
            allowRelative: false,
          }),
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Pie de foto',
        },
        {
          name: 'width',
          type: 'number',
          title: 'Ancho (px)',
          description: 'Ancho de la imagen en píxeles',
        },
        {
          name: 'height',
          type: 'number',
          title: 'Alto (px)',
          description: 'Alto de la imagen en píxeles',
        },
      ],
      preview: {
        select: {
          title: 'alt',
          subtitle: 'caption',
          media: 'url',
        },
        prepare({title, subtitle, media}) {
          return {
            title: title || 'Sin texto alternativo',
            subtitle: subtitle || 'Sin pie de foto',
          }
        },
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'object',
          name: 'cloudinaryImage',
          title: 'Imagen de Cloudinary',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'URL de Cloudinary',
              description: 'URL completa de la imagen en Cloudinary',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https'],
                allowRelative: false,
              }),
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Pie de foto',
            },
            {
              name: 'width',
              type: 'number',
              title: 'Ancho (px)',
              description: 'Ancho de la imagen en píxeles',
            },
            {
              name: 'height',
              type: 'number',
              title: 'Alto (px)',
              description: 'Alto de la imagen en píxeles',
            },
          ],
          preview: {
            select: {
              title: 'alt',
              subtitle: 'caption',
              media: 'url',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Sin texto alternativo',
                subtitle: subtitle || 'Sin pie de foto',
              }
            },
          },
        },
        {
          type: 'code',
          options: {
            withFilename: true,
          },
        },
      ],
    }),
    // SEO Fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Título',
          type: 'string',
          description: 'Título para motores de búsqueda (máximo 60 caracteres)',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Descripción',
          type: 'text',
          rows: 3,
          description: 'Descripción para motores de búsqueda (máximo 160 caracteres)',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'metaImage',
          title: 'Meta Imagen',
          type: 'url',
          description: 'URL de la imagen para redes sociales (1200x630px recomendado)',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https'],
            allowRelative: false,
          }),
        }),
        defineField({
          name: 'keywords',
          title: 'Palabras Clave',
          type: 'array',
          of: [{type: 'string'}],
          description: 'Palabras clave separadas por comas',
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'URL Canónica',
          type: 'url',
          description: 'URL canónica del artículo',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Artículo Destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'readingTime',
      title: 'Tiempo de Lectura (minutos)',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `por ${author}`}
    },
  },
  orderings: [
    {
      title: 'Fecha de Publicación, Nueva',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Fecha de Publicación, Antigua',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],
}) 