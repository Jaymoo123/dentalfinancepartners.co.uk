import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { siteConfig } from "@/config/site";
import { ecommerceServices, getService } from "@/data/services";
import { buildFaqJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg, sectionY, focusRing, focusRingAuthoredLinks } from "@/components/ui/layout-utils";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";

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
const linkOnLight = `[&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary-800 ${focusRingAuthoredLinks}`;
const linkOnDark = `[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 ${focusRingAuthoredLinks}`;

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
    <section className="ground-dark relative overflow-hidden border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
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
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/90 ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: service.intro }} />
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
    {/* ADOPTION DECLINED (re-examined now that .story-numeral, .story-numeral-rule
        and num-glow exist in globals.css, which was the earlier reason):
        packages/web-shared/design/marketing/NumberedReasons.tsx line 128 and
        packages/web-shared/design/marketing/WhyUsList.tsx line 198 both render
        `{item.body}` as a TEXT CHILD, and every howWeHelp body in
        src/data/services.ts is authored HTML. Adopting either would print the
        anchors as escaped markup, which is the defect this family has already
        reversed once (CardStack, above). The CSS blocker is cleared; the
        text-child blocker is not, and the kit is a manager carve-out.
        The NumberedReasons ANATOMY is taken instead, class for class: the same
        `.story-numeral` numeral, the same `.story-numeral-rule` under it, the
        same 01-padded index. No `data-draw` wrapper and no client island: with
        no ancestor carrying data-draw="off" the numeral renders in its lit
        state, so the section is finished without JavaScript. The white card,
        its border and its hover treatment are dropped with it, because nothing
        in this grid is clickable and a hover affordance on a non-link is a lie.
        Contrast: the numeral is --color-primary-700 (#8a5e1a), 5.44 on #fafaf7;
        the rule is bg-primary-600 (#9e6615), a graphic at 4.6 on the same
        ground, both past their floors. */}
    <section className={`border-b border-neutral-200 bg-[#fafaf7] ${sectionY}`}>
      <div className={siteContainerLg}>
        <Eyebrow>The work</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
        <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-3">
          {service.howWeHelp.map((item, i) => (
            <div key={item.title}>
              <span className="story-numeral block text-3xl font-bold tabular-nums sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
              <span aria-hidden className="story-numeral-rule mt-3 block h-px w-10 bg-primary-600" />
              <h3 className="mt-4 text-base font-bold text-neutral-900 sm:text-lg">{item.title}</h3>
              <div className={`mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
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
    {/* ADOPTED (the owner lifted the earlier gate on this component):
        packages/web-shared/design/marketing/LeadCTAPanel.tsx, replacing the
        hand-rolled heading-plus-button band. generalist calls it 24 times; this
        family called it zero.

        NO COPY IS AUTHORED OR DROPPED. `title` and `description` are the two
        strings this band already published, byte for byte. Three of the
        component's own defaults would have published copy nobody here wrote, so
        each is explicitly overridden to empty and the component renders nothing
        in its place: `eyebrow=""` (default "Free consultation", a claim about
        what we charge), `formTitle=""` (default "Book your free consultation",
        the same claim) and `proofPoints={[]}` (there is no authored proof-point
        set on this site; that is an owner item, not something to invent).

        The /contact link this band used to carry is NOT lost from the route:
        the hero above links /contact, so the page's unique internal link set is
        unchanged, and the form now converts in place instead of sending the
        reader to another page to start again.

        `LeadForm` emits no data-cta attribute (grep data-cta over
        ecommerce/web/src returns only thank-you/page.tsx and PageShell.tsx), so
        the CTA snapshot is unchanged.

        No `.ground-dark` on this band, deliberately: the component paints
        bg-slate-900 but the form sits on a WHITE card inside it, and
        `.ground-dark` on an ancestor of a light island is the defect the rule
        names. Nothing focusable sits bare on the dark side here, because the
        eyebrow, the proof points and the footnote are all empty. Contrast on
        the dark side: white title 17.8, text-slate-200 description 12.9.

        STILL DECLINED here: packages/web-shared/design/marketing/StickyCTA.tsx
        (an interruption, banned estate-wide),
        packages/web-shared/design/marketing/TestimonialsSection.tsx (hardcodes
        Property's quotes; this site has no authored social proof and inventing
        it is a claims breach) and
        packages/web-shared/design/marketing/WhatToExpectCard.tsx, which the
        owner approved on condition that explicit props are passed: this route
        has no authored "what to expect" list to pass, and its four defaults are
        unwritten copy including a fee line. Owner item.

        The component's `backdrop` slot is left EMPTY, also deliberately.
        EcommerceBackdrop hardcodes `id="ecommerce-settlement-run"` on its SVG
        pattern; the hero at the top of this route already mounts it, so filling
        the slot would emit that id twice on one page and `url(#...)` would
        resolve both references to the first node. A duplicate id is a defect,
        and a second texture band is not worth one. Fix the id first if this
        slot is ever wanted. */}
    <LeadCTAPanel
      eyebrow=""
      title="Speak to an ecommerce tax specialist."
      description="Tell us about your situation and we will reply within 24 hours."
      proofPoints={[]}
      formTitle=""
      form={<LeadForm />}
    />
  </>);
}
