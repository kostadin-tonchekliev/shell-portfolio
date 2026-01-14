import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduce bundle size by not including source maps in production
  productionBrowserSourceMaps: false,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
