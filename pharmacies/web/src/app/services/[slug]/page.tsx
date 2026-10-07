import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { CoverageCards } from "@accounting-network/web-shared/design/marketing/CoverageCards";
import { NumberedReasons } from "@accounting-network/web-shared/design/marketing/NumberedReasons";
import { StatsCounter } from "@accounting-network/web-shared/design/marketing/StatsCounter";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { pharmacyServices, getPharmacyService } from "@/data/pharmacies-services";
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import PharmaciesBackdrop from "@/components/layout/PharmaciesBackdrop";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { NextStepOffer } from "@/components/intent/NextStepOffer";

export function generateStaticParams() { return pharmacyServices.map((s) => ({ slug: s.slug })); }

/**
 * Counted with a quoted-string parser rather than a line grep (a line grep
 * counts the `Array<{ ... }>` interface lines as markup and over-reports):
 * src/data/pharmacies-services.ts authors NO anchor in any `challenges[].body`,
 * `howWeHelp[].body`, `faqs[].answer` or `intro` today (0 of 56 bodies, 0 of 32
 * answers), while its twin src/data/pharmacies-hubs.ts authors 14 of 35 bodies
 * and 5 of 29 answers. Every one of those strings is interpolated as HTML at
 * the matching call site below, never as a JSX text child, so the anchors need
 * a colour and a ring: none of these sections is inside a `.prose` class, and a
 * UA-default blue link is neither the brand nor legible.
 *
 * The recipe is mounted on BOTH templates even though this one's data carries
 * no anchor yet. These two files are one shape by rule, the data files are
 * written by the same hand, and a writer adding one cross-reference to a
 * service record must not silently ship a UA-default blue link with no ring.
 *
 * UB2 narrowed WHERE it is mounted on this file, not whether: the "challenges"
 * band and the FAQ both still wrap their kit component in it, but the "How we
 * help" band now renders through `NumberedReasons`, which takes plain text and
 * has no `html` prop, so the recipe has nothing to colour there. The writer
 * guard that follows from that is written at that band's call site.
 *
 * primary-700 (`hex 177392`) measures 5.37 on white and 5.16 on slate-50, both
 * past the 4.5 text floor. The ring VALUE is the same `var(--focus-ring)`
 * custom property every other ring on this site reads; it is written out
 * rather than taken from `focusRing` because it has to be scoped to the
 * descendant anchors. Identical strings in `for/[slug]/page.tsx`.
 */
const authoredLinkRing = "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";
const linkOnLight = `[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800 ${authoredLinkRing}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getPharmacyService(slug);
  if (!service) return {};
  return { title: { absolute: service.metaTitle }, description: service.metaDescription, alternates: { canonical: `${siteConfig.url}/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getPharmacyService(slug);
  if (!service) notFound();
  return (<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildServiceJsonLd({ name: service.title, description: service.metaDescription, url: `/services/${service.slug}` }),
      }}
    />
    {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, replacing
        the hand-rolled "All services" back link that stood at :43. The parent
        crumb keeps the words of the nav label ("Services", the label in
        src/app/layout.tsx's nav and the h1 of /services) so no copy is written
        and none is dropped. This closes phase 0's serious #4 (BreadcrumbList
        JSON-LD with no visible trail) on these 8 URLs.
        The page-level `buildBreadcrumbJsonLd` script that stood at :31-40 is
        REMOVED in the same edit: the kit component emits the BreadcrumbList
        itself (Breadcrumb.tsx:86 via schema/breadcrumb + schema/serialize), and
        the node it emits is field-for-field what lib/schema.ts:88-99 emitted
        (same @type, position, name, absolute `item`). Two BreadcrumbList blocks
        on one URL is a schema defect, not belt and braces: exactly one per URL.
        `tone="onBrand"` (Breadcrumb.tsx:68-80), measured on this hero's ground
        below. The back link gave 1 internal link, the trail gives 2, so the
        route's link floor rises.

        ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        The `sectionClassName` half of the hospitality-era decline is STALE and
        is NOT the reason: the prop exists at :47 and does splice into the
        section class string at :50, so the brand ground would carry fine. The
        reason that stands, read today, is the FIXED CHILD ORDER at :53-56:
        Eyebrow, then h1, then `children`. There is no slot above the h1, and
        this phase's whole job on this template is to put a visible breadcrumb
        trail where the BreadcrumbList already is, which belongs above the
        heading (the house order, charities/web/src/components/hubs/HubParts.tsx
        :101-109). Its own docstring (:8-12) also states it is "deliberately not
        the content-page hero". Passing the trail through `children` would print
        it under the h1. Reported to the manager as a kit gap candidate: a
        `crumbs` slot above the Eyebrow.

        ADOPTED: Eyebrow from page-blocks.tsx:43, fed `service.title`, a string
        this site already publishes as this page's card title on /services and
        its nav/footer label. No prose authored.

        ADOPTED: src/components/layout/PharmaciesBackdrop.tsx (never edited).
        Host contract satisfied: `relative overflow-hidden` on the section,
        `relative z-10` on the content. NEW GROUND, measured at the backdrop's
        strongest point (1px stroke at full alpha inside the 0.10 group):
        bg-primary-950 `hex 0f3a4a` bare, white 12.18; composited with 0.10 of
        `hex 45cdff` = `hex 14495c`, white 9.78, white/80 7.08, slate-300 (the
        Eyebrow onDark step) 6.58, white/80 chevron 7.08 against the 3.0
        graphic floor. All PASS.
        `ground-dark` goes on with it: the trail links and the hero CTA are the
        focusable elements here, and without the rebind the ring paints
        primary-950 on a primary-950 ground, 1.0:1. No light island sits inside
        this section. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-950 py-16 sm:py-20">
      <PharmaciesBackdrop patternId={`service-hero-${service.slug}`} />
      <div className={`${siteContainerLg} relative z-10`}>
        <Breadcrumb
          tone="onBrand"
          siteUrl={siteConfig.url}
          items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}
        />
        <Eyebrow onDark>{service.title}</Eyebrow>
        {/* UB, H1 rhythm: one step down from `/`'s `lg:text-7xl` (home is the
            reference 72px; a detail hero lands at `lg:text-6xl`, 60px). Class
            string only, `service.headline` is unchanged. */}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">{service.headline}.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{service.intro}</p>
        {/* UB: `data-cta="service_hero_book"` + placement/goal on the existing
            link, generalist's naming (`services_hero_book`), no new link. */}
        <div className="mt-10"><Link href="/contact" data-cta="service_hero_book" data-cta-placement="hero" data-cta-goal="form" className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-950 hover:bg-white/90 transition-colors ${focusRing}`}>Get in touch</Link></div>
      </div>
    </section>
    {/* ADOPTED: packages/web-shared/design/marketing/StatsCounter.tsx. Both
        halves of the old decline are dead: `StatItem.value?: string` exists
        (:9-15) and `tone="dark"` (:106) and `columns` (:110) exist, so neither
        the string figures nor the dark ground nor the three-up layout is a
        blocker any more.
        EVERY `stats[].value` in src/data/pharmacies-services.ts is a
        non-numeric or compound string ("0.5% vs up to 5%", "Goodwill", "FP34
        lag", "18% / 24%", "£1m per person", "~2-month lag", "Category M",
        "Pharmacy First", "Zero-rated", "Retail scheme", "£90,000", "15% /
        £5,000", "£10,500", "Eligibility check", "25% / 19%", "10.75 / 35.75 /
        39.35%", "Two layers", "Drug Tariff", "Adjusted EBITDA", "Pence per
        item", 24 of 24 across the 8 records), so all of them go through
        `value` with `target: 0`. Nothing on this band counts up and that is
        correct: T15 wants the TRUE figure in the server frame, and
        `StatValue` returns `<span>{stat.value}</span>` at :63-65 before the
        counter is ever reached. No `href`: these labels cite no source URL and
        inventing one would author a citation.
        `ground-dark` on the band: bg-slate-800 `hex 1e293b`, white 14.63 and the
        slate-300 label 9.85 (tone="dark", :139), both PASS. No focusable
        element inside it today, so the rebind is pre-emptive, not measured. */}
    <section className="ground-dark bg-slate-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <StatsCounter
          tone="dark"
          columns={3}
          stats={service.stats.map((stat) => ({ target: 0, value: stat.value, label: stat.label }))}
        />
      </div>
    </section>
    {/* UB2, answering R4 PART B gap 1 ("the card walls are still paragraph
        boxes ... no hover affordance"). BOTH hand-rolled card grids below are
        now kit components, and the W3/UB decline that blocked them is DEAD.

        WHY THE OLD DECLINE FELL. It rested on one thing only: "the body is a
        fixed `text-slate-700` <p> with no hook for the anchor colour and focus
        ring the authored anchors need". That hook exists at the CALL SITE and
        always did. `linkOnLight` is a set of `[&_a]:` descendant variants, so
        wrapping the kit component in a div carrying it paints and rings every
        anchor inside it. This file already uses exactly that construct on the
        kit `FaqSection` below (`<div className={linkOnLight}><FaqSection/>`),
        so the decline was arguing against a shape the same file already ships.
        No kit change was needed and none was made.

        ADOPTED, challenges band:
        packages/web-shared/design/marketing/CoverageCards.tsx:46, fed
        `service.challenges` unchanged (`CoverageItem` is `{title, body}` plus
        three optional fields, so the frozen data shape is assignable as is).
        `columns={2}` (:84) = the `md:grid-cols-2` this band already had.
        `tone="slate"` (:92) = the `bg-slate-50` card on the white band these
        cards already had. `html` (:65,119-125) keeps `dangerouslySetInnerHTML`
        on the body, so the 0-of-56 anchors this data file carries today and
        any a writer adds tomorrow render as real anchors, coloured and ringed
        by the `linkOnLight` wrapper.
        THE AFFORDANCE, which is the point of the round: the non-glow card
        surface at :91 is `ring-1 ring-slate-200/70
        hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.4)]` with
        `transition-shadow duration-200` (:109). The boxes now lift under the
        cursor. Nothing here is a link, so no `focusRing` is emitted (:110) and
        the route's link floor is unchanged.

        ADOPTED, "How we help" band:
        packages/web-shared/design/marketing/NumberedReasons.tsx:130, fed
        `service.howWeHelp` unchanged (`{title, body}[]`, exact match). Its own
        grid is `md:grid-cols-3` (:160) = the three-up this band already had,
        and it DISSOLVES the card wall rather than restyling it: a drawn brand
        numeral and rule per item, which light in sequence the first time the
        band is on screen, then stop. That is the second illustrative kit
        component this round owed the template, and it is the same
        `.story-numeral` / `.story-numeral-rule` pair the homepage already
        ships six of (R4 measured them at 5.14 on slate-50 with JS both on and
        off, so the no-JS failure mode is a finished numeral).
        THE ONE CONDITION, measured here rather than assumed: NumberedReasons
        renders its body as a JSX text child (:176), with no `html` prop, so an
        anchor in a body string would print as literal markup.
        `grep -c '<a href' src/data/pharmacies-services.ts` = **0**, and this data
        file authors no anchor in ANY field (0 of 56 bodies, 0 of 32 answers).
        WRITER GUARD: if a cross-reference is ever added to a
        `howWeHelp[].body` in that file, this band must move back to
        `CoverageCards html` (two lines) or NumberedReasons must gain the same
        `html` prop CardStack/CoverageCards/ProcessTimeline already carry.

        TWIN DIVERGENCE, declared. `for/[slug]/page.tsx` keeps CoverageCards on
        BOTH its bands and declines NumberedReasons, because its data file is
        not this one: `src/data/pharmacies-hubs.ts` authors anchors in 12 of its
        15 `howWeHelp[].body` strings and 2 of its 20 `challenges[].body`
        strings. The two templates are one shape by rule where the data is one
        shape; here it demonstrably is not, and the reason is written at both
        call sites.

        STILL DECLINED, each re-read against today's kit:
        - packages/web-shared/design/marketing/CoverageCards.tsx:88 `glow`. The
          glow surface hardcodes `rgba(5,150,105,0.28)` / `rgba(5,150,105,0.4)`,
          a green drop shadow no call site can repoint, and this brand is
          `hex 0f3a4a`. R4's cheapest fix asked for "one `card-glow` per card";
          the hover lift above is that affordance without painting another
          site's brand onto this one.
        - `CoverageItem.icon` (:23) and `outcome` (:16). Both are optional and
          both are stale as DECLINE REASONS, but neither has a source: the
          frozen `PharmacyService` shape publishes no icon and no outcome line,
          and choosing a lucide glyph per subject or writing a "what you walk
          away holding" line is authoring. R4's "one icon per card" needs eight
          icon choices from the owner, or nothing.
        - `CoverageItem.href` (:31). Nothing in the data names a destination for
          a challenge or a service step, and rule 1 forbids minting one.
        - packages/web-shared/design/primitives/page-blocks.tsx `CardStack`
          (:97). `columns` is still `1 | 2` (:112) so it cannot lay out the
          three-up band, and its card carries NO hover or focus treatment at
          all (:117), so adopting it on the two-up band would satisfy "is a kit
          component" while leaving R4's actual finding, the missing affordance,
          exactly where it was.
        - packages/web-shared/design/marketing/ProcessTimeline.tsx:26 takes
          `{n, title, body}`. Neither `challenges` nor `howWeHelp` is a staged
          sequence and neither publishes an `n`; minting the step numbers as
          labels would assert an order the copy does not claim. (NumberedReasons
          is adopted instead precisely because its numerals are ordinals the
          component generates, not labels the data has to carry.)
        - packages/web-shared/design/marketing/ComparisonTable.tsx:32-47 still
          forces a `general` string per row plus a "Most recommended" pill;
          these are single-column `{title, body}` lists, so the other column
          would be authored.
        - packages/web-shared/design/marketing/WhatToExpectCard.tsx:22-27. Its
          `items` and `title` are both overridable now, so the DEFAULT_ITEMS
          fixed-fee line is a stale reason; the standing one is that the only
          candidate `items` source is `howWeHelp[].title`, which the band below
          already prints. A navy card re-listing the three headings directly
          under them is duplication, not a component.
        - packages/web-shared/design/marketing/DrawnTickList.tsx:33 takes
          `string[]` of short claims. The frozen shapes in
          src/data/pharmacies-services.ts publish no list of claims anywhere:
          every field is either a scalar, a `{value,label}` stat, a
          `{title,body}` pair or a `{question,answer}` pair. Feeding it
          `challenges[].title` or `howWeHelp[].title` would drop the bodies,
          which deletes prose. Nothing to feed it, same verdict as W3.
        - packages/web-shared/design/marketing/ScrollGlowGroup.tsx, which both
          grids carried until this round. Its stagger keys off
          `[data-glow="on"] > *`, i.e. DIRECT children, and each kit component
          above renders its own single grid element, so wrapping either one
          would glow one opaque block instead of a per-card wave. Both kit
          components bring their own entrance or hover treatment, so the
          wrapper is removed rather than left to fire on a single child. */}
    {/* UB2, Eyebrow ADOPTED on this band and the one below
        (`design/primitives/page-blocks.tsx:43`), answering R4 PART B gap 2
        (eyebrow density 1 per template against the reference's 4-6).
        The label is `service.title`, a string THIS TEMPLATE ALREADY PRINTS
        twice above, as the final breadcrumb crumb and as the hero Eyebrow, so
        so nothing is minted and rule 1 holds. It earns its place rather than
        just filling a slot: these two bands sit a full hero and stats band
        below the only other place the service is named, so on a phone the
        reader scrolling into "The challenges clients face." has lost the
        subject, and the eyebrow is the answer to "challenges with WHAT".
        It also clears the kit's own constraint, checked both ways: TopicSection
        .tsx:51 requires an eyebrow that "must not repeat the heading's words",
        and neither "The challenges clients face." nor "How we help." contains
        any word of `service.title`.
        NOT extended to the FaqSection below (eyebrow stays ""): the kit default
        is the word "FAQ", which R4 m1 re-states is a label this site does not
        publish, and `service.title` a fourth time on one page is noise, not
        rhythm. Count for this template is therefore 1 -> 3 against R4's target
        of 4+, and the gap is the one R4 PART B gap 2 already routes to the
        owner: four short band labels, from him, or nothing. */}
    <section className={`border-b border-slate-200 bg-white ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>{service.title}</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The challenges clients face.</h2>
        <div className={linkOnLight}>
          <CoverageCards items={service.challenges} columns={2} tone="slate" html />
        </div>
      </div>
    </section>
    {/* bg-slate-50 replaces the `hex fafaf7` literal: the ramp declares no warm
        off-white, and globals.css:118 already names `hex f8fafc` (slate-50) as
        this site's `--surface`. Same role, one declared colour. */}
    <section className={`border-b border-slate-200 bg-slate-50 ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>{service.title}</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
        <NumberedReasons items={service.howWeHelp} />
      </div>
    </section>
    {service.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(service.faqs) }} />}
    {/* ADOPTED, and the old decline is STALE: FaqSection.tsx gained
        `alwaysRenderAnswers` (:18,31-35), which passes Radix `forceMount`
        through accordion.tsx:67-68 and adds `data-[state=closed]:hidden`. Every
        answer is therefore in the server HTML exactly as the hand-rolled
        <details> at :94-104 put it there, so the FAQPage JSON-LD emitted three
        lines above still asserts nothing the page does not carry. Both
        consumers are fed the SAME `service.faqs` array, so the rendered
        question/answer count and the JSON-LD count cannot diverge (T17).
        `html` is on because 5 of the 29 answer strings in the twin data file
        src/data/pharmacies-hubs.ts carry real <a> anchors and the two
        templates are one shape by rule (0 of 32 carry one in this file's data
        today, where `html` is therefore a no-op on identical text); the
        wrapper carries the same `linkOnLight`
        colour and ring those anchors had under the <details>, because the kit
        paints the answer body one flat text-slate-700 with no anchor hook.
        `eyebrow=""` is deliberate: the kit default is the word "FAQ", which
        this page does not publish, and this package writes no prose. An empty
        string is falsy at FaqSection.tsx:40, so no label renders. `title` is
        the h2 string this section already carried, verbatim.
        The accordion trigger's ring reads
        `var(--kit-focus-ring, var(--color-primary-600))` (accordion.tsx:39), the
        token globals.css binds, so K3 is CLOSED: no call-site override needed. */}
    {service.faqs.length > 0 && (
      <div className={linkOnLight}>
        <FaqSection
          eyebrow=""
          title="Common questions"
          faqs={service.faqs}
          html
          alwaysRenderAnswers
          className={`bg-white ${sectionY}`}
        />
      </div>
    )}
    {/* ADOPTED: packages/web-shared/design/marketing/LeadCTAPanel.tsx, fed the
        two strings this band already published at :114-115 byte-identical, and
        the same `<LeadForm submitLabel="Send enquiry" />` instance.
        `eyebrow=""` and `formTitle=""` are REQUIRED here (locked rules 9 / 8):
        the kit defaults are "Free consultation" (:18) and "Book your free
        consultation" (:27), and this site publishes neither sentence. Both are
        falsy at :153 and :191, so neither heading renders.
        `proofPoints={[]}`: the band published no tick rows, and writing three
        would be authoring copy.
        GROUND CHANGE, declared: the kit panel paints its own `bg-slate-900`
        (:103) and exposes no class hook, so this band moves from the brand
        `hex 0f3a4a` to slate-900. White 17.85 and the slate-200 description 13.59
        on bare slate-900; composited with the backdrop's 0.10 `hex 45cdff` at its
        strongest point = `hex 14293f`, white 14.80 and slate-300 9.97 (the row
        PharmaciesBackdrop.tsx:38-42 already measured for the kit footer, the
        same ground). All PASS. The `ground-dark` wrapper is a plain div for the
        same reason: the section class is the kit's, so the token rebind that
        the LeadForm's own rings read has to be bound on an ancestor. */}
    {/* M1a: W7's NextStepOffer, one mount per page, below the main content and
        before the closing LeadCTAPanel. Wrapped in the site container because
        the card is an `aside` with no container of its own. Renders null unless
        the kit SupportProvider has a behaviour-matched offer.

        UB2, R4 N3 (`adjacentSame=1`) RE-CHECKED AND NOT FIXED HERE, recorded
        instead. R4's measurement is right: this bare `div` is a band with no
        `<section>` and no ground, white, h=217, directly under the white
        FaqSection. R4's named fix is `<section className="bg-slate-50 py-12">`
        around it. The reason it is not taken from this file: NextStepOffer is a
        CLIENT component that returns null when the visitor has no
        behaviour-matched offer (`NextStepOffer.tsx:26`), and a server component
        cannot know that, so a padded grounded section would paint a ~96px empty
        slate-50 stripe on every route where no offer matches. Dropping the
        padding so the section collapses to zero height when empty instead
        leaves the slate-50 hugging the card with white above and below, which
        is not a band either. Both candidates are worse than the minor they
        close. The honest fix is `NextStepOffer` rendering its own grounded
        section when it has something to show, which is `components/intent/**`,
        not this file. Handed on, unchanged.

        BAND MAP after this round, grounds in doc order (unchanged by UB2, no
        ground added, removed or re-tinted): hero `bg-primary-950` DARK / stats
        `bg-slate-800` DARK / challenges `bg-white` LIGHT / how-we-help
        `bg-slate-50` LIGHT / FAQ `bg-white` LIGHT / this mount UNGROUNDED
        (white) / LeadCTAPanel `contained ground="slate"` LIGHT. Last band is
        light into the `slate-900` footer, as G3 left it. The two leading darks
        are two different grounds (`hex 0f3a4a` then `hex 1e293b`), not an
        adjacent repeat, and R4's own sweep reported `darkOnDark = 0` and the
        only `adjacentSame` on these routes as the one above. */}
    <section className="bg-slate-50 py-12"><div className={siteContainerLg}><NextStepOffer /></div></section>
    {/* G3 (grounds fix, V1 blocker B2): the slate-900 band was the last band
        before the slate-900 footer on all 8 of these URLs (darkOnDark). The
        panel moves to its own `contained` light variant with `ground="slate"`,
        because the band directly above is the white FaqSection and every
        service record publishes a non-empty `faqs` array, so the FAQ band
        always renders. Same copy, same `<LeadForm>`, same single mount; no new
        band, nothing removed. `.ground-dark` goes with it (the contained
        variant is a light card holding the form's focusable controls, the shape
        globals.css:222-225 forbids wrapping) and so does `backdrop`, which the
        kit renders on the navy variant only (LeadCTAPanel.tsx:72-77). */}
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
  </>);
}
