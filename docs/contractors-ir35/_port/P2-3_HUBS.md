# P2-3: category hub projection

File touched: `contractors-ir35/web/src/app/blog/[category]/page.tsx`. No other file
edited (blog-categories.ts was already authored, consumed as-is; no missing value
found).

## What changed

Replaced the hand-rolled dark hero + `BlogListWithSearch` with the kit's
`design/blog/BlogCategoryHub` (the row named for this route in
`PHASE_PLAN.md` C.1). That component owns the breadcrumb, h1, standfirst,
article grid (`HubArticleList`, which keeps every card in server HTML with
`hidden` on off-page ones, not a `slice()`) and the closing `LeadCTAPanel`.

Data passed in, all sourced from `blog-categories.ts`:
- `heading` = `CATEGORY_HUBS[slug].heading` (all 7 differ from the breadcrumb
  label — see table)
- `description`, `intro` = the authored fields, also now the meta description
  (`generateMetadata` used a generic templated sentence before; it now uses
  `hub.description` when present)
- `cta` = `ctaCopyForCategory(slug)`, mapped `button -> submitLabel`
- `form` = existing `LeadForm`, `submitLabel` = the CTA button copy

Deliberately NOT ported into this page:
- `sections` (the "essentials" briefing block) = `[]`. `belongs` in
  `blog-categories.ts` is explicitly documented as "editorial guidance for
  whoever files the next post, not rendered copy" — rendering it as page
  copy would be re-authoring content the brief said not to invent.
- `proofPoints` = `[]`. The kit component defaults to Property's three claims
  ("Property tax only", "Fixed fees, quoted upfront", "Same accountant every
  time") which are false on this site, and this site has no authored
  proof-point copy yet (no existing `LeadCTAPanel` caller anywhere in the repo
  to inherit copy from). `proofPoints.length` gates the block off, so passing
  `[]` renders nothing rather than fabricating claims. Flagging for the owner
  as an open item, not filling it in.
- `libraryNote` = derived from `cat.count`/`cat.name` only (no "specialist
  accountants" framing invented; the kit default is Property's own claim).

## Corpus reachability, all 7

Pre-port baseline (`sweep_baseline.json`, `18b4f25f`) already showed 2 of 7
category href counts below their file count: `ir35-status` 12/17 and
`umbrella-vs-limited-company` 12/13. Phase 0/1 fixed that (`BlogListWithSearch`
renders the full filtered list server-side, no slice, filtering is client-side
only) — confirmed by curling the phase-1 build before this package's edit.

| slug | corpus (disk) | href count, 3611 (pre-port) | href count, 3621 (phase-1, before this edit) | heading used |
|---|---|---|---|---|
| ir35-status | 17 | 12 | 17 | "IR35 status and the off-payroll rules" |
| umbrella-vs-limited-company | 13 | 12 | 13 | "Umbrella or limited company" |
| mtd-and-compliance | 9 | 9 | 9 | "Making Tax Digital and contractor compliance" |
| contractor-accounting-basics | 7 | 7 | 7 | "Contractor accounting basics" |
| limited-company-tax | 6 | 6 | 6 | "Limited company tax for contractors" |
| pension-and-dividends | 5 | 5 | 5 | "Pension and dividends" |
| expenses-and-deductions | 5 | 5 | 5 | "Contractor expenses and deductions" |

Total 62, matching the brief and `niche.config.json` (`content_strategy.categories`,
7 entries, same set). Counts re-derived from `grep -m1 "^category:" content/blog/*.md`,
not trusted from the brief.

Post-edit reachability could not be curled in this package (the manager runs the
serialised build; three other agents share the `.next` cache). `HubArticleList`'s
own docstring and code path (`article` elements carry `hidden`, not removed from
the DOM; `Link href` always renders) guarantee every post's `<a href>` stays in
server HTML regardless of pagination state, and the max category size here (17)
is under one page-and-a-bit at `postsPerPage=12`, so nothing is newly hidden that
wasn't already reachable. This is a code-path guarantee, not a curl result — see
the verification list below for the check that turns it into one.

## Redirect-map hazard (sibling trap)

Checked, not assumed: `grep -n "redirects" next.config.*` = no matches, no
`redirects()` function; no `redirects*`/`redirect-map*` file anywhere in the
repo tree under `contractors-ir35/`. `niche.config.json` category list matches
the frontmatter-derived set exactly (7 items, same names). The sibling
duplicate-card trap (a redirected slug's dead file still listed) cannot occur
here: there is no redirect map to omit checking against, confirmed fresh
rather than trusted from the brief.

## Pushback on the brief

One line was wrong: item 1 says to consume "the editorial belongs-list per
hub" as page content. The source file's own docstring says `belongs` is
"editorial guidance for whoever files the next post, not rendered copy" —
it is not meant to reach the page. Followed the source, not the brief: `belongs`
stays unrendered (feeds the `sections` prop with `[]`).

## Verification list for the manager's serialised build

1. `npm run lint --workspace=contractors-ir35/web` — ran scoped
   `npx eslint src/app/blog/[category]/page.tsx` during this package, clean.
2. `npm run build --workspace=contractors-ir35/web` — not run (shared `.next`).
   Confirm exit 0 and that `/blog/[category]` still emits 7 static params.
3. Per category, `curl -s http://localhost:PORT/blog/<slug> | grep -oE 'href="/blog/<slug>/[^"]+"' | sort -u | wc -l` for all 7 slugs, compare to the corpus column above (17/13/9/7/6/5/5). Any category short of its count is a regression, not a pre-existing gap (both baselines already served the full 62).
4. Assert served `<title>` still reads `"<Category Name> | Contractor Tax Guides | Contractor Tax Accountants"` for at least `ir35-status`, to catch a metadata regression.
5. Diff `<h1>` per category against the `heading` column above; confirm the breadcrumb's last crumb still reads the frontmatter category name (`cat.name`), not the h1, since `BlogCategoryHub` keeps them intentionally separate.
6. `grep -c 'data-cta=' ` on one rendered hub — new count is 4 (`_book`, `_articles`, 6x `_topic_*`, `_all_articles`; template-driven, count = 3 + otherTopics.length), all newly introduced by the kit component (the pre-edit page had zero `data-cta` attributes, so nothing here was a preservation risk).
7. Visual: confirm every `rounded-xl` + `ring-1` card (kit default) and no stray `rounded-2xl` + `border` from the old design leaked in — this package introduced none, `BlogListWithSearch`'s own card styling is now unused on this route.
8. Route-sweep gate G5 (`sweep.mjs`) against `sweep_baseline.json`: the 7 hub link-count rows must not decrease from the phase-1 (3621) numbers above.
