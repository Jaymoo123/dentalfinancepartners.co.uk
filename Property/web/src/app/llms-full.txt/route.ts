import { buildLlmsFullRoute } from "@accounting-network/web-shared/content/llmsFull";
import { niche } from "@/config/niche-loader";
import { slugifyCategory } from "@/lib/blog";

export const dynamic = "force-static";
export const revalidate = 3600;

const entity = niche.entity;
if (!entity) throw new Error("llms-full.txt: niche.config.json is missing entity");

export const GET = buildLlmsFullRoute({
  siteUrl: `https://${niche.domain}`,
  header: `# ${niche.display_name}, Full Content Reference

${entity.firm}

${entity.serves} ${entity.where}

${entity.notWhatWeAre}

This file is a flat, machine-readable dump of every published post on
${niche.domain}. It exists for AI retrieval, training, and citation.
The structured index lives at https://${niche.domain}/llms.txt.

Editorial: all figures use current UK rates. Facts current as at 2026-09-27.
Always verify against gov.uk for time-sensitive decisions. To be introduced to
a firm in our specialist partner network, see https://${niche.domain}/contact.

`,
  sections: [
    {
      dir: "blog",
      prefix: "blog",
      title: "BLOG POSTS",
      pathFor: (data, slug) =>
        `${slugifyCategory(data.category as string)}/${slug}`,
    },
  ],
});
