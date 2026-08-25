import snapshot from "@/data/uk-contractor-insolvency-index.json";
import type { ContractorInsolvencyIndexSnapshot } from "@/lib/research/contractor-insolvency-index";

// Static: derived purely from the committed snapshot, so it can be prerendered.
export const dynamic = "force-static";

/**
 * Press-ready CSV of the monthly insolvency series behind the UK Contractor
 * Insolvency Index. Always in sync with the page because both read the same
 * snapshot.
 */
export function GET() {
  const data = snapshot as unknown as ContractorInsolvencyIndexSnapshot;

  const procCols = [
    "cvl",
    "compulsory",
    "administration",
    "administration_to_cvl",
    "cva",
    "receivership",
    "moratorium",
    "total",
  ];

  const sectionByMonth = new Map(data.sections.monthly.map((s) => [s.month, s]));
  const capturedByMonth = new Map(data.captured.monthly.map((c) => [c.month, c.total]));

  const header = ["month", ...procCols, "section_j", "section_m", "captured_62_70_71"].join(",");
  const rows = data.insolvencies.monthly.map((m) => {
    const vals = procCols.map((c) => String((m as unknown as Record<string, unknown>)[c] ?? 0));
    const s = sectionByMonth.get(m.month);
    const captured = capturedByMonth.get(m.month) ?? 0;
    return [m.month, ...vals, s?.J ?? 0, s?.M ?? 0, captured].join(",");
  });

  const csv = [
    "# UK Contractor Insolvency Index: monthly company insolvencies by procedure type, SIC section and captured division",
    "# SIC Section J (Information and communication) + Section M (Professional, scientific and technical activities).",
    "# captured_62_70_71 = insolvencies in SIC divisions 62 (IT consultancy), 70 (management consultancy), 71 (engineering), a subset of the J+M total.",
    "# England, Wales and Scotland.",
    "# Source: Insolvency Service, Company Insolvency Statistics (Open Government Licence v3.0).",
    `# Generated: ${data.meta.generated_at}. Data through: ${data.meta.data_through}.`,
    "# Free to reuse with attribution to Contractor Tax Accountants (contractortaxaccountants.co.uk).",
    header,
    ...rows,
  ].join("\n");

  return new Response(csv + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-contractor-insolvency-index.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
