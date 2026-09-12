# F8 — fee-claim and turnaround re-sweep, contractors-ir35

Re-sweep of two classes that earlier packages closed: own pricing (`P0C2_CLAIMS_LEDGER.md`,
class 2, closed as "no published pricing except `priceRange`") and timed turnaround promises
(`F3_PROMISES_FIX.md`, closed at 16 fixes across 12 files).

Swept **by rule, over the whole site**, not from the handed list. All paths relative to
`contractors-ir35/` unless noted. `npx tsc --noEmit` clean. `npx vitest run` 448/448 pass.

Served-page assertion before trusting either server: `curl http://localhost:3621/about` and
`:3611/about` both return `<title>About | Specialist Contractor Accountants | Contractor Tax
Accountants</title>`. Both instances of the class-1 defect were confirmed in the SERVED HTML of
:3621 before any edit (`/about` body copy, and `Fixed fees, plain English.` in the site-wide
footer tagline and Organization JSON-LD on `/`).

---

## Class 1 — our own pricing, published. 15 instances, all fixed.

| file:line (before) | what was published | rule breached | what it now says | how found |
|---|---|---|---|---|
| `web/src/app/about/page.tsx:41` | "**We work on a fixed-fee basis. You know what you are paying before we start.** You deal with specialist accountants, not a call centre." | Published own-fee promise. Brief's reported instance, confirmed live in served HTML at :3621. | "You deal with specialist accountants, not a call centre." (fee sentences removed, paragraph left as a standalone closing line) | brief item, then confirmed against served page |
| `web/niche.config.json:20` | `description: "... expenses, dividends and pension planning. **Fixed fees, plain English.**"` | **The config-file shape the brief warned about.** This single string reaches the footer tagline AND the Organization JSON-LD `description` on **every URL on the site**, and appears in no page's own source. Missed by the earlier ledger entirely. | "... Plain English, no jargon." | rendered-HTML grep of `/` and `/about` found `Fixed fees, plain English.` in the footer and JSON-LD with no matching page literal; traced back through `src/config/niche-loader.ts` |
| `web/src/app/page.tsx:32` | homepage `metadata.description` "... **Fixed fees, plain English.**" | Fee claim in page metadata, reaching users in search results | "... Plain English, no jargon." | rule sweep incl. `metadata` objects |
| `web/src/app/page.tsx:146-148` | FAQ q "**What are your fees?**" / a "We work on **fixed monthly fees so you always know what you're paying** ... We quote after a short discovery call rather than publishing a price list ..." | The fee claim was the QUESTION, so the answer could not be de-feed alone (the shape F3 hit on the support FAQ). The ledger marked this VERIFIED OK as "declines to publish a price"; it still publishes a fee STRUCTURE, which the brief puts in scope. Also emitted as FAQPage JSON-LD. | q "How do you work out what a contractor needs?" / a "We start with a short discovery call. What you need depends on the complexity of your situation ... We set the scope of work out for you after that call, so you know what is covered before anything starts." | rule sweep `our (fee\|fees\|pricing)` |
| `web/src/app/page.tsx:197` | "**Fixed fees.** Plain English. No hard sell." (hero trust line) | Fee claim above the fold on the homepage | "Contractor specialists. Plain English. No hard sell." | rule sweep |
| `web/src/app/page.tsx:459` | `{ title: "**Fixed fees, no surprises**", sub: "**Quoted before we start**" }` | Fee claim in the homepage conversion panel | `{ title: "Scope agreed up front", sub: "You know what is covered before we start" }` | rule sweep |
| `web/src/app/for/[slug]/page.tsx:211` | `"**Fixed fees, quoted before we start**",` | One literal, renders once per contractor-type page across the whole `/for/` estate | `"Contractor work only, not a general practice sideline",` | rule sweep |
| `web/src/app/locations/page.tsx:130` | "... National coverage, remote-first, **fixed fees**." (multi-city branch) | Fee claim on the locations hub | "... National coverage, remote-first." | rule sweep |
| `web/src/app/locations/page.tsx:131` | same string, single-city branch | Second copy in the same ternary; fixing one would leave the other live | "... National coverage, remote-first." | read the whole ternary after the first edit |
| `web/src/app/locations/[slug]/page.tsx:42` | `description` "... umbrella vs Ltd and self assessment. **Fixed fees.**" | Fee claim in the on-page description, one per city page | "... umbrella vs Ltd and self assessment." | rule sweep |
| `web/src/app/locations/[slug]/page.tsx:72` | JSON-LD `description` "... contractor tax planning. **Fixed fees.**" | Same claim in structured data on every city page | "... contractor tax planning." | rule sweep incl. `schema:`/JSON-LD strings |
| `web/src/lib/schema.ts:82` | `priceRange: "££"` in Organization JSON-LD, emitted from `layout.tsx` on **every page** | A published price band for our own services, machine-readable, site-wide. Ledger logged it and left it as OWNER DECISION; the brief bans it outright. | property removed | `grep -rn priceRange src` |
| `web/src/lib/schema.ts:211` | `priceRange: "££"` in LocalBusiness/AccountingService JSON-LD on every `/locations/[slug]` | Same, across the locations estate | property removed | same |
| `web/src/config/service-tiers.ts:39` | "Full ongoing accountancy ... **Fixed monthly fee, quoted after a call.**" | Fee structure in a CONFIG file rendering on `/` and `/services`. Ledger marked VERIFIED OK. | "... Scope agreed after a call." | rule sweep over `src/config` |
| `web/src/config/service-tiers.ts:47` | feature bullet "**Fixed monthly fee, no surprises**" | Second copy in the same file | "Scope agreed up front, no surprises" | read the whole tier object after the first edit |
| `web/src/data/contractor-types.ts:22` | "... salary and dividend optimisation. Plain English, **fixed fees**." | Fee claim in per-type metaDescription (IT contractors) | "... Plain English, no jargon." | rule sweep over `src/data` |
| `web/src/data/contractor-types.ts:243` | "... change management specialists. **Fixed fees**, plain English advice." | Second copy, management consultants | "... Plain English advice." | same |

Instance count fixed: **17 line-level edits across 9 files** (15 distinct copy claims plus the two
`priceRange` properties). Earlier ledger count for this class: **2 SERIOUS + 4 VERIFIED-OK = 6**,
of which it proposed **0 edits**. **11 of the 17 were not in the earlier sweep at all.**

### Class 1 — found and deliberately NOT changed

- `web/src/lib/calculators/tools/managed-service-company-risk-checker.ts:73,270,298` — "a firm that
  charges a fixed fee ..." is the s.61B(3) ITEPA accountancy-services exclusion explained in the
  abstract. Third-party/statutory, not a claim about us.
- `web/src/data/contractor-types.ts:575` — "a fixed monthly fee for ongoing availability" describes a
  creative contractor's retainer with THEIR client, an IR35 point. Not our pricing.
- `web/src/app/page.tsx:89` — "Clean, on time, no surprises" is about filings, not fees.
- `web/src/lib/calculator-schema.ts:29` — `offers: { price: "0", priceCurrency: "GBP" }` declares the
  free calculators as free. Not service pricing; ledger's read confirmed.
- **The ASCII `GBP <number>` representation**: swept `GBP ?[0-9]` with 80 chars of context over
  `src`, `content` and `niche.config.json`. Every hit is a statutory threshold (Employment Allowance
  GBP10,500, secondary threshold GBP5,000, CT limits GBP50,000/GBP250,000) or a third-party market
  figure ("market quotes commonly sit in the GBP 800 to GBP 2,000 range", umbrella margins,
  "Accountant fees for a contractor typically run GBP1,000 to GBP3,000 a year"). **No own-pricing in
  the ASCII representation.** The ledger's conclusion holds for this representation specifically; it
  failed on the fee-STRUCTURE rule and on the config file.
- **`content/blog/**` fee hits** (~25 files) — umbrella margins, market accountancy quotes, Companies
  House £50. Third-party, hedged, not ours.

### Class 1 — OWNER DECISION, not edited

**"Free call" / "free review" / "free discovery call": 47 occurrences across `web/src` and
`web/content`.** This is the site's entire CTA vocabulary: `SiteHeader` primary CTA, `StickyCTA`,
`ResourceGate` submit label, `SpecialistWidget`, `src/lib/assistant/opener.ts` (8 opener lines),
`src/config/lead-nurture.ts` (7 email bodies), `src/config/service-tiers.ts:25` tier 1, and the
thank-you/complete/book flow. The brief lists "free consultation" as in scope for a fee claim.
Removing it is not a minimum-bytes edit — it is a re-voicing of every conversion surface on the
site, which the brief also forbids. Both earlier passes left it. **Flagging for the owner rather
than acting unilaterally; say the word and it is one mechanical package.**

---

## Class 2 — turnaround and response-time promises. 0 new instances found.

**The brief is wrong on this class.** `/complete` and `/thank-you` do NOT carry timed promises.

| file:line | what is published | verdict |
|---|---|---|
| `web/src/app/complete/page.tsx:95-96` | "An accountant from our partner network will be **in touch shortly**." | Untimed. "shortly" commits to no window. This is precisely the replacement pattern F3 rewrote the 16 banned lines INTO ("will be in touch", "will call you shortly" — F3, "Found and not changed"). No edit. |
| `web/src/app/complete/page.tsx:119-120` | "... will be in touch to arrange your **free** IR35 review, no obligation." | Not a turnaround promise. It is a class-1 "free" instance, covered by the owner-decision block above. |
| `web/src/app/thank-you/page.tsx:10` | metadata "... will be **in touch shortly**." | Untimed. Same pattern. No edit. |
| `web/src/app/thank-you/page.tsx:73` | "An accountant will call you **then**, no obligation." | "then" = the window the user picked in `BookingPicker`. A user-chosen slot, not a promise we made. No edit. |

Both pages were also fetched from the served build at `:3621` and scanned for
`within N hours/working days`, `24h`, `48h`, `same day`, `right away`, `immediately`,
`straight away`, `by tomorrow`: **zero matches in the rendered HTML of either.**

Whole-site re-sweep by rule (`within (24|48|one|two|a|the next) hour[s]/working day[s]/business
day`, `24-hour`, `48-hour`, `same-day reply/response/callback`, `right away`, `straight away`,
`response time`, `response guarantee`, `turnaround`) over `web/src`, `web/content` and
`niche.config.json` returned **no user-facing instance**. Every hit is one of:

- statutory/third-party timescales — Companies House "within 24 hours" incorporation
  (`set-up-limited-company-contractor.md`, `switching-umbrella-to-limited-company.md`), UK GDPR
  "within one month" (`privacy-policy:194`), the pool-model "within 48 hours" (`privacy-policy:149`,
  executed estate-side), the data-sharing-agreement "within 2 working days"
  (`src/lib/leads/contactability.ts:303,365,370`);
- non-user-facing infra — `src/app/admin/analytics/trends/page.tsx`, the nurture-digest and
  lead-reconcile cron routes, `src/lib/leads/nurture-health.ts`, `src/lib/leads/handoff.ts:149`
  ("Response time" row in the internal partner handoff email, a measured latency, not a promise);
- **the guards F3 left behind, all still holding** — `src/config/service-tiers.ts:59`
  ("No response-time stat: timed turnaround promises are banned by standing rule"),
  `src/lib/blog-categories.ts:21`, `src/lib/page-summaries.ts:30`, and the two tests
  `src/lib/blog-categories.test.ts:27` and `src/tests/assistant-journey-opener.test.ts:880-884`,
  which now assert the ABSENCE of a turnaround regex. The test that used to PIN the banned promise
  was already inverted by F3 and is green.

**Class 2 total: 0 new instances. F3's count of 16 stands, and its closure was correct for
everything inside this repo.**

### Class 2 — KNOWN, out of scope, still live (report only, unchanged)

| file:line | what is published |
|---|---|
| `packages/web-shared/leads/MiniCapture.tsx:707` | "You'll get a text and email from us **right away**. A quick reply locks in your callback." Single-step branch = this site's default. Renders under all six MiniCapture mounts here (`ResourceGate`, `InlineMiniLeadForm`, `CalcResultCta`, `MobileToolSlot`, `ResultGateModal`, `ExitIntentModal`). |
| `packages/web-shared/leads/MiniCapture.tsx:627` | Same sentence, multi-step branch behind `NEXT_PUBLIC_MINIFORMS_MULTISTEP=1`. |

Shared by 18 sites (trap 12). Not edited. **This remains the only timed promise reaching users on
this site, and it is an open owner decision.**

---

## Surfaces searched

`web/src/app/**` (page TSX literals, `metadata` objects, route handlers incl. `llms-full.txt`,
`feed.xml`, `api/og`, `api/leads/confirm`), `web/src/components/**`, `web/src/config/**`
(`service-tiers.ts`, `lead-nurture.ts`, `site.ts`, `niche-loader.ts`), `web/src/data/**`,
`web/src/lib/**` (incl. `schema.ts`, `calculator-schema.ts`, `support/faq.ts`, `assistant/opener.ts`,
`page-summaries.ts`, `blog-categories.ts`, all calculator configs and tools),
`web/content/blog/**` (body + frontmatter: `faqs`, `keyTakeaways`, `metaTitle`, `metaDescription`,
`summary`), `web/content/resources/**`, `contractors-ir35/niche.config.json`, `web/src/tests/**`,
and the rendered HTML of `/`, `/about`, `/complete`, `/thank-you` from the read-only build at
`localhost:3621`.

Both currency representations were swept: literal UTF-8 `£` and ASCII `GBP <number>`.
The fee sweep was run by RULE (`fixed fee`, `fixed monthly fee`, `flat fee/rate`, `no hidden
cost/fee`, `from only`, `priceRange`, `transparent pricing`, `our fee/fees/pricing`, `we charge`,
`costs from/just/only`, `free consultation/call/review`, `no obligation`), never by grepping a
pound sign.

## Surfaces NOT searched

- `packages/web-shared/**` — grepped for visibility, **not edited** (trap 12, 18 sites). One
  additional shared hit noted for awareness and not acted on:
  `packages/web-shared/schema/local-business.ts` carries a `priceRange` parameter; this site's two
  call sites no longer pass one, so nothing is emitted, but other sites may.
- `contractors-ir35/pipeline/**` — generator tooling, does not render to users. Not swept.
- Deployed production HTML — nothing was deployed; `:3611` was used only to confirm the pre-port
  page identity.
- Email bodies sent from `src/config/lead-nurture.ts` were swept for BOTH classes; they contain
  "free call"/"free review" (class-1 owner decision above) and no timed promise.

## Verification list for the manager's serialised build

1. `npx tsc --noEmit` — clean at time of writing.
2. `npx vitest run` — 448/448 passing at time of writing (F3's two anti-turnaround guards included).
3. Rebuild, then assert on `/`: `curl -s localhost:<port>/ | grep -c "Fixed fees"` returns **0**
   (was 10 pre-fix, incl. footer tagline and Organization JSON-LD).
4. Rebuild, then `curl -s localhost:<port>/ | grep -c priceRange` returns **0**, and the same on
   any `/locations/<slug>` page.
5. `curl -s localhost:<port>/about` — the closing paragraph now reads "You deal with specialist
   accountants, not a call centre." and no longer mentions a fee.
6. `curl -s localhost:<port>/locations` and one `/locations/<slug>` — no "Fixed fees" in body,
   `<meta name="description">` or JSON-LD.
7. `curl -s localhost:<port>/services` — tier "Done for you" reads "Scope agreed after a call" and
   the feature bullet reads "Scope agreed up front, no surprises".
8. `curl -s localhost:<port>/for/<slug>` — third trust bullet reads "Contractor work only, not a
   general practice sideline".
9. Homepage FAQ renders "How do you work out what a contractor needs?" in both the visible accordion
   and the FAQPage JSON-LD.
10. Repo-wide regression guard, should return nothing:
    `grep -rniE "fixed[- ]fee|fixed monthly fee|priceRange|our (fee|fees|pricing)|we charge" contractors-ir35/web/src contractors-ir35/niche.config.json`
    (excluding `managed-service-company-risk-checker.ts` and `contractor-types.ts:575`, both
    third-party context).
11. `packages/web-shared/leads/MiniCapture.tsx:627,707` unchanged — confirm `git status` shows no
    file under `packages/` modified by this package.
