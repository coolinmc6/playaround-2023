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
    const allRedirects = [];

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
      allRedirects.push({
        source: '/dev-tools',
        destination: '/',
        permanent: true,
      });
    }
    return allRedirects;
  }
  return {
    rewrites,
    redirects,
  };
}

module.exports = nextConfig
