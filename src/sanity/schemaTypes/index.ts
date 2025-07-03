import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import author from './author'
import category from './category'
import code from './code'
import page from './page'
import siteConfig from './siteConfig'
import tag from './tag'
import aiTool from './aiTool'
import menuConfig from './menuConfig'
import menuItem from './menuItem'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, author, category, code, page, siteConfig, tag, aiTool, menuConfig, menuItem],
}
