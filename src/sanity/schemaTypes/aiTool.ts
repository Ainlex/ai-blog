import { defineType, defineField } from 'sanity';

const priceTypes = [
  { title: 'Gratis', value: 'free' },
  { title: 'Freemium', value: 'freemium' },
  { title: 'Premium', value: 'premium' },
  { title: 'Por uso', value: 'usage' },
  { title: 'Contactar', value: 'contact' }
];

const categories = [
  { title: 'Para Principiantes', value: 'principiantes' },
  { title: 'Para Profesionales', value: 'profesionales' },
  { title: 'Para Empresas', value: 'empresas' }
];

export default defineType({
  name: 'aiTool',
  title: 'Herramienta IA',
  type: 'document',
  groups: [
    { name: 'basic', title: 'Información Básica' },
    { name: 'details', title: 'Detalles' },
    { name: 'pricing', title: 'Precios y Afiliados' },
    { name: 'seo', title: 'SEO' },
    { name: 'features', title: 'Características' }
  ],
  fields: [
    // Información Básica
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'icon',
      title: 'Icono/Logo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: categories,
        layout: 'radio'
      },
      validation: Rule => Rule.required(),
      group: 'basic'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required().max(160),
      group: 'basic'
    }),
    defineField({
      name: 'description',
      title: 'Descripción Completa',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
      group: 'basic'
    }),

    // Detalles
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
      group: 'details'
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: Rule => Rule.min(1).max(5),
      initialValue: 4,
      group: 'details'
    }),
    defineField({
      name: 'usersCount',
      title: 'Número de Usuarios',
      type: 'string',
      group: 'details'
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      group: 'details'
    }),
    defineField({
      name: 'features',
      title: 'Características',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'features'
    }),

    // Precios y Afiliados
    defineField({
      name: 'priceType',
      title: 'Tipo de Precio',
      type: 'string',
      options: {
        list: priceTypes,
        layout: 'radio'
      },
      validation: Rule => Rule.required(),
      group: 'pricing'
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'string',
      group: 'pricing'
    }),
    defineField({
      name: 'affiliateUrl',
      title: 'URL de Afiliado',
      type: 'url',
      validation: Rule => Rule.required(),
      group: 'pricing'
    }),
    defineField({
      name: 'discount',
      title: 'Descuento',
      type: 'object',
      group: 'pricing',
      fields: [
        {
          name: 'code',
          title: 'Código',
          type: 'string'
        },
        {
          name: 'amount',
          title: 'Cantidad',
          type: 'string'
        },
        {
          name: 'expiresAt',
          title: 'Expira',
          type: 'datetime'
        }
      ]
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Título',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Descripción',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.max(160)
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'icon'
    },
    prepare({ title, subtitle, media }: { title: string; subtitle: string; media: any }) {
      const categoryLabels: { [key: string]: string } = {
        principiantes: '🎯 Para Principiantes',
        profesionales: '💼 Para Profesionales',
        empresas: '🏢 Para Empresas'
      };
      return {
        title,
        subtitle: categoryLabels[subtitle] || subtitle,
        media
      };
    }
  }
}); 