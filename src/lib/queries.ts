// Queries para Artículos
export const articleFields = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  featured,
  readingTime,
  mainImage {
    url,
    alt,
    caption,
    width,
    height
  },
  author-> {
    _id,
    name,
    slug,
    image {
      asset->,
      alt
    }
  },
  categories[]-> {
    _id,
    title,
    slug,
    color
  },
  tags[]-> {
    _id,
    title,
    slug,
    color
  },
  seo {
    metaTitle,
    metaDescription,
    metaImage,
    keywords,
    canonicalUrl
  }
`

export const articleBodyFields = `
  body[] {
    ...,
    _type == 'image' => {
      ...,
      asset->,
      alt,
      caption
    },
    _type == 'cloudinaryImage' => {
      ...,
      url,
      alt,
      caption,
      width,
      height
    }
  }
`

// Query para obtener todos los artículos
export const allArticlesQuery = `
  *[_type == "article" && publishedAt <= now()] | order(publishedAt desc) {
    ${articleFields}
  }
`

// Query para obtener artículos con paginación
export const articlesQuery = `
  *[_type == "article" && publishedAt <= now()] | order(publishedAt desc) [0...$limit] {
    ${articleFields}
  }
`

// Query para obtener un artículo específico
export const articleQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    ${articleFields},
    ${articleBodyFields}
  }
`

// Query para obtener artículos destacados
export const featuredArticlesQuery = `
  *[_type == "article" && featured == true && publishedAt <= now()] | order(publishedAt desc) [0...$limit] {
    ${articleFields}
  }
`

// Query para obtener artículos por categoría
export const articlesByCategoryQuery = `
  *[_type == "article" && publishedAt <= now() && count(categories) > 0 && $category in categories[]->slug.current] | order(publishedAt desc) {
    ${articleFields}
  }
`

// Query de debugging para artículos por categoría
export const debugArticlesByCategoryQuery = `
  *[_type == "article" && publishedAt <= now()] {
    _id,
    title,
    "slug": slug.current,
    categories[]-> {
      _id,
      title,
      "slug": slug.current
    },
    "hasCategories": count(categories) > 0,
    "categorySlugs": categories[]->slug.current
  } | order(publishedAt desc)
`

// Query de debugging para categorías
export const debugCategoriesQuery = `
  *[_type == "category"] {
    _id,
    title,
    "slug": slug.current,
    "articleCount": count(*[_type == "article" && publishedAt <= now() && references(^._id)])
  } | order(title asc)
`

// Query para obtener artículos por autor
export const articlesByAuthorQuery = `
  *[_type == "article" && publishedAt <= now() && author->slug.current == $authorSlug] | order(publishedAt desc) {
    ${articleFields}
  }
`

// Query para obtener artículos relacionados
export const relatedArticlesQuery = `
  *[_type == "article" && publishedAt <= now() && _id != $currentId && (
    $category in categories[]->slug.current ||
    count(tags[]->slug.current[slug.current in $tags]) > 0
  )] | order(publishedAt desc) [0...$limit] {
    ${articleFields}
  }
`

// Query para búsqueda de artículos
export const searchArticlesQuery = `
  *[_type == "article" && publishedAt <= now() && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    body[0].children[0].text match $searchTerm + "*"
  )] | order(publishedAt desc) {
    ${articleFields}
  }
`

// Queries para Autores
export const authorFields = `
  _id,
  name,
  slug,
  image {
    url,
    alt
  },
  bio,
  email,
  website,
  social {
    twitter,
    linkedin,
    github
  }
`

export const allAuthorsQuery = `
  *[_type == "author"] | order(name asc) {
    ${authorFields}
  }
`

export const authorQuery = `
  *[_type == "author" && slug.current == $slug][0] {
    ${authorFields}
  }
`

// Queries para Categorías
export const categoryFields = `
  _id,
  title,
  slug,
  description,
  image {
    url,
    alt
  },
  color,
  seo {
    metaTitle,
    metaDescription
  }
`

export const allCategoriesQuery = `
  *[_type == "category"] | order(title asc) {
    ${categoryFields},
    "articleCount": count(*[_type == "article" && publishedAt <= now() && references(^._id)])
  }
`

export const categoryQuery = `
  *[_type == "category" && slug.current == $slug][0] {
    ${categoryFields}
  }
`

// Queries para Etiquetas
export const tagFields = `
  _id,
  title,
  slug,
  description,
  color
`

export const allTagsQuery = `
  *[_type == "tag"] | order(title asc) {
    ${tagFields},
    "articleCount": count(*[_type == "article" && publishedAt <= now() && references(^._id)])
  }
`

// Queries para Páginas
export const pageFields = `
  _id,
  title,
  slug,
  content[] {
    ...,
    _type == 'image' => {
      ...,
      asset->
    }
  },
  seo {
    metaTitle,
    metaDescription,
    metaImage {
      asset->
    }
  }
`

export const allPagesQuery = `
  *[_type == "page"] | order(title asc) {
    ${pageFields}
  }
`

export const pageQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    ${pageFields}
  }
`

// Query para Configuración del Sitio
export const siteConfigQuery = `
  *[_type == "siteConfig"][0] {
    title,
    description,
    logo {
      url,
      alt
    },
    favicon {
      asset->
    },
    url,
    social {
      twitter,
      facebook,
      instagram,
      linkedin,
      youtube
    },
    contact {
      email,
      phone,
      address
    },
    seo {
      defaultMetaTitle,
      defaultMetaDescription,
      defaultMetaImage {
        asset->
      },
      googleAnalyticsId,
      googleTagManagerId
    },
    features {
      enableComments,
      enableNewsletter,
      enableSearch,
      postsPerPage
    }
  }
`

// Query para sitemap
export const sitemapQuery = `
  {
    "articles": *[_type == "article" && publishedAt <= now()] {
      slug,
      publishedAt
    },
    "pages": *[_type == "page"] {
      slug
    },
    "categories": *[_type == "category"] {
      slug
    },
    "authors": *[_type == "author"] {
      slug
    }
  }
`

// Query para obtener slugs para generación estática
export const allSlugsQuery = `
  {
    "articles": *[_type == "article" && publishedAt <= now()] {
      slug
    },
    "pages": *[_type == "page"] {
      slug
    },
    "categories": *[_type == "category"] {
      slug
    },
    "authors": *[_type == "author"] {
      slug
    }
  }
`

// Sidebar dynamic queries
export const AI_TOOLS_QUERY = `
  *[_type == "aiTool" && isActive == true] | order(order asc) {
    _id,
    name,
    slug,
    category,
    price,
    discount,
    discountCode,
    affiliateUrl,
    description,
    "iconUrl": icon.asset->url,
    featured
  }
`;

export const POPULAR_POSTS_QUERY = `
  *[_type == "article" && publishedAt <= now()] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    readingTime,
    publishedAt
  }
`;

export const MENU_CONFIG_QUERY = `
  *[_type == "menuConfig"][0] {
    _id,
    title,
    menuItems[] {
      _type,
      _key,
      label,
      icon,
      url,
      isExternal,
      order,
      isActive,
      hasSubmenu,
      "subItems": select(
        hasSubmenu => subItems[] {
          _type,
          _key,
          label,
          icon,
          url,
          isExternal,
          order,
          isActive
        },
        null
      )
    }
  }
`; 