export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  category: string
  author: string
  readTime: number
  featured: boolean
  status: 'published' | 'draft'
}

export interface SearchParams {
  query?: string
  category?: string
  tag?: string
  page?: number
  limit?: number
}

export interface NewsletterData {
  email: string
  name?: string
  source?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  postCount: number
}

export interface AdSenseConfig {
  clientId: string
  slot: string
  format: 'auto' | 'fluid' | 'rectangle'
  responsive?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
    linkedin: string
  }
} 