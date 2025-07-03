import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "minddemystified.blob.core.windows.net",
      },
    ],
  },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
