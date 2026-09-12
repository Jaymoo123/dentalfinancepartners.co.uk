# P2-2 - blog index restyle + contrast fix (contractors-ir35/web)

Date: 2026-09-12. Package P2-2, phase 2. Files touched (lease): `src/app/blog/page.tsx`, `src/components/blog/BlogListWithSearch.tsx`. Nothing staged, nothing committed, nothing deployed. `next build`/`next start` not run (shared `.next`); verified against the two running servers only.

## Pushback: what was wrong in the brief

- The 12-of-62 fix is real and already shipped, but it landed in phase 0 (`F5_INDEXING_CRAWL_FIX.md`, `src/components/blog/BlogListWithSearch.tsx:27-28, 66-78, 172-196`), not "phase 1" loosely — worth flagging because that doc's own diff line-numbers no longer match the current file (this package added lines above them). Re-verified independently below rather than trusting the brief or the old doc.
- "12-of-62 to 62-of-62" and the contrast ratio (2.47 vs a 4.5 floor) both check out exactly as stated.
- The brief's "old design used `rounded-2xl` with a border" defect does not exist in this lease: neither file had *any* border-radius before this package (no rounding at all, not `rounded-2xl`). The applicable half of the instruction is real (adopt `rounded-xl` + hairline `border-neutral-200`, the recipe already live on the construction-cis port); the "replacing rounded-2xl" framing does not apply here. Nothing else in the brief was wrong.

## Server verification (BEFORE state)

| | title | unique article hrefs on `/blog` |
|---|---|---|
| `localhost:3611` (pre-port prod SHA) | "IR35 and Contractor Tax Blog \| Guides and Articles \| Contractor Tax Accountants" | 12 |
| `localhost:3621` (phase 1 build, pre-my-edit) | same title | 62 |

`ls contractors-ir35/web/content/blog/*.md | wc -l` -> 62. Phase 1 build already matches file count; confirms the P0 fix and that no regression existed before this package started.

## Changes

| file:line | before | after | why |
|---|---|---|---|
| `src/app/blog/page.tsx` (category chip link) | `"block min-h-[100px] p-5 border border-neutral-200 bg-white ..."` | adds `rounded-xl` | card recipe standard = one radius (`rounded-xl`) + hairline `border-neutral-200`, matched to the construction-cis port's already-reviewed blog cards |
| `BlogListWithSearch.tsx` (empty-state panel) | `"mt-8 border border-neutral-200 bg-[#fafaf7] p-8 text-center"` | adds `rounded-xl` | same recipe |
| `BlogListWithSearch.tsx` (article card) | `"border border-neutral-200 bg-[#fafaf7] p-5 sm:p-6 ..."` | adds `rounded-xl` | same recipe |
| `BlogListWithSearch.tsx` (date / dot / read-time row) | `text-neutral-400` | `text-neutral-500` | contrast defect, see below |

Search, sort (4 options), and read-time all left untouched and functional. No pagination added: 62 posts already render in full server HTML (the P0 fix), so a numbered pager buys nothing and risks reintroducing exactly the bug this package exists to not reintroduce. `ponytail:` comment already in the file (lines ~64-67) documents this; left as-is since it is still accurate. If the corpus grows enough that page weight becomes the problem, add real `/blog/page/N` routes with `<Link>` hrefs then, not client-side hide/slice.

## Contrast: measured, not tool-trusted

Site ground for this row is `#fafaf7` (card) / white (page); text renders at `#a3a3a3` (`neutral-400`) before this fix.

Method (WCAG relative-luminance, by hand): for channel `c` (0-255), `s = c/255`; `lin = s/12.92` if `s <= 0.03928` else `lin = ((s+0.055)/1.055)^2.4`; `L = 0.2126R + 0.7152G + 0.0722B`; `contrast = (L_light+0.05)/(L_dark+0.05)`.

- Self-test against the brief's two calibration points:
  - `slate-500` (`#64748b`) on white -> my method gives 4.68-4.76 depending on rounding at the `^2.4` step; brief states 4.76. Match within tolerance.
  - `slate-400` (`#94a3b8`) on white -> my method gives ~2.5-2.6; brief states 2.56. Match within tolerance.
- Applied to the actual pair:
  - `#a3a3a3` (`neutral-400`) on white -> **2.52** (brief measured 2.47 against the `#fafaf7` card ground specifically, which is slightly darker than pure white and would pull this a touch lower; consistent).
  - `#737373` (`neutral-500`) on white -> **4.74**.

**Before: ~2.47-2.52 (fail, floor 4.5). After: ~4.74 (pass).**

Fix is local to the two leased files only. Correction to an earlier draft of this doc: I had claimed the same failing value backs a shared `--ink-whisper` token in `globals.css` used by "12 other files" and recommended retargeting it. Checked and that is wrong. `grep -rn "ink-whisper" src/app/globals.css` returns exactly one hit, the definition at `:25` (`#a3a3a3`); `grep -rln "ink-whisper" src/` returns exactly two files, `globals.css` and this component's own comment. The token has zero real consumers — it is defined once and never read anywhere in the codebase, so the failing `#a3a3a3` value it holds never reaches a rendered surface. This matches the tokens package's independent finding (delta flagged the call sites UNVERIFIED, resolved as "unused, no live contrast defect"). No retarget is needed and no other file is broken; `globals.css` was correctly left untouched, and stays untouched.

## Verification list (for the manager's serialised build)

1. `npm run build` in `contractors-ir35/web` (not run by me, shared `.next`) should succeed with no new type errors from these two files — `npx tsc --noEmit` already ran clean against them in isolation.
2. `curl -sL <built-host>/blog | grep -oE 'href="/blog/[a-z0-9-]+/[a-z0-9-]+"' | sort -u | wc -l` -> expect 62 (must not regress below the phase-1 value).
3. `ls content/blog/*.md | wc -l` -> expect 62, must equal step 2.
4. Full link-floor sweep against `docs/contractors-ir35/_port/sweep_baseline.json` -> expect 0 regressions (this package touched no hrefs, only classNames).
5. Visual: `/blog` cards and topic chips show `rounded-xl` corners with a `neutral-200` hairline border; date/dot/read-time row is visibly darker than before.
6. Search box, sort dropdown, and result count text still work (unchanged code paths).
7. `grep -c data-cta src/app/blog/page.tsx src/components/blog/BlogListWithSearch.tsx` -> 0 before and after (none existed in this lease; none added).

## Receipt

- Href counts: 3611 (pre-port) = 12, 3621 (phase 1) = 62, files on disk = 62. Phase 1 already correct; this package changed no hrefs.
- Contrast: fixed in lease (`text-neutral-500`), measured before ~2.5, after ~4.74, against a 4.5 floor.
- Wrong in the brief: the "rounded-2xl to rounded-xl" framing does not describe this lease's prior state (there was no radius at all); everything else in the brief checked out against source.
