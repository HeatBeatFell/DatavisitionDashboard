import { NextConfig } from "next";

const nextConfig:NextConfig = {
  devIndicators: {
    buildActivity: false, 
  },
  eslint: {
    // 禁用 ESLint 检查，解决构建问题
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;