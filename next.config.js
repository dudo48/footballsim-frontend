/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backendUrl: 'http://localhost:5000',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/teams',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
