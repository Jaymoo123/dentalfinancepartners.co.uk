import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { niche } from "@/config/niche-loader";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";
const siteUrl = `https://${niche.domain}`;
const organizationJsonLd = buildOrganizationJsonLd();
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: niche.seo.theme_color };
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${niche.display_name} | ${niche.tagline}`, template: `%s | ${niche.display_name}` },
  description: niche.description,
  // ponytail: no alternates here on purpose. Root metadata is INHERITED by every
  // route that does not override it, so a canonical here made /for, /services
  // and the rest canonicalise to the homepage and drop out of the index. Each
  // page owns its own canonical; the homepage sets its own in app/page.tsx.
  verification: { google: niche.seo.search_console_verification?.google || undefined, yandex: niche.seo.search_console_verification?.yandex || undefined, other: { ...(niche.seo.search_console_verification?.bing ? { "msvalidate.01": niche.seo.search_console_verification.bing } : {}), "google-adsense-account": "ca-pub-3756285576371279" } },
  openGraph: { type: "website", locale: niche.seo.locale, url: siteUrl, siteName: niche.display_name, title: niche.display_name, description: niche.description, images: [{ url: "/api/og", width: 1200, height: 630, alt: niche.display_name }] },
  twitter: { card: "summary_large_image", title: niche.display_name, description: niche.description, images: ["/api/og"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /></head>
      <body className="antialiased">
        <ConsentProvider>
          <AnalyticsProvider siteKey={niche.content_strategy.site_key} siteName={niche.display_name} storagePrefix="ffp" posture="opt-out" noTrackPrefixes={["/admin"]}>
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} adsenseClientId="ca-pub-3756285576371279" />
            {children}
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
