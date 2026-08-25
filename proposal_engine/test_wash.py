"""Self-check for export_raw_leads.wash(). Run: python test_wash.py"""
from export_raw_leads import wash


def lead(name, ts, source, email="", opted=""):
    l = {"id": name, "full_name": name, "created_at": ts}
    r = {"name": name, "source": source, "email": email, "phone": "",
         "opted_out": opted, "received": ts}
    return l, r


def main():
    pairs = [  # newest first, as the export builds them
        lead("New Property", "2026-08-14T10:00:00+00:00", "property"),
        lead("New Medical", "2026-08-01T10:00:00+00:00", "medical"),
        lead("Dupe New", "2026-07-30T10:00:00+00:00", "property", "d@e.com"),
        lead("Opted Out", "2026-07-29T10:00:00+00:00", "property", opted="OPTED OUT"),
        lead("Ali Fadlallah", "2026-07-22T11:14:00+00:00", "medical"),
        lead("Old Dentist", "2026-07-20T10:00:00+00:00", "dentists"),
        lead("Greg Todd", "2026-07-14T10:21:00+00:00", "property"),
        lead("Mid Property", "2026-07-01T10:00:00+00:00", "property"),
        lead("Julie-Anne Casey", "2026-06-26T14:00:00+00:00", "property"),
        lead("Old Property", "2026-06-01T10:00:00+00:00", "property"),
        lead("Dupe Old", "2026-05-01T10:00:00+00:00", "property", "d@e.com"),
    ]
    kept, rows = wash([l for l, _ in pairs], [r for _, r in pairs])
    got = [r["name"] for r in rows]
    assert got == ["New Property", "New Medical", "Dupe New", "Old Property"], got
    assert [l["full_name"] for l in kept] == got, "kept and rows must stay aligned"
    print("ok")


if __name__ == "__main__":
    main()
