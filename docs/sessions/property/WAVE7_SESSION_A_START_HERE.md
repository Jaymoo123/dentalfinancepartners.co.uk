# Property Wave 7, Session A, start here (Regulatory / compliance)

**You are Session A.** One of three parallel Claude Opus 4.7 sessions writing NET-NEW Property pages from scratch. Your assignment is **Regulatory / compliance** — 9 pages covering the post-Royal-Assent RRA 2025 operational mechanics (s.21 abolition, periodic-tenancy switch, possession-grounds reform, Property Redress Scheme, lead-page rewrite), Housing Act 2004 HMO selective licensing, EPC C 2030 + landlord spending cap (policy-only, not enacted), EPC grant schemes, and BSA 2022 cladding cost recovery + leaseholder protections.

This is **Wave 7** of the Property Net-New Program. Waves 1-6 (181 net-new pages) are on `main` already (W1-3 deployed; W4 + W5 + W6 held pending user decision).

## Q&A discipline (§16.15 + §16.37 CRITICAL — read this first)

When raising a Q to manager, you append to `C:/Users/user/Documents/Accounting/docs/property/wave7_questions_session_A.md` via **ABSOLUTE PATH** from your worktree. **NEVER** append to your worktree's relative-path copy of that file. Manager polls main's path only; questions written to the worktree's relative-path copy are NOT seen by the manager-side watcher. Same discipline applies to tracker (`wave7_page_tracker.md`), flags (`wave7_site_wide_flags.md`), and discovery (`wave7_discovery_log_session_A.md`) — all absolute-path edits to main. Wave 6 was the first wave where §16.15/§16.37 absolute-path discipline held with zero violations; Wave 7 must preserve that.

## Worktree

You run inside `C:/Users/user/Documents/Accounting-wt-property-wave7-a/` on branch `property-wave7-a`. **Stay inside that worktree.** Build commands run from that worktree's root. Sessions B/C are in their own worktrees on their own branches; you will never collide.

## Read order before touching any code

1. **This file** (you are reading it).
2. **`docs/property/NETNEW_PROGRAM.md`** — §0 critical norms, §4 brief anatomy, §7 19-step workflow, §8.4 session-side watcher, §11 reasoning-first selection, §13 manager instructions, §16 lessons especially **§16.14 tracker hygiene**, **§16.15 + §16.37 Q&A absolute-path discipline**, **§16.16 word count discipline**, **§16.17 atomic work-unit recovery**, **§16.27 + §16.30 + §16.35 Bill-vs-enacted-Act drift mandatory per-write verification**, **§16.32 cross-bucket sequencing**, **§16.36 statutory cross-check gate**, **§16.40 + §16.42 territory-novelty drift density**, **§16.45 Wave 7 HP-lock 13 drift catches**.
3. **`docs/property/house_positions.md`** — for Wave 7 Session A: **§20** (RRA 2025 enacted state, locked at Wave 3 + 5) plus **§26** (Regulatory framework Wave 7 cluster lock — §26.1 through §26.8) plus **§26.9** (HMO licensing mini-lock for A4) plus **§4** (Section 24 mortgage interest restriction — cross-reference for tax-side hooks).
4. **Your assigned briefs** at `briefs/property/wave7/*.md` per the table below. Each brief is your research package: framing differentiator, verified-live competitor URLs, closest-existing pages, authority links, redirect overlap, and the embedded 19-step workflow.
5. **`docs/property/wave7_page_tracker.md`** — master tracker. Your assigned pages are in the Session A rows.

## Bucket-specific authorities

Renters' Rights Act 2025 (2025 c. 26) including ss.4-15 + Sch 1 (reformed grounds) + ss.64-74 (Landlord Redress) + ss.75-96 (PRS Database) + ss.100-101 (Decent Homes for PRS); Housing Act 1988 (assured tenancy regime as amended); Housing Act 2004 Part 2 (ss.55-78 HMO licensing) + Part 3 (ss.79-100 selective) + s.249A (£30k civil penalty); Housing and Planning Act 2016 (banning orders ss.14-23; RROs as extended); Building Safety Act 2022 (c. 30) including Part 2 (Regulator) + Part 4 (HRB regime ss.61-115) + Part 5 (remediation ss.116-125) + Sch 8 (leaseholder protections); Leasehold and Freehold Reform Act 2024 (c. 22, BSA 2022 amendments via SI 2024/1018 effective 31 Oct 2024); Energy Efficiency (Private Rented Property) (England and Wales) Regulations 2015 (SI 2015/962, MEES); commencement SIs (SI 2025/1354 RRA No.1; SI 2026/421 RRA No.2; SI 2026/6 Wales out-of-scope). HMRC: BIM38500+ (penalty deductibility); PIM2010+ (Property Income Manual).

## CRITICAL drift catches inherited from Wave 7 HP-lock + §16.45 (13 catches; read before writing)

**Read all 13 in §16.45 of NETNEW_PROGRAM.** The operationally critical ones for Bucket A:

1. **EPC C 2030 is NOT enacted** — government policy aspiration only after 2026 consultation; no Statutory Instrument laid. Current MEES floor remains **EPC E + £3,500 cap** under SI 2015/962. Hedge any 2028/2030 dates as "scheduled by future regulations" or "proposed". This is the central Bucket A discipline.
2. **RRA 2025 s.64 permits PLURAL approved redress schemes**, not a "single statutory ombudsman" (the government policy intention is single but the Act doesn't require single). Use "approved redress scheme regime" framing per §26.5.
3. **£25,000 Ombudsman compensation cap is NOT on face of Act** — it's policy commentary. Sessions writing on A6 must NOT assert it as enacted statute. See §20.5 (corrected 2026-05-24) + §26.5.
4. **BSA 2022 SI 2025/1368 is WALES commencement** (W. 225); NOT the England commencement chain (which is SI 2022/561 No.1, SI 2022/787 No.2, SI 2023/362 No.3, etc).
5. **Renters' Rights Act 2025 (NOT 2026)** — citation is "2025 c. 26"; "2026" appears only in commencement-date contexts. The slug `renters-rights-act-2026-tax-implications-landlords` is grandfathered for SEO; body copy must use "2025".
6. **TRS penalty £5,000 max DISCRETIONARY not graduated** — not directly relevant to Bucket A but watch for cross-references.

The pattern: 13 drift catches at HP-lock stage alone (per §16.45). Stage 2 verification on every numeric figure (cap, threshold, penalty) and every statutory section identity MUST run before commit.

## Per-page workflow (canonical version in each brief; summary)

1. Read house positions doc (once at session start); above tells you which sections.
2. Claim ONE page in the tracker (todo → in_progress + UTC timestamp).
3. Read the brief.
4. Fetch + read each competitor URL with httpx + BeautifulSoup.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page, anti-templating).
7. Verify factual claims against authorities. **Per §16.35, WebFetch gov.uk / legislation.gov.uk for every numeric figure and statutory section identity before committing it.**
8. Fetch hero image from Pexels.
9. Write the markdown file at `Property/web/content/blog/<slug>.md`.
10. Build clean: `cd Property/web && npm run build`.
11. **Six verifications must pass:** FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title max 62 chars, meta description max 158 chars, internal `/blog/...` links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists one.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on your branch** (per-page commit; do NOT merge to main).
15. Fill in per-page work-log at bottom of brief.
16. **Mark done in tracker** with 1-line Notes (ONLY after step 14).
17. Append site-wide issues to `docs/property/wave7_site_wide_flags.md` (absolute path).
18. Append discoveries to `docs/property/wave7_discovery_log_session_A.md` (absolute path).
19. Claim next page.

## Sequencing constraints (§16.32 within-bucket priorities for Session A)

1. **A1 ships LAST in Bucket A.** A1 is the same-slug depth rewrite of the existing RRA lead page; it absorbs cross-references to A2/A3/A5/A6 operational mechanics. Write A1 after A2/A3/A5/A6 are committed on your branch.
2. **A2 ships BEFORE A1.** A2 (s.21 abolition operational mechanics) is the operational anchor; A1 lead-page cites A2's notice templates and transitional cases.
3. **A2 ↔ A5 reciprocal.** Both cover Sch 1 reformed possession grounds; one ships first then back-patches the forward link to the other.
4. **A4 (HMO licensing) is the new replacement pick.** Anchored at §26.9 mini-lock (HA 2004 Pt 2/3). Independent of other A picks; ship any time.
5. **A8/A9 (EPC) ship independently** — they tie to A10 (BSA cladding) loosely on energy/safety regulation theme but no strict ordering.

No strict cross-bucket dependencies for Bucket A — your bucket is statute-isolated from B (HMRC enquiry) and C (specialist trust/SDLT/pension).

## Universal rules (non-negotiable)

### Voice
- **No em-dashes anywhere.** Commas, parentheses, full stops, or middle dots.
- Practical, specific. Exact figures, named legislation, verbatim section titles where load-bearing.
- Anonymised personas only. No real client names.

### Lead-gen architecture
- `BlogPostRenderer.tsx` auto-injects LeadForm at footer. Never duplicate in body.
- `<aside>` tags styled by global CSS, no classes.
- 1-3 inline asides per page at conversion moments.

### FAQs and schema
- FAQs in frontmatter `faqs:` array. Auto-emits FAQPage JSON-LD. Do NOT add FAQ schema in body.
- 10-14 FAQs per page.

### Anti-templating
- 9 pages in the same bucket cannot read like 9 versions of the same page. Each brief's framing differentiator owns a distinct primary mechanic.
- Stop after page 3 and self-check for templating drift before proceeding.

### House positions
- For Wave 7 Session A: §20 (RRA 2025) + §26 (Regulatory framework) + §26.9 (HMO licensing).
- If a competitor source contradicts a locked house position, the house position wins. Flag in `wave7_site_wide_flags.md`.

### Quality bar
- Body words: framing-differentiator-led (typically 2,500-3,500; depth pages higher per §16.16).
- FAQs 10-14.
- 4-7 external authority links per page (legislation.gov.uk + HMRC manuals + gov.uk).
- Build clean.
- **§16.35 per-write verification on every numeric figure and statutory section identity.**

## Q&A channel + session-side watcher

If you need a manager decision (genuinely cannot proceed without it), append to `C:/Users/user/Documents/Accounting/docs/property/wave7_questions_session_A.md` (ABSOLUTE PATH) with a `## Q-N` heading + STATUS: <open initially; manager flips to: answered>.

**Spawn a session-side watcher immediately after appending:**

```bash
QFILE="C:/Users/user/Documents/Accounting/docs/property/wave7_questions_session_A.md"
LATEST_Q=$(grep -oE '^## Q-[0-9]+' "$QFILE" | tail -1)
echo "Watching for answer to $LATEST_Q..."
while true; do
  if grep -q "$LATEST_Q" "$QFILE" && grep -A2 "$LATEST_Q" "$QFILE" | grep -q "STATUS:.*answered"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

Persistent: false. Timeout: 1 hour. Continue work on another page while waiting; do NOT block.

## Your Session A pages (9 assigned)

Claim ONE at a time. Within-bucket priorities marked in notes.

| # | Slug | Notes |
|---|---|---|
| A1 | `renters-rights-act-2026-tax-implications-landlords` | SAME-SLUG DEPTH REWRITE; body uses "RRA 2025"; **SHIPS LAST in A-branch** |
| A2 | `renters-rights-act-section-21-abolition-landlord-operational-mechanics` | Operational mechanics framing; ships BEFORE A1; reciprocal with A5 |
| A3 | `renters-rights-act-periodic-tenancy-switch-landlord-obligations` | Fixed-to-periodic conversion mechanics |
| A4 | `hmo-selective-licensing-compliance-housing-act-2004-landlord-licensing-mechanics` | NEW pick replacing original A4; anchors at §26.9 mini-lock; HA 2004 Pt 2/3 |
| A5 | `renters-rights-act-possession-grounds-reform-section-8-landlords` | Sch 1 reformed grounds walk-through; reciprocal with A2 |
| A6 | `renters-rights-act-property-redress-scheme-mandatory-enrolment-landlords` | PLURAL approved schemes per §26.5; NOT "single ombudsman"; £25k cap is POLICY not statute |
| A8 | `epc-c-2030-minimum-energy-efficiency-landlord-spending-cap` | CRITICAL: write EPC C 2030 as policy aspiration NOT enacted; current floor EPC E + £3,500 cap |
| A9 | `epc-improvement-grant-schemes-landlords-eco4-bus-gbis` | Verify scheme statuses at write time; ECO4 / BUS / GBIS / HUG2 |
| A10 | `building-safety-act-2022-cladding-cost-recovery-leaseholder-protections-landlords` | BSA 2022 Sch 8 qualifying-lease protections; cladding fully protected para 8 |

## Continuation prompt boilerplate (read before stopping)

If you run out of context mid-page:
1. Commit current page if writable.
2. Flip tracker (in_progress → done) if commit landed (absolute path to main).
3. Write 1-line discovery-log entry with stop point + next slug (absolute path).

## When done with all 9

Update summary at top of `wave7_page_tracker.md` (absolute path). Append `[SESSION_A_COMPLETE]` to `wave7_site_wide_flags.md` (absolute path). Stop.

Begin with whichever pick is most independent (A4 has no within-bucket dep), or A2 if you want to anchor the RRA-cluster sequencing early.
