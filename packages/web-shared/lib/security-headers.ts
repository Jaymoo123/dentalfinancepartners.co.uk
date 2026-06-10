/**
 * Security header builder — SEC-01/02/03.
 *
 * SEC-02 DOCUMENTED EXCEPTION (do not remove this comment):
 *   'unsafe-inline' is retained in script-src because these sites use static-site
 *   generation (SSG). Next.js injects inline scripts for its runtime hydration
 *   bootstrap and GA loads via inline <script> tags — both are irremovable without
 *   switching to a per-request rendering model (PPR / dynamic). A nonce-based CSP
 *   requires a fresh nonce per request, which forces dynamic rendering and breaks SSG.
 *   Bounding conditions: framework inline runtime + GA bootstrap only.
 *   Revisit trigger: if/when the estate moves to PPR or dynamic rendering.
 *   SEC-02 audit verdict: documented-exception PARTIAL (never PASS until resolved).
 *
 * 'unsafe-eval' is emitted ONLY in non-production (Next.js dev HMR requires it).
 * Production builds never carry 'unsafe-eval'.
 */

export interface SecurityHeaderOpts {
  /** Emit Google Analytics / GTM connect-src and script-src entries. */
  ga?: boolean;
  /** Emit Supabase connect-src entry. */
  supabase?: boolean;
  /** Emit Microsoft Clarity script-src entry. */
  clarity?: boolean;
  /**
   * When set, returns TWO header blocks: one for /<embedPrefix>/:path* with
   * frame-ancestors open (SEC-03 scoped embed exception), and one locked-down
   * block for everything else. When null/undefined, returns a single locked-down
   * block covering all routes (SEC-03: framing denied everywhere).
   */
  embedPrefix?: string | null;
  /** Additional connect-src sources beyond the baseline. */
  extraConnectSrc?: string[];
  /** Additional script-src sources beyond the baseline. */
  extraScriptSrc?: string[];
}

type HeaderEntry = { key: string; value: string };
/** Shape expected by Next.js headers() config. */
export type HeaderBlock = { source: string; headers: HeaderEntry[] };

function buildCsp(opts: SecurityHeaderOpts, isEmbed: boolean): string {
  const isProd = process.env.NODE_ENV === "production";

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    ...(!isProd ? ["'unsafe-eval'"] : []),
    ...(opts.ga ? ["https://www.googletagmanager.com", "https://www.google-analytics.com"] : []),
    ...(opts.clarity ? ["https://www.clarity.ms"] : []),
    ...(opts.extraScriptSrc ?? []),
  ];

  const connectSrc = [
    "'self'",
    ...(opts.ga ? ["https://www.google-analytics.com", "https://analytics.google.com"] : []),
    // Supabase connect-src is omitted from embed pages (embeds don't ingest analytics)
    ...(opts.supabase && !isEmbed ? ["https://*.supabase.co"] : []),
    ...(opts.extraConnectSrc ?? []),
  ];

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src ${connectSrc.join(" ")}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    isEmbed ? "frame-ancestors *" : "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/** Full locked-down header set (non-embed routes). */
function lockedHeaders(opts: SecurityHeaderOpts): HeaderEntry[] {
  return [
    { key: "Content-Language", value: "en-GB" },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    { key: "Content-Security-Policy", value: buildCsp(opts, false) },
  ];
}

/** Minimal embed-page header set (frameable, no HSTS/XFO/Permissions-Policy). */
function embedHeaders(opts: SecurityHeaderOpts): HeaderEntry[] {
  return [
    { key: "Content-Language", value: "en-GB" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Content-Security-Policy", value: buildCsp(opts, true) },
  ];
}

/**
 * Returns the Next.js `headers()` config array for this site.
 *
 * Without `embedPrefix`: one locked-down block covering `/:path*`.
 * With `embedPrefix`: embed block first (frameable), then locked-down block
 * for everything else — reproducing Property's two-block pattern (SEC-03).
 */
export function buildSecurityHeaders(opts: SecurityHeaderOpts = {}): HeaderBlock[] {
  if (opts.embedPrefix) {
    const prefix = opts.embedPrefix;
    return [
      { source: `/${prefix}/:path*`, headers: embedHeaders(opts) },
      { source: `/((?!${prefix}/).*)`  , headers: lockedHeaders(opts) },
    ];
  }
  return [{ source: "/:path*", headers: lockedHeaders(opts) }];
}
