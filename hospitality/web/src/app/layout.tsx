import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { niche } from "@/config/niche-loader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeaderWrap } from "@/components/layout/SiteHeaderWrap";
import { buildOrganizationJsonLd } from "@/lib/schema";

const siteUrl = `https://${niche.domain}`;

// Estate font, ported 2026-09-28 (brief D5: body was the bare system stack).
// One-file-ish change: this import/apply plus the --font-sans var below.
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// 2026-09-28 parity: was a second, hand-rolled Organization node that drifted
// from lib/schema.ts's (no knowsAbout, no sameAs, no parentOrganization).
// Reuse the one shared builder so there is only ever one Organization shape.
const organizationJsonLd = buildOrganizationJsonLd();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: niche.seo.theme_color,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${niche.display_name} | ${niche.tagline}`,
    template: `%s | ${niche.display_name}`,
  },
  description: niche.description,
  // ponytail: no alternates here on purpose. Root metadata is INHERITED by every
  // route that does not override it, so a canonical here made /for, /services
  // and the rest canonicalise to the homepage and drop out of the index. Each
  // page owns its own canonical; the homepage sets its own in app/page.tsx.
  verification: {
    google: niche.seo.search_console_verification?.google || undefined,
    yandex: niche.seo.search_console_verification?.yandex || undefined,
    // Server-rendered so the AdSense crawler finds it (owner 2026-09-28: set up
    // every site for AdSense). Solicitors carries the same literal client id.
    other: {
      ...(niche.seo.search_console_verification?.bing
        ? { "msvalidate.01": niche.seo.search_console_verification.bing }
        : {}),
      "google-adsense-account": "ca-pub-3756285576371279",
    },
  },
  openGraph: {
    type: "website",
    locale: niche.seo.locale,
    url: siteUrl,
    siteName: niche.display_name,
    title: niche.display_name,
    description: niche.description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: niche.display_name }],
  },
  twitter: {
    card: "summary_large_image",
    title: niche.display_name,
    description: niche.description,
    images: ["/api/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
      </head>
      <body className={`${plusJakarta.variable} antialiased`}>
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * storagePrefix "hfp" FROZEN (spinup 2026-07-12) — a hardcoded literal by
         * design, NEVER from config or env (changing it orphans visitor identities).
         * PF-07: siteKey sourced from niche config, never a literal.
         * GA id is currently empty — ConsentedScripts renders nothing when empty.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="hfp"
            posture="opt-out"
            noTrackPrefixes={["/admin"]}
          >
            <ConsentedScripts
              gaMeasurementId={niche.seo.google_analytics_id}
              adsenseClientId="ca-pub-3756285576371279"
            />
            <SiteHeaderWrap />
            <main id="main">{children}</main>
            <SiteFooter />
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
