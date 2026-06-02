import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.182", "localhost", "127.0.0.1"],
  images: {
    formats: ["image/webp"],
    qualities: [90],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
