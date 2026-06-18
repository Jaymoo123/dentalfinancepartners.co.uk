import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "../format";

export const cisGpsEligibilityChecker: GenericTool = {
  kind: "generic",
  slug: "cis-gps-eligibility-checker",
  name: "CIS Gross Payment Status Eligibility Checker",
  category: "CIS Compliance",
  oneLiner:
    "Check whether you qualify for CIS Gross Payment Status and eliminate the 20% deduction from your payments entirely.",
  metaTitle: "CIS Gross Payment Status Eligibility Checker | 2026/27",
  metaDescription:
    "Check if you qualify for CIS Gross Payment Status. Answer five questions about your business type, turnover and compliance record to see your GPS eligibility and what to do next.",
  intro:
    "Gross Payment Status (GPS) means HMRC pays you in full with no CIS deduction. To qualify, you must pass three tests. This checker tells you whether you are likely to qualify based on your current figures, and what any gaps mean for your application.",
  ctaLabel: "Apply for GPS with specialist support →",
  embedHeight: 680,
  fields: [
    {
      id: "entityType",
      label: "Business structure",
      type: "select",
      default: "sole_trader",
      options: [
        { value: "sole_trader", label: "Sole trader" },
        { value: "partnership", label: "Partnership" },
        { value: "limited", label: "Limited company" },
        {
          value: "closely_controlled",
          label: "Closely controlled company (5 or fewer controllers)",
        },
      ],
    },
    {
      id: "annualTurnover",
      label: "Annual net CIS turnover (last 12 months, excluding VAT and materials)",
      type: "currency",
      default: 35000,
      step: 1000,
      help: "Your net CIS turnover: total CIS receipts minus VAT and materials. This is the figure HMRC tests against the threshold.",
    },
    {
      id: "partners",
      label: "Number of partners / directors",
      type: "number",
      default: 1,
      min: 1,
      max: 20,
      help: "For partnerships and limited companies, the turnover threshold is multiplied by the number of partners or directors.",
    },
    {
      id: "filedOnTime",
      label:
        "All tax returns filed on time for the past 12 months (SA, PAYE, VAT, CIS300)",
      type: "toggle",
      default: true,
    },
    {
      id: "noOverdueTax",
      label: "No overdue tax payments in the past 12 months",
      type: "toggle",
      default: true,
    },
  ],
  compute: (v) => {
    const entityType = v.entityType as string;
    const turnover = Number(v.annualTurnover);
    const partners = Math.max(1, Number(v.partners));
    const filedOnTime = Boolean(v.filedOnTime);
    const noOverdueTax = Boolean(v.noOverdueTax);

    // Turnover threshold per entity type.
    // Sole trader: £30,000; Partnership: £30,000/partner (min £30k);
    // Limited: £30,000/director (min £30k); Closely controlled: £30,000/controller.
    const baseThreshold = 30000;
    const threshold =
      entityType === "sole_trader" ? baseThreshold : baseThreshold * partners;

    // Business test is assumed passed: the subcontractor is using a CIS tool,
    // indicating UK construction activity through a bank account.
    const passesBusinessTest = true;
    const passesTurnoverTest = turnover >= threshold;
    const passesComplianceTest = filedOnTime && noOverdueTax;

    const allPass =
      passesBusinessTest && passesTurnoverTest && passesComplianceTest;

    const failures: string[] = [];
    if (!passesTurnoverTest)
      failures.push(
        `Turnover test: your net CIS turnover (${gbp(turnover)}) is below the threshold for your structure (${gbp(threshold)})`
      );
    if (!filedOnTime)
      failures.push("Compliance test: you have late returns in the past 12 months");
    if (!noOverdueTax)
      failures.push("Compliance test: you have overdue tax payments");

    const annualSavingAt20 = turnover * 0.2;

    return {
      headline: {
        label:
          allPass || failures.length === 0
            ? "Likely eligible for GPS"
            : `${failures.length} test${failures.length > 1 ? "s" : ""} not met`,
        value: allPass ? "Apply now" : "Not yet eligible",
        sub: allPass
          ? `Eliminating the 20% deduction could save you ${gbp(annualSavingAt20)} in annual cash flow`
          : failures[0],
      },
      rows: [
        {
          label: "Business test (UK construction, bank account)",
          value: "Pass",
        },
        {
          label: `Turnover test (threshold: ${gbp(threshold)})`,
          value: passesTurnoverTest
            ? `Pass — ${gbp(turnover)} meets the threshold`
            : `Fail — ${gbp(threshold - turnover)} short of ${gbp(threshold)}`,
        },
        {
          label: "Compliance test (returns and payments)",
          value: passesComplianceTest ? "Pass" : "Fail",
        },
        {
          label: "GPS result",
          value: allPass ? "Likely eligible" : "Not currently eligible",
          strong: true,
        },
        {
          label: "Potential annual cash flow benefit at 20% rate",
          value: gbp(annualSavingAt20),
        },
      ],
      note: allPass
        ? "This indicates you are likely to meet the GPS qualifying tests. HMRC carries out its own verification and the final decision rests with them. Apply through your HMRC Business Tax Account or through an agent. From 6 April 2026, GPS can be revoked immediately if HMRC finds supply-chain fraud connections."
        : `To qualify, you must pass all three tests. ${failures.join(". ")}.`,
    };
  },
  explainer: {
    heading: "The three GPS qualifying tests",
    paragraphs: [
      "The business test requires that you carry out construction operations in the UK within the meaning of the CIS rules and that you receive payments through a bank account. Most registered CIS subcontractors satisfy this test automatically, and it is rarely the reason an application fails.",
      "The turnover test compares your net CIS turnover (total CIS receipts minus VAT and materials) over the last 12 months against the threshold for your business structure. For a sole trader the threshold is £30,000. For a partnership it is £30,000 per partner or £100,000 for the partnership as a whole. For a limited company it is £30,000 per director or £100,000 in total. For a closely controlled company (five or fewer controllers) the threshold is £30,000 per controller. Net turnover is what matters: labour-only subcontractors will find their net figure equals their gross CIS income, while those who supply significant materials may find their net turnover is considerably lower than their invoice total.",
      "The compliance test requires that all Self Assessment, PAYE, VAT and CIS300 returns were filed on time and that no tax payments are overdue over the previous 12 months. From April 2026, HMRC has the power to revoke GPS immediately, with no advance notice, where a contractor is found to have connections with fraudulent supply-chain activity on a 'knew or should have known' standard. A five-year reapplication ban applies, and directors of limited companies can face personal penalties of up to 30% of the tax HMRC considers lost.",
    ],
  },
  faqs: [
    {
      question: "How much cash flow does GPS actually save?",
      answer:
        "At the 20% deduction rate on £40,000 net CIS income, that is £8,000 per year that stays in your business instead of being withheld by HMRC until you reclaim it. At £80,000 net CIS income it is £16,000. GPS is one of the highest-value financial improvements available to a CIS subcontractor because it eliminates the working capital drag of waiting for a rebate.",
    },
    {
      question: "What changed with GPS in April 2026?",
      answer:
        "From 6 April 2026, HMRC can revoke GPS immediately with no advance notice if a contractor is found to have connections with fraudulent supply-chain activity, on a 'knew or should have known' standard. A five-year reapplication ban applies. Directors of limited companies can face personal penalties of up to 30% of the tax HMRC considers lost. These changes were introduced to tackle organised fraud within CIS supply chains.",
    },
    {
      question: "How do I apply for GPS?",
      answer:
        "Apply through HMRC's Business Tax Account online or via an agent. You will need your UTR, National Insurance number (sole traders) or company registration number (limited companies), and a record of your CIS income for the past 12 months. Approval typically takes four to six weeks. An agent can apply on your behalf and handle any queries HMRC raises during verification.",
    },
    {
      question: "How long does GPS last?",
      answer:
        "HMRC reviews GPS status each April using the Tax Treatment Qualification Test. If you continue to meet the three tests, GPS is maintained. If a return is filed late or a payment is missed during the year, status can be removed without waiting for the annual review. Keeping your compliance record clean throughout the year is therefore as important as the initial application.",
    },
    {
      question: "Can a partnership hold GPS?",
      answer:
        "Yes. A partnership applies as a business entity and holds GPS in the name of the firm. The turnover test is £30,000 per partner or £100,000 for the partnership as a whole. All partners' compliance records are considered, so a late return from any one partner can affect the application for the whole firm.",
    },
    {
      question: "What counts as net CIS turnover?",
      answer:
        "Your total CIS receipts minus VAT and minus the cost of materials you supplied. Labour-only subcontractors will find their net turnover equals their gross CIS income because there are no materials to deduct. Subcontractors who supply significant materials may find their net turnover is considerably lower than their invoice total, which can affect whether they clear the threshold. Only materials you actually supplied count as a deduction; plant hire and other costs do not reduce your net figure.",
    },
  ],
};
