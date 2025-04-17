import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "dummyimage.com",
      },
      {
        hostname: "10.0.0.203",
      },
    ],
  },
};

export default nextConfig;
