# M1b — gap-fix after R3, pharmacies design port

Scope: `pharmacies/web/src/app/page.tsx` and
`pharmacies/web/src/app/blog/[category]/[slug]/page.tsx` only. No build, no
server, no git state change.

## S1 — homepage band 10 sr-only caption (serious)

Before: M1a restored the two visible column headers ("Area / Our approach")
but not the table's third sr-only sentence, "How {siteConfig.name} handles
common pharmacy finance areas" — a published-wording deletion under the
2026-09-28 ruling.

After: restored verbatim (text taken from
`git show port-pharmacies-phase0:pharmacies/web/src/app/page.tsx` line 702) as
a visually-hidden paragraph immediately above the "Area / Our approach"
lead-in, inside band 10. `NumberedReasons` (the kit list component) exposes no
`aria-describedby`/caption prop, so a bare `sr-only` `<p>` is the smaller
fix. Sentence is published again; no visible layout change.

## S2 — blog post Breadcrumb final crumb (serious)

Before: `{ label: post.title }` put the full post title (worst case 83 chars,
13 of 22 posts over 60) into both the visible trail and the `BreadcrumbList`
JSON-LD `name` on all 22 posts.

Checked Property/web and generalist/web per the brief: neither renders a
Breadcrumb component on an individual blog post at all (only on the blog hub
index/stage pages), so there is no literal "whichever Property does"
convention to copy. Checked the kit
(`packages/web-shared/design/primitives/Breadcrumb.tsx`): `BreadcrumbItem` is
`{label, href}` only — no title/aria-label prop — so the full title cannot be
kept in an attribute without editing the kit (out of lease).

After: `{ label: post.title.split(/[:,?]/)[0].trim().slice(0, 60) }` —
truncates to the first clause (colon/comma/question mark), hard-capped at 60
chars as a backstop. Same array feeds the visible `<li>` and the JSON-LD
`name` (one binding in the kit component), so the two stay consistent by
construction. Verified against all 22 post titles: every truncated label is
well under 60 chars, including the one title with no punctuation before 60
chars ("The Cost of Buying a Pharmacy, and Whether It Is a Good Investment",
66 chars -> splits on the comma -> "The Cost of Buying a Pharmacy", 29 chars).

## m1–m4

None live in the two in-scope files:
- m1 (`FaqSection` default eyebrow) — `src/app/research/[slug]/page.tsx`, not touched.
- m2 (duplicated `tool.intro`) — calculator `page.tsx` + `lib/calculators/tools/*.ts` data, not touched.
- m3 (`pound-sterling` literal) — `public/llms.txt`, static file, not touched.
- m4 (missing full stop) — `components/intent/NextStepOffer.tsx` copy, not touched (page.tsx only mounts `<NextStepOffer />`).

All four left untouched as directed; listed here, not fixed.

## Verification

```
cd pharmacies/web && npx tsc --noEmit
```
Output: (clean, no errors)

```
cd pharmacies/web && npx vitest run
```
Output:
```
Test Files  8 passed (8)
     Tests  83 passed (83)
```
83 passed vs the 72 baseline named in the task — no test removed or skipped;
the baseline in the brief is stale relative to this working tree (not
something this pass changed). No failures either before or after this pass.
