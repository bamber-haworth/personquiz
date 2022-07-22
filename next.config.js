/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    let rules = [
      {
        source: "/api/:path*",
        destination: "https://personquiz.vercel.app/:path*",
      },
    ];
    return rules;
  },
};

module.exports = nextConfig;
