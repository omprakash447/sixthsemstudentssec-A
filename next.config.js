/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true }, // Keep if you need it for static image optimization
};

module.exports = nextConfig;
