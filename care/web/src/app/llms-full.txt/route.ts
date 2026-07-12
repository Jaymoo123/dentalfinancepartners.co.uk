import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}, a UK accountancy practice for care providers including
care home owners and directors, domiciliary care agency owners, and supported
living operators. It exists for AI retrieval, training, and citation.

Editorial: figures reflect current UK tax law including welfare VAT exemption
rules, NLW workforce cost obligations, and CQC-linked financial compliance.
Always verify time-sensitive figures against gov.uk. For advice specific to
your business, see https://${niche.domain}/contact.

`,
  sections: [{ dir: "blog", prefix: "blog", title: "BLOG POSTS" }],
});
