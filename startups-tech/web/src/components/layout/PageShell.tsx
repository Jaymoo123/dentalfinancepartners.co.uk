"use client";

import type { ReactNode } from "react";
import { Cpu } from "lucide-react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { siteConfig } from "@/config/site";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";

/**
 * Site chrome = packages/web-shared/design/chrome/PageShell.tsx. This file is
 * only the per-site wiring (brand strings, CTA copy, analytics ids, slots); no
 * chrome markup lives here and nothing restyles the kit inline.
 *
 * Before this file existed the site had NO header, NO footer, NO <nav>, NO
 * mobile drawer, NO <main> landmark and NO skip link on any of its 30 routes
 * (`docs/startups-tech/_port/P0E_STRUCTURAL_INVENTORY.md` section 1). This is
 * net-new chrome construction, not a restyle, so nothing here is preserving a
 * pre-port behaviour and every value below is a decision with a reason.
 *
 * Client component by necessity, and the reason this wrapper exists at all
 * rather than layout.tsx calling the kit shell directly: the kit takes an icon
 * COMPONENT (wordmarkIcon) and a ReactNode slot (consentToggle), and neither a
 * function nor a rendered client node can cross the RSC boundary as a prop from
 * a server layout. charities, generalist, Solicitors and ecommerce each have
 * exactly this file for exactly this reason.
 *
 * `nav` is plain data built server-side in layout.tsx so the calculator
 * registry's compute functions never reach the client bundle; the kit forwards
 * the one list to both header and footer.
 */

/**
 * `wordmarkIcon`: lucide's `Cpu`. lucide-react IS declared by
 * startups-tech/web/package.json (`^0.475.0`), so this is a real dependency and
 * not a hoisting accident (ecommerce had to hand-roll an SVG because lucide was
 * only hoisted there). `Cpu` over `Rocket`: the reader arriving here has an R&D
 * claim, an EMI valuation or an advance assurance problem, and rocket
 * iconography reads as pitch-deck decoration. `Cpu` also stays legible at the
 * header's 20px and the footer's 24px, which `CircuitBoard` does not.
 *
 * There is no image asset to carry over: niche.config.json declares
 * `brand.logo_path` = "/brand/logo.png" and `web/public/brand/` does not exist,
 * so the site has never rendered a logo or a wordmark of any kind. No image file
 * is created here; the kit's text lockup is the wordmark.
 */
// "Founder Tax Partners" (niche.config.json display_name) across the kit's
// two-line lockup, the same split ecommerce uses for "Ecommerce Finance".
const wordmark = {
  wordmarkIcon: Cpu,
  wordmarkTop: "Founder Tax",
  wordmarkBottom: "Partners",
};

export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  return (
    <KitPageShell
      nav={nav}
      header={{
        // niche.config.json cta.sticky_button, unchanged. href is /contact and
        // NOT /contact#form: app/contact/page.tsx has no element with id="form"
        // (its only id-bearing candidate is none at all), and that page is not
        // this package's to edit, so an anchor would be a link to nothing.
        ctaPrimary: { label: "Get in touch", href: "/contact" },
        // No ctaSecondary and no phone number anywhere in the chrome. Owner
        // ruling 2026-09-29: the header carries no phone number, and
        // niche.config.json contact.phone "+44 20 0000 0000" is a placeholder.
        //
        // Kit defaults are Property's "form" / "mobile_menu". Passed explicitly
        // even though both are the kit default, because this site had no header
        // CTA before this port and therefore no pre-port goal or placement to
        // preserve: there is not one `data-cta-goal` anywhere in src and the
        // single `data-cta-placement` is "thank_you" on an outbound return link.
        // These are the first rows this site will ever write to
        // vw_cta_performance, so they are stated rather than inherited silently.
        // The placement is the easy one to miss: it renders only while the
        // mobile drawer is open, so no SSR crawl and no page-source review can
        // ever catch it, only the shipped client bundle.
        ctaContactGoal: "form",
        ctaMobilePlacement: "mobile_menu",
        // ctaIds left at the kit defaults (header_book / header_book_mobile /
        // header_contact): this site has exactly one authored `data-cta` in
        // total, on /thank-you, so there is no id history to preserve.
        //
        // Passed explicitly rather than left to default. #4f46e5 is this site's
        // niche.config.json brand.primary_color AND the indigo-600 ramp step the
        // tokens package mints, so this is expected to be the same colour the
        // default resolves to; it is stated because the brand hex is the value a
        // reader expects to find, and because the header's button ground is the
        // 700 step #4338ca, so the wordmark and the button are deliberately two
        // steps of one indigo rather than an accident.
        wordmarkAccentColor: "#4f46e5",
        ...wordmark,
      }}
      footer={{
        description: siteConfig.description,
        footerLinks: siteConfig.footer,
        legalDisclosure: siteConfig.company.legalDisclosure,
        legalName: siteConfig.company.legalName,
        tradingName: siteConfig.company.tradingName,
        // MANDATORY. layout.tsx runs posture="opt-out", so this button is the
        // site's only on-site opt-out mechanism. The kit footer has NO consent
        // affordance of its own: it takes this slot and renders nothing if it is
        // empty. Class string grounded for the kit footer's slate-900; the
        // wording lives in the component.
        consentToggle: (
          <ConsentToggle className="inline-block shrink-0 py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
        ),
        // The per-site motif, in the slot the kit provides for it. The kit
        // footer is already `relative overflow-hidden` with `relative z-10`
        // content, which is the backdrop's host contract.
        backdrop: <StartupsBackdrop />,
        // Kit default is Property's /landlord-tax, which 404s here. The kit
        // derives the whole Resources column from the CHILDREN of the nav item
        // whose href equals this value, so it must be a real nav href:
        // "/research" is NOT one. niche.config.json's Research nav entry points
        // at /research/startup-formation-survival-index and the owner ruling
        // keeps that href exactly as configured, so the column derives from
        // that item, whose first child is the /research hub itself.
        resourcesHref: "/research/startup-formation-survival-index",
        // Kit default includes /locations, which 404s here (niche.config.json
        // "locations": []). These five are the site's own company routes, all
        // 200.
        companyItems: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy policy", href: "/privacy-policy" },
          { label: "Terms", href: "/terms" },
          { label: "Cookie policy", href: "/cookie-policy" },
        ],
        // showBuilderCredit omitted deliberately: default true is the owner's
        // estate-wide ruling 2026-09-11. Note it is a NEW visible line and a new
        // followed outbound link on every page of this site.
        ...wordmark,
      }}
    >
      {children}
    </KitPageShell>
  );
}
