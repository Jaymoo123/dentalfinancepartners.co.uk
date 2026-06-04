import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: Property/web -> Property -> Accounting (repo root).
// Used so Next.js traces files in the npm workspace (packages/web-shared/*).
const repoRoot = path.resolve(appDir, "..", "..");

const nextConfig: NextConfig = {
  outputFileTracingRoot: repoRoot,
  // Workspace package contains pure TS — Next.js must transpile it.
  transpilePackages: ["@accounting-network/web-shared"],
  eslint: {
    ignoreDuringBuilds: false, // Re-enable ESLint during builds for better code quality
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async headers() {
    // Locked-down headers for the whole site (everything EXCEPT /embed/*).
    const securityHeaders = [
      { key: 'Content-Language', value: 'en-GB' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: https: blob:",
          "font-src 'self' data: https://fonts.gstatic.com",
          "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com",
          "frame-src 'none'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "upgrade-insecure-requests"
        ].join('; ')
      }
    ];

    // Embeddable widgets must be frameable on partner sites: no X-Frame-Options,
    // and frame-ancestors opened up. Everything else stays locked down.
    const embedHeaders = [
      { key: 'Content-Language', value: 'en-GB' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "img-src 'self' data: https: blob:",
          "font-src 'self' data: https://fonts.gstatic.com",
          "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
          "object-src 'none'",
          "base-uri 'self'",
          "frame-ancestors *"
        ].join('; ')
      }
    ];

    return [
      { source: '/embed/:path*', headers: embedHeaders },
      { source: '/((?!embed/).*)', headers: securityHeaders },
    ];
  },
};

export default nextConfig;
