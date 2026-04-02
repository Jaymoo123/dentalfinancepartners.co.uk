import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "GP Practice Management — Financial Guidance for Practices | Medical Accountants UK",
  description:
    "Financial management guidance for GP practices covering partnership structures, payroll, mergers, CQC compliance and practice budgeting across the UK.",
  alternates: { canonical: `${siteConfig.url}/blog/gp-practice-management` },
  openGraph: {
    title: "GP Practice Management — Financial Guidance for Practices",
    description:
      "Financial management guidance for GP practices covering partnership structures, payroll, mergers and compliance.",
    url: `${siteConfig.url}/blog/gp-practice-management`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GP Practice Management — Financial Guidance for Practices",
    description:
      "Financial management guidance for GP practices covering partnership structures, payroll, mergers and compliance.",
  },
};

export default function GPPracticeManagementPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "GP Practice Management");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "GP Practice Management" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "GP Practice Management",
        description: metadata.description,
        url: `${siteConfig.url}/blog/gp-practice-management`,
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
            { label: "GP Practice Management" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            GP Practice Management
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            Running a GP practice demands far more than clinical excellence. Partners must manage
            budgets, staffing, regulatory compliance and strategic planning — all while delivering
            patient care. This hub covers the financial and operational essentials every GP
            practice needs to stay viable, compliant and well-positioned for the future.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Partnership Structures and Agreements
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Most GP practices in England operate as partnerships, whether traditional unlimited
              partnerships or, increasingly, limited liability partnerships (LLPs). The
              partnership agreement is the single most important document governing how the
              practice runs financially — it dictates profit shares, capital contributions,
              decision-making authority, maternity and sickness cover arrangements and the
              process for admitting or retiring partners.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              A poorly drafted agreement can lead to costly disputes when circumstances change.
              Key areas to address include how goodwill is valued (or whether it&apos;s recognised
              at all), how property ownership interacts with the partnership, prior shares
              arrangements for senior partners and what happens if a partner is suspended by the
              GMC or NHS England. Agreements should be reviewed every three to five years and
              whenever there is a change in the partnership to ensure they reflect current
              circumstances and tax legislation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Financial Management for GP Practices
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Effective financial management starts with understanding where practice income comes
              from and how it is allocated. The core funding streams — Global Sum, QOF, Enhanced
              Services and PCN Additional Roles Reimbursement — each have different reporting
              requirements and cost-recovery mechanisms. Partners need regular management accounts,
              ideally quarterly, to track profitability against budget and identify variances
              before they become problems.
            </p>
            <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
              <li>Cash flow forecasting to manage seasonal fluctuations in NHS payments and avoid overdraft reliance</li>
              <li>Partner drawings policies that balance personal income needs with practice cash reserves</li>
              <li>Capital expenditure planning for premises improvements, IT upgrades and diagnostic equipment</li>
              <li>Benchmarking practice costs per patient against AISMA and NHS England averages</li>
              <li>Reserves policy to cover unexpected costs such as staff absence, equipment failure or regulatory fines</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Staff Payroll and Employment Obligations
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              GP practices are significant employers — a typical four-partner practice may employ
              15–30 staff across reception, administration, nursing and healthcare assistant roles.
              Payroll is often the largest single expense after partner drawings, and getting it
              wrong carries serious penalties. Practices must operate PAYE in real time, comply
              with the National Minimum Wage and National Living Wage, manage statutory sick pay,
              maternity pay and paternity pay, and administer workplace pension auto-enrolment.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              The NHS Pension Scheme adds another layer of complexity for eligible practice staff.
              Employer contributions to the NHS Scheme are higher than most private workplace
              pensions, and practices must submit accurate monthly and annual returns to the NHS
              Business Services Authority. With the introduction of PCN-employed staff and the
              Additional Roles Reimbursement Scheme, practices also need to understand how
              reimbursement claims interact with payroll costs and ensure they are recovering
              the full amounts they are entitled to.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Practice Mergers and Structural Changes
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Practice mergers have become increasingly common as smaller practices face financial
              and workforce pressures. Merging can deliver economies of scale, strengthen
              negotiating power with ICBs and improve resilience against partner retirements.
              However, mergers also introduce significant financial complexity — different
              profit-sharing models, property ownership structures, staff terms and conditions
              and IT systems all need harmonising.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Before committing to a merger, practices should undertake thorough financial due
              diligence. This includes comparing income per weighted patient, understanding each
              practice&apos;s property arrangements (owned vs leased, with or without notional
              rent), reviewing staff contracts for TUPE implications and modelling the combined
              partnership&apos;s tax position. Post-merger integration planning is equally
              important — rushed mergers that fail to align cultures and systems often unravel
              within two to three years, leaving partners worse off than before.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Regulatory and CQC Financial Compliance
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Every GP practice registered with the Care Quality Commission must demonstrate
              that it is well-led, which includes sound financial governance. CQC inspectors
              increasingly look at whether practices have adequate financial controls, clear
              governance structures and contingency plans for financial sustainability. A
              practice rated &quot;inadequate&quot; on the well-led domain may face conditions on
              its registration or, in extreme cases, closure.
            </p>
            <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
              <li>Documented financial policies covering authorisation limits, expenditure approval and fraud prevention</li>
              <li>Regular financial reporting to the partnership with minutes recording decisions</li>
              <li>Segregation of duties for banking, invoicing and payroll to reduce fraud risk</li>
              <li>Annual accounts prepared and reviewed within six months of the financial year end</li>
              <li>Business continuity plans addressing financial resilience, including insurance cover and key-person dependencies</li>
            </ul>
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
              Need Practice Management Support?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              From partnership restructuring and merger due diligence to payroll management and
              CQC compliance, our team supports GP practices across the UK with specialist
              financial guidance. Get in touch for a free consultation and discover how we can
              strengthen your practice&apos;s financial foundations.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request Practice Consultation" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
