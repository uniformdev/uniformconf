import { SitemapClient } from '@uniformdev/sitemap';
import getConfig from "next/config";

const {
  serverRuntimeConfig: {
    apiKey,
    apiHost,
  },
} = getConfig();

export const sitemapClient = new SitemapClient({
  apiKey,
  apiHost,
});
