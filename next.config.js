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
  return {
    rewrites,
  };
}

module.exports = nextConfig
