import { NextResponse, NextRequest } from "next/server";

// const IGNORED_PATHS = /^\/.*\.(ico|png|jpg|jpeg|svg)$/g;
const IGNORED_PATHS =
  /\/.*\.(ico|icon|png|jpg|jpeg|svg|css|js|json)(?:\?.*|$)$/g;

const UNIFORM_EDGE_HANDLER = "/api/uniform-edge";

export default async function middleware(request: NextRequest) {
  if (
    request.method.toUpperCase() !== "GET" ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.match(IGNORED_PATHS) ||
    //prevent looping
    request.nextUrl.searchParams.get('uniform_handler') === '1'
  ) {
    return NextResponse.next();
  }

  const uniformUrl = request.nextUrl.toString();

  console.log("[middleware] request.nextUrl", request.nextUrl);

  request.nextUrl.pathname = UNIFORM_EDGE_HANDLER;
  request.nextUrl.searchParams.set('uniform_url', uniformUrl);

  console.log("[middleware] rewritten url", request.nextUrl);

  return NextResponse.rewrite(request.nextUrl);
}
