# PORT BLUEPRINT — MEDICAL SLICE 3: CONTACT/POST-SUBMIT, ABOUT, RESEARCH, RESOURCES, LEGAL, INTERRUPTIVE STACK, MACHINE SURFACES, BRAND LAYER, INSTRUMENTATION + GUARDS

Read-only Phase-0 disposition. Nothing was built, edited or deployed. Written 2026-09-10.

Sources read: `docs/_engines/DESIGN_PORT_PLAYBOOK.md`, `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md`
(§4.1/§4.3/§4.6/§4.7 + appendices A, D, E, K, L, N), `docs/property/DESIGN_SYSTEM.md` §0,
`docs/solicitors/_port/DISPOSITION_SLICE3.md` and `docs/solicitors/DESIGN_DELTA.md` (prior art,
site 2, NOT ground truth for Medical), `docs/medical/house_positions.md`, and every Medical file
named below. Every path verified; every line number read, not guessed; every contrast ratio
computed, not quoted.

Companion artefact: **`docs/medical/DESIGN_DELTA.md`** (the brand layer, appendix-L shape).

---

## FALSE PREMISES IN THE BRIEF

The brief is mostly accurate. Six statements are wrong or need correcting, and one is a
significant miss.

| # | Brief said | Verdict | Evidence |
|---|---|---|---|
| P1 | `app/contact/`, `app/about/`, `components/forms/*` etc. | **PATH WRONG.** Medical is `src/`-rooted. Every route is `Medical/web/src/app/…`, every component `Medical/web/src/components/…` | `ls Medical/web` = `src/`, no top-level `app/` |
| P2 | "`app/resources/*`" | **PARTLY FALSE.** There is no `/resources` INDEX. `src/app/resources/` contains only `[topic]/page.tsx`. `/resources` is a live 404 and is absent from `sitemap.ts` (which emits `/resources/<slug>` only, `sitemap.ts:157-159`). Same shape as Solicitors: the index is NET-NEW | `ls src/app/resources` = `[topic]` only |
| P3 | "`app/research/*` (+ `AaIndexCharts`, `data/route.ts`)" | TRUE, and the scale was understated. `research/annual-allowance-pension-tax-index/page.tsx` is **1,407 lines**, the largest single file in the slice by a factor of three | `wc -l` |
| P4 | "`LeadForm.tsx` 412 lines" | **TRUE**, verified exactly |
| P5 | "The `LeadForm` invisible-label invariant" | **FALSE for Medical.** `LeadForm` has no invisible labels. All seven fields carry a VISIBLE `<label htmlFor>` at `block text-sm font-medium text-[var(--ink)]` (`:199, :224, :247, :272, :303, :331, :347, :363`). The only visually-hidden label is the honeypot (`:194`), inside an `aria-hidden="true"` wrapper, which is correct. The invariant to protect here is a different one: **the form always renders on a light surface**, and that IS true — see §2 R7 | read in full |
| P6 | "`role="img"` collapsing a chart subtree (T16)" | **DOES NOT EXIST on Medical.** `grep 'role="img"'` across `AaIndexCharts.tsx`, `ui/chart.tsx` and every file in scope = **0 hits**. The inverse defect exists instead: the charts have NO accessible name of any kind — no `role`, no `aria-label`, no `<figure>`/`<figcaption>` — so a Recharts SVG reaches a screen reader as an unlabelled graphic. See §4 R13 | grep + read |
| P7 | "whatever renders StickyCTA" | TRUE (`PageShell.tsx:25`), but the interruptive stack has **six** members, not five. The brief's list omits `SpecialistWidget` (it names it separately) and omits a **seventh dead one**: `src/components/blog/ExitIntentModal.tsx` (186 lines) exists on disk and is imported by NOTHING. It was retired as "a confirmed conversion loser" (`PageShell.tsx:27`). It is still described as live in the privacy policy — see §5 D3 | `grep -rn ExitIntentModal src --include=*.tsx` returns only comments |
| P8 | "the existing test suite under `Medical/web/tests`" | **PATH WRONG.** There is no `Medical/web/tests`. Tests live at `src/tests/*.test.ts`, `src/lib/**/*.test.ts`, `src/app/api/**/*.test.ts` and `scripts/resources/builders/*.test.ts`. `vitest.config.ts` includes `["src/**/*.test.ts", "scripts/**/*.test.ts"]` and `environment: "node"` — **so no `.tsx` file can be tested and no DOM is available.** That constrains every guard test this port can add (§9) | `cat vitest.config.ts`, `ls src/tests` |

**The significant miss.** The brief assumes the brand layer's risk is the warning ramp. It is not.
The risk is that **copper `#b87333`, the brand, measures 3.79 on white and is the button ground
and the text colour on 40 usages across 18 files**. Owner decision 1 keeps copper as the brand,
which is fine, but it cannot stay as a text or button-label colour on any light ground. The whole
of `DESIGN_DELTA.md` §1-§2 follows from that number.

---

## 1. Standing facts for every row below

1. `grep -rn "web-shared/design" src` = **0**. The site imports nothing from the shared design
   kit. Non-design kit imports (analytics, leads, lead-nurture, console) are extensive.
2. `globals.css` is **517 lines**, opens with a UTF-8 **BOM** (`:1`, bytes `efbbbf`) and carries mojibake
   at `:7`, `:9`, `:105` and `:138`. Its header comment at `:8` describes a **"Teal + coral brand"** on
   a navy and copper site.
3. Medical has **no shadcn token layer** (`--card`, `--popover`, `--muted-surface`,
   `--destructive`, `--input`, `--ring` = 0 hits) and **no `components.json`**, while Property has
   both. `ui/chart.tsx` and `ui/accordion.tsx` are already shadcn-shaped and running without it.
4. Medical has **no `--radius` token**. Eight literal `border-radius` values in `globals.css`,
   65 `rounded-full` and 64 `rounded-2xl` usages in `src`.
5. `package.json:26` already declares `"tw-animate-css": "^1.4.0"` and `globals.css:4` already
   imports it. Medical does NOT have the Solicitors phantom-dependency defect.
6. `cta.variant` is `"leadgen"`, so `isPackagesMode(niche)` is **false** everywhere.
7. Serif retirement scope: **116 `font-serif` + 15 `.display-serif` = 131 occurrences across 29
   files**. 39 of them are in slice 3's own scope, plus 6 more on `/about`.
8. `data-cta` source census: **19 distinct ids** (§9.1). 10 of them are in slice-3 files.
9. GA4 `G-CQF7KFZ1P6` is live, consent-gated through `ConsentedScripts` (`layout.tsx:114`),
   opt-out posture, storage prefix `ma` FROZEN (`layout.tsx:110`).
10. Line counts are from `wc -l` run 2026-09-10. Importers are derived, per row, with
    `grep -rn "<Symbol>" src --include=*.tsx --include=*.ts`.

---

## 2. Contact + post-submit (brief area A)

| # | New | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| R1 | `SlimHero` + canonical content-page skeleton (F.1) + kit `LeadCTAPanel` | `src/app/contact/page.tsx` (149 lines) | **KEEP-PAYLOAD-RESTYLE** | The route is the funnel's floor and carries `LeadForm`. Copy and structure are sound apart from the defects below | 5 `font-serif` retire (`:44, :68, :86, :105, :118`). `--medical-teal` / `--coral` legacy aliases retire (`:54, :85, :89, :93, :97, :121, :127, :133, :139`). The three numbered discs at `:89, :93, :97` are `bg-[var(--coral)]` (= copper `#b87333`) with 12px bold white text = **3.79, live FAIL**; move to `--btn-ground` or navy. `data-cta="contact_pricing_link"` (`:55`) is DEAD BY CONSTRUCTION (§9.1). Raw `'` apostrophes in JSX at `:46, :73, :98`; leave them |
| R2 | Post-submit set per F.6, restyled | `src/app/thank-you/page.tsx` (211 lines) | **KEEP-PAYLOAD-RESTYLE** | Three-branch page (`optout`, `confirmed`, default) plus the endowed-progress `<ol>` and `BookingPicker`. This is the most carefully built page in the slice; do not simplify it | 0 `font-serif`. `rounded-full` on buttons -> `rounded-xl` (`:61, :84, :175, :186, :192, :201`); the `CheckIcon` disc (`:15`) and the 3 step-bullet circles (`:130, :144, :158`) STAY round. `text-[var(--copper)]` at `:158` (the "3" in the step disc) = 3.79 on `--surface` white, **live FAIL**. Names **Aswatax** in copy (`:108-112, :119-123`) — see §5 D5 |
| R3 | Post-submit set per F.6, restyled | `src/app/book/page.tsx` (59 lines) | **KEEP-PAYLOAD-RESTYLE** | Standalone booking page behind a signed token; `robots: {index:false, follow:false}` (`:20`). Correct as designed | 0 `font-serif`. `border-2 border-[var(--ink)]/20` no-token card (`:44`) -> kit card. `btnPrimary` inherits the ground fix |
| R4 | Post-submit set per F.6, restyled | `src/app/complete/page.tsx` (128 lines) | **KEEP-PAYLOAD-RESTYLE** | Token-verified detail-completion page; four render branches; `robots: {index:false}` (`:20`). Its copy is the ONLY post-submit copy that is fully truthful about the pool model ("a specialist firm from our partner network", `:95, :120`) | 0 `font-serif`. `rounded-xl border-2` cards (`:23, :53, :92`) -> kit `rounded-xl ring-1` |
| R5 | Kit form primitives (`input.tsx`, `label.tsx`) + A.5 button | `src/components/forms/LeadForm.tsx` (412 lines) | **KEEP-PAYLOAD-RESTYLE, MINIMUM DIFF** | **The site's primary conversion unit.** 11 importers (§7). Field set, validation, honeypot (`:193-197`), `useFormTracking` lifecycle, `visitor_id`/`session_id` stitching (`:130-131`) and the `consent_text` audit trail (`:53, :124-128`) are all load-bearing and are NOT design | `fieldClass` (`:12-13`) -> kit `input` (keep `min-h-12`, `text-base`, the `focus:ring-[var(--copper)]/25` becomes the token ring). Errors `text-red-700` = 6.47 PASS, keep. **`:386` `text-[var(--copper)]` on the Privacy Policy link inside the consent notice = 3.79 at 12px — the worst single a11y cell in the slice, on the conversion surface.** Inline success card `:169-176` uses `emerald-200/50/900`: emerald is PROPERTY'S brand ramp and must not appear on Medical. **`leadConsentText` at `:385` and `:53` DOES NOT CHANGE — see §5 T19** |
| R6 | (none) | `src/components/forms/MiniCapture.tsx` (65 lines) | **KEEP-PAYLOAD-RESTYLE** | Config object, not a rendered form: exports `consentText: siteConfig.leadConsentText` (`:32`) for the kit mini-form. Importer derivation: `grep -rn "MiniCapture" src` returns only its own file and `InlineMiniLeadForm` | No visual change. **T19 carve-out applies here too**: `:32` is the second reference to the frozen consent string |
| R7 | (none) | LeadForm's **rendered grounds** | **RECORD, RE-VERIFY BEFORE AND AFTER** | The brief's "invisible-label invariant" is false (P5); the real invariant is the ground. Eleven call sites, derived with `grep -rn "LeadForm" src --include=*.tsx`: `contact:112` on `bg-[var(--background)]` #f4f6f9; `page.tsx:588`; `research/…:1382`; `blog/gp-accountant-services:247`; `blog/gp-practice-management:245`; `blog/gp-tax-and-accounts:246`; `blog/incorporation-and-company-structures:253`; `blog/locum-tax:256`; `blog/medical-expenses:250`; `blog/nhs-pension-planning:494`; `blog/private-practice:252`; plus `AudienceStageLayout:193` and `BlogPostRenderer` | **Every one is a white or light surface today. The form must never land on navy.** When `--background` moves from #f4f6f9 to slate-50 #f8fafc, re-measure all eleven. The `--muted` fine print at `:385, :409` goes from 5.01 to 4.55 on the new ground: still PASS, but the headroom is gone |
| R8 | Kit form primitives | `src/components/forms/DetailsForm.tsx` (217 lines) | **KEEP-PAYLOAD-RESTYLE** | Nurture-flow name/phone completion. Importer: `complete/page.tsx:8` (sole) | Same input/button token swap. Carries `text-[var(--copper)]` and red-* error styling |
| R9 | Kit form primitives | `src/components/forms/BookingPicker.tsx` (171 lines) | **KEEP-PAYLOAD-RESTYLE** | Callback slot picker; the booking act is the contactability signal (`book/page.tsx:9-13`). Importers: `thank-you/page.tsx:5`, `book/page.tsx:4` | Token swap only. Do not touch the slot logic |
| R10 | Kit CTA band (A.5 + F.1) | `src/components/ui/CTASection.tsx` (54 lines) | **KEEP-PAYLOAD-RESTYLE** | 6 importers: `about:102`, `locations:87`, `locations/[slug]:285`, `nhs-pension:498`, `services:283`, `services:290` | `display-serif` at `:37` retires (1 of the 15). `rounded-2xl` (`:28`) -> `rounded-xl`. The copper hairline at `:32` is a graphic and stays. `data-cta="cta-section-primary"` (`:45`) KEEPS its id |

---

## 3. About (brief area B, part 1)

| # | New | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| R11 | Canonical content-page skeleton | `src/app/about/page.tsx` (109 lines) | **KEEP-PAYLOAD-RESTYLE, COPY BLOCKED ON AN OWNER DECISION** | The page is structurally fine and its copy is the single largest compliance exposure in the slice. See §5 D1 | 6 `font-serif` retire (`:45, :52, :60, :69, :74, :97`). **6 em-dashes** (`:49, :57, :63, :80, :104` x2 — the highest in the slice and the only file in scope with any), which CLAUDE.md forbids in user-facing copy. **4 US spellings** (`:54 recognize`, `:62 specialize`, `:63 optimization`, and `organiz` in the schema import path is a false positive). The LTA sentence at `:64` ("abolished on 6 April 2024 and replaced by the Lump Sum Allowance and the Lump Sum and Death Benefit Allowance") is **VERIFIED** against `house_positions.md` §2.B — the one house-position claim on the page and it is correct |

---

## 4. Research (brief area B, part 2)

| # | New | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| R12 | `SlimHero` + kit card grid | `src/app/research/page.tsx` (95 lines) | **KEEP-PAYLOAD-RESTYLE** | Research hub. One report card, driven by a literal `reports` array (`:20-36`) plus a dead `void data.headline` at `:38` | 0 `font-serif`. `.hero-brand` (`:43`) retires with the CSS hero. **`text-[var(--copper)]` at `:70` (the 3xl/4xl `£350m` stat) and `:81` (the three highlight figures)** = 3.63 on the `--background` ground. At 3xl the stat clears the 3:1 LARGE-text floor; the `:81` highlights are `text-sm font-bold` and **FAIL**. `rounded-2xl` (`:68`) -> `rounded-xl`. The card is a `<Link>` wrapping an `<h2>` — leave the semantics alone |
| R13 | `<figure>` + `<figcaption>` per DS §0.3, or a kit chart wrapper | `src/components/research/AaIndexCharts.tsx` (356 lines) | **KEEP-PAYLOAD-RESTYLE + ADD AN ACCESSIBLE NAME** | 1 importer (`research/annual-allowance-pension-tax-index/page.tsx`). Colours already ride `--chart-1..5` (`:6-7`), which is the correct pattern and survives the port | **T16 checked and NOT FOUND** (P6): zero `role="img"`, zero `aria-hidden`, zero `aria-label` in this file or in `ui/chart.tsx`. I read the surrounding wrappers before concluding, per the Solicitors lesson. The real defect is the absence: three Recharts SVGs with no accessible name. Give each a `<figure>` with a `<figcaption>` naming series, units and period. The chart-honesty guardrails at `:12-15` (never draw Scheme Pays before 2012/13, never draw NHS past 2021/22, never merge Scheme Pays and SA, never sum AfT + SA) are LAW: a restyle must not touch series composition |
| R14 | Canonical long-form skeleton | `src/app/research/annual-allowance-pension-tax-index/page.tsx` (1,407 lines) | **KEEP-PAYLOAD-RESTYLE, PHASED** | The site's flagship data asset. Too large for one pass; split it in the execution order (§10) | 0 `font-serif`. `text-[var(--copper)]` usages plus `border-[var(--copper)] bg-[var(--copper)]/5` notice cards at `:577, :585, :660` and `:376` — the borders are graphics (PASS) but any copper TEXT inside fails. Hosts a `LeadForm` at `:1382` (R7). **Unsourced-figure check: PASSED** — see §5 D6 |
| R15 | (none, machine surface) | `src/app/research/annual-allowance-pension-tax-index/data/route.ts` (77 lines) | **ADOPT-STANDARD, NO DESIGN CHANGE** | Press-ready CSV of the HMRC series, `force-static` (`:6`), reading the SAME `nhs-aa-index.json` snapshot as the page so the two can never drift (`:11-13`). Exemplary; leave it | Nothing. Guard it (§9.2 G5) |

---

## 5. Legal, and every T18 / T19 finding in the slice (brief areas C + the compliance sweep)

### Disposition rows

| # | New | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| R16 | Canonical legal skeleton | `src/app/privacy-policy/page.tsx` (250 lines) | **KEEP-PAYLOAD-RESTYLE, TWO COPY CORRECTIONS** | The strongest legal page in the estate on this site: it discloses the pool model explicitly, names the 3+3 cap and the six-recipient ceiling (`:141-151`), the 48-hour and 7-day fallbacks (`:152-159`), and the fee (`:160-163`). It matches `site.ts` and the caps in `pool_model_compliance_alignment`. Do not rewrite it | 12 `font-serif` retire. Links `text-[var(--accent-strong)]` = copper-strong #a0622b = **4.91 PASS** — the legal pages are the one place the site already uses the compliant copper. Two corrections: D3 and D5 below |
| R17 | Canonical legal skeleton | `src/app/terms/page.tsx` (135 lines) | **KEEP-PAYLOAD-RESTYLE** | Standard terms of use; §2 (`:45-51`) correctly disclaims advice and disclaims any accountant-client relationship from a form submission, which is exactly right for a lead-gen site | **14 `font-serif` — the highest count in the slice.** `unauthorized` at `:65` -> `unauthorised`. `siteConfig.legalName` is used at `:74, :87, :106` where `siteConfig.company.legalName` is used at `:36`; both resolve to the same string, so cosmetic only |
| R18 | Canonical legal skeleton | `src/app/cookie-policy/page.tsx` (152 lines) | **KEEP-PAYLOAD-RESTYLE, COPY IS WRONG AND MUST BE REWRITTEN** | The T18 page. See D2 | 6 `font-serif` retire. `anonymized` at `:57` -> `anonymised`, if the sentence survives at all |

### D1 — T18, **`/about` describes a practice this site does not run. Highest-severity finding in the slice.**

`/about` is written in the first person as a working accountancy firm with clients:

- `:49` "We built a specialist accounting practice … **our entire client base consists of** GPs, consultants, locum doctors, and medical practice owners."
- `:57` "**Our GP accountants work exclusively with** medical professionals. **Every client is** a GP, consultant, locum doctor, or practice owner."
- `:57` "we've encountered every scenario multiple times"
- `:62` "**You work directly with qualified accountants** who specialize in medical sector accounting."
- `:71` "**Our client base includes** GP partners managing complex partnership structures…"
- `:80` "Every article is … **written by accountants who work with doctors daily**."
- `:63` and `:99` "Fixed-fee pricing with no hidden charges" / "transparent fixed-fee pricing"
- `:99` "You get **direct access to your dedicated GP accountant**"

What the code that runs actually does, traced to the call site: a submitted enquiry is passed to
regulated firms in a partner network. `site.ts:19` (`leadConsentText`): "your details may be
shared with a firm from our specialist partner network **who will contact you**." The privacy
policy says the same at `:127-151` and caps it at six firms. `/thank-you:79` and `/complete:95`
both say "a specialist firm from our partner network will contact you." `niche.config.json`
`partner.name` is the literal string "regulated firms in our specialist partner network".

This is the generalist T18 defect at maximum severity: a page that overstates the relationship,
sitting one click from a privacy policy that discloses the real one. It is also inconsistent with
every other page in the slice. **Copy rewrite is an owner decision, not a port task — gate M-L7.**

### D1b — T18, `/contact` "What happens next?" describes the same non-existent in-house flow

`/contact:87-101`: "1. **We'll** review your enquiry and respond within 24 hours / 2. Brief
introductory call to understand your medical practice structure / 3. Clear recommendations with
**fixed-fee quote if you choose to proceed**", plus `:73` "Use the form to get in touch and
**we will respond by phone or email** within one working day" and `:79` "Within 24 hours,
typically same working day".

The form directly below it (`:112`) renders `leadConsentText`, which says a partner FIRM will
contact you. The two blocks contradict each other on the same viewport. Lower severity than D1
because it is a process description rather than a client-base claim, but it is the same defect
and it sits on the conversion page. Gate M-L7.

### D2 — T18, the cookie policy describes a Universal Analytics site and hides the site's own opt-out

The site runs **GA4** `G-CQF7KFZ1P6`, mounted only through `ConsentedScripts`
(`layout.tsx:114`), which returns `null` when consent state is `denied`
(`packages/web-shared/analytics/react/ConsentedScripts.tsx:24`). Opt-out posture. Storage
prefix `ma`. Against that, `cookie-policy/page.tsx` says:

| line | claim | verdict |
|---|---|---|
| `:44-55` | "Google Analytics sets the following cookies: **`_ga`** … **`_gid`** … **`_gat_gtag_*`**" | **WRONG.** `_gid` and `_gat_gtag_*` are Universal Analytics artefacts. A GA4 property sets `_ga` and `_ga_<MEASUREMENT_ID>`, i.e. `_ga_CQF7KFZ1P6`, which the policy does not list. Two cookies named that are not set; one that is set, unnamed. This is the generalist defect shape exactly |
| `:38` | "**We do not currently use any strictly necessary cookies.** Our Site functions without requiring cookies for basic operation." | **UNDERSTATES.** Literally true about *cookies* and false about the "similar technologies" the same page opens with at `:31`. The site writes at minimum: the consent/opt-out key (`consent.ts:38,77`), `visitor_id` in `localStorage` and `session_id` in `sessionStorage` (`ids.ts:81,105,121,137`), the `visitMemory` set `ma_entry_topic` / `ma_last_topic` / `ma_visits` / `ma_converted` / `ma_booking_nudge` / `ma_booked` (`visitMemory.ts:11-18`), and the interruptive stack's own keys `ma_deepscroll_<topic>` (`DeepScrollModal.tsx:19`), `ma_modal_shown` (`:50-51`), `ma_returning_bar_dismissed` (`ReturningBar.tsx:16`), `ma_sticky_dismissed` (`StickyCTA.tsx:28`), `ma_assistant_autoopened` (`SpecialistWidget.tsx:62`), `ma_assistant_active`. **None is disclosed.** The opt-out key in particular IS strictly necessary |
| `:57` | "IP addresses are anonymized. Data is retained for **14 months**." | **UNVERIFIABLE FROM CODE**, and the phrasing is UA-era (GA4 does not store IP addresses to anonymise). 14 months is a GA4 admin setting no file in this repo sets |
| `:125-133` | The only opt-out offered is Google's browser add-on | **UNDERSTATES.** The site ships its own control: the "Do not track me" footer link (`SiteFooter.tsx:65` -> `ConsentToggle.tsx:30`), which is the mechanism `layout.tsx:86-89` documents as the compliance posture. The page never mentions it |
| — | First-party analytics | **OMITTED ENTIRELY.** Events flow server-side through `/api/track` into Supabase with `visitor_id` and `session_id` attached. The privacy policy lists Supabase for "form submissions" only (`:166`) |

A notice that overstates OR understates is the defect either way. This page does both.
Gate M-L8.

### D3 — T18, the privacy policy describes an interruptive surface that no longer renders

`privacy-policy/page.tsx:67-69`: "when you submit an enquiry (**including through the form that
may appear if you are about to leave a page**)". Exit-intent capture was retired:
`PageShell.tsx:26-28` — "ExitIntentModal retired (confirmed conversion loser); the widget still
sets `ma_assistant_active="1"` on mount, now a harmless no-op." `grep -rn "ExitIntentModal" src
--include=*.tsx` returns the component file and four comments; **zero JSX call sites**. The
clause is describing a dead component. Delete the parenthetical.

### D4 — T18, the privacy policy also **understates one live surface**

The same sentence does not mention the `SpecialistWidget`, which IS mounted site-wide
(`PageShell.tsx:29`), auto-opens once per session 600 ms after landing
(`SpecialistWidget.tsx:62-63`, fired at `:261`), captures email + message, and submits through
`submitMedicalLead` on the same lead path. It is covered generically by "enquiry forms" but the
policy calls out a retired modal by name and not this one. Add it; delete the modal.

### D5 — T18, **`/thank-you` and `LeadForm` name Aswatax while the privacy policy says no firm is named**

`privacy-policy:141-143`: "We work with a network of specialist firms rather than a single firm,
and **we do not name the individual firms on this website**."
`thank-you/page.tsx:108-112` and `:119-123`: "we work closely with **Aswatax**, a firm of
Chartered Tax Advisers. If your enquiry needs that level of advice, **it may be their team who
contacts you**." Same text in the inline success card at `LeadForm.tsx:174-177`.

The Aswatax post-submit intro is deliberate and owner-approved (deployed 2026-09-09 across the
estate, and it is correctly post-submit only, never pre-submit). So the code is right and **the
privacy policy sentence is now false**. Fix the policy, not the post-submit copy. Gate M-L9.

### D6 — Unsourced published figures: **CHECKED, and Medical PASSES**

Solicitors published "26.2% of SRA firm closures" on four pages with no source. Every statistic
in slice 3's scope was grepped and traced:

| figure | where | source | verdict |
|---|---|---|---|
| `£350m` Scheme Pays charges 2023/24 | `research/page.tsx:27, 31` | `src/data/nhs-aa-index.json` -> `hmrc.series`, the same snapshot the `/data` CSV route reads (`data/route.ts:11-13`) | SOURCED, and the label carries "(all UK schemes, **provisional**)" |
| `56,270` SA peak individuals 2021/22 | `research/page.tsx:32` | same snapshot | SOURCED, scope-qualified |
| `46,135` NHS officer members over the allowance 2021/22 | `research/page.tsx:33` | same snapshot, NHSBSA FOI series | SOURCED, jurisdiction-qualified "(England and Wales)" |
| LTA abolished 6 Apr 2024, replaced by LSA / LSDBA | `about/page.tsx:70` | `house_positions.md` §2.B, verified 2026-08-26 at gov.uk | **VERIFIED** |
| `£29 a month` | `contact/page.tsx:52` | `niche.config.json` `cta.variants.packages` | **UNREACHABLE**: gated behind `isPackagesMode(niche)`, which is false. Never renders |
| "Within 24 hours, typically same working day" | `contact/page.tsx:81` | nothing | **UNVERIFIABLE SERVICE CLAIM**, part of D1b |
| "14 months" GA4 retention | `cookie-policy:57` | nothing | **UNVERIFIABLE**, part of D2 |

**No unsourced published statistic. The research figures are traced to a committed snapshot that
the page and the CSV both read, which is a stronger arrangement than a `house_positions` entry.**
Recommendation: add a one-line pointer in `house_positions.md` naming `src/data/nhs-aa-index.json`
as the authority for the AA index series, so a future writer does not re-derive it. Not a blocker.

### D7 — T19, **`leadConsentText` is UNTOUCHABLE, and it is already guarded**

The string is defined at **`Medical/web/src/config/site.ts:19`** and exported at `:63`.
The 2026-08-24 incident on the estate (mini-form leads ~10/wk -> 3.9/wk, reverted `435cc12e`)
was a change to this class of string. It must not change as a side effect of this port.

Consumers, all of which render it verbatim: `LeadForm.tsx:53` and `:385`, `MiniCapture.tsx:32`,
`MedicalHealthCheckWizard.tsx:36` and `:452`, `SpecialistWidget.tsx:328` and `:481`.

**Medical already ships the guard that Solicitors had to add.** `src/lib/leads/lead-payload.test.ts:59`
asserts `expect(siteConfig.leadConsentText).toBe(EXPECTED_CONSENT)` against a verbatim literal,
with `:41` additionally asserting it contains "specialist partner network". Any edit to `site.ts:19`
fails the suite. **Do not weaken, skip or update that test to make an edit pass.** The same file
also pins `consent_text` into the lead payload (`:15-25`), so the audit trail is covered.

### D8 — `site.ts:9` reads `niche.company.registered_office` **UNGUARDED**, where Property guards it

```
Medical  src/config/site.ts:8    const office = niche.company.registered_office;
                            :9-11   [office.line1, office.line2, office.city, office.postcode]
Property src/config/site.ts:23-24  const office = (company.registered_office ?? {}) as Partial<…>
```

This is the exact shape that produced 7 production `client_error` rows on Solicitors. It is a
one-token fix (`?? {}`). The value is consumed by `company.registeredOfficeLine` and rendered on
`privacy-policy:56`, `terms:38` and the footer legal-disclosure line, so a null office takes out
three pages. **Fix it in Phase 1, in the same commit as the token layer.**

---

## 6. Interruptive stack (brief area D) — RESTYLE ONLY

**Standing rule for every row in this section (standard terms §7).** Adding an interruptive
surface, or changing an existing one's trigger, timing, cadence, audience or suppression, is a
hard owner gate. Slice 3 proposes **none**. Every threshold below is recorded from the code as
the thing the port must leave byte-identical in behaviour. Restyle changes colour, radius,
typeface and box model. It changes nothing in this table.

| # | Surface (file:line) | Trigger | Timing / threshold | Cadence + suppression | Audience gate | Verdict |
|---|---|---|---|---|---|---|
| D-1 | `intent/IntentProvider.tsx` (154 lines), mounted `layout.tsx:118` | Context provider, no surface of its own | Polls `getMaxScrollPct()` / `getEngagedMs()` every **1500 ms** (`:86-94`) | n/a | Inactive when consent `denied`, or path starts `/embed` or `/admin` (`:73-77`) | **KEEP-PAYLOAD-RESTYLE** (no visual surface; do not touch) |
| D-2 | `intent/DeepScrollModal.tsx` (140 lines), mounted `layout.tsx:118` | Deep scroll on a topic page | Fires at **`scrollPct >= 70`** (`engine.ts:60` `SCROLL_MODAL_PCT`, tested at `:170`) | **One per session** (module flag `shownThisSession`, `:37, :45, :54`) AND a **30-day per-topic** suppress (`:18` `SUPPRESS_DAYS`, key at `:19`) AND a **shared one-modal-per-session cap** with the retired ExitIntentModal via `sessionStorage["ma_modal_shown"]` (`:50-51`) | Never if `ctx.converted` (`engine.ts:169`); needs a resolved topic | **KEEP-PAYLOAD-RESTYLE.** `rounded-2xl` -> `rounded-xl`; `bg-[var(--copper)]` + white label at `:122` = **3.79 FAIL** -> `--btn-ground`; `text-[var(--copper-strong)]` eyebrow at `:109` = 4.91 PASS on white |
| D-3 | `intent/ReturningBar.tsx` (79 lines), mounted `layout.tsx:117` | Returning visitor lands | No time or scroll threshold: renders as soon as the rule resolves | Dismissed -> `sessionStorage["ma_returning_bar_dismissed"]` for the rest of the session (`:16, :25, :64`) | Only if `ctx.returning` AND NOT `ctx.converted` (`engine.ts:178-179`); needs `lastTopic ?? entryTopic` | **KEEP-PAYLOAD-RESTYLE.** Ground is `bg-[var(--navy)]` (white text 17.15 PASS). `bg-[var(--copper)]` + white label at `:54` = **3.79 FAIL** -> `--btn-ground`. Close button `text-white/60` on navy is a graphic |
| D-4 | `intent/NextStepOffer.tsx` (47 lines) | In-flow, end of blog content (`BlogPostRenderer`) | None — renders whenever `useIntent("next_step")` resolves | None (in-flow card, not interruptive) | Needs `pageTopic ?? entryTopic` (`engine.ts:160-166`) | **KEEP-PAYLOAD-RESTYLE.** `rounded-full` button at `:41` -> `rounded-xl`; `bg-[var(--copper)]` white label = **3.79 FAIL**; `text-[var(--copper-strong)]` eyebrow at `:31` = 4.91 PASS |
| D-5 | `ui/StickyCTA.tsx` (186 lines), mounted `PageShell.tsx:25` | Scroll | Visible at **`min(500px, 25% of scrollHeight)`** (`:29` `SCROLL_THRESHOLD`, applied `:74-77`). Property's is 30%; Medical's 25% is **FROZEN**, do not align | Dismissed -> `sessionStorage["ma_sticky_dismissed"]` for the session (`:28`) | Hidden on `/admin`, `/embed`, and on `/pricing` in packages mode (`:90-94`); hidden if `isConverted()` (`:98, :110`) | **KEEP-PAYLOAD-RESTYLE.** Navy ground, white text, PASS. Its button is `btnPrimary` (`:162`) so it inherits the ground fix. `data-cta="sticky_cta"` KEEPS its id |
| D-6 | `support/SpecialistWidget.tsx` (540 lines), mounted `PageShell.tsx:29` | Auto-open, then an escalating cadence, then exit and friction | **Auto-opens ONCE per session at 600 ms** after landing (`:63` `AUTO_OPEN_DELAY_MS`, fired at `:261`; key `ma_assistant_autoopened` at `:62, :223, :231`). Then peeks at **30 s / 70 s / 120 s / 180 s** of VISIBLE page time (`:60` `CADENCE_THRESHOLDS_MS`, "verbatim from Property/Dentists"). Fires **instantly on exit-intent and on form friction** (`Trigger = "cadence" \| "exit" \| "friction"`, `:52`) | Never repeats a line verbatim (`:115`); stops the moment the visitor engages (`engagedRef`, `:99`) | Suppressed if `isConverted()` (`:91`); no-op in `/embed` and `/admin` via the intent context | **KEEP-PAYLOAD-RESTYLE.** All four thresholds and the 600 ms auto-open are FROZEN. `bg-[var(--copper)]` with white text at `:395` and `:407` = **3.79 FAIL**; `:372` is an icon disc (graphic, PASS). Uses `leadConsentText` at `:328, :481` — T19 applies. Its file header (`:11`) already documents "no `var(--primary)`, no `orange-*`, no `emerald-*`" — honour that constraint through the restyle |
| D-7 | `blog/ExitIntentModal.tsx` (186 lines) | — | — | — | — | **RETIRE (§7).** Zero JSX importers. Retired as a confirmed conversion loser (`PageShell.tsx:27`). It is the subject of the false privacy-policy clause in D3 |

---

## 7. Machine surfaces (brief area E)

| # | New | Replaces (file:line) | Verdict | Why | Adaptation |
|---|---|---|---|---|---|
| R19 | (none) | `src/app/sitemap.ts` (170 lines) | **ADOPT-STANDARD, NO DESIGN CHANGE** | Enumerates statics (`:45-56`) and `/resources/<slug>` from `publishedGuideTopics()` (`:157-159`) | **One change when `/resources` ships**: the index route is absent today because the page is absent. Add `/resources` in the SAME commit as the page, never before |
| R20 | (none) | `src/app/robots.ts` (121 lines) | **ADOPT-STANDARD, ONE CORRECTION** | Per-bot allow/disallow including a training-bot block (`:51-52`, `:111`) | `disallow = ["/api/", "/thank-you"]` (`:20`). **`/admin` and `/embed` are NOT disallowed.** `/book` and `/complete` are protected by route-level `robots: {index:false}` metadata, but `/admin/analytics/*` has **no `robots` export at all** (`grep -n robots src/app/admin/analytics/page.tsx` = 0 hits) and is not in the robots.txt disallow list. Add `/admin` and `/embed` to `:20`. Small, real, and not a design change |
| R21 | (none) | `src/app/feed.xml/route.ts` (28 lines) | **ADOPT-STANDARD, NO CHANGE** | Delegates to the shared `buildFeedRoute`; carries a FLAT-routing note (`:19-21`) that matters because Medical's blog is flat | Nothing |
| R22 | (none) | `src/app/llms-full.txt/route.ts` (23 lines) | **ADOPT-STANDARD, NO CHANGE** | Delegates to the shared `buildLlmsFullRoute` | Nothing. Its header text ("all figures use current UK rates") is a standing claim the corpus programme owns, not this port |
| R23 | Kit error/empty state | `src/app/not-found.tsx` (20 lines) | **KEEP-PAYLOAD-RESTYLE** | 404 page, no importers by design | 1 `font-serif` (`:9`) retires. `btnPrimary` inherits the ground fix |
| R24 | Kit error state | `src/app/error.tsx` (72 lines) | **KEEP-PAYLOAD-RESTYLE + ONE COPY FIX** | Route error boundary | 1 `font-serif` (`:31`) retires. The `red-100`/`red-600` warning disc (`:24-25`) is the ONE place M-W1 step 1 applies naturally. `rounded-lg` -> `rounded-xl`. **T18: `:36` says "This has been logged and we'll look into it" — `:15-17` only calls `console.error` when `NODE_ENV === 'development'`, so in production nothing is logged anywhere.** Either wire a real sink or soften the sentence |
| R25 | (none) | `src/app/global-error.tsx` (90 lines) | **KEEP-PAYLOAD-RESTYLE, LOW PRIORITY** | Root boundary; renders its own `<html>`/`<body>` so it must be inline-styled and cannot use the token layer | Same false "logged" posture is absent here (good). Its inline `#1e3a8a` button and `#0f172a` heading are hard-coded and do NOT match the Medical brand (`#001b3d` navy). Update the literals; do not try to tokenise this file |
| R26 | (none) | `src/app/admin/analytics/**` — `page.tsx` 816, `visitor/[visitorId]/page.tsx` 316, `leads/page.tsx` 126, `visitor/[visitorId]/VisitorTabs.tsx` 105, `trends/page.tsx` 103, `login/page.tsx` 62, `checkAuth.ts` 24 (**1,552 lines**) | **KEEP-PAYLOAD-RESTYLE, LAST, OR SKIP** | In-app console. **No Property equivalent** (the estate console lives at `console/web`). Login-gated (`checkAuth.ts`), holds most of the site's `rose-*`/`amber-*` usages as metric signals | Not a brand surface. It should NOT be swept by the ramp change: its colour vocabulary is data-signal, not brand. Recommend a recorded deviation and no work in this port. Add `robots: {index:false}` (see R20) |

---

## 8. The brand layer

The full derivation, the measured contrast table with two worked calculations, the instrument
self-test (which again caught appendix N's wrong slate-400 value: spec 2.51, truth **2.5640**),
the ramp registry and the appendix-K state all live in **`docs/medical/DESIGN_DELTA.md`**.

The four numbers that decide the port:

| | value | consequence |
|---|---|---|
| copper `#b87333` on white | **3.79** | Fails the 4.5:1 text floor. Cannot be a button ground or a text colour on light |
| amber-600 `#d97706` (the ramp's 600 step) | **3.19** | Fails. Triggers Property's shift-to-700 rule |
| **chosen button ground `#a0622b`** (the site's own `--copper-strong`) | **4.91** | PASSES. Smallest visible change that clears the floor; alternative amber-700 `#b45309` = 5.02 |
| copper `#b87333` on navy `#001b3d` | **4.52** | PASSES. Copper is legal as text on navy and illegal as text on white. That inversion is the shape of the whole delta |

M-W1 warning ladder: **red-600 `#dc2626` (4.83) -> purple-700 `#7e22ce` (6.98) -> indigo-700
`#4338ca` (7.90)**, on-dark red-400 (6.20) / purple-400 (6.49) / indigo-400 (5.75). Off copper,
off amber, off orange, and it collides with no ported sibling's ladder beyond one shared step in
a different position.

---

## 9. Instrumentation and guard tests

### 9.1 `data-cta` source census — **19 distinct ids. Propose ZERO renames.**

Derived with `grep -rhno 'data-cta="[^"]*"' src`. This is the **source-side** inventory only;
which ids actually fire is the FUNNEL_BASELINE agent's pull and is deliberately not duplicated
here.

| id | file:line | placement attr | goal attr | in slice 3 | note |
|---|---|---|---|---|---|
| `hero_primary` | `page.tsx` | `hero` | — | no | |
| `hero_secondary` | `page.tsx` | `hero` | — | no | |
| `home_cta_primary` | `page.tsx` | `home_cta` | — | no | |
| `home_cta_secondary` | `page.tsx` | `home_cta` | — | no | |
| `header_nav_secondary` | `SiteHeader.tsx` | `header` | — | no | |
| `header_mobile_secondary` | `SiteHeader.tsx` | `header_mobile` | — | no | |
| `nav-book-call` | `SiteHeader.tsx` | — | `contact` | no | **kebab-case**, the estate mixes both |
| `mobile-nav-book-call` | `SiteHeader.tsx` | — | `contact` | no | kebab-case |
| `sticky_cta` | `StickyCTA.tsx:155` | `sticky` | conditional `form` | **yes** | |
| `specialist_widget` | `SpecialistWidget.tsx:519` | — | — | **yes** | |
| `deep_scroll_modal` | `DeepScrollModal.tsx:116` | — | conditional `form` | **yes** | |
| `deep_scroll_close` | `DeepScrollModal.tsx:102` | — | — | **yes** | Solicitors kept the same non-canonical spelling for analytics continuity; do the same |
| `returning_bar` | `ReturningBar.tsx:51` | — | conditional `form` | **yes** | |
| `returning_bar_close` | `ReturningBar.tsx:61` | — | — | **yes** | |
| `next_step` | `NextStepOffer.tsx:38` | — | conditional `form` | **yes** | |
| `cta-section-primary` | `CTASection.tsx:45` | — | — | **yes** | kebab-case; 6 importers |
| `thankyou-return-article` | `thank-you/page.tsx:199` | `thank_you` | — | **yes** | kebab-case |
| `contact_pricing_link` | `contact/page.tsx:55` | `contact` | — | **yes** | **DEAD BY CONSTRUCTION**, see below |
| `see_result` | calculator surface | `calculator` | — | no (slice 2) | |

Attribute totals: 19 `data-cta`, **8 `data-cta-placement`**, **3 `data-cta-goal`** (2 `contact`,
1 `form`).

**Findings.**

1. **`contact_pricing_link` can never fire.** It sits inside `isPackagesMode(niche)`
   (`contact/page.tsx:49`), and `niche.config.json` sets `cta.variant = "leadgen"`, so the branch
   is dead. Its `href` is `/pricing`, and `src/app/pricing/` does not exist, so if the flag ever
   flipped the id would fire onto a 404. Do not delete the id; note it and leave the branch.
2. **The funnel cannot see large parts of itself.** Routes with **zero** `data-cta` ids anywhere:
   `/about`, `/research`, `/research/annual-allowance-pension-tax-index`, `/resources/[topic]`,
   `/book`, `/complete`, `/privacy-policy`, `/terms`, `/cookie-policy`, `/free-practice-health-check`.
   The prominent unwired CTAs are `resources/[topic]/page.tsx:156` (the guide's end CTA, a live
   public route), `about/page.tsx:102` (inherits `cta-section-primary` from `CTASection`, so this
   one IS covered), and the **`LeadForm` submit button itself** (`LeadForm.tsx:401-407`), which
   carries no `data-cta` — form submits are measured through `useFormTracking`, so this is a
   different pipe, not a gap. Recommend adding ONE id, `resources_guide_cta`, at
   `resources/[topic]:156`, as an ADDITION (no rename, no baseline restatement needed).
3. **Zero renames proposed.** `vw_cta_performance` continuity beats spelling conformity. Standing
   rule restated: **never rename or delete a `data-cta` id without restating the deploy-watch
   baseline in the SAME commit.**

### 9.2 Guards the port must add

**Hard constraint discovered (P8):** `vitest.config.ts` sets `environment: "node"` and
`include: ["src/**/*.test.ts", "scripts/**/*.test.ts"]`. No `.tsx`, no DOM, no
`@testing-library`. Every guard below is therefore either a **plain-`.ts` assertion** or a
**source-text scan**, which is the lazy shape anyway and needs no new dependency.

| id | guard | shape | why |
|---|---|---|---|
| **G1** | `leadConsentText` verbatim | **ALREADY EXISTS** at `src/lib/leads/lead-payload.test.ts:59`. Do not touch it. Add a one-line comment at `site.ts:19` pointing at the test | T19. The 2026-08-24 incident |
| G2 | No `text-[var(--copper)]` or `bg-[var(--copper)]`-with-white-label survives outside a graphics context | source scan over `src/**/*.tsx`, allowlist for `outline-`, `border-`, `stroke-`, `/5`, `/10`, `/20` | The 3.79 defect must not creep back |
| G3 | Contrast floors | a `src/tests/contrast.test.ts` holding the WCAG luminance function, the token table, and the two reference pairs (slate-500 = 4.7588, slate-400 = 2.5640) as a self-test that runs FIRST | Appendix N shipped a wrong value twice. Never trust a documented ratio |
| G4 | No `font-serif` / `display-serif` / `--font-cormorant` / `Cormorant_Garamond` anywhere in `src` | source scan, expected count 0 | Owner decision 2; 131 occurrences must go to 0 and stay there |
| G5 | `/research/.../data` CSV header and row count match the snapshot the page renders | plain `.ts` test importing both | The two-readers-one-snapshot invariant at `data/route.ts:11-13` is the reason the asset is trustworthy |
| G6 | `site.ts` survives a missing `registered_office` | plain `.ts` test | D8; the Solicitors `client_error` incident |
| G7 | Interruptive-stack constants are frozen | plain `.ts` test asserting `SCROLL_THRESHOLD === 500`, `SCROLL_MODAL_PCT === 70`, `SUPPRESS_DAYS === 30`, `AUTO_OPEN_DELAY_MS === 600`, `CADENCE_THRESHOLDS_MS` deep-equals `[30000, 70000, 120000, 180000]` | Standard terms §7. A restyle must not move a threshold. Requires exporting four constants that are currently module-private — the only production change any guard asks for |
| G8 | `data-cta` id set is stable | source scan producing the sorted 19-id list, asserted against a committed fixture | Renames must be deliberate and paired with a baseline restatement |
| G9 | Cookie-policy cookie names match the analytics that runs | source scan asserting `cookie-policy/page.tsx` names `_ga` and `_ga_<id>` and does NOT name `_gid` or `_gat_gtag` | D2. Cheap, and it is the exact generalist defect |
| G10 | `globals.css` has no BOM and no mojibake | byte scan | Facts 2 |

`src/tests/intent-engine.test.ts` already exists and covers the rule engine. Extend it for G7
rather than adding a file.

---

## 10. Retirement and delete list (importer counts grep-verified 2026-09-10, retirements go LAST)

| target | role, derived from its importers | deriving command | disposition |
|---|---|---|---|
| `src/components/blog/ExitIntentModal.tsx` (186 lines) | **None.** Zero JSX importers; four stale comment references | `grep -rn "ExitIntentModal" src --include=*.tsx` | **RETIRE (delete).** Retired in behaviour already (`PageShell.tsx:27`). Delete the component, the four comments, and the privacy-policy clause it justified (D3), in one commit |
| `.display-serif` (`globals.css:159-163`) + `--font-serif` (`:70`) + `--font-cormorant` | Serif heading face | `grep -rno "display-serif\|font-serif" src` = 131 across 29 files | **RETIRE.** Owner decision 2 |
| `Cormorant_Garamond` import + loader + `${cormorant.variable}` | `layout.tsx:2, :23-27, :80` | read | **RETIRE.** Removes a webfont from every page's critical path |
| `.hero-brand` + `::before` + `::after` (`globals.css:106-135`) | Navy gradient, two radial copper glows, white gridline data-URI | `grep -rn "hero-brand" src` | **RETIRE**, replaced by a flat navy ground + `MedicalBackdrop.tsx` |
| `.btn-primary` / `.btn-secondary` CSS classes (`globals.css:189-209`) | **ZERO consumers.** `grep -rn 'className="btn-primary"' src` = 0; same for `btn-secondary`. The real buttons are the TS constants in `layout-utils.ts` | `grep -rn "btn-primary\|btn-secondary" src` | **RETIRE.** Same dead-weight class as Solicitors' `.btnPrimary` |
| `.card` (`globals.css:211-223`), `.stat-number` (`:225`), `.section-alt` (`:231`), `.trust-icon` (`:236`), `.medical-badge` (`:448`), `.medical-highlight` (`:460`) | Pre-redesign recipes | per-class `grep -rn '<class>' src --include=*.tsx`, run 2026-09-10: `btn-primary` **0**, `btn-secondary` **0**, `stat-number` **0**, `section-alt` **0**, `trust-icon` **0**, `medical-badge` **0**, `medical-highlight` **0**, `card"` **1**, `hero-brand` **3** | **RETIRE all seven zero-consumer classes.** `.card` has ONE consumer and `.hero-brand` has three, so both are ported first and retired after. Re-run each grep on the day: the Solicitors run found `.btnMailOutline` had 2 consumers after its brief listed it as dead |
| `--medical-teal`, `--medical-teal-dark`, `--coral`, `--coral-strong`, `--gold`, `--gold-strong`, `--gold-soft` (`globals.css:45-51`) | Legacy aliases from the pre-navy teal/coral brand. `--coral` is LIVE at `/contact:54,89,93,97`; `--medical-teal` is LIVE at `/contact:54,85,121,127,133,139` and in `.prose-blog` (`globals.css:304, 360, 425, 471`) | `grep -rn "medical-teal\|--coral\|--gold" src` | **RETIRE, AFTER their consumers are ported.** Retirements last (§11) |
| `--primary`, `--primary-soft`, `--primary-light` (`globals.css:36-38`) | Alias `--navy`, and they are the reason two files carry "no `var(--primary)`" hardening comments | `grep -rn "var(--primary" src` | **RETIRE** once the ramp lands and `--brand-primary` is the only brand token |
| `void data.headline;` (`research/page.tsx:38`) | Dead statement suppressing an unused-var warning | read | **RETIRE.** One line |
| UTF-8 BOM (`globals.css:1`) + mojibake (`:7`, `:9`, `:105`, `:138`) | None | `head -c3 \| xxd` | **RETIRE** |
| Mojibake in `niche.config.json` | `cta.variants.*` copy carries `Â£` (double-encoded pound) and `â€"` (em-dash) inside `packages` AND inside the LIVE `leadgen.home_cta.body` | `python -c "json.load(...)"` | **OUT OF SLICE 3'S SCOPE** (homepage copy = slice 1/2), flagged here because I found it. Confirms the standing trap: the pound sign is stored as an escape, so a literal `£` grep misses it |
| `brand.primary_color` / `seo.theme_color` = `#0891b2` | Cyan, rendered live as the browser theme colour at `layout.tsx:35` | read | **RECONCILE to `#b87333`**, per owner decision 1. Config follows the CSS, never the reverse |

---

## 11. Owner gates registered by this slice

| gate | class | ask |
|---|---|---|
| **M-L1** | BLOCKER, blocks Phase 1 | **Button ground moves off the live brand hex.** Copper `#b87333` measures **3.79** with a white label and amber-600 measures 3.19; both fail 4.5:1. Recommend `--btn-ground: #a0622b` (4.91), the site's own `--copper-strong`. Alternative: amber-700 `#b45309` (5.02). Copper stays the brand and stays on graphics, icons, focus rings and on-navy text (4.52) |
| **M-L2** | BLOCKER, blocks Phase 1 | **Dark ground stays navy `#001b3d`, not Property's slate-900.** Navy is the brand's primary identity colour and out-contrasts slate-900 in every pairing measured |
| **M-L3** | BLOCKER, blocks Phase 1 | **Primary ramp = amber**, warning ladder = **M-W1** (red-600 / purple-700 / indigo-700). Swatch sign-off |
| **M-L4** | BLOCKER, blocks Phase 1 | **Wordmark**: icon `Stethoscope` (fallback `HeartPulse`), line2 "SPECIALIST ACCOUNTANTS" |
| **M-L5** | BLOCKER, blocks Phase 1 | **Backdrop motif**: ECG rhythm strip on chart paper, at Property's exact appendix-E geometry and mask recipe |
| **M-L6** | BLOCKER for config hygiene | Reconcile `niche.config.json` `brand.primary_color` and `seo.theme_color` from the stale `#0891b2` cyan to `#b87333`. `theme_color` is live browser chrome today |
| **M-L7** | BLOCKER for copy, NOT for the port | **`/about` and `/contact` describe an in-house practice with clients and fixed-fee engagements, against a privacy policy and a consent notice that disclose a partner-network handoff to up to six firms.** Owner decides the rewrite. The port can ship the restyle without it, but should not, because the restyle draws the eye to the page |
| **M-L8** | BLOCKER for copy | **Cookie policy is wrong in four places** (UA cookie names on a GA4 site; "no strictly necessary cookies" against ~12 disclosed-nowhere storage keys; an unverifiable 14-month/IP-anonymisation claim; the site's own opt-out control undisclosed). Owner approves the rewrite |
| **M-L9** | BLOCKER for copy | Privacy policy `:141-143` says "we do not name the individual firms on this website"; `/thank-you` and `LeadForm` name **Aswatax**. The naming is owner-approved and correct; **fix the policy sentence** |
| M-L10 | COSMETIC, no gate needed | `/about` carries 6 em-dashes (the only file in scope with any) and 4 US spellings; `/terms:65` `unauthorized`; `/cookie-policy:57` `anonymized` |
| M-L11 | INFO, decision recorded | `/admin/analytics/**` (1,552 lines) is exempted from the ramp sweep as a login-gated console with no Property equivalent. It gains `robots: {index:false}` and a `/admin` disallow in `robots.ts:20` |
| M-L12 | INFO | `/resources` index is a live 404 and is NET-NEW. Its sitemap entry ships in the same commit as the page, never before |

---

## 12. Slice 3 execution order (guards green at every step; retirements LAST)

1. **Phase 1 prerequisites, one commit.** Add the shadcn token layer + `components.json`; add
   `--radius` / `--radius-xl` / `--btn-radius`; add `--btn-ground` / `-hover` / `-active`; import
   `globals-standard.css`; strip the BOM and mojibake; **fix `site.ts:8` with `?? {}` (D8)**;
   reconcile `niche.config.json` (M-L6). Land **G3** (contrast, with its self-test), **G6** and
   **G10** in the same commit. Gates M-L1/M-L2/M-L3 must be approved before this commit.
2. **Typeface.** Drop Cormorant; retire all 131 serif usages across 29 files; land **G4**. No
   colour changes in this commit, so a regression is attributable.
3. **Buttons and radius.** `layout-utils.ts:20,24,28` to the A.5 box model and the new ground;
   the `rounded-full`-on-buttons sweep (leaving genuine circles). Land **G2**.
4. **Legal x3.** R16/R17/R18 restyle. Copy corrections D2/D3/D4/D5 only if M-L8 and M-L9 are
   approved; otherwise restyle only and leave the copy exactly as it is. Land **G9**.
5. **Contact + post-submit.** R1-R4, R8, R9, R10, then **R5 `LeadForm` LAST and alone**, with
   **G1 green before and after**. Re-measure R7's eleven grounds either side.
6. **About.** R11 restyle. Copy blocked on M-L7.
7. **Research.** R12, then R13 (add the `<figure>`/`<figcaption>` names), then R14 in three
   passes (hero and intro; the chart and table sections; the methodology, sources and the
   `LeadForm` block). Land **G5**.
8. **Resources.** R-topic restyle; add `data-cta="resources_guide_cta"` at
   `resources/[topic]:156`; then the NET-NEW `/resources` index plus its `sitemap.ts` entry, in
   one commit (M-L12).
9. **Interruptive stack.** D-2 through D-6, restyle only. Export the four frozen constants and
   land **G7** BEFORE touching any of the five components.
10. **Machine surfaces.** R19-R25. Fix `robots.ts:20`; fix the false "logged" claim at
    `error.tsx:36`; update `global-error.tsx`'s hard-coded hexes.
11. **`/admin`**: no work (M-L11), except the `robots` export.
12. **Retirements, last.** The full §10 list, each preceded by its own consumer grep re-run on the
    day. Land **G8** with the final `data-cta` fixture.
