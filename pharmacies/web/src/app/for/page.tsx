import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { pharmacyHubs } from "@/data/pharmacies-hubs";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "Who We Help",
  description: "Specialist accounting for pharmacy owners, buyers, sellers, pharmacy groups, and locum pharmacists.",
  alternates: { canonical: `${siteConfig.url}/for` },
};
export default function ForIndexPage() {
  return (
    <>
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx. This hub
          emitted no BreadcrumbList and showed no trail; it now shows one and
          emits one from the same component. Crumb labels are existing nav
          labels. "Home" is not a new internal link (the kit header wordmark and
          footer already emit href="/" on every page), so the floor of 15 is
          unaffected.
          SlimHero DECLINED for the reason written at
          src/app/services/page.tsx: SlimHero.tsx:53-56 has no slot above the h1
          for the trail (the `sectionClassName` half of that decline is STALE).
          `Eyebrow` stays DECLINED ON THIS BAND - the only label this hub
          publishes is the words of its own h1, so an eyebrow here prints "Who
          we help" above the heading "Who we help" - and UA 2026-10-07 mounts it
          on the card band below instead, where that same published route label
          sits above cards whose headings are all different strings.
          PharmaciesBackdrop ADOPTED; bg-primary-950 is a NEW GROUND for this
          route and carries the same measured row as the detail heroes: white
          12.18 bare, 9.78 composited, white/80 trail 7.08, chevron past the 3.0
          graphic floor. `ground-dark` with it. */}
      {/* UA2 2026-10-07, R4 Part B item 3: 281px was the thinnest band on the
          site. `py-16 sm:py-20` -> `py-20 sm:py-28`, the same two tokens taken
          on src/app/services/page.tsx. No copy, no component. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-20 sm:py-28">
        <PharmaciesBackdrop patternId="for-hub-hero" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "Who we help" }]}
          />
          {/* UA 2026-10-07: hub type step added (`lg:text-6xl` +
              `leading-[1.15]` + `text-balance`), per section 0.3. Words
              unchanged. */}
          <h1 className="text-3xl font-bold tracking-tight leading-[1.15] text-balance text-white sm:text-5xl lg:text-6xl">Who we help</h1>
        </div>
      </section>

      {/* ADOPTION DECLINED: packages/web-shared/design/marketing/CoverageCards.tsx
          on THIS hub only, and not for either of the hospitality-era reasons:
          `href?` (:31) and the optional `icon` (:23) both ship, which is why
          the same component IS adopted on src/app/services/page.tsx. The reason
          here is the heading level. CoverageCards hardcodes `<h3>` for the card
          title (CoverageCards.tsx:118) with no prop to change it. /services has
          an intervening `<h2>` ("All services"); this page has none, and its
          five cards are `<h2>`s today, so adopting would produce an h1 -> h3
          skip on this route. Phase 0 tracks heading skips as defects (P0-B #9),
          and the alternative, authoring a section heading to sit between, is
          prose this package does not write.
          ADOPTED instead:
          packages/web-shared/design/marketing/ScrollGlowGroup.tsx, a wrapper
          that changes no markup, no copy and no link inside it. All five card
          `href`s are untouched, so the floor of 15 is held. */}
      {/* UA 2026-10-07. ADOPTED: `Eyebrow`
          (packages/web-shared/design/primitives/page-blocks.tsx:43) on this
          band, fed "Who we help" - the terminal crumb label and nav label this
          route already renders, above five card headings that are all different
          strings, so nothing is authored and nothing duplicates its neighbour.
          Light ground, no `onDark`: slate-600 `hex 475569` measures 7.58 on
          white and the primary-600 `hex 1c8fb6` rule mark 3.71, past the 3.0
          graphic floor (globals.css:159 records the same 3.71).
          DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx. Same
          finding as src/app/services/page.tsx: `grep -n 'stats:'
          src/data/pharmacies-hubs.ts` returns figures PER HUB SLUG only
          (consumed at src/app/for/[slug]/page.tsx:105), there is no
          route-level figure set in src/config or src/data for this hub, and no
          record carries a source URL for `StatItem.href`. Picking four of the
          five hubs' figures for the index is an editorial selection, not a
          port.
          DECLINED: packages/web-shared/design/marketing/DrawnTickList.tsx:33
          (`items: string[]`). The only claim-shaped list here is the five
          `hub.intro` strings, and each is the body of a card that carries its
          own `href`; tick rows are plain text, which would drop 5 of the 15
          floor links.
          ScrollGlowGroup was already adopted on this grid in phase 3, with the
          five cards as its direct children, so the stagger runs as designed and
          nothing is changed here. */}
      {/* UA2 2026-10-07, R4 Part B item 1 ("prose boxes with no icon, no arrow,
          no hover affordance", for-1440.png). Two changes, both visual, no copy
          and no link:
          1. A VISIBLE LINK AFFORDANCE per card: an `ArrowRight` pinned to the
             foot, `aria-hidden`, that slides on card hover. This is not a new
             pattern and not an authored glyph - it is the exact arrow recipe
             this site already ships on its homepage hub cards
             (src/app/page.tsx:708, `h-3.5 w-3.5
             group-hover:translate-x-0.5 transition-transform`), at the 4px step
             the card type here takes. `aria-hidden` because the card's
             accessible name is already its h2: a named arrow would read the
             destination twice. primary-950 `hex 0f3a4a` on the card's slate-50
             ground measures 11.64, past the 3.0 graphic floor (the row UA
             measured for this same pair).
             The hover affordance R4 read as absent from the screenshot IS in
             the class string and was before this round
             (`hover:border-primary-950 hover:shadow-md transition-all`, plus
             `group-hover:text-primary-950` on the title); the arrow is what
             makes it visible at rest, which is the real finding. `rounded-xl`
             joins it so the card matches the kit card shape used by
             packages/web-shared/design/marketing/CoverageCards.tsx:109 and
             design/blog/HubArticleList.tsx:82, the two card walls this site
             already renders.
          2. `lg:grid-cols-3`: five cards in two columns left a dead half-row
             beside the fifth (R4, same finding). Three columns from `lg` is the
             kit's own article-grid breakpoint set (HubArticleList.tsx:77,
             `md:grid-cols-2 lg:grid-cols-3`) and leaves a third of one row
             rather than a half. `flex flex-col` + `mt-auto` pins the arrow to
             the card foot so the five bodies, which vary by ~30 words, do not
             land the arrows at five different heights - the same reason
             CoverageCards.tsx:136 pins its outcome row.
          DECLINED AGAIN, with the reason re-read at source today:
          packages/web-shared/design/marketing/CoverageCards.tsx. `href?` (:31)
          and the optional `icon` (:23) both ship, but the component hardcodes
          `<h3>` for the card title (:118) with no prop, and this band has no
          intervening `<h2>` (the five cards ARE the h2s), so adopting it
          produces an h1 -> h3 skip on this route. `Eyebrow` is a `<p>`
          (page-blocks.tsx:52), not a heading, so it does not fill that gap.
          Authoring a section heading to sit between is prose. Unchanged from
          phase 3; a `titleAs` prop on the kit component is the one-line kit
          edit that would close it, listed for the manager.
          DECLINED, brief item 3 (two more illustrative kit components), each
          checked at source: ProcessTimeline.tsx:29 (no step copy on this
          route; the only step set on the site is
          pharmacies/niche.config.json `entity.howItWorks`, which `grep -rn
          howItWorks pharmacies/web/src` shows NO route renders, so mounting it
          publishes prose the site does not print), DrawnTickList.tsx:33 (the
          only claim-shaped list here is the five `hub.intro` strings, each the
          body of a card that carries its own href - tick rows are plain text
          and drop 5 of the 15 floor links), PromptMarquee.tsx (needs
          first-person prompts and a `LucideIcon` per prompt, both authored),
          ComparisonTable.tsx (needs a written "them against us" row set),
          TopicSection.tsx:40-41 (requires an authored `eyebrow` AND `title`
          per band), StatsCounter.tsx (figures exist per hub slug only, no
          source URL). Nothing in src/data/pharmacies-hubs.ts fits any of them
          at route level.
          EYEBROW COUNT stays 1. This hub has three bands: the hero (an eyebrow
          there prints "Who we help" above the identical h1), this card band
          (mounted, "Who we help", above five different card headings) and the
          LeadCTAPanel, whose kit default eyebrow is "Free consultation"
          (LeadCTAPanel.tsx:18), a commercial claim this site publishes
          nowhere, held at `eyebrow=""` by locked rule 9. Brief item 2's "4 or
          more" needs four written band labels on a three-band route; R4 routed
          exactly that to the owner (Part B item 2) and it stays there. */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>Who we help</Eyebrow>
          <ScrollGlowGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pharmacyHubs.map((hub) => (
              <Link key={hub.slug} href={`/for/${hub.slug}`} className={`group flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6 hover:border-primary-950 hover:shadow-md transition-all ${focusRing}`}>
                <h2 className="text-base font-bold text-slate-900 group-hover:text-primary-950 transition-colors">{hub.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{hub.intro}</p>
                <span aria-hidden className="mt-auto pt-4 text-primary-950">
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {/* NEW SURFACE: this hub published no form of any kind before the port
          (`grep -n LeadForm src/app/for/page.tsx` = 0 on the pre-port file),
          which made it the only /services-equivalent hub with no way to
          enquire. The panel is fed the SAME two strings /services and both
          detail templates already publish, byte-identical, so nothing here is
          authored. `eyebrow=""` / `formTitle=""` per locked rules 9/8.
          `proofPoints={[]}`.
          Ground: the kit panel's own `bg-slate-900` (LeadCTAPanel.tsx:103),
          white 17.85 and slate-200 13.59 bare, and with the motif composited
          (`hex 14293f`) white 14.80 and slate-300 9.97, the row
          PharmaciesBackdrop.tsx:38-42 measured on this same ground. The
          `ground-dark` wrapper is a plain div because the section class is the
          kit's.
          No `data-cta` is added on this route or anywhere else in this package:
          the site has exactly 3 `data-cta` ids and no `data-cta-goal`, and the
          owner's standing decision is that `goal` goes on new surfaces only.
          The new surface here is a FORM, not a CTA control, and LeadForm's own
          submit carries no `data-cta` on any route; adding one here alone would
          create a one-route series nothing else can be compared against. */}
      {/* G3 (grounds fix, V1 blocker B2): this band was the last one before the
          slate-900 footer (darkOnDark). The panel moves to its own `contained`
          light variant, `ground="slate"` because the card grid above is white.
          Same copy, same `<LeadForm>`, same single mount; no new band and
          nothing removed. `.ground-dark` goes with it (contained is a light
          card holding the form's focusable controls, the shape
          globals.css:222-225 forbids wrapping) and so does `backdrop`, which
          the kit renders on the navy variant only (LeadCTAPanel.tsx:72-77). */}
      <LeadCTAPanel
        eyebrow=""
        title="Speak to a pharmacy finance specialist."
        description="Tell us about your situation and we will reply within 24 hours."
        proofPoints={[]}
        formTitle=""
        contained
        ground="slate"
        form={<LeadForm submitLabel="Send enquiry" />}
      />
    </>
  );
}
