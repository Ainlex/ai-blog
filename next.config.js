/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true, // Ya no es necesario en Next.js 14
  },
  images: {
    domains: ['images.unsplash.com', 'prod-files-secure.s3.us-west-2.amazonaws.com', 'via.placeholder.com', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY || 'default_key',
  },
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

module.exports = nextConfig 