import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { buildOrganizationJsonLd } from "@/lib/organization-schema";

export const metadata: Metadata = {
  title: "Medical Accounting Services | GP Tax, NHS Pension Planning & Locum Tax Returns",
  description: "Specialist medical accounting services for UK doctors. GP partnership accounts, NHS pension annual allowance planning, locum tax returns, private practice incorporation, consultant tax planning, and medical expense claims. Expert GP accountants serving doctors, consultants, and practice owners nationwide.",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: "Medical Accounting Services | GP Tax & NHS Pension Planning",
    description: "Specialist medical accounting services for UK doctors. GP partnership accounts, NHS pension planning, locum tax returns, private practice incorporation, and consultant tax advice.",
    url: `${siteConfig.url}/services`,
    type: "website",
    images: [{ url: siteConfig.publisherLogoUrl, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Accounting Services | GP Tax & NHS Pension Planning",
    description: "Specialist medical accounting services for UK doctors. GP partnership accounts, NHS pension planning, locum tax returns, private practice incorporation, and consultant tax advice.",
  },
};

const sections = [
  {
    title: "GP Tax & Accounts",
    body: "Year-end accounts and tax returns tailored for GPs, whether salaried or partners. We handle NHS and private income splits, partnership profit shares, and ensure full compliance with HMRC and NHS pension reporting.",
    links: [{ href: "/blog/gp-partnership-tax-complete-guide", label: "GP partnership tax guide" }],
  },
  {
    title: "NHS Pension Planning",
    body: "Expert advice on NHS pension contributions, annual allowance issues, and lifetime allowance planning. We help you optimise your pension growth while managing tax implications effectively.",
    links: [{ href: "/blog/nhs-pension-annual-allowance-complete-guide", label: "Annual allowance guidance" }],
  },
  {
    title: "Locum Tax & Compliance",
    body: "Tax planning and Self Assessment support for locum doctors. We specialise in managing multiple income streams, claiming professional expenses correctly, and ensuring efficient tax payments across engagements.",
    links: [{ href: "/blog/locum-doctor-expenses-what-you-can-claim", label: "Locum expenses guide" }],
  },
  {
    title: "Private Practice Incorporation",
    body: "Structured advice on setting up a limited company for your private practice. We cover profit extraction, corporation tax planning, and maintaining optimal tax efficiency between personal and business finances.",
    links: [{ href: "/blog/private-practice-incorporation-complete-guide", label: "Incorporation guide" }],
  },
  {
    title: "Medical Expense Claims",
    body: "Maximising legitimate expense claims for medical professionals, including professional subscriptions, indemnity insurance, equipment, and travel. We ensure claims are robust and fully compliant with HMRC rules.",
    links: [{ href: "/blog/medical-professional-expenses-what-is-claimable", label: "Claimable expenses" }],
  },
  {
    title: "Consultant Tax Planning",
    body: "Comprehensive tax services for hospital consultants balancing NHS work, private practice, and additional roles. We coordinate multiple income sources, pension contributions, and personal tax liabilities.",
    links: [],
  },
];

export default function ServicesPage() {
  const orgSchema = buildOrganizationJsonLd();
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <div className={`${contentNarrow} ${sectionY}`}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />
        <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          Medical accounting services for UK doctors
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Specialist accounting and tax support for GPs, consultants, locums and practice owners across the UK. From essential compliance to strategic planning, our medical accounting services are designed specifically for the healthcare sector. Whether you're a GP partner navigating NHS pension complexities, a locum doctor managing multiple income streams, or a consultant considering private practice incorporation, our GP accountants provide sector-specific expertise that generalist firms simply cannot match.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
          We work exclusively with medical professionals. Every client is a GP, consultant, locum doctor, or practice owner. This concentrated focus means our accountants have deep experience with medical sector financial challenges, from NHS superannuation annual allowance calculations to locum IR35 compliance, medical expense claims, and practice partnership structures.
        </p>

        <ol className="mt-10 list-none space-y-10 pl-0 sm:mt-12 sm:space-y-12">
          {sections.map((s, i) => (
            <li key={s.title}>
              <h2 className="font-serif text-xl font-semibold leading-snug text-[var(--ink)] sm:text-2xl">
                <span className="text-[var(--accent-strong)]">{i + 1}. </span>
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{s.body}</p>
              {s.links.length > 0 ? (
                <p className="mt-4 text-sm">
                  Related:{" "}
                  {s.links.map((l, idx) => (
                    <span key={l.href}>
                      {idx > 0 ? " · " : null}
                      <Link
                        href={l.href}
                        className={`font-medium text-[var(--accent-strong)] underline ${focusRing} rounded`}
                      >
                        {l.label}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
              <p className="mt-4 text-sm">
                <Link
                  href="/contact"
                  className={`inline-flex min-h-10 items-center font-semibold text-[var(--accent-strong)] underline ${focusRing} rounded`}
                >
                  Ask about this service
                </Link>
              </p>
            </li>
          ))}
        </ol>

        {/* Where we help */}
        <section className="mt-12 sm:mt-16">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
            Where we help
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            We work with GPs, consultants, and locum doctors throughout the UK. Location pages cover local context and how to book.
          </p>
          <ul className="mt-6 grid list-none gap-3 pl-0 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.locations.map((loc) => {
              const city = loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1);
              return (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.slug}`}
                    className={`flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent-strong)] hover:shadow-sm ${focusRing}`}
                  >
                    <span className="text-sm font-semibold text-[var(--ink)]">{city}</span>
                    <span className="text-xs font-medium text-[var(--accent-strong)]">GP accountant →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Try our calculators */}
        <section className="mt-12 sm:mt-16">
          <h2 className="font-serif text-xl font-semibold text-[var(--ink)] sm:text-2xl">
            Try our free calculators
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            Instant estimates for NHS pension annual allowance, locum tax liability, and private practice incorporation savings. No email gate, no sign-up.
          </p>
          <ul className="mt-6 grid list-none gap-4 pl-0 sm:grid-cols-3">
            {[
              {
                href: "/calculators/nhs-pension-annual-allowance",
                name: "NHS Pension Annual Allowance Calculator",
                desc: "Tapered allowance and potential charge on your pension growth. 2025/26 rates.",
              },
              {
                href: "/calculators/locum-tax-calculator",
                name: "Locum Doctor Tax Calculator",
                desc: "Net take-home and tax bill for locum income. Includes student loan. 2025/26 rates.",
              },
              {
                href: "/calculators/private-practice-incorporation",
                name: "Private Practice Incorporation Calculator",
                desc: "Sole trader vs limited company take-home comparison on private practice income.",
              },
            ].map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className={`block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--accent-strong)] hover:shadow-sm ${focusRing}`}
                >
                  <h3 className="text-sm font-semibold text-[var(--ink)]">{c.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">{c.desc}</p>
                  <span className="mt-3 block text-xs font-semibold text-[var(--accent-strong)]">Open calculator →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
          <CTASection
            title="Book a short scoping call"
            description="Walk us through your professional structure: your NHS commitments, private practice, and financial goals for the year ahead."
            primaryHref="/contact"
            secondaryHref="/blog"
            secondaryLabel="Read related articles"
          />
          <CTASection
            title="Prefer to start with content?"
            description="Our articles are written for UK medical professionals: practical, sector-specific, and free of generic tax advice."
            primaryHref="/blog"
            primaryLabel="Open the blog"
            secondaryHref="/about"
            secondaryLabel="Why we specialise"
          />
        </div>
      </div>
    </>
  );
}
