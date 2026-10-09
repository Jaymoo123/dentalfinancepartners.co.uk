# Merge prompt (one agent per page, after both reviews are in)

---

Merge the two independent reviews of `/services/<slug>` into one action list for the writer and one list of open items for the owner. Repo root `/home/user/dentalfinancepartners.co.uk`. Read `briefs/property/wp1-services/REVIEW_<slug>_A.md` and `REVIEW_<slug>_B.md`.

Rules (blueprint §12.3, resolution): a finding both raised is applied. A finding one raised and the other did not is a disagreement: BLOCK-typed are applied; FIX-typed are applied unless the replacement is itself wrong against house_positions.md or the pack (say why); NOTE-typed go to the owner untouched, with both positions in one line each and the quoted sentence. Where the two reviewers propose different replacement sentences for the same quote, pick the one closer to the spec's owner-voice sentences and say which and why in one line.

Output `briefs/property/wp1-services/MERGE_<slug>.md`: (1) the apply list for the writer, in page order, each row: section, quoted sentence, replacement, source (A, B or both); (2) the owner list: NOTE items with the quote and the two positions; (3) the two reviewers' answers to question 12 side by side. Then hand the apply list to the writer agent (same prompt as before plus: "Apply `MERGE_<slug>.md` exactly; where you disagree with a row, leave it unapplied and say why in the hand-back; then rebuild and re-run the harness to zero BLOCK"). A finding is closed only when the harness is green on the fixed file. Maximum three writer loops per page; anything still open goes to the owner in the review pack.
