# Wave 10 site-wide flags

**Created:** 2026-07-08. **Status:** Pre-launch (no flags yet).

Sessions raise flags here when they surface site-wide issues during their work — existing-page stale figures, brief drift catches, cross-bucket forward-link needs, house-position extensions, etc. Flags do NOT block; sessions continue work after flagging.

**Discipline reminder (§16.15, §16.37):** session-time flag edits go to THIS file in main via absolute path `C:/Users/user/Documents/Accounting/docs/property/wave10_site_wide_flags.md`. NEVER commit flag edits on a worktree branch.

Flag types per NETNEW_PROGRAM §13.2:
- EXISTING_PAGE_STALE — existing page with stale figures/framing (logs to discovery too)
- BRIEF_DRIFT — Stage 1a / Stage 2 brief contains a statutory or factual error caught at write time per §16.35 / §16.36
- INTERNAL_LINK — existing page should back-link to new Wave 10 page
- CROSS_BUCKET — forward-link from your bucket to another's pages (hyperlinks needing back-patch at wave merge per §16.32)
- REDIRECT — legacy slug should repoint to your new page
- HOUSE_POSITION_EXTENSION — house position needs new sub-section or clarification (manager closes)
- AUTHORITY_GAP — HMRC manual / legislation page never cited on our site, manager should consider adding

Flags never block. Sessions continue work after flagging.

---

(Sessions append flags below this line. Manager closes via in-place edit + commit at wave-close step 4.)

---

## F-31 — HOUSE_POSITION_EXTENSION — VAT Sch 8 Grp 5 conversion-sale zero-rate + s.35 DIY Builders Scheme not in §29

**Raised by:** Stage1-A (seed brief A4)
**Date:** 2026-07-08
**Status:** open

§29 (VAT architectural anchor, house_positions) covers the 5% reduced rate on conversion services (Sch 7A Grp 6) and the OTT framework (Sch 10) but does NOT yet extend to:

1. **VATA 1994 Sch 8 Grp 5 Item 1** — zero-rate first grant of a major interest in a dwelling arising from a non-residential-to-residential conversion (the developer-sale zero-rate). §29.1 lists Sch 8 Grp 5 as "construction of dwellings" generically but the conversion-sale sub-condition (Item 1 + relevant Notes) is not locked.
2. **VATA 1994 s.35 + SI 1995/2518 reg 201** — DIY Builders Scheme VAT refund for self-converters (non-residential conversion to dwelling). Not referenced anywhere in §29.

Stage 2 for A4 must WebFetch both provisions verbatim and should NOT write body content on these points until manager confirms HP extension or grants per-write-verify authority.

**Manager action needed:** extend §29 with a §29.13 covering Sch 8 Grp 5 conversion-sale zero-rate mechanics and §29.14 covering s.35 DIY scheme, OR grant Stage 2 per-write-verify authority on these two sub-topics with a flag-back instruction.

---

## F-32 — HOUSE_POSITION_EXTENSION — ITTOIA 2005 Part 6A property allowance (ss.783B-783BQ) not in house_positions

**Raised by:** Stage1-A (seed brief A5)
**Date:** 2026-07-08
**Status:** open

No §-ref in house_positions covers the £1,000 property income allowance (ITTOIA 2005 Part 6A ss.783B-783BQ, inserted by FA 2017 s.17). Key points that need locking before Stage 2 body write:

1. Whether the allowance applies to FHL income post-abolition of the FHL regime (April 2025). If former FHL income now falls under property business income, it may qualify.
2. The s.24 / partial-relief interaction: under partial relief (s.783BE/BF), the landlord deducts £1,000 instead of actual expenses. Whether the s.24 basic-rate credit is still claimable on top of the partial-relief deduction is not obvious from the statute.
3. The "blocked cases" employer/own-company payer condition (ss.783BJ-783BK) — exact scope.

**Manager action needed:** add §29.X (or a new standalone §-ref, e.g. §30) covering the property allowance mechanics, or grant Stage 2 per-write-verify authority with a flag-back on the two ambiguous interaction points above.

---


