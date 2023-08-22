/** @type {import('next').NextConfig} */
const nextConfig = {
 // Add basePath
  basePath: '/playaround-2023',

  experimental: {
    images: {
      enabled: false,
    }
  }
}

module.exports = nextConfig
