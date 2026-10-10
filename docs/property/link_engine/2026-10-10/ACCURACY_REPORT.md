# Accuracy report: Property commercial demand map (run 2026-10-10)

Every check below is independent of the engine's own output: a blind reader, an
outside data source, Google's own behaviour, or a locked set of known answers.
Each check is a script that re-runs with the engine, and every figure here comes
from a file in `accuracy/` with its own .meta.json.

## Result in one line

The money map is now trustworthy for decisions. The checks found and fixed
**eight real defects** (two of them double counts that inflated demand). One
check, second-source volume, was inconclusive because Bing has too little data.

## The checks

| Check | What it tests | Before fixes | After fixes | Script |
|---|---|---|---|---|
| A1 Blind labels | Opus labels 150 random searches (hire, decision, not commercial) without seeing ours | 115 of 150 agree (118 on commercial or not) | **124 of 150 (127)** | sample drawn by manager, seed 20261010 |
| A1 Downstream | Do the disputed searches reach the money map? | 24 disputed "decision" searches | **0 reached the ranked map** (all caught by the Opus readers as informational) | |
| A2 Blind families | Would one page satisfy every search in a family? 40 random families | 31 of 40 coherent | **12 of 22 misfits fixed by code; 10 accepted under rulings** | |
| C1 Coverage | Do outside sources hold money searches we lack? | WP1 list 95%, djh.co.uk 72% | **WP1 list 99.9%, djh.co.uk 86%, Bing 95%** (by volume). Top 40 Search Console "misses" all checked by hand: correct exclusions (calculators, rates, first-time buyers, mortgages) | accuracy_coverage.py |
| C2 Second-source volume | Do Google figures agree with a second provider? | Bing has data for 8 of 40 | **Inconclusive**: too sparse to confirm or refute | accuracy_coverage.py |
| D Google intent | Does Google reward the type of page we chose as owner? | 23 mismatches | **97 match, 26 mismatch, 121 too little data** | accuracy_intent.py |
| F Locked test set | Known answers that must never drift | 8 checks | **9 of 9 pass** (added a cross-family double-count check) | selftest.py |
| G Your spot check | Top 30 families and their owner pages | | `accuracy/G_owner_spotcheck.md` | |

## Defects found and fixed

1. **Hire searches wrongly excluded.** "accounting for landlords", "landlord accounting", "property tax accounting", "stamp duty advice", "CGT accountant", "tax return advice for landlords". Four classifier rules fixed.
2. **Overcorrection caught.** The advice fix briefly let in estate-agent searches ("property consultant", "property advisor"). Advice words now count only alongside a tax word.
3. **Junk data.** 153 Search Console rows were pasted spreadsheet text. Filtered; long genuine questions are kept.
4. **Explainer questions** ("what is a property accountant") briefly counted as hire. Fixed; they stay explainers (blueprint R23 puts them in the service page FAQ).
5. **Towns treated as national.** Cannock, Wirral, Wallington, EC1, Dorset, Oxfordshire sat in national families (blueprint R17 forbids naming Cannock on a national page). A 5,319-name UK place list now tags 135 searches across 42 places.
6. **Mixed families.** Hire and explainer searches could merge; non-resident and incorporation searches sat inside general families. Now always separate.
7. **Double count across families.** "property accounting" and "landlord accounting" carried Google's figures for "property accountant" and "landlord accountant" (Google groups them), so that demand was counted twice and "property accounting" showed as the number 2 family. Fixed; a locked check now blocks it.
8. **Rulings went stale on every re-run.** Manager and owner rulings now carry over when a family's main search is unchanged, and are listed so you can see them.

## What changed in the numbers

- Ranked commercial demand: **13,070 searches a month** across 176 families (was 14,440 before the last double-count fix).
- Property accountant family: 2,790 (was 2,680; "property tax accounting" was missing).
- Landlord accountant: 1,560. Property tax advice: 1,180.
- Top money pages by share of priority: property accountant 41%, property tax advice 14%, landlord accountant 13%, second-home guide 6%, how-to transfer guide 5%, incorporation page 4%, gifting page 4%, selling a buy-to-let 3%.

## Still open (questions, not findings)

- **26 families where Google mostly shows guides** but our owner is a sales page (for example property incorporation, CGT on gifting, holiday-let tax advice). For most, none of our guides ranks yet either. This is the input for the page-brief step: those families likely need a strong guide paired with the sales page.
- **Second-source volume** could not be confirmed (Bing too sparse). A paid second source exists if you want it; not bought.
- **The page assignments and gap list** (link half) were built on the earlier families and must be re-run before any sentence is written. Cheap, no new judgment expected beyond a handful of pages.
- **Search Console data runs to 7 October**, before the service page rewrite. The day-14 read on 23 October gives the first fair view of those pages.

## Spend

DataForSEO for the whole run including the accuracy pass: **$1.58**, every response saved to the store. Agents for the accuracy pass: 4 (1 Opus, 3 Sonnet), plus the builder's fix rounds.
