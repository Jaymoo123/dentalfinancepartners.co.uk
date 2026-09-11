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

const CATEGORY_NAME = "Locum Tax";
const CATEGORY_SLUG = "locum-tax";

export const metadata: Metadata = {
  title: "Locum Tax: Tax Guidance for Locum Doctors",
  description:
    "Tax guidance for locum doctors covering employment status, self-assessment, allowable expenses, record keeping and tax planning strategies across the UK.",
  alternates: { canonical: `${siteConfig.url}/blog/${CATEGORY_SLUG}` },
  openGraph: {
    title: "Locum Tax: Tax Guidance for Locum Doctors",
    description:
      "Tax guidance for locum doctors covering employment status, self-assessment, allowable expenses and tax planning.",
    url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Locum Tax: Tax Guidance for Locum Doctors")}`, width: 1200, height: 630, alt: "Locum Tax: Tax Guidance for Locum Doctors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Locum Tax: Tax Guidance for Locum Doctors",
    description:
      "Tax guidance for locum doctors covering employment status, self-assessment, allowable expenses and tax planning.",
  },
};

const INTRO =
  "Locum doctors enjoy flexibility and variety, but the tax side of locum work can be complex. From determining your employment status and registering for Self Assessment to claiming legitimate expenses and planning for tax bills, this hub gives you a solid grounding in the tax essentials every locum GP and hospital doctor needs to understand.";

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
    heading: "Employment Status: Self-Employed vs Employed",
    paragraphs: [
      "The first and most important question for any locum doctor is whether HMRC considers you self-employed or employed. This determines how you pay tax, which expenses you can claim and whether you need to file a Self Assessment return. Most GP locums working through direct bookings with practices, controlling their own schedule and providing their own equipment, will be classified as self-employed. However, locums working through agencies or on longer-term placements where the practice controls how and when work is done may be deemed employed, or caught by the off-payroll working rules (IR35).",
      "Getting this wrong has serious consequences. If HMRC reclassifies a self-employed locum as employed, the practice (or agency) becomes liable for PAYE and employer NICs on all payments made, plus penalties and interest. The locum may also lose the right to claim business expenses. HMRC's Check Employment Status for Tax (CEST) tool provides an initial indication, but its results are not always reliable for medical locums. Where there is any doubt, take professional advice before starting an engagement, not after HMRC opens an enquiry.",
    ],
    figure: (
      <FigureCards
        caption="How the engagement is read"
        items={[
          {
            label: "Usually self-employed",
            detail:
              "Direct bookings with practices, where you control your own schedule and provide your own equipment.",
          },
          {
            label: "May be employed, or inside IR35",
            detail:
              "Agency work or longer-term placements where the practice controls how and when the work is done.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Self-Assessment Requirements for Locums",
    paragraphs: [
      "Self-employed locum doctors must register with HMRC for Self Assessment within three months of starting locum work. Class 2 National Insurance is no longer a separate registration or a weekly charge: from 6 April 2024 it is treated as paid where profits are at or above the Small Profits Threshold, and it is voluntary below that, so the contributions that actually fall due on locum profits are Class 4. You'll then file an annual tax return reporting all self-employed income and expenses. The deadline is 31 January following the end of the tax year; for example, income earned between 6 April 2025 and 5 April 2026 must be reported by 31 January 2027.",
      "If you also have PAYE income from a salaried NHS role, this must be included on the same return. Many locums underestimate their tax liability because they forget that locum earnings are added on top of salaried income, potentially pushing them into a higher tax band. Payments on account apply. HMRC requires two advance payments (31 January and 31 July), each equal to half the previous year's Self Assessment liability. New locums should set aside 30-40% of net locum income from day one to avoid a cash-flow shock when the first tax bill arrives.",
    ],
    figure: (
      <FigureTable
        caption="The self-assessment dates named above"
        head={["Step", "When"]}
        rows={[
          ["Register with HMRC", "Within three months of starting locum work"],
          ["File the return", "31 January following the end of the tax year"],
          ["Worked example", "Income earned 6 April 2025 to 5 April 2026 is reported by 31 January 2027"],
          [
            "Payments on account",
            "31 January and 31 July, each equal to half the previous year's liability",
          ],
        ]}
      />
    ),
  },
  {
    heading: "Allowable Expenses for Locum Doctors",
    paragraphs: [
      "Self-employed locums can deduct legitimate business expenses from their taxable income, reducing both income tax and Class 4 NICs. The key test is that the expense must be incurred \"wholly and exclusively\" for the purpose of the locum business. Common allowable expenses include:",
      "Keep receipts and records for every expense. HMRC can enquire into any return within 12 months of the filing deadline (or longer if they suspect carelessness or fraud), and you will need documentary evidence to support every claim.",
    ],
    figure: (
      <FigureCards
        caption="Common allowable expenses"
        items={[
          {
            label: "Travel to temporary workplaces",
            detail:
              "Mileage (55p per mile for the first 10,000 business miles in 2026/27, then 25p per mile), parking, train fares and accommodation for distant placements.",
          },
          {
            label: "Professional indemnity",
            detail: "MDU, MPS or other provider, fully deductible.",
          },
          {
            label: "Professional subscriptions",
            detail: "GMC registration, BMA, RCGP and Royal College fees.",
          },
          {
            label: "Medical equipment",
            detail: "Stethoscopes, ophthalmoscopes, bags and clinical tools.",
          },
          {
            label: "Training and CPD",
            detail: "Courses directly related to your medical practice.",
          },
          {
            label: "Accountancy fees",
            detail: "Preparing your tax return and business accounts.",
          },
          {
            label: "Phone, internet and home office",
            detail: "Proportionate business use.",
          },
          {
            label: "Agency and platform costs",
            detail: "Locum agency fees and platform subscription costs.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Record Keeping Best Practices",
    paragraphs: [
      "Good record keeping is not optional. HMRC requires self-employed individuals to maintain records for at least five years after the 31 January filing deadline for the relevant tax year. For locum doctors, this means keeping systematic records of every session worked, every invoice raised and every expense incurred. Falling behind creates a stressful year-end scramble and increases the risk of under- or over-claiming expenses.",
    ],
    figure: (
      <FigureCards
        caption="A record-keeping routine"
        numbered
        items={[
          {
            label: "Log income and expenses in real time",
            detail: "Use cloud accounting software such as Xero, FreeAgent or QuickBooks.",
          },
          {
            label: "Photograph receipts immediately",
            detail: "Paper fades, and lost receipts cannot support expense claims.",
          },
          {
            label: "Maintain a mileage log",
            detail: "Date, destination, purpose and miles for every business journey.",
          },
          {
            label: "Reconcile bank statements monthly",
            detail: "This catches missing invoices and uncategorised payments.",
          },
          {
            label: "Keep a separate business bank account",
            detail:
              "It simplifies record keeping and demonstrates clear business boundaries to HMRC.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Tax Planning Strategies for Locum Doctors",
    paragraphs: [
      "Beyond claiming expenses, locum doctors have several strategies available to manage their tax position. Pension contributions are one of the most effective options: if you are not already contributing to the NHS Pension Scheme through a salaried role, making personal pension contributions provides income tax relief at your marginal rate. Even locums who are in the NHS Scheme can make additional voluntary contributions or pay into a SIPP to shelter more income.",
      "Timing is also important. If you expect your income to drop next year (for example, taking a career break, returning to training or reducing sessions), consider deferring invoicing or accelerating expenses into the current year where commercially reasonable. For locums earning above £100,000, the personal allowance taper means effective marginal tax rates can reach 60%; the allowance is withdrawn by £1 for every £2 of adjusted net income above £100,000, so pension contributions or Gift Aid donations restore half of whatever they take off that figure. If your annual locum turnover exceeds the VAT registration threshold (currently £90,000), you must register for VAT, though most medical services are VAT-exempt, some locum agency structures may require standard-rated treatment.",
    ],
    figure: (
      <FigureTable
        caption="The two thresholds named above"
        head={["Threshold", "What happens at it"]}
        rows={[
          [
            "£100,000 of income",
            "The personal allowance taper begins, so effective marginal tax rates can reach 60%.",
          ],
          [
            "£90,000 of turnover",
            "The VAT registration threshold. Most medical services are exempt, but some locum agency structures may be standard-rated.",
          ],
        ]}
      />
    ),
  },
];

export default function LocumTaxPillarPage() {
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
            {posts.length} {posts.length === 1 ? "guide" : "guides"} on locum tax, kept current.
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
            className={`mt-8 inline-flex items-center gap-1.5 rounded py-1 text-sm font-bold text-primary-700 transition-colors hover:text-primary-800 sm:text-base ${focusRing}`}
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
