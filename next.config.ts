import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
// No GitHub Pages padrão (ex: https://anacquesta.github.io/caroline-goncalves-3/), o basePath é o nome do repositório
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split("/")[1] : "caroline-goncalves-3";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
  ? process.env.NEXT_PUBLIC_BASE_PATH 
  : (isGithubActions ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

