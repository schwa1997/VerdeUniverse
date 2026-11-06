import type { NextConfig } from "next";

// Plain static files in out/, so it can live on any host
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};

export default nextConfig;
