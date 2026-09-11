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

const CATEGORY_NAME = "Medical Expenses";
const CATEGORY_SLUG = "medical-expenses";
const PAGE_TITLE = "Allowable Medical Expenses for UK Doctors";
const PAGE_DESCRIPTION =
  "Complete guide to tax-deductible expenses for UK doctors: professional subscriptions, indemnity, equipment, travel, CPD and more.";

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
    heading: "Professional Subscriptions and Indemnity",
    paragraphs: [
      "Subscriptions to professional bodies approved by HMRC are fully deductible against your taxable income. For doctors, the most common claims include GMC registration fees, BMA membership, Royal College subscriptions (RCGP, RCP, RCS and others) and specialist society memberships relevant to your field. HMRC maintains a published list of approved bodies, and any subscription to an organisation on that list qualifies automatically.",
      "Medical indemnity or defence-organisation subscriptions (such as those paid to the MDU, MPS or MDDUS) are also deductible where you are required to hold cover to practise. Since the state-backed Clinical Negligence Scheme for General Practice (CNSGP) now covers NHS GP work, indemnity costs have shifted, but many doctors still pay for private-practice cover, Good Samaritan cover or enhanced advisory services. These remain allowable provided the cover relates to your professional duties.",
    ],
    figure: (
      <Figure
        title="What the subscription and indemnity claim is built from"
        cards={[
          { title: "GMC registration", detail: "The annual retention fee, deductible as a registration cost." },
          { title: "BMA and Royal Colleges", detail: "RCGP, RCP, RCS and specialist society fees, where the body is on HMRC's published list." },
          { title: "Defence organisations", detail: "MDU, MPS or MDDUS subscriptions, where you must hold cover to practise." },
          { title: "What CNSGP changed", detail: "NHS GP clinical work is state-indemnified, so own cover is mainly private, Good Samaritan or advisory." },
        ]}
      />
    ),
  },
  {
    heading: "Medical Equipment and Instruments",
    paragraphs: [
      "If you purchase medical equipment, instruments or tools that you need for your work and your employer does not provide them, the cost is deductible. This includes stethoscopes, ophthalmoscopes, diagnostic kits, surgical instruments and specialist software licences. Qualifying equipment is normally claimed in full in the year of purchase under the annual investment allowance, which covers up to £1,000,000 of qualifying plant and machinery a year and excludes cars, so for most doctors the whole cost is relieved in that year rather than spread over the life of the asset.",
      "For self-employed GPs and private practitioners, the full cost of equipping a consulting room (examination couches, IT hardware, clinical-waste disposal and consumables) is allowable against practice income. Employed doctors may claim via a Self Assessment tax return for items bought out of their own pocket where the expense is incurred “wholly, exclusively and necessarily” in the performance of their duties. Keeping receipts and a brief note of the clinical purpose strengthens any claim if HMRC queries it.",
    ],
    figure: (
      <Figure
        title="Two claim routes, and what sits in each"
        cards={[
          { title: "Clinical instruments", detail: "Stethoscopes, ophthalmoscopes, diagnostic kits and surgical instruments you buy yourself." },
          { title: "Software and licences", detail: "Specialist software licences bought for your own clinical work." },
          { title: "Consulting-room fit-out", detail: "Examination couches, IT hardware, clinical-waste disposal and consumables, against practice income." },
          { title: "The employed-doctor test", detail: "Claimed through Self Assessment, and only where the cost is wholly, exclusively and necessarily incurred in the duties." },
        ]}
      />
    ),
  },
  {
    heading: "Travel and Motor Expenses",
    paragraphs: [
      "Travel between two workplaces (for example, driving from your NHS hospital to a private clinic) is an allowable business journey. Locum doctors travelling to temporary engagements can claim the full cost of travel, including mileage, parking, tolls and public transport fares. The approved HMRC mileage rate is 55p per mile for the first 10,000 business miles in 2026/27 (it rose from 45p on 6 April 2026) and 25p per mile thereafter when using your own car.",
      "Travel from home to a permanent workplace is commuting and is not deductible. However, where a locum or portfolio GP has no permanent workplace (because each engagement is a temporary posting), travel from home to each site can qualify. The distinction hinges on HMRC's “24-month rule” and the pattern of your working arrangements. Conference travel, including flights, hotels and subsistence for attending CPD events, is also allowable provided the primary purpose of the trip is professional development rather than leisure.",
    ],
    figure: (
      <Figure
        title="Which journey is deductible, and at what rate"
        headers={["Journey or rate", "2026/27 treatment"]}
        rows={[
          ["First 10,000 business miles", "55p per mile in your own car, up from 45p on 6 April 2026"],
          ["Business miles above 10,000", "25p per mile"],
          ["NHS hospital to a private clinic", "Travel between two workplaces, allowable"],
          ["Home to a permanent workplace", "Commuting, not deductible"],
          ["Home to each temporary site", "Can qualify where there is no permanent workplace"],
          ["Conference flights, hotels and subsistence", "Allowable where the primary purpose is professional development"],
        ]}
        note="Mileage rates for the 2026/27 tax year"
      />
    ),
  },
  {
    heading: "Training, CPD and Examination Fees",
    paragraphs: [
      "Continuing professional development is a regulatory requirement for all doctors on the GMC register, and the costs of meeting that requirement are tax-deductible. This covers course fees, conference registration, online learning-platform subscriptions and the purchase of medical textbooks and journals. Examination fees for postgraduate qualifications (such as MRCP, MRCGP or FRCS) are deductible where the qualification is needed to maintain or improve your existing skills rather than to enter an entirely new profession.",
      "Self-employed doctors can deduct these costs directly on their tax return. Employed doctors claim through the employment-expenses section of Self Assessment, subject to the “wholly, exclusively and necessarily” test. Where your employer reimburses CPD costs, you cannot also claim tax relief; double-claiming is a common error flagged in HMRC compliance checks. Maintaining a CPD log that ties each expense to a specific learning activity makes the claim straightforward to evidence.",
    ],
    figure: (
      <Figure
        title="What a CPD claim covers, and where it stops"
        cards={[
          { title: "Courses and conferences", detail: "Course fees and conference registration for CPD you are required to complete." },
          { title: "Learning materials", detail: "Online learning-platform subscriptions, medical textbooks and journals." },
          { title: "Postgraduate examinations", detail: "MRCP, MRCGP or FRCS fees, where the qualification maintains or improves existing skills." },
          { title: "Where the claim stops", detail: "Training to enter an entirely new profession, and any cost your employer has already reimbursed." },
        ]}
      />
    ),
  },
  {
    heading: "Home Office and Administrative Costs",
    paragraphs: [
      "Doctors who carry out administrative work from home (preparing reports, completing appraisal portfolios, managing practice accounts) may be able to claim a proportion of household costs. HMRC allows a flat-rate deduction of £6 per week (£312 per year) without the need for supporting evidence. Alternatively, you can calculate the actual proportion of household expenses (heating, lighting, broadband, insurance) attributable to your work use, which often yields a higher figure for those with a dedicated home office.",
      "Other commonly overlooked administrative costs include accountancy fees for preparing your tax return, the cost of specialist tax advice, bank charges on a dedicated business account, professional-liability insurance and DBS check fees. Locum agencies sometimes deduct costs before paying you, so it is important to reconcile agency statements against your own records to avoid missing deductions or double-counting expenses already netted off your income.",
    ],
    figure: (
      <Figure
        title="The two home-working methods, and what sits outside them"
        headers={["Item", "How it is claimed"]}
        rows={[
          ["HMRC flat rate", "£6 per week, £312 per year, with no supporting evidence needed"],
          ["Actual proportion", "Heating, lighting, broadband and insurance apportioned to work use"],
          ["Accountancy and tax advice", "Claimed in full as an administrative cost, not through either home-working method"],
          ["Business bank charges", "Claimed where the account is a dedicated business account"],
          ["Professional-liability insurance and DBS fees", "Claimed in full where they relate to your practice"],
          ["Agency deductions", "Reconciled against your own records, so nothing is claimed twice"],
        ]}
        note="Flat-rate figures as published by HMRC"
      />
    ),
  },
];

const PROOF_POINTS = [
  { title: "Claims tested against what is defensible", detail: "Subscriptions, indemnity, equipment and travel are each treated differently" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to an accountant who works with doctors" },
  { title: "Modelled on your figures", detail: "Your own income mix, not a template" },
];

export default function MedicalExpensesPillarPage() {
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
              Allowable Expenses for UK Doctors &amp; Medical Professionals
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Claiming every legitimate expense reduces your tax bill and ensures you are not paying
              more than you owe. Yet many doctors, particularly those juggling NHS employment with
              locum or private work, leave deductions unclaimed simply because they are unsure what
              qualifies. This hub explains the main categories of
              allowable expenses for UK medical professionals and how to claim them correctly.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#enquiry-form"
                data-cta={`blog_hub_${CATEGORY_SLUG}_book`}
                data-cta-placement="blog_hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                Book free consultation
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
