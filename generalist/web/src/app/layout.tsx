import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { IntentProvider } from "@/components/intent/IntentProvider";
import { ReturningBar } from "@/components/intent/ReturningBar";
import { DeepScrollModal } from "@/components/intent/DeepScrollModal";
import { SpecialistWidget } from "@/components/support/SpecialistWidget";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import { JsonLd, buildWebSite } from "@/lib/schema";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

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
      ...(niche.seo.search_console_verification?.naver
        ? { "naver-site-verification": niche.seo.search_console_verification.naver }
        : {}),
      ...(niche.seo.search_console_verification?.pinterest
        ? { "p:domain_verify": niche.seo.search_console_verification.pinterest }
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
        {/* Site-wide entity graph: canonical Organization (+ Companies House
            sameAs) and WebSite nodes emitted once here so every page carries
            the #organization / #website @ids AI knowledge-graph crawlers use. */}
        <JsonLd data={[buildOrganizationJsonLd(), buildWebSite()]} />
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * Visitor can opt out via the "Do not track me" footer link.
         * D3: no GA id — first-party Supabase is the system of record at adoption;
         * operator wires GA separately if wanted (ConsentedScripts renders nothing
         * for an empty/invalid measurementId).
         * SEC-08: analytics writes flow through /api/track (server-side service-role
         * only); ConsentProvider guards client-side consent state.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="hd"
            posture="opt-out"
            noTrackPrefixes={["/admin"]}
          >
            <ConsentedScripts />
            <IntentProvider>
              <PageShell>{children}</PageShell>
              <ReturningBar />
              <DeepScrollModal />
              {/* Specialist widget: fixed bottom-right, print:hidden, Phase-0 deterministic */}
              <div className="print:hidden">
                <SpecialistWidget />
              </div>
            </IntentProvider>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
