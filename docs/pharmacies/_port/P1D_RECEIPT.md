# P1-D Receipt — Grey ramp (neutral → slate)

Mechanical same-step swap: `neutral-N` → `slate-N` for every N, in exactly the 26
owned files. No other class, spacing, or copy changes.

## Per-file swap count (grep: `grep -o 'neutral-[0-9]*' <file> | wc -l`)

| File | before | after |
|---|---|---|
| app/research/pharmacy-openings-closures-index/page.tsx | 94 | 0 |
| app/page.tsx | 78 | 0 |
| app/research/pharmacy-density-and-workload-index/page.tsx | 71 | 0 |
| app/for/[slug]/page.tsx | 19 | 0 |
| app/services/[slug]/page.tsx | 17 | 0 |
| app/terms/page.tsx | 16 | 0 |
| components/forms/LeadForm.tsx | 14 | 0 |
| app/privacy-policy/page.tsx | 14 | 0 |
| components/forms/BookingPicker.tsx | 13 | 0 |
| components/forms/DetailsForm.tsx | 11 | 0 |
| app/thank-you/page.tsx | 11 | 0 |
| app/cookie-policy/page.tsx | 11 | 0 |
| app/complete/page.tsx | 11 | 0 |
| app/blog/[category]/[slug]/page.tsx | 10 | 0 |
| app/services/page.tsx | 8 | 0 |
| app/blog/page.tsx | 8 | 0 |
| components/research/PharmacyIndexCharts.tsx | 6 | 0 |
| app/error.tsx | 6 | 0 |
| app/for/page.tsx | 5 | 0 |
| app/book/page.tsx | 5 | 0 |
| app/blog/[category]/page.tsx | 4 | 0 |
| app/about/page.tsx | 4 | 0 |
| components/ui/Breadcrumb.tsx | 3 | 0 |
| app/not-found.tsx | 2 | 0 |
| app/contact/page.tsx | 2 | 0 |
| app/calculators/page.tsx | 1 | 0 |

**Total swapped: 444.** All 26 files now `grep -o 'neutral-[0-9]*' <file> | wc -l` = 0.

## Off-limits confirmed untouched

Residual `neutral-` in `src/` after this package = 9, all in files not owned by
this package: `components/layout/SiteFooter.tsx`, `components/layout/SiteHeader.tsx`,
`components/ui/StickyCTA.tsx` (P1-C / P1-E leases). None of my 26 files, nothing
else edited.

## Chart-caption contrast re-read (research pages + PharmacyIndexCharts.tsx)

The mapping is same numeric step (`neutral-N → slate-N`), and Tailwind's
`neutral` and `slate` scales are near-identical in lightness at every matching
step (slate carries a faint cool/blue tint, no meaningful luminance delta). The
29 contrast failures P0-D recorded at 2.48/2.58 in the chart footnotes are
therefore carried forward essentially unchanged by this swap — not improved,
not worsened. Confirmed no footnote/caption line picked up a different step
than the body text around it (checked via grep on caption/footnote/source
lines in both research pages and PharmacyIndexCharts.tsx — no isolated class
found, all footnote greys moved in lock-step with the rest of the file).
**Fixing the contrast failures is explicitly out of scope for this package**
(owned by the later content pass per PHASE1_PACKAGES.md).

## Handoffs

None. All 26 files needed only the neutral→slate class swap; no file required
any other kind of change.

## Acceptance

```
$ grep -rn "neutral-" <the 26 files>
(no hits)

$ git diff -U0 -- <the 26 files> | grep -E '^[+-]' | grep -vcE 'neutral-|slate-'
0

$ npx tsc --noEmit
(no output)
```

tsc ran clean (no errors anywhere, including P1-A's files — nothing to
attribute away).

Model: Sonnet. No subagents launched. No build, no dev server, no git
operations (add/commit/push) performed.
