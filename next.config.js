/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // xmtp documentation config
      // Fixes npm packages that depend on `fs` module
      config.resolve.fallback.fs = false
    }
    return config
  }
}

module.exports = nextConfig
