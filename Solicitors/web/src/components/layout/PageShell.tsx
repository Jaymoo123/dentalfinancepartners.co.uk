"use client";

import type { ReactNode } from "react";
import { Scale } from "lucide-react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { getActiveCta } from "@accounting-network/web-shared/lib/niche-config";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { SolicitorsBackdrop } from "@/components/layout/SolicitorsBackdrop";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { WORDMARK_TOP, WORDMARK_BOTTOM } from "@/components/brand/BrandWordmarkHomeLink";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
// ExitIntentModal unmounted: SpecialistWidget (mounted in layout.tsx) subsumes
// exit-intent and handles the stand-down. Component file kept on disk for revert.

const activeCta = getActiveCta(niche);

const wordmark = {
  wordmarkIcon: Scale,
  wordmarkTop: WORDMARK_TOP,
  wordmarkBottom: WORDMARK_BOTTOM,
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
          // This site's EXISTING live `vw_cta_performance` ids, kept verbatim.
          // The mixed hyphen/underscore convention is pre-existing; renaming any
          // of them to the kit defaults would break the live series and would
          // need a deploy-watch baseline restatement in the same commit.
          ctaIds: {
            primary: "header-book-call",
            mobilePrimary: "mobile-menu-book-call",
            secondary: "header_nav_secondary",
          },
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
          backdrop: <SolicitorsBackdrop tone="navy" />,
          consentToggle: (
            <ConsentToggle className="inline-block py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
          ),
          // Kit default is Property's /landlord-tax; without this override the
          // Resources column renders empty.
          resourcesHref: "/solicitor-guides",
          // Kit default includes /book, which exists here but is token-gated
          // post-submit and must never be a public footer destination.
          companyItems: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Locations", href: "/locations" },
            { label: "Free firm health check", href: "/free-firm-health-check" },
          ],
        }}
      >
        {children}
      </KitPageShell>
      {/*
       * StickyCTA is re-mounted deliberately, site-wide. The kit shell mounts
       * none and Property mounts it on the homepage only; narrowing it here
       * would be a cadence change to an existing capture surface on ~281 URLs
       * mid-port, which would make the before/after conversion read unusable.
       * Trigger, timing and dismissal are untouched. Its own route guard
       * already suppresses /admin, /embed* and (in packages mode) /pricing, so
       * the chrome-free embed routes stay chrome-free with no guard here.
       */}
      <StickyCTA />
    </>
  );
}
