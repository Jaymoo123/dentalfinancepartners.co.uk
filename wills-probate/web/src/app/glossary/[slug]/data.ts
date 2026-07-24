// Glossary entries for the Probate Compass glossary.
// Body must be raw HTML (not markdown). Add entries below; each key = slug.
// PLACEHOLDER seed set (5 terms) — Phase 2 expands the full glossary.

export type GlossaryEntry = {
  slug: string;
  term: string;
  category: string;
  primary_kw: string;
  body: string;
};

const GLOSSARY_LIST: GlossaryEntry[] = [
  {
    slug: "probate",
    term: "Probate",
    category: "Probate fundamentals",
    primary_kw: "what is probate",
    body: `<p><strong>Probate</strong> is the legal process of dealing with a deceased person's estate: their money, property and possessions. It usually involves applying for a legal document (a grant of probate, or grant of letters of administration if there is no will) that gives the executor or administrator the authority to collect in the estate's assets, pay any debts and tax, and distribute what is left to the beneficiaries.</p>
<p>Not every estate needs probate. Small estates, or estates held entirely in joint names that pass automatically to a surviving joint owner, can sometimes be dealt with without a formal grant.</p>`,
  },
  {
    slug: "grant-of-probate",
    term: "Grant of Probate",
    category: "Probate fundamentals",
    primary_kw: "grant of probate meaning",
    body: `<p>A <strong>grant of probate</strong> is the official document issued by the Probate Registry that confirms an executor named in a will has the legal authority to administer the deceased's estate. Banks, pension providers and the Land Registry will usually require sight of the grant before releasing funds or transferring property.</p>
<p>Where there is no valid will, the equivalent document is called a <strong>grant of letters of administration</strong>, and it is issued to an administrator rather than an executor.</p>`,
  },
  {
    slug: "intestacy",
    term: "Intestacy",
    category: "Wills and estate planning",
    primary_kw: "what is intestacy",
    body: `<p><strong>Intestacy</strong> is what happens when someone dies without a valid will. Instead of the deceased's own wishes deciding who inherits, the estate is distributed according to a fixed legal order set out in the intestacy rules, which vary depending on which relatives survive the deceased.</p>
<p>The intestacy rules do not automatically provide for unmarried partners, step-children, or friends, which is one of the main reasons advisers recommend making a will rather than relying on intestacy.</p>`,
  },
  {
    slug: "nil-rate-band",
    term: "Nil-Rate Band",
    category: "Inheritance tax",
    primary_kw: "nil rate band inheritance tax",
    body: `<p>The <strong>nil-rate band</strong> is the amount an estate can be worth before any inheritance tax is due. It has been frozen at <strong>£325,000</strong> for a number of tax years. Any unused nil-rate band can usually be transferred to a surviving spouse or civil partner, potentially doubling the threshold available on the second death.</p>
<p>Inheritance tax is generally charged at 40% on the value of the estate above the available nil-rate band (and residence nil-rate band, where it applies).</p>`,
  },
  {
    slug: "residence-nil-rate-band",
    term: "Residence Nil-Rate Band",
    category: "Inheritance tax",
    primary_kw: "residence nil rate band",
    body: `<p>The <strong>residence nil-rate band</strong> is an additional inheritance tax allowance, on top of the main nil-rate band, that applies when a main residence is left to direct descendants (children, grandchildren, and certain others). It is also frozen, and it tapers away for larger estates above a set threshold.</p>
<p>Combined with the main nil-rate band, and transferable between spouses and civil partners, the residence nil-rate band can significantly increase the amount a couple can leave before inheritance tax becomes due.</p>`,
  },
];

export const GLOSSARY: Record<string, GlossaryEntry> = Object.fromEntries(
  GLOSSARY_LIST.map((e) => [e.slug, e]),
);
