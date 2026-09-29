import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { niche } from "@/config/niche-loader";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";
import { PageShell } from "@/components/layout/PageShell";
import { startupsServices } from "@/data/startups-services";
import { startupsHubs } from "@/data/startups-hubs";
import { TOOLS } from "@/lib/calculators/registry";
const siteUrl = `https://${niche.domain}`;
const organizationJsonLd = buildOrganizationJsonLd();

/**
 * Primary nav, built here in the server layout and passed down as plain data, so
 * the calculator registry's compute functions never reach the client bundle (the
 * kit shell is a client component).
 *
 * The seven top-level entries are niche.config.json `navigation` verbatim, in its
 * order, with its hrefs unchanged: the Research entry keeps its configured deep
 * href `/research/startup-formation-survival-index` rather than the `/research`
 * hub, per the port ruling. This site had no chrome at all before this file, so
 * no route is being added to or removed from a nav that existed; these seven are
 * the nav the config has always declared and nothing rendered.
 *
 * The children are new. The kit header turns them into dropdowns and the kit
 * footer derives its Services, Resources and Calculators columns from them, so a
 * section that gains a page gains a chrome link automatically instead of drifting
 * the way a hand-listed footer does. The self-referential first child ("All
 * services", "Research hub") is deliberate: the kit's footer column headings are
 * not links, so without it the hub page itself would have no footer entry. The
 * kit drawer filters it out where the parent link already covers it, and the kit
 * dropdown trigger is a button rather than a link, so without a self-referential
 * child the hub would be unreachable from the desktop header.
 */
const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All services", href: "/services" },
      ...startupsServices.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    ],
  },
  {
    label: "Who we help",
    href: "/for",
    children: [
      { label: "Who we help", href: "/for" },
      ...startupsHubs.map((h) => ({ label: h.title, href: `/for/${h.slug}` })),
    ],
  },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "All calculators", href: "/calculators" },
      ...TOOLS.map((t) => ({ label: t.name, href: `/calculators/${t.slug}` })),
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    // Href is niche.config.json's, unchanged. The kit footer's Resources column
    // is derived from this item's children (see PageShell's `resourcesHref`),
    // which is why the /research hub is listed first here.
    label: "Research",
    href: "/research/startup-formation-survival-index",
    children: [
      { label: "Research hub", href: "/research" },
      { label: "Startup formation and survival", href: "/research/startup-formation-survival-index" },
      { label: "R&D tax relief usage", href: "/research/rd-tax-relief-index" },
      { label: "Tech startup survival curves", href: "/research/tech-startup-survival-index" },
      { label: "UK tech formations", href: "/research/uk-tech-formations-index" },
      { label: "Tech funding reliefs", href: "/research/uk-tech-funding-reliefs-index" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
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
    // GeistSans.variable puts the font's CSS variable class on <html>; the
    // tokens package maps --font-sans to it in globals.css. Before this the site
    // loaded no webfont at all and rendered in ui-sans-serif, system-ui.
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} /></head>
      <body className="antialiased">
        {/* U4 item 4: globals-standard.css's .eyebrow-rule/.tick-draw collapsed
            states are gated on [data-draw="off"] with no (scripting: enabled)
            condition (unlike crypto's local copy), so without JS the observer that
            flips data-draw never runs and the marks would stay invisible. Must live
            inside <body>: React cannot render <noscript> as a direct child of <html>. */}
        <noscript>
          <style>{`.eyebrow-rule[data-draw="off"] { transform: none; }
            [data-draw="off"] .tick-draw { stroke-dashoffset: 0; }`}</style>
        </noscript>
        <ConsentProvider>
          <AnalyticsProvider siteKey={niche.content_strategy.site_key} siteName={niche.display_name} storagePrefix="ffp" posture="opt-out" noTrackPrefixes={["/admin"]}>
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} adsenseClientId="ca-pub-3756285576371279" />
            {/* Chrome = the shared kit. PageShell also supplies the skip link,
                the single <main id="main">, and the /embed/* chrome bypass
                (partner iframes get no header and no footer). */}
            <PageShell nav={primaryNav}>{children}</PageShell>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
