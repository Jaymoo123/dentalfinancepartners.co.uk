"""
Fetch GSC data directly and analyze — bypasses Supabase storage issues.
Saves raw data to a local JSON for reference.
"""
import os
import sys
import json
import pickle
from datetime import datetime, timedelta

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/webmasters"]
CREDS_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "secrets", "gsc_credentials.json")
TOKEN_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "secrets", "gsc_token.pickle")
SITE_URL = "sc-domain:propertytaxpartners.co.uk"


def get_gsc_service():
    creds = None
    if os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE, "rb") as f:
            creds = pickle.load(f)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CREDS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_FILE, "wb") as f:
            pickle.dump(creds, f)
    return build("searchconsole", "v1", credentials=creds)


def fetch_page_data(service, days=28):
    """Fetch page-level performance (impressions, clicks, CTR, position)."""
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)

    response = service.searchanalytics().query(
        siteUrl=SITE_URL,
        body={
            "startDate": start_date.strftime("%Y-%m-%d"),
            "endDate": end_date.strftime("%Y-%m-%d"),
            "dimensions": ["page"],
            "rowLimit": 25000,
        },
    ).execute()
    return response.get("rows", [])


def fetch_query_data(service, days=28):
    """Fetch query-level data (what people actually searched for)."""
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)

    response = service.searchanalytics().query(
        siteUrl=SITE_URL,
        body={
            "startDate": start_date.strftime("%Y-%m-%d"),
            "endDate": end_date.strftime("%Y-%m-%d"),
            "dimensions": ["query"],
            "rowLimit": 25000,
        },
    ).execute()
    return response.get("rows", [])


def fetch_page_query_data(service, days=28):
    """Fetch page+query combined data (which queries drive which pages)."""
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)

    response = service.searchanalytics().query(
        siteUrl=SITE_URL,
        body={
            "startDate": start_date.strftime("%Y-%m-%d"),
            "endDate": end_date.strftime("%Y-%m-%d"),
            "dimensions": ["page", "query"],
            "rowLimit": 25000,
        },
    ).execute()
    return response.get("rows", [])


def main():
    print("=" * 110)
    print("  GSC ANALYSIS — Property Tax Partners")
    print(f"  Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 110)

    service = get_gsc_service()

    # 1. Page-level data
    print("\n[1/3] Fetching page-level data...")
    page_rows = fetch_page_data(service, days=28)
    print(f"  Pages with data: {len(page_rows)}")

    # 2. Query-level data
    print("[2/3] Fetching query-level data...")
    query_rows = fetch_query_data(service, days=28)
    print(f"  Queries: {len(query_rows)}")

    # 3. Page+Query combined
    print("[3/3] Fetching page+query data...")
    pq_rows = fetch_page_query_data(service, days=28)
    print(f"  Page-query pairs: {len(pq_rows)}")

    # Save raw data
    raw_data = {
        "fetched_at": datetime.now().isoformat(),
        "site": SITE_URL,
        "pages": page_rows,
        "queries": query_rows,
        "page_queries": pq_rows,
    }
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gsc_property_data.json")
    with open(output_path, "w") as f:
        json.dump(raw_data, f, indent=2)
    print(f"\n  Raw data saved to: {output_path}")

    # ---- ANALYSIS ----

    # Sort pages by impressions
    page_rows.sort(key=lambda r: r.get("impressions", 0), reverse=True)

    print("\n" + "=" * 110)
    print("  ALL PAGES WITH SEARCH VISIBILITY")
    print("=" * 110)
    print(f"  {'URL':<72} {'Impr':>6} {'Clicks':>6} {'Pos':>6} {'CTR':>7}")
    print("  " + "-" * 106)

    total_imp = 0
    total_clk = 0
    for row in page_rows:
        url = row["keys"][0].replace("https://www.propertytaxpartners.co.uk", "").replace("https://propertytaxpartners.co.uk", "")
        if len(url) > 70:
            url = url[:67] + "..."
        imp = row.get("impressions", 0)
        clk = row.get("clicks", 0)
        pos = row.get("position", 0)
        ctr = row.get("ctr", 0)
        total_imp += imp
        total_clk += clk
        print(f"  {url:<72} {imp:>6} {clk:>6} {pos:>6.1f} {ctr:>6.2%}")

    print("  " + "-" * 106)
    print(f"  {'TOTAL':<72} {total_imp:>6} {total_clk:>6}")

    # Quick wins
    print("\n" + "=" * 110)
    print("  QUICK WINS: Pages on page 2-3 (position 8-30) with 5+ impressions")
    print("=" * 110)
    qw = [r for r in page_rows if r.get("impressions", 0) >= 5 and 8 <= r.get("position", 0) <= 30]
    if qw:
        for row in qw:
            url = row["keys"][0].replace("https://www.propertytaxpartners.co.uk", "").replace("https://propertytaxpartners.co.uk", "")
            if len(url) > 70:
                url = url[:67] + "..."
            print(f"  {url:<72} {row['impressions']:>4} imp  Pos {row['position']:>5.1f}  CTR {row['ctr']:.2%}")
    else:
        print("  (none yet — site may be too new for page 2+ rankings)")

    # CTR problems
    print("\n" + "=" * 110)
    print("  CTR PROBLEMS: 10+ impressions but 0 clicks")
    print("=" * 110)
    ctr_prob = [r for r in page_rows if r.get("impressions", 0) >= 10 and r.get("clicks", 0) == 0]
    if ctr_prob:
        for row in ctr_prob:
            url = row["keys"][0].replace("https://www.propertytaxpartners.co.uk", "").replace("https://propertytaxpartners.co.uk", "")
            if len(url) > 70:
                url = url[:67] + "..."
            print(f"  {url:<72} {row['impressions']:>4} imp  Pos {row['position']:>5.1f}")
    else:
        print("  (none)")

    # Top performers
    print("\n" + "=" * 110)
    print("  TOP PERFORMERS: Pages getting clicks")
    print("=" * 110)
    clickers = [r for r in page_rows if r.get("clicks", 0) > 0]
    if clickers:
        for row in clickers:
            url = row["keys"][0].replace("https://www.propertytaxpartners.co.uk", "").replace("https://propertytaxpartners.co.uk", "")
            if len(url) > 70:
                url = url[:67] + "..."
            print(f"  {url:<72} {row['impressions']:>4} imp  {row['clicks']:>3} clk  Pos {row['position']:>5.1f}  CTR {row['ctr']:.2%}")
    else:
        print("  (no clicks yet)")

    # Top queries
    query_rows.sort(key=lambda r: r.get("impressions", 0), reverse=True)
    print("\n" + "=" * 110)
    print("  TOP QUERIES (what people searched to find your site)")
    print("=" * 110)
    print(f"  {'Query':<60} {'Impr':>6} {'Clicks':>6} {'Pos':>6} {'CTR':>7}")
    print("  " + "-" * 91)
    for row in query_rows[:40]:
        q = row["keys"][0]
        if len(q) > 58:
            q = q[:55] + "..."
        print(f"  {q:<60} {row['impressions']:>6} {row['clicks']:>6} {row['position']:>6.1f} {row['ctr']:>6.2%}")

    # Summary
    pages_with_data = len(page_rows)
    est_invisible = 85 - pages_with_data
    print("\n" + "=" * 110)
    print("  SUMMARY")
    print("=" * 110)
    print(f"  Total impressions (28 days):    {total_imp}")
    print(f"  Total clicks (28 days):         {total_clk}")
    print(f"  Pages indexed with visibility:  {pages_with_data}")
    print(f"  Pages with NO visibility:       ~{est_invisible} of 85")
    print(f"  Unique queries triggering site:  {len(query_rows)}")
    print("=" * 110)


if __name__ == "__main__":
    main()
