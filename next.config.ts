import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  eslint: {
    ignoreDuringBuilds: true, // 👈 skip ESLint errors during `next build`
  },


  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: "*"
    }]
  },


};

export default nextConfig;
