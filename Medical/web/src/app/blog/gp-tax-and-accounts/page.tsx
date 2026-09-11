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

const CATEGORY_NAME = "GP Tax & Accounts";
const CATEGORY_SLUG = "gp-tax-and-accounts";

export const metadata: Metadata = {
  title: "GP Tax & Accounts: Tax Planning for General Practitioners",
  description:
    "Expert guidance on GP tax returns, NHS income reporting, partnership taxation and tax-efficient strategies for general practitioners across the UK.",
  alternates: { canonical: `${siteConfig.url}/blog/${CATEGORY_SLUG}` },
  openGraph: {
    title: "GP Tax & Accounts: Tax Planning for General Practitioners",
    description:
      "Expert guidance on GP tax returns, NHS income reporting, partnership taxation and tax-efficient strategies.",
    url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("GP Tax & Accounts: Tax Planning for General Practitioners")}`, width: 1200, height: 630, alt: "GP Tax & Accounts: Tax Planning for General Practitioners" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GP Tax & Accounts: Tax Planning for General Practitioners",
    description:
      "Expert guidance on GP tax returns, NHS income reporting, partnership taxation and tax-efficient strategies.",
  },
};

const INTRO =
  "Tax compliance for general practitioners is rarely straightforward. Multiple income streams, complex partnership arrangements, NHS pension interactions and evolving HMRC requirements mean GPs need a clear understanding of their obligations, and of the strategies available to reduce their tax burden legally. This hub covers the essentials every GP should know.";

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
    heading: "GP Tax Return Essentials",
    paragraphs: [
      "Every GP with self-employed income must file a Self Assessment tax return by 31 January following the end of the tax year. For GP partners, this includes reporting their share of partnership profits on the partnership pages (SA800) and their personal return (SA100). Salaried GPs who only receive PAYE income may not need to file, but those with locum sessions, private work or investment income above £1,000 almost certainly will.",
      "Getting the return right depends on accurate partnership accounts and correctly allocated income. Three errors are common, and each can trigger HMRC enquiries and result in penalties plus interest on underpaid tax.",
    ],
    figure: (
      <FigureCards
        caption="Where GP returns commonly go wrong"
        items={[
          {
            label: "Superannuation contributions misreported",
            detail:
              "They are not deducted from taxable profits, but are relieved via the pension scheme.",
          },
          {
            label: "Seniority or Golden Hello payments left off",
            detail: "Both are income and both belong on the return.",
          },
          {
            label: "Overlap relief not claimed",
            detail: "It is missed when a GP retires or leaves a practice mid-year.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Income Sources and Reporting",
    paragraphs: [
      "A GP's taxable income can come from a surprisingly wide range of sources. Each must be reported correctly, and some have specific rules that differ from standard self-employment income.",
    ],
    figure: (
      <FigureCards
        caption="Every source, and how it is treated"
        items={[
          {
            label: "NHS partnership profits",
            detail: "The GP's share of practice profits after allowable expenses.",
          },
          {
            label: "Salaried GP income",
            detail: "Taxed via PAYE, but additional income may require Self Assessment.",
          },
          {
            label: "Locum fees",
            detail: "Typically self-employed income requiring registration and Class 4 NICs.",
          },
          {
            label: "Private and medico-legal work",
            detail: "Insurance reports, cremation fees and occupational health contracts.",
          },
          {
            label: "NHS Pension Scheme employer contributions",
            detail: "Not taxable income, but they affect annual allowance calculations.",
          },
          {
            label: "Property income from surgery premises",
            detail: "Rent received from the practice or from third parties.",
          },
          {
            label: "Grants and awards",
            detail: "Training grants, bursaries and clinical excellence awards.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Tax Efficiency Strategies for GPs",
    paragraphs: [
      "Tax planning for GPs goes beyond claiming allowable expenses. While practice costs, professional subscriptions (BMA, MDU/MPS, RCGP), training courses and business mileage are all deductible, genuine tax efficiency requires a more strategic approach. Pension contributions remain one of the most powerful tools: NHS Pension Scheme contributions attract full income tax relief, and additional voluntary contributions or personal pensions can shelter further income.",
      "For higher-earning GPs, the tapered annual allowance means pension contributions above the threshold trigger tax charges. Understanding where you sit relative to the adjusted income thresholds is critical. The taper removes £1 of the £60,000 allowance for every £2 of adjusted income above £260,000 (2026/27), so a reduction in adjusted income restores half of itself in annual allowance, down to the £10,000 floor.",
    ],
    figure: (
      <FigureCards
        caption="The levers, in the order they are usually reached for"
        numbered
        items={[
          {
            label: "Allowable expenses",
            detail:
              "Practice costs, professional subscriptions (BMA, MDU/MPS, RCGP), training courses and business mileage.",
          },
          {
            label: "NHS Pension Scheme contributions",
            detail: "They attract full income tax relief.",
          },
          {
            label: "Additional voluntary contributions or a personal pension",
            detail: "To shelter income beyond the scheme.",
          },
          {
            label: "Timing capital expenditure",
            detail: "To maximise capital allowances.",
          },
          {
            label: "Marriage allowance or spousal employment",
            detail: "Where appropriate to the household.",
          },
          {
            label: "A limited company for private work",
            detail: "Where volumes justify the administrative overhead.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Partnership Taxation",
    paragraphs: [
      "GP partnerships are transparent for tax purposes. The partnership itself does not pay tax, but each partner is taxed on their allocated share of profits. The partnership must file a partnership return (SA800) showing total income and expenses, and each partner reports their share on their personal return. Profit allocation follows the partnership agreement, which may include prior shares, seniority adjustments and different splits for different income streams.",
      "Basis period reform is the live example. GPs who accumulated overlap relief over many years under the old accounting-year basis should ensure that relief is being correctly unwound in their returns.",
    ],
    figure: (
      <FigureTable
        caption="What complicates the allocation"
        head={["Event", "Why it matters"]}
        rows={[
          [
            "A partner joins or leaves mid-year",
            "The profit share has to be split across the part-years.",
          ],
          ["Profit-sharing ratios change", "The allocation no longer matches the prior year."],
          [
            "A non-standard accounting year end",
            "The practice year end differs from the 5 April tax year.",
          ],
          [
            "Basis period reform",
            "From 2024/25 all partnerships are taxed on a tax-year basis, eliminating overlap profits going forward but requiring transitional adjustments for existing practices.",
          ],
        ]}
      />
    ),
  },
  {
    heading: "Payment on Account and the Tax Planning Calendar",
    paragraphs: [
      "Self-employed GPs make payments on account: two advance payments towards the current year's tax bill, each equal to half of the previous year's liability. These fall on 31 January and 31 July. If income has fallen significantly (for example, due to reduced sessions or a change in partnership share), GPs can apply to reduce payments on account, but must be careful, as underestimating triggers interest charges.",
    ],
    figure: (
      <FigureCards
        caption="The GP tax year, quarter by quarter"
        numbered
        items={[
          {
            label: "April to May",
            detail:
              "Review the previous tax year, gather income records and commission partnership accounts.",
          },
          {
            label: "June to September",
            detail:
              "Finalise partnership accounts, prepare superannuation certificates and draft personal returns.",
          },
          {
            label: "October to December",
            detail:
              "Submit the Self Assessment return, review current-year estimates and plan pension contributions.",
          },
          {
            label: "January",
            detail: "Pay the balancing payment and the first payment on account for the new tax year.",
          },
          {
            label: "July",
            detail: "Make the second payment on account, and consider reducing it if income has dropped.",
          },
        ]}
      />
    ),
  },
];

export default function GPTaxAccountsPillarPage() {
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
            {posts.length} {posts.length === 1 ? "guide" : "guides"} on GP tax and accounts, kept
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
