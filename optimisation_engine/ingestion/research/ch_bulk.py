"""Companies House Basic Company Data bulk snapshot -> SPV regional aggregates.

Downloads (or reads) the monthly "one file" bulk CSV, streams it without
extracting to disk, filters to the SPV-relevant SIC codes, and writes the
committed regional summary consumed by the Property SPV lane (lane C) plus a
scratch harvest CSV of the raw matching rows for later ad-hoc work.

Run:
    python -m optimisation_engine.ingestion.research.ch_bulk --self-test
    python -m optimisation_engine.ingestion.research.ch_bulk --month 2026-09 --dry-run
    python -m optimisation_engine.ingestion.research.ch_bulk --month 2026-09
    python -m optimisation_engine.ingestion.research.ch_bulk --month 2026-09 --zip-path <existing.zip>
"""
from __future__ import annotations

import argparse
import csv
import io
import json
import os
import shutil
import sys
import tempfile
import zipfile
from collections import defaultdict
from datetime import date, datetime

import httpx

BULK_URL = "http://download.companieshouse.gov.uk/BasicCompanyDataAsOneFile-{ym}-01.zip"

SPV_SIC_CODES = ("68100", "68201", "68209", "68320")

SCRATCH_ROOT = (
    r"C:\Users\user\AppData\Local\Temp\claude\C--Users-user-Documents-Accounting"
    r"\1271a392-7714-458c-be80-7d1b57635018\scratchpad"
)

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
OUTPUT_JSON = os.path.join(REPO_ROOT, "Property", "web", "src", "data", "spv-regional.json")

ITL1_REGIONS = [
    "North East",
    "North West",
    "Yorkshire and The Humber",
    "East Midlands",
    "West Midlands",
    "East of England",
    "London",
    "South East",
    "South West",
    "Wales",
    "Scotland",
    "Northern Ireland",
    "Other / unknown",
]

# ponytail: postcode-area mapping; areas straddling region boundaries misplace
# a small share. Upgrade to ONS NSPL district lookup only if a boundary
# complaint lands.
POSTCODE_AREA_REGION: dict[str, str] = {
    # North East
    "DH": "North East", "DL": "North East", "NE": "North East", "SR": "North East", "TS": "North East",
    # North West
    "BB": "North West", "BL": "North West", "CA": "North West", "CH": "North West", "CW": "North West",
    "FY": "North West", "L": "North West", "LA": "North West", "M": "North West", "OL": "North West",
    "PR": "North West", "SK": "North West", "WA": "North West", "WN": "North West",
    # Yorkshire and The Humber
    "BD": "Yorkshire and The Humber", "DN": "Yorkshire and The Humber", "HD": "Yorkshire and The Humber",
    "HG": "Yorkshire and The Humber", "HU": "Yorkshire and The Humber", "HX": "Yorkshire and The Humber",
    "LS": "Yorkshire and The Humber", "S": "Yorkshire and The Humber", "WF": "Yorkshire and The Humber",
    "YO": "Yorkshire and The Humber",
    # East Midlands
    "DE": "East Midlands", "LE": "East Midlands", "LN": "East Midlands", "NG": "East Midlands",
    "NN": "East Midlands",
    # West Midlands
    "B": "West Midlands", "CV": "West Midlands", "DY": "West Midlands", "HR": "West Midlands",
    "ST": "West Midlands", "TF": "West Midlands", "WR": "West Midlands", "WS": "West Midlands",
    "WV": "West Midlands",
    # East of England
    "AL": "East of England", "CB": "East of England", "CM": "East of England", "CO": "East of England",
    "IP": "East of England", "LU": "East of England", "MK": "East of England", "NR": "East of England",
    "PE": "East of England", "SG": "East of England", "SS": "East of England",
    # London
    "E": "London", "EC": "London", "N": "London", "NW": "London", "SE": "London", "SW": "London",
    "W": "London", "WC": "London", "BR": "London", "CR": "London", "DA": "London", "EN": "London",
    "HA": "London", "IG": "London", "KT": "London", "RM": "London", "SM": "London", "TW": "London",
    "UB": "London",
    # South East
    "BN": "South East", "GU": "South East", "ME": "South East", "MK": "South East", "OX": "South East",
    "PO": "South East", "RG": "South East", "RH": "South East", "SL": "South East", "SO": "South East",
    "TN": "South East", "GY": "South East",  # placeholder overwritten below by Channel Islands special-case
    # South West
    "BA": "South West", "BH": "South West", "BS": "South West", "DT": "South West", "EX": "South West",
    "GL": "South West", "PL": "South West", "SN": "South West", "SP": "South West", "TA": "South West",
    "TQ": "South West", "TR": "South West",
    # Wales
    "CF": "Wales", "LD": "Wales", "LL": "Wales", "NP": "Wales", "SA": "Wales", "SY": "Wales",
    # Scotland
    "AB": "Scotland", "DD": "Scotland", "DG": "Scotland", "EH": "Scotland", "FK": "Scotland",
    "G": "Scotland", "HS": "Scotland", "IV": "Scotland", "KA": "Scotland", "KW": "Scotland",
    "KY": "Scotland", "ML": "Scotland", "PA": "Scotland", "PH": "Scotland", "TD": "Scotland",
    "ZE": "Scotland",
    # Northern Ireland
    "BT": "Northern Ireland",
}
# Channel Islands and Isle of Man are NOT UK ITL1 regions -> bucket as Other.
# (Fix GY placeholder above: GY/JE/IM fall through to "Other / unknown".)
del POSTCODE_AREA_REGION["GY"]
CROWN_DEPENDENCY_AREAS = {"GY", "JE", "IM"}

OTHER_BUCKET = "Other / unknown"


def bulk_url(ym: str) -> str:
    return BULK_URL.format(ym=ym)


def outward_area(postcode: str) -> str:
    """Leading letters of a UK postcode outward code, e.g. 'SW1A 1AA' -> 'SW'."""
    pc = (postcode or "").strip().upper()
    if not pc:
        return ""
    outward = pc.split(" ")[0] if " " in pc else pc[:-3] if len(pc) > 3 else pc
    area = ""
    for ch in outward:
        if ch.isalpha():
            area += ch
        else:
            break
    return area


def region_for_postcode(postcode: str) -> str:
    area = outward_area(postcode)
    if not area:
        return OTHER_BUCKET
    if area in CROWN_DEPENDENCY_AREAS:
        return OTHER_BUCKET
    return POSTCODE_AREA_REGION.get(area, OTHER_BUCKET)


def normalise_headers(fieldnames: list[str]) -> dict[str, str]:
    """Map stripped header -> original header (CH bulk has stray leading spaces)."""
    return {name.strip(): name for name in fieldnames}


def sic_matches(value: str) -> bool:
    v = (value or "").strip()
    if len(v) < 5:
        return False
    prefix = v[:5]
    if not prefix.isdigit() or prefix not in SPV_SIC_CODES:
        return False
    rest = v[5:]
    return rest == "" or rest[0] in (" ", "-")


def parse_incorporation_month(raw: str) -> str | None:
    """CH bulk date format is DD/MM/YYYY -> 'YYYY-MM'."""
    raw = (raw or "").strip()
    if not raw:
        return None
    try:
        d, m, y = raw.split("/")
        return f"{int(y):04d}-{int(m):02d}"
    except ValueError:
        return None


def last_n_complete_months(n: int, today: date | None = None) -> list[str]:
    today = today or date.today()
    y, m = today.year, today.month
    m -= 1
    if m == 0:
        y, m = y - 1, 12
    out = []
    for _ in range(n):
        out.append(f"{y:04d}-{m:02d}")
        m -= 1
        if m == 0:
            y, m = y - 1, 12
    out.reverse()
    return out


class Aggregator:
    """Streams filtered rows and builds the region/age/attrition aggregates."""

    def __init__(self) -> None:
        self.filtered_rows = 0
        self.region_total: dict[str, int] = defaultdict(int)
        self.region_monthly: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
        self.age_profile: dict[int, int] = defaultdict(int)
        self.attrition: dict[str, int] = defaultdict(int)
        for r in ITL1_REGIONS:
            self.region_total[r] = 0

    def add(self, region: str, inc_month: str | None) -> None:
        self.filtered_rows += 1
        self.region_total[region] += 1
        if inc_month:
            self.region_monthly[region][inc_month] += 1
            self.attrition[inc_month] += 1
            self.age_profile[int(inc_month[:4])] += 1

    def build(self, snapshot_ym: str) -> dict:
        # Anchor at the snapshot month itself: a file dated YYYY-MM-01 carries
        # roughly one day of that month, so the last COMPLETE month is the one
        # before it, not the snapshot month.
        y, m = int(snapshot_ym[:4]), int(snapshot_ym[5:7])
        months_36 = last_n_complete_months(36, today=date(y, m, 1))
        months_12 = set(months_36[-12:])
        total = self.filtered_rows
        grand_last12m = sum(
            sum(self.region_monthly.get(r, {}).get(mth, 0) for mth in months_12)
            for r in ITL1_REGIONS
        )

        regions_out = []
        for region in ITL1_REGIONS:
            total_live = self.region_total.get(region, 0)
            monthly_all = self.region_monthly.get(region, {})
            monthly = [{"month": mth, "count": monthly_all.get(mth, 0)} for mth in months_36]
            last12m = sum(monthly_all.get(mth, 0) for mth in months_12)
            share = round((last12m / grand_last12m * 100), 2) if grand_last12m else 0.0
            regions_out.append(
                {
                    "region": region,
                    "total_live": total_live,
                    "last12m": last12m,
                    "share_last12m_pct": share,
                    "monthly": monthly,
                }
            )

        others = [r for r in regions_out if r["region"] == OTHER_BUCKET]
        rest = [r for r in regions_out if r["region"] != OTHER_BUCKET]
        rest.sort(key=lambda r: r["total_live"], reverse=True)
        regions_out = rest + others

        age_profile = [{"year": y, "count": c} for y, c in sorted(self.age_profile.items())]
        attrition = [{"month": mth, "bulk_count": self.attrition.get(mth, 0)} for mth in months_36]

        return {
            "meta": {
                "bulk_snapshot_date": f"{snapshot_ym}-01",
                "generated_at": date.today().isoformat(),
                "source": "Companies House Basic Company Data (bulk), Open Government Licence v3.0",
                "sic_codes": list(SPV_SIC_CODES),
                "postcode_region_map": "121 postcode areas -> ITL1 v1",
                "notes": (
                    "Live register only: dissolved companies are absent, so monthly "
                    "incorporation counts here are survivorship-affected and lower "
                    "than the gross Advanced Search series."
                ),
            },
            "regions": regions_out,
            "age_profile": age_profile,
            "attrition": attrition,
            "totals": {"filtered_rows": total, "live_total": total},
        }


def _first_of_next_month(ym: str) -> date:
    y, m = (int(x) for x in ym.split("-"))
    m += 1
    if m == 13:
        y, m = y + 1, 1
    return date(y, m, 1)


HARVEST_FIELDS = [
    "CompanyNumber",
    "CompanyName",
    "RegAddress.AddressLine1",
    "RegAddress.PostTown",
    "RegAddress.PostCode",
    "IncorporationDate",
    "CompanyStatus",
    "ConfStmtNextDueDate",
    "SicText_1",
]


def stream_filter(
    reader: csv.DictReader,
    harvest_writer: csv.DictWriter,
    agg: Aggregator,
    on_row=None,
) -> None:
    """Consume `reader`, write matches to `harvest_writer`, aggregate into `agg`.

    `on_row(n)` is called after every row (n = rows scanned so far) so the
    caller can print progress without duplicating the filter loop.
    """
    header_map = normalise_headers(reader.fieldnames or [])

    def get(row: dict, key: str) -> str:
        orig = header_map.get(key)
        return row.get(orig, "") if orig else ""

    sic_keys = [f"SICCode.SicText_{i}" for i in range(1, 5)]

    n = 0
    for row in reader:
        n += 1
        matched = False
        for k in sic_keys:
            if sic_matches(get(row, k)):
                matched = True
                break
        if matched:
            postcode = get(row, "RegAddress.PostCode")
            region = region_for_postcode(postcode)
            inc_month = parse_incorporation_month(get(row, "IncorporationDate"))
            agg.add(region, inc_month)

            harvest_writer.writerow(
                {
                    "CompanyNumber": get(row, "CompanyNumber"),
                    "CompanyName": get(row, "CompanyName"),
                    "RegAddress.AddressLine1": get(row, "RegAddress.AddressLine1"),
                    "RegAddress.PostTown": get(row, "RegAddress.PostTown"),
                    "RegAddress.PostCode": postcode,
                    "IncorporationDate": get(row, "IncorporationDate"),
                    "CompanyStatus": get(row, "CompanyStatus"),
                    "ConfStmtNextDueDate": get(row, "ConfStmtNextDueDate"),
                    "SicText_1": get(row, "SICCode.SicText_1"),
                }
            )
        if on_row:
            on_row(n)


def find_inner_csv(zf: zipfile.ZipFile) -> str:
    names = [n for n in zf.namelist() if n.lower().endswith(".csv")]
    if not names:
        raise RuntimeError("No CSV found inside the bulk zip")
    return names[0]


def self_check(payload: dict) -> None:
    total = payload["totals"]["filtered_rows"]
    assert payload["totals"]["live_total"] == total, "filtered_rows != live_total"

    region_sum = sum(r["total_live"] for r in payload["regions"])
    assert region_sum == total, f"region total_live sum {region_sum} != filtered_rows {total}"

    seen = {r["region"] for r in payload["regions"]}
    assert seen == set(ITL1_REGIONS), f"region set mismatch: {seen} vs {set(ITL1_REGIONS)}"

    for r in payload["regions"]:
        for m in r["monthly"]:
            datetime.strptime(m["month"], "%Y-%m")

    share_sum = sum(r["share_last12m_pct"] for r in payload["regions"])
    if total:
        assert abs(share_sum - 100.0) < 0.1, f"shares sum to {share_sum}, not ~100.0"


def write_json_atomic(payload: dict, path: str) -> None:
    self_check(payload)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    fd, tmp_path = tempfile.mkstemp(suffix=".json", dir=os.path.dirname(path))
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2)
        shutil.move(tmp_path, path)
    except Exception:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise


def run_self_test() -> None:
    print("[self-test] building synthetic CSV in memory ...", flush=True)
    fieldnames = [
        "CompanyNumber",
        " CompanyName",  # leading-space header
        "RegAddress.AddressLine1",
        "RegAddress.PostTown",
        "RegAddress.PostCode",
        "IncorporationDate",
        "CompanyStatus",
        "ConfStmtNextDueDate",
        "SICCode.SicText_1",
        "SICCode.SicText_2",
        "SICCode.SicText_3",
        "SICCode.SicText_4",
    ]
    rows = [
        # multi-SIC row: match is in slot 2
        {
            "CompanyNumber": "001", " CompanyName": "ALPHA SPV LTD",
            "RegAddress.AddressLine1": "1 High St", "RegAddress.PostTown": "LONDON",
            "RegAddress.PostCode": "EC1A 1AA", "IncorporationDate": "15/03/2024",
            "CompanyStatus": "Active", "ConfStmtNextDueDate": "15/03/2027",
            "SICCode.SicText_1": "70100 - Head offices",
            "SICCode.SicText_2": "68209 - Other letting and operating of own or leased real estate",
            "SICCode.SicText_3": "", "SICCode.SicText_4": "",
        },
        # non-matching lookalike SIC (should NOT match)
        {
            "CompanyNumber": "002", " CompanyName": "BETA TRADING LTD",
            "RegAddress.AddressLine1": "2 Low St", "RegAddress.PostTown": "MANCHESTER",
            "RegAddress.PostCode": "M1 1AA", "IncorporationDate": "01/01/2023",
            "CompanyStatus": "Active", "ConfStmtNextDueDate": "01/01/2027",
            "SICCode.SicText_1": "46820 - Not a real match", "SICCode.SicText_2": "",
            "SICCode.SicText_3": "", "SICCode.SicText_4": "",
        },
        # blank postcode
        {
            "CompanyNumber": "003", " CompanyName": "GAMMA HOLDINGS LTD",
            "RegAddress.AddressLine1": "3 No St", "RegAddress.PostTown": "",
            "RegAddress.PostCode": "", "IncorporationDate": "10/06/2022",
            "CompanyStatus": "Active", "ConfStmtNextDueDate": "10/06/2027",
            "SICCode.SicText_1": "68100 - Buying and selling of own real estate",
            "SICCode.SicText_2": "", "SICCode.SicText_3": "", "SICCode.SicText_4": "",
        },
        # BT postcode -> Northern Ireland
        {
            "CompanyNumber": "004", " CompanyName": "DELTA PROPERTY LTD",
            "RegAddress.AddressLine1": "4 Belfast Rd", "RegAddress.PostTown": "BELFAST",
            "RegAddress.PostCode": "BT1 1AA", "IncorporationDate": "20/09/2021",
            "CompanyStatus": "Active", "ConfStmtNextDueDate": "20/09/2027",
            "SICCode.SicText_1": "68320 - Management of real estate on a fee or contract basis",
            "SICCode.SicText_2": "", "SICCode.SicText_3": "", "SICCode.SicText_4": "",
        },
        # latin-1 char in name
        {
            "CompanyNumber": "005", " CompanyName": "CAF\xc9 PROPERTIES LTD",
            "RegAddress.AddressLine1": "5 Cote St", "RegAddress.PostTown": "BRISTOL",
            "RegAddress.PostCode": "BS1 1AA", "IncorporationDate": "05/05/2020",
            "CompanyStatus": "Active", "ConfStmtNextDueDate": "05/05/2027",
            "SICCode.SicText_1": "68201 - Renting and operating of Housing Association real estate",
            "SICCode.SicText_2": "", "SICCode.SicText_3": "", "SICCode.SicText_4": "",
        },
        # Crown dependency postcode -> Other/unknown
        {
            "CompanyNumber": "006", " CompanyName": "EPSILON CI LTD",
            "RegAddress.AddressLine1": "6 Harbour Rd", "RegAddress.PostTown": "ST PETER PORT",
            "RegAddress.PostCode": "GY1 1AA", "IncorporationDate": "01/02/2024",
            "CompanyStatus": "Active", "ConfStmtNextDueDate": "01/02/2027",
            "SICCode.SicText_1": "68100 - Buying and selling of own real estate",
            "SICCode.SicText_2": "", "SICCode.SicText_3": "", "SICCode.SicText_4": "",
        },
        # Scotland match
        {
            "CompanyNumber": "007", " CompanyName": "ZETA SCOTLAND LTD",
            "RegAddress.AddressLine1": "7 Union St", "RegAddress.PostTown": "EDINBURGH",
            "RegAddress.PostCode": "EH1 1AA", "IncorporationDate": "12/12/2019",
            "CompanyStatus": "Active", "ConfStmtNextDueDate": "12/12/2027",
            "SICCode.SicText_1": "68209 - Other letting and operating of own or leased real estate",
            "SICCode.SicText_2": "", "SICCode.SicText_3": "", "SICCode.SicText_4": "",
        },
        # no SIC match at all in any of the 4 slots
        {
            "CompanyNumber": "008", " CompanyName": "ETA UNRELATED LTD",
            "RegAddress.AddressLine1": "8 None St", "RegAddress.PostTown": "LEEDS",
            "RegAddress.PostCode": "LS1 1AA", "IncorporationDate": "01/01/2024",
            "CompanyStatus": "Active", "ConfStmtNextDueDate": "01/01/2027",
            "SICCode.SicText_1": "01110 - Farming", "SICCode.SicText_2": "",
            "SICCode.SicText_3": "", "SICCode.SicText_4": "",
        },
    ]

    buf = io.StringIO()
    w = csv.DictWriter(buf, fieldnames=fieldnames)
    w.writeheader()
    for r in rows:
        w.writerow(r)
    buf.seek(0)

    reader = csv.DictReader(buf)
    harvest_buf = io.StringIO()
    hw = csv.DictWriter(harvest_buf, fieldnames=HARVEST_FIELDS)
    hw.writeheader()
    agg = Aggregator()
    stream_filter(reader, hw, agg)

    payload = agg.build(snapshot_ym="2024-06")

    assert agg.filtered_rows == 6, f"expected 6 matches, got {agg.filtered_rows}"
    region_map = {r["region"]: r["total_live"] for r in payload["regions"]}
    assert region_map["London"] == 1, region_map
    assert region_map["Northern Ireland"] == 1, region_map
    assert region_map["South West"] == 1, region_map
    assert region_map["Scotland"] == 1, region_map
    # blank postcode (row 003) and GY (row 006) both land in Other -> 2
    assert region_map[OTHER_BUCKET] == 2, region_map

    self_check(payload)

    harvest_buf.seek(0)
    harvest_rows = list(csv.DictReader(harvest_buf))
    assert len(harvest_rows) == 6, len(harvest_rows)
    names = {r["CompanyName"] for r in harvest_rows}
    assert "CAF\xc9 PROPERTIES LTD" in names, names

    print(f"[self-test] filtered_rows={agg.filtered_rows}  regions={region_map}", flush=True)
    print("[self-test] PASS", flush=True)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--month", help="YYYY-MM snapshot month (bulk file is published on the 1st)")
    ap.add_argument("--dry-run", action="store_true", help="Print URL + HEAD-check only, no download")
    ap.add_argument("--zip-path", help="Use an existing zip instead of downloading")
    ap.add_argument("--self-test", action="store_true", help="Run the synthetic in-memory self-test and exit")
    args = ap.parse_args()

    if args.self_test:
        run_self_test()
        return

    if not args.month:
        ap.error("--month is required unless --self-test")

    url = bulk_url(args.month)

    if args.dry_run:
        print(f"[dry-run] URL: {url}", flush=True)
        r = httpx.head(url, timeout=30.0, follow_redirects=True)
        print(f"[dry-run] HEAD status={r.status_code} content-length={r.headers.get('content-length', '?')}", flush=True)
        return

    os.makedirs(SCRATCH_ROOT, exist_ok=True)
    scratch_dir = tempfile.mkdtemp(dir=SCRATCH_ROOT)
    zip_path = args.zip_path
    downloaded = False

    try:
        if not zip_path:
            zip_path = os.path.join(scratch_dir, f"ch_bulk_{args.month}.zip")
            print(f"[download] {url}", flush=True)
            print(f"[download] -> {zip_path}", flush=True)
            with httpx.stream("GET", url, timeout=None, follow_redirects=True) as resp:
                resp.raise_for_status()
                total = int(resp.headers.get("content-length", 0))
                written = 0
                with open(zip_path, "wb") as f:
                    for chunk in resp.iter_bytes(chunk_size=1 << 20):
                        f.write(chunk)
                        written += len(chunk)
                        if total:
                            print(f"\r[download] {written / 1e6:.1f} / {total / 1e6:.1f} MB", end="", flush=True)
            print(flush=True)
            downloaded = True

        harvest_path = os.path.join(SCRATCH_ROOT, f"spv_harvest_{args.month}.csv")
        agg = Aggregator()

        print(f"[parse] opening {zip_path}", flush=True)
        with zipfile.ZipFile(zip_path) as zf:
            inner = find_inner_csv(zf)
            print(f"[parse] inner CSV: {inner}", flush=True)
            with zf.open(inner) as raw, io.TextIOWrapper(raw, encoding="latin-1", newline="") as text:
                reader = csv.DictReader(text)
                with open(harvest_path, "w", newline="", encoding="utf-8") as hf:
                    hw = csv.DictWriter(hf, fieldnames=HARVEST_FIELDS)
                    hw.writeheader()

                    def progress(n: int) -> None:
                        if n % 200000 == 0:
                            print(f"[parse] {n} rows scanned, {agg.filtered_rows} matched", flush=True)

                    stream_filter(reader, hw, agg, on_row=progress)

        print(f"[parse] done: {agg.filtered_rows} matched rows", flush=True)
        print(f"[harvest] wrote {harvest_path} ({agg.filtered_rows} rows)", flush=True)

        payload = agg.build(snapshot_ym=args.month)
        write_json_atomic(payload, OUTPUT_JSON)
        print(f"[output] wrote {OUTPUT_JSON}", flush=True)

    finally:
        if downloaded and zip_path and os.path.exists(zip_path):
            os.remove(zip_path)
        if os.path.isdir(scratch_dir):
            try:
                os.rmdir(scratch_dir)
            except OSError:
                pass


if __name__ == "__main__":
    main()
