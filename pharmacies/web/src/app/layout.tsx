import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { PageShell } from "@/components/layout/PageShell";
import { SupportProvider } from "@/components/support/SupportProvider";
import { SpecialistWidget } from "@accounting-network/web-shared/support/SpecialistWidget";
import { ReturningBar } from "@/components/intent/ReturningBar";
import { DeepScrollModal } from "@/components/intent/DeepScrollModal";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/schema";

// P1-C. Built here, server-side, and passed to the client shell as plain data,
// so nothing server-only reaches the client bundle through the chrome. The kit
// forwards this one list to both the header and the footer, so they cannot
// drift. siteConfig.nav IS niche.navigation (config/site.ts:26); labels are
// shipped verbatim — rewording the nav is a copy change on 55 pages, not a
// chrome change.
const primaryNav: NavItem[] = siteConfig.nav.map((i) => ({ label: i.label, href: i.href }));
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = `https://${niche.domain}`;
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: niche.seo.theme_color };
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${niche.display_name} | ${niche.tagline}`, template: `%s | ${niche.display_name}` },
  description: niche.description,
  alternates: { canonical: siteUrl, languages: { "en-GB": siteUrl, "x-default": siteUrl } },
  verification: { google: niche.seo.search_console_verification?.google || undefined, yandex: niche.seo.search_console_verification?.yandex || undefined, other: { ...(niche.seo.search_console_verification?.bing ? { "msvalidate.01": niche.seo.search_console_verification.bing } : {}), "google-adsense-account": "ca-pub-3756285576371279" } },
  openGraph: { type: "website", locale: niche.seo.locale, url: siteUrl, siteName: niche.display_name, title: niche.display_name, description: niche.description, images: [{ url: "/api/og", width: 1200, height: 630, alt: niche.display_name }] },
  twitter: { card: "summary_large_image", title: niche.display_name, description: niche.description, images: ["/api/og"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={plusJakarta.variable}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }} /></head>
      <body className={`${plusJakarta.className} antialiased`}>
        {/* A10: .eyebrow-rule[data-draw="off"] and [data-draw="off"] .tick-draw
         * (globals-standard.css) ship a COLLAPSED state in the server HTML with no
         * (scripting: enabled) guard. No element carries those classes here today,
         * so this is pre-emptive, not a live fix. React cannot render <noscript>
         * as a direct child of <html>, hence inside <body>. */}
        <noscript>
          <style>{`.eyebrow-rule[data-draw="off"] { transform: none; }
            [data-draw="off"] .tick-draw { stroke-dashoffset: 0; }
            [data-state="closed"][role="region"] { display: block !important; }
            [data-draw="off"] .story-numeral { color: var(--color-primary-700) !important; }
            [data-draw="off"] .story-numeral-rule { transform: none !important; }`}</style>
        </noscript>
        {/* R2 B2. One offer at a time. The deep-scroll modal sets
            `data-surface-open` on <html> while it is open; this rule stands the
            sticky bar and the kit widget mount down for exactly that long. The
            widget is kit (packages/** is manager-only), so it is suppressed at
            its mount point here rather than inside web-shared, and the modal
            keeps its own focus trap, so while it is up it is the only keyboard
            surface on the page. */}
        <style>{`html[data-surface-open] .capture-sticky,
          html[data-surface-open] .capture-widget { display: none !important; }`}</style>
        <ConsentProvider>
          <AnalyticsProvider siteKey={niche.content_strategy.site_key} siteName={niche.display_name} storagePrefix="pfp" posture="opt-out" noTrackPrefixes={["/admin"]}>
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} adsenseClientId="ca-pub-3756285576371279" />
            {/* W7 capture region. ONE intent provider: the kit's
                support/IntentProvider supplies both the widget's config and
                the useIntent(surface) hook the sticky bar, the returning bar,
                the deep-scroll modal and the next-step card read, so the
                construction-cis-era second provider is not forked in here. All
                four surfaces no-op on /embed/* and /admin/* and when consent is
                denied. StickyCTA is mounted by PageShell (P1-C) and is inside
                this provider. NextStepOffer is built but mounted nowhere: its
                targets are in the W7 receipt for M1. */}
            <SupportProvider>
              <PageShell nav={primaryNav}>{children}</PageShell>
              <ReturningBar />
              <DeepScrollModal />
              <div className="capture-widget print:hidden">
                <SpecialistWidget />
              </div>
            </SupportProvider>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
