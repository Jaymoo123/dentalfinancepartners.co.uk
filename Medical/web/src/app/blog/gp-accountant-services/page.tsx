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

const CATEGORY_NAME = "GP Accountant Services";
const CATEGORY_SLUG = "gp-accountant-services";

export const metadata: Metadata = {
  title: "GP Accountant Services: Specialist Accounting for GPs",
  description:
    "Specialist GP accountant services covering tax returns, NHS pensions, practice accounts and superannuation. Why GPs need a dedicated medical accountant.",
  alternates: { canonical: `${siteConfig.url}/blog/${CATEGORY_SLUG}` },
  openGraph: {
    title: "GP Accountant Services: Specialist Accounting for GPs",
    description:
      "Specialist GP accountant services covering tax returns, NHS pensions, practice accounts and superannuation.",
    url: `${siteConfig.url}/blog/${CATEGORY_SLUG}`,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("GP Accountant Services: Specialist Accounting for GPs")}`, width: 1200, height: 630, alt: "GP Accountant Services: Specialist Accounting for GPs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GP Accountant Services: Specialist Accounting for GPs",
    description:
      "Specialist GP accountant services covering tax returns, NHS pensions, practice accounts and superannuation.",
  },
};

const INTRO =
  "General practitioners face unique financial challenges, from navigating NHS pension rules and superannuation to managing mixed income streams across partnerships, salaried roles and private work. A specialist GP accountant works with those structures every day, which is the difference between a return that is merely filed and one that is right.";

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
    heading: "Why Use a Specialist GP Accountant?",
    paragraphs: [
      "GPs operate within one of the most complex tax environments in the UK. Unlike standard self-employed professionals, a GP's income often comes from multiple sources: NHS partnership profits, salaried GP earnings, locum sessions, private clinic fees and sometimes rental income from surgery premises. Each source has different reporting requirements and tax implications. A generalist accountant may miss sector-specific reliefs or miscalculate superannuation certificates, costing you money and creating compliance risk.",
      "Specialist GP accountants work with medical professionals daily. They understand the GP contract, the Global Sum Allocation Formula, QOF payments and how Enhanced Services income is taxed. They also stay on top of annual changes to the NHS Pension Scheme, including the McCloud remedy, tapered annual allowance thresholds and retirement flexibilities introduced since the 2024 reforms. This specialist knowledge translates directly into accurate tax returns, optimised pension contributions and fewer HMRC enquiries.",
    ],
    figure: (
      <FigureCards
        caption="The income sources a GP return has to separate"
        items={[
          { label: "NHS partnership profits", detail: "The partner's share of practice profits." },
          { label: "Salaried GP earnings", detail: "Paid and taxed through the practice payroll." },
          { label: "Locum sessions", detail: "Worked outside the partner or salaried role." },
          { label: "Private clinic fees", detail: "Income from work outside the NHS contract." },
          {
            label: "Rental income from surgery premises",
            detail: "Where a GP holds an interest in the property.",
          },
        ]}
      />
    ),
  },
  {
    heading: "Core Services a GP Accountant Provides",
    paragraphs: [
      "A dedicated GP accountant offers a comprehensive suite of services tailored to the medical profession. These go far beyond filing an annual tax return and typically include year-round advisory support.",
    ],
    figure: (
      <FigureCards
        caption="What the work usually covers"
        items={[
          {
            label: "Self-assessment tax returns",
            detail: "Incorporating NHS schedules, private income and investment earnings.",
          },
          {
            label: "Partnership accounts",
            detail: "Preparation, profit-sharing calculations and partner equity adjustments.",
          },
          {
            label: "NHS superannuation certificates",
            detail: "Type 1 and Type 2, plus annual pension estimates.",
          },
          {
            label: "Annual and lifetime allowance planning",
            detail: "For members of the NHS Pension Scheme.",
          },
          {
            label: "Locum income management",
            detail: "Including expense claims and mileage records.",
          },
          {
            label: "Practice accounts and reporting",
            detail: "Management reporting and benchmarking against GMS and PMS averages.",
          },
          {
            label: "VAT advice",
            detail: "For dispensing practices and private services.",
          },
          {
            label: "Payroll for practice staff",
            detail: "Including auto-enrolment pension compliance.",
          },
        ]}
      />
    ),
  },
  {
    heading: "NHS vs Private Practice Accounting",
    paragraphs: [
      "NHS GP income is reported differently from private practice revenue. Partnership profits from the NHS are calculated after deducting allowable expenses from the Global Sum, QOF payments and Enhanced Services income. Each partner's share is determined by the partnership agreement, and their superannuation certificate must reflect NHS pensionable pay accurately. Errors here can affect retirement benefits decades later.",
      "Private practice income, whether from medico-legal reports, occupational health contracts or aesthetic services, sits outside the NHS Pension Scheme and is subject to different VAT rules. Some private medical services are exempt from VAT, while others (particularly cosmetic and non-therapeutic treatments) are standard-rated. A specialist accountant ensures each income stream is categorised correctly, VAT is applied where required and NHS pension contributions are calculated on the right earnings figure.",
    ],
    figure: (
      <FigureTable
        caption="Where the two treatments diverge"
        head={["Question", "How the two sides differ"]}
        rows={[
          [
            "How profit is arrived at",
            "NHS partnership profits are calculated after deducting allowable expenses from the Global Sum, QOF payments and Enhanced Services income.",
          ],
          [
            "How each share is set",
            "By the partnership agreement, with the superannuation certificate reflecting NHS pensionable pay.",
          ],
          [
            "Pension",
            "Private practice income sits outside the NHS Pension Scheme, so it does not build NHS benefits.",
          ],
          [
            "VAT",
            "Some private medical services are exempt, while cosmetic and non-therapeutic treatments are standard-rated.",
          ],
        ]}
      />
    ),
  },
  {
    heading: "Choosing the Right GP Accountant",
    paragraphs: [
      "Not every accountant who advertises \"medical specialist\" services has genuine depth of experience. When evaluating firms, look for a demonstrated track record with GP practices. Ask how many GP clients they handle, whether they prepare superannuation certificates in-house and if they attend BMA or RCGP financial events. Membership of the Association of Independent Specialist Medical Accountants (AISMA) is a strong indicator of sector expertise, as members must meet continuing professional development requirements specific to medical accounting.",
      "Consider responsiveness and technology too. The best GP accountants use cloud accounting platforms, provide real-time dashboards for partnership drawings and offer proactive tax planning, not just reactive filing. Ask whether they include mid-year tax estimates, annual pension reviews and ad-hoc phone support within their fee, or whether these are billed separately.",
    ],
    figure: (
      <FigureCards
        caption="Questions to put to a firm"
        numbered
        items={[
          { label: "Track record", detail: "How many GP practices do they work with?" },
          {
            label: "Superannuation certificates",
            detail: "Are Type 1 and Type 2 certificates prepared in-house?",
          },
          { label: "Sector presence", detail: "Do they attend BMA or RCGP financial events?" },
          {
            label: "AISMA membership",
            detail:
              "Members must meet continuing professional development requirements specific to medical accounting.",
          },
          {
            label: "Technology",
            detail: "Cloud accounting platforms and real-time dashboards for partnership drawings.",
          },
          {
            label: "What sits inside the engagement",
            detail:
              "Mid-year tax estimates, annual pension reviews and ad-hoc phone support, or billed separately?",
          },
        ]}
      />
    ),
  },
  {
    /* The published fee schedule that used to sit here is gone, with the
       comparative claim that went with it: three price bands for the service
       this site sells, plus "the tax savings a specialist delivers routinely
       exceed the premium", which is an outcome claim nobody can test. Live
       defect 5 in docs/medical/_port/LIVE_DEFECTS.md, ruling taken 2026-09-11:
       cut the fees, keep the framing that explains what drives the scope. What
       a firm charges is a conversation with that firm. */
    heading: "What Drives the Scope of a GP Accounting Engagement",
    paragraphs: [
      "What a specialist engagement costs depends on how complicated the affairs are, and the complexity sits in the structure rather than in the hours. A salaried GP with a single NHS contract and limited private income needs a personal tax return and advisory support. A partner needs partnership accounts, superannuation certificates and profit-allocation work on top of that, and each of those moves when a partner joins or leaves.",
      "A whole-practice engagement is a different piece of work again, covering partnership accounts, payroll, VAT and management reporting, and it scales with practice size and the number of partners. Ask any firm to quote against that scope rather than against a headline number, and ask which of the recurring items sit inside the fee.",
    ],
    figure: (
      <FigureTable
        caption="What drives the complexity, and therefore the scope"
        head={["Position", "What the work has to cover"]}
        rows={[
          [
            "Salaried GP",
            "A single NHS contract and limited private income: personal tax return preparation and basic advisory support.",
          ],
          [
            "GP partner",
            "Partnership accounts, superannuation certificates and profit-allocation work.",
          ],
          [
            "Whole practice",
            "Partnership accounts, payroll, VAT and management reporting, scaled by practice size and number of partners.",
          ],
        ]}
      />
    ),
  },
];

export default function GPAccountantServicesPillarPage() {
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
            {posts.length} {posts.length === 1 ? "guide" : "guides"} on specialist GP accounting,
            kept current.
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
