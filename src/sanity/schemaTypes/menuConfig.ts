import { defineType, defineField } from 'sanity';
import menuItem from './menuItem';
import { Rule } from 'sanity';

export default defineType({
  name: 'menuConfig',
  title: 'Configuración de Menú',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Menú',
      type: 'string',
      initialValue: 'Menú Principal',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'menuItems',
      title: 'Items del Menú',
      type: 'array',
      of: [{ type: 'menuItem' }],
    }),
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}); 