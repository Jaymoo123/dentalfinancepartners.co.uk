# Architect handoff — Trade Tax Specialists (construction-cis)

## What you are building

A new specialist accounting website for the CIS/construction niche, following the `contractors-ir35` site as the reference implementation. Everything is planned and ready in `docs/construction-cis/SITE_PLAN.md`. Your job is to spin up the site, implement the machinery, write the 15 wave-1 pages, and leave it in a deploy-ready state (same standard as contractors-ir35 — build green, zero leaks, HP locked).

## Reference implementation

The `contractors-ir35/web/` directory is your blueprint. Mirror it exactly unless SITE_PLAN.md says otherwise. Where the two sites differ structurally (see §9 of SITE_PLAN.md), follow the plan. When in doubt, match contractors-ir35.

## Key structural differences from contractors-ir35

1. **Two Tier 1 service pages:** `/cis-refund` + `/gross-payment-status` (cfp had one: `/ir35-status`)
2. **Design tokens:** primary `#f97316` (orange), dark `#1e293b` (slate) — not petrol/cyan
3. **10 /for/* pages:** plumbers, electricians, joiners, groundworkers, roofers, builders, gas-engineers, painters-decorators, scaffolders, civil-engineers
4. **7 blog categories:** CIS Basics, CIS Compliance, CIS Refunds, CIS Advanced, VAT and MTD, Expenses, Limited Company
5. **Site key:** `construction-cis` | **Storage prefix:** `bfp` | **Brand:** Trade Tax Specialists

## Conduct rules (non-negotiable)

- **Model tiering:** Haiku = banned from content writing. Sonnet = volume blog writing and building. Opus = pillars (3 of the 15 wave-1 pages), judging panels, repairs, HP reasoning.
- **No em-dashes** in any user-facing copy — use commas, parentheses, full stops, or middle dots.
- **Blog frontmatter body = raw HTML only** (`<p>`, `<h2>`, `<ul>`, `<li>` etc.). Never markdown syntax — the renderer does not parse it.
- **Quality bar:** Every page must be genuinely authoritative. Not AI-scammy or thin. Best-in-niche or it does not ship.
- **No auto-commit.** Write files + log audit rows but do not git commit unless OPTIMISATION_AUTO_COMMIT=1.
- **Factual ground truth is locked in SITE_PLAN.md §8.** Do not write content that contradicts those figures. Particular watch items: dividend rates 10.75%/35.75%, AMAP 55p (not 45p), GPS £30k turnover test, April 2026 nil-return obligation, April 2026 GPS anti-fraud changes.

## Execution order

1. **Read** `docs/construction-cis/SITE_PLAN.md` in full before touching any files.
2. **Scaffold** the site directory at `construction-cis/web/` mirroring `contractors-ir35/web/`.
3. **Configure** `niche.config.json` with brand tokens and site identity from SITE_PLAN.md §1–4.
4. **Build** the static service pages: homepage, /services, /cis-refund, /gross-payment-status, /about, /contact (with metaTitles from §6).
5. **Build** the 10 /for/* trade pages (§5 Tier 2, §6 core page mapping).
6. **Write house_positions.md** (HP lock) from SITE_PLAN.md §8. This is ground truth. Lock it before any blog content.
7. **Write wave-1 pages** (15 pages — §7). Three are pillars (Opus): #1 what-is-cis, #2 cis-gross-payment-status-guide, #3 cis-sole-trader-vs-limited-company. The other 12 are clusters (Sonnet). Follow the pre-write notes in §7.
8. **QA chain:** same as contractors-ir35 — assertFrontmatter, validateNicheConfig, build green, link audit (no internal references to pages that do not exist), 7-judge Sonnet panel on each cluster, Opus panel on each pillar.
9. **Database:** add `sites` registry row, update `sites_site_key_check` and `leads_source_valid` constraints, seed `blog_topics` for the 7 categories via autocomplete expansion.
10. **Create Vercel project** in estate team (`sitenudge-projects`, team `team_XF9WAygZX7SGk9Fo4tOAnihH`), set 5 env vars (SUPABASE pair, SERVICE_ROLE, ADMIN_DASHBOARD_KEY, NEXT_PUBLIC_SITE_URL).
11. **Write STATE.md** at `docs/construction-cis/STATE.md` on completion — same format as `docs/contractors-ir35/STATE.md`.

## Important references

- Full site plan + money keyword map: `docs/construction-cis/SITE_PLAN.md`
- Reference implementation: `contractors-ir35/web/`
- Site spinup checklist: `docs/_engines/SITE_SPINUP.md`
- Estate engine map: `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md`
- Quality bar: memory `feedback_gold_standard_quality_bar.md`
- Model tiering: memory `feedback_no_deepseek_opus_only.md`
- No em-dashes: memory `feedback_no_em_dashes.md`
- Blog rendering (HTML only): memory `blog_page_rendering_html_in_frontmatter.md`
