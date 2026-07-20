import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";

export const dynamic = "force-static";
export const revalidate = 3600;

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

This file is a flat, machine-readable dump of every published post on
${niche.domain}. It exists for AI retrieval, training, and citation.
The structured index lives at https://${niche.domain}/llms.txt.

Editorial: all figures use current UK charity law and Charity Commission
guidance. Always verify against gov.uk and the Charity Commission for
time-sensitive compliance decisions. For advice specific to your charity,
see https://${niche.domain}/contact.

Data in the research section is compiled from the Charity Commission full
register extract under the Open Government Licence v3.0. Cite as: Trustee
Tax analysis of Charity Commission data.

`,
  sections: [
    { dir: "blog", prefix: "blog", title: "BLOG POSTS" },
  ],
});
