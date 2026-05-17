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
  "emma-carter": {
    slug: "emma-carter",
    name: "Emma Carter",
    initials: "EC",
    role: "Editorial Lead",
    shortBio:
      "Editorial lead at UK Business Accountants. Writes on UK tax, incorporation, VAT, payroll and R&D credits for limited companies and sole traders.",
    bio: [
      "Emma Carter is the editorial lead at UK Business Accountants. She writes and commissions content on UK corporation tax, VAT, payroll, R&D credits, incorporation decisions, and the practical accounting questions UK business owners actually ask.",
      "Editorial focus is plain-English explanation backed by primary sources. Every figure on this site is traceable back to HMRC, Companies House, or equivalent. Concrete advice for a specific business is delivered via a one-to-one call with a qualified accountant on the partner team, not via published articles.",
      "If something on the site is wrong, out of date, or unclear, get in touch and the editorial team will fix it.",
    ],
    expertise: [
      "UK corporation tax and marginal relief",
      "VAT registration and scheme selection",
      "Salary and dividend structuring",
      "R&D tax credits for UK SMEs",
      "Incorporation decisions and timing",
      "Making Tax Digital for ITSA",
    ],
    monogramColor: "#1e40af",
  },
};

export function getTeamMember(slug: string): TeamMember | null {
  return TEAM[slug] ?? null;
}

export function getAllTeamSlugs(): string[] {
  return Object.keys(TEAM);
}
