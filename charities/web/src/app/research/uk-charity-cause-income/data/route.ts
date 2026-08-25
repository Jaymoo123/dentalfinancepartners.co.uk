import type { CauseIncomeSnapshot } from "@/lib/research/cause-income";
import snapshot from "@/data/charity-cause-income.json";

export const dynamic = "force-static";

export function GET() {
  const data = snapshot as unknown as CauseIncomeSnapshot;

  const lines = [
    "# UK Charity Cause Income and Reserves Health Index",
    "# Source: Charity Commission full-register extract (OGL v3.0).",
    `# Generated: ${data.meta.generated_at}. England and Wales charities.`,
    "# Free to reuse with attribution.",
    "",
    "cause_code,cause_label,charity_count,median_income,median_reserves_months,under_3_months_reserves_pct",
    ...data.cause_income.map(
      (r) =>
        `${r.cause_code},"${r.cause_label}",${r.charity_count},${r.median_income},${r.median_reserves_months ?? ""},${r.under_3_months_reserves_pct ?? ""}`,
    ),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-charity-cause-income.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
