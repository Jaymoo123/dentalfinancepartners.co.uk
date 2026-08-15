"""test_lanes.py: self-check for the two-lane claim model. Run: python scripts/test_lanes.py

Asserts the properties the lane split exists to guarantee, against a throwaway
copy of the CSVs (the real data/ is never touched):

  1. an adjacent claim never consumes an accounting slot
  2. the accounting lane still caps at claim_slots_per_lead
  3. the adjacent lane caps at adjacent_claim_slots_per_lead
  4. an accounting exclusive lock closes the accounting lane, not the adjacent one
  5. adjacent claims are billed at the flat adjacent price, not the lead's tier
  6. a firm cannot claim the same lead twice on the same lane
  7. both lanes are capped, so one enquirer's details reach a bounded number of
     firms. The legitimate interests assessment relies on that bound, so an
     uncapped lane is a failure, not a configuration choice.
"""
import csv
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tiers

SCRIPTS = Path(__file__).resolve().parent
ACC_CAP = tiers.claim_slots()
ADJ_CAP = tiers.adjacent_claim_slots()
ADJ_PRICE = tiers.tier_cfg("adjacent")["price"]


def claim(data_dir, lead, firm, *flags):
    """Run claim.py against a sandbox data dir. Returns (ok, output)."""
    r = subprocess.run([sys.executable, str(SCRIPTS / "claim.py"), lead, firm, *flags],
                       capture_output=True, text=True, env={**__import__("os").environ,
                                                            "LEAD_ENGINE_DATA": str(data_dir)})
    return r.returncode == 0, (r.stdout + r.stderr)


def rows(data_dir, name):
    with (data_dir / name).open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def lane_rows(data_dir, lead, lane):
    return [d for d in rows(data_dir, "deliveries.csv")
            if d["lead_id"] == lead and tiers.lane_of(d) == lane]


def main():
    src = tiers.DATA
    with tempfile.TemporaryDirectory() as tmp:
        sandbox = Path(tmp) / "data"
        shutil.copytree(src, sandbox)

        # A lead nobody has claimed, and firms on each lane.
        leads = [l for l in rows(sandbox, "leads.csv") if l["verified"] == "true"]
        claimed_ids = {d["lead_id"] for d in rows(sandbox, "deliveries.csv")}
        lead = next(l for l in leads if l["id"] not in claimed_ids)
        # Top the sandbox up to one firm beyond the larger cap so both caps can be
        # tested. Synthetic, sandbox-only: the tracked fixtures are not modified.
        firm_rows = rows(sandbox, "firms.csv")
        active = [f for f in firm_rows if f["status"] == "active"]
        acc = [f for f in active if tiers.ACCOUNTING in tiers.firm_professions(f)
               and f.get("dsa_signed_date")]
        assert ADJ_CAP is not None, ("the adjacent lane is uncapped: one enquirer's details "
                                     "could reach unlimited firms, which the LIA does not cover")
        while len(acc) < max(ACC_CAP, ADJ_CAP) + 1:
            n = len(firm_rows) + 1
            extra = {**firm_rows[0], "id": f"T{n:03d}", "firm_name": f"Test Firm {n}",
                     "email": f"test{n}@example.invalid", "professions": "accounting",
                     "dsa_signed_date": "2026-08-01",
                     "status": "active", "notes": "sandbox fixture"}
            firm_rows.append(extra); acc.append(extra)
        with (sandbox / "firms.csv").open("w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(firm_rows[0].keys()))
            w.writeheader(); w.writerows(firm_rows)

        lid = lead["id"]
        print(f"lead {lid} (tier {lead['tier']}), accounting cap {ACC_CAP}, "
              f"adjacent cap {tiers.adjacent_claim_slots()}")

        # 3 + 1 + 7: the adjacent lane fills to its own cap, rejects the next claim,
        # and never touches the accounting lane.
        for f in acc[:ADJ_CAP]:
            ok, out = claim(sandbox, lid, f["id"], "--adjacent")
            assert ok, f"adjacent claim {f['id']} rejected: {out}"
        ok, out = claim(sandbox, lid, acc[ADJ_CAP]["id"], "--adjacent")
        assert not ok and "slots" in out, f"adjacent cap not enforced: {out}"
        n_adj = len(lane_rows(sandbox, lid, tiers.ADJACENT))
        assert n_adj == ADJ_CAP, f"expected {ADJ_CAP} adjacent claims, got {n_adj}"
        assert not lane_rows(sandbox, lid, tiers.ACCOUNTING), "adjacent claims leaked into the accounting lane"
        print(f"  ok: adjacent lane filled to {ADJ_CAP}, rejected the {ADJ_CAP + 1}th, "
              f"accounting lane untouched")
        print(f"  ok: one enquirer's details reach at most {ACC_CAP + ADJ_CAP} firms")

        # 5: adjacent claims priced at the flat adjacent price.
        prices = {int(d["price_charged"]) for d in lane_rows(sandbox, lid, tiers.ADJACENT)}
        assert prices == {ADJ_PRICE}, f"adjacent priced {prices}, expected {{{ADJ_PRICE}}}"
        print(f"  ok: every adjacent claim billed at £{ADJ_PRICE}, not the lead's tier price")

        # 1 + 2: the accounting lane is still open and still caps at ACC_CAP.
        for f in acc[:ACC_CAP]:
            ok, out = claim(sandbox, lid, f["id"])
            assert ok, f"accounting claim {f['id']} rejected after adjacent claims: {out}"
        ok, out = claim(sandbox, lid, acc[ACC_CAP]["id"])
        assert not ok and "slots" in out, f"accounting cap not enforced: {out}"
        assert len(lane_rows(sandbox, lid, tiers.ACCOUNTING)) == ACC_CAP
        print(f"  ok: accounting lane filled to {ACC_CAP} and rejected the {ACC_CAP + 1}th")

        # 6: same firm, same lane, twice. Needs a lead with a free slot, otherwise
        # the cap rejects the second claim first and proves nothing.
        spare = next(l for l in leads if l["id"] not in claimed_ids and l["id"] != lid)["id"]
        ok, out = claim(sandbox, spare, acc[0]["id"], "--adjacent")
        assert ok, f"first adjacent claim on the spare lead rejected: {out}"
        ok, out = claim(sandbox, spare, acc[0]["id"], "--adjacent")
        assert not ok and "already claimed" in out, f"duplicate adjacent claim allowed: {out}"
        print("  ok: a firm cannot claim the same lead twice on the same lane")

        # 4: exclusive closes the accounting lane only.
        lead2 = next(l for l in leads
                     if l["id"] not in claimed_ids and l["id"] not in (lid, spare))
        l2 = lead2["id"]
        ok, out = claim(sandbox, l2, acc[0]["id"], "--exclusive")
        assert ok, f"exclusive claim rejected: {out}"
        ok, out = claim(sandbox, l2, acc[1]["id"])
        assert not ok and "exclusively locked" in out, f"exclusive did not close the accounting lane: {out}"
        ok, out = claim(sandbox, l2, acc[1]["id"], "--adjacent")
        assert ok, f"exclusive wrongly closed the adjacent lane: {out}"
        print("  ok: exclusive locks the accounting lane and leaves the adjacent lane open")

        # exclusivity is meaningless on the adjacent lane.
        ok, out = claim(sandbox, l2, acc[2]["id"], "--adjacent", "--exclusive")
        assert not ok and "accounting lane only" in out, f"adjacent exclusive allowed: {out}"
        print("  ok: --exclusive is rejected on the adjacent lane")

        # 8: a firm that has not signed the data sharing agreement cannot claim at all.
        # The lawful basis for sharing depends on every recipient being under it.
        unsigned = next((f for f in active if not f.get("dsa_signed_date")), None)
        assert unsigned, "fixtures need an active firm with no signed agreement to test the gate"
        spare2 = next(l for l in leads
                      if l["id"] not in claimed_ids and l["id"] not in (lid, spare, l2))
        ok, out = claim(sandbox, spare2["id"], unsigned["id"])
        assert not ok and "has not signed" in out, f"unsigned firm was allowed to claim: {out}"
        print("  ok: a firm with no signed agreement cannot claim")

    print("\nall lane checks passed")


if __name__ == "__main__":
    main()
