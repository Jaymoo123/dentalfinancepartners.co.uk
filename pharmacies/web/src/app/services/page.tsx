import type { Metadata } from "next";
import { ServiceTiers } from "@accounting-network/web-shared/components/ServiceTiers";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { pharmacyServices } from "@/data/pharmacies-services";
import { serviceTiers } from "@/config/service-tiers";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { siteContainerLg, sectionY } from "@/components/ui/layout-utils";
export const metadata: Metadata = {
  title: "Services",
  description: "Specialist pharmacy accounting services: purchase accounting, sale and CGT, valuation, NHS reconciliation, VAT retail schemes, payroll, incorporation.",
  alternates: { canonical: `${siteConfig.url}/services` },
};
export default function ServicesPage() {
  return (
    <>
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx. This hub
          emitted no BreadcrumbList and showed no trail; it now shows one and
          emits one, from the same component (Breadcrumb.tsx:86). Crumb labels
          are the existing nav labels, verbatim. "Home" is not a new internal
          link: the kit header wordmark and SiteFooter already emit href="/" on
          every page, so the route's unique internal link set does not change
          and the floor of 18 is unaffected.

          ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx,
          same reason as the two detail templates, read today: its child order
          (SlimHero.tsx:53-56) is Eyebrow, h1, children, with no slot above the
          h1 for the trail this phase exists to add. The `sectionClassName` half
          of the hospitality-era decline is STALE (the prop ships at :47 and
          splices at :50) and is NOT the reason.

          ADOPTION DECLINED ON THIS BAND: `Eyebrow` from
          packages/web-shared/design/primitives/page-blocks.tsx:43. The only
          label this hub publishes is the single word of its own h1,
          "Services". An Eyebrow fed that string prints "Services" immediately
          above the heading "Services"; anything else is a sentence this
          package would have to author, and the wording is frozen. UA 2026-10-07
          mounts it on the "Service tiers" band below instead, where the same
          published route label sits above a DIFFERENT heading, which is the
          shape generalist uses (services/page.tsx:175-364) and is not a
          duplicate of anything.

          ADOPTED: src/components/layout/PharmaciesBackdrop.tsx. NEW GROUND for
          this route: bg-primary-950 `hex 0f3a4a`, white 12.18 bare and 9.78
          composited with 0.10 of the motif's `hex 45cdff`; the white/80 trail
          links measure 7.08 and the white/80 chevron clears the 3.0 graphic
          floor. `ground-dark` with it: the trail link is the only focusable
          element in the section and the ring would otherwise paint
          primary-950 on primary-950. */}
      {/* UA 2026-10-07, `data-cta` DECLINED on this route (brief item 8,
          `services_hero_book`). Generalist's id sits on a hero "Book a free
          call" button (generalist/web/src/app/services/page.tsx hero); this
          hero publishes no CTA link at all, only the trail and the h1, so
          tagging one means authoring the button and its label first and the
          wording is frozen (binding rule 1). The eight service links below are
          built inside the kit CoverageCards, which exposes no attribute prop
          per item, so they cannot be tagged from this call site either. Both
          are listed for the manager rather than worked around. */}
      {/* UA2 2026-10-07, R4 Part B item 3: this hero measured 281px, the
          thinnest band on the site, against 300-420 at both references. The
          vertical rhythm steps from `py-16 sm:py-20` to `py-20 sm:py-28` - two
          tokens, no copy, no component. `sectionY` is NOT used here: the kit
          hero rhythm is a different scale from the kit body rhythm and every
          other dark hero on this site carries its own pair. */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-20 sm:py-28">
        <PharmaciesBackdrop patternId="services-hub-hero" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "Services" }]}
          />
          {/* UA 2026-10-07: hub type step added (`lg:text-6xl` +
              `leading-[1.15]` + `text-balance`), the one typography row
              section 0.3 measured as missing off the homepage. Word
              unchanged. */}
          <h1 className="text-3xl font-bold tracking-tight leading-[1.15] text-balance text-white sm:text-5xl lg:text-6xl">Services</h1>
        </div>
      </section>

      {/* UA 2026-10-07. ADOPTED: `Eyebrow` (page-blocks.tsx:43) on this band,
          fed "Services" - the route label the Breadcrumb above already renders
          and the nav label this site already publishes, above the different
          heading "Service tiers". No string is authored. Light ground, so no
          `onDark`: the component's light branch is slate-600 `hex 475569`,
          7.58 on white, and the rule mark is primary-600 `hex 1c8fb6`, 3.71 on
          white, past the 3.0 graphic floor (globals.css:159 records the same
          3.71 for this step).
          DECLINED on the "All services" band below: the only label left for it
          is this same route label, which would print "Services" directly above
          the heading "All services" - the near-duplicate this file already
          declines the hero eyebrow for. One eyebrow per published label, not
          one per band.
          DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx. The
          generalist shape puts a figure strip on this hub
          (generalist/web/src/app/services/page.tsx:213-215), but this route
          publishes NO figure set of its own: `grep -n 'stats:'
          src/data/pharmacies-services.ts` returns figures PER SERVICE SLUG
          only, consumed by src/app/services/[slug]/page.tsx:145, and
          src/config has no route-level set. Choosing four of the eight
          services' figures for the hub is an editorial selection this package
          cannot make, and none of the records carries a source URL, so
          `StatItem.href` would have nothing to point at.
          DECLINED: packages/web-shared/design/marketing/DrawnTickList.tsx:33
          (`items: string[]`). The only claim-shaped list on this hub is the
          eight `service.intro` strings, and those are the CoverageCards bodies,
          each inside its own `href`. Moving them into plain tick rows would
          drop 8 of the 18 floor links (locked rule 20). */}
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <Eyebrow>Services</Eyebrow>
          <h2 className="text-xl font-semibold text-slate-900">Service tiers</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Start with compliance essentials, add management accounts and payroll as you grow, move to specialist advisory when buying or selling a pharmacy. You can move tier at any month-end.
          </p>
          {/* Kit `ServiceTiers` was already mounted on this route before the
              port and stays mounted, fed the same src/config/service-tiers.ts
              records. `featuredBadge="Most popular"` is UNCHANGED: the badge is
              on phase 0's not-serious list and is an OWNER item, and removing
              the prop would not remove the badge anyway (T13). */}
          <div className="mt-8">
            <ServiceTiers tiers={serviceTiers} featuredBadge="Most popular" />
          </div>
        </div>
      </section>

      {/* ADOPTED: packages/web-shared/design/marketing/CoverageCards.tsx,
          replacing the hand-rolled card grid. BOTH halves of the
          hospitality-era decline are confirmed STALE at source today: `href?`
          on `CoverageItem` ships at :31 and `icon` is optional at :23. The
          cards ARE this hub's link floor and `href` preserves all 8 of them,
          one per service slug, so the floor of 18 is held exactly.
          `body` is `service.intro`, a plain string on all 8 records
          (`grep -n '    intro:' src/data/pharmacies-services.ts | grep '<'` = 0
          hits), so `html` is not needed and the anchor-hook problem that
          declines this component on the detail templates does not arise here.
          No `icon`: the eight services publish no glyph and choosing eight
          would be authoring. No `outcome`: same reason, it is a sentence.
          `glow` is DECLINED, not forgotten: the glow surface at
          CoverageCards.tsx:88 hardcodes `rgba(5,150,105,0.28)` and
          `rgba(5,150,105,0.4)`, a green shadow that is not this brand and that
          no call site can repoint. `tone="slate"` on a white section, per the
          component's own rule at :56-61.
          G3 (grounds fix, V1 blocker B2): this section was `bg-white` directly
          under the `bg-white` "Service tiers" section, which `--grounds`
          reported as an adjacentSame (white-on-white) breach on this route. The
          section ground moves to slate-50 and `tone` flips to "white" with it,
          per the component's own rule at :56-61 (white cards on a slate-50
          section). No copy, no link, no component change. */}
      {/* UA2 2026-10-07, R4 Part B item 1, ANSWERED WITH A MEASUREMENT RATHER
          THAN A CHANGE. R4 read this band off services-1440.png as "eight
          prose boxes with no hover affordance". It is not a prose box wall: it
          is already the kit card component, every card is an `<a>` carrying the
          service href, and the kit gives each one
          `hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]`,
          `transition-shadow duration-200` and the local `focusRing`
          (CoverageCards.tsx:91,109-111). Brief item 1 is therefore already
          satisfied on this band, and the whole wall sits inside the
          ScrollGlowGroup mounted below.
          What is genuinely missing is an at-rest mark - an icon or an arrow -
          and neither is reachable from this call site:
          - `icon` (CoverageCards.tsx:23) takes a `LucideIcon` PER ITEM. The
            eight services publish no glyph in src/data/pharmacies-services.ts,
            so eight glyphs would be chosen here. That is editorial, not a
            port; unchanged from phase 3.
          - `glow` (CoverageCards.tsx:81) stays DECLINED for the reason re-read
            at source today: the glow surface at :88 hardcodes
            `rgba(5,150,105,0.28)` and `rgba(5,150,105,0.4)`, a green drop
            shadow no call site can repoint and not this brand's `hex 0f3a4a`.
            Brief item 1 names "CoverageCards href + glow"; the href half is
            taken, the glow half is a kit colour defect. The brand glow this
            site DOES own arrives through ScrollGlowGroup below, which reads
            `--brand-glow-deep`.
          - an arrow has no slot: the component renders the card internals
            itself and exposes no children, trailing-slot or attribute prop per
            item. Listed for the manager as the one-line kit ask, alongside the
            per-item `data-cta` gap phase 3 already logged.
          DECLINED, brief item 3 (two more illustrative kit components on this
          hub). Checked against the data, each at source, and NONE fits without
          authoring:
          - packages/web-shared/design/marketing/ProcessTimeline.tsx:29 needs
            `{n, title, body}` steps. This route publishes no step copy. The
            only step set anywhere on this site is
            pharmacies/niche.config.json `entity.howItWorks` (4 strings), and
            `grep -rn howItWorks pharmacies/web/src` = 0: those four sentences
            are rendered by NO route today, so mounting them here publishes
            prose the site does not currently print. That is authoring by
            relocation, not a port. Generalist's timeline is fed a written
            `STEPS` const (generalist/web/src/app/services/page.tsx), which is
            the difference.
          - packages/web-shared/design/marketing/DrawnTickList.tsx:33 needs
            `items: string[]`. The only claim-shaped lists on this route are the
            eight `service.intro` bodies, which are the card links above (tick
            rows are plain text and would drop 8 of the 18 floor links), and the
            `features` arrays in src/config/service-tiers.ts, which the kit
            `ServiceTiers` already renders as tick rows on the band above. A
            second list of the same 18 strings is a duplicate, not a component.
          - packages/web-shared/design/marketing/PromptMarquee.tsx (`Prompt` =
            `{tag, text, icon}`) needs first-person prompts AND a per-prompt
            `LucideIcon`, and its own docstring forbids attribution and requires
            an even set. Feeding it the per-slug FAQ questions would restate
            third-person questions as first-person lines, which is writing.
          - packages/web-shared/design/marketing/ComparisonTable.tsx needs
            `rows`, `generalLabel`, `generalCaption`, `ourCaption` - a written
            "them against us" set this site publishes nowhere.
          - packages/web-shared/design/marketing/TopicSection.tsx requires an
            `eyebrow` AND a `title` string per band (:40-41), both authored, and
            its own prop doc says the eyebrow must not repeat the heading.
          - packages/web-shared/design/marketing/StatsCounter.tsx: unchanged
            from phase 3, figures exist per service slug only and carry no
            source URL.
          EYEBROW COUNT stays 1 on this route and brief item 2's "4 or more" is
          not reachable honestly: this hub has four bands, and the only label it
          publishes is the single route word "Services", already mounted on the
          band below. The three remaining bands publish "Service tiers" and
          "All services" (their own h2s, so an eyebrow there repeats the heading
          it sits on) and the LeadCTAPanel, whose kit default eyebrow is "Free
          consultation" (LeadCTAPanel.tsx:18) - a commercial claim this site
          publishes on no route, held at `eyebrow=""` by locked rule 9. R4
          reached the same conclusion and routed it to the owner (R4 Part B item
          2: "the owner supplies four short band labels"). That is where it
          stays. */}
      <section className={`bg-slate-50 ${sectionY}`}>
        <div className={siteContainerLg}>
          <h2 className="text-xl font-semibold text-slate-900">All services</h2>
          {/* UA 2026-10-07. ADOPTED:
              packages/web-shared/design/marketing/ScrollGlowGroup.tsx, the one
              card grid on this hub that was not already in a group (/for has
              carried one since phase 3). A wrapper only: no markup, no copy and
              no href changes inside it, so all 8 service links and the floor of
              18 are held exactly. CoverageCards renders its own grid
              (CoverageCards.tsx:118 area), so this group has ONE direct child
              and `delay={0.1}` carries the beat the `:nth-child` stagger cannot
              (ScrollGlowGroup.tsx:28-34). Per-card staggering is not reachable
              from here without dropping the kit component. No colour enters:
              the `card-glow` keyframe reads this site's `--brand-glow-deep`. */}
          <ScrollGlowGroup delay={0.1}>
            <CoverageCards
              columns={2}
              tone="white"
              items={pharmacyServices.map((service) => ({
                title: service.title,
                body: service.intro,
                href: `/services/${service.slug}`,
              }))}
            />
          </ScrollGlowGroup>
        </div>
      </section>

      {/* ADDED 2026-09-28 parity phase 0 (Opus read): brief section 4 requires one
          lead form on every money page and this route rendered none. Same band as
          the /for and /services slug templates, not a new pattern.
          2026-09-28 late (owner ruling, wording reversal): the mount stays, the
          agent-written copy does not; the band below carries this site's own
          published /services/[slug] copy.
          2026-10-07 phase 3: the hand-rolled band is now the kit
          packages/web-shared/design/marketing/LeadCTAPanel.tsx, fed those same
          two strings byte-identical and the same `<LeadForm submitLabel="Send
          enquiry" />`. `eyebrow=""` and `formTitle=""` are required (locked
          rules 9/8): the kit defaults are "Free consultation" (:18) and "Book
          your free consultation" (:27) and this site publishes neither.
          `proofPoints={[]}`: the band published no tick rows.
          GROUND CHANGE declared: the kit panel paints its own `bg-slate-900`
          (:103) with no class hook, so this band moves from the brand `hex 0f3a4a`
          to slate-900. White 17.85, slate-200 13.59 bare; composited with the
          motif at its strongest point (`hex 14293f`) white 14.80 and slate-300
          9.97, the row PharmaciesBackdrop.tsx:38-42 already measured on this
          same ground.
          G3 (grounds fix, V1 blocker B2): the dark band ran straight into the
          slate-900 footer (darkOnDark). The panel moves to its own `contained`
          light variant, `ground="white"` because the section above it is now
          slate-50 (LeadCTAPanel.tsx:68-71). Same copy, same form, same single
          mount; no new band added and nothing removed. The `.ground-dark`
          wrapper goes with it: the contained variant is a light card holding
          the form's focusable controls, exactly the shape globals.css:222-225
          says the class must never wrap. `backdrop` is dropped because the kit
          renders it on the navy variant only (LeadCTAPanel.tsx:72-77), so
          passing it here would be a dead prop. */}
      <LeadCTAPanel
        eyebrow=""
        title="Speak to a pharmacy finance specialist."
        description="Tell us about your situation and we will reply within 24 hours."
        proofPoints={[]}
        formTitle=""
        contained
        ground="white"
        form={<LeadForm submitLabel="Send enquiry" />}
      />
    </>
  );
}
