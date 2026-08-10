# Lead Engine build — decisions log

Judgement calls made during the build, per the brief's ground rule 5. Owner decisions taken interactively are marked OWNER.

## Operating model

1. **OWNER: scope = all 18 lead-gen sites.** Divorce-finances and wills-probate form the adjacent-professions lane and keep their referral-fee disclosure. The ashfield corporate site stays separate as the broker brand; its contact form wording is unchanged.
2. **OWNER: full tier migration to case-type tiers** (advisory £85 / standard £40 / essential £15 / adjacent £35 / raw batch) across docs, proposal engine and the live Property offer-pipeline code. The old value-score card (very_high/high/medium at £150/£85/£40) is superseded; the value score survives as an internal quality signal only.
3. **OWNER: no 3-claim-slot build yet.** The dry-run engine implements the brief's `claim_slots_per_lead: 3` cap (config-driven), but the live pipeline keeps its one-claim mechanic and no buyer-facing document promises exclusivity or states a slot count. Delivery is framed as "delivered in full on claim". This deliberately softens the brief's "first 3 firms" price-sheet line until the owner settles slot mechanics.
4. **OWNER: consent = notice-only legitimate-interests acknowledgement estate-wide.** Property's pattern becomes the standard; checkboxes are removed from main LeadForms; submission is the affirmative act; `consent_given: true` + `consent_text` + `consent_at` recorded at submit. Resource-download gates keep their consent tick (marketing email is correctly consent-based).
5. **OWNER: legacy firms archived and purged.** DJH and Haines Watts documents move to `legal/_archive/` (history preserved, never deleted); all active surfaces are neutral; the proposal engine defaults to a fictional neutral prospect.

## Defaults applied without re-asking (reversible, flagged here)

6. **Legacy tier mapping by price parity**: very_high → advisory, high → advisory, medium → standard, low → not sellable. `high` keeps its £85; `very_high` prices at the published advisory £85 (an effective cut from £150 on unsold backlog, accepted because the £150 tier no longer exists on the published card). The grade-down rule applies to fresh classification only, never to this mapping.
7. **Divorce/wills leads price at the adjacent £35** (buyers are solicitors/mediators, not accountants), consistent with the adjacent-professions lane decision.
8. **`lead_buyers.min_tier` remap** in the new migration handles whatever rows exist; the pipeline has never been armed, so no live buyer is affected.

## Build decisions

9. **Engine stack: Python 3 stdlib + CSV, under `lead_engine/`.** Volumes are tiny (~92 verified enquiries/month), CSV is git-diffable and owner-inspectable, zero dependencies, and the repo already runs a stdlib-only Python culture. The 3-slot cap is a row count over `deliveries.csv`. Upgrade path: swap the CSV layer for Supabase reads when bridging to the live pipeline (out of scope this build). Root `scripts/` and `templates/` already exist, so the engine keeps everything inside `lead_engine/`.
10. **No send code at all.** Rather than stubbing email/GoCardless behind absent env vars, the engine contains no network code whatsoever; would-send actions print `[STUB] would ...`. This is the strongest possible guarantee of the brief's zero-real-sends rule.
11. **tiers.json shape**: brief §3.1 shape kept, with one addition: `typical_monthly_volume` per tier so the price sheet's volume column generates from config instead of being hand-maintained. Numbers unchanged from the brief.
12. **Standard terms live once in `config/standard_terms.md`** between extraction markers, reproduced verbatim on the price sheet, delivery footers and invoices, so the three surfaces can never drift.
13. **TypeScript propagation via hand-written constants + drift test** (`Property/web/src/lib/leads/tiers.ts` asserted against `config/tiers.json` by a vitest test) rather than codegen: no build coupling, and any config change fails tests until the constants are updated deliberately.
14. **Classification philosophy is a marked block** in `docs/CLASSIFY.md` (`<!-- philosophy:start/end -->`) extracted verbatim into the price sheet and every proposal, so the categorising rationale shown to buyers is always the operative rubric, not a paraphrase.
15. **Invoice carries no VAT line**: Ashfield Trading Ltd is not VAT registered (owner-confirmed fact in repo config). Company address from `niche.config.json` company block: 20 Ashfield Avenue, Shipley, Bradford BD18 3AL.

## Workstream decisions (compiled from build agents)

### Property tier migration (WS1b)

16. **Single resolution point**: `offerTierFor()` in `offer-config.ts` is the only place case_tier and the legacy fallback are decided; teaser, qualification, pricing, buyer matching and all email surfaces route through it. The teaser jsonb carries the case tier; the internal value-score tier never reaches a buyer.
17. **`offerMinTier()` default = "essential"** (everything sellable), matching the old "medium" semantics of lowest-sellable-tier; `offer_backfill.py --min-tier` default moved the same way.
18. **Deploy-order caveat**: the migration `20260810000001_case_tiers.sql` must be applied before the new value-score code deploys, or fresh score inserts fail (lead notify unaffected; leads would simply stay unscored). Neither applied nor deployed this build.
19. **Rollback limitation** noted in the migration: advisory rows cannot be split back into very_high vs high; 'high' is the price-parity restore.
20. **Value-score vocabulary deliberately kept** in `value-score.ts`, `scripts/score_unscored_leads.py`, `scripts/backfill_lead_value_scores.py` (internal quality signal per decision 2); script-scored rows sell via the legacy map until those scripts emit case_tier.

### Dry-run engine (WS2)

26. **Unverified leads are never routed and never receive last-call pings.** `route.py` refuses them and `decay.py` skips them at 24h; they only cascade to the raw batch at 48h. The brief's decay wording did not distinguish, but the rubric's rule 3 (unverified enquiries are never sold individually) governs.
27. **Credited deliveries render as charge line + negative credit line with reason** (audit trail preserved, nets correctly), never a silently removed charge.
28. **`claim.py` also rejects duplicate claims** by the same firm on the same lead; `invoice_run.py` skips already-invoiced rows so re-running a month never double-bills; £0 invoices print "no payment needed" instead of a payment stub.
29. **Seed data uses Ofcom fictional phone ranges and `.example` domains**; one lead is seeded partially claimed with a credit so decay slot-counting and invoice netting are exercised.
30. **Adjacent/Raw price-sheet rows derive their description from config fields** (`profession_lane`, `eligibility`) since they carry no examples array.

### Proposal engine (WS3)

31. **Old proposal pricing artefacts retired**: the Haines Watts default became a fictional neutral default; the historical recipients are preserved as clearly marked HISTORICAL INSTANCE files in `prospects/`. The old "automatic credit, objective grounds" paragraph was dropped from the template because its grounds diverged from the standard terms; the terms block is now the single credits source (plus the consistent dead-lead pursuit prose).
32. **Historical internal `low` grades display as "Not sold"** in data sections even though the published card has Essential £15 (the mapping is by price parity, and Essential is a new tier with no legacy equivalent); stated in the methodology footnote.
33. **`profession_lane: "adjacent"` renders the Adjacent + Raw pricing view**; the accounting lane renders Advisory/Standard/Essential/Raw. Raw is never a price card, only a row + prose.
34. **SOURCE_META specialism labels for the 8 non-property sources are engine-authored best labels**; owner should glance at them before the first multi-source proposal is sent.

### Property site branch (WS5)

35. **DJH restore path retired on `lead-engine/site-property`**: `PARTNER_DISCLOSURE_PAUSED`, the disclosed-DJH branch and the "never removed" guard comments deleted; partner block scrubbed to the canonical category shape. This re-applies the owner-approved 2026-07-27 scrub that was left uncommitted and lost, extended to the estate-standard notice. Rendered output unchanged from the wording-alignment commit.

### In-house site conversions (WS5)

36. **Privacy clauses only describe processing that exists.** Pharmacies' adapted sharing clause drops "result of our checks to confirm your contact details" and "any call time you book" because those sites have no verification or booking machinery yet; re-add at the live-bridge phase when `verify.ts`/booking are wired. Cookie-policy "we do not sell or share this data" lines scoped to anonymous analytics were left intact (compatible, true).
37. **Duplicate consent-string sources aligned, not re-plumbed**: `web/src/lib/calculators/site.ts` on ecommerce/hospitality/pharmacies carried its own consent string (live source for their MiniCaptures); aligned to the new notice with a keep-in-step comment rather than refactoring imports (minimal diff). Future cleanup: make config/site.ts the single source.

### Legacy purge (WS6)

38. **Guard tests and guard-explaining comments kept** (~28 files): suites asserting DJH must never appear enforce the purge and stay. Competitor/SERP research data mentioning djh.co.uk (~230 refs) is market data, not partner references, untouched. Historical compliance records (executed-DSA continuity notes, delivery-log template) retained as records with the SOP marked SUPERSEDED.
39. **Stored event value `kind: "forwarded_to_djh"` kept** for historic-row compatibility with an explanatory comment; renaming it would orphan existing delivery-log rows.

### Legal pack (WS4)

21. **Referral definition made claim-shaped**: a Referral occurs only after the Recipient accepts the enquiry; offer/acceptance mechanics are expressly a commercial matter outside the DSA (keeps the DSA pure DP and slot-count neutral).
22. **Annex A now matches `buildHandoffEmail` exactly**, grouped identity / verification / enquiry / engagement context / public-register / source; retention clause 11.1 widened so the 3-month delete provably covers the new verification and engagement data (protective direction).
23. **Stale rendered PDFs archived, not regenerated**; regenerate from the updated sources when next sending. `build_signing_docx.py` default input points at an archived file; use explicit arguments until the follow-up fix.
24. **LIA balancing test** now weighs the broader recipient pool, mitigated by one-firm-at-a-time full delivery, pre-acceptance redaction, and a signed DSA per recipient before any delivery.
25. **Owner items** (unchanged, listed in `legal/README.md`): ICO registration reference, DPIA before first Referral, solicitor review of DSA + LIA + on-site notice as a set.
