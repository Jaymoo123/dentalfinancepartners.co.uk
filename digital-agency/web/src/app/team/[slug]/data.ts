/**
 * Editorial team / contributor data.
 *
 * Bylines here are editorial pen-names. Concrete tax advice is delivered
 * to clients via book-a-call, not via published content. Every page that
 * cites these authors carries an "editorial content, book a call for
 * advice" disclosure so readers are not misled into following content as
 * personalised guidance.
 */

export type TeamMember = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  shortBio: string;
  bio: string[];
  expertise: string[];
  // Optional sameAs identities, fill when real profiles exist
  links?: { label: string; url: string }[];
  monogramColor: string;
};

export const TEAM: Record<string, TeamMember> = {
  "james-whitfield": {
    slug: "james-whitfield",
    name: "James Whitfield",
    initials: "JW",
    role: "Editorial Lead",
    shortBio:
      "Editorial lead at Agency Founder Finance. Writes on UK + UAE tax for agency founders.",
    bio: [
      "James Whitfield is the editorial lead at Agency Founder Finance. He writes and commissions content on UK tax, incorporation, IR35, R&D credits, and the cross-border realities of running an agency from the UK or relocating to the UAE.",
      "Editorial focus is plain-English explanation backed by primary sources, every figure on this site is traceable back to HMRC, Companies House, or equivalent. Concrete advice for a specific agency is delivered via a one-to-one call with a specialist agency accountant on the Agency Founder Finance team, not via published articles.",
      "If something on the site is wrong, out of date, or unclear, get in touch via the contact page and the editorial team will fix it.",
    ],
    expertise: [
      "UK agency taxation",
      "Salary and dividend structuring",
      "R&D tax credits for digital and AI agencies",
      "IR35 and contractor engagements",
      "International relocation for agency founders",
      "Exit planning and BADR",
    ],
    monogramColor: "#4f46e5",
  },
};

export function getTeamMember(slug: string): TeamMember | null {
  return TEAM[slug] ?? null;
}

export function getAllTeamSlugs(): string[] {
  return Object.keys(TEAM);
}
