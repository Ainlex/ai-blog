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

export interface NotionPage {
  id: string
  properties: {
    Title: {
      title: Array<{
        plain_text: string
      }>
    }
    Slug: {
      rich_text: Array<{
        plain_text: string
      }>
    }
    Excerpt: {
      rich_text: Array<{
        plain_text: string
      }>
    }
    Tags: {
      multi_select: Array<{
        name: string
      }>
    }
    Category: {
      select: {
        name: string
      }
    }
    Status: {
      select: {
        name: string
      }
    }
    Featured: {
      checkbox: boolean
    }
    Author: {
      rich_text: Array<{
        plain_text: string
      }>
    }
    PublishedAt: {
      date: {
        start: string
      }
    }
    UpdatedAt: {
      last_edited_time: string
    }
    CoverImage: {
      url: string
    }
  }
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

export interface NotionSiteConfig {
  siteName: string
  siteDescription: string
  siteUrl: string
  logoUrl: string | null
  logoAlt: string
  faviconUrl: string | null
  ogImage: string | null
  twitterHandle: string | null
  githubUrl: string | null
  linkedinUrl: string | null
} 