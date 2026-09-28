#!/usr/bin/env bash
# Phase 0 recheck: deterministic wording + mechanical greps for one site, base (8e1043d0) vs HEAD.
# Usage (from repo root):  bash <scratch>/recheck/wording_grep.sh <site>
# Read-only. Prints: defect-string hits per file at base and HEAD (must match for prose files),
# form-mount file counts, delayHours arrays, and the list of files whose string literals changed.
set -u
SITE="$1"; BASE=8e1043d0
PATHS="$SITE/web/src $SITE/niche.config.json $SITE/web/public/llms.txt"
DEFECT='partner network|referral network|not an accountancy practice|not a law firm|a specialist reviews|a specialist will|specialist firm from|the specialist firm you speak to|up to six|regulated firms in our|matching service|accountancy matching|we are not accountants|editorial content only|pre-launch|nothing here should be cited|STUB'
PHASE0='Free first call, then a fixed fee in writing|within 24 hours and one of our accountants|One of our accountants will call you within 24 hours|An accountant will call you then'

echo "== $SITE: defect-string line counts per file (base | HEAD); a file present in one column only is a finding"
join -t $'\t' -a1 -a2 -e 0 -o 0,1.2,2.2 \
  <(git grep -i -c -E "$DEFECT" $BASE -- $PATHS 2>/dev/null | sed "s|^$BASE:||" | awk -F: '{print $1"\t"$2}' | sort) \
  <(git grep -i -c -E "$DEFECT" HEAD  -- $PATHS 2>/dev/null | sed "s|^HEAD:||"  | awk -F: '{print $1"\t"$2}' | sort) \
  | awk -F'\t' '{flag=($2!=$3)?"  <-- DIFFERS":""; print $2" | "$3"  "$1 flag}'
echo "TOTAL base=$(git grep -i -E "$DEFECT" $BASE -- $PATHS 2>/dev/null | wc -l)  HEAD=$(git grep -i -E "$DEFECT" HEAD -- $PATHS 2>/dev/null | wc -l)"
echo
echo "== phase-0 replacement strings still present at HEAD (should be 0 on pages that existed at base; the shared LeadCTAPanel defaults are exempt)"
git grep -i -n -E "$PHASE0" HEAD -- $PATHS 2>/dev/null | sed "s|^HEAD:||" | head -20
echo "count HEAD=$(git grep -i -E "$PHASE0" HEAD -- $PATHS 2>/dev/null | wc -l)  base=$(git grep -i -E "$PHASE0" $BASE -- $PATHS 2>/dev/null | wc -l)"
echo
echo "== lead panel / form mounts: files importing LeadCTAPanel or LeadForm under app/ (base | HEAD)"
echo "base=$(git grep -l -E "LeadCTAPanel|LeadForm|InlineMiniLeadForm|DetailsForm" $BASE -- $SITE/web/src/app 2>/dev/null | wc -l)  HEAD=$(git grep -l -E "LeadCTAPanel|LeadForm|InlineMiniLeadForm|DetailsForm" HEAD -- $SITE/web/src/app 2>/dev/null | wc -l)"
git grep -l -E "LeadCTAPanel|LeadForm|InlineMiniLeadForm|DetailsForm" HEAD -- $SITE/web/src/app 2>/dev/null | sed "s|^HEAD:||"
echo
echo "== ResultGate / modal gate usage at HEAD (expect none on calculator routes)"
git grep -n -E "ResultGate|ResultGateModal|PdfOffer|calc_pdf_offer" HEAD -- $SITE/web/src/app $SITE/web/src/components 2>/dev/null | sed "s|^HEAD:||" | grep -v -E "^\S+:\s*//" | head -12
echo
echo "== delayHours arrays (base | HEAD), file $SITE/web/src/config/lead-nurture.ts"
echo "base: $(git show $BASE:$SITE/web/src/config/lead-nurture.ts 2>/dev/null | grep -oE 'delayHours: *[0-9]+' | grep -oE '[0-9]+' | tr '\n' ',')"
echo "HEAD: $(git show HEAD:$SITE/web/src/config/lead-nurture.ts 2>/dev/null | grep -oE 'delayHours: *[0-9]+' | grep -oE '[0-9]+' | tr '\n' ',')"
echo "expected first eight: 0,0,4,20,24,48,72,96"
echo
echo "== canonical declarations in app/ at HEAD (every hub and detail page should self-reference)"
git grep -n -E "canonical" HEAD -- $SITE/web/src/app 2>/dev/null | sed "s|^HEAD:||" | wc -l
echo
echo "== files changed base..HEAD whose diff adds or removes a string literal with 4+ words (wording candidates for the Opus reader)"
for f in $(git diff --name-only $BASE HEAD -- $SITE/web/src $SITE/niche.config.json $SITE/web/public/llms.txt); do
  n=$(git diff $BASE HEAD -- "$f" | grep -E '^[-+][^-+]' | grep -E -c '["'"'"'`][^"'"'"'`]*\b[A-Za-z]+\s+[A-Za-z]+\s+[A-Za-z]+\s+[A-Za-z]+\b')
  [ "$n" -gt 0 ] && echo "$n  $f"
done | sort -rn
echo
echo "== diffstat base..HEAD for the site"
git diff --stat $BASE HEAD -- $SITE/ | tail -1
