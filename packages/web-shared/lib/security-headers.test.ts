import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { buildSecurityHeaders } from "./security-headers";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getHeader(blocks: ReturnType<typeof buildSecurityHeaders>, source: string, key: string): string | undefined {
  const block = blocks.find((b) => b.source === source);
  return block?.headers.find((h) => h.key === key)?.value;
}

function getCsp(blocks: ReturnType<typeof buildSecurityHeaders>, source = "/:path*"): string {
  return getHeader(blocks, source, "Content-Security-Policy") ?? "";
}

// ---------------------------------------------------------------------------
// Baseline / SEC-01
// ---------------------------------------------------------------------------

describe("buildSecurityHeaders — baseline (no opts)", () => {
  it("returns a single block covering /:path*", () => {
    const blocks = buildSecurityHeaders();
    expect(blocks).toHaveLength(1);
    expect(blocks[0].source).toBe("/:path*");
  });

  it("emits all six required SEC-01 headers", () => {
    const blocks = buildSecurityHeaders();
    const keys = blocks[0].headers.map((h) => h.key);
    expect(keys).toContain("Strict-Transport-Security");
    expect(keys).toContain("X-Frame-Options");
    expect(keys).toContain("X-Content-Type-Options");
    expect(keys).toContain("Referrer-Policy");
    expect(keys).toContain("Permissions-Policy");
    expect(keys).toContain("Content-Security-Policy");
  });

  it("sets HSTS with preload", () => {
    const blocks = buildSecurityHeaders();
    const hsts = getHeader(blocks, "/:path*", "Strict-Transport-Security");
    expect(hsts).toContain("includeSubDomains");
    expect(hsts).toContain("preload");
  });

  it("sets X-Frame-Options to DENY", () => {
    const blocks = buildSecurityHeaders();
    expect(getHeader(blocks, "/:path*", "X-Frame-Options")).toBe("DENY");
  });

  it("includes frame-ancestors 'none' in CSP", () => {
    const csp = getCsp(buildSecurityHeaders());
    expect(csp).toContain("frame-ancestors 'none'");
  });
});

// ---------------------------------------------------------------------------
// SEC-02 — unsafe-eval only in non-production
// ---------------------------------------------------------------------------

describe("buildSecurityHeaders — SEC-02 unsafe-eval control", () => {
  let originalNodeEnv: string | undefined;

  beforeEach(() => {
    originalNodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    if (originalNodeEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      (process.env as Record<string, string>).NODE_ENV = originalNodeEnv;
    }
  });

  it("production CSP does NOT contain unsafe-eval", () => {
    (process.env as Record<string, string>).NODE_ENV = "production";
    const csp = getCsp(buildSecurityHeaders());
    expect(csp).not.toContain("'unsafe-eval'");
  });

  it("development CSP DOES contain unsafe-eval", () => {
    (process.env as Record<string, string>).NODE_ENV = "development";
    const csp = getCsp(buildSecurityHeaders());
    expect(csp).toContain("'unsafe-eval'");
  });

  it("production and development CSPs differ exactly by unsafe-eval", () => {
    (process.env as Record<string, string>).NODE_ENV = "production";
    const prodCsp = getCsp(buildSecurityHeaders());
    (process.env as Record<string, string>).NODE_ENV = "development";
    const devCsp = getCsp(buildSecurityHeaders());
    // Dev adds unsafe-eval; everything else is identical
    expect(devCsp.replace(" 'unsafe-eval'", "")).toBe(prodCsp);
  });
});

// ---------------------------------------------------------------------------
// Opts — ga / supabase / clarity toggles
// ---------------------------------------------------------------------------

describe("buildSecurityHeaders — opts toggles", () => {
  it("ga: true adds GTM and GA to script-src and connect-src", () => {
    const csp = getCsp(buildSecurityHeaders({ ga: true }));
    expect(csp).toContain("https://www.googletagmanager.com");
    expect(csp).toContain("https://www.google-analytics.com");
    expect(csp).toContain("https://analytics.google.com");
  });

  it("ga: false (default) does NOT emit GA sources", () => {
    const csp = getCsp(buildSecurityHeaders());
    expect(csp).not.toContain("googletagmanager");
    expect(csp).not.toContain("google-analytics");
  });

  it("supabase: true adds Supabase to connect-src", () => {
    const csp = getCsp(buildSecurityHeaders({ supabase: true }));
    expect(csp).toContain("https://*.supabase.co");
  });

  it("supabase: false (default) does NOT emit Supabase source", () => {
    const csp = getCsp(buildSecurityHeaders());
    expect(csp).not.toContain("supabase.co");
  });

  it("clarity: true adds Clarity to script-src", () => {
    const csp = getCsp(buildSecurityHeaders({ clarity: true }));
    expect(csp).toContain("https://www.clarity.ms");
  });
});

// ---------------------------------------------------------------------------
// SEC-03 — embed variant (embedPrefix)
// ---------------------------------------------------------------------------

describe("buildSecurityHeaders — embedPrefix (SEC-03)", () => {
  it("emits exactly two blocks when embedPrefix is set", () => {
    const blocks = buildSecurityHeaders({ embedPrefix: "embed" });
    expect(blocks).toHaveLength(2);
  });

  it("embed block source matches /<prefix>/:path*", () => {
    const blocks = buildSecurityHeaders({ embedPrefix: "embed" });
    expect(blocks[0].source).toBe("/embed/:path*");
  });

  it("embed block does NOT carry X-Frame-Options or HSTS", () => {
    const blocks = buildSecurityHeaders({ embedPrefix: "embed" });
    const keys = blocks[0].headers.map((h) => h.key);
    expect(keys).not.toContain("X-Frame-Options");
    expect(keys).not.toContain("Strict-Transport-Security");
  });

  it("embed CSP has frame-ancestors *", () => {
    const blocks = buildSecurityHeaders({ embedPrefix: "embed" });
    const embedCsp = blocks[0].headers.find((h) => h.key === "Content-Security-Policy")?.value ?? "";
    expect(embedCsp).toContain("frame-ancestors *");
  });

  it("non-embed block stays locked down with DENY and frame-ancestors none", () => {
    const blocks = buildSecurityHeaders({ embedPrefix: "embed" });
    const lockedCsp = blocks[1].headers.find((h) => h.key === "Content-Security-Policy")?.value ?? "";
    expect(lockedCsp).toContain("frame-ancestors 'none'");
    const xfo = blocks[1].headers.find((h) => h.key === "X-Frame-Options")?.value;
    expect(xfo).toBe("DENY");
  });

  it("no embed variant emitted when embedPrefix is not set", () => {
    const blocks = buildSecurityHeaders({ ga: true, supabase: true });
    expect(blocks).toHaveLength(1);
    expect(blocks[0].source).toBe("/:path*");
  });
});
