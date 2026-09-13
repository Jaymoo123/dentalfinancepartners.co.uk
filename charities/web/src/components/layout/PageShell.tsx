"use client";

import type { ReactNode } from "react";
import { HeartHandshake } from "lucide-react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { WORDMARK_TOP, WORDMARK_BOTTOM } from "@/components/layout/wordmark";
import { siteConfig } from "@/config/site";

/**
 * Site chrome = the shared kit's PageShell. This file is only the per-site
 * wiring (brand strings, CTA copy, analytics ids, slots); no chrome markup
 * lives here, and nothing restyles the kit inline.
 *
 * Client component by necessity, and the reason this wrapper file exists at all
 * rather than the kit shell being called straight from layout.tsx: the kit
 * takes an icon COMPONENT (wordmarkIcon) and a ReactNode slot (consentToggle),
 * and a function cannot cross the RSC boundary as a prop. generalist and
 * Solicitors both have exactly this file for exactly this reason.
 *
 * `nav` is plain data, built server-side in layout.tsx by buildPrimaryNav() so
 * the calculator registry never reaches the client bundle, and the kit forwards
 * the one list to both header and footer.
 *
 * No brand mark file exists on this site, so the wordmark is the kit's
 * typographic lockup (two lines plus a rule) with a lucide icon, the treatment
 * generalist and Solicitors use. The icon is a builder default, carried over
 * from the footer package; the strings live in ./wordmark.ts so both lockups
 * read one source.
 *
 * wordmarkAccentColor is deliberately not passed: --color-primary-600 is
 * #1a5c4a, the same value as --brand-primary (globals.css), so the wordmark and
 * the CTA already render one green.
 */
const wordmark = {
  wordmarkIcon: HeartHandshake,
  wordmarkTop: WORDMARK_TOP,
  wordmarkBottom: WORDMARK_BOTTOM,
};

// The old local footer carried this editorial-scope line next to the copyright
// and the kit has no slot for it. Site identity wording is an open owner
// decision, so it is carried over verbatim on the legal disclosure rather than
// being dropped or reworded.
const IDENTITY_LINE =
  "Specialist charity accountants. Editorial content only. Speak to us for advice specific to your organisation.";

export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  return (
    <KitPageShell
      nav={nav}
      header={{
        // niche.config.json cta.sticky_button is already "Get in touch".
        ctaPrimary: { label: "Get in touch", href: "/contact" },
        // The kit defaults to Property's "form" / "mobile_menu". This site has
        // no rendered header CTA history to preserve, so both are set
        // explicitly as the values this site starts its series on. The drawer
        // placement is the easy one to miss: the drawer CTA exists only while
        // the menu is open, so no SSR crawl can catch a wrong value.
        ctaContactGoal: "contact",
        ctaMobilePlacement: "header_mobile",
        // ctaIds left at the kit defaults: no id history exists to preserve,
        // and the globals.css CTA-visibility override keys on header_book.
        ...wordmark,
      }}
      footer={{
        description: siteConfig.description,
        footerLinks: siteConfig.footer,
        legalDisclosure: `${siteConfig.company.legalDisclosure} ${IDENTITY_LINE}`,
        legalName: siteConfig.company.legalName,
        tradingName: siteConfig.company.tradingName,
        // Mandatory: posture="opt-out" (layout.tsx) makes this button the whole
        // opt-out mechanism, and the cookie policy describes it.
        // Class string re-grounded for the kit footer's slate-900.
        consentToggle: (
          <ConsentToggle className="text-xs text-slate-400 hover:text-white transition-colors underline hover:no-underline inline-block py-1" />
        ),
        // Kit default is Property's /landlord-tax, which does not exist here.
        resourcesHref: "/guides",
        // Kit default includes /locations, which does not exist here.
        companyItems: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Book a consultation", href: "/book" },
        ],
        // showBuilderCredit omitted deliberately: default true is the owner's
        // estate-wide ruling 2026-09-11.
        ...wordmark,
      }}
    >
      {children}
    </KitPageShell>
  );
}
