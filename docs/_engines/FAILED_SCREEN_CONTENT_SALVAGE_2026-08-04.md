# Failed-screen content salvage — 2026-08-04

Four niche-screener runs (bookkeeping, electrician, mtd-for-income-tax, landlord-compliance-renters-rights-act) failed standalone-site gates today but paid for real query-level demand data. This salvages that demand as net-new topics for existing estate sites, rather than letting it go to waste.

**Method**: pulled `volumes.json` (measured search_volume only, nulls dropped) + `gates.json` G4 spiking-query list from each run cache; grepped each target site's `content/blog/` for existing coverage by slug and in-body phrase match; kept only queries with non-zero measured volume that are genuinely NOT already answered, capped at 10/site, ranked volume x novelty.

Run caches used:
- `optimisation_engine/niche_screener/cache/run_20260804T104551Z_f0321d/mtd-for-income-tax/`
- `optimisation_engine/niche_screener/cache/run_20260804T104836Z_6162df/landlord-compliance-renters-rights-act/`
- `optimisation_engine/niche_screener/cache/run_20260804T102212Z_bbb281/bookkeeping/`
- `optimisation_engine/niche_screener/cache/run_20260804T104222Z_e97d6b/electrician/`

---

## Generalist (Holloway Davies)

### MTD for Income Tax → 0 net-new topics
12 existing MTD posts already cover threshold, sign-up/registration, deadline, accountant-needed, and software-compatibility angles (`making-tax-digital-accountant.md`, `mtd-itsa-april-2026-deadline.md`, `mtd-software-for-sole-traders.md`, etc). Every query in the run's 18-query universe, including the 1,600-vol "making tax digital threshold" and the 10-query G4 spike set, maps onto an existing post. Cluster is saturated on this site.

### Bookkeeping → 4 topics

| Title angle | Rep query | Volume | Spike | Category |
|---|---|---|---|---|
| How much does a bookkeeper cost (UK small business, 2026) | how much does a bookkeeper cost | 210 | no | Bookkeeping and Compliance |
| Free self-employed bookkeeping template (Excel) | self employed bookkeeping template | 50 | yes | Bookkeeping and Compliance |
| Do I need a bookkeeper for my small business? | do i need a bookkeeper for my small business | 10 | no | Bookkeeping and Compliance |
| Do bookkeepers need to be registered/qualified? | do bookkeepers need to be registered | 20 | no | Bookkeeping and Compliance |

Checked against 8 existing bookkeeping posts (accountant-vs-bookkeeper, difference-between-accountants-and-bookkeepers, bookkeeping-records-limited-company-6-years x2, double-entry-bookkeeping-explained-uk, etc) — none directly answer "what does it cost" or "do I actually need one," which are the two highest-intent queries in the set. "How to start my own bookkeeping business" (20, spike) dropped: wrong audience (career-seeker, not accounting client). Bank-reconciliation and VAT-record-keeping queries dropped: close enough to `bookkeeping-records-limited-company-6-years-hmrc.md` and general accounting-service posts to call covered.

**Verdict**: worth a small wave (4 posts). The £210-vol cost query and the "do I need one" decision query are genuine gaps with clear commercial intent, on a site that already ranks for adjacent bookkeeping terms.

---

## Construction-cis (Trade Tax Specialists)

### MTD for Income Tax → 4 topics
Site has exactly 1 MTD post (`mtd-income-tax-cis.md`) — a scope/threshold pillar. Genuinely uncovered angles:

| Title angle | Rep query | Volume | Spike | Category |
|---|---|---|---|---|
| How to sign up for Making Tax Digital (CIS subcontractor walkthrough) | how to sign up for making tax digital | 110 | yes | VAT and MTD |
| Do I need an accountant for Making Tax Digital as a subcontractor? | do i need an accountant for making tax digital | 40 | yes | VAT and MTD |
| MTD deadline extended — what actually changed for CIS subbies | making tax digital deadline extended | 30 | no | VAT and MTD |
| Which software is MTD-compatible for CIS subcontractors? | what software is compatible with making tax digital | 20 (+10 "works with") | no | Software and Tools |

Dropped as near-duplicates of the existing pillar's scope/threshold coverage: "do i need to register," "when do i need to start," "do i need to use/do," "do i have to sign up," "making tax digital threshold" itself (1,600 vol but directly answered in the FAQ of `mtd-income-tax-cis.md`).

### Bookkeeping → 5 topics (trade/CIS angle)
Zero bookkeeping content on this site currently.

| Title angle | Rep query | Volume | Spike | Category |
|---|---|---|---|---|
| How much does a bookkeeper cost for a self-employed tradesperson? | how much does a bookkeeper cost | 210 | no | CIS Basics |
| Free CIS subcontractor bookkeeping template | self employed bookkeeping template | 50 | yes | Software and Tools |
| Does a self-employed electrician/plumber/builder need a bookkeeper? | do i need a bookkeeper for my small business | 10 | no | CIS Basics |
| Do bookkeepers need to be registered? (what to check before hiring one) | do bookkeepers need to be registered | 20 | no | CIS Compliance |
| How to keep VAT and CIS records (what HMRC actually requires) | how to keep vat records / how long do you have to keep vat records | 40 combined | no | VAT and MTD |

### Electrician (trade self-employment angle) → 6 topics
Reframed consumer cost-lookup queries into pricing/business-decision content for electricians AS the reader (self-employed/CIS angle), not consumer find-an-electrician content. Site currently has zero electrician-specific posts.

| Title angle | Rep query | Volume | Spike | Category |
|---|---|---|---|---|
| What should you charge as a self-employed electrician? (day rate, hourly, per-socket benchmarks) | how much do electricians charge per hour uk / per socket uk | 50 + 30 | no | CIS Basics |
| Pricing a house rewire as a self-employed electrician | how.much to rewire a house uk / cost of rewiring 3-4 bed uk | 260 (spike) + 90 combined | yes | Business Finance / CIS Basics |
| EICR certificates: what they are and how to price the job | how much is an eicr certificate / how long is it valid / eicr what is it | 110+110+70+50 combined | no | CIS Basics |
| Landlord electrical safety checks: what to charge and how to certify | landlord electrical safety check cost / what is a landlord electrical safety certificate | 30 (spike) + 20 | yes | CIS Compliance |
| What does it actually cost to qualify as an electrician (and is self-employment worth it)? | how much does it cost to become an electrician uk | 90 | no | CIS Basics |
| Consumer unit replacement: job pricing and time-on-site benchmark | how long does it take to change a consumer unit / how much to have a consumer unit replaced | 30 + 10 (spike) | yes | CIS Basics |

Dropped: "find an emergency electrician near me," "how to find a qualified electrician" — pure consumer-directory intent, wrong audience for a trade-facing tax site. "ev charger installation cost calculator" — too thin (vol 10, tool-shaped, no clear tax/business angle).

**Verdict for construction-cis**: strongest salvage target of the four. Zero existing electrician content plus zero bookkeeping content plus a thin MTD pillar means all 15 proposed topics (4+5+6) are genuinely net-new, each with measured demand and a real self-employed/CIS framing this site's audience actually searches. Worth a full wave.

---

## Contractors-ir35

### MTD for Income Tax → 4 topics
Site has exactly 1 MTD post (`mtd-income-tax-contractors-guide.md`) — a PSC-vs-sole-trader scope pillar, thorough on who's in/out but not on process.

| Title angle | Rep query | Volume | Spike | Category |
|---|---|---|---|---|
| How to sign up for Making Tax Digital (step-by-step for contractors with side income) | how to sign up for making tax digital | 110 | yes | MTD and Compliance |
| Do I need an accountant for Making Tax Digital? | do i need an accountant for making tax digital | 40 | yes | MTD and Compliance |
| MTD deadline extended — what changed and what didn't | making tax digital deadline extended | 30 | no | MTD and Compliance |
| MTD-compatible software for contractors running sole-trade or rental income on the side | what software is compatible with making tax digital | 20 (+10) | no | MTD and Compliance |

Same de-dup logic as construction-cis: threshold/scope/timing queries already answered in the existing pillar's FAQ block.

**Verdict**: modest wave (4 posts), same shape as construction-cis's MTD slice — process/decision content the existing scope pillar doesn't cover. Not proposing bookkeeping or electrician topics here; out of scope per the mapping brief.

---

## Property

### Landlord-compliance-renters-rights-act → 1 topic
This is the hardest dedupe of the four. Property's blog runs 746 posts and already has 6 dedicated Renters' Rights Act posts (section 21 abolition, section 8 possession grounds, section 13 rent-increase/tribunal route, periodic tenancy switch, mandatory redress-scheme enrolment, 2026 tax implications) plus a standalone civil-penalties/banning-orders enforcement post (`rra-2025-landlord-enforcement-civil-penalties-banning-orders-defence.md`, which already covers the SI 2026/319 penalty-increase ground) and a PRS-database registration post. Every operational mechanic in the run's query set is covered.

| Title angle | Rep query | Volume | Spike | Category |
|---|---|---|---|---|
| What rights do landlords actually have under the Renters' Rights Act? (summary/FAQ) | what rights do landlords have / what are the landlord's rights | 30 + 20 (spike) | yes | Landlord Tax Essentials |

This is the one plausible gap: existing posts are all deep operational-mechanics pieces (section-by-section), none is a general landlord-rights summary/FAQ page. Marginal — low combined volume (50) and thin differentiation risk against the existing corpus.

Dropped as out-of-audience: "what are my rights as a renter" (90), "what rights do tenants have when renting" (20), "what legal rights do renters have" (10), "what is a tenants rights on eviction" (10) — all tenant-facing queries; Property serves landlords, not tenants (business-audience lock). Dropped as thin/off-topic: "private letting agents near me" (directory intent), "landlord pet policy example" (covered adjacently by `pet-rights-tenancy-landlord-refusal-reasonable-grounds.md`), "how do private landlords work," "letting agent vs private landlord," "can landlords fine tenants" (each 10 vol, no clear tax/compliance angle distinct from existing content).

**Verdict**: not worth a wave. The cluster is already saturated by Property's own corpus; at most one marginal FAQ-style post. Confirms the run's own screen failure was directionally correct for this niche given Property already owns the SERP-relevant ground.

---

## Topic count summary

| Site | MTD | Bookkeeping | Electrician | Landlord/RRA | Total |
|---|---|---|---|---|---|
| Generalist | 0 | 4 | — | — | 4 |
| Construction-cis | 4 | 5 | 6 | — | 15 |
| Contractors-ir35 | 4 | — | — | — | 4 |
| Property | — | — | — | 1 | 1 |

**Total: 24 net-new topics** across 4 sites, all with measured (non-null) search volume.
