import { defineType, defineField } from 'sanity';

const menuIcons = {
  '🏠': 'Inicio',
  '📚': 'Guías',
  '🔥': 'Popular',
  '🛠️': 'Herramientas',
  '🎯': 'Principiantes',
  '💼': 'Profesionales',
  '🏢': 'Empresas',
  '📧': 'Newsletter',
  '💡': 'Ideas',
  '📝': 'Blog',
  '🔍': 'Buscar',
  '📂': 'Categorías',
  '❤️': 'Favoritos',
  '⭐': 'Destacado',
  '🎨': 'Diseño',
  '💻': 'Desarrollo',
  '📱': 'Apps',
  '🤖': 'IA',
  '📊': 'Datos',
  '🔒': 'Seguridad'
};

export default defineType({
  name: 'menuItem',
  title: 'Item de Menú',
  type: 'object',
  fields: [
    defineField({ 
      name: 'label', 
      title: 'Etiqueta', 
      type: 'string', 
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'icon', 
      title: 'Icono', 
      type: 'string',
      options: {
        list: Object.entries(menuIcons).map(([icon, label]) => ({
          title: `${icon} ${label}`,
          value: icon
        }))
      },
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'hasSubmenu', 
      title: '¿Tiene submenú?', 
      type: 'boolean', 
      initialValue: false,
      description: 'Activa esta opción si es un ítem padre con submenú (como Herramientas IA)' 
    }),
    defineField({ 
      name: 'subItems', 
      title: 'Subitems del Menú',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'subMenuItem',
          title: 'Sub Item de Menú',
          fields: [
            { name: 'label', type: 'string', title: 'Etiqueta', validation: Rule => Rule.required() },
            { 
              name: 'icon', 
              type: 'string', 
              title: 'Icono',
              options: {
                list: Object.entries(menuIcons).map(([icon, label]) => ({
                  title: `${icon} ${label}`,
                  value: icon
                }))
              },
              validation: Rule => Rule.required()
            },
            { name: 'url', type: 'string', title: 'URL', validation: Rule => Rule.required() },
            { name: 'isExternal', type: 'boolean', title: '¿Es enlace externo?', initialValue: false },
            { name: 'order', type: 'number', title: 'Orden', initialValue: 0, validation: Rule => Rule.required() },
            { name: 'isActive', type: 'boolean', title: 'Activo', initialValue: true }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'url',
              icon: 'icon'
            },
            prepare({ title, subtitle, icon }) {
              return {
                title: `${icon} ${title}`,
                subtitle
              }
            }
          }
        }
      ],
      hidden: ({ parent }) => !parent?.hasSubmenu,
      validation: Rule => Rule.custom((subItems, context) => {
        // @ts-ignore - context.parent existe pero TypeScript no lo reconoce
        if (context.parent?.hasSubmenu && (!subItems || subItems.length === 0)) {
          return 'Los items con submenú deben tener al menos un subitem';
        }
        return true;
      })
    }),
    defineField({ 
      name: 'url', 
      title: 'URL', 
      type: 'string', 
      description: 'Deja vacío si es un ítem con submenú', 
      hidden: ({ parent }) => parent?.hasSubmenu,
      validation: Rule => Rule.custom((url, context) => {
        // @ts-ignore - context.parent existe pero TypeScript no lo reconoce
        if (context.parent?.hasSubmenu) return true;
        if (!url) return 'La URL es requerida para ítems sin submenú';
        return true;
      })
    }),
    defineField({ 
      name: 'isExternal', 
      title: '¿Es enlace externo?', 
      type: 'boolean', 
      initialValue: false,
      hidden: ({ parent }) => parent?.hasSubmenu
    }),
    defineField({ 
      name: 'order', 
      title: 'Orden', 
      type: 'number', 
      initialValue: 0,
      validation: Rule => Rule.required() 
    }),
    defineField({ 
      name: 'isActive', 
      title: 'Activo', 
      type: 'boolean', 
      initialValue: true 
    }),
  ],
  preview: {
    select: {
      label: 'label',
      icon: 'icon',
      url: 'url',
      hasSubmenu: 'hasSubmenu',
      subItemsCount: 'subItems.length'
    },
    prepare({ label, icon, url, hasSubmenu, subItemsCount = 0 }) {
      return {
        title: `${icon} ${label}`,
        subtitle: hasSubmenu ? `Submenú (${subItemsCount} items)` : url
      }
    }
  }
}); 