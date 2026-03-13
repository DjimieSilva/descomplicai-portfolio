import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/projetos/bfitfam',
        destination: 'https://bfitfam-git-main-jdsdspt-1634s-projects.vercel.app/projetos/bfitfam',
      },
      {
        source: '/projetos/bfitfam/:path*',
        destination: 'https://bfitfam-git-main-jdsdspt-1634s-projects.vercel.app/projetos/bfitfam/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
