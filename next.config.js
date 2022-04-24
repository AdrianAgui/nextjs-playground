/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['raw.githubusercontent.com', 'fontmeme.com', 'media.giphy.com']
  }
};

module.exports = nextConfig;
