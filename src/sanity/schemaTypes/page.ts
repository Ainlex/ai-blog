import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Página',
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
      name: 'content',
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
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Título',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Descripción',
          type: 'text',
          rows: 3,
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
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title,
        subtitle: slug ? `/${slug}` : 'Sin slug',
      }
    },
  },
}) 