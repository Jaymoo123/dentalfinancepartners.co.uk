"use client";

import type { ReactNode } from "react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { getActiveCta } from "@accounting-network/web-shared/lib/niche-config";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { DentalMark } from "@/components/brand/DentalMark";
import { DentistsBackdrop } from "@/components/layout/DentistsBackdrop";
import { SisterSites } from "@/components/layout/SisterSites";
import { siteConfig } from "@/config/site";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { niche } from "@/config/niche-loader";
// ExitIntentModal unmounted: SpecialistWidget (mounted in layout.tsx) subsumes
// exit-intent and handles the stand-down. Component file kept on disk for revert.

const activeCta = getActiveCta(niche);

/**
 * The two halves of the visible wordmark, shared by header and footer so the
 * two lockups cannot drift. Sentence case: the kit uppercases in CSS, so
 * capitals here would produce a shouted accessible name. The kit builds the
 * home link's accessible name from these, which is also the fix for the old
 * lockup's WCAG 2.5.3 (Label in Name) defect: the accessible name is now
 * exactly the visible text plus ", home", not the visible text plus a
 * different, off-screen tagline.
 *
 * Declared here rather than imported: the file that held them
 * (BrandWordmarkHomeLink.tsx) is retired by this change.
 *
 * No `wordmarkAccentColor`. The kit default is the primary-600 ramp step,
 * which on this site IS the brand navy ramp, so there is no second-colour
 * problem to solve. Gold is barred from this slot: on the white header ground
 * gold measures 2.75 and gold-strong 3.76, both under the 3:1 graphics floor.
 */
const wordmark = {
  wordmarkIcon: DentalMark,
  wordmarkTop: "Dental Finance",
  wordmarkBottom: "Partners",
};

/**
 * Site chrome = the shared kit's PageShell. This file is only the per-site
 * wiring (brand strings, CTA copy, analytics ids, slots); no chrome markup
 * lives here any more, and nothing restyles the kit inline.
 *
 * Client component by necessity: the kit shell takes an icon component and two
 * ReactNode slots, which cannot cross the RSC boundary as props. `nav` is plain
 * data, built server-side in layout.tsx by `buildPrimaryNav()` so the tool
 * registry never reaches the client bundle. The kit's own `fallbackNav` is
 * deliberately NOT used: it is the unfiltered, group-less list, and taking it
 * would drop the Calculators groups and 13 links.
 *
 * StickyCTA IS mounted here, site-wide, exactly as the pre-port shell did
 * (18b4f25f PageShell.tsx:26). Manager decision 2026-09-11: this site is NOT
 * Property. 83% of sessions land on blog articles and sticky_cta is one of only
 * seven data-cta ids that has ever fired here, so narrowing it to the homepage
 * would remove a live capture surface from ~281 routes. That is a cadence change
 * on a capture surface and is an OWNER decision, not a port decision.
 * Superseded note: the phase 2 plan recommended homepage-only
 * (app/page.tsx), matching Property and generalist. The kit shell mounts none.
 */
export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  return (
    <KitPageShell
      nav={nav}
      header={{
        ctaPrimary: activeCta.header_primary,
        // Undefined under the live `leadgen` variant, which defines
        // header_primary only, so the xl: secondary link renders nothing.
        ctaSecondary: activeCta.header_secondary,
        ctaVariant: niche.cta.variant,
        // This site's EXISTING live `vw_cta_performance` ids, kept verbatim.
        // The mixed hyphen/underscore convention is pre-existing; renaming any
        // of them to the kit defaults would break the live reporting series.
        ctaIds: {
          primary: "header-nav-cta",
          mobilePrimary: "header-mobile-cta",
          secondary: "header_nav_secondary",
        },
        // Pre-port values, kept. This site's header emitted
        // data-cta-goal="contact" and data-cta-placement="header_mobile"; the
        // kit defaults to Property's "form" and "mobile_menu". Both are live
        // vw_cta_performance segmentation values carried in the same cta_click
        // payload, so letting either flip would split this site's funnel
        // history at the port boundary and read later as a drop that never
        // happened.
        ctaContactGoal: "contact",
        ctaMobilePlacement: "header_mobile",
        ...wordmark,
      }}
      footer={{
        description: siteConfig.description,
        // Legal-only row: /locations moves to companyItems, where the kit puts
        // a real destination rather than a policy link. No link is lost.
        footerLinks: siteConfig.footer.filter((item) => item.href !== "/locations"),
        // The old footer printed the domain under the copyright line; the kit
        // footer has no domain slot, so it folds in here rather than dropping.
        legalDisclosure: `${siteConfig.company.legalDisclosure} Website: ${siteConfig.domain}.`,
        legalName: siteConfig.company.legalName,
        tradingName: siteConfig.company.tradingName,
        ...wordmark,
        backdrop: <DentistsBackdrop tone="navy" />,
        consentToggle: (
          <ConsentToggle className="inline-block py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
        ),
        // Kit default is Property's /landlord-tax; without this override the
        // Resources column derives from an href this nav does not carry and
        // renders empty, which the kit then drops entirely.
        resourcesHref: "/dental-guides",
        // Kit default includes /book, which here is noindex,nofollow and must
        // never be a public footer destination. /research takes its place: a
        // real hub with four children and no other chrome presence.
        companyItems: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Locations", href: "/locations" },
          { label: "Research", href: "/research" },
        ],
        newsletterSlot: <SisterSites />,
        // showBuilderCredit deliberately omitted: the kit default is true and
        // the owner ruled on 2026-09-11 that the studio credit is estate-wide.
      }}
    >
      {children}
      <StickyCTA />
    </KitPageShell>
  );
}
