"use client";

import { FileBadge } from "lucide-react";
import { SiteHeader as KitSiteHeader } from "@accounting-network/web-shared/design/chrome/SiteHeader";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { siteConfig } from "@/config/site";

/**
 * P1-2: kit `SiteHeader` adoption. This wrapper is the only thing this site's
 * own header markup any longer contains; PageShell keeps calling `<SiteHeader />`
 * with no props (P1-4 owns PageShell and has not landed yet), so every kit prop
 * is supplied here from `siteConfig`/niche literals.
 *
 * Every prop below is passed EXPLICITLY, per DESIGN_DELTA.md and PHASE_PLAN.md
 * §B.3 — see docs/contractors-ir35/_port/P1-2_HEADER.md for the value-by-value
 * rationale. Nothing is left to a kit default.
 */
export function SiteHeader() {
  return (
    <KitSiteHeader
      nav={siteConfig.nav as NavItem[]}
      ctaPrimary={{ label: "Book a free call", href: "/contact" }}
      // New header funnel series (PHASE_PLAN §B.3 / DESIGN_DELTA §"this site does not
      // preserve a header goal, it introduces one" — the pre-port header carried zero
      // `data-cta-goal` attributes anywhere). Chosen deliberately rather than left to
      // the kit's Property-convention defaults ("form" / "mobile_menu"), so this
      // site's brand-new series reads as its own decision, not an accidental copy.
      ctaContactGoal="contact"
      ctaMobilePlacement="header_mobile"
      // Brand hex #0e7490 is cyan-700, one step darker than the kit's default
      // primary-600 (#0891b2, 3.68:1, fails both as text on white and as a button
      // ground). #0e7490 measures 5.36:1 in both roles. Mandatory per DESIGN_DELTA
      // §1 "ALSO REQUIRED when the kit chrome lands"; a sibling site shipped the
      // failing default once already.
      wordmarkAccentColor="#0e7490"
      wordmarkIcon={FileBadge}
      wordmarkTop="CONTRACTOR TAX"
      wordmarkBottom="ACCOUNTANTS · IR35 SPECIALISTS"
    />
  );
}
