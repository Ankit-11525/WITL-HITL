// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     images: {
//         remotePatterns: [
//             {
//               hostname: '*.googleusercontent.com',
//             },
//           ],
//           domains: ['res.cloudinary.com'],
//       },
      
// };

// export default nextConfig;

// const path = require('path');

// module.exports = {
//   experimental: {
//     appDir: true,
//   },
//   webpack: (config) => {
//     config.resolve.modules.push(path.resolve('./src'));
//     return config;
//   },
// };


// next.config.mjs

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
      const path = require('path');
      config.resolve.modules.push(path.resolve('./src'));
      return config;
  },
};

export default nextConfig;
