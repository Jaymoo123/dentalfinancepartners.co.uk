# M1a receipt — pre-build wiring mop-up (pharmacies design port, phases 2 to 6)

Agent: M1a (Opus). **No subagents launched. No `next build`, no dev server
started or stopped (the stale build on :3111 was left alone). No git command of
any kind.** Nothing under `packages/**` or `Property/**` was written;
`Property/web/src/components/forms/LeadForm.tsx` was read only.

Read first: `M1_INPUT.md`, then `W7_RECEIPT.md`, `G1_R1_GAPFIX_RECEIPT.md`,
`G2_GLOBALS_FIX_RECEIPT.md`, `G3_GROUNDS_FIX_RECEIPT.md`, `K9_RECEIPT.md`,
`W4_RECEIPT.md` §7, `W5_RECEIPT.md` §9, `W6_RECEIPT.md` §6.

## 0. Reconciliation of M1_INPUT against the four receipts it was compiled without

`M1_INPUT.md` was written before W7/G1/G2/G3 landed and says so. Those four
receipts close five of its rows:

| M1_INPUT row | status now | closed by |
|---|---|---|
| M13 (B1, skip-link focused ground under the 4.5 floor) | **CLOSED** | `G2_GLOBALS_FIX_RECEIPT.md` fix 1, applied in `globals.css` |
| M15 (S1, 11 sub-floor focus rings on `/`) | **CLOSED in source** | `G1` fix 1 — all three dark homepage bands already carry `.ground-dark`; the 11 rings R1 measured are a property of the stale 11:44 build. Still unverified in a render; that is a V-row, not a wiring row |
| M16 (S4, sticky bar covering the footer consent control) | **CLOSED** | `W7_RECEIPT.md` §7 — `IntersectionObserver` on `footer`, bar retreats |
| M17 (S5, thin 5-column footer, `/for` absent) | **CLOSED** | `G1` fix 2 — footer-only nav override in `PageShell.tsx`, 9 links to 27 |
| M18 (B2, grounds regression, darkOnDark on 17 routes) | **CLOSED** | `G3_GROUNDS_FIX_RECEIPT.md` |
| M02/M03/M04 (`NextStepOffer` mounts, "blocked on W7") | **unblocked** | W7 built the component and re-derived the targets in its §15 |

Nothing in those four receipts closes M01, M05, M06, M07, M08, M09, M10, M11,
M12, M14, M19, M20.

---

## 1. M01 — `buildBlogPostingJsonLd` wired. DONE

`pharmacies/web/src/app/blog/[category]/[slug]/page.tsx`
- `:5` — `buildBlogPostingJsonLd` added to the existing `@/lib/schema` import.
- `:193-211` — the block, immediately after the `{post.schema && ...}` block,
  exactly where K9 §2 said to put it.

**Field names confirmed, not assumed.** `src/lib/blog.ts:21-22` is
`date: fm.date!` and `updatedDate: fm.updatedDate` (optional). So
`post.date` / `post.updatedDate` are the real names on this site's `BlogPost`,
and `dateModified: post.updatedDate || post.date` is right. Property's
`dateModified` name does **not** apply here, which is the thing K9 told M1 to
check.

**Exactly one `BlogPosting` per post, and no duplicated Article block:**
- the new block is gated `!post.schema`, the mirror of the existing
  `post.schema` gate above it, so the two can never both emit. Zero of the 22
  posts carry a `schema:` frontmatter field, so in practice every post emits the
  new block and none emits the opt-out.
- `grep -c BlogPosting` over `src/app` = 1 call site.
- `buildArticleJsonLd` (`lib/schema.ts:101`) has **no consumer on this route** —
  its live consumers are the two research pages. No Article block is built on a
  blog post, before or after this edit, so nothing is duplicated.
- `headline: post.h1` and the template renders `{post.h1}`, so W2's acceptance
  (headline byte-identical to the visible h1 on all 22) holds by construction.

## 2. M02 / M03 / M04 — `NextStepOffer` mounted, three pages, one mount each. DONE

Lines re-derived by me against the working tree (the files have moved again
since W7 wrote its §15, because my own M01 edit added 19 lines to the blog
template before this one).

| file | import | mount | position |
|---|---|---|---|
| `src/app/blog/[category]/[slug]/page.tsx` | `:16` | `:345` | after the Related-reading block, before the `<style>` tag, **inside** the content column |
| `src/app/services/[slug]/page.tsx` | `:16` | `:259` | after the FAQ band, before the closing `LeadCTAPanel` comment block |
| `src/app/for/[slug]/page.tsx` | `:16` | `:160` | **above both branches** of `hub.noLeadForm`, before the `!hub.noLeadForm` block |

Mount shape, per W7 §15 and §6:
- **One per page**, below the main content, before the closing `LeadCTAPanel`.
- `"use client"`, no props, `import { NextStepOffer } from "@/components/intent/NextStepOffer";`.
- **Kit suppression respected without any work here.** The card calls
  `useIntent("next_step")` and returns null when the kit `IntentProvider`
  (mounted by W7's `SupportProvider` in `layout.tsx`) yields no context — which
  is what happens on `/embed`, on `/admin`, and when consent state is `denied`
  (kit `IntentProvider.tsx:47-48`) — and null again when there is no topic or
  the visitor has converted.
- **Carries its own `data-cta`.** Already in W7's component at
  `NextStepOffer.tsx:43-45`: `data-cta="next_step"`,
  `data-cta-placement="next_step"`, and a `data-cta-goal` of `"form"` when the
  offer href starts `/contact`. Nothing added by me; it is a new surface, so the
  goal is correct per owner question 4.

**Two deliberate deviations from W7's literal targets, both for layout:**

1. **Blog:** W7 pointed at the comment block that introduces the closing
   `LeadCTAPanel`, which sits **outside** the page's grid container. The card is
   an `aside` with no container of its own, so mounted there it would run
   full-bleed across the viewport. It is mounted one level in, inside
   `<div className="min-w-0 max-w-3xl lg:order-1">` — which is W2's own original
   target ("after `RelatedArticles` close, before the `<style>` tag"). Same
   position in the reading order, correct measure.
2. **Services and `for`:** same problem, same reason — those two mounts are
   wrapped in `<div className={siteContainerLg}>`, the container every other
   band on those pages uses.

**`for/[slug]` and `noLeadForm`:** mounted above both branches, which is what
W7 asked for, and it does **not** add a capture surface to a flagged hub: the
card holds no form, no field and no submit. It renders a heading, a sentence and
one link to either a calculator or `/contact`. (No record in
`src/data/pharmacies-hubs.ts` sets the flag today, so all 5 live URLs render the
false branch regardless.)

## 3. M05 — `data-cta` on enquiry-form submit buttons. DONE on the two enquiry forms, SKIPPED on the two post-submit forms

Attribute vocabulary checked, not guessed. `Property/web/src/components/forms/LeadForm.tsx`
carries **no** `data-cta` at all (`grep` = 0), so the convention was taken from
what the estate actually emits:
`grep -rhno 'data-cta-goal="[a-z_]*"' packages Property generalist` returns
**`form` 76, `pricing` 3, `contact` 1**. There is **no `enquiry` goal anywhere in
the estate**, so W6's suggested `data-cta-goal="enquiry"` was **not** used — it
would have minted a one-off value on a 19-site shared dimension. Both new
buttons carry `data-cta-goal="form"`.

| file:line | id | goal | placement |
|---|---|---|---|
| `src/components/forms/LeadForm.tsx:438-439` | `lead_form_submit` | `form` | **none, deliberately** |
| `src/components/calculators/MiniCapture.tsx:213-214` | `mini_capture_submit` | `form` | **none, deliberately** |

- Both are on the `type="submit"` `<button>` itself. Neither is on a wrapper
  `div`. W6's suggested ids were kept verbatim.
- **No placement attribute on either, and this is a decision.** `LeadForm` is
  mounted on `/contact`, `/book`, the blog closing panel, the services panel,
  the hub panel and the `/calculators` panel. One literal placement string would
  be wrong on five of six surfaces. Placement is a dimension the site already
  fills correctly on link CTAs where the surface is fixed; a submit button
  inside a reusable form has no fixed surface, so the attribute is left absent
  rather than filled with a lie. (If the owner wants it, the clean shape is a
  `placement` prop on `LeadForm` set by each of the six call sites — a six-file
  edit, not a mop-up.)

**SKIPPED, with W6's reason:** `src/components/forms/DetailsForm.tsx:193` and
`src/components/forms/BookingPicker.tsx:154`. Neither is an enquiry form. Both
are **post-submit completion** surfaces reached only from `/thank-you` /
`/complete` after a lead already exists ("Save my details", the booking
confirm). Tagging them would put enquiry-shaped ids on a funnel stage that is
not enquiry. W6 recommended leaving them untagged and I agree. No other form is
named in W6's receipt: `packages/web-shared/leads/` holds MiniCapture,
CalcResultCta, MobileToolSlot, ResultGateModal and capture-steps and nothing
else, and the kit forms are out of lease.

**The three existing ids are byte-identical.** `header_contact` (1 hit,
`PageShell.tsx:155`) and `sticky_cta` / `sticky_cta_close` (4 hits,
`StickyCTA.tsx`) are in untouched code. No id renamed, none removed.

## 4. M06 — `calc_index_help`. DONE, and it needed NO new config string and NO authored copy

W4 declined the id because the only control it could sit on is an anchor to the
closing panel, and `/calculators` published no link label for one — so emitting
it meant authoring a sentence or hanging the id on a `<div>`.

**It does publish a label, one file over.** `src/lib/calculators/site.ts:36`
already exports `CALC_CAPTURE_HEADING = "Check your position with a pharmacy
finance specialist"` — the sentence this subsystem publishes under every
calculator result **and** the `title` of the very panel the anchor jumps to. So
the label and its destination read the same words, and the brief's fallback
(author a plain firm-voice sentence) was not reached. **Zero new config strings.
Zero authored copy. Nothing for the owner to review in this item.**

`pharmacies/web/src/app/calculators/page.tsx`
- `:8` — `focusRing` imported from `@/components/ui/layout-utils`.
- `:75-89` — the control, after the `NoticeCard`:
  `<a href="#calculator-enquiry" data-cta="calc_index_help"
  data-cta-placement="index_grid" data-cta-goal="form">{CALC_CAPTURE_HEADING}</a>`,
  ring via `focusRing` (the `var(--focus-ring)` token the focus-ring test
  requires, no bracketed literal).
- `:105-108` and `:120` — the kit `LeadCTAPanel` exposes no `id` prop, so the
  anchor target is a wrapper `<div id="calculator-enquiry" className="scroll-mt-24">`,
  the same shape the blog template already uses for `#enquiry-form`.
- `placement="index_grid"` matches the sibling `calc_index_tool` ids on the same
  band. `goal="form"` because the link lands on the enquiry form.
- The id is on the `<a>`, never the wrapper.

## 5. M07 — W5's band 10 wording deletion. RESTORED as visible lead-in text; band left as the list

`pharmacies/web/src/app/page.tsx:866-879`

**What I did:** restored both retired column headers as a **visible** lead-in
line directly above the `NumberedReasons` list, and left the band as the list.

```
          <p className="mt-10 text-xs font-bold uppercase tracking-wider text-primary-800">
            Area / Our approach
          </p>
```

Both strings verbatim from the retired `<thead>` (`git show HEAD:...page.tsx:706,710`).
Nothing authored: the only character added is the separating slash.

**Why visible lead-in and not a revert to the table:**
1. The two words still describe what the reader sees. Each `NumberedReasons`
   item IS an area (the item heading, `row.area`) over our approach to it (the
   body, `row.detail`), so the legend is accurate over the new form, not a
   leftover naming columns that are gone.
2. Reverting would undo the restyle the owner has not yet walked, and would
   re-introduce the `neutral-200` / `neutral-50` / `neutral-900` classes and the
   `#0f3a4a` literal in the old `<thead>` — both of which the port's hex and
   neutral gates ban. A revert trades one owner-ruling breach for two gate
   failures.
3. Visible, not `sr-only`, because the owner ruling is that published wording is
   not deleted; hiding it from sighted readers is deletion with extra steps.

**The third retired string, the sr-only `<caption>` ("How {siteConfig.name}
handles common pharmacy finance areas"), is NOT restored.** It described a table
that no longer exists, it was never visible to a sighted reader, and the band's
own h2 and eyebrow above it carry the same sense. Flagged here so the manager
can overrule rather than find it later.

## 6. Other M1_INPUT rows classed wiring/config, checked

### M09 — `LeadForm.tsx:65` "dead local `consentText`". **W6'S FINDING IS WRONG. NO EDIT MADE.**

W6 §10 item 1 calls `const consentText` at `:65` dead and "never read". It is
read: `src/components/forms/LeadForm.tsx:155` is
`consent_text: consentText,` **inside the lead payload sent to the submit
endpoint**. It records the exact consent wording shown to the visitor, which is
the PECR/GDPR audit field. Deleting it would have silently dropped
`consent_text` from every lead row this site writes.

`grep -n consentText src/components/forms/LeadForm.tsx` = `:65` (declaration),
`:155` (use). Two hits, not one. Reported rather than acted on; the row should
be struck from the ledger, not carried as open.

### M08 — second `leadConsentText` in `lib/calculators/site.ts`. SKIPPED, and it is not a duplicate

The two strings are **not** identical, so "one import, not two literals" does
not apply as written:

- `src/config/site.ts:12` ends `...you confirm you understand this.`
- `src/lib/calculators/site.ts:7-8` ends `...you confirm you understand this. See our Privacy Policy.`

`LeadForm` appends the privacy sentence itself at `:65`; `MiniCapture` renders
`site.leadConsentText` raw at `:204`, so the calculators copy carries it inline.
Unifying them means changing one of two **rendered consent strings** on a live
lead path that W7 records as T19-frozen. That is not a mop-up edit. The real
cleanup is to export the base sentence once and have both consumers append the
privacy clause — one owner-visible consent diff, deliberately not taken here.

### Skipped, class not wiring/config (listed untouched, as instructed)

| row | class | why untouched |
|---|---|---|
| M10 | copy-needed / mechanical | `og:image` absent on 9 `Metadata` exports. Mechanical but 9 files and a copy question (`/api/og` title per route); not wiring |
| M11 | copy-needed | lowercased "VAT" in machine-built hub descriptions; fixing means authoring 5 descriptions |
| M12 | kit-gap | `ReadingProgress` z-index vs the kit header; `packages/**`, out of lease. Also K06 |
| M14 | wiring / process | the phase-1 tag's scope. A tagging decision, and I am barred from git state changes |
| M19 | review / process | receipt corrections (unlayered-rule count, the inherited `h1..h6{line-height:1.2}` line). G2 fix 2 and fix 3 already handle both as handoffs |
| M20 | review | 11 navigation timeouts; needs a re-run in isolation, not a code edit |
| K01-K08 | kit-gap | all `packages/**` |
| §3 of M1_INPUT (9 rows) | owner | untouched |
| §4 Breadcrumb shim deletion | cleanup, not in the M1 table | `components/ui/Breadcrumb.tsx` still has 3 live consumers; switching their imports and deleting the shim is a 4-file diff with no gate behind it. Left for the manager |

---

## 7. ACCEPTANCE — run now, from the tree this receipt describes

### `cd pharmacies/web && npx tsc --noEmit`, pasted verbatim

```
$ cd pharmacies/web && npx tsc --noEmit
EXIT=0
```

No output, exit 0. Clean, whole tree.

### `cd pharmacies/web && npx vitest run`, summary pasted verbatim

```
 ✓ src/tests/lead-contactability-bridge.test.ts (7 tests) 23ms
 ✓ src/tests/intent-taxonomy.test.ts (32 tests) 15ms

 Test Files  7 passed (7)
      Tests  72 passed (72)
   Start at  12:32:18
   Duration  835ms (transform 759ms, setup 0ms, collect 1.48s, tests 219ms, environment 2ms, prepare 1.12s)
```

**7 files / 72 tests, equal to the W7 baseline. Nothing dropped.** The two
`stderr` lines in `lead-contactability-bridge.test.ts` are the fail-open and
db-error paths asserting their own logging; both tests pass. `focus-ring.test.ts`
is green with the new `focusRing` consumer on `/calculators`.

### `python scripts/check_dependency_closure.py` from the repo root, pasted verbatim

```
$ python scripts/check_dependency_closure.py
dependency closure OK across 19 sites
EXIT=0
```

### Greps on what this package added

| check | result |
|---|---|
| em / en dashes in any file I touched | **0** |
| new `#rrggbb` literals in my added lines | **0** |
| new `neutral-[0-9]` in my added lines | **0** (whole-diff grep = 0) |
| `header_contact"` in `PageShell.tsx` | **1**, unchanged |
| `sticky_cta"` / `sticky_cta_close"` in `StickyCTA.tsx` | **4**, unchanged |
| `BlogPosting` call sites under `src/app` | **1** |
| `NextStepOffer />` mounts | **3**, one per template |
| every new `data-cta` on an `<a>` or `<button>` | **yes**, 3 new ids (`lead_form_submit`, `mini_capture_submit`, `calc_index_help`), zero on a wrapper |
| new runtime imports / dependencies | **0** (`focusRing` and `buildBlogPostingJsonLd` are intra-site; `NextStepOffer` is intra-site) |

## 8. Files touched

```
pharmacies/web/src/app/blog/[category]/[slug]/page.tsx   +2 imports, 2 blocks
pharmacies/web/src/app/services/[slug]/page.tsx          +1 import, 1 mount
pharmacies/web/src/app/for/[slug]/page.tsx               +1 import, 1 mount
pharmacies/web/src/app/calculators/page.tsx              +1 import, 1 anchor, 1 wrapper
pharmacies/web/src/app/page.tsx                          1 lead-in paragraph
pharmacies/web/src/components/forms/LeadForm.tsx          2 attributes
pharmacies/web/src/components/calculators/MiniCapture.tsx 2 attributes
```

Seven files. Nothing else under `src`, nothing under `packages/**` or
`Property/**`, no config file, no `niche.config.json`, no test file.

## 9. Needs a build or a server (handed on, not claimed)

1. **`NextStepOffer` paints on the three templates.** It is client-only and
   gated on a scroll/engagement rule, so an SSR fetch will NOT see it. Walk a
   blog post, a `/services/<slug>` and a `/for/<slug>` past the engagement
   threshold and confirm one card, correct measure (not full-bleed), and the
   `data-cta="next_step"` click event firing.
2. **`cta_snapshot.mjs` vs `cta_baseline.json`.** Expect exactly three new
   server-HTML ids: `calc_index_help|index_grid|form` on `/calculators`, and
   `lead_form_submit|null|form` / `mini_capture_submit|null|form` wherever those
   forms render. `sticky_cta|sticky|null` and `sticky_cta_close|sticky|null`
   must be unchanged in id, placement, goal and href. `next_step` must **not**
   appear in any server HTML (client-gated).
3. **One `BlogPosting` per post, 22 posts**, and `headline` byte-identical to
   the rendered `<h1>` on each.
4. **The `#calculator-enquiry` jump lands on the panel** at 390 and 1440, with
   the `scroll-mt-24` offset clearing the sticky header.
5. **Band 10's lead-in reads sensibly** above the numbered list at 390 and 1440,
   and `primary-800` on `slate-50` is above the 4.5 floor (declared, measured by
   K9 for `primary-700` at 5.1; `primary-800` is darker, so it passes by
   construction, but measure it rather than take that).
6. **Link floor per route must not drop**; it rises by 1 on `/calculators`.
7. M15's tab-walk on `/` is still the open V-row from G1 handoff 1, unaffected
   by anything here.
