import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { niche } from "@/config/niche-loader";
import { SiteNav } from "@/components/ui/SiteNav";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { buildOrganizationJsonLd } from "@/lib/schema";

const siteUrl = `https://${niche.domain}`;

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
    other: {
      ...(niche.seo.search_console_verification?.bing
        ? { "msvalidate.01": niche.seo.search_console_verification.bing }
        : {}),
      // Server-rendered so the AdSense crawler finds it; the ad loader itself
      // is client-side behind the consent gate (Solicitors pattern, 7edc7fd3).
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
        {/* Single site-wide Organization node (LEADS_250 §13 T2/T5): emitted
            once here so every page carries the rich record without the
            duplicate-@id stub that used to live in this file. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${plusJakarta.className} antialiased`}>
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * storagePrefix "carf" FROZEN (spinup 2026-07-12) — a hardcoded literal by
         * design, NEVER from config or env (changing it orphans visitor identities).
         * PF-07: siteKey sourced from niche config, never a literal.
         * GA id is currently empty — ConsentedScripts renders nothing when empty.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="carf"
            posture="opt-out"
            noTrackPrefixes={["/admin"]}
          >
            <ConsentedScripts
              gaMeasurementId={niche.seo.google_analytics_id}
              adsenseClientId="ca-pub-3756285576371279"
            />
            <SiteNav />
            {children}
            <SiteFooter />
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
