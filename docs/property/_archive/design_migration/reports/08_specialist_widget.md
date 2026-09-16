# Report 08 — SpecialistWidget ("the assistant widget that could crash the site")

Written 2026-08-22. Read-only investigation. Nothing outside `tmp/design_migration/` was touched.

---

## Verdict, first

**No. The site is not at risk today from the failure mode the designer described.**

Evidence, in order of strength:

1. **The designer never wrote down a crash claim about the widget.** Across all 12
   `CONTEXT_SUMMARY*.md` files there are exactly **two** relevant passages, and neither says
   the widget can crash anything. The "takes the whole site down" language exists in their
   repo, but it is attached to the **quarantined `/api/leads/submit` route**, not to the
   widget (`Property_zip/web/src/app/api/leads/submit/route.ts:5-17`). Full quotes in §1.
2. **Their widget diff is cosmetic.** +24/-17 = `rounded-lg`→`rounded-xl` (7 places), an
   avatar `<Image>` swapped in for an inline SVG (2 places), and two comment words
   (`partner`→`DJH`, i.e. their copy is the OLDER text, ours is newer). **Zero behaviour,
   state, effect, timer or network changes.** Full diff in §2.
3. **Our production HTML renders the widget right now and it is healthy.** Verified by
   fetching `https://www.propertytaxpartners.co.uk/` (HTTP 200): the markup contains
   `data-cta="specialist_widget"`. Telemetry for the last 90 days shows **16,814
   `support_opened`, 7,227 `personalization_shown`, 22 `lead_submitted`** from the assistant
   surface, and **no** `client_error` row matching any widget/journey failure (§5).
4. **Code trace found no unbounded loop, no polling of an API route, no retry, no backoff
   loop, no LLM call, no rate-limit or cost exposure** (§3, §4). Every effect dependency is
   stable; the only recurring timer is a 1 s bookkeeping interval that fires at most one
   network-free ping per session.

**One real, latent structural fragility exists and is worth a cheap fix** (§7): the widget is
mounted in the **root layout**, which sits **above** `app/error.tsx`. A throw inside it is not
caught by the page error boundary; it escalates to `app/global-error.tsx` and the visitor gets
a full-screen "Application Error" instead of the page. There is exactly one code path that
could throw during its render, and it has never fired in 90 days of telemetry. So: real
mechanism, unproven trigger, cheap guard. Not an incident.

---

## 1. What the designer actually wrote

I grepped all 12 `CONTEXT_SUMMARY*.md` files for `SpecialistWidget, assistant, widget, crash,
500, poison, dev server, infinite, loop, recursion, memory, hang`. `crash`, `take the site
down`, `blow up`, `runaway` return **zero hits in any handoff document**. There are only two
passages that touch the widget.

### 1.1 `CONTEXT_SUMMARY_SESSION6.md:56-60`, §0.1, item 3 — the only direct mention

> **It waits 1.5s and THEN dismisses the support widget.** `SpecialistWidget` auto-opens on
> every dev page load by design (`AUTO_OPEN_DELAY_MS = 600`, and in dev it ignores the
> once-per-session `sessionStorage` guard). It covers roughly a third of a 1440px viewport.
> Clicking close *before* the auto-open fires just dismisses the collapsed pill and the panel
> then opens over the shot. Order matters.

This is a **screenshot-harness note**, not a defect report. It is accurate about our code:
`SpecialistWidget.tsx:55` `AUTO_OPEN_DELAY_MS = 600`, and `SpecialistWidget.tsx:249` gates the
once-per-session `sessionStorage` check on `process.env.NODE_ENV === "production"`, so dev
auto-opens every load exactly as they describe.

### 1.2 `CONTEXT_SUMMARY_SESSION10.md:37-42`, §0.2 — the dev-server poisoning

> - **The entire lead-capture backend.** 22 entrypoints reach the missing modules: the
>   `/complete` page and 21 API routes under `/api/leads/*` and `/api/cron/*`, including
>   `/api/leads/submit`, which is what EVERY form on the site posts to.
> - **In dev**, compiling any one of those files used to poison the whole dev server: every
>   route 500s until restart. This is why the site periodically looked completely broken.
> - **In production**, `next build` failed outright, so the project could not be deployed at all.

### 1.3 The "takes the whole site down" phrase — where it actually lives

`Property_zip/web/src/app/api/leads/submit/route.ts:5-17` (their 503 stub):

> Why: the real route imports lead-nurture modules from `@accounting-network/web-shared` that
> are missing from the vendored snapshot (`vendor/web-shared/lead-nurture/` holds only
> `lead-nurture-shared.ts`). **Compiling the import poisons the dev server so every route 500s
> until a restart**, and a production build fails outright. […] This stub answers 503 so a
> caller gets a clean, honest failure **instead of taking the whole site down**.

**Inference, labelled as such:** the owner's recollection ("something with the assistant widget
that could crash the site") most plausibly collapses §1.1 + §1.3 into one memory. The widget is
the site's most conspicuous, most autonomous surface, it auto-opened on every dev page load in
front of the designer, and the endpoint it submits to is precisely the file whose compilation
took their dev server down. I cannot prove that is what was meant — there is no written
statement — but no other candidate exists in 12 handoff documents. **I did not find, and am not
claiming, a designer-identified crash bug in the widget.**

### 1.4 Is the widget one of the poisoned files?

**No.** The 22 quarantined entrypoints are all `route.ts`/`page.tsx` files under
`web/src/app/api/leads/*`, `web/src/app/api/cron/*`, plus `web/src/app/complete/page.tsx`
(verified: `find . -name "*.disabled"` returns exactly those 22).
`web/src/components/support/SpecialistWidget.tsx` is not among them, has no `.disabled` twin,
and imports nothing from `web-shared/lead-nurture`. It was live in their dev environment all the
way through session 11 — session 6 §0.1 could not have been written otherwise.

---

## 2. Diff: ours vs theirs

`git -C tmp/design_migration/Property_zip diff 8041183 eb745e1 -- web/src/components/support/`
and a direct `diff -u` of the two working files. Every change, exhaustively:

| Their change | Lines | Type |
|---|---|---|
| `+ import Image from "next/image"` | after `:19` | new import |
| `inputClass`: `rounded-lg` → `rounded-xl` | `:45` | style |
| Panel container `rounded-2xl` → `rounded-xl` | `:502` | style |
| Header chat-bubble SVG → `<Image src="/specialist-avatar.jpg" width={36} height={36}>` | `:507-511` | style/asset |
| Peek-line bubble `rounded-2xl` → `rounded-xl` | `:530` | style |
| Success bubble `rounded-2xl` → `rounded-xl` | `:542` | style |
| "Ask a specialist" button `rounded-lg` → `rounded-xl` | `:578` | style |
| Single-flow submit button `rounded-lg` → `rounded-xl` | `:610` | style |
| Multi-flow "Continue" `rounded-lg` → `rounded-xl` | `:710` | style |
| Multi-flow submit `rounded-lg` → `rounded-xl` | `:736` | style |
| Peek card `rounded-2xl` → `rounded-xl` | `:765` | style |
| Launcher SVG → `<Image src="/specialist-avatar.jpg" width={28} height={28}>` | `:804-806` | style/asset |
| Comment `partner handoff` → `DJH handoff` (×2) | `:401`, `:480` | **stale, do not port** |

Plus one unrelated file in the same subtree: `web/src/lib/support/faq.ts:34` replaced an
em-dash with a colon (correct per the no-em-dash rule).

Notes for the port:

- **Their comment change is a regression, not an improvement.** `DJH` is the pre-08-14
  wording; the monorepo moved to `partner` (the DJH gate is recorded as obsolete/purged
  2026-08-14). Keep ours.
- **`/specialist-avatar.jpg` exists only in their repo**
  (`Property_zip/web/public/specialist-avatar.jpg`; absent from `Property/web/public/`). If the
  avatar is ported, the asset must be ported with it, and the photo is a **person's face
  presented as "Property Tax Partners"** — that is an owner-facing question (is it a real
  specialist, do we have rights, does it imply a named human replying?), not a drive-by.
  A missing asset would 404 the image, not crash anything.
- `src/lib/support/faq.ts` **has no importers** on either side (`grep -rn "support/faq"` over
  both `Property/web/src` and `Property_zip/web/src` returns nothing). It is dead code in the
  monorepo. Their em-dash fix is therefore cosmetic on an unrendered file.

Our own drift since the snapshot is tiny:
`git diff 1d68a570 HEAD -- Property/web/src/components/support/` = **4 lines changed** in
`SpecialistWidget.tsx` (the DJH→partner rename), plus 2 lines in `lib/assistant/opener.ts`.
**The two sides have not diverged behaviourally at all.** This file is a "take their styling,
keep our comment" one-liner port, not a conflict.

---

## 3. Runtime trace (verified by reading the files)

**Mount.** `Property/web/src/app/layout.tsx:11` imports it; `layout.tsx:105` renders
`<SpecialistWidget />` as a sibling of `<PageShell>{children}</PageShell>`, inside
`<IntentProvider>` → `<AnalyticsProvider>` → `<ConsentProvider>`. **Root layout = every route
on the site**, including `/embed` and `/admin` (it self-disables there via context, see below).

**Gate.** `SpecialistWidget.tsx:58` `useIntentContext()`; `:308` `if (!ctx) return null`.
`ctx` is null when the visitor opted out of tracking or the path starts with `/embed` or
`/admin` (`components/intent/IntentProvider.tsx:29-33, 55-57`).

**State machine.** 12 `useState` + 8 `useRef` (`:60-83`). Panel `open`, `composing`,
`peekVisible`, submit `status` (`idle|loading|success|error`), and a flag-gated 2-step composer
(`step 1|2`). One proactive ping per session maximum, enforced by `pingCountRef` at `:113`
(comment records why: the old escalating cadence was the site's biggest interrupter, 1,882
shown / 6 clicked / 219 dismissed).

**Effects and timers** (all with stable dependency arrays, see §4.1):

| Where | What | Bound |
|---|---|---|
| `:160-168` | init journey model, set `ptp_assistant_active` sessionStorage flag | once per `active` |
| `:171-173` | `recordPath(pathname)` | once per route change |
| `:176` | mirror `open` into a ref | per `open` |
| `:180-194` | `setInterval(1000)` accruing visible-time; may call `runPing` | cleared on unmount; **no network** |
| `:197-227` | exit-intent: one `setTimeout` to arm (8-10 s) + one `mouseleave` **or** passive `scroll` listener; `fired` latch at `:205-206` | one fire, self-`cleanup()` |
| `:233-241` | subscribes to the in-app analytics bus, reacts to `form_error` only | unsubscribes on unmount |
| `:246-291` | one `setTimeout(600)` auto-open, once per session in prod (`:249-255`) | cleared on unmount |
| `:295-305` | step-view announce, guarded by `viewedStepRef` | no state writes |

**Network.** Exactly two kinds, both user- or event-triggered, neither polled:

- `track(...)` → `packages/web-shared/analytics/track.ts` — queued, batched, flushed on size /
  timer / `pagehide` via `sendBeacon` to same-origin `/api/track`. No retry, no backoff loop.
- `submitPropertyLead(payload, honeypot)` at `:406` and `:485` →
  `src/lib/leads/submit-client.ts:56-80` — a **single** `fetch("/api/leads/submit")`, wrapped
  in `try/catch`, **never throws** (returns `{success:false, error}` on network failure or
  non-OK status). **No retry. No backoff. Fires only from a form `submit` handler.**

**Storage.** `sessionStorage` only: `ptp_assistant_autoopened` (`:54`),
`ptp_assistant_active` (`:164`), and `ptp_journey` via the journey model
(`src/lib/intent/journeyModel.ts:20`). Every read and write is inside `try/catch`
(`:98-104`, `:163-167`, `:250-254`, `:258-260`; `journeyModel.ts:69-79, 84-92`) except the one
gap in §4.6.

**Lead-API dependency.** Only `/api/leads/submit`, only on submit. In the monorepo that route is
the real implementation (`Property/web/src/app/api/leads/submit/route.ts`, referenced at `:194`
by a comment about this very widget's `full_name:""`/`phone:""` shape). In the designer's copy it
is the 503 stub. **That difference is the whole distinction the brief asks about.**

---

## 4. Crash mechanisms, each ruled in or out

### 4.1 `useEffect` with a dependency that changes every render — **RULED OUT**

Checked every dep array:

- `runPing` is `useCallback(..., [bookingNudge])` (`:108-150`); `bookingNudge` comes from
  `useMemo(..., [])` with an **empty** dep array (`:96-105`), so it is stable for the
  component's lifetime.
- `active` is a boolean (`:88`), `suppressed` a boolean from the same empty-dep memo.
- `pathname` is a string from `usePathname()`.
- `onStepView` comes from `useFormTracking`
  (`packages/web-shared/analytics/react/useFormTracking.ts:67-72`) and is a `useCallback` with
  `[formId, flow]`, both primitives — stable.
- The `:295-305` effect writes no state at all; it is ref-guarded (`viewedStepRef`), so even an
  unstable dep would only re-run a no-op.

`IntentProvider` polls scroll/engagement every 1.5 s (`IntentProvider.tsx:43-56`) but
**explicitly returns the previous object when nothing moved** (`:47-52`), so `ctx` identity is
stable while the visitor is still. Even when it does change, the widget re-renders; it does not
loop, because nothing in the widget writes state during render.

### 4.2 Unbounded retry or polling against an API route — **RULED OUT**

The only interval is `setInterval(1000)` at `:183`, and it does **no I/O**: it adds elapsed ms
to a ref and, at most once per session, calls `runPing`, which is a pure copy lookup plus one
`track()` call. `pingCountRef.current > 0` returns early at `:113`. `submitPropertyLead` has no
retry (`submit-client.ts:56-80`). There is no `while`, no recursive `setTimeout`, no
`useSWR`/`react-query`, no EventSource, no WebSocket anywhere in the widget or its imports.

### 4.3 Unhandled promise rejection / throw in a client component — **PARTLY RULED IN, see §4.6 and §7**

The two async handlers (`onSubmit :356`, `submitMulti :442`) call only guarded code, and
`submitPropertyLead` cannot reject. The one exception worth naming: `niche.content_strategy
.source_identifier` is dereferenced at `:386` and `:465`, inside those handlers. Telemetry shows
`niche` is genuinely `undefined` in some production client bundles (partial chunk load) — 21
rows in 90 days across three browser phrasings of "Cannot read properties of undefined (reading
'content_strategy')", plus the pre-existing guard and comment at `src/config/site.ts:7-8`
recording 7 such rows for `niche.company`. **Consequence for the widget: a throw inside an async
event handler is not caught by any React error boundary; the visitor's "Sending..." button stays
disabled forever and the lead is lost. It does not crash the page.** This is a lead-loss edge,
not a site-down edge, and it is an estate-shaped issue (5 other client components dereference
the same path, three of them at module scope) — flagged, not in scope here.

### 4.4 A server component / route handler that throws at build or request time — **RULED OUT**

`SpecialistWidget.tsx:1` is `"use client"`. It has no server counterpart, no route handler, no
`generateStaticParams`, no data fetch at build. `next build` compiles it as a client chunk.

### 4.5 The documented dev-server poisoning (SESSION10 §0.2) — **RULED OUT for the widget**

The widget is not one of the 22 quarantined files (§1.4), and it imports no
`web-shared/lead-nurture` module. It reaches the poisoned surface only over HTTP at submit time,
which in their snapshot returned a clean 503 by design. **In the monorepo that route is real and
unquarantined, so the mechanism does not exist here at all.**

### 4.6 The one path that can throw during render — **RULED IN as a mechanism, RULED OUT as a live incident**

`src/lib/intent/journeyModel.ts:69-80`:

```
const raw = window.sessionStorage.getItem(STORAGE_KEY);
if (raw) {
  trail = JSON.parse(raw) as Trail;   // :74 — cast, not validated
  return trail;
}
```

The parsed value is **cast**, never shape-checked. Downstream, `nodeFor` does
`t.pages.find(...)` (`:102`) and `getJourneyProfile` does `for (const p of t.pages)` (`:171`).
If `sessionStorage["ptp_journey"]` ever holds valid JSON of the wrong shape (or the literal
`null`, which parses to `null` and is returned as the trail), both throw a `TypeError`.

Where that lands:

- `getJourneyProfile()` is called **during render** at `SpecialistWidget.tsx:312`
  (`const journeyTopic = open ? getTopic(getJourneyProfile().primaryTopic) : null`) — a render
  throw in a root-layout client component → `global-error.tsx` (see §6).
- `recordPath()` is called in an effect at `:172` — also escalates to the boundary.
- The same code called from the analytics bus is **safe**: `packages/web-shared/analytics/bus.ts:33-41`
  wraps every listener in `try/catch`.

**Is it live?** No evidence it has ever fired. Our code is the only writer of that key
(`grep -rn "ptp_journey"` returns exactly one hit, `journeyModel.ts:20`), `save()` refuses to
write when `trail` is null (`:84-92`), the schema has never changed (`git log` on
`journeyModel.ts` shows a single commit, `abebdfc2`), and 90 days of `client_error` telemetry
contains no `pages`/`find`/`iterable` failure. Treat this as **hardening, not a fix for an
active bug**.

### 4.7 Rate limit or runaway cost — **RULED OUT**

No LLM call exists on this path. `lib/assistant/opener.ts:154` sets
`OPENER_LLM_ENRICHMENT_ENABLED = false` and `enrichOpener()` returns `null` unconditionally
(`:161-166`); nothing in the widget even calls it. Copy is a static lookup table. The only
outbound traffic is batched first-party `/api/track` beacons and one lead POST per submit.

One cosmetic, non-crashing edge: `opener.ts:104-110` interpolates `TOPIC_NOUN[t]`, which would
render the literal string `undefined` if a session's stored topic key were ever removed from the
taxonomy. Copy bug, not a crash. Worth a note in the taxonomy file if topics are ever renamed.

---

## 5. Production verdict, with evidence

**The risk the designer's environment carried was an artefact of their incomplete copy. It does
not exist in the monorepo.**

| Check | Their snapshot | Our monorepo |
|---|---|---|
| `/api/leads/submit` | 503 stub, real impl parked as `.disabled` | real implementation, live |
| `web-shared/lead-nurture` modules | missing → compile poisons dev server | present in `packages/web-shared/` |
| Widget file itself | identical behaviour to ours | identical behaviour to theirs |
| `next build` | failed outright (SESSION10 §0.2) | ships; site is live |

Live verification, run 2026-08-22:

- `curl https://www.propertytaxpartners.co.uk/` → **HTTP 200**, and the response body contains
  `data-cta="specialist_widget"`. The widget is server-rendered on every page today.
- Supabase `web_events`, `site_key='property'`, last 90 days (read-only Management API query,
  script kept in the session scratchpad and not committed):
  - `support_opened` **16,814**, `personalization_shown` **7,227**,
    `personalization_dismissed` **1,129**, `personalization_clicked` **32**
  - assistant-form funnel: `form_start` 42 → `form_submit` 22 → **`lead_submitted` 22**,
    `form_error` 10
  - `client_error` top rows: `"Script error."` 4,083 (opaque cross-origin, unattributable),
    a third-party `r["@context"].toLowerCase` TypeError 263, then a long tail. **Nothing
    matching the widget, the journey model, or an assistant render failure.**

A widget that opened 16,814 times and produced 22 leads in 90 days with zero attributable client
errors is not crashing the site.

*(Note for whoever reads the funnel: 22 leads from 16,814 opens is a conversion question for the
owner, and 7,227 nudges → 32 clicks is a 0.44% click rate on an interrupting surface. Out of
scope for this brief, but it belongs in the migration's open questions next to the `LeadForm`
seven-field item.)*

---

## 6. Error boundaries: what actually happens if it throws

Only two boundaries exist in the whole app: `Property/web/src/app/error.tsx` and
`Property/web/src/app/global-error.tsx`. There is no local boundary anywhere
(`find src -name "error.tsx" -o -name "*ErrorBoundary*"` returns exactly those two files), and
none in `PageShell`.

`app/error.tsx` wraps the **page** segment — i.e. `{children}` of the root layout. The widget is
rendered as a **sibling** of `{children}` in the root layout itself (`layout.tsx:105`), so it
sits **above** that boundary. *(Inferred from the Next.js App Router boundary model, not from a
run: `error.tsx` does not catch errors thrown by the layout of its own segment; root-layout
errors are the documented job of `global-error.tsx`. I did not reproduce this locally.)*

So the user-visible outcomes are:

| Where the throw happens | Caught by | What the user sees |
|---|---|---|
| Widget **render** (e.g. §4.6 via `:312`) | `global-error.tsx` | Full-screen unstyled **"Application Error"** page. The real page content is gone, header, footer, article and all. |
| Widget **effect** (`:172` `recordPath`) | `global-error.tsx` | Same. |
| Widget **async event handler** (§4.3) | nothing | Silent. Button stuck on "Sending...", lead lost, no visible error. |
| Analytics-bus listener | `bus.ts:33-41` `try/catch` | Nothing; swallowed by design. |

That first row is the honest core of "the assistant widget could take the site down": not
because of a bug we can point at, but because **anything mounted in the root layout has the
whole page as its blast radius, and this one has by far the most logic of the three surfaces
mounted there** (`ReturningBar`, `DeepScrollModal`, `SpecialistWidget`).

---

## 7. The fix, if you want the blast radius closed

Not urgent, and nothing here is required to complete the design port. Two changes, in priority
order, both small.

**(a) Validate the trail shape — root cause, one line, fixes every caller at once.**
`Property/web/src/lib/intent/journeyModel.ts:73-77`:

```ts
if (raw) {
  const parsed = JSON.parse(raw) as Partial<Trail> | null;
  trail = parsed && Array.isArray(parsed.pages) ? (parsed as Trail) : emptyTrail();
  return trail;
}
```

This is the lazy fix in the correct place: `load()` is the single gate every consumer
(`nodeFor`, `recordPath`, `onEvent`, `getJourneyProfile`) routes through, so one guard covers
the render path, the effect path and the bus path. Guarding at `SpecialistWidget.tsx:312` would
leave the other three callers exposed.

**Runnable check that fails if the bug comes back** — a new `src/tests/journey-model.test.ts`
(the suite already runs `vitest` with `environment: "node"`, so stub a minimal `window`):

```ts
// Fails if journeyModel ever trusts the stored shape again.
it("survives a corrupt ptp_journey value", () => {
  for (const bad of ['null', '{"pages":null}', '"x"', '[]']) {
    store.set("ptp_journey", bad);
    _resetJourneyModel();
    expect(() => getJourneyProfile()).not.toThrow();
    expect(() => recordPath("/section-24")).not.toThrow();
  }
});
```

**(b) Optional belt: cap the blast radius of the root-layout surfaces.**
A ~15-line client error boundary wrapping `<ReturningBar/>`, `<DeepScrollModal/>` and
`<SpecialistWidget/>` in `layout.tsx:103-105` that renders `null` on error. Then a throw in any
proactive surface costs the visitor a chat bubble instead of the page. This is genuinely
optional; (a) removes the only known path into it.

**Do not** ship (b) without (a) — a boundary that silently swallows would hide the failure
rather than fix it, and there is no client-error reporting wired into these boundaries today
(`error.tsx:16-18` and `global-error.tsx:12-14` only `console.error`, and only in development).

---

## 8. Does `docs/Property/PROACTIVE_ASSISTANT_BRIEF.md` match the code?

**It describes the right widget, but its status line is stale and two of its code facts have
drifted.** Traced to the call site, per house rule.

| Doc claim | Reality |
|---|---|
| `**Status:** DESIGN-ONLY exploration complete (2026-06-25), no code written.` (`:3-4`) | **Wrong.** The proactive layer was built and is live: `SpecialistWidget.tsx:9-16` documents the MVP, and production telemetry shows 7,227 `personalization_shown` in 90 days. |
| "The widget today is a static form, not a conversation." (`:38`) | Superseded. It now auto-opens, peeks, tailors copy by journey stage, and fires on exit-intent and form friction. |
| "mounted `app/layout.tsx:~109`" (`:47`) | Now `layout.tsx:105`. Close enough to follow; worth correcting. |
| "submits via `submitLead`" (`:48`) | **Wrong.** It submits via `submitPropertyLead` → `POST /api/leads/submit` (`SpecialistWidget.tsx:22, 406, 485`). `submit-client.ts:8-14` records that the direct-to-Supabase path was retired. |
| "Mark assistant leads with `source: "assistant"`" (`:94`) | Not what shipped. `source` stays the niche identifier; the channel lives in `extras.capture_channel = "assistant"` (`SpecialistWidget.tsx:398-401, 475-479`). Nurture copy reads `capture_channel`. |
| Open decision 1: "rules-based vs LLM" (`:135`) | Resolved in code: rules-based, LLM explicitly gated off (`opener.ts:154`). |
| Open decision 5: persona/name (`:141`) | Still open, and the designer's `/specialist-avatar.jpg` is a de-facto answer to it. Owner decision. |

**Recommendation:** re-status the doc to "BUILT (Phase 0 MVP), design brief retained for the
deferred LLM phase", or fold it into `docs/Property/STATE.md`. A doc that says "no code written"
about a surface that opened 16,814 times last quarter is exactly the trap the house rule warns
about. **I did not edit it** — outside this brief's write scope.

---

## 9. What I could not determine without running the app

Stated plainly, so nothing here reads stronger than it is.

1. **I did not reproduce the §4.6 throw.** The mechanism is read from source; the trigger is
   hypothetical. I found no telemetry of it ever firing.
2. **The Next.js boundary semantics in §6 are inferred** from the App Router model, not from a
   local reproduction. If someone wants certainty, throw deliberately in the widget's render
   against `npm run dev` and observe whether `error.tsx` or `global-error.tsx` renders. That is
   a 5-minute check and would upgrade §6 from inferred to verified.
3. **I could not attribute the 4,083 `"Script error."` rows.** They are opaque cross-origin
   errors with no stack; some fraction could in principle be anything, including the widget.
   Nothing suggests it, but I cannot exclude it from that bucket.
4. **I did not verify the designer's `/specialist-avatar.jpg` renders**, nor who is in the
   photo, nor whether we have rights to it.
5. **I did not test the multi-step composer path.** `miniformsMultistepEnabled()` gates it
   (`SpecialistWidget.tsx:84`); I did not check which way that flag resolves in production, so
   the `:628-759` branch is read but not observed. `form_step_view` = 72 events in 90 days
   suggests it is on for at least some traffic.
6. **I did not run `next build` or the test suite.**

---

## 10. One-line port decision for the plan

`SpecialistWidget.tsx`: **take their styling, keep our comment.** Apply the 11 radius changes;
skip the `partner`→`DJH` comment revert; treat the avatar image as a separate owner decision
(asset + persona). `lib/support/faq.ts`: their em-dash fix is correct but the file is dead code
on both sides, so port it only if the file is being kept at all. Neither file carries any risk
into production.
