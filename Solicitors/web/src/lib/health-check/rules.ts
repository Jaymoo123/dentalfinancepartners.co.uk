import type { HealthCheckAnswers, Opportunity } from "./types";

export function runRules(a: HealthCheckAnswers): Opportunity[] {
  const out: Opportunity[] = [];
  const totalExtraction = (a.partnerDrawings || 0);

  // ────────────────────────────────────────────────────────────────
  // SRA COMPLIANCE — Accounts Rules, client money, COFA
  // ────────────────────────────────────────────────────────────────

  if (a.clientMoneyVolume !== "none" && !a.cofaInPlace) {
    out.push({
      id: "no-cofa-with-client-money",
      severity: "high",
      category: "sra-compliance",
      title: "You hold client money but no COFA is in place",
      detail:
        "Every SRA-regulated firm holding client money must have a named Compliance Officer for Finance and Administration. This is a mandatory regulatory requirement; firms operating without a COFA are in immediate breach. Notification to the SRA is required within 7 days of any COFA appointment or change.",
      action:
        "Appoint a COFA today. The role can be held by a non-solicitor (Practice Manager, Finance Director, senior bookkeeper) as long as they are 'fit and proper' and have authority.",
      reference: "/solicitor-guides/cofa-fundamentals",
    });
  }

  if (a.clientMoneyVolume === "none") {
    out.push({
      id: "de-minimis-check",
      severity: "low",
      category: "sra-compliance",
      title: "Confirm de minimis exemption from Accountant's Report",
      detail:
        "If your firm genuinely held no client money during the accounting period, the de minimis exemption (Rule 12.2) likely applies — no annual Accountant's Report needed. The exemption is precise: no more than £10,000 client money at any time during the period AND average balance not exceeding £250.",
      action: "Confirm exemption applies and document the position annually.",
      reference: "/services/sra-accounts-rules",
    });
  }

  if (a.clientMoneyVolume === "high" || a.clientMoneyVolume === "very-high") {
    out.push({
      id: "conveyancing-controls",
      severity: "medium",
      category: "sra-compliance",
      title: "High client money volume requires tight controls",
      detail:
        "Conveyancing-significant firms carry meaningful client money risk. Best practice: weekly client account reconciliations (well inside the 5-week regulatory cap), real-time exception monitoring, daily review of high-balance matters, formal disbursement-paid-before-billed policy, and quarterly internal audit of the COFA decision log.",
      action: "Review your reconciliation rhythm and control discipline against the conveyancing-firm benchmark.",
      reference: "/services/sra-accounts-rules",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // STRUCTURE — Partnership vs LLP vs Ltd
  // ────────────────────────────────────────────────────────────────

  if (
    (a.role === "equity-partner" || a.role === "fixed-share") &&
    a.entity === "partnership"
  ) {
    out.push({
      id: "partnership-to-llp",
      severity: "medium",
      category: "structure",
      title: "Consider converting general partnership to LLP",
      detail:
        "General partnerships leave each partner with unlimited personal liability — joint and several. LLP preserves the tax-transparent treatment (members taxed personally on profit share) while capping liability at the capital contributed. For multi-partner firms with any meaningful liability exposure (especially conveyancing or commercial), LLP is the obvious answer.",
      action: "Model the conversion economics. Process takes 3-6 months and is generally tax-neutral.",
      reference: "/solicitor-guides/partnership-vs-llp-for-solicitors",
    });
  }

  if (a.role === "fixed-share" || a.role === "salaried-partner") {
    out.push({
      id: "fa-2014-audit",
      severity: "high",
      category: "fa-2014",
      title: "FA 2014 Salaried Member quarterly audit needed",
      detail:
        "Fixed-share and salaried members of LLPs sit on the FA 2014 boundary. The three conditions: A) disguised salary ≥80% of total reward, B) limited LLP influence, C) capital contribution <25% of disguised salary. If all three are met, PAYE applies on drawings as if salary. The position drifts as roles change, so quarterly audit catches it before HMRC does.",
      action:
        "Get the FA 2014 position audited now and quarterly thereafter. The fix is usually adjusting capital contribution.",
      reference: "/solicitor-guides/partnership-vs-llp-for-solicitors",
    });
  }

  if (a.role === "sole-practitioner" && a.entity === "sole-trader" && a.profitPreTax >= 80000) {
    out.push({
      id: "sole-pract-incorporation",
      severity: "medium",
      category: "structure",
      title: "Limited company structure worth modelling at your profit level",
      detail:
        "At sustained profit above £80,000-£100,000, a limited company can save tax through retained earnings and pension contributions. For a sole practitioner solicitor the additional consideration is the SRA — incorporating typically requires a Recognised Body application (or ABS if non-solicitor capital is involved).",
      action:
        "Model partnership/LLP/Ltd at your numbers. Conversion process takes 4-8 weeks and is regulatorily straightforward where solicitor-owned.",
      reference: "/solicitor-guides/partnership-vs-llp-for-solicitors",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // CONSULTANT / IR35
  // ────────────────────────────────────────────────────────────────

  if (a.role === "consultant" && a.entity === "consultant-ltd" && a.profitPreTax < 80000) {
    out.push({
      id: "consultant-ltd-too-early",
      severity: "medium",
      category: "structure",
      title: "Ltd-co consultant structure may be premature",
      detail:
        "Below £80,000-£100,000 of sustained consulting income, the £1,800-£2,500 annual admin cost of a limited company often outweighs the tax saving vs sole-trader. Add IR35 complexity (the engaging firm issues the SDS for medium/large clients, restricting Ltd-co flexibility) and many consultants are better off as sole-traders.",
      action: "Re-run the structure choice with your actual figures.",
      reference: "/services/solicitor-accountants",
    });
  }

  if (a.role === "consultant" && a.entity === "umbrella" && a.profitPreTax > 60000) {
    out.push({
      id: "consultant-umbrella-cost",
      severity: "medium",
      category: "structure",
      title: "Umbrella may be costing you more than necessary",
      detail:
        "Umbrella companies are PAYE under contract of employment. Convenient and low-admin but rarely tax-efficient for sustained consulting above £60,000. Worth comparing against sole-trader and Ltd-co.",
      action: "Run the three-structure comparison on your actual day rate / fee income.",
      reference: "/services/solicitor-accountants",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // EXTRACTION — Ltd directors
  // ────────────────────────────────────────────────────────────────

  if ((a.entity === "ltd" || a.entity === "abs") && totalExtraction > 100000) {
    out.push({
      id: "pa-taper",
      severity: "medium",
      category: "extraction",
      title: "Your extraction triggers personal allowance taper",
      detail:
        "Adjusted net income above £100,000 reduces the £12,570 personal allowance by £1 for every £2 over, fully tapered at £125,140. The marginal rate in this band is effectively 60%.",
      action: "Pension contributions or gift aid can bring adjusted net income below £100,000. Highest-ROI tax move available.",
      estimatedSaving: "Up to £5,028 / year",
    });
  }

  if ((a.entity === "ltd" || a.entity === "abs") && a.profitPreTax >= 50000 && a.profitPreTax <= 250000) {
    out.push({
      id: "ct-marginal",
      severity: "info",
      category: "structure",
      title: "You're in the corporation tax marginal relief band",
      detail:
        "Profits between £50,000 and £250,000 attract corporation tax at an effective marginal rate of 26.5% above £50,000. Time discretionary expenses (pension, equipment, AIA-eligible purchases) into this band to maximise relief.",
      action: "Year-end planning around the £50k-£250k profit band.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // EXIT — BADR + pre-sale planning
  // ────────────────────────────────────────────────────────────────

  if (a.exitHorizon === "selling-within-2y") {
    out.push({
      id: "badr-clock",
      severity: "high",
      category: "exit",
      title: "BADR 2-year qualifying clock — confirm it's running",
      detail:
        "Business Asset Disposal Relief requires 2 years of qualifying interest. BADR rate is 14% in 2025/26, rising to 18% from 6 April 2026 — £40,000 of additional CGT per £1m of gain.",
      action:
        "Verify the BADR conditions now and plan the structure-at-sale before listing.",
      estimatedSaving: "Up to £100,000+ per £1m of gain",
      reference: "/solicitor-guides/post-merger-integration",
    });
  }

  if (a.exitHorizon === "selling-within-2y" || a.exitHorizon === "selling-3-5y") {
    out.push({
      id: "badr-rate-change",
      severity: "high",
      category: "exit",
      title: "BADR rate rises from 14% to 18% on 6 April 2026",
      detail:
        "If a sale can complete before 6 April 2026, the lower 14% rate applies (subject to the 2-year qualifying period and £1m lifetime limit). The rate increase is £40,000 of additional CGT per £1m of gain.",
      action: "Pressure-test whether bringing the completion date forward is feasible.",
      reference: "/services/practice-valuation",
    });
  }

  if (a.exitHorizon === "buying-firm") {
    out.push({
      id: "acquisition-dd",
      severity: "high",
      category: "goodwill",
      title: "Law firm acquisition due diligence is decisive",
      detail:
        "The 90 days before completion are where price gets adjusted, structure gets fixed, and post-completion problems get prevented. WIP valuation, client money transition, PII continuity, SRA notification — these each affect the offer or the integration.",
      action: "Get specialist due diligence support before submitting an offer.",
      reference: "/for-firm-buyers",
    });
  }

  if (a.exitHorizon === "selling-3-5y" || a.exitHorizon === "selling-5y-plus") {
    out.push({
      id: "presale-prep",
      severity: "medium",
      category: "exit",
      title: "Pre-sale planning should start 18-24 months out",
      detail:
        "BADR eligibility (2-year qualifying period), EBITDA normalisation showing in accounts buyers will see, Section 162 incorporation if pre-sale incorporation is the route, broker selection — none can be done in the last 6 weeks.",
      action: "Begin pre-sale planning now even if exit is 3-5 years away.",
      reference: "/services/practice-valuation",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // VAT
  // ────────────────────────────────────────────────────────────────

  if (
    a.role === "consultant" &&
    a.entity !== "umbrella" &&
    a.profitPreTax > 75000
  ) {
    out.push({
      id: "vat-threshold-check",
      severity: "medium",
      category: "vat",
      title: "VAT threshold check on consulting fees",
      detail:
        "VAT registration becomes mandatory at £90,000 of taxable turnover on a rolling 12-month basis. Legal services are standard-rated at 20%. Many consultants register voluntarily below the threshold to reclaim input VAT on costs.",
      action: "Track 12-month rolling turnover; plan registration before crossing the threshold.",
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
      category: "sra-compliance",
      title: "A legal-sector-specialist accountant typically pays for itself",
      detail:
        "Generalist accountants miss the niche items: SRA Accountant's Report delivery, FA 2014 Salaried Member audit, LLP-specific tax issues, post-merger integration, Section 162 incorporation relief for pre-sale planning. The fee gap to a specialist is usually smaller than the value of one missed planning point.",
      action: "Get a fee-and-scope comparison from a legal-sector specialist.",
    });
  }

  if (a.accountantSatisfaction === "ok") {
    out.push({
      id: "specialist-check",
      severity: "low",
      category: "sra-compliance",
      title: "Is your current accountant a legal-sector specialist?",
      detail:
        "An accountant who does a small number of solicitor clients alongside other industries is unlikely to be at the top of the curve on the SRA Accounts Rules, FA 2014 mechanics, and current pre-sale / Section 162 planning. 'Doing the books' is different from 'optimising the legal-sector tax position'.",
      action: "Audit your last 2 years of returns against a legal-sector specialist's review.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // MTD ITSA for sole-traders
  // ────────────────────────────────────────────────────────────────

  if ((a.entity === "sole-trader" || a.entity === "consultant-sole-trader") && a.profitPreTax >= 50000) {
    out.push({
      id: "mtd-itsa-2026",
      severity: "medium",
      category: "sra-compliance",
      title: "MTD ITSA hits you from April 2026",
      detail:
        "Self-employed individuals with qualifying income above £50,000 must submit quarterly digital returns from 6 April 2026. Spreadsheet-only workflows won't be compliant.",
      action: "Move to MTD-compatible software well before the deadline.",
    });
  }

  // ────────────────────────────────────────────────────────────────
  // Sort by severity
  // ────────────────────────────────────────────────────────────────

  const order: Record<Opportunity["severity"], number> = { high: 0, medium: 1, low: 2, info: 3 };
  out.sort((a, b) => order[a.severity] - order[b.severity]);

  return out;
}
