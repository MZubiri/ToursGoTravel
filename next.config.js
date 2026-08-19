/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['mysql2'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
