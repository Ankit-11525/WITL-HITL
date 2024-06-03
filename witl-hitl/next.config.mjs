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
      
};

export default nextConfig;