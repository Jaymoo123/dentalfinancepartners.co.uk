import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { siteConfig } from "@/config/site";
import { sellerHubs, getHub } from "@/data/for";
import { buildFaqJsonLd } from "@/lib/schema";
import { btnPrimary, siteContainerLg, sectionY, focusRing } from "@/components/ui/layout-utils";

export function generateStaticParams() { return sellerHubs.map((h) => ({ slug: h.slug })); }

/**
 * Every `intro`, `challenges[].body`, `howWeHelp[].body` and `faqs[].answer` in
 * src/data/for.ts is authored HTML with real anchors, so the strings are
 * rendered as HTML (see each call site) and the links need a colour: these
 * sections are not inside `.prose-blog` and a UA-default blue link is neither
 * the brand nor legible on the dark bands.
 *
 * primary-700 is #8a5e1a, 5.68 on white and 5.44 on #fafaf7. The brand hex
 * #c9861b (primary-400) is 3.04 on white, decoration only, never a link. On the
 * dark grounds the link is white: 5.68 on the primary-700 hero, 15.1 on the
 * neutral-800 stats band. Same two recipes as app/services/[slug] and
 * app/vat/[slug].
 */
const linkOnLight = "[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800";
const linkOnDark = "[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2";

/**
 * Contrast wrapper for the adopted kit Breadcrumb on the brand hero.
 *
 * packages/web-shared/design/primitives/Breadcrumb.tsx paints its onDark trail
 * slate-300 (#cbd5e1) with slate-400 chevrons. Both were written for the kit's
 * navy; on this site's primary-700 ground (#8a5e1a) slate-300 measures 3.76:1
 * and slate-400 about 2.0:1, under the 4.5 text floor and the 3.0 graphic
 * floor. The kit is a carve-out and cannot be given a brand branch, so the
 * ground-correct palette is applied from the call site: white is 5.68 on
 * #8a5e1a and white/80 (blends to #e7dfd1) is 4.3. Descendant selectors, so
 * they outrank the component's own single-class utilities without !important.
 * Identical string on all three slug templates.
 */
const crumbOnBrand = "[&_a]:text-white [&_a]:hover:text-white [&_svg]:text-white/80";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getHub(slug);
  if (!hub) return {};
  return { title: { absolute: hub.metaTitle }, description: hub.metaDescription, alternates: { canonical: `${siteConfig.url}/for/${slug}` } };
}

export default async function SellerHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = getHub(slug);
  if (!hub) notFound();
  return (<>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/SlimHero.tsx.
        Its header says it is deliberately not the content-page hero: fixed
        bg-slate-900, no CTA row, written for the noindex token-gated pages.
        This hero is indexed, carries the page CTA and paints the brand ground
        #8a5e1a (white on it is 5.68).
        `ground-dark` added, not removed: on a brand ground every focus ring
        must resolve to the on-brand white, not the default #8a5e1a ring, which
        would be 1.00 against its own ground. Rings paint two pixels outside
        their control, so the white button below is not a light island for this
        purpose. Same treatment the research heroes carry. */}
    <section className="ground-dark border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      <div className={siteContainerLg}>
        {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, the
            same call the two sibling families now make. The parent crumb keeps
            the authored back-link words verbatim ("All seller types"), so no
            copy is written or dropped; the Home crumb is not a new internal
            link, because the kit header wordmark
            (packages/web-shared/design/chrome/SiteHeader.tsx:128) and footer
            (SiteFooter.tsx:145) already emit href="/" on every page. It also
            retires the text-white/60 back link, which measured 3.19:1 here. */}
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "All seller types", href: "/for" }, { label: hub.title }]}
          />
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{hub.headline}.</h1>
        {/* Authored HTML. Rendered as HTML because as a text child the anchors
            printed as escaped markup and the authored links did not exist.
            Safe: first-party content committed in src/data/for.ts, not user
            input. */}
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/80 ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: hub.intro }} />
        <div className="mt-10"><Link href="/contact" className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 hover:bg-white/90 transition-colors ${focusRing}`}>Get in touch</Link></div>
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx.
        Its StatItem is `target: number` with a prefix/suffix. These stat values
        are not numbers ("Reverse charge", "No UK threshold", "1 Jan 2024",
        "Fewer than 30 sales AND approx £1,700"), and each label is a full
        sourced sentence. The component would have to invent numbers it can
        count to and would drop the sources with them. */}
    {/* `ground-dark` added: this band now carries links (the authored citation
        anchors in stats[].label), and the default focus ring is #8a5e1a, which
        is 2.67:1 against neutral-800. The rebind makes it white, 15.1:1. No
        light island sits inside this section. */}
    <section className="ground-dark bg-neutral-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {hub.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col sm:text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
              {/* Rendered as HTML for parity with the two sibling stat bands.
                  No record in src/data/for.ts carries markup in `label` today,
                  so this is byte-identical output now and stops the next
                  authored citation printing as escaped tags. */}
              <div className={`mt-1 text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: stat.label }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/page-blocks.tsx (CardStack).
        Prop shape matches exactly, but its line 105 renders the body as a TEXT
        child and every body in src/data/for.ts is authored HTML, so the
        authored anchors would print as escaped markup (that is the defect this
        phase is fixing, and it is why app/services/[slug] reversed its own
        CardStack adoption). It also hardcodes Property's slate palette and
        rounded-xl. This site's ported language is warm neutral with square
        edges and a brand left-edge cue, and the byte-identical sibling template
        app/services/[slug]/page.tsx renders the same records, so adopting here
        alone forks two templates that must stay one shape. Same reason declines
        packages/web-shared/design/marketing/TopicSection.tsx, which is also
        slate and would need a new eyebrow label per section, ie new copy.
        Row 1 rhythm IS adopted: `sectionY` from the kit via the local re-export. */}
    <section className={`border-b border-neutral-200 bg-white ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>The problem</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What makes {hub.title.toLowerCase()} finance different.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {hub.challenges.map((item) => (
            <article key={item.title} className="border border-neutral-200 border-l-4 border-l-primary-400 bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
              <div className={`mt-4 text-base leading-relaxed text-neutral-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </article>
          ))}
        </div>
      </div>
    </section>
    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/WhyUsList.tsx.
        It renders a numbered "why choose us" list. These three are what the
        work covers, not reasons to pick us, and renumbering them as a pitch
        changes what the section claims. Also declined here:
        packages/web-shared/design/marketing/DrawnTickList.tsx (takes string[];
        there is no bullet list in this data, only title plus body records) and
        packages/web-shared/design/marketing/ComparisonTable.tsx (no comparison
        rows exist in for.ts, it would need authored claims about other
        practices, and it ships its own CTA with its own data-cta attributes,
        which this phase must not add). */}
    <section className={`border-b border-neutral-200 bg-[#fafaf7] ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>The work</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help {hub.title.toLowerCase()}.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {hub.howWeHelp.map((item) => (
            <div key={item.title} className="bg-white border border-neutral-200 p-6 sm:p-8 hover:border-primary-400 hover:shadow-md transition-all">
              <h3 className="text-lg font-bold text-neutral-900">{item.title}</h3>
              <div className={`mt-3 text-sm leading-relaxed text-neutral-600 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    {hub.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(hub.faqs) }} />}
    {/* ADOPTION DECLINED: packages/web-shared/design/primitives/FaqSection.tsx.
        It is a Radix accordion with no `forceMount`, so closed answers are
        absent from the server HTML while the FAQPage JSON-LD emitted just above
        asserts every one of them. That mismatch is the defect a sibling site had
        to unwind, and app/blog/[category]/[slug]/page.tsx declined it here for
        the same reason in phase 2. Native <details> keeps every answer
        server-rendered and still collapses. Revisit if the kit gains forceMount.
        Also declined here: packages/web-shared/design/primitives/NoticeCard.tsx,
        which states an outcome ("link expired", "you are all set"); this page
        has no such state and a card would need copy nobody wrote. */}
    {hub.faqs.length > 0 && (
      <section className={`bg-white ${sectionY}`}>
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
            <div className="space-y-3 sm:space-y-4">
              {hub.faqs.map((faq) => (
                <details key={faq.question} className="group border border-neutral-200 bg-white">
                  {/* Hover text moved off #c9861b (3.04 on white, decoration
                      only) to primary-700, #8a5e1a, 5.68. The plus mark below
                      keeps the brand hex: it is aria-hidden decoration and
                      clears the 3:1 graphic floor. */}
                  <summary className={`flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-primary-700 transition-colors list-none ${focusRing}`}>
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-primary-400 transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                    </span>
                  </summary>
                  {/* Authored HTML. The FAQPage JSON-LD above is fed the same
                      strings through buildFaqJsonLd, which strips the tags in
                      src/lib/schema.ts so acceptedAnswer.text stays plain. */}
                  <div className={`px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    )}
    {/* ADOPTION DECLINED: packages/web-shared/design/marketing/LeadCTAPanel.tsx
        (adds a lead-capture surface, owner gate),
        packages/web-shared/design/marketing/StickyCTA.tsx (an interruption,
        banned estate-wide), packages/web-shared/design/marketing/TestimonialsSection.tsx
        (ships Property's quotes; this site has none and the claims ledger closed
        invented social proof) and packages/web-shared/design/marketing/WhatToExpectCard.tsx
        (its default props publish a fee line nobody authored).
        `.ground-dark` stays on this section: it is what rebinds --focus-ring to
        the on-brand white for the button below. */}
    <section className={`ground-dark bg-neutral-900 ${sectionY}`}>
      <div className={siteContainerLg}>
        <h2 className="text-2xl font-bold text-white sm:text-4xl">Speak to an ecommerce tax specialist.</h2>
        <p className="mt-4 sm:mt-6 text-lg leading-relaxed text-neutral-200">Tell us about your {hub.title.toLowerCase()} situation and we will reply within 24 hours.</p>
        <div className="mt-8"><Link href="/contact" className={btnPrimary}>Get in touch</Link></div>
      </div>
    </section>
  </>);
}
