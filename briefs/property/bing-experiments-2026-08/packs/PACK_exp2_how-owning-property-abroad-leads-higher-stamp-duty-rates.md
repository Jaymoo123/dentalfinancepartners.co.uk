# Pack (experiment 2, tables): `how-owning-property-abroad-leads-higher-stamp-duty-rates`

## 1. Target and permission
- File: `Property/web/content/blog/how-owning-property-abroad-leads-higher-stamp-duty-rates.md`
- Change: insert exactly ONE comparison or rates table (`<table>` HTML, matching the post's
  existing markup style), at the single most relevant point in the body, with a one-sentence
  lead-in. Nothing else changes.
- The table content must come from figures ALREADY in the post (or house_positions.md if the
  post cites the same fact); it restructures, it does not add new claims.
- Baseline: Bing 78 impr / 8 clicks @ wpos 4.23 (90d floor); Google 28d 299 impr / 4 clicks.

## Rules (identical for every page in this experiment)

- ADDITIVE ONLY. Existing metaTitle, H1, H2 order, body prose, FAQ entries: byte-identical.
  The diff may only INSERT the new block. Equity gate blocks anything else.
- Every figure re-derived from the post's own stated figures or docs/property/house_positions.md.
  No new external facts without a statute or gov.uk source already cited in the post.
- No em-dashes anywhere. Voice matches the surrounding post (read it first).
- One change per page. Nothing else touched, no internal-link additions, no meta changes.
- Revert path: single-file git revert.

## Demand this page serves on Bing (pick the table subject that serves the biggest block)

- `increased rate stamp duty overseas property` : 8 impr, pos 2.0
- `sdlt additional property abroad` : 4 impr, pos 3.5
- `sdlt higher rates gift property abroad uk purchase` : 3 impr, pos 3.0
- `main residence was in france still count as replacement` : 2 impr, pos 5.0
- `do you pay additional stamp duty if you own property abroad` : 2 impr, pos 4.0
- `sdlt uk resident purchasing overseas property` : 2 impr, pos 2.0
- `sdlt overseas` : 2 impr, pos 6.0
- `uk resident with property abroad wants to buy property in uk. what is sdlt situation?` : 2 impr, pos 1.0
- `like#n##n#dislike#n#owning a property abroad can trigger the higher 5% sdlt rate on uk property purchases, even if it is your first uk home.#n#how overseas property affects sdlt#n#if you own a residential property anywhere in the world worth £40,000 or more, it counts as a` : 2 impr, pos 3.0
- `sdlt ifowning a holiday home abroad` : 2 impr, pos 4.0
- `sdlt situation in k for expat with property in france` : 2 impr, pos 2.0
- `max property value abroad to still be classed as a ftb in uk` : 2 impr, pos 4.0

## 2. Equity register (must still match after the edit; additive edits preserve this by construction, the gate verifies)

Bing 90d (weekly rows summed), every query with an impression:

- `increased rate stamp duty overseas property` : 8 impr, 0 clicks, pos 2.0
- `sdlt additional property abroad` : 4 impr, 1 clicks, pos 3.5
- `sdlt higher rates gift property abroad uk purchase` : 3 impr, 0 clicks, pos 3.0
- `main residence was in france still count as replacement` : 2 impr, 0 clicks, pos 5.0
- `do you pay additional stamp duty if you own property abroad` : 2 impr, 0 clicks, pos 4.0
- `sdlt uk resident purchasing overseas property` : 2 impr, 1 clicks, pos 2.0
- `sdlt overseas` : 2 impr, 0 clicks, pos 6.0
- `uk resident with property abroad wants to buy property in uk. what is sdlt situation?` : 2 impr, 0 clicks, pos 1.0
- `like#n##n#dislike#n#owning a property abroad can trigger the higher 5% sdlt rate on uk property purchases, even if it is your first uk home.#n#how overseas property affects sdlt#n#if you own a residential property anywhere in the world worth £40,000 or more, it counts as a` : 2 impr, 1 clicks, pos 3.0
- `sdlt ifowning a holiday home abroad` : 2 impr, 0 clicks, pos 4.0
- `sdlt situation in k for expat with property in france` : 2 impr, 1 clicks, pos 2.0
- `max property value abroad to still be classed as a ftb in uk` : 2 impr, 0 clicks, pos 4.0
- `does my hoiuse abroad affect stamp duty for my main red##` : 2 impr, 0 clicks, pos 7.0
- `do i pay stamp duty if i own a property abroad` : 2 impr, 0 clicks, pos 4.0
- `if you own property abroad does higher rate of stamp duty apply?` : 2 impr, 0 clicks, pos 5.0
- `i own a property abroad , is there any way i could avoid additional stamp duty?` : 1 impr, 1 clicks, pos 8.0
- `uk sdlt does overseas property count as additional` : 1 impr, 0 clicks, pos 2.0
- `stamp duty tax applicable if i own extra property outside the uk` : 1 impr, 0 clicks, pos 3.0
- `does the higher rates for additional dwellings stamp duty in the uk apply to overseas property` : 1 impr, 0 clicks, pos 7.0
- `sdlt calculation interest in property abroad` : 1 impr, 1 clicks, pos 3.0
- `non resident sdlt` : 1 impr, 0 clicks, pos 8.0
- `non uk plus additional dwelling` : 1 impr, 0 clicks, pos 9.0
- `sdlt on principal privare residence and foreign property` : 1 impr, 0 clicks, pos 9.0
- `stamp duty on property abroad` : 1 impr, 0 clicks, pos 4.0
- `client owns a property in ukraine will this affect sdlt` : 1 impr, 0 clicks, pos 3.0
- `what is the sdlt imlication if two directors live abroad uk` : 1 impr, 0 clicks, pos 10.0
- `to work out sdlt does it include owning properties anywehere in the world or just uk` : 1 impr, 0 clicks, pos 4.0
- `how do the goverment know i bought a property abroad to be able to collect stamp duty` : 1 impr, 1 clicks, pos 2.0
- `stamp duty property abroad` : 1 impr, 0 clicks, pos 7.0
- `is higher rate stamp duty payable if property owned abroad` : 1 impr, 0 clicks, pos 5.0
- `uk stamp duty additional residential property in spain` : 1 impr, 0 clicks, pos 5.0
- `what kind of stamp duty do i pay if own properties abroad which used to be my main residedence` : 1 impr, 0 clicks, pos 3.0
- `stamp duty for overseas clients` : 1 impr, 0 clicks, pos 6.0
- `does higher stamp duty rate apply to properties owned in another country` : 1 impr, 0 clicks, pos 2.0
- `what kind of stamp duty do i pay if own properties abroad` : 1 impr, 0 clicks, pos 4.0
- `first time buyer stamp duty relief if own a property under £40,000 abroad` : 1 impr, 1 clicks, pos 3.0
- `owning a property abroad and sdlt` : 1 impr, 0 clicks, pos 2.0
- `do i have to pay higher rate stamp duty if i own a property abroad` : 1 impr, 0 clicks, pos 8.0
- `sdlt additional property holiday home abroad` : 1 impr, 0 clicks, pos 3.0
- `do you pay higher sdlt if you own a property abroad but are living in the uk` : 1 impr, 0 clicks, pos 7.0
- (+14 more, all protected)

Google 28d:

- none

## Acceptance
1. Diff is insert-only (one table block + lead-in sentence).
2. Every table figure re-derivable from the post or house_positions.md, stated per §6 QA.
3. No em-dashes, no new links, valid HTML table.
