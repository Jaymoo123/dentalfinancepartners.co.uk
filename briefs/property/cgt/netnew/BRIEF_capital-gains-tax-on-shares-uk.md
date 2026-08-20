# Net-new brief: capital-gains-tax-on-shares-uk

Cluster source: CGT dossier (`briefs/property/cgt/DOSSIER.md`), clusters "how much capital
gains tax on shares" + "capital gains tax on stocks" (owner approved the shares family
2026-08-20 despite it being off the property vertical; taxd is the only specialist ranking).
The shares CALCULATOR intent went to /calculators/capital-gains-tax-calculator, which now has
a shares mode; this page owns the prose intent.

## Subject (the H1 IS the question)
Capital gains tax on shares in the UK. Direct answer: gains on shares outside an ISA or
pension are taxed at 18%/24% above the 3,000 GBP allowance, same rates as property since
30 October 2024, but reported through Self Assessment rather than the 60-day property return.
Audience bridge (stay on-brand): landlords and property investors who also hold shares, sell
shares to fund a deposit, or compare holding property vs equities.

## Target keywords
Full set with volumes: `briefs/property/cgt/_newpage_keywords.txt` section
`capital-gains-tax-on-shares-uk`. Heads: "capital gains tax on shares" (2,900 family:
"capital gains tax shares", "cgt and shares", "cgt on shares", "capital gains from shares",
"capital gains tax and shares"), "capital gains tax on stocks" (2,380 family), "how much
capital gains tax on shares" (840 family). Also place naturally: shares calculator phrasings
as links TO the calculator, not as this page's subject.

## Winning competitor shape (torn down 2026-08-20)
- taxd `blog/capital-gains-tax-shares/`: 1,703 words, 13 headings, question-led, covers
  rates, allowance, share matching, ISA/pension exemption, reporting.
Shape ours as the landlord-and-investor version: same direct answers plus the property
comparisons nobody else does (shares vs property CGT side-by-side table, funding a deposit
by selling shares, AEA shared across asset classes).

## Facts (verify against `docs/property/house_positions.md` section 5 + gov.uk; decline
anything you cannot verify)
- Since 30 October 2024: shares and other assets taxed at 18%/24% (same as residential).
- AEA 3,000 GBP for 2026/27, shared across ALL gains (property + shares combined).
- Shares in ISAs and pensions: exempt.
- Reporting: Self Assessment (or HMRC real-time CGT service); NOT the 60-day property return.
- Share matching rules exist (same-day, then 30-day, then s.104 pool) - explain plainly with
  a small example; a sibling page /blog/capital-gains-tax/bed-and-breakfasting covers the
  30-day rule in depth (link, do not restate).
- Spouse transfers: no gain no loss - same as property.
- EIS/SEIS deferral and BADR on shares: one honest paragraph each, forward-link
  /blog/capital-gains-tax/cgt-deferral-strategies-property-investors-uk and
  /blog/capital-gains-tax/business-asset-disposal-relief-residential-property-qualification.
- Employee shares / SAYE: mention the trap in one FAQ at most; not the subject.

## Cannibalisation guards (link, never restate)
- /calculators/capital-gains-tax-calculator (shares mode - link prominently, it is the tool)
- /blog/capital-gains-tax/bed-and-breakfasting (30-day rule depth)
- /blog/capital-gains-tax/capital-gains-tax-property-complete-guide-uk (property side)
- /blog/capital-gains-tax/cgt-annual-exempt-amount-3000-allowance-2026-27 (AEA depth)

## Standards (six-check floor, netnew engine)
Body 2,800-3,500 words, raw HTML after frontmatter, 10-14 FAQs, metaTitle <= 62 chars,
metaDescription <= 158 chars, 0 em-dashes, all internal links resolve, frontmatter shape copied
from `business-asset-disposal-relief-residential-property-qualification.md` (all fields
double-quoted, generator: "opus/netnew-cgt-cluster", category: "Capital Gains Tax",
canonical https://www.propertytaxpartners.co.uk/blog/capital-gains-tax/<slug>).
Language spec: DOSSIER.md section 6 (question-form H2s, answer-first, second person 25+/1k,
statute late and sparing, one current year 2026/27).
