import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { hospitalityServices, getHospitalityService } from "@/data/hospitality-services";
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/schema";
import { focusRing, siteContainerLg } from "@/components/ui/layout-utils";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export function generateStaticParams() {
  return hospitalityServices.map((s) => ({ slug: s.slug }));
}

/**
 * `intro`, `challenges[].body`, `howWeHelp[].body` and one `faqs[].answer` in
 * src/data/hospitality-services.ts author real anchors and are interpolated as
 * HTML at every call site below. Nothing here sits inside a `.prose` class and
 * Tailwind preflight strips the UA link colour and underline, so the anchor
 * treatment has to come from here or the links become invisible body text.
 *
 * The VALUES are the ones this template already shipped, restated as ramp
 * utilities: #b0532f is the primary-600 step and #8f421f the primary-700 step
 * (globals.css:77-78). No colour changes; the hex literals do.
 *
 * The ring is written out rather than taken from `focusRing` because it has to
 * be scoped to the descendant anchors. The VALUE is the same var(--focus-ring)
 * custom property every other ring on this site reads, so it follows
 * `.ground-dark` exactly as the shared recipe does. These anchors had NO
 * focus ring at all before this package.
 */
const authoredLinkRing =
  "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";
const linkOnLight = `[&_a]:text-primary-600 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-700 ${authoredLinkRing}`;
const linkOnBrand = `[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 ${authoredLinkRing}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getHospitalityService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `${siteConfig.url}/services/${slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getHospitalityService(slug);
  if (!service) notFound();

  return (
    <>
      {/* 2026-09-28 parity fix (brief section 5, G3): had FAQPage but no
          Service node and no BreadcrumbList. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: buildServiceJsonLd({
            name: service.headline,
            description: service.metaDescription,
            url: `/services/${slug}`,
          }),
        }}
      />
      {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx,
          tone="onBrand" (Breadcrumb.tsx:29-33, the recipe written for a
          mid-tone brand ground: white links, white/80 chevron, which measures
          3.87 on #b0532f and clears the 3.0 GRAPHIC floor the chevron is held
          to). No crumbOnBrand arbitrary-variant string, no hand-rolled trail.
          It replaces the "All services" back-link that stood at :63-65, and the
          "Services" crumb carries the same destination. The local <JsonLd
          buildBreadcrumb> block that stood here is REMOVED in the same edit:
          the kit component emits the BreadcrumbList itself (Breadcrumb.tsx:86),
          and two BreadcrumbList nodes on one URL is a schema defect. One
          binding, one emitter. Crumb labels are the site's published route
          names (hospitality/niche.config.json navigation) plus service.title,
          so no copy is authored.

          ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
          Its section ground is the hardcoded literal `bg-slate-900`
          (SlimHero.tsx:36) with no prop to override it, so adopting it repaints
          five brand heroes navy. That is a designer-set colour, locked rule 7.
          Kit gap K1.

          ADOPTION DECLINED (hero only): `Eyebrow` from
          packages/web-shared/design/primitives/page-blocks.tsx. The hero's only
          candidate label is "Services", which the Breadcrumb renders one line
          above; two printings of the same word in one viewport, or a new word,
          which is authoring. Eyebrow IS adopted below on the "Other services"
          rail, which already publishes an uppercase micro-label.

          ADOPTED: src/components/layout/HospitalityBackdrop.tsx, host contract
          applied (`relative overflow-hidden` on the section, `relative z-10` on
          the content). Its patternId is set per mount because a DOM id must be
          unique per document and PageShell.tsx:137 already mounts the default
          id in the footer of every page.
          Contrast row for the manager's table, this ground: bg-primary-600
          #b0532f, composite at the motif's strongest point #b55834. White 5.09
          bare / 4.76 composited, PASS. The white/80 standfirst is 3.87 bare /
          3.66 composited, SUB-FLOOR, and it was sub-floor before this package;
          reported rather than silently reworded.
          `.ground-dark` goes on with it: the breadcrumb links, the authored
          anchors in the standfirst and the hero button are the focusable
          elements here, and the light ring would paint primary-600 on
          primary-600. No light-ground card with focusable children sits inside
          this section (globals.css:213-215). */}
      <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-600 py-16 sm:py-20">
        <HospitalityBackdrop patternId="service-hero" />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb
            tone="onBrand"
            siteUrl={siteConfig.url}
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title ?? service.headline },
            ]}
          />
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {service.headline}.
          </h1>
          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/80 ${linkOnBrand}`}
            dangerouslySetInnerHTML={{ __html: service.intro }}
          />
          <div className="mt-10">
            {/* data-cta on the control, never on the wrapper (R5 B2). The link,
                its destination and its label are unchanged; the ring is new. */}
            <Link
              href="/contact"
              data-cta="service_hero_contact"
              data-cta-placement="hero"
              data-cta-goal="form"
              className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-600 hover:bg-white/90 transition-colors ${focusRing}`}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* ADOPTION DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx,
          measured on the working tree 2026-09-29. The plan's ADOPT row rests on
          `.ground-dark` carrying this band, and it does not: globals.css:209-212
          rebinds --focus-ring and --kit-focus-ring only, never a text colour.
          Two reasons stand, both testable and both inside the kit file:
          - the figure is `text-slate-900` and the label `text-slate-500`,
            hardcoded at StatsCounter.tsx:119 and :133 on the component's own
            divs, with no tone prop and no className. This band is DARK
            (bg-slate-800 #1e293b): slate-900 #0f172a on it measures 1.20:1 and
            slate-500 #64748b measures 2.72:1. Invisible, and nothing at the
            call site can reach either class.
          - the layout is a fixed `grid-cols-2 md:grid-cols-4`
            (StatsCounter.tsx:116) and every record here publishes THREE stats,
            which leaves a hole in row one.
          `StatItem.value` (:15) does answer the old string-value half of
          Property's decline at Property/web/src/app/for/[slug]/page.tsx:81, and
          every value here ("0%", "£12.71", "£90,000", "Margin only", "Ended")
          would render correctly through it. That half is dropped. Both surviving
          reasons are kit-file changes, so both are manager carve-outs.
          the neutral 800 and 400 steps become the slate 800 and 400 steps, the same
          steps on the slate ramp; white on slate-800 is 14.63 and slate-400 on
          slate-800 is 5.71, both PASS. No .ground-dark: nothing in this band is
          focusable. */}
      <section className="bg-slate-800 py-8 sm:py-10">
        <div className={siteContainerLg}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
            {service.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col sm:text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADOPTED on both card grids below:
          packages/web-shared/design/marketing/ScrollGlowGroup.tsx. A wrapper
          only: it changes no markup, no copy and no anchor inside it, and the
          motion layer it keys off is live (globals.css:19-31).

          ADOPTION DECLINED for both grids, measured today:
          - packages/web-shared/design/primitives/page-blocks.tsx `CardStack`.
            The "prints escaped markup" half is STALE (`html` exists at :92/:99)
            and is dropped. What stands: its body is one fixed
            `text-slate-700` <p> built at page-blocks.tsx:104 with no className
            and no anchor hook, and six `body` strings in
            src/data/hospitality-services.ts carry real <a> anchors (`grep -c
            'body:.*<a ' src/data/hospitality-services.ts` = 6). Under preflight
            those anchors would paint as plain slate-700 with no underline and
            no ring, so the reader cannot tell a link from a sentence. Its
            `columns` is also typed `1 | 2` (:91), so it cannot lay out the
            three-up "How we help" grid at all.
          - packages/web-shared/design/marketing/CoverageCards.tsx. Same missing
            anchor hook, plus `CoverageItem.icon: LucideIcon` is REQUIRED
            (CoverageCards.tsx:15) and no record publishes an icon, so adopting
            it means choosing glyphs, which is authoring. `html` at :35 exists,
            so that half of the old reason is dropped. Kit gap K2.
          - packages/web-shared/design/marketing/ProcessTimeline.tsx takes
            `{n, title, body}[]`; neither data file publishes numbered staged
            steps and inventing the `n` labels is authoring copy.
          - packages/web-shared/design/marketing/ProblemStatement.tsx hardcodes
            Property's landlord copy and a "Book your free first call" button
            with no copy props (:33-56). Kit gap K6.
          - packages/web-shared/design/marketing/ComparisonTable.tsx forces a
            "Most recommended" pill this site does not publish.
          - packages/web-shared/design/marketing/WhatToExpectCard.tsx. Locked
            rule 17 says always pass `items`; the problem is that there are no
            items to pass. No record on these routes publishes a staged
            what-happens-next list, and feeding it the `howWeHelp` titles would
            reprint the section directly below it, verbatim, in a navy card.
            Its default `items` (WhatToExpectCard.tsx:22-27) publish the fee
            line "Fixed fee quote if you decide to proceed", which this site
            does not publish anywhere, so taking the default is not an option
            either.
          - packages/web-shared/design/marketing/DrawnTickList.tsx takes
            `items: string[]`, a list of short claims. Every list on this route
            is {title, body} pairs; flattening a pair into one tick line would
            either drop the body or author a new sentence. */}
      <section className="border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The challenges operators face.</h2>
          <ScrollGlowGroup className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
            {service.challenges.map((item) => (
              <article key={item.title} className="border border-slate-200 border-l-4 border-l-primary-600 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p
                  className={`mt-4 text-base leading-relaxed text-slate-600 ${linkOnLight}`}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </article>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
          <ScrollGlowGroup className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
            {service.howWeHelp.map((item) => (
              <div key={item.title} className="bg-white border border-slate-200 p-6 sm:p-8 hover:border-primary-600 hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p
                  className={`mt-3 text-sm leading-relaxed text-slate-600 ${linkOnLight}`}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
              </div>
            ))}
          </ScrollGlowGroup>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(service.faqs) }} />
      )}
      {/* ADOPTED: packages/web-shared/design/primitives/FaqSection.tsx, replacing
          the hand-rolled <details> block. The previous decline is STALE on both
          halves: `alwaysRenderAnswers` (:19,:31-35) passes Radix forceMount so
          every answer is in the SERVER HTML exactly as <details> put it there,
          and `html` (:18,:27-30) renders the answer as markup.
          `html` is what restores the anchor phase 0's F1 had to strip: this
          template rendered {faq.answer} as a JSX text child at the old :145, so
          the one authored <a> printed as escaped text and F1 reworded it out.
          The original string is restored byte-for-byte in
          src/data/hospitality-services.ts and now renders as a real link.
          Both consumers are fed the SAME `service.faqs` array, three lines
          apart, so the FAQPage JSON-LD cannot assert an answer the markup does
          not carry (one binding, two consumers).
          `eyebrow=""` is deliberate: the kit default is the word "FAQ", which
          this page does not publish, and an empty string is falsy at
          FaqSection.tsx:41 so no label renders. `title` is this section's own
          h2 string, verbatim. `tone="white"` keeps the white card surface the
          <details> had. The linkOnLight wrapper carries the anchor colour and
          ring the kit answer body has no hook for. */}
      {service.faqs.length > 0 && (
        <div className={linkOnLight}>
          <FaqSection
            eyebrow=""
            title="Common questions"
            faqs={service.faqs}
            tone="white"
            html
            alwaysRenderAnswers
            className="bg-white py-12 sm:py-16 lg:py-20"
          />
        </div>
      )}

      {/* 2026-09-28 parity fix (brief section 4): this page rendered zero forms,
          only a /contact link. Swapped for the shared LeadCTAPanel + this
          site's own LeadForm, same pattern as ecommerce's /services/[slug].
          W3 changes no string here. `backdrop` added (LeadCTAPanel.tsx:78); the
          panel's ground is bg-slate-900 (:101), the ground the backdrop's own
          contrast table already carries from phase 1. NO .ground-dark wrapper:
          the form sits in a rounded-xl bg-white card (:191) and the custom
          property inherits, so wrapping would rebind every input ring to white
          on white, the hazard globals.css:213-215 names. Nothing on the panel's
          dark half is focusable. */}
      <LeadCTAPanel
        eyebrow=""
        title="Speak to a hospitality accounts specialist."
        description="Tell us about your hospitality business and we will reply within 24 hours. No obligation."
        proofPoints={[]}
        formTitle=""
        form={<LeadForm submitLabel="Request callback" />}
        backdrop={<HospitalityBackdrop patternId="service-cta" />}
      />

      <section className="bg-[#fafaf7] py-12 sm:py-16">
        <div className={siteContainerLg}>
          {/* ADOPTED: `Eyebrow` from
              packages/web-shared/design/primitives/page-blocks.tsx, fed this
              rail's OWN published label, unchanged. This is the site's
              hand-rolled uppercase micro-label recipe replaced by the kit's,
              which adds the brand EyebrowRule mark and lifts the text from the
              neutral 500 step to slate-600 (4.55 -> 7.25 on this ground). */}
          <Eyebrow>Other services</Eyebrow>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {hospitalityServices.filter((s) => s.slug !== slug).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className={`group block border border-slate-200 bg-white p-4 transition-all hover:border-primary-600 hover:shadow-sm ${focusRing}`}>
                <span className="text-sm font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">{s.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
