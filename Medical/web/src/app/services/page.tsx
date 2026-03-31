import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Medical Accountants UK services",
  description: "Specialist accounting for UK medical professionals: GP tax, NHS pension planning, locum tax, private practice incorporation, and expense claims.",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: "Medical Accountants UK services",
    description: "Specialist accounting for UK medical professionals: GP tax, NHS pension planning, locum tax, private practice incorporation, and expense claims.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

const sections = [
  {
    title: "GP Tax & Accounts",
    body: "Year-end accounts and tax returns tailored for GPs, whether salaried or partners. We handle NHS and private income splits, partnership profit shares, and ensure full compliance with HMRC and NHS pension reporting.",
    links: [{ href: "/blog/gp-partnership-accounts-tax-uk", label: "GP partnership accounts" }],
  },
  {
    title: "NHS Pension Planning",
    body: "Expert advice on NHS pension contributions, annual allowance issues, and lifetime allowance planning. We help you optimise your pension growth while managing tax implications effectively.",
    links: [{ href: "/blog/nhs-pension-annual-allowance-advice", label: "Annual allowance guidance" }],
  },
  {
    title: "Locum Tax & Compliance",
    body: "Tax planning and Self Assessment support for locum doctors. We specialise in managing multiple income streams, claiming professional expenses correctly, and ensuring efficient tax payments across engagements.",
    links: [{ href: "/blog/locum-doctor-expenses-tax-uk", label: "Locum expenses guide" }],
  },
  {
    title: "Private Practice Incorporation",
    body: "Structured advice on setting up a limited company for your private practice. We cover profit extraction, corporation tax planning, and maintaining optimal tax efficiency between personal and business finances.",
    links: [{ href: "/blog/private-practice-incorporation-uk", label: "Incorporation pros and cons" }],
  },
  {
    title: "Medical Expense Claims",
    body: "Maximising legitimate expense claims for medical professionals, including professional subscriptions, indemnity insurance, equipment, and travel. We ensure claims are robust and fully compliant with HMRC rules.",
    links: [],
  },
  {
    title: "Consultant Tax Planning",
    body: "Comprehensive tax services for hospital consultants balancing NHS work, private practice, and additional roles. We coordinate multiple income sources, pension contributions, and personal tax liabilities.",
    links: [{ href: "/blog/consultant-tax-planning-uk", label: "Consultant tax strategies" }],
  },
];

export default function ServicesPage() {
  return (
    <div className={`${contentNarrow} ${sectionY}`}>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <h1 className="font-serif text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
        Services for UK medical professionals
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        Specialist accounting and tax support for GPs, consultants, locums and practice owners. From essential compliance to strategic planning, our services are designed specifically for the medical sector.
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

      <div className="mt-12 space-y-8 sm:mt-16 sm:space-y-10">
        <CTASection
          title="Book a short scoping call"
          description="Walk us through your professional structure — NHS commitments, private practice, and your financial goals for the year ahead."
          primaryHref="/contact"
          secondaryHref="/blog"
          secondaryLabel="Read related articles"
        />
        <CTASection
          title="Prefer to start with content?"
          description="Our articles are written for UK medical professionals — practical, sector-specific, and free of generic tax advice."
          primaryHref="/blog"
          primaryLabel="Open the blog"
          secondaryHref="/about"
          secondaryLabel="Why we specialise"
        />
      </div>
    </div>
  );
}