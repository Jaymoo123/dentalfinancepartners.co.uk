import type {
  HealthCheckAnswers,
  Opportunity,
  AgencyType,
} from "./types";
import { REVENUE_BAND_OPTIONS } from "./questions";

/**
 * Rules engine, maps a HealthCheckAnswers shape to a prioritised list of
 * Opportunity records. Each rule is small, isolated, and either emits an
 * Opportunity or not.
 *
 * Severity ordering for the PDF summary:
 *   high → impactful + likely actionable inside 12 months
 *   medium → notable but situational
 *   low → small efficiency tweak
 *   info → educational, no action implied
 *
 * Rules should be defensive about missing/zero values, the wizard collects
 * everything but rules engine runs against potentially partial data too
 * (e.g. quick-mode in the future).
 */

const RD_HEAVY_TYPES: AgencyType[] = [
  "ai",
  "saas",
  "digital",
  "performance-marketing",
  "seo",
  "ppc",
];

function revenueMidpoint(band: HealthCheckAnswers["revenueBand"]): number {
  return REVENUE_BAND_OPTIONS.find((o) => o.value === band)?.midpoint ?? 0;
}

export function runRules(a: HealthCheckAnswers): Opportunity[] {
  const out: Opportunity[] = [];
  const rev = revenueMidpoint(a.revenueBand);
  const totalExtraction = (a.currentSalary || 0) + (a.currentDividend || 0);

  // ────────────────────────────────────────────────────────────────
  // EXTRACTION & STRUCTURE
  // ────────────────────────────────────────────────────────────────

  if (a.entity === "sole-trader" && (a.profitPreTax >= 50000 || rev >= 90000)) {
    out.push({
      id: "incorporation-review",
      severity: "high",
      category: "structure",
      title: "You should model incorporating",
      detail:
        "At your profit level, sole traders pay Class 4 NI on top of income tax. A Ltd company often saves 5–15% net once salary, dividends and corporation tax are modelled together. Incorporation also unlocks pension and R&D routes that aren't available to sole traders.",
      action:
        "Run the salary–dividend optimiser and compare to your current tax bill, then book a call to model the full move.",
      estimatedSaving: "5–15% of net take-home",
      reference: "/calculators/salary-dividend-optimiser",
    });
  }

  if (a.entity === "ltd" || a.entity === "ltd-group") {
    if (a.currentSalary === 0) {
      out.push({
        id: "salary-zero",
        severity: "medium",
        category: "extraction",
        title: "Zero salary is leaving the personal allowance on the table",
        detail:
          "Paying yourself no salary means your £12,570 personal allowance is unused for state pension purposes and you've given up corporation-tax deduction on a salary expense. Most efficient is usually a salary at or just under the secondary threshold.",
        action: "Set a director salary that wraps the personal allowance.",
        reference: "/calculators/salary-dividend-optimiser",
      });
    } else if (a.currentSalary > 20000) {
      out.push({
        id: "salary-heavy",
        severity: "high",
        category: "extraction",
        title: "Your salary looks too high for tax efficiency",
        detail:
          "Salary above the NI primary threshold attracts 8% employee NI and ~15% employer NI. Most owner-managed Ltd companies pay a salary near £12,570 and top up via dividends, the dividend route avoids NI altogether and the tax saving compounds over a year.",
        action:
          "Model the optimised salary–dividend mix for your profit level. The saving is usually £2,000–£6,000 a year.",
        estimatedSaving: "£2,000–£6,000 / year",
        reference: "/calculators/salary-dividend-optimiser",
      });
    }

    if (totalExtraction > 100000) {
      out.push({
        id: "pa-taper",
        severity: "medium",
        category: "extraction",
        title: "Your extraction triggers personal allowance taper",
        detail:
          "Adjusted net income above £100,000 reduces your £12,570 personal allowance by £1 for every £2 over. Fully tapered at £125,140. Net effect: a marginal income tax rate of 60% in the band.",
        action:
          "Consider pension contributions or charitable gift aid to bring adjusted net income below £100,000. This is one of the highest-ROI tax moves available.",
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
          "Profits between £50,000 and £250,000 attract corporation tax at an effective marginal rate of 26.5%. The effective rate of every additional £1 of profit is higher than the 25% main rate.",
        action:
          "Time discretionary expenses (pension, R&D, equipment) into the year you're in this band to maximise relief.",
        reference: "/uk-tax-rates#corporation-tax",
      });
    }
  }

  // ────────────────────────────────────────────────────────────────
  // VAT
  // ────────────────────────────────────────────────────────────────

  if (rev > 90000 && a.entity !== "sole-trader") {
    out.push({
      id: "vat-scheme",
      severity: "medium",
      category: "vat",
      title: "VAT scheme review",
      detail:
        "Above the £90,000 registration threshold you're presumably VAT-registered. The default Standard scheme isn't always optimal, Flat Rate, Cash Accounting and Annual Accounting each suit different agency models. Most creative and consulting agencies are better on Standard with quarterly reclaims.",
      action: "Run the VAT scheme comparator with your numbers.",
      reference: "/calculators/vat-scheme-comparator",
    });
  } else if (rev >= 50000 && rev <= 90000) {
    out.push({
      id: "vat-threshold",
      severity: "medium",
      category: "vat",
      title: "You're approaching the VAT threshold",
      detail:
        "The registration threshold is £90,000 of taxable turnover on a rolling 12-month basis. Crossing it without registering is a compliance risk. There are also legitimate planning options around the threshold, splitting client billing, pre-registration cap-ex, scheme choice, that need to be modelled before you cross.",
      action: "Plan the registration before you trip the threshold.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // R&D
  // ────────────────────────────────────────────────────────────────

  if (RD_HEAVY_TYPES.includes(a.agencyType) && (a.rdActivity === "none" || a.rdActivity === "occasional")) {
    out.push({
      id: "rd-missed",
      severity: "high",
      category: "r-and-d",
      title: "You may be missing R&D tax credits",
      detail:
        "Agencies in your category often qualify for R&D relief without realising, custom integrations, model fine-tuning, novel attribution work, scraping at scale, automation of previously manual workflows. The merged scheme gives a headline credit of 20% (effective net benefit ~15% after corporation tax).",
      action: "Run the R&D eligibility checklist and the credit estimator.",
      estimatedSaving: "Typically 10–18% of qualifying R&D spend",
      reference: "/r-and-d-credits",
    });
  }

  if (a.rdActivity === "regular" || a.rdActivity === "core") {
    out.push({
      id: "rd-docs",
      severity: "medium",
      category: "r-and-d",
      title: "Tighten R&D documentation",
      detail:
        "HMRC R&D enquiries have spiked since 2023. Claims now need clear evidence of technological uncertainty, the competent professional's assessment, and the activities that resolved the uncertainty. Loose claims get challenged hard.",
      action: "Implement a project-level R&D log so claims are defensible at enquiry.",
    });

    if (a.entity === "ltd" || a.entity === "ltd-group") {
      out.push({
        id: "eris-check",
        severity: "info",
        category: "r-and-d",
        title: "ERIS may apply if you're loss-making",
        detail:
          "Enhanced R&D Intensive Support gives a 14.5% payable credit to loss-making SMEs where R&D spend is at least 30% of total expenditure. If you're in the right shape this is materially better than the merged-scheme credit.",
        action: "Test the intensity ratio for your accounting period.",
      });
    }
  }

  // ────────────────────────────────────────────────────────────────
  // IR35 / CONTRACTORS
  // ────────────────────────────────────────────────────────────────

  if (a.contractorUse === "regular" || a.contractorUse === "primary") {
    out.push({
      id: "ir35-review",
      severity: a.contractorUse === "primary" ? "high" : "medium",
      category: "ir35",
      title: "IR35 status determination review",
      detail:
        "Engaging contractors regularly creates IR35 exposure. Since 2021 the engager (you) is responsible for the SDS when the contractor uses a PSC. CEST tool results don't bind HMRC and frequently fail for creative work that doesn't fit the right-of-substitution test cleanly.",
      action:
        "Audit your current contractor engagements with a Status Determination Statement template and document the decisions.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // INTERNATIONAL
  // ────────────────────────────────────────────────────────────────

  if (a.international.includes("us-clients")) {
    out.push({
      id: "us-withholding",
      severity: "medium",
      category: "international",
      title: "US withholding tax exposure",
      detail:
        "US clients may withhold 30% federal tax on payments to non-US entities unless a W-8BEN-E is on file claiming UK treaty benefits. UK-US treaty reduces most service withholding to 0%, but only if the form is correctly completed and updated every 3 years.",
      action: "Confirm a current W-8BEN-E is filed with each US client.",
    });
  }

  if (a.international.includes("uae-move-planned") || a.international.includes("uae-clients")) {
    out.push({
      id: "uae-route",
      severity: "high",
      category: "international",
      title: "UAE planning, get the sequence right",
      detail:
        "A UAE move is a multi-year programme, not a quarter. You need to break UK tax residence under the Statutory Residence Test, set up a UAE entity that's substantively run there, and manage UK client contracts so you don't pull yourself back into UK source income. Done badly it triggers a temporary non-residence charge on return.",
      action: "Map the timeline before you sign a lease in Dubai.",
      reference: "/dubai-relocation",
    });
  }

  if (
    a.international.filter((x) => x !== "uk-only").length > 0 &&
    (a.entity === "ltd-group" || a.entity === "ltd")
  ) {
    out.push({
      id: "transfer-pricing",
      severity: "low",
      category: "international",
      title: "Transfer pricing review for cross-border work",
      detail:
        "If you have related entities abroad (e.g. a Dubai branch, US Inc, or sister company) and they trade with each other, intra-group pricing must be at arm's length. Below the SME threshold most agencies don't need formal documentation, but the position should be defensible.",
      action: "Document the intra-group pricing rationale, even informally.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // EXIT
  // ────────────────────────────────────────────────────────────────

  if (a.exitHorizon === "1-2y" && (a.entity === "ltd" || a.entity === "ltd-group")) {
    out.push({
      id: "badr-clock",
      severity: "high",
      category: "exit",
      title: "BADR 2-year clock, start it now if not already",
      detail:
        "Business Asset Disposal Relief requires you to have held the qualifying shares (5%+) AND been an officer/employee for the full 2 years pre-disposal. Selling without the clock running costs you the difference between 14% (or 18% from April 2026) and 24%. On a £1M gain that's £100–£140k.",
      action: "Confirm shareholding structure and employment status today.",
      estimatedSaving: "Up to £100,000+ per £1M of gain",
      reference: "/calculators/badr-cgt-calculator",
    });
  }

  if (a.exitHorizon === "1-2y" || a.exitHorizon === "3-5y") {
    out.push({
      id: "badr-rate-change",
      severity: "info",
      category: "exit",
      title: "BADR rate rises 14% → 18% on 6 April 2026",
      detail:
        "If a sale is achievable before 6 April 2026, you lock in the lower 14% rate (subject to the 2-year qualifying period and £1M lifetime limit). The 4 percentage point increase is £40,000 of extra tax per £1M of gain.",
      action: "Pressure-test whether an earlier completion is feasible.",
    });
  }

  if (a.exitHorizon === "3-5y") {
    out.push({
      id: "sale-prep",
      severity: "medium",
      category: "exit",
      title: "Sale prep should start now, not in year 4",
      detail:
        "Sale-ready agencies are built, clean management accounts, retained EBITDA history, normalised owner remuneration, low key-person dependency, retainer revenue %, contract assignability. Buyers discount for every gap.",
      action: "Run the agency valuation calculator with realistic adjustments to see where the gaps cost you.",
      reference: "/calculators/agency-valuation",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // MTD / COMPLIANCE
  // ────────────────────────────────────────────────────────────────

  if (a.entity === "sole-trader") {
    if (a.profitPreTax >= 50000 || rev >= 50000) {
      out.push({
        id: "mtd-itsa-2026",
        severity: "high",
        category: "mtd",
        title: "MTD ITSA hits you in April 2026",
        detail:
          "Self-employed individuals with qualifying income above £50,000 must submit quarterly digital returns from 6 April 2026. Spreadsheet-only workflows won't be compliant.",
        action: "Move to MTD-compatible software well before the deadline.",
      });
    } else if (a.profitPreTax >= 30000 || rev >= 30000) {
      out.push({
        id: "mtd-itsa-2027",
        severity: "medium",
        category: "mtd",
        title: "MTD ITSA hits you in April 2027",
        detail:
          "The £30k threshold lands a year after the £50k one. Plan the software switch ahead of time, last-minute migrations under deadline are where compliance breaks.",
        action: "Pick MTD-compatible software in 2026.",
      });
    }
  }

  // ────────────────────────────────────────────────────────────────
  // PENSION
  // ────────────────────────────────────────────────────────────────

  if (a.entity === "ltd" || a.entity === "ltd-group") {
    if (a.profitPreTax > 60000) {
      out.push({
        id: "pension-employer",
        severity: "medium",
        category: "pension",
        title: "Employer pension is the highest-ROI extraction route",
        detail:
          "Up to £60,000/year of employer pension contributions are corporation-tax deductible AND outside personal tax, neither salary nor dividend route comes close on net efficiency. Unused allowance from the previous 3 years can be carried forward.",
        action:
          "Model a £20,000–£60,000 employer contribution; benchmark against the equivalent net dividend.",
        estimatedSaving: "Up to £19,500 / year per £60k contribution",
      });
    }
  }

  // ────────────────────────────────────────────────────────────────
  // EMPLOYMENT ALLOWANCE
  // ────────────────────────────────────────────────────────────────

  if (
    (a.entity === "ltd" || a.entity === "ltd-group") &&
    a.currentSalary > 0 &&
    rev > 250000
  ) {
    out.push({
      id: "employment-allowance",
      severity: "low",
      category: "extraction",
      title: "Confirm Employment Allowance position",
      detail:
        "Employment Allowance is £10,500 of employer NI relief. Single-director Ltd companies don't qualify. Multi-director or employee-heavy agencies usually do. Worth checking annually, eligibility rules change.",
      action: "Audit EA eligibility for the current tax year.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Sort
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
