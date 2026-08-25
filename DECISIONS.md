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

---

## Pool-model compliance alignment (2026-08-14)

Prompted by preparing a buyer pack for a firm that accepted the model on the 14 August call. Three audits found the legal pack, every site's privacy notice and the proposal engine still described the model that preceded the 12 to 13 August claim-race lock.

40. **OWNER: adjacent lane capped at 3** (`adjacent_claim_slots_per_lead: null` to `3`). The uncapped setting of 13 August meant unlimited firms could receive one enquirer's full details, which no legitimate-interests balancing test can carry. The caps are now a data protection control, not a commercial preference: 3 + 3 bounds total recipients at 6, the LIA balances against exactly that number, and `test_lanes.py` fails if a lane is uncapped. Raising either cap requires the LIA to be redone first.

41. **The LIA was rewritten from scratch, not revised.** Its own section 3.3a said a redo was required "if the network model ever changed so that an enquiry's full details could be sent to several firms at once". The 12 August lock was exactly that, two days after the LIA's last revision. The new assessment covers the four disclosures that actually happen (redacted alert, delivery on claim, cascade, bulk supply) and states its conclusion as **conditional** on the caps holding, the site disclosure being live, and bulk supply going to one firm.

42. **OWNER: raw batch kept, and brought inside the documents.** It has no acceptance step, so it is not a Referral. The DSA now defines **Bulk Supply** separately (clause 3.6), the LIA assesses it on its own at 3.3c and records it as the limb most exposed to challenge, and `config/tiers.json` carries `supply_mode: "bulk"` and `recipients_per_batch: 1`.

43. **OWNER: retention stays at each site's published period; the documents changed instead.** DSA clause 11.1 and Annex A now read "no later than the period published in the relevant Site's privacy notice, and in any event no later than 24 months". This is true for both the 3-month site and the 24-month sites, so no published promise had to be weakened. Property stays at 3 months and the dormant purge is the thing that has to move, not the promise.

44. **The commercial layer is a separate template, assembled rather than copied.** `PARTNER_AGREEMENT_TEMPLATE.md` holds clauses 1 to 21; `build_agreement.py` lifts Schedule 1 from `config/tiers.json` plus `config/standard_terms.md` and Schedule 2 verbatim from `DSA_TEMPLATE.md` between markers. The data protection layer therefore exists once and physically cannot fork between the standalone and combined documents; `test_build_agreement.py` proves it on every build. Paragraphs 13, 15 and 16 of Schedule 2 are disapplied by an interpretation paragraph rather than deleted, so the reproduced text stays byte-identical to the standalone DSA.

45. **DSA clause 2.3 corrected.** It warranted that "all processing takes place in the United Kingdom", which is false: enquiry content goes to an AI service, email and SMS providers and a public register. Replaced with an accurate processing-locations clause. Asking a buyer to sign a warranty we breach daily was the single most avoidable defect found.

46. **Annex A rewritten to what is actually delivered.** It over-declared (verification carrier, reply bodies, best-call window, booked slot, device, country, referrer, pages read, Companies House, quality score: all of these stop at the operator inbox) and under-declared (practice name, area, the record fields). It now has three parts: what an Alert contains, what the Shared Data contains, and an explicit "not shared" list, because the Annex closes itself with "no data field beyond those listed above is shared".

47. **Site disclosure is load-bearing, and tested as such.** Every site's form notice and privacy policy now states that more than one firm may receive the enquiry, the maximum number, that the firms include non-accounting professions, the cascade, bulk supply, and the fee. The estate previously described a strictly sequential single-firm model everywhere, and Property said so explicitly ("your enquiry goes to one firm in that network at a time"). The copy gates now assert the multi-firm wording and fail on "one firm at a time".

48. **Fee disclosure rolled out estate-wide.** Only divorce-finances and wills-probate disclosed the commercial relationship. It costs nothing and closes an Article 13 gap, so it is now in the standard wording on all 17 sharing sites.

49. **Three sites claimed consent they never captured.** construction-cis, contractors-ir35 and digital-agency stated consent as the lawful basis for enquiry-form data while shipping notice-only forms with no checkbox. Corrected to legitimate interests. Section 4 is now identical across every sharing site and cites Article 6(1)(f) and Article 21; eight sites previously cited no Article at all.

50. **GA disclosure reconciled with reality in both directions.** Seven sites described Google Analytics in detail while shipping no GA code; their cookie policies now describe the first-party analytics that actually runs, and the GA entry is out of their processor lists. The six sites that do load GA keep it. Processor lists everywhere now name the email, SMS, AI and public-register processors, and state that processing is not exclusively UK-based.

51. **ashfield corporate pages gated, not rewritten.** `buy-leads`, `rent-a-site` and `how-it-works` sell whole-site exclusivity, a £40 to £120 price band, £500 retainers and value-score grading. The site is unpublished, so each page carries a PRE-PUBLISH GATE comment instead. Note `rent-a-site` sells a genuinely different product (whole-site exclusivity) that may still be wanted; that is a commercial decision, not a correction.

52. **A first DPIA was written** (`legal/DPIA.md`). DSA clause 11.3 has required one since the pack was first issued and none existed. It concludes no residual high risk and therefore no Article 36 prior consultation, and carries the action list that gates the first live claim.

53. **OWNER: last call removed** (2026-08-14). The 24-hour reduced price is gone from config, engine, contract, price sheet, LIA, DPIA, proposal and call brief. A lead now holds its published price for as long as nobody claims it, and cascade at 48 hours is the only decay step. Owner's reasoning: a discount for waiting was pointless and it taught firms to wait. Removing it also deleted a whole lead status (`last_call`), a template pair and a pricing branch in `claim.py`. `test_build_agreement.py` fails if a last-call price ever reappears in the config without being stated in the contract, and the Property tier mirror asserts the same.

54. **OWNER: the alert carries the enquiry itself, redacted.** Previously an alert carried only structured facts plus a one-line AI summary, and the templates deliberately had no message field at all. The owner's model is that a firm reads what the enquirer actually wrote, decides, and receives identity only on purchase. So the alert now includes the enquirer's own words with names, telephone numbers, email addresses, postcodes, links and company names stripped (`tiers.redact()` in the dry-run engine, `redactMessage()` in the live pipeline, deliberately mirrored).

    This moves redaction from a structural guarantee to a functional one, so it is now tested rather than assumed: `lead_engine/scripts/test_redaction.py` checks twelve identifier shapes come out, that the substance survives, and that a rendered alert contains no contact field; the live pipeline has the equivalent in `lead-offers.test.ts`. The templates still have no field for a name, a number or the raw message, so a redaction miss cannot become a full disclosure. DSA Annex A.1, the "Alert" definition, clause 3.2, LIA sections 2.2 and 3.3d, and the standard terms were all updated to describe what is actually sent, including the honest statement in the LIA that the assessment now turns on redaction quality rather than on the alert being a bare summary.

55. **Editing artefacts are now blocked at build time, not reviewed for** (`legal/docprep.py`). Prompted by finding that the signing `.docx` opened with four lines of build notes naming internal file paths, above the title: `build_pdf.py` stripped HTML comments but `build_signing_docx.py` never did. The house rules (no em or en dashes, no horizontal rules, no bold or italic, no HTML comments, no file paths or repository references, no `{{TOKEN}}` or `[BRACKET]` placeholders, no duplicated sentences) are applied by both builders and the build **refuses to write** a file that still breaks one. Four rules auto-fix; the other four stop the build because they need a decision. Verified by running a fake of each fault through it.

56. **Schedule 2 no longer repeats the commercial clauses.** The duplication check found "Working Day", the interpretation sentence and the court-proceedings sentence appearing twice, because Schedule 2 reproduced the standing DSA's own term, general and governing-law clauses. Those are now marked standalone-only in the source and dropped from the Schedule, so its numbering runs 1 to 12 and then 14, and the agreement says so. The standalone DSA keeps them, because it has to stand on its own.
