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

const CATEGORY_NAME = "Private Practice";
const CATEGORY_SLUG = "private-practice";
const PAGE_TITLE = "Private Practice for UK Doctors & Consultants";
const PAGE_DESCRIPTION =
  "Setting up and growing a private medical practice in the UK, covering structure, VAT, insurance, financial planning and tax-efficient income strategies.";

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
    heading: "Setting Up a Private Practice in the UK",
    paragraphs: [
      "Before seeing your first private patient, several foundational steps need to be in place. You will need to register with the relevant private medical insurers (such as Bupa, AXA Health and Aviva) to appear on their practitioner directories and receive direct settlement of fees. Applying for practising privileges at one or more private hospitals gives you access to theatres, consulting rooms and diagnostic facilities. Each hospital has its own credentialing process, typically requiring evidence of GMC registration, indemnity cover, appraisal completion and specialist training.",
      "You must also notify HMRC that you are receiving self-employment income and register for Self Assessment if you are not already in the system. Opening a dedicated business bank account keeps practice income and expenses separate from personal finances, simplifying bookkeeping and tax returns. Many consultants start by practising as a sole trader, which is the simplest structure, and review whether a limited company would be more tax-efficient once fee income reaches a meaningful level.",
    ],
    figure: (
      <Figure
        title="The order the setup steps run in"
        cards={[
          { title: "1. Insurer directories", detail: "Register with the private medical insurers, such as Bupa, AXA Health and Aviva, to appear on their practitioner directories and receive direct settlement of fees." },
          { title: "2. Practising privileges", detail: "Apply at one or more private hospitals for access to theatres, consulting rooms and diagnostic facilities." },
          { title: "3. Credentialing evidence", detail: "Each hospital typically asks for GMC registration, indemnity cover, appraisal completion and specialist training." },
          { title: "4. HMRC and banking", detail: "Notify HMRC of the self-employment income, register for Self Assessment, and open a dedicated business bank account." },
        ]}
      />
    ),
  },
  {
    heading: "Structuring Private Practice Income",
    paragraphs: [
      "How you structure your private earnings has a direct impact on your tax bill. As a sole trader, all practice profits are added to your other income and taxed at your marginal rate, which is often 40% or 45% for consultants with substantial NHS salaries. Operating through a limited company allows you to pay yourself a tax-efficient combination of salary and dividends, and profits left in the company bear corporation tax rather than your marginal income tax rate until they are extracted. Whether that is an overall saving depends on how much you actually need to draw, because extraction carries its own dividend tax, so incorporation is not a clear win at typical private-practice income levels and has to be modelled on your own figures.",
      "The decision to incorporate should weigh up several factors: the level of profit you intend to retain in the business, the administrative burden of running a company, the impact on NHS pension contributions and whether you plan to employ staff or associates. Consultants in group practices may prefer a partnership or LLP, which offers liability protection while keeping the tax position transparent. Whatever the structure, an annual tax-planning review ensures you are extracting income in the most efficient way as rates and allowances change.",
    ],
    figure: (
      <Figure
        title="Three structures, and how each is taxed"
        headers={["Structure", "How profits are taxed", "What it suits"]}
        rows={[
          ["Sole trader", "Added to your other income and taxed at your marginal rate", "The simplest start, reviewed once fee income reaches a meaningful level"],
          ["Limited company", "Corporation tax on profits, then salary and dividends drawn from the company", "Profit intended to be retained in the business"],
          ["Partnership or LLP", "Transparent, allocated to members and taxed personally", "Consultants in group practices wanting liability protection"],
        ]}
      />
    ),
  },
  {
    heading: "VAT Considerations for Private Practitioners",
    paragraphs: [
      "Most medical services provided by a registered medical practitioner are exempt from VAT under UK law, which means you do not charge VAT on consultation fees, surgical procedures or diagnostic services. However, VAT exemption is not universal. Medico-legal reports, cosmetic procedures that are not clinically necessary, expert-witness fees and certain occupational-health services may be standard-rated at 20%.",
      "If your taxable (non-exempt) turnover exceeds the VAT registration threshold, currently £90,000, you must register for VAT and charge it on those supplies. Because exempt income does not count towards the threshold, many doctors are surprised to find that only a portion of their total fees are relevant. Partial exemption rules also limit how much input VAT you can reclaim on costs that relate to both exempt and taxable activities. Getting the VAT position right from the outset avoids costly retrospective assessments and penalties.",
    ],
    figure: (
      <Figure
        title="Which supplies are exempt, and which are not"
        headers={["Supply or test", "VAT treatment"]}
        rows={[
          ["Consultation fees, surgical procedures, diagnostic services", "Exempt where provided by a registered medical practitioner"],
          ["Medico-legal reports and expert-witness fees", "May be standard-rated at 20%"],
          ["Cosmetic procedures that are not clinically necessary", "May be standard-rated at 20%"],
          ["Certain occupational-health services", "May be standard-rated at 20%"],
          ["Registration threshold", "£90,000 of taxable, non-exempt turnover"],
          ["Exempt income", "Does not count towards the threshold"],
        ]}
        note="VAT registration threshold and standard rate, 2026/27"
      />
    ),
  },
  {
    heading: "Insurance and Indemnity Requirements",
    paragraphs: [
      "Adequate indemnity cover is a GMC requirement and a practical necessity. For private practice, you need cover that extends beyond the state-backed CNSGP scheme, which only applies to NHS GP work. The main medical defence organisations (MDU, MPS and MDDUS) offer discretionary indemnity, while commercial insurers provide occurrence-based or claims-made policies. The right choice depends on your specialty, procedure mix and risk profile.",
      "Beyond clinical indemnity, consider public-liability insurance (if you own or lease premises), employers' liability insurance (mandatory if you employ staff), cyber-insurance (increasingly important as practices hold digital patient records) and income-protection cover to replace earnings if illness or injury prevents you from working. Premiums for all insurance directly related to your practice are tax-deductible. Reviewing your cover annually ensures there are no gaps, especially after expanding into new procedures or taking on associates.",
    ],
    figure: (
      <Figure
        title="The five covers, and what each is for"
        cards={[
          { title: "Clinical indemnity", detail: "Cover beyond CNSGP, which applies only to NHS GP work. Discretionary indemnity from the MDU, MPS or MDDUS, or an occurrence-based or claims-made policy from a commercial insurer." },
          { title: "Public liability", detail: "Where you own or lease premises." },
          { title: "Employers' liability", detail: "Mandatory if you employ staff." },
          { title: "Cyber insurance", detail: "Increasingly important as practices hold digital patient records." },
          { title: "Income protection", detail: "Replaces earnings if illness or injury prevents you from working." },
          { title: "The tax treatment", detail: "Premiums for insurance directly related to your practice are tax-deductible." },
        ]}
      />
    ),
  },
  {
    heading: "Financial Planning and Growth Strategies",
    paragraphs: [
      "A private practice is a business, and sustainable growth requires financial discipline. Key metrics to track include fee income per session, consultation-to-procedure conversion rate, debtor days (how quickly insurers and self-pay patients settle invoices) and overhead ratio. Building a cash reserve of at least three months' operating costs protects against the income volatility that many new practices experience.",
      "Growth strategies range from expanding your insurer panel and building GP referral networks to investing in marketing, hiring a practice manager or bringing in associate consultants. Each step has financial and tax implications. Employing staff triggers PAYE, auto-enrolment pensions and employment-law obligations, while leasing premises commits you to fixed costs. A long-term financial plan, reviewed annually with your accountant, keeps growth aligned with your personal income goals, pension strategy and eventual exit plan, whether that is selling the practice, winding down gradually or transitioning to a group model.",
    ],
    figure: (
      <Figure
        title="What to track, and what each growth step commits you to"
        headers={["Metric or step", "What it tells you, or what it triggers"]}
        rows={[
          ["Fee income per session", "Earnings measured against clinic time"],
          ["Consultation-to-procedure conversion", "How many consultations go on to a procedure"],
          ["Debtor days", "How quickly insurers and self-pay patients settle invoices"],
          ["Overhead ratio", "Practice overheads measured against fee income"],
          ["Cash reserve", "At least three months of operating costs, against income volatility"],
          ["Employing staff", "PAYE, auto-enrolment pensions and employment-law obligations"],
          ["Leasing premises", "A commitment to fixed costs"],
        ]}
      />
    ),
  },
];

const PROOF_POINTS = [
  { title: "All three income streams read together", detail: "NHS post, private fees and medico-legal work in one tax position" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to an accountant who works with doctors" },
  { title: "Modelled on your figures", detail: "Your own income mix, not a template" },
];

export default function PrivatePracticePillarPage() {
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
              Private Practice for UK Doctors &amp; Consultants
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Private practice offers consultants and specialist doctors an opportunity to supplement
              NHS income, gain clinical autonomy and build long-term wealth. Yet moving from salaried
              NHS work to running your own practice introduces a new set of financial, regulatory and
              operational considerations. This hub brings together our guidance on every stage, from
              initial setup through to growth and exit planning.
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
          className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-600 transition-colors hover:text-primary-700 sm:text-base ${focusRing}`}
        >
          All articles and guides
        </Link>
      </div>
    </section>
  );
}
