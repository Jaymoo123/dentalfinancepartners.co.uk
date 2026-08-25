# Deploys the lead-engine messaging release to all 15 launched sites.
# Run AFTER applying supabase/migrations/20260810000001_case_tiers.sql
# (Property's value-score writes case_tier once deployed).
# Usage: powershell -File scripts/deploy_lead_engine.ps1
# Sites without Vercel projects (wills-probate, divorce-finances, ashfield) are not in the list.

$ErrorActionPreference = "Continue"
$env:VERCEL_ORG_ID = "team_XF9WAygZX7SGk9Fo4tOAnihH"

$projects = [ordered]@{
  "charities (trusteetax.co.uk)"                = "prj_ckcgp2JjoBzJ9ihNZfdacdgYUuEG"
  "care (carehometax.co.uk)"                    = "prj_PvJWStLGoG8bvzCQPLafY4nuMQAa"
  "crypto (cryptotaxpartners.co.uk)"            = "prj_wWh5RmHySCrlJs4XEXJnXHfwsawG"
  "ecommerce (ecommercefinance.co.uk)"          = "prj_CI2NpSbvJGUEMatL2bVbOYIgxrNc"
  "hospitality (hospitalitytax.co.uk)"          = "prj_sQNit8s3hKwuFaHdkBQORKsHq3Vb"
  "pharmacies (pharmacytax.co.uk)"              = "prj_t2p8zJKl4PgBSpsnTanv0kQ5Whyk"
  "startups-tech (foundertaxpartners.co.uk)"    = "prj_rt04IBRvFpdMTC24NgDeDsFWDKr5"
  "dentists (dentalfinancepartners.co.uk)"      = "prj_f3tGDR4zozATcYOSLMmCqO2ZInNV"
  "medical (medicalaccounts.co.uk)"             = "prj_50vByZ3rqXQQwCUeENUTBbNBB41n"
  "solicitors (accountsforlawyers.co.uk)"       = "prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9"
  "generalist (hollowaydavies.co.uk)"           = "prj_rMK56yY2qcCPTObgwkQjVXQl8yl3"
  "digital-agency (agencyfounderfinance.co.uk)" = "prj_roTeeTjzABAR7D649dTkq2ta4rQi"
  "contractors-ir35 (contractortaxaccountants)" = "prj_AJhtTBB8SMdKluzfCNvwCCqU1yii"
  "construction-cis (tradetaxspecialists)"      = "prj_zaehvfgdTKx0Ftc8GQVedmRnjp4g"
  "PROPERTY (propertytaxpartners.co.uk)"        = "prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU"
}

$results = @()
foreach ($entry in $projects.GetEnumerator()) {
  Write-Host "`n=== Deploying $($entry.Key) ===" -ForegroundColor Cyan
  $env:VERCEL_PROJECT_ID = $entry.Value
  vercel deploy --prod --yes --archive=tgz
  $status = if ($LASTEXITCODE -eq 0) { "OK" } else { "FAILED ($LASTEXITCODE)" }
  $results += "{0,-50} {1}" -f $entry.Key, $status
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
$results | ForEach-Object { Write-Host $_ }
