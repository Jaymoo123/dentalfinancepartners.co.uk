import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/schema";
import { PageShell } from "@/components/layout/PageShell";
import { buildPrimaryNav } from "@/components/layout/nav";

const siteUrl = siteConfig.url;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: niche.seo.theme_color,
};

// Estate audit 2026-07 fixes baked in:
// - og:image is the dynamic 1200x630 PNG route /api/og (never an SVG)
// - Organization + WebSite JSON-LD present from day one
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // No `alternates` here on purpose. Next.js metadata inheritance hands a root
  // canonical (and root hreflang) to every route that does not set its own, so a
  // default here silently canonicalises whole route families to the homepage.
  // Every indexable route declares its own self-referencing canonical in its
  // page metadata instead. Two deliberate exceptions stay as they are:
  // /embed/[slug] canonicalises to its parent /calculators/[slug] (the embed is
  // a duplicate of the tool page), and /book, /complete and /thank-you are
  // noindex conversion pages, so they need no canonical at all.
  verification: {
    google: niche.seo.search_console_verification?.google || undefined,
    yandex: niche.seo.search_console_verification?.yandex || undefined,
    other: {
      ...(niche.seo.search_console_verification?.bing
        ? { "msvalidate.01": niche.seo.search_console_verification.bing }
        : {}),
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="antialiased">
        {/* The kit stylesheet ships collapsed [data-draw="off"] states that only an
            observer releases, so without JS the eyebrow rules and the homepage ticks
            would stay invisible. Show them complete instead. Only the two selectors
            this site actually mounts. Must live inside <body>: React cannot render
            <noscript> as a direct child of <html>. */}
        <noscript>
          <style>{`.eyebrow-rule[data-draw="off"] { transform: none; }
            [data-draw="off"] .tick-draw { stroke-dashoffset: 0; }`}</style>
        </noscript>
        {/* Entity graph (Organization + WebSite) on every page so AI knowledge-graph
            crawlers resolve the firm as one entity via the shared #organization @id. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildWebsiteJsonLd() }}
        />
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * storagePrefix "cnp" FROZEN (spinup 2026-07-11) — a hardcoded literal by
         * design, NEVER from config or env (changing it orphans visitor identities).
         * PF-07: siteKey sourced from niche config, never a literal.
         * GA id is currently empty — ConsentedScripts renders nothing when empty.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="cnp"
            posture="opt-out"
            noTrackPrefixes={["/admin"]}
          >
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />
            {/* Site chrome (header, main landmark, footer) comes from the
                shared kit via PageShell. It renders children bare on /embed/
                paths, so embedded calculators stay chrome-free inside a
                partner's iframe. Admin routes take the chrome too: they are
                gated and noindex, and excluding them would mean a second shell
                for no gain. nav is built here, server-side, so the calculator
                registry never reaches the client bundle. */}
            <PageShell nav={buildPrimaryNav()}>{children}</PageShell>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
