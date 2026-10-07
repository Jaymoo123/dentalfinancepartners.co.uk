import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ConsentProvider } from "@accounting-network/web-shared/analytics/react/ConsentProvider";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics/react/AnalyticsProvider";
import { ConsentedScripts } from "@accounting-network/web-shared/analytics/react/ConsentedScripts";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { niche } from "@/config/niche-loader";
import { siteConfig } from "@/config/site";
import { PageShell } from "@/components/layout/PageShell";
import { SupportProvider } from "@/components/support/SupportProvider";
import { SpecialistWidget } from "@accounting-network/web-shared/support/SpecialistWidget";
import { buildOrganizationJsonLd } from "@/lib/schema";

/**
 * P1-C: primary nav, built here in the server layout and passed down as plain
 * data, so nothing server-only can reach the client bundle through the kit
 * shell (a client component). These are niche.config.json navigation verbatim,
 * in its order, with its labels and hrefs unchanged: all seven probed 200. The
 * labels are raw route names ("For", not "Who we help"); rewording them is a
 * copy change, not a chrome change, and is an open owner question, so nothing
 * is authored here.
 *
 * No children are authored either, so the kit footer Services and Resources
 * columns derive from nothing and drop out; the Calculators column renders its
 * "All calculators" fallback. A later phase that authors nav children lights
 * all three up without touching this file.
 */
const primaryNav: NavItem[] = siteConfig.nav.map((item) => ({
  label: item.label,
  href: item.href,
}));

const siteUrl = `https://${niche.domain}`;

// Estate font, ported 2026-09-28 (brief D5: body was the bare system stack).
// One-file-ish change: this import/apply plus the --font-sans var below.
// R1 B1 (2026-09-29): the variable class goes on <html>, NOT <body>.
// globals.css declares --font-sans in @theme inline, which emits it on :root
// (<html>), and a custom property whose value contains var() resolves at
// COMPUTED-VALUE TIME on the element that declares it. With the class on
// <body>, --font-plus-jakarta did not exist on :root, --font-sans computed to
// the guaranteed-invalid value and every page rendered in ui-sans-serif.
// --font-mono needs no class: globals.css aliases it to a plain system stack
// and loads no second webfont, so there is no other next/font variable here.
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// 2026-09-28 parity: was a second, hand-rolled Organization node that drifted
// from lib/schema.ts's (no knowsAbout, no sameAs, no parentOrganization).
// Reuse the one shared builder so there is only ever one Organization shape.
const organizationJsonLd = buildOrganizationJsonLd();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: niche.seo.theme_color,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${niche.display_name} | ${niche.tagline}`,
    template: `%s | ${niche.display_name}`,
  },
  description: niche.description,
  // ponytail: no alternates here on purpose. Root metadata is INHERITED by every
  // route that does not override it, so a canonical here made /for, /services
  // and the rest canonicalise to the homepage and drop out of the index. Each
  // page owns its own canonical; the homepage sets its own in app/page.tsx.
  verification: {
    google: niche.seo.search_console_verification?.google || undefined,
    yandex: niche.seo.search_console_verification?.yandex || undefined,
    other: {
      ...(niche.seo.search_console_verification?.bing
        ? { "msvalidate.01": niche.seo.search_console_verification.bing }
        : {}),
    },
  },
  openGraph: {
    type: "website",
    locale: niche.seo.locale,
    url: siteUrl,
    siteName: niche.display_name,
    title: niche.display_name,
    description: niche.description,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: niche.display_name }],
  },
  twitter: {
    card: "summary_large_image",
    title: niche.display_name,
    description: niche.description,
    images: ["/api/og"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={plusJakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
      </head>
      <body className="antialiased">
        {/* P1-A (U4): .eyebrow-rule[data-draw="off"] and [data-draw="off"] .tick-draw
         * (globals-standard.css) ship a COLLAPSED state in the server HTML with no
         * (scripting: enabled) guard. Without JS the observer never flips the
         * attribute and the marks stay invisible - the defect that left 64 pages
         * on a sibling site with invisible marks. React cannot render <noscript>
         * as a direct child of <html>, hence inside <body>. */}
        <noscript>
          <style>{`.eyebrow-rule[data-draw="off"] { transform: none; }
            [data-draw="off"] .tick-draw { stroke-dashoffset: 0; }
            [data-state="closed"][role="region"] { display: block !important; }`}</style>
        </noscript>
        {/*
         * AN-01 (opt-out posture): track by default under legitimate interest.
         * storagePrefix "hfp" FROZEN (spinup 2026-07-12) — a hardcoded literal by
         * design, NEVER from config or env (changing it orphans visitor identities).
         * PF-07: siteKey sourced from niche config, never a literal.
         * GA id is currently empty — ConsentedScripts renders nothing when empty.
         */}
        <ConsentProvider>
          <AnalyticsProvider
            siteKey={niche.content_strategy.site_key}
            siteName={niche.display_name}
            storagePrefix="hfp"
            posture="opt-out"
            noTrackPrefixes={["/admin"]}
          >
            <ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />
            {/* Chrome = the shared kit. PageShell also supplies the skip
                link, the single main landmark (which used to be hand-rolled
                here) and the chrome bypass, so partner iframes get no header
                and no footer: the kit's built-in /embed/ prefix plus the
                bypassWhen predicate the site wrapper passes for the
                /research/<slug>/embed suffix (R1 G3). */}
            <SupportProvider>
              <PageShell nav={primaryNav}>{children}</PageShell>
              {/* Owner ruling 2026-09-29 (startups-tech, assumed the same here):
                  the floating help widget is the ONLY intent surface mounted on
                  this site, and its auto-open behaviour stays. No sticky bar, no
                  deep-scroll panel, no returning-visitor bar, no next-step offer
                  and no newsletter. The kit engine's Surface union still names
                  those so the model stays one implementation estate-wide;
                  nothing renders them. The intent provider still renders its
                  children on /embed/* and /admin/*, it only passes a null
                  context there; what stops the widget on those routes is its own
                  `if (!ctx) return null` inside the kit's SpecialistWidget. The
                  print:hidden wrapper keeps it off printed pages (the kit's
                  container recipe carries print:hidden too). */}
              {/* R4 W-G2, RECORDED as a kit limitation, not fixed: the widget
                  also renders on the 404 page (`curl :3202/no-such-page | grep -c
                  'data-cta="specialist_widget"'` = 1). The kit suppresses by PATH
                  PREFIX only, and a 404 carries the REQUESTED path, so there is no
                  prefix to name. Next gives a root layout no signal that
                  not-found.tsx rather than a page rendered, so this mount cannot
                  branch on it.
                  PROPOSED additive kit fix, not built: not-found.tsx renders a
                  marker its subtree can see (a context flag, or a
                  `data-not-found` attribute the provider reads on mount) and
                  WidgetConfig gains `hideOnNotFound?: boolean` that the kit's
                  SpecialistWidget ANDs into its existing `if (!ctx) return null`.
                  Owner call: an auto-opening enquiry dialog on a not-found page is
                  a judgement he has not made. */}
              <div className="print:hidden">
                <SpecialistWidget />
              </div>
            </SupportProvider>
          </AnalyticsProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
