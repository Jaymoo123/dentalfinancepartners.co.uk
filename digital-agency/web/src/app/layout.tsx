import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { IntentProvider } from "@/components/intent/IntentProvider";
import { ReturningBar } from "@/components/intent/ReturningBar";
import { DeepScrollModal } from "@/components/intent/DeepScrollModal";
import { ExitIntentModal } from "@/components/blog/ExitIntentModal";
import { SpecialistWidget } from "@/components/support/SpecialistWidget";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

// GoogleAnalytics removed: was mounted unconditionally in <head> (the latent
// Solicitors pre-fix defect identified in the Wave-5 audit). GA4 is now gated
// correctly via ConsentedScripts inside ConsentProvider, which honours the
// visitor's opt-out consent state. ConsentToggle in SiteFooter provides the
// visible control.

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
    <html lang="en-GB">
      <head />
      <body
        className={`${plusJakarta.variable} ${plusJakarta.className} antialiased`}
      >
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * Visitor can opt out via the ConsentToggle in SiteFooter.
         * GA4 is gated via ConsentedScripts (inside ConsentProvider); it is NOT
         * mounted unconditionally in <head>. storagePrefix "aff" is FROZEN at
         * adoption per Phase D frozen table.
         *
         * IntentProvider wraps PageShell (and ReturningBar / DeepScrollModal /
         * ExitIntentModal) so personalisation surfaces have access to the intent
         * context. Personalisation is hardcoded default-ON (treatment locked per
         * estate experiments wind-down 2026-06-30).
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="aff"
            posture="opt-out"
            noTrackPrefixes={["/admin", "/embed"]}
          >
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id || undefined} />
            <IntentProvider>
              <PageShell>{children}</PageShell>
              {/* Personalisation overlays (outside PageShell so z-index stacks above it) */}
              <ReturningBar />
              <DeepScrollModal />
              {/* Qualified-lead ExitIntentModal (replaces retired newsletter modal) */}
              <ExitIntentModal />
              {/* R3 deterministic Phase-0 proactive assistant (aff divergence B: in layout, not PageShell).
                  Sets aff_assistant_active so ExitIntentModal (line 91) stands down. */}
              <SpecialistWidget />
            </IntentProvider>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
