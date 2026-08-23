import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { CalendarDays, Clock, History, UserRound } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Eyebrow } from "@/components/ui/page-blocks";
import { HeroBrickBackdrop } from "@/components/layout/HeroBrickBackdrop";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche, getActiveCta, isPackagesMode } from "@/config/niche-loader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { BlogSidebarCta } from "@/components/blog/BlogSidebarCta";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { extractHeadings } from "@/lib/markdown-utils";
import { calculateReadTime, categoryDisplayName } from "@/lib/blog";
import { topicForBlogSlug } from "@/lib/intent/taxonomy";
import { hasEnabledResource, resourceForTopic } from "@/lib/resources/registry";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";
import { GateOrForm } from "@/components/resources/GateOrForm";
import { splitContentEarly, splitRemainderForGate, splitContentAtMidScroll } from "@accounting-network/web-shared/content/blog-splits";

type BlogPostRendererProps = {
  post: BlogPost;
  categorySlug: string;
  related?: { slug: string; title: string; summary: string; categorySlug: string }[];
};

type CTACopy = { heading: string; body: string; button: string };

// Keyed on the category SLUG, never the raw frontmatter string: three categories carry a
// two-way spelling split ("&" vs "and", "(MTD)" vs "MTD") across 57 posts, and every variant
// slugifies to the same hub. Keying on the label made those 57 miss every entry and fall
// through to the generic CTA.
const CTA_BY_CATEGORY: Record<string, CTACopy> = {
  "section-24-and-tax-relief": {
    heading: "Want your Section 24 position checked?",
    body: "Get a property tax specialist to run the numbers on your portfolio under the s.24 finance cost restriction. Free 20-minute call, no hard sell.",
    button: "Book a Section 24 review",
  },
  "incorporation-and-company-structures": {
    heading: "Considering incorporating your portfolio?",
    body: "Incorporation is one of the most consequential decisions a landlord can make. Get a specialist to model the SDLT, CGT and ongoing tax impact for your specific portfolio.",
    button: "Book an incorporation review",
  },
  "making-tax-digital-mtd": {
    heading: "Get your MTD ITSA setup checked before April 2026",
    body: "Run a parallel-quarter dry run with us. We will check your records, your software, and your digital links so the mandate is a non-event.",
    button: "Book an MTD readiness call",
  },
  "capital-gains-tax": {
    heading: "Selling a property? Get the CGT position checked first",
    body: "The 60-day CGT reporting deadline is unforgiving. Get a specialist to compute your gain, model any reliefs, and file on time.",
    button: "Book a CGT review",
  },
  "portfolio-management": {
    heading: "Want a second pair of eyes on your portfolio?",
    body: "Get a property tax specialist to review your portfolio structure, reliefs, and tax exposure. Practical recommendations, no hard sell.",
    button: "Book a portfolio review",
  },
  "property-accountant-services": {
    heading: "Want a fixed-fee property accountant?",
    body: "Get a property tax specialist to handle your accounts, tax returns, and ongoing advice. Fixed fees, 24-hour response, no surprises.",
    button: "Book an introduction call",
  },
  "landlord-tax-essentials": {
    heading: "Want your landlord tax position checked?",
    body: "Get a property tax specialist to run through your situation. Practical recommendations, no hard sell.",
    button: "Book a consultation",
  },
  "property-types-and-specialist-tax": {
    heading: "Have a specialist property tax question?",
    body: "Furnished holiday lets, mixed-use, HMOs, commercial, agricultural. Get a specialist who has handled your property type before.",
    button: "Book a specialist call",
  },
  "property-finance": {
    heading: "Financing a purchase or a refinance?",
    body: "Get a property tax specialist to read the finance and the tax together, from SPV buy-to-let and interest relief to bridging costs and how development profits are taxed. Practical recommendations, no hard sell.",
    button: "Book a finance and tax review",
  },
  "non-resident-landlord-tax": {
    heading: "UK property and a foreign tax position to manage?",
    body: "Get a property tax specialist with cross-border experience. NRL scheme, treaty credit, FIG regime, NRCGT, we have walked these for landlords like you.",
    button: "Book a cross-border review",
  },
};

function formatUkDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function decorateAsides(html: string): string {
  return html.replace(
    /<aside>([\s\S]*?)<\/aside>/g,
    (_m, inner) =>
      `<aside>${inner}<p class="aside-cta-row"><a class="aside-cta" href="#enquiry-form">Talk to a specialist →</a></p></aside>`,
  );
}


export function BlogPostRenderer({ post, categorySlug, related = [] }: BlogPostRendererProps) {
  const headings = extractHeadings(post.contentHtml);
  const readTime = calculateReadTime(post.contentHtml);
  const jsonLd =
    post.schema?.trim() ||
    buildBlogPostingJsonLd(post, `/blog/${categorySlug}/${post.slug}`);

  const decoratedHtml = decorateAsides(post.contentHtml);

  // Premium tools + gated resources (additive, SEO-safe). Resolve the topic from
  // the URL category SLUG (not the human label). The premium island and the
  // resource gate only appear once a category is actually enabled.
  const topic = topicForBlogSlug(categorySlug);
  const hasPremium = topic ? hasPremiumTool(resourceForTopic(topic)?.toolId) : false;
  const hasGate = topic ? hasEnabledResource(topic) : false;
  // The on-page premium tool + Excel gate were redesigned (shadcn) to render
  // cleanly in the narrow blog column, and are ENABLED. Set to false to fall
  // back to the original InlineMiniLeadForm. Guides, personalisation, the
  // registries and the calculators are unaffected either way.
  const SHOW_ONPAGE_RESOURCES = true;
  const showPremiumIslands = SHOW_ONPAGE_RESOURCES && !!topic && (hasPremium || hasGate);

  // Tiered, EARLY placement of the resource module:
  //  - When a topic has an enabled tool/gate, inject the interactive TOOL early
  //    (after the first h2, ~20-25% in) so it lifts dwell before the scroll wall,
  //    then place the email GATE a step later (a second, lower break) — or, when
  //    there is no later break, directly under the tool. We ALWAYS inject (the
  //    early split has an end-of-article fallback) so short/<4-h2 posts get it too.
  //  - When the topic has NO enabled tool/gate, fall back to the existing
  //    InlineMiniLeadForm at the mid-scroll split (unchanged behaviour).
  const earlySplit = showPremiumIslands ? splitContentEarly(decoratedHtml) : null;
  const gateSplit =
    earlySplit && hasGate ? splitRemainderForGate(earlySplit.after) : null;
  const fallbackSplit = showPremiumIslands ? null : splitContentAtMidScroll(decoratedHtml);

  // Packages mode bypasses the per-category consultation copy: one pricing-led
  // CTA from the active variant. Leadgen keeps the category map.
  const ctaCopy: CTACopy = isPackagesMode(niche)
    ? {
        heading: getActiveCta(niche).blog.cta_heading,
        body: getActiveCta(niche).blog.cta_body,
        button: getActiveCta(niche).blog.cta_button,
      }
    : (CTA_BY_CATEGORY[categorySlug] ?? {
        heading: getActiveCta(niche).blog.cta_heading,
        body: getActiveCta(niche).blog.cta_body,
        button: getActiveCta(niche).blog.cta_button,
      });

  const reviewerName = post.reviewedBy?.trim();
  const reviewerCreds = post.reviewerCredentials?.trim();
  const hasReviewer = !!(reviewerName && reviewerCreds);

  const categoryLabel = categoryDisplayName(categorySlug, post.category);

  const hasUpdate = !!(post.dateModified && post.dateModified !== post.date);
  const metaPill =
    "inline-flex min-h-7 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200";

  return (
    <>
      <ReadingProgress />
      <article className="bg-white py-12 sm:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />

        <div className={siteContainerLg}>
          <div className="max-w-4xl mx-auto lg:max-w-7xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
            <div className="max-w-4xl">
              <Breadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: categoryLabel, href: `/blog/${categorySlug}` },
                  { label: post.title },
                ]}
              />
              <header className="rounded-xl bg-slate-50 p-8 mt-6">
                <Eyebrow>{categoryLabel}</Eyebrow>
                <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {post.h1}
                </h1>
                {/* Meta as icon pills instead of a dot-separated text run: each
                    fact reads at a glance, and "Updated" gets the emerald tint
                    because recency is the one that earns trust on tax content. */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {post.date ? (
                    <span className={metaPill}>
                      <CalendarDays aria-hidden className="h-3.5 w-3.5 text-emerald-600" />
                      {hasUpdate ? (
                        <>
                          Published <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                        </>
                      ) : (
                        <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                      )}
                    </span>
                  ) : null}
                  {hasUpdate ? (
                    <span className="inline-flex min-h-7 items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                      <History aria-hidden className="h-3.5 w-3.5" />
                      Updated <time dateTime={post.dateModified}>{formatUkDate(post.dateModified!)}</time>
                    </span>
                  ) : null}
                  {post.author ? (
                    <span className={metaPill}>
                      <UserRound aria-hidden className="h-3.5 w-3.5 text-emerald-600" />
                      {post.author}
                    </span>
                  ) : null}
                  {readTime > 0 ? (
                    <span className={metaPill}>
                      <Clock aria-hidden className="h-3.5 w-3.5 text-emerald-600" />
                      {readTime} min read
                    </span>
                  ) : null}
                </div>
                {/* Summary at body size with looser leading: at text-lg it
                    crowded the h1 and read as a second heading rather than a
                    standfirst. */}
                {post.summary ? (
                  <p className="mt-5 text-base leading-7 text-slate-600">{post.summary}</p>
                ) : null}
                <div className="mt-6">
                  <a
                    href="#enquiry-form"
                    data-cta="blog_skip_to_form"
                    data-cta-placement="article_header"
                    data-cta-goal="form"
                    className="inline-flex items-center gap-2 py-0.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
                  >
                    Skip to enquiry form ↓
                  </a>
                </div>
              </header>

              <div className="lg:hidden mt-8">
                <TableOfContents headings={headings} />
              </div>

              {post.image ? (
                <img
                  src={post.image}
                  alt={post.altText || post.title}
                  className="mt-10 w-full rounded-xl border-2 border-slate-200 object-cover shadow-sm"
                  width={1200}
                  height={630}
                />
              ) : null}

              <div className="article-body prose-blog mt-10">
                {showPremiumIslands && topic && earlySplit ? (
                  <>
                    {/* Content up to the first h2 (~20-25% in). */}
                    <div dangerouslySetInnerHTML={{ __html: earlySplit.before }} />

                    {/* EARLY: the interactive premium tool (value → lifts dwell). */}
                    {hasPremium ? (
                      <PremiumUpgrade topic={topic} placement="blog" category={categorySlug} />
                    ) : null}

                    {gateSplit && gateSplit.after ? (
                      <>
                        {/* More content between the tool and the gate. */}
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.before }} />
                        {/* A STEP LATER: the email gate (ask). */}
                        <GateOrForm topic={topic} />
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.after }} />
                      </>
                    ) : (
                      <>
                        {/* No later break: gate goes directly under the tool, then
                            the rest of the article. */}
                        {hasGate ? <GateOrForm topic={topic} /> : null}
                        <div dangerouslySetInnerHTML={{ __html: earlySplit.after }} />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* No enabled tool/gate for this topic: original behaviour —
                        the InlineMiniLeadForm at the mid-scroll split. */}
                    <div dangerouslySetInnerHTML={{ __html: fallbackSplit?.before ?? decoratedHtml }} />
                    {fallbackSplit?.after ? (
                      <>
                        <InlineMiniLeadForm topic={post.category} />
                        <div dangerouslySetInnerHTML={{ __html: fallbackSplit.after }} />
                      </>
                    ) : null}
                  </>
                )}
              </div>

              <section
                id="enquiry-form"
                className="relative mt-16 overflow-hidden rounded-xl bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24"
                aria-labelledby="enquiry-form-heading"
              >
                {/* Same etched-brick texture as LeadCTAPanel, so the article's
                    conversion panel reads as the site's signature closing block
                    rather than a flat navy box. */}
                <HeroBrickBackdrop />
                <div className="relative z-10">
                  <h2 id="enquiry-form-heading" className="text-2xl font-bold text-white sm:text-3xl">
                    {ctaCopy.heading}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-200">
                    {ctaCopy.body}
                  </p>
                  {/* White card, same posture as LeadCTAPanel. LeadForm's labels
                      are slate-900; rendered bare on this navy section they were
                      invisible (slate-900 on slate-900). */}
                  <div className="mt-8 rounded-xl bg-white p-6 sm:p-8">
                    <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
                  </div>
                </div>
              </section>

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-slate-900 mb-8">
                    Frequently asked questions
                  </h2>
                  {/* Same single-open accordion as the homepage and calculator
                      FAQs. The FAQPage JSON-LD is emitted separately, so
                      collapsing the answers costs nothing in search. */}
                  <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
                    {post.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="bg-slate-50">
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ) : null}

              <aside className="mt-16 flex gap-5 items-start bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-xl">
                <div className="hidden sm:flex shrink-0 w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  {hasReviewer ? (
                    <>
                      <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Reviewed by</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">{reviewerName}</p>
                      <p className="mt-1 text-sm text-slate-600">{reviewerCreds}</p>
                      {post.reviewedAt ? (
                        <p className="mt-2 text-xs text-slate-500">
                          Last reviewed {formatUkDate(post.reviewedAt)}
                        </p>
                      ) : null}
                      <Link href="/about" className="mt-3 inline-block py-0.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                        Learn more about our team →
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">About the author</p>
                      <p className="mt-1 text-lg font-bold text-slate-900">{niche.display_name}</p>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{niche.description}</p>
                      <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                        Learn more about our team →
                      </Link>
                    </>
                  )}
                </div>
              </aside>

              {related.length > 0 ? (
                <section className="mt-16" aria-labelledby="related-heading">
                  <h2 id="related-heading" className="text-2xl font-bold text-slate-900 mb-8">
                    Related articles
                  </h2>
                  <RelatedArticles
                    items={related.map((r) => ({
                      href: `/blog/${r.categorySlug}/${r.slug}`,
                      title: r.title,
                      excerpt: r.summary,
                    }))}
                  />
                </section>
              ) : null}

              {/* Subscribe block removed 2026-07-09: 16,290 views / 0 submits all-time
                  (behaviour readout §4). Nurture opt-in still exists on lead forms. */}
            </div>

            <aside className="hidden lg:block">
              {/* One sticky container for card + TOC. It owns the viewport
                  clamp and scrolls internally when the pair is taller than the
                  screen; TableOfContents no longer carries its own sticky. */}
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto">
                <BlogSidebarCta copy={ctaCopy} />
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* StickyCTA removed 2026-07-09: 586 shown / 1 click current-era (readout §4). */}
    </>
  );
}
