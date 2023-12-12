/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
