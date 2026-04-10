# Editorial Pipeline — Lessons & Guardrails

Last updated: 9 April 2026

Reference script: `scripts/optimize_content_editorial.py`
Review output: `scripts/editorial_review.json`
Applied manifest: `scripts/editorial_applied.json`

---

## LLM Output Failures

### F-001: Meta description exceeds character limits

- **Frequency:** 10/19 posts (DeepSeek run, 9 Apr 2026)
- **Root cause:** LLMs cannot reliably count characters despite explicit prompt instruction ("Count. Every. Character."). DeepSeek consistently overshot by 10-35 characters.
- **Impact:** Google truncates long meta descriptions in SERPs. Content validator rejects posts with metaTitle > 60 or metaDescription > 155.
- **Code guardrail:** `validate_result()` truncates metaTitle at 60 chars (last word boundary) and metaDescription at 155 chars (last sentence/period boundary). Logged as warning.

### F-002: Fabricated data (pricing, statistics)

- **Frequency:** 2/19 posts (DeepSeek run, 9 Apr 2026). Software pricing for PropertyBee, Landlord Vision, Xero, QuickBooks, FreeAgent, Sage — all invented.
- **Root cause:** LLMs confidently generate plausible-sounding numbers when they don't know the answer. Pricing is a prime target because the model has no current data.
- **Impact:** Publishing wrong prices on a professional accountancy site damages credibility and may violate advertising standards.
- **Code guardrail:** `validate_result()` scans `new_html` for price patterns (£X/month, £X per month, from £X, £X monthly) and sets `"_needs_price_verification": true` on the result. The `--apply` step skips content changes with this flag unless `--force-prices` is passed.

### F-003: Wrong tax year references

- **Frequency:** 1/19 posts (DeepSeek run, 9 Apr 2026). Bristol post used "£3,000 for 2024/25" instead of 2025/26.
- **Root cause:** LLM training data includes historical tax years. Without strong anchoring to the current year, it defaults to whatever year appears most in training.
- **Impact:** Wrong tax year on a YMYL site = factually incorrect tax advice.
- **Code guardrail:** `validate_result()` regex-scans `new_html` for `20\d\d/\d\d` patterns and flags any that don't match the valid set (currently 2025/26 and 2026/27). Flagged entries get `"_has_tax_year_warning": true`.

### F-004: Wrong legal terminology

- **Frequency:** 1/19 posts (DeepSeek run, 9 Apr 2026). Called s.162 TCGA 1992 "hold-over relief" — that's s.165. s.162 is "incorporation relief".
- **Root cause:** LLMs conflate related but distinct legal concepts. Property tax has many overlapping reliefs with similar names.
- **Impact:** Incorrect legal references on an accountancy site undermine authority and could mislead professionals.
- **Code guardrail:** None automated — this requires domain knowledge. The lessons doc serves as the reference. Future: maintain a terminology validation list in the prompt or as a post-check dictionary.

### F-005: Used body text as heading target instead of h2/h3

- **Frequency:** 6/37 content changes (DeepSeek run, 9 Apr 2026). Three on `property-accountant-salary` (all changes lost), one each on `section-24-calculator`, `landlord-accounting-software`, `landlord-insurance-tax-deductible`, `incorporate-rental-property`.
- **Root cause:** The prompt says "insert_after: The EXACT existing heading text" but DeepSeek sometimes uses the first paragraph or the page title (h1) instead.
- **Impact:** The apply script silently skips changes it can't find headings for, so no corruption — but useful content changes are lost.
- **Code guardrail:** `validate_result()` checks every `insert_after` and `target_heading` against actual `<h2>` and `<h3>` tags in the post HTML. Invalid targets are dropped with a warning logged.

### F-006: Proposed duplicate content that already exists

- **Frequency:** 2/19 posts (DeepSeek run, 9 Apr 2026). PPR post: proposed worked example identical to one already added manually. Tax deductions post: proposed expanding a section we'd already expanded.
- **Root cause:** The LLM receives the full post content, but if the post was edited after the GSC data was collected (or between the analysis and apply steps), the LLM's proposals may overlap with recent changes.
- **Impact:** Duplicate sections in a blog post. Readers see the same worked example twice.
- **Code guardrail:** `validate_result()` checks if `new_heading` text (for `add_section`) already exists as an h2/h3 in the current content. If so, the change is dropped. For `expand_section`, the heading must exist (that's the point), so no duplicate check needed.

---

## Script Failures

### S-001: expand_section handler missing

- **Frequency:** Would have affected 13/19 posts if not caught during review (9 Apr 2026).
- **Root cause:** `apply_content_changes()` only had an `if change_type == "add_section"` branch. The `expand_section` type was specified in the LLM prompt and returned in the JSON, but the apply code never handled it.
- **Impact:** All section expansions silently skipped. Only new sections would be added.
- **Resolution:** Implemented `expand_section` handler that finds the heading, locates the next heading at same or higher level, and replaces the content between them.
- **Prevention:** When adding new change types to the LLM prompt, always add the corresponding handler to `apply_content_changes()`.

### S-002: Internal links applied inside YAML front matter

- **Frequency:** 1/19 posts (DeepSeek run, 9 Apr 2026). `incorporation-timing` post: a FAQ answer contained a sentence that matched a link's `context_sentence`, so `<a href="...">` with double quotes was injected inside a YAML double-quoted string.
- **Root cause:** `apply_internal_links()` used `content.replace()` on the entire file content, including the YAML front matter.
- **Impact:** Broken YAML parsing. Content validator catches this, but if run without validation the post would 500 on build.
- **Resolution:** `apply_internal_links()` now splits content at the second `---` delimiter and only applies replacements to the body portion.
- **Prevention:** Any function that modifies `.md` file content must operate only on the body (after the second `---`), never on front matter.

### S-003: Unicode characters in print statements (Windows)

- **Frequency:** Caused complete data loss on first Anthropic run (~$0.50 wasted, 9 Apr 2026).
- **Root cause:** Print statements used `→` (U+2192) arrow character. Windows PowerShell uses charmap encoding which cannot encode it. The UnicodeEncodeError was caught by the except block, causing successful API responses to be recorded as errors instead of saved.
- **Impact:** All 20 API responses received but lost. Money spent for nothing.
- **Resolution:** Replaced all non-ASCII characters with ASCII equivalents (`->` instead of `→`). Added `io.TextIOWrapper` with UTF-8 encoding as belt-and-suspenders.
- **Prevention:** Never use non-ASCII characters in print statements or comments. Use `safe_print()` helper.

### S-004: No incremental saving — crash loses all results

- **Frequency:** Compounded S-003 — all 20 results lost because the file was only written after the loop completed.
- **Root cause:** `json.dump()` was called once after the `for` loop, not after each successful API call.
- **Impact:** Any crash mid-loop (encoding error, API timeout, process kill) loses all completed work.
- **Resolution:** `save_results()` called after every successful API response. File is always in a valid state.
- **Prevention:** Any long-running script that makes sequential API calls must save incrementally.

### S-005: No output validation before saving

- **Frequency:** Affected all 19 posts with changes (9 Apr 2026). Every issue in F-001 through F-006 could have been caught automatically.
- **Root cause:** The script saved raw LLM output directly to the review JSON without any validation.
- **Impact:** Required manual post-hoc fix scripts to correct errors before applying.
- **Resolution:** `validate_result()` function runs on every LLM response before saving.
- **Prevention:** Never save LLM output without validation. The LLM is a collaborator, not an authority.

---

## Context Failures

### C-001: No awareness of prior manual edits

- **Frequency:** 2/19 posts (9 Apr 2026). PPR worked example and tax deductions list had been manually added before the DeepSeek run.
- **Root cause:** The script sends the current file content to the LLM, but if the file was edited between "collect GSC data" and "run analysis", the LLM sees the edited version. However, it may still propose changes that overlap with recent edits if the edits were made after the LLM prompt was designed.
- **Impact:** Duplicate content in the output. Requires manual review to catch.
- **Code guardrail:** `validate_result()` checks for duplicate headings. The `editorial_applied.json` manifest tracks what was applied and when, so future runs can skip recently-touched fields.

### C-002: Overwrites better existing meta tags

- **Frequency:** 1/19 posts (9 Apr 2026). CGT post had a manually crafted metaTitle that spelled out "Capital Gains Tax" in full. DeepSeek proposed abbreviating to "CGT" which is worse for search.
- **Root cause:** The LLM optimizes for what it thinks is best, unaware that a human made a deliberate choice.
- **Impact:** Regression — a better meta tag replaced with a worse one.
- **Code guardrail:** The `editorial_applied.json` manifest records when meta fields were last changed. The `--apply` step checks this manifest and skips meta changes on fields modified within the last 30 days unless `--force-meta` is passed.

---

## Guardrail Checklist

Before running the editorial pipeline, verify:

- [ ] `validate_result()` is enabled (not bypassed)
- [ ] All meta fields will be validated against char limits (metaTitle <= 60, metaDescription <= 155)
- [ ] Internal links will only be applied to body HTML, not YAML front matter
- [ ] All heading targets will be verified as actual h2/h3 tags in the post
- [ ] Tax year references will be checked against the current valid set
- [ ] Pricing claims will be flagged for human review
- [ ] Results will be saved incrementally after each API call
- [ ] The `editorial_applied.json` manifest exists and will be consulted
- [ ] `--validate-only` has been run first to preview the changes
- [ ] `validate_blog_content.py` will be run after applying

---

## Adding New Failure Modes

When a new issue is discovered:

1. Add it here with the next sequential ID (F-007, S-006, C-003, etc.)
2. Document: frequency, root cause, impact, code guardrail (or "none — requires human review")
3. If automatable, implement the guardrail in `validate_result()` or the apply functions
4. If it affected live content, also log it in `Admin/ISSUE_LOG.md`
5. Update the Guardrail Checklist if a new check is needed
