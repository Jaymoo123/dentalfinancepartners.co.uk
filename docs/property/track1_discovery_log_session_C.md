# Session C — discovery log

**Append-only.** While researching and writing your assigned pages, log here anything you notice that the orchestrator should consider for future waves or broader site work. Keep entries terse — one paragraph max each.

**Format:** `## [TIMESTAMP UTC] [CATEGORY] Title` + body.

**Categories:**
- `ADJACENT_TOPIC` — a topic-gap candidate adjacent to your assignment that's NOT in `docs/property/topic_gaps_final.md` (subsequent waves should consider it)
- `CALCULATOR_IDEA` — this page or topic would clearly benefit from an interactive calculator / widget
- `COMPONENT_IDEA` — a UI pattern a competitor uses that we lack (comparison table style, decision matrix, downloadable PDF template, video walkthrough)
- `EXISTING_PAGE_STALE` — while researching, you noticed an EXISTING page (not in your assignment) that has out-of-date figures / framings / claims (feed into Track 2 sweep)
- `EXISTING_PAGE_LINK_OPPORTUNITY` — an existing page should link to your new page (cross-link not currently in our network)
- `CROSS_NICHE_LINK` — a topic that bridges niches (e.g. GP partner landlords → cross-link Property ↔ Medical when both pages exist)
- `AUTHORITY_GAP` — an HMRC manual / legislation page / case-law judgment our site doesn't cite anywhere but should
- `SERP_FEATURE` — a SERP feature (featured snippet, knowledge panel, video carousel) competitors are winning on this topic that we could target
- `INTERNAL_RESEARCH` — a question you couldn't answer with public sources; would benefit from in-house data or expert input

**Why log this:** observations made during your work are the most valuable input we have for prioritising future waves. The next-wave brief builder should read this file before generating new briefs.

**How orchestrator uses it:** weekly. Discovery log entries feed into:
- Next-wave Track 1 brief generation (ADJACENT_TOPIC entries)
- Track 2 prioritisation (EXISTING_PAGE_STALE entries get pushed up the queue)
- Component build backlog (CALCULATOR_IDEA + COMPONENT_IDEA entries)
- Cross-niche linking table (CROSS_NICHE_LINK entries)
- Authority-link library updates (AUTHORITY_GAP entries)

---

## [Sessions: append below this line]

## [2026-05-22 09:55 UTC] [EXISTING_PAGE_LINK_OPPORTUNITY] ATED pillar (C10) needs cross-links from C11/C12/C13 once they ship
C10 (ated-complete-guide-2026-27) was written before its daughters. The pillar currently contains three "linked from this pillar once published" sentinel sentences in place of forward links to: ated-rental-property-relief-mechanics (C11), ated-15-percent-flat-rate-sdlt-interaction (C12), and ated-late-filing-penalties-mechanics (C13). When each daughter ships, edit the pillar to wrap the sentinel sentence with the proper `<a href>` to the daughter URL. The sentinel phrasing "(linked from this pillar once published)" is the search anchor.

## [2026-05-22 09:55 UTC] [CALCULATOR_IDEA] ATED band-boundary calculator
A simple interactive that takes a property value and returns (a) the 2026/27 ATED band, (b) the annual charge, (c) whether the value is within 10% of a boundary and a Pre-Return Banding Check is worth requesting, (d) for relievable properties, the day-count apportionment shown as a slider. ATED is one of the simplest tax calcs to model (six bands, one input) and the band-boundary signalling is high-value for the corporate-landlord audience.

## [2026-05-22 09:55 UTC] [AUTHORITY_GAP] Schedule 4A FA 2003 (15% flat-rate SDLT) and FA 2013 Part 3 (ATED)
These two statutory references are the spine of any company-owned-residential-property page, but a fast scan of our existing content suggests neither is cited by URL anywhere on the site. C10 cites them inline as text; future ATED / company-purchase content should link to the legislation.gov.uk versions directly so HMRC compliance teams treat us as a legitimately authoritative voice.

## [2026-05-22 09:55 UTC] [EXISTING_PAGE_STALE] ATED-related CGT (abolished 2019) — check site for stale references
Worth a sweep: any existing Property page that mentions "ATED-related CGT" without flagging that it was abolished from 6 April 2019 is technically wrong (the regime is now non-resident company CGT under the standard rules). Track 2 sweep candidate.

