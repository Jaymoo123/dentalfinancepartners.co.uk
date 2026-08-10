# Legal pack: partner-network data sharing

Controller-to-controller data-sharing pack for **Ashfield Trading Limited** (company number 16358723), which operates a portfolio of specialist enquiry websites and refers enquiries to a network of partner firms. British English, law of **England and Wales**. **Not legal advice** - have a qualified solicitor and a data protection specialist review before signing or first delivery.

## How this is structured (read this first)

The **data-sharing agreement is separate from the commercial deal**. The DSA (data-protection layer) is firm-agnostic and never changes per prospect. The commercial terms are not negotiated per firm either: they are the published price sheet (`docs/PRICE_SHEET.md`) plus the standard terms (`config/standard_terms.md`), which are reproduced on the price sheet, in delivery emails and on invoices. There is **one standing DSA you send to everyone** - no per-prospect redraft, and the DSA never imports commercial terms.

| File | What it is |
|---|---|
| **DSA_TEMPLATE.md** | The single standing Data Sharing Agreement (version 10 August 2026). Data protection only. Supplier side pre-filled, **except the Supplier signature and date, which are still blank and are yours to apply**; the other blanks are the Recipient's own details block and their signature. Firm-agnostic and portfolio-wide: it covers all sites operated by the Supplier unless the Supplier Details Block narrows the list. **The send-and-return artifact.** |
| **Legitimate_Interests_Assessment.md** | Standing, firm-agnostic LIA (revised 10 August 2026, review 10 August 2027) covering the referral of enquiries from any portfolio site to any Partner Firm meeting its section 1.4 criteria, including firms in adjacent regulated professions. One document covers all. |
| **build_pdf.py** | Renders any `.md` to a clean black-text A4 PDF (reportlab). Strips HTML comments and warns if `{{` or `[INSERT` survives. Usage: `python build_pdf.py DSA_TEMPLATE.md out.pdf`. |
| **build_signing_docx.py** | Renders a `.md` to a `.docx` for recipients who prefer to type into a document. Its default input path points at an archived file, so always pass the input explicitly: `python build_signing_docx.py DSA_TEMPLATE.md out.docx`. |
| **_archive/** | Superseded instances and historical drafts (DJH pack, Haines Watts pack, old combined agreement, stale rendered PDFs). See `_archive/README.md`. Never delete executed contracts. |

Rendered PDFs of the standing docs are not currently checked in; regenerate them from the `.md` sources with `build_pdf.py` when needed.

## The operating model the pack reflects

- Enquiries come from the whole website portfolio, not one site. Each site collects under the estate-standard on-site notice in Annex B of the DSA (recipients disclosed as a **category**, "a firm from our specialist partner network", never named on-site).
- Enquiries are offered to firms in the partner network; before delivery a firm sees only a summary with direct identifiers removed. The full details go to **one firm only, on that firm's acceptance**.
- The receiving firm identifies itself to the enquirer under its own Article 14 notice at first contact.
- An enquiry the first firm cannot help with may be re-referred to another firm in the network; this is disclosed at collection.
- No exclusivity is promised to any firm, in any document.

## The prospect flow

1. Prospect asks to join the network.
2. You sign and date the Supplier signature block (both are blank in the template), render `DSA_TEMPLATE.md` with `build_pdf.py` (or `build_signing_docx.py` if they prefer to type into it), and send it. Everything else on the Supplier side is already filled in.
3. They complete the Recipient details block, sign, and send it back. Done.
4. The commercial terms are the published price sheet (`docs/PRICE_SHEET.md`) and the standard terms (`config/standard_terms.md`). They are not negotiated per firm; the DSA deliberately says nothing about pricing, offers, acceptance mechanics or invoicing beyond noting they are agreed separately in writing.

Nothing to redraft per prospect. If a clause ever needs improving, edit `DSA_TEMPLATE.md` and rebuild; git is the version history. Already-signed copies are frozen.

## Owner items (before first pool delivery)

- [ ] Complete ICO registration and record the reference in the Supplier Details Block ("Available on request" is a placeholder).
- [ ] Carry out and document the Supplier DPIA (or screening assessment) required by DSA clause 11.3; still outstanding.
- [ ] Solicitor review of the set as a whole: DSA_TEMPLATE.md + Legitimate_Interests_Assessment.md + the on-site notice wording (DSA Annex B.2), reviewed together, before the first delivery to a pool recipient.

## Legal grounding

- **UK GDPR + Data Protection Act 2018**, as amended by the **Data (Use and Access) Act 2025** (controller complaints-handling duty in force 19 June 2026). **PECR 2003** for electronic marketing.
- **ICO Data Sharing Code of Practice** - controller-to-controller sharing; documented Legitimate Interests Assessment.
- **Late Payment of Commercial Debts (Interest) Act 1998**; **Unfair Contract Terms Act 1977** (B2B limitation enforceability).

Each firm's DSA is executed bilaterally and separately; each firm sees only its own agreement.
