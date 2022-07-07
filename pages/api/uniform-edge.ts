import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { createEdgeContext } from "@uniformdev/context-edge";
import { createUniformEdgeMiddleware } from "@uniformdev/context-edge-vercel";
import type { ManifestV2 } from "@uniformdev/context/*";

import manifest from "../../lib/context/manifest.json";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(request: NextRequest, event: NextFetchEvent) {
  if (process.env.NODE_ENV === "development") {
    console.log("Middleware disabled in development");
    return;
  }

  if (!process.env.VERCEL_URL) {
    console.error("VERCEL_URL environment is not defined");
    return new Response("Configuration Error", {
      status: 500,
    });
  }

  const uniformUrl = request.nextUrl.searchParams.get("uniform_url");
  if (!uniformUrl) {
    return new Response("uniform_url is not defined", {
      status: 500,
    });
  }
  

  const url = new URL(uniformUrl);
  //prevent looping
  url.searchParams.set('uniform_handler', '1');

  console.log("[handler] event.sourcePage", event.sourcePage);
  console.log("[handler] request.nextUrl", request.nextUrl);

  const assetRequest = new NextRequest(new Request(url.toString(), request), request);
  console.log("[handler] assetRequest.nextUrl", assetRequest.nextUrl);

  const context = createEdgeContext({
    manifest: manifest as ManifestV2,
    request: assetRequest,
  });

  const middleware = createUniformEdgeMiddleware();

  const response = await middleware({
    context,
    origin: new URL(`https://${process.env.VERCEL_URL}`),
    request: assetRequest,
  });

  return new Response(response.body, {
    ...response,
    headers: {
      ...response.headers,
      "Cache-Control": "no-store, must-revalidate",
      Expires: "0",
    },
  });
}
