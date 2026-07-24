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
time-sensitive decisions. For advice specific to your estate and probate
affairs, see https://${niche.domain}/contact.

## FREE PROBATE CALCULATORS

The following free calculators are available on this site:

- Inheritance Tax Calculator: https://${niche.domain}/calculators/inheritance-tax-calculator
  Estimate the inheritance tax due on an estate after the nil-rate band, reliefs and exemptions.

- Estate Value Calculator: https://${niche.domain}/calculators/estate-value-calculator
  Work out the net value of an estate for probate, after debts, funeral costs and liabilities.

- Nil-Rate Band Calculator: https://${niche.domain}/calculators/nil-rate-band-calculator
  Work out how much nil-rate band and residence nil-rate band is available to the estate.

- Probate Fee Calculator: https://${niche.domain}/calculators/probate-fee-calculator
  Calculate the probate application fee and any solicitor costs for administering the estate.

- Residence Nil-Rate Band Eligibility Checker: https://${niche.domain}/calculators/residence-nil-rate-band-eligibility-checker
  Check whether the estate qualifies for the residence nil-rate band and how much it is reduced by.

- DIY Probate vs Solicitor Comparison: https://${niche.domain}/calculators/diy-probate-vs-solicitor-comparison
  Compare the cost of handling probate yourself versus instructing a solicitor.

- Intestacy Calculator: https://${niche.domain}/calculators/intestacy-calculator
  Work out how an estate is distributed under the rules of intestacy when there is no valid will.

- Gift and 7-Year Rule Calculator: https://${niche.domain}/calculators/gift-seven-year-rule-calculator
  Estimate the inheritance tax taper relief due on gifts made in the seven years before death.

${glossarySection}`,
  sections: [
    { dir: "blog", prefix: "blog", title: "BLOG POSTS" },
  ],
  // Calculator fleet listed in header above (they are dynamic routes, not markdown files)
});
