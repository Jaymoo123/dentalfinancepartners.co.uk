One file per prospect (`<ref>.py` with a `PROSPECT` dict, copy `example_prospect.py`); select with `python proposal_engine/generate_proposal.py --prospect <ref>` from the repo root, omit to use the neutral default in `config_prospect.py`.

A prospect config carries ONLY:

- **Recipient**: `client_name`, `proposal_date`, `proposal_ref`
- **Scope**: `sources` (list of estate source keys from `SOURCE_META` in `generate_proposal.py`, or `["*"]` for the whole portfolio), `profession_lane` (`"accounting"` or `"adjacent"`)
- **Commercial knobs**: `tier_overrides` (`{}` = published prices from `config/tiers.json`; e.g. `{"advisory": 95}` overrides one tier's price and is footnoted in the document), `payment_days` (default 14)

Nothing else is per-prospect. Brand and legal entity are constants in `generate_proposal.py`; prices come from `config/tiers.json`; terms from `config/standard_terms.md`; the tiering philosophy from `docs/CLASSIFY.md`. Files named `PTP_*` are historical instances kept for the record.
