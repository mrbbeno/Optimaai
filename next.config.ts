import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/llms.txt",
        has: [
          {
            type: "host",
            value: "cue.optimaai.eu",
          },
        ],
        destination: "/llms-cue.txt",
      },
      {
        source: "/llms-full.txt",
        has: [
          {
            type: "host",
            value: "cue.optimaai.eu",
          },
        ],
        destination: "/llms-cue-full.txt",
      },
      {
        source: "/llms.txt",
        destination: "/llms-optimaai.txt",
      },
      {
        source: "/llms-full.txt",
        destination: "/llms-optimaai-full.txt",
      },
    ];
  },
};

export default nextConfig;
