# OPEN-ITEMS CLOSURE — HANDOFF (2026-07-20)

**For the next agent.** Session 2026-07-20 executed an owner-approved "cross off every open item" plan (`C:\Users\user\.claude\plans\let-s-move-in-to-shimmying-glacier.md` — read it; it is the master plan with scope decisions). Session was paused at ~50% context. This doc is the complete continuation state. Owner authorisations captured in the plan: **all content waves in scope; prod deploys AUTHORISED; nurture fast-follows = H3 webhook only; analytics audit report-only (delivered)**.

## Locked working rules (do not relearn these)
- Model tiering: **Opus-tier reasoning = architect/judge/briefs only. Sonnet = content writing + build slices. Haiku = grunt (never content).** Never pass `model: opus` to subagents (dies silently — run QA/judges on the inherited session model). One Sonnet subagent per topic/page, parallel, no lanes.
- Factual back-patches: manager-direct where per-citation judgment is needed; workers are fine when executing a **pinned, source-verified fix spec** (the pattern used this session).
- 2-track QA after any content build: factual-vs-house-positions + editorial-vs-helpful-content, on inherited model.
- No em-dashes in user-facing copy. Blog bodies = raw HTML in frontmatter. British English.
- Verify every figure at primary source before locking (gov.uk / legislation.gov.uk). Never seed a subagent prompt with a stale figure.
- Cluster git pushes end-of-session; red CI emails the owner. Deploy recipes: repo root + `VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH` + per-project `VERCEL_PROJECT_ID`, `npx vercel deploy --prod --yes`, then remove root `.vercel`. Run `next build` locally before deploying (catches what tsc misses).

## DONE this session (commits on branch `expansion/phase-0`)
1. `60a54e22` — estate stale-tax-figure sweep (NIC 15%/£5k, AMAP 55p, dividends 10.75/35.75, s455 date-banded, BADR 18%, LEL £6,708; 66 files).
2. P0 commit — regenerated rate-bearing xlsx/PDF/SVG assets; `djh` noise-filter entry (+self-test); POST_LEDGER residue verified clean (header updated in that doc); `proposal_engine/` committed (out/ gitignored); covering-email draft at `proposal_engine/out/covering_email_draft.md` for owner.
3. `5ead3563` — **Dentists credential sweep**: 41 files stripped of ICAEW/ACA/NASDAL reviewer claims (frontmatter + baked JSON-LD, incl. wrapped variants), NASDAL `memberOf` removed from content (both array + object forms) AND from `optimisation_engine/apply/_schema_generator.py` dentists profile (smoke-tested). All 211 dentists schema blobs re-validated as JSON. Agency content verified already clean (only educational ICAEW references remain — keep-list). Zero-claims grep = 0.
4. Analytics hygiene audit report DELIVERED: `docs/_engines/ANALYTICS_HYGIENE_AUDIT_2026-07-20.md` (read-only; headline: 335k events/206MB tiny, bots 25.8% of events, web_vital+engagement_time = 53% of rows, 3 unreferenced views, retention cut blocked on dormant web_rollup decision). Recommendations need owner sign-off; no action taken.

## UNCOMMITTED working tree (commit these first — verify then commit as one cluster)
- **Wave3b remediation round 2** (generalist, 11 files): electricians van benefit £4,020/£4,170; ATED 2026/27 £4,600–£303,450 (landlords + property-investor); HMRC late-payment interest base+4pts/7.75% (cgt-property-calculated, vat-tax-calculator, three-tax-deadlines-a — also fixed the wrong claim that 5% surcharges hit payments on account); CH paper fee £71; P11D fuel multiplier £28,200/£29,200 + recomputed examples; official rate 3.75% + recomputed example; trust £500 de-minimis (replaced abolished £1,000 SRB); EV BIK 3%/4%; MVL takeaway £4,000–£6,000; softened unsourced 40% VAT stat. All figures verified at gov.uk this session. Worklist header updated in `docs/generalist/wave3b_body_issues_2026-06-30.md` — **note recorded there: the worklist's "40% FYA should be April 2026" items were WRONG; FA 2026 s.29 verified = expenditure on/after 1 January 2026; pages already correct, unchanged.**
- **BADR gap figure** patch in `generalist/.../badr-claim-after-leaving-director-role.md` (£30,000 gap for 2026/27).
- **In-flight worker edits (VERIFY THEN COMMIT)**: a worker was applying the pinned QFZP/FIG/IR35 fix spec when the session paused. It edits ~28 files across digital-agency (QFZP de-minimis corrections; FIG-regime corrections incl. the `fundamentals/international-agency-operations-pillar.md` which wrongly said the non-dom reform "has not been enacted"; remittance-basis-after-2025 + uk-non-dom-rules-2025 files), plus size-threshold fixes (£10.2m/£5.1m → £15m/£7.5m with 6-Apr-2025 banding + "first affects off-payroll determinations in 2027/28" note) in digital-agency (13 files), Dentists (2), Solicitors (3), generalist fundamentals (2), Property (llp-accounts wrong-figures fix + file-dormant SI citation → SI 2024/1303). Check `git status`; verify with: `rg -n '10\.2|5\.1 million' <touched files>` (only date-banded "previously" mentions should remain), `rg -n 'remittance basis' digital-agency/web/content | rg -v 'abolished|was|historic|former|pre-6|old'` should return ~nothing current-tense. If the worker died mid-run, re-apply from the spec (reproduced in full in the session plan + the verified facts below).

### Verified ground truth from this session (all primary-source checked 2026-07-20 — safe to reuse)
- FA 2026 s.29 40% FYA: expenditure **on/after 1 Jan 2026** (legislation.gov.uk).
- Van benefit £4,020 (25/26) £4,170 (26/27); car fuel multiplier £28,200/£29,200; van fuel £769/£798.
- ATED 2026/27: £4,600 / £9,450 / £32,200 / £75,450 / £151,450 / £303,450.
- HMRC late payment interest = base+4pts from 6 Apr 2025 (7.75% at Jan 2026); repayment = base−1 (2.75%).
- Official rate of interest 3.75% (25/26 and 26/27).
- LEL 2026/27 £6,708 (£129/wk); secondary threshold £5,000; employer NIC 15%.
- UAE QFZP de minimis: non-qualifying revenue ≤ lower of 5% of revenue or AED 5m; breach = lose QFZP for period + 4 following.
- FIG regime: remittance basis abolished 6 Apr 2025 (ENACTED, FA 2025); 4-year regime = first 4 UK-resident years after ≥10 consecutive non-resident years; claim annually; costs PA + CGT AEA; relieved FIG CAN be remitted tax-free; TRF 12% (25/26, 26/27) then 15% (27/28), closes 5 Apr 2028; re-qualify needs 10 non-resident years.
- Size thresholds SI 2024/1303: £15m/£7.5m/50 for FYs beginning on/after 6 Apr 2025; off-payroll effect first in **2027/28** (ESM10006a), NOT 2026.

## REMAINING WORK (in priority order)

### R1 — Agency R&D cluster fix wave (spec COMPLETE, execution not started)
Source-verified ledger + full per-file classification below (research agent, 2026-07-20; primary sources gov.uk merged-scheme guidance updated Jan 2026, CIRD112100/135000, FA 2023 Sch 1). **25 of 37 files need fixes; 2 need ground-up rewrites.** Delegation: 1 Sonnet worker per Severity-1/2 file (give each worker the ledger verbatim + its file's finding + instruction to locate-and-fix each claim, recompute worked examples, date-band history); Severity-3 residuals can be batched 3–4 files per worker. Then ONE inherited-model QA agent re-greps the whole cluster against the ledger (esp: no "186%" as current, no "15% net" for loss-makers where 16.2% is right, no aggregate-65%-cap claims). The two ground-up rewrites (65%-rule + PAYE-cap articles) are full A*-standard rewrites: Sonnet writer seeded with the ledger + correct rule statements, Opus-tier factual QA.

GROUND-TRUTH LEDGER (verified 2026-07-20):
| Fact | Value |
|---|---|
| Merged RDEC commencement | APs beginning on/after **1 April 2024** |
| Merged RDEC rate | **20%** taxable above-the-line credit |
| Loss-maker notional tax | 19% small-profits rate → net **16.2%**; main-rate payers net 15% |
| PAYE cap | **£20,000 + 300%** of PAYE/NIC; merged-RDEC excess carries forward |
| ERIS | loss-making SME, R&D ≥30% of total spend; extra 86% deduction + payable credit **14.5% of surrenderable loss** → net up to ~26.97p/£1 ("up to 27p"; 27% is NOT a credit rate) |
| History | SME 130%+14.5% pre-Apr-2023; 86%+10% Apr-2023→merged (intensive kept 14.5%, threshold 40% then 30%); old RDEC 13%→20% Apr 2023 |
| Cloud/data costs qualify | APs beginning on/after 1 Apr 2023 |
| Contracted-out (merged) | decision-maker claims; 65% restriction = 65% of EACH unconnected subcontractor payment (NOT an aggregate cap) |
| Overseas restriction | from merged scheme; NI exemption is ERIS-only |
| FA 2026 | NO R&D rate changes (clarifications only) |

Severity 1 (ground-up rewrite): `rd-tax-credit-subcontractor-costs-65-percent-rule-uk-agencies.md` (invents aggregate 65% cap; both examples wrong: correct qualifying £100,300 not £122,000; £78,250 not £70,200; fictitious "65% profit mark-up" connected rule), `paye-ni-cap-rd-claim-agencies.md` (cap formula omits £20,000+300%; every example invalid: £42,000→£146,000, £35,000→£125,000 no restriction, £41,000→£143,000; also stale 186%/10%: merged loss-maker £229,500×16.2%≈£37,179; ERIS £426,870×14.5%=£61,896).

Severity 2 (186%/14.5%/10% presented as current → merged 20% credit, net 15%/16.2%, band "APs beginning on/after 1 Apr 2024"): klaviyo-custom-flow (£21,500/£10,750→£15,000/£7,500), rd-tax-credits-marketing-agencies (£21,204→£9,720/£9,000; fabricated "100% for individual subcontractors"), rd-tax-credits-custom-software-client-projects ("186% for 2025/26" flatly wrong; £63,612→£27,000/£29,160; flip SME-risk framing to merged decision-maker rule), saas-agency-rd (£17,670→£7,500/£8,100; ERIS £7,250→up to £13,485), headless-commerce (£20,800 credit/£15,600–£16,848 net; ERIS £28,049; carry-back = 2 open years), bespoke-integrations (£13,783/£10,518→£7,800 credit, £5,850–£6,318 net), custom-software-vs-off-the-shelf (£22,405→£12,680 credit, £9,510–£10,271 net), performance-optimisation-rd (£21,204→£12,000 credit, £9,000–£9,720), r-and-d-...-ai-agency (garbled "£143,000 deduction on £50,000"; £330,000→£66,000 credit, £49,500–£53,460, ERIS ~£88,999), fundamentals/agency-tax-compliance-complete-guide ("APs on/after 1 Apr 2024 the SME scheme provides 186%" — right date wrong scheme; £35,340→£15,000–£16,200), fundamentals/agency-finance-fundamentals, fundamentals/choosing-agency-accountant-pillar (3 spots incl. keyTakeaway), how-to-choose-accountant-agency (£3,534/£10k→~£1,500), specialist-vs-general-accountant-agency, corporation-tax-agency-founders (FAQ only), questions-to-ask-agency-accountant + what-does-agency-accountant-do (garbled "£10,000→£28,600 deduction" 286% double-count), rag-pipeline-rd (65%-SME lines need banding; bolded raw-keyword artefacts ×3; empty schema).

Severity 3 (residuals in previously-patched files): merged-r-and-d-scheme-agency-2023 (title/h1/schema still "Post-April 2023"; transitional credit "remains 14.5%" wrong except intensive; pre-2023 comparison should be 130%/£24,700; claim deadline = 2 years + 6-month notification, NOT 12 months; fabricated "£25,000 adviser-report rule" → Additional Information Form mandatory since 8 Aug 2023; slug rename needs 301 = owner decision, default keep slug), r-and-d-intensive-sme-test-agencies ("27% payable credit" garble ×6 — rate was 14.5% both regimes, change was threshold 40%→30% which the file states BACKWARDS; invented "65%-of-staff-costs overhead method"; example recompute £400k/£2.5m=16%, alt £400k/£1.3m=30.8%; empty schema), does-fine-tuning-llm (schema description "SME adds 86p/£1"; "15% net"×2→16.2%; staff cost £18,000→£22,000 → totals £36,700→£7,340 credit→£5,505 net), rd-claim-cloud-compute (band the old-SME aside 1 Apr 2023–31 Mar 2024 + state cloud costs qualify only from APs beg. 1 Apr 2023), attribution-tool (metaDescription + JSON-LD still 186%/14.5% contradicting on-page FAQ; £7,250→£9,300/£13,485), agency-rd-tax-credit-eligibility-checklist (model merged text at lines ~104–108 — reusable verbatim as the canonical wording; 2 minor fixes), apportioning-staff-time (base £70,275 vs £69,300 slip; credit £14,055, net £10,541).
Cross-cutting: "15% net"→16.2% recurring; "14.5% of qualifying costs" garble (applies to surrenderable loss incl. enhancement); double-counted 100% deduction; decision-maker + overseas rules missing nearly everywhere; `schema: ''` empty ×3.
Clean (do not touch): rd-tax-credit-investigations-triggers, rd-tax-credit-claim-process-timeline, document-rd-activity-agency-year-round, what-to-look-for..., red-flags..., how-often-should-your-agency-meet..., what-is-included-in-typical-agency-accountant-fee, agency-profit-margins-benchmarks, ir35-for-agencies-pillar.

### R2 — Agency fleet year-labels + meta trim (small, manager-direct or 1 Haiku-grade pass reviewed)
`digital-agency/web/src/lib/tools/configs/`: metaTitles/oneLiners say "2025/26" while compute uses 2026/27 (employer-ni-calculator, pension-contribution-optimiser, rd-tax-credit-estimator, salary-dividend-optimiser; badr-cgt-calculator metaTitle "2025/26" though body models both years). Align labels to 2026/27 (keep both-year copy where present). Also trim agency fleet metaDescriptions >160ch (backlog said worst: free-health-check 196, r-and-d-credits 192 — re-grep). ALSO update rd-tax-credit-estimator config against the R&D ledger while in there.

### R3 — 2026/27 editions wave (~15 year-titled pages; P3 of plan)
List + slug policy in the plan file. One Sonnet per page, A* standard, seeded with 2026/27 ground truth (dividends 10.75/35.75, NIC 15%/£5k, Class 4 6%, BADR 18%, AMAP 55p, CH £50/£71, interest base+4). 2-track QA. Year-free slugs refresh in place; year-in-slug pages lead with 2026/27 + keep slug (check fresh GSC before any slug decisions).

### R4 — WS8 keyTakeaways backfills (P4; owner pre-approved)
Dentists ~118 posts + Medical 73 (0/73). GEO answer-box standard, 40-60 words, ground-truth-checked. Sonnet workers in slices of ~10 posts; QA agent verifies no stale figures re-introduced (45p/8.75/13.8/9,100/10% BADR are the tells). Medical is FLAT-routed: never nested-slug tooling, never `slug_resolver --fix`.

### R5 — Technical residue (P5)
(a) Solicitors favicon: none in layout.tsx — add icon files (generate via generalist `scripts/generate_brand_assets.py` pattern) + `icons` metadata. (b) og:image: code clean of placeholders; verify live og:image renders after deploy, then close the presence-audit item. (c) Dentists flat-URL 301s: ALREADY in middleware (76-entry map) — verify 5 ledger URLs live post-deploy, mark ledger item done. (d) gsc_page_performance CHECK ALTER (additive site-key extension): show owner the SQL, apply only on his OK.

### R6 — H3 webhook (P7; owner approved this specific item)
Resend API (full-access key in root `.env`): `POST /webhooks` for email.bounced + email.complained → `https://www.propertytaxpartners.co.uk/api/leads/events`; response returns whsec_ → `vercel env add LEAD_RESEND_WEBHOOK_SECRET production` → redeploy Property → probe (401/403 signature-gated, not 503). Custom User-Agent on all Resend/Supabase API calls (Cloudflare 403s default Python UA).

### R7 — QA gates + deploys + close-out (P8)
Per touched site: tsc, vitest, `next build`. Deploys authorised: Dentists, digital-agency, generalist, Solicitors, Medical, Property (recipes: memory `vercel_cli_deploy_workflow` + Property/console specifics in `property_lead_nurture_system` memory). Live spot-checks: dentists post HTML+JSON-LD ICAEW-free; favicon 200; 301s; H3 route. IndexNow changed URLs. One push at end (CI must stay green). Memory close-out: archive content_sweeps_backlog + estate_credential_claim_risk (after live verify) + analytics_data_hygiene_audit; MEMORY.md is at the 20KB limit — do an archive pass; mark CONTENT_SWEEPS_BACKLOG done-items.

## BLOCKED (owner input needed)
- **lead_value_scores backfill**: 20 override scores in `proposal_engine/score_overrides.py` ready to upsert; the prod DB write was denied by the permission classifier despite plan approval. Needs explicit owner OK in-session (or run `scripts/backfill_lead_value_scores.py`-style script himself). Resolution script pattern exists in this handoff's session transcript; keys in `Property/web/.env.local` (SUPABASE_SERVICE_ROLE_KEY).
- Analytics audit recommendations: all owner-sign-off gated (see report).
- R&D `merged-r-and-d-scheme-agency-2023` slug rename (default: keep slug, fix content only).

## Untouched / stays open (not this workstream)
Date-gated: agency 14d (07-22), nurture arming (07-26), ledger re-runs (~08-05), SERP meta (≥08-20). Owner-blocked list per plan. Property landlordTax.ts freeze. P3 candidates NOT in the 15-page list stay as-is.
