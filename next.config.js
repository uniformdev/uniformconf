/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  serverRuntimeConfig: {
    uniformApiKey: process.env.UNIFORM_API_KEY,
    canvasApiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
    projectId: process.env.UNIFORM_PROJECT_ID,
  },
  publicRuntimeConfig: {
    gaTrackingId: process.env.GA_UA_ID,
    edgeEnabled: false,
  },
};

module.exports = nextConfig;
