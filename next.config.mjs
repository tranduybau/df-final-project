/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGES_DOMAINS.split(","),
  }
}

export default nextConfig
