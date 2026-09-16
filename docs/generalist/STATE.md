# Generalist (Holloway Davies) — site state

> **DEPLOYED to production 2026-09-16 from `90fbea9c`.** (claims audit, high-street
> mechanic wave 5, the six-phase design port, C1 metas + C2 expand, and everything else
> committed by that date.)

> **2026-09-12 - CLAIMS AUDIT, SERIOUS TIER FIXED. DEPLOYED 2026-09-16 (`90fbea9c`).**
> Removed every claim that the site holds professional qualifications it does not
> hold, and rewrote all 193 fabricated location "case studies" as illustrative
> worked examples. `npx tsc --noEmit` clean, `npx vitest run` 309/309 green.
> Positioning taken from `src/app/terms/page.tsx:53` and `src/lib/team.ts`: the site
> is editorial, advice comes from a qualified accountant on the partner team.
>
> **Batch 1, qualification claims (all fixed).**
> - `content/blog/accountant-for-churches-uk.md` - "We carry professional indemnity
>   insurance. We file your accounts and returns on time, every time" and the
>   surrounding "we have structured our practice" paragraph, both rewritten to
>   editorial plus partner-team framing.
> - `content/blog/accountant-for-construction-subcontractors-cis.md` - "ACCA
>   qualified. That means they are regulated" turned into reader guidance (check the
>   register, not the website); "We hold professional indemnity insurance and are
>   held to professional standards" removed; `metaDescription_prev` "Our accountants
>   help construction subcontractors" reworded.
> - `src/components/calculators/CalcResultCta.tsx:21` and
>   `src/lib/leads/aux-cron.ts:275` - "one of our accountants" to "a qualified
>   accountant on our partner team". The second is an outbound nurture email.
> - `content/blog/accountant-for-onlyfans-creators-uk.md` schema frontmatter -
>   `jobTitle` "Senior Accountant" to "Technical Reviewer" (3 occurrences in the
>   JSON-LD), matching `src/lib/team.ts:55`.
> - Rule sweep found 7 more first-person qualification claims the audit missed:
>   `hmrc-tax-back.md:133` and `mazuma-vs-crunch-online-accountant-comparison.md:41`
>   both said "We are an accountancy firm";
>   `accountant-for-self-employed-near-me.md:101` and `quickbooks-accountant-uk.md:78`
>   both said "we work to high professional standards, carry professional indemnity
>   insurance"; plus `accountant-for-builders-uk.md:140`,
>   `accountant-for-etsy-sellers-uk.md:139`, and
>   `accountant-for-footballers-and-sports-professionals.md:166` ("We are accountants
>   rather than player representatives").
> - 11 files carried "our accountants" as a first-person service promise
>   (eot-pros-and-cons, equipment-and-machinery-finance, the four invoice-finance
>   pages, secured-business-loans, sell-my-business-guide x2, invoice-finance-for-
>   ecommerce x2). All now "a qualified accountant on our partner team".
> - `confirmation-statement-late-penalty-companies-house.md:146` - absolute delivery
>   guarantee "so your filings are on time, every time" removed. The other "on time,
>   every time" hits describe a generic accountant, not us, and stand.
>
> **Batch 2, fabricated client evidence (all 193 rewritten, none deleted).**
> - `src/app/locations/[slug]/data.ts` has 193 city entries, each with one
>   `localCaseStudy`. 98 of them carried £14,720 (199 occurrences across headline and
>   body) under four mutually incompatible labels. All 193 were rewritten by Opus
>   agents into illustrative scenarios. Zero remaining occurrences in that file of
>   "approached us", "came to us", "we worked with", "HMRC accepted", "HMRC agreed",
>   "We reviewed", "The client", "told us".
> - Arithmetic now holds inside each example with the rate stated (25% main, 19%
>   small profits, 20% merged-scheme/RDEC, 20% VAT). Roughly 40 figures were either
>   recomputed from numbers already present (coventry £14,720 to £21,500 on £86,000
>   at 25%; wakefield to £18,400; oldham to £35,000; plus canterbury, harrow, romford,
>   shrewsbury, uxbridge, barnet, ilford, newbury, penzance, weston-super-mare,
>   paisley, east-kilbride, bradford and ~15 more) or deleted where no sourced figure
>   could make them true (manchester's £6,400 surrendered-loss repayment, sheffield's
>   £14,720 qualifying spend, york's £120,000, dundee's £8,400, doncaster's £73,600,
>   halifax's two monthly figures, chester's £185,000, exeter's £8,400, cheltenham's
>   £40,000 and £2,400 fee, wigan's £3,600 settlement, dover's £7,000, andover and
>   winchester's "£4,000 a year in compliance costs", and the payable-credit
>   double-counts on bournemouth, chelmsford, margate, bridgend, aldershot, hatfield,
>   stevenage, hertford, macclesfield, nuneaton, kings-lynn). Nothing was invented to
>   replace a deleted figure.
> - `src/app/locations/[slug]/page.tsx` - eyebrow changed from "{city} case study
>   (anonymised)" to "{city} worked example", and a standing disclaimer added under
>   the body ("Illustrative example. It is not a record of a client engagement...").
>   `src/app/locations/page.tsx:45` reworded to match.
> - Three fabricated outcomes hiding OUTSIDE the case-study blocks, in
>   `sectorEmphasis`, also rewritten: ashford ("We handled exactly that for a
>   40-vehicle operator... identifying £22,000" and "A manufacturing client in
>   Stanhope came to us... we recovered £9,800"), hillingdon ("A Brunel spin-out...
>   came to us... we recovered £38,200"), lincoln ("much like a client we worked with
>   at Siemens Energy's supply chain").
>
> **Item 7** - `data.ts` Nine Elms FAQ "we have never had a claim challenged by HMRC"
> removed, replaced with a substantive point about thin claims under enquiry.
>
> **Item 8, premises (all fixed).** Every assertion of an owned or named permanent
> space is gone: "our Castlefield meeting space" x2 (Manchester), "our Baltic
> Triangle base" (Liverpool), "our Town Centre meeting space" (Northampton), "our
> Town Centre base" (Ipswich), "our Town Centre meeting room" (Ashford), "our Town
> Centre or Castlefields locations" (Shrewsbury), "our Sutton office" (Croydon), "our
> Kingston office" and "Yes, we have a meeting space" (Kingston), "our IG1 meeting
> space" (Ilford), "our Truro Vean or Kenwyn meeting spaces" (Truro), "a private room
> near Halifax Borough Market" (Halifax), "our central UK base" (Ealing), "our Leeds
> office" (Bradford). All now read as a booked or hired room, and the Manchester and
> Kingston FAQs now say plainly that we are remote first and keep no permanent
> office.
>
> **Item 9** - `data.ts` Bradford "we have recovered over £40,000 for one such client"
> removed; `director-sign-off-company-accounts-non-icaew.md:56` "our experienced team
> prepares accounts for hundreds of limited companies each year" removed. Both are
> client-volume/outcome claims banned by `src/app/services/page.tsx:69`.
>
> **Batch 3** - `src/app/llms-full.txt/route.ts:16` "all tax figures use 2026/27 UK
> rates" replaced with "every tax figure is tagged to the tax year it describes, so
> the same file carries 2025/26 and 2026/27 rates side by side. Read the year label,
> not the file date."
>
> **DELIBERATELY LEFT.**
> - **The estate-wide "we do the work" voice is now the biggest open claims item, and
>   it needs an owner decision rather than a sweep.** "our experienced team" appears
>   in 42 files, and behind it sit hundreds of sentences in the service voice: "We
>   handle the full handover", "we prepare the return and submit it", "Our experienced
>   team runs payroll", "We handle the company formation". None claims a
>   qualification, PI insurance or a regulator, so none is in the serious tier, and at
>   group level (Ashfield Trading Ltd routing to the partner team) they may be
>   defensible. Read together they are the connective tissue that makes the site read
>   as a practice. Fixing them is a positioning decision about whether "we" may
>   describe partner-team work, not a truth fix, so it was not made unilaterally.
>   Estimate: 42 files, roughly a full-day pass once the position is settled.
> - `AccountingService` as the schema.org `@type` for Holloway Davies, used
>   estate-wide in blog JSON-LD. In scope by the letter of the sweep rule, but it is a
>   machine-readable business category used across the whole estate and changing it on
>   one site alone would split the estate's structured data. Owner decision.
> - **Out of scope by instruction, logged for the later pass:** Companies House fees
>   frozen at the pre-May-2024 schedule
>   (`how-to-change-company-name-companies-house.md` and the £50-versus-£12
>   contradiction), the CS01 £13 figure, the three marginal-relief arithmetic errors,
>   the surviving cash-basis £150,000 threshold in
>   `content/fundamentals/self-assessment-tax-return-guide.md:136`, the fee bands in
>   roughly 12 blog FAQs, and the "reply within 24 hours" promises.
>
> **Errors found in the audit brief.** (1) "Roughly 141 location entries carry
> in-person-meeting boilerplate" is wrong. Nearly every "our office" hit is actually
> "at YOUR office", meaning the client's premises, which is true and was left alone;
> the false set was the 16 strings listed above. (2) The brief reads as though all 193
> blocks carry £14,720; the true split is 199 occurrences inside 98 of the 193, with
> the other 95 using different invented figures. They were rewritten on the same
> terms. (3) The cited line numbers `data.ts:6704` and `:395` were correct when the
> audit ran but have since moved.

> **2026-09-11 - HIGH-STREET MECHANIC WAVE 5 BUILT, DEPLOYED 2026-09-16 (`90fbea9c`).**
> 22 assets, 21,680 searches/month: 18 new pages and 4 extensions of live pages. Biggest:
> `insurance-premium-tax` 5,390/mo, `vat-exemption` 3,390, `nanny-tax` 3,070,
> `cash-basis` 2,680, `vat-on-second-hand-cars` 1,550. Five picks dropped (two as conflicts
> with our own pages, one as a competitor service term, one as suspected non-UK residue, and
> `northern-ireland-retail-movement-scheme` because NIRMS is a Defra SPS labelling scheme,
> not a VAT matter). Build exit 0, **836 pages up from 818**, all 22 render, FAQ JSON-LD
> matches frontmatter on all 22, the corpus-wide `first-sentence.test.ts` guard passes,
> frontmatter lint clean on every new file. All 22 registered in `monitored_pages`.
>
> **Two facts locked this wave that most sources get wrong**, both now in house positions:
> the cash basis turnover thresholds were **ABOLISHED, not raised** (ITTOIA 2005 s.25A and
> ss.31A-31D omitted from 6 Apr 2024 by FA 2024 Sch 10; HMRC's own BIM70010 is stale and
> must never be cited), and the **Employment Allowance is NOT available to a nanny employer**
> (NICA 2014 s.2(3)). Also: the PAYE registration trigger is £96/week, not the LEL, and the
> queued LEL back-patch is CANCELLED because £6,500 and £6,708 are both right for their own
> year. VAT Notices 718 and 718/1 are withdrawn and have been re-pointed.
>
> **DEPLOYED 2026-09-16 (`90fbea9c`), redesign and content together.** No pending deploy.
> Programme doc: `docs/_engines/HIGHSTREET_MECHANIC_PROGRAM.md` section 13.

> **2026-09-10 — PORT COMPLETE, ALL SIX PHASES BUILT AND REVIEWED. DEPLOYED 2026-09-16
> (`90fbea9c`).** No pending deploy.
>
> **Phases.** 0-4 built in session 2. This session: phase 4 fidelity review (FAIL, fixed,
> re-reviewed PASS-WITH-GAPS), phase 5 (homepage F.2, pillars, 193 locations; FAIL, fixed,
> re-reviewed PASS-WITH-GAPS), phase 6 (contact/post-submit, about, research, magnets,
> rates, newsletter, legal, interruptive restyle, /team deletion; PASS-WITH-GAPS, fixed).
> Commits: `a8ba8456` `f96f9d9a` `78fea266` `c0fb02d8` `9c00ad35` `63cf2d5c`.
>
> **Tags.** Phases 1, 2 and 3 were tagged at the time. Phases 4, 5 and 6 were built and
> reviewed but went untagged in the moment; they have now been tagged retroactively at
> `c0fb02d8` (phase 4), `9c00ad35` (phase 5) and `63cf2d5c` (phase 6).
>
> **Verification at close** (re-run after every content change, not once):
> build 818/818 pages (820 less the two deleted /team routes), generalist 309 tests,
> web-shared 406 tests, `check_dependency_closure.py` OK across 19 sites, and a crawl of
> ALL 341 baseline routes in `_port/link_baseline.json` showing zero unique-internal-link
> drops and zero em-dash regressions.
>
> **Method that worked and should be reused for sites 2-15:** builder agent ->
> manager-verified -> INDEPENDENT adversarial reviewer against the RENDERED DOM -> gap-fix
> -> re-review. Every single review found real defects, and the two worst were invisible to
> source-only inspection. Reviewers must curl the running server; `tsc` + tests are not
> enough (they do not catch a server/client boundary error either, only a real build does).
>
> **Live defects this port found and fixed, none of them design work:**
> - `/contact` said "We don't share your details" while privacy policy §5 discloses sharing
>   with up to six regulated firms. Consent-integrity defect, live.
> - StatsCounter SSR'd 60% of the target, so raw HTML said 12% where the merged R&D credit
>   is 20%, and 18% where the ERIS threshold is 30%. Humans never saw it; crawlers and LLM
>   scrapes saw nothing else. NOTE: Property runs its OWN copy of this component
>   (`Property/web/src/components/property/StatsCounter.tsx`) and is STILL AFFECTED.
> - Research charts were a single `role="img"` node, which collapses the subtree, so not one
>   data value was reachable to a screen reader on any research page.
> - Expired reliefs and wrong VAT rates on town pages: super-deduction (ended Mar 2023),
>   enhanced capital allowances (abolished Apr 2020), the 12.5% hospitality rate (ended Mar
>   2022), 5% accommodation (ended Sep 2021), an invented "100% FYA under the special rate
>   pool for offshore assets", RDEC as a live alternative to the merged scheme, employer NIC
>   at 14.5%, and one page quoting the VAT registration threshold as £85,000 (it is £90,000).
> - `uk-tax-rates.ts` capped BPR/APR at £1m, the superseded Oct-2024 figure (now £2.5m,
>   transferable to £5m, FA 2026).
> - 180 locked-rule breaches across the town pages that the first pricing pass missed
>   because it searched for the £ symbol rather than the rules. £ is stored as `£`,
>   so a literal grep finds NOTHING: that blind spot cost two passes.
> - A publicly reachable guide quoted a £200-£400/month cost band for a specialist
>   accountant, which is us. `/r-and-d-credits` offered no-win-no-fee, the claim-farm idiom
>   house_positions §21.6 bans. A live 404 on the R&D hub link. `priceRange` asserted in
>   structured data on a site that publishes no prices.
> - 158 town questions asked "how much do you charge" while no answer could say. Reworded.
>   All 772 questions and 772 answers are now unique across the estate.
>
> **OWNER DECISIONS, 2026-09-10 (compliance now mirrors Property on his instruction:
> "anything and everything in terms of compliance, privacy etc should mirror the property
> site"):**
> 1. DECIDED, parity: keep whatever Property has. `leadConsentText` turned out to be
>    byte-identical to Property already, so there was nothing to port; the earlier report
>    that generalist understated it was WRONG and is corrected here. Ported instead: the
>    on-page personalisation disclosure (absent entirely), the cookie policy's first-party
>    analytics section and opt-out instructions, and the consent/retention/objection/fee
>    wording. Left deliberately STRICTER than Property: the /contact privacy line and
>    /complete's "up to six firms" item, since mirroring would mean removing disclosure.
>    Removed as FALSE: every Google Analytics claim (this site runs no GA at all, verified
>    in the served HTML). Anthropic and Companies House stay, they are real in the
>    Property-side pipeline generalist enquiries flow into.
> 1b. **ESTATE-WIDE, STILL OPEN, both sites say the same thing so parity is preserved
>    either way.** (a) The notice says an unconfirmed enquiry may join a batch "after seven
>    days"; `Property/web/src/lib/leads/raw-supply.ts` sets `RAW_WINDOW_HOURS = 24`. The
>    cheapest honest fix is raising the code to seven days, which changes no wording and
>    keeps the mirror. (b) Both sites say "we do not store your IP address (only a country
>    derived from it)" and "this data is anonymous", while `createTrackHandler` persists
>    city, region and timezone alongside a persistent visitor id used to personalise the
>    page. Neither is fixable on generalist alone without breaking the parity the owner
>    asked for. See [[consent_wording_conversion_incident]] before touching consent copy.
> 2. Ten `localCaseStudy` bodies say "under the SME scheme". All are past-tense narratives of
>    pre-Apr-2024 periods, so none is factually wrong, but a reader could take it as
>    currently available. Date-tag them or leave.
> 3. Property's own StatsCounter still SSRs 60% values. Standing rule says never change
>    Property, even indirectly, so it was left alone.
> 4. FAQ answers on town and research pages are inside a Radix accordion and render EMPTY in
>    the pre-hydration HTML; questions render, answers do not, though FAQPage schema asserts
>    them. Pre-existing, systemic, and a kit change would touch Property.
> 5. Roughly 250 town answers still carry first-pass "fixed fee / no hidden charges"
>    boilerplate. Breaches no rule; a separate pass if wanted.
> 6. Yiewsley `:6385` says "exempt storage" in a partial exemption calculation. Self-storage
>    has been standard rated since Oct 2012, but the body does not say enough to be certain.
>
> **METHOD IS NOW A REUSABLE BLUEPRINT:** `docs/_engines/DESIGN_PORT_PLAYBOOK.md` carries
> the phase map, orchestration rules, review and verification contracts, 21 named traps
> with the rule for each, and lift-and-use prompt templates. Next site is `Solicitors/`
> (Accounts for Lawyers). Read it before starting any further port.
>
> **DELIBERATE CALLS RECORDED:** articles lost 2 unique internal links each with `/team`
> (floors hold on 6-10 links of headroom; linking the byline to `/about` adds nothing unique
> because `/about` is already in chrome). `/team` URLs 308 to `/about` (15 + 5 impressions,
> zero clicks, 90d GSC) rather than 404. Testimonials omitted estate-wide, no real quotes.
> Warning ramp gained a light violet step for dark grounds (owner approved 09-10). Embed
> gallery keeps site chrome (owner approved 09-10). In-flow closing panels on research and
> /uk-tax-rates authorised as non-interruptive; NO new modal, banner or exit-intent exists.
> `intent-engine.test.ts` passes byte-unchanged, which is the proof no cadence moved.
>
> **ANALYTICS:** `cta_section_primary` and `cta_section_secondary` stop emitting when
> `CTASection` is deployed away. Restate the deploy-watch baseline. `deep_scroll_close` is
> kept non-canonical by design, mapping recorded in the component.
>
> **LEFTOVERS:** G2 21 calculator workedExamples; kit `FaqSection` html-answer option;
> `buildWebApplication`/`buildFaqPage` rename (deferred to avoid colliding with concurrent
> phase-5 call-site edits); two shared fleet defects in the rollout doc O.8 note; kit
> `ProblemStatement` and `ComparisonTable` hardcode Property copy and a "Most recommended"
> pill, so generalist mirrors them locally (owner items, a fix touches Property);
> `generalist/.git` husk deletion still needs owner word.


> **2026-09-09 SESSION 2 CLOSE — PORT PHASES 0-4 BUILT; NEXT = re-run the Phase 4
> fidelity review, then Phases 5-6.** All local commits [deployed 2026-09-16, 90fbea9c];
> Owner approved the full recommendation bundle same day
> ("go with all recommendations"; recorded in DESIGN_DELTA §§3-4b).
> Tags: `port-generalist-phase1` `phase2` `phase3` (each built -> adversarially
> fidelity-reviewed -> gaps fixed -> re-verified). Phase 4 (calculators) is COMMITTED
> and build/test green (`aeec8f13` capture machinery + resultWrapper on the shared
> renderer, web-shared 406 green, closure OK x19; `fcd61b7b` tabs + F.5 templates +
> two-tier index, 308 tests, 820/820 pages) but its fidelity review was stopped at
> session close with the instruction to re-run it before tagging phase 4 (prompt pattern =
> the phase 3 review; must check gate UX end-to-end, embeds ungated, premium re-key
> isolation, index tabs/buckets, link floors, and the amber Employment Allowance warning
> inside EmployerNICalculator, which likely needs the approved violet warning ramp).
> **CLOSED: the review was re-run (see the 2026-09-10 entry above) and phase 4 is now
> tagged at `c0fb02d8`.**
> Highlights landed: O.8 KIT PARITY PASSED (byte-identical geometry vs Property);
> /blog served HTML ~9MB -> 1.37MB with 461 crawl links kept; link floor UP on every
> reviewed route; 11 hub briefings dual-QA'd (a real HP defect found + corrected: CT
> payment 9m+1d vs CT600 filing 12 months); ResultGate live on all calc pages.
> REMAINING: Phase 5 (homepage F.2 16-section rebuild incl. #calculators HOME_TABS
> exported from components/tools/CalculatorTabs.tsx; pillars /services
> /accountant-near-me /r-and-d-credits; locations x193 + index) and Phase 6
> (contact, post-submit, about, /team DELETE per owner, research, guides/resources/
> templates/uk-tax-rates, newsletter, legal, interruptive restyle, retirement list)
> per docs/generalist/_port/DISPOSITION_SLICE2-3; then owner dev-server walk; deploy
> is owner-triggered. Leftovers ledger: G2 21 workedExamples commissions open;
> calc_promo_inline row in packages/web-shared/experiments/registries/generalist.ts
> should be retired (surface deleted); kit FaqSection needs an html-answer option
> (Property-kit gap, blog worked around it); two shared fleet defects recorded in
> the rollout doc O.8 note (btnPrimary CSS-order, Property-affecting, owner item);
> generalist/.git husk repo bit twice this session (tag + stage went into it, both
> reverted) — deletion still needs owner word.
>
> **2026-09-09 — DESIGN PORT TO THE PROPERTY STANDARD: APPROVED, Phase 0 running.**
> Owner decision (PROPERTY_STANDARD_ROLLOUT.md §8.3): generalist ports to the Property
> standard (Track 1, family C). Keep orange #f97316 as brand primary; warning/duty
> semantics move OFF amber/orange; Geist stays; ALL content/URLs/forms stay.
> Evidence (post bot-gate, since 08-23): blog-landing conversion 0.10% vs Property 0.52%
> on the same traffic; homepage 3.3% vs 8.8%; Property blog forms took 13 leads,
> generalist 1; subscribe surfaces shown ~7x more than the lead form.
> Blueprint (page-by-page, section-by-section, exact classes): `docs/generalist/_port/`
> (DISPOSITION_SLICE1-3 + README) + `docs/generalist/DESIGN_DELTA.md` (draft, awaiting
> the swatch turn). Production SHA at Phase 0: `18b4f25f` (Vercel targets.production,
> READY); no committed-but-undeployed generalist/web-shared changes; link-floor baseline
> capture in progress into `_port/link_baseline.json`. 79 armed monitored_pages rows
> (09-10..10-07) get re-baselined at cutover, annotated. Owner sign-off bundle
> (swatch + capture-surface scope + copy/compliance decisions) is the next gate; no
> port code before it. Live defects the audit found, fixed by the port: btnPrimary
> white-on-orange-500 2.80:1 (WCAG fail on every primary button today), article/legal
> links 3.56:1, `--radius-xl` computes 0px, kit buttons render as 9999px pills
> (missing --btn-radius), duplicate header Contact link from md:, full chrome inside
> /embed iframes, em-dashes in blog stage intros, employer-NI calculator exists twice.

> Created 2026-06-12 to consolidate per-site state (this site previously had no STATE.md; earlier history lives in git log and the program docs referenced below). Convention: this file is the single per-site state record; methodology lives in `docs/_engines/`.

**Site:** www.hollowaydavies.co.uk · Vercel project `holloway-davies` · site_key `generalist` · brand: distinct generalist design system (off-white + ink + orange, Geist Sans), james-holloway byline (credential designation removed 2026-06-29).

> **2026-07-19 — C1 metas + C2 expand committed, DEPLOYED 2026-09-16 (`90fbea9c`):** 5-page query-ledger meta batch + construction-accounting-software expand (43323c0a; fabricated software pricing caught + fixed in QA). Log: `docs/_engines/logs/SESSION_2026-07-19_GROWTH_DAY1.md`.

> **LATEST (2026-06-30, local / UNDEPLOYED):** active **Property-standard PARITY programme** — full handover in **`docs/generalist/PARITY_PROGRAMME_HANDOVER.md`**. Done this run: Waves 0-2 + GEO schema/code; site-wide credential strip; **full factual-accuracy remediation COMPLETE** (356 audited, 281 corrected + 3 fabrications rewritten on-URL); **Wave 3 + 3b GEO keyTakeaways backfill COMPLETE** — answer-boxes now on ALL 356 audited posts (Wave 3 = 74 clean, committed `1e60bf37`; Wave 3b = 282 now-corrected, run `wf_377cb19e-2ad`, incl. regenerating 5 stale pilot boxes); build green, `npm test` 33/33, render/schema verified. Records: `wave3_geo_2026-06-30.md`. **Wave 3b's QA flagged ~60 residual BODY issues** (stale-as-current figures the 1st remediation missed; answer-boxes clean) → `wave3b_body_issues_2026-06-30.md` = **remediation round 2 (manager-direct, owner steer pending).** Then Wave 4 GEN-R2 rewrites (needs fresh GSC pull) or deploy (gated). **Spend posture relaxed 2026-06-30 (owner upgraded); still no waste.**

## Stage 0 diagnosis 2026-08-25 (Track 2 / R.5)

**Binding constraint: ELIGIBILITY (position), not indexation, not conversion, not corpus.**
Google crawls and indexes the corpus and shows it heavily (52,772 impressions / 90d) but
almost never on page 1 for the demand-carrying families, so clicks are 222 / 90d
(CTR 0.42%). The funnel behind the click converts fine; the site just does not rank
where the volume is. Track 2 work here should be the §5.0a optimisation baseline
(corpus has NEVER had one) plus cluster deepening on the families below, before any
net-new volume.

All numbers from fresh API pulls 2026-08-25 (never stored snapshots; `gsc_query_data`
not used, no SUMs of it). Raw outputs saved to session scratchpad
`generalist_stage0/` (gsc_90d.json, bing.json, sitemap_urls.txt; scratch, not repo).

### Search reality (fresh pulls)
- **GSC** (OAuth API, property `sc-domain:hollowaydavies.co.uk`, window 2026-05-27 to
  2026-08-25, **data through 2026-08-23**, date-dimension = unsampled):
  **222 clicks, 52,772 impressions / 90d.** Query dim: 2,182 rows (sampled; reference
  only). Page dim: 625 pages with >=1 impression.
- **Bing** (`GetRankAndTrafficStats`, site truth per the top-N trap memo; data through
  2026-08-23, 96 daily rows): **1,717 clicks, 122,934 impressions / 90d-ish window.**
  Bing out-clicks Google ~8x on this site. 1,202 queries in GetQueryStats (top-N),
  665 pages in GetPageStats.

### Indexation check — PASS
- Sitemap (`/sitemap.xml`, fetched live 2026-08-25): **729 URLs**, of which 429 blog.
- **619 / 729 sitemap URLs (85%) earned >=1 GSC impression in 90d**; blog: 371/429 (86%).
- Corpus on disk: **418 posts** (`generalist/web/content/blog`, .md count), not the
  "448+" sometimes quoted. Sitemap blog count 429 (11 extra = category/route pages).
- Verdict: Google IS crawling and surfacing the corpus. This is not the agency/medical
  indexation pattern. No remediation-first exception applies.

### Conversion funnel — NOT the constraint
- **Leads `source='generalist'` (NOT 'general'; 'general' has 0 rows ever — the memory
  saying 'general' is stale), test-excluded per migration 20260819000003:**
  **15 leads / 90d** (Jun 4, Jul 4, Aug 7). Supabase Mgmt API, project dhlxwmvmkrfnmcgjbntk.
- `estate_kpis('2026-08-23'..now)` (post bot-gate, only trustworthy window): 167
  sessions, 146 humans, 103 engaged, 1 lead in ~2 days. 90d KPI figures
  (2,825 sessions, 15 leads) are pre-gate inflated on the traffic side; leads are real.
- ~15 leads from ~1,939 search clicks (222 G + 1,717 B) is a healthy small-site rate;
  more page-1 positions is the lever, not funnel surgery. (Known LeadForm
  invisible-label bug still LIVE here per §5.0a item 7; fix in Stage 2, cheap.)

### Structure vs competitors (from GSC query data, no paid API)
Top poor-position families (impressions >=30, position >10, 90d):
1. **Construction/contractor accounting SOFTWARE** family, the biggest by far
   (~4,300 impr across ~10 variants, pos 20-31: "construction accounting software" 842i
   pos 27, "accounting software for construction" 685i pos 30, "contractor accounting
   software" 568i pos 25...). SERP is owned by software vendors (Xero/Sage/QuickBooks)
   and comparison/listicle sites; software intent, accountant-secondary. Also a
   cannibalisation-watch item: construction is construction-cis's niche (R.5 rule 4).
2. **CGT reporting 2026** ("hmrc cgt reporting requirements/deadlines 2026", 317i pos 13
   + 227i pos 18): winnable, publisher/firm-guide SERP, nearest to page 1.
3. **Service charge accounts/accounting** (207i pos 79 + 191i pos 71): specialist
   block-management accountants dominate; needs a real pillar or NO-PAGE.
4. **Xero vs QuickBooks UK** (240i pos 88 + 156i pos 81): comparison-site SERP, weak fit.
5. **ACCA vs ICAEW** family (~660i pos 22-26): professional bodies/education sites; info
   traffic, low commercial value.
6. **Local St Albans** ("corporation tax advisers st albans" 215i pos 51, "business
   advisers st albans" 193i pos 68): local firms + directories; local landing page gap.
7. **Plumbers accountant** (250i pos 32), **MTD for income tax** (220i pos 85),
   **fixed fee accounts** (207i pos 67), **incorporation accounting** (169i pos 39).

### Tooling gaps — CONFIRMED, not fixed (Stage 2/3 prerequisites)
1. `sites/generalist.discovery.json`: legacy schema, **no `lanes` /
   `lane_negative_tokens`** keys (candidate_pool silently skips the lane gate).
2. `sites/generalist.json` `paths.topicPool` = **null** (Property points at a
   nonexistent doc too; author the topic-pool doc as first Stage 3 artefact).
3. `scripts/track2_worklist.py` is a **Property REBUILD, not a flag pass**: hardcoded
   `docs/property/track2_universe_2026-05-23.md`, Property DONE-slug lists and
   Property cluster regexes (lines 22-57).

### Armed monitored windows — FROZEN, excluded from every sweep
`monitored_pages` site_key='generalist': **79 active rows with monitor_until in the
future (2026-09-10 to 2026-10-07)** + 109 already-flagged rows (expired from arming
purposes). The 79 are excluded from the Stage 2 equity sweep per §4.7; earliest
windows open 2026-09-10.

### Next (Stage 2, when authorised)
Optimisation baseline §5.0a on the existing 418-post corpus (house_positions currency
pass, corepage, SERP meta, equity-graded sweep minus the 79 frozen pages, GEO backfill
check, link hygiene, LeadForm label fix), then §5.1 discovery for the 28 C2 clusters.
DataForSEO balance $47.19 re-derived live 2026-08-26 (`/v3/appendix/user_data`); the ~$2.82 figure was stale, no top-up needed.

## 2026-08-25 — Port-branch merge: nothing pending for this site

`design/property-redesign-port` was merged to main on 2026-08-25 (Property Standard
rollout, decision §8.10). Passenger enumeration for this site: **44 commits** were on
the branch and not in `origin/main`.

**All 44 are already on production, so the merge ships nothing new here.** This site's
live production deployment is SHA `435cc12e`, deployed 2026-08-24 ~20:2x UTC
(Vercel API `GET /v9/projects` -> `targets.production.meta.gitCommitSha`, readyState
READY, read 2026-08-25; this is what the production alias actually points at, which a
`/v6/deployments` listing alone would not prove), and
`git log 435cc12e..design/property-redesign-port --oneline -- 'generalist/'` returns 0.
Main was BEHIND production for this site, not ahead of it.

Reproduce the passenger list: `git log 902ea014..435cc12e --oneline -- 'generalist/'`.
Everything on it (estate lead-parity port, pool-model disclosure sweep, FA 2026 factual
sweeps, the 2026-08-24 consent-wording revert) is live and was deployed before this merge.

## Wave 4 net-new (gap-discovery batch) - WRITTEN + QA CLEAN 2026-07-09, AWAITING DEPLOY WORD

- First NET-NEW content wave (waves 0-3b were the parity/GEO programme). Source: gap discovery 2026-07 curated batch (13 topics; A13 company-car BIK STRUCK at page-level collision verify - limited-company-car-tax-relief-2025-26 already owns it, rejected in blog_topics, routed to rewrite/refresh).
- 12 pages written (single lane, batchSize 1, parallel worktree writers; COST-CONSCIOUS ADAPTATION: single combined brief pass per pick with full URL-liveness + statute-verify disciplines + one conductor gate, instead of the two-stage brief round - justified by the lighter statutory load).
- Slugs: cash-flow-management-small-business-uk, double-entry-bookkeeping-explained-uk, corporation-tax-paying-early-or-in-instalments-uk, do-i-need-a-separate-business-bank-account-uk, how-to-set-up-a-business-partnership-uk, what-is-a-balance-sheet-uk-sme, unique-taxpayer-reference-utr-uk, christmas-party-tax-rules-limited-company-uk, how-to-complete-and-submit-vat-return-uk, high-income-child-benefit-charge-business-owners-uk, late-payment-rules-small-business-uk, personal-tax-for-llp-members-uk.
- HP locks at gate: SS3.A CT payment timing/QIP (rates 2.75/7.75/3.50/6.25 + thresholds verified), SS6.A salaried-member BlueCrest [2026] UKSC 18 (conductor-verified at caselaw.nationalarchives.gov.uk). Base rate 3.75% triple-verified (2 HMRC definitions + BoE Dec 2025 minutes via QA).
- QA (4 agents + tone/GEO review): real catches fixed manager-direct - A3 QIP 4th-instalment 14 June->14 July + CT600-deadline boundary trim; A11 day-count parenthetical; A7 6 relative links -> absolute; A8 double-hyphen headings; A1/A6 GEO opener lifts; A6 writer itself caught the brief's stale CA 2006 thresholds (shipped verified 15m/7.5m/50). Verdicts 12/12 all_clear; predeploy gate PASS; link floor 0/0; build GREEN.
- monitored_pages registered (net_new, to 2026-10-07); blog_topics flipped written/used.
- NOTE: image fields intentionally empty - run scripts/blog_image_backfill.py for the 12 slugs around deploy.
- Backlog from this wave: F-20/F-220 AMAP 45p page (estate sweep), F-121/F-321 LLP-vs-Ltd BADR tense, F-280 reciprocal links, F-300 salary-dividend 2026/27 refresh, corpus twin-pairs (trial-balance identical H1 etc.) -> consolidation backlog (data-gated).
- >> NEXT: deploy on explicit owner word: ./scripts/deploy-and-index.ps1 -Site generalist, then IndexNow the 12 URLs.

## Corpus + structure (as of 2026-06-12)

- ~322 blog posts + fundamentals section (`generalist/web/content/blog` + `content/fundamentals`; 383 mapped slugs), 193 city pages, 7 PDF templates, `/blog/stage/*` navigation.
- Keyword intel: 199 topics in the blog_topics pool (config prompts still carry agency→generalist rewrite TODO).
- Experiments: `calc_promo_inline` LIVE (first generalist experiment, both arms verified in prod). Nurture engine composed but DORMANT (collect-only).

## Search/optimisation state

- **Data**: GSC + Bing query data flowing to Supabase. NOTE: GSC was never ingested for this site until 2026-06-12 (the table had 2 rows); always check ingestion recency before judging "no demand".
- **SERP meta program batch 1 + tail (2026-06-12)**: 61 pages re-titled/re-described from fresh 90d GSC + Bing query data (39 batch-1 + 22 tail covering every page ≥8 combined impressions), deployed + IndexNow'd, 90-day regression watch in `monitored_pages` (to 2026-09-10). Engine: `docs/_engines/SERP_META_PROGRAM.md`. 28d outcome verdicts via weekly_run from ~2026-07-10.
- **SERP meta batch 2 (2026-07-08)**: 12 pages (fresh worklist minus batch-1 cooldown), Opus copy + Sonnet adversarial QA, DEPLOYED + IndexNow'd; monitored to 2026-10-06. One page PULLED from the batch: can-a-director-claim-badr-after-leaving-role-2-years-ago body cites a stale 14% BADR rate (needs factual fix before any meta pass). Estate readouts: docs/_engines/meta_batch1_verdicts_2026-07.md + OPPORTUNITY_READOUT_2026-07.md. Batch-1 26d pre-read: imp 2,931->4,027 but 0 Google clicks SITE-WIDE (7,656 imp since 06-12, 0 clicks); biggest content play = construction accounting software cluster (~1,800 imp on one page at pos 20-32, EXPAND).
- **Factual corrections shipped same day**: `confirmation-statement-late-penalty-companies-house` fully rewritten (page wrongly presented annual-accounts penalty bands as CS01 fines; GOV.UK-verified rewrite). AMAP 45p→55p (FA 2026, from 6 Apr 2026) corrected on `employee-mileage-45p-tax-free-rules` (rewritten, GOV.UK-verified), `can-i-claim-mileage-limited-company-director` and `accountant-for-delivery-drivers-uk` (back-patched incl. recomputed worked examples).
- **Content-gap follow-ups**: `docs/generalist/opportunity_register_meta_2026-06-12.md` (register only, no edits yet — 92 entries).

## Known pending

- ~~Wider FA-2026/AMAP stale-figure sweep across the rest of the corpus~~ **SUPERSEDED / DONE 2026-06-30**: full-corpus factual-accuracy remediation completed (all 356 unverified/legacy posts audited, 281 corrected + 3 fabrications rewritten, build green, UNDEPLOYED). See `PARITY_PROGRAMME_HANDOVER.md` §4c + `factual_audit_2026-06-30.md`.
- Net-new/rewrite content programs: not yet onboarded for this site (see `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`).

## Blog audit + rewrite program (2026-06-12)

- Provenance: 363 claude-supabase (low confidence, originates from a monolithic snapshot commit) + 3 deepseek consolidated-generator pages.
- Blind quality audit: claude corpus is sound (3 a_star / 3 acceptable). The 3 deepseek pages showed the quality step-down the grader detected blind.
- Manager-direct back-patches committed: live CGT-rates page mid-sentence truncation completed; payroll pricing table removed + RTI penalty bands corrected (GBP200 for 10-49 employees); Employment Allowance single-director exclusion fixed.
- `docs/generalist/house_positions.md` AUTHORED: 13 sections, every load-bearing figure source-verified, adversarial Opus verification passed 22/22, LOCK-READY. Status: awaiting user lock before rewrite waves begin.
- HEADLINE FINDING: employer NIC is 15% above GBP5,000 secondary threshold from 6 Apr 2025; the corpus 13.8%/GBP9,100 figures are stale on approximately 57 pages (sweep queued, arithmetic changes, advisory-grade rework needed).
- Rewrite worklist: `docs/generalist/rewrite_worklist_2026-06-12.md`. Tier A+B = 26 pages (waves GEN-R1/R2); 10 executable immediately after HP lock, 16 in SERP meta cooldown until 2026-06-26; 344 pages on GSC-maturation watch.
- generator: frontmatter field now stamped on all posts and written by all pipelines going forward (see docs/_engines/ENGINE_MAP_AND_ONBOARDING.md section 5).
- Methodology: docs/deepseek_quality_audit_2026-06-12.md + docs/provenance_summary_2026-06-12.md + docs/_engines/rewrite_gold_patterns.md.

## Track 2 / R.5 progress 2026-08-25 (evening session)

- Stage 2 started: corepage homepage pass SHIPPED to main (`6c86fc28`), rewrite batch 1
  SHIPPED to main (`b6c151b8`): 8 top-ROI pages (Bing page 1 / Google invisible), full
  overhaul, dual-QA passed. Live factual errors found and fixed in the OLD pages: VAT FRS
  (7, incl. pandemic-era hotel rate and inverted 16.5% discount claim), dividend pair
  (3 arithmetic errors), NI page (false pension-entitlement implication).
- Stage 3 research COMPLETE for all 28 absorb niches: 6 family dossiers frozen (creative,
  trades_transport, care_education PROVISIONAL, personal_care_fitness, retail_product,
  specialist_professions) in `docs/generalist/dossiers/`. ~57 planned surfaces.
  house_positions.md sections 14-22 lock all families' ground truth.
- Deltas open: care_education D1 harvest (~$0.40) + small gate-blocked pulls (~$1 total),
  next budget day. Daily $5 DataForSEO gate was the binding constraint, respected by all
  agents; account balance ~$50.
- HELD BACK from rewriting (estate-assignment questions, owner bundle): forex-traders
  page (crypto site's ground, generalist out-ranks the pilot), dentistry-compliance
  (dentists' ground), 2x CGT-on-property pages (property site's ground).
- Next: remaining rewrite batches from the worklist (298 eligible), research packs +
  language pass per cluster, then net-new waves. Nothing deployed; all owner-gated.

## Track 2 / R.5 progress 2026-08-25/26 (overnight session: ALL SIX NICHE WAVES COMPLETE)

- **All 6 niche-family waves now written, dual-QA'd, fixed and committed** (nothing
  deployed): creative_performers (prior session, `c4afb3d5`), trades_transport
  (`4e6a69f7`, 8 pages; E1 uber/delivery EXTEND DEFERRED, seeds in armed windows to
  09-10/10-06), specialist_professions (9 surfaces incl. architects reframe,
  commit in log), personal_care_fitness (`f61c96c9`, 5 surfaces), care_education
  (`07a7615f`, 6 surfaces), retail_product (`42cfd534`, 17 surfaces). ~45 new/
  overhauled pages this session. Every wave: parallel Opus writers from frozen
  packs, dual Opus QA (adversarial factual vs house_positions + editorial vs
  language spec), fix agents, mechanical §/em-dash/link sweep, tests 285/285,
  build green per wave.
- **house_positions corrections shipped from write-time verification:** §19.1 QCR
  year mapping was wrong by one year (CLOSED, corrected); §19.4 private-tuition
  VAT exemption authored (primary-verified); §21.8 stock/WIP + §21.9 food VAT
  authored (primary-verified, unblocked retail N4/N6).
- **Owner-gated leftovers:** retail N7 exporters/CBAM (needs §21.7 authored + D3
  volume check); trades E1 extend (windows expire 09-10 / 10-06); SED days
  calculator T1; the 4 held-back cross-site pages (forex, dentistry-compliance,
  2x CGT-property). DataForSEO spend today under the owner-lifted gate: ~$1.84
  ($0.56 care D1, $1.28 personal_care D1 incl. a $1.10 crash loss).
- **Estate-wide flags recorded:** late-payment interest 8% vs §3.A 7.75% needs a
  corpus-wide base-rate decision; "Worked example:" H2 prefix on 14 legacy pages
  and the empty trailing FAQ H2 on 6 legacy pages are estate patterns to sweep
  separately; employer-NIC bulleted-ladder shape now on ~9 pages, future waves
  should state it as prose; `generalist/.git` is a dead nested-repo husk
  (files tracked by monorepo; deletion needs owner word).
- Image backfill for the 90 empty-image posts (45 new + 45 legacy incl. the
  wave-4 dozen) run via Pexels with curated per-slug queries, local jpgs,
  creative-wave frontmatter convention.
- Next after deploy: register monitored_pages rows per pack revert paths;
  remaining ~270 lower-ROI rewrite worklist; delta back-patches (TOMS dated
  block review each fiscal event, QCR CPI refresh each April).

## Track 2 / R.5 progress 2026-08-25 (late session, PAUSED here)

- Rewrite batches 1-3 SHIPPED to main: 30 legacy pages fully overhauled, dual-QA'd,
  fix lists applied (`b6c151b8`, `33ef519b`, `369dc4ee`). Live factual errors fixed
  across the corpus incl. wrong BIK band tables, inverted marginal-relief formula,
  fabricated FTR/HETV relief rates, stale AIA-reversion claims, wrong dividend
  arithmetic, plus the stale-figure class sweep (SPT, Companies House fees, 18 files).
- creative_performers wave COMPLETE end to end (`c4afb3d5`): 9 surfaces (4 reframe,
  3 net-new, 2 extend), dual-QA + all fixes applied. First of 6 niche waves DONE.
- trades_transport wave WRITTEN 2026-08-25/26 (`4e6a69f7`): 8 net-new pages (N1-N8),
  dual-QA + all fixes applied (71 published house-position citations stripped wave-wide,
  TOMS position VERIFIED IN FORCE and rewritten from the fallback hedge per RC Brief 8
  (2025) / effect 2 Jan 2026, EA cap + MTD income test fixed on security, marginal
  relief added on cleaning, CO2 pool assumption on taxi SA). All 47 worked-example
  figures recomputed clean. Tests 285/285, build green. Images empty: run
  scripts/blog_image_backfill.py for the 8 slugs around deploy.
- **E1 uber/delivery EXTEND DEFERRED**: both seeds inside armed monitored_pages
  windows (accountant-for-delivery-drivers-uk to 2026-09-10, accountant-for-uber-drivers
  to 2026-10-06). Pack stays frozen; run E1 when the windows expire (delivery editable
  from 09-11). Wave pages link the existing seeds as-is.
- QA note for future waves: §2 locks Class 4 6% for 2025/26 only, and the £12,570 /
  £50,270 / £125,140 bands are tagged 2025/26; pages using them in 2026/27 copy carry
  a dated "still current when checked" tag. Consider a house_positions 2026/27
  currency pass for §2 bands.
- After trades: personal_care_fitness, retail_product, specialist_professions waves
  (dossiers frozen, packs not yet built); care_education needs its ~$0.40 D1 harvest
  (gate-blocked 08-25) before packs.
- Remaining rewrite worklist: ~270 lower-ROI pages (top-40 ROI set is done except
  the 4 held-back cross-site pages: forex-traders, dentistry-compliance, 2x
  CGT-on-property; owner decision pending).
- ~~NOTHING DEPLOYED~~ **CORRECTED 2026-08-26: ALL OF IT IS LIVE.** Production SHA for Vercel project `holloway-davies` is `7be12b11`, readyState READY (`GET https://api.vercel.com/v9/projects` -> `targets.production.meta.githubCommitSha`, read 2026-08-26), which is the current tip of `origin/main`. So the six niche waves, rewrite batches 1-3 and the image backfill are all on production. Still open from this wave: `monitored_pages` registration per pack revert paths, and IndexNow submission for the new URLs.
- Note: research packs reference the 08-25 scratchpad GSC/Bing pulls; a resumed
  session should re-pull fresh data if more than ~a week has passed.

- **2026-09-12 location worked-example ARITHMETIC PASS: CLOSED.**
  `generalist/web/src/app/locations/[slug]/data.ts`. The earlier pass fixed the
  dishonest framing (193 invented "case studies" reframed as illustrative worked
  examples, disclaimer added, engagement voice removed) but left the arithmetic:
  `\u00a314,720` still appeared 161 times across 84 sentences as the answer to VAT
  recovery, R&D credits AND corporation tax relief simultaneously, and `\u00a318,400`
  across 27 towns. Both are gone. 337 figures recomputed from facts stated in their own
  paragraph at the rate the relief actually calls for (house_positions: CT 25%/19%,
  merged RDEC 20%, ERIS 86%/14.5%, AIA \u00a31m at 100%, FA 2026 40% FYA, WDA 18%
  to 14%, VAT 20% and the 1/6 fraction); ~60 trailing "worth roughly \u00aX a year"
  figures DELETED as uncomputable, sentences kept as mechanism. Headline and body now
  agree in all 193 (9 headlines were still carrying the old number over a recomputed
  body). Also swept outside the case-study blocks: unsupported client-outcome figures
  removed from `sectorEmphasis` (Sunderland, Halifax, Caerphilly, Wolverhampton) and
  from one Dover FAQ. Result: 212 headline figures, 202 distinct, most-repeated single
  figure now appears 3 times (\u00a318,400, reached three different ways from three
  different inputs, each derivable). tsc clean, vitest 309/309. [deployed 2026-09-16, 90fbea9c]
  Standing rule for this file: a figure is allowed only if the paragraph states the
  facts that produce it, and the relief is chosen by the scenario, never for variety.
