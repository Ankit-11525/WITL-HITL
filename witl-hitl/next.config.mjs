import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
      },
    ],
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./src'));
    return config;
  },
};

export default nextConfig;

// next.config.mjs

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//       remotePatterns: [
//           {
//             hostname: '*.googleusercontent.com',
//           },
//       ],
//       domains: ['res.cloudinary.com'],
//   },
//   experimental: {
//       appDir: true,
//   },
//   webpack: (config) => {
//       const path = require('path');
//       config.resolve.modules.push(path.resolve('./src'));
//       return config;
//   },
// };

// export default nextConfig;
