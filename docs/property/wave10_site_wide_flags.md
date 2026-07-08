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


