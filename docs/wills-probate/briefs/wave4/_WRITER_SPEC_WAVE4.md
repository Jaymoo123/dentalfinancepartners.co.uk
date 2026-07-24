# Writer spec — Wave 4 (shared by all 92 writers)

You write ONE post for a UK wills/probate/estate-planning site. Read this spec, then your assigned brief, then the format template, then write. Your launch prompt gives: slug, brief path, output path, DEPTH (light|medium), category, assigned calculator, and a verbatim image block.

## Format (mirror the template EXACTLY)
Template: `wills-probate/web/content/blog/rnrb-taper-pension-inheritance-tax.md`
- Frontmatter = YAML. Body = **raw HTML** (`<h2>`,`<p>`,`<ul>`,`<ol>`,`<table>`,`<strong>`,`<em>`,`<a href>`). NO markdown in the body.
- Frontmatter key order: title, slug, date ("2026-07-24"), updatedDate ("2026-07-24"), author ("Editorial Team"), image, altText, imageCredit{photographer,photographerUrl,source,sourceUrl}, category, metaTitle, metaDescription, h1, summary, keyTakeaways, sourcesVerifiedAt ("2026-07-24"), faqs, generator ("claude-fable-5 | manual | 2026-07-24").
- Use your assigned `category` and `slug` exactly. metaTitle ≤ 60 chars. metaDescription 140-160 chars with a concrete number + reason to click.

## DEPTH
- **medium**: 1,300-1,800 words. Full treatment, a worked example with real figures where the topic supports it, 5-6 keyTakeaways, 5-6 FAQs, a table where it helps.
- **light**: 750-1,100 words. Answer-box first: open by directly answering the query, then the essential detail only. 4-5 keyTakeaways, 3-4 FAQs. Explicitly link out to the fuller sibling page named in your brief ("for the full guide, see …"). Do not pad a light topic to medium length.

## Anti-sameness (baked in — these are the tics from earlier waves, do NOT reproduce)
- **Opener: do NOT use `<h2>The short answer</h2>`.** Open with something fitted to the topic: the direct answer under a topic-specific H2, a worked figure, the key date, the common mistake, or a question. Vary the rhythm; do not always do "plain answer then the catch".
- **Closing CTA: do NOT use the phrase "an initial conversation costs nothing" or "a vetted specialist who deals with [X] every week" or "settles in half an hour".** Write a fresh, topic-specific handoff (a probate/estate-planning specialist can help; framed to your topic). Vary it.
- **Avoid these stale tics**: "most guides blur / competitors skip / search results constantly blur", "the single most [common/expensive]", "pays for itself / earns its keep", "regulated territory" (use at most once). State points positively.
- **Personas**: vary worked-example people. NOT always "a widow/widower leaving £X to a daughter". Use couples, single professionals, siblings, blended families, business partners, adult children. Give them varied names.
- **Disclaimer**: include "general information, not legal or financial advice" in the intro, but phrase the wrapper in your own words (do not copy the template's parenthetical verbatim).
- No em-dashes anywhere (title, meta, body, FAQs). Commas, parentheses, full stops, or a middle dot only. A single em-dash fails QA.

## Faceless authority (YMYL)
Owner is NOT a solicitor. No named-expert claims, no "our solicitors", no regulated-activity language. Neutral information + a "speak to a specialist" handoff. Anything touching pensions/investments/equity release is FCA-adviser territory.

## FACT VERIFICATION (mandatory)
Verify every numeric/legal claim against gov.uk / HMRC / gov.scot before stating it; cite the specific page with a real `<a href>` (not a homepage). If you cannot confirm a figure, describe the mechanic and flag it rather than inventing one.
Known current facts (still cite): NRB £325,000 frozen to April 2030; RNRB up to £175,000 tapering £1/£2 over £2,000,000; IHT 40% (36% if ≥10% of baseline to charity); BR/APR from 6 April 2026 = £2.5m combined 100%-relief cap (raised from £1m on 23 Dec 2025), 50% above; pensions into IHT from 6 April 2027. IHT205 abolished for deaths on/after 1 Jan 2022 (excepted-estate values go on PA1P/PA1A). Probate application fee: VERIFY the current England & Wales fee on gov.uk (a fee change took effect in 2026 — do not state a fee without checking); estates under £5,000 pay no fee; extra sealed copies £1.50 each (verify).

### Topic guards (apply if your brief is flagged)
- **Contentious/disputes topics** (contest a will, Inheritance Act 1975, undue influence, fraud/forgery, proprietary estoppel, caveats, success-rate, right to organise a funeral, deathbed marriage, mental capacity): **INFORMATIONAL ONLY.** Explain what the route is and how it works in general; do NOT give "how to win" strategy or advise a course of action. Point disputes to a contentious-probate solicitor.
- **success-rate-of-contesting-a-will-uk**: do not state a specific success-% as fact from a single source; present any figure as directional/illustrative or omit it.
- **remote-and-video-witnessing-of-wills**: the temporary video-witnessing rule (2020 Order) applied to wills made 31 Jan 2020 – 31 Jan 2024 and has **EXPIRED**. Do not present video witnessing as currently available; verify current gov.uk guidance and state the expiry clearly.
- **probate-and-inheritance-advance-loans**: factual only; explain how these products work and their costs/risks in general; NO lender names or recommendations; note it is a regulated-credit decision.
- **Scotland topics**: flag clearly "this covers Scotland; see the England & Wales equivalent for the rest of the UK". Scotland uses confirmation, not probate; legal rights (legitim) not RNRB mechanics.

## Internal links
Use your brief's "Suggested Internal Links" whitelist + the cluster interlink map in `_INDEX.md`. Every post links to: (a) its assigned calculator `/calculators/<slug>`, (b) at least one pillar (`/wills`, `/probate`, `/inheritance-tax`, or `/lasting-power-of-attorney`), (c) at least one sibling/published post in its cluster. Light posts link UP to their cluster hub. Close with a topic-fitted specialist handoff (no pricing, no client names).

## Image
Use the EXACT image/altText/imageCredit block from your launch prompt, verbatim (plain `&` in the URL, not `&amp;`). Do not choose your own image.

## Output
Write the finished file to the given path. Return a SHORT message: depth, word count, gov.uk URLs cited, any figure flagged unconfirmed, and (if a guarded topic) confirm how you handled the guard. Do not return the post body.
