# Hospitality Wave 3 — cannibalisation check

Date: 2026-09-11
Scope: 7 picks with `decision == "build"` in `expansion_research/highstreet_2026-09-10/picks/hospitality.jsonl`
Corpus audited: `hospitality/web/content/blog/*.md` (19 files), plus `containment.json` from research leg 6.

Method note: the NETNEW_PROGRAM.md section 4 token-Jaccard gate was deliberately NOT used as the decision.
Our new pages are named by tax mechanic and the existing corpus is named by trade and topic, so token
overlap is a false signal on this cluster. Jaccard was run as triage only; every verdict below is a
reasoned read of the existing frontmatter (title / slug / h1 / metaDescription / summary) and, where the
call was close, the body.

## Verdicts

| Pick slug | Verdict | Evidence | Action |
|---|---|---|---|
| `vat-on-food` | DEEPEN | `hospitality/web/content/blog/vat-on-takeaway-food.md` and `hospitality/web/content/blog/vat-rates-soft-drinks-and-food.md` | The `covers` array hands the existing pages' exact intent to a new URL. "vat on takeaway food" IS the existing page's title. "vat on food and drink uk" / "vat on hot food" / "vat on cold food" are the existing hot-vs-cold five tests. "vat on pub food" / "uk vat on restaurant food" are the eat-in rules already on the takeaway page. Do not publish a third food-VAT page. Extend `vat-on-takeaway-food.md` into the head-term page ("VAT on Food") and keep `vat-rates-soft-drinks-and-food.md` as the per-item rate table beneath it. Human decision required. |
| `alcohol-duty` | LINK | `hospitality/web/content/blog/draught-relief-explained.md` | Build. Draught relief is a sub-rate of alcohol duty, not the head term, and the existing page is priced as a GP% piece. New page must link down to draught relief; draught relief must link up to the new page as the parent rate explainer. Also link to `awrs-checks.md`. |
| `machine-games-duty` | DEEPEN | `hospitality/web/content/blog/machine-games-duty.md` | Slug-for-slug identical to a live page, same single `covers` term. This is a straight duplicate. Extend the existing page (registration-before-play, returns, prizes-below-cost exemption are already there; add current MGD rate bands and the gaming-machine vs MGD boundary). Do not publish. Human decision required. |
| `tronc-scheme` | LINK | `hospitality/web/content/blog/tips-act-2023-compliance.md` | Build. The Tips Act page is employment-law allocation; a tronc is the NIC mechanic (independent troncmaster, no employer or employee NIC on qualifying tronc payments). Distinct intent, distinct query. Bidirectional link: the Act page sends readers to the tronc page for the NIC treatment, the tronc page sends readers back for the allocation-policy obligation. |
| `is-there-vat-on-dog-food` | NET-NEW | No existing hospitality or generalist page targets pet food | Build as specified. Note the sector fit is thin for a hospitality site (the query is a consumer/retail query, not an operator query); it is included because it sits on the same food-VAT boundary mechanic. Link it to the food-VAT parent page. |
| `excise-duty-alcohol` | CONFLICT | Competes with pick `alcohol-duty` (same `excise-duty` mechanic) | "excise duty alcohol" is a synonym re-ordering of "alcohol duty", not a separate intent. Two pages on one term will split the same SERP. `alcohol-duty` owns it: it holds the head term and the volume-bearing modifiers (budget, 2025 rates, 2026 increase). Fold "excise duty alcohol" into `alcohol-duty`'s `covers` and drop this pick. Human decision required. |
| `retail-hospitality-and-leisure-relief-scheme` | LINK | `hospitality/web/content/blog/small-business-rates-relief-cafes.md` | Build. RHL relief and Small Business Rates Relief are two separate business-rates schemes with different qualifying tests and a different cash cap, and an operator often has to choose between them. The existing page covers only SBRR. New page must carry the "which one applies to me" comparison and link both ways. |

## Decisions a human must make

1. **`vat-on-food` — DEEPEN, not build.** Recommend extending `vat-on-takeaway-food.md` to own the "vat on food" head term rather than publishing a fourth page onto an already three-page food-VAT cluster. Publishing as specified would cannibalise the site's two strongest existing posts.
2. **`machine-games-duty` — DEEPEN, not build.** A page with this exact slug is already live. Recommend extending it and removing the pick from the wave.
3. **`excise-duty-alcohol` vs `alcohol-duty` — CONFLICT.** Recommend `alcohol-duty` owns the intent and `excise-duty-alcohol` is dropped, its single `covers` phrasing moving into `alcohol-duty`.

Net effect if all three recommendations are accepted: 7 picks become 4 builds (`alcohol-duty`, `tronc-scheme`,
`is-there-vat-on-dog-food`, `retail-hospitality-and-leisure-relief-scheme`) plus 2 extensions of live pages.

## Counts

| Verdict | Count |
|---|---|
| NET-NEW | 1 |
| LINK | 3 |
| DEEPEN | 2 |
| CONFLICT | 1 |
| Total | 7 |
