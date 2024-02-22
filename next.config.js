/** @type {import('next').NextConfig} */
const nextConfig = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000",
      },
    ];
  };
  const redirects = () => {
    return [
      {
        source: '/dev-tools',
        destination: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' ? '/' : '/dev-tools',
        permanent: true,
      }
    ]
  }
  return {
    rewrites,
  };
}

module.exports = nextConfig
