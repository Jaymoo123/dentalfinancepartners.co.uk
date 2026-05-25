#requires -Version 5.1
<#
.SYNOPSIS
  Round 3 of PRE-launch automation: cannibalisation audit for wave picks.

.DESCRIPTION
  Thin PowerShell wrapper around scripts/property_wave_cannibalisation_check.py.
  Reads picks from briefs/property/wave{N}/picks.yaml, computes Jaccard
  overlap against the live blog inventory, writes report to
  docs/property/wave{N}_cannibalisation_check.md.

  Generalises the per-wave property_wave{N}_cannibalisation_check.py
  pattern that was cloned manually for W7 and W8.

.PARAMETER Wave
  Wave number (e.g. 9). Required.

.PARAMETER PicksYaml
  Path to picks.yaml override (default: briefs/property/wave{N}/picks.yaml).

.PARAMETER DryRun
  Show what would be done without running the check.

.EXAMPLE
  ./scripts/check-cannib.ps1 -Wave 9
  ./scripts/check-cannib.ps1 -Wave 9 -DryRun
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [int]$Wave,

    [string]$PicksYaml,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$accountingRoot = 'C:\Users\user\Documents\Accounting'
$pyScript       = "$accountingRoot\scripts\property_wave_cannibalisation_check.py"
$defaultPicks   = "$accountingRoot\briefs\property\wave${Wave}\picks.yaml"
$outputPath     = "$accountingRoot\docs\property\wave${Wave}_cannibalisation_check.md"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

if ($DryRun) { Write-Host "[DRY-RUN MODE - no check will run]" -ForegroundColor Magenta }

Write-Step "Cannibalisation check: Wave $Wave"
Write-Host ""

# 1. Validate inputs
Write-Step "1/3 Validating inputs"
$picksFile = if ($PicksYaml) { $PicksYaml } else { $defaultPicks }
if (-not (Test-Path $picksFile)) {
    Write-Fail "picks.yaml missing: $picksFile`n          Create it after scaffold-wave + manager pick decisions"
}
Write-OK "Picks: $picksFile"

if (-not (Test-Path $pyScript)) {
    Write-Fail "Cannib python helper missing: $pyScript"
}
Write-OK "Python helper present"

# 2. Run check
Write-Step "2/3 Running cannibalisation check (Jaccard against existing blog inventory)"
if ($DryRun) {
    Write-Warn "Would: python $pyScript --wave $Wave --picks-yaml `"$picksFile`""
    exit 0
}

Push-Location $accountingRoot
try {
    & python $pyScript --wave $Wave --picks-yaml $picksFile
    $checkExit = $LASTEXITCODE
} finally {
    Pop-Location
}

# 3. Report
Write-Step "3/3 Result"
if ($checkExit -eq 0) {
    Write-OK "Cannib check clean (zero ❌ already-covered picks)"
    Write-OK "Report: $outputPath"
    Write-Host ""
    Write-Host "=== Wave $Wave cannib check: GREEN ===" -ForegroundColor Green
    Write-Host "Next: review report for ⚠️ partial-overlap rows; manager audit; then ./scripts/dispatch-stage1.ps1 -Wave $Wave"
} else {
    Write-Warn "Cannib check exit $checkExit - at least 1 pick is ❌ already covered"
    Write-Warn "Review report + revise picks.yaml: $outputPath"
    exit $checkExit
}
