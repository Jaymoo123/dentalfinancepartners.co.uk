# Solicitors R3 · gated resources (WS5) + SpecialistWidget / proactive assistant (WS6) · build brief

**Site:** Accounts for Lawyers · www.accountsforlawyers.co.uk · accountancy for UK law firms (sole practitioners, general partnerships, LLPs, incorporated firms / ABS; SRA-regulated in England and Wales).
**Programme:** R3 of the estate CRO parity programme. R1 shipped capture + intent + blog-conversion. R2 shipped the premium in-blog calculator fleet + ResultGateModal. R3 adds (WS5) email-gated downloadable resources delivered ON-PAGE and (WS6) the SpecialistWidget / proactive journey-aware assistant. Both mirror Property's shipped frameworks, re-themed to the Solicitors token system.
**Repo:** `C:\Users\user\Documents\Accounting`. Site root: `Solicitors/web/`.
**Author:** Opus architect. **Workers:** Sonnet, following this brief verbatim. Opus writes the resource-guide bodies + FAQ + assistant copy; Sonnet builds the components/config/xlsx builders; the manager does the `src/config/site.ts` edit, the taxonomy `resourceId` wiring, and all gates/deploys.

This brief is the single source of truth for the Sonnet workers. Do NOT invent figures. Every number must trace to an existing Solicitors compute lib (`Solicitors/web/src/lib/tools/compute/*`), a `§N` position in `docs/solicitors/house_positions.md` (HP), or the R2 premium tier (`Solicitors/web/src/lib/tools/premium/*`). Where a number or fact cannot be traced, it is FLAGGED in Section 4/5 and must NOT ship until the orchestrator resolves it.

## Copy discipline (LOCKED, applies to every string authored)

- UK English; **no em-dashes** in any on-page React/copy (use commas, parentheses, full stops, middle dot `·`). Em-dashes ARE permitted inside the generated `.xlsx` workbooks (Property does the same; `ExcelPreview` restates without them) but avoid them anyway where a comma reads as well.
- **No "DJH" anywhere.** DJH is Property's partner and must never appear on the Solicitors site.
- **In-house-only consent for downloads** (see Section 0.C). Resource downloads are a marketing-consent, in-house-only relationship: the consent string must NEVER name a referral partner (not Reflex, not anyone). This is separate from the lead-routing pipeline.
- No pricing, no client names, anonymised social proof only.
- **Compliance-aware tone.** Anything touching client money or the SRA Accounts Rules must be framed as operational / regulatory CONTEXT, never as regulatory-defence, SRA-enforcement or tax advice (HP §5 practical rule). Client money is not the firm's income.
- Gold-standard A* bar: genuinely authoritative, never thin or scammy. The firm is NOT a named qualified expert: no "our chartered / ACA / CTA reviewer" claims anywhere, no named author byline.

---

## 0. Architecture decisions (read first)

### 0.A The Solicitors site differs from Property (same as R2)

Verified: Solicitors has **no radix / recharts / shadcn / lucide / clsx / tailwind-merge**, and its design system is **CSS-variable tokens** (`--primary`, `--accent`, `--ink`, `--ink-soft`, `--muted`, `--surface`, `--surface-elevated`, `--border`), NOT Property's tailwind `emerald`/`slate` utility classes. Every WS5/WS6 component we port must be re-themed to these tokens and add **no new npm dependency** except `exceljs` (build-time only, see 0.D). `MiniCapture`, `CalcResultCta`, and the R2 premium renderer already use these tokens · copy their styling idiom.

The R2 premium tier already created `Solicitors/web/src/lib/tools/premium/resources.ts` (the topic→premium-**tool** spine, `resourceForTopic()` keyed by `TopicKey`). **Do NOT collide with it.** WS5's download registry is a SEPARATE module `Solicitors/web/src/lib/resources/registry.ts` (mirroring Property's `lib/resources/registry.ts` vs `lib/calculators/premium/registry.ts` split). Property keeps these two registries apart on purpose; so do we. The WS5 module is the download spine (xlsx + guide + gate copy); the premium module stays the interactive-tool spine.

### 0.B On-page delivery only (email path stubbed)

Property's `ResourceGate` reveals the download links inline AND best-effort-fires `/api/resources/deliver` (a Resend email of the links). **Solicitors has no verified Resend from-domain**, so R3 ships **on-page delivery only**:

- Build the `ResourceGate` so the inline reveal is the ENTIRE delivery mechanism (identical to Property, where inline reveal is already primary and email is additive).
- **Do NOT call `/api/resources/deliver`.** Either omit the `fetch(...)` block entirely, or gate it behind a `RESOURCE_EMAIL_ENABLED` constant defaulting `false` in `lib/resources/registry.ts` so re-enabling it later (once a from-domain exists) is a one-line flip. Preferred: build the route as a graceful no-op stub (returns `{ ok: true, delivered: false, reason: "email-not-configured" }`) so the client contract is stable, but do NOT wire the client `fetch` to it in R3. The success-state copy must therefore NOT promise an email (see Section 1.C copy).
- Success copy says the download is ready on this page; it does NOT say "we've emailed you the links" (that Property line must be changed).

### 0.C Consent wording (in-house-only, never partner-shared)

Solicitors `siteConfig.leadConsentText` is partner-driven (currently names Reflex Accounting, because leads route owner-inbox + Reflex CC per the CRO programme). **Resource downloads must NOT use that string.** Property solves this with a SECOND string `resourceConsentText` in `src/config/site.ts`:

```
const resourceConsentText = `I agree to ${niche.display_name} using my email to send me the resource I requested.`;
```

This wording names only the firm (Accounts for Lawyers), never a partner, and is a marketing/legitimate-marketing consent for a one-off resource send. **MANAGER TASK:** add `resourceConsentText` to `Solicitors/web/src/config/site.ts` (exactly Property's derivation, using `niche.display_name`) and export it on `siteConfig`. The gate appends `" See our Privacy Policy."` + a `/privacy-policy` link, and keeps an explicit tick-to-consent checkbox (never a notice-only pattern). This satisfies the R3 "in-house-only, never partner-shared" constraint even though the site has a Reflex lead partner: a download is not an enquiry handoff.

### 0.D xlsx generator (build-time only, adds `exceljs`)

Mirror Property's `scripts/resources/generate-xlsx.ts` + `scripts/resources/builders/*`. Adds `exceljs` as a **devDependency** and a `"resources:xlsx": "tsx scripts/resources/generate-xlsx.ts"` script (Solicitors has `tsx`? verify; if not, add `tsx` devDep or run via the existing test runner's node). The generator is NOT part of `next build`; run manually. Generated `.xlsx` files are COMMITTED and byte-stable (Property's `normalizeZipTimestamps` + fixed `wb.created/modified` = 2024-01-01). Each builder imports the SAME locked constants the Solicitors compute libs use, so the spreadsheet rates and the on-site math derive from one source and cannot drift. A golden check (Section 4) asserts `TS compute === xlsx formula result` for a sample input BEFORE a category's `enabled` flag is flipped. Set `wb.creator = wb.lastModifiedBy = "Accounts for Lawyers"` (own brand, never a partner name).

### 0.E Feature-flag gate (nothing renders until authored)

Every asset carries `enabled: boolean`. The registry is total over the 7 Solicitors `TopicKey`s. When a topic has no enabled+present asset, the gate renders NOTHING and the page is unchanged. Onboarding a category = author the asset, drop the file in `public/resources/<topic>/`, flip the single `enabled` flag (+ set the taxonomy `resourceId`, Section 3.D).

---

## 1. Resource set (WS5) · 4 gated assets for the top topics

Each resource is a per-category pair: a **working Excel model** (live formulas, traced to a golden-tested compute lib) + a **written guide** (a noindex web page at `/resources/<topic>`, body raw HTML, loaded by `lib/resources/content.ts`). Both are gated by one email capture (`ResourceGate`), revealed inline on success. The 4 chosen topics are the same four highest-value clusters R2's premium fleet serves, so each resource sits alongside a premium tool and a blog cluster (compounding conversion surface).

Evaluation of the candidates named in scope:

| Candidate | Topic | Lib trace | Verdict |
|---|---|---|---|
| SRA client-account reconciliation / reserve model | `sra-compliance` | `calcSraReserve` (+ HP §5/§5.G) | **SHIP (R-1)** · largest blog cluster (4 category slugs); the flagship compliance asset |
| Partner profit + tax planner workbook | `partnership-llp` | `calcLLPProfitShare` + `calcSolicitorTakeHome` | **SHIP (R-2)** · biggest tax topic; "allocate then tax each partner" |
| Practice sale readiness + valuation / net-of-CGT workbook | `succession-sale` | `calcLawFirmValuation` + `calcPracticeSaleCgt` | **SHIP (R-3)** · high-intent seller topic; valuation range + BADR/CGT net proceeds |
| Sole-practitioner take-home + structure workbook | `sole-practitioner` | `calcSolicitorTakeHome` | **SHIP (R-4)** · direct, high-traffic; sole/partner vs Ltd |
| Lock-up / cash-flow guide | `practice-finance` | none (no compute lib; only `indemnity-premium`) | **HOLD** · guide-only candidate; deferred to keep R3 model-backed and golden-tested. May ship as a GUIDE-ONLY asset in a later wave (WIP-days + debtor-days narrative, HP §4), no xlsx |

**Result: 4 gated resource pairs**, one per premium-tool topic. `practice-finance`, `vat` and `incorporation` carry NO enabled asset in R3 (`incorporation` is served indirectly by the sole-practitioner workbook's Ltd scenario; `vat` stays a specialist-contact topic). The registry still lists all 7 topics with flags off for the unbuilt ones.

### 1.A The four resources (registry entries)

Registry file `Solicitors/web/src/lib/resources/registry.ts`. Shape ported verbatim from Property: `XlsxAsset { file, label, enabled }`, `GuideAsset { slug, label, enabled }`, `CategoryResource { topic, toolId, xlsx, guide, magnetTitle, magnetBlurbTemplate }`, `RESOURCES: Record<TopicKey, CategoryResource>`, plus `resourceForTopic`, `isXlsxEnabled`, `isGuideEnabled`, `hasEnabledResource`, `enabledResourceTopics`, `enabledGuideTopics`. `toolId` reuses the R2 premium tool id for the topic so the two registries agree.

Conventions: `xlsx.file = /resources/<topic>/<topic>-model.xlsx`; `guide.slug = <topic>`.

**R-1 · SRA client account reserve and reconciliation model** (`topic: "sra-compliance"`, `toolId: "sra-client-account-premium"`)
- `xlsx`: `/resources/sra-compliance/sra-compliance-model.xlsx` · label "SRA client account model (Excel)"
- `guide`: slug `sra-compliance` · label "SRA client account guide"
- `magnetTitle`: "The SRA client account toolkit"
- `magnetBlurbTemplate`: "A working reconciliation and reserve model with live formulas, plus a plain-English guide to the SRA Accounts Rules. Enter your email and we will send you both." (NOTE the on-page delivery copy caveat, 0.B: the SUCCESS state must not claim an email was sent; the magnet blurb can still say "we will send you both" because the download IS sending it to them on the page. Prefer "Enter your email to unlock both" to avoid implying an email.)
- Workbook: a five-weekly-reconciliation worksheet (Rule 8.3) + a reserve-sizing sheet fed by `calcSraReserve`, + a Rule 12.2 exemption checker. See Section 1.B for the sheet spec. Framed operational, NOT regulatory.

**R-2 · LLP profit share and partner tax planner** (`topic: "partnership-llp"`, `toolId: "llp-profit-tax-premium"`)
- `xlsx`: `/resources/partnership-llp/partnership-llp-model.xlsx` · label "Partner profit and tax model (Excel)"
- `guide`: slug `partnership-llp` · label "Partner profit and tax guide"
- `magnetTitle`: "The partner profit and tax toolkit"
- `magnetBlurbTemplate`: "A working Excel model that splits distributable profit across the partners and shows what each keeps after income tax and Class 4 National Insurance, plus a plain-English guide. Enter your email to unlock both."

**R-3 · Practice sale readiness and net-proceeds workbook** (`topic: "succession-sale"`, `toolId: "practice-sale-premium"`)
- `xlsx`: `/resources/succession-sale/succession-sale-model.xlsx` · label "Practice sale model (Excel)"
- `guide`: slug `succession-sale` · label "Practice sale readiness guide"
- `magnetTitle`: "The practice sale toolkit"
- `magnetBlurbTemplate`: "A working valuation and net-of-tax model (goodwill range, WIP, and what you keep after Capital Gains Tax and Business Asset Disposal Relief), plus a sale-readiness guide. Enter your email to unlock both."

**R-4 · Solicitor take-home and structure workbook** (`topic: "sole-practitioner"`, `toolId: "sole-practitioner-premium"`)
- `xlsx`: `/resources/sole-practitioner/sole-practitioner-model.xlsx` · label "Take-home and structure model (Excel)"
- `guide`: slug `sole-practitioner` · label "Take-home and structure guide"
- `magnetTitle`: "The solicitor take-home toolkit"
- `magnetBlurbTemplate`: "A working Excel model comparing your take-home as a sole practitioner or partner versus through a limited company, after income tax, National Insurance, corporation tax and dividend tax, plus a guide. Enter your email to unlock both."

The remaining three topics are registered with `xlsx: null, guide: null` (or `enabled: false` placeholders): `practice-finance`, `vat`, `incorporation`. `hasEnabledResource` returns false for them so their pages are untouched.

### 1.B xlsx builder specs (live formulas, traced to libs)

One builder per topic in `scripts/resources/builders/<topic>.ts`, each exporting `build(): ExcelJS.Workbook`. Standard sheet order `["Start here", "Your figures", "Rates", "Notes"]` (+ hidden `Lookups` where a dropdown maps to a rate). The **Rates sheet imports the same locked constants** as the compute lib and gives each a defined name; the **Your figures** sheet has blue unlocked input cells (fill `FFDBEAFE`, `protection: { locked: false }`) and computes outputs as live cell formulas referencing the named rate cells (no hard-coded results). Rates sheet is `protect()`ed. Theme accent: use the Solicitors brand colour hex (resolve the `--primary` token to an argb; if unknown, use a professional navy/blue rather than Property's emerald · CONFIRM the brand hex with the orchestrator, flag A1).

- **R-1 SRA model** · import `VOLUME_AVERAGE_BALANCE`, `MATTER_RISK_FACTOR` and the reserve multipliers (0.7 / 1.5) from `compute/sra-client-account-reserve.ts`. Sheets:
  - "Reconciliation": a five-weekly (Rule 8.3) three-way reconciliation template (client ledger total = cash book = bank statement), with a difference cell that must be £0 and a COFA/manager sign-off row. This is an operational template, no rates.
  - "Reserve sizing": blue inputs `openMatters`, `volume` (dropdown Low/Moderate/High/Very high), `matterType` (dropdown), computing `peakClientMoney = openMatters * VOLUME_AVERAGE_BALANCE[volume]`, `suggestedReserve = peak * MATTER_RISK_FACTOR[matterType]`, low `= *0.7`, high `= *1.5`. Mirrors `calcSraReserve`.
  - "Rule 12.2 check": blue inputs `averageBalance`, `maximumBalance`; a verdict cell `=IF(AND(avg<=10000,max<=250000),"Likely within the Rule 12.2 exemption","Report likely required")`. **NEVER a £250 figure. Use 10000 and 250000 (HP §5.G).** Add a note cell that Rule 12.1 (held ANY client money in the period) is the report TRIGGER and is distinct from the Rule 12.2 exemption.
  - "Notes": operational-not-regulatory disclaimer (HP §5): the SRA Accounts Rules do NOT mandate a firm-side reserve; this sizes an operational buffer; client money is not the firm's income; the Rule 3.3 banking-facility prohibition and the Rule 8.3 five-weekly reconciliation are the real controls; reserve and reporting decisions belong to the firm's COFA and its accountant.
- **R-2 partner model** · import the take-home rate constants from `compute/solicitor-take-home.ts` (income bands, Class 4 6%/2%, dividend 10.75/35.75/39.35 for the Ltd context). Sheets: an allocation sheet (Equal / Two-tier senior ×1.5 / Points / Fixed-share, mirroring `calcLLPProfitShare`) and a per-partner tax sheet applying `calcSolicitorTakeHome`'s partnership charge (income tax + Class 4 NIC) to each partner's share. Note: taxed on your SHARE not your drawings (HP §2); LLP pays no corporation tax on trading profit; excludes capital interest, pension relief, salaried-member re-classification. Date every output "2026/27 basis" (the take-home lib is already 2026/27, F1 from R2 is resolved · see Section 5 flag F1-status).
- **R-3 practice-sale model** · import valuation multiples from `compute/law-firm-valuation.ts` and the CGT/BADR constants from `compute/practice-sale-cgt.ts` (`DEFAULT_AEA 3000`, `DEFAULT_BADR_LIFETIME 1_000_000`, `BADR_RATE_FROM_6APR2026 0.18`, `CGT_BASIC_RATE 0.18`, `CGT_HIGHER_RATE 0.24`). Sheets: a valuation sheet (goodwill low/high, total low/high) and a net-of-tax sheet (chargeable gain, less £3,000 AEA, BADR 18% within the £1,000,000 lifetime limit, standard 18%/24% above). Note: WIP realised on sale is an INCOME receipt (ITTOIA 2005 ss.182-185), separate from the capital goodwill gain; a partnership/LLP can only do an asset sale (no shares); BADR needs the 2-year conditions and a caught salaried member may not qualify; multiples are indicative market ranges, not a formal valuation.
- **R-4 take-home model** · import from `compute/solicitor-take-home.ts`. Sheets: blue inputs `profit`, `pensionContrib`; a three-column comparison (sole trader / partner · limited company) matching `calcSolicitorTakeHome`. Note: the Ltd figure assumes minimum director salary £12,570 + dividends, £2,500 admin, no Employment Allowance; an SRA-regulated firm cannot incorporate freely (recognised body or ABS, HP §1); 2026/27 basis; the company's money is not your money (dividends taxed again on extraction, already in the figure).

### 1.C ResourceGate component (the capture, on-page delivery)

Port Property's `src/components/resources/ResourceGate.tsx` to `Solicitors/web/src/components/resources/ResourceGate.tsx`, re-themed to tokens, with these Solicitors adaptations:

- Props identical: `{ topic: TopicKey; copy: GateCopy; split?: boolean; placement?: string; category?: string }`.
- Capture = email-only + consent checkbox. Honeypot field name **`enquiry_ref`** (never `company_url`), value-free, do NOT early-return silently on a filled honeypot when using the shared chokepoint · but Property's ResourceGate DOES early-return on honeypot because it posts via the anon `submitLead`. For Solicitors, **route through the shared submit-client** (`submitSolicitorLead` from `@/lib/leads/submit-client`, the same path `MiniCapture` uses) so the server chokepoint stores a honeypot hit flagged and returns success (never silently drops a real human caught by autofill). Pass the honeypot value to `submitSolicitorLead(payload, honeypot)` like `MiniCapture` does; do NOT `return` on a filled honeypot.
- Payload: `full_name: ""`, `phone: ""`, `role: "resource"`, `message: "[Resource: <topic>] <magnetTitle>"`, `source: niche.content_strategy.source_identifier` (= `"solicitors"`), `consent_given`, `consent_text = ${siteConfig.resourceConsentText} See our Privacy Policy.`, `consent_at`, `visitor_id`, `session_id`, `source_url`.
- Events (both allowlisted in `packages/web-shared/analytics/types.ts`): `track("gate_view", { topic, placement, category? })` once on scroll-into-view via `useInViewOnce`; `track("resource_unlocked", { topic, placement, category? })` on success. `useFormTracking("resource_gate")` for field focus/blur; `ft.onLead({ source, role: "resource" })` on success; `ft.onError("form","server")` on failure. GA `generate_lead` gtag event optional (keep Property's, event_label `${niche.niche_id}_resource_${topic}`). **Do NOT introduce any new event name.**
- **On-page delivery only** (0.B): on success reveal the inline download links (xlsx `<a href download>` + guide `<a href="/resources/<slug>">`). **Do NOT `fetch("/api/resources/deliver")`.** Change the success copy from Property's "we've emailed you a copy of the links" to: "You are in. Your downloads are ready below." Submit button label "Unlock the downloads" / loading "Unlocking...". Helper line: "Instant access on this page. We will only use your email to send you the odd genuinely useful update, and you can opt out any time." (No spam claim, in-house-only.)
- Belt-and-braces: `if (!hasEnabledResource(topic)) return null;`. Left column renders `<ExcelPreview topic={topic} />` (Section 1.E). Styling: token-based card (`border-[var(--border)]`, `bg-[var(--surface)]`, accent bar `bg-[var(--primary)]`), `@container` split via `split` prop.

### 1.D copy.ts + content.ts

- `Solicitors/web/src/lib/resources/copy.ts` · port Property verbatim: `GateCopy`, `GateCopyOverride`, `gateCopy(topic, pageTitle?, override?)`. Pulls `getTopic(topic)?.label` and `resourceForTopic(topic)?.magnetTitle/magnetBlurbTemplate`. String-only, client-safe. Change the fallback magnetTitle from Property's "Free landlord toolkit" to "Free law-firm toolkit".
- `Solicitors/web/src/lib/resources/content.ts` · port Property's SERVER-ONLY guide loader: `guidesDirectory = content/resources`, `getGuideByTopic(topic): Guide | null`, `publishedGuideTopics(): TopicKey[]`. Uses gray-matter + the Solicitors `markdown-utils` (`addHeadingIds`, `extractHeadings`). Guide bodies are raw HTML (blog convention). Frontmatter `{ topic, title, summary?, version?, lastReviewed? }`. Guides are **noindex** (add `robots: { index: false }` on the route + `<meta name="robots" content="noindex">`). One `content/resources/<topic>.md` per shipped guide (4 files). Author each guide to the A* bar, compliance-aware, HP-traced; the SRA guide must carry the exact Rule 12.2 test (average £10,000 / maximum £250,000, never £250) and the Rule 12.1-vs-12.2 distinction.

### 1.E ExcelPreview + CalculatorPageResources + blog injection

- `Solicitors/web/src/components/resources/ExcelPreview.tsx` · port Property's faux-grid preview (no hooks, safe anywhere), re-themed to tokens. Author one `PreviewSpec` per shipped topic (`sra-compliance`, `partnership-llp`, `succession-sale`, `sole-practitioner`) with default-scenario numbers taken from each lib's `compute()` for the workbook's default blue-cell inputs (so preview and file agree). Restate any workbook em-dashes without them.
- `Solicitors/web/src/components/resources/CalculatorPageResources.tsx` · port Property's island. Resolves topic from the calculator SLUG (`topicForCalcSlug`), renders the R2 `PremiumUpgrade` (if a premium config exists) + the resource block (if a category asset is enabled) below the existing calculator. **Solicitors uses a dynamic `/calculators/[slug]/page.tsx` route** (Property has per-slug static pages), so wire `<CalculatorPageResources slug={slug} pageTitle={...} />` once inside the `[slug]` page after the calculator, NOT per static page. Renders nothing when neither exists.
- **Resource gate vs GateOrForm decision:** Property's SHIPPED default swaps the email gate for `GateOrForm` (a `MiniCapture` "free review", because the email gate got 50 views / 0 unlocks). For Solicitors R3 the DELIVERABLE is the downloadable resource, so we ship the true `ResourceGate` (inline reveal of the xlsx + guide), NOT `GateOrForm`. Keep `GateOrForm` unported for now (it is a fallback we can swap to later if Solicitors sees the same 0-unlock pattern). Wire `CalculatorPageResources` to render `ResourceGate`.
- **Blog injection:** the resource gate is injected in the blog article via the R2 `BlogPostRenderer` change. Add `<ResourceGate topic={topicForBlogSlug(categorySlug)} copy={gateCopy(topic)} placement="blog" category={categorySlug} />` at a LATE split (after the premium island and the mid-scroll `InlineMiniLeadForm`, so the free tool leads and the download offer lands lower). `ResourceGate` returns null when the topic has no enabled asset, so non-mapped categories are unchanged and no per-post frontmatter is needed. Reserve min-height to avoid CLS.

---

## 2. SpecialistWidget FAQ set (WS6)

Port Property's `src/lib/support/faq.ts` to `Solicitors/web/src/lib/support/faq.ts`: `type Faq = { q; a }`, `const GENERIC: Faq[]`, `const BY_TOPIC: Partial<Record<TopicKey, Faq[]>>`, `faqForTopic(topic): Faq[]`. Keyed by the Solicitors `TopicKey`. Every answer is general + accurate (no personal calculations), compliance-aware, HP-traced, and ends by routing to "ask a specialist for your firm's numbers". No em-dashes, no partner mention, no chartered/qualified claim.

### 2.A GENERIC (3, shown when no topic)

1. **Q** "How quickly will a specialist reply?" · **A** "Within one working day, and usually sooner. Leave your email and a one-line question and a specialist solicitors' accountant will come back to you personally."
2. **Q** "Is the first conversation free?" · **A** "Yes. The first call to understand your firm and point you in the right direction is free and with no obligation."
3. **Q** "What should I have ready?" · **A** "Roughly: your firm's structure (sole practitioner, partnership, LLP or incorporated), whether you hold client money, your approximate fee income, and your year end. If you are not sure, we will guide you."

### 2.B BY_TOPIC (SRA / client-account prominent, house-positions-traced)

**`sra-compliance`** (client-account questions front and centre):
1. **Q** "When does my firm need an accountant's report?" · **A** "If you held or received any client money during the accounting period, the Rule 12.1 trigger applies and you must obtain an accountant's report within six months of the period end. A firm that holds no client money at all does not meet the trigger. This is separate from the small-balance exemption below." (HP §5, §5.G)
2. **Q** "Is my firm exempt from the accountant's report?" · **A** "There is a Rule 12.2 exemption for a firm that did hold client money but only small balances: where the client-account balance did not exceed an average of £10,000 AND a maximum of £250,000 in the period. Both limbs must be met. It is not any £250 figure. We can help you check where you fall." (HP §5.G · NEVER write £250)
3. **Q** "How often must I reconcile the client account?" · **A** "At least every five weeks (Rule 8.3), reconciling the client ledger total to the cash book to the bank statement, signed off by the COFA or a manager. Records are kept for at least six years." (HP §5)
4. **Q** "Can I use the client account to move money for a client?" · **A** "No. Rule 3.3 prohibits using a client account to provide banking facilities: every payment in, transfer or withdrawal must relate to the delivery of regulated services. This is one of the most common breaches. We can help you set up compliant processes, though enforcement questions are for your COFA and the SRA." (HP §5)
5. **Q** "Do I have to pay clients interest on money I hold?" · **A** "Rule 7 requires you to account for a fair sum of interest on client money held, judged by amount and duration, unless there is a contrary written agreement. It is a fairness test, not a fixed rate." (HP §5)

**`sole-practitioner`**:
6. **Q** "How am I taxed as a sole practitioner or partner?" · **A** "On your profit share, not your drawings: income tax at 20 / 40 / 45 percent bands plus Class 4 National Insurance at 6 percent between £12,570 and £50,270 and 2 percent above (2025/26 basis). Class 2 was removed from April 2024. Our take-home calculator gives you a first view." (HP §3)
7. **Q** "Should I incorporate my practice?" · **A** "Sometimes, but not automatically. A company pays corporation tax and you extract profit as salary and dividends taxed again, and from April 2026 dividend tax rose to 10.75 / 35.75 / 39.35 percent, which narrows the gap. An SRA-regulated firm also cannot incorporate freely: it must be a recognised body or a licensed ABS. It is very firm-specific." (HP §1, §3)

**`partnership-llp`**:
8. **Q** "Are partners taxed on drawings or profit share?" · **A** "On your allocated profit share, whether or not you have drawn it. Drawings are advances against that share. An LLP is tax-transparent and pays no corporation tax on its trading profit; each member is taxed as a self-employed partner." (HP §2)
9. **Q** "Could I be caught by the salaried member rules?" · **A** "Possibly. Under the FA 2014 rules a member is treated as an employee for tax if all three conditions are met: at least 80 percent of reward is disguised salary, no significant influence, and a capital contribution below 25 percent of that reward. Failing any one keeps you self-employed. Our FA 2014 test tool walks through it." (HP §2.A)

**`succession-sale`**:
10. **Q** "How is the sale of my firm taxed?" · **A** "A partnership or LLP has no shares, so it is sold as a business: goodwill is a capital asset taxed to Capital Gains Tax, while work in progress and debtors are trading income taxed at income-tax rates. Business Asset Disposal Relief can reduce the CGT on qualifying gains to 18 percent from April 2026, within a £1,000,000 lifetime limit; gains above that or outside the relief are taxed at 18 / 24 percent after the £3,000 annual exempt amount." (HP §9)
11. **Q** "Do I pay tax on my work in progress when I sell?" · **A** "Yes, separately from the goodwill gain. Unbilled work in progress realised on a sale is an income receipt (ITTOIA 2005 ss.182 to 185), not part of the capital gain, so a sale usually mixes income tax and CGT. The sale agreement should split goodwill from WIP and debtors clearly." (HP §4, §9)

**`practice-finance`**:
12. **Q** "How do I improve my firm's cash flow?" · **A** "The core lever is lock-up: the days your money sits as unbilled work in progress plus debtor days. Billing sooner and collecting faster releases cash without new work. We can review your lock-up and the working-capital picture with you." (HP §4)

**`vat`** and **`incorporation`** fall through to GENERIC (no dedicated FAQ block in R3; add later if traffic warrants). `faqForTopic` returns `GENERIC` for any topic without a `BY_TOPIC` entry, exactly like Property.

### 2.C Widget capture = email_only via the chokepoint

Port Property's `SpecialistWidget.tsx` capture path, re-themed to tokens (see Section 3.C for the whole component). The composer collects **email + message only**, submitted via `submitSolicitorLead(payload, honeypot)` with `captureMode: "email_only"` and `extras: { capture_channel: "assistant", trigger }`. Honeypot `enquiry_ref` (value-free diagnostic, `ft.onError("enquiry_ref","honeypot")`, no early return). `source = "solicitors"`, `role: "Other"`, `message: "[Specialist question (<topic>)] <question>"`, `consent_given: true`, `consent_text = ${siteConfig.leadConsentText} See our Privacy Policy.` (the widget IS an enquiry, so it uses the LEAD consent text · this is the one place the partner-aware `leadConsentText` is correct, because the enquiry does route through the lead pipeline). Success copy: "Thanks, a specialist has your message and will be in touch by email. Please keep an eye on your inbox, including spam or junk, so our reply is not missed." Fires `support_opened` (allowlisted) on open; `personalization_shown/clicked/dismissed` on the peek; `cta_click` on chips.

---

## 3. Assistant Phase-0 (deterministic) · topic nouns / hooks, thresholds, stand-down

Build the Solicitors journey model + opener + widget as a 1:1 deterministic port of Property's `lib/intent/journeyModel.ts` + `lib/assistant/opener.ts` + `SpecialistWidget.tsx`, keyed to the Solicitors 7-topic taxonomy. **No LLM** (Phase 5 enrichment stays flagged off, `OPENER_LLM_ENRICHMENT_ENABLED = false`). Pure pattern-rules over the events autoCapture already emits.

### 3.A journeyModel.ts (port)

`Solicitors/web/src/lib/intent/journeyModel.ts`. Copy Property's structure exactly: `PageNode`, `Trail`, `JourneyStage = "researching" | "comparing" | "evaluating-us" | "ready"`, `JourneyProfile { primaryTopic, secondaryTopic, stage, depth, signals, pageCount }`, `initJourneyModel()`, `recordPath()`, `getJourneyProfile()`, `profileKey()`, `_resetJourneyModel()`. Two site-specific changes:

- **Storage key** = `"afl_journey"` (frozen Solicitors prefix `afl`, matching the embed message type `afl-embed-height` and storagePrefix `afl`). NOT `ptp_journey`.
- **Topic derivation** = the Solicitors `deriveTopic(path)` (already exists; maps `/blog/<category>`, `/blog/<category>/<slug>`, `/calculators/<slug>`; returns null for home/`/about`/`/services`/`/contact`). The special-page flags (`visitedAbout`/`visitedServices`/`visitedContact`) use the same `/about`, `/services`, `/contact` path prefixes · CONFIRM these routes exist on Solicitors (flag B1); if `/services` does not exist, drop that flag rather than track a 404 path. Keep the same weighting (sections ×2 + scroll/25 + computed ×4 + 1), the same signal set, and the same stage ladder verbatim.

### 3.B opener.ts · topic nouns + hooks per topic × stage (verbatim Property thresholds)

`Solicitors/web/src/lib/assistant/opener.ts`. Port every function (`openerFor`, `bookingConciergeOpener`, `frictionOpener`, `exitOpener`, `enrichOpener`, `variantIndex`, `topicGeneric`), keeping the `variantIndex` stage-bump logic verbatim (`evaluating-us` +1, `ready` +2, clamp 0..2). Replace the topic tables with Solicitors content. Voice rules identical: one sentence, no em-dashes, no figures, no tax/regulatory advice, never claim chartered/qualified; the opener's only job is to earn the click.

**`TOPIC_NOUN: Record<TopicKey, string>`** (short noun to slot into generic copy):
- `sra-compliance` → "your client account"
- `sole-practitioner` → "your take-home"
- `partnership-llp` → "your profit share"
- `succession-sale` → "selling your firm"
- `practice-finance` → "your firm's cash flow"
- `vat` → "your VAT position"
- `incorporation` → "going limited"

**`TOPIC_HOOKS: Partial<Record<TopicKey, [string, string, string]>>`** (three escalating lines · [curious, helpful, direct] · index picked by ping number + stage). Author for the four traffic-carrying topics; the rest fall back to `topicGeneric`:

- `sra-compliance`:
  1. "Getting the client account right is where firms trip up. Want me to point you to the reserve and reconciliation tool?"
  2. "Still weighing up the SRA Accounts Rules? I can point you to a plain-English run-through or the client account tool, your call."
  3. "The client account is worth a second pair of eyes. A specialist will talk it through with you, free and no pressure, shall I set that up?"
- `sole-practitioner`:
  1. "Working out what you actually keep from the practice? There is a calculator that does the fiddly part for you."
  2. "Want a hand comparing sole practitioner, partner and limited company take-home? Happy to pull up the tool."
  3. "A free call with a specialist will confirm the most tax-efficient way to draw your profit, want me to arrange it?"
- `partnership-llp`:
  1. "Splitting profit across the partners? There is a tool that allocates it and shows what each keeps after tax."
  2. "Want me to line up the LLP profit share and partner tax calculator for you?"
  3. "A specialist can sanity-check your partner allocation and the tax on it, free first call, shall I set one up?"
- `succession-sale`:
  1. "Thinking about selling or succession? I can show you an indicative value and what you would keep after tax."
  2. "Want me to pull up the practice sale value and net-proceeds calculator?"
  3. "A specialist can talk through the sale, the CGT and Business Asset Disposal Relief with you, free, want me to arrange it?"

**`GENERIC: [string, string, string]`**:
1. "Anything I can help you find? I can point you to the right calculator or a quick answer."
2. "Want a hand with anything? Happy to dig out the right tool for your firm."
3. "If you would rather just ask a person, a free first call with a specialist is the quickest way, want me to set one up?"

**Combination + calculator openers** (port the shape; retune to Solicitors):
- `COMBO` (analogue of Property's Section-24-vs-incorporation): pair `sole-practitioner` + `incorporation` (the "should I go limited?" question). Lines: (1) "Trying to work out if going limited beats staying a sole practitioner? That is the real question, and I can help you start on it." (2) "Sole practitioner versus a limited company is a close call for a lot of solicitors. Want me to line up the take-home comparison?" (3) "This is exactly the sort of thing a specialist untangles in one free call. Want me to book it?" Implement via a `bothTopics(profile, "sole-practitioner", "incorporation")` check, mirroring Property's `COMBO_S24_INC`.
- `USED_CALC` (fires when `signals.includes("used-calculator")`): (1) "Got your numbers? It is worth having a specialist sanity-check them for your firm, free." (2) "Those figures are a solid start. Want one of our specialists to confirm them on a quick call?" (3) "Shall I set up a free call to walk through what the calculator gave you?"
- `frictionOpener()`: "Looks like that form is being fiddly. Tell me what you need right here and I will make sure it reaches us."
- `exitOpener(profile)`: friction branch = "Looks like the form played up. Before you go, tell me what you needed and I will sort it." · topic branch = "Before you dash off, want a quick, no-pressure way to get " + TOPIC_NOUN[t] + " sorted? I can point you to it." · fallback = "Before you go, can I point you to something useful? Even just the right calculator to take with you."
- `bookingConciergeOpener()`: "Your specialist call is ready to book. Want to pick a time? It takes about 20 seconds." (Only reachable if Solicitors has a booking-nudge capability · Property's `getBookingNudge()`. If Solicitors has no booking flow, the concierge branch is dead code · keep it for parity but it never fires; flag C1.)

`openerFor(profile, pingIndex)` dispatch order verbatim from Property: friction → COMBO → used-calculator → topic hook → topic generic → GENERIC.

### 3.C SpecialistWidget.tsx (port, tokens, thresholds verbatim)

`Solicitors/web/src/components/support/SpecialistWidget.tsx`. Port Property's component 1:1, re-themed to tokens. **Property thresholds VERBATIM:**

- `CADENCE_THRESHOLDS_MS = [30_000, 70_000, 120_000, 180_000]` (visible-tab time; first ping 30s, then +40s, +50s, +60s).
- `AUTO_OPEN_KEY = "afl_assistant_autoopened"` (afl prefix), `AUTO_OPEN_DELAY_MS = 600`.
- Exit-intent arm delay: desktop 10_000 ms, mobile 8_000 ms; desktop `mouseleave` at `clientY <= 0`; mobile scroll-up-after-700px heuristic. Verbatim.
- Auto-open once per session (prod), always in dev; mobile announces via peek, desktop opens the card.
- Suppression: `isConverted()` suppresses the proactive layer (booking-concierge exception if a live booking nudge exists · dead unless C1). Engagement (`engagedRef`) stops the session's cadence. Re-tailors each ping via `getJourneyProfile()`, never repeats a line verbatim.
- Events verbatim: `personalization_shown` on each ping (props `surface: "assistant_nudge"`, `trigger`, `variant`, `rule_id: "assistant_<stage>"`, `topic`, `stage`, `signals`, `content` sliced 120), `personalization_clicked/dismissed`, `support_opened` on open, `cta_click` on chips (`cta_id: "assistant_<goal>"`, `placement: "assistant_card"`). All allowlisted.
- Header brand text: "Accounts for Lawyers" + subline "Specialist replies within one working day". Icon/chip labels: "See your numbers" (links to the journey topic's `primaryCalculator`), "Book a free call" (→ `/contact`, since Solicitors has no `/book` unless C1 resolves), "Ask a specialist" (reveals composer).
- `ctx` from `useIntentContext()`; no-op in `/embed`, `/admin`, or when opted out (same guard as Property). Reads the Solicitors `getTopic` from `@/lib/intent/taxonomy`, `topicForBlogSlug`/`topicForCalcSlug` as needed.

### 3.D Stand-down wiring (`afl_assistant_active`)

- In the `SpecialistWidget` init effect, set `window.sessionStorage.setItem("afl_assistant_active", "1")` when the widget is active (mirrors Property's `ptp_assistant_active`). This is the exit-intent stand-down key: when the assistant is live it supersedes the blog `ExitIntentModal` so the visitor never gets two exit prompts at once.
- **MANAGER/Sonnet TASK:** in `Solicitors/web/src/components/blog/ExitIntentModal.tsx`, add the guard `if (typeof window !== "undefined" && window.sessionStorage.getItem("afl_assistant_active") === "1") return;` (or equivalent early-out before arming the exit listener), matching the generalist's `hd_assistant_active` and Property's `ptp_assistant_active` pattern. Verify the Solicitors `ExitIntentModal` currently has NO assistant guard (it does not today) and add exactly this one.
- Mount the widget in `Solicitors/web/src/app/layout.tsx` inside the `IntentProvider` (same slot as Property, `print:hidden`, fixed bottom-right). Also add the topic `resourceId` wiring: set each shipped topic's `resourceId` in `lib/intent/taxonomy.ts` `TOPICS` (currently all `null`) to the matching guide slug, so the resource is discoverable from the intent layer (`sra-compliance`, `partnership-llp`, `succession-sale`, `sole-practitioner` → their slugs; others stay null).

---

## 4. Golden / QA cases

New tests live alongside the existing Solicitors Vitest suites (`solicitors-tools.test.ts`, `premium-tools.test.ts`). Run `cd Solicitors/web && npx vitest run`.

### 4.A xlsx-vs-lib golden checks (block the `enabled` flip)

For each of the 4 workbooks, add a golden check (`scripts/resources/builders/<topic>.golden.ts` or a Vitest case) asserting the workbook's live formula result equals the TS `compute()` for the workbook's DEFAULT blue-cell inputs, to the penny. A category's xlsx `enabled` flag must NOT be flipped until its golden passes. Trace targets:

1. **R-1 SRA** · defaults `openMatters=150, volume="moderate", matterType="conveyancing"` → `calcSraReserve` gives `peakClientMoney = 150 * 8000 = 1,200,000`; `suggestedReserve = 1,200,000 * 0.025 = 30,000`; low `= 21,000`; high `= 45,000`. Rule 12.2 sheet: `averageBalance=8000, maximumBalance=240000` → within exemption TRUE (8,000 ≤ 10,000 AND 240,000 ≤ 250,000). Also assert: `averageBalance=8000, maximumBalance=260000` → FALSE; `averageBalance=12000, maximumBalance=100000` → FALSE. **Assert the workbook and preview NEVER contain the string "£250" as a threshold** (only "£250,000"). (Trace: `sra-client-account-reserve.ts` lines 30-43, 88-91; HP §5.G.)
2. **R-2 partner** · defaults `totalProfit=800000, method="two-tier", seniorPartners=3, juniorPartners=2` → `calcLLPProfitShare` per-partner shares; each share through `calcSolicitorTakeHome({profit: share}).partnership.net`. Assert the workbook per-partner net equals the lib's partnership net for the top partner. (Trace: `llp-profit-share.ts` two-tier senior ×1.5; `solicitor-take-home.ts` 2026/27.)
3. **R-3 practice-sale** · defaults `profit=400000, firmType="partnership-llp", region="midlands", demand="normal", wip=120000, tangibleAssets=40000` → `calcLawFirmValuation` goodwill/total range; CGT sheet `calcPracticeSaleCgt({ gain: 900000, otherIncome: 50000, badrEligible: true, aeaAvailable: 3000, badrLifetimeRemaining: 1000000 })` → taxableGain 897,000; BADR 18% within £1,000,000 → CGT = 897,000 × 0.18 = **161,460**; netProceeds = gain − CGT. Assert to the penny. Also `badrEligible=false, gain=100000, otherIncome=60000` (higher-rate) → taxable 97,000 at 24% = **23,280**. (Trace: `law-firm-valuation.ts`; `practice-sale-cgt.ts` constants; HP §9.)
4. **R-4 take-home** · defaults `profit=120000, pensionContrib=0` → `calcSolicitorTakeHome` three-column net/tax; assert the workbook's sole/partner and Ltd columns equal `partnership.net`, `soleTrader.net`, `ltd.net`. (Trace: `solicitor-take-home.ts` 2026/27 constants.)

### 4.B FAQ + copy fact-check list (with HP refs)

Every FAQ answer, opener line, guide body, workbook note and gate blurb is checked against HP before ship. Blocking checklist:

- **SRA exemption everywhere = "average not exceeding £10,000 AND maximum not exceeding £250,000".** Grep the entire R3 output for the literal `£250 ` (with a trailing space or non-comma) and any "average £250" / "£250 average" · **must be zero hits.** Only "£250,000" is permitted. (HP §5.G · the single most important check.)
- Rule 12.1 (held ANY client money → report TRIGGER) is stated as DISTINCT from the Rule 12.2 exemption; never conflated. (HP §5.G)
- Rule 8.3 reconciliation = "at least every five weeks", COFA/manager sign-off; Rule 3.3 banking-facility prohibition; Rule 7 fair interest. (HP §5)
- Client money framed operational/regulatory-context, NEVER tax; NEVER "the firm's income"; NO regulatory-defence or SRA-enforcement advice. (HP §5 practical rule)
- Dividend rates: 2025/26 = 8.75 / 33.75 / 39.35; **from 6 April 2026 = 10.75 / 35.75 / 39.35** (allowance £500). Any dividend figure date-tagged. (HP §3)
- Class 4 NIC 6% (£12,570 to £50,270) / 2% above; Class 2 removed 6 Apr 2024. (HP §3)
- BADR: **£1,000,000 lifetime limit**, **18% from 6 Apr 2026** (10% to 5 Apr 2025; 14% 6 Apr 2025 to 5 Apr 2026). Standard CGT 18% / 24% on all chargeable assets from 30 Oct 2024; AEA £3,000 (2025/26 and 2026/27). (HP §9)
- WIP on sale = income receipt (ITTOIA 2005 ss.182 to 185), split from capital goodwill; partnership/LLP = asset sale only (no shares). (HP §4, §9)
- Salaried member (FA 2014): ≥80% disguised salary (Condition A), no significant influence (B), capital < 25% (C); all three to be caught. (HP §2.A · use the HP §2.A section mapping 863B/863C/863D, not TOOLS.md's, per Section 5 flag F5.)
- Incorporation: an SRA firm cannot incorporate freely (recognised body / ABS, Legal Services Act 2007); do NOT present incorporation as a flat tax win (the 2026/27 dividend rise narrows it). (HP §1, §3)
- PII (if it surfaces): £3m LLP/company/ABS, £2m sole prac/partnership (this way round), 6-year run-off, VAT-exempt. (HP §10)
- No em-dashes in any on-page string; no "DJH"; no partner name in `resourceConsentText`; no chartered/qualified/named-author claim.

### 4.C Behaviour / event QA

- All events fired are on the shared allowlist: `gate_view`, `resource_unlocked`, `support_opened`, `personalization_shown/clicked/dismissed`, `cta_click`, `form_start/field_focus/field_abandon/submit/error`, `lead_submitted`, `calc_*`. Zero off-list names.
- Honeypot `enquiry_ref` filled → success UI + a flagged row (server chokepoint), NO silent drop, for BOTH the ResourceGate and the widget composer.
- Stand-down: with the widget active (`afl_assistant_active === "1"`), the blog `ExitIntentModal` does NOT arm. With the widget suppressed (converted visitor), the ExitIntentModal behaves as before.
- Assistant proactive layer: never fires for a converted visitor; stops the moment the panel is opened; re-tailors and never repeats a line; auto-open once per session (prod).
- `ResourceGate` renders null for topics with no enabled asset (Phase-A parity); after flipping a flag, the inline reveal shows the correct xlsx + guide links; no `/api/resources/deliver` call in the network tab.
- Standard gates: `npm test --workspace Solicitors/web`, `npm run build --workspace Solicitors/web`, `python scripts/predeploy_gate.py --site solicitors`, `python scripts/spinup_site_check.py solicitors`, then the post-deploy battery per `docs/_engines/CRO_PARITY_PROGRAM.md` §Gate pipeline.

---

## 5. File manifest (Solicitors/web only) + build order

All paths under `Solicitors/web/`. "new" = create; "modified" = edit existing. No new npm dependency except `exceljs` (+ `tsx` if absent) as devDeps.

**WS5 · resources (data + server + components):**
- new `src/lib/resources/registry.ts` · download spine (`XlsxAsset`/`GuideAsset`/`CategoryResource`/`RESOURCES`/helpers; 4 enabled entries + 3 flagged-off). Add a `RESOURCE_EMAIL_ENABLED = false` constant (0.B).
- new `src/lib/resources/copy.ts` · `GateCopy`/`gateCopy` (fallback title "Free law-firm toolkit").
- new `src/lib/resources/content.ts` · server-only guide loader (`getGuideByTopic`, `publishedGuideTopics`; `content/resources`).
- new `src/components/resources/ResourceGate.tsx` · token-themed, on-page delivery, chokepoint submit, no deliver-fetch.
- new `src/components/resources/ExcelPreview.tsx` · token-themed faux grid; 4 `PreviewSpec`s.
- new `src/components/resources/CalculatorPageResources.tsx` · renders `PremiumUpgrade` + `ResourceGate` below the `[slug]` calculator.
- (do NOT port `GateOrForm.tsx` in R3.)

**WS5 · xlsx generator + guides + content:**
- new `scripts/resources/generate-xlsx.ts` · Property clone (byte-stable, `PUBLIC_RESOURCES`, `normalizeZipTimestamps`).
- new `scripts/resources/builders/index.ts` · `BUILDERS` (4 entries).
- new `scripts/resources/builders/{sra-compliance,partnership-llp,succession-sale,sole-practitioner}.ts` + matching `.golden.ts` checks.
- new `content/resources/{sra-compliance,partnership-llp,succession-sale,sole-practitioner}.md` · Opus-written guide bodies (raw HTML, noindex).
- new (generated, committed) `public/resources/<topic>/<topic>-model.xlsx` × 4.
- new `src/app/resources/[topic]/page.tsx` · noindex guide route reading `content.ts` (`generateStaticParams` from `publishedGuideTopics()`; 404 when the guide file is missing). CONFIRM Solicitors has no existing `/resources` route (it does not today).
- new (optional stub) `src/app/api/resources/deliver/route.ts` · graceful no-op (returns `delivered:false`), NOT called by the client in R3.

**WS6 · assistant + widget + FAQ:**
- new `src/lib/intent/journeyModel.ts` · storage key `afl_journey`, Solicitors `deriveTopic`.
- new `src/lib/assistant/opener.ts` · Solicitors nouns/hooks (Section 3.B); `OPENER_LLM_ENRICHMENT_ENABLED = false`.
- new `src/lib/support/faq.ts` · GENERIC + BY_TOPIC (Section 2).
- new `src/components/support/SpecialistWidget.tsx` · token-themed port; thresholds verbatim; `afl_assistant_active` set; email_only chokepoint submit.

**Modified:**
- `src/config/site.ts` · **MANAGER** adds `resourceConsentText` (0.C) and exports it on `siteConfig`.
- `src/lib/intent/taxonomy.ts` · **MANAGER** sets `resourceId` on the 4 shipped topics (Section 3.D).
- `src/app/layout.tsx` · mount `<SpecialistWidget />` inside `IntentProvider` (bottom-right, print:hidden).
- `src/components/blog/ExitIntentModal.tsx` · add the `afl_assistant_active` stand-down guard (Section 3.D).
- `src/components/blog/BlogPostRenderer.tsx` · inject `<ResourceGate ... placement="blog" />` at a late split (after the R2 premium island + mid-scroll capture).
- `src/app/calculators/[slug]/page.tsx` · render `<CalculatorPageResources slug={slug} pageTitle={...} />` once after the calculator.
- `package.json` · add `exceljs` (+ `tsx` if absent) devDep + `"resources:xlsx"` script.
- `docs/solicitors/TOOLS.md` · **MANAGER** correct the stale £250 exemption line (Section 5 flag F-D1) · minimal-intervention doc fix, do not bundle other edits.

**NOT touched (guardrail):** `src/lib/tools/registry.ts`, the shared `Calculator.tsx`/`CalculatorClient.tsx`, the gallery/sitemap/embeds, every `compute/*` lib (all already correct · the SRA lib and premium configs were fixed in R2), and the R2 `lib/tools/premium/*` (the WS5 registry is separate and additive). `Property/**` is READ-ONLY.

### Build order

1. Manager: add `resourceConsentText` to `site.ts`; confirm `/about` `/services` `/contact` `/resources` route existence (flag B1); confirm the brand accent hex (flag A1).
2. Sonnet: WS6 first (journeyModel → opener → faq → SpecialistWidget), mount in layout, add ExitIntentModal guard. It has no data dependency and lights up immediately (deterministic).
3. Sonnet: WS5 data layer (registry → copy → content), then the xlsx builders + golden checks, then `ResourceGate`/`ExcelPreview`/`CalculatorPageResources`, then the guide route + guide md, then the blog/calculator injections.
4. Manager: set taxonomy `resourceId`s; run `npm run resources:xlsx`; flip the 4 `enabled` flags only after each golden passes.
5. QA (Section 4) → gates → owner sign-off → deploy (env-override recipe, project `prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9`) → post-deploy battery.

---

## 8-line summary

1. R3 adds 4 email-gated resource pairs (Excel model + noindex guide) delivered ON-PAGE, plus the deterministic proactive SpecialistWidget/assistant, both ported from Property to the Solicitors CSS-variable token system with no new runtime dependency (exceljs is build-time only).
2. Resources cover the 4 premium-tool topics: SRA client-account reserve/reconciliation (`calcSraReserve`, HP §5/§5.G), partner profit+tax (`calcLLPProfitShare`+`calcSolicitorTakeHome`), practice sale net-of-CGT (`calcLawFirmValuation`+`calcPracticeSaleCgt`), and sole-practitioner take-home (`calcSolicitorTakeHome`); lock-up/cash-flow is HELD (no compute lib).
3. Email delivery is stubbed: the ResourceGate reveals downloads inline only, does NOT call `/api/resources/deliver`, and its success copy promises no email; a `RESOURCE_EMAIL_ENABLED=false` flag makes re-enabling one line once a from-domain exists.
4. Consent for downloads uses a new in-house-only `resourceConsentText` (names only Accounts for Lawyers, never Reflex/any partner), distinct from the partner-aware `leadConsentText` the widget enquiry correctly keeps.
5. The FAQ set (12 topic + 3 generic) puts SRA/client-account questions first and traces every answer to HP, with the exemption stated ONLY as average £10,000 / maximum £250,000 and never a £250 figure.
6. The assistant is a 1:1 deterministic port: Property cadence thresholds verbatim ([30/70/120/180]s), `afl_` storage prefixes, Solicitors topic nouns/hooks per stage, and the `afl_assistant_active` exit-intent stand-down guard added to the blog ExitIntentModal.
7. Golden checks assert every workbook formula equals its lib compute to the penny (BADR example 897,000×0.18=161,460) and block the `enabled` flip; a grep-for-`£250` check is a hard gate; all events are allowlisted (`gate_view`, `resource_unlocked`, `support_opened`, `personalization_*`, `cta_click`).
8. Deliverable written; the compute libs and premium configs are already correct from R2 (F1 dividend, F2 BADR limit, F3 SRA £250 all resolved in code), so R3 is copy + wiring + xlsx, not new tax maths.

## Unverifiable / must-resolve items flagged

- **A1 (brand hex):** the Solicitors `--primary`/`--accent` token argb hex for the xlsx theme + preview accent was not read; confirm the brand colour before generating workbooks (default to a professional navy, not Property emerald).
- **B1 (routes):** the journey model and stand-down assume `/about`, `/services`, `/contact` exist and that no `/resources` route exists yet. Confirm; if `/services` is absent, drop that special-page flag rather than track a 404.
- **C1 (booking flow):** Property's booking-concierge opener + `/book?t=` chip assume a signed booking-nudge capability. Solicitors likely has none, so that branch is dead code (widget "call" chip points to `/contact`). Confirm; keep the code for parity but it never fires.
- **F1/F2/F3 (RESOLVED in R2, verify still true at build):** the take-home lib is 2026/27 dividend basis (10.75/35.75/39.35), `practice-sale-cgt.ts` has the £1,000,000 BADR lifetime + 18%, and `calcSraReserve`/the premium config use the correct average £10,000 / maximum £250,000 test with explicit "never £250" guards. Re-confirm none regressed before shipping resource copy that cites them.
- **F-D1 (doc drift, TOOLS.md):** `docs/solicitors/TOOLS.md` still lists the SRA tool's exemption as "average balance up to £250" (the prohibited figure) and Tool 1 with stale 2025/26 dividend rates. Do NOT source any figure from TOOLS.md; source from HP + the libs. Manager should correct TOOLS.md (minimal-intervention doc fix).
- **F5 (non-conflict, section IDs):** HP §2.A maps the FA 2014 conditions to s.863B/863C/863D; TOOLS.md and the fa2014 lib header cite s.863A-863G loosely. Thresholds (80% / <25%) are identical everywhere; use the HP §2.A mapping in any authored copy.
- **F-NIC (modelling note):** `solicitor-take-home.ts` uses employer NIC secondary threshold £9,100, while HP §3 states the secondary threshold is £5,000 from 6 April 2025. This is a Ltd-comparison modelling choice inside the lib (not a headline locked fact); do not surface an employer-NIC threshold figure in resource/FAQ copy without the orchestrator reconciling it, and keep xlsx output consistent with whichever the lib uses (traceability over independent correctness).
