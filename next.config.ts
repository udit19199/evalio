import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ['192.168.1.33'],
};

export default nextConfig;
