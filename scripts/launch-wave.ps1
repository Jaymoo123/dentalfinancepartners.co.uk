#requires -Version 5.1
<#
.SYNOPSIS
  Phase 2b of the wave pipeline: LAUNCH. Run after prepare-wave.ps1.

.DESCRIPTION
  Spawns 3 Windows Terminal tabs, one per Wave N worktree, each running
  `claude --name "Wave{N}-{X}"` with the bucket's launch prompt
  pre-loaded as the first user message (auto-sent).

  Pre-flight checks:
    1. Worktrees exist at expected paths
    2. Prompt files exist at wave{N}_prompts/{a,b,c}.txt
    3. Tracker shows no in_progress rows (cold-start protection)
    4. wt.exe is on PATH

  Failure mode: if `wt` is unavailable or fails, prints the fallback
  one-liner per bucket so the user can launch manually.

.PARAMETER Wave
  Wave number (e.g. 8). Required.

.PARAMETER DryRun
  Show what would be spawned without launching anything.

.PARAMETER Force
  Skip the cold-start protection (proceed even if tracker shows
  in_progress rows). Use when intentionally relaunching after a stall.

.EXAMPLE
  ./scripts/launch-wave.ps1 -Wave 8 -DryRun
  ./scripts/launch-wave.ps1 -Wave 8
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [int]$Wave,

    [switch]$DryRun,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'

$accountingRoot = 'C:\Users\user\Documents\Accounting'
$wtBase         = 'C:\Users\user\Documents'
$buckets        = @('a','b','c')
$promptDir      = "$accountingRoot\docs\sessions\property\wave${Wave}_prompts"
$trackerFile    = "$accountingRoot\docs\property\wave${Wave}_page_tracker.md"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

if ($DryRun) {
    Write-Host "[DRY-RUN MODE - no tabs will be spawned]" -ForegroundColor Magenta
}

Write-Step "Launching Wave $Wave"
Write-Host ""

# 1. wt.exe available
Write-Step "1/4 Checking wt.exe (Windows Terminal CLI)"
$wt = Get-Command wt -ErrorAction SilentlyContinue
if (-not $wt) {
    Write-Fail "wt.exe not on PATH. Install Windows Terminal or launch sessions manually."
}
Write-OK "wt.exe at $($wt.Source)"

# 2. Prompts + worktrees exist
Write-Step "2/4 Validating prompts + worktrees"
if (-not (Test-Path $promptDir)) {
    Write-Fail "Prompt dir missing: $promptDir`n          Run: ./scripts/prepare-wave.ps1 -Wave $Wave"
}
foreach ($bucket in $buckets) {
    $wtDir      = "$wtBase\Accounting-wt-property-wave${Wave}-${bucket}"
    $promptFile = "$promptDir\$bucket.txt"

    if (-not (Test-Path $wtDir))      { Write-Fail "Worktree missing: $wtDir" }
    if (-not (Test-Path $promptFile)) { Write-Fail "Prompt missing: $promptFile" }

    $size = (Get-Item $promptFile).Length
    Write-OK "bucket $bucket | worktree present | prompt $size bytes"
}

# 3. Cold-start protection: tracker shows no in_progress rows
Write-Step "3/4 Cold-start check (tracker)"
if (-not (Test-Path $trackerFile)) {
    Write-Fail "Tracker missing: $trackerFile"
}
$trackerContent = [System.IO.File]::ReadAllText($trackerFile, [System.Text.UTF8Encoding]::new($false))
# 🟦 is "in progress" per the wave tracker status legend
$inProgressCount = ([regex]::Matches($trackerContent, '🟦')).Count
if ($inProgressCount -gt 0 -and -not $Force) {
    Write-Fail "Tracker shows $inProgressCount in_progress row(s) - wave may already be running.`n          Re-run with -Force if this is intentional (e.g., relaunching after stall)."
}
if ($inProgressCount -gt 0) {
    Write-Warn "Tracker shows $inProgressCount in_progress row(s); proceeding due to -Force"
} else {
    Write-OK "Tracker clean (0 in_progress rows)"
}

# 4. Spawn 3 tabs
Write-Step "4/4 Spawning 3 Windows Terminal tabs"
foreach ($bucket in $buckets) {
    $bucketUpper = $bucket.ToUpper()
    $wtDir       = "$wtBase\Accounting-wt-property-wave${Wave}-${bucket}"
    $promptFile  = "$promptDir\$bucket.txt"
    $sessionName = "Wave${Wave}-${bucketUpper}"

    # The command that runs inside each spawned tab. Single quotes around the
    # session name and prompt path so the inner shell takes them literally.
    $innerCmd = "claude --name '$sessionName' (Get-Content '$promptFile' -Raw)"

    if ($DryRun) {
        Write-Warn "Would spawn: wt new-tab -d `"$wtDir`" --title `"$sessionName`""
        Write-Host "              inner: $innerCmd" -ForegroundColor DarkGray
        continue
    }

    try {
        Start-Process -FilePath wt -ArgumentList @(
            'new-tab',
            '-d', $wtDir,
            '--title', $sessionName,
            '--',
            'powershell', '-NoExit', '-Command', $innerCmd
        ) | Out-Null
        Write-OK "Spawned $sessionName in $wtDir"
    } catch {
        Write-Warn "wt new-tab failed for ${sessionName}: $_"
        Write-Host "          Fallback - open a Windows Terminal tab manually at:" -ForegroundColor Yellow
        Write-Host "            $wtDir" -ForegroundColor Yellow
        Write-Host "          Then run:" -ForegroundColor Yellow
        Write-Host "            $innerCmd" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== Wave $Wave LAUNCHED ===" -ForegroundColor Green
Write-Host ""
Write-Host "Manager (conductor) next steps:"
Write-Host "  1. Arm the manager-side Q&A watcher per NETNEW_PROGRAM Section 8.3"
Write-Host "     (Monitor tool, 20s polling for '## [Q-N].*STATUS: open' across:"
Write-Host "       docs/property/wave${Wave}_questions_session_A.md"
Write-Host "       docs/property/wave${Wave}_questions_session_B.md"
Write-Host "       docs/property/wave${Wave}_questions_session_C.md)"
Write-Host "  2. Idle until sub-agents post acknowledgment lines (~5 min)"
Write-Host "  3. Attend Q-N pings; spot-check briefs at session pages 2-3"
Write-Host "  4. When tracker shows all 29 done: ./scripts/close-wave.ps1 -Wave $Wave -Step validate"
Write-Host ""
