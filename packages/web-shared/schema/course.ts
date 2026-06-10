import { referencedOrganization } from "./organization";
import type { SchemaThing, SiteSchemaOpts } from "./types";

export type CourseInput = {
  name: string;
  description: string;
  path: string;
  timeRequired?: string;
};

/**
 * Course schema for pillar guides. Marks them as learning resources distinct
 * from generic articles; Google surfaces these in education-flavoured panels.
 *
 * Use alongside `buildArticle` for the same page.
 */
export function buildCourse(
  input: CourseInput,
  opts: SiteSchemaOpts,
): SchemaThing {
  const url = `${opts.siteUrl}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: input.name,
    description: input.description,
    url,
    provider: referencedOrganization(opts),
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    educationalLevel: "Professional",
    teaches: input.name,
    ...(input.timeRequired ? { timeRequired: input.timeRequired } : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: input.timeRequired || "PT30M",
    },
  };
}
