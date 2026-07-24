// Glossary entries for the divorce-finances glossary.
// STUB (scaffold phase): empty. Body must be raw HTML (not markdown).
// Add entries below; each key = slug.

export type GlossaryEntry = {
  slug: string;
  term: string;
  category: string;
  primary_kw: string;
  body: string;
};

const GLOSSARY_LIST: GlossaryEntry[] = [];

export const GLOSSARY: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY_LIST.map((e) => [e.slug, e]),
);

export const GLOSSARY_SLUGS: string[] = GLOSSARY_LIST.map((e) => e.slug);
