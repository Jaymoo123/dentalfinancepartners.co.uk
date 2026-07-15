import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { niche } from "@/config/niche-loader";
const siteUrl = `https://${niche.domain}`;
const organizationJsonLd = { "@context": "https://schema.org", "@type": ["ProfessionalService","AccountingService"], "@id": `${siteUrl}#organization`, name: niche.display_name, url: siteUrl, description: niche.description, logo: `${siteUrl}/api/og`, areaServed: "GB" };
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: niche.seo.theme_color };
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${niche.display_name} | ${niche.tagline}`, template: `%s | ${niche.display_name}` },
  description: niche.description,
  alternates: { canonical: siteUrl, languages: { "en-GB": siteUrl, "x-default": siteUrl } },
  verification: { google: niche.seo.search_console_verification?.google || undefined, yandex: niche.seo.search_console_verification?.yandex || undefined, other: { ...(niche.seo.search_console_verification?.bing ? { "msvalidate.01": niche.seo.search_console_verification.bing } : {}) } },
  openGraph: { type: "website", locale: niche.seo.locale, url: siteUrl, siteName: niche.display_name, title: niche.display_name, description: niche.description, images: [{ url: "/api/og", width: 1200, height: 630, alt: niche.display_name }] },
  twitter: { card: "summary_large_image", title: niche.display_name, description: niche.description, images: ["/api/og"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /></head>
      <body className="antialiased">
        <ConsentProvider>
          <AnalyticsProvider siteKey={niche.content_strategy.site_key} siteName={niche.display_name} storagePrefix="pfp" posture="opt-out" noTrackPrefixes={["/admin"]}>
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />
            {children}
            <SiteFooter />
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
