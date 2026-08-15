# Legal pack: partner-network data sharing

Controller-to-controller data-sharing pack for **Ashfield Trading Limited** (company number 16358723), which operates a portfolio of specialist enquiry websites and supplies enquiries to a network of partner firms trading as the **Ashfield Partner Network**. British English, law of **England and Wales**. **Not legal advice** - have a qualified solicitor and a data protection specialist review before signing or first delivery.

## How this is structured (read this first)

There are **two layers and two ways to send them**.

The **data protection layer** is `DSA_TEMPLATE.md`: firm-agnostic, never redrafted per prospect, and the single place the data protection wording exists. The **commercial layer** is `PARTNER_AGREEMENT_TEMPLATE.md` plus a Schedule 1 generated from `config/tiers.json` and `config/standard_terms.md`.

`build_agreement.py` assembles the two into **one combined document** that a firm signs once. It lifts the DSA in verbatim rather than copying it, so the data protection layer physically cannot fork between the standalone document and the combined one. `test_build_agreement.py` proves that on every build.

Send the combined agreement by default. Send the standalone DSA where a firm, or its solicitor, wants to review the data protection layer on its own.

| File | What it is |
|---|---|
| **PARTNER_AGREEMENT_TEMPLATE.md** | The commercial layer, clauses 1 to 21 (version 14 August 2026). Firm-agnostic. Carries three markers that `build_agreement.py` fills. **Never paste prices, caps or the DSA into this file by hand.** |
| **DSA_TEMPLATE.md** | The single standing Data Sharing Agreement (version 14 August 2026). Data protection only. Also the source of Schedule 2 and Annexes A and B of the combined agreement, extracted between its `dsa:` and `dsaannex:` markers. Keep those markers in place. |
| **Legitimate_Interests_Assessment.md** | Standing, firm-agnostic LIA (**complete reassessment, 14 August 2026**, review 14 August 2027). Assesses the pool model as it actually runs. Its conclusion is expressly conditional: see "The conditions the LIA imposes" below. |
| **build_agreement.py** | Assembles the combined agreement into `out/`. Run this first. |
| **test_build_agreement.py** | Self-check: prices trace to config, caps match the engine, Schedule 2 reproduces the DSA verbatim and repeats none of the commercial clauses, no placeholders, no retired model wording, and the result is fit to send. Run after any change to either template. |
| **build_pdf.py** | Renders any `.md` to a clean black-text A4 PDF (reportlab). |
| **docprep.py** | The house rules for anything that leaves this repo: no em-dashes, horizontal rules, bold, HTML comments, internal file paths, bracket placeholders or duplicated sentences. Both builders clean the source through it and refuse to write a file that still breaks a rule. |
| **build_signing_docx.py** | Renders a `.md` to a `.docx` for recipients who prefer to type into a document. Defaults now point at the built combined agreement. |
| **_archive/** | Superseded instances and historical drafts (DJH pack, Haines Watts pack, the old combined agreement, stale rendered PDFs). See `_archive/README.md`. Never delete executed contracts. |
| **out/** | Build output. Regenerate rather than edit. |

## The operating model the pack reflects

Owner-locked 12 to 14 August 2026. Recorded here because every document in the pack depends on it.

- Enquiries come from the whole website portfolio, not one site. Each site collects under the estate-standard on-site notice in Annex B of the DSA: recipients disclosed as a **category**, never named on-site, but with the number of firms disclosed.
- A verified enquiry is graded by case type under `docs/CLASSIFY.md` and offered to the network as a **redacted alert**. The alert carries the enquiry in the enquirer's own words with names, phone numbers, email addresses, postcodes, links and company names stripped, and no contact details. A firm decides from that; the unredacted enquiry and the contact details go out only on claim.
- A firm **claims** an enquiry to receive it in full. Claims run in two independent, capped lanes: **up to 3 accounting firms** and **up to 3 firms in other professions**. The maximum number of firms that can receive one enquirer's details is therefore **6**.
- A firm may instead claim **exclusively**, at 3 times the price, which locks its own lane. Exclusivity is per enquiry only; no firm is ever promised a site's flow.
- An enquiry no firm claims holds its price and cascades to the other lane after 48 hours. There is no last-call discount.
- Enquiries we could never verify are supplied after a 7-day window as a **Bulk Supply**: a batch, to **one** firm, with no alert and no per-enquiry claim. Bulk Supply is defined separately from a Referral because it has no acceptance step.
- Each receiving firm identifies itself to the enquirer under its own Article 14 notice at first contact.

## The conditions the LIA imposes

The LIA's conclusion is conditional, and the conditions are operational, not drafting flourishes. If any fails, the lawful basis for the sharing fails with it.

1. **The caps stay at 3 and 3.** Raising either, or setting the adjacent lane back to uncapped, requires the LIA balancing test to be redone **first**. `lead_engine/scripts/test_lanes.py` fails if a lane is uncapped.
2. **A site discloses the multi-firm position before its enquiries enter the pool.** The site's enquiry form and privacy policy must carry the disclosures in DSA Annex B.2 and B.4, including that more than one firm may receive the enquiry and the maximum number. A site without them must not be routed into the network.
3. **Bulk Supply goes to one firm per batch and excludes anyone who has objected.**

## The prospect flow

1. Prospect asks to join the network.
2. `python legal/build_agreement.py`, then `python legal/build_signing_docx.py` for the signing copy or `build_pdf.py` for a review PDF.
3. You sign and date the Supplier signature block. Everything else on the Supplier side is already filled in.
4. They complete the Recipient details block, sign, and send it back.
5. Record the signed date against the firm before it receives any alert. **A firm must not be alerted before its agreement is signed**, per the LIA and DSA clause 3.

Nothing to redraft per prospect. A price agreed differently from the published card goes in Schedule 1 paragraph 7 ("Agreed variations"), not into the body. If a clause needs improving, edit the template and rebuild; git is the version history. Already-signed copies are frozen.

## Owner items (before first pool delivery)

- [ ] Complete ICO registration and record the reference in the Supplier details block ("Available on request" is a placeholder).
- [ ] Carry out and document the Supplier DPIA required by DSA clause 11.3. See `DPIA.md`.
- [ ] Solicitor review of the set as a whole: the combined agreement (which contains both layers) plus `Legitimate_Interests_Assessment.md` and the on-site notice wording, reviewed together, before the first delivery to a pool recipient. The commercial layer is new drafting as of 14 August 2026 and the LIA is a complete reassessment, so this review matters more than it did.
- [x] Signed-agreement gate enforced in code, not just in the runbook: `matchingBuyers` filters on `dsa_signed_at`, and the dry-run engine refuses to ping or accept a claim from a firm with no `dsa_signed_date`.

## Legal grounding

- **UK GDPR + Data Protection Act 2018**, as amended by the **Data (Use and Access) Act 2025** (controller complaints-handling duty in force 19 June 2026). **PECR 2003** for electronic marketing.
- **ICO Data Sharing Code of Practice** - controller-to-controller sharing; documented Legitimate Interests Assessment.
- **Late Payment of Commercial Debts (Interest) Act 1998**; **Unfair Contract Terms Act 1977** (B2B limitation enforceability).

Each firm's agreement is executed bilaterally and separately; each firm sees only its own agreement, and is never told which other firms are in the network.
