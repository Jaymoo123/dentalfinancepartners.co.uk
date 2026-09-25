"use client";

import type { ReactNode } from "react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { siteConfig } from "@/config/site";

/**
 * Site chrome = packages/web-shared/design/chrome/PageShell.tsx. This file is
 * only the per-site wiring (brand strings, CTA copy, analytics ids, slots); no
 * chrome markup lives here and nothing restyles the kit inline.
 *
 * Client component by necessity, and the reason this wrapper exists at all
 * rather than layout.tsx calling the kit shell directly: the kit takes an icon
 * COMPONENT (wordmarkIcon) and a ReactNode slot (consentToggle), and neither a
 * function nor a rendered client node can cross the RSC boundary as a prop from
 * a server layout. charities, generalist and Solicitors each have exactly this
 * file for exactly this reason.
 *
 * `nav` is plain data built server-side in layout.tsx so the calculator
 * registry's compute functions never reach the client bundle; the kit forwards
 * the one list to both header and footer.
 */

/**
 * DECLINED: lucide-react, the icon source every other ported site passes as
 * `wordmarkIcon`. It is declared by packages/web-shared/package.json and
 * resolves here only by hoisting - it is NOT in ecommerce/web/package.json, and
 * an import that resolves only by hoisting builds locally and fails a clean
 * install. `WordmarkIcon` is a structural type (className, strokeWidth,
 * aria-hidden, style), so eight lines of inline SVG satisfy it with no
 * dependency at all. ponytail: swap to lucide if this site ever declares it.
 */
function SellerMark({ className, strokeWidth = 2, style }: {
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M4 7h16l-1.2 12.1a1.8 1.8 0 0 1-1.8 1.6H7a1.8 1.8 0 0 1-1.8-1.6Z" />
      <path d="M8.5 10V6.2a3.5 3.5 0 0 1 7 0V10" />
    </svg>
  );
}

// "Ecommerce Finance" split across the kit's two-line lockup.
const wordmark = {
  wordmarkIcon: SellerMark,
  wordmarkTop: "Ecommerce",
  wordmarkBottom: "Finance",
};

export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  return (
    <KitPageShell
      nav={nav}
      header={{
        // niche.config.json cta.sticky_button, unchanged.
        ctaPrimary: { label: "Get in touch", href: "/contact" },
        // Kit defaults are Property's "form" / "mobile_menu". This site has no
        // header CTA at all before this port, so neither value is being
        // preserved - both are INTRODUCED, and they are set here so the first
        // vw_cta_performance rows this site ever writes read as this site's own
        // funnel rather than as Property's literals. "contact" is what the
        // button actually does (it goes to /contact, not to a pricing page);
        // "header_mobile" names where the drawer CTA sits, which is the value
        // charities, generalist and Solicitors all emit. The placement is the
        // easy one to get wrong: it renders only while the drawer is open, so
        // no SSR crawl and no page-source review can ever catch it.
        ctaContactGoal: "contact",
        ctaMobilePlacement: "header_mobile",
        // ctaIds left at the kit defaults: this site has only two data-cta
        // attributes in total (both on /thank-you), so there is no id history
        // to preserve.
        //
        // Passed explicitly rather than left to default. The default falls back
        // to the primary-600 ramp step, which IS #9e6615 here, so this is the
        // same colour - but it is stated because the brand hex #c9861b is the
        // value a reader expects, and #c9861b is 3.04 on white: graphic-grade
        // only, and the wordmark rule sits directly above text. #9e6615 is 4.81
        // on white and is the same colour as the header CTA's ground, so the
        // header reads as one amber rather than two.
        wordmarkAccentColor: "#9e6615",
        ...wordmark,
      }}
      footer={{
        description: siteConfig.description,
        footerLinks: siteConfig.footer,
        legalDisclosure: siteConfig.company.legalDisclosure,
        legalName: siteConfig.company.legalName,
        tradingName: siteConfig.company.tradingName,
        // MANDATORY. layout.tsx runs posture="opt-out", so this button is the
        // entire opt-out mechanism and the cookie policy promises it by name.
        // The kit footer has NO consent affordance of its own - it takes this
        // slot and renders nothing if it is empty - so the local component
        // stays mounted and keeps calling
        // packages/web-shared/analytics/consent.ts. Class string re-grounded
        // for the kit footer's slate-900; wording untouched.
        consentToggle: (
          <ConsentToggle className="inline-block shrink-0 py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
        ),
        // Kit default is Property's /landlord-tax, which 404s here. /vat is
        // this site's hub-shaped section (5 children); /for is audience-shaped,
        // not resource-shaped, and keeps its own header entry.
        resourcesHref: "/vat",
        // Kit default includes /locations, which 404s here
        // (niche.config.json "locations": []). /book is a real 200 route that
        // nothing on the site linked to, so it also closes that orphan.
        companyItems: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Book a consultation", href: "/book" },
        ],
        // showBuilderCredit omitted deliberately: default true is the owner's
        // estate-wide ruling 2026-09-11. Note it is a NEW visible line and a
        // new followed outbound link on every page of this site.
        ...wordmark,
      }}
    >
      {children}
    </KitPageShell>
  );
}
