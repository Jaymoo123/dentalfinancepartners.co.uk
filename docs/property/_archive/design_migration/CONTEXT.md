# Property redesign migration — shared context

**Read this before doing anything.** Every agent working on this migration starts here,
then reads `PLAN.md` (once it exists) to find its own phase, then its own brief.

Status of this file: written 2026-08-22. Update it in place, never fork it.

---

## 1. What happened

On 2026-07-16 the full Property site source (git-tracked `Accounting/Property/` subtree,
1,070 files) was pushed to `github.com/Jaymoo123/Property_zip` so an external UX/UI
designer (Tanjiah, Double Wired Creative) could work on design, branding and conversion
psychology. That push was a **snapshot with no monorepo history**.

On 2026-08-21 the designer pushed back one squashed commit, `eb745e1`
"Site as of session 11", covering 11 working sessions: **252 files, +33,857 / -6,934**.

It is a comprehensive redesign: a new design system, ~40 new bespoke storytelling
components, a rebuilt blog (index, article template, nine topic hubs, pagination), and
reworked header, footer, homepage, /about, /services, calculators and legal pages.

Meanwhile the monorepo did not stand still. Between the snapshot and today we shipped
Waves 8 to 12, the cluster coverage programme, lead-engine parity and more:
**644 files changed under `Property/`, +40,119 / -6,706**.

Both sides moved. This is a **port**, not a merge.

## 2. Ground rules for this migration

### RULE ZERO: take their design (owner instruction, 2026-08-22)

**The designer's design system wins by default. Copy and paste it across wherever we
can.** The owner commissioned the design work, the design decisions are theirs and are
taken as approved. Do not relitigate a design choice because you would have made a
different one, and do not "reconcile" a visual difference by inventing a third option.

The default answer to "theirs or ours?" is **theirs**. You need a reason from the
carve-out list below to answer anything else. If a file is pure presentation and it is
not on that list, take theirs wholesale and move on.

**The only carve-outs.** These are not design decisions, so their version does not
automatically win. Each is a specific, evidenced exception, not a licence to re-open
design questions:

1. **Facts and figures.** Their July fork carries tax figures we have since corrected
   (for example first-time-buyer relief stated as £6,250; correct is £5,000, fixed in
   `f7794767`). Every file taken from their tree gets a facts pass against
   `docs/Property/house_positions.md`. The golden tests do NOT catch copy figures.
2. **Surfaces we deliberately deleted.** Anything we removed after 2026-07-16 stays
   removed unless the owner says otherwise. Chiefly `ResourceGate` /
   `ResourceGateLazy` / `ExcelPreview` / `/api/resources/deliver`, killed in `5c156c51`
   because it wrote **direct to PostgREST, bypassing `/api/leads/submit`**, and shipped
   client-side Supabase keys. Porting its restyled twin back is a security and data
   regression wearing a design diff.
3. **Locked compliance and legal decisions.** Microsoft Clarity stays dead (their
   `layout.tsx` still passes `clarityProjectId`). The `niche.config.json` partner block
   stays ours (theirs would name DJH in rendered consent text). `enquiry_retention_months`
   stays 24, not their 3.
4. **Data-driven settings we tuned on evidence.** Their `capture-steps.ts` keeps the
   40-char / 8-word message floor we halved to 20/4 after 96% of `form_error` events
   turned out to be users blocked by it.
5. **Our SEO surface.** Schema blocks, H2 sets, metadata, canonicals, sitemap entries
   and crawlable internal links. Take their layout, keep our SEO payload inside it. The
   known instance: their `HubArticleList` client-paginates hubs down from 749 crawlable
   links to 108. Keep the template, raise posts-per-page to the full count.
6. **Build correctness.** Their `globals.css` deletes
   `@source "../../../../packages/web-shared";` because they had no such package. We do.
7. **Analytics continuity.** Take their instrumentation, but handle the aggregation
   consequences (`vw_cta_performance` groups without `page_path`, so reusing one
   `cta_id` across ten routes silently blends a series), and never drop a `form_id` that
   `deploy-watch`'s baseline still counts without restating the baseline in the same
   change.

**Consequences of Rule Zero, already decided:** take their `layout-utils.ts` button
system and re-skin the six unseen pages in the same pass rather than living with a
split; take their `SiteHeader` structure and layer our nav entries into it; on the eight
forked pages take their design treatment and carry our content, facts and SEO into it.

Everything below still applies. Rule Zero settles *whose design*, not whether we may
skip verification.

### RULE ZERO (b): nothing of theirs gets dropped by category

Owner instruction, same turn: "I want to make sure we are capturing everything from their
work and their design choices and changes."

**No designer file may be discarded because of what kind of file it is.** Every one of the
252 paths in their commit gets an individually assigned disposition - PORT, ALREADY-HAVE,
CARVE-OUT or NO-DESIGN-CONTENT - and the disposition must come from somebody having opened
the diff, not from the folder it sits in.

This rule exists because of a real near miss. `web/vendor/web-shared/` was classified
wholesale as throwaway scaffolding, which is broadly correct, but one file in it,
`tools/components/Field.tsx`, contained a genuine authored design change (a restyled toggle
control). Ours turned out to be better, so nothing was lost, but it was found by looking,
not by the classification. Scaffolding files can carry design work.

The audit that discharges this rule is `reports/14_completeness_audit.md`, which holds the
full 252-row disposition table. **That table is the coverage proof. Keep it current: if the
plan changes a disposition, change it there too.**

### RULE ZERO (c): the accessibility floor is not a design decision

Established in Phase 3, generalised here so Phases 4 to 8 land consistently.

The designer uses `text-slate-400` on light surfaces as a pattern, in **58 places** across
their tree. On white it measures **2.51:1**, against the 4.5:1 AA floor for 12px non-large
text. Their guidelines set no numeric contrast floor on light surfaces, so this is a gap in
their spec rather than a decision we are overriding.

**Standing rule: `text-slate-400` on a light surface becomes `text-slate-500` (4.76:1).**
Nothing else about the treatment changes. This is a floor, not taste, and it is the ONLY
class of change a phase agent may make to a designer class string without raising it first.

- It does NOT apply on dark surfaces. `BlogSidebarCta` correctly keeps `slate-400` on its
  navy card, and that is right.
- Phase 4 will reintroduce the pattern (their `calculators/page.tsx:149` count badge is the
  same component shape Phase 3 already fixed on the hubs). Apply the rule there too.
- Every application gets its measured before/after contrast in the phase log.

1. **The monorepo is canonical.** `Accounting/Property/web/` is what Vercel deploys.
   `Property_zip` is a read-only reference snapshot. Never deploy from it, never treat
   it as a source of truth for data, analytics or backend code.
2. **Never merge the snapshot wholesale.** Port file by file, with a decision recorded
   for each one.
3. **Nothing reaches production without the owner's explicit go in that turn.** Build
   local-first. Do not run `vercel deploy`, `deploy-and-index.ps1` or IndexNow.
4. **No new monitors, alerts, crons, emails, digests, popups, modals or banners**, and
   no change to an existing one's cadence or recipients, without asking the owner first.
   This covers on-site interruptive UI as well as ops alerting.
5. **A* or don't ship it.** Every published fact must be re-derivable and must match
   `docs/Property/house_positions.md`. The designer's copy is generally current, but it
   is not exempt from factual QA.
6. **No em-dashes in user-facing copy.** Code comments, commits and PRs are exempt.
7. **Verify, then claim.** A page renders because you loaded it, not because the diff
   looked right.
8. Full standing instructions: the `standard_terms` skill
   (`.claude/skills/standard_terms/SKILL.md`).

## 3. Where everything is

| Thing | Path |
|---|---|
| Canonical site (edit here) | `Accounting/Property/web/` |
| Designer snapshot (read only) | `Accounting/tmp/design_migration/Property_zip/` |
| This migration's workspace | `Accounting/tmp/design_migration/` (gitignored via `/tmp/`) |
| Agent reports | `Accounting/tmp/design_migration/reports/` |
| Precomputed diff data | `Accounting/tmp/design_migration/data/` |
| Designer handoff docs | `Property_zip/CONTEXT_SUMMARY.md` + `CONTEXT_SUMMARY_SESSION2..11.md` |
| Designer style guide | `Property_zip/web/DESIGN_GUIDELINES.md`, `web/CLASS_NAMING_CONVENTIONS.md` |
| Property state doc | `Accounting/docs/Property/STATE.md` |
| Property ground truth | `Accounting/docs/Property/house_positions.md` |
| Existing redesign notes | `Accounting/docs/Property/REDESIGN_ARCHITECTURE.md` |
| Lead capture map | `Accounting/docs/Property/LEAD_CAPTURE_MAP.md` |
| Shared package (estate-wide) | `Accounting/packages/web-shared/` |

### Git reference points

- Snapshot base in the monorepo: `1d68a570eee1e7a458a0262180650c630cebd61c`
  (last commit before 2026-07-17).
- Snapshot commit in `Property_zip`: `8041183`.
- Designer work in `Property_zip`: `eb745e1`.

Useful commands:

```
# what the designer changed
git -C tmp/design_migration/Property_zip diff 8041183 eb745e1 -- <path>

# what we changed since the snapshot
git -C . diff 1d68a570 HEAD -- Property/<path>
```

Precomputed in `data/`: `designer_name_status.txt`, `designer_numstat.txt`,
`mono_numstat.txt`, `overlap.txt` (the 81 files both sides touched), `mono.txt`, `des.txt`.

## 4. The shape of the problem, as measured

- Designer changed 252 files. We changed 644. **Overlap: 81.**
- Of those 81, **22 are quarantine artefacts** (see §5) and carry nothing to port.
- That leaves **59 real conflicts**, of which:
  - **8 core pages were built independently on both sides** and did not exist at
    snapshot time: `/landlord-tax`, `/making-tax-digital-landlords`, `/section-24`,
    `/services/property-accountant`, `/services/landlord-accountant`,
    `/services/non-resident-landlord`, `/services/property-tax-advice`.
    Roughly 5,200 lines per side. These need a per-page decision.
  - ~12 files have heavy churn on both sides: `locations/[slug]/page.tsx`,
    `SiteHeader.tsx`, `middleware.ts`, `niche.config.json`, `/services/page.tsx`,
    homepage, `calculators/stamp-duty-calculator/page.tsx`, `incorporation/page.tsx`,
    `MiniCapture.tsx` (we deleted 739 lines), `ResourceGate.tsx`, `ResultGateModal.tsx`,
    `CalcResultCta.tsx`.
  - ~35 files where our change is 1-2 lines and theirs is large. Their version wins,
    re-apply our one-liner.
- **171 designer files have no monorepo conflict at all** and are the clean core of the
  port (the design system and most new components).
- **6 pages exist only in the monorepo** and the designer has never seen them:
  `/cost-of-selling-a-property`, `/leasehold`, `/landed-estates`,
  `/landlord-compliance`, `/for-letting-agents`, `/blog/property-finance`.
  They will need the new design system applied by us.
- Blog content: designer has 697 posts, we have 783. Their four content edits are
  one-liners on city posts we have since consolidated. Ignore theirs.

**Owner's note on the designer's intent:** the designer did not write new pages for
ranking. Their stated working method was to check the live site periodically for new
pages and bring them into the design system. So where both sides built the same page,
theirs is a design treatment of our content, not a competing content strategy. Treat it
that way when reconciling.

## 5. What must NOT be ported

The designer's copy was partial. Nine `@accounting-network/web-shared` modules were
missing from the snapshot, so they:

- **Quarantined 22 backend entrypoints** behind 503 stubs, preserving each original as
  `*.disabled` next to the stub: all of `/api/leads/*`, `/api/cron/*`, and
  `/complete/page.tsx`.
- **Vendored 31 cut-down fakes** of shared files at `Property_zip/web/vendor/web-shared/`
  (for example their `tools/components/Field.tsx` is 78 lines against our real 140).

Verified 2026-08-22 by hash: 21 of the 22 `.disabled` originals are **byte-identical**
to what we sent them; `api/leads/events/route.ts` differs by 2 lines only.

**Therefore: discard `web/vendor/web-shared/` and all 22 quarantined files wholesale.**
The monorepo already holds the real ones. There is nothing to recover there.

**~~One exception.~~ CLOSED 2026-08-22 - this was a false alarm, no work required.**
Session 10 §6.3 records a rendering fix they made inside the vendored
`tools/components/Field.tsx` (toggles rendering as bare unstyled browser checkboxes).
Reports 09 and 14 independently established that **the bug existed only in the stub they
wrote themselves**. Our real `packages/web-shared/tools/components/Field.tsx:108-119`
already had a richer toggle branch (bordered card, hover and `has-[:checked]:` states,
brand token, 20px control in a 14px card) **at the snapshot commit** - verified with
`git show 1d68a570:packages/web-shared/tools/components/Field.tsx`. There is no
estate-wide item here and nothing to port.

**Residual, unrelated to the designer:** our toggle branch never renders `field.help`,
while the `select` and number branches do. Estate-wide that is 13 sites, 46 tool configs,
95 toggles, **48 carrying help text that has never been shown to a user**. One optional
line. Owner-gated, tracked in the plan as its own item, NOT part of this design port.

**Corollary risk:** their components were authored against stub shared APIs. Some will
not typecheck against the real package until reconciled. Expect this, do not be
surprised by it.

## 6. Known findings carried in from first read (2026-08-22)

1. **Invisible form labels, live today.** `BlogPostRenderer` rendered `LeadForm` bare on
   `bg-slate-900` while `LeadForm` labels are `text-slate-900`. Every article's primary
   conversion point had invisible labels. The designer found and fixed it. Verify on our
   side and consider fixing independently of the full port.
   Standing rule they set: **`LeadForm` must always sit on a white or light surface.**
2. **`globals.css` heading override.** An unlayered
   `h1..h6 { font-weight:700; line-height:1.2; letter-spacing:-0.02em }` rule beats every
   Tailwind v4 heading utility for those three properties, site-wide, silently. Every
   `leading-*` / `tracking-*` / non-bold `font-*` utility ever written on a heading has
   never rendered. The designer worked around it with `!` modifiers. The real fix is
   `@layer base` plus a site-wide heading QA pass.
3. **Middleware shadowing bug.** `/blog/property-accountant-services` never rendered
   because the slug appeared as a key in both `SLUG_TO_CATEGORY_MAP` and
   `DUPLICATE_REDIRECTS` in `src/middleware.ts`. Designer removed both entries. Confirm
   the same bug exists in the monorepo.
4. **SpecialistWidget.** The designer flagged that the assistant widget has a failure
   mode that can take the site down. Not yet diagnosed. Own investigation item.
5. **Designer copy is factually current.** Spot-checked `/section-24`: FA 2026, reducer
   20% rising to 22% from April 2027, property income at 22/42/47. Matches house
   positions. Still requires per-page factual QA, but do not assume it is stale.
6. Test coupling to the disputed routes is light: 4 test files
   (`calculator-goldens`, `call-brief`, `intent-engine`, `qa-gate`).

## 7. Open questions for the owner

Recorded here so they are asked once, not repeatedly. Do not guess these.

- On the 8 forked pages: keep our wave content and re-skin it in the designer's system
  (protects cluster coverage and monitored rows), or take their page and back-patch our
  facts and links? **Standing recommendation: keep ours, re-skin.**
- Homepage hero closer is still the designer's placeholder
  ("Property tax sorted, your way, with ease."). The owner writes it himself at final
  review. **Remind him.**
- `LeadForm` is still seven required fields. The designer calls it the biggest conversion
  lever left. Unvalidated.
- Soft-gated calculator results: a conversion decision the designer made that has not
  been validated against our data.
- ~~Dead components pending a decision (designer session 10 §7): `CTASection`, `CardStack`,
  `ResourceGateLazy`, `ResourceGate`, `ExcelPreview`.~~ **CORRECTED 2026-08-22, not an
  owner question.** Reports 02 and 06 resolved all five from our own history:
  `ResourceGate`, `ResourceGateLazy` and `ExcelPreview` were deliberately deleted in
  `5c156c51` and stay deleted (carve-out 2 above). `CardStack` is dead on both sides.
  ~~**`CTASection` is NOT dead** - it is live on 16 of our pages including four of the six
  the designer never saw. Do not delete it.~~ **`CTASection` DELETED 2026-08-23 (Phase 8.8,
  `be18008f`). Do not restore it.** The "live on 16 pages" claim came from reports 02 and 06
  and was already stale when written: by the start of Phase 7 the measured count was
  **four**, not 16 (`git grep -c "<CTASection" design-port-phase-6 -- Property/web/src`),
  because Phases 3, 5 and 6 had already moved every other consumer to the designer's
  `LeadCTAPanel`. All four survivors were Phase 7's own pages
  (`/cost-of-selling-a-property`, `/leasehold`, `/landed-estates`, `/landlord-compliance`),
  and Phase 7 moved those four to `LeadCTAPanel` as well, leaving **zero** consumers. Phase 8
  then deleted the file. Rule Zero (b) is satisfied because the designer's tree has zero
  `<CTASection` consumers too, and git history at `be18008f^` is the undo. Full reasoning and
  measurements: `reports/14_completeness_audit.md` row 194.
- The "Built by Double Wired Creative" footer credit with a hyperlink to
  `doublewiredcreative.com` is in their style guide as a spec requirement
  (`DESIGN_GUIDELINES.md` §1.1). Owner decision whether it ships.
- `StatsCounter` / example-figures asterisk question (designer session 9 §1.1).

## 8. Conventions for agents working this migration

- Write your report to `reports/<NN>_<slug>.md`. One file per brief. Never append to
  another agent's report.
- Cite `file:line` for every claim about code. If you did not open the file, say so.
- Distinguish **verified** (you ran it or read it) from **inferred**. Label inferences.
- Absence of evidence is a question for the plan, not a finding.
- Do not edit anything under `Accounting/Property/` unless your brief says to.
- Do not create monitors, crons, alerts or scheduled anything.
- Keep scratch files inside `tmp/design_migration/`, never in the repo proper.
