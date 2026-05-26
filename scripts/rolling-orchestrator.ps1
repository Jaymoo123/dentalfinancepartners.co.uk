#requires -Version 5.1
<#
.SYNOPSIS
  Round 4 of rolling architecture: per-lane orchestrator that drives
  bounded-batch sub-agent dispatch through one bucket of a mega-wave.

.DESCRIPTION
  For one bucket lane (A, B, or C) within a mega-wave:
    Loop:
      1. batch-claim next BatchSize pending rows from queue_<Lane>.jsonl
      2. If claim returned empty -> queue drained; write lane_<X>_done.flag + exit
      3. make-batch-prompt for the phase + claimed picks
      4. Spawn wt tab with claude --name "MW{N}-{Phase}-{Lane}-{B<n>}"
         seeded with the prompt
      5. batch-detect poll for marker + tracker cross-check
      6. If incomplete -> batch-reclaim the failed picks + exit with
         WARNING (next orchestrator invocation will pick up where this
         left off)
      7. If complete -> loop to next batch

  Three orchestrator instances (one per bucket lane A/B/C) run in
  parallel - they don't communicate; each owns its queue file. The
  batch-claim primitive guarantees no cross-lane double-claims even
  if two instances accidentally point at the same queue.

  -Phase 'run' refuses to start unless _signals/stage1b_signed_off.flag
  exists (conductor manual gate after Stage 1b HP-lock review).

.PARAMETER Site
  Site key (default: property).

.PARAMETER Wave
  MegaWave number.

.PARAMETER Phase
  stage1 | stage2 | run

.PARAMETER Lane
  Bucket lane: a | b | c. Required.

.PARAMETER BatchSize
  Picks per batch (default: from site config wave.batchSize).

.PARAMETER BatchTimeoutMin
  Per-batch timeout (default 180 = 3h).

.PARAMETER MaxBatches
  Optional cap on how many batches this run will dispatch. Useful for
  micro-runs (Tier-3 validation). Default: unlimited.

.PARAMETER DryRun
  Print intended dispatches without spawning sub-agents.

.EXAMPLE
  # Single lane micro-run (Tier-3 validation: MW1 Bucket A first 12 picks = 2 batches of 6)
  ./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage1 -Lane a -MaxBatches 2

  # Full lane drain
  ./scripts/rolling-orchestrator.ps1 -Wave 1 -Phase stage1 -Lane a
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)] [int]$Wave,
    [Parameter(Mandatory=$true)] [ValidateSet('stage1','stage2','run')] [string]$Phase,
    [Parameter(Mandatory=$true)] [ValidateSet('a','b','c')] [string]$Lane,

    [string]$Site = 'property',
    [int]$BatchSize,
    [int]$BatchTimeoutMin = 180,
    [int]$MaxBatches = 0,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

. "$PSScriptRoot\_lib\site-config.ps1"

$cfg = Get-SiteConfig $Site
if (-not $BatchSize) { $BatchSize = $cfg.wave.batchSize }
$utf8 = [System.Text.UTF8Encoding]::new($false)

$laneUpper = $Lane.ToUpper()
$waveSubdir = "megawave$Wave"
$briefsDir  = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.briefsDir + '/' + $waveSubdir)
$queueFile  = Join-Path $briefsDir "queue_$laneUpper.jsonl"
$signalDir  = Join-Path $briefsDir '_signals'
$trackerFile = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.docsDir + "/${waveSubdir}_page_tracker.md")
$wtDir       = Resolve-WorktreePath -Config $cfg -Wave $Wave -Bucket $Lane -WaveKind 'megawave'

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

if ($DryRun) { Write-Host "[DRY-RUN MODE - no sub-agents will spawn]" -ForegroundColor Magenta }

Write-Step "Rolling orchestrator: Site=$Site MegaWave=$Wave Phase=$Phase Lane=$laneUpper BatchSize=$BatchSize"
Write-Host ""

# Preflight
Write-Step "Preflight checks"
if (-not (Test-Path $queueFile)) { Write-Fail "Queue file missing: $queueFile. Run slice-megawave.ps1 -MegaWave $Wave first." }
Write-OK "Queue file: $queueFile"

if (-not (Test-Path $trackerFile)) { Write-Fail "Tracker missing: $trackerFile. Run scaffold-wave.ps1 -Wave $Wave -Site $Site." }
Write-OK "Tracker: $trackerFile"

if (-not (Test-Path $wtDir)) {
    $createCmd = "git worktree add `"$wtDir`" -b $(Resolve-BranchName -Config $cfg -Wave $Wave -Bucket $Lane -WaveKind 'megawave')"
    if ($DryRun) {
        Write-Warn "Worktree missing (would be required for live dispatch): $wtDir"
        Write-Warn "  Create via: $createCmd"
    } else {
        Write-Fail "Worktree missing: $wtDir. Create via: $createCmd"
    }
} else {
    Write-OK "Worktree: $wtDir"
}

# Phase 'run' gate
if ($Phase -eq 'run') {
    $signOffFlag = Join-Path $signalDir 'stage1b_signed_off.flag'
    if (-not (Test-Path $signOffFlag)) {
        Write-Fail "Phase 'run' requires Stage 1b sign-off. Conductor must touch this file after HP-lock review:`n          $signOffFlag"
    }
    Write-OK "Stage 1b sign-off flag present"
}

# Ensure signal dir
if (-not (Test-Path $signalDir)) {
    if ($DryRun) {
        Write-Warn "Would create signal dir: $signalDir"
    } else {
        New-Item -ItemType Directory -Path $signalDir -Force | Out-Null
        Write-OK "Created signal dir: $signalDir"
    }
}

# Check wt.exe
if (-not $DryRun) {
    $wt = Get-Command wt -ErrorAction SilentlyContinue
    if (-not $wt) { Write-Fail "wt.exe not on PATH" }
    Write-OK "wt.exe at $($wt.Source)"
}

# Main loop
Write-Host ""
Write-Step "Rolling dispatch loop"
$batchNum = 0
$claimPs   = Join-Path $PSScriptRoot 'batch-claim.ps1'
$promptPs  = Join-Path $PSScriptRoot 'make-batch-prompt.ps1'
$detectPs  = Join-Path $PSScriptRoot 'batch-detect.ps1'
$reclaimPs = Join-Path $PSScriptRoot 'batch-reclaim.ps1'

# Dry-run state: track simulated claims so subsequent iterations advance
$dryRunClaimed = @{}

while ($true) {
    if ($MaxBatches -gt 0 -and $batchNum -ge $MaxBatches) {
        Write-OK "Reached MaxBatches=$MaxBatches; stopping per cap"
        break
    }

    $agentId = [Guid]::NewGuid().ToString()
    Write-Host ""
    Write-Step "Batch $($batchNum + 1) - claiming up to $BatchSize picks (agent $agentId)"

    if ($DryRun) {
        Write-Warn "Would: batch-claim $queueFile $BatchSize $agentId"
        # In dry-run we still try to read queue to show what WOULD be claimed
        $rows = [System.IO.File]::ReadAllText($queueFile, $utf8) -split "`r?`n" | Where-Object { $_.Trim() } | ForEach-Object { $_ | ConvertFrom-Json }
        $pending = @($rows | Where-Object { $_.status -eq 'pending' -and -not $dryRunClaimed.ContainsKey($_.slug) } | Select-Object -First $BatchSize)
        if ($pending.Count -eq 0) {
            Write-OK "DRY-RUN: queue has no pending rows; lane done flag would be written"
            break
        }
        $picks = $pending
        foreach ($p in $picks) { $dryRunClaimed[$p.slug] = $true }
    } else {
        $claimedJson = & $claimPs -QueueFile $queueFile -BatchSize $BatchSize -AgentId $agentId
        $picks = $claimedJson | ConvertFrom-Json
        if (-not $picks -or $picks.Count -eq 0) {
            Write-OK "Queue drained for lane $laneUpper"
            $laneFlag = Join-Path $signalDir "lane_${laneUpper}_done.flag"
            New-Item -ItemType File -Path $laneFlag -Force | Out-Null
            Write-OK "Wrote lane-done flag: $laneFlag"
            break
        }
    }

    $batchNum++
    $batchId = if ($picks[0].batch_id) { $picks[0].batch_id } else { "M${Wave}-${laneUpper}-B${batchNum}" }
    $sessionName = "MW${Wave}-${Phase}-${laneUpper}-B${batchNum}"
    Write-OK "Claimed $($picks.Count) picks for batch $batchId"
    $picks | ForEach-Object { Write-Host "          - $($_.slug)" -ForegroundColor DarkGray }

    # Generate prompt
    Write-Step "  Hydrating prompt template"
    $promptFile = Join-Path $signalDir "prompt_${batchId}.txt"
    if ($DryRun) {
        Write-Warn "Would: make-batch-prompt site=$Site wave=$Wave phase=$Phase bucket=$Lane batchId=$batchId"
        Write-Warn "  Would write to: $promptFile"
    } else {
        $picksJson = $claimedJson
        & $promptPs -Site $Site -Wave $Wave -Phase $Phase -Bucket $Lane -BatchId $batchId -PicksJson $picksJson -OutFile $promptFile | Out-Null
        Write-OK "  Prompt written: $promptFile"
    }

    # Spawn sub-agent
    # Writes a per-batch launcher .ps1 (reliable across PS quoting quirks),
    # spawned via powershell -NoExit -Command "& 'launcher.ps1'". Launcher
    # loads prompt + invokes claude with it as the positional first message.
    Write-Step "  Spawning wt tab"
    $launcherPath = Join-Path $signalDir "launch_${batchId}.ps1"
    if (-not $DryRun) {
        $launcherBody = "`$prompt = Get-Content -Raw '$promptFile'`r`nclaude --allow-dangerously-skip-permissions --dangerously-skip-permissions -- `$prompt`r`n"
        [System.IO.File]::WriteAllText($launcherPath, $launcherBody, $utf8)
    }
    $innerCmd = "& '$launcherPath'"
    if ($DryRun) {
        Write-Warn "Would spawn: wt new-tab -d `"$wtDir`" --title `"$sessionName`""
        Write-Host "            inner: $innerCmd" -ForegroundColor DarkGray
    } else {
        try {
            Start-Process -FilePath wt -ArgumentList @(
                'new-tab', '-d', $wtDir, '--title', $sessionName,
                '--', 'powershell', '-NoExit', '-Command', $innerCmd
            ) | Out-Null
            Write-OK "  Spawned $sessionName in $wtDir"
        } catch {
            Write-Fail "wt new-tab failed: $_"
        }
    }

    # Poll for completion
    Write-Step "  Polling for batch completion (timeout ${BatchTimeoutMin}min)"
    if ($DryRun) {
        Write-Warn "Would: batch-detect $batchId expected=$($picks.slug -join ',') timeout=$BatchTimeoutMin"
        # In dry-run, fake completion to advance to next batch
        Write-OK "  DRY-RUN: assuming complete for loop demo"
    } else {
        $expectedSlugs = ($picks.slug) -join ','
        $result = & $detectPs -BatchId $batchId -ExpectedSlugs $expectedSlugs -SignalDir $signalDir -TrackerFile $trackerFile -TimeoutMin $BatchTimeoutMin -Phase $Phase

        if ($result.Status -eq 'complete') {
            Write-OK "  Batch $batchId complete in $($result.ElapsedSec)s ($($result.Reason))"
        } else {
            Write-Warn "  Batch $batchId INCOMPLETE: $($result.Reason)"
            Write-Warn "  Calling batch-reclaim to flip unfinished picks back to pending"
            $reclaimed = & $reclaimPs -QueueFile $queueFile -BatchId $batchId -TrackerFile $trackerFile
            Write-Warn "  Reclaimed $reclaimed picks. Stopping orchestrator; conductor should investigate then re-run."
            exit 1
        }
    }
}

Write-Host ""
Write-Host "=== Rolling orchestrator complete: lane $laneUpper drained after $batchNum batches ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
if ($Phase -eq 'stage1') {
    Write-Host "  When all 3 lanes (A + B + C) have lane_done flag: conductor runs Stage 1b HP-lock review"
    Write-Host "  After HP-lock review: conductor touches $signalDir\stage1b_signed_off.flag"
    Write-Host "  Then run this script with -Phase stage2"
} elseif ($Phase -eq 'stage2') {
    Write-Host "  When all 3 lanes (A + B + C) have lane_done flag: conductor runs Stage 2b drift triage"
    Write-Host "  Then run this script with -Phase run"
} elseif ($Phase -eq 'run') {
    Write-Host "  When all 3 lanes done: conductor runs close-wave validate/audit/merge/build"
    Write-Host "  Then deploy-and-index.ps1 -Site $Site (user-gated)"
}
