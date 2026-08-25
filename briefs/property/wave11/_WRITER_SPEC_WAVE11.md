# Writer spec, Wave 11 (shared by all 19 writers)

You write ONE post for Property Tax Partners (UK property tax / landlord site).
Read this spec, then your assigned brief in `briefs/property/wave11/<slug>.md`
(including its Stage 2 extensions and competitor pack), then write. This wave
is landlord compliance + leasehold + commercial: the reader is a landlord or
leaseholder researching an obligation or a cost, NOT a tax nerd. The house
differentiator on nearly every pick is the accountant's layer competitors
cannot write: deductibility, capital vs revenue, company-vs-personal, SDLT/VAT
interaction. Lead useful, practical, cost-concrete; weave the tax layer in.

## Format (mirror an existing Wave 10 page EXACTLY)
Template: `Property/web/content/blog/property-company-profit-extraction-salary-vs-dividends.md`
- Frontmatter = YAML. Body = **raw HTML** (`<h2>`,`<p>`,`<ul>`,`<ol>`,`<table>`,`<strong>`,`<a href>`). NO markdown in the body, NO utility CSS classes (semantic HTML only).
- Frontmatter key order: title, slug, canonical, date ("2026-08-15"), author, category, metaTitle, metaDescription, altText, image, h1, summary, schema, faqs, dateModified, reviewedAt.
- category: exactly `Landlord Tax Essentials` (A1-A8) or `Property Types & Specialist Tax` (A9-A19) per your brief.
- metaTitle ≤ 62 chars. metaDescription ≤ 158 chars with a concrete number + reason to click.
- faqs: 10-14 entries; FAQ schema count in built HTML must equal the frontmatter array length (no body-FAQ section that double-renders, Wave 10 artefact purge lesson).
- Body words 2,800-3,500 (report BODY words in your return; total inflates ~1,000-1,500 from frontmatter).

## Six-check floor (hard gates at WRAP, write to pass first time)
0 em-dashes anywhere · 0 utility classes · FAQ parity · metaTitle ≤62 · metaDescription ≤158 · every internal link resolves to an existing page.

## Anti-sameness (the whole point of this spec)
- **Trio lanes are LAW.** A11/A12/A13 (RTM) and A17/A18/A19 (commercial EPC/MEES) each own one lane defined in their briefs. Before writing a trio page, read the other two briefs' framing sections and stay out of their lanes; link across instead of restating.
- **Openers:** never `<h2>The short answer</h2>` or "plain answer then the catch" on repeat. Open fitted to the query: the cost figure for cost pages, the legal deadline for obligation pages, the wrong-belief correction for A16.
- **Cost pages (A1, A3, A5, A6, A18, A9):** a real cost TABLE with ranges and the drivers behind the ranges, every figure source-verified or presented as a verified market range. Never invent precise prices; ranges with drivers beat fake precision.
- **Personas in worked examples:** vary (portfolio landlord, single-flat leaseholder, accidental landlord, commercial unit owner via SPV, couple with an HMO). Varied names, not always "Sarah the landlord".
- **Banned tics:** "most guides blur", "the single most common/expensive", "pays for itself", "navigating the landscape/complexities", "it's important to note". State points positively, no meta-commentary about other content.
- **CTA close:** topic-fitted, varied, no pricing, no client names, no repeated stock phrase across pages.

## LFRA 2024 guard (leasehold picks A9-A16, QA-fatal if breached)
`house_positions.md` §31.3a is the ledger. Marriage value REMAINS PAYABLE (abolition not commenced). Extensions today are +90 years, not 990. 2-year rule abolition IS in force (Jan 2025). RTM reforms IS in force (Mar 2025). Rates consultation closes 23 Sep 2026; no commencement date is knowable. £250 ground rent cap is a draft Bill. Safe formulation: "LFRA 2024 abolishes X, but that provision is not yet in force; a claim made today still pays it."

## Authority posture
Neutral information + "speak to a property tax specialist / your accountant / a solicitor" handoffs fitted to topic. Do not add firm-capability claims, named-expert claims, or service promises. Compliance topics (gas, fire, electrical) are safety-critical: state the legal duty plainly and point to qualified assessors/engineers (Gas Safe registered, qualified electrician per BS 7671), never imply we perform inspections.

## FACT VERIFICATION (mandatory, §16.35)
WebFetch-verify every statutory citation and figure against legislation.gov.uk / gov.uk / HMRC manuals at write time; cite the specific page with a real `<a href>`. Your brief's statutory anchor was verified at Stage 1; RE-verify at write. Ground truths that apply this wave (cite, do not re-derive): FA 2026 capital allowances WDA 14%, 40% FYA, special rate 6%; Section 24 reducer 20% now, 22% from Apr 2027; employer NIC 15%/£5,000. If a figure cannot be confirmed, describe the mechanic and flag it in your work log rather than inventing.

## Internal links
Per your brief's cross-link list. Every page links: (a) at least one relevant calculator under `/calculators/` if one fits, (b) its cluster siblings (the trio pages MUST link each other), (c) at least one established adjacent page (the brief names them; the six PARTIAL picks must forward-link their adjacent existing page). Wave 11 sibling URLs are `/blog/<category-slug>/<slug>`, categories are pre-registered, links resolve after merge.

## Voice (scored by scripts/voice_scan.py at WRAP; band must be clean/minor)
British English. Second person where natural ("you", "your lease"), concrete
subjects, no abstract-noun fog, no signposting ("in this section we will"),
no Americanisms, no em-dashes. Target length is the brief's depth, not padding.

## Output
Write the finished file to `Property/web/content/blog/<slug>.md`. Return SHORT:
body word count, statutes cited + verified Y/N per citation, figures flagged
unconfirmed, trio-lane confirmation (if applicable), internal links used.
