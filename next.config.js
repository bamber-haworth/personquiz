/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    let rules = [
      {
        source: `/:path*/`,
        destination: `https://personquiz.vercel.app/:path*/`,
      },
      {
        source: `/sheet`,
        destination: `https://personquiz.vercel.app/api/ggsheet`,
      },
    ];
    return rules;
  },
};

module.exports = nextConfig;
