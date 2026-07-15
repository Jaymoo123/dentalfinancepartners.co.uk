---
type: section-addition (NOT a new page)
target_page: hospitality/web/src/app/research/hospitality-openings-closures-index/page.tsx
target_data: hospitality/web/src/data/uk-hospitality-openings-closures-index.json
route: /research/hospitality-openings-closures-index#restaurants-count
intent: DIY-INFORMATIONAL. Answer "how many restaurants are in the UK" (~210/mo) inside the existing flagship data asset. Cheap add: one Section + one headline data key, mirroring the existing pub-count section.
---
# Section addition: "How many restaurants are in the UK?" on the Openings & Closures Index

> Wave-2 asset. This is a SECTION brief, not a new page. Add ONE `<Section>` to the existing index page and ONE headline data key to its JSON, mirroring the built pub-count section EXACTLY. No new route, no new page, no restructure. No em-dashes. Faceless.

## Target query (evidence: pool DIY cluster; "how many restaurants in the uk" ~210/mo; sibling to the "how many pubs" 3,600/mo query the pub section already answers; Google Ads UK + Labs 2026-07-11)

- Primary: "how many restaurants in the uk" / "number of restaurants uk" / "how many restaurants are there in the uk" (~210/mo, DIY-informational)
- Intent: answer-box / GEO. Same play as the existing pub-count section (`id="pubs"`, "How many pubs are in the UK?"): give the citable live register count with the SIC caveat. Feeds internal links + AI-answer presence, not a lead metric.

## Why a section, not a page (dedup + scope)

- The flagship asset `/research/hospitality-openings-closures-index` ALREADY holds the pub-count answer and the full sub-trade quarterly tables (including `restaurants_cafes`). Adding a restaurant-count answer as a new PAGE would cannibalise this asset. Correct move: extend the asset with a sibling section, exactly as the pub-count section was built.
- **Dedup**: no estate page answers "how many restaurants in the UK". The generalist restaurant post is a hire pitch, not a data page. No collision. The `restaurants_cafes` sub-trade table already lives lower on this page (quarterly flow); the new section adds the missing LIVE COUNT headline + a plain-English answer, the same shape as `pub_count_proxy`.

## Exact implementation spec

### 1. Data (`uk-hospitality-openings-closures-index.json`)

Add a sibling to the existing `headline.pub_count_proxy` object. Current shape (verified in file):
```json
"pub_count_proxy": {
  "description": "Live active companies with SIC 56301 (public houses and bars) or 56302 (licensed clubs) on the Companies House register as at 2026-07-12",
  "count": 42280,
  "as_of": "2026-07-12"
}
```
Add, in the same `headline` object:
```json
"restaurant_count_proxy": {
  "description": "Live active companies with SIC 56101 (licensed restaurants), 56102 (unlicensed restaurants and cafes) or 56103 (takeaways and mobile food stands) on the Companies House register as at <AS_OF>",
  "count": <LIVE_COUNT>,
  "as_of": "<AS_OF>"
}
```

**HP GAP / DATA GAP — MUST FLAG, DO NOT INVENT**: the live restaurant/cafe register count (`<LIVE_COUNT>`) is NOT in the current data and is NOT a house position. The pub count (42,280) was pulled live on 2026-07-12; the restaurant/cafe count was not. The worker must NOT fabricate a number. Two options, pick per orchestrator instruction at write time:
- (a) The count is supplied by the data-pull step (same Companies House register query for SIC 56101/56102/56103, as-of the existing `meta.pull_date` 2026-07-12) and dropped into `<LIVE_COUNT>` / `<AS_OF>`. This is the correct source (HP 27: counts derive from Companies House SIC 55/56 registrations; the self-reported SIC caveat must be stated). Verification: https://download.companieshouse.gov.uk/en_output.html (bulk register snapshot) and https://resources.companieshouse.gov.uk/sic/ (SIC 56 structure). Named in HP 27.
- (b) If the live count is not available at write time, DO NOT ship a fabricated number. Either omit the headline `count` and write the section around the sub-trade quarterly flow only (net openings, which IS in the data), or block the asset until the count is pulled. Flag to the orchestrator.

**SIC grouping (VERIFIED in JSON)**: `restaurants_cafes.sic_codes = [56101, 56102, 56103]` (56103 = "takeaway food shops and mobile food stands"). The page ALSO has a SEPARATE `takeaways` sub-trade at SIC [56210, 56290] (event catering and other food service). So on this page "takeaway food shops" (56103) live UNDER restaurants_cafes, while the `takeaways` sub-trade bucket is 56210/56290. To stay consistent with the page and avoid an internal contradiction, make the restaurant count `restaurants_cafes` = SIC 56101/56102/56103 and describe it as "restaurants, cafes and takeaway food shops" (matching the `restaurants_cafes.label` = "Restaurants & Cafes"). Do NOT fold in the separate `takeaways` (56210/56290) bucket. The `<LIVE_COUNT>` pull must use SIC 56101/56102/56103 to match.

### 2. Page (`page.tsx`)

Add ONE `<Section>` immediately AFTER the existing `id="pubs"` section (line ~129) and BEFORE the `id="overview"` section. Mirror the pub section's markup exactly (same `<Section>` component, same `<strong>{fmt(...)}</strong>` count treatment, same SIC caveat sentence). Use `headline.restaurant_count_proxy`. Suggested id: `restaurants-count` (avoid clashing with the sub-trade loop key `restaurants_cafes` and the existing `restaurants` hub concept). Suggested copy (adapt to the confirmed SIC grouping, keep the sole-trader caveat verbatim in spirit):

```
<Section id="restaurants-count" title="How many restaurants are in the UK?">
  <p>
    As at {headline.restaurant_count_proxy.as_of}, the Companies House register shows{" "}
    <strong>{fmt(headline.restaurant_count_proxy.count)}</strong> active companies with
    SIC code 56101 (licensed restaurants), 56102 (unlicensed restaurants and cafes) or
    56103 (takeaway food shops and mobile food stands). This is the incorporated-business count:
    sole-trader and partnership restaurants and cafes are not captured in Companies House
    data, so the true count across all business types is higher. The figure updates each
    quarter as new incorporations and dissolutions are filed.
  </p>
</Section>
```

Optionally add a third headline `<Stat>` in the `-mt-8 grid` block (line ~110) for the restaurant count, mirroring the pub `<Stat>` — ONLY if the count is available; the grid is `sm:grid-cols-3` and currently holds 3 stats, so adding a 4th needs a `sm:grid-cols-2 lg:grid-cols-4` tweak. **Ponytail note**: skip the extra Stat, add when the count is confirmed and the owner wants it in the hero. The Section alone answers the query and is the minimal change.

### 3. Constraints (do NOT break)

- Keep `Section`, `Stat`, `fmt`, `fmtNet`, `datasetSchema`, and the JSON shape unchanged.
- Do NOT touch the sub-trade loop, the methodology section, or the embed route.
- The Dataset schema `variableMeasured` already covers "Live pub and bar company count" — optionally add "Live restaurant and cafe company count" to the array (one line), consistent with the new data. Reversible, no risk.
- No em-dashes. Keep the sole-trader caveat (matches HP 27 self-reported-SIC honesty rule).

## Figures mapped to HP / ledger

- HP 27: Companies House SIC 55/56 counts; SIC 56101/56102/56103 for restaurants/cafes/takeaways; self-reported-SIC caveat must be stated. https://resources.companieshouse.gov.uk/sic/ and https://download.companieshouse.gov.uk/en_output.html
- HP 28: dissolution/closures figures reconciled against Insolvency Service before any closures headline. (Applies only if the section adds a closures claim; the count itself is a register snapshot, no reconciliation needed, but do not add a "restaurant closures" headline without HP 28 reconciliation.)

## Hallucination danger zones

- The live restaurant count is a DATA GAP — never fabricate `<LIVE_COUNT>`. Pull it from the Companies House register (HP 27 source) or omit the count.
- State the self-reported-SIC caveat and the sole-trader-not-captured caveat (matches the pub section).
- Keep the SIC grouping in the count description consistent with the `restaurants_cafes.sic_codes` array already in the JSON.
- No closures headline without HP 28 Insolvency Service reconciliation.
