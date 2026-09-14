import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import { niche } from "@/config/niche-loader";
import { PageShell } from "@/components/ui/PageShell";
import { buildPrimaryNav } from "@/components/ui/nav";
import { buildOrganizationJsonLd } from "@/lib/schema";

/* Site-local chrome CSS. Lives here rather than in globals.css because the token
   ramp landed there and is frozen for this wave.

   1. #main scroll offset. The kit's PageShell hardcodes <main id="main"> with no
      scroll margin, and its header is sticky, so every future in-page jump would
      land with its own heading hidden under the bar. A sibling site shipped
      exactly that (scroll-margin-top: 0px on every route). This site has zero
      in-page anchors today, so this sets the precedent before the first one
      exists. 6rem clears the 3.25-4rem bar plus breathing room.

   2. Header CTA visibility. layout-utils.ts:31 `btnPrimary` OPENS with
      `inline-flex`, and SiteHeader.tsx:473 composes `${btnPrimary} hidden ...
      lg:inline-flex` on top of it. Measured in the served stylesheet, `.hidden`
      sits at byte 16145 and `.inline-flex` at 16224: same specificity, later rule
      wins, so `hidden` is a dead no-op and the CTA never hides at any width.
      Both classes are present in the class list, which is why source review, diff
      review and every test pass it.

      This is an OPEN OWNER DECISION crossing the estate, so the kit is NOT
      touched. This rule is the site-local counterpart: LAYERED inside
      @layer utilities so it does not out-rank arbitrary Tailwind utilities, and
      winning inside the layer on specificity alone (0,2,2 vs 0,1,0) rather than
      on source order. Delete it when the kit stops composing a display toggle on
      top of a recipe that already fixes display.

      Keyed on data-cta="header_book", so it is valid only while PageShell.tsx
      leaves SiteHeader.ctaIds at the kit default. The drawer CTA carries
      data-cta-placement="mobile_menu" and is untouched. 64rem = the kit's `lg:`. */
const chromeCss = `
#main { scroll-margin-top: 6rem; }
@layer utilities {
  header a[data-cta-placement="header"][data-cta="header_book"] { display: none; }
  @media (min-width: 64rem) {
    header a[data-cta-placement="header"][data-cta="header_book"] { display: inline-flex; }
  }
}`;
const siteUrl = `https://${niche.domain}`;
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
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildOrganizationJsonLd() }} />
      </head>
      <body className="antialiased">
        <ConsentProvider>
          <AnalyticsProvider siteKey={niche.content_strategy.site_key} siteName={niche.display_name} storagePrefix="datp" posture="opt-out" noTrackPrefixes={["/admin"]}>
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />
            {/* Site chrome (header, skip link, <main id="main">, footer) comes
                from the shared kit via PageShell. It renders children bare on
                /embed/ paths so embedded calculators stay chrome-free inside a
                partner's iframe. nav is built HERE, server-side, so the
                calculator registry never reaches the client bundle. */}
            <PageShell nav={buildPrimaryNav()}>{children}</PageShell>
          </AnalyticsProvider>
        </ConsentProvider>
        {/* Deliberately the LAST node in <body>, not a <head> child: this block
            opens `@layer utilities`, and CSS layer ORDER is fixed by first
            encounter. Emitted before the Tailwind stylesheet it would make
            `utilities` the lowest-ranked layer document-wide and silently
            demote every Tailwind utility below `components`. After it, the
            layer already exists in the right position and this rule simply
            joins it. */}
        <style dangerouslySetInnerHTML={{ __html: chromeCss }} />
      </body>
    </html>
  );
}
