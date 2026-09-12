# P1-DATA: per-site data for the contractors-ir35 design port

Package P1-DATA. Author the category-keyed maps and registries the ported
templates consume, so phases 2 and 3 are not blocked waiting for them.

Rollout doc §4.6.8: category-keyed maps are per-site data, authored fresh for
the site's own categories and keyed on the category SLUG. Never copied from
another site.

---

## 1. Derived category list

Derived from the frontmatter of all 62 posts, not from `niche.config.json`.

```bash
cd contractors-ir35/web
ls content/blog | wc -l                                   # 62
grep -rh "^category:" content/blog | sort | uniq -c | sort -rn
```

| Category label (frontmatter) | Slug (`slugifyCategory`) | Posts |
| --- | --- | ---: |
| IR35 Status | `ir35-status` | 17 |
| Umbrella vs Limited Company | `umbrella-vs-limited-company` | 13 |
| MTD and Compliance | `mtd-and-compliance` | 9 |
| Contractor Accounting Basics | `contractor-accounting-basics` | 7 |
| Limited Company Tax | `limited-company-tax` | 6 |
| Pension and Dividends | `pension-and-dividends` | 5 |
| Expenses and Deductions | `expenses-and-deductions` | 5 |
| **Total** | | **62** |

Every post carries exactly one `category:` line and all 62 are accounted for.
There is no label-case or `and`/`&` split in this corpus: each label maps
one-to-one onto a slug.

### Corpus versus config

```bash
python -c "import json;print(json.load(open('niche.config.json'))['content_strategy']['categories'])"
```

`niche.config.json` `content_strategy.categories` claims the same seven labels,
in a different order. **Derived 7, claimed 7, agreement 7 of 7, no drift.**
The estate-wide trap where config and corpus disagree does not bite this site.
The registries are still keyed on the slug derived from the corpus, so a future
divergence fails the test rather than silently falling through to generic copy.

---

## 2. Files written

All new. No existing file was edited.

| File | What it holds |
| --- | --- |
| `contractors-ir35/web/src/lib/blog-categories.ts` | `CTA_BY_CATEGORY` + `ctaCopyForCategory()` (the blog CTA-copy map, seven categories plus a `general` fallback) and `CATEGORY_HUBS` + `categoryHub()` (per-hub heading, meta description, standfirst intro, reader intent, and the editorial `belongs` boundary) |
| `contractors-ir35/web/src/lib/page-summaries.ts` | `PAGE_SUMMARIES` + `pageSummary()`, one authored sentence per public non-article route |
| `contractors-ir35/web/src/lib/blog-categories.test.ts` | the one runnable check: every corpus category slug has CTA copy and a hub definition, the fallback resolves, and no line carries an em-dash, a pound figure or a turnaround promise |

Shape and naming follow the estate precedent rather than a new convention:
`CTA_BY_CATEGORY` / `ctaCopyForCategory` match `dentists/web/src/lib/blog/cta-copy.ts`,
`PAGE_SUMMARIES` / `pageSummary` match `generalist/web/src/lib/page-summaries.ts`.

Two departures, both deliberate:

- **One file for the CTA map and the hub definitions**, not two. Both are keyed
  on the same seven slugs and the hub CTA is the article CTA; splitting them is
  two files that must agree.
- **`src/lib/blog-categories.ts`, not `src/lib/blog/cta-copy.ts`.** This site's
  blog helpers live in `src/lib/blog.ts`, a file. Creating a `src/lib/blog/`
  directory alongside it makes `@/lib/blog` ambiguous.

Verification: `npx vitest run src/lib/blog-categories.test.ts` (4 passed),
`npx tsc --noEmit` (clean).

---

## 3. Nav-group proposal, NOT applied

`niche.config.json` is owned elsewhere this port and flat-to-grouped nav is
planned design work for the chrome phase. This is a proposal only.

### Real route list

```bash
cd contractors-ir35/web
find src/app -name "page.tsx" | sed 's|src/app||;s|/page.tsx||' | sort
```

Public routes: `/`, `/about`, `/blog`, `/blog/[category]`,
`/blog/[category]/[slug]`, `/calculators`, `/calculators/[slug]`, `/contact`,
`/cookie-policy`, `/for`, `/for/[slug]`, `/glossary`, `/glossary/[slug]`,
`/ir35-status`, `/locations`, `/locations/[slug]`, `/privacy-policy`,
`/research` plus three index pages, `/resources/[topic]`, `/services`,
`/terms`. Funnel-internal or noindex: `/book`, `/complete`, `/thank-you`,
`/embed`, `/embed/[slug]`. Not public: `/admin/*`.

Current nav is flat and five wide: Services, IR35 Status, Who we help, Blog,
Contact. It surfaces neither the ten calculators, nor the ten sector pages, nor
the glossary, nor the three research indexes, which is the gap grouping fixes.

### Proposed groups

```jsonc
"navigation": [
  { "label": "IR35", "children": [
    { "label": "IR35 status review", "href": "/ir35-status" },
    { "label": "IR35 status indicator", "href": "/calculators/ir35-status-indicator" },
    { "label": "Inside IR35 take-home", "href": "/calculators/inside-ir35-take-home-calculator" },
    { "label": "Outside IR35 take-home", "href": "/calculators/outside-ir35-take-home-calculator" },
    { "label": "IR35 guides", "href": "/blog/ir35-status" }
  ]},
  { "label": "Services", "children": [
    { "label": "What we do", "href": "/services" },
    { "label": "Who we help", "href": "/for" },
    { "label": "Where we work", "href": "/locations" },
    { "label": "About us", "href": "/about" }
  ]},
  { "label": "Calculators", "href": "/calculators" },
  { "label": "Learn", "children": [
    { "label": "All guides", "href": "/blog" },
    { "label": "Umbrella or limited", "href": "/blog/umbrella-vs-limited-company" },
    { "label": "Limited company tax", "href": "/blog/limited-company-tax" },
    { "label": "Expenses and deductions", "href": "/blog/expenses-and-deductions" },
    { "label": "Glossary", "href": "/glossary" },
    { "label": "Research", "href": "/research" }
  ]},
  { "label": "Contact", "href": "/contact" }
]
```

Reasoning, so the chrome phase can argue with it rather than guess at it:

- **IR35 is its own group, not a link.** It is the site's subject, the largest
  blog category at 17 of 62 posts, and the only named service page. It is also
  where the money tools sit. A reader arriving on the phrase "am I inside IR35"
  should find the review, the checker and the reading in one place.
- **Calculators stays a flat link.** Ten tools do not fit a dropdown usefully
  and the gallery already sorts them. The three IR35-specific ones are lifted
  into the IR35 group because that is the intent they answer, and they can
  appear in both places.
- **Learn carries three of the seven categories, not all seven.** The three
  chosen are the ones with standalone search intent. The remaining four
  (`ir35-status` sits in the IR35 group, plus `mtd-and-compliance`,
  `contractor-accounting-basics`, `pension-and-dividends`) are reachable from
  `/blog` and from every hub's own category list. A seven-item category list in
  the nav is a sitemap, not navigation.
- **Research joins Learn** rather than getting a top-level slot. Three indexes
  do not carry a group, and the citation audience arrives by link, not by nav.
- **`/resources/[topic]` is deliberately absent.** Three topics (`ir35`,
  `pay-planning`, `structure`), and they are conversion assets reached from the
  pages that earn them, not a destination.
- **Footer keeps the flat list** including the three policy pages. No change
  proposed there.

---

## 4. Constraints observed

No em-dashes. No claim to a qualification, a regulator, professional indemnity
insurance or regulated work. No turnaround or response-time promise. No
published price for our own services. No client counts, no invented clients, no
testimonials. First-person "we do the work" voice retained per the owner's
positioning ruling of 2026-09-12, matched to the voice of `/terms`.

**No published figure appears anywhere in this copy.** `house_positions.md` was
read and then deliberately not drawn on: copy carrying no figure cannot go stale
against a rate change, and the brief prefers no figure over a sourced one. If a
later phase adds a figure to any of these strings it must carry a `§N` citation
from `docs/contractors-ir35/house_positions.md`.
