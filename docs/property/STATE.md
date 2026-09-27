# Property — Program State (single living doc)

> **The HOW lives in the engine docs (site-agnostic, reused for every site); this doc is only the WHAT-for-Property.**
> - Rewrite engine: [`docs/_engines/REWRITE_PROGRAM.md`](../_engines/REWRITE_PROGRAM.md)
> - Net-new engine: [`docs/_engines/NETNEW_PROGRAM.md`](../_engines/NETNEW_PROGRAM.md)
> - Ground-truth (the seed-of-truth every rewrite cites by `§N.M`): [`house_positions.md`](house_positions.md)
> - Live rewrite queue (tooling-consumed): `track2_worklist_2026-05-29.md` / `.json`; per-slug 2027 scope: `track2_2027_scope.json`
> - All closed wave/megawave/dated-handoff history: `docs/property/_archive/`
>
> Memories: `[[rewrite_program_engine]]`, `[[netnew_program_engine]]`, `[[property_program_state]]` (this doc's recall hook), `[[feedback_rewrite_only_no_collapse]]`, `[[property_2027_rates_ground_truth]]`, `[[property_capital_allowances_2026_ground_truth]]`.

Brand: Property Tax Partners · prod `www.propertytaxpartners.co.uk` · Vercel project `prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU` org `team_XF9WAygZX7SGk9Fo4tOAnihH`.

> **DEPLOYED to production 2026-09-16 from `90fbea9c`** (estate-wide release: design port phases including the 0.22a/b/c review passes, claims fixes, header CTA fix, favicons).

> **⚠ STATUS (handoff, 2026-06-02) — TRACK-2 REWRITE PROGRAM COMPLETE. 0 genuine residual (verified corpus-wide by git history over all 686 blog pages). DEPLOYED to production 2026-06-02 — live at www.propertytaxpartners.co.uk (build `property-tax-partners-6u4q7mt7z`); verified sitemap + homepage + rewrites all HTTP 200, and the un-redirected keeper pages now resolve 200.** For a new manager: (a) `reviewedAt`/`dateModified` are UNRELIABLE rewrite markers (added mid-programme) — audit completeness by git history, not frontmatter; (b) the only remaining work is OPTIONAL/non-blocking (deferred SDLT 15→17% sweep §3, held `vat-calculation-calculator`, minor-cleanup §3, and one spotted stale page `2027-property-income-tax-rates-landlords-uk` whose frontmatter still wrongly carves Wales out of the 2027 rates — Wales is IN 22/42/47); (c) redirect-hygiene was fixed this session (§2). The two prior-session items below are LONG SINCE DONE (retained as audit history):
> 1. **Incorporation-B (8) — DONE (committed `6a86dd97`, 2026-06-02; all 8 re-QA'd 8/8 all_clear, coverage 8/8, predeploy gate PASS, build exit 0, NOT deployed).** Historical resume detail (now complete) retained for audit: (cached in `optimisation_engine/.cache/qa_runner/incorpB/`). Only **2 need re-QA**, then finalise+commit all 8: (a) `property-company-accounting-requirements-hmrc-expectations` — CT-penalty FAQ already FIXED locally (£100/£200 → the doubled £200/£400/£1,000 regime); (b) `property-company-employer-pension-contributions-directors` — only a transient "QA returned nothing" (rate limit), no known content issue. **Resume:** `track2_qa_autofix_runner {batch:'incorpB', slugs:['property-company-accounting-requirements-hmrc-expectations','property-company-employer-pension-contributions-directors'], maxRounds:2}` → merge `incorpB` caches → record/coverage/gate → build → commit the 8 surgically. (6 already all_clear: `corporation-tax-vs-income-tax-landlords-2027` [47→48 fixed], `when-does-property-holding-company-structure-make-sense-uk-landlords` [leaked tags stripped], `incorporation-case-study-10-property-portfolio-200k-mortgage`, `transfer-properties-to-company-phased-guide`, `cgt-property-transfer-limited-company-calculate`, `incorporate-rental-property-without-cgt`.)
> 2. **Section 24 B2 (3) — DONE (committed `8cdce948`); Section 24 B3 (3) — DONE (committed `34c4fd2b`). Section 24 seconds (B1+B2+B3 = 10) now fully shipped. Incorp-C (3) DONE (`6c44a4cd`). FinanceMortgage pair (2) DONE (`0217b42c` + `33e81ac7`). VATcalc anchor vat-calculator (1) DONE (`b13472b4`, repositioned to commercial-property VAT). VATcalc COMPLETE (3 lanes: vat-calculator `b13472b4` = commercial specialist, vat-how-to-calculate `68b78a5c` = formulas/method, vat-tax-calculator `29bd455b` = net-liability + Flat Rate Scheme; vat-calculation-calculator stays HELD). Named-scope list (B2/B3/Incorp-C/FinanceMortgage/VATcalc) COMPLETE = 22 pages committed this session. User OK'd continuing. non-AIA reversals (4) DONE (`2de9eae9`, incl. 2 manager statute/arithmetic adjudications). AIA-knot briefs generated + corrected (corrections files in `briefs/property/track2/aia/` fix s.187A-not-187B for pooling, s.201-not-198 for the 2yr election, 40%-via-s.52-table, 6%-via-s.104A/D, plus tight cannibalisation steers vs the 11+ live AIA pages: link UP to the pillar, hold narrowest residual intent). AIA knot (5) DONE (`bcafca4d`, 5/5 all_clear via the brief engine + manager corrections files). **This run's SCOPE complete: 31 pages committed (none deployed).** A git-history residual audit (2026-06-02) found the BROADER program ~95% done (207/234 universe rewritten, 17 collapsed/deleted) with **exactly 10 genuine residual pages** still only stale-swept (never ranking-grade rewritten), a cannibalisation-prone S24/mortgage-interest/incorporation cluster: S24 (5) `section-24-2027-tax-year-planning-landlords` + `-uk-landlords` (near-dupe pair), `section-24-higher-rate-taxpayers-changes-2027`, `section-24-mortgage-interest-restriction-uk-landlords`, `section-24-tax-credit-20-percent-basic-rate-relief`; mortgage-interest (2) `mortgage-interest-deductible-landlords-uk-2026`, `tax-relief-mortgage-interest-rented-property-guide`; incorporation (3) `incorporation-holdover-relief-property`, `incorporation-timing-when-to-incorporate-property-portfolio`, `2027-tax-rates-incorporation-decision-property-landlords`. (The CityService location cluster + most reliefs are already DONE per the audit; reviewedAt/dateModified are unreliable markers, use git history.) **UPDATE — the final 10 are now DONE (committed `90e33892`: s24res1 7 + incorpres1 3, all via engine briefs + manager corrections) → TRACK-2 REWRITE PROGRAM COMPLETE, 0 genuine residual. 41 Track-2 pages committed this session (12 commits, none deployed).** Held: `vat-calculation-calculator`. Skipped: 2 deleted CapAll-special pages.
> **REDIRECT-HYGIENE — RESOLVED (`9219db3e`):** reversed the 3 live-keeper 301s (profit-extraction, employer-pension [a this-session incorpB page], full-expensing-capital-allowances) and fixed the 3 now-reachable pages (3 real content bugs caught by gold-QA: the £5k-state-pension-year trap → £6,708 LEL; defunct s.18 marginal-relief cite → s.18B(3); over-blanket s.46 leasing claim → s.46(4B) lets the 40% FYA reach qualifying-lessee leasing). The should-i-incorporate self-loop (4th of class) was reversed in `90e33892`. **Link audit now 0 HARD / 0 SOFT / 0 self-loops** (also cleared 25 soft 301-hops).
> **EARLIER-TIER RE-POLISH — COMPLETE:** the 23 factual-clean-but-unpolished pages lifted to this session's gold bar (coverage-floor + editorial + eeat byline + re-verified statutes): SA-Deductions 11 + NonResident 3 → `87cd9e3f`; CapitalAllowances 9 → `65b81650` (via briefs+corrections; full-expensing was done in the redirect fix).
> **CAVEAT-#2 — KILLED:** corpus-wide git-history audit of all 686 blog pages confirms 0 un-rewritten legacy (the only legacy-no-rewrite is the intentional `vat-calculation-calculator` HOLD).
> **SESSION TOTAL 2026-06-02: 15 Track-2 commits, ~66 distinct pages, 0 genuine residual, link audit clean — DEPLOYED to production 2026-06-02 (whole `main` HEAD now live).** Immediate post-deploy operational step: register monitored_pages baselines for the now-live batches (see §3) — the pages shipped LIVE but UNMONITORED. After deploy, the only residual rewrite items are: `vat-calculation-calculator` (HELD, no clean residual intent) and the deferred SDLT 15->17% corpus remediation (user-deferred to AFTER the rewrite program, §3) plus the minor-cleanup sweep (§3). CapAll-special (2 deleted pages, `hmo-capital-allowances-multi-tenant-landlords-claim` + `landlord-capital-allowances-tax-relief`) DECISION = **SKIP** (their intents are already owned by ranking-grade pillars `hmo-common-parts-capital-allowances-s35-...` + `capital-allowances-on-property`; resurrecting pages deliberately removed in collapse `8f6ac8e9` would worsen the already over-fragmented capital-allowances space). NB a transient build red mid-session was the user's own `eb75b70b` consent-checkbox rollout (LeadSubmission gained required consent_*; mini-forms fixed in same commit), not Track 2.**
---

## 2026-09-27 — Result gate and paid-PDF offer removed (owner decision, BUILT + VERIFIED locally, NOT deployed)

Owner: "We don't want any email pop up on the calculators. Remove the calculator result gate
and have a form directly underneath the calculator. Test how that performs against the data
we already have with the result gate." And: "remove the pdf offer and revert it to what it
was as I don't think it's working based on the data we have for it."

Spec and comparison table: `docs/_engines/LEADS_250_PROGRAMME_2026-09-27.md` §13 S1. New form
id `calc_result_form`; `calc_result_gate` stays on the read side for history. Gate record for
the comparison (06-29 to 09-27, 13 weeks): 37 to 68 starts a week, 26 to 49 refused, 0 to 6
submits, 32 leads, 11 contactable. Read at 4 weeks after deploy.

Paid-PDF test (`calc_pdf_offer`, live 09-14 16:15 UTC): code removed in the same change; prod
flag set to `enabled: false` on deploy day so the test ends on one date. Day-14 read to be
recorded here from data to 09-27 before deploy.

Commits: `6f20d7d0` (gate + PDF removal, inline `calc_result_form`), `5b6c2cff` (S1a: one
form under a calculator; premium tool on calculator pages has no form, `resource_block`
dropped from `CalculatorPageResources`, generic tools get the form via the shared result
slot, blog posts with a premium tool no longer render `GateOrForm`). Verified headless on the
production build at 1280px and 390px: one form under the result on every calculator page and
premium post, foot panel and end-of-post form unchanged, no held-result copy, no PDF offer.
`resource_block` exposure falls on calculator pages and premium posts; the 4-week read
compares `calc_result_form + resource_block` against `calc_result_gate + resource_block`.
The PDF API routes (`api/calc/pdf-offer`, `api/calc/pdf-request`), `pdfRequest.ts` and its
test remain in the tree, unreachable from the UI; remove after the flag is off.

## 2026-09-15 — Warm handoff to Aswatax, triggered from the Lead Tracker (BUILT + TESTED, NOT ARMED)

**Problem it solves.** Omar (Aswatax) phones referred enquirers cold and some ask how he
got their details. Not a consent failure: all 17 sites carry the partner-network notice,
the exact wording is stored per lead in `leads.consent_text`, and the thank-you pages have
named Aswatax since 09-09. It is a recall failure, read once at submit, days before the call.

**Mechanism.** Umair keeps triaging in the Lead Tracker
(`1MPxu7utofikLFK60nvDEPs9Y_wjLrbRAEpxKIbv-itM`). Three strict dropdowns drive everything:

| N "Sent to Omar or kept in-house" | O "Send Email?" | P "In-house Lead Contacted?" | Action |
|---|---|---|---|
| `Omar` | `Send` | any | introduce, then stop the chase |
| any | blank | `Yes` | stop the chase, no email |
| not `Omar` | `Send` | blank | nothing, reported, never guessed |
| blank | blank | blank | nothing |

Two keys are required to send because the send is irreversible and copies a customer.
Read from the existing hourly-cron machinery via `readTrackerRows`; joined on column I
(lead id) only. Runner: `POST /api/leads/tracker-sync` (CRON_SECRET bearer). Deliberately
NOT on a schedule yet: scheduling it is part of arming.

**Never twice, enforced below the application.** `lead_handoff_intros`
(`20260915000000`) takes a claim BEFORE sending. Primary key = one per lead; unique index
on normalised email = one per person. Verified in production: a second claim on the same
lead, a claim on a different lead with the same email, and a claim on a non-existent lead
are all rejected by the database. Toggling O off and on, clearing and re-setting N, and
three further runs produced zero additional sends.

**Self-arming watermark, no arming-day ritual.** `lead_handoff_control` (`20260915000001`)
holds `watermarked_at`. The first run in ANY mode claims EVERY row in the sheet, decided
or not (owner decision 2026-09-16: anything present at go-live was handled by hand; only
leads arriving after go-live are introduced), and sends nothing. There is deliberately no script and no required env var: a
one-way step that must be remembered on the right day is what gets lost at a handover.
**Ran against production on 2026-09-15 under the old decided-rows-only rule: 135
claimed, 0 sent. ARMING STEP: `UPDATE lead_handoff_control SET watermarked_at = NULL`
immediately before setting mode live, so the first live pass re-watermarks the whole
sheet as it stands that day.** Sender at arming: `LEAD_HANDOFF_FROM` and
`LEAD_HANDOFF_REPLY_TO` = `umair@propertytaxpartners.co.uk` (the only inbox Umair reads).

**Modes.** `LEAD_HANDOFF_MODE` absent or unrecognised means `report` (decides, sends
nothing). `redirect` sends real mail with every recipient collapsed to
`LEAD_HANDOFF_OPERATOR_EMAIL` and `[REDIRECT]` on the subject. `live` is the only mode
that reaches an enquirer. Second independent gate: while unarmed the recipient resolver
throws on any address that is not the operator's. Plus a per-run cap
(`LEAD_HANDOFF_MAX_PER_RUN`, default 5) so a bug emails a handful, not the tracker.

**The email.** To the enquirer, CC Omar, BCC the owner, from Umair, reply-to set.
Shaped as a reply, quoting back their own details: Name, Email, Phone, Type,
Preferred call time, Message, and up to two of their replies. Subject is
"<Name>'s enquiry", or "Your enquiry" with no usable name. Deliberately plain: no
card, no wordmark, no buttons, because a marketing shell is what made the first
drafts read as fake. Nothing is truncated; a 15,000 character enquiry round-trips
whole.

**It carries what the lead notification carried, plus what nobody carried.** Type
came from the notification and would have been lost once Umair stops forwarding.
The booked call window and any reply were already being stored and read by nobody
making the call. With a booking the ask names the slot ("booked in for Tuesday 16
September, morning, as they requested"), because "as soon as possible" directly
under a time they picked reads as nobody having looked. A time in free text is
deliberately NOT parsed: the reply is quoted verbatim instead.

**Reading real replies changed the design.** Raw email bodies carry quoted
threads, handset signatures, multi-paragraph accounts, a tracking parameter inside
a quoted link, and several open "Hi Junayd". So replies are cleaned (thread cut,
signatures and URLs removed, greetings naming our own people stripped, anything
over 280 chars dropped rather than truncated). Across 223 property leads that
keeps 112 replies and drops 21.

**Two layers, then a visible failure.** `leakedContentReason` checks the FINISHED
email for tracking parameters, internal identifiers, the lead id, quoted headers,
signatures, anyone who is not the sender, and links outside the sending domain. On
a hit it DEGRADES first, dropping the quoted replies and re-rendering, and only
refuses if that still fails. Any non-send (refusal, block, or an ambiguous pair of
dropdowns) is written to **column K** as `NOT SENT: <reason>`, because a refusal
nobody sees is worse than the leak it prevented: everyone believes the partner firm
was emailed and the enquirer hears from nobody.

**Rows move, so writes are addressed by lead id.** Every new lead inserts at row 2
and pushes the rest down, so the row number is re-resolved from column I
immediately before writing. Unmatched rows are skipped and logged, never written by
position. Writes are confined to J-M; N onward belongs to the triager.

**Column audit, verified against the live sheet 2026-09-15:** code indexes match
headers on both tabs; I is Lead ID; J-M carry no data validation that could reject
a write; N/O/P dropdowns intact and strict on both tabs. Cosmetic only: Sheet1 A1
holds a backtick instead of "Received" (nothing reads headers, only positions).

**Two third-party claims, kept distinct on purpose.** "Omar is a Chartered Tax Adviser" is
about one named individual and is evidenced in `legal/aswatax/`. "the firm is registered
with the Chartered Institute of Taxation" is about Aswatax Ltd (12923632) and rests on the
owner's assertion of 2026-09-15. It is explicitly NOT claimed that the team hold the CTA
qualification. Do not let these merge.

**Names, measured not imagined.** All 308 live leads were swept through the renderer:
255 greet by name, 53 fall back, 0 defects. Titles are stripped (19 leads would have read
"Hi Mr,"), ALL CAPS is normalised (9 leads), hyphens and apostrophes survive, and phone
numbers, email addresses, symbols, lone titles and single initials fall back to "Hello,"
rather than guessing. Greeting, subject and the line to Omar read one source and a test
fails if they ever disagree.

**Sending domains are the real constraint.** Only `propertytaxpartners.co.uk` is verified
in Resend; `dentalfinancepartners.co.uk` is in `failed` and the other 15 sites have none,
which is why their nurture already sends from the Property domain. Sending is gated on
`VERIFIED_SENDING_DOMAINS`, so other sites are refused and reported rather than bouncing.
Owner's plan covers 3 domains and all 3 slots are already consumed (property, its inbound
subdomain, the failed dentists one). **Decision 2026-09-15: Property only for now (166 of
210 tracker leads), Umair forwards other sites to Omar by hand.** Adding a site is one
line once its DNS is genuinely verified.

**Also in this change.** The owner's name is out of the customer-facing voice: nurture
greetings, the reply-ack and the shared email signature now read Umair (the other 16 sites
were already de-personalised, Property was the sole outlier). `lead-service-template.ts`
had the brand and signer hardcoded in six places, so every site's nurture email rendered a
Property wordmark; now parameterised with the estate values as defaults. `consent_given`
no longer defaults to `true` on submit: it is recorded from evidence, either the explicit
flag (LeadForm, SpecialistWidget) or the stored `consent_text` (MiniCapture,
ResultGateModal, MobileToolSlot, which send wording but no flag).

**Testing procedure, repeatable.** `Sheet2` of the same spreadsheet is the fixture tab
(`GOOGLE_SHEETS_TAB=Sheet2`), pointed at the STAGING database, so Umair's live rows and
production data are never touched. Seed a lead, set N and O, run the endpoint in
`redirect`. Note the trap: Property `.env.local` points at staging by default, so a run
meant to touch production must override `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`.

**OPEN, owner-gated:**
- Arming (`LEAD_HANDOFF_MODE=live`), which needs Omar's delivery address
  (`LEAD_HANDOFF_PARTNER_EMAIL`) and `LEAD_HANDOFF_BCC`.
- Scheduling the endpoint on the hourly cron.
- Umair's agreement to being the named voice, since replies reach him.
- Written confirmation from Aswatax of the CIOT firm registration.
- Whether `Send` means "system emails Omar" or "Umair already did", or Omar gets two.

## 2026-09-14 — Paid PDF concierge test (flag-gated, ships OFF)

**What.** Two-week viability test of self-serve revenue: a "Get the PDF, £29" block under the
revealed result of the three premium tools (`capital-gains-premium`, `incorporation-premium`,
`section-24-premium`). Real Stripe Payment Link; the click-time inputs are saved so each PDF
is produced by hand within one working day. Case: `docs/_engines/AUDIENCE_INTENT_MONETISATION_2026-09-14.md`.
Owner decisions 09-14: real checkout, CGT included, one price £29, switchable without a deploy,
partner never copied on any email.

**Where it sits.** After "See your result" -> pop-up -> submit or "No thanks" -> result. Only then,
under "Show the workings". Pop-up, gate, lead form, calculator maths: untouched. Desktop only
(the premium tool is `hidden sm:block`).

**Switch.** `site_flags` row `calc_pdf_offer`, value `{enabled, link, price_gbp, started_at}`.
Ships `enabled:false`. Turn on: set `link` (must start `https://buy.stripe.com/`), `enabled:true`,
`started_at` = now. Off: `update site_flags set value = value || '{"enabled":false}' where key='calc_pdf_offer';`
Live within 60s (CDN cache on `/api/calc/pdf-offer`). Missing row, bad shape, table absent = off.

**Files.** `Property/web/src/lib/calculators/premium/pdfRequest.ts` (PDF_TOOLS, buildPdfRequest,
parseOfferFlag), `components/calculators/premium/PdfOffer.tsx`, one insertion in
`PremiumCalculator.tsx` after `<Workings>`, `app/api/calc/pdf-offer/route.ts` (GET flag),
`app/api/calc/pdf-request/route.ts` (POST snapshot -> `calc_pdf_requests`), privacy policy
(Stripe as processor, 90-day retention line), terms ("Paid documents"), tests
`src/tests/pdf-offer.test.ts`. Migration `supabase/migrations/20260914000001_calc_pdf_offer.sql`
(site_flags, calc_pdf_requests, vw_calc_pdf_test). Console: `console/web/src/lib/pdfTestData.ts`
+ `components/PdfTestPanel.tsx` replace the "Sites (last 7 days)" block on the console home.

**Email.** Nothing here writes to `leads`, so the partner CC path (`leads` insert trigger ->
`/api/leads/notify`) cannot fire. Stripe receipts go to the Stripe account email only. The PDF
is sent from the owner's own mailbox. Test asserts the route never inserts into `leads`.

**Fulfilment.** Stripe payment -> `client_reference_id` = `calc_pdf_requests.id` -> read
`payload` -> PDF built in the session scratchpad (per-tool HTML template, puppeteer-core at repo
root) -> owner emails it -> set `stripe_session_id`, `fulfilled_at`.

**Read.** Console home panel (exposures, clicks, checkouts, paid, revenue, awaiting, kill lines,
by tool / placement, last 20). Day 7 and day 14 readouts add the channel split via SQL. Kill
lines: clicks/exposure < 2% or paid/exposure < 1% after ~250 exposures = kill (flag off, remove
insertion, drop tables). Paid > 2% = build P1 properly. Delete `calc_pdf_requests` rows older
than 90 days at close.

**Status.** LIVE 2026-09-14 16:15 UTC. Migration applied to prod and staging (PostgREST needed
`pg_notify('pgrst','reload schema')` before the new table was visible). Pushed `2963a9ea`
(feature `0317cb51`, layout `2963a9ea`); Property and console deployed from a clean worktree at
that SHA; flag ON with `started_at` 2026-09-14T16:15:36Z and the real Payment Link. Local
click-through verified on staging (row + client_reference_id). Owner still to do: one real £29
purchase + refund to prove the production path. Reads: day 7 = 2026-09-21, day 14 = 2026-09-28.
Test rows on staging are not counted (the panel reads prod).

## 2026-09-12 - OWNER ITEM: the privacy notice promises deletion the retention cron does not perform (estate-wide, not urgent)

Surfaced by a design-port planning pass, not by port work, and it is not a port defect. It is a
words-versus-code gap on a legal page, so it is recorded here rather than lost.

**What the page promises.** `Property/web/src/app/privacy-policy/page.tsx` (§6, lines 199-204)
publishes two sentences: enquiry data is kept for `{company.enquiryRetentionMonths}` months "from
the date of your enquiry, after which it is deleted" (the number resolves to **24** via
`Property/web/src/config/site.ts:72` reading `enquiry_retention_months` from
`Property/niche.config.json:15`), and "our records of what you were shown and any consent you gave
are kept for **up to six years**, under access controls".

**What the code does.** The purge job exists and is scheduled: `Property/web/vercel.json:9`
registers `/api/cron/lead-retention` daily at 03:30. But
`Property/web/src/app/api/cron/lead-retention/route.ts:51-55` sets `dryRun` to true unless
`LEAD_RETENTION_PURGE_ENABLED` is `1` or `true`, and
`Property/web/src/lib/leads/retention.ts:16` states in terms that the job **SHIPS DORMANT**; the
dry-run path (`retention.ts:201`) returns `anonymised: 0` and writes nothing. **Whether that flag is
armed in the Vercel production environment is UNVERIFIED from the repo** and this entry deliberately
asserts neither way; the repo evidence says dormant, the production env has not been read.

Three further facts, all verified:
1. Even armed, the job **anonymises, it does not delete**: name, email, phone and message are
   redacted, and `retention.ts:142-145` preserves `consent_text`, `consent_at`, `status`, `source`
   and `created_at` **unconditionally** as the lawful-basis audit trail. So the published word
   "deleted" would still overstate the code.
2. **Nothing anywhere expires consent records at six years.** There is no six-year bound in code.
3. **Scope, and this is the part that matters.** `RETENTION_MONTHS_BY_SOURCE`
   (`retention.ts:39-64`) maps roughly 20 site sources (property, ashfield, dentists, medical,
   solicitors, generalist, care, charities, crypto, ecommerce, hospitality, pharmacies,
   startups-tech, construction-cis, contractors-ir35, digital-agency + the `agency` alias,
   divorce-finances, wills-probate). **One cron in the Property app governs retention for the whole
   estate**, not just Property. The same two sentences are published on at least Trade
   (`construction-cis/web/src/app/privacy-policy/page.tsx:165-169`, worded "Consent records are kept
   for up to six years") and, on a quick grep, on most other sites too.

**Three possible actions, owner's call:**
- (a) **Arm the job** (set `LEAD_RETENTION_PURGE_ENABLED`). This is an **irreversible data action
  across every site in the estate**, so it needs its own slot and an explicit yes, never as a side
  effect of another piece of work. No recommendation is made here.
- (b) **Change the words to match the code** (say anonymised rather than deleted, and either bound
  the consent records or drop the six-year claim). **This is the only option with no data risk.**
- (c) **Accept and record**, i.e. decide the gap is tolerable and note the reasoning.

Not urgent and nothing is blocked on it. Nothing was changed in code for this entry.

## 2026-09-09 — Commercial-capture 28d read (overdue from ~09-02) + consent-repair check

**28d read of the 08-05 commercial-capture deploy (services tier, /landlord-tax, /section-24, /making-tax-digital-landlords, www→apex, locations consolidation), GSC through 09-06:** program pages impressions 1,140→3,827 (3.4x) but clicks 6→15, CTR 0.53%→0.39%, avg position 22.8→40.9 (worse); `/landlord-tax` at position 76 with 0 clicks; **0 leads landed on the three flagship money pages in 33 days** (3 on /services*, 2 on /locations/*). Verdict: **maturing, not failed** — 33 days for brand-new pages, and the window carries three confounders (redesign cutover 08-23, consent incident 08-15..24, bank holiday 08-31). No numeric success bar was ever set and the planned 08-05 baseline snapshot (`property_commercial_baseline.py`) was never run/committed. **Next: 90d read ~03 Nov; set a numeric bar before it. If /landlord-tax hasn't reached ~pos 60s→low-30s by early Oct, the lever is internal links/authority, not content.**

**Consent-incident repair check (post 08-24 revert `435cc12e`):** both "silent" mini-form surfaces (`inline_mini`, `resource_block`) verified RENDERING in live production HTML; mounts survived the redesign (BlogPostRenderer.tsx:278/285/297); shared submit path proven working (calc_result_gate/specialist_widget recovered). Per-form_id weekly table shows `inline_mini` was NEVER a producer (1 lead ever) — its zero is normal. `resource_block` ran ~1.6/wk pre-incident (8 leads 07-13..08-15) and 0 since 08-15 (~2% chance as pure noise): real but small gap, ~1-2 leads/wk, most likely traffic mix into gated flagship topics post-redesign rather than a code defect. Note `GateOrForm` was deliberately removed from calculator pages during the redesign (CalculatorPageResources.tsx) — blog mounts unaffected. No fix applied; re-read alongside the 90d commercial read.

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **183 commits** were on
the branch and not in `origin/main`.

**All 183 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'Property/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'Property/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## 0.09 Growth diagnosis — READ BEFORE PLANNING GROWTH WORK (2026-08-16)

**[`RESEARCH_2026-08-16.md`](RESEARCH_2026-08-16.md)** — fresh-pull diagnosis of what actually drives (and does not drive) rankings here. Headlines: **Bing is 67% of search clicks** (4,280 vs 1,655 over 88d) and its CTR-by-position curve is steep while Google's is flat, so measure on Bing; **Google +76.1% / Bing +52.7%** clicks 28d-over-28d, the site is compounding, not stalled; **every on-page lever tested came back null** (internal links, word count, H2s/tables, title-term match, page type, H1 match, competition density), including a natural experiment where our BTL mortgage calculator has effectively the same H1 and length as uklandlordtax's and sits at position 85 to their 1. The head-asset premise is therefore unproven, and the strategy doc's ~3,500-word teardown standard contradicts what the winning pages do. Technical foundation audited clean (0 canonical/title/description/sitemap/orphan/redirect-chain defects); 6 small live defects listed in §3; the 19.07 MB deployability "emergency" is **not live** (largest response 0.81 MB, 23x under). Also carries the triaged tail build list (24 clear / 86 to triage / 22 covered) and five corrections made mid-session with the parser-vs-API lesson behind them.

**[`CLUSTER_TEARDOWN_SDLT_2026-08-16.md`](CLUSTER_TEARDOWN_SDLT_2026-08-16.md)** — single-cluster deep dive on stamp duty / SDLT (the biggest head in the map, 1.4M/mo variant-summed). Headlines: the cluster earns **4 clicks on 6,562 impressions in 90 days** and we appear on **0 of 210 SERP slots** across 14 head queries and 125 domains; the generic head is unwinnable by anyone (best position the whole 16-competitor set holds on any SDLT keyword >=8,000/mo is 6, median 49, SERP owned by gov.uk / MoneyHelper / MSE / estate agents / single-purpose calculator EMDs **none of which are in our tracked competitor universe**); the map's "uklandlordtax pos 10" is their BTL-modifier keyword, they sit at 33-43 on the real head. **41 of 44 top-5 slots are a calculator, 3 are prose** — we field 4 calculators and 57 essays where competitors field 36 and 41 calculators. Demand/impression mismatch: generic-calculator intent is 60.9% of demand and 2.0% of our impressions, devolved LBTT/LTT is 0.7% of demand and 25.5% of ours. Rate tables, internal linking and URL-slug matching were each tested on a fresh 135-page SERP corpus and each came back **null**; only "span of years mentioned" is significant (+0.228, p=0.007, more years = worse). 31% of cluster impressions sit in 24 token-permutation query families producing 2 clicks (machine retrieval, not humans). Recommendation: 3 scenario calculators (second home, limited company/SPV, commercial/mixed-use) as a falsifiable test, not a head-asset programme.

---

## 0.10 Structural competitor audit + cluster coverage programme (2026-08-17)

**[`STRUCTURE_VS_COMPETITORS_2026-08-17.md`](STRUCTURE_VS_COMPETITORS_2026-08-17.md)** — why peers rank for 20 to 100x more keywords, answered with live data. Headlines: page count is NOT the variable (we publish 798 URLs, uklandlordtax publishes 401 and ranks for 35x more); depth is not either (ours 3,000-4,300 words against their 1,967-2,297); **domain trust is the biggest single factor** (17 referring domains, first backlink 2026-06-12, DataForSEO rank 87 against 208-298 for peers aged 2019-2022) and their winning pages carry 0 to 8 referring domains of their own, so it is domain-level not page-level. **The additive finding is vocabulary**: 108 of the top 150 competitor SDLT keywords appear nowhere in 760 posts, and our assigned limited-company page holds 0 of its cluster's 98 keywords, saying "SDLT" throughout and "stamp duty" twice in 3,530 words. Appendices: B the 41-topic SDLT consensus map with per-page actions; C the scope statement (263 of our pages, 7 competitor domains, 2,539 queries from three sources, because competitor data alone drops 937 queries we already earn impressions on); D2 four full-domain competitor teardowns, every page; F the measured register gap (statute references 12.3 per 1k against 0.1, direct address at half their rate, while sentence length, reading ease and question-heading share are NOT different); **G the reconciliation with 2026-08-16, which withdraws internal linking as a lever** (rho -0.014, p 0.869 there) and double-sources the tool-shape finding.

Programme design lives in [`../_engines/REWRITE_PROGRAM.md`](../_engines/REWRITE_PROGRAM.md) §9.1 to §9.12: cluster coverage input, research-pack spec, tracker reuse (`monitored_pages` + `blog_optimizations`, both already carry Bing baselines), scope contract and reconciliation ledger, dossier freeze, four new deterministic gates including equity preservation, the cluster-level language pass, and the falsified-lever table. Specimen research pack: `briefs/property/sdlt/PACK_sdlt-transfer-property-company-cost.md`.

**UPDATE 2026-08-17 (second session): VERIFIED, CORRECTED, then BUILT.** A four-way independent
verification pass (fresh GSC+Bing pulls, corpus re-measurement, ledger recompute, live competitor
fetches; record in the findings doc Appendix I and DOSSIER §7b, commit `d33b51ad`) confirmed every
directional conclusion, corrected the pre-union cluster numbers (`sdlt rates` peer-winnable 13,400
-> 5,130; phrase gap worse than published at 139/150), propagated the manager adjudications into
`ledger.csv` (reconciliation 1,773/353/207/79/36 of 2,448), and REFUTED the cruseburke 404-decay
note live. Owner then approved the full 7-page work order in one batch, executed and committed as
**`f7794767`** (5 blog extends/reframes + FTB tool copy + head-calculator reframe surfacing the
existing second-home toggle as the stated tool experiment). QA (two Opus tracks) corrected en route:
the Sch 15 **para 10 -> para 18** incorporation miscite (page, FAQs and `house_positions.md` line 32,
which self-contradicted), an invented HMRC refund-timescale attribution, the Sch 4ZA £40k
small-purchase threshold, and the stale FTB £6,250 -> £5,000 on the sibling relief page. New
deterministic gate: `scripts/sdlt_equity_gate.py` (equity regression vs baseline, protected
elements with pack-declared approved changes, ledger balance). All gates green: coverage 5/5,
link audit 0/0, vitest 1166 incl. goldens 72/72, tsc, prod build, dependency closure, qa_verdict
batch `sdlt1` all_clear + coverage manifest.

**DEPLOYED TO PRODUCTION 2026-08-18** (owner-triggered): cross-brand predeploy blocker fixed
(`bca5a721`, sister-brand literals neutralised), registrar gained `--page-urls` (`47da2856`),
branch pushed (CI green), deployed from clean worktree at `ac2a7d8b` (deployment
`dpl_Bzc6YK9Sw3EE8PKxj8VDcZYcYskZ`), all 7 URLs verified 200 with new content live, all 7 armed
in `monitored_pages` (rewrite_date 2026-08-18, dual baselines, watch to 2026-11-16; 6 stale prior
rows re-baselined in place), 7 URLs to IndexNow (HTTP 200; IndexNow is Bing's protocol).
**Next reads: Bing ~2026-09-01 (14d) and ~2026-09-15 (28d), Google 28/90d; per-pack revert
triggers stand.** Next-cluster scoping committed (`ac2a7d8b`,
`briefs/property/CLUSTER_SCOPING_2026-08-18.md`): tools family 102k/mo peer-winnable (gated on
the calculator experiment), CGT 31k, rental-income 12k; CGT recommended as cluster 2. Sitewide nit found: header sr-only tagline carries an
em-dash (template-level, every page, pre-existing).

---

## 0.11 Bing experiments batch (DEPLOYED 2026-08-18, owner-triggered)

**DEPLOYED TO PRODUCTION 2026-08-18** from clean worktree at pushed `06195d7d`
(deployment `dpl_4c5BJeZLCA1DFWpDJjonTKmnAiQ7`, aliased www.propertytaxpartners.co.uk,
847 pages). 5 spot-checked URLs verified 200 with new content markers live. All 20
treatment pages armed in `monitored_pages` (rewrite_date 2026-08-18, dual G+Bing
baselines, watch to 2026-11-16; 11 inserted, 9 stale prior rows re-baselined in
place). 20 URLs to IndexNow (HTTP 200). **Next reads: Bing ~2026-09-01 (14d) and
~2026-09-15 (28d), Google 28/90d; per-experiment success/failure triggers in the
dossier.** Controls are never edited.

Estate Bing deep dive ([`../_engines/BING_DEEP_DIVE_2026-08-18.md`](../_engines/BING_DEEP_DIVE_2026-08-18.md))
produced three property-only isolated experiments, built through the §9 machine
(dossier + packs + Opus writers + two QA tracks + deterministic gates):
[`briefs/property/bing-experiments-2026-08/DOSSIER.md`](../../briefs/property/bing-experiments-2026-08/DOSSIER.md).

- **Exp 1, CTR repair:** `/calculators/lbtt-calculator-scotland` metaTitle+metaDescription
  only (registry `src/lib/calculators/tools/lbtt-calculator.ts`). Baseline Bing 2,571 impr /
  21 clicks / wpos 7.5; success = 28d Bing CTR >= 1.5% at held position; revert if wpos > 9.5.
- **Exp 2, tables:** 5 treatment posts each gained ONE comparison table (insert-only),
  5 matched controls untouched. Lever provenance: rho -0.30 (2026-08-18, second derivation
  of the 2026-08-16 direction). n=5/arm detects large effects only, stated.
- **Exp 3, conversational coverage:** 14 treatment posts each gained ONE H2 answering
  their Bing-only question queries (from per-page GetPageQueryStats), 14 controls.
  Success = a targeted question gains an impression on >= 7 of 14 pages at 28d.
- Selection protections: 452 active monitored slugs and all 57 lead-generating entry
  pages EXCLUDED from both arms; every treatment page has <5 Google clicks/28d and 0
  attributed leads/90d. No treatment page is a Google money page.
- QA found 4 must-fix factual defects in drafts (fixed pre-commit) and a legacy-defect
  delta list (rent-a-room Method A/B inversion page-wide, FHL abolition statute miscite,
  and 4 more) recorded in the dossier for a separate corrective pass.
- AT DEPLOY (owner-triggered): register all 20 treatment pages in monitored_pages +
  blog_optimizations (baselines in the dossier), then read Bing at 14/28d, Google 28/90d.
  Controls are never edited.

**Historical (archived 2026-09-16): [`HANDOFF_2026-08-21.md`](_archive/HANDOFF_2026-08-21.md)** (agents
track + Wave 12 pickup, owner-requested; supersedes HANDOFF_2026-08-20 for sequencing).

## 0.23 Consent-wording conversion incident — DIAGNOSED + REVERTED ESTATE-WIDE 2026-08-24

**Symptom (owner, 2026-08-24):** website leads collapsed (Fri 0 / Sat 0 / Sun 2 / Mon 0
website leads vs 2.41/day baseline) right after the redesign cutover, so the redesign was
the suspect. **The redesign was cleared; the cause was the consent notice.**

Evidence chain (all re-derivable):
1. Weekly leads by surface: main `lead_form` held (10 -> 8 wk-on-wk), `specialist_widget`
   held (3 -> 3); the ENTIRE deficit was the mini-form surfaces: `calc_result_gate` 5 -> 0,
   `resource_block` 2 -> 0, `mobile_tool` 1 -> 0 (week of 08-17).
2. Funnel: since 08-15, 18 sessions completed step 1 of the calc gate and VIEWED step 2
   (contact details); ZERO completed it. Prior baseline 6/20 (30%). 14 of the 18 never
   focused a single step-2 field yet kept browsing the site afterwards (up to 316 events,
   81 min) = deliberate refusal at the disclosure, not a technical failure.
3. Deploy alignment: prod deploy 08-15 15:29 UTC (`ead4aee3` window) put the Annex B.2
   "up to three firms... may be paid a fee" notice live (from `924a60d5`); the softer but
   definite "WILL share your details with regulated firms" variant followed 08-17 20:14
   (`36b2628f`). Stored `consent_text` on lead rows dates each window exactly. In the
   modal render path, the ONLY user-visible file changed between the 08-13 and 08-15
   deploys was `Property/web/src/config/site.ts` (the wording) — MiniCapture untouched
   since 07-17.
4. Live e2e disproof of breakage: QA-flagged submit (`?qa=1` -> `is_test`) through the
   live calc gate on 08-24 worked end to end (modal, both steps, submit, lead row,
   nurture enrol). Test lead + analytics traces deleted after.

**Fix (owner decision, exact revert):** `leadConsentText` restored byte-exact to the
04-14 Aug wording ("may be shared with a firm from our specialist partner network...
passed to another firm in the network"), identical across ALL sites (21 files, 17 sites).
The 7 lead-payload LIA plurality guards re-pinned verbatim; plurality/caps disclosure
stays in each privacy policy (layer 2, unchanged). Pool gate unaffected (anchor "a firm
from our specialist partner network" already in `consentAllowsSharing`). Commit
`435cc12e`, deployed to all 15 Vercel-project sites 2026-08-24 ~20:00-20:30 UTC, all
READY, wording verified live on 6 domains. wills-probate + divorce-finances ship it at
their first deploy. One transient CLI "fetch failed" on contractors-ir35, retried clean;
no failed builds, no CI noise (push triggered no workflows).

**Watch:** mini-form submits (`calc_result_gate`/`mobile_tool`/`resource_block`) should
come off zero within ~a week if the diagnosis is right. Residual open question: whether
the softer notice measurably lifts step-2 completion back to ~30% (read at 2 weeks). Any
future consent-wording change must go through a conversion read BEFORE estate rollout.

## 0.22 Designer redesign PORT — ALL BUILD PHASES COMPLETE 2026-08-23, **DEPLOYED 2026-08-23 20:21 UTC**

> **CUTOVER: 2026-08-23 20:21 UTC.** Two production deploys, 20:21:50Z and 20:34:05Z (Vercel
> project `prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU`). Independently corroborated twice: the day's
> first lead landed 09:38:38Z on the old design, the second 20:47:16Z, thirteen minutes after
> the second deploy, on the new one. Prod HTML carries the DECISION L proof point
> ("280+ Properties enquired about") and the `lg:inline-flex` header CTA, so the last commit on
> the branch is live.
>
> **Before/after read: `python scripts/_q.py scripts/property_design_ab.sql`.** That file holds
> the window, the two traps, and the precondition. Do not compare `header_book` alone across
> this date: commit `d4f24e25` moved the CTA from `sm:` to `lg:`, so tablet volume shifted to
> the `header_book_mobile` row. Sum the pair. And do not read the comparison at all until the
> analytics bot backfill has been applied (it was, 2026-08-23), or the BEFORE side is inflated and the
> redesign reads as a loss it did not cause. Give it three to four full weeks.


**What this is.** On 2026-07-16 the Property site source was pushed to `Property_zip` so an
external designer (Tanjiah, Double Wired Creative) could rework design, branding and
conversion psychology. On 2026-08-21 they returned one squashed commit, `eb745e1`, covering 11
sessions: **252 files, +33,857 / -6,934** — a new design system, ~40 bespoke storytelling
components, a rebuilt blog, and reworked chrome, homepage, services, calculators and legal
pages. We had not stood still: **644 files changed under `Property/`** over the same period
(Waves 8 to 12, the cluster coverage programme, lead-engine parity). Both sides moved, so this
was a **port, not a merge**: 81 overlapping files, 59 real conflicts, ported file by file with
a recorded decision for each.

**Governing rule, from the owner (2026-08-22): take their design.** The designer's decisions
are approved and were not relitigated. Seven carve-outs were the only permitted divergence,
all of them cases where their July fork would undo something factual, legal, security-related
or SEO-load-bearing that we changed after they forked: facts and figures against
`house_positions.md`; surfaces we deliberately deleted (chiefly `ResourceGate`, killed in
`5c156c51` for writing direct to PostgREST and shipping client-side Supabase keys); locked
compliance decisions (Microsoft Clarity stays dead, the DJH partner block stays ours,
`enquiry_retention_months` stays 24); data-tuned settings; **our SEO surface** (schema, H2
sets, metadata, canonicals, crawlable internal links); build correctness (the
`@source "../../../../packages/web-shared"` line they deleted because they had no such
package); and analytics continuity.

**Where the record lives.** The whole programme worked out of gitignored
`tmp/design_migration/`: `CONTEXT.md` (rule zero and the carve-outs), `PLAN.md` (phases and
the owner decisions A to M), `EXECUTION.md` (gate tiers, commit discipline, reporting rules),
`reports/01..15` (the investigation), `reports/14_completeness_audit.md` (**the 252-row
disposition table, which is the coverage proof**), and per-phase `logs/phase_N.md` +
`logs/fidelity_N.md`. Branch `design/property-redesign-port`, tags
`design-port-phase-0` .. `design-port-phase-7`. Every phase was built by one agent, gated, then
reviewed by a second independent agent against the designer's intent.
`REDESIGN_ARCHITECTURE.md` (our own competing internal spec, 2026-07-03, never signed off) was
confirmed dead and archived to `_archive/` under DECISION K.

**Phase 8, the last build phase (2026-08-23, 11 commits).** Two structural fixes that were
deferred so their blast radius would be attributable, plus cleanup:

- **The `h1..h6` cascade-layer fix.** `globals.css` carried an UNLAYERED
  `h1..h6 { font-weight:700; line-height:1.2; letter-spacing:-0.02em }`, and under Tailwind
  v4 unlayered author CSS beats every layered utility regardless of specificity, so it
  silently defeated every `font-*`, `leading-*` and `tracking-*` utility ever written on a
  heading, site-wide. **Shipped as a deliberate split and this is the part to understand
  before touching it again:** `font-weight` and `letter-spacing` moved into `@layer base`;
  `line-height: 1.2` was left UNLAYERED on purpose. Tailwind's `text-*` utilities carry a
  bundled line-height, so layering it hands every heading to Tailwind's per-size defaults —
  measured with `getComputedStyle` over 82 routes at 1440 and 390, that moved **2,214
  headings across 163 route/width combinations**, including every hero h1 from 72px to 60px
  leading. None of those was an author's intention; they are framework defaults, and the
  designer authored and shipped the whole system at a uniform 1.2 heading rhythm
  (`DESIGN_GUIDELINES.md:280-286` names its one deliberate exception). As shipped, **14 of
  5,111 measured headings moved**, all letter-spacing, both sites deliberate (the blog sticky
  TOC label and a calculator summary heading, both uppercase micro-labels). 40 heading tags
  carrying dormant `font-semibold` became `font-bold`, which is a zero-render change and is
  what the designer's own weight rule specifies.
- **`getRelatedPosts` matched raw frontmatter.** Three of our ten categories carry a two-way
  spelling split, so each was two disconnected related-article pools. Measured over all 783
  posts: 13 groups became 10, pools **shrank on 0 posts and grew on 357**, and the rendered
  top-3 changed on 228 pages. Guarded by a new test that fails when the fix is reverted.
- **Ten blog hubs emitted `BreadcrumbList` twice** (hub `@graph` plus the shared
  `<Breadcrumb>`). The `@graph` node was dropped, per the Phase 0.10 precedent. Verified from
  rendered JSON-LD: exactly one on all ten, `CollectionPage` preserved.
- **DECISION L shipped.** `£2.4M+ Tax savings identified` was replaced by
  **`280+ Properties enquired about`** on all 12 `StatsCounter` pages. The figure was
  re-derived from live data before shipping (158 enquiries, floor 280, data through
  2026-08-21) and **the SQL is now in the docstring of `src/lib/site-stats.ts`** so it stays
  re-runnable. It is a floor, not an estimate: `leads.role` is present on 158/158 rows, every
  band is counted at its bottom edge, developers and "Other" contribute zero. **Wording is
  binding: enquiries, never clients, advises, manages or serves** — Property is lead-gen and
  no client records exist anywhere in the estate. **DECISION M ("100+ Landlords served") is
  still open and that tile was not touched.**
- Also: the 40% first-year allowance (FA 2026 s.29 / CAA 2001 s.45U) added to
  `capital-allowances-calculator` copy, which had stopped at companies-only full expensing;
  every list moved to the designer's `pl-6` recipe; `ProcessTimeline`'s inactive step number
  2.63:1 -> 4.76:1; the last `font-serif` removed; three zero-consumer components deleted
  (`CTASection`, `ResultChart`, `ResultChartInner` — the designer's tree has zero consumers
  for all three too); `MTDCountdown` retargeted from its expired 6 April 2026 deadline to the
  **6 April 2027 £30,000 step** (house §3), **in its own isolated commit `9d82560b`** so it
  can be reverted in one line.

**Gate at Phase 8 close, every number at or better than the `design-port-phase-7` baseline:**
tsc 0 errors; eslint 0 errors / 31 warnings; vitest 52 files / 1,511 pass (was 51 / 1,508);
calculator goldens 241/241; `next build` exit 0 / 902 static pages; dependency closure OK
across 19 sites; `predeploy_gate.py --site property` PASS; sweep 98/98 URLs clean, 0/771 dead
links, 567 `data-cta`, 0 rendered dashes; `browser_check` exit 0, 140 page-loads, 0 new
problems. No baseline artefact was re-saved.

**DEPLOYED 2026-09-16 (90fbea9c).** Two things carry now that deploy has happened:
**DECISION A1** requires the whole Property `monitored_pages` set to be re-baselined
post-deploy (70 cluster rows are armed to 2026-11-19 and a re-skin triggers no detector, so
attribution for that window is knowingly spent), and Phase 4 item 8 requires a **Vercel
referrer-log check for live calculator embedders** before anything that changes embed output
ships next, because breaking a widget on someone else's site is not reversible from our end.

**Open owner decisions at Phase 8 close:** M (the "100+ Landlords served" label, which the
DECISION L investigation showed cannot be evidenced as a client claim); I (a fee figure on
`/services/property-accountant` and an `/incorporation` FAQ answer, asked for across six
designer sessions and never supplied); the homepage hero closer, still the designer's
placeholder; whether the seven-field `LeadForm` gets an experiment; and whether the
**Weekly Optimisation Engine** should keep running — it was verified LIVE on 2026-08-23
(`.github/workflows/weekly-optimisation.yml`, cron Mondays 07:00 UTC, succeeding on schedule
every Monday since 2026-07-20). Our records saying it was "disabled 2026-07-13" were wrong: it
FAILED on 07-13, was fixed on 07-19, and has run ever since. It was reported, not stopped.

### 0.22a / 0.22b / 0.22c Owner review passes — 2026-08-23 [deployed 2026-09-16, 90fbea9c]

**START HERE IF YOU ARE PICKING THIS UP.** Three live review sessions on top of
`design/property-redesign-port` after Phase 8 closed, all on the same day. The owner walked
the site on the dev server and directed changes page by page. Nothing is committed, nothing
is pushed, nothing is deployed.

**Read `docs/property/DESIGN_SYSTEM.md` first, and read §0 of it before writing any new
page.** It is the durable rulebook these sessions produced. 0.22c turned it from a record of
what the redesign did into a **binding page contract**: §0 is a ten-part checklist covering
structure, visuals, money figures, calculators, conversion, crawl paths, accessibility, copy
and reuse, and a page that does not satisfy it is not finished. 0.22c is the latest session;
everything in 0.22b and 0.22a still stands except where 0.22c says otherwise.

**Gate as at the third review session's close (2026-08-23 late):** tsc 0 errors; eslint
0 errors; vitest **55 files / 1,532 pass** (was 54 / 1,529 at 0.22b, 52 / 1,511 at Phase 8).
`check_dependency_closure.py` re-run and PASSING ("dependency closure OK across 19 sites").
`next build`, calculator goldens, `predeploy_gate.py`, the sweep and `browser_check` have NOT
been re-run since Phase 8 and must all be run before any deploy.

**71 files under `Property/web` are now modified or untracked** (was 62), plus
`Property/niche.config.json`, 2 under `packages/web-shared` and 2 docs: 76 in total. Every page change below was verified by fetching
the rendered page off the local dev server and asserting the new strings are present in the
HTML, not by assuming the edit landed.

### 0.22c Third owner review session — 2026-08-23 late, UNCOMMITTED [deployed 2026-09-16, 90fbea9c]

Same branch, same dev-server walk. Eight surfaces plus the rulebook itself. **The headline
outcome is `DESIGN_SYSTEM.md` §0, the page contract**, written at the owner's instruction so
that every existing and future page is held to one checklist instead of the rules being
re-derived page by page. Read it before anything else.

**What changed, page by page:**

1. **`/calculators/stamp-duty-calculator` body now runs the full container.** It was the last
   page on the site with a `max-w-3xl` body clamp (two of them: the explainer and the FAQ
   block), so it read as a narrower site than `/calculators/[slug]` beside it. Fixing it
   surfaced two things the box was hiding: its h2s were `sm:text-3xl`, a size used nowhere
   else, and its FAQ was a hand-rolled `dl` with its own inline `FAQPage` object over `q`/`a`
   keys. Now `sm:text-4xl` and `FaqSection` + `buildFaqPageJsonLd` over one
   `{question, answer}` array. Rule written up as **`DESIGN_SYSTEM.md` §6a**.
   **Site-wide audit done:** every `max-w-3xl|4xl|5xl` in `src/app/**` was read in context.
   All survivors are hero copy or the eyebrow + h2 standfirst block above a full-width grid.
   **Zero body clamps remain anywhere on the site.**

2. **`/contact` rebuilt from a hero-and-form into a funnel.** It now runs hero, form, Who we
   are, Why choose us, Testimonials, What we cover. The three homepage bands were **lifted
   out of `app/page.tsx` into `components/property/MarketingSections.tsx`** and the homepage
   re-renders them from there, so the two pages cannot drift. The form deliberately stays
   directly under the hero: it was tried below the bands and moved back the same day, because
   `/contact` is the page a reader arrives on already intending to enquire. Testimonials sits
   third rather than last because the footer is navy. **`DESIGN_SYSTEM.md` §4c.**

3. **`/services/property-tax-advice`:** the "Background reading before you book" box (eight
   blog deep links, carve-out 5) moved out of the Scope section to under the changes table in
   Moving parts, and went `bg-white` because that section's ground is slate. **§2.**

4. **Category hubs got their pagination back, at 12 per page.** `/blog/<category>` shipped
   with paging disabled (`postsPerPage={articleItems.length}`) because `NumberedPagination`
   renders `<button>` not `<a href>`, and the hubs are the only full HTML crawl path to the
   ~750-post corpus. Slicing would have cut 749 server-rendered article links to 108, so the
   reader ate a wall of up to 163 cards instead. **`HubArticleList` now keeps every card in
   the server HTML and hides the off-page ones with the `hidden` attribute**, which buys both.
   Verified on the largest hub, `landlord-tax-essentials`: 163 crawlable links, 12 visible,
   151 hidden, "Page 1 of 14". Guarded by new **`src/tests/hub-article-crawl-path.test.ts`**
   (3 tests, source scan on both halves). **§4e. Hide, never slice.**

5. **`/thank-you`, `/book` and `/complete` brought onto the redesign as one set.** They were
   the last pre-redesign pages: no hero, square corners, `border-2 border-slate-300` buttons.
   Doing them together was not tidiness. `/complete`'s "needs the personal link" card was a
   hand-copy of `/book`'s, so restyling `/book` alone had already made the pair disagree.
   Three new shared components carry the set: **`ui/SlimHero.tsx`** (shallow navy hero, no
   tick, no CTA, owner-directed), **`ui/NoticeCard.tsx`** (replaced **eight** near-copies of
   the outcome card across four files) and **`property/WhatToExpectCard.tsx`** (lifted out of
   `/contact`, now four consumers). `BookingPicker`'s chips went `rounded-xl` and
   `DetailsForm`'s inputs with them. **Every branch was kept**: all four `/thank-you` states,
   all four `/complete` states, the `?rt=` return link with its `data-cta` attributes, and the
   `LEAD_NURTURE_ENABLED` copy fork. **§4d.**

6. **The `/complete` "server crash" flag in the handoff docs is closed, and was never ours.**
   `tmp/design_migration/reports/08_specialist_widget.md` §1.2 quotes
   `CONTEXT_SUMMARY_SESSION10.md`: 22 entrypoints (the `/complete` page plus 21 `/api/leads/*`
   and `/api/cron/*` routes) imported lead-nurture modules **missing from the designer's
   vendored snapshot**, which poisoned their dev server and failed their production build.
   Our monorepo has the real package. Verified: all nine modules present under
   `packages/web-shared/lead-nurture/`; `check_dependency_closure.py` PASSES across 19 sites;
   `/complete` returns 200 on no token, garbage token, malformed token and a real-shaped prod
   token; all 25 API routes answer (`submit` 400 on empty body, `book` 401, `booking-viewed`
   200) with no 503 stubs; and nothing is poisoned afterwards. Worth knowing: `/complete` has
   a second plausible 500 path in that `verifyLeadToken` is called outside any try/catch, but
   it is safe because the shared module catches the missing-secret throw internally
   (`tokens.ts:105-109`) and returns `bad-signature`. A comment now says so at the call site.

**Four defects found by auditing the new pages against §0, three of them self-inflicted the
same day. Recorded because the pattern matters more than the fixes:**

- **A `max-w-2xl` column is a clamp.** The first pass at `/book` and `/complete` put the
  picker and the form in a narrow column under a full-width heading, and wrote that into §4d
  as a legitimate carve-out. It was not one: a lone narrow column leaves half the container
  empty, which is the defect §0.1 exists to stop, reached by a different route. All three
  pages now run `lg:grid-cols-[1.6fr_1fr]` with `WhatToExpectCard` in the second column, the
  `/contact` anatomy. §0.1 now says the fix for a lost-looking form is a second column, never
  a clamp.
- **Three closing sections shipped as prose plus a button row**, breaking §0.2, the rule the
  same session had just written. They now carry a `RelatedArticles` grid or fold into the
  reassurance column.
- **`/thank-you` without a token offered "Ready to book a time?" pointing at `/contact`**,
  which is the form the reader had just submitted. A CTA whose only destination is the thing
  already done is worse than no CTA.
- **Two claims written on `/complete` were false** and were caught before leaving the working
  tree: "we never pass your details on without telling you first" and "no marketing list".
  `/privacy-policy` §5 discloses that **up to six firms** may receive an enquiry, three
  accountancy or tax and three in related professions. The card links to the policy now
  instead of paraphrasing it. **Reassurance copy beside a data-capture field must be checked
  against the privacy policy, every time.**

**One deliberate §0.2 exemption, the only one on the site:** the opt-out branch of
`/thank-you` has no visual. A reading grid in front of someone who has just asked us to stop
would be the wrong read.

**Mobile header fix (later the same day, second commit).** `SiteHeader`'s primary
CTA was `sm:inline-flex` while the burger runs to `lg:hidden`, so between 640px and
1023px the bar carried a ~180px button, a 48px burger and the wordmark at once, and
`BrandWordmarkHomeLink` lifts its cap from `max-w-[13rem]` to `max-w-none` at exactly
`sm:` so it expanded into the squeeze instead of truncating. The CTA is now
`lg:inline-flex`: below 1024px the header is wordmark plus burger only and the ask sits
at the foot of the drawer, where it already existed as `header_book_mobile`. Both burger
buttons also picked up `rounded-xl` (they were the pre-redesign square recipe).
**Analytics consequence:** `header_book` volume from 640-1023px moves to the
`header_book_mobile` row in `vw_cta_performance`. Total unchanged, but a
`header_book`-only comparison across this date will read as a drop that is not one.
Written up as a new `DESIGN_SYSTEM.md` **§7a (the header across breakpoints)**, with
the generalisable rule spelled out: never introduce a sibling at the same breakpoint a
neighbour's width cap changes. Both classes read as harmless alone; the defect only
exists in the overlap, across two files, and no test would have caught it. A new
contract subsection **§0.8 Responsive and mobile** carries the checklist version
(burger owns below `lg:`, nothing crowds the wordmark, `min-w-0`/`shrink-0` discipline,
44/48px touch targets, no horizontal page scroll, stack order = reading order, check at
390/768/1024/1440).

**Cache posture verified after deploy, 2026-08-23.** No stale-serving risk: HTML is
`public, max-age=0, must-revalidate` so every browser revalidates against the CDN on
each load; `/_next/static/*` is content-hashed and `immutable`, so a new build emits new
filenames and cannot collide with an old cache; **there is no service worker** (`/sw.js`
and `/service-worker.js` both 404, zero `serviceWorker` registrations in source), which
is the only thing that could pin a user to an old build indefinitely; and the apex alias
points at a single Ready production deployment. `/thank-you`, `/book` and `/complete`
are `private, no-cache, no-store` and never cached at all.

**New files this session:** `components/property/MarketingSections.tsx`,
`components/property/WhatToExpectCard.tsx`, `components/ui/SlimHero.tsx`,
`components/ui/NoticeCard.tsx`, `src/tests/hub-article-crawl-path.test.ts`.

**Not done, and deliberately so:** §0 is enforced by review, not by tests. The only guarded
rules are the two crawl paths (`calculator-tabs-crawl-path.test.ts`,
`hub-article-crawl-path.test.ts`). The container rule and the
missing-`ExampleFigureNote` case could both be source scans and are not written yet. Also
left alone: two pre-existing lint warnings in `BookingPicker.tsx` (`useEffect` missing `token`
dep) and, until this session touched it, `book/page.tsx`.

---

### 0.22b Second owner review session — 2026-08-23 evening, UNCOMMITTED [deployed 2026-09-16, 90fbea9c]

Same branch, same dev-server walk, six more surfaces. The rules this session produced are all
written into `DESIGN_SYSTEM.md` (new sections 4a and 4b, plus additions to 2, 6 and 9). Read
that file before touching any of these pages: the whole point of the session was to stop
these decisions being re-litigated page by page.

**The three standing rules the owner set, in his own framing:**

1. **A calculator never gets a card.** Where a related-reading row would carry a
   `/calculators/<slug>` card, or a section would carry a link to one, render the tool itself
   as a `CalculatorTabs` block on the page. `CalculatorTabs` gained three registry-backed
   keys for this (`costofselling`, `rentalyield`, `rentalincome`) on the `bprapr` pattern.
   **Every page doing this still owes `calculator-tabs-crawl-path.test.ts` one literal
   `<a href="/calculators/...">` in its own markup**, because that guard is a source scan and
   cannot see through a constant or an array. Each such link carries a comment saying so.
2. **Every section carries a visual.** No body section on a topic or resource page ships as
   prose alone. Section 4a of `DESIGN_SYSTEM.md` has the three-part rule; the part that keeps
   getting missed is that ground alternation applies to the FIGURE's own surface, so a figure
   on a white section takes `bg-slate-50` and on a slate section takes `bg-white`.
3. **A bare button is not a CTA block.** Statement left, button right, stacking on mobile.

**What changed, page by page:**

- **`/cost-of-selling-a-property`** — 9 figures, one per section, in new
  `components/property/cost-of-selling-figures.tsx`. Every pound figure is DERIVED from
  `DEFAULT_SALE_PRICE` and `DEFAULT_AGENT_FEE_PCT`, newly exported from
  `lib/calculators/tools/cost-of-selling-calculator.ts`, and rounded by a local `money(n, step)`
  to the precision the prose beside it uses, so a figure cannot contradict its paragraph. Its
  own calculator and the stamp duty calculator are now on-page tabs; the hero secondary
  scrolls to `#calculator` instead of leaving the site; the closing bare button became the CTA
  card.
- **`/for-letting-agents`** — hero standfirst rewritten for conversion (was descriptive: "This
  page is for letting and estate agents"). Hero secondary scrolls to `#calculators`. Seven
  figures in new `letting-agents-figures.tsx`. The five `CalculatorLinkCards` became five
  tabs, and **the section's copy moved with them**: it said "send one instead of doing the sum
  on the back of a viewing sheet", which a `<button role="tab">` cannot honour. The embed
  section is now `EmbedDeliverables`, a full-bleed navy brick band (owner: it is a
  deliverable, make it look like one).
- **`/property-tax-rates`** — 7 figures in new `rates-figures.tsx`. **The band arrays in that
  file are the single source the page's rate TABLES are built from as well as the ladders**,
  so a table and the figure beside it cannot disagree. The ladders carry what a table
  structurally cannot: main bands are marginal, the SDLT 5% surcharge and the Scottish 8% ADS
  land on the whole price, corporation tax's middle zone is effectively HIGHER than its top
  rate, and the MTD threshold falls in three steps. `RateWedge` gained its second consumer
  rather than a new component being written.
- **`/landlord-tax`** — 6 figures in new `landlord-tax-figures.tsx` for the sections still on
  prose. The headline one is `EffectiveRate`: 40% assumed against about 47% actual and near
  49% in 2027/28, every percentage derived from the worked example's own £11,000 / £5,146 /
  £5,366. `MtdStaircase` is REUSED from `rates-figures.tsx` on the navy band rather than
  copied.
- **`/research/landlord-tax-index`** — rebuilt on the standard skeleton. It was the last page
  still shipping the pre-redesign one: a flat `bg-slate-900` hero with four stat tiles and no
  CTA, a single white body block inside a `max-w-4xl` wrapper with `rounded-2xl border` cards,
  a mint gradient card holding a bare `LeadForm`, and a hand-rolled FAQ. Now: brick hero with
  a primary green CTA to `#book`, seven `TopicSection`s alternating white and slate, the four
  stat tiles moved into the Headline numbers section that sources and caveats them, the two
  calculator links as tabs, `LeadCTAPanel` and `FaqSection`. Section 4b of `DESIGN_SYSTEM.md`
  is that skeleton written down so the next page does not have to rediscover it.

**Open, and NOT done:**

1. **Commit and push.** 62 files, no commits yet. CI has not run on any of it. The owner
   declined a commit when asked (2026-08-23, "skip the commit, edit now"), so this is a
   known and accepted exposure, not an oversight.
2. **`CalculatorLinkCards` now has zero render consumers**, its five-card block on
   `/for-letting-agents` having been the last. It is deliberately NOT deleted:
   `calculator-tabs-crawl-path.test.ts` names it in both its predicate and its failure message
   as the remedy for a page that has lost its per-tool links. Deleting it means rewriting that
   guard's advice in the same commit.
3. **The rose-red X for "does not apply to you"** on `/landlord-tax` (Section 24 scope list
   and the IHT points list) and on `/section-24` contradicts figure rule 5 (neutral dash,
   never a red cross, where nobody is doing anything wrong). Both files carry comments saying
   the rose is deliberate so each page has one negation colour. Flagged to the owner, not
   changed, because it is a two-page change that was not asked for.
4. **The 24 calculator-to-calculator related cards on five `/calculators/<slug>` pages** are
   untouched. The owner was asked whether rule 1 reaches them and chose not to extend it
   there, because converting would embed a second full calculator below the first.
5. Everything in the 0.22a list below still stands, including the Phase 9 deploy conditions.

---

### 0.22a First owner review session — 2026-08-23, the earlier pass

What follows is the first session of the day. It is unchanged by 0.22b except where 0.22b
says otherwise, and its own "Open, and NOT done" list at the end is still live.

**Site-wide component changes.** These are the ones that reach beyond a single page:

- **One related-article card, everywhere.** New `components/blog/RelatedArticles.tsx`
  replaced four different designs with three different hover treatments. Green hover glow
  (`.related-card` in `globals.css`), a pill saying what the destination is (Article /
  Calculator / Guide / Service, derived from the href, never chosen), and the article's
  opening sentence via new `firstSentence()` in `lib/blog.ts`. **Zero instances of the old
  inline underlined link list remain anywhere on the site.**
- **New `lib/page-summaries.ts`.** One sentence per non-article route, imported by the owning
  page for its own hero AND read by the cards, so a hero edit cannot leave a card describing
  the old page.
- **`TopicSection` now defaults `linksAs="cards"`**, so all five topic pillars picked the
  cards up at once. Gained a `figure` slot and a per-link `kind`.
- **web-shared, twice, both opt-in with the old behaviour as the default** (see
  DESIGN_SYSTEM.md §1): `btnPrimary` corner radius became `--btn-radius`, and
  `tools/components/Calculator.tsx` gained an `eyebrow` slot so Property's generic calculators
  head themselves with `<Eyebrow>` instead of the black tag. **17 other sites unaffected.**
- **`CalculatorTabs` gained a `bprapr` tab backed by a generic registry tool** rather than a
  bespoke component. That is now the route for any registry tool wanting a tab.
- **On-page primary green CTAs now scroll to the on-page form** (`#book`); only the header CTA
  and the sticky banner still leave for `/contact`. `hero_primary` in `niche.config.json`
  changed with them.
- Smaller shared additions: `DrawnTickList` `tickClassName` (its emerald-400 default is ~1.9:1
  on white), `ExampleFigureNote` optional lead-in so two fine-print lines set as one,
  `PromptMarquee` `detail` plus an auto-taller viewport.

**Deletions and factual corrections worth knowing:**

- **`MTDCountdown` deleted outright** (component and both mounts), owner call.
- **Section 162 relief is no longer described as automatic.** `/incorporation` said "the relief
  is automatic, which means you do not claim it" in body copy and an FAQ. That has been wrong
  since **6 April 2026**: house positions §5 (locked 2026-06-01, source-verified at
  legislation.gov.uk) records FA 2026 making it claim-only, due by the first anniversary of the
  31 January following the tax year of the transfer. A reader who believed the old wording
  would have lost the relief outright. Every other page already carried the corrected wording;
  `/incorporation` was the outlier.
- **Calculator link cards removed from `/services/property-accountant`,
  `/services/property-tax-advice` and `/section-24`**, owner-directed and reaffirmed. The first
  two now emit **zero** in-body links to any specific `/calculators/<slug>` and are listed in
  `OWNER_REMOVED_INBODY_LINKS` in `calculator-tabs-crawl-path.test.ts` with the cost written
  down. `/section-24` keeps an in-prose calculator link and needs no exemption.
  `/calculators/mtd-checker` is the one to watch: it already takes zero in-body links from all
  760 blog posts.
- **All eight `/resources` guide summaries rewritten** for conversion rather than description.
  Those pages are noindex by design, so there is no meta-description cost.

**Nav fix + new guards.** Dropdown children used the same prefix predicate as the top-level
trigger, so on `/services/property-accountant` both "All services" and "Property accountant"
lit green. Children now match exactly. New `tests/nav-active-state.test.ts` asserts exactly one
child lights per page, and includes an assertion proving the guard is not vacuous. New
`tests/first-sentence.test.ts` runs the excerpt extractor over all 783 posts.

**Pages given figures this session.** `/leasehold` (7 figures, new
`components/property/leasehold-figures.tsx`), `/landlord-compliance` (12,
`compliance-figures.tsx`), `/landed-estates` (5, `estate-figures.tsx`), plus `SdltMarketValue`
and `IncorporationReliefGates` on `/incorporation` and `Section24Wedge` finally wired to
`/section-24`, the page its own docstring was written for. **Every figure re-presents existing
copy and invents no fact**; the SDLT and allowance figures derive every number from
`lib/sdlt.ts` and from constants so they cannot drift from the prose beside them.

**Open, and NOT done:**

1. **Commit and push.** 52 files, no commits yet. CI has not run on any of it.
2. **Re-run the full Phase 8 gate** before deploy: `next build`, calculator goldens,
   `check_dependency_closure.py`, `predeploy_gate.py --site property`, sweep, `browser_check`.
3. Phase 9 deploy remains owner-triggered, with DECISION A1 and the embedder referrer check
   still carrying into it, exactly as recorded above.
4. `scripts/validate_palette.js` is referenced by `RateWedge` and `SdltMarketValue` and **does
   not exist**. Contrast was measured by hand.
5. `PageResultCta.tsx` still has **zero consumers** despite a docstring claiming it runs on the
   homepage.
6. On `/incorporation` the "Services" nav trigger does not highlight, because that route sits
   outside `/services/` while being listed in that dropdown. Pre-existing, not touched.
7. `/calculators/incorporation-cost-calculator` describes s.162 without the claim requirement.
   Not wrong, incomplete on the same point corrected above.
8. The 2x2 `CalculatorLinkCards` module still renders on `/for-letting-agents`.

---

## 0.24 Designer redesign BEHAVIOUR READ-OUT (2026-09-26, 33 days each side)

**Verdict (revised after the statistical re-analysis in the annex below, which supersedes
this section wherever the two conflict): the redesign carries a real conversion cost of
roughly 0.65 to 0.95 leads a day, hidden by 24% traffic growth. Deep reading improved. The
naive before/after read in this section understated the cost because the BEFORE side was
itself depressed by the consent-wording incident and because Property was on a strongly
rising trend that the cutover interrupted.**

**Windows.** BEFORE 2026-07-21 to 2026-08-22 inclusive, AFTER 2026-08-24 to 2026-09-25
inclusive, 33 whole UTC days each. 2026-08-23 excluded (85% old design, and the worst day of
the bot incident). Source: first-party `web_sessions` + `web_events`, `is_bot = false`, after
the 2026-08-23 bot backfill (4,540 sessions carry the backfill tag, so both sides use the same
bot definition). Leads from `leads` where `source='property'`, test rows excluded.
`scripts/property_design_ab.sql` still holds the 28-day version and the two traps.

### Headline

| | before | after | read |
|---|---|---|---|
| sessions/day | 201.1 | 241.6 | +20.1% |
| visitors/day | 153.0 | 189.6 | +23.9% |
| leads | 78 | 80 | +2.6% |
| leads/day | 2.36 | 2.42 | +2.5% |
| lead rate per visitor | 1.545% | 1.279% | -0.27pp, 95% CI -0.71 to +0.17, p=0.23, NOT significant |
| lead rate per session | 1.236% | 0.966% | -0.27pp, 95% CI -0.61 to +0.07, p=0.12, NOT significant |
| avg engaged time | 145.4s | 139.8s | -3.9% |
| median engaged time | 59.2s | 58.6s | flat |
| engaged seconds PER PAGEVIEW | 124.9 | 125.7 | flat, +0.6% |
| avg max scroll | 22.5% | 24.8% | +2.3pp |
| sessions that never scrolled | 51.0% | 48.3% | -2.7pp |

Traffic grew faster than leads, so the rate fell while the count rose. That gap is not
statistically distinguishable from zero on 158 leads. Leads/day is the honest headline and it
is up.

### What actually improved

1. **Blog readers get much further through the content.** Sessions reaching the 75% scroll
   milestone on a blog page: 69.2 to 125.7 per 1,000, +5.35pp, p<0.0001. 50% milestone 217 to
   262 per 1,000. Not a page-length artefact in the redesign's favour: median blog page
   height FELL 17,252px to 15,839px, so the same percentage is fewer pixels, and absolute
   pixels scrolled stayed flat (8,046 to 7,952). Readers complete pages they used to abandon.
2. **Front-end errors halved.** `client_error` 643.7 to 263.4 events per 1,000 sessions. The
   whole drop is the opaque cross-origin "Script error." row, 4,071 to 1,794. Two new small
   rows appeared after (`Object Not Found Matching Id:*` = Edge translate extension, and
   `Failed to connect to MetaMask` = visitor browser extension). Neither is ours.
3. **Largest Contentful Paint improved slightly** and everything else held: LCP p75 1,060ms to
   1,012ms, good-rating share 92.3% to 93.5%, poor 4.9% to 3.4%. CLS, FCP, INP, TTFB all flat
   within noise, on desktop and on mobile.
4. **Like-for-like page cohort confirms it.** Restricting both sides to the 35 entry pages with
   at least 30 sessions each side: scroll 23.0% to 26.1%, never-scrolled 48.8% to 45.2%, 27 of
   35 pages scroll up. Engaged seconds on that cohort 160.9 to 157.7, essentially flat.

### What actually regressed

1. **Hub pages lost their one-click entry. Biggest behavioural change on the site.** Sessions
   reaching a hub, per 1,000: `/calculators` 6.63 to 0.75, `/services` 6.33 to 0.75, `/blog`
   3.01 to 0.63. Individual pages beneath them ROSE: `/services/property-tax-advice` 1.51 to
   3.64, `/services/property-accountant` 0.60 to 2.01, `/calculators/section-24-calculator`
   1.81 to 3.01. **Cause confirmed in code, not inferred:** the Services, Resources and
   Calculators top-nav triggers changed from `<Link>` to click-toggle buttons / mega-menu
   (`Property/web/src/components/layout/SiteHeader.tsx:128`, `:100-208`), so the hub is no
   longer a destination, only its children are. `/blog` was demoted from a flat top-level item
   to the ninth and last child of the Resources dropdown (`Property/niche.config.json:36`
   navigation tree). The footer was rebuilt to mirror the nav (`SiteFooter.tsx:20-50`), so it
   inherited the same burial instead of the old flat 13-link list, and `footer_links` was
   rescoped to legal-only (`niche.config.json:130-139`). Commits `e66f64fa2`, `734ca9fb1`,
   `deebc9f83`, `89163191d`. The routes were not deleted, only demoted.
2. **Intent CTA clicks down, dismissals up.** Sessions clicking a CTA that is NOT a close or a
   skip: 9.00% to 7.29%, -1.71pp, p=0.0002. Sessions clicking a close/skip: 10.96% to 14.68%,
   +3.72pp, p<0.0001. The raw "CTA clicks up 14.5% to 17.9% of sessions" figure is entirely the
   dismissal side and must never be quoted as an improvement. Driver is `deep_scroll_close`,
   60.1 to 112.3 clicks per 1,000 sessions: the deep-scroll modal now shows to far more people
   (`personalization_shown` on `deep_scroll_modal` 91.6 to 146.9 per 1,000, a side effect of
   readers scrolling deeper) and they dismiss it at the same rate. Its click rate is unchanged
   and tiny, 3.9 to 4.3 per 1,000.
3. **Form starts down.** 7.81% to 6.39% of sessions, -1.42pp, p=0.001. Start-to-lead conversion
   held, 15.7% to 14.6%, so the funnel did not get worse once entered; fewer people entered it.
   `/contact` reach is part of this: 19.74 to 13.17 sessions per 1,000, and the header Contact
   affordance is now a single link hidden below the `xl:` breakpoint
   (`SiteHeader.tsx:15-26,274-290`).
4. **Calculator engagement down.** Sessions that change a calculator input 6.7% to 5.5%,
   view-to-input 15.6% to 12.9%. Calculator VIEWS are flat (43.0% to 42.5%), so the tools are
   still seen as often and used less. Partly the hub collapse, partly placement.
5. **Mobile engaged time down 14%**, 185.3s to 157.1s overall and 199.2s to 173.1s on the
   like-for-like cohort, while mobile scroll rose 23.0% to 24.8% and mobile vitals are flat.
   Reading faster, not bouncing. Worth a session-replay look, not an alarm.
6. **Pages per session down**, 1.20 to 1.15, single-page sessions 90.3% to 91.5%, 3+ page
   sessions 4.4% to 3.1%. Consistent with the nav change: with hubs buried there is less to
   click onward to. This is what drags total engaged-time-per-session down while
   engaged-time-per-PAGE is flat.

### Confounders checked, and what they did to the read

* **Scroll percentage is not comparable across a redesign without checking page height.** Core
  (non-blog) pages roughly doubled in length, median 2,877px to 6,426px, so their scroll% fell
  45.3 to 27.7 while absolute pixels scrolled ROSE 4,255 to 5,233. Reading the percentage alone
  would have produced a false "core pages disengaged" finding. Blog went the other way, shorter
  pages, so its scroll% gain is real and understated.
* **Traffic mix.** Entry-page mix did shift (new CGT and section-24 posts ranking), so every
  behaviour figure above was re-run on the fixed 35-page cohort and the direction held.
* **Content publishing** slowed in the AFTER window (new blog paths first seen per week: ~30-55
  before, 8-34 after), so the traffic growth is ranking maturation, not new pages.
* **Novelty/decay.** After-window split in half: engaged time 134.7s then 145.5s, never-scrolled
  49.9% then 46.6%. Improving, not decaying.
* **Audience.** New-vs-returning mix flat (74.2% / 75.5% new), sessions per visitor 1.31 to 1.27,
  median viewport 1,488 to 1,440px. No audience swap.
* **Lead quality unchanged.** Phone capture 88.5% to 88.8%, average message length 410 to 382
  characters, lead-producing form mix roughly flat (`lead_form` 48/46, `specialist_widget`
  14/14, `calc_result_gate` 13/15).

### Open items this read creates

1. Hub demotion: decide whether `/services`, `/calculators` and `/blog` get a clickable
   top-level route back. Governing rule is "take their design", so this is an owner call, not
   a revert.
2. `/contact` reachability below the `xl:` breakpoint.
3. Deep-scroll modal: it now interrupts 50% more people for the same tiny click rate.
4. Calculator input rate: views flat, usage down.

### Other sites

The six sites that took the design port on 2026-09-16 do not yet have a readable before/after.
Nine days of AFTER data, and outside generalist (1,466 sessions) and solicitors (1,391) the
volumes are 24 to 220 sessions. Re-read no earlier than late October.

### Statistical annex, 2026-09-26 — this is the authoritative read

The simple before/after above is descriptive and is confounded three ways: Property was on a
strongly improving pre-trend, the BEFORE window contains the 2026-08-15 to 08-24 consent-wording
incident (section 0.23) which suppressed mini-form conversion, and the entry-page mix shifted.
Three identification strategies were run. Where they agree, the finding is solid; where they
disagree, both are reported.

**1. Difference-in-differences against control sites** (dentists, solicitors, medical,
generalist; window to 2026-09-13 so the controls stay clean of the 09-14 uplift and 09-16
ports; day-of-week controlled, weighted by sessions, HC3). No significant estate-adjusted
change in engaged time (−0.9s, p=0.93), scroll (+1.75pp, p=0.45) or never-scrolled (−1.8pp,
p=0.68). Caveat that kills this as a primary method: parallel trends fail. Property's pre-period
engaged-time slope is +5.97s/week against +0.5 to +1.3 for every control. DiD is reported for
completeness, not relied on.

**2. Interrupted time series on Property's own daily series** (level + slope terms, day-of-week,
HAC(7) standard errors, 2026-08-23 dropped). This removes the pre-trend and is the strictest test.

| metric | step at cutover | 95% CI | p | pre-trend/day |
|---|---|---|---|---|
| engaged sec/session | −29.7 | −52.3 to −7.1 | 0.010 | +0.92 (p=0.001) |
| engaged sec/pageview | −20.6 | −38.8 to −2.5 | 0.026 | +0.65 |
| avg max scroll % | −0.27 | −2.91 to +2.37 | 0.84 | +0.084 |
| % never scrolled | +3.0 | −1.9 to +7.9 | 0.23 | −0.19 |
| pageviews/session | −0.048 | −0.081 to −0.015 | 0.004 | +0.0008 |
| % sessions form_start | −4.1 | −6.1 to −2.1 | 0.0001 | +0.114 |
| % sessions intent CTA | −3.3 | −4.7 to −1.9 | <0.0001 | +0.076 |
| % sessions dismiss CTA | +2.4 | +1.1 to +3.8 | 0.0005 | +0.051 |
| % sessions calc input | −1.25 | −2.24 to −0.27 | 0.013 | +0.005 |
| % sessions lead | −0.44 | −0.87 to −0.02 | 0.041 | +0.009 |
| % sessions lead, consent dummy added | −0.80 | −1.22 to −0.39 | 0.0001 | consent −0.96pp (p<0.001) |
| blog: % sessions reaching 75% scroll | **+4.94** | +3.44 to +6.43 | <0.0001 | +0.014 (p=0.44) |
| blog: % sessions reaching 50% scroll | +0.75 | −2.84 to +4.33 | 0.68 | +0.110 |
| core: % sessions reaching 75% scroll | −1.62 | −2.16 to −1.08 | <0.0001 | ns |

**Placebo:** the same ITS on the pooled control sites at the same date returns nothing
significant (engaged time p=0.44, scroll p=0.35, never-scrolled p=0.48). The Property steps are
not an estate-wide artefact.

**Robustness:** the step estimates were re-run over 4, 6, 8, 10 and 14-week pre-windows, with
and without a post-slope term. `intent CTA` (−2.5 to −3.2pp) and `form_start` (−1.8 to −4.6pp)
are negative and significant in every specification. `engaged sec` is negative in all, significant
in most (−19 to −35s). `lead` is negative in all specifications, magnitude −0.5 to −1.25pp,
p between 0.0005 and 0.10, so the direction is robust and the magnitude is not.

**3. Session-level model with fixed effects** (logit, n=14,607 sessions, entry-page FE across the
top 40 pages, plus channel, device, weekday, new-vs-returning and a consent-window dummy; HC1).
This controls composition but not time trend, so it is the complement of the ITS, not a repeat.

| outcome | odds ratio, post | 95% CI | p |
|---|---|---|---|
| lead | **0.678** | 0.488 to 0.940 | 0.020 |
| form_start | 0.798 | 0.693 to 0.920 | 0.002 |
| intent CTA | 0.841 | 0.735 to 0.961 | 0.011 |
| calc input | 0.909 | 0.777 to 1.064 | 0.235 |
| engaged seconds (OLS) | −8.96s | −17.8 to −0.1 | 0.046 |
| max scroll % (OLS) | **+2.28pp** | +1.33 to +3.23 | <0.0001 |

Note the one genuine disagreement between methods: adjusted for page mix, scroll is up 2.28pp
(p<0.0001); adjusted for time trend, there is no step (p=0.84). Read it as "scroll did not get
worse and probably improved a little", not as a headline win. The 75%-milestone gain on blog
pages is the one depth finding that survives both.

**Cost, stated three ways.** At the BEFORE session lead rate, the 7,972 AFTER sessions should
have produced 98.5 converting sessions; they produced 77. Shortfall 21.5 over 33 days, 0.65/day.
Using the fixed-effects odds ratio instead: 0.95 leads/day forgone at the point estimate, 0.18
at the optimistic end of the CI, 1.52 at the pessimistic end. Lead COUNT is flat only because
traffic grew 24% at the same time.

**Power.** At ~1.1% lead rate and ~240 sessions/day, 33 days a side can only detect a 44%
relative change in conversion. Eight weeks a side gets to 32%, twelve weeks to 26%. Any
conversion claim smaller than that is below the instrument's resolution, which is why the
conversion finding rests on the modelled estimates and not on the raw rate difference.

### Mechanism, diagnosed rather than assumed

Each regression was decomposed into exposure ("did they see it") versus response ("did they act
given they saw it"). The answers are not the same for each.

1. **Form starts: response, not exposure.** Sessions that saw the enquiry-form section are
   unchanged (8.88% to 8.43%, p=0.34), and among those who saw it, start rate is statistically
   unchanged (13.75% to 12.05%, p=0.37). The loss is entirely in sessions that never saw the
   form section: 7.19% to 5.93%, p=0.0032. Those are CTA-driven entries into a form. So the
   cause is the in-page CTA supply, not the form itself.
2. **Intent CTA clicks: supply.** Per 1,000 sessions, `see_result` 58.8 to 39.9,
   `specialist_widget` 27.9 to 19.8, `header_book` 6.8 to 2.9, `assistant_call` 4.2 to 1.6. The
   new surfaces that replaced them are much smaller: `blog_skip_to_form` 4.6, `calc_see_result`
   3.1, `hero_book` 1.1 to 2.4. The redesign removed more conversion affordance than it added.
3. **Calculators: response.** Exposure is flat (43.0% to 42.5% of sessions view a calculator)
   and input-given-view fell 14.99% to 12.45%, p=0.0035. Concentrated in the two big premium
   tools: capital-gains 19.6% to 14.0%, section-24 19.0% to 12.2%. The tool UI changed; people
   look at it as often and engage with it less.
4. **Deep-scroll modal: both worse.** Exposure 9.07% to 14.50% (p<0.0001), because readers now
   scroll deeper and trip it more, AND dismissal-given-exposure 71.9% to 80.4% (p=0.0001). Click
   rate is unchanged and negligible. It interrupts 60% more people for nothing.
5. **Returning visitors took the worst of it.** Lead rate 1.46% to 0.61% (p=0.011) against new
   visitors 1.16% to 1.08% (p=0.70). Their engaged time fell 126.7s to 101.6s. They are the
   group that had learned the old navigation: their hub hits fell 2.34% to 0.82% of sessions and
   their contact-page hits 2.92% to 1.90%. This is the clearest single piece of evidence that
   the navigation demotion, not the visual design, is doing the damage.
6. **Hypotheses tested and REJECTED.** (a) "The header CTA hidden below the `xl:` breakpoint
   costs desktop conversion": desktop under 1280px fell 1.01% to 0.54% and desktop at or above
   1280px fell 1.10% to 0.79%. Both fell, no differential, so the breakpoint is not the
   mechanism. (b) "Core pages disengaged because scroll% dropped": core pages roughly doubled in
   length (median 2,877px to 6,426px) and absolute pixels scrolled ROSE 4,255 to 5,233. (c)
   "People like it less so they stop coming back": 14-day return rate by first-visit cohort is
   12.79% before, 13.26% after. No decline.

### The qualitative signal from Umair's calls

Umair reports roughly 80% of the leads he phones volunteer that they like the design and find
the site easy to learn from. Nothing in the data contradicts that, and two measures support it:
readers reach the 75% mark on blog pages nearly twice as often (+4.94pp, the most robust single
finding here), and they cover the same distance faster (37.3 to 32.7 seconds per 1,000 pixels
scrolled, so the drop in engaged seconds is partly reading efficiency, not disengagement).
Front-end errors halved and LCP improved slightly.

But that sample cannot answer the commercial question. Those 80% are people who already
converted. They are the survivors of the funnel, and the funnel is exactly where the loss is:
between reading the page and touching a form. A design can be better liked by the people who get
through it and still convert fewer of the people who see it, and that is precisely the pattern
in the numbers. The two facts are compatible, not contradictory.

The honest summary: **the design won the reading, the navigation and CTA layer lost the selling.**
Nothing here argues for reverting the visual design. It argues for putting the conversion
affordances the old site had back into the new one.

### What changed on the page, surface by surface (code audit, 2026-09-26)

BEFORE ref `0c57b7bd9` (last commit touching `Property/web` before 2026-08-21), AFTER ref HEAD.

**Removed**
* `GateOrForm` (`form_id=resource_block`), the email-capture form under every calculator, deleted
  from `CalculatorPageResources.tsx` under a documented "one form per page" rule. It produced 6
  leads in the 33-day BEFORE window and 0 after. Still mounted on blog posts.
* Homepage: intro paragraph, the "areas we help" card grid, all four embedded calculators, the
  full-bleed image CTA banner and the "why landlords choose a specialist" section
  (`app/page.tsx`). Median homepage height 15,845px to 9,849px. Calculators moved to
  `/calculators/*`, not deleted.
* `MTDCountdown` nudge on MTD blog posts and on the homepage (replaced by `StatsCounter`).
* `CalcResultCta.tsx`, superseded by `ResultGate` / `ResultGateModal`.

**Added**
* `BlogSidebarCta`, desktop-only sticky sidebar card on blog posts (`blog_sidebar_book`, 37
  clicks in 33 days).
* Tracked CTAs on `/services` (`services_hero_book`, `services_calc_*`, `services_client_*`);
  that page previously had no tracked links at all, so part of its apparent "rise" is new
  instrumentation, not new behaviour. Do not read `/services` CTA growth as a lift.
* Aswatax referral disclosure sentence in the lead-form and widget success copy.

**Changed threshold or prominence**
* `header_book` breakpoint `sm:` to `lg:` and the burger extended to `lg:`, so tablet volume
  moved to `header_book_mobile`. Deliberate, owner-confirmed 2026-08-23. Sum the two rows.
* `header_contact` only renders from `xl:` (1280px).
* Result gate now persists a per-calculator "revealed" flag in `sessionStorage`, so it asks once
  per calculator per session instead of every time. This is the whole cause of `see_result`
  58.8 to 39.9 per 1,000 and of result-gate exposure 57.6 to 42.3. It did NOT cost leads:
  `calc_result_gate` produced 13 leads before and 15 after.
* Mobile calculator capture downgraded from a form (`MobileToolSlot`) to a link
  (`premium_tool_mobile`). Also did not cost leads: `mobile_tool` produced 1 before, 4 after.
* Nav hubs demoted from links to dropdown triggers (see the mechanism section above).

**Unchanged in code, so NOT the explanation for their decline**
* `SpecialistWidget` mount, chips and triggers are byte-identical; it still auto-surfaces to the
  same share of sessions (685.5 to 665.5 per 1,000), yet engagement fell 27.9 to 19.8 and its
  form views 5.7 to 3.4 per 1,000.
* `StickyCTA` 30% threshold, `ReturningBar`, and the intent engine's `SCROLL_MODAL_PCT = 70` are
  all unchanged. `LeadForm` fields and steps are unchanged.

**Why the deep-scroll modal fires 60% more on unchanged code.** The rise is entirely on blog
entries (9.43% to 15.12% of sessions; homepage 2.53% to 2.23%, core 2.97% to 3.90%). The trigger
is 70% of page height, blog pages are now 8% shorter (median 17,252px to 15,839px) and readers
get further down them (75%-milestone reach up 4.94pp). Same rule, more qualifying sessions, and
a higher share of them are shallow reaches, which is consistent with dismissal-given-shown
rising 71.9% to 80.4%. An earlier hypothesis that the shorter HOMEPAGE caused this is REJECTED
by the per-bucket split above.

### Where the lost leads actually are, by capture surface

Lead-producing sessions per 1,000 sessions, BEFORE to AFTER, total 12.35 to 9.79 (−2.56):

| surface | before/1k | after/1k | delta | share of the loss |
|---|---|---|---|---|
| `lead_form` (end-of-article and /contact) | 7.08 | 5.77 | −1.31 | 51% |
| `resource_block` (removed from calculators) | 0.90 | 0.00 | −0.90 | 35% |
| `specialist_widget` | 2.11 | 1.76 | −0.35 | 14% |
| `calc_result_gate` | 1.96 | 1.76 | −0.20 | 8% |
| `inline_mini` | 0.15 | 0.00 | −0.15 | 6% |
| `mobile_tool` | 0.15 | 0.50 | +0.35 | −14% (a gain) |

So the deleted calculator form explains about a third. The largest single bucket is the main
enquiry form, whose exposure is unchanged (enquiry-form section seen by 8.88% then 8.43% of
sessions, p=0.34) and whose start-given-exposure is unchanged (13.75% to 12.05%, p=0.37), but
whose completion fell: `lead_form` starts 11.91 to 10.91 per 1,000 and submits 7.08 to 5.90, so
start-to-submit 59.4% to 54.1%. Field-level errors on that form rose (`prompted` 9 to 12,
`callGoal` 6 to 11, `situation` 5 to 10). That is the single highest-value thing left to
diagnose and it is NOT explained by any surface removal.

### Investigation closed, 2026-09-26: the five items, diagnosed

Four code audits plus the data. Two of my earlier framings were wrong and are corrected here.

**1. The calculator capture block, and what the flow used to be.**
BEFORE, on a calculator page: the calculator's own result rendered **immediately, with no gate and
no popup**, because `PremiumCalculator` gated only on `placement === "blog"`. Under the result
came the "Go deeper" strip, then the premium interactive tool (also ungated), then the
`GateOrForm` email capture (`form_id=resource_block`), then the explainer, then the enquiry form
at `#get-expert-help`. On mobile the premium slot rendered a SECOND capture form
(`MobileToolSlot`). So the answer to "did it have the two-step popup then" is **no**: the popup
was a blog-only mechanic, and calculator pages had a plain visible result plus a capture block.
AFTER: `gated = placement !== "embed"`, so the premium tool's result is now held behind
`HeldResult` + `ResultGateModal` on calculator pages too; on `/section-24-calculator` the primary
calculator ALSO got its own `ResultGate`, so that page now stacks two independent gates; the
capture block is deleted; and mobile got a link instead of a form. Reveal state is remembered per
calculator in `sessionStorage` (`resultGateStorage.ts`), where the old blog-only flag
(`gateModalShownThisSession`) throttled the popup once per session across all tools.
Restoration is mechanical: re-import `GateOrForm` and `hasEnabledResource` in
`Property/web/src/components/resources/CalculatorPageResources.tsx` (lines 32-41) and render it
after `PremiumUpgrade`. **There is no dedup anywhere in code**: no shared context, no
"already asked on this page" flag. On `/section-24-calculator` a naive restore would stack
primary gate, premium gate, capture block and the foot panel, four asks in one visit. The
one-form-per-page rule is a comment at `CalculatorPageResources.tsx:11-25`, not enforced code.

**2. The enquiry-form completion drop is NOT a bug. Corrected.** Every file in the submit path
(`LeadForm.tsx`, `enquiry-message.ts`, `submit-client.ts`, `useFormTracking.ts`) is behaviourally
identical across the cutover: same required fields, same regexes, same 40-character minimum on
`situation`, validation still on submit only, honeypot unchanged, the Aswatax sentence is
post-success only and cannot block. The drop is **composition**, caused by the new sidebar CTA:

| session type | starts | submits | completion |
|---|---|---|---|
| before, organic scroll to form | 79 | 47 | 59.5% |
| after, organic scroll to form | 74 | 43 | **58.1%** |
| after, arrived by clicking a jump CTA (`blog_sidebar_book` / `blog_skip_to_form`) | 13 | 4 | **30.8%** |

Organic completion is flat. The new always-visible sidebar button deep-links cold readers past
the qualifying content straight into a form whose first fields ask what prompted the enquiry and
what their situation is, and they stall there: `role` abandons 9 to 15, `situation` abandons 12 to
19, errors up on `prompted`, `callGoal`, `situation`. Small n on the jump arm (13 starts), so
treat the 30.8% as indicative. The actionable version is: the form is fine, the jump CTA needs to
land people somewhere that qualifies them first, or the form needs to ask the cold-arrival fields
later.

**3. The deep-scroll modal earns nothing.** 3.9 to 4.3 clicks per 1,000 sessions across the whole
window, against 65.9 to 118.5 dismissals. Dismissal-given-shown 71.9% to 80.4%. Trigger code
unchanged at 70% of page height; it fires more because blog pages are shorter and readers get
further down them.

**4. The hub question, corrected and downgraded.** The nav config already used click-toggle
dropdowns for Services and Resources BEFORE the port (`git show 0c57b7bd9:Property/niche.config.json`,
Services 5 children, Resources 7). What actually changed: `/calculators` went from a plain
top-level LINK to a mega-menu TRIGGER; `/blog` was added to the Resources dropdown as its
eleventh child; and the footer's flat 15-link list (which carried `/landlord-tax`, `/section-24`,
`/locations`, `/property-tax-rates` and the rest) was **rescoped to three legal links**, with
footer columns now derived from the nav tree. But the empirical path data says hub traffic never
came from the nav: it came from the homepage body and from `/about`
(`/` to `/services` 9 before and 1 after; `/about` to `/services` 8 and 0; `/about` to `/contact`
17 and 6). The homepage lost the intro paragraph, the "areas we help" grid and the "why choose a
specialist" section, which is where those links lived. **Volume correction: this is 141 hub
sessions before and 81 after, so roughly 60 sessions per 33 days, and I over-ranked it as "the
biggest behavioural change".** It is worth fixing because hub sessions convert at 12.1% and
13.6% against 0.9% for everything else, i.e. these are the highest-intent sessions on the site,
but the ceiling is a handful of leads, not the bulk of the loss.

**5. The specialist widget: nothing changed in it, something appeared next to it.** The diff is
five lines, a `sourceIdentifier` refactor and a post-success sentence. Launcher, z-index
(`z-[55]`, above every other overlay), position, chips, timings and storage keys all unchanged,
and no global CSS touches its classes. What changed is the sidebar: before, the desktop blog
sidebar held only the table of contents; after, `BlogSidebarCta` sits sticky above it, a navy
card with an emerald "Book a call" button, the same visual language as the widget and offering
the same job, permanently on screen (`BlogPostRenderer.tsx:406-409`). Best explanation: the
widget is now the fourth ask on the page rather than the second. LIKELY, not proven.

**Dilution rejected as an alternative explanation.** Restricting to the 59 entry pages with at
least 20 sessions on BOTH sides (8,521 sessions): lead OR 0.682 (CI 0.438-1.063, p=0.091),
form_start OR 0.746 (p=0.0006), intent CTA OR 0.749 (p=0.0005). Same magnitudes as the full
model, so the effect is not new low-intent pages arriving. Pages with no before-traffic are only
5.0% of after traffic and convert BETTER (1.51% vs 0.94%). One genuine anomaly left: Google-sourced
sessions halved their conversion (1.36% to 0.54%, p=0.010; on like-for-like pages 0.99% to 0.33%,
p=0.054) while their form-start rate barely moved. Bing did not do this. Unexplained, flagged.

### The Google anomaly, chased and closed, 2026-09-26

Fresh GSC pull (API, not stored snapshots), data-through 2026-09-24, windows 2026-07-21 to
08-22 and 08-24 to 09-25.

**Verdict: the Google conversion "collapse" is one outlier week, not an intent shift. Do not
act on it.** Google weekly lead rate bounces between 0.22% and 1.26% on both sides of the
cutover, with a single spike week beginning 2026-08-16 at 3.08% (9 leads from 292 sessions),
which sits inside the BEFORE window. That week alone is significantly out of line with the rest
of the before period (9/292 vs 12/1253, p=0.0095). Remove it and the Google difference stops
being significant: 0.96% before vs 0.54% after, p=0.197. The whole-site step also softens
(1.15% vs 0.97%, p=0.284), which is a caution on how much weight the naive whole-site figure
can carry either way.

**The informational-intent hypothesis is right about the traffic and wrong about the cause.**
The owner's prior was that Google's growth is informational rather than commercial. The page-level
data (full click coverage, 1,127 then 1,545 clicks) says the mix barely moved: blog 95.4% to 95.1%
of clicks, commercial and core pages 3.8% to 3.4%, calculators 0.8% to 1.5%. The query-level data
leans his way but is a weak instrument here: GSC returns only **59 of 1,125 clicks (5%) and 27,793
of 114,428 impressions (24%)** at query dimension for this property, the rest anonymised, and 62%
of what comes back does not classify. On that sample, commercial impression share falls 17.8% to
13.8% and informational rises 20.8% to 23.5%. Directionally consistent, nowhere near conclusive.
Where the growth actually came from is unambiguous and is informational long-tail:
mortgage-arrangement-fees +71 clicks, CGT complete guide +48, overseas CGT +36, section-24-repeal
+29, CGT payment deadlines +26, all on improving positions.

**The decisive evidence against intent dilution:** Google **form-start rate is flat**, 5.37% to
5.03% (p=0.64), and its engaged time is flat (136.5s in August, 132.9s in September). If the
incoming Google traffic had genuinely become materially colder, the top of the funnel would have
moved first. It did not. Only the last step moved, on 21 versus 11 leads, and it is unstable
against the removal of one week.

**Also checked and clean:** no AI-Overview style suppression. CTR is identical across the
cutover (0.983% vs 0.984%) while average position improved 14.57 to 12.17 and impressions rose
37%. Search type is 100% web; news, image and Discover are zero. Bing is the control and shows no
change (0.65% to 0.50%, p=0.58).

**What this does to the wider read.** The lead-level findings rest on 159 converting sessions and
are individually fragile; the robust findings are the ones with thousands of events behind them:
form starts down (OR 0.75, p=0.0006 on like-for-like pages), intent CTA clicks down (OR 0.75,
p=0.0005), calculator input-given-view down (p=0.0035), modal dismissals up (p=0.0001), blog
75%-scroll reach up (p<0.0001). Sequence any test programme off those, not off the lead count.

### Restoration pass 1, BUILT 2026-09-26, NOT DEPLOYED (owner sign-off pending)

Two changes only, both from findings that need no test because they are facts about the code,
not statistical inferences. Deliberately kept to two so each stays attributable.

1. **Calculator capture block restored.** `Property/web/src/components/resources/CalculatorPageResources.tsx`
   renders `GateOrForm` (`form_id=resource_block`) under the premium tool again, guarded by
   `hasEnabledResource(topic)`. Verified in the build output: "Request my free review" is present
   in the prerendered HTML of `/calculators/section-24-calculator` and
   `/calculators/capital-gains-tax-calculator`. The removal comment in that file has been
   rewritten to record why it came back, and to warn that nothing in the codebase dedupes asks
   (section-24 now carries two result gates plus this form plus the foot panel; if that reads as
   crowded, drop a gate, not this form).
2. **Deep-scroll modal switched off.** `Property/web/src/lib/intent/engine.ts` gains
   `DEEP_SCROLL_MODAL_ENABLED = false` and the `deep_scroll_modal` case returns null. The rule
   below the flag is untouched and the surface stays registered, so measurement still works if it
   is re-enabled. Test added in `src/tests/intent-engine.test.ts` pinning both the null and the
   fact that other surfaces still answer.

Verification run: `tsc --noEmit` clean, `eslint` 0 errors (29 pre-existing warnings), `next build`
succeeded, `vitest run` 57 files / 1,640 tests all passing.

**What to watch after deploy, and when.** Do not read leads for this. The instruments that move
fast enough to attribute in two to three weeks, with their current baselines:

| metric | baseline (33d after the port) | expectation |
|---|---|---|
| `resource_block` form starts per 1,000 sessions | 6.65 (blog only) | rises as calculator pages start contributing |
| `resource_block` submits per 1,000 | 0.00 | above zero at all is the signal |
| calculator sessions with a `calc_input_change` | 5.5% | watch for no drop; the block sits below the tool |
| `personalization_shown` on `deep_scroll_modal` | 146.9 per 1,000 | goes to zero, confirms the flag |
| `cta_click` with `cta_id=deep_scroll_close` | 112.3 per 1,000 | goes to zero |
| sessions with any dismissal CTA | 14.68% | should fall by roughly the modal's share |
| sessions with any intent CTA | 7.29% | must not fall; if it does, the modal was doing something |

Still open, deliberately untouched so they can be tested properly as 50/50 splits later: the blog
sidebar CTA (30.8% form completion vs 58.1% organic, 13 starts, too thin to act on), the nav hub
links, and the specialist widget.

## 0.21 Wave 12 cost-of-selling (Phase E, Track B) — EXECUTED 2026-08-21 NIGHT, deploy owner-gated

Owner-approved Phase E run via the wave conductor (single lane per the 2026-07-08
ruling; wt-tab steps substituted with conductor subagents, Wave 11 precedent).
Composition = PROPERTY_PAGE_PLAN Cluster A (13 spokes + pillar + calculator),
cannib check GREEN 13/0/0, shortlist reconciled (no overlap; 50 picks = future
waves). Stage 1: 13 seeds, every citation WebFetch-verified; found CPUTR 2008
REVOKED by DMCCA s.251(1) (+ the no-known-outstanding-effects trap), sales-agent
regulation unlocked anywhere (§26.14 created), F-151 back-patch shipped
(sdlt-refund-scams, window closed 08-20). Stage 1b: 5 mini-locks (§5.B, §1.Q,
§26.14, §26.15, §39.A). Stage 2: full briefs, all market figures named+dated,
competitor URLs fetch-verified; found Sch 6A para-numbering error in our own
day-old lock (fixed), SP2/04 scale located, PR AEA pinned s.1K(7), Foxtons
SERP-wide inversion documented, CG14300 VAT rule, Land Registry SI 2024/931
Scale 1 structure. Wave language spec measured (consumer register: you ~54/1k
baseline, sentence length IS a lever, Flesch floor 62; CGT hook UNOCCUPIED:
9 statute refs + 0 computed tax figures across 35,385 winner words). RUN: 15
Opus agents (13 writers + pillar + calculator); calculator shares computeCgt
with the CGT tool (cannot disagree; CGT calc untouched), 47 goldens. QA: 4
factual + 3 editorial, cross-writer batching; every after-tax figure re-derived
to the penny (the A3/A4 "conflict" = two routes both correct; canonical
two-route set ruled); 9 factual blockers all fixed (worst: A3's ID1 verifier
list taught readers an accountant can sign); editorial all-15 must_fix was
phrasing convergence, fixed by drop-ins (boast class purged 27+, standfirsts
to <=40 words, QA-trail language out). Verification read on the 2 restructured
pages (A9 clean; A3 one residual total fixed). GATES ALL GREEN: validator 0
errors, lint 783, links 783/783, word gate PASS, voice 13/13, tsc, vitest
1,484/1,484, prod build exit 0 (one red build first: unescaped apostrophe in
pillar JSX, 1-char fix), dependency closure OK 19, qa_verdict `wave12` 13/13
all_clear recorded LAST, predeploy `--qa-batch wave12` PASS. Flag register:
F-150..F-189 reconciled in wave12_site_wide_flags.md (open at close: F-176
post-window s.3(7) back-patches, F-185/F-187 future locks, F-188 merge
back-link, F-152/F-165/F-179 authority notes). AT DEPLOY: register 13 blog
slugs in monitored_pages + pillar/calculator via --page-urls
(cost-of-selling-a-property=/cost-of-selling-a-property,
cost-of-selling-calculator=/calculators/cost-of-selling-calculator), IndexNow
exact URLs. READS: 14d Bing ~09-04-equivalent from deploy date, 90d Google;
addressable ~45,850/mo family.

**DEPLOYED 2026-08-21 NIGHT (owner-triggered, third deploy of the day, agents1 +
wave12 in ONE deploy):** worktree at `8d4aaf1d`, deployment
`dpl_F5UBBHoxZLmn9yFyDB1j9VE3NkJt`, **all 22 new URLs verified 200** on the
production domain (hub, pillar, calculator + its embed route, 5 agents1 blog,
13 wave12 blog). monitored_pages: **19 inserts** (3 agents1 blog + hub via
--page-urls + 13 wave12 blog + pillar/calculator via --page-urls) + **2 REFRAME
rows re-baselined IN PLACE** with supersession notes (mtd-itsa-letting-agent G
0/2/85.0, prs-database 0/0; fresh G+Bing baselines, new 90d window) = **70 rows
now carry rewrite_date 2026-08-21, all watched to 2026-11-19**. IndexNow: 21
exact URLs HTTP 200 (per-calculator embed route deliberately not submitted,
noindex by design). Worktree removed. Reads: 14d Bing ~09-04, 28d ~09-18, 90d
Google ~2026-11-19, same calendar as the morning batches.

## 0.20 agents1: /for-letting-agents resource surface (Track A) — EXECUTED 2026-08-21 EVE, deploy owner-gated

Owner-ruled track (EXPANSION_PROPOSAL_2026-08-21 decision 3: pure resource surface,
no service/pricing/outreach). Dossier `briefs/property/agents/DOSSIER.md` FROZEN
2026-08-21: fresh GSC 90d (1 query row across all 12 RRA pages = NOT already earning
the demand, track confirmed net-new), Bing GetPageQueryStats per URL, freeze check
(periodic + both MEES heads hard-frozen to Nov; work order = hub + 3 net-new + 2
REFRAME rescues of invisible out-of-window pages; standalone periodic explainer
DROPPED as cannibalisation), Google Ads volumes $0.13 (RRA head 12,100/mo, redress
27,100 already-covered, database family 2,010 = the winnable prize), §9.11 language
spec (winners: 0 citation-grammar, notice-names 10.4/1k median, Flesch 49 vs our 28;
"your landlord client" whitespace), DDG-not-Google SERP limitation recorded.
PRE-WRITE STATUTE RE-VERIFICATION (blocking, ran 2026-08-21): found SI 2026/638
(Commencement No. 3), four unrecorded 1 May SIs (321/324/325/354 incl. the
information-sheet DUTY + Form 4A), s.145(2) self-commencement layer, private-only
carve-out, MEES policy hardening (21 Jan 2026 response). house_positions patched
SAME DAY: §20.12 (6 changes), §26.3, §26.5 (incl. s.74 lock + two-scheme agent-redress
correction), §26.6, §26.8 (+3 do-not-writes), §19.7 (first-year 30-day concession +
£200-on-reaching + 2027-28 4%/4%/10% step, found by this batch's factual QA vs gov.uk).
BUILT (6 Opus writers, batch size 1): /for-letting-agents hub route (+ sitemap +
niche.config nav/footer, NO CTASection/contact/FAQ by pack mandate),
rra-2026-whats-in-force-letting-agents (NET-NEW, head page),
mees-epc-rules-what-your-landlords-think (NET-NEW, myth table, all 4 measured heads
declined by name), tenancy-deposits-landlord-tax-position (NET-NEW, 14-position
PIM-verified register in coverage note; dossier's PIM candidates corrected),
mtd-itsa-letting-agent-managed-portfolio REFRAME, prs-database-landlord-ombudsman
REFRAME (12 invented pound figures deleted; 2014-vs-RRA regime distinction = spine).
Two-track QA (2 factual + 2 editorial Opus, cross-writer batching): 4 factual + 3
leakage blockers + sameness sheet, ALL fixed by original writers in 2 rounds;
RRA/database overlap collapsed 21→3 shared 7-grams; reviewerCredentials leaks
killed; batch decision = all 5 blog surfaces carry the estate reviewer block.
GATES ALL GREEN: equity gate `--cluster agents` PASS (39-row ledger, new CLUSTERS
entry), frontmatter 775, voice all 5 CLEAN-band-or-MINOR (database 36.7 ROBOTIC →
20.0, better than its 31.7 pre-overhaul baseline), tsc, vitest 1437/1437, prod build
exit 0, dependency closure OK 19, qa_verdict `agents1` 5/5 all_clear recorded LAST,
predeploy `--qa-batch agents1` PASS. Delta list `briefs/property/agents/notes/delta.md`
(21 items incl. frozen-page back-patches: s.74 sibling error, EPC pipeline-leakage,
stale 2028 framing, estate-wide reviewerCredentials sweep candidate). AT DEPLOY:
register agents1 batch in monitored_pages (5 blog slugs; hub via --page-urls
for-letting-agents=/for-letting-agents; two REFRAME rows re-baseline IN PLACE with
supersession notes), IndexNow exact URLs. READS: 90d ~2026-11-19; failure trigger
per DOSSIER §10 (zero Bing rows AND zero GSC impressions cluster-wide = register
thesis wrong).

## 0.19 Rural/landed-estates cluster (Cluster 5) — EXECUTED 2026-08-21 PM, deploy owner-gated

Dossier frozen `a14be0b3` (universe 242, ledger balanced, 19-domain uncapped harvest
$0.38, saffery/oldmill teardowns 162 pages, language spec: statute-density is THE
lever). Built same session: /landed-estates pillar (+ nav/footer/sitemap), T1
bpr-apr-allowance-calculator (33 goldens, suite 1,437), N1 inheritance-tax-on-farms,
N2 farm-tax-uk-guide, N3 how-to-avoid-inheritance-tax-on-a-farm (middleware entries
added), E1 maximising-business-relief REFRAME, E2 agricultural-relief REFRAME, E3
iht-april-2026 EXTEND (16 Bing queries verified anchored post-edit, 4 strengthened).
E4/E5 DROPPED to delta at pack derivation (zero assigned keywords, freeze discipline).
Two-track QA (4 Opus) + 5-agent fix round + floor-8 competitor re-read (72 themes,
0 undecided after 3 conductor decisions). MAJOR legacy corrections shipped with the
batch (recorded in notes/): s.124E spousal transferability VERIFIED AT STATUTE and
locked into house_positions §15.4 (two live pages taught the superseded not-transferable
position, one steered readers into unnecessary DoVs); anti-forestalling date corrected
on agricultural-property-relief-mixed-estate (was 17 months too generous); Aldridge
RNRB example re-derived (£510k/£570k); s.131 miscite dropped; s.162B debts rule
verified + locked + honest notes on calculator/E2; Atkinson holding corrected; s.118
2-in-5/7-in-10 fixed. GATES ALL GREEN: equity gate `--cluster landed` PASS (gained
rural pack-format tolerance), lint 767, links 0/0, em-dash 0, voice 5 MINOR/2 CLEAN/1
pre-existing ROBOTIC (mixed-estate 48.4→48.6, legacy state, delta item; cap page
rescued 34.0→8.9 CLEAN), tsc, vitest 1437/1437, prod build exit 0, dependency closure
OK 19, qa_verdict `landed1` 8/8 all_clear recorded LAST, predeploy PASS. AT DEPLOY:
register landed1 batch in monitored_pages (+ pillar + calculator via --page-urls:
landed-estates=/landed-estates, bpr-apr-allowance-calculator=/calculators/bpr-apr-allowance-calculator),
IndexNow. READS: 90-day is the honest read (IHT intent); failure trigger per DOSSIER §9.
**DEPLOYED 2026-08-21 PM (owner-triggered, second deploy of the day):** worktree at
`631d71ef`, deployment `dpl_C8CGheNvpuhdxCzzc7fp6GQhKdCR`, all 11 URLs verified 200
(incl. /landed-estates, calculator + its embed route). monitored_pages: 5 inserts +
3 pre-existing rows re-baselined in place + pillar/calculator via --page-urls =
47 rows now carry rewrite_date 2026-08-21, all watched to 2026-11-19. IndexNow 10
URLs HTTP 200. Worktree + scratch cleaned. CI green.

## 0.18 CONSOLIDATED DEPLOY 2026-08-21 (owner-triggered): wave11 + cgt1 + tools + rental1 ALL LIVE

Clean worktree C:/dep at pushed `1cfb5320`, deployment `dpl_B8SGyMhCB4BdvwNns1fMsW67xuDp`,
aliased www.propertytaxpartners.co.uk, 876 static pages, build green. Spot-verified 200:
NI net-new, both calculators (BTL mortgage, CGT), /leasehold, second-home CGT page,
lease-extension calculator, /embed (indexable flip confirmed live, no noindex in HTML),
home-office rewrite (corrected s.94H trades-only framing confirmed in served HTML).
monitored_pages: 39 rows at rewrite_date 2026-08-21, monitor_until 2026-11-19 = 19 wave11
(net_new) + lease-extension calc (net_new) + cgt1 3 net-new + CGT calc + 7 cgt EXTENDs
re-baselined IN PLACE (prior May-program rows, supersession note, SDLT precedent) + 4 tool
URLs (--page-urls) + rental1 2 inserts + 2 EXTENDs re-baselined in place. DELIBERATE
DEVIATION: retitled blog page `rental-income-tax-calculator` NOT registered — registrar
dedupes on slug and the tool page owns that key; the blog page's calculator queries are
meant to migrate to the tool, a regression watch there would false-alarm. IndexNow: 43
URLs HTTP 200 (all batch URLs + 6 calculators + /embed + /leasehold + /landlord-compliance
+ retitled blog page); queue empty. Worktree removed, scratch cleaned. READS: Bing 14d
~09-04 / 28d ~09-18, Google 28d ~09-18 / 90d ~11-19; per-pack revert triggers in each
cluster's packs. Reminder: SDLT batch reads (~09-01/09-15) arrive FIRST.

## 0.17 Incorporation cluster (Phase D) — FREEZE CHECK RUN 2026-08-21, verdict: DEFER

The owner's condition ("as long as there's not a massive cannibalisation risk") was tested
per HANDOFF §3 Phase D: of the family's top-10 peer-winnable keywords (5,210 of 9,130
total pw), 3,340 routes to FROZEN ground (5 stamp-duty keywords owned by the armed SDLT
batch incl. both just-worked pages; 2 calculator keywords just executed in the Phase B
tools batch) and only 1,550 is unfrozen (property investment company 590 + the two
buy-to-let-as/with-ltd 480s). The tail (39 keywords, ~3,900 pw) is long-tail thin and
provestor's main silo (21 of the family's 49 peer-top-10 keywords) sits on the
stamp-duty/limited-company guide = more frozen ground. That is under the ~2,000/mo
unfrozen threshold the handoff set, so per its own rule the cluster DEFERS to after the
SDLT 28d reads (~mid-Sep) and the parked batches' deploy. Re-run the check then; the
arithmetic is in this entry and reproducible from briefs/property/sdlt/ledger.csv +
qa_verdict caches.

## 0.16 Rental-income cluster (Phase C) — EXECUTED 2026-08-21 PM, deploy owner-gated

Dossier `briefs/property/rental/DOSSIER.md` frozen + executed same day. Universe 867
(competitor 248 uncapped + GSC 138 + Bing 546, the largest source again), ledger balanced
605/247/10/5. Work order: E1 head-guide EXTEND (+963 words, 3 answer-first sections, 466
kw reconciled, equity 253 Bing queries protected), E2 deductions EXTEND (+1,495 words, 6
sections, statute density 10.9→~7 by dilution), N1 NET-NEW national-insurance-on-rental-income
(2,863 words, CLEAN 5.9, 17 source checks; middleware map entry added). Frozen discovered
at assignment: income-tax-rates page = Bing-experiment TREATMENT, how-much-tax page =
CONTROL; both excluded to ~09-15. Equity gate gained the `rental` CLUSTERS entry.
MAJOR ESCALATION HANDLED: house_positions §34.2 was WRONG (s.94H is trades-only, not
imported into property income; 4x legislation fetches + BIM47825 + PIM2100); §34 corrected
with evidence trail, and the live page claim-home-office-deduction-landlords (built on the
error, 33 refs + a consumer-harmful CGT FAQ; invisible: 1 impression/90d) FULLY REWRITTEN
(2,975 words, CLEAN 9.9, 29/29 arithmetic, two-track QA'd + fix round; also dropped a
second latent error: home mortgage interest is not an apportionable home-office cost, and
an unverifiable "FA 2026 s.21 / ITEPA s.360B" claim). Two-track QA + 2 fix rounds across
the batch; personas deduplicated (Rafiq/Orla/Bernadette). qa_verdict `rental1` 4/4
all_clear recorded LAST; predeploy gate PASS. E1 links N1, so E1 MUST NOT deploy without
N1 (same batch = fine). AT DEPLOY: rental1 batch registers in monitored_pages; revert
triggers pre-stated in the packs.
ALSO 08-21 PM (owner-directed): audience scoping (briefs/property/AUDIENCE_SCOPING_2026-08-21.md)
+ 3-track expansion proposal (briefs/property/EXPANSION_PROPOSAL_2026-08-21.md: rural
/landed-estates on Property bounded to the tax half; developers = one pillar after Phase D;
agents = relationship channel via landlord-law explainers, RRA signal 774.5 median weekly
Bing impressions). De-risk harvests run (~$1.20; saffery holds APR family pos 3-5, consumer
register unowned). /embed hub flipped indexable (its audience is agents; iframe routes stay
noindexed). 4 owner decisions listed in the proposal — ALL FOUR APPROVED as recommended
2026-08-21 (ruling recorded in the proposal's DECISIONS section): rural on Property
bounded, developers one pillar, agents resource surface, sequencing agents→C /
developers→post-D / rural→post-E.

## 0.15 Tools-family cluster (Phase B) — EXECUTED 2026-08-21, deploy owner-gated

Dossier `briefs/property/tools/DOSSIER.md` frozen + executed same day. Harvest $0.55
(balance ~$4.78), universe 2,787, ledger balanced (472 assigned / 436 already-covered /
1,845 excluded / 34 deferred). Work order: 4 tool REFRAMEs executed (T1 BTL mortgage =
full rework to price+deposit inputs with dual repayment bases + ICR rows, the family
uklandlordtax owns at pos 1-4; T2 rental yield gross+net itemised + payback; T3
rental-income-tax copy REFRAME owning "tax on rental income calculator" (adjudicated vs
Phase C); T4 cashflow + new cash-on-cash ROI row). Two-track Opus QA + fix round; goldens
158 within suite 1,401/1,401; tsc/lint/links/prod build green. Blog
`rental-income-tax-calculator.md` retitled to guide intent (cannibalisation split). GBP-
literal class: 316 fixed across 11 files; 2 deferred (Bing-experiment treatments). T5
benchmarks EXTEND FROZEN until the Bing 28d read (~09-15) - it is a treatment page.
AT DEPLOY: register 4 tool URLs (--page-urls) + retitled blog page in monitored_pages;
expectations + failure triggers pre-stated in DOSSIER §8. Parked estate nits: shared
gbp() negative rendering "£-50"; advanced flag inert on generic tools. Deferred candidate
tools for owner: hmlr-fee-calculator (6.6k/mo), fhl-str calculator (3.6k/mo).

## 0.14 Wave 11 WRAP — COMPLETE 2026-08-21 (NO DEPLOY: owner instruction "dont bother deploying it, just complete it to the highest standard"; deploy authorization from HANDOFF §2 remains standing but unused)

**FINAL STATE 2026-08-21:** all 5 fix groups + legacy back-patch + 2 verification reads + internal-link sweep COMPLETE. Voice final: 15 CLEAN / 4 MINOR (worst 19.8; pre-fix worst 34.8). Personas deduplicated corpus-wide (final grep clean: Yusuf+Lars, Marcus+Bev, Dele, Priya, Farah+Nadia, Tom, Sunita, Bola, Idris, Dermot, Renata+Callum, Fergal). house_positions §26.7 CORRECTED (double glazing = repair per PIM2030). Legacy back-patches: energy-performance-certificates-epc (8 items incl. reg 9(2)/reg 22/reg 38/reg 24 citations, penalty ladder, prices), gas-safety-certificates (£60-£120, Great Britain scoping), 2 lease siblings (SDLT £125k band; one worked example re-derived nil→£4,000). Link sweep: 37 links into 36 legacy pages, 118 measurement-window exclusions honoured (CGT/SDLT/Bing/verdict-hashed), commercial trio discoverable via pillars only (by design). Calculator fee stack harmonised £2,750-£4,700 ex VAT. GATES ALL GREEN: lint 763, link audit 0/0, word gate 763/763, meta 60/155 0 over, tsc clean, vitest 1343/1343, prod build exit 0, dependency closure OK 19 sites, qa_verdict `wave11` recorded LAST (19/19 all_clear, evidence-derived), predeploy gate PASS ("all 19 slug(s) QA'd-clean with matching hashes"). REMAINING FOR OWNER: deploy (./scripts/deploy-and-index.ps1 -Site property -QaBatch wave11, which also registers monitored_pages + IndexNow), batched with the parked CGT batch (cgt1). Minor open: epc-c-2030 page still carries pre-Jan-2026 framing (hedge correct, refresh candidate); 10 pre-existing em-dashes across 10 legacy files (predate wave; cleanup item); 50% special-rate FYA claim needs sourcing into house_positions §38 before anyone writes it.

### 0.14a superseded progress log (2026-08-20 PM)

Phase A of HANDOFF_2026-08-20 run to the QA-complete stage in one session. State at close:

**Done and committed in this batch:**
- All 19 wave pages frontmatter-fixed (`generator: "opus-4.8/netnew-wave"` added to 19; `reviewedBy`/`reviewerCredentials` to 18). Meta lengths all inside CI 60/155 (max 60/155 exactly; no trip).
- `s42.html` (writer's stray saved legislation page at repo root) deleted, never committed.
- Deterministic pre-checks all green pre-QA: frontmatter lint 763 OK, link audit 0 hard/0 soft, word gate 763/763, voice scan 19/19 clean-or-minor (margins to watch: commercial-epc-requirements 34.8, right-to-manage-process-steps 32.6), zero em-dashes, all 19 middleware `SLUG_TO_CATEGORY_MAP` entries confirmed.
- Full two-track Opus QA (7 factual agents by statute family, 5 editorial agents with trios kept together). ALL 12 reports on disk in `briefs/property/wave11/qa/` (5 EDITORIAL_*, 7 FACTUAL_*).

**QA verdict matrix (editorial x factual):** every page editorial must_fix (systemic cross-page templating: banned "most guides" meta-commentary x11+, shared closers, twin sections, "X, not Y" cadence x38, persona reuse). Factual: all_clear = fire-risk, landlord-licensing, how-to-book-an-epc, service-charge, ground-rent; must_fix = eicr pair (reg 3 clock errors in worked timeline, NI status), gas-cost (appliance add-on arithmetic), lease pair + LAFRA (cross-page fee-stack contradiction £2,600-£4,400 vs £3,600-£6,600 = the one BLOCKER; 6 arithmetic errors incl. Marcus premium and HMLR Scale 1 £65 fee; CG71141 miscited on 2 pages), RTM trio (formation fee "under £100", unsourced revenue-deductibility claim, s.21 cited as live right, s.84(3) vs s.84(4) x3), epc-cost + mees (s.21-abolished-May-2026 violation, PIM2030 cited backwards on double glazing, TCGA s.38(2) exhaustive-list error); commercial-epc-requirements + commercial-property-mees-compliance (DEC penalties inverted x3 — reg 14(3)(a)=£1,000 hold vs 14(3)(b)=£500 display, page has it backwards; dead `www.find-energy-certificate...` host, live host has no www; reg 41 "not exceeding" ceiling stated as a floor). commercial-energy-performance-certificate-cost = factual all_clear.

**Fix rounds: 2 of 5 COMPLETE and verified** (fresh Opus agents; original writers dead with the prior session): (1) eicr pair + fire-risk DONE (Marcus reg 3 clocks corrected, rules lane returned to sibling, NI/Scotland dates fixed, voice 13.2/19.0/10.5, agent found+killed 2 extra meta-commentary instances beyond QA's list); (2) service-charge + ground-rent DONE (s.21 display-mismatch caveat, s.166 CLRA section added fully source-verified, ARC Time reframe, apportionment closes at 100%, correct pushback: s.167 SI is 2004/3086 not 2005/1352; personas now Yusuf/Tom/Marcus/Bev/Dele/Idris, Priya left to licensing page). Post-fix re-checks green: 0 em-dashes x5, lint 763, link audit 0 hard, word gate 763/763. NOT yet dispatched (3 groups): licensing+gas+booking, lease pair + LAFRA (needs fee-stack harmonisation from FACTUAL_lease-lafra.md; also patch the Marcus premium — calculator agent independently derived ~£29k vs the page's "low-to-mid £40,000s", two sources agree), RTM trio, epc-cost+mees, commercial trio.

**§6 out-of-band: ALL THREE BUILDS DONE, tsc clean, goldens 100/100.** /leasehold pillar (21 links, in-force table, full topic wiring). /landlord-compliance pillar (26 links, duty calendar, penalty cards, resources hub; conductor added its nav/footer entries to niche.config.json for parity with leasehold). lease-extension-premium-calculator (Sch 13 method, 80-year cliff pinned by golden, relativity table labelled approximation, ±20% range headline; also added workedExamples/related SSR rendering to calculators/[slug]/page.tsx which Property never rendered — benefits all generic tools). Remaining §6 item: internal-link back-patch sweep NOT started. Prod build (next build) NOT yet run this session; dependency closure NOT yet run.

**Cross-cutting findings for the conductor (from QA, not yet actioned):**
1. `house_positions.md` §26.7 has double-glazing capital treatment BACKWARDS vs PIM2030 (repair, verbatim example). Patch HP first, then the two pages citing it.
2. Legacy back-patches wanted (Stage 11 sweep): `energy-performance-certificates-epc.md` (MEES penalty figure, reg cite, stale price, "England and Wales" register scope, visit duration), `gas-safety-certificates.md` (stale £60-£100 headline), 2 lease sibling pages carry stale £250,000 SDLT nil-rate band (reverted £125,000 on 1 Apr 2025).
3. EPC C 2030: 21 Jan 2026 government response decided £10,000 cap (SI aimed 2027, none made) — new pages' hedge holds but framing slightly stale.

**Remaining WRAP sequence (in order):** finish fix rounds → verify reads on restructured pages → re-run voice scan + em-dash + meta lengths on all touched → equity-gate n/a (wave not cluster) → tsc, vitest incl. new goldens, prod build from Property/web, dependency closure → record qa_verdict batch `wave11` LAST (hash-keyed) → predeploy gate → commit + push. THEN out-of-band completion + link sweep. Deploy/monitored_pages/IndexNow stay OWNER-GATED; deploy approval from §2 of the handoff still stands but this session was told not to use it.

Owner approved the five-phase plan the same day the CGT batch shipped. **START HERE:
[`HANDOFF_2026-08-20.md`](_archive/HANDOFF_2026-08-20.md)** — Wave 11 WRAP + deploy (authorized),
tools family (GO now, ungated from the 09-01 read by owner ruling), rental-income cluster,
incorporation cluster (conditional on the cannibalisation freeze check), Wave 12
(brand-fit GATE RESOLVED: on Property with the CGT hook). Delayed by owner: the
internal-linking experiment. Off-site authority: owned elsewhere. Standing ruling:
gov.uk/MSE-held heads are in scope ("position 3 under gov.uk still wins").

## 0.12 CGT cluster batch (EXECUTED 2026-08-20, commit `701a2d53`; deploy owner-gated)

**Owner approved the full work order same day, including the gov.uk/MSE-held heads
("position 3 under gov.uk still wins"), the calculator experiment ungated from the SDLT
read, and the shares family.** Executed: 7 EXTEND pages (additive, protected elements
byte-identical, three approved factual back-patches in protected copy recorded per
coverage note), 3 net-new pages (do-limited-companies-pay-CGT, second-home sale, shares
CGT; netnew briefs + middleware map entries), calculator copy REFRAME + compute-neutral
shares mode (goldens 72/72). QA: two Opus tracks per page + restructure verification;
5 factual blockers fixed pre-commit; every worked example re-derived to the penny.
Gates: equity gate (now `--cluster cgt`, floor-6 coverage sweep over all 11 packs),
lint, link audit 0/0, word gate, voice CLEAN/MINOR x10, tsc, vitest 1308, prod build,
dependency closure, predeploy PASS, qa_verdict `cgt1` all_clear (10 slugs).
house_positions §39 gained the s.191/s.274 sale-below-probate lock.
**DEPLOYED 2026-09-16 (90fbea9c). NEXT: register the 11 in
monitored_pages/blog_optimizations (2 non-blog URLs need `--page-urls`), IndexNow,
Bing read 14/28d, Google 28/90d.** Open protected-copy calls (deliberately not taken):
unify the PRR restriction methodology across the letting-relief page's two examples;
the letting-relief protected "nil-gain still goes on SA108" sentence.

## 0.12a CGT cluster dossier (FROZEN 2026-08-20, superseded by 0.12 execution)

Cluster 2 of the coverage programme, built through the same §9 pipeline as SDLT and
committed `160e7325`: [`briefs/property/cgt/DOSSIER.md`](../../briefs/property/cgt/DOSSIER.md)
+ ledger.csv (3,869-query universe, balanced), cluster_map.csv, pages_inventory.csv
(374 pages in scope), 8 research packs. Harvest spend $0.32 DataForSEO (uncapped,
exhaustive under the family filter). Bing contributed 59% of the query universe.

Work order (nothing written): 7 EXTEND packs ranked by peer-winnable volume
(complete-guide 5,260 / letting relief 4,270 / 60-day reporting 3,330 / PRR 1,740 /
rates-allowances 1,020 / inherited 1,000 / BTL step-by-step 620) + 3 gated items:
the calculator REFRAME (27,910 pw, gated on the SDLT calculator read ~09-01),
2 queued new pages (do-companies-pay-CGT, second-home sale), and the shares family
(6,430 pw, taxd-only evidence, off-vertical, owner decision). Language spec measured:
question-form headings ARE a gap on this cluster (winners 31.5% vs our 14.5%), unlike
SDLT; you/your 39.7 vs 8.8; statute 0.0 vs 10.2 per 1k.

## 0.08 Discovery engine v2 (NEW 2026-08-15)

Built + migration `20260815000001_discovery_engine_v2.sql` applied (`discovery_candidates`, `competitor_urls_seen`, `discovery_log`, + `paa`/`serp_features` columns on `competitor_serps`). Engine doc: [`docs/_engines/DISCOVERY_ENGINE_V2.md`](../_engines/DISCOVERY_ENGINE_V2.md).

Competitor universe rebuilt to **16 curated competitors** (research + DFS `competitors_domain` verified) in `sites/property.discovery.json`; the old universe was stale generalists no longer worth tracking. Lane taxonomy (19 lanes) and `lane_negative_tokens` also live in that file.

Wave 12 shortlist generation in progress off the new candidate pool. Latest dated reports: [`candidate_pool_2026-08-15.md`](candidate_pool_2026-08-15.md), [`lane_map_2026-08-15.md`](lane_map_2026-08-15.md), [`competitor_watch_2026-08-15.md`](competitor_watch_2026-08-15.md).

## 0.05 First-party behaviour analytics + CRO pipeline (NEW 2026-06-05 — DEPLOYED to production)

Every real-user action on the site is now captured as a structured event in our own Supabase (system of record; GA4 secondary), bot-filtered, and fed to `cro_*` opportunity detection via the existing `optimisation_opportunities` machinery. Browser SDK → same-origin `POST /api/track` (service role, no raw IP) → `web_sessions` + partitioned `web_events` → human-only rollup views → Python detectors + an internal dashboard. **Consent: track-by-default (no banner), opt-out via the footer "Do not track me" link.** Bot handling tags-not-blocks, so crawlers/AI bots still reach every page (SEO/GEO untouched). Dashboard at `/admin/analytics?k=<ADMIN_DASHBOARD_KEY>` (overview + funnel + breakdowns + rich visitor table) and `/admin/analytics/visitor/[id]` (every measure + full timeline per person). Deployed + verified live 2026-06-05; requires `SUPABASE_SERVICE_ROLE_KEY` + `ADMIN_DASHBOARD_KEY` env vars (set). **Full doc: [`docs/behaviour-analytics.md`](../behaviour-analytics.md); memory `[[property_behaviour_analytics]]`.** Migrations `20260605000001..5`. Deploy gotcha: project Root Directory = `Property/web`, so `vercel deploy` must run from the repo ROOT with `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` set (repo-root `.vercel` links a different project).

## 0.06 Intent-tailored conversion engine (NEW 2026-06-06 — DEPLOYED to production)

Built the analytics into a conversion engine. **DEPLOYED live 2026-06-06** (migrations `20260606000001..5` applied to prod; Vercel prod deploy). Plan: `.claude/plans/okay-we-can-do-misty-iverson.md`. Phases shipped:
- **Conversion attribution fixed (was hard-zero):** `stitch_lead_to_session` trigger + `reconcile_lead_sessions()` populate `web_sessions.lead_id`, so conversion rate / funnel / calc→lead light up. Daily reconcile wired into `bot_reclassifier`.
- **Lead identity in the dashboard:** name/email/phone surfaced on converted visitors, a Leads table, and the visitor-detail header (service-role reads of `leads`; PII never in a view).
- **Intent layer (`lib/intent/`):** one canonical `taxonomy.ts` (blog category slugs + calculator slugs → topic) + pure `deriveTopic(pathname)`. Topic falls out of the route → a new page in an existing category needs ZERO wiring. `page_topic`/`entry_topic`/`visit_class` stamped on `page_view`. Doc: `docs/property/personalization.md`.
- **Deterministic personalization** (no ML): returning-visitor bar, deep-scroll topic modal, intent-tailored sticky CTA (in-place swap, no CLS), specialist escalation after deep unconverted engagement. Measured via `personalization_*` events → `vw_personalization_results` + dashboard panel.
- **Richer capture:** `dead_click`, `section_view` (IntersectionObserver) + `vw_section_engagement`, full ExitIntentModal form lifecycle, GDPR-safe abandoned-email (char length only), journey-as-story visitor view (NEW/RETURNING badge + narrative + engagement sparkline), new-vs-returning breakdown.
- **Zero-dep A/B framework** (`lib/experiments/`): deterministic `hash(visitor_id+key)` assignment, `useExperiment()`, `props.exp` stamped on every event → `vw_experiment_results` + panel. Registry empty (none live).
- **Dashboard ops console:** `/admin/analytics/trends` (`web_timeseries` RPC: 24h 15-min+hourly, 7d hourly+daily, 30d daily; dependency-free SVG charts) + `/admin/analytics/leads` (paginated 100/page, journey-enriched).
- **Footer:** removed the sister-site cross-links (focus property positioning).

**Shipped + deployed after the initial cut (same day 2026-06-06):** A6 honeypot anti-spam on all three lead forms (off-screen `company_url`, silent drop); Phase 9 **curated specialist FAQ widget** (`components/support/SpecialistWidget.tsx` + `lib/support/faq.ts`) — topic-aware FAQ + honest "ask a specialist" lead capture (replies within one working day; NOT a RAG bot, chosen for cost/risk).

**Autonomous build-out (later same day 2026-06-06, all DEPLOYED):**
- **Dashboard readability:** visitor page now leads with a human-readable STORY (engagement pings collapsed to reading time, sections named, personalisations/clicks in plain English) + a granular Activity tab (`lib/analytics/journey.ts`); plain-English personalisation rule/surface labels (`lib/intent/labels.ts`); page titles + the actual personalisation copy now captured; calc_view drop fixed (effect-ordering race → pre-config event buffer in `track.ts`); honeypot on all lead forms; Leads moved off the homepage; Visitors-vs-Sessions explained; **shadcn + Recharts** charts replace the SVG bars.
- **Bot-scoring data-quality model** (`optimisation_engine/analysis/bot_scorer.py` + `bot_score` column): multi-signal score (engagement realism, event variety, timing regularity, flood rate, UA, human-signal presence) with conservative threshold + sticky verdict + hard floor so real humans are never wrongly flagged. Runs daily; improves every human-only rollup. NOT form-gating (per user). Dry-run flagged 0 false positives.
- **Premium tools + resources system (the big one), live across all 6 top categories** (section-24, incorporation, capital-gains, landlord-essentials, stamp-duty, mtd). Per category: a premium interactive tool (scenario comparison / editable mini-grid) rendered as an ADDITIVE client island on blog + calculator pages; a real formula-driven **Excel model** (`public/resources/<topic>/<topic>-model.xlsx`, rates locked to the same `lib/` constants, golden-tested where present); a comprehensive **gated guide** at `/resources/<topic>` (noindex); and a per-PAGE intent-templated email gate (`ResourceGate`) that captures a stitched lead and reveals both downloads. SEO-SAFE: existing calculator/blog server HTML, copy, FAQ, JSON-LD schema all unchanged; tools are client-only (`ssr:false`, reserved heights, no CLS); guides noindex. Framework is config-driven + taxonomy-tied → new category = one registry entry + 3 authored files. Spec: `docs/property/tools-resources-spec.md`.

**Genuinely remaining / notes:** (1) external email-delivery of the resource links needs a Resend-verified from-domain — the inline reveal + .xlsx/guide download already work without it; (2) golden xlsx-vs-code tests exist for 3 of 6 categories (section-24, stamp-duty, landlord-essentials) — add for the other 3; (3) premium tools cover the 6 TOP categories only — non-top categories still use the original calculators; (4) a live Lighthouse/CWV spot-check on a flagship calculator+blog page is advisable (CLS-safe by construction); (5) A6 Vercel BotID is SUPERSEDED by the bot-scoring model (user reframed bot work as data-quality, not form-gating).

## 0.07 Calculator/gate redesign + placement analytics + consolidated deploy (NEW 2026-06-07 — DEPLOYED to production)

The `property-calculators-and-geo` + `property-humanise` work-streams were consolidated and shipped live (whole branch fast-forwarded into `main`; `vercel deploy --prod` 2026-06-07; verified homepage/calc/blog/sitemap all HTTP 200). This RESOLVES the redesign handoff blocker in `premium-tool-gate-redesign-state.md`.

- **Premium tool + Excel-gate redesign LIVE** (shadcn): the "personal vs company" premium calculators + the email-gated Excel toolkit render cleanly on calculator pages AND embedded in blog posts across the 6 enabled categories (section-24, incorporation, capital-gains, landlord-essentials, stamp-duty, mtd). The humanise lane had kill-switched these (`SHOW_ONPAGE_RESOURCES=false` in `CalculatorPageResources.tsx` + `BlogPostRenderer.tsx`); both were flipped on after a live visual sign-off. The original server-rendered/indexed calculators are untouched (kept for SEO).
- **91 humanise-rewritten blog pages MERGED + DEPLOYED** (robot-voice → human-voice; previously committed only in the `property-humanise` worktree). IndexNow pinged for all 91 (HTTP 200) so search engines re-crawl the freshened content.
- **Placement-aware analytics:** calc/gate events now carry `placement` (calculator|blog|embed), `tool_kind` (standard|premium) and `category`; `calc_view` is visibility-gated (IntersectionObserver `useInViewOnce`) so a tool injected mid-article is not counted for readers who never reach it; a new `gate_view` impression event gives the gate's view→unlock denominator. Two ADDITIVE rollup views (migration `20260607000001`, applied to prod): `vw_calculator_conversion_placement` (tool funnel by slug × placement × kind) + `vw_resource_conversion` (Excel-gate funnel by topic × placement). Existing views untouched.
- **Dashboard:** added "Tool performance by placement" (Behaviour tab) + "Excel toolkit funnel" (Conversion tab); the personalisation block was rebuilt to explain the test (25% control / 75% treatment), with Where + Why-it-fires per offer, and the Experiments section annotated as the A/B ledger. New panels fill as the new events accrue.
- **Deploy-gate fix (`fa0a230f`):** `scripts/track2_link_audit.py` `slugify_category` was hardcoded `&`→"" (correct for Solicitors only); it now reads each site's `&` rule from its own `web/src/lib/blog.ts` (5/6 sites do `&`→"and"). It had been reporting 2171 FALSE HARD-404s on Property and blocking the predeploy gate. See `[[engine_link_audit_slugify_bug]]`.
- A share-safe standalone copy of just the Property site was also extracted (Property/web + packages/web-shared + supabase SQL), pushed to `github.com/Jaymoo123/property-standalone` (private) — no secrets, no other sites.

Memory: `[[property_calculator_fleet]]`, `[[property_behaviour_analytics]]`, `[[humanise_engine_state]]`.

## 0. Core-page SEO engine + homepage optimisation (NEW 2026-06-02 — DEPLOYED to production 2026-06-03)

New site-agnostic engine `optimisation_engine/corepage/` (third engine alongside rewrite + net-new; memory `[[corepage_engine]]`). Two-phase, **no DeepSeek** ([[feedback_no_deepseek_opus_only]]): Python gathers head-keyword GSC + cannibalisation map + DDG SERP + deep-extract into an analysis pack; an **Opus 4.8 subagent** writes the brief (`briefs/property/homepage/index.md`); Opus then hand-edits the TSX. Run: `python -m optimisation_engine.corepage --site property --page homepage [--dry-run]`.

**Diagnosis (GSC 90d):** homepage `/` owned **0 of 149** head-family queries (1,578 impr, ~0 clicks, buried page 3-8). National term "property accountant" was caught by the blog `london-property-accountant.md` (the `property-specialist-accountant-london` URL is a 301 alias to it via `middleware.ts:351`), not the homepage. H1 was a keyword-less slogan.

**Implemented (SEO/structure/schema only, visual design untouched) — `Property/web/src/app/page.tsx`:** keyword-led title + OG/twitter titles; keyword-bearing H1 (slogan demoted to sub-headline); keyword-rich intro with 3 pillar links; "Areas we serve" block → /locations; FAQs 3→9 (accordion now maps the `faqs` array so visible == FAQPage schema); added LocalBusiness/AccountingService + Service + BreadcrumbList + WebSite + WebPage schema on the one `#organization` @id graph (was only Organization + FAQPage). Conservative reversible link-ups + London-long-tail title/H2/FAQ softening on the two catcher blogs (`london-property-accountant.md`, `what-does-a-property-accountant-do.md`); location pages untouched. **Second pass (term-analysis-driven, same session):** new module `optimisation_engine/corepage/term_analysis.py` measured page-1 competitors for keyword density, shared vocabulary, section patterns, and true content depth. Finding: competitors barely use the exact head keyword (median 0 body uses; #1 uses it zero times) and win on TOPIC BREADTH + authority, not density. So added comprehensive coverage (12-card "tax areas" grid covering the gap topics IHT/SDLT/VAT/Self-Assessment/Let-Property-Campaign/NRLS/ATED/capital-allowances), an anonymised testimonials section, and a "why a specialist" credentials band. Result: homepage **1,344 → 2,022 words** (above competitor median 1,605), **9 → 12 H2s**, keyword usage healthy (~1.9%, not stuffed). Credentials band deliberately does NOT assert specific professional-body memberships (ICAEW/ACCA/CTA/ATT) pending user confirmation. **Verified:** `npm run build` exit 0 (723 static pages) both passes; prerendered HTML has all 7 schema types + 9 FAQ Questions + new title/H1 + all new sections; no em-dashes. **COMMITTED + DEPLOYED to production 2026-06-03** (commits `6ad93cae` site + `323d8aaf` engine; build `property-tax-partners-99sksutdq`; live + verified HTTP 200 at www.propertytaxpartners.co.uk with new title/H1/AccountingService schema/9 FAQs). Homepage registered in monitored_pages (slug `homepage`, 90-day watch, monitor_until 2026-09-01; baseline confirms it was buried: 0 clk / 12 impr / pos ~78). IndexNow submitted (4 changed URLs, HTTP 200).

**Guide consolidation audit (data-gated, 2026-06-03) — VERDICT: no collapse now.** New module `optimisation_engine/corepage/guide_audit.py` + refreshed GSC/Bing found every fragmented-cluster page is a fresh monitored rewrite (mid-recovery), so the collapse guard REVERSES every collapse (correct: collapsing now bins freshly-invested pages on no data). Action: KEEP + cross-link (done via essential-guides); re-run `guide_audit --all` after the ~45-day recovery window (~mid-July 2026) on stabilised data. Gaps mostly already served (capital-allowances/IHT hubs rank #1; SDLT/VAT elevate later; property-accountant-services covered by the homepage; Let Property Campaign ~0 demand). Detail in `briefs/property/guide_audit/DECISION.md`. See `[[feedback_data_gated_consolidation]]`. Next: review → commit → deploy (whole `main` HEAD ships) → register `/` in monitored_pages → re-measure head-term positions in 2-6 weeks.

---

## 1. Net-new program — CLOSED + DEPLOYED

**Wave 10 DEPLOYED 2026-07-09.** Prod: https://www.propertytaxpartners.co.uk (build https://property-tax-partners-ob0i8dyph-sitenudge-projects.vercel.app; content commit b3754948 incl. 3 back-link back-patches F-41/F-53/F-92, second deploy shipped them). 11 URLs IndexNow-submitted HTTP 200. Spot-checked 5 prod URLs = 200. Competitor benchmark completed pre-deploy: 9 BEATS / 1 MATCHES-upgraded / 1 GAPS-corrected (s.24-vs-property-allowance exclusivity per PIM4460, conductor-verified + HP-locked; FA 2026 ss.66-71 pension-IHT verified enacted + HP-locked). Deploy infra fixes: .vercelignore added + archive=tgz in deploy-and-index.ps1 (agent worktrees had ballooned upload to 2.8GB); Vercel CLI 54.21.1. Corpus now 431 pages live. 11 pages merged + built green (12 picks post-cannib-gate; A6 profit-extraction PULLED at WRAP as three-way duplicate of live extraction pages). First single-lane batchSize-1 wave (owner ruling: no A/B/C, one sub-agent per pick, parallel). QA: 80+ worked examples re-derived 0 mismatches; ~60 statute WebFetch checks; drift catches incl. ITEPA-vs-FA2004 pension sections, TCGA s.252 FX misattribution, CA 2006 s.629/630, ATED band uplift, HP-ref leak. Comparative editorial review: ship-quality (voice scores 14-41 vs baseline 3-46; 3 pages at flagship band). GEO polish: answer-first openers + figure-bearing summaries on all 11; FAQPage JSON-LD auto-emitted by renderer fallback. New HP locks §1.P, §5.A, §21.9, §29.13, §39, §40, §41 (+§40 ITEPA correction, §41 s.783BM amendment). 11 pages in monitored_pages (net_new, watch to 2026-10-07). Open back-patch flags for post-deploy pass: F-41, F-53, F-92 (back-links into new pages).

420 net-new pages live (W1-7 209 + W8 30 + W9 9 + MW1 52 + MW2 60 + MW3 60). Waves 1-9 and MegaWaves 1-3 are all closed and deployed (the consolidated 120-page MW2+MW3 push deployed 2026-05-29). 13 consecutive Bill-vs-enacted-Act drift catches with no decay. **MW4 is parked/deferred.** Predecessor programs (also closed): the 63-page priority competitor rewrite (2026-05-21) and the Track-1 429-page topic-gap analysis that seeded the waves.

**Platform watch (carry forward before the next net-new run):** the ISR `blog.fallback` artifact crossed Vercel's 19.07 MB oversized-page ceiling (~20.7 MB) at the MW2+MW3 deploy. Worked around with `dynamicParams=false` on `[category]/[slug]` + the `VERCEL_BYPASS_FALLBACK_OVERSIZED_ERROR=1` project env var. Corpus grows ~1.5 MB/wave; a structural fix (lazy per-request post loading or split blog routes) is the inter-wave item before the limit recurs. See `[[vercel_blog_fallback_size_limit]]`.

---

## 2. Rewrite program (Track 2) — COMPLETE (0 genuine residual; deploy pending)

**Target:** ~153 residual legacy pages, rewrite-only (never collapse, see `[[feedback_rewrite_only_no_collapse]]`).

**Done so far (~70 live, two quality tiers):**
- **44 ranking-grade rewrites deployed** last session (2026-05-31 pm): Section24-A 12 (`a1c670a1`) · CGT+FHL 10 (`a2b8436b`) · MTD 8, incl. 2 reversals (`581faa64`) · GeneralGuides editorial+coverage backfill of the 16 GG pages (`94fe0bb9`). Plus the byline feature (`4ef65e64`, stacked "First published / Last updated", auto-applies to all future rewrites).
- **~24 earlier rewrites now live** (first deployed by the same catch-up, factual-QA-clean but lacking coverage/editorial polish): NonResident 3, SA-Deductions 11, CapitalAllowances 10. **→ RE-POLISHED to gold standard this session (coverage-floor + editorial + eeat byline): SA-Deductions 11 + NonResident 3 → `87cd9e3f`; CapitalAllowances 9 → `65b81650`; full-expensing-capital-allowances in the redirect fix `9219db3e`.**
- **10 reversal pages went live but were restored-STALE** — **→ now genuinely rewritten this session: non-AIA reversals 4 → `2de9eae9`; AIA knot 5 → `bcafca4d`.**

**Committed 2026-06-01 (37 pages) — DEPLOYED to production 2026-06-02:**
- `mixed1` (9) → `1f0b1473`
- `Incorporation-A` (12) → `3afb9b6f` (adjudicated: SDLT 15→17% + FAQ £24k→£30k, dividend £3,924→£3,999, section-162 verdict override, s.162 automatic→claim-required)
- `PortfolioOps-1` (5) → `06434510`
- `incorpseca` = Incorporation seconds **A** (8) → `012e80a8` (adjudicated: incorporation-cost-calculator 15→17, property-company-profit-extraction NIC "£5k earns pension year" ×3 → corrected vs LEL £6,708)
- `PortfolioOps-2` (3) → `421e7f98`

**Committed 2026-06-02 (15 commits / ~66 distinct pages; Track-2 rewrite program COMPLETE, 0 genuine residual) — DEPLOYED to production 2026-06-02. The core 41 ranking-grade residual rewrites:**
- `incorpB` (Incorporation seconds B, 8) → `6a86dd97` (accounting-requirements: CT600 late-filing fixed penalty corrected to the post-Apr-2026 doubled regime, was £100/£200; 8/8 all_clear, coverage 8/8, gate PASS)
- `section24b2` (Section 24 seconds B2, 3) → `8cdce948` (worked-example-50k re-derived onto a consistent basic→higher portfolio, extra tax £6,306 reconciling to relief lost; higher-rate-threshold leaked-artifact strip; 3/3 all_clear, gate PASS)
- `section24b3` (Section 24 seconds B3, 3) → `34c4fd2b` (repeal-future-reversed reset to the enacted FA 2026 reform; case-study-100k differentiated vs the 50k example; 3/3 all_clear, gate PASS)
- `incorpC` (Incorporation seconds C, 3) → `6c44a4cd` (running-costs-budget, when-does-hmrc-accept [s.75A relabelled as targeted SDLT rule], btl-ltd-mortgage-options [meta trimmed]; 3/3 all_clear, gate PASS)
- `fm1` (FinanceMortgage refinancing 1/2, 1) → `0217b42c` (buy-to-let-refinancing-when-does-it-make-sense, tax-angle decision framework + BIM45700 value-on-entry rule; all_clear, gate PASS)
- `fm2` (FinanceMortgage refinancing 2/2, 1) → `33e81ac7` (refinancing-rental-property-when-does-it-make-financial-sense, portfolio-management break-even / financial-sense angle, differentiated vs FM-1; all_clear, gate PASS) — FinanceMortgage pair COMPLETE
- `vatA` (VATcalc anchor, 1) → `b13472b4` (vat-calculator repositioned to commercial-property VAT: option to tax Sch 10 VATA 1994, partial exemption, developer recovery; de-dupes from the thin vat-* siblings; all_clear, gate PASS)
- `vatB` (VATcalc lane, 1) → `68b78a5c` (vat-how-to-calculate re-anchored on the universal calculation method: x1.2/÷1.2 formulas, 20/5/0 rates, cross-trade, £90k registration; forward-links commercial depth to vat-calculator; all_clear, gate PASS)
- `vatC` (VATcalc lane, 1) → `29bd455b` (vat-tax-calculator re-differentiated via engine brief onto net-liability + Flat Rate Scheme, standard vs FRS comparison; a no-brief draft had cloned vat-calculator, fixed; all_clear, gate PASS) — VATcalc cluster COMPLETE
- `reversals1` (non-AIA reversals, 4) → `2de9eae9` (non-resident-cgt-overseas [non-UK-company gains re-cited TCGA 1992 s.2B, not the FA2019-omitted CTA 2009 s.2(2A)], rental-income-tax-complete-guide [Section 24 re-cited F(No.2)A 2015; CGT 24% → F(No.2)A 2024 s.6/FA 2025; worked example re-derived 45k+15k so it genuinely spills to 40%], hmrc-penalties, btl-accountants; 4/4 all_clear, gate PASS)
- `aia1` (AIA knot, 5) → `bcafca4d` (the one engine-brief cluster; 5 distinct intents via brief + manager corrections files; statute cites fixed s.187A(4)/(3)-not-187B, s.201-not-198, 40%-via-s.52, 6%-via-s.104A/D; de-staled £1m permanent / WDA 14% / 40% FYA; 5/5 all_clear, gate PASS) — AIA knot COMPLETE
- `s24res1` (final residual: S24+mortgage knot, 7) → `90e33892` (mortgage-interest-restriction mechanism pillar, tax-credit-20% reducer-as-credit, higher-rate-changes-2027, 2027-planning near-dupe pair [action-playbook vs explainer], mortgage-interest-deductible plain-English query, tax-relief-mortgage hub; reducer re-cited ITTOIA s.274A/274AA not ITA 399A/B; origin F(No.2)A 2015; 7/7 all_clear, gate PASS)
- `incorpres1` (final residual: incorporation, 3) → `90e33892` (holdover-relief s.162/s.165/s.260 disambiguation hub, incorporation-timing WHEN-triggers [+ s.162A-repeal note], 2027-rates-incorporation-decision quick-guide; CIHC 25% via CTA 2010 s.18A(1)(b); 3/3 all_clear, gate PASS) — same commit `90e33892` also removed the erroneous should-i-incorporate self-loop redirect in middleware.ts.

**Plus this session's closeout commits (redirect-hygiene + earlier-tier re-polish):**
- `9219db3e` (redirect-hygiene): reversed 3 more live-keeper 301s (profit-extraction, employer-pension, full-expensing-capital-allowances) + fixed the 3 now-reachable pages (state-pension £6,708 LEL, marginal-relief s.18B(3), s.46(4B) leasing). Link audit 0 HARD / 0 SOFT / 0 self-loops.
- `87cd9e3f` (re-polish): SA-Deductions 11 + NonResident 3 earlier-tier pages lifted to gold standard.
- `65b81650` (re-polish): CapitalAllowances 9 earlier-tier pages lifted to gold standard (engine briefs + corrections). **Earlier-tier re-polish COMPLETE.**
**PROGRAM COMPLETE.**

**Remaining: NONE — every residual cluster was rewritten + committed this session (2026-06-02); 0 genuine residual (corpus-wide git-audited over all 686 pages). The §5 plan was fully EXECUTED. The IN-FLIGHT / NOT-STARTED detail immediately below is HISTORICAL (all now DONE — see the 2026-06-02 ledger above and its commit hashes).**

<details><summary>Historical (pre-completion) remaining-list — kept for audit</summary>

**Remaining (~35 to rewrite) [HISTORICAL — all done]:**
- **IN FLIGHT:** Section24-**B1** QA `wd556mjs1` (4: section-24-tax-relief-complete-guide, can-section-24-push-higher-rate-tax, section-24-calculator, section-24-self-assessment-tax-return) → finalise+commit pending. Incorp-**B** writer `wgff214xj` (8: corporation-tax-vs-income-tax-landlords-2027, when-does-property-holding-company-structure-make-sense-uk-landlords, incorporation-case-study-10-property-portfolio-200k-mortgage, transfer-properties-to-company-phased-guide, cgt-property-transfer-limited-company-calculate, property-company-accounting-requirements-hmrc-expectations, property-company-employer-pension-contributions-directors, incorporate-rental-property-without-cgt) → QA next.
- **NOT STARTED:** Incorp-**C** 3 (`property-company-running-costs-annual-budget`, `when-does-hmrc-accept-rental-property-incorporation-business`, `buy-to-let-limited-company-mortgage-options`) · Section24 **B2** (`section-24-higher-rate-threshold-landlords`, `section-24-worked-example-50k-rental-income-portfolio`, `section-24-remortgaging-btl-property-tax-implications`) + **B3** (`section-24-personal-allowance-60-percent-tax-rate-landlords`, `section-24-case-study-100k-rental-income-portfolio`, `section-24-repeal-future-reversed`) · FinanceMortgage 2 (`buy-to-let-refinancing-when-does-it-make-sense` ↔ `refinancing-rental-property-when-does-it-make-financial-sense`, near-dupes of each other — sequence) · VATcalc 3 lanes + 1 held · CapAll/AIA knot (engine briefs) — full per-cluster plan in §5.

**Reconciliation tip (how the in-flight slugs were picked):** worklist re-lists done pages, so cross-reference cluster slugs against `optimisation_engine/.cache/qa_runner/*/*.json` + `git log --name-only -n 120 -- Property/web/content/blog/` before composing a batch.
- **Reversals to rewrite (8):** 4 AIA (`aia-capital-allowance-property-landlords`, `capital-allowance-aia-property-landlords`, `aia-capital-allowances`, `annual-investment-allowance-2025`) + `non-resident-cgt-selling-uk-property-overseas-guide` + `hmrc-penalties-late-landlord-tax-returns-2026` + `buy-to-let-accountants-near-me-guide` + `rental-income-tax-uk-complete-guide-landlords`.
- **AIA knot** = the 4 reversed AIA pages + existing AIA canonicals — the ONLY cluster that uses ENGINE briefs (manual distinct-intent partition first). Everything else is writer-first, no briefs.

**Worklist caveat:** `track2_worklist.py` excludes `monitored_pages` but committed-not-deployed rewrites aren't registered there until deploy, so the worklist RE-LISTS already-rewritten pages. Reconcile against git/qa_verdict caches before picking slugs.

</details>

**Deploy (proven, non-interactive, from repo root):**
```powershell
$env:VERCEL_PROJECT_ID='prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU'; $env:VERCEL_ORG_ID='team_XF9WAygZX7SGk9Fo4tOAnihH'; vercel deploy --prod --yes
```
A deploy ships the whole `main` HEAD (every committed-but-undeployed page goes live together). Or `scripts/deploy-and-index.ps1 -Site property -QaBatch <name>` (gate → deploy → register monitored → IndexNow).

---

## 3. Pending follow-ups (non-blocking)
- **Spotted stale page (quick one-page fix):** `2027-property-income-tax-rates-landlords-uk` frontmatter/summary still says "Scotland and Wales set their own" 2027 rates — WRONG per locked ground truth (Wales is IN the 22/42/47 rates; only Scotland is out). De-stale + re-QA the one page.
- **Redirect-hygiene — DONE this session** (`9219db3e` + `90e33892`): the 4 erroneous live-keeper 301s reversed; link audit now 0 HARD / 0 SOFT / 0 self-loops. Watch item: if new collapses/redirects are ever added, re-check no LIVE keeper page is being redirected away (the bug class that bit here — a freshly-rewritten keeper 301'ing to an older pillar).
- **monitored_pages registration — DONE 2026-06-02:** all 17 this-session batches registered = 64 Google+Bing baseline rows, monitor_until 2026-08-31 (90-day regression watch now active on the deployed pages). [Still unregistered from prior sessions: `ggbackfill1 mtd1 cgtfhl1 s24a` — register when convenient via `scripts/register_monitored_batch.py --batch <b> --commit`.]
- **IndexNow — DONE 2026-06-02:** 66 rewritten canonical URLs submitted (1 chunk, HTTP 200).
- **Minor-cleanup sweep:** scan `.cache/qa_runner/*/` verdicts for `signoff:'minor-issues'`. Known: `cgt-selling-buy-to-let-property-calculation-guide` says residential CGT 18/24 "since 30 Oct 2024" → should be **6 Apr 2024** (rates correct, date wrong).
- **s.162 "automatic" staleness remediation (FA 2026 made incorporation relief CLAIM-required for transfers on/after 6 Apr 2026; ground-truth SEED now fixed in house_positions §5 reliefs + "do not write" guard, 2026-06-01).** Corpus grep (2026-06-01) found it on several pages:
  - FIXED: `sdlt-transfer-property-company-cost` (committed `3afb9b6f`); `incorporating-property-portfolio-uk-2026` FAQ (committed `3afb9b6f` — **edited after commit, so its incorpA QA verdict hash is now STALE → must re-QA before any deploy**).
  - VERIFY the in-flight Incorp-seconds-A QA (`incorpseca`) fixed the "automatic" claims on `incorporation-cost-calculator-cgt-sdlt-implications` (3 instances), `incorporation-case-study-5-property-portfolio-analysis`, `landlord-incorporation-step-by-step-guide-uk`. If the runner missed any, fix at source + re-QA that slug.
  - Already CORRECT (no fix): `how-to-transfer-property-into-limited-company-uk`, `incorporation-holdover-relief-property`.
  - Deployed/older, fix-on-touch (not a standalone sweep, user steer): `cgt-deferral-strategies-property-investors-uk` (line 209 "automatic ... no formal election required"); `incorporation-existing-portfolios-phased-approach` (still says "relief is automatic where conditions met" — surfaced by the transfer-properties-phased writer 2026-06-01).
- **SDLT Schedule 4A 15%→17% flat-rate staleness** (the corporate single-dwelling >£500k "enveloping" flat rate rose to **17%** on 31 Oct 2024). Found by the 2026-06-01 spot-check on `should-i-incorporate-buy-to-let-portfolio-2026` (2 instances **FIXED**; committed `3afb9b6f`, **re-QA needed**). Corpus grep: ~29 files mention "15% flat" — **MIXED regimes → per-page judgment, NOT a blind sweep**: England/NI SDLT + ATED-SDLT-interaction pages (e.g. `ated-15-percent-flat-rate-sdlt-interaction`, `sdlt-incorporation-stamp-duty-twice`, `avoiding-common-mistakes-with-enveloped-dwelling-tax`, `a-complete-guide-to-stamp-duty-relief-for-probate-properties`, `spv-property-investment-...`, `fic-complete-guide-...`, `disadvantages-of-family-investment-companies-fics`) are likely STALE→17%; **Scotland LBTT / Wales LTT pages have their OWN devolved flat rates — do NOT auto-change.** **DECISION (user, 2026-06-01): queue the targeted remediation for AFTER the rewrite program** (do not interleave now). When run: one read-per-page, England/NI SDLT pages 15→17, skip Scotland LBTT / Wales LTT.
- **Re-QA queue — DONE** (`33fa5acd`, 2026-06-01): `incorporating-property-portfolio-uk-2026` (s.162 FAQ) + `should-i-incorporate-buy-to-let-portfolio-2026` (15→17 ×2 + £-currency normalised) re-QA'd all_clear, re-recorded incorpA, committed.

---

## 4. Ground-truth quick-reference (locked — do not re-derive; full detail in house_positions.md)
- 2027 property rates 22/42/47 apply **England, Wales & NI** (only Scotland carved out for 2027/28).
- S24 reducer **rises to 22%** (no new basic-rate wedge); the reducer is **ITTOIA 2005 ss.272A/274A-274C** (NOT ITA 2007 — recurring writer trap).
- MTD records = **SI 2026/336**; TMA 1970 s.12B retention = **5th anniversary** (~5-6 yrs, not 7).
- SDLT higher rate (Schedule 4A FA 2003) = **17%** (since 31 Oct 2024).
- WDA 18% → **14%** (FA 2026 s.28) + new **40% FYA** (s.29 / CAA 2001 s.45U, not unincorporated-only in law); special rate pool stays 6%.
- Marginal relief = **CTA 2010 Part 3A/s.18B**; post-cessation expense relief = **ITA 2007 s.96** (NOT ITTOIA s.354).

---

## 5. Cluster launch plan — EXECUTED (all clusters complete 2026-06-02; retained as the historical record of how each cluster was differentiated)

**Section 24 seconds (10) — 3 sub-batches. CRITICAL: all 10 carry the BACKWARDS 2027 framing** (reducer RISES to 22% from 2027/28 → basic-rate landlord gets NO new wedge; higher/additional wedge UNCHANGED at 20pp/25pp; the current "reducer frozen at 20% / wedge widens" wording is wrong). Cite **ITTOIA 2005 ss.272A/274A** (NOT ITA 2007). Differentiate vs the 12 LIVE Section24-A pages.
- **S24-B1:** `section-24-tax-relief-complete-guide` (reposition as top-of-funnel hub), `can-section-24-push-higher-rate-tax` (phantom-income concept), `section-24-calculator` (tool/inputs → /calculators, NOT the step-by-step method = LIVE A page), `section-24-self-assessment-tax-return` (SA105 filing).
- **S24-B2:** `section-24-higher-rate-threshold-landlords` (£50,270 boundary only), `section-24-worked-example-50k-rental-income-portfolio`, `section-24-remortgaging-btl-property-tax-implications`.
- **S24-B3:** `section-24-personal-allowance-60-percent-tax-rate-landlords` (£100k taper only), `section-24-case-study-100k-rental-income-portfolio`, `section-24-repeal-future-reversed` (stalest — reset "2025/Conservative/five-years" framing to mid-2026 + the enacted FA 2026 reform).

**VATcalc knot (4) — 3 differentiable lanes + 1 held; each must forward-link OUT to the ~30-page committed VAT corpus, not re-host depth:**
- `vat-calculator` = interactive TOOL (gross↔net checker) — commit first as anchor.
- `vat-how-to-calculate` = FORMULA/method explainer.
- `vat-tax-calculator` = FLAT RATE SCHEME / net-liability (FRS is unclaimed = best differentiator).
- `vat-calculation-calculator` = **HELD** — no clean residual intent; engine brief or leave un-rewritten.

**Reversals (8) + CapAll-special (3):**
- **AIA knot (5: `aia-capital-allowance-property-landlords`, `capital-allowance-aia-property-landlords`, `aia-capital-allowances`, `annual-investment-allowance-2025`, `aia-allowance-uk-property-investors`) → the ONE cluster that USES ENGINE BRIEFS.** Narrow residual intents: 2025 = 2025/26 year anchor; aia-allowance-uk-property-investors = AIA-vs-full-expensing-vs-40%-FYA comparison; aia-capital-allowance-property-landlords = commercial/mixed-use mechanics; capital-allowance-aia-property-landlords = AIA + disposals/balancing; aia-capital-allowances = claim-process how-to. **Stale to fix:** £1m AIA cap is PERMANENT (NOT reverting to £200k), WDA **14%** (not 18%), new 40% FYA from 1 Jan 2026.
- `hmo-capital-allowances-multi-tenant-landlords-claim` + `landlord-capital-allowances-tax-relief`: **on_disk:false** (deleted in collapse `8f6ac8e9`). Restore from `8f6ac8e9~1` + rewrite to a distinct broader-overview intent, OR skip (ranking-grade pillars already exist: `hmo-common-parts-...-s35`, `capital-allowances-on-property`).
- Non-AIA reversals (4): `non-resident-cgt-selling-uk-property-overseas-guide`, `hmrc-penalties-late-landlord-tax-returns-2026`, `buy-to-let-accountants-near-me-guide`, `rental-income-tax-uk-complete-guide-landlords` → writer-first, differentiate vs their canonicals.

**FinanceMortgage (2):** `buy-to-let-refinancing-when-does-it-make-sense` ↔ `refinancing-rental-property-when-does-it-make-financial-sense` are near-dupes of EACH OTHER — write one, commit, then the second differentiates.

**Incorporation seconds B/C (11):** the 11 in §2's NOT-STARTED list — same near-dupe groups as sub-batch A; compose B (one per group) then C.
