const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  devIndicators: {
    buildActivity: false,
  },
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.hoorayteams.fun",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return redirectsPath;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "no-referrer",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "unsafe-none",
  },
  {
    key: "Cache-Control",
    value: "s-maxage=60, stale-while-revalidate=30",
  },
];

const redirectsPath = [
  {
    source: "/:path*",
    has: [{ type: "host", value: "hoorayteams.fun" }],
    destination: "https://www.hoorayteams.fun/:path*",
    permanent: true,
  },
];

export default nextConfig;
