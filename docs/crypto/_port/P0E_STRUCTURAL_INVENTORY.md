# P0-E: crypto structural live-defect and disposition inventory

Date: 2026-09-14. Read-only. Site: `crypto/web`. Server asserted:

```
curl -s http://localhost:3171/ | grep -o '<title>[^<]*</title>'
<title>Crypto Tax Partners | Specialist UK Crypto Tax Accountants</title>
```

## Headline

crypto has **no site header and no navigation of any kind**, on any route. Not a
drifted breakpoint, not a broken drawer: there is no header component in the
repo. The only chrome is a local flat-link footer. Everything else in this
report is secondary to that.

---

## 1. Route and component disposition

### Routes (25 `page.tsx`)

| Route | Rendered by | Chrome today | Disposition |
|---|---|---|---|
| `/` | `src/app/page.tsx` | footer only, **no `<main>`** | restyle + adopt kit shell |
| `/about` | `src/app/about/page.tsx` | footer only, **no `<main>`** | restyle + adopt kit shell |
| `/services` | `src/app/services/page.tsx` (+ kit `ServiceTiers`) | footer only, **no `<main>`** | keep tiers, adopt shell |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx`, data `src/data/crypto-services.ts` (5 slugs) | footer only | restyle + adopt shell |
| `/for` | `src/app/for/page.tsx` | footer only | restyle + adopt shell |
| `/for/[slug]` | `src/app/for/[slug]/page.tsx`, data `src/data/crypto-hubs.ts` (6 slugs) | footer only | restyle + adopt shell |
| `/blog` | `src/app/blog/page.tsx` | footer only, has `<main>` | adopt kit blog surfaces |
| `/blog/[category]` | `src/app/blog/[category]/page.tsx` (4 categories) | footer only | adopt kit |
| `/blog/[category]/[slug]` | `src/app/blog/[category]/[slug]/page.tsx`, 19 `.md` | footer only | adopt kit article + **fix E3** |
| `/calculators` | `src/app/calculators/page.tsx` | footer only | adopt shell |
| `/calculators/[slug]` | `src/app/calculators/[slug]/page.tsx` (4 tools) | footer only | adopt shell |
| `/embed/[slug]` | `src/app/embed/[slug]/page.tsx` | deliberately chrome-free | **keep local, exclude from shell** |
| `/contact` | `src/app/contact/page.tsx` + `LeadForm` | footer only | adopt shell |
| `/book` | `src/app/book/page.tsx` + `BookingPicker` | footer only | keep local |
| `/complete` | `src/app/complete/page.tsx` + `DetailsForm` | footer only | keep local |
| `/thank-you` | `src/app/thank-you/page.tsx` | footer only | keep local |
| `/research/crypto-tax-gap-index` | own page, data `src/data/uk-crypto-tax-gap-index.json` | footer only | restyle only |
| `/privacy-policy` `/cookie-policy` `/terms` | own pages | footer only | restyle only |
| `/admin/analytics` (+ `/leads` `/trends` `/login` `/visitor/[id]`) | kit `console/*` components | none by design, 307 to login | **do not touch** |

### Components under `crypto/web/src/`

Only **nine** non-page `.tsx` files exist. This is a thin site.

| Component | Consumers (proved at call site) | Disposition |
|---|---|---|
| `src/components/ui/SiteFooter.tsx` | `src/app/layout.tsx:29` (global) | **retire** → kit `SiteFooter` via `PageShell` |
| `src/components/ui/layout-utils.ts` | 20+ call sites across `src/app` | keep during port, converge on kit `layout-utils` in phase 2 |
| `src/components/forms/LeadForm.tsx` | `/`, `/contact`, `/services` (3 mounts) | keep local (nurture-wired), restyle |
| `src/components/forms/BookingPicker.tsx` | `/book` | keep local |
| `src/components/forms/DetailsForm.tsx` | `/complete` | keep local |
| `src/components/calculators/CalculatorClient.tsx` | `/calculators/[slug]:79`, `/embed/[slug]` | keep (wraps kit `tools/components/Calculator`) |
| `src/components/calculators/MiniCapture.tsx` | `/calculators/[slug]:107` **and** `CalcResultCta.tsx:8` | see E7; candidate to adopt kit `leads/MiniCapture` |
| `src/components/calculators/CalcResultCta.tsx` | `/calculators/[slug]:79` as `resultCta` | keep |
| `src/app/admin/.../VisitorTabs.tsx` | admin only | do not touch |
| `src/app/error.tsx`, `src/app/not-found.tsx` | framework | restyle, add shell |

**No component was retired by name from another site's list.** Every row above
was derived from a grep of its own call sites in this repo.

---

## 2. Chrome contract, measured

**Which chrome does crypto use?**

```
grep -rn "SiteHeader\|PageShell" crypto/web/src   ->  0 hits
grep -rn "SiteFooter" crypto/web/src              ->  layout.tsx:7,29 + the LOCAL component
```

crypto uses **neither**. It has a local footer and **no header at all**.

**Rendered-DOM measurement, all routes:**

```
for p in / /about /services /contact /blog /calculators /for /research/... /book; do
  curl -sL http://localhost:3171$p | grep -c '<header'   # 0 on every route
  curl -sL http://localhost:3171$p | grep -c '<nav'      # 0 on every route
done
```

| Check | Property / kit value | crypto measured |
|---|---|---|
| Burger breakpoint | `lg:hidden` (`SiteHeader.tsx:480`) | **no burger exists** |
| Drawer breakpoint | `lg:hidden` (`SiteHeader.tsx:493`) | **no drawer exists** |
| Desktop nav breakpoint | `hidden … lg:flex` (`SiteHeader.tsx:414`) | **no nav exists** |
| Primary CTA breakpoint | `hidden … lg:inline-flex` (`SiteHeader.tsx:473`) | **no header CTA exists** |

The four-token drift check the brief asks for is **not applicable to crypto and
is clean in the kit**: all four are `lg:` in `SiteHeader.tsx`, so the kit has no
768–1023px nav hole. Adopting the kit inherits a consistent contract.

At 390 / 768 / 1024 / 1440 crypto renders identically: no navigation at any
width. The only internal navigation on the site is the eight-link footer list
(`SiteFooter.tsx:5-14`), below the fold on every page.

---

## 3. The six kit-chrome props

Read from `packages/web-shared/design/chrome/SiteHeader.tsx` and
`SiteFooter.tsx`. HTTP statuses probed against `http://localhost:3171`.

| Prop | Default | crypto must pass | Probed status of the default's href |
|---|---|---|---|
| `SiteHeader.ctaContactGoal` | `"form"` (`SiteHeader.tsx:348`) | **`"form"` — keep default.** crypto emits exactly one `data-cta` on the whole site (`thankyou-return-article`); there is no live `vw_cta_performance` header series to split. Free choice, so take Property's literal. | n/a |
| `SiteHeader.ctaMobilePlacement` | `"mobile_menu"` (`SiteHeader.tsx:349`) | **`"mobile_menu"` — keep default.** Same reason: no pre-port header instrumentation to preserve. | n/a |
| `SiteFooter.resourcesHref` | `"/landlord-tax"` (`SiteFooter.tsx:80`) | **must override.** `/landlord-tax` does not exist on crypto. crypto's hub equivalent is `/for` (6 children) or `/services` (5 children). Recommend `"/for"`. | `GET /landlord-tax` → **404** |
| `SiteFooter.companyItems` | `[About, Contact, Locations, Book a consultation]` (`SiteFooter.tsx:81-86`) | **must override.** Drop `Locations`. Pass `[{About,/about},{Contact,/contact},{Book a consultation,/book}]`. | `/about` **200**, `/contact` **200**, `/locations` **404**, `/book` **200** |
| `SiteFooter.showBuilderCredit` | `true` (`SiteFooter.tsx:132`) | **pass nothing.** Correct estate-wide; do not re-introduce a `false` override. | n/a |
| `SiteHeader.wordmarkAccentColor` | `undefined` → `text-primary-600` ramp step (`SiteHeader.tsx:137`) | **must pass `#0e1a3a`.** crypto's brand navy is not a ramp step, and see E5: crypto has no `primary-*` ramp at all, so the default resolves to nothing. | n/a |

**Every default object in both signatures was read, not just the expected two.**
The third default object is `DEFAULT_CTA_IDS` (`SiteHeader.tsx:40-44`:
`header_book` / `header_book_mobile` / `header_contact`). crypto has no
conflicting ids, so **omit `ctaIds`** and take the canonical set. No other
default object emits an href.

---

## 4. Dead internal links and the redirect map

Method: every unique `href="/…"` in `src/` and `content/` (40 distinct),
resolved against the running server, not against an assumed directory.

```
grep -rhoE 'href="/[^"#?]*"' src/ content/ | sed 's/href="//;s/"//' | sort -u \
  | while read h; do curl -s -o /dev/null -w '%{http_code} '"$h"'\n' "http://localhost:3171$h"; done
```

| Result | Count | Detail |
|---|---|---|
| 200 | 37 | all content, service, hub, calculator and policy routes |
| 307 | 3 | `/admin/analytics`, `/admin/analytics/leads`, `/admin/analytics/trends` — auth redirect to login, correct behaviour, not links in page copy |
| **404** | **0** | |
| **301 / 308** | **0** | |

**Redirect map: there is none.** `crypto/web/src/middleware.ts` **does not
exist**. The only redirect in the project is an apex→www host rule in
`next.config.ts:19-30`, which never touches a slug. Therefore the
duplicate-card failure mode the brief describes (a slug that 301s while its
`.md` is still on disk) **cannot occur on crypto today**, and there is no
per-surface filter divergence to check in `getAllPosts()`.

All 19 `.md` files in `content/blog/` resolve; the 6 not in the href list are
reachable only from listing pages, which is correct.

---

## 5. Anchor scroll offsets

```
grep -rhoE 'href="#[^"]*"' src/ content/    ->  0 hits
grep -rn "scroll-mt\|scroll-margin" src/    ->  1 hit
```

| Anchor target | Route | Offset | Verdict |
|---|---|---|---|
| `#get-expert-help` | `/calculators/[slug]` (`calculators/[slug]/page.tsx:106`) | `scroll-mt-24` (96px) | OK |
| `#main` | **every route** | **does not exist** | see E2 |

There are **zero in-page anchor links** on crypto, so no anchor currently lands
short. But `#main` is absent site-wide and there is no skip link, which is the
same defect the sibling had in a worse form: the sibling's `#main` had a 0px
offset, crypto's has no target at all.

---

## 6. FAQ mechanism, per surface

crypto renders FAQs with a **native `<details>`/`<summary>`**, not the kit's
Radix accordion. Native `<details>` keeps the answer in the server HTML even
when closed. So crypto's hub and service surfaces are **correct today and the
kit's `FaqSection` would regress them**.

| Surface | Renders FAQs? | Mechanism | Answers in server HTML? |
|---|---|---|---|
| `/` homepage | yes, 7 pairs (`page.tsx:220,689-706`) | native `<details>` | **yes** |
| `/services/[slug]` | yes (`services/[slug]/page.tsx:76-85`) | native `<details>` | **yes** |
| `/for/[slug]` | yes (`for/[slug]/page.tsx:76-85`) | native `<details>` | **yes** |
| `/calculators/[slug]` | yes (`calculators/[slug]/page.tsx:92-105`) | plain `<h3>`+`<p>` list, always open | **yes** |
| `/blog/[category]/[slug]` | **NO — schema only** (`blog/[category]/[slug]/page.tsx:65-73`) | FAQPage JSON-LD emitted; **no render block exists** | **NO — see E3** |
| `/contact` | no FAQ surface | n/a | n/a |

**Verified absence, not inferred:** parsed the FAQPage JSON-LD out of a rendered
post and searched the script-stripped body for each answer string.

```
curl -s http://localhost:3171/blog/hmrc-disclosure-and-compliance/can-hmrc-track-crypto-wallets
-> 7 of 7 acceptedAnswer texts ABSENT from the page body
```

**Do crypto's posts render answers in a plain list that IS in the server HTML?**
No. The brief's premise is false for crypto: the post page maps `post.faqs` into
JSON-LD at line 69 and nowhere else. 19 posts carry `faqs:` frontmatter; 18 have
7 pairs, one (`legitimate-ways-reduce-crypto-cgt-uk.md`) has 6. **≈132 FAQPage
answers are asserted to crawlers and absent from every page.**

**HTML inside answers:** 3 answer values in `content/blog/*.md` contain markup.
The blog surface strips it for schema (`.replace(/<[^>]+>/g, "")`, line 72) and
never renders it, so nothing is lost today. But the hub/service/calculator
surfaces interpolate `{faq.answer}` as a JSX child, which **escapes** HTML. If
phase 1 adds a blog FAQ render block by copying that pattern, those 3 answers
would render visible raw tags. Render the blog block with the same `<details>`
markup but interpolate the answer through `dangerouslySetInnerHTML`, matching how
the post body itself is rendered.

---

## 7. Accessibility defects that hide data

| Check | Finding |
|---|---|
| `role="img"` on a chart/figure wrapper | **none on the site.** `grep -rn 'role="img"' src/` → 0 hits |
| `aria-hidden` removing values from the a11y tree | **none.** `grep -rn 'aria-hidden' src/app/research/` → 0 hits |
| `sr-only` on a `<table>` | **not present.** The only `sr-only` in `src/` is on a `<caption>` (`page.tsx:618`), which is `display: table-caption`, not `display: table`, so the width-as-minimum bug does not apply |
| `/research/crypto-tax-gap-index` | renders a plain semantic `<table class="w-full …">` at line 181 with **no SVG chart and no chart component**. No a11y defect here |

**The a11y defects the brief carries forward from a sibling are all absent on
crypto.** The real a11y findings are E2 (no `<main>`, no skip link) and E4
(the `<table>` at research:181 has no `<caption>`).

---

## 8. Interruptive UI and capture surfaces (inventory only, nothing changed)

**Interruptions: zero.**

```
grep -rniE "modal|banner|popup|toast|exit.?intent|z-50" src/components src/app --include=*.tsx
```

| Interruption | Trigger | Timing |
|---|---|---|
| — | — | none exist |

The only timer on the site is `LeadForm.tsx:182` — `setTimeout(() => router.push(dest), 800)`,
a post-submit navigation delay, not an interruption. `exit_intent_shown` appears
once, at `admin/analytics/visitor/[visitorId]/page.tsx:38`, as a **label in the
admin event dictionary**; no exit-intent surface is mounted on the public site.

**Capture surfaces:**

| Surface | Mount sites | `data-cta` |
|---|---|---|
| `LeadForm` | `/` , `/contact`, `/services` (1 each) | none |
| `MiniCapture` (local, `src/components/calculators/MiniCapture.tsx`) | `/calculators/[slug]:107` directly **and** via `CalcResultCta.tsx:8` | none |
| `CalcResultCta` | `/calculators/[slug]:79`, inside the calculator result | none |
| thank-you return link | `/thank-you` | `thankyou-return-article` |

**`packages/web-shared/leads/MiniCapture.tsx` mounts zero times per page on
crypto.** crypto imports a *local* `MiniCapture` of the same name — a shadowing
trap. The kit file exists but is unused here.

**`data-cta` count across the entire site: 1.** Flagged for P0-D.

**MiniCapture mounts per calculator page: 2** (one in the result panel, one in
the page footer). Both are the local component. Whether that double mount is
intended is an owner question, not a port decision — **changed nothing**.

---

## 9. The RSC boundary — REQUIRED pattern, not a defect

Confirmed. `wordmarkIcon` is typed `ComponentType<…>`
(`packages/web-shared/design/chrome/SiteHeader.tsx:14-20`, prop declared at :88)
and `PageShell.tsx:1` is `"use client"`. A component function cannot be
serialised across the RSC boundary, so a Server Component page cannot pass
`wordmarkIcon` to `PageShell` directly.

**Required pattern for phase 1:** crypto adds one thin `"use client"` shell
(e.g. `src/components/ui/CryptoShell.tsx`) that imports the lucide icon itself,
wraps `PageShell`, and is mounted from `src/app/layout.tsx` in place of the
current bare `<SiteFooter />`. `PageShell` already exempts `/embed/` internally
(`PageShell.tsx:27-30`), so crypto's embed route needs no special-casing.

---

## 10. Property's known defects — DO NOT COPY

| Claimed defect | Verified? | Evidence |
|---|---|---|
| `WhatToExpectCard` default props publish a fee line no page authored | **REAL** | `packages/web-shared/design/marketing/WhatToExpectCard.tsx:22-27` — `DEFAULT_ITEMS` ends `"Fixed fee quote if you decide to proceed"`, applied whenever a caller omits `items` (`:31`). crypto publishes no fees; **always pass `items` explicitly** |
| `FaqSection` is a Radix accordion with no `forceMount` | **REAL** | `packages/web-shared/design/primitives/FaqSection.tsx:34-43` — `<Accordion type="single" collapsible>` with a bare `<AccordionContent>`; no `forceMount` anywhere in the file. **Do not adopt it on crypto**: crypto's native `<details>` is strictly better and adopting the kit would move 4 correct surfaces into the asserted-but-absent failure |
| `NumberedReasons` animates off keyframe classes its siblings lack | **REAL, but restate it** | The component carries no `animate-*` utility. It emits `story-numeral` and `story-numeral-rule` (`packages/web-shared/design/marketing/NumberedReasons.tsx:62,69`), which are defined **only** in `Property/web/src/app/globals.css:653-679`. `grep -rn "story-numeral" crypto/web/src` → 0. Adopting `NumberedReasons` on crypto renders an unstyled numeral with no rule. The brief's wording ("keyframe classes") is imprecise; the mechanism is a CSS dependency that lives outside the kit |
| Property's `LeadCTAPanel` passes "Fixed fees, quoted upfront" / "24-hour response" | **PARTLY REAL** | `Property/web/src/app/about/page.tsx:233-237` passes `{title: "Fixed fees, quoted upfront", detail: "In writing, before any work starts"}` — confirmed, across 10+ call sites. **"24-hour response" was not found** at the sampled call site. Either way the instruction stands: crypto passes `proofPoints={[]}` and invents no replacement |

---

## Defect list

| ID | Sev | Defect | file:line | Deriving command |
|---|---|---|---|---|
| **E1** | **Critical** | **No site header and no navigation on any route.** A visitor landing on a blog post or calculator has no way to reach services, contact or the homepage except the footer link list below the fold. No burger, no drawer, no wordmark home link. | `crypto/web/src/app/layout.tsx:26-31` (renders only `{children}` + `<SiteFooter />`); no header file exists under `src/` | `curl -sL http://localhost:3171/blog \| grep -c '<header\|<nav'` → `0` (same on all 9 routes probed) |
| **E2** | **High** | **No `<main>` landmark and no skip link, site-wide.** `/`, `/about` and `/services` emit no `<main>` at all; no route emits `id="main"` or a "Skip to content" link. Keyboard and screen-reader users cannot skip chrome, and there is no main landmark to skip to. | `crypto/web/src/app/layout.tsx:26-31`; `crypto/web/src/app/page.tsx`, `about/page.tsx`, `services/page.tsx` | `curl -s http://localhost:3171/ \| grep -c '<main'` → `0`; `grep -c 'id="main"'` → `0` on all 7 routes |
| **E3** | **High** | **≈132 FAQPage answers asserted to crawlers and absent from every page.** All 19 posts emit FAQPage JSON-LD but the post template never renders a FAQ block. This is the sibling's asserted-but-absent defect in its worst form: not collapsed, entirely missing. | `crypto/web/src/app/blog/[category]/[slug]/page.tsx:65-73` (`post.faqs` used for schema only; no render) | JSON-LD parsed from a rendered post vs script-stripped body → 7 of 7 answers ABSENT |
| **E4** | **Medium** | Research data table has no `<caption>`, so a screen reader gets an unlabelled table on the site's flagship data asset. | `crypto/web/src/app/research/crypto-tax-gap-index/page.tsx:181` | `grep -n "<table\|caption" src/app/research/crypto-tax-gap-index/page.tsx` |
| **E5** | **Medium** | **No `@theme` block and no `primary-*` colour ramp.** Every kit component styles off `text-primary-600` / `bg-primary-600` / `btnPrimary`. Adopting kit chrome before defining the ramp ships a header with missing colours. Hard blocker for phase 1. | `crypto/web/src/app/globals.css:1-11` (no `@theme`, no `--color-primary-*`) vs `Property/web/src/app/globals.css:91` | `grep -rn "primary-600\|@theme" crypto/web/src/app/globals.css` → 0 hits |
| **E6** | **Medium** | Primary button hovers from navy `#0e1a3a` to rust `#8f421f` and actives to `#6e3118` — an orange ramp left over from another palette, on a navy brand. Visible on every CTA. | `crypto/web/src/components/ui/layout-utils.ts` (`btnPrimary`, `hover:bg-[#8f421f] active:bg-[#6e3118]`) | `cat crypto/web/src/components/ui/layout-utils.ts` |
| **E7** | **Low** | Local `MiniCapture` shadows the kit's `packages/web-shared/leads/MiniCapture.tsx` by name. Two mounts per calculator page. Any port instruction phrased as "MiniCapture" is ambiguous on this site. | `crypto/web/src/components/calculators/MiniCapture.tsx:14`; mounts at `calculators/[slug]/page.tsx:107` and `CalcResultCta.tsx:8` | `grep -rn "MiniCapture" crypto/web/src` |
| **E8** | **Low** | Effectively no CTA instrumentation: one `data-cta` on the whole site. No header, hero, service or lead-form CTA is attributable. | site-wide; only `thank-you` carries one | `grep -rhoE 'data-cta="[^"]*"' crypto/web/src \| sort \| uniq -c` → 1 |

Severity counts: **Critical 1, High 2, Medium 3, Low 2.**

---

## False premises in this brief

1. **"crypto currently uses its own header/footer or the kit's; establish which
   with a grep."** Neither. crypto has a local footer and **no header at all**.
   The premise assumes a header exists; it does not.
2. **"Measure the burger's breakpoint, the drawer's, the nav's and the primary
   CTA's."** Not measurable. None of the four elements exist in crypto's DOM at
   any viewport. Reported as E1 instead.
3. **"A one-token drift between burger (`lg:hidden`) and drawer (`md:hidden`)."**
   Not present in the kit. `SiteHeader.tsx:414/473/480/493` are all `lg:`. The
   kit contract is internally consistent; there is nothing to inherit here.
4. **"Compare `crypto/web/src/middleware.ts` (if it exists) against
   `ls content/blog/`."** `src/middleware.ts` **does not exist**. There is no
   slug redirect map, so the duplicate-card mechanism cannot occur and there is
   no `getAllPosts()` filter divergence to audit.
5. **"`#main`, which had `scroll-margin-top: 0px` on every route of a sibling
   site."** crypto has **no `#main` target and no in-page anchors at all**. The
   check as written passes vacuously; the real finding is E2.
6. **"Whether crypto's posts already render answers in a plain list that IS in
   the server HTML."** They do not render answers at all. The premise assumes a
   rendered list exists somewhere on the blog surface; it does not (E3).
7. **"Adopting the kit FAQ would have STRIPPED answer text from 196 posts on one
   sibling."** On crypto the risk runs the other way: crypto's four working FAQ
   surfaces use native `<details>` and are *correct*, so adopting the kit's
   `FaqSection` would **introduce** the asserted-but-absent defect on four
   surfaces that do not have it today.
8. **"Check `src/app/research/crypto-tax-gap-index/` … and any chart component
   it renders."** It renders no chart component. It is a plain semantic table
   with no `role="img"`, no `aria-hidden` and no SVG. All three a11y defects
   carried from the sibling are absent.
9. **"Note how many times `packages/web-shared/leads/MiniCapture.tsx` mounts per
   page."** Zero. crypto imports a same-named local component instead (E7).
10. **"`NumberedReasons` animates off keyframe classes its siblings lack."** The
    component contains no `animate-*` utility. The real dependency is on
    `.story-numeral` / `.story-numeral-rule`, defined only in Property's
    `globals.css`. Substance holds, mechanism was misstated.
11. **"Property's `LeadCTAPanel` call site passes … '24-hour response'."** Not
    found at the sampled Property call site. "Fixed fees, quoted upfront" is
    confirmed. The instruction (`proofPoints={[]}`, invent nothing) is unchanged.
12. **Not false, confirmed:** 19 posts, ~25 `page.tsx` routes, `/admin/*` and
    `/embed/[slug]` present, consumes `web-shared/tools`, renders kit
    `ServiceTiers` on `/services` (`services/page.tsx`), no locations surface,
    `package.json` does not list `tw-animate-css`. All verified.

---

## What phase 1 must do first

**The port's first job is not design. It is that crypto has no navigation.**
E1 outranks every styling decision in this document, and it changes the order of
the playbook's phases for this site.

1. **Define the token ramp before mounting any kit component (E5).** Add an
   `@theme` block to `crypto/web/src/app/globals.css` mapping `--color-primary-*`
   onto the brand navy `#0e1a3a`. Without it, `btnPrimary`, the wordmark and
   every kit surface render colourless. This is the single hard blocker; P0-C
   owns the palette, phase 1 owns landing it.
2. **Add the client shell and mount `PageShell` (E1 + E2 together).** One
   `"use client"` wrapper importing its own lucide icon (section 9), mounted from
   `layout.tsx` in place of the bare `<SiteFooter />`. This buys the header, the
   nav, the drawer at a consistent `lg:`, the `<main id="main">` landmark and the
   skip link in one change. Build the `NavItem[]` server-side from
   `crypto-services.ts`, `crypto-hubs.ts` and the calculator registry.
3. **Pass the four props that are wrong by default (section 3):**
   `resourcesHref="/for"`, a `companyItems` without `/locations` (it 404s),
   `wordmarkAccentColor="#0e1a3a"`. Omit `ctaIds`, `ctaContactGoal`,
   `ctaMobilePlacement` and `showBuilderCredit` — the defaults are right here
   because crypto has no CTA history to split.
4. **Retire the local `SiteFooter`** only once the kit footer renders its columns
   correctly from the new nav tree; verify the eight current footer links all
   still resolve (they all 200 today).
5. **Render the blog FAQ block (E3).** Copy the native `<details>` markup from
   `for/[slug]/page.tsx:76-85`, not the kit `FaqSection`, and interpolate the
   answer through `dangerouslySetInnerHTML` so the 3 answers containing markup
   are not escaped. ≈132 schema assertions become true.
6. **Do not adopt `FaqSection`, `NumberedReasons` or `WhatToExpectCard`'s
   defaults** (section 10). crypto's FAQ mechanism is better than the kit's.
7. **Leave the interruption and capture surfaces exactly as they are.** There
   are no interruptions today. Adding one, or changing the double `MiniCapture`
   mount, is an owner gate.

Budget note consistent with the playbook: on this site the design work is the
smaller half. E1, E2, E3 and E5 are live defects, not styling, and they are the
critical path.
