# Trade site: live defects (Phase 0)

Read-only sweep, 2026-09-11. Nothing was fixed. Site: `construction-cis/web`.
Ground truth: `docs/construction-cis/house_positions.md` (HP-LOCKED 2026-06-12, corrected 2026-06-13).
Structure and evidence discipline mirrored from `docs/medical/_port/LIVE_DEFECTS.md`.

All line numbers are from the working tree at the time of the sweep. All paths relative to
`construction-cis/web/` unless stated. `construction-cis/niche.config.json` is referred to as
`niche.config.json`.

**Representation caveat, established before any money search.** Probes on the whole sweep scope
(`src`, `content`, `niche.config.json`):

| representation | probe | files |
|---|---|---|
| literal `£` (U+00A3) | `grep -rl "£" src content` | **112** |
| HTML entity `&pound;` | `grep -rl "&pound;" src content` | 0 |
| JSON unicode escape `£` / `£` | `grep -rl '\\u00a3' src content` | 0 |
| mojibake `Â£` (double-encoded UTF-8) | `grep -rln 'Â£' src content ../niche.config.json` | 0 |
| the word `GBP` | `grep -rn "GBP" src content` | 2 files, 11 lines |

**Conclusion: Trade stores the pound sign as the literal UTF-8 character (`c2 a3`), verified by
`od -c`, so a literal `£` grep is sound here.** The Generalist entity trap does not apply. One
near-miss worth recording: piping `niche.config.json` through a Python one-liner printed
`Â£`, which looks exactly like the mojibake defect. It is a console-encoding artefact,
not a defect: `od -c` on the raw bytes returns `302 243` = correct UTF-8. Proved, not assumed.

**The `GBP` representation matters.** `src/components/resources/ExcelPreview.tsx` renders money as
the ASCII string `GBP 1,908.20` (11 lines, :152-:235) because the spreadsheet preview cannot carry
the glyph. A literal `£` sweep misses that file entirely. It was read in full: every figure is a
worked CIS example, none of it is our own fee. Clean, but it is the file a symptom-led sweep loses.

---

## 1. Defect table

Ordered by rule, then severity within the rule. False statements to a visitor and published
advisory pricing outrank cosmetics.

**TD-31, TD-32 and TD-36 to TD-41 were filed 2026-09-12 by Phase 6 / P6-A** (`PHASE6_PLAN.md`
section 9). TD-31 and TD-32 were proposed in `DISPOSITION_SLICE3` section 13.5 and never filed;
TD-36 to TD-40 are new this phase; **TD-41 is new and is in no plan**: it is the TD-18 claim shape
on both pillar `LeadCTAPanel`s, inherited from Phase 5's surface, not introduced by Phase 6.

**TD-42 and TD-43 were filed and closed 2026-09-12 by the cross-fence claim package**, which also
closed TD-18 (all 11 call sites) and TD-41. Both are siblings that earlier packages reported or never
reached: TD-42 is `/about`'s old client-base sentence still live in the shared `WhoWeAreSection` on the
homepage and `/contact`; TD-43 is a 24th TD-13/TD-14 turnaround promise in a location `intro` string.
All line numbers in those eight rows were re-derived against the tree at `dd935a98` by grepping
the string, per DL-5, not by trusting the plan's numbers.

| id | file:line | what it says or does | why that is wrong | severity | minimal fix | owner's word? |
|---|---|---|---|---|---|---|
| **TD-01** | `src/lib/schema.ts:71` and `:200`; and the shared copy `packages/web-shared/schema/local-business.ts:127` | `priceRange: "££"` inside the `LocalBusiness` / `AccountingService` JSON-LD | A published advisory price signal for our own service, in structured data, on **26 live surfaces**: all 25 `/locations/[slug]` pages (`locations/[slug]/page.tsx:56`) plus the site-wide Organization block. `priceRange` is a schema.org *price* property; Google surfaces it. Breaches the locked no-pricing rule in the exact place the Generalist port found it (structured data, invisible in rendered copy). Not covered by the calculator exemption: that exemption is for a free tool's own `price: "0"`, not for a fee band on the advisory service. | banned-claim | delete the `priceRange` key in all three places. The shared-kit copy is **TD-K1** below | **yes** |
| **TD-02** | `src/app/contact/page.tsx:29`; `niche.config.json` `cta.variants.packages` (`hero_primary.label` "Plans from £24/mo", `sticky.primary` "Fixed monthly plans from £24", `blog.cta_body` "Plans start at £24 a month for subbies, £49 for CIS contractors and £79 for trade limited companies", `home_cta`) | Our full published price list: £24 / £49 / £79 a month | Our own advisory fees, the exact defect that cost the Solicitors port. **NOT LIVE TODAY**: `niche.config.json` `cta.variant` is `"leadgen"`, so `isPackagesMode(niche)` is false (`contact/page.tsx:27`, `page.tsx:33`, `StickyCTA.tsx:37`) and none of it renders. Recorded as a **latent** breach: flipping one string publishes the price list in one commit, across the header, hero, sticky bar, every blog CTA and `/contact`. | banned-claim (latent) | strip the £ figures from the `packages` variant so the switch is safe to throw | **yes** |
| **TD-03** | `content/blog/cis-for-limited-companies-eps-reclaim.md:187` | "accountancy fees **typically £150 to £250 a month** for a company with full CIS compliance" | `house_positions.md` §13 does lock this band as usable market data, but only "presented as **typical / illustrative, not guaranteed**" and attributed. Here it is stated flatly as fact, uncaveated, inside the structure-decision guide, for the service we sell. Compare `content/blog/bookkeeper-cost-self-employed-tradesperson.md:18,21,37` and `content/blog/do-i-need-accountant-for-mtd.md:33,110`, which **do** carry "market ranges rather than published rates" and "a trade-reported range, not a fixed price" and are therefore compliant. The rule is not that the band is banned; it is that the caveat is mandatory. | banned-claim (§13 caveat missing) | add the §13 caveat, or drop the band | no |
| **TD-04** | `content/blog/allowable-expenses-cis-subcontractor.md:285` | "**For most clients the refund more than covers the cost of the accountant.**" | Two locked rules at once: a **client-outcome claim about our own client base**, and an implicit fee/value claim about our own service ("the cost of the accountant"). Not derivable from `house_positions.md`, which never states a fee-to-refund ratio. | banned-claim | delete the sentence | no |
| **TD-05** | `src/app/gross-payment-status/page.tsx:49`; `src/app/services/page.tsx:46`; `src/lib/calculators/tools/cis-gps-eligibility-checker.ts:157` and `:169` | "**Finance Bill 2026 ss.62A/62B allow individual directors to face penalties of up to 30% of the tax HMRC considers lost**" (x2) and "directors of limited companies can face **personal penalties of up to 30% of the tax HMRC considers lost**" (x2) | `house_positions.md` §3 bans this in terms: "**NEVER state a '30% of tax lost' director penalty under ss.62A/62B** — no 30% figure appears in either section", and records that exact claim as a **CORRECTED** error caught by wave-2 Opus QA against legislation.gov.uk on 2026-06-12. Four surfaces never received the correction, including the GPS pillar page and the GPS calculator's explanatory copy. The blog cluster **was** corrected (`content/blog/cis-april-2026-rule-changes.md:22` is accurate), which is what makes these four invisible. | live-false-statement | delete the 30% claim; keep director exposure general (officer-liability rules) per §3, or cite FA 2004 s.72B accurately as §3 permits | no |
| **TD-06** | `src/app/gross-payment-status/page.tsx:49` and `:198`; `src/app/services/page.tsx:46` | "**Finance Bill 2026**" (x3) | `house_positions.md` §3: "Write **'Finance Act 2026'** everywhere; **never 'Finance Bill 2026'** or 'direction of travel' hedging." FA 2026 (c. 11) received Royal Assent 18 March 2026; ss.62A/62B are in force. Calling settled law a Bill understates it to a contractor deciding whether to act, on the pillar page for that very topic. Note this is the same three lines as TD-05; counted separately because it breaches a separate locked rule and a fix to one does not fix the other. | live-false-statement | "Finance Act 2026" | no |
| **TD-07** | `src/tests/assistant-journey-opener.test.ts:706-711` | A guard test titled "gross-payment-status FAQ uses 'Finance Act 2026' (not 'Finance Bill 2026')" that asserts `not.toMatch(/finance bill 2026/i)` | **The guard watches the wrong surface.** It reads `faqForTopic("gross-payment-status")` (the resources registry FAQ set), not the `faqs` array in `src/app/gross-payment-status/page.tsx`, which is where the live "Finance Bill 2026" text sits (TD-06). So the test is green while the page is wrong, and anyone reading the suite concludes the rule is enforced. This is why TD-05/TD-06 survived two correction passes. | false-assurance | point the assertion at the page's own `faqs` array as well, or add a second test that does | no |
| **TD-08** | `src/app/glossary/[slug]/data.ts:518` | "a penalty of **20% of the relevant payment** (FA 2004 s.62A) or **20% of the sums treated as paid on a return** (FA 2004 s.62B)" | `house_positions.md` §3, with a dedicated sentence: "**The two quanta differ: s.62A = 20% of the payment; s.62B = the full sum returned. Never write '20%' for s.62B.**" The s.62B liability is **100%** of the sum the return treats as paid. The page understates a contractor's exposure by a factor of five. §3 records that the 2026-06-12 correction itself made this error and it was caught on 2026-06-13; the glossary entry predates or missed that second correction. Note the neighbouring entry at `:540-552` **is** correct ("£30,000 for that single return" on a £30,000 base = 100%), so the same data file contradicts itself. | live-false-statement | "an amount equal to the sum the return treats as paid on account of the person's liabilities (100% of the sum returned)" | no |
| **TD-09** | `src/app/glossary/[slug]/data.ts:359`, `:377`, `:432` | CIS300 late-filing ladder ending "**£300 or 100% of the CIS liability at twelve months**" | `house_positions.md` §4: the 12-month tier is **£300 or 5%**, and the 100% layer is an **additional** penalty that applies **only** to deliberate withholding of information, capped with "up to £3,000 or 100%". §4 carries the explicit note: "[CORRECTED 2026-06-12: the 12-month tier previously read '£300 or 100%'; the 100% layer applies only to deliberate withholding]". The blog cluster received that correction (`cis-april-2026-rule-changes.md:132`, `cis-for-contractors-monthly-responsibilities.md:93-94` are accurate); the glossary, three places, did not. Overstates a statutory penalty twentyfold at the 12-month tier to the contractor audience. | live-false-statement | reproduce §4's ladder: £100 / £200 / £300-or-5% / £300-or-5%, with deliberate withholding as a separate additional tier | no |
| **TD-10** **CLOSED 2026-09-11** (all ten) | `src/app/locations/[slug]/data.ts:429`, `:472`, `:503`, `:577`, `:616`, `:651`, `:726`, `:773`, `:879`, `:1187` | "a refund that **averaged around £2,000 across Trade Tax Specialists' client base**"; "**Our clients** typically recover around £2,000 on average" (x4); "**Our clients'** average refund runs to around £2,000" (x2); "The average CIS refund **we see** is around £2,000"; "The average refund **across our client base** is around £2,000"; "A refund in the range of £2,000 is typical for **first-year clients**" | Ten **client-outcome / aggregate-performance claims about our own client base**, banned by the locked rules and not derivable from `house_positions.md`. Worse, they **misattribute a third-party marketing figure as our own results**: §13 sources the ~£2,000 to Dearne Accountancy (£1,840 reported first-year average) and RIFT's marketing range, and classes it "marketing-sourced or third-party-reported and **NOT guaranteed**", to be presented "as typical/illustrative, **never as a promise**". Ten city pages tell a visitor what *our* clients get. This is the §12.B rebate-factory posture the house positions exist to prevent. | banned-claim + live-false-statement | reattribute: "third-party reported averages for registered CIS subcontractors are around £2,000 (illustrative, not guaranteed)". The template is already on site and correct at `content/blog/how-long-does-cis-refund-take.md:38,109`. **DONE 2026-09-11.** All ten reattributed to the house register. Verified by re-grep of `src/app/locations/[slug]/data.ts`: `client base|Our clients|our client|we see|first-year clients` now returns **0 client-outcome hits** (the two surviving matches are both the house-register sentence at `:616` and `:773`). Ten of the file's 39 `£2,000` lines now carry the full third-party attribution; the hedged-but-unattributed remainder is logged separately as **TD-34**, because §13 permits the framing and the missing element is only the source. | **yes** |
| **TD-11** **CLOSED 2026-09-11** (all five, including two the entry never listed) | `niche.config.json` `cta.variants.leadgen.blog.cta_body` (and the duplicate top-level `blog.cta_body`); `src/app/cis-refund/page.tsx:10` (metadata) and `:88` (H-section) | "The average CIS subcontractor **overpays around £2,000 a year in tax deductions**"; "The average CIS subcontractor **is owed around £2,000 back**" | Same §13 figure, uncaveated, and **re-scoped from accountancy clients to "the average CIS subcontractor"** — a population claim §13 does not support. `cta_body` renders in the sidebar CTA of **every blog post** (`BlogPostRenderer.tsx:299` via `activeBlogCta`), so it is the single highest-traffic instance on the site. The `/cis-refund` one is in `metadata.description`, so it appears in the SERP. | banned-claim + unsourced | caveat and reattribute, as TD-10. **DONE 2026-09-11.** House register used throughout, matching the already-fixed `niche.config.json:24`/`:345`: "Third-party reported averages put the annual refund for a registered CIS subcontractor at around £2,000 (illustrative, not guaranteed)." The apostrophe form (`a registered CIS subcontractor's annual refund`) was rejected: `src/tests/design/page-summaries.test.ts:21` extracts `metadata.description` with `[^"'`]`, so an apostrophe truncates the captured string and the drift guard fails. FIXED: `cis-refund/page.tsx:10` (metadata) and `:88`/`:91` (the H1 carried the claim, so the H1 is now "Claim back the CIS deductions you have overpaid." and the attributed figure moved into the standfirst below it); `src/lib/page-summaries.ts:30` and `:34` (the `/` and `/cis-refund` registry copies, which the drift guard forces to match the metadata, and which this entry never listed); **plus three instances no TD entry listed**: `src/app/page.tsx:38` (homepage `metadata.description`, the homepage Google snippet, authored locally in `page.tsx` and NOT inherited from `niche.config.json`, so it needed fixing at its own source), `src/app/page.tsx:187` (homepage body copy), and `src/app/page.tsx:43`, the first tile of the `keyStats` row: `{ value: "~£2,000", label: "Average CIS subcontractor overpayment per year" }`. Honest attribution does not fit a stat tile, so the tile was **replaced** rather than caveated, per the TD-13 precedent: `{ value: "4 years", label: "How far back a CIS refund can be claimed" }`, re-derived from `house_positions.md:188` ("SA refund lookback: 4 prior tax years"). The row stays at **four** tiles: `page.tsx:224` is `grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4` (note: `md:`, not `sm:`), so three would hole it. "12" and "45" were rejected as the replacement because `src/config/service-tiers.ts:69,76` already show both on the same homepage via `StatsBar`. Also fixed in the same class, previously unlisted: `src/lib/calculators/tools/cis-refund-estimator.ts:130` (body paragraph) and `:138` (FAQ answer), both verbatim "The average CIS subcontractor is owed around £2,000 back per year" on a live calculator. | **yes** |
| **TD-12** | `src/config/lead-nurture.ts:342` | "**Most trades we speak to** had a question just like yours, and one short call usually clears up months of uncertainty." | Client-behaviour assertion about our own enquirers, banned by the locked rules and unevidenced. This one goes out as an **outbound SMS**, not just as page copy, so it is a claim made in a channel the owner cannot review after the fact. Identical to the Medical port's defect 18. | banned-claim | rewrite without the client-behaviour claim | **yes** (outbound) |
| **TD-13** **CLOSED 2026-09-11** (all six; `service-tiers.ts:71` closed by the earlier package, the other five by the rule sweep) | `src/app/page.tsx:46` FIXED; `src/config/service-tiers.ts:71` FIXED (earlier package); `src/app/cis-refund/page.tsx:230` FIXED; `src/app/for/[slug]/page.tsx:225` FIXED; `src/app/gross-payment-status/page.tsx:240` FIXED; `src/app/page.tsx:531` FIXED | "**24h / Response guarantee**" (homepage `StatsBar`, twice via `siteStats`); "**24-hour response guarantee**" (x3, one of them on all 45 `/for/[slug]` pages); "24-hour response time / Usually the same day" | A turnaround promise, escalated to the word **"guarantee"**, banned outright in capture copy. It is also **false under the pool model**: `privacy-policy/page.tsx:127-136` discloses that the enquiry goes to **up to six independent firms** who contact the visitor themselves, that a firm may take **48 hours** to take it up, and that a related-professions batch runs separately. We do not respond, so we cannot guarantee a response time. The `/for/[slug]` instance multiplies across 45 trade pages. | live-false-statement + banned-claim | delete; replace with what actually happens ("a specialist firm will be in touch") **DONE.** `page.tsx:46` stat tile kept at four (the bar is `grid-cols-2 md:grid-cols-4`, so dropping one would hole the row): replaced with "45 / Construction trades covered", re-derived `grep -c '^    slug:' src/data/trade-types.ts` = 45 and cross-checked against 45 distinct `/for/[slug]` links on the live `/for` hub. `page.tsx:531` -> "A specialist CIS accountant gets in touch / Not a sales team, not a call centre". The three pillar bullet lists -> "A specialist CIS accountant will be in touch" (three items kept; `space-y-3` list, no grid). | **yes** |
| **TD-14** **CLOSED 2026-09-11** (twelve of twelve, plus two instances this entry never listed; the three residuals closed by the LeadForm/SpecialistWidget package) | FIXED: `src/app/contact/page.tsx:12` (metadata) and `:59`; `src/app/thank-you/page.tsx:10` (metadata); `src/app/about/page.tsx:39`; `src/app/page.tsx:551`; `src/components/calculators/CalcResultCta.tsx:20`; `src/components/calculators/premium/ResultGateModal.tsx:122`; plus **two this entry missed**: `src/lib/page-summaries.ts:52` (the `/contact` summary, rendered by the contact hero and every card pointing at it) and `src/lib/support/faq.ts:28-29` ("How quickly will a specialist reply? Within one working day, and usually sooner"). ALREADY GONE: `src/components/blog/ExitIntentModal.tsx:133` (file deleted), `src/components/blog/InlineMiniLeadForm.tsx:20` (closed in the blog package). FIXED 2026-09-11 (final package): `src/components/forms/LeadForm.tsx:495` (success state) and `:513` (the note under the submit button, pre-submit not post-submit); `src/components/support/SpecialistWidget.tsx:383` (the ledger said `:379`; it had moved) | "We respond within one working day" / "We are in touch within 24 hours" / "will reply within 24 hours" / "You will hear back within 24 hours" / "we will come back within one working day" / "A specialist replies within one working day" | Twelve more turnaround promises, same rule, same falsity as TD-13, across **every capture surface on the site**: the contact page and its metadata, the thank-you page metadata (both SERP-visible), the homepage, the exit-intent modal, the inline blog form, the calculator result CTA, the premium result gate, both `LeadForm` success states, and the floating specialist widget. Solicitors' `/contact` had four and the fix moved the problem; Trade has fifteen in total with TD-13. Fixing one surface is not a fix. | live-false-statement + banned-claim | delete all twelve **DONE.** Replacement copy throughout is non-promissory and describes what the pool model actually does: "A specialist CIS accountant will be in touch." The last three were closed 2026-09-11 in their own package: `LeadForm.tsx:495` -> "Thanks. A specialist CIS accountant will be in touch."; `:513` -> "A specialist CIS accountant will be in touch. Your details are stored securely."; `SpecialistWidget.tsx:383` header subtitle -> "A specialist CIS accountant will be in touch". `siteConfig.leadConsentText` was not touched (`src/config/site.ts` md5 unchanged, `lead-payload.test.ts` green before and after). **Note for the ledger: `:513` is not a success state, it is the static note under the submit button, so it is pre-submit copy.** **The CLASS IS NOT CLOSED SITE-WIDE:** a by-rule re-sweep found two further live instances of the soft form, `src/app/complete/page.tsx:87` and `src/components/forms/DetailsForm.tsx:104`, both "a specialist ... will be in touch **shortly**". See TD-14b. | **yes** |
| **TD-14c** **CLOSED 2026-09-11** | `src/app/api/leads/confirm/[token]/route.ts:61` | "Click the button below to confirm that you would like us to call you. **We will be in touch shortly.**" | The 23rd instance, and the only one in **server-rendered HTML**: the confirm-callback page served to an enquirer who clicks the link in the confirmation email. The four instances deliberately left in place are transactional **email** valedictions; this one is a web page, so it belongs with the 22. | live-false-statement + banned-claim | FIXED: the timing word deleted, no replacement added. Now "We will be in touch." | no |
| **TD-14b** **CLOSED 2026-09-11** | `src/app/complete/page.tsx:87`; `src/components/forms/DetailsForm.tsx:104` | "A specialist from our partner network will be in touch **shortly**" / "A specialist will be in touch **shortly**" | Same rule as TD-13/TD-14 in its soft form. "Shortly" is a timing promise with the number removed, and it is false for the same reason: under the pool model the enquiry may go to up to six independent firms and we do not control when any of them replies. Found by sweeping the rule rather than the token, after the 20 literal instances were closed. Both are post-enquiry confirmation surfaces, so both are high-intent copy. | live-false-statement + banned-claim | FIXED: `complete/page.tsx:87` -> "A specialist from our partner network will be in touch. If you would like to pick a time that suits you, you can book a callback below."; `DetailsForm.tsx:104` -> "A specialist will be in touch. If you would like to pick a time that suits you, you can book a callback below." No replacement timing word added. | **yes** |
| **TD-15** | `src/components/forms/DetailsForm.tsx:192` | "**We only use this to arrange your free review.**" | False, and false in the T18 shape the Solicitors port found. The privacy policy (`privacy-policy/page.tsx:107-131`) discloses that name, telephone and email are shared with **up to three firms in the profession plus up to three in related professions such as mortgage and finance brokers**, each an independent controller. `/complete` is the page that collects the **missing phone number** (`complete/page.tsx:60-70`), i.e. the single most onward-shared field, under a promise of single-purpose use. The site's own canonical consent wording at `src/config/site.ts:17` says the opposite and says it correctly. | live-false-statement | use the `leadConsentText` already defined at `site.ts:17` | **yes** |
| **TD-16** **CLOSED 2026-09-12** (P6-D) | `src/app/cookie-policy/page.tsx:104-120` | A whole "**Google Analytics opt-out**" section, linking visitors to the GA opt-out browser add-on | **The site runs no Google Analytics.** `niche.config.json:251` sets `"google_analytics_id": ""`, and `layout.tsx:97` passes that empty string to `ConsentedScripts`, which renders nothing. The same page says so correctly 60 lines earlier (`:43-47`: "This Site does not use Google Analytics or any other third-party analytics cookies"). So the policy contradicts itself and instructs visitors to take a step that does nothing. This is the Generalist defect, inverted: there the sentence was wrong because no GA ran; here the page knows no GA runs and still ships the section. | live-false-statement | delete the section. **DONE 2026-09-12.** The whole "Google Analytics opt-out" `<h3>` and its paragraph are gone from `src/app/cookie-policy/page.tsx`. Re-verified against the code first, not against the old comment: `niche.config.json:251` `"google_analytics_id": ""`, `layout.tsx` passes it to `ConsentedScripts`, `packages/web-shared/analytics/react/GoogleAnalytics.tsx:8` returns `null` for anything that is not a `G-` id. Link floor unaffected: the only link in the deleted block was EXTERNAL (`tools.google.com`) and the floor metric counts unique same-site `<a href="/...">` targets only, so **0 internal destinations lost**. | no |
| **TD-17** **CLOSED 2026-09-12** (P6-D) | `src/app/cookie-policy/page.tsx:40-42` | "This data is **anonymous**. **We do not store your IP address (only a country derived from it)**" | Understates what the code persists. The live handler is `src/app/api/track/route.ts:17` → `packages/web-shared/analytics/server/createTrackHandler.ts:231-234,256-259`, which reads `x-vercel-ip-country`, `x-vercel-ip-city`, `x-vercel-ip-country-region` and `x-vercel-ip-timezone` and writes **country, city, region and timezone** (:148-151) against a **persistent visitor identifier**. City plus region plus timezone plus a durable id is not "a country", and the combination is not "anonymous" in the UK GDPR sense. T18: a notice that misdescribes the code is the defect, whether it overstates or understates. Note the page is otherwise **better** than Medical's: it does disclose the visitor and session identifiers (:36-38), so the Medical defect 12 shape does not recur. | live-false-statement | say what is stored: country, city, region and timezone derived from the IP, which is not itself retained. **DONE 2026-09-12**, gate 2. Re-verified in the handler before writing the copy: `createTrackHandler.ts:231-234` reads `x-vercel-ip-country`, `-city`, `-country-region`, `-timezone` and `:148-151` writes all four; no `x-forwarded-for` and no `request.ip` anywhere in the handler, so "we do not store your IP address" genuinely holds and is kept. Fixed in BOTH places the claim is published: `src/app/cookie-policy/page.tsx` (first-party analytics section) and `src/app/privacy-policy/page.tsx` section 2 (the "approximate country" bullet, which was row 3 of PHASE6_PLAN section 3 and is the same edit). The word **anonymous** is dropped rather than qualified: city + region + timezone against a durable `localStorage` visitor id is not anonymous in the UK GDPR sense. | **yes** |
| **TD-18** **CLOSED 2026-09-12** (all 11 call sites; the cross-fence sweep) | `src/app/about/page.tsx:39`; `src/config/service-tiers.ts:38`; `src/app/cis-refund/page.tsx:231` | "**We work on a fixed-fee basis. You know what you are paying before we start.**"; "Fixed fee, quoted before we start"; "Fixed fees, quoted before we start" | No number, so not a pricing breach. But under the pool model **we do not quote at all**: the enquiry goes to independent partner firms who set their own fees (`privacy-policy/page.tsx:109-119`). Three promises about our own commercial terms that we are not the party to make. Same shape as the Medical port's defect 26. | live-false-statement (minor) | reword to describe what the partner firm does. **WORDING ESTABLISHED 2026-09-12 by P6-D**, gate 8. Use these, unchanged, at every call site; do not author a rival phrasing. **Prose form** (now live at `src/app/about/page.tsx`): "Fees are agreed before any work starts. The specialist firm you speak to sets its own fee and agrees it with you up front, so nothing begins until you have." **Proof-point form** (title + detail, the `LeadCTAPanel` / `service-tiers` shape): title "Fees agreed before any work starts", detail "The specialist firm you speak to sets its own fee and agrees it with you up front." Both name the promising party, carry no number, no fee and no duration, and are consistent with `/privacy-policy` section 5 (`:109-119` independent controllers, `:143-144` the lead-gen fee). **`/about` DONE.** **STILL LIVE and owed to the orchestrator** (all outside P6-D's five-file fence, so reported rather than reached, per DL-9): `src/config/service-tiers.ts:35` "Fixed fee, quoted before we start"; `src/app/cis-refund/page.tsx:285` and `src/app/gross-payment-status/page.tsx:281` (= TD-41); and **five further instances of the same claim shape that no TD entry lists**: `src/app/page.tsx:292` "Fixed fees. Plain English. No hard sell.", `src/app/page.tsx:395` and `src/app/services/page.tsx:239` "Fixed fees, no surprises.", `src/app/page.tsx:678` `{ title: "Fixed fees, no surprises", sub: "Quoted before we start" }`, and `src/app/blog/page.tsx:158` / `src/app/glossary/page.tsx:149` / `src/app/glossary/[slug]/page.tsx:172` "Fixed fees, no surprises" (the glossary pair renders on 50 routes). Deriving command: `grep -rn "Fixed fee\|Fixed fees\|fixed-fee\|fixed fee" construction-cis/web/src --include=*.ts --include=*.tsx | grep -v tests/` = **11 hits**, of which 1 is now fixed. **CLOSED 2026-09-12 by the cross-fence claim package.** Re-derived by rule over `src` AND `content` (body copy, frontmatter `faqs`/`keyTakeaways`/`metaTitle`/`metaDescription`/`summary`, and `schema:` JSON-LD): the deriving grep returns **12** source lines, not 11. The extra two are `src/app/about/page.tsx:122` and `src/app/contact/page.tsx:141`, **both inside code comments** (the /about fix note quoting the old string, and the /contact note explaining why Property's `WhatToExpectCard` default is not inherited); neither renders, both left. `content/` carries **zero** instances of the claim shape: every `fixed fee` / `per month` hit there is third-party software or market-rate reporting about the reader's own pricing, not our fee position. FIXED at all 10 live call sites. Proof-point form verbatim at the five `LeadCTAPanel` sites: `src/app/blog/page.tsx:158-159`, `src/app/glossary/page.tsx:149-150`, `src/app/glossary/[slug]/page.tsx:172-173`, `src/app/cis-refund/page.tsx:285-286`, `src/app/gross-payment-status/page.tsx:281-282` (the last two = TD-41). Non-panel shapes rewritten to the same meaning: `src/config/service-tiers.ts:35` feature bullet -> "Fee agreed with you before any work starts"; `src/app/page.tsx:292` hero trust strip "Fixed fees. Plain English. No hard sell." -> "Plain English. No hard sell. No obligation." (the fee token deleted, not replaced, because a three-word strip cannot name the promising party); `src/app/page.tsx:395` and `src/app/services/page.tsx:239` -> "...speak to us directly. The specialist firm you speak to sets its own fee and agrees it with you up front."; `src/app/page.tsx:678` `{title, sub}` pair -> title "Fees agreed before any work starts", sub "The specialist firm you speak to sets its own fee". **Two further instances of the same fee-position rule that the token grep could not see**, both closed here: `src/app/locations/[slug]/data.ts:773` ("This keeps our fees lower and means you are never paying for the overhead of local office space", a comparative claim about our own fee level) -> "It means there is no local office overhead behind the work."; and `src/data/trade-types.ts:252` ("the refund covers our fee many times over in the first year", `CLAIMS_REGISTER.md:162` rule 4, fee + aggregate-outcome in one sentence) -> "Fees are agreed with you before any work starts." **Judged neutral and left:** `src/app/locations/[slug]/data.ts:690` ("professional fees including our accountancy charge") states that an accountancy fee is an allowable expense, which is tax fact, not a fee position; all `content/blog/*` £/month and hourly-rate figures (software pricing, bookkeeper market ranges) are third-party and attributed. No guard pins any string changed: `grep -rniE "fixed fee|no surprises|client base|Every client|proofPoint" src/tests` returns nothing. `src/config/site.ts` untouched. | | **yes** |
| **TD-19** **CLOSED 2026-09-12** (P6-D) | `src/app/contact/page.tsx:86-94` | On `/contact`: "**Prefer to contact us directly?** Use the form above or visit our `<a href="/contact">`contact page`</a>` to get in touch." | A self-referential link: the contact page inviting the visitor to visit the contact page, offered as the alternative to the form that is on the same screen. Not a 404, so not a dead link, but it is live nonsense on the site's primary capture page, and it is placeholder copy that was never filled in: there is no phone or email offered, which is what "contact us directly" promises. | live-false-statement (soft) | either give a real direct route, or delete the block. **DONE 2026-09-12**, gate 5, owner ruled DELETE. The block is gone from `src/app/contact/page.tsx`. In its place, `WhatToExpectCard` with all five items passed explicitly and each one checked against `/privacy-policy` section 5. **Link-floor arithmetic**: the deleted `<a>` pointed at `/contact`, which is already a chrome destination (`SiteFooter.tsx:28`, the Company column), so unique same-site destinations lost = **0**; the route also GAINED a `Breadcrumb` to `/` (also chrome, also net 0). Floor 14, baseline 20, still 20. No compensating link was needed and none was invented. | **yes** |
| **TD-20** | `src/app/contact/page.tsx:30`; `next.config.ts:27` | `href="/pricing"` | `/pricing` has **no route**. It resolves only through the 308 at `next.config.ts:27` to `/services`. An internal link should point at its destination. Low severity: not a 404, and the link is inside the dormant `isPackagesMode` branch (TD-02), so it does not render today. Same as the Medical port's defect 24. | broken-link (soft, dormant) | point it at `/services` | no |
| **TD-21** | `src/components/calculators/premium/PremiumBarChart.tsx:88-99` | Wrapper `<div aria-hidden="true">` containing `<svg role="img" aria-label="Bar chart comparing values across groups">` | The `aria-hidden` parent removes the whole chart from the accessibility tree, so the `role="img"` label never reaches anyone either. No adjacent data table or text alternative. A screen-reader user gets zero access to the comparison the premium calculator exists to produce. Per the T16 caveat: the `role="img"` is **not** the defect here, because the parent already hides the subtree; the defect is that the values are unreachable by **any** route. Byte-identical to the Medical port's defect 16, which means this is a replicated per-site copy, not an independent bug. See **TD-K2**. | a11y | drop the wrapper `aria-hidden`, `aria-hidden` the decorative `<rect>`s, and render the series values as visible text or a `<table>` | no |
| **TD-22** | 30 `id="ref-N"` and heading targets in 9 blog markdown files (`content/blog/vans-tools-capital-allowances-trades-2026-27.md` 12, `construction-business-survival-vs-uk-average.md` 3, `how-long-large-construction-firms-take-to-pay-subcontractors.md` 3, `uk-construction-insolvency-risk-for-subcontractors.md` 3, `state-of-uk-construction-business-2026.md` 2, `uk-construction-company-formations-march-spike.md` 2, `which-construction-sub-sectors-have-most-insolvencies.md` 2, `which-construction-trades-going-limited.md` 2, `uk-construction-net-formation-collapse.md` 1); plus `src/app/cis-invoice-template/page.tsx:109` `id="downloads"` | Anchor targets with **no scroll offset**, under a header that is `sticky top-0 z-40` (`src/components/layout/SiteHeader.tsx:59`), with `scroll-behavior: smooth` on (`src/app/globals.css:96`) | Every jump lands the target under the header. The 65 `href="#ref-N"` citation links in the research-backed posts are the main casualty: a reader checking a source lands on the header, not the footnote. **Trade's exposure is 31 targets across 10 routes, not Solicitors' 428 across 80**, because the `/research` pages and the shared blog chrome already carry `scroll-mt-24` (`research/*/page.tsx:129-192`, `packages/web-shared/design/blog/BlogCategoryHub.tsx:222,250`, `HubArticleList.tsx:76`, `marketing/TopicSection.tsx:71`) and `services/page.tsx:140` and `calculators/[slug]/page.tsx:151` do too. This is a gap in coverage, not an absence of the pattern. | a11y / usability | add `scroll-mt-24` to the markdown targets (a `.prose-blog [id] { scroll-margin-top }` rule in `globals.css` fixes all 30 in one line) and to `id="downloads"` | no |
| **TD-23** | `src/components/layout/SiteHeader.tsx:83-90` and `:182-190` | `data-cta="header_nav_secondary"` and `data-cta="header_mobile_secondary"`, both inside `{activeCta.header_secondary ? ... : null}` | `header_secondary` is **absent from both variants** in `niche.config.json` (`packages` and `leadgen` each define only `header_primary`, `hero_primary`, `sticky`, `blog`, `home_cta`). The guard is always falsy, both branches render `null`, and both ids **cannot fire**. The header ships with no secondary CTA at all, live, in desktop and mobile. Identical to the Medical port's defect 14. | dead-code + CRO gap | define `header_secondary`, or delete both dead branches | **yes** (which) |
| **TD-24** | `src/app/page.tsx:506-514` | `data-cta="home_cta_secondary"` inside `{activeCta.home_cta.secondary ? ... : null}` | The live `leadgen` `home_cta` defines `primary` only; `secondary` exists solely in the dormant `packages` variant. The homepage closing CTA renders **one** button where the code implies two, and the id **cannot fire**. Identical to the Medical port's defect 15. | dead-code + CRO gap | add a `secondary` to the leadgen `home_cta`, or delete the branch | **yes** |
| **TD-25** | `src/config/site.ts:7-10` | `const office = niche.company!.registered_office;` then four unguarded property reads | Property guards the identical read: `Property/web/src/config/site.ts:23` uses `(company.registered_office ?? {}) as Partial<...>`. The unguarded form produced **7 production `client_error` rows on Solicitors** from partial chunk loads. Trade is worse than Medical here, because it also carries a non-null assertion on `niche.company` itself, so a missing `company` block throws rather than degrading. | live-error (latent) | mirror Property's `?? {}` guard and drop the `!` | no |
| **TD-26** | `src/components/experiments/useExperiment.ts` (whole file, 23 lines) | A per-site re-export shim wrapping `makeUseExperiment(constructionRegistry)` | **Zero importers.** Derived by `grep -rn "useExperiment" src ../../packages/web-shared`: the only hits inside `src` are the file itself and `src/lib/experiments/exposure.ts:13`, which imports `useExperimentInView` from the **shared** package, not this shim. The T5 shape: a per-site fork kept alive by its own doc comment, which is dangerous because a future "fix experiment assignment" edit would land here and change nothing. | dead-code | delete the file | no |
| **TD-27** | `src/lib/faq-page-schema.ts` vs `packages/web-shared/schema/faq-page.ts` vs `src/lib/schema.ts:89-93` | **Three** FAQPage JSON-LD builders. `buildFaqPageJsonLd` (local, used by the 4 `/research` pages), `buildFaqJsonLd` (local, `schema.ts`, used by homepage / `/for/[slug]` / `/locations/[slug]` / both templates), and the shared package's copy, **which has zero importers on this site**. | Three sources of truth for the same schema. No divergence found today (all three emit the same shape, and every caller passes the **same array** it renders from, so the rule-10 drift defect does **not** recur). Recorded because a correction applied to one builder will silently miss 4-6 pages, which is exactly how TD-05/TD-08/TD-09 survived their corrections. | maintenance risk | collapse onto the shared builder | no |
| **TD-28** | 53 lines across 6 user-facing files: `src/lib/calculators/tools/cis-back-years-calculator.ts` (17), `cis-vs-paye-comparison.ts` (8), `cis-deduction-calculator.ts` (5), `cis-invoice-splitter.ts` (4), `cis-take-home-calculator.ts` (1), `src/app/llms-full.txt/route.ts` (8) | Em-dashes in rendered copy: calculator **field labels** (`"2025/26 — Gross CIS income"`, `"2024/25 — CIS deducted at source"`, `` `${y.label} — estimated refund` ``) and the `llms-full.txt` tool listing | Locked rule: no em-dashes in user-facing copy. `house_positions.md:9` states it for this site specifically: "No em-dashes anywhere (commas, parentheses, full stops, middle dots only)." These are visible labels on five live calculators, not comments: the 17 in `cis-back-years-calculator.ts` are every input label on the four-year refund tool. The `llms-full.txt` ones are served to LLM scrapers. Excluded after reading: 30 further hits that are genuine code comments (`UnionJack.tsx` 5, `LeadForm.tsx` 3, `page.tsx` 1, `for/page.tsx` 1, and the `// YEAR N —` markers) and 8 in `.test.ts`. | banned-claim (style rule) | replace with a colon or a full stop. Do **not** touch en-dashes in numeric ranges | no |
| **TD-29** | `src/config/service-tiers.ts:64,70` | `{ icon: "📖", value: "57+", label: "CIS guides and articles" }` on the homepage `StatsBar` and `/services` | Stale. `ls content/blog \| wc -l` = **82** published posts. The comment at `:64` admits the provenance: "site memory notes ~57 posts". `57+` is not false (82 ≥ 57) but it understates the asset by 30% on the two pages that exist to establish authority, and it is hand-maintained where the number is derivable. The sibling stats were checked and are **correct**: "12" free calculators = 12 entries in `src/lib/calculators/registry.ts:32-45`; "7" specialist services = 7 `title:` entries in `services/page.tsx:27`. | stale-copy | derive it (`getAllPosts().length`) or update to "80+" | no |
| **TD-30** | `niche.config.json` `blog` (top level, line ~362) duplicating `cta.variants.leadgen.blog` (line ~343), byte-identical `cta_heading` / `cta_body` / `cta_button` | Two copies of the blog CTA copy | Only the variant copy renders: `BlogPostRenderer.tsx:299` reads `activeBlogCta`. The top-level block's only consumer is `src/lib/niche-config.test.ts:44-45`, which asserts it is non-empty. So a fix to TD-11's `£2,000` claim applied to the rendered copy leaves an identical uncorrected string in the file, and the test will keep passing either way. | maintenance risk | delete the top-level `blog` block and repoint the test | no |
| **TD-31** | `src/app/research/page.tsx:68`; `src/app/research/uk-construction-index/page.tsx:226`; `src/app/research/uk-construction-insolvency-index/page.tsx:197`; `src/app/research/uk-construction-payment-practices-league/page.tsx:161`; `src/app/research/uk-construction-survival-index/page.tsx:168` | `<Breadcrumb items={...} />` with no `variant`, rendered inside the `bg-neutral-900` (#171717) hero on all **5** `/research/*` routes | The default variant colours the trail `text-neutral-500` (#737373), which measures **~3.8:1 on #171717**, below the 4.5:1 text floor. `Breadcrumb.tsx:17,20,24` already ships `variant="light"` for exactly this case and **no call site passes it**, so the fix is one prop per page and the component needs no change. Same shape as the `.eyebrow` incident (`eyebrow-ground.test.ts`): a safe-on-white default reused on a dark ground. | a11y / contrast | pass `variant="light"` on all 5 call sites | no |
| **TD-32** **CLOSED 2026-09-12** (P6-F) | `src/components/ui/StickyCTA.tsx:147` | `data-cta-id="sticky_cis_refund"`, and the dismiss button carries no id at all | `packages/web-shared/analytics/autoCapture.ts:100` resolves every click through `closest("[data-cta]")`. `data-cta-id` does not match that selector, so **the only persistent site-wide CTA on this site has never emitted a single `cta_click`**, and its dismiss has no id to emit one with. The only surface in either repo spelling it this way. Verified: the attribute is on the live component, not in a comment, and the misspelling is the whole defect. | instrumentation | rename to `data-cta="sticky_cta"` plus `data-cta-placement` / `data-cta-goal`, and add `sticky_cta_close` to the dismiss. **This adds a new row to `vw_cta_performance`**: the new id is a new measurement, not a regression, and must be called out in the commit message and the deploy note. **DONE 2026-09-12.** Renamed to `data-cta="sticky_cta"` + `data-cta-placement="sticky"`; the existing `data-cta-goal` conditional is unchanged; the dismiss button now carries `data-cta="sticky_cta_close"` + `data-cta-placement="sticky"`. The id is `sticky_cta`, not the old attribute value `sticky_cis_refund`: the old value never reached the warehouse, so there was nothing to stay consistent with. The deliberate tripwire at `src/tests/design/cta-attribute-diff.test.ts:237-245` was flipped to assert the opposite (data-cta present, data-cta-id absent) in the same change, and both new triples are pinned in `PINNED`. **The 25% scroll threshold was deliberately KEPT** (owner gate 4): Trade shows the bar at 25% against the estate's 30% and that is a tuned local deviation, not drift. **Two new `vw_cta_performance` rows, no history moved.** | no |
| **TD-33** **CLOSED 2026-09-11** | `src/data/trade-types.ts`, 33 `stats` tiles (renders on all **45** `/for/[slug]` pages) | `{ value: "~£2,000", label: "first-year CIS refund" }` and `"annual CIS overpayment"` | The §13 market figure published as a bare stat tile. **18 of the 33 carried no qualifier at all**, which is the strongest possible form of the claim: a number in a stat block reads as measured fact, not as an illustrative market range. Structured tiles, so the Rule 4 prose pattern never saw them. | banned-claim + unsourced | relabel every tile so the qualifier is inside the label itself. **DONE 2026-09-11:** all 33 now read `Illustrative first-year CIS refund` (30) or `Illustrative annual CIS overpayment` (3). Verified: `grep -c "£2,000"` = 33, `grep -c "Illustrative"` on the same lines = 33, remainder 0. | no |
| **TD-34** | `src/lib/support/faq.ts:54`; `src/app/glossary/[slug]/data.ts:68`; `src/app/locations/[slug]/data.ts` (the unattributed remainder, including `:918`, `:1070`, `:1148`, `:1226`, `:1762` "typical" and `:84`, `:163`, `:237`, `:311`, `:389`, `:1457`, `:1531` "illustrative"); and ~13 lines across `content/blog/*.md` | "A typical refund for a registered sole trader is in the range of £2,000 to £3,000 per year"; "The typical annual refund for a sole-trader CIS subcontractor is around £2,000"; "The typical first-year refund ... is around £2,000" | The residual tier. Each of these is hedged as typical or illustrative, which §13 **permits**, and none claims it as our own clients' result, so none is a TD-10 or TD-11 breach. What every one of them lacks is the **attribution**: §13's writing rule is "present as typical/illustrative **and attribute the refund average appropriately**", and these satisfy the first half only. Recorded so the tier is visible rather than assumed clean. | unsourced (permitted framing, missing source) | low priority: on next touch of each file, fold the source in as `content/blog/what-is-a-cis-accountant.md:59` does (Dearne £1,840, RIFT range, named in the sentence). Not a blocker: the framing is already compliant with §13. | no |
| **TD-35** **CLOSED 2026-09-11** | `content/blog/cis-mistakes-that-cost-subcontractors.md:25` (FAQ JSON-LD), `:38` (the mirrored `faqs` entry), `:147` (comparison table); `content/blog/cis-back-years-refund-guide.md:31` | "For a subcontractor owed **an average of around £2,000 a year**" (x2, schema and rendered FAQ); "~£6,000 unclaimed over 3 years **at £2,000/year average**"; "the typical registered subcontractor is owed money back every single year, **with an average around £2,000** (illustrative, not guaranteed)" | Population averages stated without attribution. The first three assert the average as flat fact (and the schema copy reaches structured data); the fourth carries the illustrative hedge but no source, so §13's attribution half is unmet. | unsourced | **DONE 2026-09-11.** Reworded in flowing prose rather than dropped in verbatim: `:25`/`:38` now "owed the **third-party reported** average of around £2,000 a year (illustrative, not guaranteed)", `:147` "at the **illustrative £2,000/year market average**", and back-years `:31` "with a **third-party reported** average of around £2,000 (illustrative, not guaranteed)". Left deliberately: `:42` and `:90` of the same file, which already read "Based on market figures from CIS-specialist accountancy firms ... illustrative and not guaranteed", and `:108`, which is an explicitly conditional worked example 18 lines below that attribution. | no |
| **TD-36** **CLOSED 2026-09-12** (P6-D) | `src/app/cookie-policy/page.tsx:19-21,24,50-60`; `src/app/privacy-policy/page.tsx:202-204` | "Cookies are small text files stored on your device", "1. What cookies we use", "2. Purpose of cookies / We use cookies to", "We use cookies and similar technologies for analytics" | The analytics path sets **no cookies**: `grep -rn "document.cookie" src packages` returns **0**. What it uses is web storage. Two published policies describe a mechanism the site does not use, which is a false statement about our own processing in the two documents a regulator reads first. | T18 compliance copy | say "cookies and similar technologies including browser storage", and describe web storage where the page currently says cookie. **DONE 2026-09-12**, gate 2. `/cookie-policy` now opens by distinguishing a cookie from browser storage, names `localStorage` (visitor id, persists between visits) and `sessionStorage` (session id, resets after 30 minutes idle) as what the analytics path actually uses, and retitles sections 2 and 3 to "cookies and browser storage". `/privacy-policy` section 8 becomes "Cookies, browser storage and analytics". Re-verified: `grep -rn "document.cookie"` across `construction-cis/web/src` and `packages/web-shared/analytics/` returns **0**. The page does not claim a PECR exemption from this; the wording change is a description fix only. | no |
| **TD-37** **CLOSED 2026-09-12** (P6-D) | `src/app/cookie-policy/page.tsx:28-30` | "**We do not currently use any strictly necessary cookies.** Our Site functions without requiring cookies for basic operation." | Absolute, and false: `src/app/api/admin/login/route.ts:78` sets a session cookie (`res.headers.set("Set-Cookie", buildSessionCookie(...))`). It is an admin-only cookie, which is exactly what a strictly necessary cookie is. The sentence is stated without qualification, so nothing in the page narrows it to visitors. | T18 compliance copy | qualify it: no cookies are set for ordinary visitors; a session cookie is set for staff signing in to the admin area. **DONE 2026-09-12**, gate 2. The absolute sentence is replaced with exactly that qualification, under a "Strictly necessary cookies" heading rather than deleted, so the page still answers the question. Re-verified at source: `src/app/api/admin/login/route.ts:78` `res.headers.set("Set-Cookie", buildSessionCookie(expected))`, read back in `src/app/admin/analytics/checkAuth.ts`. | no |
| **TD-38** | `src/app/privacy-policy/page.tsx:168` | "Consent records are kept for up to **six years**, under access controls" | `src/lib/leads/retention.ts:78` preserves `consent_text`, `consent_at`, `status`, `source`, `created_at` **unconditionally** (the purge anonymises around them) and no six-year expiry job exists anywhere: `grep -rn "six years\|six-year" src` returns only this sentence. Published words ahead of shipped code. **DL-7 ruling, owner, 2026-09-12: CHANGE NOTHING on Trade.** `Property/web/src/app/privacy-policy/page.tsx:201-203` publishes the identical sentence with the identical absence of a job, so Trade is a faithful clone and a unilateral fix puts one site out of step with fourteen. Filed as the record; the remedy is **out of Phase 6 scope**. | T18, code-vs-copy | none in this phase. Estate-wide owner item: either ship the expiry or reword all 15 sites together | **yes, deferred** |
| **TD-39** | `src/app/privacy-policy/page.tsx:167` | "we keep enquiry data for N months after the enquiry, **after which it is deleted**" | `src/app/api/cron/lead-retention/route.ts:51-54` is **dry-run unless `LEAD_RETENTION_PURGE_ENABLED` is `1` or `true`**, and `retention.ts:10-11` anonymises rather than hard-deletes even when armed. So "it is deleted" is two steps from what runs. **DL-7 ruling as TD-38: Property is identical (`vercel.json:9` schedules the same job behind the same env gate), so CHANGE NOTHING on Trade.** Filed as the record; remedy **out of Phase 6 scope**. | T18, code-vs-copy | none in this phase. Same estate-wide owner item as TD-38 | **yes, deferred** |
| **TD-40** | `src/app/api/og/route.tsx:33,62,85,101` | `background: "white"`, `color: "#1e293b"`, `color: "#64748b"`, and no custom font loaded | Every social card for all 82 articles renders off-token (raw hexes that are not the site's palette) and in the edge runtime's default face while the site itself is Geist. The one place our brand is seen outside our own chrome is the one place it is not applied. | brand / design | swap the three literals for the site tokens. The custom font is **explicitly declined** this phase (a font fetch on the edge route is a different risk) | no |
| **TD-41** **CLOSED 2026-09-12 with TD-18** | `src/app/cis-refund/page.tsx:285`; `src/app/gross-payment-status/page.tsx:281` | `LeadCTAPanel` proof point: "**Fixed fees, quoted before we start**" on both pillar pages | Identical claim shape to **TD-18**, which is owner-gated for the same sentence on `/about`, `/services` tiers and `cis-refund`. Under the pool model we do not quote at all: the enquiry goes to independent partner firms that set their own fees (`privacy-policy/page.tsx:109-119`). Two more promises about commercial terms we are not the party to make, on the two highest-intent pages on the site. **Inherited from Phase 5's surface, not introduced by Phase 6**: both lines arrived with the Phase 5 pillar build (`da7ec668`), nobody filed them, and they were outside the TD-18 file list. | live-false-statement (minor) | fold into TD-18's resolution and reword both with it, never separately: one wording, all five call sites. **2026-09-12: the wording now exists** (see TD-18). Both these are `LeadCTAPanel` proof points, so take the proof-point form verbatim: title "Fees agreed before any work starts", detail "The specialist firm you speak to sets its own fee and agrees it with you up front." **STILL LIVE.** Both files are Phase 5's surface and outside P6-D's fence; P6-D built the identical proof point into `/about`'s new panel so the three read the same the moment these two are patched. Note the sweep found the claim shape on **11** source lines, not five: TD-18 now carries the full list. **CLOSED 2026-09-12 by the cross-fence claim package.** Re-derived by rule over `src` AND `content` (body copy, frontmatter `faqs`/`keyTakeaways`/`metaTitle`/`metaDescription`/`summary`, and `schema:` JSON-LD): the deriving grep returns **12** source lines, not 11. The extra two are `src/app/about/page.tsx:122` and `src/app/contact/page.tsx:141`, **both inside code comments** (the /about fix note quoting the old string, and the /contact note explaining why Property's `WhatToExpectCard` default is not inherited); neither renders, both left. `content/` carries **zero** instances of the claim shape: every `fixed fee` / `per month` hit there is third-party software or market-rate reporting about the reader's own pricing, not our fee position. FIXED at all 10 live call sites. Proof-point form verbatim at the five `LeadCTAPanel` sites: `src/app/blog/page.tsx:158-159`, `src/app/glossary/page.tsx:149-150`, `src/app/glossary/[slug]/page.tsx:172-173`, `src/app/cis-refund/page.tsx:285-286`, `src/app/gross-payment-status/page.tsx:281-282` (the last two = TD-41). Non-panel shapes rewritten to the same meaning: `src/config/service-tiers.ts:35` feature bullet -> "Fee agreed with you before any work starts"; `src/app/page.tsx:292` hero trust strip "Fixed fees. Plain English. No hard sell." -> "Plain English. No hard sell. No obligation." (the fee token deleted, not replaced, because a three-word strip cannot name the promising party); `src/app/page.tsx:395` and `src/app/services/page.tsx:239` -> "...speak to us directly. The specialist firm you speak to sets its own fee and agrees it with you up front."; `src/app/page.tsx:678` `{title, sub}` pair -> title "Fees agreed before any work starts", sub "The specialist firm you speak to sets its own fee". **Two further instances of the same fee-position rule that the token grep could not see**, both closed here: `src/app/locations/[slug]/data.ts:773` ("This keeps our fees lower and means you are never paying for the overhead of local office space", a comparative claim about our own fee level) -> "It means there is no local office overhead behind the work."; and `src/data/trade-types.ts:252` ("the refund covers our fee many times over in the first year", `CLAIMS_REGISTER.md:162` rule 4, fee + aggregate-outcome in one sentence) -> "Fees are agreed with you before any work starts." **Judged neutral and left:** `src/app/locations/[slug]/data.ts:690` ("professional fees including our accountancy charge") states that an accountancy fee is an allowable expense, which is tax fact, not a fee position; all `content/blog/*` £/month and hourly-rate figures (software pricing, bookkeeper market ranges) are third-party and attributed. No guard pins any string changed: `grep -rniE "fixed fee|no surprises|client base|Every client|proofPoint" src/tests` returns nothing. `src/config/site.ts` untouched. | | **yes, with TD-18** |
| **TD-42** **FILED AND CLOSED 2026-09-12** | `src/components/marketing/MarketingSections.tsx:37` (`WhoWeAreSection`, rendered on the **homepage** and **/contact**) | "We are specialist accountants for CIS subcontractors and contractors. **Every client we work with operates in the construction industry under CIS.** That focus means we understand the financial specifics of construction work in a way that a general practice does not." | The client-base claim `PROPERTY_STANDARD_ROLLOUT.md` section I locks out (no client records exist anywhere in the estate), on the site's two highest-traffic surfaces. An earlier phase lifted the paragraph out of `/about` into the shared component **before** `/about` was corrected, so `/about` was right and the two copies were still wrong: the estate's fix-one-surface failure mode, third occurrence on this site. | banned-claim | FIXED: the middle sentence replaced with the corrected `/about` wording, "Construction under CIS is the whole of what we do, not a sideline", so all three surfaces now read the same. The sibling instance `CLAIMS_REGISTER.md:162` files on `src/app/page.tsx:411` ("a large CIS client base") is **already gone**: `grep -rn "large CIS client base" src` returns only the /about comment quoting it. Rule-swept for the whole class (`client base`, `our clients`, `every client`, `most of our`, `we act for [0-9]`, `hundreds/thousands of clients`, numeric client counts) over `src` and `content`: **no further live instance**. TD-04's sentence (`content/blog/allowable-expenses-cis-subcontractor.md`, "For most clients the refund more than covers the cost of the accountant") is also already gone. Left as NOT this class, per `CLAIMS_REGISTER.md:166`: the 64-line "we act for / we do the rest" positioning family, which is one owner-gated decision and not mine to re-voice. | **yes, homepage + /contact** |
| **TD-43** **FILED AND CLOSED 2026-09-12** | `src/app/locations/[slug]/data.ts:116` (Manchester `intro`, rendered on `/locations/manchester`) | "**Most refund claims are turned around within eight weeks of us receiving your deduction statements**, and we look back four years on every new client engagement to maximise the combined claim." | A 24th instance of the TD-13/TD-14 turnaround class, found by re-sweeping the rule while closing TD-18. The class was declared closed at 23 across 19 files; the earlier sweeps ran over components and page copy and never reached the location `intro` HTML strings. Same falsity as TD-13: under the pool model the enquiry goes to independent firms and we do not control the timetable, and HMRC controls the repayment. | live-false-statement + banned-claim | FIXED: timing clause deleted, no replacement duration. Now "We look back four years on every new engagement to maximise the combined claim. HMRC controls the repayment timetable once the return is filed." (matches the already-correct Birmingham `intro` at `:190`). Re-swept the full duration rule over `src` and `content` after the fix: remaining hits are HMRC statutory deadlines, third-party software notes, and code comments about the rule itself. | **yes** |

---

## 2. Per-rule sweep proof

Scope for every sweep: `construction-cis/web/src`, `construction-cis/web/content`,
`construction-cis/niche.config.json`. `.test.ts` / `.test.tsx` excluded from the banned-claim and
style rules (not user-facing) but **not** from the false-assurance check, which is how TD-07 was
found. Pound-sign representation established above: **literal UTF-8 character**.

### Rule 1: no published advisory pricing, anywhere

| pattern | hits | verdict |
|---|---|---|
| `£[0-9,]+(\.[0-9]+)? ?(–\|-\|to\|and) ?£?[0-9,]+ ?(a \|per \|/)(month\|mo\|year\|annum)` | 34 | 1 breach (TD-03). 33 cleared: third-party software pricing (QuickBooks, Xero, Sage, Clear Books, FreeAgent, Nomi, BrightPay), NICEIC/NAPIT scheme fees, caveated §13 bookkeeping bands, worked CIS examples |
| `£[0-9,]+ ?(a \|per \|/)(month\|mo\|year\|annum)` | 41 | 1 breach (TD-02, dormant). Rest as above |
| `(from\|starting at\|starts at\|start at\|as little as\|only) £[0-9]` | 4 | 1 breach (TD-02: `contact/page.tsx:29`) + 3 in the dormant `packages` variant |
| `priceRange` | **3** | **3 breaches (TD-01)**, one of them in the shared kit (TD-K1) |
| `"price"\|price:\|offers` | 11 | 0 breaches. `src/lib/calculator-schema.ts:29` `offers: { price: "0", priceCurrency: "GBP" }` is the free-tool exemption the brief names. The other 10 are recharts `<Bar>` props and blog prose about software plan prices |
| `aggregateRating\|reviewCount\|ratingValue` | 0 | clean, no fabricated review schema |
| `our fees?\|fee structure\|monthly fee\|fixed[- ]fee\|per month` (read in full) | 180+ | 4 breaches (TD-03, TD-04, TD-18 x3). The volume is third-party software and scheme fees |

`src/config/service-tiers.ts` read in full: **no £ figures.** Tiers are named, not priced. The one
fee-adjacent string is "Fixed fee, quoted before we start" (TD-18). The homepage `StatsBar`
(`siteStats`, same file) carries no money value.

### Rule 2: no turnaround or response-time promises

Pattern: `same[- ]day|within (24|48|72) ?hours|24h|next working day|turnaround|respond within|reply within|get back to you within|one working day|response time|response guarantee`

**Hits: 18 breaches across 14 files.** TD-13 (6) and TD-14 (12). **Re-swept 2026-09-11 by rule rather than by token, 22 patterns: the original count was two short.** `src/lib/page-summaries.ts:52` and `src/lib/support/faq.ts:28-29` carry the same promise and were not listed, so the true figure is **20 breaches across 16 files**, of which **all 20 are now closed** (the last three, `LeadForm.tsx:495`, `:513` and `SpecialistWidget.tsx:383`, on 2026-09-11). A by-rule sweep of the soft forms ("shortly", "soon", "quickly") on the same day found **two more live breaches the token sweep missed** - `src/app/complete/page.tsx:87` and `src/components/forms/DetailsForm.tsx:104`, both "a specialist ... will be in touch **shortly**", both on post-enquiry capture surfaces. Logged as **TD-14b**, closed 2026-09-11. True total is **23 breaches across 19 files, all 23 closed**: a further by-rule sweep on 2026-09-11 found `src/app/api/leads/confirm/[token]/route.ts:61` ("We will be in touch **shortly**") in the server-rendered confirm-callback page, logged as **TD-14c** and closed. Web-page copy, so it is in scope; the four surviving instances in transactional **email** valedictions remain out of scope by the earlier judgement. Also cleared as NOT breaches on that re-sweep: `niche.config.json:345` ("illustrative, not guaranteed" is the §13 caveat, not a speed promise); `src/components/forms/DetailsForm.tsx:121` ("a quick note" describes the note's length, not a turnaround); `src/lib/leads/handoff.ts:149` ("Response time" in the operator handoff email, an internal latency measure never shown to a visitor); the "quickest way to claim" family in `src/lib/assistant/opener.ts` and `src/lib/resources/registry.ts` (about the claim route, which HMRC times, not about our reply). **Three of the eighteen are in
`metadata.description`** (`contact/page.tsx:12`, `thank-you/page.tsx:10`, and `cis-refund`'s via
TD-11's neighbouring line), so they reach the SERP. Four use the word **"guarantee"**.

Non-breaches excluded after reading each in context: the `privacy-policy:136` 48-hour **pool
re-offer disclosure** (a factual statement about partner firms, not a promise to the visitor);
`privacy-policy:186` "respond within one month" (the statutory UK GDPR DSAR deadline, correct);
`glossary/[slug]/data.ts:738` "target turnaround for these in-year repayments is 25 working days"
(HMRC's EPS/CIS repayment target, locked in `house_positions.md` §11a, correct); the entire
`src/lib/leads/nurture-*` and `nurture-digest` family (`sends24h`, `complaints24h`, internal
monitoring thresholds, never rendered); `lead-nurture.ts:280` and `aux-cron.ts:308` ("same-day
SMS" = internal send-window naming); `admin/analytics/trends/page.tsx:69` (`h24hourly` bucket
variable); `api/leads/events/route.ts:98` (a code comment about a throttle window).

### Rule 3: no contingent-fee / no-win-no-fee idioms

Pattern: `no win|no fee|no[- ]win[- ]no[- ]fee|success fee|only pay if|no refund no fee|percentage of your refund|cut of your refund|we only get paid`

**Hits: 1, and it is a false positive.**
`content/blog/cost-to-qualify-electrician-self-employment.md:21` — "The apprenticeship route
carries almost **no fee** cost" — read in context, this is about apprenticeship training costs, not
a contingent-fee offer. **Clean.** Notable given §12.B: the site is positioned against the RIFT
rebate-factory model and the copy holds that line.

### Rule 4: no client-behaviour, client-count or aggregate-outcome claims

Pattern: `most (of our )?clients|our clients (typically|usually|often|prefer)|clients (typically|usually|prefer|tell us)|most (businesses|subcontractors|subbies|contractors|tradespeople|people|trades) (we|qualify|are owed|get)|most .{0,25} qualify|[0-9]{2,}\+? (clients|subcontractors|contractors|businesses|customers|trades)|we('ve| have) (saved|helped|reclaimed)|saved (our )?clients|trusted by|join [0-9,]|average (client|refund) of|our average|our client base|refund we see|first-year clients`

**Hits: 13 breaches.** TD-10 (10), TD-11, TD-12, TD-04. **Count corrected 2026-09-11:** the pattern is prose-shaped and never reached the structured stat tiles, so it missed `src/data/trade-types.ts`, which carries **33 `~£2,000` refund tiles across the 45 trade pages**, **18 of them uncaveated** at the time of the sweep. Logged as **TD-33**, closed. The by-file re-sweep is the one that found them; the by-token sweep could not.

**Client counts specifically: 0.** No "1,200 subbies served" style claim anywhere. The `[0-9]{2,}
(subcontractors|contractors)` matches are all third-party: "a housebuilder paying 40
subcontractors", "contractor paying 1-10 subcontractors", "up to 15-20 subcontractors" —
descriptions of a *reader's* business, read and cleared.

**"most businesses qualify" framing: 0 hits.** Pattern
`most businesses qualify|most (people|clients|subcontractors|trades) qualify|you('ll| will) probably qualify|most .{0,20} are eligible` → empty. Clean.

**Explicitly NOT a breach, recorded so it is not re-filed:** "Most subcontractors are owed a
refund" / "most registered CIS subcontractors end the year with more CIS deducted than their total
tax liability" (`page.tsx:70`, `what-is-cis.md:176`, `mtd-income-tax-cis.md:147`,
`how-long-does-cis-refund-take.md:44`, `cis-back-years-refund-guide.md:180`,
`trade-take-home-calculator.ts:208`, `niche.config.json` sticky copy, and ~6 more). This is
**directly derivable from `house_positions.md` §9**, which states it in those words: "registered
subcontractors very commonly **overpay** across the year and are due a **refund**", because CIS is
taken on labour before expenses and the personal allowance. It is a statement about the mechanics
of the scheme, not about our clients. Correct as published.

### Rule 5: every published statistic re-derivable from house_positions.md

**Expiry check on the figures the Generalist port was publishing wrongly, and on the estate
ground-truth facts. All clean, and deliberately so:**

| figure | house position | on-site status |
|---|---|---|
| Dividend 10.75 / 35.75 / 39.35% | §11 | **correct everywhere.** `grep -rn '8\.75%\|33\.75%'` → 4 hits, **every one** explicitly marks the old rates as superseded ("those are now out of date", "any comparison using the old 8.75% or 33.75% rates overstates the company case"). `trade-types.ts:2698` even names the correct FA 2026 s.4 source. Zero live uses of the old rates |
| AMAP 55p / 25p from 6 Apr 2026 | §11 | **correct.** `grep -rn '45p'` → 6 hits, all six framed as historic ("up from 45p", "Previously 45p", "an increase from 45p"). Zero bare 45p |
| Employer NIC 15% above £5,000 | §11 | **correct.** `grep -rn '13\.8%\|£9,100'` → 3 hits, all three historic, one of them (`cis-national-insurance-guide.md:187`) carrying an explicit writer warning: "Do not use the old 13.8% rate or the old £9,100 threshold: both are out of date" |
| BADR 18% from Apr 2026 | estate ground truth | **0 hits.** Not published on this site. `house_positions.md` "Source index" records the omission as deliberate ("Sections with no SITE_PLAN §8 equivalent ... are intentionally omitted rather than fabricated") |
| Class 4 NIC 6% / 2%, never 9% | §11a | **correct.** `grep -rnE '9% (between\|on\|above)\|Class 4.{0,40}9%'` → 0 hits |
| VAT registration £90,000 | §11a scope / estate | **correct.** `grep -rn '£85,000'` → **0 hits.** `trade-types.ts:148` uses £90,000. The Generalist's stale-threshold defect does not recur |
| super-deduction / enhanced capital allowances / 12.5% hospitality VAT / RDEC | abolished or expired | **0 hits each.** `grep -rniE 'super.deduction\|enhanced capital allowance\|RDEC'` → empty. None of the Generalist's six expired-relief defects recur |
| SSP £123.25, block £116.75 | §11a | **correct.** `grep -rn '116\.75'` → 0 hits |
| MTD ITSA £50,000 Apr 2026 / £30,000 Apr 2027, gross-not-net | §8 | **correct** across 8 surfaces; `services/page.tsx:91` and `locations/[slug]/data.ts:1086` both carry the gross-income nuance §8 requires |
| CIS 0 / 20 / 30% with the labour-only base | §1 | **correct**, and the labour-only rule is present on every deduction-discussing surface checked |
| GPS turnover £30,000 / £100,000 | §2 | **correct.** No instance of the historic £200,000 SI figure §2 warns QA agents about |
| GPS cash-flow ~£100k on £500k turnover | §3 | **correct** (`glossary/[slug]/data.ts:312`, `:454`) |
| s.62A 20% of the payment, £40,000 on £200,000 | §3 | **correct** arithmetic at `glossary/[slug]/data.ts:518` |
| §12.D off-mission trades | §12.D | **correct.** No `/for/architects`, no `/for/quantity-surveyors` in the 45 trade slugs; `/for/civil-engineers` is present as §12.D requires |
| §12.A no self-ranking | §12.A | **correct.** No "best CIS accountant" / "top 10" self-ranking page. The one `best-*` post is `best-cis-accounting-software.md`, which ranks third-party software, which §10 permits |

**4 failures, all in the same two hand-maintained data files and all the same pattern: a
`house_positions.md` correction that reached the blog cluster and not the rest of the site.**
TD-05 (30% of tax lost, 4 surfaces), TD-08 (s.62B at 20%), TD-09 (12-month penalty at 100%,
3 surfaces), TD-10/TD-11 (the §13 £2,000 figure presented as our own client outcome and
uncaveated, 13 surfaces). **13 corrected to 46 on 2026-09-11**: the same figure is also on
33 `/for/[slug]` stat tiles (TD-33), which no prose sweep saw. All 46 closed; the hedged-but-
unattributed residual is TD-34. `src/app/glossary/[slug]/data.ts` and
`src/app/locations/[slug]/data.ts` carry all of them and are the two files a Phase-5 fact pass
should read end to end.

### Rule 6: compliance copy must describe the code that actually runs

**GA: the site runs none.** `niche.config.json:251` `"google_analytics_id": ""`;
`layout.tsx:97` `<ConsentedScripts gaMeasurementId={niche.seo.google_analytics_id} />`, and
`ConsentedScripts` renders nothing for an empty id. The comment at `layout.tsx:88-89` says exactly
that and is, unusually, **true** (verified against the config, not taken on trust). So
`cookie-policy:43-47` ("This Site does not use Google Analytics") is **correct** — and
`cookie-policy:104-120`, a full GA opt-out section on the same page, is TD-16.

**First-party analytics.** Live handler `src/app/api/track/route.ts:17` →
`packages/web-shared/analytics/server/createTrackHandler.ts`. Persists country, city, region,
timezone (:148-151, from `x-vercel-ip-*` headers at :231-234) against a persistent visitor id.
Cookie policy claim checked line by line: identifier disclosure **correct** (:36-38, better than
Medical, which omitted it); "only a country derived from it" and "anonymous" **wrong** → TD-17.
No `anonymize_ip` claim is made, so the Medical defect 10 shape does not recur.

**Pool model vs capture copy.** `privacy-policy/page.tsx:107-136` read in full against the locked
caps in memory `pool_model_compliance_alignment` (3+3 = max 6). It discloses: legitimate interest
as the basis, the exact field list, up to three firms in the profession, up to three in related
professions, "at most six firms", each firm as an independent controller, the 48-hour re-offer, the
right to object, and `enquiryRetentionMonths` read from config rather than hardcoded. **Matches the
code and the caps.** The canonical consent wording at `src/config/site.ts:17` is also correct and
complete. Against that: TD-15 (`/complete` promises single-purpose use of the phone number),
TD-18 (we promise fixed fees we do not set), TD-13/TD-14 (we promise a response we do not make).
`/terms` read in full: no fee, refund or response claims; clean.

### Rule 7: dead internal links

Full internal-href set built from both `src` and `content`:
`grep -rhoE '(href|ctaHref)="?\{?"?/[^"#?'"'"' ]*' src content` → **84 unique paths**. Diffed
per family against routes derived from the app directory and the registries:

- `/blog/<category>/<slug>` (52 links) → slugified `category:` frontmatter + filename over all 82
  `content/blog/*.md`. `comm -23` → **empty**. All 52 resolve. (First pass reported 52 dead: that
  was my own bug, the category is a display name the route slugifies. Re-derived and corrected
  before filing.)
- `/calculators/<slug>` (8 links) → 12 slugs from `src/lib/calculators/tools/*.ts`. `comm -23` →
  **empty**.
- `/for/<slug>` (4 links) → 45 slugs in `src/data/trade-types.ts`. `comm -23` → **empty**.
- `/research/*` (4) → all four page directories exist.
- Static routes (`/about`, `/services`, `/contact`, `/cis-refund`, `/gross-payment-status`, both
  templates, `/for`, `/blog`, `/embed`, all three policies, `/admin/analytics/*`) → all present in
  `find src/app -name page.tsx`.
- `/pricing` → the one soft case, **TD-20**.

**So: 83 of 84 resolve, and the 84th is a 308, not a 404.** Solicitors' 10 dead links plus an
unrouted hub do **not** recur. Sitemap cross-checked too (`src/app/sitemap.ts:16-91`): every
indexable route family is emitted, including glossary (50), locations (25), `/for` (45),
calculators (12), blog categories and posts, and resources; the only omissions are `/book`,
`/complete`, `/thank-you`, `/admin/*`, `/embed/*`, correctly excluded.

### Rule 8: accessibility defects that hide data

`grep -rn 'role="img"' src` → **3 hits**, two of them in a doc comment and the brand mark
(`src/components/brand/UnionJack.tsx:10,34`, correctly paired with `aria-label`, not a chart).
The third is `PremiumBarChart.tsx:97` → **TD-21**.

**The brief's premise about the 4 research pages is FALSE for this site.** Trade's four research
data assets render through **recharts** (`src/components/research/ConstructionIndexCharts.tsx`,
`InsolvencyIndexCharts.tsx`, `PprLeagueChart.tsx`, `SurvivalIndexCharts.tsx`), via
`@/components/ui/chart`'s `ChartContainer`. `grep -rn 'role=\|aria-hidden'` across that directory
→ **empty**. There is no single `role="img"` node and no `aria-hidden` wrapper, so the Generalist
collapse defect does not exist here. Better: **all four pages ship real data tables** beside the
charts (`uk-construction-index` 2, `uk-construction-insolvency-index` 2,
`uk-construction-payment-practices-league` 2, `uk-construction-survival-index` 1), so the data is
reachable without the SVG. **Not a defect.**

**The brief's premise about `StatsCounter` is also FALSE for this site.** Trade imports
`StatsBar` from `@accounting-network/web-shared/components/StatsBar` (`page.tsx:26,247`,
`services/page.tsx:9,126`). That component was read in full (27 lines): it is a **pure
server-renderable function** that prints `{s.value}` as a literal string. There is **no animated
counter, no `useEffect`, no interpolation, and therefore no SSR-truncation defect** — the
Generalist's "60% of target value in the server HTML" bug cannot occur. So there is no "SSR fix" to
have reached Trade; the shared component never had the bug. The `aria-hidden="true"` on the emoji
icon at `StatsBar.tsx:20` is **correct** (decorative icon, label carried in text). What *is* wrong
with Trade's stats bar is the content, not the rendering: TD-13 ("24h Response guarantee") and
TD-29 ("57+" against 82 posts).

### Rule 9: anchor targets with no scroll offset

`href="#..."` links: **65** (`#ref-1` x40, `#ref-2` x11, `#ref-3..#ref-11` x11, `#main`,
`#downloads`). `id="..."` targets: **82** across 25 files.

Counted properly rather than by the naive grep: `grep -rhoE '[^>]*id="[a-zA-Z0-9_-]+"[^>]*' | grep -c scroll-mt`
returns 0, but that is because the offset-carrying targets use **templated** `id={id}` — 20 of them
across the four research pages, `services/page.tsx:140` and `calculators/[slug]/page.tsx:151`, plus
the shared blog chrome. Header is `sticky top-0 z-40` (`SiteHeader.tsx:59`) and
`scroll-behavior: smooth` is on (`globals.css:96`), so an unoffset target lands under the header.

**Trade's unoffset count is 31 targets across 10 routes** (30 in blog markdown + `#downloads`) →
**TD-22**. Solicitors' 428-across-80 does **not** recur: the pattern is already applied on the app
routes and the shared blog components, and `#main` is a skip link where the offset is irrelevant.

### Rule 10: FAQ / structured-data drift

`grep -rn "FAQPage"` → 3 builders (**TD-27**). Every caller traced:

| page | schema source | rendered source | same array? |
|---|---|---|---|
| `page.tsx:163` / `:573` | `buildFaqJsonLd(faqs)` | `faqs.map` | **yes** |
| `for/[slug]/page.tsx:165` / `:176` | `buildFaqJsonLd(type.faqs)` | `type.faqs.map` | **yes** |
| `locations/[slug]/page.tsx:75` / `:226` | `buildFaqJsonLd(city.localFaqs)` | `city.localFaqs.map` | **yes** |
| `cis-invoice-template/page.tsx:88` / `:226` | `buildFaqJsonLd(faqs)` | `faqs.map` | **yes** |
| `cis-payment-deduction-statement-template/page.tsx:209` | same local `faqs` | `faqs.map` | **yes** |
| `calculators/[slug]/page.tsx:139` | `tool.faqs` (schema via `calculator-schema.ts`) | `tool.faqs.map` | **yes** |
| 4 x `research/*/page.tsx` | `buildFaqPageJsonLd(faqs)` | `faqs.map` | **yes** |

**Zero drift: every surface feeds one array to both the schema and the page, so they cannot
diverge.** The Solicitors/Generalist two-`.map()` defect does not recur. `locations` is the
strongest case: the `hasFaqs` guard at `:75` means a city with no FAQs emits no schema, which is
the correct behaviour. What *does* drift here is the **content** of those arrays against
`house_positions.md` (TD-05, TD-10), not the schema wiring.

### Style rules (British English, no em-dashes)

- **Em-dash (U+2014):** 83 lines raw; **53 in rendered copy** after excluding 8 `.test.ts` lines
  and 22 genuine comment lines (verified by reading each, not by pattern alone) → **TD-28**.
  En-dashes in numeric ranges were **not** counted (allowed).
- **American spellings: 0 breaches.** Pattern
  `\b(recogniz|specializ|optimiz|minimiz|maximiz|organiz|analyz|anonymiz|prioritiz|summariz|authoriz|apologiz|utiliz|enrollment|fulfillment)[a-z]*`
  → 41 hits, **every one** a reserved identifier, not prose: schema.org `Organization` (33 hits
  across the research pages, `schema.ts`, `calculator-schema.ts`), the HTTP `Authorization` header
  and `authorized` in five cron route guards, and one `enrollment` in a Supabase column name. An
  earlier broader pattern returned 200+ and was **discarded as unusable**: it was matching
  Tailwind `text-center` and CSS `color` in `globals.css` and `chart.tsx`. Narrowed to prose
  morphemes, the site is clean. Trade is better here than Medical, which had 15.

---

## 3. Things that look like defects and are NOT

Recorded so the next reader does not re-file them.

- **`src/components/resources/ExcelPreview.tsx` writing money as `GBP 1,908.20`.** Deliberate: the
  spreadsheet preview renders in a monospace grid. Read in full, all 11 lines are worked CIS
  examples, no fee. Worth knowing because a `£`-only sweep never sees this file.
- **`calculator-schema.ts:29` `offers: { price: "0", priceCurrency: "GBP" }`.** The free-tool
  exemption the brief names. Correct.
- **"Most subcontractors are owed a refund."** Derivable from `house_positions.md` §9 in those
  words. A statement about scheme mechanics, not a client claim. ~12 surfaces, all fine.
- **Historic 8.75% / 33.75% / 45p / 13.8% / £9,100 mentions.** All four are framed as superseded,
  and one actively warns the reader off them. This is the *correct* handling of a rate change and
  is the opposite of the Generalist defect.
- **The four research pages' charts.** recharts, no `role="img"`, no `aria-hidden`, and all four
  ship data tables. Not a T16 defect. See Rule 8.
- **The shared `StatsBar`.** No animated counter, nothing to SSR-truncate. See Rule 8.
- **`src/components/ui/layout-utils.ts`.** 41 importers. The Medical port nearly deleted its
  equivalent on a bad importer grep; recorded here so nobody repeats it.
- **`src/lib/faq-page-schema.ts`.** Scores zero on a `faqPageSchema` grep because the export is
  named `buildFaqPageJsonLd`. It has 4 importers and is live. Derive the verdict, do not grep the
  filename.
- **`packages/web-shared/schema/faq-page.ts`.** Zero importers *from this site*, but it is shared
  kit with other consumers. Not Trade's to delete. See TD-27.
- **The `packages` CTA variant as a whole.** Real pricing, but `cta.variant` is `"leadgen"`, so
  `isPackagesMode()` is false and none of it renders. Filed as latent (TD-02), verified by reading
  the config, not by assuming.

---

## 4. DEFECTS IN THE SHARED KIT (estate-wide blast radius)

These are not Trade's to fix. Handed to the orchestrator.

| id | file:line | what is wrong | blast radius | minimal fix |
|---|---|---|---|---|
| **TD-K1** | `packages/web-shared/schema/local-business.ts:127` | `priceRange: "££"` in the shared `LocalBusiness` JSON-LD builder | **Every estate site that builds LocalBusiness schema through the shared kit** publishes an advisory price band in structured data. Trade's own two copies (`src/lib/schema.ts:71`, `:200`, = TD-01) are per-site forks of this same line, which is why the defect survives a per-site fix: correcting Trade's copies leaves the shared one live for every other consumer, and correcting the shared one leaves Trade's two forks live. Both ends need doing. | delete the `priceRange` key; then sweep for per-site forks of the same line across the estate |
| **TD-K2** | `construction-cis/web/src/components/calculators/premium/PremiumBarChart.tsx:88-99` **and** `Medical/web/src/components/tools/premium/PremiumBarChart.tsx:93,101` | The `aria-hidden` wrapper over a `role="img"` SVG (TD-21) is **byte-identical on at least two sites**, at the same structural position, with the same `aria-label` string. It is therefore not an independent bug but a **replicated per-site copy of a component that should be in the kit**. Every premium-calculator site is shipping the same inaccessible chart. | estate-wide a11y: the premium chart is unreachable on every site that has one | promote `PremiumBarChart` into `packages/web-shared`, fix the a11y once there, delete the per-site copies. Do **not** fix Trade's copy alone, that is the symptom fix the ladder warns about |

I did **not** edit `packages/web-shared/`, and did not touch `Solicitors/` or `generalist/`.

---

## 5. FALSE PREMISES IN THE BRIEF

Three, stated plainly because the brief asked.

1. **"Trade has 4 research data-asset pages with charts. Generalist's were a single `role="img"`
   node ... Check every chart/figure wrapper for `role="img"` and `aria-hidden`."** Trade's four
   research pages use **recharts**, carry **no** `role="img"` and **no** `aria-hidden`, and each
   ships a **data table** beside the chart. There is no defect to find there. The one `role="img"`
   chart on the site is the premium calculator's hand-rolled SVG (TD-21), which is a different
   surface from the one the brief pointed at.
2. **"Trade imports the shared `StatsBar` — determine which version it renders and whether the SSR
   fix reached it."** There is no SSR fix and never was a bug. `StatsBar` is a 27-line pure
   function that prints its `value` string; it has no counter, no animation and no client
   interpolation. The Generalist's `StatsCounter` truncation defect is structurally impossible
   here. Trade's stats-bar defects are content defects (TD-13, TD-29).
3. **"Anchor targets with no scroll offset ... Solicitors had all 428 targets across 80 routes.
   Count Trade's."** Trade is **31 across 10 routes**, not a site-wide absence. `scroll-mt-24` is
   already applied on the four research pages, `/services`, `/calculators/[slug]` and the shared
   blog chrome. The gap is confined to markdown-authored ids and one hand-written section.

A fourth, minor: the brief directed me to `src/config/service-tiers.ts` expecting pricing. There is
none there. The file's defect is the stats block (TD-13, TD-29), not the tiers.

---

## 6. OWNER'S WORD NEEDED

Plain English, one line each.

1. **We publish a price signal for our own fees in the hidden page data on 26 pages.** Google reads
   it. Every city page and the site-wide business listing carry a "££" price band, and one copy of
   it is in the shared code every site uses. Options: **(a)** strip it everywhere, or **(b)** you
   decide a price band is fine and we leave it.
2. **Ten city pages tell visitors what our own clients get back.** They say our clients average
   about £2,000 back. That figure is not ours: it is a marketing number from two other firms that
   our ground-truth file says must always be labelled "illustrative, not guaranteed". Options:
   **(a)** relabel all ten as a third-party typical figure, or **(b)** someone pulls our real
   client average and we publish that instead.
3. **Every blog post's sidebar says the average subbie overpays £2,000 a year, flatly, as fact.**
   Same borrowed figure, no caveat, and it also appears in the Google result for our refund page.
   Options: **(a)** caveat and reattribute, or **(b)** leave it.
4. **We promise a response time in eighteen places, four of them calling it a "guarantee", three of
   them in Google results.** We do not respond: the enquiry goes to up to six partner firms who
   contact the person themselves, and our own privacy page says a firm may take 48 hours. So the
   promise is against house rules and untrue. Options: **(a)** remove all eighteen and say "a
   specialist firm will be in touch", or **(b)** keep a promise and change how enquiries are
   actually handled.
5. **The page that collects someone's phone number promises we only use it to arrange their
   review.** We then share name, phone and email with up to six firms, including mortgage brokers.
   We already have correct wording written and sitting in the config. Options: **(a)** use the
   correct wording, or **(b)** leave it, accepting the page contradicts our privacy policy.
6. **Our cookie page tells visitors how to opt out of Google Analytics. We do not run Google
   Analytics.** The same page says so correctly sixty lines earlier. Options: **(a)** delete the
   section, or **(b)** leave a section that does nothing.
7. **Our cookie page says we do not store anything beyond a country. We store city, region and
   timezone, against a permanent visitor id.** Options: **(a)** say what we actually store, or
   **(b)** leave the page understating it.
8. **Three pages say we work on a fixed fee and you know the price before we start.** Under how the
   site actually works the partner firm sets the fee, not us. Options: **(a)** reword to describe
   what the firm does, or **(b)** leave it.
9. **A dormant price list is one switch away from going live.** If the call-to-action mode is ever
   flipped, the site immediately publishes "plans from £24 a month", £49 and £79, across the
   header, the hero, every blog post and the contact page. Options: **(a)** strip those figures now
   so the switch is safe, or **(b)** leave them and never flip the switch.
10. **The header is missing its second button, and so is the bottom of the homepage.** The code
    expects two in each place; the settings file never defines the second, so only one ever shows.
    Options: **(a)** decide what the second button says and we add it, or **(b)** delete the unused
    code.
11. **Our contact page tells visitors to "contact us directly" and then links them back to the
    contact page.** There is no phone number or email offered anywhere. Options: **(a)** give a
    real direct route and we publish it, or **(b)** delete the block.
12. **An outbound text message says "most trades we speak to had a question just like yours".**
    A claim about our enquirers that we do not evidence, sent by SMS rather than shown on a page.
    Options: **(a)** reword it, or **(b)** leave it.

---

## 7. NOT DONE, AND WHY

- **No `next build` / `next dev` / `vitest` run.** Forbidden by the brief. Consequence: every
  verdict here is derived from source, route files and registries, never from rendered HTML. The
  two places that matters are TD-07 (I read the guard test's target rather than watching it pass
  against a wrong page) and TD-22 (I derived the sticky-header overlap from
  `SiteHeader.tsx:59` + `globals.css:96` rather than measuring the offset in a browser). Both
  conclusions follow from the code, but a Phase-1 browser check would put numbers on TD-22.
- **No live-analytics read.** The Medical sweep could say "6 `form_start`, 0 `form_submit`" and
  turn a suspicion into a conversion failure. I have no equivalent evidence, so **nothing here is
  filed as a live-conversion failure**, including TD-23 and TD-24, which are filed as
  dead-code + CRO gap on the render guard alone. If the orchestrator wants the Medical defect-1
  shape for Trade, the message-floor overrides on `ResultGateModal.tsx` and the `data-cta` firing
  rates need a query against `construction-cis` event rows.
- **`deploy_watch` rows not checked.** Out of scope for a source sweep, and the Medical port
  already established the root cause upstream (`Property/web/src/app/api/cron/deploy-watch/route.ts`
  hardcodes `site_key: "eq.property"`), which would apply to any Trade row identically. Flagging so
  the orchestrator can check whether a `construction-cis` row exists and has been sitting
  unevaluated.
- **One zero-importer sweep ran out of time.** The per-file importer loop over
  `src/components` + `src/lib` + `src/config` timed out at 120s after finding TD-26. It had covered
  `src/components/**` and was into `src/lib` when it stopped, so **`src/lib` and `src/config` are
  not fully swept for dead files.** `src/components/ui/*` was completed separately and is clean
  (lowest importer count 1, `JsonLd.tsx`, verified live at `glossary/[slug]/page.tsx:9`). Residual
  risk: a dead file in `src/lib`. Cheap to finish.
