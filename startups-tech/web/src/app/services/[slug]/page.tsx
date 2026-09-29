import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { startupsServices, getStartupsService } from "@/data/startups-services";
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/schema";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import StartupsBackdrop from "@/components/layout/StartupsBackdrop";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { FaqSection } from "@accounting-network/web-shared/design/primitives/FaqSection";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export function generateStaticParams() { return startupsServices.map((s) => ({ slug: s.slug })); }

/**
 * The records in src/data/startups-services.ts author real anchors inside
 * `intro`, `challenges[].body`, `howWeHelp[].body` and `faqs[].answer`. Those
 * strings are interpolated as HTML at every call site below (never as a JSX
 * text child, which printed escaped markup and killed the links on this site
 * once already), so the anchors need a colour and a ring from here: nothing on
 * these sections is inside a prose class, and a UA-default blue link is
 * neither the brand nor legible.
 *
 * primary-700 is the 700 step, 7.90 on white and 7.60 on slate-50. The brand step
 * primary-600 measures 6.29 on white and is also legal here; 700 is
 * used so an in-body link is a step darker than the surrounding brand
 * furniture rather than the same value. On the primary-700 hero the link is
 * white, 7.90.
 *
 * The ring is written out rather than taken from `focusRing`, because it has
 * to be scoped to the descendant anchors; the VALUE is the same
 * var(--focus-ring) custom property every other ring on this site reads.
 */
const authoredLinkRing = "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";
const linkOnLight = `[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800 ${authoredLinkRing}`;
const linkOnDark = `[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 ${authoredLinkRing}`;

/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero.
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 with slate-400 chevrons, both written for the kit's navy: on
 * primary-700 (the 700 step) they measure 4.11:1 and 2.90:1, under the 4.5 text and
 * 3.0 graphic floors. The kit is a manager carve-out, so the ground-correct
 * palette is applied from the call site. Identical string on all four route
 * files in this family.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getStartupsService(slug);
  if (!service) return {};
  return { title: { absolute: service.metaTitle }, description: service.metaDescription, alternates: { canonical: `${siteConfig.url}/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getStartupsService(slug);
  if (!service) notFound();
  return (<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildServiceJsonLd({ name: service.title, description: service.metaDescription, url: `/services/${service.slug}` }),
      }}
    />
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its own header states it is the shallow hero for the token-gated
        noindex pages and is "deliberately not the content-page hero"; it also
        hardcodes a slate-900 ground, which would replace the locked indigo.

        ADOPTION DECLINED: `Eyebrow` from
        packages/web-shared/design/primitives/page-blocks.tsx. Every section
        here opens with an authored h2 and carries no label; adopting Eyebrow
        would mean AUTHORING a new label string on six routes at once, and this
        package writes no prose. Reported to the manager.

        ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, replacing
        the hand-rolled "All services" back link. The parent crumb keeps that
        back link's words VERBATIM, so no copy is written or dropped, and it is
        also the nav child label in src/app/layout.tsx:44. The Home crumb is not
        a new internal link: the kit header wordmark and SiteFooter already emit
        href="/" on every page, so the route's unique internal link set only
        grows (floor 2, now 3 before authored anchors).
        The local buildBreadcrumbJsonLd script that stood here is REMOVED in the
        same edit: the kit component emits the BreadcrumbList itself
        (Breadcrumb.tsx:26 via schema/breadcrumb + schema/serialize), and two
        BreadcrumbList blocks on one URL is a schema defect, not a belt-and-
        braces. One binding, one consumer.
        `ground-dark` goes on with it: the breadcrumb and the hero CTA are the
        focusable elements in this hero, and without the rebind the ring paints
        primary-600 on a primary-700 ground, about 1.26:1. No light island sits
        inside this section.

        ADOPTED (U2 item 1): src/components/layout/StartupsBackdrop.tsx. Its
        contrast table carries this ground: on bg-primary-700 #4338ca the
        composite at the motif's strongest point is #4940cf, white 7.20 and
        slate-300 4.85, both past the 4.5 text floor, so the white h1, the
        white/80 standfirst and the white hero button are unaffected. Host
        contract (`relative overflow-hidden` on the section, `relative z-10` on
        the content) added with it. */}
    <section className="ground-dark relative overflow-hidden border-b border-slate-200 bg-primary-700 py-16 sm:py-20">
      <StartupsBackdrop />
      <div className={`${siteContainerLg} relative z-10`}>
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "All services", href: "/services" }, { label: service.title }]}
          />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{service.headline}.</h1>
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/80 ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: service.intro }} />
        {/* U2 item 4: instrumentation only. The link, its destination and its
            label are unchanged; the three attributes match generalist's naming
            (generalist/web/src/app/services/page.tsx:193-196) so
            vw_cta_performance reads the same series across sites. */}
        <div className="mt-10"><Link href="/contact" data-cta="services_hero_book" data-cta-placement="hero" data-cta-goal="form" className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 hover:bg-white/90 transition-colors ${focusRing}`}>Get in touch</Link></div>
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx,
        re-measured 2026-09-29. The old reason ("StatItem is `target: number`,
        these values are strings") is STALE: `StatItem.value?: string` exists
        (StatsCounter.tsx:10-15) and renders literal text. Two measured reasons
        survive and both are hard:
        - its figure is `text-slate-900` (StatsCounter.tsx:118), a hardcoded
          light-ground colour with no tone prop. This band is a DARK one
          (bg-slate-800 #1e293b); slate-900 #0f172a on it measures 1.20:1,
          invisible. Nothing at the call site can override it, the class is on
          the component's own div.
        - its layout is a fixed `grid-cols-2 md:grid-cols-4` (:117) and this
          band publishes THREE figures, which would leave a hole in row one.
        Both are kit-file changes, so both are manager carve-outs, not builder
        decisions. */}
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
    {/* ADOPTION DECLINED for both card grids below, re-measured 2026-09-29.
        The "escaped markup" half is STALE and has been dropped: both components
        now take `html` (CoverageCards.tsx:35, page-blocks.tsx:99). What still
        stands, measured:
        - packages/web-shared/design/primitives/page-blocks.tsx `CardStack`
          types `columns` as `1 | 2` (:99), so it cannot lay out the three-up
          "How we help" grid at all, and it exposes no hook for the anchor
          colour and focus ring that challenges[].body and howWeHelp[].body
          need (its body is one fixed `text-slate-700` <p>), so every authored
          anchor would paint UA-default blue with no visible ring.
        - packages/web-shared/design/marketing/CoverageCards.tsx `CoverageItem`
          (:5-15) REQUIRES an `icon: LucideIcon` per card. Neither
          src/data/startups-services.ts nor the six service records publish an
          icon, so adopting it means choosing six glyphs, which is authoring.
          Same missing anchor-colour hook as CardStack.
        - packages/web-shared/design/marketing/ProblemStatement.tsx carries
          Property's landlord copy with no copy props (:33-40).
        ADOPTED instead on both grids:
        packages/web-shared/design/marketing/ScrollGlowGroup.tsx, a wrapper that
        changes no markup, no copy and no anchor inside it. */}
    <section className={`border-b border-slate-200 bg-white ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The challenges clients face.</h2>
        <ScrollGlowGroup className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {service.challenges.map((item) => (
            <article key={item.title} className="border border-slate-200 border-l-4 border-l-primary-600 bg-slate-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className={`mt-4 text-base leading-relaxed text-slate-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </article>
          ))}
        </ScrollGlowGroup>
      </div>
    </section>
    <section className={`border-b border-slate-200 bg-slate-50 ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
        <ScrollGlowGroup className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {service.howWeHelp.map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 p-6 sm:p-8 hover:border-primary-600 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed text-slate-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          ))}
        </ScrollGlowGroup>
      </div>
    </section>
    {service.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(service.faqs) }} />}
    {/* ADOPTED, and the previous decline is now STALE: the kit
        packages/web-shared/design/primitives/FaqSection.tsx gained
        `alwaysRenderAnswers` (:17,31-35), which passes Radix `forceMount`
        through packages/web-shared/design/primitives/accordion.tsx:52-64 and
        adds `data-[state=closed]:hidden`. Every answer is therefore in the
        server HTML exactly as the hand-rolled <details> put it there, so the
        FAQPage JSON-LD emitted three lines above still asserts nothing the
        page does not carry. Both consumers are fed the SAME `service.faqs`
        array, so the rendered question/answer count and the JSON-LD count
        cannot diverge.
        `html` is on because 22 of the answer strings in
        src/data/startups-services.ts carry real <a> anchors; the wrapper div
        carries the same linkOnLight colour and ring those anchors already had
        under the <details>, because the kit paints the answer body one flat
        text-slate-700 with no anchor hook.
        `eyebrow=""` is deliberate: the kit default is the word "FAQ", which
        this page does not publish, and this package writes no prose. An empty
        string is falsy at FaqSection.tsx:39, so no label renders. `title` is
        the h2 string this section already carried, verbatim. */}
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
    <LeadCTAPanel
      title="Speak to a startup tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      form={<LeadForm submitLabel="Send enquiry" />}
      backdrop={<StartupsBackdrop patternId="service-detail-panel" />}
    />
  </>);
}
