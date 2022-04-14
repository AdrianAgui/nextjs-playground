/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'fontmeme.com', 'media.giphy.com']
  }
};

module.exports = nextConfig;
