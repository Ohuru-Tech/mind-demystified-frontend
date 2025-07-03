import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get("url");

  if (!videoUrl) {
    return new Response("Missing video URL", { status: 400 });
  }

  try {
    const videoResponse = await fetch(videoUrl, {
      headers: {
        // Forward range requests for video streaming
        ...(request.headers.get("range") && {
          range: request.headers.get("range")!,
        }),
      },
    });

    if (!videoResponse.ok) {
      return new Response("Failed to fetch video", {
        status: videoResponse.status,
      });
    }

    const headers = new Headers();

    // Set CORS headers
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Range, Content-Range");

    // Forward video-specific headers
    headers.set(
      "Content-Type",
      videoResponse.headers.get("Content-Type") || "video/mp4"
    );

    const contentLength = videoResponse.headers.get("Content-Length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    const contentRange = videoResponse.headers.get("Content-Range");
    if (contentRange) {
      headers.set("Content-Range", contentRange);
    }

    // Support range requests for video streaming
    headers.set("Accept-Ranges", "bytes");

    // Cache headers for better performance
    headers.set("Cache-Control", "public, max-age=3600");

    return new Response(videoResponse.body, {
      headers,
      status: videoResponse.status,
    });
  } catch (error) {
    console.error("Video proxy error:", error);
    return new Response("Error proxying video", { status: 500 });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Range, Content-Range",
    },
  });
}
