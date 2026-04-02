import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Locum Tax — Tax Guidance for Locum Doctors | Medical Accountants UK",
  description:
    "Tax guidance for locum doctors covering employment status, self-assessment, allowable expenses, record keeping and tax planning strategies across the UK.",
  alternates: { canonical: `${siteConfig.url}/blog/locum-tax` },
  openGraph: {
    title: "Locum Tax — Tax Guidance for Locum Doctors",
    description:
      "Tax guidance for locum doctors covering employment status, self-assessment, allowable expenses and tax planning.",
    url: `${siteConfig.url}/blog/locum-tax`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locum Tax — Tax Guidance for Locum Doctors",
    description:
      "Tax guidance for locum doctors covering employment status, self-assessment, allowable expenses and tax planning.",
  },
};

export default function LocumTaxPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "Locum Tax");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "Locum Tax" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "Locum Tax",
        description: metadata.description,
        url: `${siteConfig.url}/blog/locum-tax`,
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
            { label: "Locum Tax" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            Locum Tax
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            Locum doctors enjoy flexibility and variety — but the tax side of locum work can
            be complex. From determining your employment status and registering for Self
            Assessment to claiming legitimate expenses and planning for tax bills, this hub
            gives you a solid grounding in the tax essentials every locum GP and hospital
            doctor needs to understand.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Employment Status: Self-Employed vs Employed
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              The first and most important question for any locum doctor is whether HMRC considers
              you self-employed or employed. This determines how you pay tax, which expenses you
              can claim and whether you need to file a Self Assessment return. Most GP locums
              working through direct bookings with practices, controlling their own schedule and
              providing their own equipment, will be classified as self-employed. However, locums
              working through agencies or on longer-term placements where the practice controls
              how and when work is done may be deemed employed — or caught by the off-payroll
              working rules (IR35).
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Getting this wrong has serious consequences. If HMRC reclassifies a self-employed
              locum as employed, the practice (or agency) becomes liable for PAYE and employer
              NICs on all payments made, plus penalties and interest. The locum may also lose the
              right to claim business expenses. HMRC&apos;s Check Employment Status for Tax (CEST)
              tool provides an initial indication, but its results are not always reliable for
              medical locums. Where there is any doubt, take professional advice before starting
              an engagement — not after HMRC opens an enquiry.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Self-Assessment Requirements for Locums
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Self-employed locum doctors must register with HMRC for Self Assessment and Class 2
              National Insurance within three months of starting locum work. You&apos;ll then file
              an annual tax return reporting all self-employed income and expenses. The deadline
              is 31 January following the end of the tax year — for example, income earned between
              6 April 2025 and 5 April 2026 must be reported by 31 January 2027.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              If you also have PAYE income from a salaried NHS role, this must be included on the
              same return. Many locums underestimate their tax liability because they forget that
              locum earnings are added on top of salaried income, potentially pushing them into a
              higher tax band. Payments on account apply — HMRC requires two advance payments
              (31 January and 31 July), each equal to half the previous year&apos;s Self Assessment
              liability. New locums should set aside 30–40% of net locum income from day one to
              avoid a cash-flow shock when the first tax bill arrives.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Allowable Expenses for Locum Doctors
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Self-employed locums can deduct legitimate business expenses from their taxable
              income, reducing both income tax and Class 4 NICs. The key test is that the expense
              must be incurred &quot;wholly and exclusively&quot; for the purpose of the locum
              business. Common allowable expenses include:
            </p>
            <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
              <li>Travel costs to temporary workplaces — mileage (45p per mile for the first 10,000 miles, 25p thereafter), parking, train fares and accommodation for distant placements</li>
              <li>Professional indemnity (MDU, MPS or other provider) — fully deductible</li>
              <li>Professional subscriptions — GMC registration, BMA, RCGP, Royal College fees</li>
              <li>Medical equipment — stethoscopes, ophthalmoscopes, bags and clinical tools</li>
              <li>Training and CPD courses directly related to your medical practice</li>
              <li>Accountancy fees for preparing your tax return and business accounts</li>
              <li>Phone, internet and home office costs (proportionate business use)</li>
              <li>Locum agency fees and platform subscription costs</li>
            </ul>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mt-4">
              Keep receipts and records for every expense. HMRC can enquire into any return within
              12 months of the filing deadline (or longer if they suspect carelessness or fraud),
              and you will need documentary evidence to support every claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Record Keeping Best Practices
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Good record keeping is not optional — HMRC requires self-employed individuals to
              maintain records for at least five years after the 31 January filing deadline for
              the relevant tax year. For locum doctors, this means keeping systematic records of
              every session worked, every invoice raised and every expense incurred. Falling
              behind creates a stressful year-end scramble and increases the risk of under- or
              over-claiming expenses.
            </p>
            <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
              <li>Use cloud accounting software (Xero, FreeAgent or QuickBooks) to log income and expenses in real time</li>
              <li>Photograph receipts immediately — paper fades, and lost receipts cannot support expense claims</li>
              <li>Maintain a mileage log recording date, destination, purpose and miles for every business journey</li>
              <li>Reconcile bank statements monthly to catch missing invoices or uncategorised payments</li>
              <li>Keep a separate business bank account to simplify record keeping and demonstrate clear business boundaries to HMRC</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Tax Planning Strategies for Locum Doctors
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Beyond claiming expenses, locum doctors have several strategies available to manage
              their tax position. Pension contributions are one of the most effective — if you are
              not already contributing to the NHS Pension Scheme through a salaried role, making
              personal pension contributions provides income tax relief at your marginal rate.
              Even locums who are in the NHS Scheme can make additional voluntary contributions
              or pay into a SIPP to shelter more income.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Timing is also important. If you expect your income to drop next year (for example,
              taking a career break, returning to training or reducing sessions), consider
              deferring invoicing or accelerating expenses into the current year where
              commercially reasonable. For locums earning above £100,000, the personal allowance
              taper means effective marginal tax rates can reach 60% — even small reductions in
              adjusted net income through pension contributions or Gift Aid donations can restore
              thousands of pounds of personal allowance. If your annual locum turnover exceeds
              the VAT registration threshold (currently £90,000), you must register for VAT —
              though most medical services are VAT-exempt, some locum agency structures may
              require standard-rated treatment.
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
                        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{p.summary}</p>
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
              Need Locum Tax Support?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Whether you&apos;re just starting out as a locum or you&apos;ve been working
              sessions for years, our specialist medical accountants can help you stay compliant,
              claim every expense you&apos;re entitled to and plan ahead for tax bills. Get in
              touch for a free, no-obligation consultation.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request Locum Tax Consultation" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
