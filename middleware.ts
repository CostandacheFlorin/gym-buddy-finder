import { NextRequest, NextResponse } from "next/server";

// Define the public routes that should be accessible without authentication
const PUBLIC_ROUTES = ["/login", "/register", "/", "/about", "/contact"];

export function middleware(request: NextRequest) {
  // Get the current request URL path
  const pathname = new URL(request.url).pathname;

  console.log(pathname);

  // Allow access to public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for the authToken cookie
  const authToken = request.cookies.get("authToken");

  // Redirect to login if authToken is not present and the route is not public
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Proceed to the requested resource
  return NextResponse.next();
}

// Configure the middleware to match specific paths
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
