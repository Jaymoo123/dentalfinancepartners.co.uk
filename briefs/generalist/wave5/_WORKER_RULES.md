# Generalist wave 5 (high-street mechanic program): shared worker rules

You are writing ONE content asset for the Holloway Davies generalist UK accountancy site
(`generalist/web`, www.hollowaydavies.co.uk). Audience: owner-managed businesses, sole
traders, partnerships, limited companies, contractors and landlords.

## Read before you write, in this order
1. **Your brief**: `briefs/generalist/wave5/<slug>.md`. It is the spec. Follow it exactly.
2. `briefs/_HIGHSTREET_SHARED_RULES.md`. The covers rule, the page anatomy, the
   build-killers, and the table of facts that ordinary sources get wrong.
3. Your anchors: `docs/generalist/STAGE_1B_HP_LOCK_DRAFTS_A.md` (exemptions, zero rating,
   IPT, retail schemes) or `_B.md` (cash basis, motor, household employer, disbursements).
   Verified against primary law on 2026-09-11.
4. `docs/generalist/house_positions.md`. The only source for figures. Corrected 2026-09-11
   in commit `babea2de`.
5. Two or three existing posts in `generalist/web/content/blog/` for voice and HTML habits.

## Build-killers. Each one breaks the build for all 457+ posts, not just yours
1. **Quote every frontmatter value containing a colon followed by a space.**
   `title: VAT on Leased Cars: The 50% Block` fails with `incomplete explicit mapping pair`.
   Write `title: "VAT on Leased Cars: The 50% Block"`. Applies to `title, metaTitle,
   metaDescription, summary, h1, altText, author` and every FAQ `question` and `answer`.
2. **Your first prose block must be a plain sentence of 30+ characters.**
   `generalist/web/src/tests/first-sentence.test.ts` runs a guard over the WHOLE corpus and
   one bad opening fails the entire suite. Open with prose. **The boundary table never
   opens the page.**
3. **Body is RAW HTML** below the frontmatter, never markdown. There is no `body:` key.
4. **No em-dashes anywhere.**
5. **`faqs:` frontmatter count must equal the FAQs presented.** Target 10 to 14. The FAQ
   answers are rendered from frontmatter into the FAQPage JSON-LD, which is what crawlers
   read. Do not add a duplicate FAQ section in the body, and do not touch the accordion.
6. **metaTitle <= 60 characters, metaDescription <= 155.** Stricter than the program floor.
7. **Category must be one of these, exactly:** `Limited Company Tax`,
   `Bookkeeping and Compliance`, `Sole Trader and Self Employment`, `R&D Tax Credits`,
   `VAT and Making Tax Digital`, `Payroll and PAYE`, `Incorporation and Structure`,
   `Corporation Tax`, `Exit and Capital Gains`, `Director Pay and Dividends`,
   `Business Finance`. Inventing one creates a route with a one-post index.

## Locked scope fences
- **No alcohol duty, duty stamps, Small Producer Relief or draught relief** (HP 21.9.7).
  That is excise ground and belongs to the hospitality site. One neutral sentence plus a
  gov.uk link is the ceiling, with no rate, threshold or eligibility test.
- **Motor-finance fence (HP 21.2), mandatory on every motor page**: no commission or
  mis-selling claims content, no eligibility checker, no referral to a claims management
  company or law firm. One neutral factual sentence that redress litigation exists, with a
  gov.uk or FCA link, is the ceiling.
- **No employment status checker.** A page may explain CEST; it may not ship a rival tool.
- **Faceless authority**: no named experts, no invented credentials, no client names or
  counts, no pricing or fee figures in body copy.
- **England is the default.** Flag Scotland, Wales and Northern Ireland only where the
  position actually differs.

## House style
Answer first, then explain. Cite official sources inline as `<a href="https://www.gov.uk/...">`
for every figure. Worked examples use real numbers and are named to a trade. Trades live in
the boundary table and the worked examples, never in a list.

If your brief declares an HP GAP, do NOT invent a figure. Omit it, describe it
qualitatively, or link the reader to the live gov.uk page. A gap honestly left is worth
more than a number quietly guessed.
