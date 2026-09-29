import type { Metadata } from "next";
import Link from "next/link";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";
import { Breadcrumb } from "@accounting-network/web-shared/design/primitives/Breadcrumb";
import { ScrollGlowGroup } from "@accounting-network/web-shared/design/marketing/ScrollGlowGroup";
import { LeadCTAPanel } from "@accounting-network/web-shared/design/marketing/LeadCTAPanel";
import { LeadForm } from "@/components/forms/LeadForm";
import HospitalityBackdrop from "@/components/layout/HospitalityBackdrop";

export const metadata: Metadata = {
  title: `Free Hospitality Finance Calculators`,
  description:
    "Free calculators for UK hospitality businesses: tronc and tips PAYE, food and drink VAT rates, and staff cost and rota margin. Built on current HMRC and gov.uk rules.",
  alternates: { canonical: `${site.url}/calculators` },
};

export default function CalculatorsPage() {
  const tools = allTools();
  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* kit Breadcrumb (adopted): the index emitted no BreadcrumbList
            before this. tone="default" because this page has no brand-ground
            hero to sit on. */}
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} siteUrl={site.url} />
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
          Hospitality finance calculators
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--ink-soft)]">
          Free tools built on current HMRC and gov.uk rules for UK hospitality businesses. Tronc,
          food VAT, and true staff costs, all kept up to date.
        </p>
        {/* kit Eyebrow (declined here): the page publishes no category label
            above the h1 to feed one, and locked rule 4 forbids authoring a new
            one. */}
        <ScrollGlowGroup className="mt-10 grid gap-6 sm:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={toolPath(t.slug)}
              className="block rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                {t.category}
              </div>
              <h2 className="mt-2 text-xl font-bold text-[var(--ink)]">{t.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t.oneLiner}</p>
            </Link>
          ))}
        </ScrollGlowGroup>
      </div>

      {/* kit LeadCTAPanel (adopted): the index rendered zero forms before
          this (brief A6 / locked rule 6). eyebrow/formTitle empty per locked
          rule 16. title/description are this page's own h1 and standfirst
          text, unchanged, fed to the kit rather than rewritten (locked rule 4). */}
      <LeadCTAPanel
        eyebrow=""
        title="Hospitality finance calculators"
        description="Free tools built on current HMRC and gov.uk rules for UK hospitality businesses. Tronc, food VAT, and true staff costs, all kept up to date."
        proofPoints={[]}
        formTitle=""
        form={<LeadForm submitLabel="Request callback" />}
        backdrop={<HospitalityBackdrop patternId="hospitality-table-setting-calculators-cta" />}
      />
    </>
  );
}
