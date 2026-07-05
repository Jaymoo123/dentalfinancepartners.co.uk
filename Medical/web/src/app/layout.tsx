import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { IntentProvider } from "@/components/intent/IntentProvider";
import { ReturningBar } from "@/components/intent/ReturningBar";
import { DeepScrollModal } from "@/components/intent/DeepScrollModal";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
      <body
        className={`${plusJakarta.variable} ${cormorant.variable} ${plusJakarta.className} antialiased`}
      >
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * Visitor can opt out via the "Do not track me" footer link (ConsentToggle
         * in SiteFooter).
         *
         * GA4 is mounted ONLY via ConsentedScripts (gaMeasurementId prop) so it
         * respects the consent gate. The unconditional GoogleAnalytics in <head>
         * has been removed (compliance fix: the site promised opt-out but GA4 fired
         * regardless of consent state).
         *
         * SEC-08: analytics writes flow through /api/track (server-side
         * service-role only); ConsentProvider guards client-side consent state.
         * storagePrefix "ma" is FROZEN at adoption per Phase D frozen table.
         *
         * IntentProvider (WS2 Wave-3 CRO parity): mounted inside AnalyticsProvider
         * so it can read consent state. Personalisation is unconditionally ON (no
         * experiment arms). FLAT-routing note: deriveTopic returns null for flat
         * blog post paths; the topic is resolved server-side from post.category
         * and injected via TopicOverrideProvider in BlogPostRenderer.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="ma"
            posture="opt-out"
            noTrackPrefixes={["/admin", "/embed"]}
          >
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />
            <IntentProvider>
              <PageShell>{children}</PageShell>
              <ReturningBar />
              <DeepScrollModal />
            </IntentProvider>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
