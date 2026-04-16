import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Specialist Dental Accountants | Accounting for Dentists UK",
  description:
    "Specialist dental accountants for practice owners and associates. Tax planning, NHS contract accounting, VAT compliance, profit extraction. Fixed fees, free consultation.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
    languages: {
      "en-GB": `${siteConfig.url}/services`,
      "x-default": `${siteConfig.url}/services`,
    },
  },
  openGraph: {
    title: "Specialist Dental Accountants | Accounting for Dentists UK",
    description:
      "Specialist dental accountants for practice owners and associates. Tax planning, NHS contracts, VAT, profit extraction. Fixed fees.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Specialist Dental Accountants UK",
    description:
      "Specialist dental accountants for practice owners and associates. Tax planning, NHS contracts, VAT, profit extraction. Fixed fees.",
  },
};

const sections = [
  {
    title: "Dental practice accounting & reporting",
    body: "As specialist dental accountants, we prepare month-end and year-end accounts that reflect your NHS and private mix, associate costs, labs, and equipment — so you can see where profit really comes from.",
    links: [{ href: "/blog/practice-accounting/nhs-private-mix-dental-accounts", label: "NHS & private reporting" }],
  },
  {
    title: "Tax planning & compliance for dentists",
    body: "Corporation tax, Self Assessment for directors and associates, and sensible timing of decisions across tax years. Our dental accounting specialists work within UK rules — not US-style advice.",
    links: [{ href: "/blog/associate-tax/associate-dentist-tax-self-assessment-uk", label: "Associate expenses & tax" }],
  },
  {
    title: "Profit extraction & owner remuneration",
    body: "Salary, dividends, pensions, and director accounts structured with clear governance — avoiding informal drawings that create HMRC risk. A core part of our accountancy service for dental practice owners.",
    links: [{ href: "/blog/practice-finance/dental-practice-profit-extraction-uk", label: "Limited company & extraction" }],
  },
  {
    title: "Payroll, pensions, and staff costs",
    body: "Support for practice payroll, pension auto-enrolment coordination, and clean reporting where clinicians are paid through different mechanisms. Our accountants for dentists handle the complexity so you don't have to.",
    links: [],
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
        Specialist dental accountants for practices and associates
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
        We are accountants for dentists who understand NHS contracts, associate structures, and practice finances. From year-end compliance to strategic tax planning — accounting services built for the dental sector.
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
          description="Walk us through your practice structure — associates, NHS/private mix, and what you want to improve this year."
          primaryHref="/contact"
          secondaryHref="/blog"
          secondaryLabel="Read related articles"
        />
        <CTASection
          title="Prefer to start with content?"
          description="Our articles are written for UK dentists and owners — practical, sector-specific, and free of recycled US tax tropes."
          primaryHref="/blog"
          primaryLabel="Open the blog"
          secondaryHref="/about"
          secondaryLabel="Why we specialise"
        />
      </div>
    </div>
  );
}
