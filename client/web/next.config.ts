import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: false
};

module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig;
