import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PageShell } from "@/components/layout/PageShell";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";
import { ConsentedScripts } from "@/components/analytics/ConsentedScripts";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { IntentProvider } from "@/components/intent/IntentProvider";
import { ReturningBar } from "@/components/intent/ReturningBar";
import { DeepScrollModal } from "@/components/intent/DeepScrollModal";
import { SpecialistWidget } from "@/components/support/SpecialistWidget";
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
      <body
        className={`${plusJakarta.variable} ${plusJakarta.className} antialiased`}
      >
        <ConsentProvider>
          <AnalyticsProvider siteKey={niche.content_strategy.source_identifier}>
            <IntentProvider>
              <PageShell>{children}</PageShell>
              <ReturningBar />
              <DeepScrollModal />
              <SpecialistWidget />
            </IntentProvider>
          </AnalyticsProvider>
          {/* GA4 + Microsoft Clarity load only after consent is granted. */}
          <ConsentedScripts
            gaMeasurementId={niche.seo.google_analytics_id}
            clarityProjectId={process.env.NEXT_PUBLIC_CLARITY_ID}
          />
        </ConsentProvider>
      </body>
    </html>
  );
}
