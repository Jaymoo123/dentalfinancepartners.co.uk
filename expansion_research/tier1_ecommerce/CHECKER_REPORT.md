# CHECKER_REPORT — R3 ecommerce/Amazon-seller dossier (independent verification)

Date: 2026-07-12. Checker: fresh-context agent, per EXPANSION_PROGRAM.md doctrine (read first).
Spend: $0 paid (WebFetch/WebSearch only, no Serper/DataForSEO). No guard edits, no git commits,
no files written outside tier1_ecommerce/ (this report only).

**Overall: VERIFIED-WITH-CORRECTIONS** (all corrections are bookkeeping/nuance; no headline
claim, count, or the narrower-deeper verdict is undermined).

## 1. Rival classing — PASS

Live-checked 15 rivals across tiers (10 fetch + 5 independent search confirmations):

| Rival | Tier claimed | Checker result |
|---|---|---|
| ecommerceaccountants.co.uk | DEDICATED | Fetch: "Amazon, Shopify & DTC Specialists", ACCA 4906845, Xero Platinum, 500+ clients — all evidence quotes confirmed |
| unicornaccounting.co.uk | DEDICATED | Fetch: "Yes. Ecommerce is all we do." Confirmed |
| nentara.com | DEDICATED (content site) | Fetch: "UK Amazon Seller VAT & Accounting Guides" resource site — confirmed |
| elverecommerceaccountants.co.uk | DEDICATED (search) | Direct fetch SUCCEEDED for checker: ecommerce-only, Wigan, "£500k to £15m+" verbatim — confirmed |
| yourecommerceaccountant.co.uk | DEDICATED (search) | Fetch blocked (empty body) as producer recorded; search confirms exact title, Taunton, founded 2012, eComLedger own software |
| e-accounts.co.uk | DEDICATED (search) | Fetch blocked; search confirms "From £29/PM" ecommerce page, TikTok/Vinted coverage |
| ecommaccountant.co.uk | DEDICATED (search) | Fetch blocked; search confirms Evara, fixed-fee Amazon/Shopify/eBay/Etsy + OSS/IOSS |
| ecommerceaccountants.uk | DEDICATED (search) | Fetch 403; search confirms exact title "VAT Returns & Bookkeeping for Online Sellers" (operated by RR Accountants — arguably SECTION-of-RR, but the brand/domain is dedicated; classing defensible) |
| theaccountancy.co.uk | SECTION (search) | Search confirms /industries/amazon-ecommerce-accountants "From £24.50 per month" |
| tax-wise.co.uk | SECTION (search) | Search confirms /accountants-for-amazon-sellers on a general Taxwise firm |
| sterlinxglobal.com | SECTION (flagged) | See below |
| a2xaccounting.com | ADJACENT | Fetch: settlement SaaS + certified-accountant directory ("largest network of certified ecommerce accountants") — confirmed |
| linkmybooks.com | ADJACENT | Fetch: "Accurate Ecommerce Accounting on Autopilot" SaaS — confirmed |
| archimediaaccounts.co.uk | SECTION (search) | Not independently re-fetched; evidence structure consistent with sweep data — accepted |
| gmprofessionalaccountants.co.uk | SECTION (search) | Not re-fetched; accepted on sweep evidence |

(a) **Search-only-verified count discrepancy (correction, minor):** competitors.json marks
**9** rivals `verified_via: search`; r3_call_plan.md line 30 says "7 rivals... + 1 addition"
(= 8) and omits **tax-wise.co.uk** from the list. Actual is 9. All 9 checked or accepted;
5 independently re-confirmed by this checker with matching evidence. Correct r3_call_plan.md
wording. Note also elver now fetches fine (transient block).

(b) **sterlinxglobal.com kept SECTION:** checker fetch shows the homepage *presents* as an
ecommerce/Amazon-FBA specialist ("We only serve the businesses that we specialize in...
Amazon FBA, eCommerce and traditional bookkeeping") but the homepage title is generic
Liverpool and the firm spans UK generic + EU VAT + USA accounting/sales tax. The producer's
"borderline dedicated... kept SECTION" reasoning is a defensible judgment call, and it is
conservative in the direction that UNDER-states the dedicated field. If reclassed DEDICATED
the field gets harder, not easier — verdict unaffected. No correction required.

(c) **Bot-blocked excluded 10 — DDG/search-recovered a sample of 4** (sterlingandwells.com,
pearllemonaccountants.co.uk, chacc.co.uk, feralhq.co.uk): **no dedicated brand hides there.**
All four are general firms/bookkeepers with ecommerce section pages. However,
**sterlingandwells.com IS search-recoverable** (full ecommerce service tree:
/services/accountants-for-amazon-sellers/, shopify, ebay, woocommerce) and would class
SECTION — as would chacc and feralhq. The "not search-recovered" exclusion claim is
slightly overstated; the effect is an UNDER-count of SECTION (field harder still).
Correction: note in COMPETITORS.md that a sample of the excluded 10 recovers as SECTION-tier.

## 2. Estate-dupe audit — PASS

- topic_pool.json dropped_fuzzy = 11 pairs on disk. Generalist-page matches: "accountant for
  ecommerce business" ×2, "accountant for amazon fba sellers uk" ×3, "accountant for etsy
  sellers uk" ×2 = **7 of 11 to generalist, exactly as claimed.** Plus 1 exact drop
  ("accountant for ecommerce business") = 8 of 12 hard drops to generalist ✓.
- own_estate_exclusion.json contains exactly **six** generalist ecommerce-segment pages
  (amazon-fba-sellers-uk, dropshippers-uk, ecommerce-business, ecommerce-sellers,
  etsy-sellers-uk, shopify-stores) ✓.
- Live-fetched 3 of the 6 generalist pages (amazon-fba, etsy, shopify): all live, all
  published 17 May 2026, all squarely on this niche's HIRE head terms. The "generalist wall"
  conflict is real and correctly escalated as owner-gate question #1.
- 40 estate_conflict_flagged rows sampled: map to those generalist slugs ✓.

## 3. Citations — PASS (10/10)

Live-fetched 10 of 32: vat-registration (via citation_checks: £90,000 found), online-
marketplaces deemed-supplier (liability split confirmed verbatim), £135 direct-sales rule
(confirmed), FA 2026 s.4 (8.75→10.75, 33.75→35.75 quoted), s.28 ("for '18%' substitute
'14%'"), s.29 (40% FYA table entry), rates-and-thresholds 2026-27 (15% / £5,000 confirmed),
trading allowance £1,000 (confirmed), BIM33115 lower-of-cost-or-NRV (confirmed), and the
**remapped NI→EU distance-sales OSS page** (live, "One Stop Shop"/"Northern Ireland" anchors
present as raw/citation_checks.json records).

**Nuance flag (not a fail):** the outline's position 10 asserts the **£8,818 (€10,000)**
threshold, but the cited NI OSS page does not carry that figure (s6 only checked the two
anchor phrases, which is what "32/32 pass" honestly means). Add a second citation for the
threshold figure at build time.

## 4. Numbers audit — PASS (recomputed from disk)

- raw_pool_size 4,163; drops 1 exact + 11 fuzzy = 12; kept then norm-deduped (257 merges)
  → 3,894; − 734 junk = **3,160 final** ✓ (matches keyword_pool_final).
- clusters list length = **2,331** ✓.
- Hard-dupe rate 12/4,163 = **0.288% ≈ 0.29%** ✓. Flagged = 40 ✓.
- competitors.json: 14 + 47 + 21 = **82**, tier Counter matches exactly ✓.
- citation_checks.json: 32 entries, all status 200, all phrases_found == phrases_expected ✓.

## 5. Verdict audit (narrower-deeper, not PARK; build last) — PASS with one wedge downgraded

- Wedge 1 (fee+VAT+income-tax JOINED calculators): rival_sitemaps grep finds 125 calculator
  URLs — fee/profit calculators (ecomcalctools, linkmybooks roundups, marginwise) and
  standalone tax calculators (ecommerceaccountants.co.uk /tax-calculator, fzcoltd income-tax)
  exist SEPARATELY; no joined fee+VAT+income-tax tool found. **Vacant as claimed.**
- Wedge 2 (CH SIC-47910 data asset): 0 sitemap hits for any business-index-style asset
  across 22 crawled rivals. **Vacant as claimed.**
- Wedge 3 (UK-seller-first marketplace-VAT edge cases): dossier itself concedes the
  cross-border VAT layer is crowded from the EU side; "narrow but real" is an honest framing,
  supported by the deemed-supplier citation evidence. **Accepted as narrow-vacant.**
- Wedge 4 (HMRC platform-report response service): **downgrade "verified vacant" to
  "service-level vacant, content-level contested"** — sitemap grep finds 3 rival blog posts
  on platform reporting (syncaccountants, socialcommerceaccountants ×2). The SERVICE wedge
  may still be open, but rival content exists. Correction: soften the wedge-4 wording in
  DOSSIER.md.
- PARK-rejection reasoning: internally consistent (real lead value per R2, 2 of 4 wedges
  cleanly vacant + 1 narrow + 1 partial, data-asset PR route). "Build last" and the
  volume-re-score-before-R4 caveat are the right hedges given zero volume data this run.
  The verdict HOLDS on the evidence.

## 6. Hard rules — PASS

- raw/ contains NO DataForSEO files (autocomplete, serp_raw, rival_sitemaps,
  verify_evidence, citation_checks, estate snapshot, judge summary only) ✓ zero-DFS claim.
- DATAFORSEO_ABORT_AT default 0.85 in optimisation_engine/config.py, env-override form is
  the committed owner-sanctioned change (commit 6ed3327a, other niches' enrichment) — not
  this producer's doing ✓.
- tier1_ecommerce/ is fully untracked: **no git commits by the producer** ✓.
- No producer writes outside tier1_ecommerce/ attributable in the working tree ✓.

## Corrections needed (all minor, none blocking)

1. r3_call_plan.md: search-verified rival list says 7+1; competitors.json has 9 (add
   tax-wise.co.uk to the list, state 9).
2. DOSSIER.md / COMPETITORS.md: soften wedge 4 from "verified vacant" to service-level
   vacant (3 rival blog posts exist on platform reporting).
3. COMPETITORS.md drop log: "not search-recovered" is overstated for the excluded 10 — a
   checker sample recovers sterlingandwells/chacc/feralhq as SECTION-tier (no dedicated
   brands; SECTION count is under- not over-stated).
4. HOUSE_POSITIONS_OUTLINE position 10: add a second citation for the £8,818/€10,000
   threshold at build time (cited page passes anchors but lacks the figure).
