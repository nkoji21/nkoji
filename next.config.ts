import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [{ source: "/works", destination: "/activity", permanent: true }];
  },
};

export default nextConfig;
