/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig;
