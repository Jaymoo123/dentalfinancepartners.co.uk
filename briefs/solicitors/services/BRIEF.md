# Opus brief — solicitors /services core-page rewrite (2026-07-19)

Architect: Opus 4.8. Pipeline: TSX metadata/H1/intro/FAQ/schema + catcher link-ups. No visual redesign.

## The problem (from engine + ledger)
- 46 head-family queries, 1,576 impressions/90d, `/services` owns only 1.
- 1,007 national head impressions land on the WRONG page. Money queries sit at position 55-66 with 0 clicks. Position is the binding constraint (site expected-CTR curve ~0% beyond pos 15), so the lever is winning the head family onto one strong page, not snippet tweaks.
- Top catchers stealing the head family:
  - `/contact` — 13 head queries, 471 impr. Ranks **pos 18-22 for "accountant(s) for lawyers"** (striking distance) while `/services` sits 41-63 for the same family. Google picked the wrong page.
  - `/blog` index — 8 head queries, 111 impr, pos 70-80. Leaking head-term impressions with no chance of ranking.
  - Homepage — already owns "law firm accountants" (pos 59), title carries head token; leave it, do not stack.
  - Locations (Leeds/Manchester/London) — geo intent, keep local. `/locations/leeds` is HELD (ranking-maturation to 2026-08-07): DO NOT TOUCH.
- Engine `h1_is_keywordless=true` flag: title is doubled ("Accounts for Lawyers | Accounts for Lawyers") and carries no clean head token. **Highest-leverage single fix.**
- Depth is fine (1,085 words vs competitor median 167; ICAEW/e2e are the only deep competitors). This is a targeting/consolidation problem, not a thin-content problem.

## Overlap check (plan step 1) — CLEAR
`/services`, `/contact`, `/blog` index, homepage are NOT in the serp-meta batch-2 hold set (19 held pages are all deep blog posts; solicitors_ledger.md §1). No META register entry for solicitors. `/locations/leeds` IS held → excluded from this run.

## Decisions
1. **`/services` owns the national head family** ("accounting/accountants for solicitors", "accountant(s) for lawyers", "solicitor accountant(s)", "law firm accounting services", "accountants for legal firms").
2. **/contact → /services query migration (OWNER APPROVED, plan §4 W1)**: soften /contact title to conversion-only (drop the head token so it stops out-ranking /services for the money query), add a prominent in-body link from /contact to /services anchored on the head phrase. No redirect (not a URL merge). Keep /contact conversion-only.
3. **/blog index**: soften title (drop bare "Solicitor Tax" head-ish framing to a clearer editorial title), add an exact-match link-up to /services in the intro so the index stops competing and passes signal up.
4. **/services on-page**: title carries clean head token + brand once; H1 already reads "Accountants for UK solicitors and law firms" (keep, it is the exact head phrase); intro leads with "accountants for solicitors" + "accountants for lawyers"; grow FAQ to 8 with head-phrase questions; add national LocalBusiness schema (AccountingService, areaServed GB), repoint Service provider to `#organization`, keep breadcrumb + FAQPage.
5. **Homepage**: no change (already owns its slice; stacking would pollute attribution).

## Fact-check (against ground truths + canonical rate pages)
- BADR 14%→18% on 6 Apr 2026 — CORRECT (badr_18pc_2026 ground truth). Already on page, keep.
- FA 2014 Salaried Member conditions (A 80% disguised salary / B limited influence / C capital <25%) — CORRECT.
- No dividend/NIC/AMAP figures are stated on /services; nothing to patch. Do not introduce new rate numbers.
- No em-dashes anywhere in new copy.

## FAQ additions (grown 5 → 8; JSON-LD auto-derived by buildFaqPage, never hand-written)
Add head-phrase-bearing Qs:
6. "Are you accountants for solicitors across the whole UK?" (national coverage answer → captures "accountants for solicitors", "accounting for solicitors").
7. "Do you act as accountants for lawyers and barristers?" (captures "accountants for lawyers", "accountant for lawyers").
8. "How are your fees structured?" (conversion / commercial-intent, reinforces fixed-fee).

## Measurement plan
Weekly GSC page×query on the head family for `/services`. Success = head family (accounting/accountants for solicitors, accountant(s) for lawyers, solicitor accountant(s)) moving from pos ~55-66 to **<30 within 6 weeks**, and the "accountant for lawyers" family migrating off /contact onto /services. Re-pull GSC (never stored tables) at +3wk and +6wk. Confound: no other intervention on these 4 URLs until 08-05.
