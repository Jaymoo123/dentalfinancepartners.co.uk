# crypto port: verification executed by the manager against built servers

Every row below was run by the manager against a production build, not reported
by the agent that made the change. Agents returned written verification lists;
this is the record of executing them. Three separate build/serve cycles, and
**they must not be merged into one set of numbers**: each describes a different
commit.

## Run A, phase 0 close (`f480c7ec`, server :3172)
| check | command shape | result |
|---|---|---|
| URLs swept | sitemap + 3 unlisted flow pages | 51 + 3 |
| JSON-LD blocks parse | parse every `application/ld+json` per URL | 95 blocks, **0 parse failures, 0 `[object Object]`** |
| FAQ answers with an on-page counterpart | decode entities, compare against script-stripped body | **222 of 222** |
| canonical per route family | `grep -o 'rel="canonical" href="[^"]*"'` | correct on every family; `/embed/*` point-away preserved |
| turnaround promises | per-page presence over saved pages | **0 pages** |
| tests | `npm test` | 36 passed |

## Run B, phases 1 to 6 close (`666ab0a2`, servers :3173/:3174)
| check | command shape | result |
|---|---|---|
| pages fetched | sitemap + flow pages + embed | 55 |
| contrast / overflow / anchors | `browser_check.mjs` at 390/768/1024/1440, 12 routes | **0 contrast findings, 0 overflow rows, 0 anchor gaps**, self-test OK, 0 unparseable colours |
| pre-port comparison | same instrument on the pre-port build | baseline carried a finding on all 204 page-loads (footer disclaimer 3.61) plus 24 on `/research` |
| `<main>` landmark | count per page | exactly 1 on every page; 0 on `/embed/*` by design |
| dead class names | selector count in the built sheet | `prose-neutral` found on 19 pages with 0 rules, **fixed**; `.prose` 34 selectors present |
| tests | `npm test` | 38 passed |

## Run C, gap-fix close (`f9a96c30`, server :3180)
| check | command | result |
|---|---|---|
| navy focus rings in source | `grep -rn 'outline-\[#0e1a3a\]\|outline-\[var(--brand-primary)\]' src` | **no output** |
| off-white residue in source | `grep -rn 'bg-neutral-50\|#fafaf9' src` (non-admin) | **no output** |
| focus token declared / used | `grep -oF -- '--focus-ring:#b86c42'` / `outline-color:var(--focus-ring)` | 1 / 1 |
| `.eyebrow-rule` has a rule | `grep -oF '.eyebrow-rule' <built css> \| wc -l` | 3 |
| site-local chrome rules ship | `grep -o 'header a\[data-cta-placement="header"\][^}]*}'` on served HTML | `display:none; min-height:2.5rem; min-width:0` plus the `lg` override |
| `#main` backstop | served HTML | `scroll-margin-top: 6rem` |
| bare `var()` with no declaration | set difference over the built sheet | **none** |
| blocking arithmetic C1 | `/blog/.../crypto-backed-loans-collateral-disposals` | `2,136` absent, `£432` present |
| blocking arithmetic C2 | `/blog/.../staking-rewards-tax-two-step` | `12,700` and `10,350` absent, `25,270` and `22,920` present, `£470` survives |
| stale time | negligible-value and swaps posts | expired `5 April 2026` claim gone, `deadline is 5 October 2026` correct, `section 24(2)` distinct from the four-year rule |
| port-introduced claims | `/`, calculators, `llms-full.txt` | `call centre`, `No sign-up, no data stored`, `penalty exposure`, `penalty estimator` all absent |
| link floor, per route | `link_baseline.json` vs `link_postport.json` | 51/51 routes at or above floor; **min 8 -> 27, total 608 -> 1497** |
| dead internal links | resolve every internal href, 52 distinct | **0 non-200** |
| dependency closure | `python scripts/check_dependency_closure.py` | OK across 19 sites |
| tests | `npm test` | 38 passed |

## Checks that were WRONG before the site was
Recorded because each looked like a site defect and was not.
- `grep -ql` prints nothing (`-q` suppresses `-l`), so a verification harness using it returned 0 for every row and read as a clean pass. A self-test row with a known-present and a known-absent string catches it instantly, and every harness here now carries one.
- Stripping tags to compare asserted FAQ text against page text inserts a space next to punctuation where an inline link sits, producing false "asserted but absent" rows. Decode entities and compare fragments.
- A regex `grep -bo` returns nothing for a selector containing `\`, `[` or `:`, which reads as "the utility is not emitted". Use `grep -boF`.
- `getComputedStyle` misreports outlines in this environment (white 3px offset 0 for a ring that paints burnt-orange 2px at offset 2, with no such rule in any sheet). Cause unexplained; reason from the emitted rule instead.

## Not measured
R1 recorded three interaction states it could not reach before its server died: the
mobile drawer open state, the calculator warn branch, and the booking day strip.
The focus-ring work touched components those states render, and nobody has opened
the drawer since. They belong on the owner walk.
