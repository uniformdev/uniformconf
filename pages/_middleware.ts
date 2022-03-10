import { NextRequest } from "next/server";
import { createEdgeContext } from "@uniformdev/context-edge";
import { createUniformEdgeMiddleware } from "@uniformdev/context-edge-vercel";
import manifest from "../lib/context/manifest.json";

export default async function middleware(request: NextRequest) {
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

  console.log("url: " + process.env.VERCEL_URL);

  // @ts-ignore
  const context = createEdgeContext({ manifest, request });

  const middleware = createUniformEdgeMiddleware();

  const response = middleware({
    context,
    origin: new URL(`https://${process.env.VERCEL_URL}`),
    request,
  });

  return response;
}
