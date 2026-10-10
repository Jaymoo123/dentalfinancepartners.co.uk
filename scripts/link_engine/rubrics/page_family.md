# Rubric: page -> money-page assignment (stage 10)

Binding for every agent that judges a row of `stages/10_assign_queue.csv`. Read
`sites/<site>_rulings.md` (LE-n) and the site's blueprint rulings first; they win
over this file where they are stricter. Judgments are written by Opus (two
independent readers; a manager settles disagreements). Never Sonnet.

## The question

For the page in this row, which money page is a reader of THIS page most likely
to need next, if they decide they would rather have someone do it for them?
Pick one `primary_dest`. That page becomes the page's one body link in stage 13
(one link per source page per destination).

You are choosing a destination, not writing a sentence and not rewriting the
page. Do not judge the page's quality.

## What you are given (per row)

`source`, `title`, `h1`, `category`, `excerpt_path` (title, h1 and the first 300
words of the page's main text: read it), the page's own Search Console
impressions and leads, the top three destinations by each deterministic signal
(`s1_cand*`: the page's own queries mapped to ranked families; `s2_cand*`: topical
similarity; `s3`: the category prior), why the auto rule did not settle it
(`reason_queued`), the `frozen` and `give_up` flags and `input_sha256`.
The signals are evidence, not instructions. S3 is a manager default and only a
prior; S2 is a bag-of-words score that favours pages with long keyword lists.
Open the excerpt and decide from what the page is about.

## The destinations

Only the destinations in `10_assignments.csv` (owner pages of ranked money
families, listed in `06_owner_rollup.csv`) are valid: the four `/services/`
pages, the `/for/` pages, `/locations/<city>`, pillars that own a family (for
example `/landed-estates`), and the two guides that own a money family (the
how-to transfer guide, the second-home guide). Anything else is refused.

## How to choose

1. **Hire intent only.** Choose where a reader who wants help would go, never
   where a reader who wants an explanation would go. A guide that only explains
   (a rate table, a form walkthrough) still gets a sales destination for the
   moment the reader's own case turns complicated.
2. **Match the reader's situation first, the category second.** The excerpt
   decides. A "Property Finance" post about bridging loans for a landlord who is
   incorporating belongs to `/for/moving-property-into-a-limited-company`,
   whatever the category default says.
3. **Respect the owner of the phrase (blueprint R2).** `/services/property-accountant`
   owns the "property accountant" family, `/services/landlord-accountant` the
   landlord and buy-to-let forms, `/services/property-tax-advice` the advice,
   adviser, specialist and planning forms. A page about what an accountant does
   or costs goes to `/services/property-accountant`; a page about landlord
   self assessment or record keeping to `/services/landlord-accountant`; a page
   about reliefs, rates and planning to `/services/property-tax-advice`, unless
   a `/for/` page matches the reader's situation more exactly (rule 2).
4. **City forms stay with the city (R4, R18).** A post about a city with a
   `/locations/<city>` page goes to that page. A non-resident landlord's page
   goes to `/services/non-resident-landlord` (R18 exception, LE-7), including
   non-resident disposal forms.
5. **Audience pages beat generic service pages when the situation is specific**
   (selling a buy-to-let, moving property into a company, gifting, inheriting,
   HMO, holiday let, SPV set-up, retirement and succession, MTD and self
   assessment, letting agents, rental income disclosure). Apply the rulings:
   LE-9 and LE-14 (incorporation hire wording to the sales page, transfer
   how-to wording to the how-to guide), LE-10 (selling a buy-to-let), LE-12
   (second home sale: the guide owns the family and links to
   `/for/selling-a-buy-to-let`), LE-3 (an inherited LET property or an estate
   planning case goes to the `/for/` or pillar page).
6. **A guide is a destination only when the source is about the same subject.**
   The how-to transfer guide and the second-home guide may be a primary only for
   a source whose reader is doing that exact task, and such a link is explainer
   wording, never hire wording (a guide never receives hire wording).
7. **Never the page itself, never a sitewide page** (home, contact, book,
   about, services index, blog hubs).
8. **Give-up and frozen pages (`give_up`, `frozen` true):** still choose the
   destination (the proposal is listed for owner sign-off, nothing is edited).
   For give-up pages follow the blueprint section 4 row if it names the owner.
9. **Secondary.** Optional. Name a `secondary_dest` only when the page genuinely
   covers a second subject (a CGT page that also covers the company route). Leave
   it null otherwise; the budget step adds secondary links by fit and value.
10. **"none" is a valid answer, and the elegant one when it fits.** If a reader
    of this page has no natural reason to hire us at any point (a fire risk
    assessment price list, pet rights under the Renters' Rights Act, payroll RTI
    rules for an unrelated employer, CGT on shares, a homeowner part-exchange),
    set `primary_dest` to `"none"`. A forced sales link is worse than no link
    (owner standard: "not just shoved in their faces"). The page still receives
    links and may still link to guides; it simply gets no money-page link.
11. **Pick the most specific matching page, not the category default.** Company
    profit questions (salary vs dividends, extracting cash, director's loans,
    pre-sale cash strips) go to `/for/property-company-profit-extraction`;
    income-splitting and settlements-legislation questions for couples to
    `/for/couples-splitting-rental-income`; partnership incorporation to
    `/for/portfolio-landlords-incorporating-a-partnership`; first-time or
    accidental landlords to `/for/first-time-and-accidental-landlords`. The
    manager audit of the category-only auto rule found about half of its picks
    were a generic default where a specific page fitted better.
12. **When you are not sure, say so.** `confidence` is `high` (one destination is
    clearly right), `medium` (two plausible, one is better), `low` (a coin
    toss). A lone `low` is not applied: a second reader is required.

## Output schema (one JSON object per line, file `judgments/assign_<reader>.jsonl`)

```
{"source": "/blog/...", "primary_dest": "/for/..." | "none", "secondary_dest": "/services/..." | null,
 "confidence": "high" | "medium" | "low", "reason": "one line: what this reader needs and why that page",
 "input_sha256": "copied from the queue row", "reader": "reader1" | "reader2" | "manager"}
```

`reason` for a manager verdict that sets precedent starts with `LE-n` and the
rule is added to `property_rulings.md`. `input_sha256` must be copied exactly;
it is the sha256 of the source file, so a verdict stays valid until the page is
edited. `python scripts/link_engine/assign.py --site S --run R --apply-judgments`
merges them: two readers agreeing on `primary_dest` apply at the lower
confidence, a disagreement goes to `stages/10_assign_disagreements.csv`, a
manager verdict is final, a stale sha is listed in `stages/10_assign_rejudge.csv`.
