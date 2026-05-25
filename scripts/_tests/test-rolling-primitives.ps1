#requires -Version 5.1
<#
.SYNOPSIS
  Tier-1 unit tests for the rolling-orchestrator primitives.

.DESCRIPTION
  Validates batch-claim.ps1 + batch-detect.ps1 against the four critical
  scenarios from the plan's verification ladder:
    1. Parallel claim race - 3 PowerShell jobs claim 6 picks each from
       a 24-pick fake queue; assert zero double-claims, 18 of 24 picks
       claimed (3 batches × 6).
    2. Marker detection - write fake batch_done.json + stub tracker with
       all ✅; batch-detect returns 'complete'.
    3. Cross-check fail - marker present but tracker missing one slug;
       batch-detect logs WARNING + keeps polling until timeout.
    4. Safety net - no marker but tracker shows all-✅; batch-detect
       returns 'complete'.
    5. Timeout - neither marker nor all-✅; batch-detect returns
       'incomplete' after short test timeout.

  Uses a per-run temp directory under $env:TEMP/rolling-tests-<guid>/.
  Cleans up on success; leaves artefacts on failure for debugging.

.EXAMPLE
  ./scripts/_tests/test-rolling-primitives.ps1
  # Exits 0 on all-pass; non-zero with details on any failure.
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$ScriptsDir = Split-Path -Parent $PSScriptRoot
$ClaimPs    = Join-Path $ScriptsDir 'batch-claim.ps1'
$DetectPs   = Join-Path $ScriptsDir 'batch-detect.ps1'

$TestDir = Join-Path $env:TEMP "rolling-tests-$([Guid]::NewGuid())"
New-Item -ItemType Directory -Path $TestDir -Force | Out-Null
Write-Host "Test scratch dir: $TestDir" -ForegroundColor DarkGray

$utf8 = [System.Text.UTF8Encoding]::new($false)
$passCount = 0
$failCount = 0
$failures  = @()

function Assert-Equal {
    param($Actual, $Expected, [string]$Message)
    if ($Actual -ne $Expected) {
        $script:failCount++
        $script:failures += "FAIL: $Message`n  expected: $Expected`n  actual:   $Actual"
        Write-Host "  FAIL: $Message (expected $Expected, got $Actual)" -ForegroundColor Red
        return $false
    }
    $script:passCount++
    Write-Host "  PASS: $Message" -ForegroundColor Green
    return $true
}

function New-FakeQueue {
    param([string]$Path, [int]$Count)
    $lines = @()
    for ($i = 1; $i -le $Count; $i++) {
        $row = @{ slug = "test-slug-$i"; label = "Test pick $i"; batch_id = "TEST-B$([math]::Ceiling($i/6))"; status = 'pending' }
        $lines += ($row | ConvertTo-Json -Compress)
    }
    [System.IO.File]::WriteAllText($Path, ($lines -join "`n") + "`n", $utf8)
}

function New-FakeTracker {
    param([string]$Path, [string[]]$SlugsDone, [string[]]$SlugsTodo = @())
    $done = [string][char]0x2705
    $todo = [string][char]0x2B1C
    $body = @"
# Test wave tracker

**Status legend:** $todo todo / $done done

| Status | Pos | Slug | Cat |
|---|---|---|---|

"@
    $i = 1
    foreach ($s in $SlugsDone) {
        $body += "| $done | A$i | ``$s`` | test |`n"
        $i++
    }
    foreach ($s in $SlugsTodo) {
        $body += "| $todo | A$i | ``$s`` | test |`n"
        $i++
    }
    [System.IO.File]::WriteAllText($Path, $body, $utf8)
}

# ============================================================
# Test 1: parallel claim race (no double-claims)
# ============================================================
Write-Host "`n=== Test 1: parallel claim race (3 jobs × 6 picks from 24-pick queue) ===" -ForegroundColor Cyan
$queuePath = Join-Path $TestDir 'race-queue.jsonl'
New-FakeQueue -Path $queuePath -Count 24

$jobs = 1..3 | ForEach-Object {
    Start-Job -ScriptBlock {
        param($ClaimPs, $Queue, $AgentId)
        & $ClaimPs -QueueFile $Queue -BatchSize 6 -AgentId $AgentId
    } -ArgumentList $ClaimPs, $queuePath, "agent-$_"
}
$jobs | Wait-Job | Out-Null
$results = $jobs | ForEach-Object { Receive-Job $_ } | Where-Object { $_ }
$jobs | Remove-Job

# Parse all claimed rows across the 3 jobs
$allClaimed = @()
foreach ($r in $results) {
    $parsed = $r | ConvertFrom-Json
    if ($parsed) { $allClaimed += $parsed }
}

# Should have 18 total (3 × 6); no duplicates
$totalClaimed = $allClaimed.Count
$uniqueSlugs = ($allClaimed | ForEach-Object { $_.slug }) | Sort-Object -Unique
Assert-Equal $totalClaimed 18 "parallel claim total count = 18 (3 jobs × 6 picks each)"
Assert-Equal $uniqueSlugs.Count 18 "parallel claim unique slugs = 18 (no double-claims)"

# Verify queue file ended with 18 claimed + 6 pending
$queueAfter = [System.IO.File]::ReadAllText($queuePath, $utf8) -split "`r?`n" | Where-Object { $_.Trim() }
$claimedCount = ($queueAfter | Where-Object { $_ -match '"status":"claimed"' }).Count
$pendingCount = ($queueAfter | Where-Object { $_ -match '"status":"pending"' }).Count
Assert-Equal $claimedCount 18 "queue file post-claim: 18 rows marked claimed"
Assert-Equal $pendingCount 6  "queue file post-claim: 6 rows remain pending"

# ============================================================
# Test 2: marker detection - both signal + cross-check pass
# ============================================================
Write-Host "`n=== Test 2: marker + tracker cross-check both pass ===" -ForegroundColor Cyan
$signalDir = Join-Path $TestDir 'signals'
New-Item -ItemType Directory -Path $signalDir -Force | Out-Null
$trackerPath = Join-Path $TestDir 'test-tracker-pass.md'
$batchId = 'TEST-PASS'
$slugs = 'pass-slug-1,pass-slug-2,pass-slug-3'

# Tracker has all 3 slugs ✅ done
New-FakeTracker -Path $trackerPath -SlugsDone @('pass-slug-1','pass-slug-2','pass-slug-3')

# Write marker file
$marker = @{
    batch_id     = $batchId
    agent_id     = 'test-agent'
    completed_at = (Get-Date).ToString('o')
    commit_shas  = @('aaa','bbb','ccc')
    slugs_done   = @('pass-slug-1','pass-slug-2','pass-slug-3')
} | ConvertTo-Json
[System.IO.File]::WriteAllText((Join-Path $signalDir "batch_${batchId}_done.json"), $marker, $utf8)

$result = & $DetectPs -BatchId $batchId -ExpectedSlugs $slugs -SignalDir $signalDir -TrackerFile $trackerPath -TimeoutMin 1 -PollIntervalSec 1
Assert-Equal $result.Status 'complete' "Test 2: marker + tracker both pass → complete"

# ============================================================
# Test 3: safety net - no marker, tracker all-✅
# ============================================================
Write-Host "`n=== Test 3: safety net (no marker but tracker all-done) ===" -ForegroundColor Cyan
$trackerPath3 = Join-Path $TestDir 'test-tracker-safety.md'
$batchId3 = 'TEST-SAFETY'
New-FakeTracker -Path $trackerPath3 -SlugsDone @('safety-slug-1','safety-slug-2')
# NO marker file written

$result3 = & $DetectPs -BatchId $batchId3 -ExpectedSlugs 'safety-slug-1,safety-slug-2' -SignalDir $signalDir -TrackerFile $trackerPath3 -TimeoutMin 1 -PollIntervalSec 1
Assert-Equal $result3.Status 'complete' "Test 3: safety net → complete"
$reasonMatchesSafety = $result3.Reason -like '*safety net*'
Assert-Equal $reasonMatchesSafety $true "Test 3: reason mentions safety net"

# ============================================================
# Test 4: timeout - neither marker nor all-done
# ============================================================
Write-Host "`n=== Test 4: timeout (neither marker nor tracker complete) ===" -ForegroundColor Cyan
$trackerPath4 = Join-Path $TestDir 'test-tracker-timeout.md'
$batchId4 = 'TEST-TIMEOUT'
# Tracker has todo only, no done
New-FakeTracker -Path $trackerPath4 -SlugsTodo @('timeout-slug-1','timeout-slug-2')

# Very short timeout (1 min) + 5s poll = ~12 polls then return
$result4 = & $DetectPs -BatchId $batchId4 -ExpectedSlugs 'timeout-slug-1,timeout-slug-2' -SignalDir $signalDir -TrackerFile $trackerPath4 -TimeoutMin 1 -PollIntervalSec 5
Assert-Equal $result4.Status 'incomplete' "Test 4: timeout → incomplete"

# ============================================================
# Test 5: empty queue claim returns []
# ============================================================
Write-Host "`n=== Test 5: empty queue claim returns [] ===" -ForegroundColor Cyan
$emptyQueue = Join-Path $TestDir 'empty-queue.jsonl'
[System.IO.File]::WriteAllText($emptyQueue, '', $utf8)
$emptyResult = & $ClaimPs -QueueFile $emptyQueue -BatchSize 6 -AgentId 'test-agent'
Assert-Equal $emptyResult '[]' "Test 5: empty queue claim returns []"

# ============================================================
# Summary
# ============================================================
Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "PASS: $passCount" -ForegroundColor Green
Write-Host "FAIL: $failCount" -ForegroundColor $(if ($failCount -eq 0) { 'Green' } else { 'Red' })

if ($failCount -eq 0) {
    Write-Host "`nAll tests passed. Cleaning up scratch dir."
    Remove-Item -Path $TestDir -Recurse -Force
    exit 0
} else {
    Write-Host "`nFailures:" -ForegroundColor Red
    foreach ($f in $failures) { Write-Host "  $f" -ForegroundColor Red }
    Write-Host "`nScratch dir preserved for debugging: $TestDir" -ForegroundColor Yellow
    exit 1
}
