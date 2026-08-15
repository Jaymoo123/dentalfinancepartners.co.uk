# Messaging consistency pass — closing report

Date: 10 August 2026. Companion to `AUDIT.md` (what was found) and `DECISIONS.md` (why). This report covers what changed where, and what needs Junayd's eyes.

## What changed

**17 site branches** (`lead-engine/site-<slug>`), one commit each (Property carries two). Every branch contains messaging-scope diffs only: `site.ts` consent config, `LeadForm.tsx` (checkbox removed, notice-only), `niche.config.json` partner block, privacy policy sharing sections, thank-you/complete/contact expectation copy, per-site test updates. No article, guide or service body copy was touched anywhere.

Per-site branch → commit:

| Branch | Commit | Notes |
|---|---|---|
| site-property | 924a60d5 + 4107b377 | Wording aligned to estate standard; DJH restore path fully retired (re-applies the owner-approved 2026-07-27 scrub that was left uncommitted) |
| site-dentists | 3df35a0f | |
| site-medical | 9efd2b2a | Consent test lives at `lib/leads/lead-payload.test.ts`, updated |
| site-solicitors | 20ad9dfc | Reflex-containment test assertions replaced |
| site-generalist | 86676bd9 | Newsletter "We never share your email." scoped to newsletter-only wording |
| site-construction-cis | 83fabc17 | |
| site-contractors-ir35 | 1ec28b08 | Thank-you keeps "not a sales team" line, prefixed with partner-network handoff |
| site-digital-agency | 642aa633 | Local MiniCapture converted too; newsletter line scoped |
| site-startups-tech | cbc18089 | Fixed drifted in-house consent copy in `lib/calculators/site.ts` |
| site-charities | cf32e422 | "We do not share" removed; full network clause added |
| site-care | 34e2f159 | Same |
| site-crypto | e0f48f93 | Same |
| site-ecommerce | fc22b70e | Same |
| site-hospitality | 48849310 | Same; local MiniCapture converted |
| site-pharmacies | 7d58b77a | Same; dormant rich clause adapted, over-claims trimmed |
| site-wills-probate | d52a1d53 | Contradiction resolved; fee disclosure added to thank-you |
| site-divorce-finances | 9c429890 | Contradiction resolved; LASPO fee-disclosure comment preserved |

Plus `lead-engine/legacy-comments` (7021674f): ~20 code files' DJH back-office references neutralised, 10 docs edited, DJH forwarding SOP marked SUPERSEDED, `docs/BUYER_ONBOARDING.md` rewritten to the pool model. And `lead-engine/core`: tiers config, CLASSIFY rubric, price sheet, LEAD_PRICING rewrite, dry-run engine, Property tier migration, proposal engine rework, DSA/LIA update + legal archive.

## The estate standard now

- **Consent**: one notice-only legitimate-interests acknowledgement on every enquiry form (no checkbox; submission is the affirmative act; `consent_given/consent_text/consent_at` recorded). Adjacent-lane sites (wills-probate, divorce-finances) add the professional example and the mandatory referral-fee sentence.
- **Privacy**: every site's policy discloses category-based sharing with the specialist partner network, the receiving firm as independent controller identifying itself at first contact, onward re-referral, legitimate-interests basis and the right to object. No "we do not share" claims survive.
- **Thank-you**: every site sets the expectation that a specialist firm from the partner network may contact the enquirer directly. Timing promises kept.
- **Config**: every site's `partner` block is the canonical category shape `{"name": "a firm from our specialist partner network", "descriptor": "", "privacy_policy_url": null}`; no `partner.name` interpolation of a named or blank firm remains.

## Merge notes (read before merging)

1. **Mixed branch bases.** Eleven site branches + legacy-comments were cut from `902ea014` (origin/main); six from `acbd823a` (expansion/phase-0 tip). End states are identical in target content; on the main-based branches the diffs also absorb the Reflex-name removal that phase-0 had done separately (commit 2cc693f8). Merging with the site branch taking precedence on its own files is correct; `lead-engine/verify` demonstrates all 18 branches merging cleanly onto core with `-X theirs`.
2. **Deploy sequencing for Property**: migration `supabase/migrations/20260810000001_case_tiers.sql` must be applied before the Property code branch deploys (value-score now writes `case_tier`). Nothing was applied or deployed this build.

## Verification (run on `lead-engine/verify`, the merge of all branches)

- **Typecheck**: PASS with 0 errors on all 17 touched site apps.
- **Tests**: zero regressions. Tier-1: Property 38 passed / 3 failed (all three pre-existing in files untouched by this build: calculator-goldens fleet count, inbound-email and lead-dossier ack-copy drift); Dentists 14, Medical 12, Solicitors 7, generalist 14, construction-cis 14, contractors-ir35 12, digital-agency 10, startups-tech 6, all passing. Tier-2: charities 45, care 46, crypto 12, ecommerce 24, hospitality 30, pharmacies 22, wills-probate 91, divorce-finances 82, packages/web-shared 368, all passing.
- **Dry-run engine e2e**: full brief acceptance sequence verified (classify JSON on seeds, PII-free ping, claim ×3 with 4th rejected, decay at both thresholds, invoice with credit netted, GoCardless stub only, zero network code).
- **Copy gates**: no em-dashes in changed lines; no exclusivity language in buyer-facing docs; no "we do not share" in any privacy page; every remaining Reflex/DJH/Haines reference is a guard test asserting absence, an archive, or competitor SERP data.
- **Proposal engine acceptance**: two documents generated from different prospect configs with zero template edits; diff confined to recipient and commercial fields.

## Needs Junayd's eyes

1. **Divorce homepage** `divorce-finances/web/src/app/page.tsx` (~line 56): "not a call centre round robin" directly denies the pool mechanic. Body surface, deliberately not edited. Decide: reword or accept.
2. **Wills-probate homepage** (~line 168): "We never pass on your details without your consent" sits oddly next to the LI notice model (submission acknowledgement is not consent). Body surface, not edited.
3. **Health-check wizards** on Dentists and digital-agency carry their own consent checkboxes (digital-agency's has no sharing disclosure). Not in the audit conflict list; decide whether wizard leads enter the pool, then convert to the estate notice.
4. **Price sheet volume line**: brief said "first 3 firms to claim receive the lead"; per your instruction all buyer-facing docs stay neutral on slots ("delivered in full on claim"). Confirm you are happy with that framing on `docs/price-sheet.html`.
5. **SOURCE_META specialism labels** in the proposal engine for the 8 non-property sources are engine-authored; glance before the first multi-source proposal goes out.
6. **Legacy £150 backlog**: unsold leads previously graded very_high now price at advisory £85 under the published card (price-parity mapping). Flag if you want a different treatment for the scored backlog.
7. **Owner items from the legal pack** (in `legal/README.md`): ICO registration reference, DPIA before first pool delivery, solicitor review of DSA + LIA + on-site notice as one set. `build_signing_docx.py` default input points at an archived file; pass paths explicitly until fixed.
8. **Verification wiring**: only Property verifies contactability at submit; other sites' `verify.ts` is wired to inbound email only. Their leads would enter the pool unverified today. This is the main live-bridge work item, out of scope for this build.

## Not done (deliberately)

- No deploys, no database changes, no emails, no GoCardless calls. Everything is dry-run or branch-local.
- 3-claim-slot mechanics in the live pipeline (owner-deferred; the dry-run engine implements the cap from config).
- Body-copy conflicts listed in AUDIT.md (ranking content untouched by rule).
- ashfield corporate site unchanged (pool-exempt broker brand).
