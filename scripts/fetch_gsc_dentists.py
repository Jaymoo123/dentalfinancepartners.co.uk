"""
Fetch GSC data for Dentists site and analyze.
Saves raw data to scripts/gsc_dentists_data.json.
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
SITE_URL = "https://www.dentalfinancepartners.co.uk/"
DOMAIN_STRIP = "https://www.dentalfinancepartners.co.uk"


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


def fetch_data(service, dimensions, days=28):
    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)
    response = service.searchanalytics().query(
        siteUrl=SITE_URL,
        body={
            "startDate": start_date.strftime("%Y-%m-%d"),
            "endDate": end_date.strftime("%Y-%m-%d"),
            "dimensions": dimensions,
            "rowLimit": 25000,
        },
    ).execute()
    return response.get("rows", [])


def short_url(full_url):
    return full_url.replace(DOMAIN_STRIP, "").replace("https://dentalfinancepartners.co.uk", "")


def main():
    W = 110
    print("=" * W)
    print("  GSC ANALYSIS — Dental Finance Partners")
    print(f"  Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * W)

    service = get_gsc_service()

    print("\n[1/4] Fetching page-level data...")
    page_rows = fetch_data(service, ["page"], days=28)
    print(f"  Pages with data: {len(page_rows)}")

    print("[2/4] Fetching query-level data...")
    query_rows = fetch_data(service, ["query"], days=28)
    print(f"  Queries: {len(query_rows)}")

    print("[3/4] Fetching page+query data...")
    pq_rows = fetch_data(service, ["page", "query"], days=28)
    print(f"  Page-query pairs: {len(pq_rows)}")

    print("[4/4] Fetching country breakdown...")
    country_rows = fetch_data(service, ["country"], days=28)
    print(f"  Countries: {len(country_rows)}")

    raw_data = {
        "fetched_at": datetime.now().isoformat(),
        "site": SITE_URL,
        "pages": page_rows,
        "queries": query_rows,
        "page_queries": pq_rows,
        "countries": country_rows,
    }
    output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gsc_dentists_data.json")
    with open(output_path, "w") as f:
        json.dump(raw_data, f, indent=2)
    print(f"\n  Raw data saved to: {output_path}")

    # ---- ALL PAGES ----
    page_rows.sort(key=lambda r: r.get("impressions", 0), reverse=True)
    print("\n" + "=" * W)
    print("  ALL PAGES WITH SEARCH VISIBILITY")
    print("=" * W)
    print(f"  {'URL':<72} {'Impr':>6} {'Clicks':>6} {'Pos':>6} {'CTR':>7}")
    print("  " + "-" * (W - 4))

    total_imp = total_clk = 0
    for row in page_rows:
        url = short_url(row["keys"][0])
        if len(url) > 70:
            url = url[:67] + "..."
        imp = row.get("impressions", 0)
        clk = row.get("clicks", 0)
        pos = row.get("position", 0)
        ctr = row.get("ctr", 0)
        total_imp += imp
        total_clk += clk
        print(f"  {url:<72} {imp:>6} {clk:>6} {pos:>6.1f} {ctr:>6.2%}")

    print("  " + "-" * (W - 4))
    print(f"  {'TOTAL':<72} {total_imp:>6} {total_clk:>6}")

    # ---- COUNTRY BREAKDOWN ----
    country_rows.sort(key=lambda r: r.get("impressions", 0), reverse=True)
    print("\n" + "=" * W)
    print("  COUNTRY BREAKDOWN")
    print("=" * W)
    print(f"  {'Country':<20} {'Impr':>8} {'Clicks':>8} {'Pos':>8} {'CTR':>8} {'% Impr':>8}")
    print("  " + "-" * 62)
    for row in country_rows[:15]:
        c = row["keys"][0]
        imp = row.get("impressions", 0)
        clk = row.get("clicks", 0)
        pos = row.get("position", 0)
        ctr = row.get("ctr", 0)
        pct = (imp / total_imp * 100) if total_imp > 0 else 0
        print(f"  {c:<20} {imp:>8} {clk:>8} {pos:>8.1f} {ctr:>7.2%} {pct:>7.1f}%")

    # ---- QUICK WINS ----
    print("\n" + "=" * W)
    print("  QUICK WINS: Pages on page 2-3 (position 8-30) with 5+ impressions")
    print("=" * W)
    qw = [r for r in page_rows if r.get("impressions", 0) >= 5 and 8 <= r.get("position", 0) <= 30]
    if qw:
        for row in qw:
            url = short_url(row["keys"][0])
            if len(url) > 70:
                url = url[:67] + "..."
            print(f"  {url:<72} {row['impressions']:>4} imp  Pos {row['position']:>5.1f}  CTR {row['ctr']:.2%}")
    else:
        print("  (none yet)")

    # ---- CTR PROBLEMS ----
    print("\n" + "=" * W)
    print("  CTR PROBLEMS: 10+ impressions but 0 clicks")
    print("=" * W)
    ctr_prob = [r for r in page_rows if r.get("impressions", 0) >= 10 and r.get("clicks", 0) == 0]
    if ctr_prob:
        for row in ctr_prob:
            url = short_url(row["keys"][0])
            if len(url) > 70:
                url = url[:67] + "..."
            print(f"  {url:<72} {row['impressions']:>4} imp  Pos {row['position']:>5.1f}")
    else:
        print("  (none)")

    # ---- TOP PERFORMERS ----
    print("\n" + "=" * W)
    print("  TOP PERFORMERS: Pages getting clicks")
    print("=" * W)
    clickers = [r for r in page_rows if r.get("clicks", 0) > 0]
    if clickers:
        for row in clickers:
            url = short_url(row["keys"][0])
            if len(url) > 70:
                url = url[:67] + "..."
            print(f"  {url:<72} {row['impressions']:>4} imp  {row['clicks']:>3} clk  Pos {row['position']:>5.1f}  CTR {row['ctr']:.2%}")
    else:
        print("  (no clicks yet)")

    # ---- TOP QUERIES ----
    query_rows.sort(key=lambda r: r.get("impressions", 0), reverse=True)
    print("\n" + "=" * W)
    print("  TOP QUERIES (what people searched)")
    print("=" * W)
    print(f"  {'Query':<60} {'Impr':>6} {'Clicks':>6} {'Pos':>6} {'CTR':>7}")
    print("  " + "-" * 91)
    for row in query_rows[:50]:
        q = row["keys"][0]
        if len(q) > 58:
            q = q[:55] + "..."
        print(f"  {q:<60} {row['impressions']:>6} {row['clicks']:>6} {row['position']:>6.1f} {row['ctr']:>6.2%}")

    # ---- CANNIBALIZATION: queries hitting multiple pages ----
    print("\n" + "=" * W)
    print("  CANNIBALIZATION: Queries appearing on 2+ pages")
    print("=" * W)
    query_pages = {}
    for row in pq_rows:
        q = row["keys"][1]
        page = short_url(row["keys"][0])
        imp = row.get("impressions", 0)
        pos = row.get("position", 0)
        if q not in query_pages:
            query_pages[q] = []
        query_pages[q].append({"page": page, "impressions": imp, "position": pos})

    cannibal = {q: pages for q, pages in query_pages.items() if len(pages) >= 2}
    cannibal_sorted = sorted(cannibal.items(), key=lambda x: sum(p["impressions"] for p in x[1]), reverse=True)
    if cannibal_sorted:
        for q, pages in cannibal_sorted[:30]:
            total_q_imp = sum(p["impressions"] for p in pages)
            print(f"\n  Query: \"{q}\" ({total_q_imp} total imp, {len(pages)} pages)")
            for p in sorted(pages, key=lambda x: x["position"]):
                pg = p["page"]
                if len(pg) > 68:
                    pg = pg[:65] + "..."
                print(f"    {pg:<70} {p['impressions']:>4} imp  Pos {p['position']:>5.1f}")
    else:
        print("  (no multi-page queries yet)")

    # ---- SUMMARY ----
    print("\n" + "=" * W)
    print("  SUMMARY")
    print("=" * W)
    print(f"  Total impressions (28 days):    {total_imp}")
    print(f"  Total clicks (28 days):         {total_clk}")
    print(f"  Pages with visibility:          {len(page_rows)}")
    print(f"  Unique queries:                 {len(query_rows)}")
    print(f"  Cannibalized queries (2+ pages):{len(cannibal_sorted)}")
    gb_imp = sum(r.get("impressions", 0) for r in country_rows if r["keys"][0] == "gbr")
    us_imp = sum(r.get("impressions", 0) for r in country_rows if r["keys"][0] == "usa")
    print(f"  UK impressions:                 {gb_imp} ({gb_imp/total_imp*100:.1f}%)" if total_imp else "")
    print(f"  US impressions:                 {us_imp} ({us_imp/total_imp*100:.1f}%)" if total_imp else "")
    print("=" * W)


if __name__ == "__main__":
    main()
