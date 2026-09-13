# Estate sweep: unstyled `prose` / `section-label` (2026-09-13)

Report only. Nothing edited, nothing built, no server started. Source reads plus
`curl` against live production.

## Method

- Site list derived from the filesystem: every directory with a `web/` Next.js app.
- Source usage counted with `grep -rn 'className="[^"]*\bprose\b'` excluding
  `not-prose` / `max-w-prose` (those are unrelated and harmless).
- Built CSS counted with `cat <site>/web/.next/static/css/*.css | grep -o <token> | wc -l`.
- `.prose` (typography-plugin selector) counted separately from `.prose-blog`
  (the estate's own hand-rolled article style) — a raw `prose` count conflates them.

## Estate-wide facts established first

1. `@tailwindcss/typography` is **not installed anywhere** in the monorepo.
   `ls node_modules/@tailwindcss/` returns `node, oxide, oxide-win32-x64-msvc, postcss`.
   `grep -rn "tailwindcss/typography" */web/package.json package.json` → no hits.
2. **No `@plugin` line exists in any `globals.css`** in the estate.
   `grep -rn "@plugin" */web/src/app/globals.css packages/web-shared` → no hits.
   Every site is Tailwind v4 (`"tailwindcss": "^4"`), so both would be required.
3. The estate's real article style is a **hand-rolled `.prose-blog` + `.article-body`**
   block in each site's `globals.css`. That is why many built stylesheets contain
   the substring `prose` while containing zero typography-plugin rules.
4. Exactly one site hand-rolls the **bare `.prose`** selector: **Solicitors**
   (12 rules, `globals.css`), which is why its built CSS shows `.prose{max-width:68ch}`.
   Nobody else does.

Consequence: **any component emitting the bare `prose` / `prose-*` classes on any
site other than Solicitors renders as unstyled HTML.** That is the class.

## Table 1 — `prose`

`src prose` = load-bearing bare-`prose` class strings (comments, `not-prose`,
`max-w-prose` excluded). `built .prose` = typography-style rules actually shipped.

| Site | src `prose` (files) | `@tailwindcss/typography` in package.json | `@plugin` in globals.css | build on disk | built `.prose` | built `.prose-blog` | VERDICT |
|---|---|---|---|---|---|---|---|
| Dentists | 0 | no | no | yes | 0 | 22 | N-A |
| Medical | 1 — `app/resources/[topic]/page.tsx:158` | no | no | yes | 0 | 27 | **BROKEN** |
| Property | 0 | no | no | yes | 0 | 24 | N-A |
| Solicitors | 0 | no | no | yes | **14 (hand-rolled)** | 29 | OK |
| ashfield | 0 | no | no | yes | 0 | 11 | N-A |
| care | 1 — `app/blog/[category]/[slug]/page.tsx:94` | no | no | yes | 0 | 0 | **BROKEN** |
| charities | 2 — `app/blog/[category]/[slug]/page.tsx:110`, `app/guides/[slug]/page.tsx:89` | no | no | yes | 0 | 0 | **BROKEN** |
| console | 0 | no | no | yes | 0 | 0 | N-A |
| construction-cis | 0 | no | no | yes | 0 | 22 | N-A |
| contractors-ir35 | 1 — `app/resources/[topic]/page.tsx:161` | no | no | yes | 0 | 18 | **BROKEN** |
| crypto | 1 — `app/blog/[category]/[slug]/page.tsx:105` | no | no | yes | 0 | 0 | **BROKEN** |
| digital-agency | 2 — `app/resources/[topic]/page.tsx:114`, `app/team/[slug]/page.tsx:95` | no | no | yes | 0 | 16 | **BROKEN** |
| divorce-finances | 1 — `app/resources/[topic]/page.tsx:105-108` | no | no | yes | 0 | 18 | **BROKEN (dormant)** |
| ecommerce | 1 — `app/blog/[category]/[slug]/page.tsx:50` | no | no | yes | 0 | 0 | **BROKEN** |
| generalist | 0 | no | no | yes | 0 | 17 | N-A |
| hospitality | 1 — `app/blog/[category]/[slug]/page.tsx:125` | no | no | yes | 0 | 0 | **BROKEN** |
| pharmacies | 1 — `app/blog/[category]/[slug]/page.tsx:109` | no | no | yes | 0 | 0 | **BROKEN** |
| startups-tech | 2 — `app/blog/[category]/[slug]/page.tsx:97`, `app/research/startup-formation-survival-index/page.tsx:178` | no | no | yes | 0 | 0 | **BROKEN** |
| wills-probate | 1 — `app/resources/[topic]/page.tsx:105-108` | no | no | yes | 0 | 18 | **BROKEN (dormant)** |

Every site has a build on disk (`.next/static/css/*.css` present); none is absent.

### Pages affected per BROKEN site

| Site | Route | Pages |
|---|---|---|
| care | `/blog/[category]/[slug]` | 19 posts |
| charities | `/blog/[category]/[slug]` + `/guides/[slug]` | 24 posts + 8 guides |
| crypto | `/blog/[category]/[slug]` | 19 posts |
| ecommerce | `/blog/[category]/[slug]` | 14 posts |
| hospitality | `/blog/[category]/[slug]` | 23 posts |
| pharmacies | `/blog/[category]/[slug]` | 22 posts |
| startups-tech | `/blog/[category]/[slug]` + 1 research page | 32 posts + 1 |
| Medical | `/resources/[topic]` | 3 guides (`content/resources/*.md`) |
| contractors-ir35 | `/resources/[topic]` | 3 guides |
| digital-agency | `/resources/[topic]` (+ `/team/[slug]`, 404 live, no data) | 3 guides |
| divorce-finances | `/resources/[topic]` | 0 files on disk → route renders nothing; site not deployed |
| wills-probate | `/resources/[topic]` | 0 files on disk → route renders nothing; site not deployed |

Total live, user-visible: **161 blog/guide pages across 10 deployed sites.**

## Table 2 — `section-label`

The rule is defined in only 6 sites' `globals.css`
(`Property:378`, `construction-cis:289`, `contractors-ir35:289` (inside `@layer components`),
`digital-agency:262`, `divorce-finances:174`, `wills-probate:174`). It is defined
nowhere in `packages/web-shared`.

| Site | src uses | rule in own globals.css | built CSS `section-label` | VERDICT |
|---|---|---|---|---|
| Dentists / Medical / Solicitors / ashfield / care / ecommerce / generalist / console | 0 | no | 0 | N-A |
| Property | 0 (defines it, uses it nowhere) | yes | 1 | OK (dead rule) |
| construction-cis | 49 | yes | 1 | OK |
| contractors-ir35 | 5 | yes | 1 | OK |
| divorce-finances | 16 | yes | 1 | OK |
| wills-probate | 20 | yes | 1 | OK |
| digital-agency | 0 | yes | 1 | OK (dead rule) |
| **charities** | 8 (`app/page.tsx`) | no | 0 | **BROKEN** |
| **crypto** | 8 (`app/page.tsx`) | no | 0 | **BROKEN** |
| **hospitality** | 8 (`app/page.tsx`) | no | 0 | **BROKEN** |
| **pharmacies** | 10 (`app/page.tsx`) | no | 0 | **BROKEN** |
| **startups-tech** | 9 (`app/page.tsx`) | no | 0 | **BROKEN** |

## Table 3 — `@source` covering `packages/web-shared`

| Site | `@source` line | Imports from web-shared |
|---|---|---|
| Dentists, Medical, Property, Solicitors, construction-cis, generalist | `@source "../../../../packages/web-shared";` | yes |
| contractors-ir35 | same, line 10 | yes |
| console | `@source "../../../../packages/web-shared/console";` | yes |
| **ashfield** | **none** | 7 files |
| **care** | **none** | 53 files |
| **charities** | **none** | 53 files |
| **crypto** | **none** | 51 files |
| **digital-agency** | **none** | 81 files |
| **divorce-finances** | **none** | 72 files |
| **ecommerce** | **none** | 53 files |
| **hospitality** | **none** | 52 files |
| **pharmacies** | **none** | 51 files |
| **startups-tech** | **none** | 52 files |
| **wills-probate** | **none** | 73 files |

Eleven sites import shared components whose files Tailwind v4 never scans, so any
utility class used **only** inside `packages/web-shared` ships no rule on those
sites. Spot-confirmed on care: `SnapshotCard.tsx` (rendered at `/admin/analytics`)
uses `p-3.5`, and `care/web/.next/static/css/*.css` contains no `.p-3\.5` rule.
Impact of this second defect is mostly internal admin surfaces; it is reported,
not fully quantified.

## Live production confirmations

Command shape used throughout:

```
curl -s <page>            | grep -o 'class="[^"]*prose[^"]*"'
curl -s <domain>/_next/static/css/<hash>.css | grep -o '\.prose' | wc -l
```

| Site | URL (HTTP 200) | Emitted class | Stylesheet | `.prose` rules |
|---|---|---|---|---|
| charities | `https://www.trusteetax.co.uk/blog/charity-governance/how-long-do-uk-charities-last` | `class="prose prose-neutral mt-10 max-w-none"` | `/_next/static/css/6409785f8fd3e89b.css` | **0** |
| charities (guides) | `https://www.trusteetax.co.uk/guides/charity-sorp-2026` | `class="prose prose-gray max-w-none prose-headings:…"` | same | **0** |
| care | `https://www.carehometax.co.uk/blog/cqc-and-financial-compliance/cqc-financial-viability-statement-walkthrough` | `class="prose prose-neutral mt-10 max-w-none"` | `/_next/static/css/60193633e471bb06.css` | **0** |
| crypto | `https://www.cryptotaxpartners.co.uk/blog/crypto-cgt-and-disposals/crypto-to-crypto-swaps-are-disposals` | `class="prose prose-neutral mt-10 max-w-none"` | `/_next/static/css/8dd78a2e5c34fbdf.css` | **0** |
| ecommerce | `https://www.ecommercefinance.co.uk/blog/business-structure-and-tax/sole-trader-vs-ltd-online-sellers` | `class="prose prose-neutral mt-10 max-w-none"` | `/_next/static/css/6ac88658e79fae68.css` | **0** |
| hospitality | `https://www.hospitalitytax.co.uk/blog/hospitality-accounts/epos-reconciliation-hospitality` | `class="prose prose-neutral mt-10 max-w-none"` | `/_next/static/css/3868de5c94ca13fb.css` | **0** |
| pharmacies | `https://www.pharmacytax.co.uk/blog/nhs-contract-and-income/how-do-pharmacies-make-money` | `class="prose prose-neutral mt-10 max-w-none"` | `/_next/static/css/9e7db0ecfe25ad76.css` | **0** |
| startups-tech | `https://www.foundertaxpartners.co.uk/blog/share-schemes-and-emi/emi-disqualifying-events` | `class="prose prose-neutral mt-10 max-w-none"` | `/_next/static/css/24c98c0b78fd4e3c.css` | **0** |
| Medical | `https://www.medicalaccounts.co.uk/resources/locum` | `class="prose prose-slate max-w-none prose-headings:font-bold …"` | `/_next/static/css/3b049ac0939321cb.css`, `debada53c436ea7c.css` | **0** |
| contractors-ir35 | `https://www.contractortaxaccountants.co.uk/resources/ir35` | `class="prose prose-slate max-w-none prose-headings:font-bold …"` | `/_next/static/css/8a9d84a766e483f5.css` | **0** |
| digital-agency | `https://www.agencyfounderfinance.co.uk/resources/exit` | `class="prose prose-slate max-w-none prose-headings:font-bold …"` | `/_next/static/css/fb1dc72c6440410a.css` | **0** |
| divorce-finances | not deployed — `niche.config.json` domain is `placeholder-divorce-domain.example` | — | — | local-only |
| wills-probate | not deployed — domain is `www.probate-compass-placeholder.co.uk` | — | — | local-only |

`digital-agency/team/[slug]` and the bare `/resources` index return 404 live; only
`/resources/<topic>` renders.

### `section-label` live

| Site | URL | `section-label` in HTML | rules in stylesheet |
|---|---|---|---|
| charities | `https://www.trusteetax.co.uk/` | 16 | **0** |
| crypto | `https://www.cryptotaxpartners.co.uk/` | 16 | **0** |
| hospitality | `https://www.hospitalitytax.co.uk/` | 16 | **0** |
| pharmacies | `https://www.pharmacytax.co.uk/` | 20 | **0** |
| startups-tech | `https://www.foundertaxpartners.co.uk/` | 18 | **0** |

(For contrast, `https://www.contractortaxaccountants.co.uk/resources/ir35` and
`https://www.agencyfounderfinance.co.uk/resources/exit` both return
`section-label=1` in their stylesheets — the rule ships there.)

## Smallest fix that closes the whole class

**One new stylesheet + one `@import` line per broken site. No tsx edits, no new
dependency, no `next build` decision baked in.**

1. Create `packages/site-styles/prose.css` (a NEW top-level path, deliberately
   **not** under `packages/web-shared`) containing:
   - the bare `.prose` / `.prose h2` / `.prose p` / `.prose a` / `.prose li` /
     `.prose table` … rules — lift them verbatim from
     `Solicitors/web/src/app/globals.css`, which already ships and is proven in
     production, so this is a copy rather than new design work;
   - one `.section-label` rule — lift from `contractors-ir35/web/src/app/globals.css:289`,
     which is already `@layer components`-wrapped and therefore cannot beat a
     Tailwind utility.
2. Add one line, `@import "../../../../packages/site-styles/prose.css";`, to the
   `globals.css` of the 12 BROKEN sites (section-label sites are a subset).

Twelve one-line edits. Installing `@tailwindcss/typography` instead would mean 12
new dependencies, 12 `@plugin` lines and a visual change on every article to a
style nobody in the estate has approved; the copy of Solicitors' block matches
what the estate already renders.

**Can it be done without touching `Property/`? Yes, completely.**
- Property emits no bare `prose` class anywhere, so it is not BROKEN and needs no edit.
- Property already defines its own `.section-label`, so it needs no edit for that either.
- `packages/web-shared/` is not touched at all. This matters beyond the file list:
  Property's `globals.css:3` carries `@source "../../../../packages/web-shared";`,
  so adding *any* file under that directory could change which utility classes
  Tailwind emits into Property's stylesheet. Putting the shared rules at
  `packages/site-styles/` keeps Property's build byte-identical.

## Anything in the brief that was FALSE

1. **"`@tailwindcss/typography` is not a dependency" is true, but the brief frames
   the fix as needing the plugin.** The estate has never used it. The real estate
   convention is a hand-rolled `.prose-blog` / `.article-body` block, and
   Solicitors hand-rolls bare `.prose`. Installing the plugin would be the odd one out.
2. **The site list in the brief is wrong.** `invoicing/`, `legal/` and `agents/web`
   do not exist. `agents/` exists but has no `web/` app. The real set of 19 apps is
   the one in Table 1 (and includes `console`, which the brief omitted).
3. **`section-label` "has no CSS rule anywhere in the estate" is false.** Six sites
   define it (Property, construction-cis, contractors-ir35, digital-agency,
   divorce-finances, wills-probate). It is missing on exactly five: charities,
   crypto, hospitality, pharmacies, startups-tech.
4. **"Count with `grep -o`, not `grep -c`" is correct but cuts the other way too.**
   A raw `grep -o prose` count is misleading: it matches `prose-blog` and
   `not-prose`. Solicitors' build shows 43 `prose` hits and is fine; charities shows
   0 and is broken. The load-bearing count is `.prose` as a distinct selector.
5. The brief's charities figure — 24 blog posts and 8 guides — **checks out**
   (`charities/web/content/blog` = 24 `.md`, `content/guides` = 8).

## Anything I could not do

- **divorce-finances and wills-probate could not be confirmed live.** Both carry
  placeholder domains in `niche.config.json`. Marked local-only. Their
  `/resources/[topic]` route also has zero content files on disk, so it renders
  nothing even locally — the defect there is latent, not live.
- **`digital-agency/team/[slug]`** could not be confirmed live: `/team` and every
  `/team/<slug>` I could derive return 404. The bare-`prose` class is in the source
  but the route appears to have no data.
- **The `@source` gap was not fully quantified.** I confirmed one concrete instance
  (care, `p-3.5` from `SnapshotCard`), which is enough to establish the defect is
  real, but enumerating every class lost on all 11 sites would need a build, which
  this brief forbids.
- No `next build` / `next dev` was run, so all "built CSS" figures come from
  `.next` output already on disk. Those builds may predate the newest source; where
  it mattered, the live production stylesheet was checked instead and agreed.
