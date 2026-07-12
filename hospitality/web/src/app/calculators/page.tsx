import type { Metadata } from "next";
import Link from "next/link";
import { allTools, toolPath } from "@/lib/calculators/registry";
import { site } from "@/lib/calculators/site";

export const metadata: Metadata = {
  title: `Free Hospitality Finance Calculators | ${site.name}`,
  description:
    "Free calculators for UK hospitality businesses: tronc and tips PAYE, food and drink VAT rates, and staff cost and rota margin. Built on current HMRC and gov.uk rules.",
  alternates: { canonical: `${site.url}/calculators` },
};

export default function CalculatorsPage() {
  const tools = allTools();
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
        Hospitality finance calculators
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--ink-soft)]">
        Free tools built on current HMRC and gov.uk rules for UK hospitality businesses. Tronc,
        food VAT, and true staff costs, all kept up to date.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
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
      </div>
    </main>
  );
}
