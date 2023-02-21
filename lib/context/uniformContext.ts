import {
  Context,
  ManifestV2,
  enableContextDevTools,
  ContextPlugin,
  enableDebugConsoleLogDrain,
} from "@uniformdev/context";
import { NextCookieTransitionDataStore } from "@uniformdev/context-next";
import { NextPageContext } from "next";
import manifest from "./manifest.json";
import { enableGoogleGtagAnalytics } from "@uniformdev/context-gtag";

export function createUniformContext(serverContext?: NextPageContext) {
  const plugins: ContextPlugin[] = [
    // Adds support for additional logs and Google Chrome extension
    // @see https://docs.uniform.app/guides/tools/context-devtools
    enableContextDevTools(),
    // logs all Uniform Context activity into browser console
    enableDebugConsoleLogDrain("debug"),
  ];

  // If you have GA tracking ID in your .env file - send events to dataLayer
  // @see https://docs.uniform.app/integrations/data/google-analytics
  if (process.env.NEXT_PUBLIC_GA4_ID) {
    plugins.push(enableGoogleGtagAnalytics({ emitAll: true }));
  }

  const context = new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    // transition store controls how user's current score transports between
    // client side and server side (or Edge)
    // @see https://docs.uniform.app/guides/personalization/activation#edge-side
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins: plugins,
  });

  return context;
}
