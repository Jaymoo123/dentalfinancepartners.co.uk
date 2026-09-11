import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { Eyebrow } from "@accounting-network/web-shared/design/primitives/page-blocks";
import { siteContainerLg, btnPrimary, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { MedicalBackdrop } from "@/components/layout/MedicalBackdrop";
import { LeadForm } from "@/components/forms/LeadForm";
import { CalculatorTabs } from "@/components/tools/CalculatorTabs";
import { JsonLd } from "@/lib/schema";
import { siteConfig } from "@/config/site";
import { MEDICAL_GUIDES } from "@/lib/medical-guides-data";

// Retitled 2026-08-26. "Medical Guides" is a label nobody searches; the page
// registered zero head-family impressions in the 90d pull. The demand these
// six guides answer is expressed as the topics themselves ("NHS pension annual
// allowance", "GP partnership accounts", "IR35 for locums"), so the title now
// leads with the largest of them rather than with the section name.
export const metadata: Metadata = {
  title: "NHS Pension, GP Partnership & Locum Tax Guides for UK Doctors",
  description:
    "Six reference guides for UK doctors: NHS Pension annual allowance and the taper, GP partnership accounts, consultant private practice tax, locum limited company versus umbrella, medical expenses, and IR35 for locums.",
  alternates: {
    canonical: `${siteConfig.url}/medical-guides`,
    languages: {
      "en-GB": `${siteConfig.url}/medical-guides`,
      "x-default": `${siteConfig.url}/medical-guides`,
    },
  },
  openGraph: {
    title: "NHS Pension, GP Partnership & Locum Tax Guides for UK Doctors",
    description:
      "Six reference guides: NHS Pension annual allowance and the taper, GP partnership accounts, consultant private practice tax, locum structure, medical expenses, and IR35.",
    url: `${siteConfig.url}/medical-guides`,
    type: "website",
    images: [{ url: `/api/og?title=${encodeURIComponent("Medical Guides | NHS Pension, GP Tax & Locum Accounting")}`, width: 1200, height: 630, alt: "Medical Guides | NHS Pension, GP Tax & Locum Accounting" }],
  },
};

/**
 * The calculators that sit alongside these guides. LITERAL hrefs, and they have
 * to be: the tabs block above this list renders `<button role="tab">`, not
 * anchors, so converting the three old calculator cards to tabs without this
 * list would take the route two links below its floor. DISPOSITION_SLICE2 B.1.
 */
const GUIDE_CALCULATORS = [
  {
    href: "/calculators/nhs-pension-annual-allowance",
    name: "NHS Pension Annual Allowance Calculator",
    desc: "Tapered allowance and any charge on your pension growth, from your NHSBSA statement figures.",
  },
  {
    href: "/calculators/locum-tax-calculator",
    name: "Locum Doctor Tax Calculator",
    desc: "Net take-home and the tax bill on locum income, including student loan repayment.",
  },
  {
    href: "/calculators/private-practice-incorporation",
    name: "Private Practice Incorporation Calculator",
    desc: "Sole trader against limited company take-home on private practice income.",
  },
  {
    href: "/calculators/nhs-pension-scheme-pays",
    name: "NHS Pension Scheme Pays Calculator",
    desc: "Whether the mandatory test is met, and what a Scheme Pays election costs the pension.",
  },
  {
    href: "/calculators/gp-partner-drawings-planner",
    name: "GP Partner Drawings Planner",
    desc: "Drawings against profit share, superannuation and the tax a partner has to set aside.",
  },
];

const AUDIENCE_LINKS = [
  { href: "/for-gps", label: "GP Partners & Salaried GPs", desc: "Partnership accounts, NHS pension, GP self-assessment" },
  { href: "/for-consultants", label: "Hospital Consultants", desc: "NHS salary, private practice, medico-legal income" },
  { href: "/for-locum-doctors", label: "Locum Doctors", desc: "IR35 status, locum tax returns, Ltd vs umbrella" },
  { href: "/for-junior-doctors", label: "Junior Doctors", desc: "Locum shifts, student loans, training expenses" },
];

/** Closing-panel proof points. Mechanisms only: no fee, no turnaround, no
 *  client count, and nothing that implies an in-house team does the work. */
const MEDICAL_PROOF_POINTS = [
  { title: "Medical work only", detail: "NHS pension, practice accounts and private practice" },
  { title: "Matched to a specialist firm", detail: "Your enquiry goes to accountants who work with doctors" },
  { title: "One position, not three", detail: "Practice, pension and personal return read together" },
];

export default function MedicalGuidesPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Medical guides" }];

  /**
   * CollectionPage, net-new: this route emitted no page-level structured data
   * at all before phase 5, only the BreadcrumbList the visible Breadcrumb
   * emits. The item list is bound to MEDICAL_GUIDES, the SAME array the cards
   * below render, so the two cannot drift.
   */
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/medical-guides`,
    name: "NHS Pension, GP partnership and locum tax guides",
    description:
      "Six reference guides for UK doctors covering the NHS Pension annual allowance and the taper, GP partnership accounts, consultant private practice tax, locum company structure, medical expenses and IR35.",
    url: `${siteConfig.url}/medical-guides`,
    inLanguage: "en-GB",
    isPartOf: { "@type": "WebSite", url: siteConfig.url, name: siteConfig.name },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: MEDICAL_GUIDES.length,
      itemListElement: MEDICAL_GUIDES.map((guide, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.url}/medical-guides/${guide.slug}`,
        name: guide.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--navy)] py-16 sm:py-20">
        <MedicalBackdrop />
        <div className={`${siteContainerLg} relative z-10`}>
          <Breadcrumb variant="light" items={breadcrumbItems} />
          <div className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-[var(--copper)]/40 bg-[var(--copper)]/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--copper-light)]">
              Free medical accounting guides
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              NHS Pension, GP partnership and locum tax guides
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Six reference guides for UK doctors, each covering one area end to end rather than skimming several. The NHS Pension annual allowance and the taper. GP partnership accounts, profit allocation and notional rent. Consultant private practice tax. The locum limited company, umbrella and sole trader comparison. What medical expenses HMRC actually accepts. And IR35 for locums, including who issues the determination. Every figure is tagged to a tax year, and nothing here is generic small-business tax advice with the word doctor added.
            </p>
            <div className="mt-8">
              <Link href="#book" className={btnPrimary}>
                Ask a medical accountant about your position
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guide cards. All six kept: they are six of this route's nine body links. */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {MEDICAL_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/medical-guides/${guide.slug}`}
                className={`group flex flex-col rounded-xl bg-white p-6 ring-1 ring-slate-200 transition-all hover:ring-[var(--copper)] hover:shadow-md sm:p-8 ${focusRing}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--copper-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--copper-deep)]">
                    {guide.eyebrow}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                    <Clock className="h-3 w-3" />
                    {guide.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-bold leading-snug text-[var(--ink)] group-hover:text-[var(--navy)] sm:text-xl">
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
                  <span className="text-sm font-semibold text-[var(--copper-strong)] group-hover:underline">
                    Read guide
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators: three run here as tabs, and every one of the five keeps a
          literal crawlable href in the list beneath them. */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>Free calculators</Eyebrow>
          <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            Free calculators for UK doctors
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            Use these alongside the guides to put numbers on the position. The figure appears on the page, and the one ask before it is skippable.
          </p>
          <div className="mt-8">
            <CalculatorTabs tabs={["annualallowance", "locumtax", "incorporation"]} />
          </div>
          <ul className="mt-10 grid list-none gap-x-8 gap-y-2 pl-0 sm:grid-cols-2">
            {GUIDE_CALCULATORS.map((c) => (
              <li key={c.href} className="text-sm leading-relaxed">
                <Link
                  href={c.href}
                  className={`font-semibold text-[var(--copper-strong)] underline decoration-2 underline-offset-4 ${focusRing} rounded`}
                >
                  {c.name}
                </Link>
                <span className="ml-2 text-[var(--muted)]">{c.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Audience quick links */}
      <section className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className={siteContainerLg}>
          <Eyebrow>By role</Eyebrow>
          <h2 className="text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            Find advice for your role
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--muted)]">
            Every type of UK medical professional reads a different half of this library. Choose your role for the guidance written for it.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl bg-white p-5 ring-1 ring-slate-200 transition-all hover:ring-[var(--copper)] hover:shadow-md ${focusRing}`}
              >
                <h3 className="font-bold text-[var(--ink)]">{item.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Light ground, not navy: this is the last section before the navy
          footer, and navy never touches navy. */}
      <div id="book" className="scroll-mt-24" data-cta="guides_book" data-cta-goal="form" data-cta-placement="medical_guides">
        <LeadCTAPanel
          contained
          ground="white"
          title="Need the answer for your own position?"
          description="These guides give you the framework. Send your position and we will match you with a firm that reads NHS pension, practice accounts and private practice together."
          proofPoints={MEDICAL_PROOF_POINTS}
          footnote="No obligation. If the specialist firm thinks your position is already right, they will tell you so."
          form={<LeadForm redirectOnSuccess={false} submitLabel="Ask a medical accountant" />}
        />
      </div>
    </>
  );
}
