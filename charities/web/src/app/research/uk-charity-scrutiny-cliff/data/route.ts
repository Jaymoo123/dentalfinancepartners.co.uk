import type { ScrutinyCliffSnapshot } from "@/lib/research/scrutiny-cliff";
import snapshot from "@/data/charity-scrutiny-cliff.json";

export const dynamic = "force-static";

export function GET() {
  const data = snapshot as unknown as ScrutinyCliffSnapshot;

  const lines = [
    "# UK Charity Scrutiny Cliff-Edge Monitor",
    "# Source: Charity Commission full-register extract (OGL v3.0).",
    `# Generated: ${data.meta.generated_at}. England and Wales active charities.`,
    `# Cliff margin: ${data.headline.cliff_margin_pct}% below each threshold.`,
    "# Free to reuse with attribution.",
    "",
    "section,key,label,threshold,cliff_floor,charities_in_cliff,charities_just_crossed",
    ...data.cliff_edges.map(
      (e) =>
        `cliff_edge,${e.key},"${e.label}",${e.threshold},${e.cliff_floor},${e.charities_in_cliff},${e.charities_just_crossed}`,
    ),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="uk-charity-scrutiny-cliff.csv"',
      "cache-control": "public, max-age=3600",
    },
  });
}
