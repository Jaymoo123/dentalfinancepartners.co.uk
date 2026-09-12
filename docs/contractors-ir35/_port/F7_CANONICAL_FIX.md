# F7 — canonical tags pointed at the homepage

Live SEO defect, pre-existing, not caused by the design port. Verified on the
pre-port production server (SHA `18b4f25f`, http://localhost:3611) before any edit.

## Verdict

The baseline is CORRECT. `/for/it-contractors` on 3611 served
`<link rel="canonical" href="https://www.contractortaxaccountants.co.uk">` — the
homepage. The whole `/for` family told Google it was a duplicate of the homepage.

The baseline under-counted, as every handed-over list on this estate has. It named
`/for`. The defect was in 5 indexable route families (9 page files including
noindex utility pages).

## Size of the `/for` family

10 contractor types + 1 index = **11 URLs**, all in the sitemap, all
canonicalised to the homepage, all therefore voluntarily excluded from the index.

```
grep -o 'slug: "[^"]*"' src/data/contractor-types.ts | sort -u | wc -l   # 10
curl -s http://localhost:3611/sitemap.xml | grep -c "/for"               # 11
```

## Root cause

`src/app/layout.tsx` set root metadata:

```ts
alternates: {
  canonical: siteUrl,
  languages: { "en-GB": siteUrl, "x-default": siteUrl },
},
```

Next.js **inherits** root `metadata` into every route that does not override the
same key. Pages that set their own `alternates.canonical` were fine. Every page
that did not silently inherited the homepage canonical — and the homepage
hreflang with it. One line, five route families.

## Fix

1. Removed the `alternates` block from `src/app/layout.tsx` (replaced with a
   `ponytail:` comment explaining why nothing may go back there). A page with no
   canonical is neutral — Google self-canonicalises. A page with a WRONG canonical
   is de-indexed. So removing the inherited default is the root-cause fix.
2. Added an explicit self-canonical to the five indexable pages that were relying
   on inheritance: `/about`, `/services`, `/contact`, `/ir35-status`, `/for`, and
   `/for/[slug]` (6 files).
3. Left `/thank-you`, `/book`, `/complete` and `/admin/*` with no canonical: all
   are `robots: { index: false }`, so a canonical is moot and none is correct.

Deriving commands:

```
grep -rn "canonical" src/                                  # who already sets one
cd src/app && for f in $(find . -name page.tsx|sort); do \
  grep -q canonical "$f" && echo "OK   $f" || echo "MISS $f"; done
curl -s http://localhost:3611/<path> | grep -o '<link rel="canonical" href="[^"]*"'
```

## Route-family canonical table

BEFORE = observed on 3611 (pre-port production). AFTER = source intent, to be
re-observed on the manager's serialised build.

| Route family | BEFORE | AFTER | Note |
|---|---|---|---|
| `/` | self | self | already correct (`app/page.tsx`) |
| `/about` | **homepage** | self | FIXED |
| `/services` | **homepage** | self | FIXED |
| `/contact` | **homepage** | self | FIXED |
| `/ir35-status` | **homepage** | self | FIXED |
| `/for` | **homepage** | self | FIXED |
| `/for/[slug]` (10) | **homepage** | self | FIXED — the reported family |
| `/blog` | self | self | already correct |
| `/blog/[category]` | self | self | already correct |
| `/blog/[category]/[slug]` | self (or frontmatter override) | unchanged | see inverse below |
| `/calculators` | self | self | already correct |
| `/calculators/[slug]` | self | self | already correct |
| `/glossary`, `/glossary/[slug]` | self | self | already correct |
| `/locations`, `/locations/[slug]` | self | self | already correct |
| `/research`, 3 index pages | self | self | already correct |
| `/resources/[topic]` (3) | self | self | already correct — see below |
| `/terms`, `/privacy-policy`, `/cookie-policy` | self | self | already correct |
| `/embed` | self | self | already correct |
| `/embed/[slug]` | **points at `/calculators/[slug]`** | unchanged | CORRECT, see inverse |
| `/thank-you`, `/book`, `/complete` | homepage | none | noindex; no canonical is correct |
| `/admin/*` | homepage | none | not public |

## The inverse — canonicals that SHOULD point away, left alone

- **`/embed/[slug]` → `/calculators/[slug]`.** Deliberate. The embed surface is a
  stripped duplicate of the calculator page for third-party iframes; the indexable
  version is the calculator. Pointing away is the whole point. Not touched.
- **`/blog/[category]/[slug]`** honours a `canonical` field in post frontmatter
  (`post.canonical ?? self`). That is the escape hatch for a deliberately
  duplicated/syndicated post. Self-canonicalising by default, override respected.
  Not touched.
- No paginated or filtered views exist on this site (blog search is client-side in
  `BlogListWithSearch`, one URL), so there is no pagination case to get wrong.

## `/resources/*` (context only, per brief)

`/resources/[topic]` already self-canonicalises (`/resources/ir35` →
`https://www.contractortaxaccountants.co.uk/resources/ir35`), confirmed on 3611.
It was already correct and was not touched. Low stakes anyway — those three pages
were given `noindex: follow` and dropped from the sitemap in an earlier fix.

## Verification list for the manager's serialised build

`npx tsc --noEmit` passes on this tree. After `next build && next start`:

1. `curl -s <host>/for/it-contractors | grep canonical` → must be
   `.../for/it-contractors`, NOT the bare domain.
2. Same for `/about`, `/services`, `/contact`, `/ir35-status`, `/for` — each must
   echo its own path.
3. `curl -s <host>/ | grep canonical` → bare domain (homepage keeps its own).
4. `curl -s <host>/embed/dividend-tax-calculator | grep canonical` → must STILL be
   `/calculators/dividend-tax-calculator`. If this turned into a self-canonical,
   the fix over-reached.
5. `curl -s <host>/thank-you | grep canonical` → expect NO canonical line, and
   `robots` still `noindex`.
6. Spot-check one unchanged family (`/glossary/24-month-rule`) is still self.
7. Assert `<title>` on the host first — a previous port crawled the wrong site
   three times.
