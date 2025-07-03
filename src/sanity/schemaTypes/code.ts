import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'code',
  title: 'Código',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Código',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Lenguaje',
      type: 'string',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'Python', value: 'python'},
          {title: 'Java', value: 'java'},
          {title: 'C++', value: 'cpp'},
          {title: 'C#', value: 'csharp'},
          {title: 'PHP', value: 'php'},
          {title: 'Ruby', value: 'ruby'},
          {title: 'Go', value: 'go'},
          {title: 'Rust', value: 'rust'},
          {title: 'Swift', value: 'swift'},
          {title: 'Kotlin', value: 'kotlin'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'SCSS', value: 'scss'},
          {title: 'JSON', value: 'json'},
          {title: 'YAML', value: 'yaml'},
          {title: 'Markdown', value: 'markdown'},
          {title: 'SQL', value: 'sql'},
          {title: 'Bash', value: 'bash'},
          {title: 'Shell', value: 'shell'},
          {title: 'Docker', value: 'docker'},
          {title: 'Git', value: 'git'},
          {title: 'Plain Text', value: 'text'},
        ],
      },
      initialValue: 'javascript',
    }),
    defineField({
      name: 'filename',
      title: 'Nombre del archivo',
      type: 'string',
      description: 'Opcional: nombre del archivo para mostrar',
    }),
    defineField({
      name: 'highlightedLines',
      title: 'Líneas resaltadas',
      type: 'array',
      of: [{type: 'number'}],
      description: 'Números de línea para resaltar (ej: [1, 3, 5])',
    }),
  ],
  preview: {
    select: {
      title: 'filename',
      language: 'language',
      code: 'code',
    },
    prepare({title, language, code}) {
      const preview = code ? code.slice(0, 50) + (code.length > 50 ? '...' : '') : 'Sin código'
      return {
        title: title || `Código ${language}`,
        subtitle: preview,
      }
    },
  },
}) 