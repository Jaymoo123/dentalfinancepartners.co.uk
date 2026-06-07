import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { LeadForm } from "@/components/forms/LeadForm";
import { buildBlogPostingJsonLd } from "@/lib/schema";
import { siteContainerLg } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { niche } from "@/config/niche-loader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { InlineMiniLeadForm } from "@/components/blog/InlineMiniLeadForm";
import { ExitIntentModal } from "@/components/blog/ExitIntentModal";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { MTDCountdown } from "@/components/property/MTDCountdown";
import { extractHeadings } from "@/lib/markdown-utils";
import { calculateReadTime } from "@/lib/blog";
import { topicForBlogSlug } from "@/lib/intent/taxonomy";
import { hasEnabledResource, resourceForTopic } from "@/lib/resources/registry";
import { hasPremiumTool } from "@/lib/calculators/premium/registry";
import { gateCopy } from "@/lib/resources/copy";
import { PremiumUpgrade } from "@/components/calculators/premium/PremiumUpgrade";
import { ResourceGateLazy } from "@/components/resources/ResourceGateLazy";

type BlogPostRendererProps = {
  post: BlogPost;
  categorySlug: string;
  related?: { slug: string; title: string; summary: string; categorySlug: string }[];
};

type CTACopy = { heading: string; body: string; button: string };

const CTA_BY_CATEGORY: Record<string, CTACopy> = {
  "Section 24 & Tax Relief": {
    heading: "Want your Section 24 position checked?",
    body: "Get a property tax specialist to run the numbers on your portfolio under the s.24 finance cost restriction. Free 20-minute call, no hard sell.",
    button: "Book a Section 24 review",
  },
  "Incorporation & Company Structures": {
    heading: "Considering incorporating your portfolio?",
    body: "Incorporation is one of the most consequential decisions a landlord can make. Get a specialist to model the SDLT, CGT and ongoing tax impact for your specific portfolio.",
    button: "Book an incorporation review",
  },
  "Making Tax Digital (MTD)": {
    heading: "Get your MTD ITSA setup checked before April 2026",
    body: "Run a parallel-quarter dry run with us. We will check your records, your software, and your digital links so the mandate is a non-event.",
    button: "Book an MTD readiness call",
  },
  "Capital Gains Tax": {
    heading: "Selling a property? Get the CGT position checked first",
    body: "The 60-day CGT reporting deadline is unforgiving. Get a specialist to compute your gain, model any reliefs, and file on time.",
    button: "Book a CGT review",
  },
  "Portfolio Management": {
    heading: "Want a second pair of eyes on your portfolio?",
    body: "Get a property tax specialist to review your portfolio structure, reliefs, and tax exposure. Practical recommendations, no hard sell.",
    button: "Book a portfolio review",
  },
  "Property Accountant Services": {
    heading: "Want a fixed-fee property accountant?",
    body: "Get a property tax specialist to handle your accounts, tax returns, and ongoing advice. Fixed fees, 24-hour response, no surprises.",
    button: "Book an introduction call",
  },
  "Landlord Tax Essentials": {
    heading: "Want your landlord tax position checked?",
    body: "Get a property tax specialist to run through your situation. Practical recommendations, no hard sell.",
    button: "Book a consultation",
  },
  "Property Types & Specialist Tax": {
    heading: "Have a specialist property tax question?",
    body: "Furnished holiday lets, mixed-use, HMOs, commercial, agricultural. Get a specialist who has handled your property type before.",
    button: "Book a specialist call",
  },
  "Non-Resident Landlord Tax": {
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

function splitContentAtMidScroll(html: string): { before: string; after: string | null } {
  const headings = [...html.matchAll(/<h2[^>]*>/g)];
  if (headings.length < 4) {
    return { before: html, after: null };
  }
  const targetIdx = Math.floor(headings.length * 0.6);
  const target = headings[targetIdx];
  if (target?.index === undefined) {
    return { before: html, after: null };
  }
  return { before: html.slice(0, target.index), after: html.slice(target.index) };
}

/**
 * EARLY split for the premium-tool / resource islands. Splits at the FIRST h2
 * (~20-25% into most articles) so the value-add tool lifts dwell time before the
 * 57%-of-visitors-bounce-at-25%-scroll wall. Falls back to after the first ~2
 * paragraphs when there is no h2, and to the whole article (append at end) when
 * there is no usable break at all — so EVERY post can be injected into.
 */
function splitContentEarly(html: string): { before: string; after: string } {
  const firstH2 = html.search(/<h2[^>]*>/);
  if (firstH2 > 0) {
    return { before: html.slice(0, firstH2), after: html.slice(firstH2) };
  }
  // No h2: break after the 2nd closing </p> so the tool still lands early.
  const paragraphRe = /<\/p>/g;
  let m: RegExpExecArray | null;
  let count = 0;
  let cut = -1;
  while ((m = paragraphRe.exec(html)) !== null) {
    count += 1;
    if (count === 2) {
      cut = m.index + m[0].length;
      break;
    }
  }
  if (cut > 0 && cut < html.length) {
    return { before: html.slice(0, cut), after: html.slice(cut) };
  }
  // No usable break: render the whole article first, append the island at the end.
  return { before: html, after: "" };
}

/**
 * Find a SECOND, later split point in the post-early-tool remainder for the email
 * gate, so the tool (value) lands first and the gate (ask) lands a step later.
 * Targets a heading roughly half-way through the remainder. Returns after=null
 * when the remainder has no further heading, in which case the caller drops the
 * gate directly under the tool instead.
 */
function splitRemainderForGate(html: string): { before: string; after: string | null } {
  const headings = [...html.matchAll(/<h2[^>]*>/g)];
  // Need at least 2 headings in the remainder to place the gate at a natural
  // break that is clearly below the tool.
  if (headings.length < 2) {
    return { before: html, after: null };
  }
  const targetIdx = Math.max(1, Math.floor(headings.length * 0.5));
  const target = headings[targetIdx];
  if (target?.index === undefined) {
    return { before: html, after: null };
  }
  return { before: html.slice(0, target.index), after: html.slice(target.index) };
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

  const ctaCopy: CTACopy = CTA_BY_CATEGORY[post.category] ?? {
    heading: niche.blog.cta_heading,
    body: niche.blog.cta_body,
    button: niche.blog.cta_button,
  };

  const isMTDPost = post.category === "Making Tax Digital (MTD)";

  const reviewerName = post.reviewedBy?.trim();
  const reviewerCreds = post.reviewerCredentials?.trim();
  const hasReviewer = !!(reviewerName && reviewerCreds);

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
                  { label: post.category, href: `/blog/${categorySlug}` },
                  { label: post.title },
                ]}
              />
              <header className="border-l-4 border-emerald-600 bg-slate-50 p-8 mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {post.category}
                </p>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {post.h1}
                </h1>
                <div className="mt-3 text-sm text-slate-500">
                  {post.dateModified && post.dateModified !== post.date ? (
                    <>
                      {post.date && (
                        <span className="block">
                          First published{" "}
                          <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                        </span>
                      )}
                      <span className="block">
                        Last updated{" "}
                        <time dateTime={post.dateModified}>{formatUkDate(post.dateModified)}</time>
                      </span>
                      {(post.author || readTime > 0) && (
                        <span className="mt-1 block">
                          {post.author ? <span>{post.author}</span> : null}
                          {post.author && readTime > 0 ? " · " : null}
                          {readTime > 0 ? <span>{readTime} min read</span> : null}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {post.date && (
                        <time dateTime={post.date}>{formatUkDate(post.date)}</time>
                      )}
                      {post.author ? (
                        <>
                          {" · "}
                          <span>{post.author}</span>
                        </>
                      ) : null}
                      {readTime > 0 && (
                        <>
                          {" · "}
                          <span>{readTime} min read</span>
                        </>
                      )}
                    </>
                  )}
                </div>
                {post.summary ? (
                  <p className="mt-4 text-lg text-slate-700 leading-relaxed">{post.summary}</p>
                ) : null}
                <div className="mt-6">
                  <a
                    href="#enquiry-form"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
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
                  className="mt-10 w-full border-2 border-slate-200 object-cover shadow-sm"
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
                        <ResourceGateLazy
                          topic={topic}
                          copy={gateCopy(topic, post.title)}
                          placement="blog"
                          category={categorySlug}
                        />
                        <div dangerouslySetInnerHTML={{ __html: gateSplit.after }} />
                      </>
                    ) : (
                      <>
                        {/* No later break: gate goes directly under the tool, then
                            the rest of the article. */}
                        {hasGate ? (
                          <ResourceGateLazy
                          topic={topic}
                          copy={gateCopy(topic, post.title)}
                          placement="blog"
                          category={categorySlug}
                        />
                        ) : null}
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

              {isMTDPost ? (
                <div className="mt-12">
                  <MTDCountdown />
                </div>
              ) : null}

              <section
                id="enquiry-form"
                className="mt-16 bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24"
                aria-labelledby="enquiry-form-heading"
              >
                <h2 id="enquiry-form-heading" className="text-2xl font-bold text-white sm:text-3xl">
                  {ctaCopy.heading}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-200">
                  {ctaCopy.body}
                </p>
                <div className="mt-8">
                  <LeadForm redirectOnSuccess={false} submitLabel={ctaCopy.button} />
                </div>
              </section>

              {post.faqs && post.faqs.length > 0 ? (
                <section className="mt-16" aria-labelledby="faq-heading">
                  <h2 id="faq-heading" className="text-3xl font-bold text-slate-900 mb-8">
                    Frequently asked questions
                  </h2>
                  <dl className="space-y-4">
                    {post.faqs.map((faq, i) => (
                      <div key={i} className="border-l-4 border-slate-300 bg-slate-50 p-6">
                        <dt className="text-lg font-bold text-slate-900">{faq.question}</dt>
                        <dd className="mt-3 text-base text-slate-700 leading-relaxed">{faq.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              <aside className="mt-16 flex gap-5 items-start bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-lg">
                <div className="hidden sm:block shrink-0 w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
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
                      <Link href="/about" className="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-800">
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
                  <ul className="space-y-4">
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link
                          href={`/blog/${r.categorySlug}/${r.slug}`}
                          className="block border-l-4 border-slate-300 bg-slate-50 p-6 transition-all hover:border-emerald-600 hover:bg-white hover:shadow-md"
                        >
                          <h3 className="text-lg font-bold text-slate-900">{r.title}</h3>
                          <p className="mt-2 text-sm text-slate-600">{r.summary}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </article>

      <StickyCTA
        href="#enquiry-form"
        primary="Want this checked for your situation?"
        secondary="Free 20-minute call with a property tax specialist"
        buttonLabel="Talk to a specialist"
      />
      <ExitIntentModal topic={post.category} />
    </>
  );
}
