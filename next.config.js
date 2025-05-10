/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'restaurant-api.dicoding.dev'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig; 