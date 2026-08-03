# Lead Generation & Data Sharing Agreement pack

Controller-to-controller lead-referral contract pack for **Ashfield Trading Limited** (trading as Property Tax Partners). British English, law of **England and Wales**. **Not legal advice** - have a qualified solicitor and a data protection specialist review before signing.

## How this is structured (read this first)

The **data-sharing agreement is separate from the commercial deal**. The DSA (data-protection layer) is firm-agnostic and never changes per prospect; the commercial terms (fee, selection, trial, credits) are agreed by email. This means there is **one standing DSA you send to everyone** - no per-prospect redraft.

| File | What it is |
|---|---|
| **DSA_TEMPLATE.md** | The single standing Data Sharing Agreement. Data protection only. Supplier side pre-filled, **except the Supplier signature and date, which are still blank and are yours to apply**; the other blanks are the Recipient's own details block and their signature. Firm-agnostic - the same file goes to every prospect. **The send-and-return artifact** (rendered as `Property Tax Partners - Data Sharing Agreement.pdf`). |
| **build_pdf.py** | Renders any `.md` to a clean black-text A4 PDF (reportlab). Strips HTML comments and warns if `{{` or `[INSERT` survives. Usage: `python build_pdf.py DSA_TEMPLATE.md out.pdf`. |
| **Legitimate_Interests_Assessment.md** | Standing, firm-agnostic LIA covering the referral of enquiries to any Partner Firm meeting its section 1.4 criteria. One document covers all. |
| **Combined_Agreement_REFERENCE.md** | The old all-in-one draft (DSA + full commercial contract in one document, with `{{TOKENS}}`). Kept only as a reference in case a formal signed commercial contract is ever wanted instead of email terms. Not the thing you send. |
| **DSA_HainesWatts_2026-07.md** | The combined DSA+commercial instance drafted for Shazin / Haines Watts before this split. Already negotiated by email; kept as-is. Going forward, new prospects get `DSA_TEMPLATE.md` + email terms instead. |
| **Plain_English_Summary.md** | One-page plain-English summary of the key terms. |
| **Lead_Generation_and_Data_Sharing_Agreement*.md/.docx** | Historical DJH-era pack (executed 2026-06-22). Kept as history; do not reuse. |

## The prospect flow (the point of all this)

1. Prospect asks for the DSA.
2. You sign and date the Supplier signature block (both are blank in the template), then send `Property Tax Partners - Data Sharing Agreement.pdf` (or a `.docx` if they prefer to type into it). Everything else on the Supplier side is already filled in.
3. They complete the four-line Recipient details block, sign, and send it back. Done.
4. The commercial terms (fee, how selection works, trial length, credits) are whatever you agreed in the email thread. That email exchange is itself a binding contract in English law once both sides agree - keep the thread.

Nothing to redraft per prospect. If a clause ever needs improving, edit `DSA_TEMPLATE.md` and rebuild; git is the version history. Already-signed copies are frozen.

## Legal grounding
- **UK GDPR + Data Protection Act 2018**, as amended by the **Data (Use and Access) Act 2025** (controller complaints-handling duty in force 19 June 2026). **PECR 2003** for electronic marketing.
- **ICO Data Sharing Code of Practice** - controller-to-controller sharing; documented Legitimate Interests Assessment.
- **Late Payment of Commercial Debts (Interest) Act 1998**; **Unfair Contract Terms Act 1977** (B2B limitation enforceability).

Each firm's DSA is executed bilaterally and separately; each firm sees only its own agreement.
