import { NextRequest, NextResponse } from "next/server";
import { createSession, getSession } from "./app/lib/session";

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.redirect(
      new URL(
        `/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.url
      )
    );
  }

  if (session && session.access) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts/verify-token/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access}`,
        },
      }
    );

    if (response.status !== 200) {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/accounts/refresh-token/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: session.refresh }),
        }
      );

      if (refreshResponse.status === 200) {
        const refreshResponseData = await refreshResponse.json();
        await createSession(
          refreshResponseData.access,
          refreshResponseData.refresh
        );
        return NextResponse.next();
      }

      return NextResponse.redirect(
        new URL(
          `/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`,
          request.url
        )
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match protected routes:
     * - (course) - course-related pages
     * - (dashboard) - dashboard pages
     * - sessions - session pages
     * - free-call - free call booking pages
     * Exclude static files and API routes
     */
    "/course/:path*",
    "/learning/:path*",
    "/explore/:path*",
    "/sessions/:path*",
    "/community/:path*",
    "/checkout/:path*",
    "/free-call/:path*",
  ],
};
