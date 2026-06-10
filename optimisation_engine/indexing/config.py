"""Per-site IndexNow configuration.

IndexNow KEYs are public (the key file is served at https://<host>/<key>.txt
for IndexNow to verify domain ownership), so safe to commit. They identify
which site is submitting URLs — knowing the key just lets you submit URLs
that already belong to that domain.

To add a new site:
  1. Generate a 32-char hex key (e.g. `python -c "import secrets; print(secrets.token_hex(16))"`)
  2. Place `<key>.txt` containing only the key string in the site's
     web/public/ directory so it's served at https://<host>/<key>.txt
  3. Add an entry below
"""
from __future__ import annotations

SITE_INDEXNOW_CONFIG: dict[str, dict[str, str]] = {
    "dentists": {
        "host": "www.dentalfinancepartners.co.uk",
        "key": "0d90ff23794225ef49bd56fdaad369f1",
    },
    "property": {
        "host": "www.propertytaxpartners.co.uk",
        "key": "e8834a484dbb0d4b534baa137a284645",
    },
    "generalist": {
        "host": "www.hollowaydavies.co.uk",
        "key": "432fba0acf043d10bee408eb4a80932e",
    },
    "agency": {
        "host": "www.agencyfounderfinance.co.uk",
        "key": "f4fdfbf2cea848168e128a029d31e86b",
    },
    "contractors-ir35": {
        "host": "www.contractor-finance-partners.co.uk",
        "key": "fc84f134ebf231eaec2e26e2646a4ede",
    },
    "medical": {
        "host": "www.medicalaccounts.co.uk",
        "key": "8ced3150f417cef04367b717f0d21dc1",
    },
    "solicitors": {
        "host": "www.accountsforlawyers.co.uk",
        "key": "b5e67f188da49b020b33f4e8d08cb384",
    },
}


def get_site_config(site_key: str) -> dict[str, str]:
    """Return host + key for a site. Raises if missing or no IndexNow key."""
    if site_key not in SITE_INDEXNOW_CONFIG:
        raise ValueError(
            f"No IndexNow config for site {site_key!r}. "
            f"Known: {sorted(SITE_INDEXNOW_CONFIG.keys())}. "
            f"Add an entry in optimisation_engine/indexing/config.py."
        )
    return SITE_INDEXNOW_CONFIG[site_key]
