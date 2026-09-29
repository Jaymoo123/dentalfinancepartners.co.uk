# R7 — independent adversarial review: floating help widget (startups-tech)

Reviewer: independent (did not build it). Date 2026-09-29.
Target: commit `71f4b72c` "feat(startups-tech): floating help widget ported from generalist".
Server under test: `next start` from HEAD on http://localhost:3201.
Title asserted before any measurement: `Founder Tax Partners | Accountants for Funded and Scaling UK Startups`.
Every lead POST was intercepted and aborted or stubbed. Nothing reached the `leads` table (see C5).

---

## A) VERDICT

**FAIL** — 5 blockers, 8 gaps, 2 nits.

The port is faithful to generalist and the estate plumbing is right: `source`, `data-cta`,
taxonomy, route suppression, print, no ReturningBar / DeepScrollModal / NextStepOffer, both
instruments clean. It fails on four things a reviewer cannot wave through: the dialog is not
operable by keyboard, its close ring is below 3:1, it sits on top of the site's only consent
control at both widths, and mounting it puts CLS on `/` above 0.1 at 1280. A fifth, the missing
`extras.form_id`, silently breaks the site's own surface labelling.

| | count |
|---|---|
| Blockers | 5 |
| Gaps | 8 |
| Nits | 2 |
| Checks cleared | 21 |
| False premises in the build's own comments | 2 |

---

## B) GAPS — most severe first

### BLOCKERS

**B1 — `components/support/SpecialistWidget.tsx:380` | dialog is not keyboard operable**
- Expected: Enter opens, focus moves into the dialog, Tab cycles inside it, Escape closes and returns focus to the launcher.
- Measured (real `page.keyboard.press`, 1280 and 390, on `/calculators/rd-relief-estimator`):
  - Tab reaches the launcher at press **67** (1280) / **62** (390). Enter opens it: `dialogOpenAfterEnter: true`.
  - Focus after Enter stays on the launcher: `insideDialog: false`.
  - Next 10 Tabs: `BODY` → `Skip to content` → `Founder Tax Partners, home` → `Services` → … Focus goes to the **top of the page**, never into the dialog. The dialog is earlier in the DOM than the launcher, so forward Tab skips it entirely; only Shift+Tab reaches it.
  - Escape: `dialogOpenAfterEscape: true` (does not close), focus left on a page link.
  - `aria-modal` is **absent** and the widget does **not** trap. That pairing is at least self-consistent (it does not claim a trap it has not got), so the finding is the broken order and the dead Escape, not a false `aria-modal`.
- Severity: BLOCKER. WCAG 2.1.1 / 2.4.3 on a surface that **auto-opens unprompted** on every desktop page view. Same in generalist and Property, so this is an estate-wide defect the port inherited rather than introduced — it is still shipping on this site.
- Minimal fix: on open, focus the dialog's close button; add a `keydown` Escape handler calling `closePanel()` then `launcherRef.current?.focus()`; render the dialog after the launcher in the DOM, or give it a focus trap and `aria-modal="true"`.

**B2 — `SpecialistWidget.tsx:401` | close button focus ring 2.54:1 on the `primary-950` header**
- Expected: >= 3:1 against its own ground.
- Measured: outline `2px solid rgb(79,70,229)` on ground `rgb(30,27,75)` = **2.54** (canvas-composited, 400ms settle, `:focus-visible` true). Same at 390. Every other tab-walked ring is 6.29 on white (launcher, email, question, submit, privacy link) — this is the only one on a dark ground.
- Severity: BLOCKER (WCAG 1.4.11).
- Minimal fix: a white or `primary-200` ring for the header control only, or a 2px white offset ring behind the brand ring.

**B3 — `SpecialistWidget.tsx:378` | the widget covers the site's only consent control**
- Expected: nothing fixed covers the footer consent toggle or the cookie region.
- Measured, scrolled to the document bottom, `elementFromPoint` hit-test at each target's centre:
  - **390, launcher closed**: launcher `{x189,y784,w185,h44}` over "Do not track me" `{x16,y772,w358,h24}` → overlap `{x189,y784,w185,h12}`, `covered: true`, top element = the launcher's unread badge span.
  - **1280, auto-opened panel**: dialog `{x896,y284,w368,h544}` over "Cookie policy" `{x1027,y544,w90,h24}` → `covered: true`; and over "Do not track me" `{x1096,y812,w88,h24}` → `covered: true` (top element = the dialog's `border-t … p-3` footer).
  - **1280, launcher closed**: nothing covered. So the 1280 case is caused purely by the auto-open.
  - Hero CTAs, calculator submits and the closing-panel submit are **not** covered by the closed launcher or the open peek at 390 (0 overlaps at rest; the full open panel covers them, which is expected of a panel the visitor opened).
- Severity: BLOCKER. This is the GA4 opt-out control on a site whose standing rule is "GA4 stays opt-out".
- Minimal fix: the `bottom-4` delta is the cause at 390 — generalist's `bottom-24` clears the footer band by 80px. Restore `bottom-24`, or add bottom padding to the footer equal to the launcher height plus its offset.

**B4 — `SpecialistWidget.tsx:378` + `app/layout.tsx:123` | the widget puts CLS above 0.1 on `/` at 1280**
- Expected: mounting the widget does not shift layout on load.
- Measured (Layout Instability API, `hadRecentInput` excluded, `/`):
  - 1280: **CLS 0.11063**, unchanged at 10.5s. Largest shift `0.11023` at t=1022ms, sources `DIV.fixed bottom-4 right-4 z-[55]` and `BUTTON.relative flex items-center gap…` — the auto-open panel mounting above the launcher (flex-col, `mb-3`) pushes the launcher up.
  - 390: **CLS 0.03336**, single shift at t=958ms, same two sources.
- Severity: BLOCKER. 0.111 > Google's 0.1 "good" threshold, on the homepage, on every desktop session, from a surface the visitor did not ask for.
- Minimal fix: reserve the panel's height in the fixed container (or anchor the panel with `position:absolute; bottom:100%` off the launcher) so the launcher never moves.

**B5 — `SpecialistWidget.tsx:356` | `extras.form_id` is never sent, so the lead is unlabelled**
- Expected: `form_id = "specialist_widget"` on the lead. `src/lib/leads/role-labels.ts:39` ships `SURFACE_LABELS["specialist_widget"] = "Ask a specialist widget"`, and `src/lib/leads/handoff.ts:121` reads `extras.form_id`.
- Measured, intercepted POST body (aborted):
  `extras: {"capture_channel":"assistant","trigger":"widget"}` — no `form_id`, and no `form_id` anywhere else in the payload. `Property/web/src/components/support/SpecialistWidget.tsx:478` does send `form_id: "specialist_widget"`.
- Severity: BLOCKER for attribution: every widget lead lands indistinguishable from a contact-form lead in handoff and in the notification emails. The commit message's "formId specialist_widget" is true only of the analytics `useFormTracking` id, not of the lead.
- Minimal fix: add `form_id: SPECIALIST_WIDGET_FORM_ID` to the `extras` object.

### GAPS

**G1 — `SpecialistWidget.tsx:56` | placeholder contrast 2.58:1**
`placeholder:text-neutral-400` → `oklch(0.708 0 0)` on white = **2.58** (need 4.5). The only text-node failure inside the widget at either width. Fix: `neutral-500` (4.76 measured by the instrument's own self-test on the equivalent slate step).

**G2 — `SpecialistWidget.tsx:438,446` | chip border 1.91:1**
`border-primary-300` = `rgb(165,180,252)` on white = **1.91** (graphics need 3). Both chips ("See your numbers", "Get in touch"). The chip *text* is fine (9.93). Fix: `border-primary-400` or add a `primary-50` fill so the boundary is not the only cue.

**G3 — `SpecialistWidget.tsx:513` | validation error is not announced**
`<p className="text-xs font-medium text-red-600">` has no `role="alert"`, no `aria-live`, and neither input carries `aria-describedby`. Measured: `{"role":null,"ariaLive":null,"describedBy":false}`. Contrast itself passes (4.77). A screen-reader user submits, hears nothing, and the focus does not move. Fix: `role="alert"` on the `<p>`, `aria-describedby` on both fields, and `aria-invalid` on the offending one.

**G4 — `SpecialistWidget.tsx:262-269` | the desktop auto-open emits no impression event**
Measured event names off the captured beacons, desktop session: `page_view, web_vital, calc_view, support_opened, engagement_time, cta_click, element_click, form_start, form_field_focus, form_submit, lead_submitted` — **no `personalization_shown`**. At 390 the peek path does emit it, plus `personalization_dismissed` (dismiss) and `personalization_clicked` + `support_opened` (click). So the dominant surface — the panel that opens by itself on every desktop view, carrying an opener line — records zero impressions, and any shown/clicked ratio on the dashboard is wrong. Fix: emit `personalization_shown` in the desktop branch as the mobile branch does.

**G5 — `SpecialistWidget.tsx:88-95` | `suppressed` is computed once and never re-evaluated**
`useMemo(() => isConverted(), [])`. The widget is mounted in the root layout and never unmounts across client navigations, so a visitor who converts mid-session keeps receiving the cadence, exit and friction pings for the rest of that session, including on `/thank-you`. Suppression only takes effect on the next full page load. Fix: recompute on pathname change, or on the `lead_submitted` bus event.

**G6 — `lib/assistant/opener.ts:139,142` | two opener lines break the file's own locked voice rule**
The header states "One sentence per hook line, under 20 words." Measured: the friction openers are **22 and 24 words and two sentences each**. Verbatim in section D. Fix: shorten, or amend the stated rule.

**G7 — `SpecialistWidget.tsx:279` | self-referential calculator chip**
Measured on `/calculators/rd-relief-estimator`: chip `See your numbers -> /calculators/rd-relief-estimator` (the page the visitor is on), under the opener "Looking at R&D relief? I can pull up the estimator that sizes a claim." The chip is correct on `/` (absent), the post (→ rd-relief-estimator), the service page (→ emi-vs-unapproved-calculator), `/contact` and `/thank-you` (absent). Fix: drop `calcSlug` when it equals the current route.

**G8 — `SpecialistWidget.tsx:562` | the launcher is the last tab stop on the page**
62-67 Tab presses on a calculator page, more on a long post. A keyboard user reaches the "help" control only after everything it was meant to shortcut. Fix: no minimal one — a `landmark`/skip target, or accept and record it.

### NITS

**N1 — `SpecialistWidget.tsx` 16 × `neutral-*` against a `slate-*` site**
Counts: `SpecialistWidget.tsx` 16 (`50`×1, `200`×4, `300`×3, `400`×2, `500`×1, `700`×1, `800`×2, `900`×1); `components/forms/LeadForm.tsx` 14, `DetailsForm.tsx` 6, `BookingPicker.tsx` 5 — 41 in total against 788 `slate-*` site-wide.
Judged by measurement, not by eye, with the widget's composer open over the calculator's closing panel at 1280 (`G_widget_composer_over_panel_1280.png`):
- backgrounds: widget `oklch(0.985 0 0)` vs page panel `oklch(0.984 0.003 247.858)` — indistinguishable.
- input borders, directly adjacent: widget `oklch(0.87 0 0)` vs page `oklch(0.869 0.022 252.894)`. Same lightness, chroma 0 vs 0.022, i.e. a pure grey border beside a blue-grey one.
- NIT, not a gap: the tint is at the edge of perceptibility at this lightness, and the two greys never sit on the same line. One-for-one mapping if it is ever closed: `neutral-{50,200,300,400,500,700,800,900}` → `slate-{same}`.

**N2 — `SpecialistWidget.tsx:327-336` | an empty submit reports only the email error**
Measured: empty form → "Enter a valid email address." only; the message error appears only after the email is valid. Sequential, not per-field.

---

## C) CLEARED — with the command and the decisive line

1. **Title asserted first.** `curl -s http://localhost:3201/ | grep -o "<title>…"` → `Founder Tax Partners | Accountants for Funded and Scaling UK Startups`.
2. **Real mobile emulation proven before use.** gov.uk control at 390: `{"iw":390,"dpr":3,"touch":true,"mm":true,"doc":390}` (`pointer: coarse` matched).
3. **Launcher renders on all six routes.** `p1_behaviour.mjs`: `launcher: true` on `/`, the post, `/services/emi-scheme-setup`, `/calculators/rd-relief-estimator`, `/contact`, `/thank-you`.
4. **Not rendered on `/embed/*`.** `/embed/rd-relief-estimator` → `launcher: false`, `rootClass: null` (status 200, page renders).
5. **Not rendered on `/admin/*`.** `curl -sL /admin/analytics` → follows to `/admin/analytics/login`, `grep -c 'data-cta="specialist_widget"'` = **0**.
6. **Hidden under print.** Served CSS contains `@media print{.print\:hidden{display:none}}`; with `emulateMediaType('print')` the launcher and dialog both measure height **0**.
7. **Auto-open timing matches the source constants.** `AUTO_OPEN_DELAY_MS = 600` (generalist identical); panel open observed at t≈1022ms in the CLS trace. Cadence `[30s, 70s, 120s, 180s]`, exit-intent armed at 10s desktop / 8s mobile, friction on `form_error` — all byte-identical to `generalist/web/src/components/support/SpecialistWidget.tsx` (diff, neutral/slate normalised: the only behavioural deltas are the `ffp` storage prefix, `submitSiteLead`, `focusRing`, `bottom-4`, and the copy).
8. **Desktop opens the panel, mobile shows the peek.** 1280: `dialogOpen: true`, no peek. 390: peek present (`hasPeek`/`[aria-label="Dismiss"]`), panel closed.
9. **Opener line matches the taxonomy on every route measured.** `/` → "Not sure what you are looking for? I can point you to the right tool." (generic, `deriveTopic` returns null). Post `/blog/research-and-development/…` → "Looking at R&D relief? I can pull up the estimator that sizes a claim." (`rnd`). `/services/emi-scheme-setup` → "Want a hand with the EMI qualifying rules or your valuation? Happy to point you there." (`share-schemes`, variant 1 — stage `evaluating-us` from `visitedServices`). `/calculators/rd-relief-estimator` → `rnd`. `/contact` and `/thank-you` → generic variant 2 ("Speak to a startup accountant and get a straight answer. Want me to set that up?"), stage `ready`. No R&D opener on an EMI page or the reverse.
10. **Calculator chip appears on the right routes.** Present on the R&D post and `/calculators/*` (→ `rd-relief-estimator`), on `/services/emi-scheme-setup` (→ `emi-vs-unapproved-calculator`); absent on `/`, `/contact`, `/thank-you`. See G7 for the self-referential case.
11. **`role="dialog"` with an accessible name.** `aria-label="Ask an accountant"` measured on all six routes.
12. **`aria-modal` is not falsely claimed.** Attribute absent; the widget does not trap. Reported both ways in B1.
13. **Focus rings pass everywhere except the header close.** Launcher 6.29, email 6.29, question 6.29, submit 6.29, privacy link 6.29, all `:focus-visible: true`, `2px solid rgb(79,70,229)`, 400ms settle. Only `dialog_close` fails (B2).
14. **Text contrast inside the widget.** 1280 and 390, canvas-composited: header brand 15.99, "We reply within 24 hours" 10.79, opener bubble 15.13, chip text 9.93 ×2, "Ask an accountant" 7.90, "Send to an accountant" 7.90, consent paragraph 4.74, "Privacy Policy" 7.90, success copy 10.22, error text 4.77. All pass. Only the placeholder (G1) and the chip border (G2) fail.
15. **Validation messages, quoted.** Empty → "Enter a valid email address."; invalid email → "Enter a valid email address."; valid email, no message → "Add a short message so the accountant knows how to help."
16. **No lead reached the database.** `page.setRequestInterception(true)`; every `/api/leads/*` request captured then `req.abort('failed')` or stubbed with a local 200. One POST per run, to `http://localhost:3201/api/leads/submit`.
17. **Submitted payload.** `source: "startups-tech"` — equal to `niche.content_strategy.source_identifier`, the same value `components/forms/LeadForm.tsx:164` sends. `email`, `message: "[Specialist question (rnd)] …"`, `role: "Other"`, `captureMode: "email_only"`, `visitor_id: "v_4d12…"`, `session_id: "s_e175…"`, `consent_text` = `siteConfig.leadConsentText` + " See our Privacy Policy." — the shared estate wording, verbatim. `form_id` absent (B5).
18. **Error path and success path both render.** Aborted request → "Network error. Please try again." Request fulfilled with `{"success":true,"leadId":"…"}` (the shape `app/api/leads/submit/route.ts` returns) → "Thanks, we have your message. One of our accountants will reply by email within 24 hours…"
19. **Analytics.** `data-cta="specialist_widget"` present, with no `data-cta-goal` / `data-cta-placement` — byte-identical to Property and generalist, so `autoCapture` resolves placement from `nearestSection()` as intended. Events observed: `support_opened`, `cta_click`, `form_start`, `form_field_focus`, `form_submit`, `lead_submitted`; at 390 also `personalization_shown`, `personalization_dismissed`, `personalization_clicked`. Console: **0 errors and 0 page errors on all six routes**.
20. **Declined surfaces are absent.** Served HTML of `/`, `/contact`, `/calculators/rd-relief-estimator` grepped for `ReturningBar`, `DeepScrollModal`, `NextStepOffer`, sticky-bar markup: **0 hits each**; one `data-cta="specialist_widget"` per page. `sweep.mjs` counts 209 `data-cta` across 66 routes with 0 regressions.
21. **Instruments clean, matching the last clean run's shape.**
    - `node docs/_engines/instruments/browser_check.mjs --site=startups-tech --base=http://localhost:3201 --grounds` → "**152 page-loads, 0 with NEW problems**"; self-test OK (slate-500/white 4.76, slate-400/white 2.56); 0 unparseable colours. (Note: the widget's own failures at G1/G2 are inside a surface the instrument does not open, which is why it stays clean — see false premise F2.)
    - `node docs/_engines/instruments/sweep.mjs --site=startups-tech --base=http://localhost:3201 --article-depth=3` → "**66/66 URLs clean, 0/6 internal links dead, 0 LINK-FLOOR breaches (1806 links total), 0 data-cta regressions (209 total), 0 dash regressions (0 total)**".
22. **IntentProvider's 1500ms poll is quiet.** 9 seconds of idle after load (6+ ticks) at both widths: **1 network request**, `/api/track` (the analytics batch), and 0 console messages. The poll itself fires nothing.
23. **Copy: no em-dashes, no US spelling, no pricing, no credential claim, no "free call".** 57 authored lines extracted from `opener.ts` and `SpecialistWidget.tsx` and screened: 0 em-dashes or en-dashes, 0 US spellings, 0 price/fee references, 0 chartered/qualified/regulated/certified claims, 0 "free". `niche.cta.sticky_button` = "Get in touch" correctly replaces generalist's "Book a free call". Every turnaround line says "within 24 hours", which is the site's own `entity.next` wording. No existing site sentence was changed (the widget adds files and 19 lines to `layout.tsx`; nothing else in the commit).

---

## D) FALSE PREMISES

**F1 — `app/layout.tsx:129-131`: "IntentProvider itself no-ops on /embed/* and /admin/*, so the widget never renders there."**
The outcome is correct (measured, C4 and C5) but the stated mechanism is wrong. `IntentProvider` still renders its children on those routes; it only passes `null` as the context value. What actually stops the widget is `if (!ctx) return null` at `SpecialistWidget.tsx:275`. Anyone who later moves the widget outside the provider, or gives the context a non-null default, will ship it on `/embed` and `/admin` while the comment still says it is impossible.

**F2 — `SpecialistWidget.tsx:19-21`: "Bottom offset is bottom-4, not the generalist bottom-24: this site mounts no sticky bottom bar, so there is nothing to clear."**
There is something to clear: the footer's "Do not track me" consent toggle sits at y772-796 at 390, and `bottom-4` puts the launcher at y784-828 on top of it (B3). The reasoning considered only the surface that was removed, not the page that was already there.

**F3 — the review's own limit, stated so it is not mistaken for a clearance:** `browser_check.mjs` reporting "0 with NEW problems" is not evidence that the widget is clean. The instrument never opens the panel, so G1 (placeholder 2.58) and G2 (chip border 1.91) are invisible to it. Its pass and this review's failures are not in conflict.

---

## E) OWNER QUESTIONS

1. **The panel opens by itself and lands on top of your cookie opt-out.** At normal desktop size the panel that opens on its own covers the footer "Cookie policy" link and the "Do not track me" switch, and on a phone the closed button covers the switch even when the panel is shut. That is your only privacy control. Do you want the widget lifted clear of the footer (the generalist position), which is a one-line change, before this goes live?

2. **It costs you a Core Web Vitals score on the homepage.** Google grades layout movement; anything above 0.10 is "needs improvement". The homepage measures 0.111 at desktop size, and every bit of it is the widget appearing 1 second after the page loads. Fix it, or accept the grade?

3. **Keyboard users cannot use it.** Escape does not close it, and pressing Tab after it opens sends you to the top of the page instead of into the panel. This is the same on Property and on Holloway Davies, so fixing it here alone leaves the estate inconsistent. Fix all three, fix this one, or park it?

4. **Widget leads will look like contact-form leads.** The site already has a label for "Ask a specialist widget", but the widget does not stamp it on the lead, so you will not be able to tell in the handoff or the notification email which leads the widget produced. Property does stamp it. One line. Worth doing before launch, because leads sent without it cannot be re-labelled later.

5. **Two copy lines you should see.** Both are the message shown when a visitor fumbles a form, and both break the rule the file itself sets (one sentence, under 20 words):
   > "Looks like the form gave you a bit of trouble. Send a question here instead and we will reply within 24 hours."

   > "Looks like the form gave you a bit of trouble. Send a question about *[your R&D claim]* here instead and we will reply within 24 hours."

   Nothing in them breaks your rulings — no price, no credential, no free call, and "within 24 hours" is what the site already promises. They are just long and a bit apologetic. Keep, or shorten?

6. **A visitor who enquires keeps being pinged.** Once someone sends a message, the widget is supposed to stand down. It only does so from their next full page load, so for the rest of that visit they keep getting nudges. Fix now, or leave it as it is on the other two sites?

---

## Artefacts

Screenshots kept in the session scratchpad (`scratchpad/r7/`): `S_m390_*`, `S_d1280_*`, `F_m390_*`, `F_d1280_*`, `A_d1280.png`, `A_m390.png`, `W_*_chips.png`, `W_fulfil200_success.png`, `G_widget_over_closing_panel_1280.png`, `G_widget_composer_over_panel_1280.png`.
Instrument output: `browser_r7.json`, `sweep_r7.json`. Measurement scripts deleted.
