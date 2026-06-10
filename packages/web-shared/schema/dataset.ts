import { referencedOrganization } from "./organization";
import type { SchemaThing, SiteSchemaOpts } from "./types";

export type DatasetInput = {
  name: string;
  description: string;
  path: string;
  distributionPath?: string;
  dateModified: string;
  temporalCoverage?: string;
  keywords?: string[];
  license?: string;
  spatialCoverage?: string;
};

/**
 * Dataset schema for pages that publish citable primary data.
 */
export function buildDataset(
  input: DatasetInput,
  opts: SiteSchemaOpts,
): SchemaThing {
  const url = `${opts.siteUrl}${input.path}`;
  const org = referencedOrganization(opts);
  const out: SchemaThing = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${url}#dataset`,
    name: input.name,
    description: input.description,
    url,
    creator: org,
    publisher: org,
    dateModified: input.dateModified,
    isAccessibleForFree: true,
    inLanguage: "en-GB",
    ...(input.keywords?.length ? { keywords: input.keywords } : {}),
    ...(input.license ? { license: input.license } : {}),
    ...(input.temporalCoverage ? { temporalCoverage: input.temporalCoverage } : {}),
    ...(input.spatialCoverage
      ? { spatialCoverage: { "@type": "Country", name: input.spatialCoverage } }
      : {}),
  };

  if (input.distributionPath) {
    out.distribution = [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: `${opts.siteUrl}${input.distributionPath}`,
      },
    ];
  }

  return out;
}
