"""Quick analysis of GSC data for the Property site."""
import os
import sys
import httpx

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from dotenv import load_dotenv
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
}

r = httpx.get(
    f"{SUPABASE_URL}/rest/v1/gsc_page_performance",
    headers=headers,
    params={
        "niche": "eq.property",
        "select": "page_url,date,impressions,clicks,ctr,position",
        "order": "impressions.desc",
    },
    timeout=15.0,
)
r.raise_for_status()
data = r.json()
print(f"Total records in Supabase: {len(data)}")

pages = {}
for row in data:
    p = row["page_url"]
    if p not in pages:
        pages[p] = {"impressions": 0, "clicks": 0, "positions": [], "ctrs": [], "dates": []}
    pages[p]["impressions"] += row["impressions"]
    pages[p]["clicks"] += row["clicks"]
    pages[p]["positions"].append(row["position"])
    pages[p]["ctrs"].append(row["ctr"])
    pages[p]["dates"].append(row["date"])

print(f"Unique pages with GSC data: {len(pages)}")
print()

sorted_pages = sorted(pages.items(), key=lambda x: x[1]["impressions"], reverse=True)

col_url = "URL"
col_imp = "Impr"
col_clk = "Clicks"
col_pos = "Avg Pos"
col_ctr = "CTR"

print("=" * 110)
print(f"  {col_url:<75} {col_imp:>6} {col_clk:>6} {col_pos:>8} {col_ctr:>7}")
print("=" * 110)

total_impressions = 0
total_clicks = 0
for url_path, d in sorted_pages:
    avg_pos = sum(d["positions"]) / len(d["positions"]) if d["positions"] else 0
    avg_ctr = sum(d["ctrs"]) / len(d["ctrs"]) if d["ctrs"] else 0
    short_url = url_path.replace("https://www.propertytaxpartners.co.uk", "")
    short_url = short_url.replace("https://propertytaxpartners.co.uk", "")
    if len(short_url) > 72:
        short_url = short_url[:69] + "..."
    total_impressions += d["impressions"]
    total_clicks += d["clicks"]
    ctr_str = f"{avg_ctr:.2%}"
    print(f"  {short_url:<75} {d['impressions']:>6} {d['clicks']:>6} {avg_pos:>8.1f} {ctr_str:>7}")

print("=" * 110)
print(f"  {'TOTAL':<75} {total_impressions:>6} {total_clicks:>6}")
print()

all_dates = sorted(set(row["date"] for row in data))
print(f"Date range: {min(all_dates)} to {max(all_dates)}")
print(f"Days of data: {len(all_dates)}")

print()
print("=" * 110)
print("  QUICK WINS: Posts with 5+ impressions, position 8-30 (close to page 1)")
print("=" * 110)
quick_wins = []
for url_path, d in sorted_pages:
    avg_pos = sum(d["positions"]) / len(d["positions"]) if d["positions"] else 0
    if d["impressions"] >= 5 and 8 <= avg_pos <= 30:
        avg_ctr = sum(d["ctrs"]) / len(d["ctrs"]) if d["ctrs"] else 0
        quick_wins.append((url_path, d, avg_pos, avg_ctr))

if quick_wins:
    for url_path, d, avg_pos, avg_ctr in quick_wins:
        short_url = url_path.replace("https://www.propertytaxpartners.co.uk", "")
        short_url = short_url.replace("https://propertytaxpartners.co.uk", "")
        if len(short_url) > 72:
            short_url = short_url[:69] + "..."
        ctr_str = f"{avg_ctr:.2%}"
        print(f"  {short_url:<75} {d['impressions']:>4} imp  Pos {avg_pos:>5.1f}  CTR {ctr_str}")
else:
    print("  (none found)")

print()
print("=" * 110)
print("  TOP PERFORMERS: Pages already getting clicks")
print("=" * 110)
top_clickers = [(u, d) for u, d in sorted_pages if d["clicks"] > 0]
if top_clickers:
    for url_path, d in top_clickers:
        avg_pos = sum(d["positions"]) / len(d["positions"]) if d["positions"] else 0
        avg_ctr = sum(d["ctrs"]) / len(d["ctrs"]) if d["ctrs"] else 0
        short_url = url_path.replace("https://www.propertytaxpartners.co.uk", "")
        short_url = short_url.replace("https://propertytaxpartners.co.uk", "")
        if len(short_url) > 72:
            short_url = short_url[:69] + "..."
        ctr_str = f"{avg_ctr:.2%}"
        print(f"  {short_url:<75} {d['impressions']:>4} imp  {d['clicks']:>3} clicks  Pos {avg_pos:>5.1f}  CTR {ctr_str}")
else:
    print("  (no clicks yet)")

print()
print("=" * 110)
print("  HIGH IMPRESSIONS / ZERO CLICKS (CTR problem — content may not match intent)")
print("=" * 110)
ctr_problems = [(u, d) for u, d in sorted_pages if d["impressions"] >= 10 and d["clicks"] == 0]
if ctr_problems:
    for url_path, d in ctr_problems:
        avg_pos = sum(d["positions"]) / len(d["positions"]) if d["positions"] else 0
        short_url = url_path.replace("https://www.propertytaxpartners.co.uk", "")
        short_url = short_url.replace("https://propertytaxpartners.co.uk", "")
        if len(short_url) > 72:
            short_url = short_url[:69] + "..."
        print(f"  {short_url:<75} {d['impressions']:>4} imp  Pos {avg_pos:>5.1f}  0 clicks")
else:
    print("  (none found)")

print()
est_invisible = 85 - len(pages)
print(f"Posts with NO GSC data at all (not appearing in search): ~{est_invisible} of 85")
print()
