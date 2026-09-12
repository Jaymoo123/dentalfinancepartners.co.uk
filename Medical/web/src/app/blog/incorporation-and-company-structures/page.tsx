import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import {
  btnOnCream,
  btnPrimary,
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { ExampleFigureNote } from "@accounting-network/web-shared/design/primitives/ExampleFigureNote";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { getAllPosts, getAllCategories, slugifyCategory, calculateReadTime } from "@/lib/blog";
import { blogCtaFor } from "@/lib/blog-cta";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

const CATEGORY_NAME = "Incorporation & Company Structures";
const CATEGORY_SLUG = "incorporation-and-company-structures";
const PAGE_TITLE = "Incorporation & Company Structures for Doctors";
const PAGE_DESCRIPTION =
  "Guide to incorporating a medical practice in the UK, covering limited company against LLP, tax savings, CQC rules and the transition process for doctors and GPs.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/blog/${CATEGORY_SLUG}` },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent(PAGE_TITLE)}`, width: 1200, height: 630, alt: PAGE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

/** Mirrors `HubSection` in `@accounting-network/web-shared/design/blog/BlogCategoryHub`,
 *  plus a local `figure` slot. Field names are kept identical so this page can be
 *  handed to the kit component unchanged the moment its article list can emit a
 *  FLAT `/blog/<slug>` href (see the header comment on `ArticleLibrary` below). */
type HubSection = {
  heading: string;
  paragraphs: ReactNode[];
  bullets?: ReactNode[];
  trailingParagraphs?: ReactNode[];
  figure?: ReactNode;
};

/** One figure shell for the hub: a caption, then a table or a card set.
 *  ponytail: two shapes in one component, not two components. Every figure is
 *  built from a claim the prose beside it already makes; nothing here is new. */
function Figure({
  title,
  headers,
  rows,
  cards,
  note,
}: {
  title: string;
  headers?: string[];
  rows?: string[][];
  cards?: Array<{ title: string; detail: string }>;
  note?: string;
}) {
  return (
    <figure className="mt-6 rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70 sm:p-6">
      <figcaption className="text-sm font-bold text-slate-900">{title}</figcaption>
      {headers && rows ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h} scope="col" className="border-b border-slate-300 pb-2 pr-4 font-bold text-slate-900">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>
                  <th scope="row" className="border-b border-slate-200 py-2.5 pr-4 align-top font-semibold text-slate-900">
                    {r[0]}
                  </th>
                  {r.slice(1).map((c, i) => (
                    <td key={i} className="border-b border-slate-200 py-2.5 pr-4 align-top text-slate-600">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {cards ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {cards.map((c) => (
            <li key={c.title} className="rounded-xl bg-white p-4 ring-1 ring-slate-200/70">
              <p className="text-sm font-bold text-slate-900">{c.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{c.detail}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {note ? <ExampleFigureNote className="mt-4" label={note} /> : null}
    </figure>
  );
}

const SECTIONS: HubSection[] = [
  {
    heading: "When to Consider Incorporating a Medical Practice",
    paragraphs: [
      "Incorporation tends to become attractive when practice profits significantly exceed the partners' personal income needs. If a GP practice generates substantial surplus that is reinvested or retained, the corporation tax rate of 25% (for profits above £250,000) or the small-profits rate of 19% can be materially lower than the 45% additional rate of income tax plus Class 4 National Insurance that partners would otherwise pay. That advantage belongs to profit left in the company, where the corporation tax charge is the only charge and the genuine deferral sits. Profit taken out carries its own dividend tax on top, and at 2026/27 rates the combined burden on extracted profit is roughly 52% where the dividend falls in the upper band at 35.75%, rising to about 55% at the additional rate of 39.35%, both above the 45% plus 2% Class 4 a partner pays, so it is the combined figure that decides the question rather than the corporation tax rate on its own.",
      "That said, incorporation is not a universal solution. Practices with profits that are fully drawn by partners each year see less benefit, because the tax saving on corporation tax is offset by the tax on extracting those profits. Practices planning to wind down, or where partners are close to retirement, may also find the costs and disruption outweigh the gains. A detailed projection comparing the after-tax position as a partnership versus a limited company or LLP over at least a five-year horizon is essential before committing.",
    ],
    figure: (
      <Figure
        title="The rates the comparison actually turns on"
        headers={["Rate or test", "2026/27 position"]}
        rows={[
          ["Corporation tax, small profits", "19% on profits up to £50,000"],
          ["Corporation tax, marginal band", "An effective rate of about 26.5% between £50,000 and £250,000"],
          ["Corporation tax, main rate", "25% on profits above £250,000"],
          ["Partnership profit share", "Up to the 45% additional rate of income tax, plus Class 4 National Insurance"],
          ["Dividend tax on extraction", "10.75% ordinary, 35.75% upper, 39.35% additional, after a £500 allowance"],
          ["Where the gap widens", "Profit retained in the business, so corporation tax is the only charge"],
          ["Where the gap closes", "Profit fully drawn each year: corporation tax plus dividend tax comes to roughly 52% to 55%, above the partner's 47%"],
        ]}
        note="Corporation tax rates for the financial year beginning 1 April 2026"
      />
    ),
  },
  {
    heading: "Limited Company vs LLP Structures",
    paragraphs: [
      "The two main vehicles for incorporation are a private limited company and a limited liability partnership (LLP). A limited company is a separate legal entity that pays corporation tax on its profits; directors and shareholders then pay income tax on salaries and dividends drawn from the company. This creates the classic “two-tier” tax structure that can reduce the overall rate when profits are retained.",
      "An LLP, by contrast, is tax-transparent; profits are allocated to members and taxed as self-employment income, much like a traditional partnership. The primary advantage of an LLP is limited liability protection without the corporation-tax layer, making it suitable for practices where all profits are distributed. LLPs also avoid the benefit-in-kind complications that arise when a company provides assets to directors. The right choice depends on the practice's profit level, distribution policy and long-term growth plans.",
    ],
    figure: (
      <Figure
        title="The two vehicles, side by side"
        headers={["", "Limited company", "LLP"]}
        rows={[
          ["Tax on profits", "Corporation tax in the company, then income tax on salary and dividends drawn", "Transparent, allocated to members and taxed as self-employment income"],
          ["Liability", "Separate legal entity", "Limited liability protection"],
          ["Corporation-tax layer", "Yes, the classic two-tier structure", "None"],
          ["Benefit in kind", "Arises where the company provides assets to directors", "Avoided"],
          ["Suits", "Profit intended to be retained", "Practices where all profits are distributed"],
        ]}
      />
    ),
  },
  {
    heading: "Tax Implications of Incorporation",
    paragraphs: [
      "Beyond headline tax rates, incorporation triggers several one-off and ongoing tax events. Transferring the practice's assets to a company may be treated as a disposal for capital gains tax purposes, though Section 162 incorporation relief can defer the gain where the entire business (including goodwill) is transferred in exchange for shares. HMRC scrutinises medical-practice goodwill valuations closely, so a robust, defensible valuation is essential.",
      "Ongoing, the company must operate PAYE for director salaries, file annual accounts and a corporation tax return, and manage dividend paperwork. National Insurance treatment also changes: directors pay Class 1 NICs on salary rather than Classes 2 and 4, and the company pays employer NICs on top. Careful salary-and-dividend planning each year can optimise the overall position, but it requires ongoing professional advice as thresholds and rates change with each Budget.",
    ],
    figure: (
      <Figure
        title="One-off events, then the ongoing obligations"
        cards={[
          { title: "Asset transfer", detail: "Transferring the practice's assets to a company may be a disposal for capital gains tax." },
          { title: "Section 162 relief", detail: "Can defer the gain where the entire business, including goodwill, is transferred in exchange for shares." },
          { title: "Goodwill valuation", detail: "HMRC scrutinises medical-practice goodwill closely, so the valuation has to be robust and defensible." },
          { title: "PAYE and filings", detail: "PAYE for director salaries, annual accounts, a corporation tax return and dividend paperwork." },
          { title: "National Insurance changes", detail: "Directors pay Class 1 on salary rather than Classes 2 and 4." },
          { title: "Employer NIC", detail: "The company pays employer National Insurance on top of director salaries." },
        ]}
      />
    ),
  },
  {
    heading: "Regulatory Considerations: CQC and NHS Contracts",
    paragraphs: [
      "Medical practices operating under an NHS GMS or PMS contract must obtain consent from NHS England (or the relevant ICB) before changing their legal structure. The contract itself cannot simply be assigned to a new entity; a fresh contract or novation agreement is required. CQC registration must also transfer to the new legal entity, which involves a fresh application, an assessment of the new registered manager and potentially an inspection.",
      "These regulatory steps add both cost and timeline to the incorporation process. Practices should allow at least six to twelve months from the initial decision to the completion of the transfer. Engaging early with the ICB and CQC, and ensuring that the new entity's governance structure meets their requirements, reduces the risk of delays. Specialist medical accountants coordinate with solicitors and regulatory bodies to manage the process end to end.",
    ],
    figure: (
      <Figure
        title="The regulatory sequence, and what each step needs"
        cards={[
          { title: "1. ICB consent", detail: "Consent from NHS England, or the relevant ICB, before the legal structure changes." },
          { title: "2. Contract novation", detail: "The contract cannot simply be assigned. A fresh contract or a novation agreement is required." },
          { title: "3. CQC re-registration", detail: "A fresh application, an assessment of the new registered manager, and potentially an inspection." },
          { title: "4. Allow the time", detail: "At least six to twelve months from the initial decision to completion of the transfer." },
        ]}
      />
    ),
  },
  {
    heading: "The Transition Process and Costs",
    paragraphs: [
      "A typical incorporation involves several workstreams running in parallel: company formation and shareholder agreement drafting, goodwill and asset valuations, NHS contract novation, CQC re-registration, TUPE consultation for employed staff, bank account setup and finance restructuring, and pension scheme adjustments. Each of those workstreams carries a professional fee, so legal, accounting and valuation costs are a material line in the decision and should be quoted for the practice before it commits, not estimated from a general figure.",
      "Partners should also plan for the cash-flow impact. The company will need working capital from day one, and there may be a period where partners' drawings reduce while the company builds reserves. Stamp duty land tax may apply if property is transferred to the company, though holdover relief or SDLT group relief may be available in certain structures. A phased approach (incorporating the trading activity first and dealing with property separately) can sometimes smooth the transition.",
    ],
    figure: (
      <Figure
        title="The workstreams that run in parallel, and the cash-flow points"
        cards={[
          { title: "Company formation", detail: "Incorporation and shareholder agreement drafting." },
          { title: "Valuations", detail: "Goodwill and asset valuations." },
          { title: "NHS and CQC", detail: "Contract novation and CQC re-registration." },
          { title: "Staff", detail: "TUPE consultation for employed staff." },
          { title: "Banking and finance", detail: "Bank account setup, finance restructuring and pension scheme adjustments." },
          { title: "Working capital", detail: "The company needs it from day one, and partners' drawings may reduce while reserves build." },
          { title: "Property", detail: "Stamp duty land tax may apply on a transfer, with holdover or SDLT group relief available in certain structures." },
          { title: "Phasing", detail: "Incorporating the trading activity first and dealing with property separately can smooth the transition." },
        ]}
      />
    ),
  },
];

const PROOF_POINTS = [
  { title: "Incorporation modelled, not assumed", detail: "The tax saving and the NHS pension accrual loss, side by side" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to an accountant who works with doctors" },
  { title: "Modelled on your figures", detail: "Your own income mix, not a template" },
];

export default function IncorporationPillarPage() {
  // Keyed on the SLUG, never the raw frontmatter label. Property put 57 posts on
  // the wrong CTA and 228 pages on the wrong related list by keying on the label.
  const articles = getAllPosts()
    .filter((p) => slugifyCategory(p.category) === CATEGORY_SLUG)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      date: p.date,
      readTime: calculateReadTime(p.contentHtml),
    }));
  const otherTopics = getAllCategories().filter((c) => c.slug !== CATEGORY_SLUG);
  const cta = blogCtaFor(CATEGORY_SLUG);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: CATEGORY_NAME },
        ],
      },
      {
        "@type": "CollectionPage",
        name: PAGE_TITLE,
        description: metadata.description,
        url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section
        className={`relative flex items-center overflow-hidden py-10 sm:py-12 lg:py-14 min-h-[360px] sm:min-h-[420px] lg:min-h-[440px] ${heroCreamSurface}`}
      >
        <MedicalBackdrop tone="cream" />
        <div className={`${siteContainerLg} relative z-10`}>
          <div className="max-w-3xl">
            <Breadcrumb
              suppressJsonLd
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: CATEGORY_NAME },
              ]}
            />
            <Eyebrow>{CATEGORY_NAME}</Eyebrow>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              Incorporation &amp; Company Structures for Medical Practices
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              More GP practices and medical professionals are exploring incorporation as a way to
              reduce their tax burden and create a more flexible business structure. However,
              incorporating a medical practice involves far more than forming a company. From NHS
              contract considerations and CQC registration to pension implications and partnership
              buy-outs, the decision requires careful analysis. This hub covers everything you need to
              evaluate before making the move.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#enquiry-form"
                data-cta={`blog_hub_${CATEGORY_SLUG}_book`}
                data-cta-placement="blog_hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Send your position
              </Link>
              <Link
                href="#articles"
                data-cta={`blog_hub_${CATEGORY_SLUG}_articles`}
                data-cta-placement="blog_hero"
                className={btnOnCream}
              >
                Browse {articles.length} {articles.length === 1 ? "article" : "articles"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>{CATEGORY_NAME}</Eyebrow>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-4xl">The essentials</h2>
          <div className="mt-8 sm:mt-12">
            {SECTIONS.map((s) => (
              <div
                key={s.heading}
                className="grid gap-3 border-t border-slate-200 py-8 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[1fr_2fr] lg:gap-12"
              >
                <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{s.heading}</h3>
                <div className="space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-7 text-slate-600">
                      {p}
                    </p>
                  ))}
                  {s.bullets && s.bullets.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-slate-600">
                      {s.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                  {s.trailingParagraphs?.map((p, i) => (
                    <p key={`t${i}`} className="text-base leading-7 text-slate-600">
                      {p}
                    </p>
                  ))}
                  {s.figure}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ArticleLibrary articles={articles} categoryName={CATEGORY_NAME} />

      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          title={cta.heading}
          description={cta.body}
          proofPoints={PROOF_POINTS}
          form={<LeadForm redirectOnSuccess={false} submitLabel={cta.button} />}
          backdrop={<MedicalBackdrop />}
          footnote="No obligation and no hard sell. If the specialist firm thinks your position is already right, they will tell you so."
        />
      </div>

      <OtherTopics topics={otherTopics} />
    </>
  );
}

/**
 * The article library. Deliberately NOT the kit's `HubArticleList`, and this is
 * the one place these four hubs diverge from `BlogCategoryHub`.
 *
 * `packages/web-shared/design/blog/HubArticleList.tsx:85` builds every card href
 * as `/blog/${categorySlug}/${slug}`, a NESTED path. Medical's blog URLs are FLAT
 * (`/blog/<slug>`, DISPOSITION_SLICE1 §C.0) and there is no route at the nested
 * shape: `/blog/nhs-pension-planning/gp-pension-contributions-tax-relief` returns
 * 404 against the running production build, verified. Consuming the kit list as
 * it stands would therefore turn every article link on all eight hubs into a dead
 * link. The component exposes no href override, so this mirrors its markup with a
 * flat href instead of editing the kit.
 *
 * The crawl-path rule is kept exactly: every post is in the server HTML. Never
 * `slice()`, and nothing is hidden: all eight hubs render every article visibly,
 * because `hidden` without a reveal control leaves those items permanently
 * unreachable to a reader while the heading still claims the full count. The
 * 12-visible rule returns together with the kit's pagination control, the moment
 * the kit's article list can emit a flat `/blog/<slug>` href.
 */
function ArticleLibrary({
  articles,
  categoryName,
}: {
  articles: Array<{ slug: string; title: string; summary?: string; date?: string; readTime: number }>;
  categoryName: string;
}) {
  return (
    <section id="articles" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Eyebrow>The library</Eyebrow>
        <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-4xl">
          Every {categoryName} article
        </h2>
        <p className="mb-8 text-base text-slate-600 sm:text-lg">
          {articles.length} {articles.length === 1 ? "guide" : "guides"} in this topic.
        </p>
        {articles.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-all hover:shadow-md hover:ring-primary-600"
              >
                <Link href={`/blog/${post.slug}`} className={`flex h-full flex-col rounded-xl p-6 ${focusRing}`}>
                  <h3 className="text-base font-bold! leading-snug! tracking-normal! text-slate-900 transition-colors hover:text-primary-700 sm:text-lg">
                    {post.title}
                  </h3>
                  {post.summary ? (
                    <div className="mt-3 mb-5 flex-grow">
                      <p className="line-clamp-3 text-sm leading-6 text-slate-600">{post.summary}</p>
                    </div>
                  ) : null}
                  <p className="mt-auto inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock aria-hidden className="h-3.5 w-3.5 text-primary-600" />
                      {post.readTime} min read
                    </span>
                    {post.date ? (
                      <time dateTime={post.date}>
                        {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
                          new Date(post.date),
                        )}
                      </time>
                    ) : null}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-slate-600 ring-1 ring-slate-200/70">
            No articles in this topic yet. Check back shortly.
          </p>
        )}
      </div>
    </section>
  );
}

/** Sibling navigation. The hubs had none, so each was a crawl cul-de-sac back to /blog. */
function OtherTopics({ topics }: { topics: Array<{ slug: string; name: string; count: number }> }) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className={siteContainerLg}>
        <Eyebrow>Keep exploring</Eyebrow>
        <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">Browse other topics</h2>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/blog/${topic.slug}`}
              data-cta={`blog_hub_topic_${topic.slug}`}
              data-cta-placement="blog_other_topics"
              className={`inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-slate-200/70 transition-all hover:text-primary-700 hover:shadow-md hover:ring-primary-600 sm:text-base ${focusRing}`}
            >
              {topic.name}
              <span className="text-xs font-semibold text-slate-500">{topic.count}</span>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          data-cta="blog_hub_all_articles"
          data-cta-placement="blog_other_topics"
          className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800 sm:text-base ${focusRing}`}
        >
          All articles and guides
        </Link>
      </div>
    </section>
  );
}
