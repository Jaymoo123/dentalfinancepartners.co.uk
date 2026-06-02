"""
OAuth credentials for the snapshot module.

Reuses secrets/ga4_oauth_client.json but with additional scopes
(webmasters.readonly for URL Inspection + spreadsheets for Sheets write).
Token is saved separately to secrets/snapshot_token.json to avoid
breaking the existing GA4 auth flow.
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SECRETS = ROOT / "secrets"
OAUTH_CLIENT_FILE = SECRETS / "ga4_oauth_client.json"
TOKEN_FILE = SECRETS / "snapshot_token.json"

SCOPES = [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
]


def get_credentials():
    """Return google.oauth2.credentials.Credentials, refreshing as needed.

    First call: opens browser for one-time consent, saves token.
    Subsequent calls: reads token JSON, refreshes silently.
    """
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow

    creds = None
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not OAUTH_CLIENT_FILE.exists():
                raise FileNotFoundError(
                    f"Missing OAuth client secrets at {OAUTH_CLIENT_FILE}. "
                    "Download from GCP Console → Credentials → your OAuth Desktop client."
                )
            flow = InstalledAppFlow.from_client_secrets_file(
                str(OAUTH_CLIENT_FILE), SCOPES
            )
            print("Opening browser for one-time OAuth consent (Sheets + GSC scopes)...")
            creds = flow.run_local_server(port=0)
        TOKEN_FILE.parent.mkdir(parents=True, exist_ok=True)
        TOKEN_FILE.write_text(creds.to_json(), encoding="utf-8")
        print(f"Saved snapshot token to {TOKEN_FILE}")

    return creds
