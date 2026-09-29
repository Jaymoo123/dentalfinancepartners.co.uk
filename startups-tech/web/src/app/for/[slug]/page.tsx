import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { startupsHubs, getStartupsHub } from "@/data/startups-hubs";
import { buildFaqJsonLd, buildServiceJsonLd } from "@/lib/schema";
import { siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";

export function generateStaticParams() { return startupsHubs.map((h) => ({ slug: h.slug })); }

/**
 * The records in src/data/startups-hubs.ts author real anchors inside `intro`,
 * `challenges[].body`, `howWeHelp[].body` and `faqs[].answer`. Those strings
 * are interpolated as HTML at every call site below (never as a JSX text
 * child), so the anchors need a colour and a ring from here. Same measurement
 * and same strings as src/app/services/[slug]/page.tsx: primary-700 (the 700 step)
 * is 7.90 on white and 7.60 on neutral-50; white on the primary-700 hero is
 * 7.90. The ring is written out because it must be scoped to descendant
 * anchors, but its VALUE is the same var(--focus-ring) every other ring on
 * this site reads.
 */
const authoredLinkRing = "[&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-[var(--focus-ring)]";
const linkOnLight = `[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800 ${authoredLinkRing}`;
const linkOnDark = `[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 ${authoredLinkRing}`;

/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero.
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 with slate-400 chevrons, written for the kit's navy: on
 * primary-700 they measure 4.11:1 and 2.90:1, under the 4.5 text and 3.0
 * graphic floors. Identical string on all four route files in this family.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getStartupsHub(slug);
  if (!hub) return {};
  return { title: { absolute: hub.metaTitle }, description: hub.metaDescription, alternates: { canonical: `${siteConfig.url}/for/${slug}` } };
}

export default async function StartupsHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = getStartupsHub(slug);
  if (!hub) notFound();
  return (<>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: buildServiceJsonLd({ name: hub.title, description: hub.metaDescription, url: `/for/${hub.slug}` }),
      }}
    />
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx,
        the token-gated noindex hero with a hardcoded slate-900 ground.

        ADOPTION DECLINED: `Eyebrow` from
        packages/web-shared/design/primitives/page-blocks.tsx. Adopting it means
        AUTHORING a new label above sections that have none, on five routes at
        once, and this package writes no prose. Reported to the manager.

        ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, replacing
        the hand-rolled "All company types" back link, whose words the parent
        crumb keeps VERBATIM. The Home crumb is not a new internal link: the kit
        header wordmark and SiteFooter already emit href="/" on every page, so
        the route's unique internal link set only grows (floor 2, now 3).
        The local buildBreadcrumbJsonLd script that stood here is REMOVED in the
        same edit: the kit component emits the BreadcrumbList itself, and two
        BreadcrumbList blocks on one URL is a schema defect.
        `ground-dark` goes on with it: without the rebind the ring on the
        breadcrumb and the hero CTA paints primary-600 on a primary-700 ground,
        about 1.26:1. No light island sits inside this section. */}
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "All company types", href: "/for" }, { label: hub.title }]}
          />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{hub.headline}.</h1>
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/80 ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: hub.intro }} />
        <div className="mt-10"><Link href="/contact" className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 hover:bg-white/90 transition-colors ${focusRing}`}>Get in touch</Link></div>
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx.
        Its StatItem is `target: number` with a prefix/suffix; these values are
        strings and every label is a full sentence. */}
    <section className="bg-neutral-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {hub.stats.map((stat) => (
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
        authored anchor. packages/web-shared/design/primitives/page-blocks.tsx
        `CardStack` DOES render HTML safely (`html?: boolean` at :99, checked
        before declining), but it exposes no hook for the anchor colour and
        focus ring those bodies need, and its `columns` prop is typed `1 | 2`,
        so it cannot lay out the three-up "How we help" grid.
        packages/web-shared/design/marketing/ProblemStatement.tsx carries
        Property's landlord copy with no copy props. */}
    <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What makes {hub.title.toLowerCase()} tax different.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {hub.challenges.map((item) => (
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
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help {hub.title.toLowerCase()}.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {hub.howWeHelp.map((item) => (
            <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-primary-600 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed text-neutral-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    {hub.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(hub.faqs) }} />}
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
        A Radix accordion with no `forceMount` (:34-43): a closed answer is
        absent from the server HTML while the FAQPage JSON-LD emitted above
        keeps asserting it. The native <details> below renders every answer into
        the server HTML, and both consumers are fed the SAME `hub.faqs` array.
        Swapping the kit component in would be a crawlability regression on five
        audience pages at once. */}
    {hub.faqs.length > 0 && (
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
            <div className="space-y-3 sm:space-y-4">
              {hub.faqs.map((faq) => (
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
      description={`Tell us about your ${hub.title.toLowerCase()} situation and we will reply within 24 hours.`}
      proofPoints={[]}
      form={<LeadForm submitLabel="Send enquiry" />}
    />
  </>);
}
