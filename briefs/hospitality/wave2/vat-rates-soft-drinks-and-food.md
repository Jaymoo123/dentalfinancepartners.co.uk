---
slug: vat-rates-soft-drinks-and-food
tier: blog
category: "Hospitality VAT"
route: /blog/hospitality-vat/vat-rates-soft-drinks-and-food
intent: DIY-INFORMATIONAL feeding the food/drink VAT checker + the VAT service. Product-VAT-rate reference (soft drinks, confectionery, snacks, mixed supplies) that the existing takeaway post does not cover in depth. Pre-hire research moment.
---
# Blog: VAT on soft drinks and food, the rate for every item on a hospitality menu

> Wave-2 asset. Body references "the business" / "operators". CTA/brand from config. No em-dashes. Faceless. Raw-HTML body.

## Target queries (evidence: CALCULATORS.md ranked set + LAUNCH_CORE food-VAT cluster; Google Ads UK + Labs 2026-07-11)

- Primary: "vat on soft drinks" / "food vat" / "vat for food" / "vat on foodstuffs" (~390/mo + 1,000 ranked-set family, product-rate intent)
- Secondary: "is there vat on soft drinks", "vat on fizzy drinks", "vat on juice", "vat on confectionery", "vat rate on chocolate", "vat on crisps", "vat on ice cream", "vat on bottled water"
- Intent: DIY-INFORMATIONAL (product-VAT-rate lookup). Feeds the food & drink VAT checker (the tool's conversion path) and routes the operator with a real classification problem to `/services/hospitality-vat`. This is the PRODUCT-category angle, distinct from the temperature/eat-in angle the takeaway post owns.

## Asset type + play

Answer-first product-VAT reference post built around the four zero-rating carve-outs (HP 3) and the eat-in override (HP 2), extending the checker into a citable article. The wedge: the site's existing `vat-on-takeaway-food` post owns the hot/cold + eat-in/takeaway decision; this post owns the PRODUCT-classification question ("is this specific item standard or zero-rated") that operators ask when pricing a menu or bottling a drinks list. Drinks are the anchor because soft drinks are the single most-missed carve-out (an operator assumes drinks follow food, then finds all soft drinks are standard-rated). Every product verdict must carry the checker embed / link so the reader can self-serve, and the "check your whole menu" CTA into the VAT service.

## Dedup evidence (MANDATORY)

- **Own site — `vat-on-takeaway-food` (Hospitality VAT)**: that post owns the hot-vs-cold and eat-in-vs-takeaway TEMPERATURE/PREMISES decision (HP 1, 2) and the five hot tests. THIS post owns the PRODUCT carve-out classification (HP 3): soft drinks, confectionery, crisps/savoury snacks, ice cream, plus zero-rated staples, and mixed/linked supplies. Overlap is deliberately minimal: this post references the temperature rule in one paragraph and LINKS the takeaway post rather than re-explaining it. Documented wedge = product-category vs temperature/premises.
- **Generalist site**: the restaurant post has a "VAT on food and drink" H2 but at generic depth (hot vs cold, one paragraph). No product-by-product carve-out table, no soft-drinks focus, no checker. No collision.
- **Own `/services/hospitality-vat`** covers the service/FRS/threshold angle; this post is DIY reference that funnels into it. Distinct.

## Required structure (H2 skeleton)

Open with a 40-60w BLUF: most food for human consumption is zero-rated, but four categories are always standard-rated even cold and taken away · confectionery, crisps and savoury snacks, soft drinks, and alcohol · ice cream is also standard-rated · and anything eaten on the premises is standard-rated regardless of type. Use the checker to confirm any single item.

1. The 40-60 word answer (BLUF)
2. The default: most food is zero-rated (HP 3) · what "food for human consumption" covers
3. The four standing carve-outs, always standard-rated (confectionery, crisps and savoury snacks, soft drinks, alcohol) · HP 3 · plus ice cream
4. Soft drinks in detail (carbonated drinks, cordials and squashes standard-rated; the plain-milk / unflavoured-dairy exception; bottled water) · link the checker
5. The eat-in override (HP 2): a cold, zero-rated item becomes standard-rated the moment it is consumed on the premises · link `vat-on-takeaway-food` for the full temperature logic
6. Product-VAT reference table (rows below), each row mapped to a carve-out or the default
7. Mixed and linked supplies (a meal deal with a drink, a hamper, a bundled item) · describe the apportionment principle qualitatively, flag detail as a check-with-us point
8. Getting the rate wrong: what a misclassified drinks list costs on a VAT return
9. Check your menu (embed / link the food & drink VAT checker) + route to the VAT service
10. FAQ
11. Next step CTA

Reference-table rows (item → rate → deciding test): cold sandwich/salad takeaway → 0% (zero-rated food, HP 1); same eaten in → 20% (catering, HP 2); confectionery/chocolate/cereal bar → 20% (carve-out, HP 3); crisps and salted nuts → 20% (carve-out); soft drink / cordial / squash → 20% (carve-out); bottled water → 20%; plain milk / unflavoured dairy → 0% (state as "may be zero-rated, check 701/14" per the tool's own caveat); ice cream / lollies → 20%; alcohol → 20% always (HP 3); hot takeaway food → 20% (HP 1); most cold zero-rated staples (bread, cakes not confectionery) → 0%.

## Figures mapped to HP / ledger

- HP 1: hot takeaway standard-rated; most cold takeaway zero-rated; five hot tests. https://www.gov.uk/guidance/catering-takeaway-food-and-vat-notice-7091
- HP 2: on-premises consumption always standard-rated (catering). same URL.
- HP 3: four carve-outs (confectionery, crisps/savoury snacks, soft drinks, alcohol) always standard-rated; ice cream standard-rated; most other food zero-rated. https://www.gov.uk/guidance/food-products-and-vat-notice-70114
- VAT standard rate 20% (ledger `vat_standard_rate`). Same Notice 701/14 URL for product classification.

**HP GAPS (do NOT invent — flag/omit):**
- Cakes-vs-biscuits, Jaffa-cake-style borderline classifications, and the precise plain-milk/flavoured-milk line are NOT locked positions. Describe the principle, link Notice 701/14 live, and route borderline items to the checker / the VAT service. Do NOT assert a specific verdict on a borderline item from memory.
- Mixed/linked-supply apportionment mechanics are not a locked HP. State the principle (apportion between standard and zero elements) and flag as a check-with-us point; do not give a worked apportionment formula as authoritative.
- The 2021-22 temporary reduced hospitality VAT rate is history and NOT an HP — do not mention a live reduced rate.

## Internal links (all BUILT)

`/calculators/food-drink-vat-rate-checker` (primary CTA, embed if page convention allows), `/blog/hospitality-vat/vat-on-takeaway-food` (temperature/premises companion), `/services/hospitality-vat` (the hire path), `/for/cafes-and-coffee-shops`, `/for/takeaways`, `/for/pubs-and-bars` (drinks/wet-led).

## FAQ candidates (questions only)

- Is there VAT on soft drinks? (answer: yes, always standard-rated; HP 3)
- Do I charge VAT on bottled water?
- Is all food zero-rated?
- Why is a chocolate bar standard-rated but a cake zero-rated?
- Is there VAT on a milkshake or flavoured milk? (flag borderline; route to 701/14/checker)
- Does a cold drink become zero-rated if taken away? (answer: no, soft drinks are an excepted item; HP 3)
- Is there VAT on ice cream? (answer: yes; HP 3)
- What VAT applies to a meal deal with a drink? (mixed supply, apportion; flag)

## Meta

- metaTitle (<=60): `VAT on Soft Drinks and Food: The Rate for Every Menu Item`
- metaDescription (<=155): `Which food and drinks are zero-rated and which are always 20%? Soft drinks, confectionery, snacks and ice cream explained, with a free VAT checker.`

## Hallucination danger zones

- Never reduce to "cold food is zero-rated" — carry the four carve-outs (HP 3) and the eat-in override (HP 2). Soft drinks are ALWAYS standard-rated.
- Alcohol always standard-rated (HP 3), no exception.
- Do NOT assert a borderline verdict (Jaffa cake, flavoured milk, specific snack) from memory — route to Notice 701/14 / the checker.
- No mixed-supply apportionment formula presented as authoritative (HP GAP).
- 20% is the standard rate (ledger); no live reduced hospitality rate.
- No fee figures.
