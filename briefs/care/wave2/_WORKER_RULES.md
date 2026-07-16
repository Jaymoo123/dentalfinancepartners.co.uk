# Care wave-2 shared CONTENT-worker rules (CQC registration economics family)

You are writing ONE wave-2 asset for the UK care-sector accountancy site at `care/web`
(repo root `C:\Users\user\Documents\Accounting`). Working brand **Care Home Tax**.
do NOT hardcode the brand in body copy; write about "the site", "we", "your service",
"care providers". Brand and CTA are injected by the page template and site config, never by
content. This file is the wave-1 `_WORKER_RULES.md` updated for wave-2 danger zones; where it
conflicts with your brief on category strings/slugs, THIS file wins.

## Inputs (read first, in order)
1. This file.
2. **Your brief**: `briefs/care/wave2/<asset>.md`: target queries, H2 structure, competitors,
   house positions to cite, hallucination danger zones, internal links.
3. **Facts**: `docs/care/house_positions.md`: the ONLY source for figures/thresholds/dates.
   Every figure you state must match a numbered HP and link its gov.uk/CQC URL. If your brief
   FLAGS an HP gap, do NOT invent a figure: write around it qualitatively or omit it.
4. **Ledger** (cross-check only): `docs/care/rates_ledger.json`.

## WAVE-2 CRITICAL WARNING: CQC fee amounts are an HP GAP
The whole wave-2 family is about CQC registration economics, but **no house position and no
ledger entry contains any CQC registration fee amount** (annual fee, application fee, band
thresholds, the £X per bed / per service-user-capacity figures). CQC registration fee amounts
are one of the known cross-cutting HP gaps (alongside Ofsted figures, Home Office visa/sponsor
fees, business-rates multiplier, devolved-nation rates). Therefore, in ALL blog/guide/money
copy:
- NEVER state a CQC fee pound amount, a fee band, a per-bed rate, or a "fees roughly £X" figure.
- Describe the CQC fee as a real, recurring cost that EXISTS and is banded by regulated-activity
  scale (registered places / service-user capacity), link CQC's live fee-scheme page, and tell
  the reader the current figure is on that page. Do not paraphrase a number from memory.
- The ONLY asset permitted to carry pinned CQC fee figures is the **CQC fee calculator**
  (`cqc-fee-calculator`), and only because that brief instructs the calculator author to pin
  the CURRENT official CQC fee-scheme figures from the named CQC source URL at build time, with
  an inline source comment and a FLAG (exactly like the FNC rate is handled in
  `care/web/src/lib/calculators/tools/fnc-fee-mix.ts`). Blog/money authors NEVER copy those
  figures into prose.

Other wave-2 gaps that must stay number-free in prose: Home Office sponsor/visa fees; Ofsted
registration fees (children's homes are Ofsted, not CQC); registered-manager qualification
costs; any "typical consultant fee" or "typical accountant fee" (pricing is config-driven and
faceless).

## Global quality rules (locked, non-negotiable)
- **A\* authority bar**: genuinely authoritative, never thin or AI-scammy. Worked examples,
  tables, edge cases the brief names. Quality IS the strategy.
- **BLUF**: open each money/guide H2 with a citable 40 to 60 word answer.
- **NO em-dashes anywhere.** Commas, parentheses, full stops, or middle dots (·). Hard rule.
- **Faceless authority**: no named experts, no ACA/ICAEW/credential claims, no fabricated
  client names/counts, NO pricing figures (pricing flows from config).
- **NO pipeline artefacts in reader copy**: never "verify at build", "the brief notes", inline
  "(HP12)" codes, "speak to us" as a table cell, or narrated punts. If a figure is flagged
  unverified, write around it cleanly.
- **No cross-post boilerplate**: no formulaic "This guide sets out..." intro; vary structure and
  voice per asset. Do not restate a sibling post's definition paragraph; link the canonical page.
  In particular, the wave-1 FVS walkthrough already exists at
  `/blog/cqc-and-financial-compliance/cqc-financial-viability-statement-walkthrough`; wave-2
  posts LINK to it for the FVS deep-dive and never re-explain the FVS at length.
- **Cite official sources inline** as `<a href="https://...">` for every figure, from your
  brief's House Positions section.
- **England default** (CQC is England-only; Scotland = Care Inspectorate, Wales = CIW, NI =
  RQIA, flag explicitly, never give devolved figures without an HP).
- **Operator/business frame only**: care-home owners, registered managers as OFFICE-HOLDERS of
  the business (never the manager as an individual worker seeking pay), agency directors, care
  start-up founders. Never the care-worker-as-employee or family-payer frame. Medical-adjacency
  wall: nothing clinical or patient-facing.
- **No brand in metaTitle**: query-focused, ≤60 chars, no brand suffix (template appends it).
- **Internal links** (plain anchors, targets may be stubbed): use ONLY the real slugs listed in
  each brief and the category map below.

## BLOG posts → `care/web/content/blog/<slug>.md`
YAML frontmatter then a **RAW HTML** body. Model the exact shape of an existing wave-1 post,
e.g. `care/web/content/blog/cqc-financial-viability-statement-walkthrough.md` (same frontmatter
fields: title, slug, date, author "", category, metaTitle ≤60, metaDescription ≤155, h1,
summary, keyTakeaways 3 to 5, faqs question/answer).

**CRITICAL: body is RAW HTML, not markdown.** The loader injects the body via
`dangerouslySetInnerHTML` with NO markdown conversion. Use `<p>`, `<h2>`, `<h3>`, `<ul><li>`,
`<ol><li>`, `<table>`, `<strong>`, `<a href>`. NO markdown syntax (`##`, `-`, `**`, `[]()`,
backticks) in the body.

### The 6 valid blog categories (EXACT string) → URL slug (no bare "&", no commas in slug)
- `Care Home Accounts and Funding` → `/blog/care-home-accounts-and-funding/<slug>`
- `Payroll and Workforce Costs` → `/blog/payroll-and-workforce-costs/<slug>`
- `VAT and Welfare Exemption` → `/blog/vat-and-welfare-exemption/<slug>`
- `CQC and Financial Compliance` → `/blog/cqc-and-financial-compliance/<slug>`
- `Business Structure and Acquisition` → `/blog/business-structure-and-acquisition/<slug>`
- `Fees, FNC and Local Authority Rates` → `/blog/fees-fnc-and-local-authority-rates/<slug>`
  (category slug = `fees-fnc-and-local-authority-rates`; the comma and "&" DROP OUT, never emit
  a comma or "&" in a slug).

## CALCULATOR → `care/web/src/lib/calculators/tools/<slug>.ts` + `<slug>.test.ts`, register in registry.ts
Model the exact shape of `care/web/src/lib/calculators/tools/fnc-fee-mix.ts`: a `GenericTool`
export (`kind: "generic"`, `slug`, `name`, `category` = one of the 6 above, `oneLiner`,
`metaTitle` ≤60, `metaDescription` ≤155, `intro`, `ctaLabel`, `embedHeight`, `fields[]`,
`compute(v)` returning `{headline, rows, note}`, `explainer`, `faqs`). Pinned regulatory
constants go at the top of the file WITH an inline source comment and verification FLAG, exactly
like `FNC_WEEKLY_RATE`. Add the tool to the `GENERIC[]` array in `registry.ts`. Write a
`<slug>.test.ts` beside it (assert-based, model `fnc-fee-mix.test.ts`) with the brief's golden
cases. Run `npx tsc --noEmit` and the test from `care/web` before reporting done; verify the
output yourself, do not claim green without running it.

## MONEY pages (services / for hubs) → TypeScript data entries
Only if your brief assigns one. Live in `care/web/src/data/*.ts` (care-hubs.ts / care-services.ts).
Edit ONLY the entry your dispatch assigns; keep the `interface` and `get…(slug)` helper unchanged.
Values in `stats` must be HP-verifiable, never invented. Run `npx tsc --noEmit` after editing.

Write ONLY your assigned file(s). Do not run full builds, do not edit config or other sites, do
not touch another worker's file. Report the path(s) written and a 1-line summary.
