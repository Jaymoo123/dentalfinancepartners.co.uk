"""GA4 property IDs per site.

Service-account key creation is blocked by the user's GCP org policy, so
GA4 access goes through an OAuth Desktop-app credential. The OAuth client
JSON lives at `secrets/ga4_oauth_client.json` and the refresh token
(generated on first run) at `secrets/ga4_token.json`.

To add a new site: enable the GA4 property + give the user account (the
one that will do the one-time OAuth consent) at least Viewer access, then
add the property ID below keyed by site_key.

As of 2026-05-20 these 4 sites have GA4 data collection live since their
deployments. Generalist + Digital Agency haven't been granted access yet.
"""
from __future__ import annotations

GA4_PROPERTY_IDS: dict[str, str] = {
    "dentists":   "530287964",
    "medical":    "531115672",
    "property":   "530522680",
    "solicitors": "531116555",
    # "generalist": "...",        # add when property exists / access granted
    # "agency":     "...",
}


def get_property_id(site_key: str) -> str:
    if site_key not in GA4_PROPERTY_IDS:
        raise ValueError(
            f"No GA4 property ID for {site_key!r}. "
            f"Known: {sorted(GA4_PROPERTY_IDS.keys())}. "
            f"Add to optimisation_engine/clients/ga4_config.py."
        )
    return GA4_PROPERTY_IDS[site_key]
