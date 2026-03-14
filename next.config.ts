import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const bfitfam = 'https://bfitfam-git-main-jdsdspt-1634s-projects.vercel.app';
    return [
      // bfitfam public assets (served at root on bfitfam, need proxying here)
      { source: '/gym-bg.png', destination: `${bfitfam}/gym-bg.png` },
      { source: '/trainer.png', destination: `${bfitfam}/trainer.png` },
      { source: '/manifest.json', destination: `${bfitfam}/manifest.json` },
      { source: '/sw.js', destination: `${bfitfam}/sw.js` },
      // bfitfam app (basePath handles _next assets)
      { source: '/projetos/bfitfam', destination: `${bfitfam}/projetos/bfitfam` },
      { source: '/projetos/bfitfam/:path*', destination: `${bfitfam}/projetos/bfitfam/:path*` },
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
