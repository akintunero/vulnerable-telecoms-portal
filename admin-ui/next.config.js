/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://flask:5000/api/:path*',
      },
    ];
  },
  server: {
    port: 3001,
  },
};

module.exports = nextConfig; 