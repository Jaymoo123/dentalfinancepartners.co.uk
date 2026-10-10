# Property link engine rulings (precedent)

Read first by every judgment reader (rubrics/cluster_owner.md). Blueprint rulings
R1 to R29 (docs/property/commercial_recovery_2026-10-07/SERVICE_PAGES_BLUEPRINT_2026-10-09.md)
still apply and win over these. Each line is a general rule; the family it was
first decided on is in brackets. "Manager" = adjudicated at the gate when two
readers disagreed; the owner can override any line, and an override replaces it.

| ID | Date | By | Rule |
|---|---|---|---|
| LE-1 | 2026-10-10 | manager | If both readers call a family informational, it leaves the money map whichever guide they picked; the guide that already ranks best owns it. (cgt on property sale, IHT on property, tax when selling a house) |
| LE-2 | 2026-10-10 | manager | commercial_fit is judged on the head and the majority of volume, not on a few advice-worded variants inside the family. The advice variants are served by links from the owning guide to the relevant /for/ page. (furnished holiday let tax, inherited property) |
| LE-3 | 2026-10-10 | manager | A landlord-specific decision (an inherited LET property, an estate owner planning around the APR cap) is paid advice and goes to the matching /for/ or pillar page. (inherited rental property, agricultural property relief) |
| LE-4 | 2026-10-10 | manager | Explicit "how to" wording stays with a how-to guide when that guide already converts; the guide then feeds the commercial page. Leads are the tie-breaker. (how to transfer property to limited company) |
| LE-5 | 2026-10-10 | manager | When both readers say paid advice but pick different pages, the commercial page wins over a blog guide; between two commercial pages, the one whose stated purpose is the decision (selling, incorporating) wins. (CGT when selling a holiday let, how to reduce CGT) |
| LE-6 | 2026-10-10 | manager | Readers agreeing on the owner settles the owner even if they differ on fit; fit defaults to informational for list-of-tips wording. (landlord tax planning strategies) |
| LE-7 | 2026-10-10 | manager | Non-resident disposal and non-resident hire forms go to /services/non-resident-landlord (blueprint R18 exception). (non resident CGT on UK property) |
| LE-8 | 2026-10-10 | manager | Property development families are a held gap under R21 until the firm confirms it does development work. (property development tax planning) |
| LE-9 | 2026-10-10 | manager, narrowed by LE-14 | Incorporation, incorporation-relief (s162 included) and portfolio-incorporation families are owned by /for/moving-property-into-a-limited-company. Technical guides feed it. Transfer wording goes to the how-to guide (LE-14). |
| LE-10 | 2026-10-10 | manager | Selling a buy-to-let or rental property with a gain is paid advice owned by /for/selling-a-buy-to-let. |
| LE-11 | 2026-10-10 | manager | Non-resident landlord SCHEME explainer wording (registration, how the scheme works) is informational and owned by the scheme guide; CPC is low. |
| LE-12 | 2026-10-10 | manager | Selling a second home is paid advice (real gain, 60-day return, high CPC) but owned by the exact-match second-home guide, which must link to /for/selling-a-buy-to-let. Open to owner override. |
| LE-13 | 2026-10-10 | manager | "Capital gains tax on home sale" and "on property sale" stay separate families: main-residence relief makes them different questions. |
| LE-14 | 2026-10-10 | owner | Split by what the person types. Searches about doing the transfer ("transfer property/buy to let/rental to limited company", "without stamp duty") are owned by the how-to guide, which already ranks and converts and is not to be changed. Searches about hiring help or the relief ("property incorporation", "incorporation relief", "s162") stay with the sales page. The guide must link to the sales page. |
| LE-15 | 2026-10-10 | owner | Non-resident landlord is the second-largest lead case type (17 scored leads in the 90 days to 2026-10-09) while its ad value is low. Implemented as a 5% floor on /services/non-resident-landlord's link-budget share (config `destination_share_floor`), because the non-resident families have no CPC and a multiplier on zero does nothing. The other destinations' shares are scaled down proportionally. Revisit at the next quarterly run against leads. |
| LE-16 | 2026-10-10 | manager | Topic pillars (/section-24, /landlord-tax, /incorporation, /making-tax-digital-landlords, /leasehold, /landlord-compliance, /spv-company) are link SOURCES, not money destinations: a guide linking to another guide does not hand the reader to us. Only pillars that own a ranked money family (/landed-estates) are destinations. Section 24 planning goes to /services/property-tax-advice (R2 planning forms); leasehold and compliance topics go to the sales page that fits or to "none". |
