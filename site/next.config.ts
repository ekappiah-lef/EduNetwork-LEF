import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the floating Next.js "N" badge shown during local development.
  devIndicators: false,
  // The home page is the single-page design in public/home.html.
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/home.html" }], afterFiles: [], fallback: [] };
  },
};

export default nextConfig;
