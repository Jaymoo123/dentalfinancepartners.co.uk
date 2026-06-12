# Wave 2 brief packet, contractors-ir35 (Contractor Finance Partners)

Read IN FULL, in this order, before writing a word:
1. `briefs/contractors-ir35/wave1/BRIEF_PACKET.md` — ALL of its rules apply verbatim (file format, quoted-YAML discipline, word counts, hard rules, voice, self-check). Only the link allowlist and assignments below override it.
2. `docs/contractors-ir35/house_positions.md` — the ONLY factual source. No web research, no training-data figures. Flag gaps with `<!-- FLAG: ... -->`, never guess.
3. `docs/contractors-ir35/MONEY_KEYWORDS.md` §3 — your assignment row (slug, title, category, tier, money keyword, primary link target) and the pre-write boundary notes.

## Wave-2 overrides and additions

**Funnel rule:** every page exists to support its assigned money keyword. Naturally work the page's primary internal-link target into the body early (not only the CTA), and make the closing CTA point at the money page named in your row (/services or /ir35-status) unless your row's target is a sibling guide, in which case CTA = /services.

**Link allowlist** (4-8 unique internal links, correct category paths):
- Core: `/services`, `/ir35-status`, `/contact`, `/for`, `/for/<type>` (it-contractors, engineering-contractors, finance-contractors, management-consultants, project-managers, nhs-locum-doctors, oil-and-gas-contractors, legal-contractors, marketing-contractors, construction-contractors)
- Wave-1 pages via `/blog/<category-slug>/<slug>`: what-is-ir35, inside-ir35, outside-ir35, off-payroll-working-rules-private-sector, sds-status-determination-statement, ir35-small-company-exemption (all `ir35-status`); limited-company-vs-umbrella-contractor, umbrella-company-holiday-pay (`umbrella-vs-limited-company`); psc-limited-company-contractor-tax (`limited-company-tax`); contractor-expenses-allowable-guide, travel-expenses-inside-ir35 (`expenses-and-deductions`); flat-rate-vat-limited-cost-trader (`mtd-and-compliance`); contractor-pension-employer-contributions, contractor-pension-carry-forward (`pension-and-dividends`); how-to-choose-contractor-accountant (`contractor-accounting-basics`)
- Wave-2 siblings (the 35 slugs in MONEY_KEYWORDS §3, each under its row's category slug). Category slugs: IR35 Status → `ir35-status`, Limited Company Tax → `limited-company-tax`, Umbrella vs Limited Company → `umbrella-vs-limited-company`, Expenses and Deductions → `expenses-and-deductions`, Pension and Dividends → `pension-and-dividends`, MTD and Compliance → `mtd-and-compliance`, Contractor Accounting Basics → `contractor-accounting-basics`

**Boundary discipline (failure = no-ship):** respect the pre-write notes in MONEY_KEYWORDS §3, especially the #12/#13/#14 three-test trio boundary, the #21-vs-wave-1-FRS boundary, and the universal rule: take YOUR narrow intent, link UP to the flagship/pillar for shared ground, never restate a sibling's core beyond a linking paragraph.

**Figures:** 2026/27 throughout, year-labelled, per house_positions. Dividend rates are 10.75%/35.75%/39.35% (2026/27); 8.75%/33.75% may only appear as explicitly historical (2025/26 and earlier). AMAP is 55p/25p from 6 April 2026. Small-company thresholds £15m/£7.5m/50 with the 6 April 2027 earliest-exit rule.

**Pricing:** we never publish our own fees (lead-gen model). The fees/cost page (#7) discusses the public market range editorially with a "ranges vary, this is not a quote" hedge.

**Date:** use `date: '2026-06-12'` and `sourcesVerifiedAt: '2026-06-12'`.

## Wave-2 post-mortem rules (added at wave close; binding on wave 3+)

1. **Internal-reference ban (hard rule, headings included):** the strings "house position(s)", "HP", "§N"/"section N of our..." and any reference to this packet, the keyword map or the firm's internal frameworks must NEVER appear in user-facing copy. State the substantive principle plainly instead. This leak class survived blind judging twice; it is grep-gated.
2. **YAML structure:** `faqs:` is a plain YAML list; never add `<faqs>`/`</faqs>` or any tag lines inside frontmatter. `category:` takes the DISPLAY name exactly (e.g. `IR35 Status`), never the slug.
3. **All required fields:** title, slug, date, updatedDate, author, category, metaTitle, metaDescription, h1, summary, keyTakeaways, sourcesVerifiedAt, schema, faqs — missing any fails the gate.
4. **Worked examples:** recompute every figure before finishing and make the surrounding prose match the numbers; classify the example's taxpayer band correctly for its income level. Judges recompute everything; arithmetic was the top no-ship cause in wave 2.
