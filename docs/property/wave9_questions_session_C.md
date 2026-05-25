# Wave 9 Q&A — Session C

**Created:** 2026-05-25.

**§16.15 / §16.37 critical Q&A discipline:** when raising a Q to manager, append HERE via ABSOLUTE PATH from your worktree: `C:/Users/user/Documents/Accounting/docs/property/wave9_questions_session_C.md`. NEVER append to your worktree relative-path copy of this file. Manager polls main path only; questions written to the worktree relative-path copy are NOT seen by the monitor and require manual user-side propagation.

Q&A format (one block per Q):
```
## Q-N — {one-line headline}
**STATUS:** <open initially; manager flips to: answered>
**Asked:** {timestamp}
**Page:** {slug, or "general" if cross-page}
**Step:** {which step of 19-step workflow}
**Question:** {what you need decided to proceed}
**Context:** {what you have tried, what the brief says, what the house position says, why your own judgement is not sufficient}

---

(Manager answers below by adding A-N block + changing STATUS to "answered".)
```

When to use Q&A (per §8.5):
- Cannot make progress without manager decision AND
- Answer is not in brief, house positions, or your own judgement

For everything else, use flags (`wave9_site_wide_flags.md`) or discovery log (`wave9_discovery_log_session_C.md`). Flags do not block; questions block; discovery logs are FYI.

**Watcher arming pattern (§16.41(d), Wave 7+):** the manager-side watcher counts `## Q-\d+` heading occurrences (monotonic; template-immune). Adding a real Q-N heading triggers a notification; the example block above does NOT match the pattern (no leading `## ` on the inline format-spec block).

---

(Sessions append Q&A below this line. Manager appends A-N answers in-place.)

## Q-1 — 30%/40%/30% telling/helping/giving allocation cannot be verified in CH82460 or CH82420

**STATUS:** open
**Asked:** 2026-05-25 (Stage 2 Sub-Agent C, mid-verification)
**Page:** general (all 3 C-bucket briefs reference this allocation)
**Step:** Stage 2 brief draft / per §16.36 statutory-citation cross-check gate
**Question:** Stage 1a seed briefs for C1 + C2 assert a 30% (telling) / 40% (helping) / 30% (giving) allocation of the Sch 24 para 9 quality-of-disclosure reduction window, citing "HMRC operational practice (CH82460+)". Per §16.36 I WebFetched (a) Sch 24 para 9 verbatim — statute defines telling/helping/giving as three limbs but does NOT specify any percentage allocation; (b) CH82460 (Giving Access) — does NOT mention 30/40/30 split; (c) CH82420 (Unprompted and prompted disclosure) — does NOT mention 30/40/30 split. The 30/40/30 split appears in some practitioner writing but I cannot find it in current HMRC published guidance. Three options for Stage 2 to choose: (a) keep 30/40/30 but reframe as "industry convention / commonly cited HMRC operational weighting" without citing CH82460 as direct source; (b) drop the numeric split and frame qualitatively as "HMRC weights the limbs in determining the reduction within the unprompted/prompted floor; helping (full quantification) typically carries the largest weight"; (c) Stage 2 sub-agent has missed where HMRC publishes the 30/40/30 split and manager can point at the source.
**Context:** Tried legislation.gov.uk Sch 24 para 9; CH82420; CH82460. HP §27.2 also references "30% telling / 40% helping / 30% giving allocation per HMRC operational practice (CH82460+)" without citing the verbatim source. This is the **third drift in a row** where HP cites HMRC operational practice without a verbatim source — could be carried over from older HMRC guidance that has since been updated. Working assumption for Stage 2 briefs (non-blocking): option (b) — drop the numeric split and frame qualitatively, with a callout in drift watchpoints flagging this for write-time verification. Sessions can re-source the split at write time if HMRC restores published guidance, OR leave qualitative if not. Manager decision desired before launch but not required for Stage 2 brief drafting.

---

## Q-2 — All 5 competitor URLs in Stage 1a seed briefs are dead or unreachable

**STATUS:** open
**Asked:** 2026-05-25 (Stage 2 Sub-Agent C, mid-verification)
**Page:** general (all 3 C-bucket briefs use the same 5-URL competitor list)
**Step:** §16.31 Stage 2 URL verification step
**Question:** All 5 competitor URLs cited in the 3 Stage 1a seed briefs for Bucket C fail liveness check (3× ukpropertyaccountants.co.uk specific-deep-mechanic URLs → 404; uklandlordtax.co.uk specific-deep-mechanic URL → 404; shipleys.com LPC URL → 301 to mooreks.co.uk firm-acquisition redirect; blickrothenberg.com → 403; haines-watts.com → ECONNREFUSED). 13/15 dead (3 deep-mechanic URLs per brief × ukpropertyaccountants + uklandlordtax + shipleys = 9 confirmed dead; blickrothenberg + haines-watts unreachable for ≥1 attempt each = potentially live but unverifiable). I found 2 live replacement landing pages: https://www.ukpropertyaccountants.co.uk/let-property-campaign/ (live, generic LPC landing) and https://www.uklandlordtax.co.uk/let-property-campaign/ (live, generic LPC landing). These cover C1 only and are landing-page rather than deep-mechanic. **Decision:** Stage 2 brief will (a) note all 5 original URLs flagged DEAD per §16.31 verification; (b) replace with the 2 verified live landing pages where appropriate; (c) instruct session to do a fresh competitor SERP scan at write time per workflow step 4 + §16.31. Manager may want to flag to Stage 1a sub-agent pattern that the firm-specific deep-mechanic URLs are typically constructed (not real) and should be sourced live in future Stage 1a runs.
**Context:** §16.31 Wave 4 logged 13% dead URL rate on 30 seeds. Wave 9 Bucket C is showing 100% dead rate on 5 seeds (5/5). Pattern suggests Stage 1a competitor URLs in this bucket were constructed/guessed rather than scraped from competitor_serps. Working assumption for Stage 2: replace where verified live alternatives exist; flag the rest for session to re-source at write time. Non-blocking.

---
