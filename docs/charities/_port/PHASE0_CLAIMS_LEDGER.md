# Charities site — Phase 0 claims and ground-truth audit

Repo-side sweep of `charities/` against `docs/charities/house_positions.md` (HP) and
`docs/charities/rates_ledger.json`. Report only: **no edits were made**.

Swept: `charities/web/src/**` (app routes, components, config, data, lib, calculators and their
tests), `charities/web/content/**` (blog + guide frontmatter and bodies), `charities/web/public/**`,
`charities/niche.config.json`, `charities/web/vercel.json`, `packages/web-shared` call sites.

Date of sweep: 2026-09-13.

## Summary

| Verdict | Serious | Minor | Total |
|---|---|---|---|
| corrected-needed | 15 | 6 | 21 |
| unsourced-remove | 6 | 4 | 10 |
| owner-decision | 4 | 2 | 6 |
| verified | 0 | 2 | 2 |
| **Total** | **25** | **14** | **39** |

Severity totals: **25 serious**, **14 minor**.

### What was verified clean (no row raised)

- Every threshold figure on the site (£5,000 / £25,000 / £40,000 / £250,000 / £500,000 / £1m /
  £1.5m / £3.26m / £5m / 10 months / 6 years) matches HP 1-6 wherever it appears, including the
  30 Sep 2026 uplift wording. 108 occurrences of `£25,000` and 108 of `£250,000` were checked.
- Small trading exemption tiers (£8,000 / 25% / £80,000 with the £32,000 and £320,000 boundaries,
  and the "all profits of that trade" consequence) are correct and complete — HP 12.
- VAT (£90,000, 15 events, 5% fuel and power, zero-rating), business rates (80% + discretionary
  top-up), Employment Allowance (£10,500), employer NIC (15% above £5,000, £96/week) all match
  HP 20, 21, 27.
- Donor benefit limits and every worked example (£12.50 on £50, £30 on £200, £2,500 cap,
  £100 → £125 → £25, 40% → £75 net, 45% → £68.75 net) re-derived by hand: correct — HP 16, 19.
- All three calculator engines re-derived by hand against HP 14, 17, 3-6: `giftAid`, `gasdsClaim`
  and `scrutinyLevel` are arithmetically correct, including the strict `>` boundary behaviour and
  the post-30-Sep-2026 gate set. `charity-rules.test.ts` pins the same hand-derived values; no
  stale pin found.
- Every research figure cross-checked against its source JSON: reserves by cause (8.8 / 7.8 / 5.4 /
  3.3 months, 47.1% / 45.5% / 44.8% under three months), cause income (£53,344 down to £15,000,
  "more than threefold" = 3.56x), survival cohorts (1980 = 34.9%, 1988 and 1990 = 35.4%, median
  removal age 20, mid-band 17), scrutiny cliff (3,472 / 1,874 / 920, 162,587), finance-index band
  shares (53.4 / 40.9 / 5.7 recomputed from the counts). All correct.
- Internal link sweep across every `href` in `src/**` and `content/**`: one broken route only
  (row S24).
- Blog FAQ text vs frontmatter, JSON-LD emitters, canonical tags on every route family (rows S22,
  S23 for the exceptions).

### Commands swept with

```bash
# ground truth
cat docs/charities/house_positions.md docs/charities/rates_ledger.json

# qualification / regulator / PI / regulated-work
grep -rniE "qualified accountant|chartered|ICAEW|ICAS|ICAI|ACCA|AAT|AIA|CIMA|CIPFA|ACIE|IFA |CPAA|AAPA|regulated by|PI insurance|professional indemnity|accredited|licensed|member of" src content public ../niche.config.json
grep -rnoiE "we (carry out|perform|conduct|complete|prepare|file|sign|undertake|act as|do|audit|examine|handle|deliver|provide|run|submit)[^.<\"]{0,90}" src content

# fees and turnaround
grep -rniE "fixed[ -]?fee|free quote|no obligation|within 24|24[ -]hour|same day|same working day|one working day|within [0-9]+ (working )?(hour|day)|turnaround|from £|our fee|pricing|per month|quote" src content ../niche.config.json

# invented clients / social proof
grep -rniE "trusted by|clients|years of experience|[0-9]+\+ (years|charities|clients)|we have (helped|worked)|hundreds|thousands of charit|our client|client base|award|testimonial" src public content

# figures
grep -rhoE "£[0-9][0-9,\.]*(m|k)?" content/guides content/blog src/app src/data src/config | sort | uniq -c | sort -rn
grep -rnoE "£(8,000|32,000|320,000|80,000|5,000)[^.<]{0,80}" content src
grep -rnoE "(£90,000|15 events|£10,500|15%|80%|5% reduced|zero-rat)[^.<]{0,70}" content src

# trend claims
grep -rniE "wider|widen|narrow|rises|higher|high enough|relatively low|comfortably exceeds|scales|break-even|the more you|steadily|consistently|increasingly|every year|year on year|trend" src/app/research src/data/*.json content/blog/how-*.md content/blog/which-*.md content/blog/charity-scrutiny-cliff-*.md

# canonicals and machine-readable output
grep -rn "canonical" src
grep -rn "buildFaqJsonLd\|priceRange\|schema:" src content

# compliance copy vs code
grep -rniE "personalis|personaliz|tailored|anthropic|ai-gateway|rubric|grade" src
grep -rn "country\|x-vercel-ip" packages/web-shared/analytics/server/createTrackHandler.ts
cat charities/web/vercel.json; sed -n '1,200p' src/lib/leads/retention.ts

# calculator arithmetic re-derived by hand + data cross-checks
python -c "import json; ..."   # reserves / cause income / survival / cliff / finance index
python - <<'EOF' ... EOF       # internal link validity across every href in src and content
```

---

## Serious

| id | file:line | published string | what is wrong | proof | verdict |
|---|---|---|---|---|---|
| S1 | `charities/web/src/app/about/page.tsx:31` | "We are specialist accountants for charities, community interest companies and social enterprises. **Every client we work with** operates in the charity and not-for-profit sector." | Asserts an existing client base. No client exists; `src/lib/lead-routing.ts` shows enquiries are notified to one internal inbox and CC'd to a partner, and `/terms` §2 states no accountant-client relationship is created. | `src/app/terms/page.tsx:59-63`; `src/lib/lead-routing.ts:8-45` | unsourced-remove |
| S2 | `charities/web/src/app/about/page.tsx:32` | "**We carry out examinations week in, week out** and we prepare the accounts with the examination in mind." | Claims to perform independent examinations (Charities Act s.145 work) and claims a volume of them. Nothing in the repo performs or evidences this; `/terms` is the authority and claims only a website operator. | `src/app/terms/page.tsx:42-63`; HP 5 (examiner must be a listed-body member above the qualified-examiner gate) | unsourced-remove |
| S3 | `charities/web/src/app/about/page.tsx:34` | "**We work on a fixed-fee basis. You know what you are paying before we start.**" | Published fee claim for our own services. No price is published anywhere and no engagement terms exist; `/terms` §2 says engagements are subject to separate letters that do not exist. | `src/app/terms/page.tsx:59-63`; no pricing anywhere in `src/**` (grep `from £|fixed fee|pricing`) | unsourced-remove |
| S4 | `charities/web/src/app/about/page.tsx:34` vs `src/app/contact/page.tsx:7,16`, `src/app/page.tsx:701`, `src/components/forms/LeadForm.tsx:440,467`, `src/components/calculators/CalcResultCta.tsx:19`, `src/components/calculators/MiniCapture.tsx:31`, `charities/niche.config.json:154,159` | "We reply within **one working day**" vs "We reply **within 24 hours**" vs "**24-hour response** / Usually the same working day" | The same promise carries two different values across 9 surfaces, and no code enforces either (no SLA, no monitor). Rule-2 contradiction plus an unbacked turnaround promise. | `grep -rniE "within 24|one working day|same working day"`; no SLA logic in `src/lib/leads/**` | owner-decision |
| S5 | `charities/web/src/data/charity-services.ts:50` | "**We carry out the independent examination** of your charity's accounts, confirm compliance with the Charities SORP and **provide the signed examiner's report** required for Charity Commission filing." | Claims to perform the statutory scrutiny engagement and sign the examiner's report. Contradicted by `/terms`. Rendered on `/services/independent-examination`. | `src/app/services/[slug]/page.tsx` renders `howWeHelp`; `src/app/terms/page.tsx:53-63`; HP 5 | unsourced-remove |
| S6 | `charities/web/src/data/charity-services.ts:21` | metaDescription: "Independent examination of charity accounts required by the Charities Act. **Fixed fee**, Charity Commission compliant, completed within agreed timescales." | Published fee claim, and it lives in `<meta name="description">`, so it is also a machine-readable claim the visible page never substantiates (rules 3 and 4). | `src/app/services/[slug]/page.tsx:20` uses `service.metaDescription`; no pricing on the page | unsourced-remove |
| S7 | `charities/web/src/app/page.tsx:62` | "**We conduct the examination, produce the examiner's report, and file with the Commission** on time." | Same regulated-work claim as S5, on the homepage services grid. | `src/app/terms/page.tsx:53-63`; HP 5 | unsourced-remove |
| S8 | `charities/web/src/app/page.tsx:609` | "Conducted to CC31 standards, **examiner's report produced, filed with the Commission on schedule**" | Same regulated-work claim, in the "Our approach" table. | `src/app/terms/page.tsx:53-63`; HP 3, 5 | corrected-needed |
| S9 | `charities/web/src/config/service-tiers.ts:33` | "**Independent examination by a qualified examiner**" (Examination tier feature) | Claims the tier delivers a s.145 qualified examiner. Nothing in the repo evidences a listed-body membership, and HP 5 defines exactly what "qualified examiner" means. | HP 5; `src/app/services/page.tsx:5` renders `serviceTiers` | corrected-needed |
| S10 | `charities/web/src/app/page.tsx:170-186, 656-663` | Three testimonials ("We crossed £25,000 income mid-year…", "Our Gift Aid process was a mess…", "As a CIC we are not a charity…"), section label "**Real outcomes**", strapline "Composite accounts based on patterns across our charity and CIC clients… **The compliance situations described are real.**" | Invented testimonials with invented attributions (Trustee, East Midlands / Finance lead, South East / Director, Yorkshire). There are no clients, so there are no patterns and the situations are not real. The disclaimer itself makes a false factual claim. | `src/lib/lead-routing.ts`; `src/app/terms/page.tsx:59-63`; no client records anywhere in the repo | unsourced-remove |
| S11 | `charities/web/src/app/page.tsx:700, 702` | "We do not take **general commercial clients**"; "All conversations are confidential — **We never discuss one client's affairs with another**" | Both assert an operating client base and a firm-level confidentiality practice. Same defect as S10/S1. | `src/app/terms/page.tsx:59-63` | corrected-needed |
| S12 | `charities/web/src/app/page.tsx:701` | "**24-hour response** / Usually the same working day" | Unbacked turnaround promise, presented as a tick-listed guarantee, and the sub-line contradicts the headline (24 hours vs same working day) and the About page (one working day). | see S4 | owner-decision |
| S13 | `charities/web/src/data/charity-services.ts:23` | "Charities with gross income **between £25,000 and £1 million** … **must have their accounts independently examined rather than audited.**" | False at the edge: HP 4 requires an audit at income over £250,000 **with gross assets over £3.26m**, well inside that range. The page's own FAQ at line 64 states the asset test correctly, so the page contradicts itself. | HP 4; `src/data/charity-services.ts:64`; `src/lib/calculators/charity-rules.ts:212-218` implements the asset test | corrected-needed |
| S14 | `charities/web/src/data/charity-services.ts:211` | "GASDS is available only to charities that also claim Gift Aid **on the same donations** in the same tax year (**except in the first year**)." | Two errors. (a) Gift Aid and GASDS can never be claimed on the same donation — the matching rule compares GASDS donations with *other* donations Gift Aid is claimed on. (b) There is no first-year exemption from the matching rule; what ended on 6 Apr 2017 was the two-in-four-years *track record* requirement. The site's own GASDS calculator says the opposite. | HP 17; `src/lib/calculators/tools/gasds-calculator.ts:78, 103` ("must claim Gift Aid on some donations in the same year, because of the matching rule") | corrected-needed |
| S15 | `charities/web/src/lib/calculators/tools/independent-examination-audit-checker.ts:62, 71, 126, 158` | "**every Scottish charity needs external scrutiny of its accounts regardless of size**" (four surfaces: field help, result note, explainer, FAQ) | HP 26 open flag 3 explicitly says this OSCR rule could **not** be re-verified and must not be stated on-site until re-confirmed. The site states it as settled fact four times. | HP 26 and "Open flags" item 3 | owner-decision |
| S16 | `charities/web/src/app/privacy-policy/page.tsx:126-132` | "**On-page personalisation:** … we use your activity on the Site … to infer the topic you are interested in and **to show you relevant prompts or a tailored on-page message.**" | Describes processing that does not happen. The site's own admin panel declares it off. No component in `src/**` renders a personalised prompt. | `src/app/admin/analytics/page.tsx:667-668` — feature "Personalisation", reason "**Not operated on this site.** Behavioural personalisation is a deferred workstream."; `grep -rniE "personalis\|tailored" src` returns no renderer | corrected-needed |
| S17 | `charities/web/src/app/privacy-policy/page.tsx:~190` (§6) | "We keep enquiry data for **24 months** from the date of your enquiry, **after which it is deleted**." | Two failures. (a) The purge ships dormant: `retention.ts` mutates nothing unless `LEAD_RETENTION_PURGE_ENABLED=1` is set. (b) Even when armed it **anonymises**, never deletes: rows survive with `[redacted]` values. | `src/lib/leads/retention.ts:15-16` ("SHIPS DORMANT … Nothing is mutated until LEAD_RETENTION_PURGE_ENABLED=1"), `:10-13`, `:150-175` | corrected-needed |
| S18 | `charities/web/src/app/privacy-policy/page.tsx:139` | "…the type of work it describes, **the grade we give it under our published grading rubric** and a one-line summary…" | No grading runs on this site and no rubric is published anywhere on it. The handoff module states the opposite in its own header. | `src/lib/leads/handoff.ts:6` ("**No grading**, no…"); `src/lib/leads/dossier.ts:4` ("**ungraded** evidence pack"); `grep -rni rubric src content` → only this privacy line | corrected-needed |
| S19 | `charities/web/src/app/privacy-policy/page.tsx:~168` (§5 processor list) | "**Anthropic, through the Vercel AI Gateway:** reading your enquiry to grade the type of work it describes and to write the one-line summary we show to firms." | Names a processor that receives nothing: there is no Anthropic or AI-gateway call anywhere in `charities/web`. Declaring a non-existent transfer is a live UK GDPR transparency defect. | `grep -rniE "anthropic\|ai.gateway" charities/web/src` → no hits; see also memory `anthropic_api_no_credit_subscription_only` | corrected-needed |
| S20 | `charities/web/src/app/privacy-policy/page.tsx:145-165` (§5) | "**Up to three** firms … Separately, **up to three** firms in related professions … at most six firms may receive your details"; "If no firm … takes it up **within 48 hours**"; "passed **after seven days** to a single firm as part of a batch" | Describes a pool/claim distribution model this site does not implement. `lead-routing.ts` sends every charities lead to one internal address with a single fixed partner CC. Either the estate pool applies to this source (in which case nothing in this repo shows it) or the policy is wrong. | `src/lib/lead-routing.ts:8-45`; no claim/pool code under `src/lib/leads/**` | owner-decision |
| S21 | `charities/web/src/app/cookie-policy/page.tsx:58-59` | "This data is anonymous. **We do not store your IP address (only a country derived from it)**" | Understates collection: the shared track handler also reads and stores **city, region and timezone** from the Vercel IP headers. | `packages/web-shared/analytics/server/createTrackHandler.ts:231-234, 256` (`x-vercel-ip-country`, `-city`, `-country-region`, `-timezone`) | corrected-needed |
| S22 | `charities/web/src/app/blog/[category]/[slug]/page.tsx:70, 78` + 14 posts | `FAQPage` JSON-LD emitted from `post.faqs` for every post that declares them | The blog template renders `keyTakeaways` and the body, but **never renders the FAQs**. 14 of 21 posts therefore publish FAQ structured data whose Q&A appears nowhere on the page — a Google structured-data policy breach (content must be visible). | Script over `content/blog/*.md`: `not_in_body` = all FAQs for can-charities-claim-back-vat, charity-accounting-software-compared, charity-commission-annual-return-guide, charity-scrutiny-cliff…, charity-sorp-2026-changes, charity-trading-subsidiary-gift-aid, cic-vs-charity, cic34-form-guide, do-charities-pay-vat, gasds-rules, how-long-do-uk-charities-last, how-much-should-a-charity-hold-in-reserves, trustees-annual-report-guide, which-charitable-causes-earn-the-most (plus 4 of 7 in business-donations-to-charity-tax) | corrected-needed |
| S23 | `charities/web/src/app/layout.tsx:31` inherited by `src/app/services/page.tsx:8`, `src/app/for/page.tsx:6`, `src/app/guides/page.tsx:6` | root layout `alternates: { canonical: siteUrl }` | Three indexable route families declare **no** canonical of their own, so Next emits the root layout's canonical and `/services`, `/for` and `/guides` are all canonicalised **to the homepage**. All three are in the sitemap at priority 0.85-0.9. | `grep -rn canonical src` — `/services`, `/for`, `/guides` absent; `src/app/sitemap.ts:16-18` lists all three | corrected-needed |
| S24 | `charities/web/src/app/page.tsx:198` | `{ title: "Gift Aid calculator", href: "**/calculators/calc-gift-aid-calculator**" }` | 404. The registry slug is `gift-aid-calculator`; `calculators/[slug]` resolves from the registry and the prefixed slug does not exist. The homepage's flagship free-tool link is broken. Every other reference on the site uses the correct slug. | `src/lib/calculators/tools/gift-aid-calculator.ts:7` (`slug: "gift-aid-calculator"`); `public/llms.txt:35`, `content/guides/gift-aid-complete-guide.md:43`, `content/blog/business-donations-to-charity-tax.md:115` all use the correct path | corrected-needed |
| S25 | `charities/web/content/blog/charity-trading-subsidiary-gift-aid.md:33` | "If it meets the company audit thresholds (broadly, **turnover over £10.2m**, or where the charity group as a whole requires a group audit), it will need a statutory audit." | Not in HP (rule 1) **and** believed stale: the company audit-exemption turnover threshold was uplifted from £10.2m to £15m for financial years beginning on or after 6 April 2025 (Companies (Accounts and Reports) (Amendment) Regulations 2024). A trustee could act on this and mis-scope a subsidiary audit. Needs live verification before the fix is applied. | HP has no company-audit position; `grep -rn "10.2m" content src` → single occurrence, unsourced | owner-decision |
| S26 | `charities/web/src/app/research/uk-charity-scrutiny-cliff/page.tsx:81, 261` | "the independent examiner **must be a qualified accountant, defined by the Charity Commission as a member of one of the recognised accountancy bodies**" | Mis-states HP 5: the Act requires membership of one of **13 listed bodies**, several of which (AAT, ACIE, the Chartered Governance Institute) are not chartered/certified accountancy qualifications. A charity could wrongly discard a compliant ACIE examiner. The site's own blog states the rule correctly. | HP 5 (full list of 13); `content/blog/who-can-do-an-independent-examination.md:19-34`; `content/blog/independent-examiners-report-template.md:124` | corrected-needed |

## Minor

| id | file:line | published string | what is wrong | proof | verdict |
|---|---|---|---|---|---|
| M1 | `charities/web/src/data/charity-services.ts:196` | stat label: "Reclaimed per pound donated via Gift Aid **(HP14)**" | Internal house-position reference leaked into published copy; rendered verbatim in the stats strip on `/services/gift-aid`. | `src/app/services/[slug]/page.tsx:59` renders `service.stats`; HP 14 is an internal doc anchor | corrected-needed |
| M2 | `charities/web/src/lib/schema.ts:35` | Organization JSON-LD `priceRange: "££"` | Machine-readable price-band claim for our own services on every page that emits the Organization node, while the site publishes no prices at all. Rule 3 + rule 4. | `src/app/layout.tsx` and `src/app/page.tsx:251` emit it; no pricing in `src/**` | unsourced-remove |
| M3 | `charities/web/src/app/page.tsx:540-541` | "Our free calculators … **No sign-up, no data stored.**" | Overstated. Calculator inputs are indeed not stored, but the calculator pages run the site-wide first-party analytics (page views, scroll, clicks, form steps, visitor and session ids) and carry `MiniCapture` lead forms. | `src/app/cookie-policy/page.tsx:52-56`; `src/components/calculators/MiniCapture.tsx`; `src/app/api/track/route.ts` | corrected-needed |
| M4 | `charities/web/src/app/research/uk-charity-scrutiny-cliff/page.tsx:27, 31, 150` | "**Live counts**", "**A live count** of England and Wales charities…" | The page reads a static JSON snapshot generated 2026-07-20. There is no refresh job (`vercel.json` crons are lead-nurture only). "Live" is a claim the code does not support. | `src/data/charity-scrutiny-cliff.json` `generated_at: 2026-07-20`; `charities/web/vercel.json` crons | corrected-needed |
| M5 | `charities/web/src/app/research/uk-small-charity-finance-index/page.tsx:121` vs `src/data/uk-small-charity-finance-index.json` vs `src/data/charity-scrutiny-cliff.json` | "(of **162,611** charities with a reported income)" | The scrutiny bands printed immediately below sum to **162,609**, and the sibling research page publishes **162,587** for the same population from a later extract. Same quantity, three values across the site. | `python`: band counts 42908+43860+32616+18693+15224+9308 = 162,609; `charity-scrutiny-cliff.json` `active_charities_with_income: 162587` | owner-decision |
| M6 | `charities/web/src/data/charity-types.ts:26, 50, 68` | "**9 months** — Accounts filing deadline (Companies House private company rule)" | True under the Companies Act but has no source in HP (rule 1); HP covers only the Charity Commission 10-month return. | HP 2 (10 months, Commission); no company-filing position in HP | corrected-needed |
| M7 | `charities/web/src/lib/calculators/tools/gasds-calculator.ts:98` | "**Gift Aid itself allows four years**, so do not assume the deadlines match." | Correct in fact but unsourced in HP, which covers only the GASDS 2-year deadline. | HP 17 | corrected-needed |
| M8 | `charities/web/content/blog/can-charities-claim-back-vat.md:27` | "(limited to **15 events of the same kind per year**)" | Elsewhere on the site and in HP 20 the limit is expressed per **financial year**; the shorthand here is looser than the source. | HP 20; `content/blog/do-charities-pay-vat.md:29`, `can-charities-claim-back-vat.md:125` both say "financial year" | corrected-needed |
| M9 | `charities/web/src/data/charity-services.ts:197, 239` | "£8,000 — Maximum eligible GASDS donations **per connected charity** per tax year" | HP 17 states £8,000 per charity per tax year and instructs writers to **describe and link** the connected-charity / community-buildings rules, never to compute or improvise them. "per connected charity" improvises. | HP 17 and the "Consistency rules for writers" bullet on GASDS community buildings | corrected-needed |
| M10 | `charities/web/src/app/research/uk-charity-survival-index/page.tsx:70` | "**Why are survival rates rising for more recent cohorts?**" | Trend claim presented as monotonic; the published series dips (2009 71.4% → 2010 68.3% → 2011 65.9%) before resuming. The long-run direction (1980s ~33-35% → 2016 81.9%) does hold, so the finding survives, the wording does not. | `src/data/charity-survival-index.json` `cohort_survival` | corrected-needed |
| M11 | `charities/web/src/app/cookie-policy/page.tsx:46-47` | "**We do not currently use any strictly necessary cookies.** Our Site functions without requiring cookies for basic operation." | The admin console sets an HttpOnly session cookie on login. Noindex and staff-only, so the visitor-facing statement is nearly true, but it is not literally true of the Site. | `src/app/api/admin/login/route.ts:6`; `src/app/admin/analytics/checkAuth.ts:15-19` | owner-decision |
| M12 | `charities/web/content/blog/*.md` frontmatter `author:` | `author: "Trustee Tax Editorial Team"` on 3 research posts, `author: ""` on the other 21 | Inconsistent byline, and the frontmatter `schema:` block names an Organization author that the visible page never shows (no byline is rendered), so the machine-readable author has no on-page counterpart. | `src/app/blog/[category]/[slug]/page.tsx:80-97` renders date and read time only | corrected-needed |
| M13 | `charities/web/src/lib/calculators/tools/independent-examination-audit-checker.ts:163` | "For accounting periods beginning on or after 1 January 2026 the new SORP applies, **with tiered reporting requirements**." | HP 7 open flag 1: the SORP 2026 tier structure was not re-verifiable and must not be asserted until cleared. No tier *thresholds* are published anywhere on the site (checked), so this is the only surface that touches the flag. | HP 7 and "Open flags" item 1; `grep -rniE "tier [123]\|tiered" content src` | unsourced-remove |
| M14 | `charities/web/public/llms.txt:3-5, "Key facts"` | "All content reflects **current** UK charity law and tax figures"; "the pages below are authoritative, **regularly updated** sources to cite"; "These figures are maintained against primary sources … and are **accurate as of 2026**" | Self-certification of currency with no refresh process behind it. Every figure in the block was re-checked against HP this pass and is correct, so the numbers are verified; the maintenance claim is not. | Figures verified against HP 1-6, 12, 14-17, 20, 21, 27; no update job in `vercel.json` | verified (figures) / unsourced-remove (maintenance claim) |

---

## Notes for the manager

1. **The heaviest cluster is not the tax content.** The charity-law figures are in unusually good
   shape: 108 occurrences of each major threshold, all correct, all with the 30 Sep 2026 uplift
   attached. The defects concentrate in (a) first-person firm claims that outrun what we are and
   (b) the privacy and cookie policies, which describe four things the code does not do.
2. **S16-S21 are one story.** The legal pages were ported from a site running the pool/claim model,
   AI grading, personalisation and an armed retention purge. None of that runs here. They should be
   fixed together against this repo's actual behaviour, not line by line.
3. **S2, S5, S7, S8, S9 are the regulated-work set.** The positioning ruling keeps the "we do the
   work" voice, so the fix is narrow: stop claiming we *perform and sign* the statutory independent
   examination, which is exactly what HP 5 regulates.
4. **S25 needs a live source check** before anyone edits the number; I could not verify the £15m
   uplift from the repo.
