import type { Metadata } from "next";
import Link from "next/link";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { getAllPosts, calculateReadTime } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "GP Accountant Services — Specialist Accounting for GPs | Medical Accountants UK",
  description:
    "Specialist GP accountant services covering tax returns, NHS pensions, practice accounts and superannuation. Why GPs need a dedicated medical accountant.",
  alternates: { canonical: `${siteConfig.url}/blog/gp-accountant-services` },
  openGraph: {
    title: "GP Accountant Services — Specialist Accounting for GPs",
    description:
      "Specialist GP accountant services covering tax returns, NHS pensions, practice accounts and superannuation.",
    url: `${siteConfig.url}/blog/gp-accountant-services`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GP Accountant Services — Specialist Accounting for GPs",
    description:
      "Specialist GP accountant services covering tax returns, NHS pensions, practice accounts and superannuation.",
  },
};

export default function GPAccountantServicesPillarPage() {
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.category === "GP Accountant Services");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
          { "@type": "ListItem", position: 3, name: "GP Accountant Services" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: "GP Accountant Services",
        description: metadata.description,
        url: `${siteConfig.url}/blog/gp-accountant-services`,
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
            { label: "GP Accountant Services" },
          ]}
        />

        <header className="border-l-4 border-[var(--primary)] bg-[var(--surface)] p-8">
          <h1 className="text-3xl font-bold leading-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
            GP Accountant Services
          </h1>
          <p className="mt-4 text-lg text-[var(--ink-soft)] leading-relaxed">
            General practitioners face unique financial challenges — from navigating NHS pension
            rules and superannuation to managing mixed income streams across partnerships, salaried
            roles and private work. A specialist GP accountant understands these complexities and
            can save you thousands each year while keeping you fully compliant with HMRC.
          </p>
        </header>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Why Use a Specialist GP Accountant?
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              GPs operate within one of the most complex tax environments in the UK. Unlike
              standard self-employed professionals, a GP&apos;s income often comes from multiple
              sources — NHS partnership profits, salaried GP earnings, locum sessions, private
              clinic fees and sometimes rental income from surgery premises. Each source has
              different reporting requirements and tax implications. A generalist accountant may
              miss sector-specific reliefs or miscalculate superannuation certificates, costing
              you money and creating compliance risk.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Specialist GP accountants work with medical professionals daily. They understand
              the GP contract, the Global Sum Allocation Formula, QOF payments and how Enhanced
              Services income is taxed. They also stay on top of annual changes to the NHS Pension
              Scheme — including the McCloud remedy, tapered annual allowance thresholds and
              retirement flexibilities introduced since the 2024 reforms. This specialist
              knowledge translates directly into accurate tax returns, optimised pension
              contributions and fewer HMRC enquiries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Core Services a GP Accountant Provides
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              A dedicated GP accountant offers a comprehensive suite of services tailored to the
              medical profession. These go far beyond filing an annual tax return and typically
              include year-round advisory support.
            </p>
            <ul className="space-y-2 text-base text-[var(--ink-soft)] ml-6 list-disc">
              <li>Self-assessment tax returns incorporating NHS schedules, private income and investment earnings</li>
              <li>Partnership accounts preparation, profit-sharing calculations and partner equity adjustments</li>
              <li>NHS superannuation certificates (Type 1 and Type 2) and annual pension estimates</li>
              <li>NHS Pension Scheme annual allowance and lifetime allowance planning</li>
              <li>Locum income management including expense claims and mileage records</li>
              <li>Practice accounts, management reporting and benchmarking against GMS/PMS averages</li>
              <li>VAT advice for dispensing practices and private services</li>
              <li>Payroll for practice staff, including auto-enrolment pension compliance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              NHS vs Private Practice Accounting
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              NHS GP income is reported differently from private practice revenue. Partnership
              profits from the NHS are calculated after deducting allowable expenses from the
              Global Sum, QOF payments and Enhanced Services income. Each partner&apos;s share is
              determined by the partnership agreement, and their superannuation certificate must
              reflect NHS pensionable pay accurately — errors here can affect retirement benefits
              decades later.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Private practice income, whether from medico-legal reports, occupational health
              contracts or aesthetic services, sits outside the NHS Pension Scheme and is subject
              to different VAT rules. Some private medical services are exempt from VAT, while
              others — particularly cosmetic and non-therapeutic treatments — are standard-rated.
              A specialist accountant ensures each income stream is categorised correctly, VAT is
              applied where required and NHS pension contributions are calculated on the right
              earnings figure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              Choosing the Right GP Accountant
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Not every accountant who advertises &quot;medical specialist&quot; services has genuine
              depth of experience. When evaluating firms, look for a demonstrated track record
              with GP practices — ask how many GP clients they handle, whether they prepare
              superannuation certificates in-house and if they attend BMA or RCGP financial
              events. Membership of the Association of Independent Specialist Medical Accountants
              (AISMA) is a strong indicator of sector expertise, as members must meet continuing
              professional development requirements specific to medical accounting.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Consider responsiveness and technology too. The best GP accountants use cloud
              accounting platforms, provide real-time dashboards for partnership drawings and offer
              proactive tax planning — not just reactive filing. Ask whether they include mid-year
              tax estimates, annual pension reviews and ad-hoc phone support within their fee, or
              whether these are billed separately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--ink)] mb-4">
              GP Accountant Fees and What to Expect
            </h2>
            <p className="text-base leading-relaxed text-[var(--ink-soft)] mb-4">
              Fees for specialist GP accounting vary depending on the complexity of your affairs.
              A salaried GP with a single NHS contract and limited private income might pay
              £600–£1,200 per year for personal tax return preparation and basic advisory support.
              GP partners typically pay more — £1,500–£3,000 per partner — because partnership
              accounts, superannuation certificates and profit-allocation work add significant
              complexity.
            </p>
            <p className="text-base leading-relaxed text-[var(--ink-soft)]">
              Full practice accounting engagements, covering partnership accounts, payroll, VAT
              and management reporting, usually range from £5,000 to £15,000 depending on
              practice size and number of partners. While these fees are higher than a high-street
              generalist, the tax savings and pension optimisation a specialist delivers routinely
              exceed the premium. Many GP accountants offer fixed-fee packages with no hidden
              extras, so you know exactly what you&apos;re paying from the outset.
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
              Need a Specialist GP Accountant?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Whether you&apos;re a salaried GP, a practice partner or running a mix of NHS and
              private work, our team specialises in medical accounting and understands the
              financial landscape GPs navigate every day. Get in touch for a free, no-obligation
              consultation and find out how a specialist accountant can simplify your finances
              and reduce your tax bill.
            </p>
            <div className="mt-8">
              <LeadForm redirectOnSuccess={false} submitLabel="Request a Free Consultation" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
