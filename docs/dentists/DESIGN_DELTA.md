# DENTISTS DESIGN DELTA

Standard: `docs/_engines/DESIGN_PORT_PLAYBOOK.md` + `docs/_engines/PROPERTY_STANDARD_ROLLOUT.md`
appendix A/D/E/K/L. An empty section means: Property standard, no exception.
Derivation, evidence and per-file dispositions: `docs/dentists/_port/DISPOSITION_SLICE1-3.md`.

Status 2026-09-11: **PROPOSED. Nothing built, nothing deployed.** Production is `18b4f25f`
(2026-09-09) and `git diff 18b4f25f..HEAD -- Dentists/` is empty, so this site has the
cleanest baseline of the four ports: nothing pending rides the cutover.

**The measurement this file turns on, and it is the opposite of the sibling ports':
navy on gold measures 6.23:1. The Dentists primary button already passes.** Medical's
delta opened on a brand colour that failed its button; Dentists' does not. The failure here
is narrower and entirely one-directional: **gold used as TEXT on a light ground fails
everywhere** (2.75 on white, 2.43 on the elevated surface, 3.76 even at `--gold-strong`),
across 152 instances in 42 files. Every recommendation below follows from that split.

Method: hand-computed, because `browser_check.mjs` cannot resolve `var()` colours and this
site themes entirely through them (playbook T25). The calculator self-tests against the
playbook's published anchors, slate-500 on white = 4.76 and slate-400 on white = 2.56, and
reproduced both exactly before any figure below was taken.

---

## 1. Brand tokens (the swap points)

```
primary ramp:        NAVY becomes the kit `primary-*` ramp. The kit emits `primary-600`
                     and `primary-700` classes for buttons and action surfaces, and gold
                     CANNOT occupy those steps: white on gold is 2.75 and white on
                     gold-strong is 3.76, so a kit-standard white-label button on a gold
                     ground fails the 4.5:1 floor on every surface it renders.
                     Navy #001b3d with a white label measures 17.15.

                     GOLD IS NOT DELETED AND ITS BUTTON IS NOT "FIXED". The existing
                     navy-on-gold button measures 6.23 and passes. Gold is DEMOTED to a
                     fixed accent: rules, eyebrows, marks, dark-ground text, and the
                     existing navy-labelled button. It is barred from one job only, which
                     is carrying text on a light ground.

                     Consequence to budget for: 152 gold-as-text instances across 42 files,
                     including the closing-CTA heading on all 223 posts and a white-on-gold
                     button on all 13 calculator pages. These are spread across files that
                     later phases own, so each phase clears its own, exactly as Medical
                     handled its retired typeface (playbook T26).

neutral ramp:        Move to slate, as Medical did. Dentists ships a bespoke blue-grey set
                     in `globals.css`: `--surface-elevated #eef1f6`, `--ink-soft #2d3f5c`.
                     `--ink` STAYS #001b3d. Navy is the brand's identity colour, not a
                     neutral, and at 17.15 on white it beats the standard.

dark ground:         navy #001b3d, unchanged, and it is a legitimate deviation from
                     Property's slate-900: white on navy = 17.15 against Property's 17.85.
                     Both are far past floor and navy IS this brand.

warning ramp:        OFF gold, and off amber and orange entirely. Gold #b8975d sits in the
                     amber/tan family, so an amber or orange penalty chip would read as
                     brand furniture rather than a warning.

                     RECOMMENDED LADDER D-W1 (3 steps + on-dark twins, Property's shape):
                       1. a duty bites / deadline    red-600    #dc2626   on-dark red-400    #f87171
                       2. escalation, charge arises  pink-700   #be185d   on-dark pink-400   #f472b6
                       3. penalty / regulatory       purple-800 #6b21a8   on-dark purple-400 #c084fc

                     Distances from the brand gold: 130.7 / 127.1 / 159.6. The weakest link
                     is 127.1, more than double the 57.8 that Solicitors accepted as its
                     weakest. Step separations: 64.2 and 112.2, both hue-distinct, and every
                     step is directly labelled, never colour alone.
                     On white: 4.83 / 6.04 / 8.72, all pass. On navy the light steps do not
                     pass, which is what the on-dark twins are for: 6.20 / 6.48 / 6.49.

                     Sibling collision check, because two ported siblings sharing a whole
                     ramp is not differentiation:
                       generalist  violet-700 / fuchsia-700 / red-600 / red-800
                       Solicitors  amber-700 / orange-700 / fuchsia-700 / violet-700
                       Medical     red-600 / purple-700 / indigo-700
                     D-W1 shares exactly one step, red-600, with two siblings. pink-700 and
                     purple-800 are unclaimed. Rejected alternatives: anything led by
                     amber or orange (the brand family); any ladder using fuchsia or violet
                     (both already carry two siblings); indigo-700 (Medical's step 3).

semantic overrides:  Genuine two-hue brand: NAVY = ink, ground, authority and now action;
                     GOLD = accent and marks. Both stay. The inversion to resolve is that
                     `--brand-primary` currently aliases GOLD, which is what puts gold on
                     text surfaces the kit expects to be safe.

font:                To be confirmed in phase 1. 128 `font-serif` and 18 `display-serif`
                     class usages exist. If a second typeface is retired, it is mapped to
                     the survivor as a documented transitional no-op so nothing renders as
                     Times mid-port, and each phase deletes its own classes (playbook T26).
```

## 2. Measured contrast table

4.5:1 text floor, 3:1 graphics and large-text floor. WARNING = fails today on a live surface.

| Foreground | Use | Ground | Ratio | Verdict |
|---|---|---|---|---|
| navy #001b3d | button label | gold #b8975d | 6.23 | PASS. The live button is fine, do not change it |
| gold #b8975d | text | white | 2.75 | **WARNING, LIVE FAIL, 152 instances / 42 files** |
| gold #b8975d | text | elevated #eef1f6 | 2.43 | **WARNING, LIVE FAIL** |
| gold-strong #9e7f4a | text | white | 3.76 | **WARNING.** Clears graphics, fails text |
| white | button label | gold #b8975d | 2.75 | **WARNING, LIVE FAIL on all 13 calculator pages** |
| navy #001b3d | body ink | white | 17.15 | PASS |
| ink-soft #2d3f5c | secondary ink | white | 10.62 | PASS |
| white | body | navy #001b3d | 17.15 | PASS, the dark ground |
| gold #b8975d | accent / eyebrow | navy #001b3d | 6.23 | PASS, the on-navy accent |
| white | button label | navy #001b3d | 17.15 | PASS, the proposed primary |
| white | button label | gold-700 #8a6d3b | 4.85 | PASS, the fallback if gold must stay the ground |

Property reference, same method: white on emerald-600 = 3.77 (fails, which is why Property
buttons sit on the 700 step), white on emerald-700 = 5.48, white on slate-900 = 17.85.

## 3. Sanctioned deviations from Property

1. **Navy dark ground instead of slate-900.** Navy is the brand identity and measures 17.15.
2. **Gold retained as a non-text accent** rather than collapsed into the primary ramp.
3. **The existing navy-on-gold button may stay** wherever it renders today. It passes.

## 4. Owner-input state (the gate)

| Row | Status |
|---|---|
| Brand swatch: navy primary, gold demoted to non-text accent | **TAKEN 2026-09-11: APPROVED.** Owner chose "navy for buttons and links, gold stays as decoration". Gold is NOT darkened and the existing navy-on-gold buttons stay |
| Warning ladder D-W1 (red-600 / pink-700 / purple-800) | **TAKEN 2026-09-11: APPROVED** as part of the swatch decision |
| Port timing against the 18 armed measurement windows to 2026-10-07 | **TAKEN 2026-09-11: start now, accept the re-baseline.** Owner chose to proceed rather than wait. Deploy is still separately gated, so the reset only lands on deploy day |
| Pricing removal (15 files, live) | **TAKEN 2026-09-11: remove ALL of it, rewritten individually.** Includes the 21 turnaround-promise lines and the "fixed fees" / "transparent pricing" framing. No two pages may read the same |
| Named competitor firm in a live article | **TAKEN 2026-09-11: rewrite the passage out.** Article and URL stay, the passage naming the rival and repeating its turnaround claim goes |
| Capture-surface scope | No new lead surface proposed, so no gate needed |
| Route retirements | **Still open.** Each needs a GSC read first (playbook T14). Not asked yet, deliberately: recommending a deletion without traffic evidence is guessing |
| Deploy | **Never autonomous** |

## 5. Locked pre-port analytics values (playbook T22, and it has bitten two sites)

The kit `SiteHeader` defaults would rewrite this site's live CTA segmentation at cutover
and split its funnel history, so the after-reading would show a drop that never happened.
Dentists must pass its own pre-port values:

```
ctaContactGoal    = "contact"       (kit default is "form")
ctaMobilePlacement = "header_mobile" (kit default is "mobile_menu")
```

Derived from the rendered pre-port build, not from source alone: six further
`data-cta-goal` attributes are JSX expressions invisible to a literal grep, and the drawer
CTA renders only when the menu is open, so no server-rendered crawl ever sees it.

Baseline to preserve, captured from production SHA `18b4f25f` at
`docs/dentists/_port/sweep_baseline.json`: 283 URLs, **5,537 unique internal links, 808
`data-cta` attributes, 1,186 dashes**. Any decrease in the first two is a blocker.
