"use client";

import type { ReactNode } from "react";
import { Coins } from "lucide-react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { siteConfig } from "@/config/site";

/**
 * Site chrome = the shared kit's PageShell (header, skip link, <main id="main">,
 * footer). This file is only the per-site wiring: brand strings, CTA copy,
 * analytics ids, route overrides. No chrome markup lives here and nothing
 * restyles the kit inline.
 *
 * Client component by necessity, and the reason this wrapper exists at all
 * rather than layout.tsx calling the kit shell directly: `wordmarkIcon` is typed
 * as a component function (design/chrome/SiteHeader.tsx:88) and a function
 * cannot cross the RSC boundary as a prop. generalist, Solicitors and charities
 * all carry exactly this file for exactly this reason.
 *
 * `nav` is plain data, built server-side by buildPrimaryNav() in ./nav.ts so the
 * calculator registry never reaches the client bundle. The kit forwards the one
 * list to both header and footer, so the footer columns cannot drift from the
 * header.
 */

// Two-line typographic lockup, the treatment generalist/Solicitors/charities use
// (this site has no brand mark file). Split of the trading name itself, so the
// lockup makes no claim the site does not already make.
const wordmark = {
  wordmarkIcon: Coins,
  wordmarkTop: "CRYPTO TAX",
  wordmarkBottom: "PARTNERS",
};

/**
 * The wordmark icon and rule carry NAVY, not the primary-600 ramp step.
 *
 * globals.css moved --color-primary-600 to the burnt-orange action hue #8f421f
 * while the brand ground stayed navy #0e1a3a, and --btn-ground is navy too. Left
 * at the kit default the header would show an orange wordmark beside a navy
 * button: two identities in one bar, which is exactly the fault this prop was
 * added for (Solicitors' two reds). Navy on white measures ~16:1.
 *
 * The FOOTER lockup is deliberately untouched: it sits on the kit's slate-900,
 * where primary-400 is the correct on-dark step and a mid-tone navy would fail.
 */
const WORDMARK_ACCENT = "#0e1a3a";

export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  return (
    <KitPageShell
      nav={nav}
      header={{
        // niche.config.json cta.sticky_button.
        ctaPrimary: { label: "Get in touch", href: "/contact" },
        // ctaContactGoal / ctaMobilePlacement / ctaIds all left at the kit
        // defaults ("form" / "mobile_menu" / header_book*). This site has never
        // rendered a header CTA, so there is no vw_cta_performance history to
        // split, and the defaults are the values this site starts its series on.
        // The one pre-existing data-cta on the site (thankyou-return-article,
        // /thank-you) is untouched by this shell.
        // The globals-adjacent CTA-visibility override below keys on
        // data-cta="header_book", so ctaIds must stay at the default.
        wordmarkAccentColor: WORDMARK_ACCENT,
        ...wordmark,
      }}
      footer={{
        // The pre-port local footer rendered siteConfig.tagline in this slot.
        // Carried over verbatim rather than swapped for siteConfig.description,
        // which says "accountants" where the tagline says "specialists".
        description: siteConfig.tagline,
        // Legal/secondary row only. niche.footer_links is the stale flat list
        // (Contact/Blog/Privacy) that the nav-derived columns now cover.
        footerLinks: [
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Cookie Policy", href: "/cookie-policy" },
          { label: "Terms", href: "/terms" },
        ],
        legalDisclosure: siteConfig.company.legalDisclosure,
        legalName: siteConfig.company.legalName,
        tradingName: siteConfig.company.tradingName,
        // This site has no ConsentToggle component. Reported, not invented:
        // adding one is new UI on a site that currently has none.
        consentToggle: null,
        // Kit default is Property's /landlord-tax, which 404s here.
        resourcesHref: "/for",
        // Kit default includes /locations, which 404s here (niche.locations is
        // empty: this site has no locations surface).
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
