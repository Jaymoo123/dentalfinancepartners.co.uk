import type { HealthCheckAnswers, Opportunity } from "./types";
import { UDA_BAND_OPTIONS } from "./questions";

function udaMidpoint(band: HealthCheckAnswers["udaBand"]): number {
  return UDA_BAND_OPTIONS.find((o) => o.value === band)?.midpoint ?? 0;
}

export function runRules(a: HealthCheckAnswers): Opportunity[] {
  const out: Opportunity[] = [];
  const uda = udaMidpoint(a.udaBand);
  const totalExtraction = (a.currentSalary || 0) + (a.currentDividend || 0);

  // ────────────────────────────────────────────────────────────────
  // STRUCTURE — principal incorporation question
  // ────────────────────────────────────────────────────────────────

  if (
    a.role === "principal" &&
    a.entity === "sole-trader" &&
    a.profitPreTax >= 80000
  ) {
    const nhsActive =
      a.nhsPensionStatus === "active-full" ||
      a.nhsPensionStatus === "active-retainer";
    out.push({
      id: "principal-incorporation-review",
      severity: nhsActive ? "medium" : "high",
      category: "structure",
      title: "Limited company structure is worth modelling at your profit level",
      detail: nhsActive
        ? "At your profit level (£80k+), a limited company can save tax through retained earnings and pension contributions. The catch for you specifically: NHS Pension accrual works on PAYE salary, not dividends. Incorporating without modelling the pension loss can wipe out the tax saving. The question is which matters more for the next 10-15 years."
        : "At your profit level, a limited company often saves 5-12% net once corporation tax, dividends and director salary are modelled together. Without NHS Pension membership, the main downside of incorporating doesn't apply to you.",
      action:
        "Book a 30-minute scoping call to model both structures with your actual numbers and the NHS Pension impact.",
      estimatedSaving: nhsActive ? "Variable — pension loss must be netted" : "5-12% of net take-home",
      reference: "/dental-guides/practice-profit-extraction-partnership-vs-ltd",
    });
  }

  if (
    a.role === "partner" &&
    a.entity === "partnership" &&
    a.profitPreTax >= 50000
  ) {
    out.push({
      id: "partnership-to-llp",
      severity: "medium",
      category: "structure",
      title: "Consider converting general partnership to LLP",
      detail:
        "A general partnership leaves each partner personally liable for the firm's debts. LLP preserves the same personal tax treatment (you keep NHS Pension on your share of profit) but caps liability. The conversion is administratively simple and worth doing.",
      action: "Get the conversion modelled and the partnership agreement reviewed.",
      reference: "/dental-guides/practice-profit-extraction-partnership-vs-ltd",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // EXTRACTION (Ltd directors)
  // ────────────────────────────────────────────────────────────────

  if (a.entity === "ltd" || a.entity === "ltd-group") {
    if (a.currentSalary === 0) {
      out.push({
        id: "salary-zero",
        severity: "medium",
        category: "extraction",
        title: "Zero director's salary leaves the personal allowance unused",
        detail:
          "Taking no salary means the £12,570 personal allowance is wasted and the company loses the corporation tax deduction on a salary expense. For NHS-active principals, no salary also means no NHS Pension accrual at all.",
        action: "Set a director salary at or near the personal allowance.",
        reference: "/dental-guides/practice-profit-extraction-partnership-vs-ltd",
      });
    } else if (a.currentSalary > 30000 && !["principal", "partner"].includes(a.role)) {
      out.push({
        id: "salary-heavy",
        severity: "medium",
        category: "extraction",
        title: "Your salary level may be inefficient for tax",
        detail:
          "Director's salary above the NI primary threshold attracts employee and employer NI on top of income tax. Most Ltd-co dental contractors set salary at the personal allowance and top up via dividends, unless NHS Pension considerations push the salary up.",
        action: "Model the optimal salary level for your specific position.",
        estimatedSaving: "£2,000-£5,000 / year typical",
      });
    }

    if (totalExtraction > 100000) {
      out.push({
        id: "pa-taper",
        severity: "medium",
        category: "extraction",
        title: "Your extraction triggers personal allowance taper",
        detail:
          "Adjusted net income above £100,000 reduces the personal allowance by £1 for every £2 over, fully tapered at £125,140. The marginal rate in this band is effectively 60%.",
        action:
          "Pension contributions or gift aid can bring adjusted net income below £100,000. One of the highest-ROI tax moves available.",
        estimatedSaving: "Up to £5,028 / year",
      });
    }

    if (a.profitPreTax >= 50000 && a.profitPreTax <= 250000) {
      out.push({
        id: "ct-marginal",
        severity: "info",
        category: "structure",
        title: "You're in the corporation tax marginal relief band",
        detail:
          "Profits between £50,000 and £250,000 attract corporation tax at an effective marginal rate of 26.5% on income above £50,000. Discretionary expenses (pension, equipment, refurb) timed into this band maximise relief.",
        action: "Time deductible spending into your highest-marginal-rate years.",
      });
    }
  }

  // ────────────────────────────────────────────────────────────────
  // NHS PENSION
  // ────────────────────────────────────────────────────────────────

  if (
    a.role === "associate" &&
    a.entity === "sole-trader" &&
    a.nhsPensionStatus === "never-joined" &&
    (a.practiceType === "nhs-only" || a.practiceType === "nhs-heavy" || a.practiceType === "mixed")
  ) {
    out.push({
      id: "nhs-pension-join",
      severity: "high",
      category: "nhs-pension",
      title: "Join the NHS Pension Scheme if you haven't already",
      detail:
        "As an NHS-active associate you're eligible to join the scheme via the practitioner pensions arrangement. The defined-benefit accrual in the 2015 section (1/54th of pensionable earnings per year, CPI+1.5% revalued) is exceptionally generous compared to commercial alternatives. Missed years can't be backfilled.",
      action: "Apply for active membership through NHS Pensions. Specialist financial advice on top-ups (Added Pension, MPAVC) helps too.",
      reference: "/dental-guides/nhs-pension-scheme-essentials-for-dentists",
    });
  }

  if (a.nhsPensionStatus === "opted-out" && a.role !== "locum" && a.practiceType !== "private-only" && a.practiceType !== "na") {
    out.push({
      id: "nhs-pension-reactivate",
      severity: "high",
      category: "nhs-pension",
      title: "Review your NHS Pension opt-out",
      detail:
        "Opting out of the NHS Pension is rarely the right answer for an NHS-active dentist. The scheme is more generous than any commercial alternative, and the value of missed accrual compounds. Reasons to opt out (lifetime allowance pressure, annual allowance breach) often have specific remedies (Scheme Pays, partial retirement) that preserve the scheme membership.",
      action: "Get the opt-out decision reviewed before continuing.",
      reference: "/dental-guides/nhs-pension-scheme-essentials-for-dentists",
    });
  }

  if (
    a.role === "principal" &&
    (a.entity === "ltd" || a.entity === "ltd-group") &&
    (a.nhsPensionStatus === "active-full" || a.nhsPensionStatus === "active-retainer")
  ) {
    out.push({
      id: "incorporated-pension-loss",
      severity: "high",
      category: "nhs-pension",
      title: "Audit your NHS Pension accrual under Ltd structure",
      detail:
        "Incorporated NHS principals accrue pension only on PAYE salary, not dividend income. If you're extracting predominantly via dividend, your pensionable earnings may be a small fraction of what they'd be in a partnership. Over 10-15 years this can mean tens of thousands less in eventual pension.",
      action:
        "Model the lifetime pension loss against the tax saving of incorporation. Some principals reach the conclusion that partnership / LLP was the better structure.",
      reference: "/dental-guides/nhs-pension-scheme-essentials-for-dentists",
    });
  }

  if (a.nhsPensionStatus === "unsure") {
    out.push({
      id: "nhs-pension-clarify",
      severity: "medium",
      category: "nhs-pension",
      title: "Clarify your NHS Pension membership status",
      detail:
        "Not knowing whether you're an active member, retainer member, or opted out is itself a planning issue. NHS Pensions issues an annual Total Reward Statement (TRS) showing your section, service and accrued benefits. Request the latest if you can't find it.",
      action: "Pull your current TRS from NHS Pensions before any structural decisions.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // IR35 / LOCUM
  // ────────────────────────────────────────────────────────────────

  if (
    a.role === "locum" &&
    (a.entity === "ltd" || a.entity === "ltd-group") &&
    a.profitPreTax < 80000
  ) {
    out.push({
      id: "locum-ltd-too-early",
      severity: "medium",
      category: "structure",
      title: "Ltd-co structure may be premature for your locum income",
      detail:
        "Below roughly £80,000 of sustained locum income, the administrative cost of a limited company often outweighs the tax saving vs sole-trader. Add NHS Pension accessibility (better as sole-trader) and IR35 complexity (the engaging practice issues the SDS, restricting Ltd-co flexibility) and many new locums are better off as sole-traders.",
      action: "Re-run the structure choice with your actual figures.",
      reference: "/services/locum-dentist-tax",
    });
  }

  if (a.role === "locum" && a.entity === "umbrella" && a.profitPreTax > 60000) {
    out.push({
      id: "locum-umbrella-cost",
      severity: "medium",
      category: "locum",
      title: "Umbrella may be costing you more than necessary",
      detail:
        "Umbrella companies are PAYE under contract of employment. Convenient and low-admin, but rarely the most tax-efficient option for sustained locum income above £60,000. Worth comparing against sole-trader and Ltd structures.",
      action: "Run the structure comparison on your actual day-rate.",
      reference: "/services/locum-dentist-tax",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // ASSOCIATE STATUS
  // ────────────────────────────────────────────────────────────────

  if (
    a.role === "associate" &&
    (a.practiceType === "nhs-only" || a.practiceType === "nhs-heavy") &&
    (a.entity === "ltd" || a.entity === "ltd-group")
  ) {
    out.push({
      id: "associate-status-risk",
      severity: "medium",
      category: "ir35",
      title: "Associate self-employment status under post-2023 rules",
      detail:
        "HMRC withdrew the historic ESM4030 concession in April 2023; associate self-employment status is now assessed on standard self-employment tests (control, substitution, mutuality of obligation, financial risk, integration). NHS-contracted associates working under a single practice with no substitution rights face heightened scrutiny. Ltd-co interposition doesn't fix the underlying status question.",
      action: "Review the associate agreement and engagement reality against the standard self-employment tests.",
      reference: "/services/associate-tax",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // GOODWILL / SALE
  // ────────────────────────────────────────────────────────────────

  if (a.goodwillPlans === "selling-within-2y") {
    const incorporated = a.entity === "ltd" || a.entity === "ltd-group";
    out.push({
      id: "badr-clock",
      severity: "high",
      category: "exit",
      title: "BADR 2-year qualifying clock — confirm it's running",
      detail: incorporated
        ? "Business Asset Disposal Relief on a share sale requires 5%+ shareholding, employee/officer status, and 2 years of qualifying ownership. If any of these aren't in place, you forfeit BADR (14% in 2025/26, 18% from 6 April 2026 onwards). On a £1m gain, that's £100,000+ of additional CGT."
        : "BADR on an asset sale of an unincorporated trade requires 2 years of qualifying ownership. The conditions need to be confirmed before the sale completes. Consider whether pre-sale incorporation via Section 162 makes a share-sale structure more attractive.",
      action:
        "Verify the BADR conditions now and plan the structure-at-sale before listing.",
      estimatedSaving: "Up to £100,000+ per £1m of gain",
      reference: "/dental-guides/goodwill-valuation-and-sale-playbook",
    });
  }

  if (a.goodwillPlans === "selling-within-2y" || a.goodwillPlans === "selling-3-5y") {
    out.push({
      id: "badr-rate-change",
      severity: "high",
      category: "exit",
      title: "BADR rate rises from 14% to 18% on 6 April 2026",
      detail:
        "If a sale can complete before 6 April 2026, the lower 14% rate applies (subject to the 2-year qualifying period and £1m lifetime limit). The 4 percentage point rate increase is £40,000 of additional CGT per £1m of gain.",
      action: "Pressure-test whether bringing the completion date forward is feasible.",
      reference: "/dental-guides/goodwill-valuation-and-sale-playbook",
    });
  }

  if (a.goodwillPlans === "buying-now") {
    out.push({
      id: "due-diligence-prep",
      severity: "high",
      category: "goodwill",
      title: "Practice acquisition due diligence is decisive",
      detail:
        "The 90 days before completion are where price gets adjusted, structure gets fixed, and post-completion problems get prevented. NHS contract risk, associate agreements, equipment age, premises position, EBITDA normalisation — these each affect the offer.",
      action: "Get specialist due diligence support before submitting an offer.",
      reference: "/dental-guides/practice-purchase-financial-due-diligence",
    });
  }

  if (a.goodwillPlans === "selling-3-5y" || a.goodwillPlans === "selling-5y-plus") {
    out.push({
      id: "presale-prep",
      severity: "medium",
      category: "exit",
      title: "Pre-sale planning should start 24 months out",
      detail:
        "BADR eligibility (2-year qualifying period), EBITDA normalisation (showing in the accounts buyers will see), Section 162 incorporation (if pre-sale incorporation is the route) — none of these can be done in the last 6 weeks. The earliest decisions matter most.",
      action:
        "Begin pre-sale planning now even if exit is 3-5 years away.",
      reference: "/dental-guides/goodwill-valuation-and-sale-playbook",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // VAT
  // ────────────────────────────────────────────────────────────────

  if (a.practiceType === "private-heavy" || a.practiceType === "private-only") {
    out.push({
      id: "vat-cosmetic-review",
      severity: "medium",
      category: "vat",
      title: "Cosmetic and non-medical dental work may attract VAT",
      detail:
        "Dental treatment supplied by a registered dental professional is generally VAT-exempt under VATA 1994 Schedule 9 Group 7. Purely cosmetic work (tooth whitening, certain aesthetic procedures) and some borderline products may be standard-rated. Above the £90,000 threshold, VAT registration may be required for the cosmetic portion.",
      action: "Get the VAT position on your private mix reviewed against the medical exemption rules.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // PENSION (Ltd directors with profit headroom)
  // ────────────────────────────────────────────────────────────────

  if (
    (a.entity === "ltd" || a.entity === "ltd-group") &&
    a.profitPreTax > 60000 &&
    a.nhsPensionStatus !== "active-full"
  ) {
    out.push({
      id: "employer-pension",
      severity: "medium",
      category: "extraction",
      title: "Employer pension contributions are the most tax-efficient extraction",
      detail:
        "Up to £60,000/year of employer pension contributions are corporation tax deductible and outside personal income tax. For a dental Ltd-co director not relying on NHS Pension as their main retirement provision, this is materially better than the equivalent net dividend.",
      action:
        "Model an employer pension contribution against your typical dividend extraction.",
      estimatedSaving: "Up to £19,500 / year per £60k contribution",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // ACCOUNTANT FIT
  // ────────────────────────────────────────────────────────────────

  if (
    a.accountantSatisfaction === "low" ||
    a.accountantSatisfaction === "switching" ||
    a.accountantSatisfaction === "no-accountant"
  ) {
    out.push({
      id: "specialist-fit",
      severity: "medium",
      category: "compliance",
      title: "A dental-specialist accountant typically pays for itself",
      detail:
        "Generalist accountants miss the niche items: UDA reconciliation, NHS Pension certificate work, IR35 status for associates, Section 162 incorporation relief, BADR planning, the goodwill amortisation rules. The fee gap to a specialist is usually smaller than the value of one missed planning point.",
      action: "Get a fee-and-scope comparison from a dental-specialist.",
    });
  }

  if (a.accountantSatisfaction === "ok") {
    out.push({
      id: "specialist-check",
      severity: "low",
      category: "compliance",
      title: "Is your current accountant a dental specialist?",
      detail:
        "An accountant who does a small number of dental clients alongside other industries is unlikely to be at the top of the curve on UDA reconciliation, NHS Pension certificate work, and current goodwill / Section 162 / BADR planning. 'Doing the books' is different from 'optimising the dental tax position'.",
      action: "Audit your last 2 years of returns against a dental specialist's review.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // MTD ITSA for sole-traders
  // ────────────────────────────────────────────────────────────────

  if (a.entity === "sole-trader") {
    if (a.profitPreTax >= 50000) {
      out.push({
        id: "mtd-itsa-2026",
        severity: "medium",
        category: "compliance",
        title: "MTD ITSA hits you from April 2026",
        detail:
          "Self-employed individuals with qualifying income above £50,000 must submit quarterly digital returns from 6 April 2026. Spreadsheet-only workflows won't be compliant.",
        action: "Move to MTD-compatible software well before the deadline.",
      });
    } else if (a.profitPreTax >= 30000) {
      out.push({
        id: "mtd-itsa-2027",
        severity: "low",
        category: "compliance",
        title: "MTD ITSA hits you from April 2027",
        detail:
          "The £30k threshold lands a year after the £50k one. Plan the software switch ahead of time; last-minute migrations under deadline are where compliance breaks.",
        action: "Pick MTD-compatible software in 2026.",
      });
    }
  }

  // ────────────────────────────────────────────────────────────────
  // High-UDA practice nuance
  // ────────────────────────────────────────────────────────────────

  if (a.role === "principal" && uda >= 7500 && a.associateCount >= 2) {
    out.push({
      id: "multi-associate-structure",
      severity: "low",
      category: "structure",
      title: "Multi-associate practice — check the structure scales",
      detail:
        "Practices with 2+ associates and 7,500+ UDAs reach the scale where Ltd-co structure (or LLP with multiple members) starts winning meaningfully on tax. The structure that worked when you were single-handed often isn't optimal once you've built a team.",
      action: "Review the structure against current scale.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Sort by severity
  // ────────────────────────────────────────────────────────────────

  const order: Record<Opportunity["severity"], number> = {
    high: 0,
    medium: 1,
    low: 2,
    info: 3,
  };
  out.sort((a, b) => order[a.severity] - order[b.severity]);

  return out;
}
