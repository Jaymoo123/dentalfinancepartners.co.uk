import type { SchemaThing, SiteSchemaOpts } from "./types";

export type DefinedTermInput = {
  slug: string;
  term: string;
  definition: string;
  inDefinedTermSet?: string;
};

/**
 * DefinedTerm schema for individual glossary entries.
 */
export function buildDefinedTerm(
  input: DefinedTermInput,
  opts: SiteSchemaOpts,
): SchemaThing {
  const url = `${opts.siteUrl}/glossary/${input.slug}`;
  const setUrl = `${opts.siteUrl}/glossary`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${url}#term`,
    name: input.term,
    description: input.definition,
    url,
    inDefinedTermSet: input.inDefinedTermSet || setUrl,
  };
}

/**
 * DefinedTermSet for the glossary index page. Lists all terms by name + URL.
 */
export function buildDefinedTermSet(
  terms: { slug: string; term: string }[],
  opts: SiteSchemaOpts,
  setName: string,
  setDescription: string,
): SchemaThing {
  const url = `${opts.siteUrl}/glossary`;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${url}#termset`,
    name: setName,
    description: setDescription,
    url,
    inLanguage: "en-GB",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      url: `${opts.siteUrl}/glossary/${t.slug}`,
    })),
  };
}
