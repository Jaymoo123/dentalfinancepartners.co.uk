import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { StatsCounter } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { pharmacyHubs, getPharmacyHub } from "@/data/pharmacies-hubs";
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { btnPrimary, siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { NextStepOffer } from "@/components/intent/NextStepOffer";

export function generateStaticParams() { return pharmacyHubs.map((h) => ({ slug: h.slug })); }

/**
 * src/data/pharmacies-hubs.ts authors real anchors inside 14 of its 35
 * `challenges[].body` / `howWeHelp[].body` strings and 5 of its 29
 * `faqs[].answer` strings (counted with a quoted-string parser, not a line
 * grep: a line grep counts the `Array<{ ... }>` interface lines as markup).
 * Those strings are interpolated as HTML at every call site below, never as a
 * JSX text child, so the anchors need a colour and a ring from here: none of
 * these sections is inside a `.prose` class, and a UA-default blue link is
 * neither the brand nor legible.
 *
 * primary-700 (`hex 177392`) measures 5.37 on white and 5.16 on slate-50, both
 * past the 4.5 text floor. The ring VALUE is the same `var(--focus-ring)`
 * custom property every other ring on this site reads; it is written out
 * rather than taken from `focusRing` because it has to be scoped to the
 * descendant anchors. Identical strings in `services/[slug]/page.tsx`.
 */
const authoredLinkRing = "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";
const linkOnLight = `[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800 ${authoredLinkRing}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getPharmacyHub(slug);
  if (!hub) return {};
  return { title: { absolute: hub.metaTitle }, description: hub.metaDescription, alternates: { canonical: `${siteConfig.url}/for/${slug}` } };
}

export default async function PharmacyHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = getPharmacyHub(slug);
  if (!hub) notFound();
  return (<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildServiceJsonLd({ name: hub.title, description: hub.metaDescription, url: `/for/${hub.slug}` }),
      }}
    />
    {/* This template is the twin of src/app/services/[slug]/page.tsx. Every
        adoption, every decline and every contrast row written at that file's
        call sites applies here character-for-character; the two were diffed at
        the end of the package and differ only in the data file they read, the
        crumb labels, the `hub.title` interpolations the copy already carried,
        and the `hub.noLeadForm` branch below. Rather than duplicate 120 lines
        of reasoning, the reasons live there and this file points at them:

        - Breadcrumb ADOPTED (replaces the "All pharmacy types" back link that
          stood at :43; the page-level buildBreadcrumbJsonLd script at :31-40 is
          REMOVED so exactly one BreadcrumbList is emitted per URL). The parent
          crumb reads "Who we help", the words this site already publishes as
          /for's own h1 and its nav label, so no copy is written or dropped.
          Closes phase 0 serious #4 on these 5 URLs.
        - SlimHero DECLINED, fixed child order at SlimHero.tsx:53-56 leaves no
          slot above the h1 for the trail. The `sectionClassName` half of the
          old decline is STALE and is not the reason.
        - Eyebrow ADOPTED (page-blocks.tsx:43), fed `hub.title`.
        - PharmaciesBackdrop ADOPTED, same bg-primary-950 contrast row.
        - StatsCounter ADOPTED; all 15 `stats[].value` strings in
          src/data/pharmacies-hubs.ts are non-numeric or compound ("2 months",
          "15% / £5k", "Zero-rated + standard", "£1,000,000", "40% FYA",
          "18% / 24%", "£1m lifetime", "25% / 19%", "ESM4270", "IR35 via CEST"
          and the rest), so every one goes through `value` with `target: 0`.
        - CoverageCards ADOPTED on BOTH card grids by UB2 (reasons and the
          dead-decline post-mortem at the twin); CardStack / ProcessTimeline /
          ComparisonTable / WhatToExpectCard / DrawnTickList / `glow` / `icon` /
          `outcome` / `href` / ScrollGlowGroup still DECLINED, reasons at the
          twin. NumberedReasons is ADOPTED on the twin's "How we help" band and
          DECLINED here, which is the ONE place these two files diverge; the
          measurement is at that band below.
        - FaqSection ADOPTED with `html` + `alwaysRenderAnswers`, same array
          buildFaqJsonLd is fed.
        - LeadCTAPanel ADOPTED with `eyebrow=""` and `formTitle=""`.

        UB re-read, 2026-10-07: same card-grid declines re-checked and UPHELD,
        no reversal, reasons at the twin. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
      <PharmaciesBackdrop patternId={`hub-hero-${hub.slug}`} />
      <div className={`${siteContainerLg} relative z-10`}>
        <Breadcrumb
          tone="onBrand"
          siteUrl={siteConfig.url}
          items={[{ label: "Home", href: "/" }, { label: "Who we help", href: "/for" }, { label: hub.title }]}
        />
        <Eyebrow onDark>{hub.title}</Eyebrow>
        {/* UB, H1 rhythm: same step as the twin `services/[slug]` template,
            one step down from `/`'s `lg:text-7xl`. Class string only. */}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">{hub.headline}.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{hub.intro}</p>
        {!hub.noLeadForm && (
          /* UB: `data-cta="hub_hero_book"` + placement/goal, generalist's
             naming, on the existing link, no new link. */
          <div className="mt-10"><Link href="/contact" data-cta="hub_hero_book" data-cta-placement="hero" data-cta-goal="form" className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-950 hover:bg-white/90 transition-colors ${focusRing}`}>Get in touch</Link></div>
        )}
      </div>
    </section>
    <section className="ground-dark bg-slate-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <StatsCounter
          tone="dark"
          columns={3}
          stats={hub.stats.map((stat) => ({ target: 0, value: stat.value, label: stat.label }))}
        />
      </div>
    </section>
    {/* UB2, Eyebrow DECLINED on this band and the one below, re-checked both
        ways against `design/primitives/page-blocks.tsx:43` and NOT a copy of
        the twin's verdict. The twin ADOPTS it on both bands and this template
        cannot, for a reason that is in the h2 strings rather than in the data.
        `hub.title` is the only label either band could carry (same as the twin,
        where `service.title` is adopted), but BOTH h2s on this template already
        interpolate `hub.title.toLowerCase()`: "What makes locum pharmacists
        accounting different." and "How we help locum pharmacists." An eyebrow
        of "Locum Pharmacists" directly above either one repeats the heading's
        own words, which is the single constraint the kit states on this
        primitive (`design/marketing/TopicSection.tsx:51`, "Must not repeat the
        heading's words"). The twin's two h2s ("The challenges clients face.",
        "How we help.") name no service, which is why the same label earns its
        place there and not here.
        Count for this template is therefore 1 -> 1. This is R4 PART B gap 2
        unchanged and it is the owner's call, not a builder's: four short band
        labels from him, or nothing. Minting one is rule 1. */}
    {/* UB2, ADOPTED: packages/web-shared/design/marketing/CoverageCards.tsx:46,
        fed `hub.challenges` unchanged, `columns={2}` (:84) = the md:grid-cols-2
        this band already had, `tone="slate"` (:92) = the bg-slate-50 card on a
        white band these cards already had, `html` (:65,119-125) because 2 of
        this file's 20 `challenges[].body` strings carry real `<a>` anchors
        (`grep -c '<a href' src/data/pharmacies-hubs.ts` = 19 across the file).
        The `linkOnLight` wrapper is what paints and rings those anchors, and it
        is the hook whose absence was the whole old decline: `[&_a]:` variants
        are descendant selectors, so they reach into the kit card body from the
        call site. Same construct this file already ships around FaqSection.
        AFFORDANCE: `ring-1 ring-slate-200/70
        hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]` with
        `transition-shadow duration-200` (:91,109), which is R4 PART B gap 1.
        No `href`, so no link is added or removed and the floor holds. */}
    <section className={`border-b border-slate-200 bg-white ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What makes {hub.title.toLowerCase()} accounting different.</h2>
        <div className={linkOnLight}>
          <CoverageCards items={hub.challenges} columns={2} tone="slate" html />
        </div>
      </div>
    </section>
    {/* bg-slate-50 replaces the `hex fafaf7` literal: the ramp declares no warm
        off-white, and globals.css:118 already names `hex f8fafc` (slate-50) as
        this site's `--surface`. Same role, one declared colour. */}
    {/* UB2, ADOPTED: the same CoverageCards, `columns={3}` (:84) for the
        three-up this band already had and `tone="white"` (:92) so the card
        contrasts against the slate-50 band, `html` again.
        ADOPTION DECLINED here and ADOPTED on the twin, the one divergence
        between these two files, measured rather than asserted:
        packages/web-shared/design/marketing/NumberedReasons.tsx:130 renders its
        body as a JSX text child at :176 and carries no `html` prop, so an
        anchor in a body string prints as literal markup in front of the
        reader. 12 of the 15 `howWeHelp[].body` strings in
        src/data/pharmacies-hubs.ts carry an `<a href>`; the twin's
        src/data/pharmacies-services.ts carries 0 in any field. Adopting it
        here would print twelve raw anchor tags as text. If NumberedReasons
        ever gains the `html` prop CardStack (:108), CoverageCards (:65) and
        ProcessTimeline (:33) already have, this band should move to it and the
        two templates come back to one shape. Kit gap candidate, reported.
        WhyUsList (`design/marketing/WhyUsList.tsx:65`) declined for the same
        measured reason, same line of markup. */}
    <section className={`border-b border-slate-200 bg-slate-50 ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help {hub.title.toLowerCase()}.</h2>
        <div className={linkOnLight}>
          <CoverageCards items={hub.howWeHelp} columns={3} tone="white" html />
        </div>
      </div>
    </section>
    {hub.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(hub.faqs) }} />}
    {hub.faqs.length > 0 && (
      <div className={linkOnLight}>
        <FaqSection
          eyebrow=""
          title="Common questions"
          faqs={hub.faqs}
          html
          alwaysRenderAnswers
          className={`bg-white ${sectionY}`}
        />
      </div>
    )}
    {/* M1a: W7's NextStepOffer, one mount per page, ABOVE both branches of
        `hub.noLeadForm` so the card shows on a flagged hub too (W7's target).
        It is not a capture surface: it links to a calculator or to /contact, it
        holds no form. Wrapped in the site container because the card is an
        `aside` with no container of its own. Renders null unless the kit
        SupportProvider has a behaviour-matched offer.

        UB2, R4 N3 (`adjacentSame=1`) re-checked and recorded, not fixed from
        here. Full reasoning at the twin `services/[slug]/page.tsx`: the mount
        is a client component that returns null with no offer, so a padded
        grounded section would paint an empty slate-50 stripe and an unpadded
        one is not a band. `components/intent/**` owns the fix.

        BAND MAP after this round, grounds in doc order (unchanged by UB2):
        hero `bg-primary-950` DARK / stats `bg-slate-800` DARK / challenges
        `bg-white` LIGHT / how-we-help `bg-slate-50` LIGHT / FAQ `bg-white`
        LIGHT / this mount UNGROUNDED (white) / LeadCTAPanel `contained
        ground="slate"` LIGHT, last band light into the slate-900 footer. The
        `hub.noLeadForm` signpost band below is dead on all 5 live URLs (no
        record sets the flag) and is not in the sequence. */}
    <section className="bg-slate-50 py-12"><div className={siteContainerLg}><NextStepOffer /></div></section>
    {/* `hub.noLeadForm` is RESPECTED, not removed: a hub flagged with it keeps
        no form and gets the signpost band below instead. No record in
        src/data/pharmacies-hubs.ts sets the flag today (`grep -n noLeadForm
        src/data/pharmacies-hubs.ts` = the interface line only, :7), so both
        branches are reachable only through the data file and the false branch
        is what all 5 URLs render. The flag stays in the exported shape, which
        is FROZEN. */}
    {!hub.noLeadForm && (
      /* G3 (grounds fix, V1 blocker B2): the slate-900 band was the last band
         before the slate-900 footer on all 5 live hub URLs (darkOnDark). The
         panel moves to its `contained` light variant with `ground="slate"`: the
         band above is the white FaqSection and every hub record publishes a
         non-empty `faqs` array, so it always renders. Same copy, same form,
         same single mount. `.ground-dark` and `backdrop` go with it, for the
         reasons written on the twin template. The `hub.noLeadForm` branch below
         is unchanged: no record sets the flag, so it renders on no URL and was
         not one of the 17 routes `--grounds` reported. */
      <LeadCTAPanel
        eyebrow=""
        title="Speak to a pharmacy finance specialist."
        description={`Tell us about your ${hub.title.toLowerCase()} situation and we will reply within 24 hours.`}
        proofPoints={[]}
        formTitle=""
        contained
        ground="slate"
        form={<LeadForm submitLabel="Send enquiry" />}
      />
    )}
    {hub.noLeadForm && (
      <section className={`ground-dark relative overflow-hidden bg-slate-900 ${sectionY}`}>
        <PharmaciesBackdrop patternId={`hub-signpost-${hub.slug}`} />
        <div className={`${siteContainerLg} relative z-10`}>
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Pharmacy owners: speak to a specialist.</h2>
          <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-slate-200">If you employ locum pharmacists or manage a pharmacy, we can help with payroll, structure, and compliance.</p>
          <div className="mt-8"><Link href="/contact" className={btnPrimary}>Get in touch</Link></div>
        </div>
      </section>
    )}
  </>);
}
