import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "dummyimage.com",
      },
      {
        hostname: "www.gstatic.com",
      },
      {
        hostname: "10.0.0.203",
      },
      {
        hostname: "184.174.32.195",
      },
      {
        hostname: "plus.unsplash.com",
      },
      {
        hostname: "keystoneability.com",
      },
    ],
  },
};

export default nextConfig;
