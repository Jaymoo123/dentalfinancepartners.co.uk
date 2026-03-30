import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { contentNarrow, focusRing, sectionY } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Medical Accountants UK services",
  description:
    "UK medical accounting: NHS pension planning, locum tax, private practice incorporation, GP accounts, and specialist tax advice for doctors.",
  alternates: { canonical: `${siteConfig.url}/services` },
  openGraph: {
    title: "Medical Accountants UK services",
    description:
      "UK medical accounting: NHS pension planning, locum tax, private practice incorporation, GP accounts, and specialist tax advice for doctors.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

const sections = [
  {
    title: "GP tax & accounting services",
    body: "Comprehensive accounts for salaried GPs and practice partners, handling NHS income, private work, and complex partnership structures — with clear reporting that shows where your income actually comes from.",
    links: [{ href: "/blog/gp-partner-vs-salaried-tax-differences", label: "GP partner vs salaried tax" }],
  },
  {
    title: "NHS pension planning & annual allowance",
    body: "Expert guidance on NHS pension contributions, annual allowance charges, carry forward rules, and retirement planning strategies — helping you maximise your pension whilst avoiding unexpected tax bills.",
    links: [{ href: "/blog/nhs-pension-annual-allowance-guide", label: "NHS pension annual allowance" }],
  },
  {
    title: "Locum doctor tax & expenses",
    body: "Specialist tax advice for locum doctors including allowable expenses, IR35 compliance, contractor vs employee status, and efficient record keeping — structured for the realities of locum work patterns.",
    links: [{ href: "/blog/locum-doctor-tax-expenses-uk", label: "Locum tax & expenses guide" }],
  },
  {
    title: "Private practice incorporation & company structures",
    body: "Support for doctors incorporating private practice work, choosing the right company structure, and managing the transition from sole trader — with clear guidance on profit extraction and tax efficiency.",
    links: [{ href: "/blog/medical-private-practice-incorporation-uk", label: "Private practice incorporation" }],
  },
  {
    title: "Hospital consultant tax planning",
    body: "Tax planning for NHS consultants with private practice income, managing complex pay structures, merit awards, and clinical excellence awards — ensuring compliance across all income streams.",
    links: [{ href: "/blog/consultant-private-practice-tax-planning", label: "Consultant tax planning" }],
  },
  {
    title: "Medical expenses & professional costs",
    body: "Maximising allowable deductions for medical professionals including GMC fees, medical indemnity, CPD costs, equipment purchases, and travel expenses — with proper documentation and HMRC compliance.",
    links: [{ href: "/blog/medical-professional-tax-deductions-uk", label: "Medical expense claims" }],
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
        Specialist accounting and tax support for GPs, consultants, and medical practitioners — from NHS pension planning
        to private practice incorporation and locum tax compliance.
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
          description="Tell us about your medical practice structure — whether you're a GP partner, consultant, or locum — and what you need help with this year."
          primaryHref="/contact"
          secondaryHref="/blog"
          secondaryLabel="Read related articles"
        />
        <CTASection
          title="Prefer to start with content?"
          description="Our articles are written specifically for UK medical professionals — practical advice on NHS pensions, locum tax, and private practice planning."
          primaryHref="/blog"
          primaryLabel="Open the blog"
          secondaryHref="/about"
          secondaryLabel="Why we specialise"
        />
      </div>
    </div>
  );
}