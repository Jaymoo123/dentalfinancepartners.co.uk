"""Brief scaffold assembly for the core-page engine.

This does NOT call any LLM. It assembles a self-contained scaffold (site rules +
core-page overrides + TSX-edit workflow + the analysis pack) that the Opus 4.8
subagent reads to WRITE the final brief (`index.md`). It imports the rule
CONSTANTS from competitor.brief_for_opus only (never its DeepSeek functions).
"""
from __future__ import annotations

from optimisation_engine.competitor.brief_for_opus import SITE_RULES, UNIVERSAL_RULES


CORE_PAGE_RULES = """
## Core-page overrides (this is a COMMERCIAL LANDING PAGE in TSX, not a blog)

The UNIVERSAL_RULES above were written for markdown blog posts. For a core page,
these OVERRIDES apply:

- **The page is a TSX server component, not markdown.** Tailwind utility classes
  DO work here (Tailwind scans `src/**`). Ignore the "Tailwind doesn't work in
  markdown" rule for this file.
- **FAQs live in the `faqs` array inside the TSX** (not frontmatter). That array
  feeds `buildFaqPageJsonLd`, so editing it updates the FAQPage schema
  automatically. Do not hand-write FAQ JSON-LD.
- **Schema is added via the existing TS builders**, linked to the one
  `#organization` `@id` graph:
  - `buildOrganizationJsonLd` + `buildFaqPageJsonLd` (already present, keep).
  - `buildLocalBusinessJsonLd` from `@accounting-network/web-shared/lib/local-business-schema`
    (already used by `src/app/locations/[slug]/page.tsx`) — add a national
    `areaServed: GB` instance on the homepage.
  - `Service` schema with `provider` = the existing `#organization` node.
  - `buildBreadcrumbJsonLd` from `src/lib/schema.ts`.
  - `AggregateRating`/`Review` ONLY if there are genuine reviews — never fabricate.
- **Keep the existing visual design.** This pass is SEO content + structure +
  schema only. Do not redesign the hero or components.
- **This page targets the NATIONAL head family.** Local/geo intent funnels DOWN
  to `/locations/*` — do not duplicate `term + city` content here, and do not
  de-optimise the location pages (they already rank locally).
- **Cannibalisation fix:** the analysis pack names the blog/location pages that
  currently catch the head terms. From those catcher pages, add an exact-match
  internal link UP to the core page; soften their over-commercial titles toward
  their long-tail intent. Keep these edits conservative and reversible.
"""

TSX_WORKFLOW = """
## TSX workflow (do in order)

1. **Read the source file** (`source_tsx` below) AND fetch the live URL to see
   the rendered HTML before editing.
2. **Rewrite the `metadata` object**: `title` leads with the head token
   (<=60 chars), `description` natural + keyword-bearing.
3. **Rewrite the `<h1>`**: keyword-bearing (use one of the H1 options you
   produce); demote the current slogan to a sub-headline `<p>`.
4. **Add a keyword-rich intro paragraph** under the hero, and an
   "Areas we serve" section linking to `/locations`.
5. **Grow the `faqs` array** to 8-10, targeting the zero-click head queries in
   the analysis pack.
6. **Add the schema `<script>` nodes** via the existing builders (LocalBusiness,
   Service, Breadcrumb), all on the `#organization` graph.
7. **Apply the conservative cannibalisation link-ups** on the catcher pages the
   pack names.
8. **Verify:** `cd <web_root> && npm run build`; re-extract the page and confirm
   schema set; no em-dashes; no fabricated ratings; FAQs count matches.

## Acceptance criteria
- Title leads with a head token; H1 contains a head keyword (no longer a slogan).
- FAQs grown to 8-10; FAQPage schema count matches the array.
- Schema set includes Organization, LocalBusiness/AccountingService, Service,
  FAQPage, BreadcrumbList — one `#organization` graph.
- No em-dashes; no fabricated reviews/ratings.
- `npm run build` passes; calculators stay lazy-loaded (no CWV regression).
- Conservative link-ups applied to the named catcher pages; location pages
  untouched.
"""


def _property_rules_block(cfg: dict) -> str:
    r = SITE_RULES.get(cfg["site_key"], {})
    lines = ["## Site rules (from SITE_RULES)"]
    lines.append(f"- **Domain:** {r.get('domain', '')}")
    lines.append(f"- **Web root (build here):** `{r.get('web_root', '')}`")
    lines.append(f"- **Audience:** {r.get('audience', '')}")
    lines.append(f"- **Lead-form segments:** {r.get('lead_form_segments', [])}")
    if r.get("pillar_pages"):
        lines.append("- **Pillar pages to link to:**")
        for name, path in r["pillar_pages"].items():
            lines.append(f"  - {name}: `{path}`")
    if r.get("authority_links"):
        lines.append("- **Authority links to favour:**")
        for name, url in r["authority_links"]:
            lines.append(f"  - [{name}]({url})")
    return "\n".join(lines)


def build_scaffold(cfg: dict, pack: dict) -> str:
    """Assemble the full scaffold text the Opus subagent will reason over."""
    parts: list[str] = []
    parts.append(f"# BRIEF SCAFFOLD — optimise the {cfg['site_key']} {cfg['page_key']} for its head-keyword family")
    parts.append("")
    parts.append("You are an Opus 4.8 subagent. Using the analysis pack and rules below, "
                 "write a self-contained implementation brief to `index.md` in this folder. "
                 "Reason about the cannibalisation diagnosis; do not just restate the data. "
                 "Produce: a title/meta formula, 3 H1 options, the recommended on-page "
                 "sections + entity coverage, the schema additions, the internal-linking / "
                 "cannibalisation actions (naming the exact catcher pages), the geo angle, "
                 "trust additions, and risks.")
    parts.append("")
    parts.append(f"- **Page:** {cfg['page_url']}")
    parts.append(f"- **Source file (hand-edit this):** `{cfg['source_tsx']}`")
    parts.append("")
    parts.append(_property_rules_block(cfg))
    parts.append("")
    parts.append(UNIVERSAL_RULES)
    parts.append(CORE_PAGE_RULES)
    parts.append(TSX_WORKFLOW)
    parts.append("")
    parts.append("---")
    parts.append("")
    parts.append(pack["readable_md"])
    return "\n".join(parts)
