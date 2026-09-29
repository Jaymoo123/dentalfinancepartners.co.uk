import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { startupsServices, getStartupsService } from "@/data/startups-services";
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/schema";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
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
 * primary-700 is the 700 step, 7.90 on white and 7.60 on neutral-50. The brand step
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
        inside this section. */}
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "All services", href: "/services" }, { label: service.title }]}
          />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{service.headline}.</h1>
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/80 ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: service.intro }} />
        <div className="mt-10"><Link href="/contact" className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 hover:bg-white/90 transition-colors ${focusRing}`}>Get in touch</Link></div>
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx.
        Its StatItem is `target: number` with a prefix/suffix; these values are
        strings such as "86% + 14.5%" and every label is a full sentence, so the
        component would render neither. */}
    <section className="bg-neutral-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {service.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col sm:text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
              <div className="mt-1 text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    {/* ADOPTION DECLINED for both card grids below:
        packages/web-shared/design/marketing/CoverageCards.tsx renders its body
        as a JSX text child, which would print escaped markup and kill every
        authored anchor in challenges[].body and howWeHelp[].body.
        packages/web-shared/design/primitives/page-blocks.tsx `CardStack` DOES
        render HTML safely (`html?: boolean` at :99, checked before declining),
        but it exposes no hook for the anchor colour and focus ring those bodies
        need, so its links would paint UA-default blue with no visible ring; and
        its `columns` prop is typed `1 | 2`, so it cannot lay out the three-up
        "How we help" grid at all. Declined on both counts, not on the HTML one.
        packages/web-shared/design/marketing/ProblemStatement.tsx carries
        Property's landlord copy with no copy props. */}
    <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The challenges clients face.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {service.challenges.map((item) => (
            <article key={item.title} className="border border-neutral-200 border-l-4 border-l-primary-600 bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
              <p className={`mt-4 text-base leading-relaxed text-neutral-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className={`border-b border-neutral-200 bg-neutral-50 ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {service.howWeHelp.map((item) => (
            <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-primary-600 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed text-neutral-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    {service.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(service.faqs) }} />}
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
        It is a Radix accordion with no `forceMount` (:34-43), so a closed answer
        is absent from the server HTML while the FAQPage JSON-LD emitted three
        lines above keeps asserting it. The native <details> below renders every
        answer into the server HTML today, and both consumers are fed the SAME
        `service.faqs` array, which is the property wave-close test F14 checks.
        Swapping the kit component in would be a crawlability regression on six
        service pages at once. Two sibling sites have refused it in writing. */}
    {service.faqs.length > 0 && (
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
            <div className="space-y-3 sm:space-y-4">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group border border-neutral-200 bg-white">
                  <summary className={`flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-primary-700 transition-colors list-none ${focusRing}`}>
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-primary-600 transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                    </span>
                  </summary>
                  <div className={`px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}
    <LeadCTAPanel
      title="Speak to a startup tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      form={<LeadForm submitLabel="Send enquiry" />}
    />
  </>);
}
