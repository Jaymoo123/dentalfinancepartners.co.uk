# Medical site: live defects (Phase 0)

Read-only sweep, 2026-09-10. Nothing was fixed. Site: `Medical/web`. Reference: `Property/web`.
Ground truth: `docs/medical/house_positions.md` (currency pass 2026-08-26).

All line numbers are from the working tree at the time of the sweep. All paths relative to
`Medical/web/` unless stated.

---

## 1. Defect table

Ordered most severe first. False statements to a visitor and broken links outrank cosmetics.

| # | file:line | what it says or does | why that is wrong | severity | minimal fix | owner's word? |
|---|---|---|---|---|---|---|
| 1 | `src/components/tools/premium/ResultGateModal.tsx:133-134` | `messageMinLength={40}` `messageMinWords={8}` on the `calc_result_gate` capture | This is the site's strictest message floor, on the one surface where the visitor is mid-task waiting for a number. Site-wide default is 20 chars / 4 words (`packages/web-shared/leads/capture-steps.ts:16-17`); `/contact`'s `LeadForm.tsx:74` makes the message OPTIONAL entirely. Live: 6 `form_start`, 6 `form_error`, 0 `form_submit` (2026-08-23 to 2026-09-10). `ft.onSubmit` is only reached at `MiniCapture.tsx:313` after step 1 AND step 2 validate, so a step-1 message-floor rejection makes `form_submit` structurally impossible. Six for six. | live-conversion-failure | drop the two overrides so the gate inherits 20/4, matching every other capture on the site | **yes** |
| 2 | `src/lib/tools/configs/doctor-expenses-tax-relief.ts:214` (and the comment at `:29`) | "The standard full-rate annual retention fee is **£481** from 1 April 2026 (up from £463)" | `house_positions.md` §8 / §10 / verification log: the GMC fee is **UNVERIFIED**, the previous "around £433" was **REMOVED as unsupported**, and the rule is explicit: "**No page may state a specific GMC fee figure until a human reads the GMC fee regulations directly.**" Secondary sources put it at £406-£408, so £481 is also probably wrong by ~£75. Published on a calculator that computes relief from it. | live-false-statement | delete both figures; say the GMC retention fee is deductible and point to gmc-uk.org | **yes** (owner or a human must read the GMC regs) |
| 3 | `src/lib/tools/configs/locum-tax-calculator.ts:106` | "Class 2 NI is around **£3.70 per week** (approximately £192/year) ... **usually collected via your self-assessment return** along with Class 4. Class 2 is being phased out but is **still payable in 2025/26**." | `house_positions.md` §8: "**Class 2 is no longer a required payment from 6 April 2024**", and the writing rule says in terms "**do NOT tell a self-employed doctor to pay a weekly Class 2 charge**". The £3.70 is also wrong: voluntary Class 2 is **£3.65/wk for 2026/27**. Tells a locum to budget and pay a charge that does not exist. | live-false-statement | rewrite to: Class 2 is treated as paid at/above the Small Profits Threshold from 6 Apr 2024; voluntary Class 2 is £3.65/wk (2026/27) | no |
| 4 | `src/lib/medical-guides-data.ts:211` | "Dividends are taxed at lower rates than employment income (**8.75% basic, 33.75% higher rate for 2025/26**)" — inside the live sole-trader vs limited-company comparison a locum uses to decide | `house_positions.md` §5 / line 340-342: 2026/27 is **10.75% / 35.75% / 39.35%**, live now. The rule: "for current advice use 10.75% / 35.75%" and "treat 8.75% / 33.75% as historic". The year tag does not save it, because the figure is doing current-advice work in a decision guide. | live-false-statement | swap to 10.75% / 35.75% (2026/27) | no |
| 5 | `src/app/blog/gp-accountant-services/page.tsx:181,182,188` | "£600–£1,200 per year"; "GP partners typically pay more — £1,500–£3,000 per partner"; "usually range from £5,000 to £15,000" — a full published fee schedule for the service this site sells | Breaches the locked no-pricing rule, including comparative claims and price ranges. This is the same defect that cost the Solicitors port (`from GBP180/month`). It also carries an aggregate-performance claim at :189-191 ("the tax savings and pension optimisation a specialist delivers **routinely exceed the premium**") and a client-behaviour assertion ("GP partners **typically pay** more"). | banned-claim | delete the fee section; keep the "what drives complexity" framing without numbers | **yes** |
| 6 | `src/lib/tools/configs/incorporation-calculator.ts:124` | "Accountancy fees are **typically £1,500 to £3,000 per year** for a small medical company" | Same rule. Live inside a calculator FAQ, feeding a decision about buying our service. | banned-claim | remove the range; say fees are a real cost to model | **yes** |
| 7 | `src/app/blog/incorporation-and-company-structures/page.tsx:188` | "Legal, accounting and valuation fees ... commonly range from **£15,000 to £30,000**" | Same rule. Third-party framing does not exempt it: accounting is our service. | banned-claim | remove the range | **yes** |
| 8 | `src/app/contact/page.tsx:13,17,24,73,79,90` | Metadata: "**24-hour response**" / "24-hour response time" (x3); body: "we will respond **within one working day**", "Response time: **Within 24 hours, typically same working day**", "We'll review your enquiry and respond **within 24 hours**" | Six turnaround promises on one page, three of them in metadata so they appear in the SERP. Banned outright by the locked rules (the identical defect was found on Solicitors' `/contact`). Also **false under the pool model**: the privacy policy (`privacy-policy/page.tsx:127-155`) says the enquiry goes to up to six independent partner firms who contact the visitor, and that a firm may take 48 hours or seven days to pick it up. We do not respond. | live-false-statement + banned-claim | delete all six; replace with what actually happens ("a specialist firm will be in touch") | **yes** |
| 9 | `src/app/page.tsx:186,552,574`; `src/components/blog/InlineMiniLeadForm.tsx:20`; `src/components/tools/premium/ResultGateModal.tsx:130` | "Enquiries sent through this site get a **reply within one working day**"; "We respond within one working day" (x2, homepage); "will reply **within 24 hours**"; "we will be in touch **within one working day**" | Same rule, same falsity, five more surfaces including the homepage twice and the success message of the result gate. Fixing only `/contact` would move the problem rather than fix it (Solicitors trap: our own pricing was "in two places", then turned out to be fifteen). | live-false-statement + banned-claim | delete all five | **yes** |
| 10 | `src/app/cookie-policy/page.tsx:57` | "**IP addresses are anonymized.** Data is retained for 14 months." | There is **no** `anonymize_ip` / `anonymizeIp` anywhere in `Medical/web/src` or `packages/web-shared` (grep returns zero). GA4 has no such site-side setting to claim. The site's own privacy policy at `privacy-policy/page.tsx:81` says the opposite: "an approximate country **derived from your IP address**". The 14-month figure is a GA4 property setting no page can evidence. T18: a notice that overstates reality is the defect. | live-false-statement | delete both sentences, or state the GA4 retention setting only after reading it in the GA4 admin | **yes** |
| 11 | `src/app/cookie-policy/page.tsx:47-53` | Lists GA cookies as `_ga`, **`_gid`**, **`_gat_gtag_*`** | `_gid` and `_gat_gtag_*` are Universal Analytics cookies. The site runs **GA4 only** (`G-CQF7KFZ1P6`, mounted once at `layout.tsx:114`), which sets `_ga` and `_ga_CQF7KFZ1P6`. So the policy names two cookies that are never set and omits the one that is. Exactly the T18 shape found on the pilot. | live-false-statement | replace with `_ga` and `_ga_CQF7KFZ1P6` | no |
| 12 | `src/app/cookie-policy/page.tsx:37-38` | "We do **not** currently use any strictly necessary cookies. Our Site functions **without requiring cookies for basic operation**." | Technically true of *cookies*, but the page is titled "cookies **and similar technologies**" and the site writes a persistent `visitor_id` to localStorage, a `session_id` to sessionStorage, the consent state, and five `ma_*` visit-memory keys (`packages/web-shared/analytics/ids.ts:4-5,81,105,121`, `visitMemory.ts:11-18`, `consent.ts:38,77`). None of it is disclosed anywhere on the site. PECR reg 6 covers storage as well as cookies. Understating reality is a defect in the same way as overstating it. | live-false-statement (by omission) | add a short "local storage we use" list naming the `ma_*` keys and the consent record | **yes** |
| 13 | `src/config/site.ts:8` | `const office = niche.company.registered_office;` — unguarded | Property guards the identical read: `Property/web/src/config/site.ts:23` `const office = (company.registered_office ?? {}) as Partial<...>`. The unguarded form produced **7 production `client_error` rows on Solicitors** from partial chunk loads. Same code, same exposure. | live-error | mirror Property's `?? {}` guard | no |
| 14 | `src/components/layout/SiteHeader.tsx:91-99` and `:191-200` | `data-cta="header_nav_secondary"` and `data-cta="header_mobile_secondary"`, both inside `{activeCta.header_secondary ? ... : null}` | `header_secondary` is an **optional** field on the type (`packages/web-shared/lib/niche-config.ts:29`) and is **not defined in `Medical/niche.config.json` for either variant**. The guard is therefore always falsy, both branches render `null`, and both ids **cannot fire**. The header ships with no secondary CTA at all, live. | dead-code + CRO gap | either define `header_secondary` in the config or delete both dead branches | **yes** (which of the two) |
| 15 | `src/app/page.tsx:541-550` | `data-cta="home_cta_secondary"` inside `{activeCta.home_cta.secondary ? ... : null}` | The live `leadgen` variant's `home_cta` defines `primary` only; `secondary` exists only in the dormant `packages` variant. So the homepage closing CTA renders **one** button where the code implies two, and the id **cannot fire**. | dead-code + CRO gap | add a `secondary` to the leadgen `home_cta`, or delete the branch | **yes** |
| 16 | `src/components/tools/premium/PremiumBarChart.tsx:93` + `:101` | Wrapper `<div aria-hidden="true">` containing an `<svg role="img" aria-label="Bar chart comparing values across groups">` | The `aria-hidden` parent removes the entire chart from the accessibility tree, so the `role="img"` label never reaches anyone either. The chart is the payoff of the premium calculator (`PremiumCalculator.tsx:643`) and there is **no** adjacent data table or text alternative in the result panel. A screen-reader user gets the headline card and the workings but zero access to the comparison. Note (T16 caveat applied): the `role="img"` is *not* the live defect here because the parent already hides it; the defect is that the values are unreachable by any route. | a11y | drop the wrapper `aria-hidden`, `aria-hidden` the decorative `<rect>`s, and render the series values as visible text or a `<table>` | no |
| 17 | `src/lib/medical-guides-data.ts:257` | "**Most doctors we onboard** are under-claiming expenses." | Client-behaviour assertion about our own client base, banned by the locked rules. Also unevidenced. | banned-claim | "Expense under-claiming is common among doctors" or delete | no |
| 18 | `src/config/lead-nurture.ts:473` | "**Most doctors we speak to** came to us with the same question you raised" | Same rule, and this one goes out in an outbound nurture SMS/email, not just on the page. | banned-claim | rewrite without the client-behaviour claim | **yes** (it is outbound copy) |
| 19 | `src/lib/medical-guides-data.ts:232` and `src/components/health-check/MedicalHealthCheckWizard.tsx:93` | "A limited company **saves approximately £5,000-£15,000 annually** for locums earning £80,000-£150,000"; "a limited company **can save £5,000 to £15,000 per year**" | Aggregate-performance / savings claim, banned by the locked rules, and not derivable from `house_positions.md` (which explicitly says: "Do NOT present incorporation as a clear tax win at typical private-income levels in 2026/27", line 354). The house position and the site copy point in opposite directions. | banned-claim + unsourced | replace with "the saving depends on your numbers; model it" and pair with the pension-accrual loss as §2.C requires | no |
| 20 | 53 lines across 10 user-facing files (full list in §2) | Em-dashes in rendered copy, e.g. `blog/gp-tax-and-accounts/page.tsx` (14), `blog/private-practice/page.tsx` (11), `blog/incorporation-and-company-structures/page.tsx` (8, incl. 3 in `metadata.description`), `blog/gp-accountant-services/page.tsx` (8), `blog/gp-practice-management/page.tsx` (7), `about/page.tsx` (5), plus `Medical/niche.config.json` `cta.variants.leadgen.home_cta.body` ("locum doctors—our GP accountants"), which renders on the **homepage** | Locked rule: no em-dashes in user-facing copy. `house_positions.md:11` states it for this site specifically: "No em-dashes anywhere (commas, parentheses, full stops, middle dots only)." Several are inside `metadata.description`, so they appear in search results. | banned-claim (style rule) | replace with commas, parentheses or full stops; do NOT touch en-dashes in numeric ranges (`£600–£1,200`) | no |
| 21 | `src/app/about/page.tsx:54,62,63`; `src/app/locations/[slug]/page.tsx:62,81,85,100,123,138`; `src/app/nhs-pension/page.tsx:307`; `src/app/blog/nhs-pension-planning/page.tsx:372`; `src/app/cookie-policy/page.tsx:57`; `Medical/niche.config.json` leadgen `home_cta.body` | American spellings in rendered copy: `recognize`, `specialize`, `optimization` (x8), `minimize` (x2), `anonymized` | British English is a locked rule. The `locations/[slug]` hits multiply across every location page. The niche-config one is on the homepage. | banned-claim (style rule) | `recognise`, `specialise`, `optimisation`, `minimise`, `anonymised` (defect 10 deletes the last one anyway) | no |
| 22 | `src/components/analytics/GoogleAnalytics.tsx` (whole file, 28 lines) | A local GA4 mounting component | **Zero importers.** Derived by: `grep -rn "GoogleAnalytics" src ../../packages` — the only hit inside `Medical/web/src` is `layout.tsx:92`, which is a **comment** saying the unconditional copy was removed. The live GA4 mount is `packages/web-shared/analytics/react/GoogleAnalytics.tsx` via `ConsentedScripts` at `layout.tsx:114`. This is the T5 shape: a per-site fork of a shared component, kept alive by a comment. Dangerous because a future "fix GA consent" edit would land here and change nothing. | dead-code | delete the file | no |
| 23 | `src/components/ui/accordion.tsx`, `src/components/ui/layout-utils.ts` (accordion only) | Zero importers | Derived by: for each file in `src/components/ui`, `grep -rl "components/ui/<name>"` over `src`. `accordion.tsx` = 0. (`layout-utils.ts` scored 0 on that pattern but is imported via the `@/components/ui/layout-utils` path and IS live — recorded here so the next reader does not delete it. This is the construction-cis lesson: derive the verdict, do not read the filename.) | dead-code | delete `accordion.tsx` only; leave `layout-utils.ts` | no |
| 24 | `src/app/contact/page.tsx:53` | `href="/pricing"` | `/pricing` has no route. It resolves only through a 308 in `next.config.ts:31-35` to `/services`. An internal link should point at the destination. Not a 404 (unlike Solicitors' `/resources`), so severity is low. Note this link sits inside the `isPackagesMode(niche)` branch, which is **dormant** (see §4). | broken-link (soft) | point it at `/services` | no |
| 25 | `src/app/contact/page.tsx:51` | "Our fixed monthly plans **start at £29 a month**"; and `Medical/niche.config.json` `cta.variants.packages` carries "See plans from £29/mo", "Fixed monthly plans from £29", "Plans start at £29 a month for locum self assessment and £59 for locums with a limited company" | Our own pricing, in five places. **NOT LIVE**: `Medical/niche.config.json` has `cta.variant: "leadgen"`, so `isPackagesMode()` is false and none of it renders today. Recorded as a latent breach, not a live one: flipping the CTA variant would publish our price list in one commit. | banned-claim (latent) | strip the £ figures from the `packages` variant so the switch is safe to throw | **yes** |
| 26 | `Medical/web/src/app/contact/page.tsx:98` | "Clear recommendations with **fixed-fee quote** if you choose to proceed" | Fee framing with no number, so it is not a pricing breach, but under the pool model we do not quote: partner firms do. Borderline live-false-statement. | live-false-statement (minor) | reword to what the partner firm does | **yes** |
| 27 | infra | `deploy_watch` row `medical_fixwave`, dated 2026-07-06, gate 14, status `skipped`, **never evaluated** | Recorded per manager. Root cause already verified upstream: `Property/web/src/app/api/cron/deploy-watch/route.ts:100` hardcodes `site_key: "eq.property"`, so deploy-watch cannot read Medical rows at all. The Medical row has sat unevaluated for over two months and will stay that way. | dead-monitor | out of scope for the port; either delete the row or parameterise the site_key | **yes** |

---

## 2. Per-rule sweep proof

**Representation caveat (T6), established before any search.** The first probe,
`grep -rlP '\xc2\xa3' src content`, returned **0 files** — a false negative from `-P` byte
matching in this shell, not a clean tree. Re-probed with the literal character:
`grep -rl "£" src content | wc -l` → **142 files**. Additional probes for
`£` (JSON unicode escape, the Solicitors/Generalist trap form) → **0 files**, and
`&pound;` → **0 files**. **Conclusion: on this site the pound sign is stored as the literal
character everywhere, so a literal grep is sound here.** Every money sweep below used the
literal `£`. The generalist trap does not apply to Medical, but it had to be proved, not assumed.

Scope for all sweeps: `Medical/web/src`, `Medical/web/content`, `Medical/niche.config.json`.
`.test.ts` files excluded from banned-claim rules (not user-facing).

### Rule: no pricing for our services, incl. comparative claims and price ranges
Pattern: `(from |starting at |starts at )£|£[0-9,]+ ?(/|per )(mo|month|year|annum|hour)|priceRange|"price"|[0-9]+ ?- ?£|£[0-9,]+ ?(–|-|to) ?£[0-9,]+|fixed (monthly )?fee|monthly fee|our fees?|fee structure|per month`
**Hits after excluding statutory/third-party figures: 5.** Defects 5, 6, 7, 25 (x2 files).
`priceRange` in structured data: **0 hits** (`grep -rn priceRange src` → empty), so the
Generalist's structured-data defect does not recur here.
`src/config/service-tiers.ts` was read in full: **no £ figures**, tiers are named not priced.

### Rule: no contingent or no-win-no-fee offers
Pattern: `no win|no fee|contingent|success fee|only pay if|free unless`
**Hits: 0 breaches.** All matches are (a) `no fetch` in compute-file header comments, or
(b) legitimate technical uses of "contingent" — contingent liabilities in partnership accounts
(`gp-partnership-last-man-standing-premises-risk.md`), contingent decisions in the McCloud
remedy (`mccloud-remedy-nhs-pension-doctors-explained.md`), and contingent consideration in a
practice sale (`accountants-for-vets-veterinary-practice-tax.md`). Each read in context. Clean.

### Rule: no turnaround promises
Pattern: `same[- ]day|within (24|48|72) hours|next working day|turnaround|fast(er)? response|respond within|get back to you within|24 hours|48 hours|quick(ly)? turn`
**Hits: 11 breaches across 5 files.** Defects 8 and 9. Non-breaches excluded after reading each
in context: `_gid` cookie lifetime, cron-job windows, nurture health thresholds, the
privacy-policy's 48-hour *pool re-offer* disclosure (that one is a factual disclosure about
partner firms, not a promise to the visitor), and "read the same day" in research-page source
notes.

### Rule: no client-behaviour assertions
Pattern: `most (of our )?clients|our clients (typically|usually|often|prefer)|clients (typically|usually|prefer|tell us)|most (doctors|GPs|practices|businesses) (we|qualify)`
**Hits: 3 breaches.** Defects 17, 18, and "GP partners typically pay more" inside defect 5.

### Rule: no client-count or aggregate-performance claims
Pattern: `[0-9]{2,}\+? (clients|practices|doctors|GPs|customers)|we('ve| have) (saved|helped) [0-9]|saved (our )?clients|trusted by|join [0-9,]+|over [0-9,]+ (clients|doctors|practices)|routinely exceed|typically save|save[sd]? (approximately |around )?£`
**Hits: 3 breaches.** Defect 19 (x2) and "routinely exceed the premium" inside defect 5.
**Client counts specifically: 0 hits** — no "500+ practices" style claim anywhere. The other
matches are statutory arithmetic in blog posts (uniform flat rates, salary-vs-dividend), read
and cleared.

### Rule: no "most businesses qualify" framing
Pattern: `most businesses qualify|most (people|clients|doctors|practices) qualify|you('ll| will) probably qualify|most .{0,20} are eligible`
**Hits: 0.** Clean.

### Rule: British English, no em-dashes
Em-dash (U+2014) in user-facing files: **57 lines**, of which **53** are rendered copy
(4 excluded after reading: `calculators/[slug]/page.tsx:92` and `embed/[slug]/page.tsx:31` are
JSX comments, `layout-utils.ts` and `robots.ts` are code comments). Defect 20.
Command: `grep -rn '—' src/app src/components src/lib/medical-guides-data.ts src/lib/tools/configs src/lib/tools/premium/configs src/config content` filtered for comment lines.
En-dashes in numeric ranges were **not** counted (allowed by the rule); verified by reading
`£600–£1,200` at `gp-accountant-services/page.tsx:181`, which is U+2013 and correct.
American spellings: **15 lines** in rendered copy. Defect 21.

### Rule: every figure re-derivable from house_positions.md, within scope
Cross-checked the money and rate figures surfaced by the £ sweep against
`docs/medical/house_positions.md`. **4 failures**: defects 2 (GMC £481), 3 (Class 2 £3.70 +
"still payable"), 4 (dividend 8.75/33.75 as current), 19 (£5,000-£15,000 saving, contradicts
line 354). Figures checked and **confirmed correct** are listed in §3.

---

## 3. Checked and CLEAN (command + decisive output)

1. **Internal links to routes that do not exist** — the Solicitors `/resources` defect does
   **not** recur. `grep -rn 'href="/resources"' src` → **0 hits**; `src/app/resources/[topic]/`
   exists and is the only consumer. Built the full href set
   (`grep -rhoP 'href="/[^"#?]*"' src content | sort -u` → **119 unique**) and diffed it against
   real routes: **119 of 119 resolve.** Per family:
   - `/blog/*` (89 links) → `comm -23` against `ls content/blog` + hand-built hub dirs → **empty**.
   - `/calculators/*` (8 links) → `comm -23` against `grep -hoP '^\s*slug: "\K[^"]+' src/lib/tools/configs/*.ts` → **empty**.
   - `/medical-guides/*` (3 links) → all present in `MEDICAL_GUIDES` slugs.
   - `/resources/nhs-pension` → present in `src/lib/resources/registry.ts:78`.
   - `/pricing` → the one soft case, defect 24.
   No hardcoded stale slug list found in `src/lib/`.
2. **Counts asserted in copy vs the registry** — the Solicitors "6 calculators" defect does
   **not** recur. `grep -rniE '(one|...|ten|[0-9]+)\+? (free )?(calculators|guides|tools|locations|articles|posts)'`
   returns 3 prose assertions, all "**Ten free calculators**"
   (`calculators/page.tsx:18,23,46`, `services/page.tsx:222`). Registry
   (`src/lib/tools/registry.ts:21-31`) holds exactly **10** generic tools. Correct. Both
   surfaces are registry-driven (`allTools().map`), not hand-listed. The comment at
   `services/page.tsx:227-229` records that this exact defect was already caught and fixed.
   Premium registry (`src/lib/tools/premium/registry.ts:29-38`) = **8**; no prose claims a
   premium count.
3. **Sitemap coverage** — the Solicitors "commercial cluster missing from the sitemap" defect
   does **not** recur. `src/app/sitemap.ts:40-62` lists all 18 static routes including
   `/services`, `/nhs-pension`, all four `/for-*`, both `/research` pages; guides and resources
   are generated from `MEDICAL_GUIDES` and `publishedGuideTopics()`. Every indexable route in
   `find src/app -name page.tsx` is accounted for; the only omissions are `/book`, `/complete`,
   `/thank-you`, `/admin/*`, `/embed/*`, which are correctly excluded.
4. **`role="img"` collapsing a chart subtree (T16)** — `grep -rn 'role="img"' src` → exactly
   **1 hit**, `PremiumBarChart.tsx:101`. Read the wrapper first (per the brief's caveat) and the
   parent at `:93` is already `aria-hidden="true"`, so the real defect is different from the
   naive reading — recorded as defect 16. `src/components/research/AaIndexCharts.tsx` uses
   recharts through `@/components/ui/chart` and carries **no** `role="img"` and no
   `aria-hidden`; `grep -n 'aria-hidden\|role=' src/components/research/AaIndexCharts.tsx` →
   **empty**. Not a T16 defect.
5. **Privacy policy vs the pool model** — read `privacy-policy/page.tsx:105-160` in full against
   the caps in memory `pool_model_compliance_alignment` (3+3 = max 6). The page discloses:
   legitimate interest as the basis, the exact field list shared, "up to three firms" in the
   profession plus "up to three" in related professions, "at most six firms", each firm as an
   independent controller, the 48-hour re-offer, the seven-day batch path, the right to object.
   **Matches the code and the caps. No "we don't share your details" promise anywhere** — the
   Solicitors T18 defect does not recur. `enquiryRetentionMonths` is read from config, single
   source of truth. Clean.
6. **GA4 is genuinely consent-gated** — `layout.tsx:114` mounts GA only through
   `ConsentedScripts`, which returns `null` until consent state allows
   (`packages/web-shared/analytics/react/ConsentedScripts.tsx:25`). Posture `opt-out`,
   `storagePrefix="ma"`, `noTrackPrefixes=["/admin","/embed"]` (`layout.tsx:107-112`). The
   measurement id resolves to **G-CQF7KFZ1P6** (`Medical/niche.config.json` → `seo.google_analytics_id`).
   The wiring matches the brief. The defects are in the *policy text* (10, 11, 12), not the code.
7. **`data-cta` autocapture is correctly bound** — `packages/web-shared/analytics/autoCapture.ts:349`
   attaches a **document-level, capture-phase** click listener, and `:100` resolves the id with
   `target.closest("[data-cta]")`. Capture phase means it runs **before** React's handlers, so
   `mobile-nav-book-call`'s `onClick={() => setOpen(false)}` (`SiteHeader.tsx:186`) unmounting
   the drawer **cannot** swallow the event. The delegation is sound for every rendered element.
   See §5 for the per-id verdicts.
8. **Result-gate escape hatch works** — all four dismissal routes in `ResultGateModal.tsx`
   (X button `:92`, backdrop `:82`, Esc `:71`, "No thanks" `:138`) call `skip()`, which calls
   `onReveal()`. The result is never walled off. Defect 1 is a conversion failure, not a
   content-access failure.
9. **`content/blog` orphans** — 89 `.md` files, all reachable: `blog/[slug]` generates from
   `src/lib/blog.ts` and the sitemap emits them. No orphan file found.
10. **Figures confirmed CORRECT against house_positions.md** (spot-checked, each traced to a
    numbered section): VAT registration £90,000 / deregistration £88,000 (§6, `blog/private-practice/page.tsx:144`);
    Class 4 NIC 6% / 2% at £12,570-£50,270 (§8, five compute files); mileage 55p / 25p for
    2026/27 (§8, `content/blog/gp-accountant-newcastle.md:24`, `locum-doctor-tax-complete-guide.md:108`);
    NHS tiered member bands 5.2% through 12.5% with the 1 April 2026 uplift (§2,
    `src/lib/medical-guides-data.ts:42` and `src/lib/tools/compute/nhs-super-tiers.ts:44-47`);
    employer contribution 23.7% (§2); annual allowance £60,000 tapering to £10,000 at
    £200k/£260k thresholds (§2, `nhs-pension/page.tsx:68`); corporation tax 19%/25% with
    marginal relief. All correct and in scope.
11. **No stale-comment surfaces** — `layout.tsx:91-99` claims the unconditional GA mount "has
    been removed". Verified against importers: true, and it is why defect 22 is dead code.
    `src/lib/tools/premium/registry.ts:27` says "All three R2 tools" while the map holds eight;
    that is a stale **comment** only, not user-facing, so it is not a defect.

---

## 4. Things that look like defects and are NOT

Recorded so the next reader does not re-file them.

- **The 8 premium calculators are gated and the 10 generic ones are not.** By design, being
  addressed by the port. Not a defect. (Manager correction, accepted.)
- **The `packages` CTA variant's pricing copy.** Real pricing, but `cta.variant` is `"leadgen"`
  in `Medical/niche.config.json`, so `isPackagesMode()` is false and none of it renders. Filed
  as **latent** (defect 25), not live. Verified by reading the config, not by assuming.
- **`src/components/ui/layout-utils.ts`** scored zero on the importer grep but is live via the
  `@/components/ui/layout-utils` alias. Verified before writing a verdict.
- **`hero_primary`, `hero_secondary`, `home_cta_primary`, `mobile-nav-book-call`** never firing.
  All four render in the live `leadgen` variant and the autocapture binding is sound (§3 item 7).
  These are "not clicked", not "cannot fire". Not defects. See §5.

---

## 5. The 12 non-firing `data-cta` ids: which cannot fire, which are just not clicked

19 literal `data-cta` ids exist in source. Verdicts for the 7 the manager named, derived from
the render guard plus the live `cta.variant` value:

| id | file:line | verdict | evidence |
|---|---|---|---|
| `header_nav_secondary` | `SiteHeader.tsx:95` | **CANNOT FIRE** | guarded by `activeCta.header_secondary`, which is optional on the type (`niche-config.ts:29`) and absent from both variants in `Medical/niche.config.json`. Renders `null` always. |
| `header_mobile_secondary` | `SiteHeader.tsx:196` | **CANNOT FIRE** | same guard, same absent key. |
| `home_cta_secondary` | `page.tsx:545` | **CANNOT FIRE** | guarded by `activeCta.home_cta.secondary`; the live `leadgen` `home_cta` defines `primary` only. |
| `hero_primary` | `page.tsx:255` | not clicked | renders unconditionally from `activeCta.hero_primary` (defined in leadgen). Binding sound. |
| `hero_secondary` | `page.tsx:264` | not clicked | `activeCta.hero_secondary` IS defined in leadgen ("Free practice health check"). Renders. |
| `home_cta_primary` | `page.tsx:536` | not clicked | renders unconditionally. |
| `mobile-nav-book-call` | `SiteHeader.tsx:185` | not clicked | renders inside the mobile drawer; capture-phase listener beats the `setOpen(false)` unmount (§3 item 7). |

So **3 of the 7 are genuine source defects** (defects 14 and 15). The other 4 are a traffic or
CRO story, not a code story — worth noting that `hero_primary` and `home_cta_primary` both
render on the homepage and neither has ever been clicked, which is itself worth a look, but it
is not something this sweep can call a defect.

---

## 6. OWNER'S WORD NEEDED

Plain English, one line each.

1. **The calculator sign-up box is rejecting everyone.** Six people out of six tried to submit
   it and were bounced, because it demands at least 40 characters and 8 words in the message box
   before it will accept anything, while every other form on the site asks for 20 and 4, and the
   contact form does not ask for a message at all. Options: **(a)** loosen it to match the rest
   of the site, or **(b)** leave it strict and accept that this box will not produce leads.
2. **We publish a GMC fee of £481 and we cannot back it up.** Our own ground-truth file bans any
   page from stating a GMC figure until a human reads the GMC's own fee regulations, and the
   outside signals point to about £406, not £481. Options: **(a)** remove the number and just say
   the fee is tax-deductible, or **(b)** someone opens the GMC fee page, reads the real figure,
   and we publish that.
3. **We publish our own prices in three places.** A fee schedule on the GP accountant services
   article (£600 to £1,200, £1,500 to £3,000, £5,000 to £15,000), an accountancy fee range in a
   calculator, and a £15,000 to £30,000 incorporation cost. House rules say we never publish
   prices. Options: **(a)** delete all three, or **(b)** you decide the rule has changed and we
   keep them.
4. **We promise a reply in 24 hours in eleven places, including on Google.** We do not actually
   reply; the enquiry goes to up to six partner firms who contact the person themselves, and our
   own privacy policy says a firm may take 48 hours or a week to pick it up. So the promise is
   both against house rules and untrue. Options: **(a)** remove all eleven and say "a specialist
   firm will be in touch", or **(b)** keep a promise and change how enquiries are actually handled.
5. **Our cookie page says we anonymise IP addresses. We do not.** There is no such setting
   anywhere in the code, and our privacy page says the opposite on the same site. It also claims
   we keep the data for 14 months, which nobody can evidence. Options: **(a)** delete both
   sentences, or **(b)** someone opens the Google Analytics admin, reads the real retention
   setting, and we publish that.
6. **Our cookie page does not mention the tracking we actually do.** We store a permanent
   visitor id and five other markers in the browser, and the page says the site "functions
   without requiring cookies". Options: **(a)** add three plain lines describing what we store,
   or **(b)** leave it, accepting the page understates what we do.
7. **The header is missing its second button, and so is the bottom of the homepage.** The code
   expects two buttons in each place, but the settings file never defines the second one, so
   only one ever shows. Options: **(a)** decide what the second button should say and we add it,
   or **(b)** we delete the unused code and keep one button.
8. **A nurture message says "most doctors we speak to came to us with the same question".**
   That is a claim about our clients that we do not evidence, and it goes out by SMS and email,
   not just on the website. Options: **(a)** reword it, or **(b)** leave it.
9. **A dormant price list is one switch away from going live.** If the site's call-to-action
   mode is ever flipped from "book a call" to "pricing", it immediately publishes "plans from
   £29 a month" and "£59 for locums with a limited company". Options: **(a)** strip those
   figures now so the switch is safe, or **(b)** leave them and never flip the switch.
10. **A monitoring job set up for this site in July has never once run.** The alarm it was
    supposed to raise cannot reach Medical data at all because the code only looks at the
    Property site. Options: **(a)** switch it off and remove the row, or **(b)** fix it so it
    watches Medical too. Either way it is not protecting anything today.
11. **The contact page says we will give a "fixed-fee quote".** Under how the site actually
    works, the partner firm quotes, not us. Options: **(a)** reword to describe what the firm
    does, or **(b)** leave it.
