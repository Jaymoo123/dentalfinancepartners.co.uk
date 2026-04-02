import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Allowable Medical Expenses for UK Doctors | Medical Accountants UK",
  description:
    "Complete guide to tax-deductible expenses for UK doctors — professional subscriptions, indemnity, equipment, travel, CPD and more.",
  alternates: { canonical: `${siteConfig.url}/blog/medical-expenses` },
  openGraph: {
    title: "Allowable Medical Expenses for UK Doctors",
    description:
      "Complete guide to tax-deductible expenses for UK doctors — professional subscriptions, indemnity, equipment, travel, CPD and more.",
    url: `${siteConfig.url}/blog/medical-expenses`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Allowable Medical Expenses for UK Doctors",
    description:
      "Complete guide to tax-deductible expenses for UK doctors — professional subscriptions, indemnity, equipment, travel, CPD and more.",
  },
};

export default function MedicalExpensesPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Medical Expenses");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Medical Expenses" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Allowable Medical Expenses for UK Doctors",
        description: metadata.description,
        url: `${siteConfig.url}/blog/medical-expenses`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className={`${contentNarrow} ${sectionY}`}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Medical Expenses" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            Allowable Expenses for UK Doctors &amp; Medical Professionals
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            Claiming every legitimate expense reduces your tax bill and ensures you are not paying
            more than you owe. Yet many doctors — particularly those juggling NHS employment with
            locum or private work — miss out on thousands of pounds of deductions each year simply
            because they are unsure what qualifies. This hub explains the main categories of
            allowable expenses for UK medical professionals and how to claim them correctly.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Professional Subscriptions and Indemnity
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Subscriptions to professional bodies approved by HMRC are fully deductible against your
              taxable income. For doctors, the most common claims include GMC registration fees,
              BMA membership, Royal College subscriptions (RCGP, RCP, RCS and others) and specialist
              society memberships relevant to your field. HMRC maintains a published list of approved
              bodies, and any subscription to an organisation on that list qualifies automatically.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Medical indemnity or defence-organisation subscriptions — such as those paid to the
              MDU, MPS or MDDUS — are also deductible where you are required to hold cover to
              practise. Since the state-backed Clinical Negligence Scheme for General Practice
              (CNSGP) now covers NHS GP work, indemnity costs have shifted, but many doctors still
              pay for private-practice cover, Good Samaritan cover or enhanced advisory services.
              These remain allowable provided the cover relates to your professional duties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Medical Equipment and Instruments
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              If you purchase medical equipment, instruments or tools that you need for your work and
              your employer does not provide them, the cost is deductible. This includes
              stethoscopes, ophthalmoscopes, diagnostic kits, surgical instruments and specialist
              software licences. Items costing up to £1,000 can usually be claimed in full in the
              year of purchase under the annual investment allowance; higher-value equipment is
              claimed through capital allowances over its useful life.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              For self-employed GPs and private practitioners, the full cost of equipping a
              consulting room — examination couches, IT hardware, clinical-waste disposal and
              consumables — is allowable against practice income. Employed doctors may claim via a
              Self Assessment tax return for items bought out of their own pocket where the expense
              is incurred &ldquo;wholly, exclusively and necessarily&rdquo; in the performance of
              their duties. Keeping receipts and a brief note of the clinical purpose strengthens
              any claim if HMRC queries it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Travel and Motor Expenses
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Travel between two workplaces — for example, driving from your NHS hospital to a
              private clinic — is an allowable business journey. Locum doctors travelling to
              temporary engagements can claim the full cost of travel, including mileage, parking,
              tolls and public transport fares. The approved HMRC mileage rate is 45p per mile for
              the first 10,000 business miles in a tax year and 25p per mile thereafter when using
              your own car.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Travel from home to a permanent workplace is commuting and is not deductible. However,
              where a locum or portfolio GP has no permanent workplace — because each engagement is a
              temporary posting — travel from home to each site can qualify. The distinction hinges
              on HMRC&apos;s &ldquo;24-month rule&rdquo; and the pattern of your working
              arrangements. Conference travel, including flights, hotels and subsistence for
              attending CPD events, is also allowable provided the primary purpose of the trip is
              professional development rather than leisure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Training, CPD and Examination Fees
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Continuing professional development is a regulatory requirement for all doctors on the
              GMC register, and the costs of meeting that requirement are tax-deductible. This covers
              course fees, conference registration, online learning-platform subscriptions and the
              purchase of medical textbooks and journals. Examination fees for postgraduate
              qualifications — such as MRCP, MRCGP or FRCS — are deductible where the qualification
              is needed to maintain or improve your existing skills rather than to enter an entirely
              new profession.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Self-employed doctors can deduct these costs directly on their tax return. Employed
              doctors claim through the employment-expenses section of Self Assessment, subject to
              the &ldquo;wholly, exclusively and necessarily&rdquo; test. Where your employer
              reimburses CPD costs, you cannot also claim tax relief — double-claiming is a common
              error flagged in HMRC compliance checks. Maintaining a CPD log that ties each expense
              to a specific learning activity makes the claim straightforward to evidence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Home Office and Administrative Costs
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Doctors who carry out administrative work from home — preparing reports, completing
              appraisal portfolios, managing practice accounts — may be able to claim a proportion of
              household costs. HMRC allows a flat-rate deduction of £6 per week (£312 per year)
              without the need for supporting evidence. Alternatively, you can calculate the actual
              proportion of household expenses (heating, lighting, broadband, insurance) attributable
              to your work use, which often yields a higher figure for those with a dedicated home
              office.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Other commonly overlooked administrative costs include accountancy fees for preparing
              your tax return, the cost of specialist tax advice, bank charges on a dedicated
              business account, professional-liability insurance and DBS check fees. Locum agencies
              sometimes deduct costs before paying you, so it is important to reconcile agency
              statements against your own records to avoid missing deductions or double-counting
              expenses already netted off your income.
            </p>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">Related Articles</h2>
              <ul className="space-y-4">
                {relatedPosts.map((p) => {
                  const readTime = calculateReadTime(p.contentHtml);
                  return (
                    <li key={p.slug}>
                      <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                        <h3 className="font-serif text-lg font-semibold text-[var(--ink)] sm:text-xl">
                          <Link
                            href={`/blog/${p.slug}`}
                            className={`hover:text-[var(--accent-strong)] transition-colors ${focusRing} rounded`}
                          >
                            {p.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                          {p.summary}
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-sm text-[var(--muted)]">
                          {p.date && (
                            <time dateTime={p.date}>
                              {new Intl.DateTimeFormat("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(new Date(p.date))}
                            </time>
                          )}
                          <span>•</span>
                          <span>{readTime} min read</span>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <div className="mt-16 border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5 p-8 sm:p-10 rounded-2xl">
            <h2 className="text-2xl font-bold text-[var(--primary)] sm:text-3xl">
              Need Expense Guidance?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Most doctors are entitled to claim far more than they realise. Our specialist medical
              accountants will review your income sources, identify every allowable deduction and
              ensure your Self Assessment return is accurate, compliant and optimised to minimise
              your tax bill.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request Expense Review" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
