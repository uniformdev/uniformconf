/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    projectId: process.env.UNIFORM_PROJECT_ID,
    projectMapId: process.env.UNIFORM_PROJECT_MAP_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || "https://uniform.app",
    previewSecret: process.env.UNIFORM_PREVIEW_SECRET || 'uniformconf',
  },
  publicRuntimeConfig: {
    gaTrackingId: process.env.GA4_ID,
    edgeEnabled: false,
  },
};

module.exports = nextConfig;
