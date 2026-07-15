---
slug: cqc-fee-calculator
tier: calculator
category: CQC and Financial Compliance
route: /calculators/cqc-fee-calculator
files: care/web/src/lib/calculators/tools/cqc-fee-calculator.ts + cqc-fee-calculator.test.ts + register in care/web/src/lib/calculators/registry.ts
intent: OPERATOR-PROBLEM tool. A care provider or founder wants to know their annual CQC registration fee before budgeting. This is the ONLY wave-2 asset permitted to carry pinned CQC fee figures, and only by pinning them from the CURRENT official CQC fee scheme at build time with a source comment and verification FLAG (exactly like FNC_WEEKLY_RATE in fnc-fee-mix.ts). The tool is the canonical fee number for the whole CQC family; every blog links here instead of stating a figure.
---
# Calculator: CQC registration fee calculator (BRAND_TBD)

> Seed brief (Stage 1). Brand is BRAND_TBD; the tool copy references "your service" / "the provider". No em-dashes anywhere. BUSINESS/operator frame. England default: CQC fees apply to CQC-registered providers in England only. Build to the shape of `care/web/src/lib/calculators/tools/fnc-fee-mix.ts` (a `GenericTool`), add to `registry.ts` GENERIC[], write `cqc-fee-calculator.test.ts`, run `npx tsc --noEmit` and the test from `care/web`.

## Why this exists / play

The CQC fee is the one number the entire wave-2 CQC family needs but no house position contains. Rather than let seven blog authors each guess a figure (banned), we build ONE calculator that pins the CURRENT official CQC fee-scheme figures from CQC's own published scheme, with an inline source comment and a verification FLAG, and every other asset LINKS here. Measured demand: "cqc registration fees" 70/mo, and the tool sits under the 2,900/mo "cqc registration" head as its costing utility. The care niche has an almost total interactive-tool vacuum (DOSSIER: one standalone calculator site in the whole sweep), so a working, correctly-cited fee calculator is a genuine authority asset.

## CRITICAL: fee figures are pinned by the CALCULATOR AUTHOR from the live CQC fee scheme

No house position or ledger entry contains a CQC fee amount. The calculator author (and ONLY the calculator author) must:
1. Fetch CQC's current published fee scheme at build time from the official CQC source (see "Source to pin" below). Confirm the live URL and the scheme's effective period.
2. Encode the fee-scheme figures as named constants at the top of the file, each with an inline comment giving the exact CQC source URL, the scheme's effective-from date, and a FLAG that the operator must re-verify against the live scheme before relying on it, EXACTLY like `FNC_WEEKLY_RATE` and its comment block in `fnc-fee-mix.ts`.
3. Encode the scheme's ACTUAL banding structure (do not invent bands). CQC's fee scheme bands residential/nursing homes by number of registered places (beds) and community/domiciliary providers by service-user-capacity band; the exact band boundaries and amounts MUST come from the live scheme, never from memory. If the fetched scheme structure differs from this description, follow the LIVE scheme and note the discrepancy in a comment.
4. Add a `CQC_FEE_SCHEME_YEAR`/effective-period constant surfaced in the tool `note` and a FAQ, so the UI always shows which scheme year is encoded.

If the live CQC fee scheme cannot be fetched at build time, the author STOPS and flags it to the orchestrator rather than shipping invented figures. A calculator with wrong fee numbers is worse than no calculator.

## Source to pin (Stage-2 author confirms the exact live URL)

- CQC fee scheme (official): start from https://www.cqc.org.uk/what-we-do/how-we-do-our-job/fees and follow to the current published fee-scheme document / provider fees page. Confirm the exact live URL, the effective period, and both the residential (per-registered-place bands) and community (service-user-capacity bands) tables. This is the single source of truth for every figure in the file. (This URL is a starting point, not a house position; the author verifies it live.)

## Inputs (fields[])

Model field objects on `fnc-fee-mix.ts` (`id`, `label`, `type`, `default`, `step`, `min`, `help`).
- `providerType`: select, options aligned to how CQC bands fees, e.g. "Residential or nursing home (banded by registered places)" and "Community or domiciliary provider (banded by service-user capacity)". Use the live scheme's actual categories.
- `registeredPlaces`: number (beds), shown when providerType = residential/nursing. min 0, step 1, sensible default (e.g. 20).
- `serviceUserCapacity` (or the live scheme's community-band input): number, shown when providerType = community. min 0.
- `locations`: number of registered locations, min 1, default 1 (if the live scheme charges per location or aggregates, encode what the scheme actually does; comment the assumption).
- Keep inputs to what the fee scheme actually keys on. Do NOT add inputs that do not drive the fee.

## Outputs (compute → {headline, rows, note})

- `headline`: the annual CQC registration fee for the entered configuration, e.g. label "Estimated annual CQC registration fee", value `gbp(fee)`, sub showing the band the provider falls into and the scheme year. `tone`: "default" (this is a factual fee, not a good/bad signal; do not colour it warn/good).
- `rows`: the band matched, the number of places/capacity, the fee for that band, and (if multi-location and the scheme aggregates) the combined figure. Every row traceable to the pinned scheme.
- `note`: state the scheme year/effective period, that CQC sets and publishes these fees, and that the operator must confirm the current figure on CQC's fee scheme before budgeting (link the CQC source). Same spirit as the FNC `note`.

## explainer

Heading + 3 to 5 paragraphs, operator frame: what the CQC fee is (a statutory annual fee for being registered, not a one-off), that it is banded by scale of regulated activity, that it is a permanent overhead separate from business rates (HP 20) and from any consultant/accountant fee, and that scope of registration drives the band. Cite CQC's fee scheme. No pricing for any professional service. Cross-reference (in prose, as internal links are handled by the page shell) the CQC registration cost blog and the FVS service.

## faqs (2+, question/answer)

- What is the CQC registration fee for 2026 (or the encoded scheme year)? Answer states the encoded scheme year and points to CQC's live scheme for the definitive figure.
- How is the CQC fee calculated? banded by registered places (homes) or service-user capacity (community), per the CQC fee scheme.
- Is the CQC fee a one-off or annual? annual, a recurring overhead.
- Does the CQC fee depend on the number of beds? yes for residential/nursing, via the places bands.
- Is the CQC fee the same across the UK? no, CQC fees are England only; Scotland/Wales/NI have separate regulators and fee regimes (do not give their figures).

## Golden test cases (cqc-fee-calculator.test.ts, assert-based, model fnc-fee-mix.test.ts)

The author writes these against the ACTUAL pinned band figures (fill the expected pounds from the encoded constants, not from this brief):
1. Residential home at the low end of a places band returns that band's fee (not the neighbouring band's).
2. Residential home exactly ON a band boundary returns the correct side of the boundary (verify the scheme's boundary rule: inclusive/exclusive, and test both the boundary value and boundary±1).
3. Community/domiciliary provider at a given service-user capacity returns the matching community-band fee.
4. Zero / empty input (0 places) returns a defined result, not NaN (either the smallest band or a clear zero, per how the scheme treats a nil registration, commented).
5. Very large places value returns the top band's fee and does not fall off the end of the band table (top band is a catch-all or the scheme's stated ceiling).
6. Switching providerType reads the correct input and the correct band table (residential input ignored in community mode and vice versa).
7. Multi-location: if the scheme aggregates or charges per location, the combined figure matches the scheme's rule (test the specific rule encoded).
Each test asserts the numeric output equals the value derived directly from the pinned constants, so if a future scheme update changes a constant, the test flags the drift.

## Edge cases to handle in compute

- Input below the first band / zero: defined behaviour, no NaN, commented.
- Input above the top band: clamp to top band (or scheme ceiling), commented.
- Band boundary values: match the scheme's exact boundary rule; the tests above lock this.
- providerType switching: only the relevant input drives the fee.
- Non-numeric/negative input: `Math.max(0, Number(v.x))` guard as in fnc-fee-mix.ts.
- England-only scope: the note/FAQ must say CQC fees are England only; do not attempt devolved fees.

## House positions touched

- HP 20 (context only): care homes pay business rates, a SEPARATE cost from CQC fees; SBRR below £15,000 RV. https://www.gov.uk/apply-for-business-rate-relief/small-business-rate-relief
- HP 21 (context): registration mandatory before regulated activity. https://www.cqc.org.uk/guidance-providers/registration
- NO HP covers the CQC fee amount, that is why this tool pins it from CQC's live fee scheme with a FLAG. (Not a house position; author-verified at build.)

## Hallucination danger zones

- **Every fee figure MUST come from the live CQC fee scheme, pinned as a commented constant with a FLAG. NEVER a remembered or estimated amount.** If the scheme cannot be fetched, stop and flag; do not ship.
- Do NOT invent band boundaries, band counts, or the banding basis; encode the scheme's actual structure. If reality differs from this brief's description of the bands, follow reality and comment it.
- No professional-service pricing (consultant/accountant) anywhere.
- The tool is a factual fee estimator; do not colour the headline as good/bad and do not imply the fee is negotiable.
- England only.
- Medical-adjacency wall: nothing clinical.

## Stage-2 TODO

- Fetch and confirm the exact live CQC fee-scheme URL, effective period, and both band tables (residential per-places, community per-capacity). Pin every figure as a commented constant with a FLAG.
- Write cqc-fee-calculator.test.ts golden cases against the pinned constants; run it and `npx tsc --noEmit` from care/web; report the actual command output.
- Register the tool in registry.ts GENERIC[] (add the import + array entry, keep the file's shape).
- Confirm the CQC registration-cost blog slug and /services/cqc-financial-viability-statement route for the explainer's internal references.
