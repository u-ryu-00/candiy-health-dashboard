/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  rewrites: async () => [
    {
      source: '/api/candiy/:path*',
      destination: `${process.env.NEXT_PUBLIC_CANDIY_API_BASE_URL}/:path*`,
    },
  ],
};

module.exports = nextConfig;
