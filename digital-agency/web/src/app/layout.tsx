import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
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
      <head>
        <GoogleAnalytics measurementId={niche.seo.google_analytics_id} />
      </head>
      <body
        className={`${plusJakarta.variable} ${plusJakarta.className} antialiased`}
      >
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * Visitor can opt out via the "Do not track me" footer link.
         * GA4 tag retained alongside first-party analytics per Phase D spec
         * (keep-or-drop-GA4 is a separate later call — do not remove GA4 here).
         * SEC-08: analytics writes flow through /api/track (server-side
         * service-role only); ConsentProvider guards client-side consent state.
         * storagePrefix "aff" is FROZEN at adoption per Phase D frozen table.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="aff"
            posture="opt-out"
            noTrackPrefixes={["/admin", "/embed"]}
          >
            <ConsentedScripts />
            <PageShell>{children}</PageShell>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
