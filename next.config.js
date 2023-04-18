/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["hyperano.iran.liara.run"],
    deviceSizes: [450, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hyperano.ir',
        pathname: '/api/uploads/images/**',
      },
    ],
  },
}

module.exports = nextConfig
