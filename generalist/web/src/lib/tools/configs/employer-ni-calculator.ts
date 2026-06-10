import type { BespokeTool } from "@accounting-network/web-shared/tools/types";

/**
 * Employer NI & Cost-to-Hire is registered as kind: "bespoke" because it requires
 * a dynamic employee list (add/remove rows) that cannot be expressed as a fixed
 * GenericTool field list without a large contract extension.
 *
 * The compute logic lives in lib/tools/compute/employer-ni.ts (tested separately).
 * The rendered component remains at app/calculators/employer-ni-calculator/page.tsx.
 */
export const employerNiTool: BespokeTool = {
  kind: "bespoke",
  slug: "employer-ni-calculator",
  name: "Employer NI & Cost-to-Hire",
  category: "Payroll",
  oneLiner: "Full annual employment cost across your payroll with employer NI at 15%, Employment Allowance offset, and 3% auto-enrolment pension.",
  embedHeight: 700,
};
