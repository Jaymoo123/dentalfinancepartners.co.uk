# Generalist (Holloway Davies) R3 — Downloadable resources (WS5) + proactive assistant (WS6) design brief

**Status:** DESIGN-ONLY (no code written). Architect's designer output for R3 of the estate CRO
parity program. Port of Property's ResourceGate + SpecialistWidget + Phase-0 assistant, re-fitted to
the generalist site's 9-topic taxonomy, 6 premium tools, orange/neutral tokens, `hd` storage prefix,
and the LOCKED house positions. Build local-first; prod actions need explicit sign-off.

Source frameworks studied: `Property/web/src/components/resources/*`, `Property/web/src/lib/resources/*`,
`Property/web/scripts/resources/generate-xlsx.ts`, `Property/web/src/components/support/SpecialistWidget.tsx`,
`Property/web/src/lib/support/faq.ts`, `Property/web/src/lib/assistant/opener.ts`,
`Property/web/src/lib/intent/journeyModel.ts`, `docs/property/PROACTIVE_ASSISTANT_BRIEF.md`.

Ground truth for every figure: `docs/generalist/house_positions.md` (LOCKED 2026-06-12), cited by `§N`.

---

## 0. Hard constraints (apply to everything below)

1. **Email delivery is BLOCKED.** No verified Resend from-domain for Holloway Davies yet. Resources
   are delivered **on-page only**: a post-submit inline reveal with a direct `download` link. The email
   path is **stubbed behind config** (`RESOURCE_EMAIL_DELIVERY_ENABLED = false`); when false, the widget
   copy never promises an email and the `/api/resources/deliver` POST is not fired. This is the single
   biggest divergence from Property, whose gate says "we've emailed you the links".
2. **Resources are in-house consent only, NEVER partner-shared.** The generalist niche config carries
   `partner: "Reflex Accounting"`, so `siteConfig.leadConsentText` (used by MiniCapture / LeadForm)
   references Reflex. The resource gate must NOT use that text. It uses a NEW in-house
   `siteConfig.resourceConsentText` (mirrors Property's Annex B.2 posture with this site's own wording):
   `I agree to Holloway Davies using my email to send me the resource I requested.` **The string "DJH"
   must never appear anywhere** (it does not appear in the generalist codebase today; do not introduce it).
3. **Assistant = Property's DETERMINISTIC Phase-0 machinery only.** Journey model + escalating ping +
   opener copy. **No LLM chat.** The widget must strip any partner mention (no "shared with Reflex" in
   the assistant surface; the assistant enquiry is an in-house async enquiry). The `email_only` capture
   flows through the existing chokepoint, which already appends the standard lead consent text server-side.
4. **Dependency-free, site tokens, no em-dashes, UK English.** Orange = `#f97316` / `orange-500|600`,
   neutral = `slate-*`/`neutral-*` (NOT Property emerald). `exceljs` is already a generalist dependency
   (package.json line 44). Event names ONLY from `packages/web-shared/analytics/types.ts`.

### Allowlisted events this feature may emit (from `analytics/types.ts`, verified present)
`gate_view`, `resource_unlocked`, `personalization_shown`, `personalization_clicked`,
`personalization_dismissed`, `support_opened`, `cta_click`, `form_error`, `form_start`,
`form_field_focus`, `form_field_abandon`, `form_submit`, `lead_submitted`, `calc_computed`,
`section_view`, `scroll_depth`, `exit_intent_shown`. No new event names are introduced.

### Confirmed reusable generalist infrastructure (no rebuild)
- `submitGeneralistLead(payload, honeypot)` already accepts `captureMode?: "full" | "email_only"`
  (`lib/leads/submit-client.ts:35`) and routes through `/api/leads/submit` with a direct-insert fallback.
- Shared `submitLead` + `getSupabaseConfig` from `@accounting-network/web-shared/lib/supabase-client`
  (used for the gate's own direct insert, mirroring Property's ResourceGate).
- `useIntentContext()` (`components/intent/IntentProvider.tsx`) returns the same shape the widget needs;
  it already no-ops on `/embed`, `/admin`, and consent-denied. Mounted in the root layout inside
  `IntentProvider` (layout.tsx:96), storagePrefix `"hd"`, posture `"opt-out"`.
- `deriveTopic(pathname)` + `getTopic(key)` (9 topics) + `resourceForTopic(topic)` (R2 scaffold).
- `ExitIntentModal.tsx:11-13` already carries the `TODO WS6` marker to re-add the
  `hd_assistant_active` stand-down guard, and is mounted in `PageShell.tsx:29`.
- `MiniCapture` (blog resource fallback / mobile tool slot), `PremiumUpgrade`, `CalcPromoCard`,
  `useInViewOnce`, `useFormTracking` (shared: `@accounting-network/web-shared/analytics/react/useFormTracking`),
  `btnPrimary` (`components/ui/layout-utils.ts:21`), `cn` (`lib/utils.ts`).

---

## 1. WS5 — Resource set (6 gated assets)

Each flagship topic that has a premium compute tool gets ONE gated Excel model + ONE gated written
guide, mapped 1:1 to the 6 R2 premium tools (the highest-traffic topics: director pay, incorporation,
VAT, payroll, R&D, exit/CGT). The `compliance` topic and the three tool-less topics (`limited-company`
maps to the director-pay tool; `sole-trader` maps to the incorporation tool) get NO own asset in R3 —
they surface the mapped topic's asset via the existing `resourceForTopic` mapping, or nothing.

The generalist R2 `RESOURCES` registry (`lib/resources/registry.ts`) currently types `xlsx: null` and
`guide: null` literally. **R3 replaces those literal-null types with Property's `XlsxAsset | null` /
`GuideAsset | null` shapes** and adds the `enabled` feature-flag, `magnetTitle`, `magnetBlurbTemplate`,
and the helper functions (`isXlsxEnabled`, `isGuideEnabled`, `hasEnabledResource`, `enabledGuideTopics`,
`enabledResourceTopics`), copied verbatim from Property's registry with generalist topics.

**Build gate (per asset):** author the xlsx builder + the guide markdown, run `npm run resources:xlsx`,
add + pass the golden test (xlsx formula result === TS `compute()` at the default inputs, §4), THEN flip
the single `enabled: true`. Until then the asset renders nothing (belt-and-braces null guard in the gate).

Rate constants for every model come from ONE source: `lib/uk-tax-rates.ts` (tax year 2026/27). The
xlsx builder imports the SAME constants the compute lib uses, so the workbook and the site can never
drift. Note the four hardcoded-rate exceptions the builder must mirror exactly (§4 note).

### Asset 1 — Salary and dividend take-home model  (topic `director-pay`)

- **Asset type:** xlsx model (builder, `director-pay.ts`). Traces `modelExtraction` + `findOptimalSalary`
  from `lib/tools/compute/salary-dividend.ts`.
- **File:** `/resources/director-pay/director-pay-model.xlsx`
- **Button label:** `Salary and dividend model (Excel)`  ·  **Guide:** `Director pay and dividends guide`
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **`Your figures` blue-cell inputs (defaults):** Company profit before salary `£80,000`;
  Salary level `Optimal (£12,570)`; Claim Employment Allowance `No`.
- **Formulas (each cell a live formula, not a pasted number):**
  - `employerNi = MAX(0, salary - Rates!SecondaryThreshold) * Rates!EmployerNiRate` → `(12570-5000)*0.15`
  - `profitAfterPayroll = profit - salary - employerNi`
  - `corporationTax = IF(p<=50000, p*0.19, IF(p>=250000, p*0.25, 50000*0.19 + (p-50000)*0.265))` (p=profitAfterPayroll)
  - `dividend = profitAfterPayroll - corporationTax`
  - `dividendTax` via the banded formula (£500 allowance, 10.75% basic to £50,270, 35.75% higher to £125,140, 39.35% additional) matching `calcDividendTaxSD`
  - `totalTax = employerNi + corporationTax + employeeNi + incomeTax + dividendTax`
  - `netCash = salary - employeeNi - incomeTax + dividend - dividendTax`
- **Preview (ExcelPreview `paired` layout) — cells must match `gbp()`-rounded default outputs:**

  | Your figures (edit the blue cells) | | | You (salary + dividends) | |
  |---|---|---|---|---|
  | Company profit before salary | **£80,000** (blue) | | Director salary | £12,570 |
  | Salary level | Optimal (£12,570) (blue) | | Dividend paid | £52,476 |
  | Claim Employment Allowance | No (blue) | | Employer NIC | £1,136 |
  | | | | Corporation tax | £13,818 |
  | | | | Dividend tax | £9,157 |
  | | | | Total tax and NIC | **£24,110** (strong) |
  | headline row (emerald→**orange** band): **Net cash in your pocket: £55,890** | | | | |

- **Gate copy:**
  - Headline: `Get the salary and dividend model`
  - Bullets: `The full tax stack: salary, dividend, employer NIC, corporation tax and dividend tax` ·
    `Live formulas: change your profit and every figure recalculates` ·
    `Built on the 2026/27 rates (dividend 10.75% / 35.75%, employer NIC 15% above £5,000)`
  - Button (email delivery OFF): `Get the model`
- **Surfaces:** calculator page `/calculators/salary-dividend-optimiser` (via `CalculatorPageResources`,
  `split`) and blog category `director-pay-and-dividends` + `limited-company-tax` (via `GateOrForm` slot).

### Asset 2 — Sole trader vs limited company model  (topic `incorporation`)

- **Type:** xlsx (`incorporation.ts`), traces `soleTraderTax` + `modelExtraction`/`findOptimalSalary`.
- **File:** `/resources/incorporation/incorporation-model.xlsx`
- **Button:** `Incorporation comparison (Excel)`  ·  **Guide:** `Sole trader vs limited company guide`
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **Inputs (defaults):** Annual profit `£80,000`; Claim Employment Allowance (company leg) `No`.
- **Formulas:** sole-trader leg = `incomeTax` (PA £12,570, 20/40/45% bands via `calcIncomeTaxTHP`) +
  `class4 = (MIN(profit,50270)-12570)*0.06 + MAX(0,profit-50270)*0.02`; company leg = Asset-1 chain at
  the optimal salary; `difference = companyNetCash - soleTraderNetCash`.
- **Preview (`paired`):**

  | Your figures | | | Sole trader | Limited company |
  |---|---|---|---|---|
  | Annual profit | **£80,000** (blue) | | Income tax £19,432 | Corporation tax £13,818 |
  | Claim Employment Allowance | No (blue) | | Class 4 NIC £2,857 | Dividend tax £9,157 |
  | | | | Net cash **£57,711** | Net cash **£55,890** |
  | headline (orange band): **Staying a sole trader keeps £1,822 more a year on these figures** | | | | |

  Note: the honest result at the defaults is that incorporation COSTS £1,822/yr, which matches the LOCKED
  house rule (§1.A: "present incorporation as a calculation, not a default; do not claim a company is
  always more efficient"). Keep the headline framed as the sole-trader advantage, tone `warn`.
- **Gate copy:** Headline `Get the incorporation comparison model` · Bullets
  `Side-by-side net cash: sole trader vs limited company on the same profit` ·
  `The real after-tax gap before you weigh the extra admin` ·
  `Ignores CGT and goodwill on transfer: a specialist models those for you (§1.A)` · Button `Get the model`.
- **Surfaces:** `/calculators/salary-dividend-optimiser` shares the director-pay asset; incorporation
  asset surfaces on blog categories `incorporation-and-structure` + `sole-trader-and-self-employment`.

### Asset 3 — VAT scheme chooser model  (topic `vat-mtd`)

- **Type:** xlsx (`vat-scheme.ts`), traces `compareVATSchemes`.
- **File:** `/resources/vat-mtd/vat-scheme-model.xlsx`
- **Button:** `VAT scheme model (Excel)`  ·  **Guide:** `VAT schemes and MTD guide`
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **Inputs (defaults):** VAT-taxable turnover (ex VAT) `£100,000`; VAT on purchases `£2,000`; Goods spend `£500`.
- **Formulas:** `vatCollected = turnover*0.20`; `grossInclusive = turnover*1.20`;
  `standardNet = vatCollected - vatInputs`; `lctApplies = goodsSpend < MAX(1000, grossInclusive*0.02)`;
  `flatRate = IF(lctApplies, 0.165, 0.125)`; `flatNet = grossInclusive*flatRate`; `saving = ABS(standardNet-flatNet)`.
- **Preview (`single` layout):**

  | Your figures (edit the blue cells) | |
  |---|---|
  | VAT-taxable turnover (ex VAT) | **£100,000** (blue) |
  | VAT on purchases (reclaimable) | £2,000 (blue) |
  | Annual spend on goods | £500 (blue) |
  | Which scheme wins? | |
  | Standard VAT: net payable | £18,000 |
  | Flat Rate (limited cost, 16.5%) | £19,800 |
  | headline (orange band): **Standard VAT wins by £1,800 a year** | |

- **Gate copy:** Headline `Get the VAT scheme model` · Bullets
  `Standard vs Flat Rate side by side, in pounds` ·
  `Flags the limited-cost-trader 16.5% trap most service businesses fall into (§7)` ·
  `Registration threshold £90,000; MTD for VAT applies to all registered businesses since April 2022` ·
  Button `Get the model`.
- **Surfaces:** `/calculators/vat-scheme-comparator` + blog `vat-and-making-tax-digital`.

### Asset 4 — True cost of hire model  (topic `payroll`)

- **Type:** xlsx (`payroll.ts`), traces `calcEmployerNIFleet` / `calcSingleEmployerNi` / `calcMinPensionEmployer`.
- **File:** `/resources/payroll/employer-cost-model.xlsx`
- **Button:** `Cost of hire model (Excel)`  ·  **Guide:** `Employing staff and payroll guide`
- **Sheets:** `Start here` · `Your team` · `Rates` · `Notes`. The `Your team` sheet is an editable
  multi-row grid (role + salary) mirroring the tool's `MiniGrid`; the model sums across rows.
- **Inputs (defaults):** one employee, role `First hire`, salary `£30,000`; Claim EA `Yes`; Include pension `Yes`.
- **Formulas (per row, then summed):** `employerNi = MAX(0, salary-5000)*0.15`;
  `eaApplied = IF(rows>=2 AND useEA, MIN(niTotal, 10500), 0)` (single-director/single-employee → 0, warning
  shown, per §4 EA restriction); `niAfterEA = MAX(0, niTotal-eaApplied)`;
  `pension = MAX(0, salary-6240)*0.03`; `totalCost = grossSalaries + niAfterEA + pension`.
- **Preview (`single`):**

  | Your team (edit the blue cells) | |
  |---|---|
  | Role · First hire | (blueText) |
  | Annual salary | **£30,000** (blue) |
  | True cost build-up | |
  | Gross salaries | £30,000 |
  | Employer NIC (after allowance) | £3,750 |
  | Employer pension (3%) | £713 |
  | headline (orange band): **True annual cost of your team: £34,463 (£2,872/month)** | |

  Note the LOCKED EA trap (§4/§9): with one employee the £10,500 Employment Allowance is NOT applied
  even with the toggle on; the model shows a "requires a non-director employee" note row.
- **Gate copy:** Headline `Get the cost-of-hire model` · Bullets
  `The real loaded cost of a hire, not the headline salary (§9)` ·
  `Employer NIC 15% above £5,000, the £10,500 Employment Allowance and the 3% pension folded in` ·
  `Add your whole team and see the monthly total` · Button `Get the model`.
- **Surfaces:** `/calculators/employer-ni-calculator` + blog `payroll-and-paye`.

### Asset 5 — R&D tax relief estimator model  (topic `rnd`)

- **Type:** xlsx (`rnd.ts`), traces `calcRDCredit`.
- **File:** `/resources/rnd/rd-relief-model.xlsx`
- **Button:** `R&D relief model (Excel)`  ·  **Guide:** `R&D tax relief guide (merged scheme + ERIS)`
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **Inputs (defaults):** Total operating expenditure `£500,000`; R&D staff `£120,000`; subcontractor `£0`;
  consumables `£10,000`; software `£5,000`.
- **Formulas:** `qualifying = staff + subcontractor*0.65 + consumables + software`;
  `intensity = qualifying/totalExpenditure`; `isIntensive = intensity >= 0.30`;
  ERIS branch `netBenefit = qualifying * 0.2697`; merged RDEC branch `netBenefit = qualifying*0.20*0.75`.
- **Preview (`single`):**

  | Your figures (edit the blue cells) | |
  |---|---|
  | Total operating expenditure | **£500,000** (blue) |
  | R&D staff costs | £120,000 (blue) |
  | R&D consumables | £10,000 (blue) |
  | R&D software | £5,000 (blue) |
  | Your R&D benefit | |
  | Qualifying R&D spend | £135,000 |
  | R&D intensity ratio | 27.0% |
  | Estimated net benefit (merged RDEC 20%) | **£20,250** |
  | headline (orange band): **£20,250 estimated net R&D benefit (below the 30% ERIS threshold)** | |

- **Gate copy:** Headline `Get the R&D relief model` · Bullets
  `The 30% intensity test that decides ERIS vs the merged RDEC scheme (§ R&D)` ·
  `Only 65% of subcontractor cost qualifies: the model handles it` ·
  `A directional estimate; the PAYE cap and loss position need a specialist` · Button `Get the model`.
- **Surfaces:** `/calculators/rd-tax-credit-estimator` + blog `randd-tax-credits` (note the slug is
  `randd-tax-credits`, not `rd-tax-credits`, per the taxonomy comment).

### Asset 6 — Exit and BADR timing model  (topic `exit-cgt`)

- **Type:** xlsx (`exit-cgt.ts`), traces `calcBADR` for BOTH tax years.
- **File:** `/resources/exit-cgt/badr-exit-model.xlsx`
- **Button:** `Exit and BADR model (Excel)`  ·  **Guide:** `Selling your business: CGT and BADR guide`
- **Sheets:** `Start here` · `Your figures` · `Rates` · `Notes`.
- **Inputs (defaults):** Sale proceeds `£600,000`; Original cost `£100,000`; BADR already used `£0`;
  Meets BADR conditions `Yes`.
- **Formulas:** `gain = proceeds - cost`; `eligibleSlice = MIN(gain, 1000000 - previousBADRUsed)`;
  `overflow = gain - eligibleSlice`; `cgt2025 = eligibleSlice*0.14 + overflow*0.24`;
  `cgt2026 = eligibleSlice*0.18 + overflow*0.24`; `extraTax = cgt2026 - cgt2025`.
- **Preview (`paired`):**

  | Your figures | | | Sell before 6 Apr 2026 | Sell on/after 6 Apr 2026 |
  |---|---|---|---|---|
  | Sale proceeds | **£600,000** (blue) | | BADR rate 14% | BADR rate 18% |
  | Original cost | £100,000 (blue) | | Total CGT £70,000 | Total CGT £90,000 |
  | Meets BADR conditions | Yes (blue) | | Net proceeds £530,000 | Net proceeds £510,000 |
  | headline (orange band): **£20,000 more CGT if you complete on or after 6 April 2026** | | | | |

  This is the LOCKED live planning lever (§5: state the BADR date band every time; 14%→18% step at 6 Apr 2026).
- **Gate copy:** Headline `Get the exit and BADR timing model` · Bullets
  `The 14% to 18% BADR step at 6 April 2026, in pounds (§5)` ·
  `Net proceeds for a completion each side of the date` ·
  `Asset sale vs share sale changes the answer: model your exit with a specialist` · Button `Get the model`.
- **Surfaces:** `/calculators/badr-cgt-calculator` + blog `exit-and-capital-gains`.

### 1.x Component behaviour (ResourceGate + GateOrForm + CalculatorPageResources)

Port Property's three components with these generalist deltas:

- **`ResourceGate.tsx`** (email-gated download unlock, forked from the mini form):
  - Colours: emerald → **orange-500/600**; input focus ring `focus:ring-orange-500/25`; top accent
    `from-orange-400 to-orange-600`; consent checkbox `accent-orange-500`.
  - Consent text: `siteConfig.resourceConsentText` (NEW, in-house), NOT `leadConsentText` (Reflex).
  - Submit uses the shared `submitLead` + `getSupabaseConfig` direct insert with `role: "resource"`,
    `source: niche.content_strategy.source_identifier` (`"generalist"`),
    `message: "[Resource: <topic>] <magnetTitle>"`, `captureMode` omitted (this is a marketing-consent
    tick-box insert, not the email-only chokepoint path).
  - **Email delivery OFF:** success copy = `You're in. Your download is ready below.` (drop
    "we've emailed you a copy"). Button label = `Get the model` / `Unlocking...` (drop "Email me").
    Footer microcopy = `Instant access on this page. No spam.` The `/api/resources/deliver` fetch is
    guarded by `RESOURCE_EMAIL_DELIVERY_ENABLED` and does not fire while false. Inline `download` link +
    guide `/resources/<slug>` read link both work regardless.
  - Fires `gate_view` (on in-view) and `resource_unlocked` (on success), plus the GA `generate_lead`.
- **`GateOrForm.tsx`** (blog slot): renders the `ResourceGate` when `hasEnabledResource(topic)`, else
  falls back to `MiniCapture` (the R2 "free review" behaviour). In R3, with assets enabled, the blog
  slot shows the real gate (single stacked column, `split={false}`), matching Property's post-Phase-A state.
- **`CalculatorPageResources.tsx`** (calculator page island): resolves topic from calc slug via
  `topicForCalcSlug`, renders `PremiumUpgrade` (existing) + the `GateOrForm` gate (`split`), under a
  `Go deeper` label. Mounts below the calculator in `app/calculators/[slug]/page.tsx` (after
  `CalculatorClient`, ~line 90) and on the hand-authored `employer-ni-calculator/page.tsx`.
- **`ExcelPreview.tsx`**: port with the 6 generalist specs above; recolour the headline band and
  "Live formulas" pill from emerald to orange; keep the fixed `w-[640px]` grid. Every figure = the
  `gbp()`/`pct()`-rounded default output traced in §4 (so preview and downloaded file never disagree).

### 1.y Written guides (the value behind the gate)

Six `content/resources/<topic>.md` files (raw HTML body + frontmatter `topic/title/summary/version/
lastReviewed`), served by a `resources/[topic]` NOINDEX route (`robots: noindex`) via a `lib/resources/
content.ts` loader. **Blocker:** Property's loader imports `addHeadingIds`/`extractHeadings` from
`@/lib/markdown-utils`, which does NOT exist generalist-side; the generalist equivalent is
`addHeadingIds` from `@accounting-network/web-shared/content/markdown-utils` (used by `lib/blog.ts:5`).
Route the generalist loader through the shared helper; if `extractHeadings` is not exported there, add a
minimal local heading extractor or drop the in-guide TOC. Guide content is authored to the LOCKED house
positions and is genuinely useful (A* bar), not thin filler.

---

## 2. WS6 — SpecialistWidget adaptation

Port `SpecialistWidget.tsx` with the same structure (agent-style card, journey-tailored peek that
escalates, exit + friction triggers, email_only capture) and these generalist deltas.

### 2.1 Copy + tokens + brand strip
- Header brand: `Holloway Davies` / sub `A specialist replies within one working day`.
- All emerald → orange; badge halo stays red (`bg-red-600` unread pip) which is a neutral alert colour.
- **Partner strip:** the assistant is an in-house async enquiry. Its consent line uses
  `siteConfig.leadConsentText` (which the server chokepoint also stamps), and the assistant must NOT
  add any "shared with Reflex" phrasing in its own copy beyond that standard consent line. No booking
  concierge in R3 (Property's `bookingNudge` / `/book` path does not exist here) — drop that branch.
- Success copy: `Thanks, a specialist has your message and will be in touch by email. Please keep an eye
  on your inbox, and your spam or junk folder, so our reply is not missed.`
- Storage keys use the `hd` prefix: auto-open once-per-session key `hd_assistant_autoopened`,
  active flag `hd_assistant_active`, journey key `hd_journey`.

### 2.2 Capture (email_only via the existing chokepoint)
On submit: validate email + non-empty question, then
`submitGeneralistLead({ full_name:"", email, phone:"", role:"Other",
message:"[Specialist question (<topic>)] <question>", source:"generalist", ...,
consent_given:true, consent_text:`${siteConfig.leadConsentText} See our Privacy Policy.`,
extras:{ capture_channel:"assistant", trigger:<lastTrigger> }, captureMode:"email_only" }, honeypot)`.
Honeypot field `enquiry_ref` is passed through (never silently dropped), per the honeypot fix. The
server routes email_only into the detail-capture sequence that collects name/phone before any handoff.
Fires `support_opened` (on open), `lead_submitted` (on success, via `useFormTracking`).

### 2.3 FAQ set (`lib/support/faq.ts`) — 10 Q&As, house-position-traced

A `GENERIC[]` set (3) shown when there is no topic, plus a `BY_TOPIC` map. Every answer is short,
accurate, points to the matching calculator, and ends the deep cases at "ask a specialist for your
numbers". Figures follow the LOCKED house positions with tax-year tags.

**GENERIC (3):**
1. Q: `How quickly will a specialist reply?` — A: `Within one working day, and usually much sooner.
   Leave your email and a one-line question and an accountant will come back to you personally.`
2. Q: `Is the first conversation free?` — A: `Yes. The first call to understand your situation and
   point you in the right direction is free, with no obligation.`
3. Q: `What should I have ready?` — A: `Roughly: your business structure (sole trader, partnership or
   company), your approximate profit or turnover, and what is prompting the question. If you are not
   sure, we will guide you.`

**BY_TOPIC (key → Q&As, § reference):**
- `director-pay` (§4):
  - Q `What is the most tax-efficient way to pay myself?` — A: `Usually a modest salary plus dividends.
    From 6 April 2026 dividends are taxed at 10.75% (basic), 35.75% (higher) and 39.35% (additional),
    with a £500 allowance. The salary and dividend planner shows the split; we then confirm it for your
    company.`
  - Q `What salary should a director take?` — A: `With no Employment Allowance, a one-director company
    often sets salary at the £5,000 secondary threshold to avoid employer NIC, or at £12,570 to use the
    full personal allowance. With a genuine second employee the £10,500 Employment Allowance usually
    makes £12,570 better. We model both.`
- `incorporation` (§1.A):
  - Q `Should I set up a limited company?` — A: `Sometimes, but it is a calculation, not a default. A
    company can be efficient if you retain profit, but adds accounts, a Companies House filing and
    payroll, and the 2026/27 dividend rise narrows the gap. The comparison tool shows the after-tax gap.`
  - Q `Does incorporating trigger a tax charge?` — A: `It can. Transferring a business can crystallise
    Capital Gains Tax, though s.162 incorporation relief may defer the gain into the shares. Goodwill and
    Stamp Duty need handling too. A specialist checks whether the reliefs apply to you.`
- `vat-mtd` (§7):
  - Q `When do I have to register for VAT?` — A: `When your taxable turnover passes £90,000 in any rolling
    12 months, or you expect to pass it in the next 30 days. You can also register voluntarily to reclaim
    input VAT.`
  - Q `Is the Flat Rate Scheme worth it?` — A: `Often not for service businesses. If your goods cost under
    2% of turnover or under £1,000 a year you are a limited-cost trader on a 16.5% flat rate, which usually
    wins nothing. The VAT scheme tool checks it for your numbers.`
- `payroll` (§9):
  - Q `What does it really cost to employ someone?` — A: `More than the salary. Add employer NIC at 15%
    above £5,000, the 3% minimum auto-enrolment pension on qualifying earnings above £6,240, payroll
    running costs and on-costs. The cost-of-hire tool builds the full loaded figure.`
  - Q `Can I claim the Employment Allowance?` — A: `Only if you have at least one genuine non-director
    employee. A single-director company with no other staff cannot claim the £10,500 allowance.`
- `rnd`:
  - Q `Can my company claim R&D tax relief?` — A: `Possibly, for accounting periods from 1 April 2024
    under the merged scheme (a 20% expenditure credit), or the more generous ERIS route if you are
    R&D-intensive (qualifying R&D at least 30% of total spend). The estimator gives a directional figure;
    a specialist scopes a real claim.`
  - Q `What counts as qualifying R&D spend?` — A: `Staff, consumables, software and 65% of subcontractor
    cost on genuine advances in science or technology. The PAYE cap, grants and connected parties all
    affect the number, so we review the detail.`
- `exit-cgt` (§5):
  - Q `How much CGT will I pay when I sell my business?` — A: `Business Asset Disposal Relief gives a
    reduced rate up to a £1m lifetime limit: 14% for disposals to 5 April 2026, then 18% from 6 April
    2026. Gains above the limit are taxed at 24%. Completing each side of that date can change the bill.`
  - Q `Is an asset sale or a share sale better?` — A: `They tax very differently. A share sale is one CGT
    layer with BADR potentially available; an asset sale taxes gains inside the company, then again on
    extraction. Buyers usually prefer assets, sellers usually prefer shares. Model both before you agree.`
- `compliance` (§2.B, §3): (no calculator, so both answers route to a specialist)
  - Q `When are my tax returns and payments due?` — A: `A company files its CT600 and pays 9 months and
    1 day after the period end. Self Assessment is 31 January online, with payments on account on 31
    January and 31 July. We can map your deadlines so nothing is missed.`
  - Q `Do I need to worry about Making Tax Digital?` — A: `MTD for Income Tax starts on 6 April 2026 for
    landlords and sole traders with qualifying income over £50,000 (over £30,000 from April 2027). It
    means digital records and quarterly updates. We can get you set up.`

`faqForTopic(topic)` returns `BY_TOPIC[topic] ?? GENERIC`, mirroring Property.

---

## 3. WS6 — Assistant Phase-0 (journey model + opener + escalation)

The generalist site has an intent ENGINE (polling scroll/engagement, `lib/intent/engine.ts`) but NO
trail-based `journeyModel.ts` and NO `opener.ts`. R3 adds both, ported from Property with the generalist
taxonomy and `hd` storage prefix. The deterministic model is required because the widget's escalating
ping needs a per-session TRAIL (pages, sections, calc use, friction), which the polling context does not keep.

### 3.1 `lib/intent/journeyModel.ts` (new, ported verbatim from Property)
- Storage key `hd_journey` (was `ptp_journey`).
- Subscribes to the analytics bus, accumulates `PageNode[]` + `usedCalculator/visitedAbout/
  visitedServices/visitedContact/friction`, derives `JourneyProfile { primaryTopic, secondaryTopic,
  stage, depth, signals[], pageCount }`. Topic weighting, stage ladder, and signal derivation copied
  unchanged (they are taxonomy-agnostic; `deriveTopic` is already generalist).
- Stage ladder (verbatim): `researching` → `comparing` (>=2 topics or >=3 pages) →
  `evaluating-us` (visited /about or /services) → `ready` (used a calc, visited /contact, or returning).

### 3.2 `lib/assistant/opener.ts` (new) — topic nouns/hooks per topic × stage

`TOPIC_NOUN` (one short noun per taxonomy key) and `TOPIC_HOOKS` (three escalating lines: curious →
helpful → direct) mirror `opener.ts`. Voice rule (LOCKED): one sentence, no em-dashes, no figures, no
tax advice, never claim the firm is chartered/qualified. The opener's only job is to earn the click.

| Topic key | `TOPIC_NOUN` | Hook 1 (curious) | Hook 2 (helpful) | Hook 3 (direct) |
|---|---|---|---|---|
| `director-pay` | `paying yourself` | `Working out the best way to pay yourself? I can pull up the tool that shows the salary and dividend split.` | `Still weighing salary versus dividends? I can point you to a plain run-through or the planner, your call.` | `A free call with a specialist will confirm the most efficient way to pay yourself, want me to set one up?` |
| `limited-company` | `your company tax` | `Sorting your company tax? I can point you to the right tool in a second.` | `Want a hand getting your limited company tax straight? There is a planner that makes it simple.` | `A free call with a specialist will make sure nothing is slipping through, want me to arrange it?` |
| `sole-trader` | `your sole trader tax` | `Working out your take-home as a sole trader? There is a calculator that does the fiddly part.` | `Want a hand with your sole trader tax? Happy to dig out exactly what you need.` | `A free first call is the quickest way to get your sole trader tax sorted, want me to set one up?` |
| `incorporation` | `going limited` | `Thinking about going limited? I can show you the real numbers before you commit either way.` | `Incorporating suits some businesses and not others. Want me to line up the comparison tool?` | `The limited-company question is a big one to call alone. A free chat will tell you if it stacks up, want me to arrange it?` |
| `vat-mtd` | `your VAT` | `Getting your head round VAT schemes? I can pull up the tool that picks the cheaper one.` | `Not sure which VAT scheme fits? I can run you through the quick comparison.` | `A specialist can confirm the right VAT scheme so there are no surprises, free, shall I arrange it?` |
| `payroll` | `employing staff` | `Working out what a hire really costs? There is a tool that builds the full figure.` | `Want a hand with payroll and the true cost of a hire? Happy to point you to it.` | `A free call will get your payroll and staff costs straight, interested?` |
| `rnd` | `R&D tax relief` | `Wondering if you can claim R&D relief? I can point you to the estimator.` | `Not sure you clear the R&D intensity test? I can run you through the quick checker.` | `A specialist can scope an R&D claim properly, the first call is free, want me to set one up?` |
| `exit-cgt` | `selling your business` | `Planning an exit? There is a tool that shows the CGT and the BADR timing.` | `CGT on a business sale has a few moving parts. Want me to point you to the calculator and guide?` | `Before you put a figure on a sale, a specialist can sanity-check the CGT for you, free. Fancy a quick call?` |
| `compliance` | `your accounts and deadlines` | `Anything I can help you find on your accounts or deadlines? I can point you to a quick answer.` | `Want a hand keeping on top of your filing deadlines? Happy to help.` | `A free first call with a specialist is the quickest way to get your compliance sorted, want me to set one up?` |

Combination + fallback lines (ported): `COMBO_S24_INC` is Property-specific; the generalist analogue is
`COMBO_SOLE_INC` (both `sole-trader` and `incorporation` in the profile) →
`[ "Trying to work out if going limited beats staying a sole trader? That is the real question, and I
can help you start on it.", "Sole trader versus limited company is a close call for a lot of owners.
Want me to line up the comparison?", "This is exactly what a specialist untangles in one free call.
Want me to book it?" ]`. `USED_CALC` (sanity-check-your-numbers, 3 lines) and `GENERIC` (3 lines) ported
verbatim. `frictionOpener()` and `exitOpener(profile)` ported verbatim (they slot `TOPIC_NOUN[t]`).
Drop `bookingConciergeOpener` (no booking path in R3). Keep the flagged, OFF `OPENER_LLM_ENRICHMENT_ENABLED
= false` stub (no LLM in R3).

`variantIndex(pingIndex, stage)`: `evaluating-us` adds +1, `ready` adds +2 (later + warmer visitors get
more direct lines), clamped 0..2. Ported verbatim.

### 3.3 Ping escalation thresholds — PORTED VERBATIM from Property
- `CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000]` (ms of VISIBLE page time: first ping 30s,
  then +40s, +50s, +60s; accrues while reading, pauses when the tab is backgrounded).
- `AUTO_OPEN_DELAY_MS = 600`; auto-present the card ONCE per session (`hd_assistant_autoopened`),
  desktop opens the panel, mobile (`innerWidth < 640`) surfaces the peek instead.
- Exit-intent arming: desktop `10_000` ms then `mouseleave` at `clientY <= 0`; mobile `8_000` ms then a
  leave-style scroll (`maxY > 700 && y < 150 && lastY - y > 4`). One instant tailored ping.
- Friction: on `form_error` (from the bus), instant `frictionOpener()` ping.
- Suppression: stops on engagement (any open/chip click) via `engagedRef`; suppressed entirely for
  `isConverted()` visitors (no cross-session lock, so a non-converter can be helped again next session).
- Every ping fires `personalization_shown` with `{ surface:"assistant_nudge", trigger, variant,
  rule_id:`assistant_<stage>`, topic, stage, signals, content:line.slice(0,120) }`; the peek click fires
  `personalization_clicked`, dismiss fires `personalization_dismissed` (props reused from the last ping).

### 3.4 `hd_assistant_active` exit-intent stand-down wiring
- On mount (when active), the widget sets `window.sessionStorage.setItem("hd_assistant_active", "1")`
  (mirrors Property's `ptp_assistant_active`).
- `ExitIntentModal.tsx` (which already carries the `TODO WS6` at lines 11-13) is updated: inside the arm
  effect, before `setOpen(true)`/`fire()`, bail if
  `window.sessionStorage.getItem("hd_assistant_active") === "1"`. This prevents a double exit surface
  (the assistant's own exit ping supersedes the exit modal), exactly as Property does. This is the ONLY
  change to `ExitIntentModal.tsx` and it is the fix the existing TODO asks for.
- Mount the `SpecialistWidget` in `PageShell.tsx` (next to `ExitIntentModal`, line ~29) OR in the root
  layout inside `IntentProvider`; PageShell is preferred so both exit surfaces sit together and the
  stand-down is obvious. The widget self-gates via `useIntentContext()` (null on /embed, /admin, opt-out).

---

## 4. Golden / QA cases

### 4.1 xlsx generator outputs vs compute-lib figures (per-tool golden test)
Every workbook's default-scenario output cell must equal the TS `compute()` result at the same inputs,
BEFORE the `enabled` flag is flipped. Assert to the penny on the raw numeric, and to `gbp()`/`pct()`
rounding on the displayed cell. Traced from source (`salary-dividend.ts`, `sole-trader.ts`,
`vat-scheme.ts`, `employer-ni.ts`, `rd-credit.ts`, `badr-cgt.ts`; constants from `uk-tax-rates.ts`,
tax year 2026/27). `gbp()` = `£` + `Math.round(n)` with `en-GB` thousands; `pct(n,1)` = one decimal.

| Tool / model | Default inputs | Key intermediates | Headline (gbp) | Golden assertions (raw) |
|---|---|---|---|---|
| director-pay | profit 80000, optimal salary, EA off | salary £12,570; employerNi 1135.50; CT 13818.04; dividend 52476.46; dividendTax 9156.58 | Net cash **£55,890** | netCash 55889.88; totalTax 24110.12 |
| incorporation | profit 80000, EA off | ST: incomeTax 19432, class4 2856.60, net 57711.40; Co net 55889.88 | Cost of incorporating **£1,822** | difference −1821.52 (companyWins=false) |
| vat-scheme | turnover 100000, inputs 2000, goods 500 | standardNet 18000; LCT applies → flat 0.165; flatNet 19800 | Saving with Standard **£1,800** | bestScheme "Standard"; saving 1800; flatKeep 200 |
| employer-cost | 1 emp £30,000, EA on, pension on | employerNi 3750; eaApplied 0 (warn); pension 712.80 | Team cost **£34,463** (£2,872/mo) | totalCost 34462.80; monthly 2871.90; eaEligibleWarning true |
| rd-estimator | total 500000, staff 120000, sub 0, cons 10000, sw 5000 | qualifying 135000; intensity 0.27 (not intensive); RDEC | Net benefit **£20,250** | qualifying 135000; intensity 0.27; grossCredit 27000; netBenefit 20250 |
| badr-exit | proceeds 600000, cost 100000, prev 0, eligible | gain 500000; overflow 0 | CGT 2026/27 **£90,000** | cgt2025 70000; cgt2026 90000; extraTax 20000; net 530000 / 510000 |

**Hardcoded-rate mirrors the builder MUST replicate (else the golden test fails):**
1. CT marginal slice is the hardcoded **0.265**, not the 3/200 fraction.
2. VAT non-LCT flat rate is a hardcoded **0.125** (`FLAT_RATE_MARKETING_AGENCY`); the LCT branch (0.165)
   is taken at the defaults, but the builder's Rates sheet must carry both.
3. R&D: ERIS payable rate is **1.86 × 14.5% = 0.2697**; RDEC net = `20% × 0.75`. Intensity threshold 0.30.
4. `take-home-pay.ts` (used by `sole-trader.ts`) hardcodes its income-tax bands LOCALLY (12570/50270/
   125140, 20/40/45); the incorporation builder must use those, not re-derive from a different constant.

### 4.2 FAQ + opener fact-check list (house-position section references)
Every asserted figure must trace to a LOCKED position. Verify at build:

| Claim in FAQ/opener/gate | House-position § | Must read |
|---|---|---|
| Dividend 10.75% / 35.75% / 39.35%, £500 allowance, from 6 Apr 2026 | §4 | tax-year tagged "from 6 April 2026" |
| Employer NIC 15% above £5,000 secondary threshold from 6 Apr 2025; never 13.8%/£9,100 | §4, §9 | current rate only |
| Employment Allowance £10,500; single-director exclusion | §4, §9 | exclusion stated explicitly |
| Salary £5,000 (secondary) / £12,570 (PA) optimal-salary logic | §4 | both modelled, EA assumption stated |
| VAT registration £90,000; deregistration £88,000; FRS £150,000; LCT 16.5% (goods <2% or <£1,000) | §7 | £90,000 not £85,000 |
| MTD for VAT since April 2022 (all registered); MTD ITSA £50k Apr 2026, £30k Apr 2027 | §7, §9, MTD note | ITSA vs VAT kept separate |
| R&D merged scheme 20%; ERIS 30% intensity; subcontractor 65%; periods from 1 Apr 2024 | §R&D note | 30% (lowered from 40%) |
| BADR 14% to 5 Apr 2026, 18% from 6 Apr 2026; £1m lifetime; overflow 24% | §5 | exact date band each time |
| CGT 18%/24%, AEA £3,000, 60-day residential reporting | §5 | not old 28% |
| CT 9 months + 1 day; SA 31 Jan / POAs 31 Jan + 31 July | §2.B, §3 | |
| Incorporation is a calculation not a default; s.162 defers (not cancels) | §1.A | never "always more efficient" |
| Class 4 NIC 6%/2%; Class 2 removed from 6 Apr 2024 | §2 | do not tell a sole trader to pay Class 2 |

**Opener/gate safety (LOCKED):** no em-dashes; never claim the firm is chartered/qualified/regulated;
faceless (no named expert); no "we noticed you're struggling" surveillance framing (generic-helpful,
references only what the visitor self-evidently did on the page).

### 4.3 Consent + delivery QA
- Resource gate consent text = in-house `resourceConsentText`, NOT Reflex `leadConsentText`. Assert the
  rendered gate string does not contain "Reflex".
- Assert the string "DJH" appears nowhere in the WS5/WS6 surface output.
- With `RESOURCE_EMAIL_DELIVERY_ENABLED = false`: assert the gate copy makes NO email promise, the
  `/api/resources/deliver` call is not fired, and the inline `download` link + guide read link work.
- Widget email_only submit: honeypot `enquiry_ref` non-empty is passed through (stored flagged), never
  silently dropped. Consent line = standard lead consent (server also stamps it).
- Build green: `next build`, `eslint`, `vitest run` all pass; `hasEnabledResource` false for the three
  non-asset topics; belt-and-braces null guard means a disabled/missing file never renders a broken gate.

---

## 5. File manifest (generalist/web only) with build order

### New files
| # | Path | Purpose |
|---|---|---|
| 1 | `content/resources/director-pay.md` … (`incorporation`, `vat-mtd`, `payroll`, `rnd`, `exit-cgt`).md | 6 gated written guides (HTML body + frontmatter), house-position-traced |
| 2 | `scripts/resources/generate-xlsx.ts` | xlsx generator loop (port of Property's, byte-stable ZIP timestamps) |
| 3 | `scripts/resources/builders/index.ts` | `BUILDERS` registry (append-only) |
| 4 | `scripts/resources/builders/{director-pay,incorporation,vat-scheme,payroll,rd-relief,badr-exit}.ts` | 6 xlsx builders, each imports the SAME `uk-tax-rates.ts` constants + mirrors the 4 hardcoded rates |
| 5 | `src/lib/resources/copy.ts` | `gateCopy(topic, pageTitle, override)` (port; string-only) |
| 6 | `src/lib/resources/content.ts` | guide loader (gray-matter + shared `addHeadingIds`; route around missing `@/lib/markdown-utils`) |
| 7 | `src/components/resources/ExcelPreview.tsx` | 6 generalist preview specs, orange tokens |
| 8 | `src/components/resources/ResourceGate.tsx` | email-gated on-page unlock, orange, in-house consent, email path stubbed |
| 9 | `src/components/resources/GateOrForm.tsx` | blog slot: gate when enabled, else `MiniCapture` fallback |
| 10 | `src/components/resources/CalculatorPageResources.tsx` | calc-page island: `PremiumUpgrade` + gate |
| 11 | `src/app/resources/[topic]/page.tsx` | NOINDEX guide route (`generateStaticParams` from `publishedGuideTopics()`) |
| 12 | `src/lib/support/faq.ts` | 10 house-traced Q&As (§2.3) |
| 13 | `src/lib/intent/journeyModel.ts` | trail-based journey model, `hd_journey` key |
| 14 | `src/lib/assistant/opener.ts` | topic nouns/hooks + escalation (§3.2), no LLM, no booking |
| 15 | `src/components/support/SpecialistWidget.tsx` | proactive assistant, orange, email_only capture, `hd_` keys |
| 16 | `src/lib/resources/config.ts` (or add to an existing config) | `RESOURCE_EMAIL_DELIVERY_ENABLED = false` flag |
| 17 | golden tests: `scripts/resources/builders/*.test.ts` (or `src/lib/tools/compute/resources.test.ts`) | xlsx == compute at defaults (§4.1) |

### Modified files
| # | Path | Change |
|---|---|---|
| A | `src/lib/resources/registry.ts` | Replace literal-`null` xlsx/guide types with `XlsxAsset\|null` / `GuideAsset\|null` + `enabled` flags + `magnetTitle`/`magnetBlurbTemplate` + helper fns; populate 6 assets (enabled flipped only after golden test) |
| B | `src/config/site.ts` | Add in-house `resourceConsentText` (`I agree to ${niche.display_name} using my email to send me the resource I requested.`) |
| C | `src/components/blog/BlogPostRenderer.tsx` | Add the `GateOrForm` slot alongside the existing `PremiumUpgrade` injection (mid-split ~line 236 + short-post fallback ~line 242) |
| D | `src/app/calculators/[slug]/page.tsx` + `src/app/calculators/employer-ni-calculator/page.tsx` | Mount `CalculatorPageResources` below `CalculatorClient` |
| E | `src/components/blog/ExitIntentModal.tsx` | Wire the `hd_assistant_active` stand-down guard (resolves the existing `TODO WS6`, lines 11-13) |
| F | `src/components/layout/PageShell.tsx` | Mount `SpecialistWidget` next to `ExitIntentModal` (line ~29) |
| G | `package.json` | Add `"resources:xlsx": "tsx scripts/resources/generate-xlsx.ts"` (or the repo's ts-runner); `exceljs` already present |

### Build order
1. **B, A** — config + registry shapes (unblocks everything; assets stay `enabled:false`).
2. **16** — email-delivery config flag (OFF).
3. **2, 3, 4** — xlsx generator + builders; run `npm run resources:xlsx` to emit files under `public/resources/`.
4. **17** — golden tests; go green.
5. **1, 6, 11** — guides + loader + NOINDEX route.
6. **5, 7, 8, 9, 10** — copy + preview + gate components.
7. **C, D** — inject the gate into blog + calculator surfaces.
8. **Flip `enabled:true`** per asset (A) once its golden test passes (WS5 live).
9. **12** — FAQ.
10. **13, 14** — journey model + opener.
11. **15** — SpecialistWidget.
12. **E, F** — stand-down wiring + mount (WS6 live).
13. Full QA (§4.3): `next build` + `eslint` + `vitest run`; manual click-through desktop + mobile.

---

## 6. Unverifiable facts flagged (for the builder before ship)

- **All six default-input results are hand-traced, not machine-executed.** They follow the source
  branch-for-branch and match the existing golden tests' spot checks, but no existing test pins these
  exact default tuples. The §4.1 golden test IS the required verification; do not flip `enabled` before it passes.
- **`§11 property finance-cost reducer` (`s.272A/s.274A` wording)** carries a `> VERIFY` in the house
  positions (gov.uk page 404'd on 2026-06-12). Not surfaced by any R3 asset, so no blocker, but avoid
  citing the exact ITTOIA section in the R&D/exit guides.
- **Guide loader heading helper:** Property's `content.ts` imports `extractHeadings` from a local
  `@/lib/markdown-utils` that does not exist generalist-side. Confirmed the shared
  `@accounting-network/web-shared/content/markdown-utils` exports `addHeadingIds` (used by `blog.ts`);
  whether it also exports `extractHeadings` was NOT verified — if absent, add a minimal local extractor
  or drop the in-guide TOC.
- **`RESOURCE_EMAIL_DELIVERY_ENABLED` home:** proposed as a new `lib/resources/config.ts` constant. If an
  existing site/env config is the estate convention, place it there instead. Email path stays inert until
  a verified Resend from-domain exists for hollowaydavies.co.uk.
- **Partner posture:** the generalist niche config's `partner` is `Reflex Accounting` (not DJH). The
  standard lead consent (assistant, MiniCapture) references Reflex by design; only the RESOURCE consent is
  scoped in-house. Confirm with the owner that resource downloads staying in-house (not Reflex-shared) is
  the intended posture (it mirrors Property's Annex B.2 and the brief's explicit instruction).
