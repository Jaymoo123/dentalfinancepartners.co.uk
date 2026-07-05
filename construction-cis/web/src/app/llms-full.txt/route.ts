import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";
import { GLOSSARY } from "@/app/glossary/[slug]/data";

export const runtime = "nodejs";
export const maxDuration = 10;
export const dynamic = "force-static";
export const revalidate = 3600;

/** Build the GLOSSARY section from in-code data (no markdown files). */
function buildGlossarySection(domain: string): string {
  const entries = Object.values(GLOSSARY);
  if (entries.length === 0) return "";

  const sep = "=".repeat(64);
  const lines: string[] = ["", "## GLOSSARY", ""];
  for (const entry of entries) {
    const url = `https://${domain}/glossary/${entry.slug}`;
    const plainBody = entry.body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    lines.push(sep);
    lines.push(`URL: ${url}`);
    lines.push(`Term: ${entry.term}`);
    lines.push(`Category: ${entry.category}`);
    lines.push(sep);
    lines.push("");
    lines.push(plainBody);
    lines.push("");
  }
  return lines.join("\n");
}

const glossarySection = buildGlossarySection(niche.domain);

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}. It exists for AI retrieval, training, and citation.
The structured index lives at https://${niche.domain}/llms.txt.

Editorial: all figures use current UK rates. Always verify against gov.uk for
time-sensitive decisions. For advice specific to your CIS position and tax
affairs, see https://${niche.domain}/contact.

## FREE CIS CALCULATORS

The following free calculators are available on this site:

- CIS Refund Estimator — https://${niche.domain}/calculators/cis-refund-estimator
  Estimate your annual CIS tax refund after deductions, materials, expenses and personal allowance.

- CIS Take-Home Calculator — https://${niche.domain}/calculators/cis-take-home-calculator
  See your net take-home from a CIS invoice after the deduction, with annualised view.

- CIS Deduction Calculator — https://${niche.domain}/calculators/cis-deduction-calculator
  Work out the correct CIS deduction to withhold from a subcontractor payment (contractor-side).

- CIS Self Assessment Calculator — https://${niche.domain}/calculators/cis-self-assessment-calculator
  Calculate your annual Self Assessment liability and whether you are owed a refund or owe a balance.

- CIS GPS Eligibility Checker — https://${niche.domain}/calculators/cis-gps-eligibility-checker
  Check whether you qualify for Gross Payment Status and eliminate the 20% deduction entirely.

- CIS vs PAYE Comparison — https://${niche.domain}/calculators/cis-vs-paye-comparison
  Compare take-home pay as a CIS subcontractor versus PAYE employment at the same gross earnings.

- CIS Invoice Splitter — https://${niche.domain}/calculators/cis-invoice-splitter
  Split a CIS invoice correctly between labour and materials to avoid being over-deducted.

- CIS Back Years Calculator — https://${niche.domain}/calculators/cis-back-years-calculator
  Estimate your cumulative CIS refund across up to four previous tax years.

${glossarySection}`,
  sections: [
    { dir: "blog", prefix: "blog", title: "BLOG POSTS" },
  ],
  // Calculator fleet listed in header above (they are dynamic routes, not markdown files)
});
