"use client";

import type { ReactNode } from "react";
import { Stethoscope } from "lucide-react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { getActiveCta } from "@accounting-network/web-shared/lib/niche-config";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { SpecialistWidget } from "@/components/support/SpecialistWidget";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

const activeCta = getActiveCta(niche);

/** The visible wordmark strings, carried over verbatim from the retired
 *  BrandWordmarkHomeLink ("Medical" / "Accountants UK"). The kit builds the
 *  accessible name from them, so changing either changes the home link's
 *  accessible name (WCAG 2.5.3). */
const wordmark = {
  wordmarkIcon: Stethoscope,
  wordmarkTop: "Medical",
  wordmarkBottom: "Accountants UK",
  // No wordmarkAccentColor: the brand copper #b87333 measures 3.79 on white,
  // under the 4.5 text floor and only just past the 3:1 graphics floor, and the
  // button beside it already renders on --btn-ground #a0622b rather than the raw
  // brand hex (DESIGN_DELTA section 1). The kit's primary-600 ramp step is the
  // same amber family as the button, so there is no two-coppers problem to fix.
};

/**
 * Site chrome = the shared kit's PageShell. This file is only the per-site
 * wiring (brand strings, CTA copy, analytics ids, slots); no chrome markup
 * lives here any more, and nothing restyles the kit inline.
 *
 * Client component by necessity: the kit shell takes an icon component and two
 * ReactNode slots, which cannot cross the RSC boundary as props. `nav` is plain
 * data, built server-side in layout.tsx by `buildPrimaryNav()` so the tool
 * registry never reaches the client bundle. The kit's `fallbackNav` is
 * deliberately NOT passed: it is the group-less list, so taking it would drop
 * the Calculators panel.
 */
export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  return (
    <>
      <KitPageShell
        nav={nav}
        header={{
          ctaPrimary: activeCta.header_primary,
          ctaSecondary: activeCta.header_secondary,
          ctaVariant: niche.cta.variant,
          // This site's EXISTING live vw_cta_performance ids, kept verbatim.
          // The mixed hyphen/underscore convention is pre-existing; renaming any
          // of them to the kit defaults would break the live series.
          ctaIds: {
            primary: "nav-book-call",
            mobilePrimary: "mobile-nav-book-call",
            secondary: "header_nav_secondary",
          },
          // Pre-port, SiteHeader.tsx:105 computed this as "contact" for the
          // /contact href and the kit's literal is "form". Both describe the
          // same destination, but goal is a live vw_cta_performance
          // segmentation value, so letting it flip would split this site's own
          // funnel history at the port boundary and read as a drop.
          ctaContactGoal: "contact",
          // Pre-port the drawer primary emitted NO placement at all
          // (SiteHeader.tsx:185-187), so any value here is new rather than a
          // flipped one. "header_mobile" is this site's own convention for the
          // drawer, already emitted by its drawer secondary at :196; the kit
          // default "mobile_menu" would invent a second name for one surface.
          ctaMobilePlacement: "header_mobile",
          ...wordmark,
        }}
        footer={{
          description: siteConfig.description,
          footerLinks: siteConfig.footer,
          // The old footer printed the domain under the copyright line; the kit
          // footer has no domain slot, so it folds in here rather than dropping.
          legalDisclosure: `${siteConfig.company.legalDisclosure} Website: ${siteConfig.domain}.`,
          legalName: siteConfig.company.legalName,
          tradingName: siteConfig.company.tradingName,
          ...wordmark,
          backdrop: <MedicalBackdrop tone="navy" />,
          consentToggle: (
            <ConsentToggle className="inline-block py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
          ),
          // Kit default is Property's /landlord-tax; without this override the
          // Resources column renders empty.
          resourcesHref: "/medical-guides",
          // Kit default includes /book, which exists here but is a token-gated
          // post-submit surface and must never be a public footer destination.
          companyItems: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Locations", href: "/locations" },
            // "Free practice health check" is deliberately NOT here: it is a
            // child of "Who we help" in the nav, so the derived Services column
            // already carries it, and listing it in both columns rendered the
            // same label twice in one footer bar.
          ],
          // Owner decision 2026-09-11: the studio credit appears estate-wide,
          // not only on the site they designed. This reverses the earlier
          // showBuilderCredit={false} note in the port README.
          showBuilderCredit: true,
        }}
      >
        {children}
      </KitPageShell>
      {/*
       * StickyCTA is re-mounted deliberately, site-wide. The kit shell mounts
       * none and Property mounts it on the homepage only; narrowing it here
       * would be a cadence change to an existing capture surface mid-port and
       * would make the before/after conversion read unusable. Trigger, timing
       * and dismissal are untouched. Its own route guard already suppresses
       * /admin, /embed* and (in packages mode) /pricing.
       *
       * It used to be mounted here AND again at app/page.tsx:221, so the
       * homepage rendered two stacked bars and dismissing one left the other.
       * The homepage mount is removed in this commit.
       */}
      <StickyCTA />
      {/* SpecialistWidget: deterministic Phase-0 assistant (no LLM).
          ExitIntentModal retired (confirmed conversion loser); the widget still
          sets ma_assistant_active="1" on mount, now a harmless no-op. */}
      <SpecialistWidget />
    </>
  );
}
