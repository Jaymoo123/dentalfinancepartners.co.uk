import snapshot from "@/data/uk-child-maintenance-tracker.json";
import { siteConfig } from "@/config/site";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the quarterly series behind the UK Child Maintenance Tracker.
 * Always in sync with the page because both read the same snapshot.
 */
export function GET() {
  const data = snapshot as {
    meta: { generated_at: string };
    quarterly: Record<string, number | string | null>[];
  };

  const cols = [
    "quarter",
    "maintenance_due_total_gbp_m",
    "maintenance_due_direct_pay_gbp_m",
    "maintenance_due_collect_and_pay_gbp_m",
    "collect_and_pay_paid_gbp_m",
    "collect_and_pay_unpaid_gbp_m",
    "collect_and_pay_paid_some_pct",
    "applications",
    "cumulative_arrears_since_2012_gbp_m",
  ];

  const rows = data.quarterly.map((q) =>
    cols.map((c) => (q[c] === null || q[c] === undefined ? "" : String(q[c]))).join(","),
  );

  const csv = [
    "# UK Child Maintenance Tracker: Child Maintenance Service quarterly money and compliance series, Great Britain",
    "# Source: Department for Work and Pensions, Child Maintenance Service statistics (Open Government Licence v3.0).",
    "# Amounts in GBP millions as published. Blank = not published; values are never estimated.",
    `# Generated: ${data.meta.generated_at}.`,
    `# Free to reuse with attribution to ${siteConfig.name}.`,
    cols.join(","),
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-child-maintenance-tracker.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
