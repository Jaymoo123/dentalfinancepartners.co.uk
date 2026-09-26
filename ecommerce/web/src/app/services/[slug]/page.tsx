import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { ecommerceServices, getService } from "@/data/services";
import { buildFaqJsonLd } from "@/lib/schema";
import { btnPrimary, siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";

export function generateStaticParams() { return ecommerceServices.map((s) => ({ slug: s.slug })); }

/**
 * The records in src/data/services.ts author real anchors inside `intro`,
 * `challenges[].body`, `howWeHelp[].body`, `faqs[].answer` and `stats[].label`.
 * Those strings are interpolated as HTML (see each call site), so a link needs
 * a colour here: nothing on these sections is inside `.prose-blog`, and a
 * UA-default blue link is neither the brand nor legible on the dark bands.
 *
 * primary-700 is #8a5e1a, 5.68 on white and 5.44 on #fafaf7. The brand hex
 * #c9861b is 3.04 on white and is decoration only, so it is never used here.
 * On the dark grounds (#8a5e1a hero, neutral-800 stats band) the link is white:
 * 5.68 on the hero, 15.1 on neutral-800.
 */
const linkOnLight = "[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800";
const linkOnDark = "[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2";

/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero.
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 with slate-400 chevrons, both written for the kit's navy: on
 * #8a5e1a they measure 3.76:1 and about 2.0:1, under the 4.5 text and 3.0
 * graphic floors. The kit is a carve-out, so the ground-correct palette is
 * applied from the call site (white 5.68, white/80 4.3). Identical string on
 * all three slug templates.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: { absolute: service.metaTitle }, description: service.metaDescription, alternates: { canonical: `${siteConfig.url}/services/${slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return (<>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its header says it is the token-gated noindex hero and is "deliberately
        not the content-page hero"; its slate-900 ground would also replace the
        locked #8a5e1a brand hero.

        ADOPTION DECLINED here only: `Eyebrow onDark` from
        packages/web-shared/design/primitives/page-blocks.tsx. The on-dark branch
        is text-slate-300 (#cbd5e1), measured 3.83:1 on this #8a5e1a ground,
        under the 4.5 floor for an 11-12px label. Eyebrow IS adopted below on
        the light sections, where its slate-600 branch clears the floor.

        ADOPTED (reconciled with /vat, which adopted it first):
        packages/web-shared/design/primitives/Breadcrumb.tsx, replacing the
        hand-rolled back link. The parent crumb keeps the authored back-link
        words verbatim ("All services"), so no copy is written or dropped, and
        the Home crumb is not a new internal link: the kit header wordmark
        (packages/web-shared/design/chrome/SiteHeader.tsx:128) and footer
        (SiteFooter.tsx:145) already emit href="/" on every page, so the route's
        UNIQUE internal link set is unchanged. It also emits a BreadcrumbList
        JSON-LD; nothing else on this route emits one. */}
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
        {/* `intro` is authored HTML (anchors to gov.uk and to sibling routes).
            Rendered as HTML because interpolating it as a text child printed
            the escaped markup on the page and killed the links. Safe: this is
            first-party content committed in src/data/services.ts, never user
            input. */}
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/80 ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: service.intro }} />
        <div className="mt-10"><Link href="/contact" className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 hover:bg-white/90 transition-colors ${focusRing}`}>Get in touch</Link></div>
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx.
        Its StatItem is `target: number` with a prefix/suffix, and these values
        are not numbers ("Gross sales"). Every label is a full sentence, and it
        renders no markup in one; the sibling band on app/vat/[slug] carries
        citation anchors in exactly this field, so the label is rendered as HTML
        here too. Swapping the component in would delete both. */}
    {/* `ground-dark` added: this band now carries links (the authored citation
        anchors in stats[].label), and the default focus ring is #8a5e1a, which
        is 2.67:1 against neutral-800. The rebind makes it white, 15.1:1. No
        light island sits inside this section. */}
    <section className="ground-dark bg-neutral-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {service.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col sm:text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
              <div className={`mt-1 text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: stat.label }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    {/* ADOPTION REVERSED: CardStack from
        packages/web-shared/design/primitives/page-blocks.tsx was adopted for
        these two grids and is now declined. Its line 105 renders the body as
        `<p ...>{item.body}</p>`, a TEXT child, and every body in
        src/data/services.ts is authored HTML: as plain text the anchors printed
        as escaped markup and the authored links did not exist. The kit is a
        manager carve-out, so the component cannot be given an HTML branch here;
        the local markup below carries the same records, in the same order, in
        the shape the two sibling templates (app/for/[slug] and app/vat/[slug])
        already use, and renders the HTML.
        ADOPTION DECLINED for these two grids:
        packages/web-shared/design/marketing/CoverageCards.tsx (needs a
        LucideIcon per item, which is an invented icon mapping plus a
        lucide-react dependency this app does not declare) and
        packages/web-shared/design/marketing/WhyUsList.tsx (a numbered
        why-choose-us list; these are problem statements, not reasons to buy). */}
    <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>The problem</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The challenges clients face.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {service.challenges.map((item) => (
            <article key={item.title} className="border border-neutral-200 border-l-4 border-l-primary-400 bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
              <div className={`mt-4 text-base leading-relaxed text-neutral-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className={`border-b border-neutral-200 bg-[#fafaf7] ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>The work</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {service.howWeHelp.map((item) => (
            <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-primary-400 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
              <div className={`mt-3 text-sm leading-relaxed text-neutral-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    {service.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(service.faqs) }} />}
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
        It is a Radix accordion with no forceMount, so a closed answer is absent
        from the server HTML, while the FAQPage JSON-LD emitted immediately above
        asserts every answer. Shipping schema for text the page does not contain
        is the defect a sibling site had to unwind, and phase 2 declined this
        same component on the blog template for the same reason. Native <details>
        keeps every answer server-rendered and still collapses. Revisit only if
        the kit gains forceMount. */}
    {service.faqs.length > 0 && (
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
            <div className="space-y-3 sm:space-y-4">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group border border-neutral-200 bg-white">
                  {/* Hover colour is text-primary-700 (#8a5e1a, 5.68 on white).
                      The brand hex #c9861b is 3.04 on white and is decoration
                      only; it stays on the icon, which is a graphic at 3:1. */}
                  <summary className={`flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-primary-700 transition-colors list-none ${focusRing}`}>
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-primary-400 transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                    </span>
                  </summary>
                  {/* Authored HTML, same reason as the intro above. The FAQPage
                      JSON-LD emitted a few lines up gets the tags stripped in
                      src/lib/schema.ts, so the schema text stays plain. */}
                  <div className={`px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}
    {/* ADOPTION DECLINED on this band:
        packages/web-shared/design/marketing/LeadCTAPanel.tsx (adds a
        lead-capture surface, owner-gated),
        packages/web-shared/design/marketing/StickyCTA.tsx (an interruption),
        packages/web-shared/design/marketing/TestimonialsSection.tsx (hardcodes
        another site's quotes; this site has no authored social proof) and
        packages/web-shared/design/marketing/WhatToExpectCard.tsx (its default
        props publish a fee line nobody here authored).
        `.ground-dark` rebinds --focus-ring for this section. Do not remove it. */}
    <section className={`ground-dark bg-neutral-900 ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-2xl font-bold text-white sm:text-4xl">Speak to an ecommerce tax specialist.</h2>
        <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-neutral-200">Tell us about your situation and we will reply within 24 hours.</p>
        <div className="mt-8"><Link href="/contact" className={btnPrimary}>Get in touch</Link></div>
      </div>
    </section>
  </>);
}
