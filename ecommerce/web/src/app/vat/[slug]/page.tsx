import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { vatPages, getVatPage } from "@/data/vat";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { buildFaqJsonLd } from "@/lib/schema";
import { LeadForm } from "@/components/forms/LeadForm";
import { siteContainerLg, focusRing, focusRingAuthoredLinks } from "@/components/ui/layout-utils";
import EcommerceBackdrop from "@/components/layout/EcommerceBackdrop";

export function generateStaticParams() { return vatPages.map((v) => ({ slug: v.slug })); }

/**
 * Every `intro`, `stats[].label`, `challenges[].body`, `howWeHelp[].body` and
 * `faqs[].answer` in src/data/vat.ts is authored HTML (anchors, and in the
 * challenge bodies whole <p>, <strong> and <ul> blocks), so the strings are
 * rendered as HTML and the links need a colour: nothing here is inside
 * `.prose-blog`, and a UA-default link is neither the brand nor legible on the
 * dark bands.
 *
 * primary-700 is #8a5e1a, 5.68 on white and 5.44 on #fafaf7; the brand hex
 * #c9861b (primary-400) is 3.04 on white and is decoration only. On the dark
 * grounds the link is white: 5.68 on the primary-700 hero, 15.1 on the
 * neutral-800 stats band. Same two recipes as app/services/[slug] and
 * app/for/[slug].
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
  const vp = getVatPage(slug);
  if (!vp) return {};
  return { title: { absolute: vp.metaTitle }, description: vp.metaDescription, alternates: { canonical: `${siteConfig.url}/vat/${slug}` } };
}

export default async function VatPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vp = getVatPage(slug);
  if (!vp) notFound();
  return (<>
    {/* `ground-dark` rebinds --focus-ring to the on-brand white for this section.
        Without it the breadcrumb links and the hero CTA ring in #8a5e1a on an
        #8a5e1a ground, i.e. 1.00:1. The ground is unchanged: the hex now comes
        from the --color-primary-700 token globals.css anchors on #8a5e1a (white
        on it = 5.68). No light island sits inside this section. */}
    <section className="ground-dark relative overflow-hidden border-b border-neutral-200 bg-primary-700 py-16 sm:py-20">
      {/* Decoration only, aria-hidden, pointer-events-none. The section
          carries `relative overflow-hidden` and the container below
          `relative z-10`: that is the backdrop host contract, and getting
          it wrong paints the texture over the copy. */}
      <EcommerceBackdrop />
      <div className={`relative z-10 ${siteContainerLg}`}>
        {/* ADOPTED: packages/web-shared/design/primitives/Breadcrumb.tsx, replacing
            the hand-rolled single back-link. Same /vat href, same "VAT Hub" label;
            it adds the Home crumb (already linked from header and footer, so the
            route's unique internal-link set is unchanged) and a BreadcrumbList
            JSON-LD. Nothing else on this route emits one. */}
        <div className={crumbOnBrand}>
          <Breadcrumb
            onDark
            siteUrl={siteConfig.url}
            items={[{ label: "Home", href: "/" }, { label: "VAT Hub", href: "/vat" }, { label: vp.title }]}
          />
        </div>
        {/* Phase 3 swapped the hero back-link for the kit Breadcrumb and dropped
            this line with it, leaving all five /vat routes with no h1 and
            `vp.headline` with no consumer. Restored verbatim from
            port-ecommerce-phase0, same shape as the two sibling slug templates
            (app/services/[slug] and app/for/[slug]), trailing full stop
            included. The breadcrumb stays above it. */}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{vp.headline}.</h1>
        {/* Authored HTML, first-party content committed in src/data/vat.ts.
            As a text child every anchor printed as escaped markup. */}
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/90 ${linkOnDark}`} dangerouslySetInnerHTML={{ __html: vp.intro }} />
        <div className="mt-10"><Link href="/contact" className={`inline-flex min-h-12 items-center justify-center bg-white px-8 py-3.5 text-sm font-semibold text-primary-700 hover:bg-white/90 transition-colors ${focusRing}`}>Get in touch</Link></div>
      </div>
    </section>
    {/* `ground-dark` added: this band now carries links (the authored citation
        anchors in stats[].label), and the default focus ring is #8a5e1a, which
        is 2.67:1 against neutral-800. The rebind makes it white, 15.1:1. No
        light island sits inside this section. */}
    <section className="ground-dark bg-neutral-800 py-8 sm:py-10">
      <div className={siteContainerLg}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
          {vp.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col sm:text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono">{stat.value}</div>
              {/* DECLINED: packages/web-shared/design/marketing/StatsCounter.tsx. It
                  takes a single number and renders no links; these labels are
                  composite figures carrying their HMRC and EU Commission citations,
                  which it would delete.
                  The label is HTML and must be rendered as HTML: the twin template
                  at src/app/services/[slug]/page.tsx:37 already does this, and
                  without it every citation anchor in vat.ts printed as literal
                  escaped markup on the page. Link colour is set here because the
                  `.prose-blog a` rule is scoped and a UA-default link on
                  neutral-800 is ~2.3:1; white on neutral-800 is ~12:1. */}
              <div
                className={`mt-1 text-xs sm:text-sm font-semibold text-neutral-400 uppercase tracking-wider ${linkOnDark}`}
                dangerouslySetInnerHTML={{ __html: stat.label }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="border-b border-neutral-200 bg-white py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <Eyebrow>The problem</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Key considerations.</h2>
        {/* DECLINED: packages/web-shared/design/primitives/page-blocks.tsx `CardStack`
            and packages/web-shared/design/marketing/ComparisonTable.tsx. CardStack
            renders `{item.body}` as plain text, which is what these bodies already
            get and must stop getting (see the note below); it also drops the brand
            left rule that distinguishes this band from the one under it.
            ComparisonTable needs a them-vs-us row set nobody has authored and
            imports lucide-react, which ecommerce/web does not declare.
            DECLINED: packages/web-shared/design/marketing/WhyUsList.tsx and
            .../DrawnTickList.tsx: both are client islands that restate items as a
            numbered or ticked list; these are paragraph-length HTML bodies, not
            list lines, and reshaping them would drop the qualifiers.
            DECLINED: packages/web-shared/design/primitives/NoticeCard.tsx: a
            centred single-card outcome notice for the token-gated flows; there is
            no notice on this route to carry. */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {vp.challenges.map((item) => (
            <article key={item.title} className="border border-neutral-200 border-l-4 border-l-primary-400 bg-neutral-50 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
              {/* A <div>, not a <p>: these bodies are whole <p>/<ul> blocks,
                  and a <p> inside a <p> is invalid HTML that the parser would
                  split, breaking hydration. `space-y` is not used, because the
                  authored markup already supplies its own paragraphs. */}
              <div className={`mt-4 text-base leading-relaxed text-neutral-600 [&>p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1 ${linkOnLight}`} dangerouslySetInnerHTML={{ __html: item.body }} />
            </article>
          ))}
        </div>
      </div>
    </section>
    <section className="border-b border-neutral-200 bg-[#fafaf7] py-12 sm:py-16 lg:py-20">
      <div className={siteContainerLg}>
        <Eyebrow>The work</Eyebrow>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How we help.</h2>
        {/* DECLINED AGAIN, and the reason has changed. The earlier decline of
            packages/web-shared/design/marketing/NumberedReasons.tsx and
            .../WhyUsList.tsx rested on .story-numeral, .story-numeral-rule and
            num-glow being absent from src/app/globals.css. They are declared
            now. The remaining blocker is structural and is not going away:
            NumberedReasons line 128 and WhyUsList line 198 both render
            `{item.body}` as a TEXT CHILD, and every howWeHelp body in
            src/data/vat.ts is authored HTML. The kit is a manager carve-out, so
            neither can be given an HTML branch here.
            The NumberedReasons ANATOMY is taken instead, class for class, with
            no `data-draw` wrapper and no client island: with no ancestor
            carrying data-draw="off" the numeral renders in its lit state, so
            the band is finished without JavaScript. The white card and its
            hover treatment are dropped, because nothing here is a link.
            Contrast on #fafaf7: numeral #8a5e1a 5.44 (text floor 4.5), rule
            #9e6615 4.6 as a graphic (floor 3.0). */}
        <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-3">
          {vp.howWeHelp.map((item, i) => (
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
    {vp.faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(vp.faqs) }} />}
    {vp.faqs.length > 0 && (
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8 sm:mb-12 sm:text-3xl">Common questions</h2>
            {/* DECLINED: packages/web-shared/design/primitives/FaqSection.tsx. It is a
                Radix accordion with no `forceMount`, so closed answers are absent
                from the server HTML while the FAQPage JSON-LD above claims them -
                the same reason src/app/blog/[category]/[slug]/page.tsx:69 declined
                it. It also renders each answer as `<p>{faq.answer}</p>`, which
                cannot carry the HMRC citation anchors these answers hold. It emits
                no JSON-LD of its own, so the single FAQPage block above stands
                either way. The native <details> below needs no JavaScript and
                ships every answer in the HTML. */}
            <div className="space-y-3 sm:space-y-4">
              {vp.faqs.map((faq) => (
                <details key={faq.question} className="group border border-neutral-200 bg-white">
                  <summary className={`flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-neutral-900 hover:text-primary-700 transition-colors list-none ${focusRing}`}>
                    <span>{faq.question}</span>
                    <span className="flex-shrink-0 text-primary-600 transition-transform group-open:rotate-45" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" /></svg>
                    </span>
                  </summary>
                  {/* Authored HTML. buildFaqJsonLd strips the tags in
                      src/lib/schema.ts, so the FAQPage above stays plain text. */}
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
        hand-rolled heading-plus-button band, same call as the two sibling slug
        templates.

        NO COPY IS AUTHORED OR DROPPED. `title` and `description` are the two
        strings this band already published, byte for byte. Three component
        defaults would have published copy nobody wrote and are overridden to
        empty, which the component renders as nothing: `eyebrow=""` (default
        "Free consultation"), `formTitle=""` (default "Book your free
        consultation") and `proofPoints={[]}` (no authored proof-point set
        exists on this site; owner item).

        The /contact link this band carried is not lost: the hero above links
        /contact, so the route's unique internal link set is unchanged.
        `LeadForm` emits no data-cta, so the CTA snapshot is unchanged.

        No `.ground-dark`: the component paints bg-slate-900 but the form sits
        on a WHITE card inside it, and `.ground-dark` on an ancestor of a light
        island is the defect the rule names. Nothing focusable sits bare on the
        dark side. White title 17.8, text-slate-200 description 12.9.
        The `backdrop` slot is left empty: EcommerceBackdrop hardcodes
        id="ecommerce-settlement-run" and the hero already mounts it, so filling
        the slot would emit that id twice on one page.

        STILL DECLINED: packages/web-shared/design/marketing/StickyCTA.tsx (an
        interruption, banned estate-wide), .../TestimonialsSection.tsx (ships
        Property's quotes; inventing social proof is a claims breach) and
        .../WhatToExpectCard.tsx, which the owner approved on condition explicit
        props are passed: this route has no authored "what to expect" list and
        the four defaults are unwritten copy including a fee line. Owner item. */}
    <LeadCTAPanel
      eyebrow=""
      title="Speak to an ecommerce VAT specialist."
      description="Tell us about your VAT situation and we will reply within 24 hours."
      proofPoints={[]}
      formTitle=""
      form={<LeadForm />}
    />
  </>);
}
