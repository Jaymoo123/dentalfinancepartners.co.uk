import type { GenericTool } from "@accounting-network/web-shared/tools/types";

/**
 * Managed Service Company (MSC) Risk Checker.
 *
 * Screens a contractor's arrangement against the s.61B(2) ITEPA 2003
 * involvement limbs and the MSC Provider definition (s.61B(1)(d)), producing a traffic-light
 * risk verdict plus a plain-English consequence warning where relevant.
 *
 * This is a rules-based indicator, not a tax calculation — no money arithmetic,
 * no income-tax bands, no rate inlining required. The verdict field renders a
 * badge via the shared <Calculator> component.
 *
 * Legal basis: Chapter 9 Part 2 ITEPA 2003 (ss.61A-61J), as amended. Debt
 * transfer: s.688A ITEPA 2003 for PAYE + the Social Security Contributions
 * (MSC) Regulations 2007 (SI 2007/2077) for NIC (Finance Act 2007, s.25+Sch.3).
 *
 * ponytail: rules-only, no money engine calls needed.
 */

/* ------------------------------------------------------------------ */
/* Scoring helpers                                                      */
/* ------------------------------------------------------------------ */

// s.61B(2) involvement limbs. Each maps to a field below.
// A provider that carries on an MSC business (s.61B(1)(d)) AND is "involved"
// via ANY ONE of the s.61B(2) limbs makes the contractor's company an MSC.
const INVOLVEMENT_TEST_LABELS: Record<string, string> = {
  providerBenefits:
    "The provider benefits financially on an ongoing basis from the provision of your services (s.61B(2)(a))",
  providerInfluencesFinances:
    "The provider influences or controls the way payments are made to you, or the company's finances (s.61B(2)(c), (d))",
  providerControlsCompany:
    "The provider influences or controls the provision of your services or the company's activities (s.61B(2)(b), (d))",
  providerFacilitatesIncorporation:
    "The provider gives or promotes an undertaking to make good any tax loss, or otherwise sits behind the arrangement (s.61B(2)(e))",
};

/* ------------------------------------------------------------------ */
/* Exported tool config                                                  */
/* ------------------------------------------------------------------ */

export const managedServiceCompanyRiskChecker: GenericTool = {
  kind: "generic",
  slug: "managed-service-company-risk-checker",
  name: "Managed Service Company Risk Checker",
  category: "MSC and IR35 compliance",
  oneLiner:
    "Screen your accountant or provider arrangement against the statutory involvement tests that make a company a Managed Service Company under Chapter 9 ITEPA 2003.",
  metaTitle: "Managed Service Company Risk Checker | MSC Legislation Test",
  metaDescription:
    "Free MSC risk checker for contractors. Answer six questions about your provider arrangement to see whether Chapter 9 ITEPA 2003 (the MSC legislation) could apply and whether the debt-transfer risk is live.",
  intro:
    "The Managed Service Company (MSC) rules, Chapter 9 Part 2 ITEPA 2003, are one of the most serious and least-understood tax risks for contractors. Unlike IR35, the MSC rules can transfer unpaid PAYE and NIC debt to you personally as a director. This checker screens your arrangement against the statutory involvement tests in s.61B(2) ITEPA 2003 and flags whether the accountancy services exclusion in s.61B(3) is likely to protect you. Answer each question about your provider or accountant honestly.",
  ctaLabel:
    "Concerned about your arrangement? Talk to a specialist contractor accountant today →",
  embedHeight: 820,
  fields: [
    {
      id: "mscBusiness",
      label:
        "Does your accountant or provider run a business that promotes or facilitates the use of personal service companies or similar structures for many contractors?",
      type: "toggle",
      default: false,
      help: "A provider is only an MSC Provider if they carry on a business of promoting or facilitating the use of companies by contractors. A genuine accountancy practice advising individual clients is not the same as a scheme operator running a pool of contractor companies.",
    },
    {
      id: "providerBenefits",
      label:
        "Does your provider benefit financially from your company beyond a fixed, flat accountancy fee? (For example: a share of invoices, a percentage of turnover, or a margin on your payments.)",
      type: "toggle",
      default: false,
      help: "s.61B(2)(a): the provider benefits financially on an ongoing basis from the provision of your services. A fixed monthly fee for accountancy work does not satisfy this limb on its own. A percentage, slice, or variable fee linked to your billings points towards it.",
    },
    {
      id: "providerInfluencesFinances",
      label:
        "Does your provider influence or control how your company's money is managed, for example by setting how or when you are paid, running your payroll, or determining your salary or dividend levels?",
      type: "toggle",
      default: false,
      help: "s.61B(2)(c) and (d): the provider influences or controls the way payments are made to you, or the company's finances. Deciding on your behalf when dividends are declared, or running a standard payment schedule across many contractors, can point towards this limb.",
    },
    {
      id: "providerControlsCompany",
      label:
        "Does your provider influence or control what your company does or how you provide your services? (For example: directing where you work, which contracts you take, or the trading name you operate under.)",
      type: "toggle",
      default: false,
      help: "s.61B(2)(b) and (d): the provider influences or controls the provision of your services or the company's activities. Giving administrative support you asked for is different from shaping the company's trading activities.",
    },
    {
      id: "providerFacilitates",
      label:
        "Did your provider introduce you to or set up the company you now use, or do they actively market their service as a ready-made company or scheme?",
      type: "toggle",
      default: false,
      help: "s.61B(1)(d): a provider is only caught if they carry on a business of promoting or facilitating the use of companies to provide individuals' services. Introducing you to an off-the-shelf company, or actively marketing a ready-made scheme, is evidence of that business. A separate limb, s.61B(2)(e), also catches a provider who gives or promotes an undertaking to make good any tax loss.",
    },
    {
      id: "youControl",
      label:
        "Do you make your own decisions about salary levels, dividends, expenses, and company matters, without your provider or accountant instructing you?",
      type: "toggle",
      default: true,
      help: "This is relevant to the accountancy services exemption. Providers who simply advise and leave all decisions to the contractor are far less likely to be MSC Providers. If your provider makes or imposes these decisions for you, that weighs against the exemption.",
    },
  ],

  compute: (v) => {
    const mscBusiness = Boolean(v.mscBusiness);
    const benefits = Boolean(v.providerBenefits);
    const finances = Boolean(v.providerInfluencesFinances);
    const controls = Boolean(v.providerControlsCompany);
    const facilitates = Boolean(v.providerFacilitates);
    const youControl = Boolean(v.youControl);

    // Collect triggered involvement factors
    const triggeredFactors: string[] = [];
    if (benefits) triggeredFactors.push(INVOLVEMENT_TEST_LABELS.providerBenefits);
    if (finances) triggeredFactors.push(INVOLVEMENT_TEST_LABELS.providerInfluencesFinances);
    if (controls) triggeredFactors.push(INVOLVEMENT_TEST_LABELS.providerControlsCompany);
    if (facilitates) triggeredFactors.push(INVOLVEMENT_TEST_LABELS.providerFacilitatesIncorporation);

    const anyInvolvementFactor = triggeredFactors.length > 0;

    // Determine risk band
    // High: provider is running an MSC business AND at least one s.61B(2) involvement factor triggered
    // Review: provider may be running an MSC business OR factors triggered without confirmed MSC business
    // Low: no involvement factors AND provider does not appear to run an MSC business
    let riskBand: "HIGH" | "REVIEW" | "LOW";
    let verdictText: string;
    let tone: "warn" | "good" | "default";
    let positive: boolean;
    let explanationRows: { label: string; value: string; strong?: boolean }[] = [];
    let noteText: string;

    if (mscBusiness && anyInvolvementFactor) {
      riskBand = "HIGH";
      verdictText = "High risk: arrangement shows MSC characteristics";
      tone = "warn";
      positive = false;

      explanationRows = [
        {
          label: "Risk band",
          value: "HIGH: likely MSC under Chapter 9 ITEPA 2003",
          strong: true,
        },
        {
          label: "Involvement factors triggered",
          value: `${triggeredFactors.length} of 4`,
          strong: true,
        },
        ...triggeredFactors.map((f) => ({ label: "Factor", value: f })),
        {
          label: "Consequence",
          value:
            "All income is likely treated as deemed employment income, taxable as PAYE earnings. Your company must account for PAYE and NIC as if you were an employee.",
        },
        {
          label: "Debt-transfer risk",
          value:
            "Under s.688A ITEPA 2003 for PAYE, and the MSC NIC Regulations 2007 for National Insurance, if your company cannot pay the PAYE or NIC due, HMRC can transfer that debt to you personally as a director, to the MSC Provider, or to others who were actively involved in the arrangement. This risk is active.",
          strong: true,
        },
        {
          label: "Recommended action",
          value:
            "Seek specialist advice urgently. If the arrangement is caught, HMRC can issue retrospective assessments. Do not simply switch providers without a formal review of the arrangement history.",
        },
      ];

      noteText =
        "This result indicates a high risk that your arrangement meets the definition of a Managed Service Company under Chapter 9 ITEPA 2003. This is an indicator based on your answers, not a legal determination. HMRC applies a facts-and-circumstances test and the outcome turns on the precise terms of your arrangement with your provider. You should obtain specialist tax advice before drawing any conclusions or taking any action.";
    } else if (mscBusiness || anyInvolvementFactor) {
      riskBand = "REVIEW";
      verdictText = "Review needed: some MSC risk indicators present";
      tone = "default";
      positive = false;

      const reasons: string[] = [];
      if (mscBusiness && !anyInvolvementFactor)
        reasons.push(
          "Your provider may carry on an MSC business, but no s.61B(2) involvement factors were flagged. If any factor applies in practice, the risk increases significantly."
        );
      if (!mscBusiness && anyInvolvementFactor)
        reasons.push(
          `${triggeredFactors.length} s.61B(2) involvement factor(s) were flagged, but you indicated the provider may not carry on an MSC business. If the provider does run such a business, these factors could satisfy s.61B.`
        );

      explanationRows = [
        {
          label: "Risk band",
          value: "REVIEW: indicators present, full picture unclear",
          strong: true,
        },
        {
          label: "Why review is needed",
          value: reasons.join(" "),
        },
        ...triggeredFactors.map((f) => ({ label: "Flagged factor", value: f })),
        {
          label: "Debt-transfer risk",
          value:
            "If the arrangement is caught as an MSC, the debt-transfer provisions (s.688A ITEPA 2003 and the MSC NIC Regulations 2007) can make you personally liable for unpaid PAYE and NIC.",
        },
        {
          label: "Recommended action",
          value:
            "Review the precise terms of your arrangement with a specialist. Consider whether a fee-only accountant who leaves all decisions to you would better suit your needs.",
        },
      ];

      noteText =
        "This result indicates some MSC risk indicators in your arrangement. The checker is not a legal determination. The accountancy services exemption and the precise facts of your arrangement matter significantly. A specialist contractor accountant can review your specific circumstances.";
    } else {
      riskBand = "LOW";
      verdictText = "Lower risk: arrangement does not show MSC characteristics";
      tone = "good";
      positive = true;

      explanationRows = [
        {
          label: "Risk band",
          value: "LOW: no MSC involvement factors identified",
          strong: true,
        },
        {
          label: "Why",
          value:
            youControl
              ? "Your provider does not appear to carry on an MSC business and you control your own company finances and decisions. This is consistent with a standard accountancy services arrangement, which is explicitly excluded from the MSC rules."
              : "No s.61B(2) involvement factors were flagged and your provider does not appear to carry on an MSC business, though you may wish to confirm that you retain control of salary and dividend decisions.",
        },
        {
          label: "Accountancy services exemption",
          value:
            "A fee-only adviser who provides professional accountancy services and leaves all trading and financial decisions to the contractor is not an MSC Provider under the statutory definition.",
        },
        {
          label: "Ongoing care",
          value:
            "If your provider's model changes, or if they begin to influence your financial decisions, re-run this check. The MSC rules apply based on the facts at the relevant time.",
        },
      ];

      noteText =
        "This result indicates a lower risk based on your answers. It is not a guarantee that the MSC rules do not apply. The assessment depends on the precise facts of your arrangement. If you are uncertain about any aspect, consult a specialist contractor accountant.";
    }

    return {
      headline: {
        label: "MSC risk assessment",
        value: riskBand,
        sub: verdictText,
        tone,
      },
      verdict: { text: verdictText, positive },
      rows: explanationRows,
      note: noteText,
    };
  },

  explainer: {
    heading: "What are the Managed Service Company rules and why do they matter?",
    paragraphs: [
      "The Managed Service Company (MSC) rules, in Chapter 9 Part 2 ITEPA 2003 (ss.61A to 61J), are a separate and in some ways harsher anti-avoidance regime than IR35. Where IR35 targets arrangements where a contractor works like an employee through a personal service company, the MSC rules target contractors whose company is controlled or heavily influenced by a third-party provider, typically an accountancy or payroll scheme operator, rather than by the contractor themselves. The key difference: the MSC rules apply based on the nature of the provider's involvement in your company, not on the nature of the work you carry out for clients.",
      "A company is an MSC only where all of the conditions in s.61B(1) are met, and the one that matters most in practice is s.61B(1)(d): an MSC Provider (a person carrying on a business of promoting or facilitating the use of companies to provide individuals' services) is involved with the company. What counts as being involved is set out separately in s.61B(2), which lists five ways a provider can be involved: (a) benefiting financially on an ongoing basis from the provision of the services; (b) influencing or controlling the provision of those services; (c) influencing or controlling the way payments are made to the worker; (d) influencing or controlling the company's finances or any of its activities; or (e) giving or promoting an undertaking to make good any tax loss. Any one of these limbs, combined with a provider that carries on an MSC business, is enough for the regime to apply.",
      "Where the MSC rules apply, all income your company receives for your services is treated as deemed employment income and subject to PAYE and NIC, just as if you were directly employed. Unlike IR35, there is no deemed payment calculation or status determination statement process: the charge is automatic based on the structure of the arrangement. The rules also carry a particularly serious consequence: under s.688A ITEPA 2003 for PAYE (inserted by Finance Act 2007) and the equivalent Social Security Contributions (MSC) Regulations 2007 for NIC, if the company fails to pay the PAYE or NIC due, HMRC may transfer that debt directly to the director (you), to the MSC Provider, or to others who encouraged or were actively involved in the arrangement. This personal debt-transfer risk makes MSC exposure significantly more dangerous than a standard IR35 dispute.",
      "The accountancy and legal services exclusion (s.61B(3)) provides that a person does not fall within the MSC Provider condition (s.61B(1)(d)) merely by providing legal or accountancy services in a professional capacity. In practice this protects a genuine accountancy practice that charges a fixed fee, provides compliance services (bookkeeping, accounts, tax returns), and leaves all decisions about salary, dividends, expenses and trading to the contractor. The exclusion is not a blanket safe harbour: HMRC guidance and the Christianuyi litigation confirm that where a provider goes beyond ordinary professional services and starts to influence or control financial decisions, or benefits financially from the arrangement, it can still be caught. The real risk arises where a provider operates a scheme across many contractors, shares in the financial upside, and makes or imposes decisions that properly belong to the director.",
    ],
  },

  faqs: [
    {
      question: "What is a Managed Service Company?",
      answer:
        "A Managed Service Company is a personal service company where a third-party MSC Provider is involved with it in one or more of the ways set out in s.61B(2) ITEPA 2003. The provider must also carry on a business of promoting or facilitating the use of such companies (s.61B(1)(d)). Where the s.61B(1) conditions are met, the worker's income is taxed as employment income under Chapter 9 ITEPA 2003, regardless of whether their working arrangements would otherwise be outside IR35.",
    },
    {
      question: "How is the MSC legislation different from IR35?",
      answer:
        "IR35 (Chapter 8 ITEPA 2003) applies where the nature of the work means the contractor would have been an employee if engaged directly. The MSC rules (Chapter 9) apply where the nature of the provider's involvement in the contractor's company means the arrangement is not genuinely contractor-controlled. A contractor can be outside IR35 on their working practices yet still caught by the MSC rules if their accountant or scheme operator meets the s.61B tests. The MSC rules also carry the debt-transfer risk, which IR35 does not.",
    },
    {
      question: "What are the s.61B(2) involvement tests?",
      answer:
        "Under s.61B(2) ITEPA 2003, an MSC Provider is involved with a company if they: (a) benefit financially on an ongoing basis from the provision of the services; (b) influence or control the provision of those services; (c) influence or control the way payments are made to the worker; (d) influence or control the company's finances or any of its activities; or (e) give or promote an undertaking to make good any tax loss. Only one of these limbs needs to be met. The provider must also carry on a business of promoting or facilitating the use of companies (s.61B(1)(d)) for the regime to apply.",
    },
    {
      question: "What is the debt-transfer risk and who does it affect?",
      answer:
        "If a company is caught by the MSC rules and fails to pay the PAYE and NIC due on its income, s.688A ITEPA 2003 (for PAYE) and the Social Security Contributions (MSC) Regulations 2007 (for NIC) allow HMRC to transfer that debt to other parties. The debt can be transferred to the director or associate of the MSC (the contractor personally), to the MSC Provider, and to any other person who directly or indirectly encouraged or was actively involved in the provision of the individual's services. This means that if your company cannot or does not pay, you can become personally liable for tax debts that may cover multiple years. This risk is active as soon as the arrangement is caught.",
    },
    {
      question: "Is my accountant an MSC Provider?",
      answer:
        "Most qualified contractor accountants are not MSC Providers. The accountancy and legal services exclusion in s.61B(3) ITEPA 2003 means a person is not treated as involved with a company merely by providing professional accountancy services where the contractor controls their own company. A firm that charges a fixed fee, provides compliance services, and leaves salary, dividend, and trading decisions to you is not an MSC Provider. The risk arises with scheme operators who run a business of putting many contractors into standardised company structures, take a share of billings, or make financial decisions on the contractor's behalf.",
    },
    {
      question: "Can the MSC rules apply retrospectively?",
      answer:
        "Yes. If HMRC determines that a company was an MSC in earlier tax years, it can issue assessments for those years. There is no time limit shorter than the standard discovery assessment rules, which are extended where there is a loss of tax brought about carelessly or deliberately. Contractors who have been in MSC arrangements should take advice about their exposure for prior years, not just the current year.",
    },
    {
      question: "What is the accountancy services exclusion?",
      answer:
        "Section 61B(3) ITEPA 2003 provides that a person is not treated as involved with a company merely by providing legal or accountancy services in a professional capacity. In practice this protects a genuine accountancy business where the contractor genuinely controls their company and the accountant's role is advisory and compliance-based. Where an accountant goes beyond ordinary professional services and begins to influence or control financial decisions, or benefits financially from the contractor's income, the exclusion may not apply. This was the central issue in the Christianuyi Ltd case, where the provider was found to be an MSC Provider despite describing its services as accountancy.",
    },
  ],
};
