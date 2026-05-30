# Track 2 brief: how-to-set-up-property-investment-company-uk-guide

**Site:** property
**Brief type:** Legacy rewrite (existing markdown; multi-mode gap — PRICING_LEAK + STALE_FACTS + THIN_DEPTH + INVISIBLE + STRUCTURE)
**Source markdown path:** `Property/web/content/blog/how-to-set-up-property-investment-company-uk-guide.md`
**Live URL:** https://www.propertytaxpartners.co.uk/blog/incorporation-and-company-structures/how-to-set-up-property-investment-company-uk-guide
**Stage 1 priority:** M-H (INVISIBLE on both GSC + Bing, but owns an un-owned high-intent formation-keyword cluster; consolidation upside, not CTR-rescue)
**Stage 1 date:** 2026-05-30
**Stage 2 enrichment date:** 2026-05-30 (source read in full; gov.uk fee + CT-registration facts WebFetched + confirmed; sibling slugs/categories verified on disk; statute spine cross-checked against house_positions.md and partly against legislation.gov.uk)
**Cannibalisation status:** REWRITE (clean — distinct FORM-A-NEW-company / SPV-from-scratch intent; no stronger canonical to 301 into; redirect-collapse would orphan the formation cluster per §16.T2 weaker-direction rule)

> This brief is drafted to the gold-reference depth standard set by `briefs/property/track2/trial/cgt-rates-property-2026-27-current-rates-explained.md`. The city-rewrite reference template (`briefs/property/track2/trial/birmingham-property-accountant.md`) is the model for the PRICING_LEAK strip discipline (Decision E).

---

## Manager pre-decisions (Stage 1 reasoning)

- **Slug:** kept as `how-to-set-up-property-investment-company-uk-guide`. The slug carries the exact "how to set up a property investment company" intent and the cannibalisation analysis confirms this page should be the canonical owner of the formation cluster. No redirect proposed in or out.
- **Category:** `Incorporation & Company Structures` (kept; canonical path `/blog/incorporation-and-company-structures/...`).
- **Gap-mode tag:** `PRICING_LEAK` (HARD-RULE violation — load-bearing first job) + `STALE_FACTS` (two hard factual errors: Companies House fee + CT41G) + `THIN_DEPTH` (1,456 body words vs ~2,800-3,000 competitor depth) + `INVISIBLE` (0 GSC + 0 Bing impressions) + `STRUCTURE` (no registration-steps/costs table, no SIC-code/lender angle, no share-structure detail, FAQ depth thin).
- **"Why this rewrite" angle:** This is the dedicated FORM-A-NEW-company / SPV-from-scratch how-to. The formation queries it should own ("how to set up a property investment company" pos 62.7, "setting up a property investment company" pos 50.0, "create btl limited company uk" pos 60.9) are currently captured only weakly and deep (pos 50-63) by the structure-planning sibling, with ZERO clicks — the formation intent is effectively un-owned by any strong page. The fix is NOT a CTR/meta rescue (the page is INVISIBLE, so there is no position to defend); it is a build-out so this becomes the strong canonical the weak formation impressions can consolidate into. Three jobs in priority order: (1) strip the pricing leaks (HARD RULE / Decision E); (2) hard-correct the two stale facts (Companies House £100 fee; obsolete CT41G mechanism); (3) lift to ~3,000 words with the registration-mechanics depth competitors carry (SIC codes + lender-required-SPV angle, share structure / alphabet shares, business banking, the actual current CT-registration-at-incorporation process, ATED filing-even-if-exempt, SDLT 5% surcharge quantified on the transfer path with a cross-link out).

---

## Current page snapshot (Stage 2 — source read in full 2026-05-30)

- **Word count:** ~1,456 body words.
- **Frontmatter:** `title` says "Complete UK Guide **2025**" (stale year stamp); `metaTitle` "How to Set Up Property Investment Company UK | Step by Step" (55 chars; generic, no differentiator); `metaDescription` 158 chars (promises "costs" — which under the lead-gen model we cannot quantify, so the meta promise itself drives the pricing leak); `date` 2026-04-10; `h1` present; `schema` empty string (FAQPage auto-emits from `faqs:` array regardless).
- **H2/H3 outline (10 headings):**
  1. H2 Why Set Up a Property Investment Company? (benefits + tax implications) — H3 Tax Implications — H4 Corporation Tax on Rental Profits, H4 Extracting Profits
  2. H2 Step-by-Step Guide to Setting Up Your Company — H3 Step 1 Choose Structure, H3 Step 2 Register With Companies House (H4 Required Information, H4 Registration Costs), H3 Step 3 Business Banking, H3 Step 4 Register for Corporation Tax, H3 Step 5 VAT/PAYE/NI, H3 Step 6 Accounting Systems
  3. H2 Acquiring Properties Through Your Company — H3 New vs Transferring Existing
  4. H2 Ongoing Compliance and Professional Support — H3 Ongoing Compliance, H3 When to Seek Professional Help
  5. H2 Common Mistakes and Getting Started — H3 Common Mistakes, H3 Getting Started
- **FAQs (frontmatter count):** 4 (target 12-14).
- **Outbound authority links:** 0 to gov.uk / legislation.gov.uk / HMRC manuals. Internal links: 5 (Section 24 guide; BTL ltd-co complete guide; MTD landlords; what-does-a-property-accountant-do; how-to-choose-a-property-accountant).
- **Schema present:** Y (FAQPage auto-emitted from `faqs:`).
- **Worked numerical examples:** 0.
- **Registration-steps / costs table:** 0 (steps are prose + bullet lists).
- **Last meaningful edit:** 2026-04-10 (frontmatter `date`).

**Confirmed defects in the source (load-bearing):**

| Line / location | Defect | Mode |
|---|---|---|
| FAQ #1 (frontmatter) | "£12 online or £40 by post … total setup costs typically range from £200-£2,000 … annual accountancy fees (£1,000-£3,000)" | PRICING_LEAK **and** STALE_FACTS (fee) |
| Body "Registration Costs" list (≈ line 95-97) | "Online registration: £12 (same day service: £30)", "Postal registration: £40", "Formation agent fees: £100-£300" | PRICING_LEAK **and** STALE_FACTS (fee) |
| FAQ #4 (frontmatter) | "Companies House registration takes 24 hours online … Same-day Companies House registration is available for £30" | STALE_FACTS (same-day £30 mechanism) + PRICING_LEAK |
| Body "When to Seek Professional Help" (≈ line 178) | "The cost of professional setup (typically £500-£2,000)" | PRICING_LEAK (Decision E) |
| Body "Getting Started" ordered list (≈ line 197) | "Register with Companies House online (£12-£30)" | PRICING_LEAK + STALE_FACTS |
| Body Step 4 (≈ line 117) | "Filing form CT41G with HMRC" as the CT-registration mechanism | STALE_FACTS (CT41G obsolete) |
| `title` frontmatter | "Complete UK Guide **2025**" | STALE (year stamp) |
| Body "Extracting Profits" (≈ line 64) | "From April 2027 … property income … will be taxed at higher rates (22%/42%/47%)" | **VERIFIED CORRECT per §7 (FA 2026 enacted)** — do NOT hedge; see §7 conflict note below |

---

## GSC angle (last 90 days)

**Pulled at diagnose time (2026-05-30):** the page is **INVISIBLE** — **0 impressions on Google (GSC) and 0 impressions on Bing**. There is no per-query CTR table because there is no impression volume on this URL.

**Formation-cluster signal (where the intent is leaking today):** the formation queries this page should own are captured only weakly, deep, and click-less by the structure-planning sibling:

| Query | Captured by | Avg position | Clicks |
|---|---|---|---|
| how to set up a property investment company | structure-planning sibling | 62.7 | 0 |
| setting up a property investment company | structure-planning sibling | 50.0 | 0 |
| create btl limited company uk | structure-planning sibling | 60.9 | 0 |

**Read (per §16.T2 collapse-direction discipline):** there is NO strong page owning the formation intent and NO stronger canonical to 301 this page into — a redirect-collapse would be a weaker-or-equal direction move that orphans the formation-keyword cluster without lifting any sibling. The correct move is REWRITE-to-build-the-canonical. Realistic outcome framing: this is a **consolidation play, not a CTR-multiplier play** — success is the page moving from pos 50-63 (un-owned) toward page 1-2 on the formation cluster over a 90-180 day window, not a near-term click multiple. Set the `monitored_pages` window to **180 days** per the F-11 INVISIBLE-baseline convention (not the standard 90).

**GA4 engagement signal:** negligible — consistent with 0 organic impressions. Not a content-quality signal; purely a visibility limiter.

---

## Gap-mode diagnosis (Stage 1 reasoning, refined with Stage 2 data)

**Primary: PRICING_LEAK (HARD-RULE violation, fix first).** Five distinct fee-quoting locations (FAQ #1, FAQ #4, two body cost lists, and a "professional setup £500-£2,000" line) breach the lead-gen handoff model (memory `agency_lead_gen_model.md`; house §13). Decision E is explicit that even soft general-market fee ranges are a leak. Every £-figure that frames a fee, an accountancy bill, or a professional-setup cost must be stripped. The ONLY £-figures that survive are statutory thresholds/charges that are facts of the regime (VAT £90,000; SDLT bands; ATED bands; the Companies House statutory filing fee, which is a published government fee, not a Property Tax Partners fee, and is allowed as a factual point — see Decision-E note below). The metaDescription's "costs" promise is part of the leak and must be re-pointed.

> **Decision-E nuance for the writer:** the Companies House incorporation fee (£100 online / £124 postal) is a published statutory government fee, not a service price, and stating it is factual regime information (gov.uk states it openly). It is NOT a Decision-E leak. The leaks are the firm-adjacent ranges: "total setup costs £200-£2,000", "annual accountancy fees £1,000-£3,000", "formation agent fees £100-£300", "professional setup £500-£2,000". Strip those four; the £100 statutory fee may stay as a fact.

**Secondary: STALE_FACTS (hard corrections).** Two errors mislead the reader on the actual mechanics:
1. **Companies House fee.** Source says "£12 online / £40 post / £30 same-day". gov.uk now shows **£100 online / £124 postal** (WebFetched + confirmed 2026-05-30 at `https://www.gov.uk/limited-company-formation/register-your-company`). The £12 figure predates the 1 May 2024 fee rise. Hard correction. (Same-day £30 software-filing route also no longer the headline mechanism — drop it.)
2. **CT41G.** Source says CT registration is done by "filing form CT41G with HMRC". This is obsolete. HMRC now sets up the Corporation Tax record automatically when the company is incorporated at Companies House; the company receives its CT UTR by post and **registers for / activates Corporation Tax online via its business tax account, telling HMRC it is active within 3 months of starting to trade or receive income** (WebFetched + confirmed 2026-05-30 at `https://www.gov.uk/corporation-tax/register-for-corporation-tax` — "You'll get the option to be set up for Corporation Tax at the same time" as Companies House registration). Re-describe the actual current process; drop CT41G as the mechanism.

**Tertiary: THIN_DEPTH + STRUCTURE.** At ~1,456 body words the page is roughly half the depth of the two ranking specialist competitors (Provestor ~2,800-3,000; UK Property Accountants ~2,500+). Missing, and needed to be the canonical: SPV/SIC-code framing + the lender-required-SPV angle (why BTL mortgage lenders want a clean single-purpose SPV with specific SIC codes); share-structure / alphabet-shares detail; the SDLT 5% additional-dwellings surcharge quantified on the transfer-existing path (with a cross-link out, NOT a re-run of s.162); the ATED filing-even-if-exempt point; and a snippet-bait registration-steps/costs table + lifted FAQ count.

**Quaternary: INVISIBLE.** 0 impressions on both engines. This reframes the whole rewrite: there is no CTR to rescue and no ranking to protect, so the rewrite is judged on whether it becomes a strong-enough canonical to consolidate the formation cluster over a 180-day window. Meta rewrite still matters (for when impressions accrue), but it is not the load-bearing lever here; depth + distinctiveness + internal-link consolidation are.

**Load-bearing fix sequence (ordered by ROI / risk):**

1. **Strip all four firm-adjacent fee ranges** (FAQ #1, FAQ #4, body professional-setup line, body cost-list) and re-point the metaDescription off "costs". Keep the £100 statutory CH fee as fact. Six-check includes a `£` body grep for fee-framing lines.
2. **Hard-correct the two stale facts** (CH £100/£124; CT-at-incorporation + business-tax-account activation within 3 months, no CT41G).
3. **Add the SPV/SIC-code + lender-required-SPV section** (the single biggest distinctiveness gap vs the structure-planning and spv-definition siblings — cross-link, do not duplicate).
4. **Add the share-structure / alphabet-shares section** at formation-decision depth (cite §21.2; do not re-run dividend optimisation — link the salary-vs-dividends page).
5. **Add the transfer-existing-portfolio decision fork** quantifying the SDLT 5% surcharge + CGT-on-transfer at a high level, then **cross-link to `incorporating-property-portfolio-uk-2026`** for the s.162 / phased-vs-single-day detail. Do NOT re-explain s.162 mechanics here.
6. **Add a registration-steps + costs table** (snippet-bait; columns: step / what you do / who with / statutory anchor / typical timing). The "cost" column states the £100 statutory CH fee only; no service prices.
7. **Lift FAQ count 4 → 12-14**, each targeting a specific formation-cluster query verbatim ("how to set up a property investment company", "do mortgage lenders require an SPV", "what SIC code for a property company", "do I need ATED", "can I move my existing properties in").
8. **Add 5-7 verified authority links** (CA 2006 formation sections; gov.uk limited-company-formation; gov.uk corporation-tax register; HMRC PIM/CTM; ATED; SDLT Sch 4ZA).
9. **Meta title rewrite #2** with a formation-led differentiator, e.g. "Set Up a Property SPV UK | Step-by-Step Formation Guide" or "How to Set Up a Property Investment Company (UK SPV Guide)".

---

## Competitor URLs (Stage 2 — flagged for live re-verification at execution per §16.31)

The diagnosis supplied four competitor targets. The execution session MUST re-fetch each (httpx with a real User-Agent), confirm 200, and date-stamp; replace any non-200.

| URL | Role | What to borrow | What to differentiate against |
|---|---|---|---|
| https://www.provestor.co.uk/guides/limited-company-setup/how-to | Depth ceiling (~2,800-3,000 words) | Step-sequenced formation flow + share-structure framing | They are a formation-service vendor (pricing-led); we are lead-gen handoff — strip all price framing; add ATED + SDLT-surcharge depth they skip |
| https://www.ukpropertyaccountants.co.uk/setting-up-a-limited-company-a-complete-guide/ | Specialist depth (~2,500+) | Tax-implication integration into the setup flow | Often year-stamped to a prior year + may carry pre-FA-2026 dividend rates — verify and beat with current §21.4 figures |
| https://www.gov.uk/limited-company-formation | Authority source-of-truth | The exact current CH fee + IN01/online flow + timing | We are the specialist APPLICATION layer (SPV/SIC/lender + tax), not the registration source-of-truth; link to gov.uk for the bare mechanics |
| https://www.ukpropertyaccountants.co.uk/how-to-set-up-a-uk-property-spv/ | SPV-specific competitor | SIC-code list + lender-SPV framing | This is exactly our distinctiveness section — match the SIC-code specificity, beat the depth, and add the share-structure + transfer-fork they under-cover |

**Competitor depth ceiling for this query class:** ~2,500-3,000 words, thin/no FAQ schema, few statute citations. Our ~3,000-word target with 12-14 FAQs + a steps/costs table + 5-7 verified statute citations + the SPV/SIC + ATED + SDLT-surcharge angles puts us decisively best-in-class and positions this as the consolidating canonical.

---

## Cannibalisation universe check (Stage 2)

**Cannibalisation Index snapshot:** `docs/property/track2_cannib_index_2026-05-23.md` (base 2026-05-23, refreshed 2026-05-24 PM for Batch 2; 466 existing pages). All four sibling slugs verified on disk in category `Incorporation & Company Structures`.

| Source | Slug | Owned intent | Resolution |
|---|---|---|---|
| Residual (own) | how-to-set-up-property-investment-company-uk-guide | FORM-A-NEW-company / SPV-from-scratch mechanics (CH registration, name/SIC, share structure, banking, CT registration, accounting setup) | REWRITE in place — this page is the formation canonical |
| Sibling (rewritten 2026-05-18) | incorporating-property-portfolio-uk-2026 | TRANSFER-EXISTING-portfolio (CGT, SDLT 5% surcharge, s.162 relief tests, phased vs single-day) | Distinct. This page cross-links OUT to it for the "I already own properties personally" path; does NOT re-run s.162 |
| Sibling (gold-quality pillar 2026-05-21) | buy-to-let-limited-company-complete-guide-uk | Broad OPERATING-a-BTL-company intent + the does-it-save-tax maths | Distinct. Link for the break-even / dividend-optimisation decision; do NOT re-run worked dividend maths here |
| Sibling | property-investment-company-structure-planning | SPV-vs-holding-vs-GROUP structure CHOICE (multi-company / group decisions) | Distinct. Link for group/holding-co decisions. Note: this sibling is currently the weak captor of the formation queries (pos 50-63, 0 clicks) — the rewrite's internal-linking should help consolidate that intent INTO this how-to |
| Sibling | spv-property-investment-special-purpose-vehicle-guide | SPV-DEFINITION + lender-SIC-code angle | Distinct but ADJACENT — closest cannib risk. This page covers SIC codes in the FORMATION context (which codes to enter on incorporation + why lenders want them); the SPV-guide owns the conceptual definition. Cross-link; keep the SIC treatment here action-oriented ("enter these on IN01") not definitional |

**Equity-direction check (collapse-direction rule §16.T2):** this page has 0 GSC + 0 Bing impressions (INVISIBLE on both). The formation intent is un-owned by any strong page. There is NO stronger canonical to 301 into, so redirect-collapse is the WRONG direction (it would orphan the formation cluster without lifting a sibling). **Decision: REWRITE.** If anything, the weak formation impressions currently leaking to the structure-planning sibling should consolidate INTO this dedicated how-to once it is built out.

**Conclusion:** REWRITE in place. No REDIRECT-PROPOSED. No FLAG-MANAGER (pricing leak is a known HARD-RULE fix handled in-rewrite, not a manager-decision flag). Closest cannib watch is the spv-definition sibling — keep the SIC treatment action-oriented to stay distinct.

---

## Closest existing pages (Stage 2)

Internal-link partners (to and from this page). All are in `/blog/incorporation-and-company-structures/` unless noted:

- **Transfer-existing path:** `incorporating-property-portfolio-uk-2026` — forward-link from the "transfer existing vs buy new" fork (the s.162 / SDLT-surcharge / phased detail lives there).
- **Operating + break-even maths:** `buy-to-let-limited-company-complete-guide-uk` — forward-link from "why incorporate / does it save tax".
- **Structure choice:** `property-investment-company-structure-planning` — forward-link from "single SPV vs holding-co / group".
- **SPV definition + lender SIC:** `spv-property-investment-special-purpose-vehicle-guide` — reciprocal link from the SIC-code / lender-SPV section.
- **Share splitting:** `alphabet-shares-property-spv-dividend-splitting-spouse-children` — forward-link from the share-structure section.
- **Profit extraction:** `salary-vs-dividends-property-spv-2026-27-marginal-rate-analysis` and `extracting-cash-from-property-spv-extraction-sequence-pillar-2026-27` — forward-link from "extracting profits" (do NOT re-run the maths inline).
- **Directors' loans:** `btl-spv-directors-loan-repayment-strategy-tax-efficient-extraction` — forward-link from the DLA mention in extraction.
- **Section 24 driver:** the current page links to `/blog/section-24-and-tax-relief/section-24-tax-relief-complete-guide` — verify this slug/path resolves at execution (the gold-reference brief notes a `section-24-mortgage-interest-restriction-uk-landlords` pillar and `claim-mortgage-interest-rental-property-uk-section-24` applied page; use whichever resolves).
- **MTD:** current page links to `/blog/making-tax-digital-mtd/making-tax-digital-landlords-april-2026-deadline` — verify path; note limited companies are OUTSIDE MTD ITSA (house §3) so the MTD reference must be framed as "applies to your personal income, not the company".
- **Property accountant service pages:** `what-does-a-property-accountant-do`, `how-to-choose-a-property-accountant` (both `/blog/property-accountant-services/`) — keep as the conversion-adjacent links replacing the stripped pricing FAQ.

---

## House-position references (Stage 1)

Every section cited by number + lock-date stamp. The writer threads these; never paraphrases the lock.

- **§11 + §11.A Companies House reforms / ECCTA 2023 + ECTEA 2022** [LOCKED; §11.A Wave 9 mini-lock 2026-05-25]: the formation + ID-verification reality. Director + PSC ID verification (mandatory for new appointments from 18 November 2025; existing by next confirmation statement in the transition window); registered email address requirement; lawful-purposes statement on the confirmation statement; one-person-one-verification across multiple SPVs; ACSP route via the accountant. **Sessions MUST WebFetch the commencement-tracking page `https://changestoukcompanylaw.campaign.gov.uk/` at write time** (commencement state is not cacheable).
- **§21.2 Share-class structures + settlements legislation** [LOCKED, Wave 4 2026-05-23]: alphabet shares for dividend-splitting; ITTOIA 2005 s.624 settlor-attribution; the *Jones v Garnett* s.626 spouse-exception; minor-child shares within s.624. Frame at formation-decision depth.
- **§21.4 Salary vs dividends in property SPV 2026/27** [LOCKED, Wave 4; F-19/F-20 corrections 2026-05-23]: CT 19% SPR / 25% main / 26.5% effective marginal £50k-£250k; **dividend rates 10.75% basic / 35.75% higher / 39.35% additional** (NOT 8.75%/33.75%); employer NI 15% over £5k ST; Employment Allowance £10,500 with sole-director exclusion. The source page's dividend figures (10.75/35.75/39.35) are CORRECT — do not "fix".
- **§21.A Corporation tax three-figure framework** [LOCKED, Wave 8 2026-05-25]: 19% up to £50k, 25% over £250k, 26.5% effective marginal on the slice; **associated-companies divisor (1 + N)** — critical for the multi-SPV reader (5 SPVs → £10k SPR band each); CIHC at 25% always (s.18N qualifying-purpose carve-out for commercially-let-to-unconnected-tenant land). The source's "19% small profits / 25% main / marginal relief" is correct framing; the rewrite should add the associated-companies-divisor warning (a genuine depth gap).
- **§21.5 FIC + CIHC** [LOCKED, Wave 4]: CIHC = CTA 2010 s.18N (never s.34 per §21.7 do-not-write); most BTL SPVs are NOT CIHCs because the s.18N carve-out takes unconnected-tenant land out. Touch lightly; the structure-planning + FIC pages own the depth.
- **§5 CGT on UK residential property 2026/27** [LOCKED]: 18%/24% on the transfer-existing fork; £3,000 AEA; s.162 incorporation relief is automatic where ALL business assets transfer for shares and the activity is a "business" (Ramsay [2013] threshold). Quantify lightly here; cross-link to `incorporating-property-portfolio-uk-2026` for depth.
- **§1 SDLT + §1.I 5% additional-dwellings surcharge** [LOCKED; §1.I Wave 9 mini-lock 2026-05-25]: the transfer-existing path triggers the **5% additional-dwellings surcharge** (Sch 4ZA; rate raised 3%→5% by **FA 2025 s.51**, effective for transactions on/after 31 October 2024 — NOT "FA 2024"). Quantify the surcharge band table at a high level on the transfer fork; cross-link out for the s.116(7) six-dwellings / Sch 15 SLP partnership routes (those belong to the portfolio-transfer + partnership pages, not here).
- **§2 + §18 ATED** [LOCKED; §18 Wave 3 2026-05-22]: a company holding a single UK dwelling worth **over £500,000** is in ATED scope; **the ATED return must be filed by 30 April even where a relief is claimed** (commercial-letting-to-unconnected-tenant relief is the common BTL relief). This is a genuine missing point on the source — add a short ATED-awareness subsection for higher-value-property formers.
- **§7 April 2027 property income tax** [LOCKED 2026-05-30, ENACTED]: **22% basic / 42% higher / 47% additional** for property income (England, Wales and NI; only Scotland carved out) from 6 April 2027, **enacted by Finance Act 2026 (Royal Assent 18 March 2026), ss.6-7**. The Section 24 reducer rises to 22% (no new basic-rate wedge). See conflict note below — this is the one place the source is RIGHT and prior-cycle hedge instincts are WRONG.
- **§3 MTD for ITSA** [LOCKED + §19 extensions]: **limited companies are OUTSIDE MTD ITSA entirely** — they file CT600s. Any MTD reference must be framed as "applies to your personal property income, not the company". The source's MTD link must carry this caveat.
- **§13 Do-not-write list (general)** [LOCKED]: NO pricing/fees (the load-bearing strip); NO real client names; anonymised social proof only.

---

## House-position conflict flag (Stage 2)

**Conflict 1 — PRICING_LEAK vs §13 (HARD RULE, confirmed, load-bearing).** Five fee-quoting locations (FAQ #1, FAQ #4, body "Registration Costs" list, body "professional setup £500-£2,000", body "Getting Started" list). Per house §13 + memory `agency_lead_gen_model.md` + Decision E, all firm-adjacent fee framing must be removed. The £100 statutory Companies House fee survives as factual regime information. Flag to `track2_site_wide_flags.md` as a HARD-RULE PRICING_LEAK on this slug; resolved in-rewrite (no manager decision needed). **Audit follow-up:** the same general-market-fee pattern likely recurs across the incorporation/SPV how-to cohort — note for a §16.43 cluster STALE/leak sweep.

**Conflict 2 — STALE_FACTS vs gov.uk (confirmed 2026-05-30).** (a) Companies House fee £12/£40/£30 contradicts the live £100/£124 (gov.uk WebFetched). (b) CT41G mechanism contradicts the current incorporate-then-activate-via-business-tax-account process (gov.uk WebFetched). Both are hard corrections, not hedges.

**NON-conflict — §7 April 2027 rates (do NOT hedge).** The source asserts "From April 2027 … 22%/42%/47%" as fact. Under prior program cycles this would have tripped the F-2/F-5/F-22 Bill-vs-enacted hedge reflex. **As of the 2026-05-30 house ground-truth, §7 is ENACTED (FA 2026, Royal Assent 18 March 2026, ss.6-7).** The source is CORRECT. The writer must **state the 2027 rates as enacted law** (not a proposal/surcharge-to-come) and must NOT re-introduce a "pending Finance Act" hedge (that would itself now be a STALE error). The only refinements: (i) note the scope is England, Wales and NI (Scotland carved out), and (ii) note the Section 24 reducer rises to 22% so no new basic-rate wedge opens. Verify §7 against legislation.gov.uk at write time per F-37 (RA date confirmation), but the expected verdict is ENACTED.

---

## Authority links worth considering (Stage 2 — verify all at execution per §16.31 + F-37)

Statute citations partly cross-checked 2026-05-30 (TCGA 1992 s.162 confirmed current/revised-through-18-March-2026 on legislation.gov.uk; CA 2006 s.9 fetch returned a JS-empty body — re-verify at execution). gov.uk fee + CT pages confirmed live + content-verified.

| URL | Verification status (2026-05-30) | Use case |
|---|---|---|
| https://www.gov.uk/limited-company-formation/register-your-company | **200 + content verified** — £100 online / £124 postal | The CH fee + registration flow correction (Step 2 + steps table + FAQ) |
| https://www.gov.uk/corporation-tax/register-for-corporation-tax | **200 + content verified** — CT set up at incorporation; activate via business tax account | The CT41G correction (Step 4) |
| https://www.legislation.gov.uk/ukpga/2006/46/section/9 | 200 but body returned empty on fetch (likely JS-rendered) — **re-verify at execution**; CA 2006 s.9 = "Registration documents" | Companies Act formation anchor (the documents delivered to the registrar) |
| https://www.legislation.gov.uk/ukpga/2006/46/section/7 | Verify at execution — CA 2006 s.7 = "Method of forming company" | Formation-method anchor |
| https://www.legislation.gov.uk/ukpga/1992/12/section/162 | **200 + content verified** — "Roll-over relief on transfer of business"; current revised version (amended through 18 March 2026) | Incorporation relief on the transfer-existing fork (light cite; depth lives on the portfolio-transfer page) |
| https://www.legislation.gov.uk/ukpga/2003/14/schedule/4ZA | Verify at execution — FA 2003 Sch 4ZA higher rates for additional dwellings | SDLT 5% surcharge on the transfer fork (§1.I; rate raised by FA 2025 s.51) |
| https://www.gov.uk/guidance/corporation-tax-the-non-corporate-distribution-rate (and/or gov.uk "Corporation Tax rates and allowances") | Verify at execution | CT rates + marginal relief (§21.4 / §21.A) |
| https://www.gov.uk/government/organisations/companies-house (+ ID-verification guidance) and https://changestoukcompanylaw.campaign.gov.uk/ | **MUST WebFetch at write time** (commencement state not cacheable) | §11/§11.A ID-verification + registered-email + lawful-purposes commencement state |
| https://www.gov.uk/guidance/annual-tax-on-enveloped-dwellings-the-basics | Verify at execution | ATED filing-even-if-exempt (§2/§18) for >£500k-dwelling formers |

(Execution selects 5-7 to actually cite in body. Every cite re-verified at write time, including any Finance Act Royal Assent date per F-37.)

---

## Universal rules — inherited from parent program (do not restate)

Per `TRACK2_PROGRAM.md` §4 section 13: voice rules (`NETNEW_PROGRAM.md` §4 + `competitor_rewrite_playbook.md` §5 — **no em-dashes anywhere**; anonymised social proof only; **no pricing/fees**; exact figures + named statute), lead-gen architecture (LeadForm auto-injected by `BlogPostRenderer.tsx`, never duplicated; 1-3 inline `<aside>` CTAs at conversion moments), CSS-in-markdown (semantic HTML only, no Tailwind utility classes in body), FAQs + schema (frontmatter `faqs:` array target 12-14; `buildBlogPostingJsonLd` auto-emits FAQPage; never hand-add FAQ schema in body), anti-templating discipline, the §4.3 six-check quality bar, statute-citation discipline (F-8: statute content can be removed by amendment even when the URL is live — verify operative wording, not just a 200), and all §16 lessons (esp. §16.18 reasoning-first, §16.31 URL liveness, §16.27/§16.30+ rate-by-reference + Bill-vs-enacted, §16.T1 deterministic floor for high-consequence calls, §16.T2 collapse-direction).

**Critical for THIS brief:** NO em-dashes. NO firm-adjacent fee figures (strip all four). The £100 statutory CH fee is allowed as fact. §7 April 2027 rates stated as ENACTED (no hedge). MTD framed as personal-income-only (companies are outside MTD ITSA). CIHC cited as CTA 2010 s.18N (never s.34).

---

## 19-step workflow — inherited from parent program (Wave 5) with Track 2 deltas

Inherits the full 19-step workflow from `NETNEW_PROGRAM.md` §7. Track 2 deltas: Step 9 "Rewrite markdown at existing path" (modify, do not create new file; preserve frontmatter slug + canonical; update `dateModified`/`date` to execution date; fix the `title` year stamp); Step 12 "Confirm no redirect needed" (none — slug kept, this is the intentional formation canonical); Step 13 "Update or insert `monitored_pages` row" — insert with an **180-day window from merge date** per the F-11 INVISIBLE-baseline convention (`rewrite_type` = `rewrite`).

**Brief-specific workflow notes for the execution session:**

1. Read `house_positions.md` §11/§11.A, §21.2, §21.4, §21.A, §21.5, §5, §1/§1.I, §2/§18, §7, §3, §13 in full at session start.
2. Run `scripts/track2_collapse_guard.py` is NOT required (no redirect proposed) but confirm the INVISIBLE state still holds (no impressions accrued since diagnose) — if impressions have appeared, re-read this section.
3. **WebFetch `https://changestoukcompanylaw.campaign.gov.uk/`** for current ID-verification commencement state before writing §11.A content.
4. Re-fetch the 4 competitor URLs (200 + date-stamp; replace non-200).
5. **Verify §7 lock status at legislation.gov.uk (FA 2026 ss.6-7 + Royal Assent 18 March 2026)** — expected verdict ENACTED; state rates as law, do NOT hedge.
6. Re-verify CA 2006 s.7 + s.9, TCGA 1992 s.162, FA 2003 Sch 4ZA operative wording (F-8 discipline).
7. Plan outline: 11-13 H2s, ~3,000 body words, 12-14 FAQs, one registration-steps/costs table (snippet-bait), 2 inline `<aside>` CTAs.
8. Rewrite at existing path. Strip all four firm-adjacent fee ranges; keep £100 statutory CH fee as fact. Correct CH fee + CT41G. Re-point metaDescription off "costs". Rewrite metaTitle with a formation differentiator.
9. Six-check: FAQ schema count = `faqs:` length; em-dash count = 0; Tailwind class count = 0; metaTitle ≤ 62 chars; metaDescription ≤ 158 chars; all internal links resolve; **plus a fee-leak grep** (`£` lines in body/FAQs must be statutory thresholds only — no service/accountancy/setup fee ranges).
10. `cd Property/web && npm run build` must pass.

---

## Per-page work-log (for execution session)

(Empty template — populated at execution time.)

### House-position alignment
- §11/§11.A CH + ID verification (commencement state WebFetched): __
- §21.2 share classes / alphabet shares: __
- §21.4 dividend rates 10.75/35.75/39.35 (confirm not regressed to 8.75/33.75): __
- §21.A associated-companies divisor added: __
- §21.5 CIHC = s.18N (never s.34): __
- §5 CGT 18/24 + s.162 (light, cross-linked): __
- §1.I SDLT 5% surcharge on transfer fork (FA 2025 s.51, not FA 2024): __
- §2/§18 ATED filing-even-if-exempt added: __
- §7 April 2027 22/42/47 stated as ENACTED (no hedge), England/Wales/NI scope: __
- §3 MTD framed as personal-income-only (company outside MTD ITSA): __
- §13 pricing strip confirmed (4 firm-adjacent ranges removed; £100 CH fee kept): __

### Comparison: before vs after
- Word count: 1,456 → __ (target ~3,000)
- H2 count: 5 → __ (target 11-13)
- FAQ count: 4 → __ (target 12-14)
- Authority links: 0 → __ (target 5-7)
- Inline CTAs: 0 → __ (target 2)
- Worked examples / tables: 0 → __ (target: 1 steps/costs table + 1 transfer-fork SDLT-surcharge table)
- Stale CH fee corrected (£12→£100): __
- CT41G removed / current process described: __
- Title year stamp fixed (2025 → execution year or year-neutral): __

### Consolidation hypothesis test (INVISIBLE baseline)
- Pre-rewrite GSC + Bing impressions: 0 / 0
- Formation queries currently leaking to structure-planning sibling at pos 50-63 / 0 clicks
- Post-rewrite expected: this page accrues impressions on the formation cluster and moves toward page 1-2 over 90-180 days; structure-planning sibling's formation impressions consolidate here
- Verify at +90 / +180 days via `monitored_pages` detector (180-day window per F-11)

### Flags raised
- PRICING_LEAK (HARD RULE, carried from brief): 4 firm-adjacent fee ranges removed: __
- STALE_FACTS (carried): CH fee + CT41G corrected: __
- §7 do-NOT-hedge note honoured (rates stated as enacted): __
- Any new flags surfaced at execution: __

### 2-3 sentence summary
- (populated at execution time)
