# Pipeline tracker

One row per firm. Updated the moment anything happens, not at the end of the week.

Outcome values: `SENT`, `FOLLOWED UP`, `REPLIED`, `CALL BOOKED`, `PROPOSAL SENT`, `WON`,
`LOST`, `CLOSED` (no reply after day 10), `STOP` (they asked us not to write again).

`STOP` is final. Never contact that firm again, and never re-add it to a later list.

| Firm | Website | Variant | Sent | Reply | Call | Outcome | Notes |
|---|---|---|---|---|---|---|---|
| EXAMPLE Smith & Co | https://example-smithco.co.uk/contact | A | 2026-09-17 | 2026-09-19 | 2026-09-23 | PROPOSAL SENT | Blog last posted 2024. Wants more incorporation work, gets too much basic SA. Founding rate offered. |
| EXAMPLE Harper Vale | https://example-harpervale.co.uk/contact-us | B | 2026-09-17 | - | - | CLOSED | Follow-up sent 2026-09-24, no reply by day 10. Two partners, template site, no blog at all. |
| EXAMPLE Brant Accountancy | https://example-brant.co.uk/get-in-touch | C | 2026-09-18 | 2026-09-18 | - | STOP | Replied same day asking not to be contacted. Row closed, do not re-add. |

## Weekly read

At the end of each week, count and write one line: sent, replies, calls booked, proposals
out, signed. If replies are under 4 in 50, the problem is the list or the specific
observation in the message, not the offer.
