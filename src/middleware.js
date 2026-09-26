import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Admin-only route protection (both /admin and /dashboard are artisan admin pages)
    if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
      if (token?.role !== "admin") {
        const url = new URL("/", req.url);
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/collection") ||
          pathname.startsWith("/product") ||
          pathname.startsWith("/about-us") ||
          pathname.startsWith("/contact") ||
          pathname.startsWith("/care-guide") ||
          pathname.startsWith("/legal") ||
          pathname.startsWith("/cart") ||
          pathname.startsWith("/wishlist") ||
          pathname.startsWith("/reviews") ||
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname.startsWith("/forgot-password") ||
          pathname.startsWith("/reset-password")
        ) {
          return true;
        }

        // Protected routes (admin, dashboard, profile, etc.)
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
