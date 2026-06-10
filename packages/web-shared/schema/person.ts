import type { Person, SchemaThing, SiteSchemaOpts, TeamMemberData } from "./types";

/**
 * Person schema for a team/contributor page. Used as `author` on content pages
 * so AI engines and Google have a real Person URL to crawl for E-E-A-T signals.
 */
export function buildPerson(
  member: TeamMemberData,
  opts: SiteSchemaOpts,
): Person {
  const url = `${opts.siteUrl}/team/${member.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: member.name,
    ...(member.role ? { jobTitle: member.role } : {}),
    url,
    ...(member.shortBio ? { description: member.shortBio } : {}),
    ...(member.expertise?.length ? { knowsAbout: member.expertise } : {}),
    worksFor: {
      "@type": "Organization",
      "@id": `${opts.siteUrl}#organization`,
      name: opts.siteName,
      url: opts.siteUrl,
    },
    ...(member.links?.length ? { sameAs: member.links.map((l) => l.url) } : {}),
  };
}

/**
 * Person reference (just @id + name + url) for use as `author` inside another
 * schema. Falls back to a free-text Person when no member is supplied.
 */
export function referencedPerson(
  member: TeamMemberData | null,
  fallback: { name?: string; siteUrl: string; siteName: string },
): SchemaThing {
  if (member) {
    const url = `${fallback.siteUrl}/team/${member.slug}`;
    return {
      "@type": "Person",
      "@id": `${url}#person`,
      name: member.name,
      url,
    };
  }
  return {
    "@type": "Person",
    name: fallback.name || `${fallback.siteName} Editorial Team`,
    url: `${fallback.siteUrl}/about`,
  };
}
