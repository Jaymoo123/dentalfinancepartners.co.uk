import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "NHS Pension Planning for Doctors & GPs | Medical Accountants UK",
  description:
    "Expert guidance on the NHS Pension Scheme, annual allowance, tapered relief, McCloud remedy and retirement planning for UK doctors and GPs.",
  alternates: { canonical: `${siteConfig.url}/blog/nhs-pension-planning` },
  openGraph: {
    title: "NHS Pension Planning for Doctors & GPs",
    description:
      "Expert guidance on the NHS Pension Scheme, annual allowance, tapered relief, McCloud remedy and retirement planning for UK doctors and GPs.",
    url: `${siteConfig.url}/blog/nhs-pension-planning`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NHS Pension Planning for Doctors & GPs",
    description:
      "Expert guidance on the NHS Pension Scheme, annual allowance, tapered relief, McCloud remedy and retirement planning for UK doctors and GPs.",
  },
};

export default function NHSPensionPlanningPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "NHS Pension Planning");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "NHS Pension Planning" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "NHS Pension Planning for Doctors & GPs",
        description: metadata.description,
        url: `${siteConfig.url}/blog/nhs-pension-planning`,
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
            { label: "NHS Pension Planning" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            NHS Pension Planning for Doctors &amp; GPs
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            The NHS Pension Scheme is one of the most valuable benefits available to medical
            professionals in the UK, yet it is also one of the most complex. From navigating
            multiple legacy sections to managing annual allowance charges and the McCloud remedy,
            effective pension planning can save consultants and GPs tens of thousands of pounds over
            a career. This hub brings together our expert guidance on every aspect of NHS pension
            planning.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Understanding the NHS Pension Scheme Sections
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              The NHS Pension Scheme has evolved significantly over the decades, and most doctors
              today hold benefits across multiple sections. The 1995 Section offers a final-salary
              pension with a 1/80th accrual rate and a separate tax-free lump sum. The 2008 Section,
              also final-salary, provides a 1/60th accrual rate but without the automatic lump sum.
              The 2015 Scheme moved all active members to a career-average revalued earnings (CARE)
              basis, with benefits linked to the Consumer Prices Index plus 1.5%.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Understanding which sections your benefits sit in is essential for accurate retirement
              projections. Many senior consultants and GP partners retain a mix of 1995 and 2015
              benefits, while those who joined between 2008 and 2015 may hold entitlements across all
              three sections. Each section has different normal pension ages, commutation factors and
              early-retirement reduction rates, making specialist advice critical when projecting
              retirement income.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Annual Allowance and Tapered Annual Allowance
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              The annual allowance caps the amount of tax-relieved pension savings you can build each
              year. For the 2025/26 tax year the standard annual allowance is £60,000, but
              high-earning doctors frequently trigger the tapered annual allowance, which can reduce
              this to as little as £10,000. The taper applies when adjusted income exceeds £260,000
              — a threshold many consultants and senior GPs breach once NHS pay, private practice
              earnings and employer pension contributions are combined.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Calculating the pension input amount in a defined-benefit scheme like the NHS Pension
              is notoriously complex. It is not simply the contributions you pay; rather, HMRC uses
              the growth in the capital value of your benefits over the pension input period. A pay
              rise, additional sessions, seniority increments or Clinical Excellence Awards can all
              trigger unexpectedly large pension input amounts. Proactive modelling each year —
              ideally before the tax year ends — gives you time to use carry-forward from the three
              previous years or to consider Scheme Pays if a charge cannot be avoided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              The McCloud Remedy and Its Impact
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              The McCloud remedy addressed age-discrimination in the transitional protections that
              allowed older members to remain in the 1995 or 2008 Section when the 2015 Scheme
              launched. Under the remedy, all members who were active between 1 April 2015 and
              31 March 2022 now receive whichever benefit is higher — their legacy section or 2015
              Scheme entitlement — for those years. NHS Pensions began issuing Remediable Service
              Statements in 2024 to help members compare options.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              The remedy also has significant annual allowance implications. Revised pension input
              amounts for the remedy period (2015–2022) may increase or decrease prior-year
              annual-allowance positions, potentially generating tax refunds or additional charges.
              Doctors who previously paid annual allowance charges via Scheme Pays may find their
              positions restated. Specialist accountants can model both the legacy and reformed
              options across all remedy years to help you choose the most tax-efficient outcome and
              ensure that any recalculated charges are settled correctly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Pension Tax Charges and Scheme Pays
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              When pension growth exceeds the annual allowance, the excess is added to your taxable
              income and taxed at your marginal rate — often 45% for higher-earning doctors. If the
              charge exceeds £2,000, you can elect for Mandatory Scheme Pays, asking NHS Pensions to
              settle the tax bill by reducing your future benefits. An additional Voluntary Scheme
              Pays option is available when the charge arises partly from the scheme even if the
              mandatory conditions are not fully met.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              The lifetime allowance was abolished from April 2024, but transitional protections
              remain relevant for members who previously held Fixed Protection, Enhanced Protection
              or Individual Protection. Understanding how lump-sum allowances now interact with your
              NHS benefits is important when deciding whether to commute pension for a tax-free cash
              sum at retirement. Accurate modelling should factor in the lump-sum allowance (set at
              £268,275 unless you hold a valid protection) alongside income requirements, state
              pension age and any other pension savings outside the NHS Scheme.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Retirement Planning for NHS Doctors
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Effective retirement planning starts well before your intended retirement date. Key
              decisions include choosing the optimal retirement age for each scheme section, whether
              to take early retirement with actuarial reduction, and how to phase retirement through
              partial-retirement or retire-and-return arrangements. Partial retirement, available
              since 2023, allows you to draw a proportion of your pension while continuing to work
              and accrue further benefits — an attractive option for consultants wanting to reduce
              sessions gradually.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Beyond the NHS Pension, a comprehensive plan considers state pension entitlement,
              personal pension or SIPP savings, ISA portfolios and any defined-benefit pensions from
              non-NHS roles. Cash-flow modelling across different retirement scenarios helps you see
              whether you can afford to retire at 58, 60 or 62, what income shortfall the state
              pension will fill at 67 or 68, and how to draw down savings in the most
              tax-efficient order. Our specialist team works with medical professionals at every
              career stage to build and refine these plans.
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
              Need NHS Pension Advice?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              The NHS Pension Scheme rewards careful planning — and penalises those who leave it to
              chance. Whether you are facing an annual allowance charge, weighing up the McCloud
              remedy options or mapping out your route to retirement, our specialist medical
              accountants can help you make confident, informed decisions.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request Pension Consultation" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
