/**
 * Service sub-page content. Each entry renders at /services/[slug].
 * Targets one specific GSC query cluster surfaced by 90-day data.
 *
 * /services/solicitor-accountants — primary target for the 170-impression
 *   "accounting for solicitors" cluster currently ranking pos 72.5.
 * /services/sra-accounts-rules — regulatory authority play, targets
 *   "solicitors accounts rules" (15 impr / pos 73.5).
 * /services/llp-accounts — LLP/partnership tax cluster.
 * /services/cofa-compliance-support — high-intent regulatory query.
 * /services/practice-valuation — captures the "law firm valuation
 *   formula uk" query already at pos 7.4 with zero clicks.
 */

export type ServiceFaq = { question: string; answer: string };

export type ServiceSubPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  hero: { heading: string; intro: string };
  sections: Array<{ heading: string; body: string[]; bullets?: string[] }>;
  whoFor: string[];
  workedExample?: { heading: string; body: string[] };
  faqs: ServiceFaq[];
  relatedServices: Array<{ href: string; label: string }>;
  ctaHeading: string;
  ctaBody: string;
};

export const SERVICE_SUB_PAGES: Record<string, ServiceSubPage> = {
  "solicitor-accountants": {
    slug: "solicitor-accountants",
    title: "Solicitor Accountants UK: What a Specialist Actually Does",
    metaTitle: "Solicitor Accountants UK: Legal Sector Tax & Compliance",
    metaDescription:
      "What a specialist solicitor accountant does that a generalist doesn't. SRA Accounts Rules, LLP tax, partner extraction, practice valuation. Fixed fees.",
    eyebrow: "Specialist solicitor accountants",
    hero: {
      heading: "Solicitor accountants for UK law firms, partners and locum solicitors",
      intro:
        "We work with solicitors only. Every client is a law firm, an LLP, a partnership, a sole practitioner, or a locum solicitor. The narrow focus is the point — the SRA Accounts Rules, the FA 2014 salaried-member tests, and the LLP profit-allocation methodology are reflexive after enough clients.",
    },
    sections: [
      {
        heading: "Why a specialist solicitor accountant, not a generalist",
        body: [
          "Generalist accountants handle a handful of solicitor clients between their main book. The compliance gets done; the sector-specific decisions get missed because the accountant has no pattern to compare against.",
          "A specialist solicitor accountant sees the same questions weekly. The five-weekly client account reconciliation rhythm (Rule 8.3, not the monthly that most generalists default to). The de minimis exemption for the SRA Accountant's Report (£10,000 client money at any time AND £250 average — not a single turnover threshold). The FA 2014 Salaried Member Rules with Conditions A + B + C. The 6.5% goodwill amortisation rate for post-April-2019 acquisitions, with no relief for the 8 July 2015 to 31 March 2019 window.",
          "These are not advanced techniques. They are baseline competence. A generalist who can't quote Rule 8.3 from memory is learning on your account.",
        ],
      },
      {
        heading: "What we actually do across a year",
        body: [
          "Compliance is the floor. The work is the decisions that compliance reveals.",
        ],
        bullets: [
          "Annual SRA Accountant's Report inside the 6-month deadline, with a clean working file the SRA inspector can read",
          "Five-weekly client account reconciliations supported by an evidence file that holds at audit",
          "SA800 partnership / LLP tax return plus each partner's personal self-assessment",
          "FA 2014 Salaried Member Rules audit quarterly so the position never drifts",
          "Partner drawings reconciliation and capital account tracking",
          "Personal pension contribution timing for partners, including the tapered annual allowance interaction",
          "Goodwill amortisation tracking on post-April-2019 acquisitions, AIA on equipment, SBA on post-October-2018 premises spend",
          "Pre-sale planning 18-24 months before exit, with BADR rate-change (14% → 18% on 6 April 2026) scenario modelling",
        ],
      },
      {
        heading: "How we are different from corporate legal-sector accountants",
        body: [
          "Some legal-sector accountancy firms have grown into corporate operations that allocate junior staff to client work and only escalate up when something goes wrong. The named partner is rarely on the call.",
          "Our model is the opposite. The senior accountant working on your account is the senior accountant. The same person who reviews your year-end is the person you email when a buyer wants due diligence by Friday or a new COFA needs onboarding.",
          "We deliberately stay small enough to keep that real.",
        ],
      },
    ],
    whoFor: [
      "Sole-practitioner solicitors",
      "2-15 partner LLPs",
      "Multi-partner partnerships looking to convert to LLP",
      "Specialist firms (conveyancing, family, private client, personal injury, litigation)",
      "Locum and consultant solicitors",
      "Newly-appointed COFAs and COLPs",
    ],
    workedExample: {
      heading: "Typical engagement: 6-partner LLP, conveyancing-heavy",
      body: [
        "A 6-partner LLP in the South East, residential conveyancing volume around £2.4m gross fees. Annual SRA Accountant's Report due 4 months after year-end, 5 fee-earner FA 2014 audits required (3 fixed-share, 2 salaried).",
        "The work: monthly management accounts splitting NHS-style by department (conveyancing / family / commercial), five-weekly client account reconciliations with the bookkeeper's evidence file reviewed quarterly, annual statutory accounts + SA800, FA 2014 audit each quarter, partner-by-partner SA filings in January.",
        "Fixed monthly fee around £1,800-£2,200 depending on scope. Specialist work (sale planning, partner exit, ABS conversion) priced separately as a one-off engagement.",
      ],
    },
    faqs: [
      {
        question: "Are you qualified to deliver the SRA Accountant's Report?",
        answer:
          "Yes. We are independent of your firm and qualified to deliver the SRA-mandated annual report under the Accounts Rules. The report must be filed within 6 months of your firm's accounting period end. We aim to issue clean reports 4-6 weeks ahead of that deadline so any issues are surfaced early.",
      },
      {
        question: "Do you only work with solicitors?",
        answer:
          "Legal-sector work is the primary focus. We occasionally take other professional-services firms (accountants, surveyors), but the bulk of the book is solicitors, LLPs, partnerships, sole practitioners, conveyancers, and locum solicitors.",
      },
      {
        question: "Can you handle our existing software (Leap, Clio, ProClaim)?",
        answer:
          "Yes. Most of our clients run Xero or QuickBooks as the financial system, integrated with a practice management system (Leap, Clio, ProClaim, ALB, SOS Connect). We are software-agnostic; whatever you use, we will work with it. We do encourage moving from desktop-only to cloud-based systems where you are still on Sage 50 or older Iris.",
      },
      {
        question: "How much do you charge?",
        answer:
          "Essentials tier from £180/month for sole practitioners. Growth tier from £450/month for typical 4-8 partner LLPs. Specialist work (sale, acquisition, ABS conversion) priced as a one-off engagement, typically £4,000-£12,000 depending on complexity. All fixed-fee, no hourly billing on routine work.",
      },
    ],
    relatedServices: [
      { href: "/services/sra-accounts-rules", label: "SRA Accounts Rules + accountant's report" },
      { href: "/services/llp-accounts", label: "LLP + partnership accounting" },
      { href: "/services/practice-valuation", label: "Practice valuation + succession" },
      { href: "/free-firm-health-check", label: "Free firm health check" },
    ],
    ctaHeading: "Talk to a specialist solicitor accountant",
    ctaBody:
      "30-minute scoping call. We tell you what would change if you moved, what the fee would be, and whether it's worth the disruption.",
  },

  "sra-accounts-rules": {
    slug: "sra-accounts-rules",
    title: "SRA Accounts Rules Compliance + Annual Accountant's Report",
    metaTitle: "SRA Accounts Rules Compliance + Annual Report | UK Solicitors",
    metaDescription:
      "SRA Accounts Rules compliance support. Annual Accountant's Report, five-weekly reconciliations, COFA breach handling, de minimis exemption review.",
    eyebrow: "SRA compliance + accountant's report",
    hero: {
      heading: "SRA Accounts Rules compliance for UK law firms",
      intro:
        "The annual SRA Accountant's Report is the floor. The work is making sure your firm's client account handling never gives the SRA a reason to look further. We deliver the report, support the COFA, and audit the controls.",
    },
    sections: [
      {
        heading: "What the SRA Accounts Rules actually require",
        body: [
          "The current version of the SRA Accounts Rules took effect on 25 November 2019 and has been amended several times since. The headline rules are short but the operational discipline is what matters.",
        ],
        bullets: [
          "Rule 2: client money must be kept separate from office money in a designated client account",
          "Rule 7: client money interest must be paid to the client when 'fair' — a test based on amount and length of time held",
          "Rule 8.3: reconciliations of every client account and the office account must be performed at least every five weeks (NOT monthly — five weeks is the maximum interval)",
          "Rule 12: an annual SRA Accountant's Report is required within 6 months of the firm's accounting period end, unless a de minimis exemption applies",
          "Rule 12.2: de minimis exemption — firm held no more than £10,000 client money at any time during the period AND average client money balance not exceeding £250",
        ],
      },
      {
        heading: "How we work an SRA Accountant's Report",
        body: [
          "We are independent of your firm and qualified to deliver the report. The typical engagement runs as follows.",
        ],
        bullets: [
          "Initial scoping call to confirm the period end, the volume of client matters, and any known issues",
          "Working file request: bank statements for all client and office accounts for the period, full client matter ledger extracts, reconciliation evidence file, breach decision log",
          "On-site or remote review of the working file across approximately 2-5 days depending on firm size",
          "Sampling of client matters with attention to any high-balance accounts and any matters flagged as concerns by the COFA",
          "Draft report issued to the firm for review, with any issues surfaced for response",
          "Final report issued to the SRA inside the 6-month deadline; firm retains a copy",
        ],
      },
      {
        heading: "Common SRA Accounts Rules breaches we see",
        body: [
          "Most breaches are operational, not deliberate. We work with COFAs to surface them early and close the controls.",
        ],
        bullets: [
          "Reconciliation interval exceeding 5 weeks because the bookkeeper went on holiday and no one covered",
          "Client money left in office account longer than a few days after settlement",
          "Disbursement payments made from client account before billing the client",
          "Residual client balances under £50 left to gather dust years after matter completion",
          "Client money interest policy that doesn't match what the firm actually does in practice",
          "COFA decision log absent or last updated 18 months ago",
        ],
      },
    ],
    whoFor: [
      "Firms holding any volume of client money (most law firms)",
      "Recently appointed COFAs needing onboarding",
      "Firms transitioning from one accountant to another mid-cycle",
      "Firms that have had an SRA inspection and need controls remediation",
      "Conveyancing firms with high client money volume",
    ],
    faqs: [
      {
        question: "We only hold tiny amounts of client money. Do we still need a report?",
        answer:
          "Possibly not. The Rule 12.2 de minimis exemption applies if the firm held no more than £10,000 of client money at any time during the period AND the average client money balance did not exceed £250. Both conditions must be met. Many small firms qualify but few realise. We can review your client account activity and confirm whether you qualify.",
      },
      {
        question: "How often must we reconcile our client account?",
        answer:
          "At least every five weeks (Rule 8.3 of the SRA Accounts Rules). This is the regulatory maximum interval. Monthly reconciliation is common practice and gives a buffer against the five-week cap, but five weeks is the rule. The reconciliation must compare the client account ledger total with the client account bank statement balance and explain any differences.",
      },
      {
        question: "What happens if we miss the 6-month deadline for the Accountant's Report?",
        answer:
          "The SRA treats late filing as a regulatory matter. A short delay (1-2 months) with a reasonable explanation is typically tolerated. Repeat lateness or unexplained delay can trigger a Forensic Investigation referral, which is materially worse. We aim to issue your report 4-6 weeks ahead of the deadline as a routine matter.",
      },
      {
        question: "Can you support a newly-appointed COFA?",
        answer:
          "Yes. New-COFA onboarding is a separate engagement: we walk you through the Accounts Rules in plain English (not regulatory speak), set up your reconciliation rhythm and evidence file, build your breach decision log template, and provide a quarterly check-in for the first year so the role beds in properly.",
      },
    ],
    relatedServices: [
      { href: "/services/cofa-compliance-support", label: "COFA + COLP compliance support" },
      { href: "/services/llp-accounts", label: "LLP + partnership accounting" },
      { href: "/solicitor-guides/sra-accounts-rules-essentials", label: "SRA Accounts Rules pillar guide" },
      { href: "/free-firm-health-check", label: "Free firm health check" },
    ],
    ctaHeading: "Get your SRA Accountant's Report in safe hands",
    ctaBody:
      "30-minute scoping call. We confirm whether the de minimis exemption applies, the period end, and a fixed fee for the report and any control improvements.",
  },

  "llp-accounts": {
    slug: "llp-accounts",
    title: "LLP + Partnership Accounting for UK Law Firms",
    metaTitle: "LLP + Partnership Accounting UK Law Firms | Salaried Member Audit",
    metaDescription:
      "LLP and partnership accounting for UK law firms. SA800 returns, partner self-assessment, FA 2014 Salaried Member audit, profit allocation.",
    eyebrow: "LLP + partnership accounting",
    hero: {
      heading: "LLP and partnership accounting for UK law firms",
      intro:
        "Members of an LLP are self-employed for tax even though the LLP has separate legal personality. Salaried members can be deemed employees by the FA 2014 rules. The allocation, audit, and partner-by-partner self-assessment is what we do.",
    },
    sections: [
      {
        heading: "LLP tax treatment in plain English",
        body: [
          "LLPs are tax-transparent for income tax. The LLP itself does not pay corporation tax. Each member is taxed on their share of profit at personal rates plus Class 4 NI on their trading profit share. The LLP files an SA800 partnership return; each member files their own self-assessment.",
          "The legal personality of the LLP gives limited liability protection to members. The tax treatment mirrors a general partnership. This is why most multi-partner law firms converted from general partnership to LLP in the 2000s.",
        ],
      },
      {
        heading: "The FA 2014 Salaried Member Rules",
        body: [
          "From 6 April 2014, a member of an LLP is deemed an employee for tax purposes if all three of the following conditions are met. PAYE then applies to their drawings as if they were salary.",
        ],
        bullets: [
          "Condition A: 'disguised salary' — at least 80% of the total reward from the LLP is fixed or determined without reference to profit",
          "Condition B: limited influence — the member has only limited rights to influence the LLP's affairs (no meaningful management role)",
          "Condition C: capital contribution — the member's capital contribution is less than 25% of their disguised salary for the period",
        ],
      },
      {
        heading: "Why the FA 2014 audit matters quarterly",
        body: [
          "The position is dynamic. A salaried partner who passed the three-condition test last year might fail this year if their bonus rises, their capital contribution proportion changes, or their role expands.",
          "Quarterly audit catches drift early. We model each salaried/fixed-share partner against the three conditions and either confirm partner-tax treatment continues, or flag the trigger requiring PAYE. The wrong answer for the wrong year can trigger PAYE backdating and HMRC interest.",
        ],
      },
      {
        heading: "Partner capital + interest relief",
        body: [
          "Partners typically buy in to an LLP with a capital contribution. Borrowing to fund the buy-in attracts qualifying loan interest relief under ITA 2007 s.398: the interest paid on the loan is deductible from the partner's personal taxable income. The relief is per-partner; we set up the documentation so it's claimable each year on the partner's self-assessment.",
        ],
      },
    ],
    whoFor: [
      "Multi-partner LLPs (2-50 members)",
      "General partnerships considering conversion to LLP",
      "Firms admitting new equity or fixed-share partners",
      "Firms where partners are leaving or retiring",
      "LLPs with salaried or fixed-share members near the FA 2014 boundary",
    ],
    faqs: [
      {
        question: "How is LLP profit allocated between members?",
        answer:
          "However the LLP agreement says. The default is equal shares; the typical structure for law firms allocates by partner unit / equity points. Profit allocation can be: fixed-share (a fixed monetary amount), equity share (a percentage of remaining profit), or hybrid. The methodology must be documented in the LLP agreement and applied consistently.",
      },
      {
        question: "Do LLP members pay employer NI on their drawings?",
        answer:
          "Generally no, because LLP members are self-employed for tax (Class 4 NI on profit, not Class 1 employer/employee NI). The exception is salaried members who fail the FA 2014 test and are deemed employees — PAYE applies on their drawings including employer NI.",
      },
      {
        question: "What happens to partner accounts when a partner leaves?",
        answer:
          "The LLP agreement governs. Typically the leaving partner is entitled to their capital contribution back (sometimes phased over 1-3 years), their final allocation of profit up to leaving date, and any vested deferred compensation. The accounting treatment requires careful tracking; we manage the partner ledger across the transition.",
      },
      {
        question: "Should we convert from general partnership to LLP?",
        answer:
          "For most multi-partner firms, yes. LLP gives limited liability protection while preserving the partnership tax treatment. The conversion is administratively simple. The exception is very small firms (2 partners, low turnover) where the Companies House filing obligation may outweigh the liability protection. We model the conversion economics on a per-firm basis.",
      },
    ],
    relatedServices: [
      { href: "/services/solicitor-accountants", label: "Solicitor accountants (overview)" },
      { href: "/services/sra-accounts-rules", label: "SRA Accounts Rules + report" },
      { href: "/calculators/llp-profit-share-allocation", label: "LLP profit share calculator" },
      { href: "/solicitor-guides/partnership-vs-llp-for-solicitors", label: "Partnership vs LLP pillar guide" },
    ],
    ctaHeading: "Get your LLP accounting onto specialist hands",
    ctaBody:
      "30-minute scoping call. We confirm scope, audit your FA 2014 position, and quote a fixed monthly fee.",
  },

  "practice-valuation": {
    slug: "practice-valuation",
    title: "Law Firm Valuation + Succession Planning",
    metaTitle: "Law Firm Valuation UK + Pre-Sale Planning | BADR 2026",
    metaDescription:
      "UK law firm valuation methodology. EBITDA multiples, WIP treatment, goodwill, BADR rate change April 2026, Section 162 incorporation, 18-24 month plan.",
    eyebrow: "Practice valuation + sale",
    hero: {
      heading: "Law firm valuation and pre-sale planning",
      intro:
        "Law firm valuations are typically 1-3x normalised profit for partnership/LLP, sometimes higher for specialist firms, plus WIP and tangible assets. The BADR rate rises from 14% to 18% on 6 April 2026 — that single date moves £40,000 of tax per £1m of gain.",
    },
    sections: [
      {
        heading: "How UK law firms are actually valued",
        body: [
          "Earnings-based methodology dominates. Normalised profit × a market multiple = enterprise value. WIP is added separately because it's earned but unbilled revenue; tangible assets (computers, fit-out, occasionally premises) are added at net book value.",
          "The multiple variance is wide: 1x for high-street general practice in a soft regional market, up to 3x+ for specialist firms (personal injury with strong CFA pipeline, niche commercial litigation, prestige private client). Conveyancing-heavy firms have been depressed by post-2022 market conditions; specialist commercial firms remain strong.",
        ],
      },
      {
        heading: "Normalising the profit number",
        body: [
          "The 'normalised' part is critical. Sale-ready EBITDA reflects what the post-sale buyer can replicate, not the seller's current take-home.",
        ],
        bullets: [
          "Equity partner drawings normalised back to market salary for the role they actually fill (typically £80,000-£120,000 for fee-earning partners outside top tier)",
          "Personal expenses removed from the P&L (vehicle costs, family employment without genuine work, club memberships unrelated to client development)",
          "One-off items called out separately (PII excess on settled claim, partner exit payment, office move costs, one-off litigation)",
          "WIP recognised on an earnings basis (FRS 102 / FRS 105) — the older billings basis was retired via FA 2002",
          "Bad debt provision against aged WIP that won't convert",
        ],
      },
      {
        heading: "BADR + the 6 April 2026 rate change",
        body: [
          "Business Asset Disposal Relief is charged at 14% in 2025/26 on qualifying gains up to a £1m lifetime limit. From 6 April 2026 the rate rises to 18%. On the full £1m limit that's £40,000 of additional CGT on a 2026/27 disposal versus a 2025/26 disposal.",
          "BADR eligibility requires 2 years of qualifying ownership, 5%+ shareholding (for incorporated firms), and employee/officer status. For an unincorporated partnership or LLP, the 2-year qualifying period applies to the firm interest. If you're planning a sale in late 2025/26 or early 2026/27, the structure and timeline need attention now.",
        ],
      },
      {
        heading: "Section 162 incorporation relief",
        body: [
          "Section 162 TCGA 1992 defers CGT on goodwill when an unincorporated trade is transferred to a company in exchange for shares. For law firms approaching sale, the typical play is: incorporate via Section 162 now, hold the shares for 2+ years to qualify for BADR on the eventual share sale, then sell the shares. The deferred goodwill gain rolls into the share base cost.",
          "This route works when the share sale BADR position beats the asset sale alternative. We model both on actual firm numbers before recommending.",
        ],
      },
      {
        heading: "The 18-24 month pre-sale timeline",
        body: [
          "Sale-ready firms are built. The earliest decisions move the price most.",
        ],
        bullets: [
          "24 months: valuation refresh, BADR eligibility audit, Section 162 incorporation decision",
          "18 months: EBITDA normalisation begins to show in the accounts, WIP discipline tightened",
          "12 months: second clean accounting period in the books, broker selection, marketing prep",
          "6 months: practice listed, longlist to shortlist",
          "3 months: preferred buyer in due diligence, heads of terms",
          "Completion: BADR claim prepared for inclusion in seller's self-assessment",
        ],
      },
    ],
    whoFor: [
      "Senior partners 18-36 months from exit",
      "Sole practitioners planning succession",
      "Firms approached by corporate buyers / aggregators",
      "Multi-partner firms with a known retiring partner",
      "Firms considering merger (incoming or outgoing)",
    ],
    workedExample: {
      heading: "Worked example: 4-partner LLP, mixed commercial",
      body: [
        "A 4-partner mixed-commercial LLP in the Midlands. Normalised profit £600,000 after market-salary adjustment for partners. Multiple 1.5x in the current market for this type of firm. Goodwill value: £900,000.",
        "Add WIP at £180,000 and tangible assets at £40,000. Enterprise value: £1,120,000.",
        "Each partner's qualifying gain at sale, assuming a 4-way equal allocation: £280,000. Inside the £1m BADR lifetime limit per partner.",
        "If sale completes 1 March 2026 (2025/26 tax year): BADR at 14% = £39,200 per partner. If sale completes 1 May 2026 (2026/27): BADR at 18% = £50,400 per partner. The difference per partner: £11,200. Total firm-side timing benefit: £44,800.",
      ],
    },
    faqs: [
      {
        question: "What's a typical law firm multiple in 2025/26?",
        answer:
          "Wide range. High-street general practice in soft regional markets: 0.8-1.2x normalised profit. Mid-market partnership/LLP: 1.2-2x. Specialist firms (personal injury, niche commercial litigation, prestige private client): 2-3x+. Corporate acquirers paying for strategic fit sometimes pay above. Conveyancing-heavy firms are currently depressed by post-2022 market conditions.",
      },
      {
        question: "What's WIP worth at sale?",
        answer:
          "WIP is recognised on an earnings basis under FRS 102 / FRS 105. At sale, WIP is valued at the recoverable amount — what the buyer can reasonably expect to bill and collect on the open files. Aged WIP (over 6 months) is typically written down or excluded. Conveyancing WIP is usually fast-converting; litigation WIP can be slow and is discounted more aggressively.",
      },
      {
        question: "What's the difference between an asset sale and a share sale?",
        answer:
          "For a law firm structured as an LLP, the sale is typically an asset sale (the buyer acquires the goodwill, WIP, and tangible assets). For a law firm incorporated as a limited company, the sale can be a share sale (the buyer acquires the company). Asset sales suit buyers who don't want to inherit historic liabilities; share sales suit sellers who want a cleaner BADR position. We model both.",
      },
      {
        question: "When should pre-sale planning start?",
        answer:
          "18-24 months before target exit. BADR eligibility (2-year qualifying period), Section 162 incorporation modelling (if going from unincorporated to share sale), EBITDA normalisation showing in the accounts buyers will see, and broker selection all need lead time. None of this can be done in the last 6 weeks.",
      },
    ],
    relatedServices: [
      { href: "/services/solicitor-accountants", label: "Solicitor accountants (overview)" },
      { href: "/calculators/law-firm-valuation", label: "Law firm valuation calculator" },
      { href: "/solicitor-guides/post-merger-integration", label: "Post-merger integration guide" },
      { href: "/contact", label: "Book a scoping call" },
    ],
    ctaHeading: "Get your pre-sale planning started early",
    ctaBody:
      "30-minute scoping call. If you're 12-36 months from a sale, the tax planning needs to start now, not in the run-up.",
  },

  "cofa-compliance-support": {
    slug: "cofa-compliance-support",
    title: "COFA + COLP Compliance Support",
    metaTitle: "COFA + COLP Support UK Law Firms | SRA Compliance Help",
    metaDescription:
      "COFA + COLP compliance support for UK law firms. New-appointment onboarding, breach decision log, reconciliation rhythm, SRA inspection readiness.",
    eyebrow: "COFA + COLP support",
    hero: {
      heading: "COFA and COLP compliance support",
      intro:
        "If you've just stepped into the COFA or COLP role, or you've inherited one from someone who left in a hurry, the SRA Accounts Rules and the COLP responsibilities can feel suddenly substantial. We help you bed in the controls so the role doesn't dominate the day job.",
    },
    sections: [
      {
        heading: "What the COFA actually does",
        body: [
          "Every SRA-regulated firm must nominate a Compliance Officer for Finance and Administration. The COFA is accountable to the SRA for compliance with the Accounts Rules. The role is real, not nominal — the SRA can take action against the named individual for failures.",
        ],
        bullets: [
          "Five-weekly client account reconciliation oversight (Rule 8.3)",
          "Client money interest policy and its application in practice",
          "Annual Accountant's Report co-ordination and SRA filing",
          "Breach identification, response, and reporting (with the COLP for the regulatory side)",
          "Client account interest reconciliation",
          "Office account and matter-level ledger oversight",
        ],
      },
      {
        heading: "What the COLP actually does",
        body: [
          "The Compliance Officer for Legal Practice is accountable to the SRA for the firm's broader regulatory compliance: AML, conflicts, client care, professional conduct.",
        ],
        bullets: [
          "AML supervision, risk assessment, and policy maintenance",
          "Conflict checking and conflicts log",
          "Complaint handling and SRA-reportable matters",
          "Professional indemnity insurance compliance",
          "Continuing competence framework for all fee-earners",
          "SRA notifications for material changes",
        ],
      },
      {
        heading: "How we support new-COFA onboarding",
        body: [
          "Most new COFAs inherit a function that has been quietly running for years. The challenge is understanding what 'good' looks like in your specific firm and where the risks actually sit.",
        ],
        bullets: [
          "Half-day onboarding session: the Accounts Rules in plain English, your firm's specific risk profile, the SRA's current focus areas",
          "Reconciliation rhythm setup: weekly templates, evidence file structure, monthly review",
          "Breach decision log template: when to record, when to escalate, when to notify the SRA",
          "Quarterly check-in for the first 12 months while you bed in",
          "Direct line for the inevitable 'is this a breach?' question that arises in month 4",
        ],
      },
      {
        heading: "When to use this engagement vs full accountancy",
        body: [
          "Some firms want COFA compliance support but already have a perfectly competent accountant for the rest of the work. We deliver this engagement on a standalone basis — quarterly review meetings, breach log review, year-end SRA report co-ordination — without disturbing the existing accountancy relationship.",
        ],
      },
    ],
    whoFor: [
      "Newly-appointed COFAs in firms of any size",
      "Newly-appointed COLPs needing accountancy-side support",
      "Firms recently inspected by the SRA",
      "Conveyancing firms with high client account volume and tight controls needed",
      "Firms in management transition (retiring partner who held the role)",
    ],
    faqs: [
      {
        question: "Can a non-solicitor be the COFA?",
        answer:
          "Yes. The COFA does not have to be a solicitor. The SRA requires the COFA to be 'fit and proper' and to have the authority to perform the role. The Practice Manager, Finance Director, or experienced bookkeeper can be the COFA in many firms. The COLP must be a solicitor.",
      },
      {
        question: "What's the difference between a breach and a 'material breach'?",
        answer:
          "All breaches of the Accounts Rules should be recorded in the firm's breach log. Material breaches must be notified to the SRA. The materiality test depends on context: amount, duration, whether client money was put at risk, whether the breach indicates a systemic control failure. We help calibrate the call — over-reporting wastes SRA attention and creates a long compliance file; under-reporting risks regulatory action.",
      },
      {
        question: "How often should the COFA report to the management team?",
        answer:
          "Monthly is good practice for firms above a few partners. A short written update covering: reconciliations completed, breaches identified and recorded, any matters notified to the SRA, any control improvements implemented. We provide a template that takes 15 minutes to complete each month.",
      },
      {
        question: "We've just had an SRA Forensic Investigation visit. Help?",
        answer:
          "Yes — a Forensic Investigation requires careful handling and we can co-ordinate the accountancy-side response. The investigation typically requests the working file, breach log, reconciliation evidence, and matter-level samples. We help you compile the response, identify any historic issues that need disclosure, and remediate any control gaps. The faster and cleaner the response, the better the regulatory outcome.",
      },
    ],
    relatedServices: [
      { href: "/services/sra-accounts-rules", label: "SRA Accounts Rules + report" },
      { href: "/services/llp-accounts", label: "LLP + partnership accounting" },
      { href: "/solicitor-guides/cofa-fundamentals", label: "COFA fundamentals pillar guide" },
      { href: "/free-firm-health-check", label: "Free firm health check" },
    ],
    ctaHeading: "Get your COFA / COLP role onto solid ground",
    ctaBody:
      "30-minute scoping call. We confirm where you are, what you need, and a fixed engagement fee.",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_SUB_PAGES);
