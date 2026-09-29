"use client";

import type { ReactNode } from "react";
import { UtensilsCrossed } from "lucide-react";
import { PageShell as KitPageShell } from "@accounting-network/web-shared/design/chrome/PageShell";
import type { NavItem } from "@accounting-network/web-shared/design/chrome/nav";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";
import { UnionJack } from "@/components/brand/UnionJack";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { niche } from "@/config/niche-loader";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";

/**
 * P1-C. Site chrome = packages/web-shared/design/chrome/PageShell.tsx. This
 * file is only the per-site wiring (brand strings, CTA ids, slots); no chrome
 * markup lives here except the Union Jack strip noted below, and nothing
 * restyles the kit inline.
 *
 * It supersedes components/layout/SiteHeaderWrap.tsx (deleted): the kit
 * PageShell is the same client wrapper doing more, and it adds the skip link
 * (the site had none), the single main landmark, and the /embed/* chrome
 * bypass.
 *
 * Client component by necessity, and the reason this wrapper exists rather
 * than layout.tsx calling the kit shell directly: the kit takes an icon
 * COMPONENT (wordmarkIcon) and ReactNode slots (consentToggle, backdrop), and
 * neither a function nor a rendered client node crosses the RSC boundary as a
 * prop from a server layout.
 *
 * `nav` is plain data built server-side in layout.tsx; the kit forwards the one
 * list to both header and footer so they cannot drift.
 */

/**
 * The wordmark lockup. No image asset exists: niche.config.json declares
 * brand.logo_path "/brand/logo.png" and web/public/brand/ does not exist, so
 * the kit's TEXT lockup is the wordmark, as it already was in
 * SiteHeaderWrap.tsx. `UtensilsCrossed` is lucide-react, a declared dependency.
 *
 * The two lines are literals rather than SiteHeaderWrap's
 * niche.display_name.split(" ") derivation. Same output, and it stops an edit
 * to the display name silently renaming the wordmark.
 */
const wordmark = {
  wordmarkIcon: UtensilsCrossed,
  wordmarkTop: "HOSPITALITY",
  wordmarkBottom: "TAX",
};

/**
 * Site-authored British-flag strip, moved here VERBATIM out of the deleted
 * components/layout/SiteFooter.tsx (its lines 18-27): same markup, same
 * classes, same sentence, word for word. Owner ruling 2026-09-29: keep it, and
 * keep it where it sits relative to the footer.
 *
 * It is passed through the kit footer's `backdrop` slot, which renders as the
 * first child of <footer>, because that is EXACTLY the DOM position it occupied
 * in the local footer and the kit PageShell offers no slot between the main landmark and
 * the footer. See the P1-C receipt, kit gap 2.
 *
 * R1 G1/G2/G6 (2026-09-29): the MARKUP is still the deleted footer's, word for
 * word, but the three grey classes are not. Moved verbatim it painted a white
 * plate (the neutral 50 ground, 200 border and 500 text) on the kit's
 * slate-900 footer: it read as an unstyled leftover at the bottom of all 59
 * pages, it was the last of that grey family left inside <footer> against
 * P1-D's slate ramp, and its bottom border was invisible. Re-grounded to the footer's
 * own ramp, flag artwork unchanged: bg-slate-900 (identical to the footer
 * ground, so the strip no longer reads as a separate plate), border-slate-800
 * for the rule, and text-slate-300 on slate-900 = 12.02, past the 4.5 floor for
 * 12px text. `relative z-10` puts the strip above the absolutely positioned
 * HospitalityBackdrop, which previously composited 0.10 of #e58764 over the
 * right 55% of it: one ground, one measured row, which is what the backdrop
 * comment claims.
 */
function UnionJackStrip() {
  return (
    <div className="relative z-10 border-b border-slate-800 bg-slate-900">
      <div className={`${siteContainerLg} py-3`}>
        <div className="flex items-center gap-2.5">
          <UnionJack width={20} aria-label="Union Jack flag" />
          <p className="text-xs text-slate-300">
            Proudly British. Serving UK hospitality businesses.
          </p>
        </div>
      </div>
    </div>
  );
}

export function PageShell({ children, nav }: { children: ReactNode; nav?: NavItem[] }) {
  return (
    <KitPageShell
      nav={nav}
      /* R1 G3 (2026-09-29). The kit bypasses chrome on the `/embed/` PREFIX,
       * which is built in and still applies. This site also ships one embeddable
       * route as a SUFFIX, /research/<slug>/embed, which no prefix can match, so
       * a partner iframing that chart got our header, footer, skip link and
       * Union Jack strip inside their page. `bypassWhen` (kit PageShell.tsx:38,
       * commit 1437cb9e) is OR-ed with the built-in prefix, so this predicate
       * only ever adds routes. `/embed` with no trailing segment stays chromed:
       * that is the indexable gallery, and endsWith("/embed") on the bare
       * "/embed" path would strip the chrome off it, hence the length guard. */
      bypassWhen={(pathname) => pathname !== "/embed" && pathname.endsWith("/embed")}
      header={{
        // niche.config.json cta.sticky_button, unchanged from
        // SiteHeaderWrap.tsx:21. href /contact, unchanged.
        ctaPrimary: { label: niche.cta.sticky_button, href: "/contact" },
        // Both are the kit default, and both are passed EXPLICITLY because
        // they are live vw_cta_performance segmentation values. The pre-port
        // DOM emits header_book|header|form on all 59 routes
        // (docs/hospitality/_port/cta_baseline.json, one distinct triple), so
        // the goal is preserved by statement rather than by inheritance. The
        // drawer placement is the easy one to miss: it renders only while the
        // mobile drawer is open, so no SSR crawl can catch it, only the
        // shipped client bundle.
        ctaContactGoal: "form",
        ctaMobilePlacement: "mobile_menu",
        // ctaIds left at the kit defaults: the pre-port header already emits
        // header_book, so the default preserves the live series.
        //
        // No ctaSecondary: niche.config.json cta.sticky_primary is a sentence,
        // not a button label, and no second header CTA exists today. No
        // ctaVariant: niche.config.json declares no cta.variant, so the drawer
        // CTA emits no data-cta-variant. No phone: SiteHeaderProps has no
        // phone prop of any kind, so the owner ruling is satisfied
        // structurally.
        //
        // wordmarkAccentColor kept from SiteHeaderWrap.tsx:25, still read from
        // niche.brand.primary_color rather than retyped. After P1-A that value
        // IS the --color-primary-600 ramp step, so the wordmark and the CTA
        // ground finally read as the same brown rather than two.
        wordmarkAccentColor: niche.brand.primary_color,
        ...wordmark,
      }}
      footer={{
        description: siteConfig.description,
        footerLinks: siteConfig.footer,
        legalDisclosure: siteConfig.company.legalDisclosure,
        legalName: siteConfig.company.legalName,
        tradingName: siteConfig.company.tradingName,
        // MANDATORY. layout.tsx runs posture="opt-out", so this button is the
        // site's only on-site opt-out mechanism, and the kit footer has no
        // consent affordance of its own: it renders this slot and nothing
        // else. Class string re-grounded for the kit footer's slate-900:
        // text-slate-400 on the bg-slate-900 ground measures 6.78:1. The
        // wording lives in the component and is unchanged.
        consentToggle: (
          <ConsentToggle className="inline-block shrink-0 py-1 text-xs text-slate-400 underline hover:text-white hover:no-underline" />
        ),
        // Two nodes in one slot: the site-authored Union Jack strip in normal
        // flow (first child of <footer>, the position it held before) and the
        // P1-E motif layer absolutely positioned behind the content. The kit
        // footer is already `relative overflow-hidden` with `relative z-10`
        // content, which is the backdrop's host contract.
        backdrop: (
          <>
            <UnionJackStrip />
            <HospitalityBackdrop />
          </>
        ),
        // Kit default is Property's /landlord-tax, which 404s here. /research
        // is a real 200 route and the one hub whose children are reference
        // material. Note the Resources column derives from the CHILDREN of the
        // nav item with this href, and this site's nav declares none, so the
        // column is empty and drops out until a later phase authors them.
        resourcesHref: "/research",
        // Kit default includes /locations, which 404s here
        // (niche.config.json "locations": []). These five are the site's own
        // company routes, every one probed 200.
        companyItems: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms", href: "/terms" },
          { label: "Cookie Policy", href: "/cookie-policy" },
        ],
        // showBuilderCredit omitted deliberately: the kit default is true and
        // true is the owner's estate-wide ruling of 2026-09-11. It is a NEW
        // visible line and a new followed outbound link on every page here.
        //
        // No newsletterSlot: owner ruling, no newsletter.
        ...wordmark,
      }}
    >
      {children}
    </KitPageShell>
  );
}
