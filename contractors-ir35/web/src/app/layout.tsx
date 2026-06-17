import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { buildOrganizationJsonLd, buildWebsiteJsonLd } from "@/lib/schema";

const siteUrl = siteConfig.url;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: niche.seo.theme_color,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-GB": siteUrl,
      "x-default": siteUrl,
    },
  },
  verification: {
    google: niche.seo.search_console_verification?.google || niche.seo.google_site_verification || undefined,
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
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.publisherLogoUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased font-sans">
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
         * Visitor can opt out via the "Do not track me" footer link.
         * storagePrefix "cfp" FROZEN (Phase 2 adoption 2026-06-12).
         * PF-07: siteKey sourced from niche config, never a literal.
         * ConsentedScripts gates GA4 behind consent state.
         * GA id is currently empty — ConsentedScripts renders nothing when empty.
         * No legacyPrefix: this site was never live, no prior storage keys.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="cfp"
            posture="opt-out"
            noTrackPrefixes={["/admin", "/embed"]}
          >
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />
            <PageShell>{children}</PageShell>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
