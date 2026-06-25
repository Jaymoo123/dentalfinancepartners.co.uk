import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { IntentProvider } from "@/components/intent/IntentProvider";
import { ReturningBar } from "@/components/intent/ReturningBar";
import { DeepScrollModal } from "@/components/intent/DeepScrollModal";
import { SpecialistWidget } from "@/components/support/SpecialistWidget";
import { ExitIntentModal } from "@/components/blog/ExitIntentModal";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

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
    google: niche.seo.google_site_verification,
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
    <html lang="en-GB">
      {/*
       * RSS autodiscovery. Rendered in JSX (React hoists it to <head>) rather than
       * via metadata.alternates.types: most pages set their own alternates, which
       * shallow-overrides the layout's, so a metadata-based feed link would silently
       * drop on every page with a per-page canonical. This renders site-wide.
       */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${siteConfig.name} blog`}
        href="/feed.xml"
      />
      <body
        className={`${plusJakarta.variable} ${plusJakarta.className} antialiased`}
      >
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * Visitor can opt out via the "Do not track me" footer link.
         * storagePrefix "ptp" is FROZEN: continuity for returning visitors
         * who already have ptp_vid / ptp_sid / ptp_consent in localStorage.
         * SEC-08: analytics writes flow through /api/track (server-side service-role
         * only); ConsentProvider guards client-side consent state.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.source_identifier}
            siteName={niche.display_name}
          >
            <ConsentedScripts
              gaMeasurementId={niche.seo.google_analytics_id}
              clarityProjectId={process.env.NEXT_PUBLIC_CLARITY_ID}
            />
            <IntentProvider>
              <PageShell>{children}</PageShell>
              <ReturningBar />
              <DeepScrollModal />
              <SpecialistWidget />
              {/* Self-gates to blog + calculator routes; desktop + mobile triggers. */}
              <ExitIntentModal />
            </IntentProvider>
          </AnalyticsProvider>
        </ConsentProvider>
        {/* Vercel Speed Insights: anonymous, cookieless real-user Core Web Vitals. */}
        <SpeedInsights />
      </body>
    </html>
  );
}
