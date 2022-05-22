/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'fontmeme.com', 'media.giphy.com']
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en'
  }
};

module.exports = nextConfig;
