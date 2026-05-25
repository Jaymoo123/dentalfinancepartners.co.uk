#requires -Version 5.1
<#
.SYNOPSIS
  Batch completion poller for the rolling orchestrator (Round 2).

.DESCRIPTION
  Polls every PollIntervalSec for batch completion via TWO mechanisms:
    1. Primary: sub-agent writes _signals/batch_{id}_done.json marker
       with shape { batch_id, agent_id, completed_at, commit_shas[],
       slugs_done[] }. On marker found, cross-check every ExpectedSlug
       has a ✅ row in the tracker. Pass = complete.
    2. Safety net: tracker shows all ExpectedSlugs as ✅ without marker
       (sub-agent crashed AFTER commits + tracker flip but BEFORE
       writing marker). Also treat as complete.

  If neither condition holds within TimeoutMin, returns 'incomplete'
  (orchestrator decides recovery - typically flip claimed-but-incomplete
  rows back to pending and dispatch fresh sub-agent).

.PARAMETER BatchId
  Identifier matching the marker filename (batch_{BatchId}_done.json).

.PARAMETER ExpectedSlugs
  Comma-separated list of slugs this batch is expected to ship. Used
  for cross-check against tracker.

.PARAMETER SignalDir
  Directory containing marker files (e.g. briefs/property/megawave1/_signals/).
  Created if missing.

.PARAMETER TrackerFile
  Wave tracker markdown file. Used for tracker cross-check via the
  shared Get-TrackerCounts helper (Bug #1 fix).

.PARAMETER TimeoutMin
  Maximum time to poll before declaring incomplete. Default 180.

.PARAMETER PollIntervalSec
  Poll interval. Default 30.

.OUTPUTS
  PSCustomObject: {Status='complete'|'incomplete', Reason, MarkerData?, ElapsedSec}

.EXAMPLE
  $result = ./scripts/batch-detect.ps1 -BatchId 'M1-A-B1' `
      -ExpectedSlugs 'slug-1,slug-2,slug-3' `
      -SignalDir 'briefs/property/megawave1/_signals' `
      -TrackerFile 'docs/property/wave1_page_tracker.md' `
      -TimeoutMin 180
  if ($result.Status -eq 'complete') { ... } else { ... }
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)] [string]$BatchId,
    [Parameter(Mandatory=$true)] [string]$ExpectedSlugs,
    [Parameter(Mandatory=$true)] [string]$SignalDir,
    [Parameter(Mandatory=$true)] [string]$TrackerFile,
    [int]$TimeoutMin = 180,
    [int]$PollIntervalSec = 30
)

$ErrorActionPreference = 'Stop'

# Shared tracker helper for slug-filtered ✅ counting
. "$PSScriptRoot\_lib\tracker-utils.ps1"

# Ensure SignalDir exists
if (-not (Test-Path $SignalDir)) {
    New-Item -ItemType Directory -Path $SignalDir -Force | Out-Null
}

$expectedSlugList = $ExpectedSlugs -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ }
$markerFile = Join-Path $SignalDir "batch_${BatchId}_done.json"
$startTime = Get-Date
$timeoutTime = $startTime.AddMinutes($TimeoutMin)
$utf8 = [System.Text.UTF8Encoding]::new($false)

function Test-TrackerAllSlugsDone {
    param([string]$Tracker, [string[]]$Slugs)
    if (-not (Test-Path $Tracker)) { return $false }
    $content = [System.IO.File]::ReadAllText($Tracker, $utf8)
    # For each expected slug, look for a tracker row containing that slug
    # AND the ✅ done symbol (U+2705) on the same line.
    $doneSym = [string][char]0x2705
    foreach ($slug in $Slugs) {
        $found = $false
        foreach ($line in ($content -split "`r?`n")) {
            if ($line -match '^\|' -and $line.Contains($slug) -and $line.Contains($doneSym)) {
                $found = $true
                break
            }
        }
        if (-not $found) { return $false }
    }
    return $true
}

while ((Get-Date) -lt $timeoutTime) {
    $markerExists = Test-Path $markerFile
    $trackerAllDone = Test-TrackerAllSlugsDone -Tracker $TrackerFile -Slugs $expectedSlugList

    if ($markerExists) {
        # Parse marker
        try {
            $markerData = [System.IO.File]::ReadAllText($markerFile, $utf8) | ConvertFrom-Json
        } catch {
            Write-Warning "Marker file present but unparseable: $_"
            $markerData = $null
        }

        if ($trackerAllDone) {
            # Both signal + cross-check pass
            $elapsed = ((Get-Date) - $startTime).TotalSeconds
            return [PSCustomObject]@{
                Status     = 'complete'
                Reason     = 'marker + tracker cross-check both pass'
                MarkerData = $markerData
                ElapsedSec = [int]$elapsed
            }
        } else {
            # Marker present but tracker mismatch - log warning, keep polling
            Write-Warning "BATCH $BatchId SIGNAL/TRACKER MISMATCH - marker found but tracker missing one or more expected slugs. Continuing to poll; may indicate sub-agent committed partial work then signalled. Manual review may be needed if persists."
        }
    } elseif ($trackerAllDone) {
        # Safety net: all slugs ✅ in tracker without marker file (sub-agent
        # crashed after commits but before writing marker)
        $elapsed = ((Get-Date) - $startTime).TotalSeconds
        return [PSCustomObject]@{
            Status     = 'complete'
            Reason     = 'safety net - tracker shows all-done without marker (likely sub-agent crashed after commits)'
            MarkerData = $null
            ElapsedSec = [int]$elapsed
        }
    }

    Start-Sleep -Seconds $PollIntervalSec
}

# Timeout
$elapsed = ((Get-Date) - $startTime).TotalSeconds
return [PSCustomObject]@{
    Status     = 'incomplete'
    Reason     = "timeout after $TimeoutMin min - neither marker file written nor tracker shows all expected slugs as done"
    MarkerData = $null
    ElapsedSec = [int]$elapsed
}
