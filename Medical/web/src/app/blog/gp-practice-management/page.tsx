import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import {
  btnOnCream,
  btnPrimary,
  focusRing,
  heroCreamSurface,
  siteContainerLg,
} from "@/components/ui/layout-utils";
import { getAllPosts, getAllCategories, slugifyCategory, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";
import { blogCtaFor } from "@/lib/blog-cta";

const CATEGORY_NAME = "GP Practice Management";
const CATEGORY_SLUG = "gp-practice-management";

export const metadata: Metadata = {
  title: "GP Practice Management: Financial Guidance for Practices",
  description:
    "Financial management guidance for GP practices covering partnership structures, payroll, mergers, CQC compliance and practice budgeting across the UK.",
  alternates: { canonical: `${siteConfig.url}/blog/${CATEGORY_SLUG}` },
  openGraph: {
    title: "GP Practice Management: Financial Guidance for Practices",
    description:
      "Financial management guidance for GP practices covering partnership structures, payroll, mergers and compliance.",
    url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("GP Practice Management: Financial Guidance for Practices")}`, width: 1200, height: 630, alt: "GP Practice Management: Financial Guidance for Practices" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GP Practice Management: Financial Guidance for Practices",
    description:
      "Financial management guidance for GP practices covering partnership structures, payroll, mergers and compliance.",
  },
};

const INTRO =
  "Running a GP practice demands far more than clinical excellence. Partners must manage budgets, staffing, regulatory compliance and strategic planning, all while delivering patient care. This hub covers the financial and operational essentials every GP practice needs to stay viable, compliant and well-positioned for the future.";

/* Figure primitives. Local to this route file because Phase 3 builders own only
   their own hub pages; the moment the kit's BlogCategoryHub can render a flat
   /blog/<slug> article link these four files collapse back to data.
   ponytail: three small blocks, not a figure framework. */

function FigureFrame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="rounded-xl bg-slate-50 p-5 ring-1 ring-slate-200/70">
      <figcaption className="mb-4 text-[11px] font-bold uppercase tracking-wide text-slate-500">
        {caption}
      </figcaption>
      {children}
    </figure>
  );
}

function FigureCards({
  caption,
  items,
  numbered = false,
}: {
  caption: string;
  items: Array<{ label: string; detail: string }>;
  numbered?: boolean;
}) {
  const Wrapper = numbered ? "ol" : "ul";
  return (
    <FigureFrame caption={caption}>
      <Wrapper className="grid gap-3 sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.label} className="rounded-xl bg-white p-4 ring-1 ring-slate-200/70">
            <p className="text-sm font-bold text-slate-900">
              {numbered ? `${i + 1}. ` : ""}
              {item.label}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
          </li>
        ))}
      </Wrapper>
    </FigureFrame>
  );
}

function FigureTable({
  caption,
  head,
  rows,
  note,
}: {
  caption: string;
  head: [string, string];
  rows: Array<[string, string]>;
  note?: string;
}) {
  return (
    <FigureFrame caption={caption}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[22rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-300">
              <th scope="col" className="py-2 pr-4 font-bold text-slate-900">{head[0]}</th>
              <th scope="col" className="py-2 font-bold text-slate-900">{head[1]}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-slate-200 last:border-b-0">
                <th scope="row" className="py-3 pr-4 align-top font-semibold text-slate-900">{row[0]}</th>
                <td className="py-3 align-top leading-6 text-slate-600">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="mt-3 text-sm leading-6 text-slate-600">{note}</p> : null}
    </FigureFrame>
  );
}

type Section = { heading: string; paragraphs: string[]; figure: ReactNode };

const SECTIONS: Section[] = [
  {
    heading: "Partnership Structures and Agreements",
    paragraphs: [
      "Most GP practices in England operate as partnerships, whether traditional unlimited partnerships or, increasingly, limited liability partnerships (LLPs). The partnership agreement is the single most important document governing how the practice runs financially. It dictates profit shares, capital contributions, decision-making authority, maternity and sickness cover arrangements and the process for admitting or retiring partners.",
      "A poorly drafted agreement can lead to costly disputes when circumstances change. Key areas to address include how goodwill is valued (or whether it's recognised at all), how property ownership interacts with the partnership, prior shares arrangements for senior partners and what happens if a partner is suspended by the GMC or NHS England. Agreements should be reviewed every three to five years and whenever there is a change in the partnership to ensure they reflect current circumstances and tax legislation.",
    ],
    figure: (
      <FigureCards
        caption="What the partnership agreement has to settle"
        items={[
          { label: "Profit shares", detail: "How practice profit is divided between the partners." },
          { label: "Capital contributions", detail: "What each partner puts in, and when." },
          { label: "Decision-making authority", detail: "Who can commit the partnership to what." },
          {
            label: "Maternity and sickness cover",
            detail: "The arrangements that apply while a partner is absent.",
          },
          {
            label: "Joining and retiring",
            detail: "The process for admitting or retiring partners.",
          },
          {
            label: "Goodwill, property and prior shares",
            detail:
              "How goodwill is valued or whether it is recognised at all, how property ownership interacts with the partnership, and prior shares for senior partners.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Financial Management for GP Practices",
    paragraphs: [
      "Effective financial management starts with understanding where practice income comes from and how it is allocated. The core funding streams (Global Sum, QOF, Enhanced Services and PCN Additional Roles Reimbursement) each have different reporting requirements and cost-recovery mechanisms. Partners need regular management accounts, ideally quarterly, to track profitability against budget and identify variances before they become problems.",
    ],
    figure: (
      <FigureCards
        caption="The controls that sit under the management accounts"
        items={[
          {
            label: "Cash flow forecasting",
            detail:
              "To manage seasonal fluctuations in NHS payments and avoid overdraft reliance.",
          },
          {
            label: "Partner drawings policies",
            detail: "Balancing personal income needs with practice cash reserves.",
          },
          {
            label: "Capital expenditure planning",
            detail: "For premises improvements, IT upgrades and diagnostic equipment.",
          },
          {
            label: "Benchmarking",
            detail: "Practice costs per patient against AISMA and NHS England averages.",
          },
          {
            label: "Reserves policy",
            detail:
              "To cover unexpected costs such as staff absence, equipment failure or regulatory fines.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Staff Payroll and Employment Obligations",
    paragraphs: [
      "GP practices are significant employers. A typical four-partner practice may employ 15 to 30 staff across reception, administration, nursing and healthcare assistant roles. Payroll is often the largest single expense after partner drawings, and getting it wrong carries serious penalties. Practices must operate PAYE in real time, comply with the National Minimum Wage and National Living Wage, manage statutory sick pay, maternity pay and paternity pay, and administer workplace pension auto-enrolment.",
      "The NHS Pension Scheme adds another layer of complexity for eligible practice staff. Employer contributions to the NHS Scheme are higher than most private workplace pensions, and practices must submit accurate monthly and annual returns to the NHS Business Services Authority. With the introduction of PCN-employed staff and the Additional Roles Reimbursement Scheme, practices also need to understand how reimbursement claims interact with payroll costs and ensure they are recovering the full amounts they are entitled to.",
    ],
    figure: (
      <FigureTable
        caption="The payroll obligations named above"
        head={["Obligation", "What it requires"]}
        rows={[
          ["PAYE", "Operated in real time."],
          [
            "Wage floors",
            "Compliance with the National Minimum Wage and the National Living Wage.",
          ],
          ["Statutory pay", "Statutory sick pay, maternity pay and paternity pay."],
          ["Auto-enrolment", "Administering the workplace pension."],
          [
            "NHS Pension Scheme",
            "Accurate monthly and annual returns to the NHS Business Services Authority.",
          ],
        ]}
      />
    ),
  },
  {
    heading: "Practice Mergers and Structural Changes",
    paragraphs: [
      "Practice mergers have become increasingly common as smaller practices face financial and workforce pressures. Merging can deliver economies of scale, strengthen negotiating power with ICBs and improve resilience against partner retirements. However, mergers also introduce significant financial complexity: different profit-sharing models, property ownership structures, staff terms and conditions and IT systems all need harmonising.",
      "Before committing to a merger, practices should undertake thorough financial due diligence. Post-merger integration planning is equally important. Rushed mergers that fail to align cultures and systems often unravel within two to three years, leaving partners worse off than before.",
    ],
    figure: (
      <FigureCards
        caption="The due diligence to do before committing"
        numbered
        items={[
          {
            label: "Compare income per weighted patient",
            detail: "The like-for-like measure of what each practice earns.",
          },
          {
            label: "Understand each property arrangement",
            detail: "Owned or leased, with or without notional rent.",
          },
          {
            label: "Review staff contracts",
            detail: "Specifically for TUPE implications.",
          },
          {
            label: "Model the combined tax position",
            detail: "For the merged partnership, not the two separate ones.",
          },
          {
            label: "Plan the integration",
            detail: "Aligning cultures and systems, not just the accounts.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Regulatory and CQC Financial Compliance",
    paragraphs: [
      "Every GP practice registered with the Care Quality Commission must demonstrate that it is well-led, which includes sound financial governance. CQC inspectors increasingly look at whether practices have adequate financial controls, clear governance structures and contingency plans for financial sustainability. A practice rated \"inadequate\" on the well-led domain may face conditions on its registration or, in extreme cases, closure.",
    ],
    figure: (
      <FigureCards
        caption="The financial governance an inspection looks for"
        items={[
          {
            label: "Documented financial policies",
            detail: "Authorisation limits, expenditure approval and fraud prevention.",
          },
          {
            label: "Regular financial reporting",
            detail: "To the partnership, with minutes recording decisions.",
          },
          {
            label: "Segregation of duties",
            detail: "For banking, invoicing and payroll, to reduce fraud risk.",
          },
          {
            label: "Timely annual accounts",
            detail: "Prepared and reviewed within six months of the financial year end.",
          },
          {
            label: "Business continuity plans",
            detail:
              "Addressing financial resilience, including insurance cover and key-person dependencies.",
          },
        ]}
      />
    ),
  },
];

export default function GPPracticeManagementPillarPage() {
  const posts = getAllPosts()
    // Key on the slug, never the raw frontmatter label: Medical's frontmatter
    // carries both quoted and unquoted forms of the same category names, so a
    // label match is one edit away from silently emptying this hub.
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
        name: CATEGORY_NAME,
        description: metadata.description,
        url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Eyebrow>Blog topic</Eyebrow>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              {CATEGORY_NAME}
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              {INTRO}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#enquiry-form"
                data-cta={`blog_hub_${CATEGORY_SLUG}_book`}
                data-cta-placement="blog_hero"
                data-cta-goal="form"
                className={btnPrimary}
              >
                {cta.button}
              </Link>
              <Link
                href="#articles"
                data-cta={`blog_hub_${CATEGORY_SLUG}_articles`}
                data-cta-placement="blog_hero"
                className={btnOnCream}
              >
                Browse {posts.length} {posts.length === 1 ? "article" : "articles"}
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
                  {s.figure}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The article list renders every post in this category, visibly. `hidden`
          without a reveal control would leave the off-page items unreachable to a
          reader while the heading above still claims the full count, so the
          12-visible rule returns together with the kit's pagination control, the
          moment the kit's article list can emit a flat `/blog/<slug>` href. */}
      <section id="articles" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>The library</Eyebrow>
          <h2 className="mb-2 text-2xl font-bold text-slate-900 sm:text-4xl">
            Every {CATEGORY_NAME} article
          </h2>
          <p className="mb-8 text-base text-slate-600 sm:text-lg">
            {posts.length} {posts.length === 1 ? "guide" : "guides"} on running a GP practice, kept
            current.
          </p>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200/70 transition-all hover:shadow-md hover:ring-primary-600"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className={`flex h-full flex-col rounded-xl p-6 ${focusRing}`}
                >
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
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(post.date))}
                      </time>
                    ) : null}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div id="enquiry-form" className="scroll-mt-24">
        <LeadCTAPanel
          title={cta.heading}
          description={cta.body}
          proofPoints={MEDICAL_PROOF_POINTS}
          backdrop={<MedicalBackdrop />}
          footnote="No obligation and no hard sell. If the specialist firm thinks your position is already right, they will tell you so."
          form={<LeadForm redirectOnSuccess={false} submitLabel={cta.button} />}
        />
      </div>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Keep exploring</Eyebrow>
          <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-4xl">Browse other topics</h2>
          <div className="flex flex-wrap gap-3">
            {otherTopics.map((topic) => (
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
    </>
  );
}

/** Closing-panel proof points. Mechanisms only: no fee, no turnaround, no
 *  client count, and nothing that implies an in-house team does the work. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];
