import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { focusRing, sectionY, sectionYLoose, siteContainerLg } from "@/components/ui/layout-utils";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbJsonLd, buildFaqPage, JsonLd } from "@/lib/schema/index";

const TITLE = "UK Solicitor Tax Rates 2026/27 (Partners, LLP Members, Locums)";
const DESCRIPTION = "Quick reference for UK 2026/27 tax rates relevant to solicitors and law firm partners. Income tax bands, NI, corporation tax, BADR, dividend tax, FA 2014, PII allowability.";

const FAQS = [
  { question: "What is the BADR rate for 2026/27?", answer: "Business Asset Disposal Relief rose to 18% on qualifying gains from 6 April 2026 (up to the £1m lifetime limit), up from 14% in 2025/26 and 10% before that. On the full £1m limit the move from 14% to 18% is £40,000 of additional CGT. For partners who planned a sale or retirement around the change, the timing mattered." },
  { question: "Are LLPs subject to corporation tax?", answer: "No. LLPs are tax-transparent for income tax — members are taxed personally on their share of profit. The LLP itself doesn't file a corporation tax return. Same treatment as a general partnership; the LLP's separate legal personality gives liability protection but doesn't create a separate tax person." },
  { question: "What's the current VAT threshold for legal services?", answer: "£90,000 of taxable turnover on a rolling 12-month basis (raised from £85,000 on 1 April 2024). Legal services including conveyancing are standard-rated at 20% — NOT exempt. Many consultant solicitors register voluntarily below the threshold to reclaim input VAT on costs." },
];

const BANDS = [
  { label: "Personal allowance", value: "£12,570", note: "Tapered above £100,000; fully removed at £125,140" },
  { label: "Basic-rate income tax", value: "20%", note: "Income £12,571–£50,270" },
  { label: "Higher-rate income tax", value: "40%", note: "Income £50,271–£125,140" },
  { label: "Additional-rate income tax", value: "45%", note: "Income above £125,140" },
  { label: "Employee NI (basic)", value: "8%", note: "Earnings £12,570–£50,270" },
  { label: "Self-employed Class 4 NI", value: "6% / 2%", note: "6% on £12,570–£50,270, 2% above. Class 2 abolished April 2024" },
  { label: "Employer NI", value: "15%", note: "Earnings above £5,000/year — raised in Autumn Budget 2024" },
  { label: "Employment Allowance", value: "£10,500", note: "Off employer NI bill; multi-employee firms qualify" },
  { label: "Corporation tax (small profits)", value: "19%", note: "Profits up to £50,000" },
  { label: "Corporation tax (main)", value: "25%", note: "Profits above £250,000" },
  { label: "Corporation tax (marginal band)", value: "Up to 26.5%", note: "Effective marginal rate on profit £50,000–£250,000" },
  { label: "Dividend allowance", value: "£500", note: "First £500 of dividends tax-free" },
  { label: "Dividend tax basic / higher / additional", value: "10.75% / 35.75% / 39.35%", note: "Above £500 allowance. Basic and higher rates rose 2 points from 6 April 2026" },
  { label: "CGT (basic / higher)", value: "18% / 24%", note: "Aligned to residential property rate from 30 Oct 2024" },
  { label: "CGT annual exempt amount", value: "£3,000", note: "" },
  { label: "BADR rate (2026/27)", value: "18%", note: "On qualifying gains up to £1m lifetime limit. Rose from 14% on 6 April 2026" },
  { label: "BADR rate (2025/26, historical)", value: "14%", note: "Previous year rate; 10% before 6 April 2025" },
  { label: "AIA (Annual Investment Allowance)", value: "£1,000,000", note: "Excludes cars, land, buildings" },
  { label: "SBA (Structures and Buildings)", value: "3% / year", note: "On post-29 October 2018 commercial premises spend" },
  { label: "VAT registration threshold", value: "£90,000", note: "Rolling 12-month basis from 1 April 2024" },
  { label: "Self-Assessment online deadline", value: "31 January", note: "Following the end of the tax year" },
  { label: "MTD ITSA threshold", value: "£50,000", note: "From 6 April 2026 (sole-trader income above £50k). Drops to £30k from April 2027, £20k from April 2028" },
];

const LEGAL_SECTOR = [
  { label: "FA 2014 Salaried Member rules", value: "Conditions A + B + C", note: "All three must be met for LLP member to be deemed employee for tax" },
  { label: "Condition A threshold", value: "≥80%", note: "Disguised salary as % of total reward" },
  { label: "Condition C threshold", value: "<25%", note: "Capital contribution as % of disguised salary" },
  { label: "SRA Accounts Rules reconciliation cap", value: "5 weeks", note: "Rule 8.3 maximum interval — NOT monthly" },
  { label: "SRA Accountant's Report deadline", value: "6 months", note: "After firm's accounting period end" },
  { label: "Rule 12.2 de minimis exemption", value: "£10,000 / £250", note: "Peak client money / average balance — both must be met" },
  { label: "PII minimum cover (unincorporated)", value: "£2m", note: "Per claim, no aggregate at this level" },
  { label: "PII minimum cover (incorporated)", value: "£3m", note: "Per claim, no aggregate at this level" },
  { label: "PII run-off cover minimum", value: "6 years", note: "Post-cessation under SRA Minimum Terms and Conditions" },
  { label: "Section 162 incorporation relief", value: "Defers CGT", note: "On goodwill when unincorporated trade transferred to a company for shares" },
  { label: "Goodwill amortisation (post-1 April 2019)", value: "6.5% / year", note: "Tax-deductible over 15-year notional period" },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/uk-solicitor-tax-rates`, languages: { "en-GB": `${siteConfig.url}/uk-solicitor-tax-rates`, "x-default": `${siteConfig.url}/uk-solicitor-tax-rates` } },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${siteConfig.url}/uk-solicitor-tax-rates`, type: "website" },
};

export default function UkSolicitorTaxRatesPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "UK Solicitor Tax Rates" }];
  const breadcrumbSchema = JSON.parse(buildBreadcrumbJsonLd(breadcrumbItems));
  const faqSchema = buildFaqPage(FAQS);
  const schemaPayload = faqSchema ? [breadcrumbSchema, faqSchema] : [breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemaPayload} />

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb items={breadcrumbItems} variant="light" />
          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Reference · UK 2026/27</p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">UK Solicitor Tax Rates 2026/27</h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">Quick reference for the rates and thresholds that matter most to UK solicitors and law firm partners. Income tax bands, NI, corporation tax, BADR, dividend tax, FA 2014 Salaried Member rules, SRA Accounts Rules thresholds, PII minimums.</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">UK 2026/27 general rates</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead className="bg-[var(--primary)] text-white">
                  <tr><th className="px-4 py-3 text-left font-semibold">Item</th><th className="px-4 py-3 text-left font-semibold">Rate / Threshold</th><th className="px-4 py-3 text-left font-semibold">Note</th></tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] bg-white">
                  {BANDS.map((b, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium text-[var(--ink)]">{b.label}</td>
                      <td className="px-4 py-3 font-semibold text-[var(--primary)]">{b.value}</td>
                      <td className="px-4 py-3 text-xs text-[var(--ink-soft)]">{b.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Legal-sector specifics</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead className="bg-[var(--primary)] text-white">
                  <tr><th className="px-4 py-3 text-left font-semibold">Item</th><th className="px-4 py-3 text-left font-semibold">Value</th><th className="px-4 py-3 text-left font-semibold">Note</th></tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] bg-white">
                  {LEGAL_SECTOR.map((b, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium text-[var(--ink)]">{b.label}</td>
                      <td className="px-4 py-3 font-semibold text-[var(--primary)]">{b.value}</td>
                      <td className="px-4 py-3 text-xs text-[var(--ink-soft)]">{b.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-[var(--border)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] sm:text-3xl">Frequently asked</h2>
            <dl className="mt-8 space-y-5">
              {FAQS.map((f) => (
                <div key={f.question} className="rounded-2xl border-l-4 border-[var(--primary)] bg-[var(--surface)] p-6">
                  <dt className="font-serif text-lg font-semibold text-[var(--ink)]">{f.question}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">Want these applied to your firm?</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">A reference page is fine for the rates themselves. The value is in how they interact across your specific position. Book a 30-minute scoping call to walk through your numbers.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/free-firm-health-check" className={`inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-white/90 ${focusRing}`}>Take the firm health check</Link>
              <Link href="/contact" className={`inline-flex min-h-12 items-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusRing}`}>Book a call</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
