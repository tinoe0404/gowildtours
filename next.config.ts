import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    minimumCacheTTL: 60,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [

      {
        protocol: "https",
        hostname: "lqs3lhbphnaz4s0e.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/hotels",
        destination: "/destinations",
        permanent: true,
      },
      {
        source: "/activities",
        destination: "/destinations",
        permanent: true,
      },
      {
        source: "/packages",
        destination: "/safaris",
        permanent: true,
      },
      {
        source: "/packages/:slug",
        destination: "/safaris/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
