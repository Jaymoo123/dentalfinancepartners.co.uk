"""Generate thin per-page scaffold briefs for the Medical site.

The brief is deliberately minimal. It hands each session the deterministic
context (source path, frontmatter snapshot, GSC queries, competitor URLs,
cannibalisation map, rules pointers) and gets out of the way. Sessions do
their own competitor HTML fetch + analysis + rewrite + output. The Python
side is only used for things that are genuinely deterministic.

What this script does:
  - Read every Medical/web/content/blog/*.md and capture frontmatter
  - Pull GSC top queries per page (last 28 days)
  - Seed a primary query for pages with no GSC data (from metaTitle/h1)
  - Fetch top-3 competitor URLs via DuckDuckGo (skipping our own domain
    and robots-blocked hosts)
  - Compute cannibalisation context (slug-overlap + pillar map)
  - Write briefs/medical/<slug>.md

What this script does NOT do (this is the change):
  - No HTML fetching of competitors. Sessions fetch + parse competitors
    themselves with BeautifulSoup so Opus reasoning runs on real HTML
    rather than regex-extracted signals.
  - No FAQ/H2/H3/component extraction. Same reason.

Usage:
  python -m optimisation_engine.competitor.medical_brief_runner --slug <slug>
  python -m optimisation_engine.competitor.medical_brief_runner --all
  python -m optimisation_engine.competitor.medical_brief_runner --all --start 10 --limit 5
"""
from __future__ import annotations

import argparse
import re
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import yaml

from optimisation_engine.clients.ddg_serp_client import fetch_organic_results
from optimisation_engine.competitor._db import _esc, _sql
from optimisation_engine.competitor._fetch import can_fetch


SITE_KEY = "medical"
CONTENT_DIR = ROOT / "Medical/web/content/blog"
DOMAIN = "https://www.medicalaccounts.co.uk"
OUR_HOSTNAME = "medicalaccounts.co.uk"
BRIEFS_DIR = ROOT / "briefs/medical"
HOUSE_POSITIONS_PATH = "docs/medical/house_positions.md"


# ---------------------------------------------------------------------------
# Page list + primary query selection
# ---------------------------------------------------------------------------

def list_medical_pages() -> list[dict]:
    """Read Medical/web/content/blog/*.md and return frontmatter + slug."""
    out: list[dict] = []
    for md in sorted(CONTENT_DIR.glob("*.md")):
        text = md.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        end = text.find("---", 3)
        if end == -1:
            continue
        fm_text = text[3:end]
        try:
            fm = yaml.safe_load(fm_text) or {}
        except yaml.YAMLError:
            fm = {}
        body = text[end + 3:]
        word_count = len(re.sub(r"<[^>]+>", " ", body).split())
        out.append({
            "slug": md.stem,
            "path": str(md.relative_to(ROOT)).replace("\\", "/"),
            "title": fm.get("title", ""),
            "meta_title": fm.get("metaTitle", ""),
            "meta_description": fm.get("metaDescription", ""),
            "h1": fm.get("h1", ""),
            "category": fm.get("category", ""),
            "current_word_count": word_count,
            "current_faq_count": len(fm.get("faqs", []) or []),
        })
    return out


def gsc_queries_for_page(slug: str, days: int = 28, top: int = 15) -> list[dict]:
    """Top queries by impressions for the given slug from gsc_query_data."""
    rows = _sql(f"""
        SELECT query, SUM(impressions) AS impr, SUM(clicks) AS clicks,
               ROUND(AVG(position)::NUMERIC, 1) AS pos
        FROM gsc_query_data
        WHERE site_key = {_esc(SITE_KEY)}
          AND page_url ILIKE '%/{slug}'
          AND date >= CURRENT_DATE - {days}
        GROUP BY query
        ORDER BY impr DESC
        LIMIT {top}
    """)
    return rows


MEDICAL_CONTEXT_TOKENS = {
    "doctor", "doctors", "gp", "gps", "locum", "locums", "consultant",
    "consultants", "medical", "practice", "nhs", "surgery", "physician",
    "surgeon", "dentist", "dentists",
}


def seed_query_from_metadata(page: dict) -> str:
    """When GSC is empty, derive a search-style query from page metadata.

    Adds a medical-context modifier if the candidate query doesn't already
    contain one (otherwise DDG returns generic-accountant or job-board
    garbage for queries like 'GP Accountant Birmingham').
    """
    candidates = [page.get("meta_title"), page.get("h1"), page.get("title")]
    base = ""
    for c in candidates:
        if not c:
            continue
        c = re.sub(r"\s*[\|\-]\s*Medical Accountants.*$", "", c, flags=re.IGNORECASE)
        c = re.sub(r"\s*[\|\-]\s*Medicalaccounts.*$", "", c, flags=re.IGNORECASE)
        c = c.strip()
        if c:
            base = c
            break
    if not base:
        base = page["slug"].replace("-", " ")

    # If the query already has medical context, use as-is
    lower = base.lower()
    if any(tok in lower.split() for tok in MEDICAL_CONTEXT_TOKENS):
        return base

    # Otherwise prepend a medical modifier based on the page's target audience.
    # City pages → "for GP doctors", category → "for doctors UK"
    slug = page["slug"].lower()
    if "locum" in slug:
        return f"{base} for locum doctors UK"
    if "consultant" in slug:
        return f"{base} for hospital consultants UK"
    if "gp" in slug or "practice" in slug:
        return f"{base} for GP doctors UK"
    return f"{base} for UK doctors"


# ---------------------------------------------------------------------------
# Competitor SERP fetch (DDG, deterministic — no HTML parsing here)
# ---------------------------------------------------------------------------

def fetch_competitor_urls(query: str, n: int = 3) -> list[dict]:
    """Top organic results, excluding our domain and robots-blocked hosts.
    Returns DDG result dicts (no HTML fetched — sessions do that themselves)."""
    raw = fetch_organic_results(query, num=n + 8, region="uk-en", site_key=SITE_KEY)
    out: list[dict] = []
    seen_hosts: set[str] = set()
    for r in raw:
        url = r.get("link") or r.get("url") or ""
        host = (r.get("domain") or urlparse(url).hostname or "")
        if not host or OUR_HOSTNAME in host:
            continue
        if host in seen_hosts:
            continue
        try:
            if not can_fetch(url):
                continue
        except Exception:
            pass
        seen_hosts.add(host)
        out.append({
            "url": url,
            "title": r.get("title", "")[:200],
            "snippet": r.get("snippet", "")[:300],
            "domain": host,
        })
        if len(out) >= n:
            break
    return out


# ---------------------------------------------------------------------------
# Cannibalisation context
# ---------------------------------------------------------------------------

PILLARS = {
    "NHS pension annual allowance": "/blog/nhs-pension-annual-allowance-complete-guide",
    "Locum tax (complete)": "/blog/locum-doctor-tax-complete-guide",
    "Locum IR35": "/blog/locum-doctor-ir35-what-you-need-to-know",
    "GP partnership tax (complete)": "/blog/gp-partnership-tax-complete-guide",
    "GP limited company": "/blog/gp-limited-company-tax-benefits-drawbacks",
    "Medical practice incorporation": "/blog/medical-practice-incorporation-step-by-step",
    "GP tax deductions": "/blog/gp-tax-deductions-complete-list-2026",
    "GP accountant services (complete)": "/blog/gp-accountant-services-complete-guide",
}

STOP_TOKENS = {
    "the", "a", "an", "guide", "uk", "complete", "tax", "to", "and",
    "for", "of", "what", "how", "your", "you", "in", "is", "are",
    "step", "by", "2026", "2025",
}


def cannibalisation_candidates(slug: str, all_pages: list[dict]) -> list[tuple[int, str, list[str]]]:
    this_tokens = set(slug.replace("-", " ").split()) - STOP_TOKENS
    out: list[tuple[int, str, list[str]]] = []
    for p in all_pages:
        if p["slug"] == slug:
            continue
        other_tokens = set(p["slug"].replace("-", " ").split()) - STOP_TOKENS
        overlap = this_tokens & other_tokens
        if len(overlap) >= 2:
            out.append((len(overlap), p["slug"], sorted(overlap)))
    out.sort(key=lambda x: -x[0])
    return out


# ---------------------------------------------------------------------------
# Brief assembly
# ---------------------------------------------------------------------------

UNIVERSAL_RULES = """\
## Universal rules

### Voice
- **No em-dashes.** Commas, parentheses, full stops, or middle dots instead.
- Practical and specific. Exact figures, named legislation. No vague hedges.
- Anonymised social proof only. No real client names. No real NHS Trust names unless quoting publicly available policy.

### Lead-gen architecture
- `Medical/web/src/components/blog/BlogPostRenderer.tsx` auto-injects the `LeadForm` at the bottom. **Never duplicate it in body content.**
- Add 1-3 inline `<aside>` CTAs at conversion moments (after worked examples, comparison tables, decision frameworks). Drive scroll-to-form.
- Match the form's role segments: GP (salaried) / GP (partner) / Locum doctor / Hospital consultant / Private practice owner. Cover each segment's perspective where relevant.

### CSS in markdown content
- **Tailwind utilities do NOT work in markdown body content** (Tailwind v4 scans `src/**` only).
- Semantic HTML in markdown only: `<aside>`, `<table>`, `<ul>`, `<strong>`.
- The `.prose-blog aside` rule is in `Medical/web/src/app/globals.css` (medical-teal accent on copper-soft) — added during pre-flight.
- Inline CTA pattern:
```html
<aside>
<p>Headline that signals a conversion moment</p>
<p>Body copy that prompts scroll-to-form below.</p>
</aside>
```

### FAQs and schema
- FAQs live in frontmatter `faqs:` array (`question` + `answer`).
- Template auto-emits FAQPage JSON-LD via `buildBlogPostingJsonLd` in `Medical/web/src/lib/schema.ts`. **Do NOT manually add FAQ schema in body content.**
- Article + FAQPage + BreadcrumbList + Organization all auto-emitted.
- Target 10-14 FAQs.

### Cannibalisation
- Pillar pages are listed below. When this page touches a pillar topic, write the **applied / scenario / local** version, not the comprehensive theoretical version. Link out to the pillar.
- Do not duplicate worked numerical examples verbatim across pages.

### House positions
- **Read `docs/medical/house_positions.md` once at the start of your session.** It is the tie-breaker. If a competitor contradicts a house position, the house position wins; the competitor is wrong or out of date.

### Quality bar (acceptance criteria for each page)
- Word count: roughly competitor median (typically 2,500-3,500). Do not pad past 3,500 if competitors are short.
- FAQs: 10-14.
- External authority links: 4-7 (HMRC EIM/ESM/BIM, NHS BSA, NHS England, GMC, BMA, legislation.gov.uk, gov.uk).
- 1-3 inline `<aside>` CTAs.
- Build clean: from your worktree root, `cd Medical/web && npm run build`.
- FAQ schema count in built HTML matches the frontmatter array length (`grep -c '"@type":"Question"' .next/server/app/blog/<slug>.html`).
- Zero em-dashes anywhere in body or FAQs.
- Zero Tailwind utility classes in markdown.
- Internal links to relevant pillar pages.
"""


WORKFLOW = """\
## Workflow (do in order, per page)

1. **Claim the page** in `docs/medical/page_rewrite_tracker.md` — change Status `⬜ todo` → `🟡 in_progress`, add today's date.
2. **Read the source markdown** at the path under "Source file" below.
3. **Read `docs/medical/house_positions.md`** once at the start of your session (only re-read if you hit a factual edge case you've not seen before).
4. **Fetch and analyse each competitor URL listed below.**
   - Use `httpx.get(url, follow_redirects=True, timeout=30)` and `BeautifulSoup(html, "lxml")` to parse the HTML.
   - Decide what shape of analysis the page needs (a city page has different priorities than a tax-pillar page — do not run the same template across all of them).
   - For each competitor: read the actual content. Note H1, the H2 outline and what's covered under each, FAQ patterns, worked examples, citation density, component patterns (comparison tables, decision matrices, calculators), word count, schema emitted, anything else that stands out.
   - Then compare across competitors: where do 2 or more cover something that ours doesn't?
   - Then compare to OUR source: where are our gaps; where are we over-indexed on theory vs application; which queries are competitors targeting that ours misses.
5. **Plan the rewrite** before touching markdown. Decide: new H2/H3 outline; meta title (lead with the primary query word order, <62 chars); meta description (<158 chars); FAQs to add/rewrite; inline `<aside>` CTAs and where they go; cannibalisation handling (write the applied/local version where a pillar exists).
6. **Verify factual claims against authorities.** HMRC manuals, NHS BSA, legislation.gov.uk, GMC, BMA. The house positions doc is the tie-breaker.
7. **Apply the rewrite to the source markdown file.**
8. **Update `date:` frontmatter** to today's date.
9. **Build:** from your worktree root, `cd Medical/web && npm run build`. Must pass clean.
10. **Verify FAQ schema count:** `grep -c '"@type":"Question"' Medical/web/.next/server/app/blog/<slug>.html` must equal your frontmatter `faqs:` array length.
11. **Verify no em-dashes:** `grep -c "—" Medical/web/content/blog/<slug>.md` must return 0.
12. **Verify no Tailwind classes** in markdown: `grep -cE 'class="[a-z]' Medical/web/content/blog/<slug>.md` must return 0.
13. **Fill in the "Post-rewrite report" at the bottom of this brief.** What you found, what you changed, what you couldn't resolve.
14. **Mark done** in `docs/medical/page_rewrite_tracker.md`: `🟡 in_progress` → `✅ done`, one-line Notes summary.
15. **Append site-wide issues** to `docs/medical/site_wide_flags.md` (append-only, never edit existing entries) if you discover anything requiring orchestrator/user input. Do not pause; flag and continue.
16. **Next page on your assigned list.**
"""


POST_REWRITE_TEMPLATE = """\
## Post-rewrite report (fill in after rewrite)

**Slug:** <slug>
**Rewrite date:** <YYYY-MM-DD>
**Build:** <pass / fail>
**FAQ schema count matches frontmatter:** <yes / no>

### Word count
- Before: <n>
- After: <n>

### FAQ count
- Before: <n>
- After: <n>

### What competitors had that we didn't (the gaps you closed)
- <bullet>
- <bullet>

### Worked examples added / scenarios used
- <bullet>

### Authority links added
- <bullet>

### Cannibalisation handling
- <none / linked out to pillar X / pivoted to the applied scenario version>

### House-position items applied
- <bullet, only if relevant>

### Anything flagged to `docs/medical/site_wide_flags.md`
- <none / one-line summary of each flag>

### Key 2-3 sentence summary
<freeform>
"""


def render_gsc_table(queries: list[dict]) -> str:
    if not queries:
        return ("*No GSC impressions in the last 28 days for this page. The "
                "page is below the GSC noise floor or not yet indexed. "
                "Primary query was seeded from page metadata — see the field "
                "above. Treat the competitor URLs as the authoritative target "
                "demand for this query.*\n")
    block = "| Query | Impressions | Clicks | Avg position |\n|---|---|---|---|\n"
    for q in queries:
        block += f"| {q['query']} | {int(q['impr'])} | {int(q['clicks'])} | {float(q['pos']):.1f} |\n"
    return block


def render_competitor_urls(competitors: list[dict]) -> str:
    if not competitors:
        return "*No competitor URLs available — DDG returned no fetchable results. Search manually and add 3 URLs before proceeding.*\n"
    block = ""
    for i, c in enumerate(competitors, 1):
        block += f"{i}. **{c['domain']}** — [{c['title']}]({c['url']})\n"
        if c.get("snippet"):
            block += f"   - *DDG snippet:* {c['snippet']}\n"
    return block


def render_cannibalisation(slug: str, all_pages: list[dict]) -> str:
    cands = cannibalisation_candidates(slug, all_pages)
    block = ""
    if cands:
        block += "**Other medical posts with slug-token overlap:**\n\n"
        for n, s, toks in cands[:8]:
            block += f"- `{s}` (overlap: {', '.join(toks)})\n"
    else:
        block += "*No obvious slug-level overlap with other medical posts.*\n"
    block += "\n**Pillar pages** (write applied/local version, link out instead of duplicating):\n\n"
    for name, path in PILLARS.items():
        block += f"- {name}: `{path}`\n"
    return block


def build_brief(page: dict, all_pages: list[dict]) -> str:
    slug = page["slug"]
    queries = gsc_queries_for_page(slug)
    if queries:
        primary_query = queries[0]["query"]
        primary_source = "GSC top-impressions query (last 28 days)"
    else:
        primary_query = seed_query_from_metadata(page)
        primary_source = "Seeded from page metaTitle / h1 (no GSC data)"

    print(f"  [{slug}] primary={primary_query!r} ({primary_source})")
    competitors = fetch_competitor_urls(primary_query, n=3)
    print(f"    {len(competitors)} competitor URLs")

    return f"""# Brief: {slug}

**Site:** medical
**Source file:** `{page['path']}`
**Live URL (when indexed):** {DOMAIN}/blog/{slug}
**Generated:** {time.strftime('%Y-%m-%d')}

---

## Page snapshot (current frontmatter)

- **Title:** {page['title']}
- **metaTitle:** {page['meta_title']}
- **metaDescription:** {page['meta_description']}
- **H1:** {page['h1']}
- **Category:** {page['category']}
- **Current body word count (approx):** {page['current_word_count']}
- **Current FAQs in frontmatter:** {page['current_faq_count']}

---

## Primary query

- **Primary query:** `{primary_query}`
- **Source:** {primary_source}

### GSC queries (last 28 days)

{render_gsc_table(queries)}

---

## Competitor URLs (top 3 organic, your-own-domain and robots-blocked hosts excluded)

{render_competitor_urls(competitors)}

> Fetch each one yourself: `httpx.get(url, follow_redirects=True, timeout=30, headers={{"User-Agent": "Mozilla/5.0"}})` then `BeautifulSoup(html, "lxml")`. Decide per-page what's worth extracting: outline, FAQs, worked examples, citation density, component patterns, word count, schema. Reason over the real HTML — do not rely on regex shortcuts.

---

## Cannibalisation context

{render_cannibalisation(slug, all_pages)}

---

## Site rules and house positions

- **Universal rules:** see below.
- **House positions:** read `{HOUSE_POSITIONS_PATH}` once at the start of your session. It locks the speculative-figure framings (IR35 post-April-2024, NHS Pension AA + tapered + MPAA + Scheme Pays + McCloud, MTD-for-ITSA threshold and applicability to medical professionals, GP partner vs salaried vs locum tax framing, GP partnership goodwill).

{UNIVERSAL_RULES}

---

{WORKFLOW}

---

{POST_REWRITE_TEMPLATE}
"""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", help="Single slug to brief")
    parser.add_argument("--all", action="store_true", help="Brief all medical pages")
    parser.add_argument("--start", type=int, default=0, help="Start index for --all")
    parser.add_argument("--limit", type=int, default=None, help="Limit for --all")
    args = parser.parse_args()

    BRIEFS_DIR.mkdir(parents=True, exist_ok=True)
    pages = list_medical_pages()
    print(f"Found {len(pages)} medical posts")

    if args.slug:
        page = next((p for p in pages if p["slug"] == args.slug), None)
        if not page:
            print(f"Slug not found: {args.slug}")
            return 1
        brief = build_brief(page, pages)
        (BRIEFS_DIR / f"{args.slug}.md").write_text(brief, encoding="utf-8")
        print(f"Wrote briefs/medical/{args.slug}.md")
        return 0

    if args.all:
        slice_ = pages[args.start:]
        if args.limit:
            slice_ = slice_[: args.limit]
        for i, page in enumerate(slice_, 1):
            print(f"\n[{i}/{len(slice_)}] {page['slug']}")
            try:
                brief = build_brief(page, pages)
                (BRIEFS_DIR / f"{page['slug']}.md").write_text(brief, encoding="utf-8")
            except Exception as exc:
                print(f"  ERROR: {exc}")
                continue
            time.sleep(0.5)
        return 0

    parser.print_help()
    return 1


if __name__ == "__main__":
    sys.exit(main())
