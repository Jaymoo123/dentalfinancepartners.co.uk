"""
Google Sheets exporter for the snapshot module.

First run: creates a new workbook with 6 tabs, headers, and frozen rows.
Subsequent runs:
  - Tab 1 (Overview): appends a new row (history accumulates)
  - Tabs 2-6: full data refresh (clear + rewrite)

Uses gspread>=6.0 with the OAuth credentials from auth.py.
Spreadsheet IDs are stored in secrets/snapshot_sheets.json (avoids needing
Google Drive API scope — only the spreadsheets scope is required).
"""
from __future__ import annotations

import json
from datetime import date
from pathlib import Path
from typing import Any

import httpx
import gspread
from gspread import Spreadsheet, Worksheet

ROOT = Path(__file__).resolve().parents[2]
SHEETS_ID_FILE = ROOT / "secrets" / "snapshot_sheets.json"

WORKBOOK_NAME_TEMPLATE = "{brand} — Site Health"

SITE_BRANDS = {
    "property":   "Property Tax Partners",
    "dentists":   "Dentist Accountants",
    "medical":    "Medical Accountants",
    "solicitors": "Solicitor Accountants",
    "agency":     "Agency Founder Finance",
    "generalist": "Holloway Davies",
}

# ---------------------------------------------------------------------------
# Tab definitions
# ---------------------------------------------------------------------------

OVERVIEW_HEADERS = [
    "Date", "Visible in search (7d)", "Dark pages", "Impressions (7d)", "Clicks (7d)", "CTR (7d)", "Avg Position (7d)",
    "Sessions (7d)", "Engaged Sessions (7d)", "Eng% (7d)", "Leads (7d)", "Posts Published (7d)",
    "Changes Shipped (7d)", "API Cost (7d)",
]

PAGES_HEADERS = [
    "Page URL", "Clicks (28d)", "Impressions (28d)", "CTR (28d)", "Avg Position (28d)",
    "Pos Δ WoW", "Imp Δ% WoW", "Sessions (28d)", "Eng%", "Last Changed", "Index Status",
]

QUERIES_HEADERS = [
    "Query", "Clicks", "Impressions", "CTR", "Avg Position", "Primary Page",
]

LEADS_HEADERS = [
    "Week ending", "New Leads", "Running Total",
]

CHANGELOG_HEADERS = [
    "Date", "Type", "Page", "Description", "Outcome (30d)",
]

DIAGNOSTICS_HEADERS = [
    "Page URL", "Flag Reason", "Impressions (28d)", "Position (28d)",
    "Imp Δ%", "Pos Δ", "Sessions (28d)", "Eng%",
    "Index Status", "Last Crawl", "Canonical (Google)", "Mobile Issues",
    "Diagnosis", "Suggested Action",
]

TAB_NAMES = [
    "Overview",
    "Pages",
    "Queries",
    "Leads",
    "Changelog",
    "Diagnostics",
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _pct(v: Any) -> str:
    if v is None:
        return ""
    try:
        return f"{float(v)*100:.2f}%"
    except (TypeError, ValueError):
        return str(v)


def _fmt(v: Any) -> str:
    if v is None:
        return ""
    return str(v)


def _overview_row(data: dict) -> list:
    return [
        data.get("snapshot_date", ""),
        data.get("gsc_pages", ""),
        data.get("dark_pages", ""),
        data.get("impressions", ""),
        data.get("clicks", ""),
        _pct(data.get("ctr")),
        data.get("avg_position", ""),
        data.get("sessions", ""),
        data.get("engaged_sessions", ""),
        _pct(data.get("engagement_rate")),
        data.get("leads", ""),
        data.get("posts_published", ""),
        data.get("changes_shipped", ""),
        data.get("api_cost_usd", ""),
    ]


def _pages_rows(data: list[dict]) -> list[list]:
    rows = []
    for r in data:
        imp_delta = r.get("imp_delta_pct")
        try:
            imp_delta_fmt = f"{float(imp_delta):.1f}%" if imp_delta is not None else ""
        except (TypeError, ValueError):
            imp_delta_fmt = str(imp_delta) if imp_delta is not None else ""
        rows.append([
            r.get("page_url", ""),
            r.get("clicks", ""),
            r.get("impressions", ""),
            _pct(r.get("ctr")),
            r.get("avg_position", ""),
            _fmt(r.get("pos_delta")),
            imp_delta_fmt,
            r.get("sessions", ""),
            _pct(r.get("engagement_rate")),
            _fmt(r.get("last_changed")),
            r.get("index_status", ""),
        ])
    return rows


def _queries_rows(data: list[dict]) -> list[list]:
    return [
        [
            r.get("query", ""),
            r.get("clicks", ""),
            r.get("impressions", ""),
            _pct(r.get("ctr")),
            r.get("avg_position", ""),
            r.get("primary_page", ""),
        ]
        for r in data
    ]


def _leads_rows(data: list[dict]) -> list[list]:
    return [
        [_fmt(r.get("week_ending")), r.get("new_leads", ""), r.get("running_total", "")]
        for r in data
    ]


def _changelog_rows(data: list[dict]) -> list[list]:
    return [
        [
            _fmt(r.get("date")),
            r.get("type", ""),
            r.get("page", ""),
            r.get("description", ""),
            r.get("outcome_30d", ""),
        ]
        for r in data
    ]


def _diagnostics_rows(data: list[dict]) -> list[list]:
    return [
        [
            r.get("page_url", ""),
            r.get("flag_reason", ""),
            r.get("impressions_28d", ""),
            r.get("position_28d", ""),
            f"{float(r['imp_delta_pct'])*100:.1f}%" if r.get("imp_delta_pct") is not None else "",
            _fmt(r.get("pos_delta")),
            r.get("sessions_28d", ""),
            _pct(r.get("engagement_rate")),
            r.get("index_status", ""),
            _fmt(r.get("last_crawl")),
            r.get("canonical_google", ""),
            r.get("mobile_issues", ""),
            r.get("diagnosis", ""),
            r.get("suggested_action", ""),
        ]
        for r in data
    ]


# ---------------------------------------------------------------------------
# Workbook setup (first run)
# ---------------------------------------------------------------------------

def _create_spreadsheet(credentials, title: str) -> str:
    """Create a spreadsheet via Sheets API (no Drive scope needed). Returns sheet ID."""
    from google.auth.transport.requests import Request as GoogleRequest
    if not credentials.valid:
        credentials.refresh(GoogleRequest())
    resp = httpx.post(
        "https://sheets.googleapis.com/v4/spreadsheets",
        headers={"Authorization": f"Bearer {credentials.token}"},
        json={"properties": {"title": title}},
        timeout=30.0,
    )
    resp.raise_for_status()
    return resp.json()["spreadsheetId"]


def _setup_workbook(wb: Spreadsheet) -> None:
    """Create 6 tabs with correct names and headers."""
    existing = [ws.title for ws in wb.worksheets()]

    tab_headers = [
        OVERVIEW_HEADERS,
        PAGES_HEADERS,
        QUERIES_HEADERS,
        LEADS_HEADERS,
        CHANGELOG_HEADERS,
        DIAGNOSTICS_HEADERS,
    ]

    for i, (name, headers) in enumerate(zip(TAB_NAMES, tab_headers)):
        if name not in existing:
            if i == 0:
                ws = wb.sheet1
                ws.update_title(name)
            else:
                ws = wb.add_worksheet(title=name, rows=2000, cols=len(headers))
        else:
            ws = wb.worksheet(name)

        # Write headers in row 1 and freeze
        ws.update("A1", [headers])
        ws.freeze(rows=1)

        # Bold the header row
        ws.format("1:1", {"textFormat": {"bold": True}})


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def export_to_sheets(
    site_key: str,
    credentials,
    overview_history: list[dict],
    pages: list[dict],
    queries: list[dict],
    leads: list[dict],
    changelog: list[dict],
    diagnostics: list[dict],
) -> str:
    """Write all 6 tabs. Returns the spreadsheet URL.

    On first call the workbook is created. On subsequent calls it is found
    by name in the user's Drive.
    """
    gc = gspread.authorize(credentials)
    brand = SITE_BRANDS.get(site_key, site_key.title())
    workbook_name = WORKBOOK_NAME_TEMPLATE.format(brand=brand)

    # Load stored spreadsheet IDs (avoids Drive API scope requirement)
    sheet_ids: dict[str, str] = {}
    if SHEETS_ID_FILE.exists():
        try:
            sheet_ids = json.loads(SHEETS_ID_FILE.read_text(encoding="utf-8"))
        except (json.JSONDecodeError, OSError):
            pass

    # Find or create the workbook using open_by_key (needs only spreadsheets scope)
    # gc.create() and gc.open() both use Drive API — avoid them.
    first_run = False
    if site_key in sheet_ids:
        try:
            wb = gc.open_by_key(sheet_ids[site_key])
            print(f"  [sheets] Opened existing workbook: {workbook_name}")
        except gspread.SpreadsheetNotFound:
            sheet_id = _create_spreadsheet(credentials, workbook_name)
            sheet_ids[site_key] = sheet_id
            SHEETS_ID_FILE.parent.mkdir(parents=True, exist_ok=True)
            SHEETS_ID_FILE.write_text(json.dumps(sheet_ids, indent=2), encoding="utf-8")
            wb = gc.open_by_key(sheet_id)
            print(f"  [sheets] Re-created workbook: {workbook_name} (ID: {sheet_id})")
            first_run = True
    else:
        sheet_id = _create_spreadsheet(credentials, workbook_name)
        sheet_ids[site_key] = sheet_id
        SHEETS_ID_FILE.parent.mkdir(parents=True, exist_ok=True)
        SHEETS_ID_FILE.write_text(json.dumps(sheet_ids, indent=2), encoding="utf-8")
        wb = gc.open_by_key(sheet_id)
        print(f"  [sheets] Created new workbook: {workbook_name} (ID: {sheet_id})")
        first_run = True

    if first_run:
        _setup_workbook(wb)

    # Ensure all tabs exist (in case the workbook was created manually)
    existing_tabs = {ws.title for ws in wb.worksheets()}
    tab_headers_map = dict(zip(TAB_NAMES, [
        OVERVIEW_HEADERS, PAGES_HEADERS, QUERIES_HEADERS,
        LEADS_HEADERS, CHANGELOG_HEADERS, DIAGNOSTICS_HEADERS,
    ]))
    for name in TAB_NAMES:
        if name not in existing_tabs:
            ws = wb.add_worksheet(title=name, rows=2000, cols=len(tab_headers_map[name]))
            ws.update("A1", [tab_headers_map[name]])
            ws.freeze(rows=1)
            ws.format("1:1", {"textFormat": {"bold": True}})

    # ---- Tab 1: Overview — full rebuild from Supabase history (no duplicates ever) ----
    overview_ws = wb.worksheet("Overview")
    overview_ws.clear()
    all_overview = [OVERVIEW_HEADERS] + [_overview_row(r) for r in overview_history]
    overview_ws.update("A1", all_overview)
    overview_ws.freeze(rows=1)
    overview_ws.format("1:1", {"textFormat": {"bold": True}})
    print(f"  [sheets] Overview: rebuilt {len(overview_history)} week(s) from Supabase")

    # ---- Tab 2: Pages — full refresh ----
    pages_ws = wb.worksheet("Pages")
    pages_ws.clear()
    all_pages = [PAGES_HEADERS] + (_pages_rows(pages) if pages else [])
    pages_ws.update("A1", all_pages)
    pages_ws.freeze(rows=1)
    pages_ws.format("1:1", {"textFormat": {"bold": True}})
    print(f"  [sheets] Pages: wrote {len(pages)} rows")

    # ---- Tab 3: Queries — full refresh ----
    queries_ws = wb.worksheet("Queries")
    queries_ws.clear()
    all_queries = [QUERIES_HEADERS] + (_queries_rows(queries) if queries else [])
    queries_ws.update("A1", all_queries)
    queries_ws.freeze(rows=1)
    queries_ws.format("1:1", {"textFormat": {"bold": True}})
    print(f"  [sheets] Queries: wrote {len(queries)} rows")

    # ---- Tab 4: Leads — full refresh ----
    leads_ws = wb.worksheet("Leads")
    leads_ws.clear()
    all_leads = [LEADS_HEADERS] + (_leads_rows(leads) if leads else [])
    leads_ws.update("A1", all_leads)
    leads_ws.freeze(rows=1)
    leads_ws.format("1:1", {"textFormat": {"bold": True}})
    print(f"  [sheets] Leads: wrote {len(leads)} rows")

    # ---- Tab 5: Changelog — full refresh ----
    changelog_ws = wb.worksheet("Changelog")
    changelog_ws.clear()
    all_changelog = [CHANGELOG_HEADERS] + (_changelog_rows(changelog) if changelog else [])
    changelog_ws.update("A1", all_changelog)
    changelog_ws.freeze(rows=1)
    changelog_ws.format("1:1", {"textFormat": {"bold": True}})
    print(f"  [sheets] Changelog: wrote {len(changelog)} rows")

    # ---- Tab 6: Diagnostics — full refresh ----
    diag_ws = wb.worksheet("Diagnostics")
    diag_ws.clear()
    all_diag = [DIAGNOSTICS_HEADERS] + (_diagnostics_rows(diagnostics) if diagnostics else [])
    diag_ws.update("A1", all_diag)
    diag_ws.freeze(rows=1)
    diag_ws.format("1:1", {"textFormat": {"bold": True}})
    print(f"  [sheets] Diagnostics: wrote {len(diagnostics)} flagged pages")

    url = f"https://docs.google.com/spreadsheets/d/{wb.id}"
    print(f"  [sheets] Workbook URL: {url}")
    return url
