"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Pill } from "lucide-react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import type { SiteFooterProps } from "@accounting-network/web-shared/design/chrome/SiteFooter";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { StickyCTA } from "@/components/ui/StickyCTA";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";

/**
 * P1-C. Site chrome now comes from the shared kit's chrome shell, imported
 * directly above. This file is only the per-site wiring (brand strings, CTA
 * ids, slots). It replaces the two hand-rolled local chrome components (the
 * site header and site footer), both DELETED in the same edit, and the phase-0
 * local shell this file used to be.
 *
 * What the kit adds that the site did not have: the skip link, the single main
 * landmark (id `main`, `flex-1 scroll-mt-24`), the footer link columns derived
 * from the nav, and the drawer focus trap.
 *
 * Client component by necessity, and the reason this wrapper exists rather than
 * layout.tsx calling the kit shell directly: the kit takes an icon COMPONENT
 * (`wordmarkIcon`) and ReactNode slots (`consentToggle`, `backdrop`), and
 * neither a function nor a rendered client node crosses the RSC boundary as a
 * prop from a server layout.
 *
 * `nav` is plain data built server-side in layout.tsx; the kit forwards the one
 * list to both header and footer so they cannot drift.
 *
 * `bypassWhen` is deliberately NOT passed. This site ships exactly one
 * embeddable family, the `/embed/[slug]` PREFIX, which the kit matches built-in
 * (kit PageShell.tsx:47) — the same bypass the phase-0 local shell did by hand.
 * Hospitality's suffix predicate (`/research/<slug>/embed`) has no counterpart
 * here, so copying it would add an unreachable branch.
 */

/**
 * The wordmark lockup. The site rendered `siteConfig.name` as plain text before
 * this port: no icon, no <img>. No image asset exists either —
 * niche.config.json declares brand.logo_path "/brand/logo.png" and
 * web/public/brand/ does not exist — so the kit's TEXT lockup is the wordmark.
 * `Pill` is lucide-react (^1.17.0, a declared dep; export confirmed in
 * node_modules/lucide-react/dist/lucide-react.d.ts before wiring).
 *
 * The two lines are LITERALS rather than a display-name derivation, so an edit
 * to niche.display_name cannot silently rename the wordmark.
 */
const wordmark = {
  wordmarkIcon: Pill,
  wordmarkTop: "PHARMACY",
  wordmarkBottom: "TAX",
};

/**
 * G1 fix 2. R1 finding S5: "the footer reads thin and broken next to Property"
 * (four of the five columns were a heading over a single self-link).
 *
 * The kit footer does NOT read a link list from its own props: it derives every
 * column from the `nav` array (SiteFooter.tsx buildFooterColumns), and a nav
 * item with no `children` self-links. P1-C passed the header's flat six-item
 * nav, so four columns rendered one link each. This is the same nav array,
 * carrying the children the footer needs.
 *
 * Why a separate footer nav rather than enriching the one `layout.tsx` builds:
 * the kit shell forwards ONE nav to the header AND the footer, so children on
 * `/services` and `/for` would also turn both header items into dropdowns: a
 * visible header change on 55 routes that no package declared. The kit spreads
 * `footer` AFTER its own `nav={nav}` (kit PageShell.tsx:63), so the `nav` key on
 * the footer props object below replaces the footer's copy only. Handoff 5.
 *
 * Why literals rather than importing the data modules: this file is
 * `"use client"`. Importing `@/data/pharmacies-services`, `pharmacies-hubs` or
 * `@/lib/calculators/registry` here would ship every service body, hub body and
 * calculator COMPUTE function into the client bundle on all 55 routes, the
 * exact hazard the kit's own comment names. Every label below is the published
 * `title` / `name` from those three modules, copied verbatim, no new copy.
 */
const footerNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    // The hub first (childrenOf returns ONLY the children once they exist, so
    // without this row /services would leave the footer), then the eight
    // `title` strings from src/data/pharmacies-services.ts in file order.
    children: [
      { label: "Services", href: "/services" },
      { label: "Pharmacy Purchase Accounting", href: "/services/pharmacy-purchase-accounting" },
      { label: "Pharmacy Sale, CGT and BADR", href: "/services/pharmacy-sale-cgt-badr" },
      { label: "Pharmacy Valuation and Goodwill", href: "/services/pharmacy-valuation-goodwill" },
      { label: "NHS Payment Reconciliation (FP34)", href: "/services/nhs-payment-reconciliation-fp34" },
      { label: "Pharmacy VAT and Retail Schemes", href: "/services/pharmacy-vat-retail-schemes" },
      { label: "Pharmacy Payroll and Workforce Costs", href: "/services/pharmacy-payroll-workforce" },
      { label: "Pharmacy Incorporation and Structure", href: "/services/pharmacy-incorporation-structure" },
      { label: "Pharmacy Benchmarking and Margin Analysis", href: "/services/pharmacy-benchmarking-margin" },
    ],
  },
  {
    // Fed to the kit's "Resources" slot via resourcesHref below. The heading
    // string is hardcoded in the kit, so these five audience hubs render under
    // "Resources" rather than "Audiences". Handoff 6.
    label: "For",
    href: "/for",
    children: [
      { label: "For", href: "/for" },
      { label: "Pharmacy Owners", href: "/for/pharmacy-owners" },
      { label: "Buying a Pharmacy", href: "/for/buying-a-pharmacy" },
      { label: "Selling a Pharmacy", href: "/for/selling-a-pharmacy" },
      { label: "Pharmacy Groups", href: "/for/pharmacy-groups" },
      { label: "Locum Pharmacists", href: "/for/locum-pharmacists" },
    ],
  },
  {
    // The kit's Calculators column takes `groups[].items[0]`, the FIRST item of
    // each group, up to five groups, so one group per link is the only shape
    // that reaches it. `category` is not rendered by the footer. The three
    // calculator names are `name` from src/lib/calculators/tools/*.ts; the two
    // research titles are the published h1 of each research route. The kit
    // appends its own unsuppressable "All calculators" row (P1-C handoff 1).
    label: "Calculators",
    href: "/calculators",
    groups: [
      { category: "Pharmacy Purchase Affordability Calculator", items: [{ label: "Pharmacy Purchase Affordability Calculator", href: "/calculators/pharmacy-purchase-affordability" }] },
      { category: "NHS FP34 Cash Flow Estimator", items: [{ label: "NHS FP34 Cash Flow Estimator", href: "/calculators/pharmacy-fp34-cash-flow-estimator" }] },
      { category: "Locum Pharmacist Take-Home Comparator", items: [{ label: "Locum Pharmacist Take-Home Comparator", href: "/calculators/locum-take-home-comparator" }] },
      { category: "UK Community Pharmacy Openings and Closures Index", items: [{ label: "UK Community Pharmacy Openings and Closures Index", href: "/research/pharmacy-openings-closures-index" }] },
      { category: "Pharmacy Density and Dispensing Workload Index", items: [{ label: "Pharmacy Density and Dispensing Workload Index", href: "/research/pharmacy-density-and-workload-index" }] },
    ],
  },
];

export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  const pathname = usePathname();
  // Same predicate the kit applies (its built-in `/embed/` prefix), so the
  // sticky bar below stays off the embed routes exactly as the phase-0 local
  // shell kept it off them.
  const bare = pathname?.startsWith("/embed/") ?? false;

  return (
    <>
      <KitPageShell
        nav={nav}
        header={{
          // niche.config.json cta.sticky_button, unchanged from the deleted
          // SiteHeader.tsx:32 ("Get in touch"). href /contact, unchanged.
          ctaPrimary: { label: niche.cta.sticky_button, href: "/contact" },
          // MANDATORY, not the kit defaults (header_book / header_book_mobile).
          // cta_baseline.json has header_contact|header on 55/55 routes and the
          // deleted drawer emitted header_contact_mobile. Taking the defaults
          // would rename both live vw_cta_performance series.
          ctaIds: { primary: "header_contact", mobilePrimary: "header_contact_mobile" },
          // The site's own value (deleted SiteHeader.tsx:69), NOT the kit
          // default "mobile_menu". Placement rides the same cta_click payload
          // as goal, and the drawer renders only while open, so no SSR crawl
          // can catch a flip here.
          ctaMobilePlacement: "header_mobile_menu",
          // ADDITIVE CHANGE, declared. The site emits no data-cta-goal anywhere
          // today (goal null on all three baseline triples). The kit always
          // emits the attribute and its parameter default is "form", so
          // `undefined` cannot reproduce "absent". No live goal series exists to
          // split, so this is a new dimension value on 55 routes, not a rename.
          ctaContactGoal: "form",
          // No ctaSecondary: it would mint a THIRD header CTA. Consequence, per
          // the kit's own comment (SiteHeader.tsx:466-473, :488): with no
          // secondary href the "Contact" nav item keeps its `xl:` visibility
          // instead of being hidden behind the CTA. A visible nav change,
          // measured at 1280 and recorded in the receipt, not fixed here.
          //
          // No ctaVariant: niche.config.json declares no cta.variant, so no
          // data-cta-variant attribute is emitted.
          //
          // No phone: SiteHeaderProps has no phone prop of any kind, so the "no
          // phone" ruling is satisfied structurally. niche.contact.phone is the
          // +44 20 0000 0000 placeholder and stays unrendered.
          //
          // wordmarkAccentColor is MANDATORY here and read from config, not
          // retyped: the kit default is the primary-600 ramp step, which after
          // P1-A is NOT this site's brand colour (the brand is the 950 step), so
          // the default would paint a mid-teal wordmark beside a near-black CTA.
          // The brand value this prop carries measures 12.18 on the white
          // header. Written as a config read, not a hex literal, so the gate's
          // "no hex in chrome" grep stays honest.
          wordmarkAccentColor: niche.brand.primary_color,
          ...wordmark,
        }}
        footer={{
          // G1 fix 2. Replaces the footer's copy of the nav only; see the
          // footerNav comment above for why this is not done in layout.tsx.
          nav: footerNav,
          description: siteConfig.description,
          // Expect this row to render EMPTY: the kit dedupes footerLinks
          // against every column href, and Contact/Privacy/Cookie/Terms are all
          // in companyItems while Blog is an extra column. A dedupe, not a
          // dropped link.
          footerLinks: siteConfig.footer,
          legalDisclosure: siteConfig.company.legalDisclosure,
          legalName: siteConfig.company.legalName,
          tradingName: siteConfig.company.tradingName,
          // MANDATORY: layout.tsx runs posture="opt-out" and this button is the
          // site's only on-site opt-out mechanism; the kit footer renders this
          // slot and has no consent affordance of its own. text-slate-400 on
          // the footer's bg-slate-900 ground measures 6.78. The wording lives
          // in the component and is unchanged; so does its focus ring (R1 B2).
          consentToggle: (
            <ConsentToggle className="inline-block shrink-0 py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
          ),
          // P1-E's motif layer, mounted exactly as its receipt instructs: the
          // element, no props. The kit footer is already `relative
          // overflow-hidden` with `relative z-10` content, which is the
          // backdrop's host contract.
          backdrop: <PharmaciesBackdrop />,
          // G1 fix 2. Was "/research/pharmacy-openings-closures-index", which
          // had no children and therefore self-linked into a one-link
          // "Resources" column (R1 S5). Now the audience hub, whose five
          // children are this site's /for pages. The two research routes did
          // not lose their footer place: both are in the Calculators column
          // above. The column HEADING is still the kit's hardcoded "Resources"
          // (handoff 6).
          resourcesHref: "/for",
          // G1 fix 2. Was ["/blog"], which rendered a fifth column holding the
          // single link "Blog". /blog now sits in the Company column below with
          // the other site-wide routes, so the href is kept and the stub column
          // goes. Nothing else in the nav needs an extra column: /services and
          // /for have fixed slots, /calculators is built above, and the two
          // research routes are inside it.
          extraNavHrefs: [],
          // The kit default includes /locations, which 404s here
          // (niche.config.json "locations": []). These are the site's own
          // company routes; /blog added by G1 fix 2 (see extraNavHrefs).
          companyItems: [
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Blog", href: "/blog" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms", href: "/terms" },
            { label: "Cookie Policy", href: "/cookie-policy" },
          ],
          // showBuilderCredit omitted deliberately: the kit default is true and
          // true is the owner's estate-wide ruling of 2026-09-11. It is a NEW
          // visible line and a new followed outbound link on all 55 pages.
          //
          // No newsletterSlot: owner ruling, no newsletter.
          ...wordmark,
          // The assertion carries the `nav` key above past the kit's
          // `Omit<SiteFooterProps, "nav">` prop type. The property itself is a
          // real SiteFooterProps field, so nothing unchecked is introduced; the
          // Omit exists only because the kit shell normally supplies it.
        } as Omit<SiteFooterProps, "nav">}
      >
        {children}
      </KitPageShell>
      {/* The kit shell renders skip link / header / main / footer and nothing
          else, so the sticky bar has to be re-mounted here or sticky_cta and
          sticky_cta_close disappear from 55/55 routes with the local shell. */}
      {!bare && <StickyCTA />}
    </>
  );
}
