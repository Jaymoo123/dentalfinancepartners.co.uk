# Cluster Architecture Brief — Business Exit and Succession (EOT wedge)

**Host site:** generalist / Holloway Davies (`hollowaydavies.co.uk`)
**Cluster:** Business Exit and Succession · **Pages:** 20 (18 written + 2 calculators)
**Source of truth:** `staged_72.json` rows where `pillar_topic == "Business Exit and Succession"`; `exit_eot_pages.csv`.
**Category / URL namespace:** all written pages live under the existing generalist blog category **"Exit and Capital Gains"** → route `/blog/exit-and-capital-gains/<slug>`. Calculators are separate build tasks (tools), see §7.
**Status for writers:** this brief is complete. Do NOT re-decide angle, cross-links, sources, or lead routing. If a page seems to overlap generalist's existing CGT/BADR content, that is intentional and handled by the de-cannibalisation rule in §4 — follow it, do not write a general CGT explainer.

---

## 0. QUALITY BAR (LOCKED — applies to every page)

- **Opus-only, A\* authoritative.** Genuinely the best answer on the SERP. Never thin, never flaggable.
- **No em-dashes.** Use commas, parentheses, full stops, middle dots (·).
- **Faceless EEAT.** The operator is NOT an accountant. No named-expert claims, no fabricated advisor quotes, no "our head of tax says". Authority comes from data, primary-source citations, worked examples and tools, not from a persona.
- **Business audience + lead specificity.** Write for the owner-director planning an exit, not a consumer.
- **UK 2026/27 facts:** BADR 18% from 6 Apr 2026 (was 14% in 2025/26); CGT standard rate on shares 24% higher / 18% basic; CGT annual exempt amount (AEA) £3,000; EOT CGT relief cut 100% → 50% from 26 Nov 2025 (see §1). BADR lifetime limit £1,000,000 (unchanged — do NOT confuse with the £2.5m IHT business-property relief cap, a different relief).
- **Body = raw HTML in frontmatter** (`<p>`, `<h2>`, `<ul>`, `<table>`), NOT markdown. Match the existing exit-cluster posts (e.g. `badr-2026-rate-change.md`) for frontmatter shape: `title, slug, canonical, date, author "Holloway Davies Editorial Team", category "Exit and Capital Gains", metaTitle, metaDescription, h1, summary, faqs[], keyTakeaways[]`.
- **Internal links** are root-relative: `/blog/exit-and-capital-gains/<slug>`, `/resources/exit-cgt`, `/fundamentals/business-asset-disposal-relief-explained`, `/contact`.

---

## 1. CANONICAL TAX POSITION — EOT CGT after 26 November 2025 (reuse verbatim; this is the cluster's competitive wedge)

> At the **Autumn Budget on 26 November 2025**, the Capital Gains Tax relief on a disposal of a controlling interest to an **Employee Ownership Trust (EOT)** was **cut from 100% to 50%, with immediate effect for disposals on or after 26 November 2025**. Under the new rule, **50% of the gain** on the sale to the EOT trustees is the seller's **chargeable gain at the time of sale**. The other 50% is **not chargeable at sale** but is effectively held over and **bites on any future disposal of the shares by the trustees**. **Business Asset Disposal Relief and Investors' Relief cannot be claimed on the taxable 50%**, so it is taxed at the ordinary CGT rate for shares (24% for higher/additional-rate sellers, 18% within any unused basic-rate band), after the £3,000 annual exempt amount. HMRC's stated reason: the relief's cost had reached roughly £2bn a year, about 20x the original 2013 costing.

**Every EOT page (and the EOT calculator) MUST:**
1. State the post-26-Nov-2025 50% position as current law.
2. **Explicitly flag that older "0% CGT / 100% relief" content elsewhere on the web is now out of date** — this is the wedge; rivals have not updated. One sentence, e.g.: "Guides that still say a sale to an EOT is entirely CGT-free were written before 26 November 2025 and are now wrong."
3. Use the canonical worked example in §1a so numbers are consistent across the cluster.

### 1a. Canonical EOT worked example (reuse these figures on every EOT page that shows a calc)

Owner sells 100% of a trading company to an EOT.

| Item | Figure |
|---|---|
| Sale value (market value to EOT) | £4,000,000 |
| Original base cost | £200,000 |
| Total gain | £3,800,000 |
| **Old rule (pre-26 Nov 2025):** 100% relieved | **£0 CGT at sale** |
| **New rule (on/after 26 Nov 2025):** chargeable now = 50% × £3,800,000 | £1,900,000 |
| Less annual exempt amount | £3,000 |
| Taxable now | £1,897,000 |
| CGT rate (BADR/IR **not** available on this slice) | 24% |
| **CGT payable now** | **£455,280** |
| Remaining 50% (£1,900,000) | not taxed at sale; latent gain that bites the **trustees** on a future disposal of the shares |

Wedge line for writers: "Before 26 November 2025 this exit was tax-free. The same sale today triggers roughly £455,000 of CGT, and leaves a further £1.9m of latent gain inside the trust."

---

## 2. REGULATORY FRAMING (bake a one-line version into every page footer/disclaimer)

- **This cluster is UNREGULATED advisory.** Arranging the sale of a body corporate by way of its shares is **exempt under Article 70 of the RAO** (the "sale of a body corporate" exclusion). Selling a business, EOT structuring, exit and succession planning = fine to offer.
- **HARD FENCE — MBO / acquisition finance.** Arranging the **credit or investment that funds a buyout** (MBO finance, raising acquisition finance, raising investment) **is regulated** (credit-broking / arranging investments). The **management-buyout page is a STRUCTURE / EXPLAINER only**. It must **never** offer to arrange, source, or introduce the buyout finance. If a page mentions how a deal is funded, it stays educational and, at most, says "an authorised commercial finance broker can arrange this" without naming or linking a specific offer/route from us. No "get a quote", no finance lead form on these pages.
- **Do not give personal tax advice.** Pages model general positions and worked examples; the CTA routes the reader to a human for their specific numbers.
- Exclude business-rates / VOA / valuation-office noise from all valuation pages (that is a different "valuation").

---

## 3. LEAD ROUTING (same for all pages unless noted)

- **Primary CTA:** unregulated **exit & succession advisory + accountant cross-sell** (CGT/BADR/EOT modelling on exit is core accountant work). Route to generalist **`/contact`**, `lead_source = 'general'`, segment tag **`exit-succession`**. Copy pattern matches existing posts: a closing `<p>` ending "…<a href="/contact">get in touch</a>." Keep it specific to exit (e.g. "book an exit tax review").
- **Secondary CTA:** the estate **accounting firms** for the **tax-on-exit** angle (CGT/BADR planning). Frame as "have the CGT modelled before you sign heads of terms." Same `/contact` route; the accountant cross-sell is the second paragraph of the CTA block, not a separate form.
- **EOT pages** additionally position "EOT specialist + accountant to model the new 50% charge" — still one `/contact` route.
- **management-buyout-guide + any MBO-finance mention:** advisory CTA only (structure/planning). **No finance CTA.** See §2 fence.
- **Sector segment pages:** primary CTA as above, plus one contextual cross-link to the matching estate sector accountant page for the accountant cross-sell (targets in §6).

---

## 4. DE-CANNIBALISATION (generalist already owns a strong "Exit and Capital Gains" area — respect this)

Generalist already ranks for general CGT/BADR-on-exit. Do **not** duplicate a general CGT or BADR mechanics explainer. Existing canonical assets to **cross-link to, not rewrite**:

- **`/resources/exit-cgt`** — "Selling your business: CGT and BADR guide" (BADR overview, 14%→18% change, standard rates, qualifying conditions, share-vs-asset, worked example). This is the general CGT/BADR pillar.
- **`/fundamentals/business-asset-disposal-relief-explained`** — BADR fundamentals.
- Existing exit blog cluster to link (all under `/blog/exit-and-capital-gains/`): `badr-2026-rate-change`, `earn-out-payments-tax-treatment-selling-limited-company`, `members-voluntary-liquidation-explained`, `badr-cash-reserves-company-sale`, `share-buyback-cgt-directors`, `gifting-shares-family-member-cgt`, `can-a-director-claim-badr-after-leaving-role-2-years-ago`, `how-to-close-a-limited-company`.

**Rule for our new tax pages** (`selling-a-business-tax-cgt-badr`, `eot-tax-relief-and-cgt`): explain the **exit-journey / EOT-specialist** angle and **the numbers under our worked examples**, then link OUT to `/resources/exit-cgt` and `/fundamentals/business-asset-disposal-relief-explained` for the general BADR mechanics. `selling-a-business-tax-cgt-badr` is a **route-comparison / decision** page (which exit is most tax-efficient: trade sale vs EOT vs MVL vs family gift), NOT a BADR mechanics rewrite.

---

## 5. CROSS-LINK GRAPH

**3 pillars:**
- **P1 = `employee-ownership-trust-guide`** (EOT) — hub for all EOT satellites.
- **P2 = `business-valuation-guide`** (methods) — hub for valuation satellites + all segment pages' "what it's worth" section.
- **P3 = `sell-my-business-guide`** (buyer journey: trade sale vs EOT vs MBO) — hub for journey/planning satellites + all 7 segment pages.

**Up-links (every satellite links to its pillar; pillars link down to their satellites):**

| Satellite | Links up to |
|---|---|
| eot-tax-relief-and-cgt, eot-pros-and-cons, how-to-set-up-an-eot, eot-tax-saving-calculator | **P1** |
| how-to-value-a-business, business-valuation-calculator | **P2** |
| business-exit-planning, management-buyout-guide, preparing-a-business-for-sale, selling-a-business-tax-cgt-badr | **P3** |
| 7 × how-to-sell-a-\<sector\>-business | **P2** (valuation) + **P3** (journey) |

**Pillar interlinks:** P1 ↔ P3 (EOT is one exit route on the journey); P2 ↔ P3 (you value before you sell); P1 → `eot-tax-relief-and-cgt` for the 50% detail.
**External cross-links (to generalist CGT/BADR pillar):** every EOT-tax and selling-tax page → `/resources/exit-cgt` + `/fundamentals/business-asset-disposal-relief-explained` + `/blog/exit-and-capital-gains/badr-2026-rate-change`.

---

## 6. ANTI-SAMENESS MATRIX — the 7 `how-to-sell-a-<sector>-business` pages

No two read alike. Each page is dominated by its ONE distinguishing axis below. Lead the page with the sector-specific valuation basis and diligence trap; the shared skeleton (below the matrix) is secondary.

| Sector (slug) | Valuation basis / multiple norm | Typical buyers | Sector-specific deal / diligence axis | Estate cross-sell target |
|---|---|---|---|---|
| **recruitment** (`how-to-sell-a-recruitment-business`) | % of NFI/GP or ~4-6x EBITDA; **temp/contractor book (recurring GP) valued higher and stickier than perm desk (one-off placement fees)** | PE-backed staffing consolidators, trade | Consultant key-person risk + restrictive covenants; contractor-book continuity; back-office/invoice-finance novation; **perm-placement rebate/clawback** | agency site / `accountant-for-recruitment` |
| **manufacturing** (`how-to-sell-a-manufacturing-business`) | 4-6x EBITDA **plus asset backing**; plant/machinery + freehold often valued separately; watch adjusted-net-asset floor | Trade competitors, PE | Plant & capital-allowances valuation; **freehold property (SDLT, SIPP/SSAS-held premises)**; WIP/stock; customer concentration; **land contamination (cross-link land remediation)**; TUPE | `accountant-for-manufacturing` / property (freehold) |
| **ecommerce** (`how-to-sell-a-ecommerce-business`) | Multiple of **SDE / adjusted net profit** (small: ~2.5-4x annual SDE); platform-dependent | Aggregators, strategic acquirers, search funds | **Platform/account transferability (Amazon FBA, Shopify, ASIN/brand registry)**; supplier contracts; ad-account + customer-data (GDPR) transfer; inventory valuation; single-SKU/channel concentration | `accountant-for-ecommerce-business` |
| **construction** (`how-to-sell-a-construction-business`) | **Lower, lumpy: ~2-4x EBITDA**; net-asset + WIP heavy | Larger contractors, trade | **CIS**; retentions; contract novation; **latent-defects / PI run-off**; stage payments & WIP; framework-contract dependence; bonding | construction-cis (Trade Tax) / `cis-accountant-uk-construction` |
| **law firm** (`how-to-sell-a-law-firm-business`) | Turnover/WIP + goodwill (small), EBITDA (larger); recurring vs matter-based | Law-firm consolidators/roll-ups, ABS-backed, mergers | **SRA authorisation on change of control**; **run-off cover / PII (6-year run-off is a major cost)**; WIP & unbilled disbursements; client account; partner lock-in / LLP conversion; client-transfer consent | solicitors site / `accountant-for-solicitors` |
| **accountancy** (`how-to-sell-a-accountancy-business`) | **Recurring-fee (GRF) multiple, ~0.8-1.4x gross recurring fees**, or EBITDA (larger) | PE-backed roll-ups, local firms | **Fee clawback / retention holdback tied to 12-24m fee retention**; client attrition; ICAEW/ACCA rules; software/data migration; staff & partner retention | generalist self (accountancy) |
| **care home** (`how-to-sell-a-care-home-business`) | **Property-heavy: EBITDARM × yield, or per-bed**; freehold often dominant | Specialist care operators, opco-propco/REIT investors, PE | **CQC registration transfer + ratings drive value**; occupancy; LA-vs-private fee mix; agency-staffing reliance; property condition; registered-manager continuity; TUPE | carehometax/medical / `accountant-for-care-homes` |

**Shared segment skeleton (H2s, after the sector-specific opener):** (1) What a \<sector\> business is worth [sector basis, link P2 + valuation calculator] · (2) Who buys \<sector\> businesses · (3) The \<sector\>-specific deal structure & diligence trap [the axis above] · (4) Tax when you sell: CGT, BADR at 18%, and the EOT option [link `/resources/exit-cgt`, P1, `selling-a-business-tax-cgt-badr`] · (5) Could an EOT work for a \<sector\> business? [link P1, flag 50% rule] · (6) Getting a \<sector\> business ready to sell [link `preparing-a-business-for-sale`] · (7) CTA. Unique data hook per page = the sector multiple/basis + the one diligence trap. Segment pages target `sell a <sector> business` (near-zero measured volume; built for long-tail + estate-audience capture, per the build-everything directive).

---

## 7. CALCULATORS (2 — BUILD tasks, not blog briefs; specs below)

Both are interactive tools (route TBD by build, suggest `/tools/<slug>`), **anchor-embedded** into their pillar pages per the estate calculator-embed convention. Mark **CALCULATOR**.

### 7a. `eot-tax-saving-calculator` — CALCULATOR (MUST model the new 50% split)
- **Embed into:** `eot-tax-relief-and-cgt` (primary) + `employee-ownership-trust-guide` (anchor link).
- **Inputs:** sale value (£), original base cost (£), % shareholding sold to EOT, seller's income band (basic / higher-additional → sets 18% or 24%), (optional) BADR lifetime allowance remaining (for the trade-sale comparison column).
- **Formula:**
  - Total gain = (sale value − base cost) × shareholding%.
  - **EOT (new, on/after 26 Nov 2025):** chargeable now = 50% × gain; CGT_now = max(0, chargeable − £3,000 AEA) × rate (24% higher / 18% basic). **No BADR/IR on this slice.** Flag deferred 50% as latent gain on the trustees' future disposal. Net cash to seller = sale value − CGT_now.
  - **EOT (old, pre-26 Nov 2025) column:** £0 CGT — shown only to make the change visceral and to flag stale rival content.
  - **Trade-sale comparison column:** BADR on first £1,000,000 (of remaining lifetime allowance) at 18%, remainder at 24%, less AEA; show CGT + net.
- **Outputs:** CGT under new EOT rule, under old EOT rule (£0), and under a straight trade sale with BADR; net proceeds for each; the £-value of the latent 50% gain carried by the trust. Default it to the §1a canonical figures.
- **CTA:** "Estimate only. Book an exit tax review to model your actual position" → `/contact` (`general`, `exit-succession`) + accountant cross-sell.
- **Guardrail:** educational estimate, not advice; **does not arrange any finance**; does not store personal data beyond what the lead form captures.

### 7b. `business-valuation-calculator` — CALCULATOR
- **Embed into:** `business-valuation-guide` (primary) + `how-to-value-a-business` (anchor link). Also linkable from all 7 segment pages.
- **Inputs:** adjusted EBITDA or adjusted net profit (£), sector (dropdown → default multiple range from §6, or manual multiple), owner add-backs/adjustments (£), surplus cash & non-trading assets (£), debt (£).
- **Formula:** adjusted EBITDA = net profit + add-backs. Enterprise value = adjusted EBITDA × multiple (low / mid / high of the sector range). Equity value = EV + surplus cash − debt. Output a **range**, not a point.
- **Outputs:** indicative equity-value range (low/mid/high), the multiple applied, and 3-4 bullets on "what moves your multiple" for the chosen sector.
- **CTA:** "Indicative only, not a formal valuation. Get a proper valuation and exit tax review" → `/contact` + accountant cross-sell.
- **Guardrail:** indicative educational estimate, not a RICS/formal valuation or advice; excludes VOA/business-rates valuation; does not arrange finance.

---

## 8. SHARED AUTHORITY SOURCES (pick 4-6 per page; primary/gov first, commentary as corroboration)

**EOT / CGT-on-EOT:**
- HMRC Capital Gains Manual, EOT relief: **CG67800 onwards** (relief on disposals to EOTs).
- **TCGA 1992 ss.236H-236U** (EOT CGT relief), inserted by **Finance Act 2014, Schedule 37**.
- **Autumn Budget 2025** EOT reform measure (relief 100%→50%, effective 26 Nov 2025) — gov.uk policy paper / Finance Bill 2025-26; corroborated by Deloitte taxscape Autumn Budget 2025, Charles Russell Speechlys, Employee Benefits.
- **House of Commons Library CBP-10437** (Employee ownership trusts).
- Employee Ownership Association (EOA) — prevalence/adoption data.

**BADR / CGT on exit:**
- gov.uk — **Business Asset Disposal Relief** guidance.
- HMRC Capital Gains Manual **CG63950 onwards** (BADR / former Entrepreneurs' Relief).
- gov.uk — **Capital Gains Tax rates and annual exempt amount** (£3,000; 24%/18%; BADR 18% from 6 Apr 2026).

**Valuation:**
- ICAEW / RICS business-valuation principles; HMRC **Shares and Assets Valuation (SVM) manual** for tax-driven valuations.

**MBO (structure only):** ICAEW / corporate-finance explainer sources; **no finance-provider sources** (fence).

---

## 9. PER-PAGE SPECS (20)

Format: **slug** | tier | primary kw | secondary kws | intent | volume | UNIQUE ANGLE | H2 outline | data hook | internal links | cross-links | sources | CTA | guardrail | FAQ stems.

---

### PILLARS

**1. `employee-ownership-trust-guide`** — PILLAR
- **primary:** employee ownership trust · **secondary:** what is an employee ownership trust; how does an employee ownership trust work; EOT examples; EOT benefits for employees; employee ownership trust uk; EOT problems · **intent:** informational · **volume:** 2,400
- **UNIQUE ANGLE:** the definitive UK EOT hub, rebuilt for the **post-26-Nov-2025 world** — what an EOT is, how it works, and why the headline "0% CGT" pitch is now half true. Owns the topic; every EOT satellite defers here.
- **H2 outline (8-12):** What an EOT is · How an EOT works (trust buys a controlling interest, funded from future profits) · The 26 Nov 2025 change: 50% CGT, not 0% [link `eot-tax-relief-and-cgt`] · Who an EOT suits (and who it doesn't) · Qualifying conditions (controlling interest, trading company, all-employee benefit) [link `how-to-set-up-an-eot`] · The tax-free bonus for employees (£3,600/yr) · Advantages and disadvantages [link `eot-pros-and-cons`] · EOT vs trade sale vs MBO [link P3] · How to set one up + timeline · Cost and ongoing trustee duties · Is an EOT still worth it after the cut?
- **data hook:** §1a worked example (£4m sale: £0 old vs £455,280 new).
- **internal links:** all EOT satellites, P2, P3, `eot-tax-saving-calculator`.
- **cross-links:** `/resources/exit-cgt`, `/blog/exit-and-capital-gains/badr-2026-rate-change`.
- **sources:** CG67800; FA2014 Sch 37 / TCGA s.236H-U; Autumn Budget 2025 measure; HoC CBP-10437; EOA data.
- **CTA:** exit/EOT advisory + accountant to model the new charge → `/contact`.
- **guardrail:** unregulated (Art 70); does not arrange MBO/acquisition finance; general info not advice.
- **FAQ stems:** What is an employee ownership trust? · Is a sale to an EOT still tax-free? · How does an EOT get funded? · How long does setting up an EOT take? · What are the downsides of an EOT? · Can employees lose out in an EOT? · How much does an EOT cost to run?

**2. `business-valuation-guide`** — PILLAR
- **primary:** business valuation · **secondary:** valuation of a business methods; business valuation formula; valuation of a small business; valuation based on profit; business valuation uk · **intent:** informational · **volume:** 880
- **UNIQUE ANGLE:** the methods pillar — how UK businesses are actually valued (EBITDA multiples, SDE, asset-based, DCF, industry rules of thumb), with the sector-multiple table feeding the 7 segment pages.
- **H2 outline (8-12):** Why valuation is a range, not a number · EBITDA / earnings multiples · SDE (owner-operator businesses) · Asset-based valuation · DCF (when it's used) · Industry rules of thumb + sector multiples table [link segments] · What moves your multiple up or down · Adjustments and add-backs (normalising earnings) · Valuation vs price (what a buyer actually pays) · Getting a formal valuation · Use the valuation calculator [embed 7b].
- **data hook:** sector-multiple comparison table (recruitment/manufacturing/ecommerce/construction/law/accountancy/care home from §6).
- **internal links:** `how-to-value-a-business`, `business-valuation-calculator`, all 7 segments, P3.
- **cross-links:** `/resources/exit-cgt` (tax on the eventual sale).
- **sources:** ICAEW/RICS valuation principles; HMRC SVM manual; sector M&A data.
- **CTA:** valuation + exit tax review → `/contact`.
- **guardrail:** indicative, not a formal valuation; excludes VOA/rates valuation.
- **FAQ stems:** How is a business valued in the UK? · What multiple is my business worth? · What is SDE? · Why do valuations differ so much? · What's the difference between valuation and sale price? · How do add-backs work?

**3. `sell-my-business-guide`** — PILLAR
- **primary:** sell my business · **secondary:** valuation business for sale; how do I sell my business; sell my business uk · **intent:** informational · **volume:** 880
- **UNIQUE ANGLE:** the buyer-journey pillar — the end-to-end route to exit and the **three main exit routes compared: trade sale vs EOT vs MBO**, each with its tax and control trade-off. Journey hub.
- **H2 outline (8-12):** Deciding to sell (readiness) · Valuing the business [link P2] · The three exit routes: trade sale vs EOT vs MBO [link P1, `management-buyout-guide`] · Preparing for sale and due diligence [link `preparing-a-business-for-sale`] · Finding a buyer / using a broker · Heads of terms and the sale process · Share sale vs asset sale · The tax on exit: CGT, BADR at 18%, EOT 50% [link `selling-a-business-tax-cgt-badr`, `/resources/exit-cgt`] · Earn-outs and deferred consideration [link earn-out post] · Timeline and typical costs · Selling a business in your sector [link segments].
- **data hook:** side-by-side trade sale vs EOT vs MBO table (control, buyer, tax, speed) — reuse §1a EOT numbers in the EOT column.
- **internal links:** P1, P2, `management-buyout-guide`, `business-exit-planning`, `preparing-a-business-for-sale`, `selling-a-business-tax-cgt-badr`, all 7 segments.
- **cross-links:** `/resources/exit-cgt`, `/blog/exit-and-capital-gains/earn-out-payments-tax-treatment-selling-limited-company`, `/blog/exit-and-capital-gains/members-voluntary-liquidation-explained`.
- **sources:** gov.uk BADR; CG63950; ICAEW corporate-finance; Autumn Budget 2025 (EOT).
- **CTA:** exit advisory + accountant cross-sell → `/contact`.
- **guardrail:** Art 70 exempt; does NOT arrange buyout/acquisition finance; general info.
- **FAQ stems:** How do I sell my business? · What's the most tax-efficient way to sell? · Should I do a trade sale, EOT or MBO? · How long does selling a business take? · Do I need a broker? · Share sale or asset sale?

---

### CALCULATORS (see §7 for full spec)

**4. `eot-tax-saving-calculator`** — CALCULATOR · transactional · vol 0 · models the new 50% split · embed into `eot-tax-relief-and-cgt` + P1 · CTA exit tax review · guardrail no finance arranging.

**5. `business-valuation-calculator`** — CALCULATOR · transactional · vol 720 · EBITDA×multiple range · embed into P2 + `how-to-value-a-business` · CTA valuation review · guardrail indicative only.

---

### EOT SATELLITES

**6. `eot-tax-relief-and-cgt`** — CLUSTER
- **primary:** eot tax relief · **secondary:** employee ownership trust tax; EOT capital gains tax relief; how is an EOT taxed; EOT tax changes; EOT inheritance tax; EOT tax-free bonus · **intent:** commercial · **volume:** ~260 cluster
- **UNIQUE ANGLE:** the single deepest page on **EOT tax after the 26 Nov 2025 cut** — the 50% mechanics, why BADR/IR are blocked, the latent-gain-on-trustees point, and the employee £3,600 bonus. This is the wedge page.
- **H2 outline (6-10):** The headline change: 100%→50% from 26 Nov 2025 · How the 50% charge works (chargeable now vs held over) · Worked example [§1a] · Why BADR and Investors' Relief can't rescue the taxable half · The latent 50% gain and the trustees' future disposal · The employee income-tax-free bonus (£3,600) · IHT and CGT on the trust itself · EOT tax vs a straight trade sale [link `selling-a-business-tax-cgt-badr`] · Use the EOT tax calculator [embed 7a] · What older guides get wrong now.
- **data hook:** §1a (£4m sale, £455,280 CGT under new rule) + explicit "before 26 Nov 2025 this was £0" flag.
- **internal links:** P1, `eot-tax-saving-calculator`, `how-to-set-up-an-eot`, `selling-a-business-tax-cgt-badr`.
- **cross-links:** `/resources/exit-cgt`, `/fundamentals/business-asset-disposal-relief-explained`, `/blog/exit-and-capital-gains/badr-2026-rate-change`.
- **sources:** CG67800; TCGA s.236H-U / FA2014 Sch 37; Autumn Budget 2025 measure + Deloitte/CRS/Employee Benefits corroboration; HoC CBP-10437.
- **CTA:** EOT + accountant to model the 50% charge → `/contact`.
- **guardrail:** unregulated advisory; no finance arranging; general info not advice.
- **FAQ stems:** Is selling to an EOT still CGT-free? · How much CGT will I pay on an EOT sale now? · Can I claim BADR on an EOT sale? · What is the 50% held-over gain? · Do employees pay tax on the EOT bonus? · When did EOT tax relief change? · Is an EOT still worth it after the cut?

**7. `eot-pros-and-cons`** — CLUSTER
- **primary:** eot advantages and disadvantages · **secondary:** employee ownership trust pros and cons; EOT disadvantages; EOT advantages; EOT pros and cons uk · **intent:** informational · **volume:** ~220 cluster
- **UNIQUE ANGLE:** the honest decision page — balanced, post-cut. The 50% CGT charge is now a real "con"; content that still lists "0% CGT" as the top pro is out of date.
- **H2 outline (6-10):** EOT advantages (culture, retention, phased exit, no external buyer) · The tax advantage after 26 Nov 2025 (50%, not 0%) · Disadvantages (deferred/loan-funded consideration, seller carries risk, complexity) · The cash-flow reality (paid from future profits) · Control and governance changes · Who an EOT is wrong for · EOT vs MBO vs trade sale for the seller · Making the decision.
- **data hook:** pros/cons table with the 50% CGT charge quantified from §1a.
- **internal links:** P1, `eot-tax-relief-and-cgt`, `management-buyout-guide`, P3.
- **cross-links:** `/resources/exit-cgt`.
- **sources:** HoC CBP-10437; EOA data; Autumn Budget 2025; CG67800.
- **CTA:** exit advisory + accountant → `/contact`.
- **guardrail:** unregulated; no finance arranging.
- **FAQ stems:** What are the disadvantages of an EOT? · Is an EOT a good idea? · Do I get paid upfront in an EOT? · What's the catch with employee ownership? · EOT or MBO?

**8. `how-to-set-up-an-eot`** — CLUSTER
- **primary:** how to set up an eot · **secondary:** EOT qualifying conditions; EOT trustee; EOT process; setting up an employee ownership trust · **intent:** informational · **volume:** 0 (long-tail)
- **UNIQUE ANGLE:** the practical build guide — qualifying conditions, trustee structure, valuation, funding mechanics, timeline, and the 2026 tightened trustee/independence rules.
- **H2 outline (6-10):** Qualifying conditions (controlling interest, trading company, all-employee benefit, limited participators) · Step 1 valuation [link P2] · Step 2 trustee company / trust deed · Step 3 the sale and funding (from future profits) · Step 4 clearance and reporting · Timeline (typical 3-6 months) · The new post-2024/25 trustee-residence and independence requirements · Costs · Common mistakes.
- **data hook:** a realistic setup timeline table (month 0 to completion) + typical cost band.
- **internal links:** P1, `eot-tax-relief-and-cgt`, P2.
- **cross-links:** `/resources/exit-cgt`.
- **sources:** CG67800; FA2014 Sch 37; Autumn Budget 2025 (trustee changes); HoC CBP-10437.
- **CTA:** EOT setup advisory + accountant → `/contact`.
- **guardrail:** unregulated; no finance arranging; general info.
- **FAQ stems:** How do I set up an EOT? · What are the EOT qualifying conditions? · Who can be an EOT trustee? · How long does an EOT take to set up? · How much does it cost? · Do I need HMRC clearance?

---

### VALUATION SATELLITE

**9. `how-to-value-a-business`** — CLUSTER
- **primary:** how to value a business · **secondary:** how to value my business to sell · **intent:** informational · **volume:** 0 (long-tail of P2)
- **UNIQUE ANGLE:** the practical "value it yourself first" walkthrough (feeds the calculator); narrower/how-to vs the P2 methods pillar. Defers to P2 for method theory.
- **H2 outline (6-10):** Start with your adjusted profit (add-backs) · Pick the right method for your business · Apply a sensible multiple (sector table) [link P2] · Add surplus cash, subtract debt · Sense-check against recent sales · Use the calculator [embed 7b] · Why your number and a buyer's differ · When to get a formal valuation.
- **data hook:** a fully worked £X profit → £Y valuation example with add-backs.
- **internal links:** P2, `business-valuation-calculator`, P3, segments.
- **cross-links:** `/resources/exit-cgt`.
- **sources:** ICAEW/RICS; HMRC SVM manual.
- **CTA:** valuation + exit review → `/contact`.
- **guardrail:** indicative only; excludes VOA/rates.
- **FAQ stems:** How do I value my own business? · What add-backs can I make? · What multiple should I use? · Is my valuation the price I'll get? · When do I need a formal valuation?

---

### JOURNEY / PLANNING SATELLITES

**10. `management-buyout-guide`** — CLUSTER · **STRUCTURE / EXPLAINER ONLY (MBO-finance FENCE)**
- **primary:** management buyout · **secondary:** what is a management buyout; how does a management buyout work; MBO meaning; MBO advantages and disadvantages; MBO examples · **intent:** informational · **volume:** 2,400
- **UNIQUE ANGLE:** what an MBO is and how the **structure** works, compared with trade sale and EOT. **Explains** how MBOs are typically funded (vendor loan, deferred consideration, external finance) as education — but **never offers to arrange that finance**.
- **H2 outline (6-10):** What a management buyout is · How an MBO works (Newco, share purchase) · How MBOs are funded, in principle (vendor loan / deferred consideration / third-party finance) [educational only, §2 fence] · MBO vs MBI vs EOT vs trade sale [link P1] · Advantages and disadvantages · The seller's tax position (CGT/BADR) [link `selling-a-business-tax-cgt-badr`] · The management team's position · Typical timeline · Is an MBO right for your business?
- **data hook:** MBO vs EOT vs trade sale comparison table (funding source, seller tax, control) — EOT column uses §1a.
- **internal links:** P3, P1, `selling-a-business-tax-cgt-badr`, `business-exit-planning`.
- **cross-links:** `/resources/exit-cgt`.
- **sources:** ICAEW corporate-finance explainer; gov.uk BADR; CG63950. **No finance-provider sources.**
- **CTA:** exit/structure advisory + accountant **only**. **NO finance CTA, NO "get a quote", NO finance lead form.**
- **guardrail (verbatim intent):** "This page explains MBO structures. We do not arrange, source or introduce the finance that funds a buyout (that is regulated credit-broking). Arranging acquisition finance is handled by an authorised commercial finance broker." Art 70 covers the advisory; the finance is fenced.
- **FAQ stems:** What is a management buyout? · How is an MBO financed? · What's the difference between an MBO and an MBI? · MBO or EOT? · How long does an MBO take? · What tax does the seller pay in an MBO?

**11. `business-exit-planning`** — CLUSTER
- **primary:** business exit planning · **secondary:** exit strategy for business; business exit strategy; exit plan for a business; exit strategy in a business plan · **intent:** commercial · **volume:** 390
- **UNIQUE ANGLE:** the multi-year exit/succession planning page — how to make a business sellable and tax-efficient 2-3 years out, including the BADR 18% and EOT 50% timing levers.
- **H2 outline (6-10):** Why exit planning starts years early · Defining your exit goal (price, timing, legacy) · Choosing the exit route [link P3, P1, `management-buyout-guide`] · Making the business sellable (de-risking owner dependence) [link `preparing-a-business-for-sale`] · The tax runway (BADR 5%/2-year conditions, 18% rate, EOT timing) [link `selling-a-business-tax-cgt-badr`, `/resources/exit-cgt`] · Succession vs sale · Building a timeline · Common exit-planning mistakes.
- **data hook:** a 3-year exit runway table (year -3 to sale) with the tax-qualifying milestones.
- **internal links:** P3, P1, `preparing-a-business-for-sale`, `management-buyout-guide`, `selling-a-business-tax-cgt-badr`.
- **cross-links:** `/resources/exit-cgt`, `/fundamentals/business-asset-disposal-relief-explained`.
- **sources:** gov.uk BADR; CG63950; ICAEW; Autumn Budget 2025 (EOT).
- **CTA:** exit-planning advisory + accountant → `/contact`.
- **guardrail:** unregulated; no finance arranging.
- **FAQ stems:** When should I start exit planning? · How do I make my business sellable? · What's the most tax-efficient exit? · How far ahead should I plan for BADR? · Succession or sale?

**12. `preparing-a-business-for-sale`** — SUPPORTING
- **primary:** preparing a business for sale · **secondary:** getting a business ready to sell; due diligence checklist selling a business · **intent:** commercial · **volume:** 0 (long-tail)
- **UNIQUE ANGLE:** the practical pre-sale readiness + due-diligence checklist — clean books, reduce owner dependence, sort contracts, maximise the multiple.
- **H2 outline (6-10):** Why buyers pay more for a "ready" business · Cleaning up the financials (normalising, add-backs) · Reducing owner dependence · Contracts, IP and key-customer risk · The due-diligence data room · Fixing value-killers before you list · Timing the sale for tax (BADR/EOT) [link `selling-a-business-tax-cgt-badr`] · Getting a valuation first [link P2].
- **data hook:** a due-diligence readiness checklist (data-room contents) + "value-killer" list.
- **internal links:** P3, P2, `business-exit-planning`, segments.
- **cross-links:** `/resources/exit-cgt`.
- **sources:** ICAEW; gov.uk BADR; sector M&A diligence norms.
- **CTA:** pre-sale + accountant → `/contact`.
- **guardrail:** unregulated; no finance arranging.
- **FAQ stems:** How do I get my business ready to sell? · What is a data room? · What do buyers look for in due diligence? · How do I increase my sale multiple? · What is a value-killer?

**13. `selling-a-business-tax-cgt-badr`** — CLUSTER · **de-cannibalisation: comparison/decision page, NOT a BADR mechanics rewrite**
- **primary:** selling a business tax · **secondary:** tax when selling a business uk; capital gains tax selling a business; tax on selling a limited company · **intent:** commercial · **volume:** 0 (long-tail)
- **UNIQUE ANGLE:** the exit-route **tax-comparison / decision** page — which exit is most tax-efficient (trade sale + BADR vs EOT 50% vs MVL vs family gift) at 2026/27 rates. Pulls the numbers together; links OUT to `/resources/exit-cgt` for BADR mechanics rather than re-explaining them.
- **H2 outline (6-10):** The exit routes and their tax at a glance (comparison table) · Trade sale + BADR at 18% [link `/resources/exit-cgt`, `/blog/exit-and-capital-gains/badr-2026-rate-change`] · EOT: the new 50% charge [link `eot-tax-relief-and-cgt`, §1a] · Winding up / MVL [link members-voluntary-liquidation post] · Gifting shares / family succession [link gifting-shares post] · Earn-outs and deferred consideration [link earn-out post] · Timing: the 6 Apr 2026 rate and the 26 Nov 2025 EOT change · Getting the CGT modelled before heads of terms.
- **data hook:** one comparison table of net proceeds on the SAME £4m business under trade-sale+BADR vs new-EOT (§1a) vs MVL — the single clearest "route matters" hook in the cluster.
- **internal links:** P3, P1, `eot-tax-relief-and-cgt`, `management-buyout-guide`, `business-exit-planning`.
- **cross-links (heavy — de-cannibalisation):** `/resources/exit-cgt`, `/fundamentals/business-asset-disposal-relief-explained`, `/blog/exit-and-capital-gains/badr-2026-rate-change`, `/blog/exit-and-capital-gains/members-voluntary-liquidation-explained`, `/blog/exit-and-capital-gains/gifting-shares-family-member-cgt`, `/blog/exit-and-capital-gains/earn-out-payments-tax-treatment-selling-limited-company`.
- **sources:** gov.uk BADR + CGT rates; CG63950; CG67800 (EOT); Autumn Budget 2025.
- **CTA:** accountant cross-sell is PRIMARY here (CGT modelling) + exit advisory → `/contact`.
- **guardrail:** general info not advice; unregulated; no finance arranging.
- **FAQ stems:** What tax do I pay when I sell my business? · Is a trade sale or EOT more tax-efficient? · How much CGT on selling a limited company? · What's the BADR rate in 2026/27? · Should I wind up or sell? · How is a family share gift taxed?

---

### SECTOR SEGMENTS (7) — follow §6 anti-sameness matrix + shared skeleton

For all 7: tier **supporting** · intent **informational** · volume 0 (long-tail/estate-audience) · shared H2 skeleton in §6 · internal links **P2 + P3 + `selling-a-business-tax-cgt-badr` + P1 (EOT option) + `preparing-a-business-for-sale` + `business-valuation-calculator`** · cross-links **`/resources/exit-cgt`** · sources **gov.uk BADR + CG63950 + CG67800 (EOT) + sector M&A/valuation norm + relevant regulator** · CTA **exit advisory + estate sector accountant cross-sell (target in §6) → `/contact`** · guardrail **unregulated (Art 70); no finance arranging; general info** · FAQ stems: What is a \<sector\> business worth? · Who buys \<sector\> businesses? · How long to sell a \<sector\> business? · What tax will I pay? · Could an EOT work for a \<sector\> business? · plus the sector-specific diligence FAQ below.

**14. `how-to-sell-a-recruitment-business`** — UNIQUE: temp/contractor book (recurring GP) vs perm desk; consultant key-person + covenants; invoice-finance/back-office novation; perm rebate/clawback. Data hook: NFI/GP multiple + temp-vs-perm valuation gap. Sector regulator FAQ: "Do I need to novate my invoice-finance facility?" Cross-sell: agency site.

**15. `how-to-sell-a-manufacturing-business`** — UNIQUE: EBITDA + asset backing; plant/capital-allowances valuation; freehold (SDLT, SIPP/SSAS); WIP/stock; land contamination; TUPE. Data hook: EBITDA multiple + separate plant/freehold valuation. FAQ: "How is the factory/freehold valued in the sale?" Cross-sell: manufacturing accountant / property (freehold).

**16. `how-to-sell-a-ecommerce-business`** — UNIQUE: SDE-based multiples; platform/account transferability (FBA, Shopify, ASIN/brand registry); ad-account + customer-data (GDPR); inventory; SKU/channel concentration. Data hook: SDE multiple band + platform-transfer risk. FAQ: "Can I transfer my Amazon/Shopify account to a buyer?" Cross-sell: ecommerce accountant.

**17. `how-to-sell-a-construction-business`** — UNIQUE: low/lumpy 2-4x; net-asset + WIP; CIS; retentions; contract novation; latent-defects/PI run-off; framework dependence; bonding. Data hook: lower multiple rationale + retention/WIP treatment. FAQ: "What happens to retentions and CIS on sale?" Cross-sell: construction-cis (Trade Tax).

**18. `how-to-sell-a-law-firm-business`** — UNIQUE: turnover/WIP + goodwill; SRA authorisation on change of control; run-off cover / PII (6-year cost); client account; partner lock-in / LLP; client-transfer consent. Data hook: WIP/disbursements + run-off cost as a value deduction. FAQ: "Do I need SRA approval to sell my firm?" Cross-sell: solicitors site.

**19. `how-to-sell-a-accountancy-business`** — UNIQUE: recurring-fee (GRF) multiple ~0.8-1.4x; clawback/retention holdback (12-24m fee retention); client attrition; ICAEW/ACCA rules; software/data migration. Data hook: GRF multiple + clawback mechanics. FAQ: "How does fee clawback work when selling a practice?" Cross-sell: generalist (self).

**20. `how-to-sell-a-care-home-business`** — UNIQUE: property-heavy EBITDARM × yield / per-bed; CQC registration transfer + ratings; occupancy; LA-vs-private fee mix; agency staffing; registered-manager continuity; TUPE. Data hook: EBITDARM/per-bed basis + CQC-rating value effect. FAQ: "How does CQC registration transfer to a buyer?" Cross-sell: carehometax/medical.

---

## 10. WRITER CHECKLIST (per page, before submit)

- [ ] EOT page states the 26 Nov 2025 50% position (§1) AND flags stale rival "0% CGT" content.
- [ ] EOT calc/example uses §1a canonical figures.
- [ ] 2026/27 facts only (BADR 18%, CGT 24%/18%, AEA £3,000, BADR lifetime £1m — not the £2.5m IHT cap).
- [ ] No general CGT/BADR mechanics rewrite; cross-linked to `/resources/exit-cgt` + `/fundamentals/business-asset-disposal-relief-explained` instead (§4).
- [ ] Links up to correct pillar(s) (§5); sector pages hit P2 + P3.
- [ ] MBO page: structure only, finance fenced, no finance CTA (§2).
- [ ] Sector page: dominant unique axis from §6, no cross-post sameness.
- [ ] CTA = `/contact`, `general`, `exit-succession`; exit advisory + accountant cross-sell (§3).
- [ ] Guardrail one-liner present (Art 70 exempt; no finance arranging).
- [ ] No em-dashes; faceless EEAT; raw HTML body in frontmatter; 5-8 FAQs + keyTakeaways.
