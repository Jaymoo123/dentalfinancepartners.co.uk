# R4 domain availability check: Nominet RDAP (.co.uk) + rdap.org (.com), DNS fallback.
import json, socket, sys, urllib.request, urllib.error
from datetime import datetime, timezone

CANDIDATES = [
    "pharmacyfinancepartners", "pharmacytaxpartners", "pharmacytaxspecialists",
    "pharmacistfinancepartners", "pharmacisttaxpartners", "dispensaryfinancepartners",
    "pharmacyfinancespecialists", "pharmacyaccountspartners", "communitypharmacyaccountants",
    "dispensingfinancepartners", "pharmacistaccountspartners", "communitypharmacyfinance",
]

def rdap(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": "r4-check"}), timeout=15) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:
        return f"ERR:{e}"

def dns_exists(domain):
    try:
        socket.getaddrinfo(domain, None)
        return True
    except socket.gaierror:
        return False

def check(name):
    couk = f"{name}.co.uk"
    st_uk = rdap(f"https://rdap.nominet.uk/uk/domain/{couk}")
    st_com = rdap(f"https://rdap.org/domain/{name}.com")
    return {
        "name": name,
        "couk_rdap": st_uk,
        "couk_available": st_uk == 404 if isinstance(st_uk, int) else not dns_exists(couk),
        "com_rdap": st_com,
        "com_available": st_com == 404 if isinstance(st_com, int) else None,
        "checked_at": datetime.now(timezone.utc).isoformat(),
    }

if __name__ == "__main__":
    # sanity: known-registered domain must return 200
    sanity = rdap("https://rdap.nominet.uk/uk/domain/propertytaxpartners.co.uk")
    print(f"sanity propertytaxpartners.co.uk RDAP = {sanity}", file=sys.stderr)
    assert sanity == 200, "Nominet RDAP sanity check failed - do not trust 404s"
    results = [check(n) for n in CANDIDATES]
    print(json.dumps(results, indent=2))
