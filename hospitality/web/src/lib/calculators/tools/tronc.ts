import type { GenericTool } from "@accounting-network/web-shared/tools/types";
import { gbp } from "@accounting-network/web-shared/tools/format";

// Tax constants 2026/27
// Source: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
const EMPLOYER_NIC_RATE = 0.15;
const EMPLOYEE_NIC_RATE = 0.08;
const BASIC_RATE_TAX = 0.2;

// Tronc via independent troncmaster: NIC-free (both employer and employee) but
// PAYE income tax still due. Source: HMRC NIM02922 / E24 booklet.
// Employer direct allocation: tips treated as earnings, employer NIC at 15%,
// employee NIC at 8%. No secondary threshold benefit (tips are not regular wages
// for ST purposes when paid direct — HMRC treats them as general earnings).

export function calcTronc(
  totalTipsPool: number,
  numEmployees: number,
  allocationMethod: "tronc" | "employer",
  distributionMethod: "equal" | "hours" | "custom",
  employeeHours?: number[],
  customShares?: number[],
): {
  grossShares: number[];
  employerNicTotal: number;
  employerNicSaved: number;
  employeeTakeHomes: number[];
  employerTotalCost: number;
} {
  const n = numEmployees;
  let shares: number[];

  if (distributionMethod === "equal") {
    shares = Array(n).fill(totalTipsPool / n);
  } else if (distributionMethod === "hours" && employeeHours && employeeHours.length === n) {
    const totalHours = employeeHours.reduce((a, b) => a + b, 0);
    shares = totalHours === 0 ? Array(n).fill(0) : employeeHours.map((h) => (h / totalHours) * totalTipsPool);
  } else if (distributionMethod === "custom" && customShares && customShares.length === n) {
    const totalShares = customShares.reduce((a, b) => a + b, 0);
    shares = totalShares === 0 ? Array(n).fill(0) : customShares.map((s) => (s / totalShares) * totalTipsPool);
  } else {
    shares = Array(n).fill(totalTipsPool / n);
  }

  if (allocationMethod === "tronc") {
    // No employer NIC, no employee NIC, PAYE income tax at basic rate
    const takeHomes = shares.map((s) => s * (1 - BASIC_RATE_TAX));
    return {
      grossShares: shares,
      employerNicTotal: 0,
      employerNicSaved: shares.reduce((a, s) => a + s * EMPLOYER_NIC_RATE, 0),
      employeeTakeHomes: takeHomes,
      employerTotalCost: totalTipsPool, // no NIC on top
    };
  } else {
    // Employer direct: employer NIC + employee NIC + income tax
    const employerNicTotal = shares.reduce((a, s) => a + s * EMPLOYER_NIC_RATE, 0);
    const takeHomes = shares.map((s) => s * (1 - EMPLOYEE_NIC_RATE - BASIC_RATE_TAX));
    return {
      grossShares: shares,
      employerNicTotal,
      employerNicSaved: 0,
      employeeTakeHomes: takeHomes,
      employerTotalCost: totalTipsPool + employerNicTotal,
    };
  }
}

export const troncCalculator: GenericTool = {
  kind: "generic",
  slug: "tronc-tips-paye-nic-calculator",
  name: "Tronc and Tips PAYE Calculator",
  category: "Tronc, Tips and Payroll",
  oneLiner:
    "Compare tronc (NIC-free via independent troncmaster) against direct employer allocation to see employee take-home and how much employer NIC you save.",
  metaTitle: "Tronc Calculator | Tips PAYE and NIC 2026/27",
  metaDescription:
    "Calculate employee take-home on tips under tronc (NIC-free via an independent troncmaster, HMRC NIM02922) vs direct employer allocation, and see the employer NIC saving. 2026/27 rates.",
  intro:
    "A tronc run by an independent troncmaster is exempt from both employer and employee National Insurance, though PAYE income tax still applies. Enter the tips pool, number of staff and allocation method to see take-home pay and the NIC saving.",
  ctaLabel: "Get help setting up a compliant tronc scheme",
  embedHeight: 720,
  fields: [
    {
      id: "totalTipsPool",
      label: "Total tips pool",
      type: "currency",
      default: 5000,
      step: 500,
      help: "Total tips and service charges to distribute in the period (e.g. one month).",
    },
    {
      id: "numEmployees",
      label: "Number of employees in the pool",
      type: "number",
      default: 10,
      min: 1,
      max: 100,
      step: 1,
      help: "Employees sharing the pool. This calculator distributes equally across all of them.",
    },
    {
      id: "allocationMethod",
      label: "Allocation method",
      type: "select",
      default: "tronc",
      options: [
        { value: "tronc", label: "Tronc (independent troncmaster, NIC-free)" },
        { value: "employer", label: "Employer direct allocation (employer and employee NIC due)" },
      ],
      help: "Under a tronc run by an independent troncmaster, neither employer nor employee NIC is due. PAYE income tax applies either way.",
    },
  ],
  compute: (v) => {
    const pool = Math.max(0, Number(v.totalTipsPool));
    const n = Math.max(1, Math.round(Number(v.numEmployees)));
    const method = v.allocationMethod as "tronc" | "employer";
    const result = calcTronc(pool, n, method, "equal");

    const perEmployee = pool / n;
    const takeHome = result.employeeTakeHomes[0] ?? 0;

    if (method === "tronc") {
      return {
        headline: {
          label: "Each employee takes home",
          value: gbp(takeHome),
          sub: `After 20% income tax on ${gbp(perEmployee)} gross tip share (no NIC deducted)`,
          tone: "good",
        },
        rows: [
          { label: "Total tips pool", value: gbp(pool) },
          { label: "Gross tip share per employee", value: gbp(perEmployee), strong: true },
          { label: "Income tax deducted (20% basic rate)", value: gbp(perEmployee * BASIC_RATE_TAX) },
          { label: "Employee NIC", value: "£0 (exempt via tronc)" },
          { label: "Employee take-home per person", value: gbp(takeHome), strong: true },
          { label: "Employer NIC cost", value: "£0 (exempt via tronc)" },
          { label: "Employer NIC saving vs direct allocation", value: gbp(result.employerNicSaved), strong: true },
        ],
        note: "Tronc payments made by an independent troncmaster are exempt from employer and employee National Insurance Contributions (HMRC NIM02922 / E24). PAYE income tax at the employee's marginal rate still applies. This calculation assumes basic-rate tax (20%) for all employees.",
      };
    } else {
      return {
        headline: {
          label: "Each employee takes home",
          value: gbp(takeHome),
          sub: `After 20% income tax and 8% employee NIC on ${gbp(perEmployee)} gross`,
          tone: "warn",
        },
        rows: [
          { label: "Total tips pool", value: gbp(pool) },
          { label: "Gross tip share per employee", value: gbp(perEmployee), strong: true },
          { label: "Income tax (20% basic rate)", value: gbp(perEmployee * BASIC_RATE_TAX) },
          { label: "Employee NIC (8%)", value: gbp(perEmployee * EMPLOYEE_NIC_RATE) },
          { label: "Employee take-home per person", value: gbp(takeHome), strong: true },
          { label: "Employer NIC (15% on whole pool)", value: gbp(result.employerNicTotal), strong: true },
          { label: "Total cost to employer", value: gbp(result.employerTotalCost) },
        ],
        note: "Under direct employer allocation, tips are treated as general earnings. Employer NIC at 15% is due on the full tips amount (no secondary threshold benefit applies to discretionary tip payments). Switch to tronc to eliminate NIC for both parties.",
      };
    }
  },
  explainer: {
    heading: "How tronc and tips tax works in 2026/27",
    paragraphs: [
      "A tronc is a separate pay arrangement, run by an independent troncmaster who is not the employer, that distributes tips and service charges to staff. The critical tax advantage is that tronc payments are exempt from both employer and employee National Insurance Contributions, under HMRC's longstanding guidance in the Employment Income Manual and the E24 booklet.",
      "PAYE income tax still applies to tronc payments at the employee's normal marginal rate. The troncmaster must operate a PAYE scheme, report payments to HMRC, and deduct income tax before paying employees. The NIC exemption is the only relief: it is not a way to avoid income tax.",
      "If the employer allocates tips directly (adding them to pay slips as earnings), both employer NIC at 15% and employee NIC at 8% apply to the full amount. On a £5,000 monthly tips pool across 10 employees, that is £750 in employer NIC that disappears under a properly run tronc.",
      "The Employment (Allocation of Tips) Act 2023 (effective October 2024) requires employers to pass 100% of tips to staff fairly and transparently, with a written policy. It does not change the tax treatment, but it does mean all tips and service charges must now be tracked and distributed, making a formal tronc arrangement more practical than ad hoc cash distribution.",
    ],
  },
  faqs: [
    {
      question: "Is tronc exempt from National Insurance?",
      answer:
        "Yes, when the tronc is run by an independent troncmaster who is not the employer. Both employer NIC and employee NIC are exempt. PAYE income tax still applies at the employee's normal rate. The exemption does not apply if the employer controls the distribution.",
    },
    {
      question: "Does the 2023 Allocation of Tips Act change the NIC position?",
      answer:
        "No. The Act (in force from October 2024) requires employers to allocate 100% of tips to staff fairly and to publish a tips policy, but it does not alter the tax or NIC treatment of those payments. Tronc via an independent troncmaster remains NIC-free.",
    },
    {
      question: "What does a troncmaster have to do?",
      answer:
        "The troncmaster must be independent of the employer, operate their own PAYE scheme for tronc payments, calculate and deduct income tax, report to HMRC under RTI, and distribute net payments to staff. Many hospitality businesses use a specialist tronc provider.",
    },
    {
      question: "Do employees pay income tax on tips through tronc?",
      answer:
        "Yes. PAYE income tax is deducted at source by the troncmaster using each employee's tax code. The NIC exemption is the only relief: it does not reduce income tax liability.",
    },
    {
      question: "What happens if the employer keeps any of the tips?",
      answer:
        "Since October 2024 this is unlawful under the Employment (Allocation of Tips) Act 2023. 100% of tips and service charges must be passed to workers, and any deduction by the employer (other than PAYE income tax) is prohibited.",
    },
  ],
};
