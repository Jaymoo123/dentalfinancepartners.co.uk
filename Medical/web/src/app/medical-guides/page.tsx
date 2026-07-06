import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, Users } from "lucide-react";
import { siteContainerLg, btnPrimary, focusRing, sectionY } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { MEDICAL_GUIDES } from "@/lib/medical-guides-data";

export const metadata: Metadata = {
  title: "Medical Guides | NHS Pension, GP Tax & Locum Accounting for UK Doctors",
  description:
    "Six in-depth guides for UK medical professionals: NHS pension annual allowance, GP partnership accounts, consultant private practice tax, locum structure, medical expenses, and IR35 for locums. Written by specialist medical accountants.",
  alternates: {
    canonical: `${siteConfig.url}/medical-guides`,
    languages: {
      "en-GB": `${siteConfig.url}/medical-guides`,
      "x-default": `${siteConfig.url}/medical-guides`,
    },
  },
  openGraph: {
    title: "Medical Guides | NHS Pension, GP Tax & Locum Accounting",
    description:
      "In-depth guides for UK doctors: NHS pension allowance, GP partnership accounts, consultant private practice tax, locum structure, expenses, and IR35.",
    url: `${siteConfig.url}/medical-guides`,
    type: "website",
  },
};

export default function MedicalGuidesPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Medical guides" }];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--navy)] text-white">
        <div className={`${siteContainerLg} py-14 sm:py-18`}>
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--copper)]/20 border border-[var(--copper)]/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--copper-light)]">
              <BookOpen className="h-3.5 w-3.5" />
              Free medical accounting guides
            </div>
            <h1 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Medical guides for UK doctors
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg max-w-2xl">
              Six in-depth guides written by specialist GP accountants and medical accounting professionals. NHS pension annual allowance, GP partnership accounts, consultant private practice tax, locum structure, medical expenses, and IR35. No generic tax advice: every guide is specific to the UK medical profession.
            </p>
          </div>
        </div>
      </section>

      {/* Guide cards */}
      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {MEDICAL_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/medical-guides/${guide.slug}`}
                className={`group flex flex-col rounded-3xl border border-[var(--border)] bg-white p-6 transition-all hover:border-[var(--copper)] hover:shadow-lg hover:shadow-[var(--copper-soft)] sm:p-8 ${focusRing}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--copper-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--copper-strong)]">
                    {guide.eyebrow}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                    <Clock className="h-3 w-3" />
                    {guide.readTime}
                  </span>
                </div>

                <h2 className="mt-4 font-serif text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--navy)] sm:text-xl">
                  {guide.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {guide.summary}
                </p>

                <div className="mt-5 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {guide.audience.slice(0, 2).map((a) => (
                      <span
                        key={a}
                        className="flex items-center gap-1 rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 text-[10px] font-medium text-[var(--ink-soft)]"
                      >
                        <Users className="h-2.5 w-2.5" />
                        {a}
                      </span>
                    ))}
                    {guide.audience.length > 2 && (
                      <span className="rounded-full bg-[var(--surface-elevated)] px-2 py-0.5 text-[10px] font-medium text-[var(--muted)]">
                        +{guide.audience.length - 2} more
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-[var(--copper)] group-hover:text-[var(--copper-strong)]">
                    Read guide →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator tools */}
      <section className="bg-white border-t border-[var(--border)]">
        <div className={`${siteContainerLg} py-12 sm:py-16`}>
          <div className="max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
              Free calculators for UK doctors
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Use alongside the guides to estimate your numbers. Instant results, no email required.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  href: "/calculators/nhs-pension-annual-allowance",
                  name: "NHS Pension Annual Allowance Calculator",
                  desc: "Tapered allowance and potential charge on your pension growth. 2025/26 limits.",
                },
                {
                  href: "/calculators/locum-tax-calculator",
                  name: "Locum Doctor Tax Calculator",
                  desc: "Net take-home and tax bill for locum income, including student loan repayment. 2025/26 rates.",
                },
                {
                  href: "/calculators/private-practice-incorporation",
                  name: "Private Practice Incorporation Calculator",
                  desc: "Sole trader vs limited company take-home comparison on private practice income.",
                },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={`group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--copper)] hover:shadow-md ${focusRing}`}
                >
                  <h3 className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--copper)]">{c.name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">{c.desc}</p>
                  <span className="mt-3 block text-xs font-semibold text-[var(--copper)]">Open calculator →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Audience quick links */}
      <section className="bg-[var(--surface)] border-t border-[var(--border)]">
        <div className={`${siteContainerLg} py-12 sm:py-16`}>
          <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">
            Find advice for your role
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
            Our GP accountant team works with every type of UK medical professional. Choose your role for specific guidance.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/for-gps", label: "GP Partners & Salaried GPs", desc: "Partnership accounts, NHS pension, GP self-assessment" },
              { href: "/for-consultants", label: "Hospital Consultants", desc: "NHS salary, private practice, medico-legal income" },
              { href: "/for-locum-doctors", label: "Locum Doctors", desc: "IR35 status, locum tax returns, Ltd vs umbrella" },
              { href: "/for-junior-doctors", label: "Junior Doctors", desc: "Locum shifts, student loans, training expenses" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl border border-[var(--border)] bg-white p-5 transition-all hover:border-[var(--copper)] hover:shadow-md ${focusRing}`}
              >
                <h3 className="font-semibold text-[var(--ink)]">{item.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--navy)] py-14 sm:py-18 text-center">
        <div className={siteContainerLg}>
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
              Need specialist medical accounting advice?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Our GP accountants and medical accounting specialists advise UK doctors exclusively. Free initial consultation, no obligation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className={btnPrimary}>
                Book a free consultation
              </Link>
              <Link href="/free-practice-health-check" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/70 hover:bg-white/10">
                Free practice health check
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
