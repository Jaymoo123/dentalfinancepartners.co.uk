import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Private Practice for UK Doctors & Consultants | Medical Accountants UK",
  description:
    "How to set up and grow a private medical practice in the UK — structure, VAT, insurance, financial planning and tax-efficient income strategies.",
  alternates: { canonical: `${siteConfig.url}/blog/private-practice` },
  openGraph: {
    title: "Private Practice for UK Doctors & Consultants",
    description:
      "How to set up and grow a private medical practice in the UK — structure, VAT, insurance, financial planning and tax-efficient income strategies.",
    url: `${siteConfig.url}/blog/private-practice`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Practice for UK Doctors & Consultants",
    description:
      "How to set up and grow a private medical practice in the UK — structure, VAT, insurance, financial planning and tax-efficient income strategies.",
  },
};

export default function PrivatePracticePillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Private Practice");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Private Practice" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Private Practice for UK Doctors & Consultants",
        description: metadata.description,
        url: `${siteConfig.url}/blog/private-practice`,
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
            { label: "Private Practice" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            Private Practice for UK Doctors &amp; Consultants
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            Private practice offers consultants and specialist doctors an opportunity to supplement
            NHS income, gain clinical autonomy and build long-term wealth. Yet moving from salaried
            NHS work to running your own practice introduces a new set of financial, regulatory and
            operational considerations. This hub brings together our guidance on every stage — from
            initial setup through to growth and exit planning.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Setting Up a Private Practice in the UK
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Before seeing your first private patient, several foundational steps need to be in
              place. You will need to register with the relevant private medical insurers (such as
              Bupa, AXA Health and Aviva) to appear on their practitioner directories and receive
              direct settlement of fees. Applying for practising privileges at one or more private
              hospitals gives you access to theatres, consulting rooms and diagnostic facilities.
              Each hospital has its own credentialing process, typically requiring evidence of GMC
              registration, indemnity cover, appraisal completion and specialist training.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              You must also notify HMRC that you are receiving self-employment income and register
              for Self Assessment if you are not already in the system. Opening a dedicated business
              bank account keeps practice income and expenses separate from personal finances,
              simplifying bookkeeping and tax returns. Many consultants start by practising as a sole
              trader, which is the simplest structure, and review whether a limited company would be
              more tax-efficient once fee income reaches a meaningful level.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Structuring Private Practice Income
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              How you structure your private earnings has a direct impact on your tax bill. As a sole
              trader, all practice profits are added to your other income and taxed at your marginal
              rate — often 40% or 45% for consultants with substantial NHS salaries. Operating
              through a limited company allows you to pay yourself a tax-efficient combination of
              salary and dividends, potentially reducing the overall rate to below 35% on retained
              profits.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              The decision to incorporate should weigh up several factors: the level of profit you
              intend to retain in the business, the administrative burden of running a company, the
              impact on NHS pension contributions and whether you plan to employ staff or associates.
              Consultants in group practices may prefer a partnership or LLP, which offers liability
              protection while keeping the tax position transparent. Whatever the structure, an
              annual tax-planning review ensures you are extracting income in the most efficient way
              as rates and allowances change.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              VAT Considerations for Private Practitioners
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Most medical services provided by a registered medical practitioner are exempt from VAT
              under UK law, which means you do not charge VAT on consultation fees, surgical
              procedures or diagnostic services. However, VAT exemption is not universal. Medico-
              legal reports, cosmetic procedures that are not clinically necessary, expert-witness
              fees and certain occupational-health services may be standard-rated at 20%.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              If your taxable (non-exempt) turnover exceeds the VAT registration threshold —
              currently £90,000 — you must register for VAT and charge it on those supplies. Because
              exempt income does not count towards the threshold, many doctors are surprised to find
              that only a portion of their total fees are relevant. Partial exemption rules also
              limit how much input VAT you can reclaim on costs that relate to both exempt and
              taxable activities. Getting the VAT position right from the outset avoids costly
              retrospective assessments and penalties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Insurance and Indemnity Requirements
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Adequate indemnity cover is a GMC requirement and a practical necessity. For private
              practice, you need cover that extends beyond the state-backed CNSGP scheme, which only
              applies to NHS GP work. The main medical defence organisations — MDU, MPS and MDDUS —
              offer discretionary indemnity, while commercial insurers provide occurrence-based or
              claims-made policies. The right choice depends on your specialty, procedure mix and
              risk profile.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Beyond clinical indemnity, consider public-liability insurance (if you own or lease
              premises), employers&apos; liability insurance (mandatory if you employ staff),
              cyber-insurance (increasingly important as practices hold digital patient records) and
              income-protection cover to replace earnings if illness or injury prevents you from
              working. Premiums for all insurance directly related to your practice are tax-
              deductible. Reviewing your cover annually — especially after expanding into new
              procedures or taking on associates — ensures there are no gaps.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Financial Planning and Growth Strategies
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              A private practice is a business, and sustainable growth requires financial discipline.
              Key metrics to track include fee income per session, consultation-to-procedure
              conversion rate, debtor days (how quickly insurers and self-pay patients settle
              invoices) and overhead ratio. Building a cash reserve of at least three months&apos;
              operating costs protects against the income volatility that many new practices
              experience.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Growth strategies range from expanding your insurer panel and building GP referral
              networks to investing in marketing, hiring a practice manager or bringing in associate
              consultants. Each step has financial and tax implications — employing staff triggers
              PAYE, auto-enrolment pensions and employment-law obligations, while leasing premises
              commits you to fixed costs. A long-term financial plan, reviewed annually with your
              accountant, keeps growth aligned with your personal income goals, pension strategy and
              eventual exit plan, whether that is selling the practice, winding down gradually or
              transitioning to a group model.
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
              Starting a Private Practice?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Whether you are seeing your first private patient or scaling an established practice,
              the financial decisions you make now shape your long-term success. Our specialist
              medical accountants help consultants and doctors structure, optimise and grow their
              private practices with confidence.
            </p>
            <div className="mt-8">
              <LeadForm
                redirectOnSuccess={false}
                submitLabel="Request Private Practice Consultation"
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
