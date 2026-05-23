# Property Net-New Program — Manager Handover Doc

**Owner:** Jeff (jeff@emplifex.com) + rolling Claude Opus 4.7 manager sessions.

**Status as of 2026-05-22:** Wave 1 complete (31 pages on `main`, not deployed). Wave 2 in planning.

**Purpose:** Single source of truth for the rolling multi-session program writing net-new Property pages and (later) rebuilding ~231 DeepSeek-era legacy pages. Any fresh manager agent reads this doc first and is competent from the next message.

---

## 0. Read first if you are a fresh manager session

You are taking over the orchestrator role for an ongoing program. Do this before responding to the user:

1. **Read this entire doc** (~15-20 min). It is the durable context. Do not skim.
2. Read `docs/network_state_and_handover_2026-05-21.md` for one-time broader-network context (other niche sites, history pre-this-program).
3. Run these four commands to see current state:
   ```
   git log --oneline -20
   git status --short
   ls docs/property/wave*_page_tracker.md 2>/dev/null
   ls docs/property/track1_page_tracker.md 2>/dev/null
   ```
4. If an active wave is running, read its tracker + flags + Q&A files.
5. Acknowledge the user with one short message: *"Picked up. Current state: [wave N, X of Y pages done, M flags open, K open questions]. Ready for next instruction."* — nothing longer.

**Critical norms before you do anything:**

- **You are the glue.** Sessions are siloed; you are the only one with the cross-session view. Treat that responsibility seriously.
- **Self-awareness about your own context.** Output quality degrades as your context fills. When it does, **say so, write a handover update to this doc, then stop.** See §14.
- **Never deploy anything without explicit user instruction.** User has historically held deploys pending cleanup batches; check the current state before any deploy step.
- **Track what's needed, not everything.** See §15 on tracking discipline. Use TaskCreate sparingly. Compact summaries over verbose narration.
- **Never edit a session's branch without authorisation.** Manager fix-up commits on a session branch require: (a) a flag from that session OR (b) a clear user authorisation. Always preserve the session's authorship trail.
- **Verify factual claims before acting on them.** Sessions catch each other's errors; the manager catches errors that slip past sessions. If a session reports a statute, verify via WebFetch to legislation.gov.uk before applying the fix.

---

## 1. The goal

Build out Property Tax Partners (`propertytaxpartners.co.uk`) into the comprehensive #1 UK property-accounting resource.

Two pools of work:

| Pool | Count | Source | Status |
|---|---|---|---|
| **Net-new pages** | ~285 (user-narrowed target from 429 candidates) | `docs/property/topic_gaps_final.md` | 31 done (Wave 1), ~254 remain |
| **Legacy rebuilds** | ~231 (DeepSeek-era pages on `main`) | `Property/web/content/blog/*.md` | Not started; uses GSC + GA4 + competitor HTML enriched briefs |

Total program: ~485 pages over rolling waves. Net-new first; legacy after.

**Strategic constraints:**
- Zero cannibalisation.
- High quality (six-check verification per page; matches or beats specialist competitors).
- No regression to existing rankings (`monitored_pages` table tracks each new/rewritten page for 90 days with a regression detector).
- Anonymised social proof only (no real client names; no specific NHS Trust / agency / tenant dispute names).
- Lead-gen handoff to partner firm (no pricing on-page, no client names; LeadForm auto-injected at footer).

---

## 2. Network context

Property sits inside a six-site niche network plus one scaffolded:

| Site key | Brand | Domain | Posts | Position in network |
|---|---|---|---|---|
| `property` | Property Tax Partners | propertytaxpartners.co.uk | 316 (31 new from Wave 1) | **This program's focus.** Strongest GSC signal, biggest content pool. |
| `dentists` | Dental Finance Partners | dentalfinancepartners.co.uk | ~150 | Quality-lifted to Opus 4.7 May 20. Not in this program. |
| `medical` | Medical Accountants UK | medicalaccounts.co.uk | 46 | Too new (4 of 46 pages with GSC data). Scaffolded for full rewrite (3 worktrees + 46 briefs at `briefs/medical/`) but **PARKED** by user decision. |
| `solicitors` | Accounts For Lawyers | accountsforlawyers.co.uk | ~150 | Quality-lifted to Opus 4.7. Not in this program. |
| `agency` | Agency Founder Finance | agencyfounderfinance.co.uk | small | Thin; not in this program. |
| `generalist` | Holloway Davies | hollowaydavies.co.uk | 322 | Different brand; seed-only GSC. Not in this program. |
| `contractors-ir35` | (scaffolded, not launched) | (TBC) | 0 | High-CPC niche scaffolded May 20; awaiting domain/Vercel/GA4 setup. Not in this program. |

All sites are lead-gen handoffs to a partner firm. Don't conflate with the Property program scope.

**Why Property and only Property right now:** GSC signal is strongest, competitive set is biggest, and the topic-gap analysis (`docs/property/topic_gaps_final.md`) is already done. Network-wide rebuilds come later.

---

## 3. Where we are right now (this section updates every wave)

**Last updated:** 2026-05-23 PM — post-Wave-3 inter-wave hygiene sub-agent batch landed (§20 verification + F-1 RRA-2026 back-patch + worktree cleanup; competitor discovery still running).

**`main` is at `5a49767`.** 91 net-new pages from Wave 1 (31) + Wave 2 (30) + Wave 3 (30) sit on `main`. Wave 3 close + audit-trail at `727eebc`, three bucket-merge commits at `d98c53d` (A) / `cf4a7fa` (B) / `f546964` (C), post-merge factual back-patches at `2b18321`, post-merge cross-link back-patches at `6edc5d8`. Post-Wave-3 inter-wave hygiene at `38b17b5` (F-1 RRA-2026 site-wide back-patch) and `5a49767` (F-12 to F-17 §20 corrections + RRO live-page back-patches).

**Wave 3 outputs on `main`:** 30 blog markdown files (10 ATED + 10 MTD ITSA + 10 RRA 2025). All clean against the §19.7 corrected day-triggers and the §20.7 corrected pet-rights position (see refinements log below). F-2 category-override applied across all 10 ATED pages (all sit under `incorporation-and-company-structures` per existing inventory convention).

**Post-merge back-patches done (2026-05-23):**
- F-7B + F-9 factual fixes on 3 existing MTD pages (`mtd-rental-income-threshold-exemptions`, `mtd-quarterly-reporting-landlords-step-by-step-guide`, `mtd-penalties-landlords-miss-deadline`): corrected "two consecutive tax years" → three, corrected quarterly deadlines 5 → 7 of August/November/February/May, replaced legacy late-payment penalty schedule with Spring Statement 2025 corrected 3%/3%/10% at 15/30/31 days. Single commit `2b18321`.
- F-4 + F-7C + F-8 cross-link back-patches: existing ATED pillar + mechanics pages forward-link to new Wave 3 ATED depth pages (A3/A4/A5/A7/A9); BTL Ltd-Co pillar forward-links to A1 at the £500k decision point; C1 in-text references to C5/C6/C9 now hyperlinked. Single commit `6edc5d8`.

**Wave 3 manager-side fixes:**
- F-11 §20.7 correction applied to `house_positions.md` (Correction logged 2026-05-23). Three substantive corrections: pet damage insurance cannot be a consent condition (Bill provision removed before Royal Assent; TFA 2019 prohibition applies); refusal grounds narrowed to s.16B(4) (superior-landlord-agreement breach or superior-landlord refusal only, NOT building insurance / layout / size); remedy is County Court specific performance under s.16B(5), NOT FTT tribunal. Verified via Session C against legislation.gov.uk during C7 write. Landed in `727eebc`.
- C8 (tenancy-template, `f7d8139`) spot-checked against F-11: clean. Page was written after F-11 raised and incorporates the correction explicitly (reviewer-credentials line + editorialNote + worked Example 2 all align with corrected §20.7). No fix-up commit on C branch needed.
- A1 (`ated-overview-companies-holding-uk-residential-property-2026-27`, `31adc37`) cannibalisation spot-check against existing pillar `ated-complete-guide-2026-27`: clean. Four real differentiators held (four-posture strategic decision matrix; three-tax interlock framing with SDLT 15% + ATED + IHT Sch A1; 2026/27-as-strategic-review-window narrative; chargeable-persons taxonomy). Kept in merge.

**Wave 1 + Wave 2 + Wave 3 are NOT deployed.** User holds deploy pending review of the full 91-page batch.

**Worktrees that can now be deleted:** `Accounting-wt-property-track1-{a,b,c}/`, `Accounting-wt-property-wave2-{a,b,c}/`, `Accounting-wt-property-wave3-{a,b,c}/`.
**Medical worktrees** parked, not part of this program.

**Post-Wave-3 inter-wave hygiene batch (2026-05-23 PM):**
- **F-1 RRA-2026 site-wide back-patch:** CLOSED via sub-agent batch `38b17b5`. 3 files edited (lead `renters-rights-act-2026-tax-implications-landlords.md` page + 2 cross-references); 18 citations corrected. Surprisingly small scope (vs §16.20's "every page" framing) because Wave 3 sessions had already used correct citations and prior cleanups caught most pre-Wave-3 stale references. PART 2 lead-page **content rewrite** scaffolded at `docs/property/f1_rra_lead_page_rewrite_brief.md` for a future manual session (not blocking Wave 4).
- **§20 verification pass:** CLOSED via sub-agent batch `5a49767`. Two HARD drifts caught + four precision flags. F-12 (§20.10 RRO 12 months → 2 years per RRA 2025 s.98 amending HPA 2016 ss.41/42/44), F-13 (§20.5 Ombudsman £25k cap not on the face of the Act), F-14 (§20.2 tenant 2-month notice hook is PEA 1977 s.5(1ZA), not periodic-tenancy mechanic), F-15 (§20.3 split Sch 1 para 3D vs 3E), F-16 (§20.8 split pre-lease s.9 vs post-lease s.8 advance-rent prohibitions), F-17 (§20.11 pet-insurance bullet inconsistent with F-11). F-12 also back-patched 2 existing live pages (`london-property-accountant.md`, `property-accountant-bournemouth-landlords-tax-services.md`). Verification report: `docs/property/section_20_verification_2026-05-23.md`.
- **Worktree cleanup:** all 9 historical property worktrees and branches (track1-{a,b,c}, wave2-{a,b,c}, wave3-{a,b,c}) deleted. Disk space recovered; main worktree + parked medical worktrees remain.
- **Wave 3 worktrees:** deleted. Branches pruned.
- **§16.21 data-driven competitor discovery + sitemap re-sweep:** RUNNING (sub-agent dispatched in parallel with §20 + F-1 batch; will return `competitor_universe_v2.md` + `topic_gaps_delta_2026-05-23.md`). Status as of this writing: `competitor_universe_v2.md` written to disk, sitemap re-sweep still in progress.

**Outstanding hygiene (still pending):**
- **F-7 (Wave 2)** brand wordmark em-dash — separate scope.
- **F-9 calendar-quarter alternative deadlines** on `mtd-quarterly-reporting-landlords-step-by-step-guide`: original "30 April / 31 July / 31 October / 31 January" not patched in the F-7B+F-9 batch (out of explicit flag scope); needs gov.uk verification before correction.
- **F-10, F-14 (SCHEMA + verifier-hardening):** future-wave notes, not immediately actionable. (F-12 = original Wave 3 SCHEMA flag was reused as the F-12 §20.10 RRO correction tag here. Two F-numbers refer to different items; the §20 verification F-12/F-13/F-14/F-15/F-16/F-17 is the new canonical use.)
- **F-13 (B10 redirect re-point):** executed in-session, landed with the B10 commit (this was the Wave 3 F-13; the F-13 stamp on §20.5 Ombudsman correction is the new canonical use).
- **AUTHORITY_GAP from Stage 2:** no Form 17 dedicated page on-site (surfaced during B3 prep). Future-wave candidate.
- **§20.7 / §20.11 un-yeared "Renters' Rights Act" + "from May 2026" citations** on several location/landlord pages (surfaced by F-1 sub-agent): factually correct per §20.12 commencement timeline but citation precision is loose. Optional precision-tightening pass; not blocking.

**House position refinements (cumulative log; locked dates as stamped):**
- §15.6 LTR test is **two-route** (10 consecutive OR 10 of 20 tax years), not single-route as originally locked. Wave 2 Session A surfaced via A6 research. Locked 2026-05-22.
- §17.6 TRF is **3-year at 12%/12%/15%** per Autumn Budget 2024 extension, not 2-year at 12% as originally locked. Wave 2 Session C surfaced via C8 research. Locked 2026-05-22.
- §12 (RRA Bill / in-passage) **superseded by §20** (RRA 2025 enacted state). §12 retained for audit. Wave 3 prep Stage 1 verification surfaced Royal Assent of 27 October 2025 (legislation.gov.uk verified 2026-05-22).
- §19.7 MTD ITSA late-payment day-triggers **corrected 31/46/91 → 15/30/31** at 3%/3%/10% (Spring Statement 2025 reform accelerated both percentages AND day-thresholds). Stage 2 MTD sub-agent surfaced 2026-05-22; F-6 broadcast to sessions. Locked 2026-05-22.
- §20.7 RRA 2025 pet rights **corrected** (three substantive points, see "Wave 3 manager-side fixes" above). Session C surfaced mid-C7 via legislation.gov.uk verification; F-11 broadcast. Locked 2026-05-23.
- §20.2 / §20.3 / §20.5 / §20.8 / §20.10 / §20.11 **corrected en bloc** via the §20 verification pass against the enacted RRA 2025 (F-12 through F-17). Two hard drifts (§20.10 RRO 12 months → 2 years; §20.5 Ombudsman £25k cap not in statute) + four precision flags (§20.2 statutory hook, §20.3 Sch 1 paras 3D/3E split, §20.8 dual advance-rent prohibition, §20.11 post-F-11 internal consistency). Locked 2026-05-23 PM. Full audit at `docs/property/section_20_verification_2026-05-23.md`.

**Program totals (Wave 3 closed):** ~485 total target (~285 net-new + ~231 legacy rebuilds). After Wave 1 (31) + Wave 2 (30) + Wave 3 (30) = **91 net-new on `main`**. ~194 candidates remain in the user-narrowed pool. Legacy rebuild track begins after the net-new track lands enough to anchor the site (no firm cutover trigger set yet).

**Wave 4 prep status:** inter-wave queue items (a), (b) DONE per the 2026-05-23 PM hygiene batch. Items (c) + (d) running concurrently via sub-agent and expected to land before Wave 4 launch. Once discovery sub-agent returns, bucket selection becomes the highest-leverage next step (user-decision-required moment); Stage 1 brief skeletons + Stage 2 reasoning sub-agents fan out from there following the §16.19 pattern.

---

## 4. Brief anatomy: what every page brief must contain

The brief IS the session's research package. Sessions read it, fetch the competitor URLs, read the closest existing pages, then write to the framing differentiator. **A weak brief produces a weak page.** Every brief lives at `briefs/property/<wave>/<slug>.md` and has these blocks:

### 4.1 Header
- Title: "Track N brief: `<slug>`" or "Wave N brief: `<slug>`"
- Site, bucket, session assignment, brief type (net-new or legacy rebuild).
- Source markdown path on launch (where the session writes the file).
- Live URL on launch.

### 4.2 Manager pre-decisions
- **Suggested slug** (session may override, must log).
- **Suggested category** (one of: `landlord-tax-essentials`, `incorporation-and-company-structures`, `capital-gains-tax`, `making-tax-digital-mtd`, `non-resident-landlord-tax`, `portfolio-management`, `property-accountant-services`, `property-types-and-specialist-tax`, `section-24-and-tax-relief`).
- **Bucket** (matches `topic_gaps_final.md` classification).
- **Framing differentiator** — THE most important field. 2-4 sentences that say what makes THIS page distinct from siblings in the same bucket. Examples from Wave 1:
  > "Step-by-step process for reclaiming the 5% additional dwellings surcharge when the old main residence sells within the 3-year window. Practical claim mechanics + common failure modes + worked timeline; complementary to our SDLT-bands pillar which covers rates."
- Override-allowed clause: session may override slug/category if reasoning suggests, but must log in work-log.

### 4.3 Competitor URLs
- 3-5 URLs to fetch + read. From `competitor_serps` table or topic-gap analysis.
- Instruction: fetch with `httpx.get(url, follow_redirects=True, timeout=30, headers={"User-Agent": "Mozilla/5.0"})` then `BeautifulSoup(html, "lxml")`. Read outline + FAQs + worked examples + citation density + component patterns. If a URL is poor, do own targeted search and document.

### 4.4 GSC data (for legacy rebuilds; empty for net-new)
- Top 20 queries by impressions for this URL, with position + clicks.
- Tells the session what queries the page is already ranking for that the rebuild should lean into.

### 4.5 Closest existing pages (cannibalisation context)
- 3-7 pages on our site closest by token similarity.
- Each with: slug, category, title, similarity score.
- **Discipline:** session reads each before writing. Decide if yours is the applied/scenario version (link out to pillar) or the deeper version (raise back-link flag from existing to yours).
- Two existing pages substantially overlap → CANNIBAL flag, don't proceed until manager arbitrates.

### 4.6 Redirect overlap
- Any of the existing 429 middleware redirects whose old slug tokens overlap with this new slug.
- Session repoints the redirect at the new page on launch (step 12 of the workflow).

### 4.7 Authority links (bucket-specific)
- 5-8 high-authority URLs the page should cite. HMRC manuals, legislation.gov.uk, gov.uk, tribunal cases.
- Examples per bucket:
  - SDLT: HMRC SDLT Manual (SDLTM), FA 2003, gov.uk SDLT calculator, FA (No.2) 2024.
  - Ltd Co / CT: CTA 2010, CTA 2009, HMRC CT Manual (CTM), TCGA 1992.
  - VAT: VATA 1994, HMRC VAT Manual (VATGPB), VAT Notices.
  - IHT: IHTA 1984, HMRC IHT Manual (IHTM), IHTA tapered relief tables.
  - DTAs: HMRC International Manual (INTM), OECD Model Tax Convention, specific treaty texts (UK-US, UK-France etc).
- Session picks 4-7 from this list + adds others found during research.

### 4.8 Universal rules (verbatim across all briefs)
- Voice (no em-dashes; specific; named legislation; anonymised personas; no real names).
- Lead-gen architecture (LeadForm auto-injected at footer; never duplicate in body).
- CSS in markdown (semantic HTML only; no Tailwind classes; `<aside>` styled by global CSS).
- FAQs (10-14, frontmatter `faqs:` array, auto-emitted as FAQPage JSON-LD).
- Cannibalisation discipline.
- Anti-templating (per-page framing differentiator, vary H2s, vary openings, vary FAQ phrasing).
- Quality bar (six checks, body word count target).

### 4.9 Workflow (verbatim — the 19 steps)
See §7.

### 4.10 Per-page work-log (filled by session during work)
- Decisions (slug, category, H1, meta title, why these vs alternatives).
- Competitor URLs fetched + key takeaway per URL.
- Existing-page review (overlap, differentiation decision).
- Citations added.
- Internal links added.
- Inline CTA placements.
- Build attempts (pass/fail).
- Verification (each of the six checks).
- Flags raised.
- 2-3 sentence summary.

The work-log is the audit trail. If a brief's work-log is unfilled at session end, the page is suspect.

---

## 5. House positions: the tie-breaker doc

`docs/property/house_positions.md` is the **single source of truth for figures, statutes, and framings**. Sessions read it once at start; it overrides any competitor source.

### 5.1 Current locked positions (index — read the doc for detail)
- SDLT bands and surcharges (residential, 5% from 31 October 2024; 6+ dwellings under **s.116(7) FA 2003 automatic** — corrected mid-Wave-1 from wrong Sch 6B cite).
- ATED bands 2026/27.
- MTD for ITSA threshold (£50k / £30k / £20k phased schedule; NOT £10k).
- S24 (mortgage interest restriction).
- CGT (18%/24% from April 2024; 60-day reporting).
- FHL (abolished from April 2025; transition rules).
- 2027 income tax surcharge (22%/42%/47% framed as "announced Autumn Budget 2024, scheduled, pending Royal Assent under Finance Act 2026").
- LTA (replaced by LSA/LSDBA from April 2024; £1,073,100 figure obsolete).
- IHT (currently SDLT/ATED-heavy; needs IHT-section extension for Wave 2).
- DTAs (currently empty; needs extension for Wave 2 — UK-US, UK-France, UK-Spain, etc.).
- Companies House reforms / ECCTA (currently empty).
- Welsh LTT / Scottish LBTT + ADS (briefly noted; needs extension if any wave touches Scottish/Welsh).
- Rent-a-Room relief allowance.

### 5.2 House position update process

A session flags `HOUSE_POSITION_CONFLICT` when a competitor source contradicts the doc and the session believes the doc is wrong.

Manager process (this happened twice in Wave 1, both correctly):
1. Read the flag carefully — session's reasoning is usually right because they're context-loaded on the topic.
2. **Verify via WebFetch to `legislation.gov.uk`** (NEVER trust your training data on statute interpretation; verify against the live text). For HMRC manual citations, also fetch the manual page.
3. If session is right: edit `house_positions.md` with a `Correction logged YYYY-MM-DD` stamp. Note the old framing in the correction note so the audit trail is preserved.
4. Drop manager-broadcast notes in all three sessions' Q&A files (so any session that already cached the wrong framing refreshes).
5. Authorise the affected session to fix-up their already-shipped pages on their branch.
6. Add any other live pages on `main` (outside the current wave) to a post-merge cleanup list.

### 5.3 Pre-wave: extend house positions for the wave's topics

Before launching a wave, **manager extends house_positions.md** with locked positions for the wave's topics. Wave 2 (IHT + DTAs + Expat) needs:

**IHT section:**
- NRB £325,000 (frozen to April 2028).
- RNRB £175,000 with taper at £2m+.
- Spouse exemption + transferable NRB/RNRB.
- BPR for property: Pawson, Brander, Personal Representatives of Pawson — investment property NOT eligible; furnished holiday lets historically borderline but **abolished FHL regime + April 2026 BPR/APR cap = harder**.
- Gifts with reservation of benefit (s.102 FA 1986) — implications for gifting property while continuing to occupy.
- PETs and 7-year taper.
- April 2026 £1m combined BPR+APR cap.

**DTAs section:**
- OECD Model 2017 baseline.
- Article 6 (immovable property — almost always source-state).
- Article 13 (capital gains — UK NRCGT applies even where treaty exempts; statute overrides treaty for NRCGT).
- Article 24 (non-discrimination).
- Tie-breaker tests for residence (Article 4) — permanent home, centre of vital interests, habitual abode, nationality, mutual agreement.
- Specific treaties: UK-US (saving clause), UK-France (Article 6/13), UK-Spain (real estate-rich entities), UK-Germany.

**Leaving the UK / expat section:**
- SRT (Statutory Residence Test) — automatic UK + automatic overseas + sufficient ties.
- Split-year treatment (Cases 1-8 in TCGA).
- Temporary non-residence rules — 5-year clock, CGT recapture on return.
- NRCGT (non-resident CGT) — applies to UK land/property from April 2015 (residential) / April 2019 (commercial + indirect via property-rich entities).
- 60-day NRCGT return requirement.
- NRL scheme (non-resident landlord) — gross or net election; 20% withholding default.

The manager who launches Wave 2 must complete this extension first.

---

## 6. Wave launch protocol (canonical 9-step checklist)

Pre-flight before any session prompt is sent:

1. **Extend `house_positions.md`** for the wave's topics. See §5.3.
2. **Generate per-page briefs** via brief-builder script. Wave 1 used `scripts/property_track1_brief_builder.py`; adapt with bucket-specific authority lists for the new wave's topics.
3. **Cannibalisation re-check** against current `main` (which now includes the previous wave's outputs). Run `scripts/property_cannibalisation_check.py` with current `main` as baseline.
4. **Stand up worktrees** at `C:/Users/user/Documents/Accounting-wt-property-wave<N>-{a,b,c}/` on branches `property-wave<N>-{a,b,c}`. Or reuse previous wave's worktrees after deleting branches.
5. **Copy missing files** into each worktree: `.env` and `optimisation_engine/competitor/_db.py` (both gitignored/untracked).
6. **Create wave artefact files**:
   - `docs/property/wave<N>_page_tracker.md`
   - `docs/property/wave<N>_site_wide_flags.md`
   - `docs/property/wave<N>_discovery_log_session_{A,B,C}.md`
   - `docs/property/wave<N>_questions_session_{A,B,C}.md`
7. **Write per-session START_HERE docs** at `docs/sessions/property/WAVE<N>_SESSION_{A,B,C}_START_HERE.md`. Each points at the wave-specific files + this NETNEW_PROGRAM doc.
8. **Arm manager-side watcher** (Monitor tool) on the three Q&A files, polling every 20s for new `STATUS: open` lines. Persistent: true.
9. **Hand the user three launch prompts** (one per session) to paste verbatim into fresh Opus sessions opened in the relevant worktrees.

---

## 7. The 19-step per-page workflow

Sessions follow this verbatim. Every brief contains it.

1. Read `house_positions.md` once at session start.
2. Claim ONE page in the wave tracker (`⬜ todo` → `🟡 in_progress` + UTC timestamp).
3. Read the brief (framing differentiator, closest existing, redirect overlap, authority links).
4. Fetch + read each competitor URL with `httpx + BeautifulSoup`.
5. Read closest-existing pages on our site.
6. Plan H2/H3 outline + meta + FAQs + CTA placements (vary per page — anti-templating).
7. Verify factual claims against authorities (HMRC manuals, legislation.gov.uk, gov.uk).
8. Fetch hero image from Pexels via `fetch_image_for_post(query)`.
9. Write the markdown file at `Property/web/content/blog/<slug>.md` (full frontmatter list in brief).
10. Build clean: `cd Property/web && npm run build`.
11. Six verifications: FAQ schema count match, 0 em-dashes, 0 Tailwind classes, meta title ≤62, meta description ≤158, internal links resolve.
12. Apply redirect repointing in `middleware.ts` if brief lists overlap.
13. Register the new page in `monitored_pages` Supabase table.
14. **Commit on session's branch** (per-page commit; do NOT merge to main).
15. Fill in per-page work-log at bottom of brief.
16. Mark `✅ done` in tracker with 1-line Notes.
17. Append site-wide issues to wave's flags file.
18. Append discoveries to session's discovery log.
19. Claim next page.

**Critical order: step 14 (commit) before step 16 (mark done).** Wave 1 had multiple tracker-ahead-of-branch issues until calibrated in M-2/M-5.

---

## 8. Q&A channel + session-side watcher

### 8.1 Architecture

One question file per session: `docs/property/wave<N>_questions_session_{A,B,C}.md`. Lives in main repo (sessions edit via absolute main path). Append-only.

### 8.2 Lifecycle

```
Session writes Q-N with STATUS: open
   ↓
Manager watcher fires (~20s latency)
   ↓
Manager reads question, verifies any statute claims (WebFetch), drafts answer
   ↓
Manager appends `### Manager answer [TIMESTAMP]` block under Q-N
Manager flips STATUS: open → STATUS: answered
   ↓
Session-side watcher (if armed) fires
   ↓
Session re-reads file, acts on answer, marks done in flow
```

### 8.3 Manager-side watcher (Monitor tool)

```bash
declare -A seen
while true; do
  for f in docs/property/wave<N>_questions_session_A.md \
           docs/property/wave<N>_questions_session_B.md \
           docs/property/wave<N>_questions_session_C.md; do
    if [ -f "$f" ]; then
      while IFS= read -r line; do
        key="$f::$line"
        if [ -z "${seen[$key]:-}" ]; then
          seen[$key]=1
          echo "OPEN_QUESTION $f $line"
        fi
      done < <(grep -E "^## \[Q-[0-9]+\].*STATUS: open" "$f" 2>/dev/null || true)
    fi
  done
  sleep 20
done
```

Persistent: true. Stop at wave end via `TaskStop <task-id>`.

### 8.4 Session-side watcher (added for Wave 2+)

After appending a `STATUS: open` question, the session spawns a single Monitor task watching its own file for the `STATUS: answered` flip on its latest question:

```bash
QFILE="docs/property/wave<N>_questions_session_<X>.md"
LATEST_Q=$(grep -oE '^## \[Q-[0-9]+\]' "$QFILE" | tail -1)
echo "Watching for answer to $LATEST_Q..."
while true; do
  if grep -q "$LATEST_Q.*STATUS: answered" "$QFILE"; then
    echo "ANSWER_LANDED $LATEST_Q"
    break
  fi
  sleep 20
done
```

Persistent: false. Timeout: 1 hour. Session keeps working on another step/page while waiting.

### 8.5 When to use Q&A vs flag vs discovery vs just continue

- **Q&A:** decisions you need from manager that block forward progress. Pause this page; work another step/page meanwhile.
- **Flag (`wave<N>_site_wide_flags.md`):** things actioned already, OR cross-session issues. Never blocks.
- **Discovery log (`wave<N>_discovery_log_session_<X>.md`):** observations for future waves. No action needed.
- **Just continue:** anything inside your authority per START_HERE.

### 8.6 Manager-to-session notes (M-1, M-2, etc.)

The manager can append manager-initiated notes to a session's Q&A file (broadcasts, calibrations, blockers). Use format `## [M-N] [TIMESTAMP] [MANAGER NOTE] Title`. Sessions re-read on next poll. M-notes don't trigger the watcher (correct — manager isn't asking themselves a question).

---

## 9. Quality bar

Every page committed MUST pass these six checks (Wave 1 calibrated baseline):

| Check | Target |
|---|---|
| Em-dashes in body | 0 (commas, parentheses, full stops, middle dots only) |
| Tailwind utility classes in markdown body | 0 (semantic HTML only) |
| FAQ schema count in built HTML | == frontmatter `faqs:` array length |
| Meta title | ≤62 chars |
| Meta description | ≤158 chars |
| Internal `/blog/...` links resolve | every link → existing markdown file |

**FAQ count:** 10-14 per page. Lower end (10-12) for non-pillar; 13-14 for pillars and complex topics.

**Body word count:**
- Non-pillar: 2,800-3,500.
- Pillar / comprehensive reference: 3,500-4,500.
- Any 4,000+ non-pillar requires justification in work-log Decisions block.

**Word count gotcha:** `wc -w` total ≠ body. Total includes frontmatter (FAQ JSON inflates a lot). Sessions report **body words** in tracker notes. Manager spot-checks via `wc -w` for first-pass triage, then sanity-checks body count by subtracting ~1,000-1,500 for frontmatter.

**Anonymisation:** no real client names. Worked-example personas are invented (Patel-estate, Mawell-Estate, Singh, etc). No specific NHS Trust / agency / tenant dispute / firm names.

---

## 10. Anti-templating discipline

Wave 1's hardest risk was 10 SDLT pages in Session A reading like 10 versions of the same page. The **framing differentiator** in each brief is what protects against this.

**Per-page differentiator examples (Wave 1):**
- A1 (refund process) — process + failure modes + worked timeline.
- A2 (six-dwellings) — mechanics + savings + decision matrix vs siblings.
- A3 (sub-sale relief) — clarification, separating real use from myth.
- A6 (probate transfers) — taxonomy (five categories of transfer type).
- A8 (refund scams) — consumer-protection with tribunal authority.
- A9 (mixed-use classification) — case-law walkthrough.

Each differentiator yields a different H2 outline.

**Manager spot-checks after page 2-3 per session.** If a session's pages 1 and 2 share H2 structure or opening sentence, raise calibration immediately. Do not wait until page 8.

**Variation discipline:**
- Vary opening 2-3 sentences (no "Many landlords ask about..." across the wave).
- Vary H2 structure per page.
- Vary FAQ phrasing (no "Is X tax deductible?" across multiple pages).
- One worked example per concept per page.

---

## 11. Cannibalisation discipline

### 11.1 Token-level static check (pre-wave)

`scripts/property_cannibalisation_check.py` compares each candidate slug + title + h1 + metaTitle tokens against every existing Property page's. Threshold 0.55 = covered (drop); 0.30 = partial (warn); <0.30 = net-new (keep).

Run pre-every-wave with current `main` as baseline (the map grows as each wave adds pages).

### 11.2 Body-level check (session-driven)

Token-level catches title overlap but not body content overlap. Sessions catch body-level cannibalisation via the brief's **Closest existing pages** section: read each before writing, decide differentiation, raise CANNIBAL flag if two existing pages substantially overlap your topic.

### 11.3 Cross-session check (mid-wave)

Sessions in the same wave might write overlapping pages even when individual cannibalisation checks passed. CANNIBAL flag is for this — sessions watch each other via the shared flags file.

### 11.4 Anti-bandaid

If a CANNIBAL flag fires mid-wave, manager arbitrates: which session keeps which framing, which page gets retitled or skipped. Do not let two sessions write the same page.

---

## 12. Sub-agent guidance

A sub-agent is spawned via the Agent tool. It runs once, returns a structured report, doesn't iterate.

### 12.1 When to spawn a sub-agent

- **Wave preparation** (brief gen + cannibalisation re-check + house positions extension + scaffold files). Multi-step but deterministic; offloads ~5,000-10,000 tokens of manager context.
- **Statute verification** when you don't trust your training data. WebFetch + legislation.gov.uk + HMRC manual + summary.
- **Bulk file audits** (e.g., "scan all 285 existing Property pages for occurrences of '£10,000 MTD threshold' and report a list").
- **Research investigations** (when the user asks an open-ended question that needs multiple searches).

### 12.2 When NOT to spawn a sub-agent

- Decisions that need user input mid-flight (sub-agent can't pause and ask).
- Anything writing markdown content that ships (use a session, not a sub-agent — sessions follow the 19-step workflow including build verification).
- Trivial single-file reads or edits.
- When the user is waiting on a fast response (sub-agents take 30s-15min).

### 12.3 Sub-agent prompt discipline

Write the prompt like a brief to a smart colleague who hasn't seen this conversation. Include:
- What you're trying to accomplish and why.
- Specific file paths.
- What to return (format the structured output expected).
- Cap the response length if you can ("under 200 words", "as a markdown table").

**Never ask a sub-agent to "interpret" or "decide" on something where the user has authority.** Manager owns judgement calls; sub-agents execute defined tasks.

### 12.4 Examples relevant to this program

- **Wave 2 prep agent.** Scope: extend `house_positions.md` for IHT/DTAs/expat → adapt brief builder → generate ~30 briefs → cannibalisation re-check against `main` → scaffold wave2 tracker/flags/Q&A/START_HERE files → return launch prompts. Returns: file paths + summary of decisions taken + any open questions for manager.
- **Statute verification agent.** Used in Wave 1 implicitly via WebFetch; could be promoted to a sub-agent for complex multi-section verifications.
- **Bulk audit agent.** For Track 2 sweep on 234 untouched pages — sub-agent generates the actual fix list (grep + classify) so manager can review before delegating fixes to a session.

---

## 13. Manager instructions for sessions ABC

This is what sessions need from you as their manager. Sessions read their START_HERE doc and this NETNEW_PROGRAM doc; the START_HERE doc is the session's task brief and points back here for everything cross-cutting.

### 13.1 What sessions handle themselves (no manager input needed)

- Slug invention if assigned slug doesn't fit (log override in work-log).
- Em-dash removal, Tailwind class avoidance, FAQ count discipline.
- HMRC / legislation.gov.uk / gov.uk citations.
- Inline `<aside>` CTA placement at conversion moments.
- Cannibalisation handling via differentiation + linking to closest-existing.
- Factual statements matching the house positions doc.
- Building, verification, committing, marking tracker.

### 13.2 What sessions flag (no manager input until later)

Append to `wave<N>_site_wide_flags.md`:
- `HOUSE_POSITION_CONFLICT` — competitor evidence contradicts house position.
- `CANNIBAL` — two sibling pages overlap.
- `INTERNAL_LINK` — existing page should link to new page.
- `SCHEMA` — non-default schema type (HowTo, Course) might help SERP.
- `REDIRECT` — redirect action taken or not taken (log).
- `POSITIONING` — brand / lead-gen positioning question.
- `BUILD_BLOCKER` — build breaking from a non-own-page cause.
- `CALCULATOR_IDEA`, `COMPONENT_IDEA`, `CROSS_NICHE_LINK`, `FACTUAL` — also valid.

Flags never block. Sessions continue work after flagging.

### 13.3 What sessions ask manager (Q&A channel)

Use Q&A only when:
- Cannot make progress without manager decision AND
- Answer is not in brief, house positions, or session's judgement.

Examples from Wave 1:
- Session A Q-1: "worktree branch missing the entire Track 1 scaffold" (legitimate blocker).
- Sessions used flags for the rest.

### 13.4 What sessions log to discovery (no action needed)

`wave<N>_discovery_log_session_<X>.md`:
- `ADJACENT_TOPIC` — competitor covers something we don't, not in topic_gaps.
- `CALCULATOR_IDEA`, `COMPONENT_IDEA`.
- `EXISTING_PAGE_STALE` — existing page with stale figures/framing.
- `EXISTING_PAGE_LINK_OPPORTUNITY`.
- `AUTHORITY_GAP` — HMRC manual / legislation never cited on our site.
- `CROSS_NICHE_LINK`.

Manager reads at wave end; feeds future waves and Track 2 sweep.

### 13.5 Manager approval gates

Sessions DO NOT need manager approval for:
- Routine page writes (the brief is the authorisation).
- Committing on their own branch.
- Marking tracker rows.
- Adding redirects per brief.

Sessions DO need manager authorisation for:
- Fix-up commits to a previously-committed page (e.g., B2 CIHC fix-up). Manager authorises via Q&A note.
- Deleting or substantially restructuring an existing live page.
- Cross-branch edits (manager handles).
- Anything touching `main` directly.

### 13.6 Manager calibration interventions

If quality drifts (word count, FAQ count, templating, framing), manager appends M-note to Q&A file with the calibration. Wave 1 examples:
- M-3 / M-4: word count calibration (5,428 → 2,800-3,500 target).
- M-5: B2 CIHC fix-up authorisation.

Don't calibrate by editing the brief mid-flight. Always Q&A note so the audit trail is clear.

---

## 14. Manager self-awareness and handoff

You are powered by a model with a finite context window. Output quality degrades as context fills with tool results, conversation, and accumulated state.

### 14.1 Signs of degradation

- You catch yourself summarising tool results that are still visible (forgetting you can re-read).
- You make factual claims without verifying (assuming your training data is current).
- Your responses get longer and more hedged.
- You forget instructions from earlier in the conversation.
- You miss patterns across sessions (e.g., a flag in one session relevant to another).
- You delay decisions that need to be made now.
- You skip verification steps you would have done earlier.

### 14.2 What to do when you notice degradation

1. **Tell the user.** Explicitly: "I'm starting to feel context pressure; I want to write a handover update and stop." Do not push through silently.
2. **Update this doc** (`NETNEW_PROGRAM.md`):
   - Section 3 (Where we are now) — current wave state, completed work, open work.
   - Section 17 (Lessons learned) — anything from this session that should compound.
   - Section 21 (Open decisions) — anything pending.
3. **If a wave is mid-flight:** ensure the wave tracker, flags, and Q&A files are up to date so a fresh manager can pick up immediately.
4. **Stop.** Don't accept new work.

### 14.3 Handoff to fresh manager

The user opens a fresh Claude Opus session and points it at this doc. The fresh manager:
1. Follows §0 pickup checklist.
2. Reads the current wave state.
3. Acknowledges with the short status line.

If a session asks a Q&A while a manager handoff is in flight, the wave's session-side watchers will keep the sessions productive (they can work on other pages while waiting). The fresh manager picks up open questions on arrival.

---

## 15. Manager tracking discipline

Manager tracking is a balance: enough state to coordinate, not so much that it eats context.

### 15.1 What manager DOES track

- **Current wave state** — which session is on which page, latest commit per branch, open flags, open questions. Track via files (tracker, flags, Q&A) not via TaskCreate.
- **Pending cleanups** — post-merge work queued in this doc §3 or in a "Post-Wave-N cleanups" subsection.
- **Lessons learned** (this doc §17) — only the durable ones that change behaviour next time.
- **Open decisions** (this doc §21) — explicit list of things the manager + user haven't decided.

### 15.2 What manager does NOT track

- Every commit, every read, every minor edit.
- Verbose narration of what was done.
- TaskCreate for trivial single-action work.

### 15.3 When to use TaskCreate

Use sparingly. Worth a TaskCreate when:
- Multi-step work with clear sequential dependencies and >30 min duration.
- Work that spans multiple manager turns (so the next turn can resume cleanly).
- Work where the user benefits from seeing progress.

NOT worth a TaskCreate for:
- Single edits.
- Single tool calls.
- Verification checks.
- Q&A responses.

### 15.4 Periodic compaction

After every wave: update this doc, archive the wave's tracker/flags/Q&A (don't delete — they're the audit trail), update §17 with new lessons.

---

## 16. Lessons learned (running log)

Append to this section after every wave. Each lesson should describe what happened + what changed + why future managers should care.

### Wave 1 (2026-05-22)

**16.1 Tooling gaps**
- `optimisation_engine/competitor/_db.py` is untracked in git. Worktrees freshly created from main are missing it. Sessions need it for the `monitored_pages` Supabase insert (step 13). Fix: manager copies into every new worktree pre-launch.
- `.env` is gitignored (correctly) but worktrees need it. Without it, any `from optimisation_engine.*` import fails at config.py. Fix: manager copies into every new worktree pre-launch.

**16.2 Procedural gaps**
- Multiple sessions marked tracker `✅ done` before committing. Calibrated via M-2 / M-5 manager notes mid-wave. Bake into START_HERE for Wave 2+.
- Wave 1 worktrees were created before the brief scaffold landed on main, so each session opened on a branch 2 commits behind main. Fix: every wave's pre-launch checklist now includes "fast-forward each worktree branch to current main".

**16.3 Factual catches**
- **Six-dwellings rule** (Session A flag, 2026-05-22T02:00Z). House positions doc cited Sch 6B para 7 FA 2003 (definitional, unrelated rule) and called it an "election". Correct: **s.116(7) FA 2003**, automatic statutory deeming. Fixed in house_positions + A2 + manager-broadcast to B and C. Pattern: multi-session design caught it because Session A wrote a downstream page that surfaced the inconsistency.
- **CIHC carve-out** (Session B flag, 2026-05-22T10:20Z). B2 overstated CIHC scope by claiming BTL SPVs are CIHCs. Correct: most BTL SPVs are NOT CIHCs because the **s.18N CTA 2010 qualifying-purpose carve-out** takes unconnected-tenant land investment out of CIHC status. Manager fix-up commit on B's branch with revised worked example (marginal relief instead of flat 25%). Pattern: same as six-dwellings — downstream session caught upstream session's error.

**16.4 Word-count drift**
- Wave 1 initial pages overshot guidance (4,142 / 5,428 / 4,332 total words; target was 2,500-3,500 body). Calibration broadcast in M-3/M-4. Subsequent pages: 2,652-3,845 body words.
- **Body words ≠ total words.** Total includes frontmatter + FAQ JSON (typically +1,000-1,500). Sessions report body words; manager spot-checks via `wc -w` total then adjusts.

**16.5 Anti-templating held**
- 10 SDLT pages in Session A could have read like 10 versions of the same page. Each brief's framing differentiator kept them distinct. Manager spot-check after page 3 confirmed no drift.

**16.6 Multi-session pattern worked**
- The append-only flags + Q&A channel + manager broadcast pattern caught two factual issues that would have shipped wrong in a single-session pass. Both went from flag → verification → fix in under an hour. This is the system's core value proposition.

**16.7 Manager-side watcher worked**
- ~20s latency from new `STATUS: open` question to manager notification. No false positives. No missed events. Worth keeping the design.

**16.8 Session-side watcher missing in Wave 1**
- When manager answered a question, sessions saw it only on manual re-read. User had to ping sessions when answers landed. Wave 2+ adds session-side watchers (see §8.4).

**16.9 Sessions interpret "finished"**
- All three sessions reported "finished" after their first context-burning batch (Wave 1 day 1: A 4/10, B 3/8, C 4/13). User relaunched fresh sessions to continue. Pattern: "finished" means "out of context"; manager verifies actual completion via tracker + branch log.

**16.10 Sessions' tracker notes are gold**
- Each session's tracker note for a completed page captured: framing differentiator, key citations, body word count, worked-example saving figures, any deviations from brief. Reading the tracker = fast triage. Don't lose this practice.

### Wave 2 (2026-05-22)

**16.11 Token-Jaccard cannibalisation matcher breaks on novel topical clusters**
- The brief builder's "Closest existing pages" selector (`scripts/property_track1_brief_builder.py` / `_wave2_brief_builder.py`) scores by literal slug + title + h1 token overlap. Worked OK for Wave 1 (SDLT / Ltd Co / VAT / FIC clusters all share heavy token overlap with existing pages) but **systematically broke for Wave 2** — IHT and DTA slugs share few tokens with the existing 316 pages, so the script returned `what-is-aia-in-tax` / `vat-calculator` / `capital-allowances-on-property` as "closest matches" while missing the obvious neighbours (`inheritance-tax-rental-property-uk-guide`, `non-resident-landlord-scheme-uk-complete-guide`, etc.). Manager spawned three Opus reasoning sub-agents during pre-launch to regenerate the closest-existing + competitor URL sections of all 30 briefs. **Lesson:** before Wave 3, either rewrite the cannibalisation script to use sentence-embeddings (e.g. via DeepSeek/Anthropic), or build the reasoning regen step into the standard wave-prep workflow rather than as a post-hoc fix.

**16.12 Sessions correct house positions via downstream research — formalize the loop**
- Two Wave 2 sessions surfaced house position corrections during their work. A6 (April 2025 IHT residence test) found the LTR test has **two routes** (10 consecutive OR 10 of 20), where the locked position only named the 10-of-20 route. C8 (April 2025 non-dom reform) found the TRF runs **3 years at 12%/12%/15%** per Autumn Budget 2024 extension, where the locked position had it as 2 years at 12%. Both corrections logged via HOUSE_POSITION_CONFLICT flag and verified by manager post-merge. **Lesson:** sessions doing focused page research consistently outperform the pre-wave statute-verification pass on specific edge cases. Build the HOUSE_POSITION_CONFLICT flag-flow more explicitly into future waves — manager should expect and welcome 1-3 corrections per wave.

**16.13 Cross-bucket CANNIBAL coordination held without manager intervention**
- Three cross-bucket pairs were flagged at prep time: B6 UAE ↔ C6 Dubai (treaty mechanics vs landlord pathway), B7 Italy ↔ B8 generic (bilateral applied vs cascade explained), B10 CD ↔ C9/C10 (NRCGT framing overlap). All three pairs resolved cleanly through the briefs' explicit cross-reference notes — sessions wrote pages that knew about their sibling page, and raised back-patch F-XX flags rather than re-covering the same ground. **Lesson:** cross-bucket cannibalisation flags in the BRIEF (not just in the flags file) work as a coordination mechanism. Bake into Wave 3 prep agent's brief-generation step.

**16.14 Continuation handovers cost ~5-10% throughput; tracker discipline drifts at handover boundaries**
- Each Wave 2 session ran out of context around page 4-5 of its initial run, requiring 1-2 fresh-session relaunches. At each handover boundary, the outgoing session typically committed its current page (step 14) but did not flip the tracker (step 16) before stopping. The next continuation session has to back-patch the tracker as its first action. **Lesson:** bake "if you commit a page but feel context-pressured, flip the tracker IMMEDIATELY before stopping — this is the single most important handover hygiene item" into the continuation prompts. Also: encode the back-patch-on-startup step as an explicit FIRST ACTION in continuation prompts (already done in Wave 2 continuation prompts).

**16.15 Single-shared-tracker approach worked, but each branch's tracker copy drifts**
- Sessions edited the main repo's tracker file via absolute paths from inside their worktrees, so the live state was always in main. Worked well for cross-session visibility, but each worktree's committed-tracker copy stayed at the prep state (b9e783a). This caused merge conflicts on B branch (where Session B's session DID commit tracker edits on its branch, conflicting with main's live tracker at merge time). **Lesson:** for Wave 3, make tracker-edits-on-branch a documented anti-pattern. All session-time tracker edits go to the main repo file via absolute paths; no committed-on-branch tracker edits.

**16.16 Word count discipline calibration improved from Wave 1**
- Wave 1 needed mid-wave M-notes to calibrate from 4-5k bodies back to 2.5-3.5k. Wave 2 sessions self-calibrated: 27 of 30 pages in band 2,500-3,500, with the 3 over-shoots (A6, A7, B8, B9, B10) each documented in tracker Notes with explicit justification (regime complexity, multi-operational coverage, cascade walk-through, computational page, multi-jurisdiction). B4 came in under floor (2,312) with explicit calibration note (competitor median shorter). No drift, no manager intervention required. **Lesson:** the framing-differentiator-led word count (write to topic, not target) discipline works once sessions internalize it.

**16.17 Three regen agents hit rate limit; finish-each-brief-end-to-end recovery worked**
- During Wave 2 pre-launch, three parallel Opus regen sub-agents (one per bucket) hit a rate limit ~10 min in. Only 3 of 30 briefs were partially regenerated before the limit. Recovery: waited for reset, re-spawned with skip-lists for the 3 already-done briefs and an explicit "finish each brief end-to-end before moving on" instruction. Second run completed cleanly. **Lesson:** for any parallel sub-agent batch, instruct each agent to finish complete work units atomically rather than half-finishing many. Reduces rate-limit damage at the worst moment.

### Wave 3 prep (2026-05-22)

**16.18 Reasoning-first must be loud, even when §16.11 is captured**
- First attempt at Wave 3 Stage 1 launched a sub-agent that defaulted to running `scripts/property_wave2_brief_builder.py` + `scripts/property_cannibalisation_check.py` for selection and closest-existing — exactly the token-Jaccard trap §16.11 flagged as broken on novel topical clusters. User caught it before damage and called it out. Manager stopped the sub-agent and re-launched with an explicit "Reasoning-first, NOT Python" framing block at the top of the prompt, including the literal instruction "If you catch yourself reaching for a similarity script to make a decision, stop and reason directly instead." **Lesson:** when a wave-prep prompt references prior lessons (§16.11) it is not enough; manager must *also* spell out the prohibited specific scripts AND the affirmative reasoning behaviour in the prompt header. The default-to-Python pull is strong even after the lesson is on paper.

**16.19 Manager review gate between Stage 1 and Stage 2 catches top-level swaps**
- The Wave 3 Stage 1 sub-agent correctly flagged C1 cannibalisation against an existing stale-citation page but could not resolve it (sub-agents cannot pause and ask for direction mid-flight). Manager review gate between Stage 1 and Stage 2 caught this, made the swap decision, and resolved cleanly before Stage 2 reasoning began. The swap moved the original C1 (a stale-citation rewrite candidate) onto the legacy-rebuild track as F-1, and brought in a genuinely net-new replacement (RRA 2025 enforcement / civil-penalty defence) for the C1 slot. **Lesson:** the Stage 1 / Stage 2 split is the right structural pattern for wave prep — keep it. Stage 1 emits artefacts + surfaces decisions; manager reviews + decides + writes the surgical updates; Stage 2 fans out for the heavy reasoning work. Build a 5-10 minute manager-review gate into the standard wave-prep workflow.

**16.20 Factual catches at prep time can supersede whole house-position sections**
- Stage 1 verification against legislation.gov.uk surfaced that the Renters' Rights Act 2025 (2025 c. 26) received Royal Assent on 27 October 2025 — not "in passage" as house position §12 framed it (correct when written, now stale). §20 was added as a full supersedure, §12 retained as audit. Implication: every existing Property page that references "RRA 2026" / "Renters Rights Act 2026" / "Renters Rights Bill" is now incorrect; site-wide back-patch flagged as Wave 3 F-1. **Lesson:** when a wave's house-position extension covers a topic where the existing house position used an "in passage" / "scheduled, pending Royal Assent" / "to be confirmed" placeholder, automatically commission a site-wide back-patch sweep of the existing inventory as part of the wave's hygiene queue, not as an afterthought.

**16.21 Competitor set is hand-curated, not SERP-derived**
- `scripts/property_topic_gap_finder.py` hard-codes 13 competitor domains; `property_topic_gap_filter.py` narrows to 4. SERP-derived discovery data exists (`competitor_serps` + `serp_runner.py`) but is siloed in the per-page rewrite playbook track. Net-new candidate discovery has therefore been narrower than the available data supports. User flagged 2026-05-22. **Lesson:** the candidate-discovery pipeline and the per-page-rewrite competitor pipeline should share their competitor universe. Slated as infra deliverable between Wave 3 and Wave 4: replace the hand-curated list with a frequency-weighted SERP-derived list (likely 30-50 genuine competitors), with per-URL annotation of which queries each ranks for + at what position so triage becomes data-led.

### Wave 3 execution (2026-05-23)

**16.22 The Bill-vs-enacted-Act drift is a structural pattern, not a one-off catch**
- Wave 3 caught two drifts in locked house-position sections: F-6 §19.7 (MTD ITSA late-payment day-triggers 31/46/91 → 15/30/31 per Spring Statement 2025) at Stage 2 prep, and F-11 §20.7 (RRA 2025 pet rights — three substantive corrections: no pet damage insurance condition, narrow s.16B(4) refusal grounds, County Court remedy not FTT) mid-wave during C7. Both were locked in good faith but tracked Bill drafting or pre-reform mechanics rather than the enacted text. **Lesson:** for any wave's house-position extension that touches a recently-enacted Act or a recently-reformed regime, automatically commission a pre-wave statute-verification pass that diffs the locked position against the current legislation.gov.uk text. Build this into the §6 wave launch protocol as a standard step. Sub-agent task, ~30 min per topic area.

**16.23 A zero-Q&A wave is the prep-quality signal**
- Wave 3 sessions raised zero Q&A across all three buckets (A/B/C). Sessions self-directed end-to-end on reasoned briefs with explicit framing differentiators + cannibalisation discipline + bucket-specific authority links. Compared to Wave 1 (1 Q&A) and Wave 2 (~3 Q&A), the trajectory shows that prep-time reasoning depth (Stage 2 sub-agents + manager-review gate per §16.19) translates directly to in-flight session productivity. **Lesson:** treat zero-Q&A as a deliberate prep-quality target, not just a happy accident. If a wave's prep produces briefs that need manager arbitration mid-flight, the prep was light. Conversely, the temptation to skip the Stage 1 → manager review → Stage 2 split saves preparation time at the cost of wave-execution latency.

**16.24 Post-merge factual back-patches are mandatory when new pages contradict existing inventory**
- Wave 3 shipped MTD ITSA pages with corrected quarterly deadlines (7 August / November / February / May) and the Spring Statement 2025 late-payment schedule (3%/3%/10% at 15/30/31 days). Three existing pages on `main` carried the legacy figures (5-of-month deadlines, 2%/2%/4% schedule, in one case 5%/5%/5%). Without the F-7B + F-9 back-patches, the site would have shipped self-contradicting figures across neighbouring pages — visible to any reader cross-referencing. **Lesson:** add an explicit "scan for stale-existing-page back-patches" step to the wave-close process, between the bucket merges and the program-doc update. F-7B and F-9 were correctly flagged at session time; the manager-side aggregation discipline is what closes the loop. Sessions flagging F-XX with `EXISTING_PAGE_STALE` is now a load-bearing signal.

**16.25 Manager handover requires explicit worktree-branch ff-verification**
- Wave 3 prep Stage 1 + Stage 2 commits (`730add8` → `7d9d664`) landed on `main` but the previous manager closed the prep session without fast-forwarding the three Wave 3 worktree branches (`property-wave3-{a,b,c}`). The branches stayed at `8272c33` (Wave 2 post-merge HEAD), meaning the worktree checkouts physically didn't contain `briefs/property/wave3/`, the START_HERE docs, the corrected §§18-20 of `house_positions.md`, or the F-1 through F-6 flags. Sessions would have hit file-not-found on the first pickup-checklist read. Caught by the incoming manager at session-start verification (the user-facing acknowledgement was held while the ff blocker was surfaced). **Lesson:** the pre-launch checklist §6 step 4 ("fast-forward each worktree branch to current main") needs to be a verification-on-handover step, not just a one-time prep step. Any manager handover after wave-prep commits land on main must explicitly verify each worktree branch HEAD matches main HEAD before sessions are launched.

**16.26 Cross-bucket forward-link sweep at session-end is the right backstop, but mid-wave continuation handovers break it**
- Session C raised F-7C at C1 write (C1 needed forward-links to C5/C6/C9 once they existed). The flag was logged "end-of-session back-patch sweep should verify all four targets resolve". The Session C continuation that closed C9/C10 did not execute the in-session sweep before stopping. Result: C1 → {C5, C6, C9} forward-links were unhyperlinked plain text at merge. Manager picked it up in the post-merge cross-link batch (F-4 + F-7C + F-8 commit `6edc5d8`). No content damage but added one round-trip. **Lesson:** for any session-end back-patch sweep that depends on cross-page forward-links resolving, hard-encode it as Step 20 in the per-page workflow rather than relying on session-end discipline. Or: make it a manager-side post-merge step by default, and treat session-end as best-effort.

### Post-Wave-3 hygiene (2026-05-23 PM)

**16.27 Pre-wave statute verification is now a load-bearing standard step**
- Three §20-vs-enacted-Act drifts caught in succession across Wave 3 and post-Wave-3 hygiene: F-6 §19.7 (Wave 3 Stage 2 prep, MTD ITSA day-triggers), F-11 §20.7 (mid-Wave 3, pet rights), F-12 + F-13 (post-Wave-3, RRO maximum + Ombudsman cap). All three involved locked positions that tracked Bill drafting or pre-reform mechanics rather than enacted text. **Lesson:** §16.22's "structural pattern" call is firmly load-bearing. The sub-agent-driven verification pattern (~45 min, structured per-section verification report, no in-flight Q&A needed) is the right shape for this work. Build into §6 wave launch protocol as a mandatory pre-launch step for any newly-locked legislation. Use the full enacted-Act PDF (`legislation.gov.uk/ukpga/<year>/<chap>/data.pdf`) as the source of truth when per-section WebFetch returns only summary content.

**16.28 Sub-agent-driven inter-wave queue closure works as a pattern**
- Post-Wave-3 inter-wave hygiene was dispatched as three concurrent background sub-agents (competitor discovery + sitemap re-sweep / §20 verification / F-1 RRA-2026 back-patch). All three operated on non-overlapping file surfaces, returned structured reports, and the manager-side review-and-apply step took ~20 minutes per returned agent. Total wall-clock ~3-4 hours for work that would have been ~12+ hours of direct manager execution. **Lesson:** for inter-wave queue items that decompose into deterministic multi-step work with clear file outputs (verification reports, audit manifests, mechanical citation corrections), default to parallel sub-agent dispatch with structured-report return. Manager owns the review + apply step, not the discovery + drafting step.

**16.29 F-1 site-wide back-patch scope can be much smaller than the lesson-of-record assumes**
- §16.20 framed the post-F-1 site-wide back-patch as "every existing Property page that references RRA 2026 is now incorrect" (implying broad inventory contamination). Actual F-1 execution found only 3 stale-citation files across 376 markdown files. Reason: Wave 3 sessions had used correct citations throughout their own work, and prior cleanups had already caught most pre-Wave-3 stale references. **Lesson:** log lessons-of-record at worst-case scope (so they prompt sufficiently-broad sweeps), but track actual execution scope as a separate signal. A back-patch sweep that finds 3 files instead of 30 is not a wasted sweep; it's positive feedback that prior discipline + cumulative correctness held. Reserve manager judgement on whether subsequent back-patches require a full sweep or a targeted grep.

---

## 17. Risk register

| Risk | Mitigation |
|---|---|
| Factual error ships in a page | House positions doc + flag-on-conflict + manager verifies via legislation.gov.uk + fix on branch before merge |
| Two sessions cannibalise each other | Token-level pre-wave check + CANNIBAL flag + manager arbitrates |
| Templating drift in same bucket | Per-page framing differentiator + manager spot-check after page 3 |
| Tracker ahead of branch (lost work risk) | Step 14 (commit) before step 16 (mark done) + manager checks `git log` vs tracker |
| Worktree missing runtime files | Pre-launch checklist copies `.env` + `_db.py` |
| Worktree branch behind main | Pre-launch checklist fast-forwards each branch |
| Session out of context mid-wave | Discovery log records stop point + tracker shows ⬜ todo + user relaunches |
| Q&A answer doesn't reach session | Session-side Monitor watcher (Wave 2+) |
| Word-count drift | M-3/M-4 calibration after page 2 of each session |
| Live-page regression from new link target | `monitored_pages` table + weekly regression detector; 90-day window; 14-day grace |
| Manager runs out of context mid-wave | §14 self-awareness: write handover update, stop, hand off to fresh manager |
| Sub-agent returns garbage | Manager verifies sub-agent's output before propagating (read the briefs the sub-agent generated, spot-check the cannibalisation re-check results) |

---

## 18. File map

```
docs/
├── property/
│   ├── NETNEW_PROGRAM.md                        ← this doc (THE pickup doc)
│   ├── house_positions.md                       ← locked factual positions
│   ├── topic_gaps_final.md                      ← 429 net-new candidate list
│   ├── topic_gaps_redirect_overlap.md
│   ├── topic_gaps_other_resolved.md
│   ├── topic_gaps_first_cut.md                  ← intermediate, reference
│   ├── competitor_rewrite_playbook.md           ← legacy-rebuild methodology (May 21)
│   ├── track1_page_tracker.md                   ← Wave 1 (closed, 31/31)
│   ├── track1_site_wide_flags.md                ← Wave 1 flags
│   ├── track1_discovery_log_session_{A,B,C}.md  ← Wave 1 discoveries
│   ├── track1_questions_session_{A,B,C}.md      ← Wave 1 Q&A logs
│   └── wave<N>_*.md                             ← per-wave artefacts (created at launch)
├── sessions/property/
│   ├── TRACK1_SESSION_{A,B,C}_START_HERE.md     ← Wave 1 briefs
│   └── WAVE<N>_SESSION_{A,B,C}_START_HERE.md    ← Wave N briefs
├── medical/                                     ← parked program
└── network_state_and_handover_2026-05-21.md     ← broader network state (May 21 baseline)

briefs/property/
├── track1/                                      ← Wave 1 per-page briefs
└── wave<N>/                                     ← Wave N per-page briefs

scripts/
├── property_topic_gap_finder.py
├── property_topic_gap_filter.py
├── property_other_reclassify.py
├── property_cannibalisation_check.py            ← re-run pre every wave
├── property_redirect_overlap_check.py
└── property_track1_brief_builder.py             ← adapt for wave N

optimisation_engine/
├── analysis/detectors.py                        ← monitored_pages regression detector
├── competitor/
│   ├── brief_for_opus.py                        ← SITE_RULES
│   ├── _db.py                                   ← UNTRACKED; copy to every new worktree
│   └── _fetch.py
└── ingestion/
    ├── ingest_gsc_queries.py
    └── ingest_gsc_pages.py

Property/web/                                    ← the site
├── content/blog/                                ← 316 markdown files
└── src/
    ├── middleware.ts                            ← 429 redirects + per-page additions
    ├── components/blog/BlogPostRenderer.tsx     ← auto-injects LeadForm
    └── app/globals.css                          ← .prose-blog aside CSS

Accounting-wt-property-track1-{a,b,c}/           ← Wave 1 worktrees (merged, can delete)
Accounting-wt-medical-{a,b,c}/                   ← Medical parked worktrees
```

### Key Supabase tables

| Table | Purpose |
|---|---|
| `sites` | Site registry (site_key, gsc_property_url) |
| `gsc_query_data` | Query-level GSC data per page per day |
| `gsc_page_performance` | Page-level GSC data per day |
| `ga4_page_data` | GA4 engagement / conversion |
| `competitor_serps` | One row per (site_key, query, fetch_date) |
| `competitor_pages` | One row per competitor URL per SERP |
| `competitor_gap_reports` | Per-page gap analysis + improvement brief |
| `monitored_pages` | Wave 1 (52 rewrites + 5 redirects) + future waves; 90-day regression window |
| `optimisation_opportunities` | Detector outputs queued for review/apply |

---

## 19. Open decisions / known unknowns

- ~~Wave 2 launch timing.~~ CLOSED. Wave 2 completed 2026-05-22 (merged + post-merge cleanups landed).
- ~~Worktree reuse vs fresh.~~ CLOSED. Fresh worktrees used for both Wave 2 and Wave 3 — confirmed working pattern.
- ~~Post-Wave-1 cleanups + deploy.~~ Cleanups done; deploy still held by user pending review of Waves 1 + 2 + 3.
- **Legacy rebuild brief generator.** Needs GA4 enrichment on top of GSC + competitor HTML. Design pending; can be a sub-agent task once Wave 3 lands.
- **285 target vs 429 candidate list.** User narrowed from 429 to ~285. Need to confirm which 144 candidates were dropped, on what basis. After Wave 3 ships, 91 net-new shipped and ~194 candidates remain in the user-narrowed pool.
- **House positions for legacy rebuilds.** Currently locked: §§1-12 plus Wave 2 extensions §§15-17 plus Wave 3 extensions §§18-20. Before legacy waves start, surface a checklist of any topic touched by ≥10 legacy pages that does not have a locked house position.
- **NEW: Data-driven competitor discovery.** §16.21. Current `property_topic_gap_finder.py` hard-codes 13 domains, narrowed to 4 by the filter; SERP-derived data exists but is siloed in the per-page rewrite playbook. Slated as infra deliverable between Wave 3 and Wave 4 (user-flagged 2026-05-22).
- ~~§19.7 MTD ITSA late-payment rate verification.~~ RESOLVED 2026-05-22 by Stage 2 MTD sub-agent. Day-triggers corrected from 31/46/91 to **15/30/31** (the Spring Statement 2025 reform accelerated both percentages AND day-triggers). Percentages 3%/3%/10% confirmed. §19.7 and §3 corrected with `Correction logged 2026-05-22`; F-6 broadcasts the change to sessions. Source: gov.uk Spring Statement 2025 HTML document. **Pattern:** the §5.2 correction process working as designed, factual catch via downstream Stage 2 verification.
- **NEW: RRA-2026 citation back-patch sweep + existing-page rewrite (F-1).** Site-wide grep for "Renters Rights Act 2026" / "RRA 2026" / "renters rights bill" across the 346 blog posts and back-patch with the correct 2025 c. 26 citation. Plus rewrite the existing `renters-rights-act-2026-tax-implications-landlords` page to reflect post-Royal-Assent state. Run between Wave 3 close and Wave 4 launch.
- **NEW: Competitor sitemap re-sweep cadence.** Hand-curated competitor list aside, the existing list of 13 has not been re-sitemap-fetched since the original gap analysis. Competitors publish new content; we are missing additions. Recommend ad-hoc re-sweep between waves (manager triggers `property_topic_gap_finder.py` against the current list, dedupes against `topic_gaps_final.md`, surfaces a delta). Pair with the data-driven discovery item above.

---

## 20. Wave 2 prep — what the prep agent / next manager needs to do

(Detailed handoff for the entity that takes Wave 2 from here.)

1. Extend `docs/property/house_positions.md` with IHT / DTAs / Expat sections (see §5.3 for the spec).
2. Filter `docs/property/topic_gaps_final.md` to the three buckets and select top 30 (10 IHT + 10 DTAs + 10 Expat) by priority signal.
3. Adapt `scripts/property_track1_brief_builder.py` with:
   - IHT / DTAs / Expat-specific authority link bucket.
   - References to the new house positions sections.
4. Generate ~30 briefs at `briefs/property/wave2/<slug>.md`.
5. Run `scripts/property_cannibalisation_check.py` with current `main` (post-Wave-1) as baseline. Audit any 0.30-0.55 partial-overlap candidates.
6. Create wave2 artefact files:
   - `docs/property/wave2_page_tracker.md`
   - `docs/property/wave2_site_wide_flags.md`
   - `docs/property/wave2_discovery_log_session_{A,B,C}.md`
   - `docs/property/wave2_questions_session_{A,B,C}.md`
7. Stand up fresh worktrees: `Accounting-wt-property-wave2-{a,b,c}/` on branches `property-wave2-{a,b,c}` from current `main`.
8. Copy `.env` and `_db.py` into each worktree.
9. Write `docs/sessions/property/WAVE2_SESSION_{A,B,C}_START_HERE.md`. Include the session-side watcher pattern (§8.4) baked into the workflow.
10. Write `docs/sessions/property/WAVE2_LAUNCH_PROMPTS.md` containing the three paste-verbatim launch prompts.

Once 1-10 are done, hand back to the manager for watcher-arm + session-launch.
