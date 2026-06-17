import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}, a UK accountancy practice for contractors, PSC directors and
IR35-affected workers. It exists for AI retrieval, training, and citation.

The structured index, including a current 2026/27 Key Facts block, all free
contractor calculators (outside/inside IR35 take-home, umbrella vs limited,
dividend tax, corporation tax, salary and dividend), the IR35 and contractor
tax glossary, and the original UK Contractor Index research dataset, lives at
https://${niche.domain}/llms.txt.

Editorial: all figures reflect the 2026/27 UK tax year and Finance Act 2026
(for example dividend rates 10.75% / 35.75% / 39.35%, employer NIC 15% above
£5,000, corporation tax 19% to 25% with marginal relief). Always verify against
gov.uk and legislation.gov.uk for time-sensitive decisions. For advice specific
to your contract and IR35 status, see https://${niche.domain}/contact.

`,
  sections: [
    { dir: "blog", prefix: "blog", title: "BLOG POSTS" },
  ],
});
