import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteContainerLg, sectionY, sectionYLoose, focusRing } from "@/components/ui/layout-utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd, buildWebApplication, buildFaqPage } from "@/lib/schema";
import { calculateEquityPartnerBuyIn } from "@/lib/tools/compute/equity-partner-buyin";
import { equityPartnerBuyInConfig } from "@/lib/tools/premium/configs/equity-partner-buyin";

// ── SSR worked-example data ───────────────────────────────────────────────────
// Pre-computed at build time; no client JS needed for these tables.

const example1 = calculateEquityPartnerBuyIn({
  buyInAmount:          75_000,
  loanInterestRate:     6.5,
  loanTermYears:        5,
  currentDrawings:      65_000,
  currentProfitShare:   0,
  projectedProfitShare: 8,
  firmAnnualProfit:     900_000,
  taxableIncome:        65_000,
  stagedYears:          3,
});

const example2 = calculateEquityPartnerBuyIn({
  buyInAmount:          150_000,
  loanInterestRate:     6.5,
  loanTermYears:        5,
  currentDrawings:      90_000,
  currentProfitShare:   0,
  projectedProfitShare: 12,
  firmAnnualProfit:     1_200_000,
  taxableIncome:        90_000,
  stagedYears:          4,
});

// ── Meta ──────────────────────────────────────────────────────────────────────

const PAGE_TITLE       = "Equity Partner Buy-In Modeller | Solicitors";
const PAGE_DESCRIPTION =
  "Compare personal loan (ITA 2007 s.398 interest relief), firm-facilitated loan, and staged drawings routes for a solicitor equity partner capital contribution. See monthly cost, tax relief, and payback horizon for 2026/27.";
const CANONICAL        = `${siteConfig.url}/tools/equity-partner-buy-in`;

export const metadata: Metadata = {
  title:       PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates:  { canonical: CANONICAL },
  openGraph: {
    title:       PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url:         CANONICAL,
    type:        "website",
  },
};

// ── FAQ copy ─────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "What qualifies as a qualifying loan under ITA 2007 s.398?",
    answer:
      "A loan qualifies under ITA 2007 s.398 when the money is used wholly to acquire an interest in a partnership (or to contribute or lend money to a partnership) that is carrying on a trade or profession. For solicitors, the capital contribution on equity partner admission is a classic qualifying use, provided the loan funds are applied directly to that purpose and not commingled with personal funds. Relief is given as a deduction from your total income, reducing your tax bill at your marginal rate. You claim it on your self-assessment return in the 'other tax reliefs' section.",
  },
  {
    question: "How does firm-facilitated loan interest relief work differently from ITA 2007 s.398?",
    answer:
      "When a firm on-lends to a partner (for example, deferring full capital payment and charging interest internally), the interest is deducted from the firm's profit pool before allocation rather than being relievable personally by the partner under s.398. The practical effect is that each partner shares in the cost proportionally via a reduced profit allocation. This is typically less tax-efficient for a higher-rate taxpayer than a personal qualifying loan, because the firm deduction is split across all partners rather than flowing directly to the borrowing partner's marginal rate.",
  },
  {
    question: "What is the drawings impact of the staged capital route?",
    answer:
      "Under a staged arrangement, the firm allows the incoming partner to build their capital account over several years by redirecting a portion of their drawings each year. There is no interest cost, which looks attractive on paper. However, most firms defer full equity profit-share until the capital requirement is met, so the profit-share uplift is delayed by the staging period. This pushes the payback horizon out compared with a lump-sum funded by a loan. The net comparison depends on whether the interest cost of a loan is less than the profit-share foregone during the staging period.",
  },
  {
    question: "When does HMRC give ITA 2007 s.398 relief in practice?",
    answer:
      "Relief is given on your self-assessment return for the tax year in which you pay the interest. There is no timing mismatch: you deduct the interest paid in, say, 2026/27 against your 2026/27 income, which reduces your January 2028 balancing payment and your July 2027 and January 2028 payments on account for subsequent years. HMRC does not require you to wait for a formal loan agreement, but you should be able to demonstrate that the funds were applied to the qualifying purpose. A simple completion statement from the firm and a bank transfer record is usually sufficient.",
  },
  {
    question: "What are the pros and cons of the staged drawings approach?",
    answer:
      "Advantages: no interest cost, no personal borrowing on your credit file, and no repayment obligation if you leave the firm (the capital account balance is simply returned). Disadvantages: you do not receive full equity profit-share until capital is complete, which can make the total cost higher than a loan if the firm's profits are growing. The opportunity cost of diverted drawings (cash you cannot invest or use for other purposes) is also real, even if it is invisible in a pure interest comparison. Staged arrangements also require a formal firm agreement on the capital-building schedule and the profit-share trigger date.",
  },
  {
    question: "Does the personal allowance taper affect ITA 2007 s.398 relief?",
    answer:
      "Yes. For incomes between £100,000 and £125,140, the personal allowance is tapered at £1 per £2 of income above £100,000, creating an effective marginal rate of 60% on that band. ITA 2007 s.398 relief is a deduction from total income, so interest paid in this band generates relief at the effective 60% rate. This makes a qualifying personal loan particularly valuable for senior associates and salaried partners whose income falls in the taper band. The modeller applies this rate automatically based on the taxable income you enter.",
  },
];

import { EquityPartnerCalculator } from "./EquityPartnerCalculator";

// ── Formatting helpers ────────────────────────────────────────────────────────

function gbp(n: number): string {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function yr(n: number): string {
  return n >= 99 ? "n/a" : `${n.toFixed(1)} years`;
}

// ── Worked-example table component (SSR only) ─────────────────────────────────

type ExampleRow = { label: string; value: string; strong?: boolean };

function ExampleTable({ rows }: { rows: ExampleRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={`border-b border-[var(--border)] last:border-0 ${
                r.strong ? "bg-[var(--surface-elevated)]" : "bg-white"
              }`}
            >
              <td className={`px-4 py-3 ${r.strong ? "font-semibold text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}>
                {r.label}
              </td>
              <td className={`px-4 py-3 text-right tabular-nums ${r.strong ? "font-bold text-[var(--ink)]" : "text-[var(--ink-soft)]"}`}>
                {r.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function routeLabel(r: string) {
  return { personalLoan: "Personal loan with ITA 2007 s.398 relief", firmLoan: "Firm-facilitated loan", stagedDrawings: "Staged drawings" }[r] ?? r;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EquityPartnerBuyInPage() {
  const webApp = buildWebApplication({
    name:                "Equity Partner Buy-In Modeller",
    description:         PAGE_DESCRIPTION,
    path:                "/tools/equity-partner-buy-in",
    applicationCategory: "FinanceApplication",
  });
  const faqSchema = buildFaqPage(faqs.map((f) => ({ question: f.question, answer: f.answer })));

  return (
    <>
      <JsonLd data={faqSchema ? [webApp, faqSchema] : [webApp]} />

      {/* Hero */}
      <section className="bg-[var(--primary)] text-white">
        <div className={`${siteContainerLg} ${sectionYLoose}`}>
          <Breadcrumb
            variant="light"
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/calculators" },
              { label: "Equity partner buy-in" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/90">
              Premium tool · 2026/27 rates
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              Equity partner buy-in modeller
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
              Compare three funding routes for your capital contribution, calculate the tax relief available under ITA 2007 s.398 on qualifying loan interest, and see your payback horizon against the profit-share uplift.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)]">
        <div className={`${siteContainerLg} ${sectionY}`}>
          <div className="mx-auto max-w-4xl space-y-16">

            {/* Intro */}
            <div className="prose prose-slate max-w-none">
              <p>
                Becoming an equity partner in a law firm typically requires placing a capital contribution into the partnership. The contribution sits in your capital account, earns a return through your profit-share allocation, and is returned (in most firms) when you leave. What varies considerably is how you fund the contribution in the first place, and the tax treatment of each route.
              </p>
              <p>
                The three main routes are a personal loan, a firm-facilitated arrangement and a staged build from drawings. A personal loan has one significant tax advantage: interest paid on a loan taken out to acquire an interest in a qualifying partnership is relievable against income tax under ITA 2007 s.398. For a higher-rate taxpayer, that relief reduces the effective cost of the interest by 40 pence in every pound. For someone in the personal allowance taper band (income between £100,000 and £125,140), the effective rate is 60%.
              </p>
              <p>
                The modeller below compares all three routes side by side for your specific figures. The worked examples further down show how the numbers play out in two common scenarios: a mid-size firm requiring £75,000 and a regional firm requiring £150,000.
              </p>
            </div>

            {/* Interactive premium calculator */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-block rounded bg-[var(--primary)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                  Free interactive tool
                </span>
              </div>
              <EquityPartnerCalculator />
            </div>

            {/* SSR worked examples */}
            <section aria-labelledby="worked-examples-heading">
              <h2
                id="worked-examples-heading"
                className="font-serif text-2xl font-semibold text-[var(--ink)]"
              >
                Worked examples
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                The two examples below are computed from the same model as the calculator above. They illustrate how the choice of funding route changes materially depending on the buy-in amount and the borrower's marginal tax rate.
              </p>

              {/* Example 1 */}
              <div className="mt-8 rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                  Example 1
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--ink)]">
                  Mid-size firm, £75,000 buy-in, higher-rate taxpayer
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  A senior associate on £65,000 taxable income joins as an equity partner in a firm with a £900,000 profit pool. The firm requires a £75,000 capital contribution. They hold 8% profit share after admission.
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Personal loan (ITA 2007 s.398)
                    </p>
                    <ExampleTable
                      rows={[
                        { label: "Monthly repayment",        value: gbp(example1.fundingRoutes.personalLoan.monthlyRepayment) },
                        { label: "Year-1 interest",          value: gbp(Math.round(75000 * 0.065)) },
                        { label: "s.398 relief at 40%",      value: gbp(example1.fundingRoutes.personalLoan.qualifyingLoanInterestRelief), strong: true },
                        { label: "Monthly net cost",         value: gbp(example1.fundingRoutes.personalLoan.monthlyNetCostAfterRelief), strong: true },
                        { label: "Payback",                  value: yr(example1.fundingRoutes.personalLoan.paybackHorizonYears) },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Firm-facilitated loan
                    </p>
                    <ExampleTable
                      rows={[
                        { label: "Monthly repayment",        value: gbp(example1.fundingRoutes.firmLoan.monthlyRepayment) },
                        { label: "s.398 relief",             value: "Nil (firm deducts)" },
                        { label: "Effective monthly cost",   value: gbp(example1.fundingRoutes.firmLoan.monthlyNetCostAfterRelief), strong: true },
                        { label: "Payback",                  value: yr(example1.fundingRoutes.firmLoan.paybackHorizonYears) },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Staged drawings (3 years)
                    </p>
                    <ExampleTable
                      rows={[
                        { label: "Annual drawings diverted", value: gbp(example1.fundingRoutes.stagedDrawings.annualDrawingsReduction), strong: true },
                        { label: "Interest cost",            value: "Nil" },
                        { label: "Payback from full capital",value: yr(example1.fundingRoutes.stagedDrawings.paybackHorizonYears) },
                      ]}
                    />
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-[var(--surface-elevated)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    Annual profit-share uplift: {gbp(example1.profitShareUplift)}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    Best route: {routeLabel(example1.bestRoute)}
                  </p>
                </div>
              </div>

              {/* Example 2 */}
              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                  Example 2
                </p>
                <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--ink)]">
                  Regional firm, £150,000 buy-in, staged drawings route
                </h3>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  A senior associate on £90,000 taxable income joins a regional firm with a £1,200,000 profit pool, requiring a £150,000 capital contribution at 12% profit share. The associate prefers to avoid personal borrowing and instead stages the capital over four years from drawings.
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Personal loan (ITA 2007 s.398)
                    </p>
                    <ExampleTable
                      rows={[
                        { label: "Monthly repayment",        value: gbp(example2.fundingRoutes.personalLoan.monthlyRepayment) },
                        { label: "Year-1 interest",          value: gbp(Math.round(150000 * 0.065)) },
                        { label: "s.398 relief at 40%",      value: gbp(example2.fundingRoutes.personalLoan.qualifyingLoanInterestRelief), strong: true },
                        { label: "Monthly net cost",         value: gbp(example2.fundingRoutes.personalLoan.monthlyNetCostAfterRelief), strong: true },
                        { label: "Payback",                  value: yr(example2.fundingRoutes.personalLoan.paybackHorizonYears) },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Firm-facilitated loan
                    </p>
                    <ExampleTable
                      rows={[
                        { label: "Monthly repayment",        value: gbp(example2.fundingRoutes.firmLoan.monthlyRepayment) },
                        { label: "s.398 relief",             value: "Nil (firm deducts)" },
                        { label: "Effective monthly cost",   value: gbp(example2.fundingRoutes.firmLoan.monthlyNetCostAfterRelief), strong: true },
                        { label: "Payback",                  value: yr(example2.fundingRoutes.firmLoan.paybackHorizonYears) },
                      ]}
                    />
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
                      Staged drawings (4 years)
                    </p>
                    <ExampleTable
                      rows={[
                        { label: "Annual drawings diverted", value: gbp(example2.fundingRoutes.stagedDrawings.annualDrawingsReduction), strong: true },
                        { label: "Interest cost",            value: "Nil" },
                        { label: "Payback from full capital",value: yr(example2.fundingRoutes.stagedDrawings.paybackHorizonYears) },
                      ]}
                    />
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-[var(--surface-elevated)] p-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    Annual profit-share uplift: {gbp(example2.profitShareUplift)}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    Best route (by model): {routeLabel(example2.bestRoute)}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    Note: the staged route avoids interest but delays full profit-share for four years, making the personal loan numerically preferable for a higher-rate taxpayer on this buy-in size.
                  </p>
                </div>
              </div>
            </section>

            {/* Methodology */}
            <section aria-labelledby="methodology-heading">
              <h2
                id="methodology-heading"
                className="font-serif text-2xl font-semibold text-[var(--ink)]"
              >
                Methodology
              </h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-[var(--ink-soft)]">
                {equityPartnerBuyInConfig.explainer.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p>
                  The recommendation score weights net monthly cost (60%) and payback horizon (40%) against the other two routes, normalised to 100. It is a directional comparison only: the optimal route for any individual depends on firm structure, existing debt, personal allowance position, pension contributions, and the firm's willingness to offer a facilitated arrangement.
                </p>
                <p>
                  Rates used: income tax 2026/27 (personal allowance £12,570, basic rate 20% to £50,270, higher rate 40% to £125,140, additional rate 45% above £125,140; PA taper at £100,000). Loan amortisation uses the standard annuity formula. First-year interest approximated as principal multiplied by the annual rate (conservative; overstates relief in early years of an amortising loan).
                </p>
              </div>
            </section>

            {/* FAQs */}
            <section aria-labelledby="faq-heading">
              <h2
                id="faq-heading"
                className="font-serif text-2xl font-semibold text-[var(--ink)]"
              >
                Frequently asked questions
              </h2>
              <dl className="mt-6 space-y-4">
                {faqs.map((f) => (
                  <div
                    key={f.question}
                    className="rounded-2xl border border-[var(--border)] bg-white p-6"
                  >
                    <dt className="font-serif text-lg font-semibold text-[var(--ink)]">
                      {f.question}
                    </dt>
                    <dd className="mt-3 text-base leading-relaxed text-[var(--ink-soft)]">
                      {f.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* CTA */}
            <div className="rounded-2xl bg-[var(--primary)] p-8 text-white sm:p-10">
              <h2 className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                Want a specialist to review your buy-in structure?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
                The right funding route depends on your specific marginal rate, the firm's partnership deed, and whether ITA 2007 s.398 qualifying conditions are met in your case. We model the full picture as part of our partner tax planning work, with no obligation.
              </p>
              <Link
                href="/contact"
                className={`mt-6 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-white px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-[var(--primary)] ${focusRing}`}
                data-cta="equity-partner-buyin-page-cta"
                data-cta-goal="form"
                data-cta-placement="tool-page"
              >
                Book a free consultation
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
