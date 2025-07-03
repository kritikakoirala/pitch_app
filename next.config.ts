import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // module.exports = {
  //   images: {
  //     domains: ['localhost'],
  //   },
  // }

  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: "*"
    }]
  },

};

export default nextConfig;
