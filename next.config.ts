import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Cabeçalhos de segurança aplicados a todas as respostas.
 *
 * A CSP permite apenas o necessário para o app e para o botão do Google
 * (accounts.google.com). 'unsafe-inline' é exigido pelos scripts inline do
 * Next; 'unsafe-eval' fica restrito ao ambiente de desenvolvimento.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline' https://accounts.google.com",
  `script-src 'self' 'unsafe-inline' https://accounts.google.com https://www.gstatic.com${
    isProduction ? "" : " 'unsafe-eval'"
  }`,
  "frame-src https://accounts.google.com",
  `connect-src 'self' https://accounts.google.com https://www.googleapis.com https://oauth2.googleapis.com${
    isProduction ? "" : " ws://localhost:*"
  }`,
  "manifest-src 'self'",
  "worker-src 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
