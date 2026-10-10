# Rubric: choosing the guide that owns a decision search (ruling LE-19)

Binding for every agent judging a row of `stages/06_le19_queue.csv`. Read
`sites/<site>_rulings.md` (LE-1 to LE-22) and `BEST_PRACTICE_CHECK.md` first.
Judged by Opus; low-confidence rows get a second blind reader; the manager
settles disagreements.

## The question

Google's live top 10 for this search family is mostly guides, but our owner is a
sales page. Under LE-19 a guide should own the search (rank for it) and hand
ready-to-hire readers to the sales page, which stays the **conversion page**.
Which of our existing guides should own it?

## How to choose

1. **Match what the searcher wants to learn.** Open each candidate's excerpt (and
   the source file if needed). The owner must answer the family's main question
   directly and fully: the guide a searcher would be glad to land on. Topic
   adjacency is not enough ("gifting to a company" does not own "gifting to
   children").
2. **Evidence beats theory.** Prefer a guide Google already shows for these
   searches (impressions, position) and one that already brings leads, when it
   genuinely answers the question. A guide with zero impressions can still win
   if it is clearly the best match.
3. **One guide per family**, and avoid making one guide own families with
   different questions unless it genuinely covers both (it would need a heading
   per question).
4. **Respect rulings.** LE-14: transfer wording is owned by the how-to transfer
   guide. LE-12: second-home sale by the second-home guide. LE-13: home sale and
   property sale stay separate. LE-20: landlord tax advice by `/landlord-tax`.
   Topic pillars may own a search (LE-16 says they are not link destinations,
   which is a different question).
5. **When to keep the sales page.** If Google's top 10 is genuinely mixed (a
   third or more service pages) and the family's wording is hire-flavoured,
   answer `keep_sales_page`.
6. **When no guide fits.** If none of our guides answers the question well,
   answer `gap_guide_needed` with a one-line brief. Do not force a weak guide.
7. **Never a noindexed or redirected page**, never a sales page as the guide.

## Output (one JSON object per line, `judgments/le19_<reader>.jsonl`)

```
{"family_id", "decision": "guide_owner" | "keep_sales_page" | "gap_guide_needed",
 "owner_page": "/blog/..." | null, "conversion_page": "<the current sales owner>",
 "gap_brief": null | "...", "confidence": "high" | "medium" | "low",
 "reason": "one line", "input_sha256": "copied from the queue row", "reader": "reader1" | "reader2" | "manager"}
```
