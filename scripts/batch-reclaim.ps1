#requires -Version 5.1
<#
.SYNOPSIS
  Atomic batch-reclaim primitive - flip claimed-but-incomplete queue
  rows back to pending so a fresh sub-agent can retry.

.DESCRIPTION
  Called by the rolling orchestrator when batch-detect returns
  'incomplete' (sub-agent crashed or timed out). For each pick in the
  batch:
    - if tracker shows it ✅ done -> leave as claimed (it shipped)
    - if tracker does NOT show ✅ -> flip back to status:pending, clear
      agent_id + claimed_at

  Same FileShare::None exclusive-lock + retry semantics as batch-claim.ps1
  so it's race-safe vs other orchestrator instances.

.PARAMETER QueueFile
  Path to the JSONL queue file.

.PARAMETER BatchId
  Batch identifier whose claimed-but-incomplete rows are reclaimed.

.PARAMETER TrackerFile
  Wave tracker - used to determine which slugs DID ship despite the
  timeout (those stay claimed; only undone ones revert).

.PARAMETER MaxRetries / RetryDelayMs
  Lock-retry tuning (defaults match batch-claim.ps1).

.OUTPUTS
  Number of rows reclaimed (int) on stdout.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)] [string]$QueueFile,
    [Parameter(Mandatory=$true)] [string]$BatchId,
    [Parameter(Mandatory=$true)] [string]$TrackerFile,
    [int]$MaxRetries = 50,
    [int]$RetryDelayMs = 100
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $QueueFile)) { throw "QueueFile missing: $QueueFile" }
if (-not (Test-Path $TrackerFile)) { throw "TrackerFile missing: $TrackerFile" }

$utf8 = [System.Text.UTF8Encoding]::new($false)
$doneSym = [string][char]0x2705
$trackerContent = [System.IO.File]::ReadAllText($TrackerFile, $utf8)

function Test-SlugDone {
    param([string]$Slug)
    foreach ($line in ($trackerContent -split "`r?`n")) {
        if ($line -match '^\|' -and $line.Contains($Slug) -and $line.Contains($doneSym)) { return $true }
    }
    return $false
}

# Exclusive lock with retry (mirrors batch-claim.ps1)
$stream = $null
$attempt = 0
while ($null -eq $stream) {
    try {
        $stream = [System.IO.File]::Open($QueueFile, [System.IO.FileMode]::Open, [System.IO.FileAccess]::ReadWrite, [System.IO.FileShare]::None)
    } catch [System.IO.IOException] {
        $attempt++
        if ($attempt -ge $MaxRetries) { throw "Lock acquire failed after ${MaxRetries}: $_" }
        $jitter = Get-Random -Minimum (-50) -Maximum 50
        Start-Sleep -Milliseconds ($RetryDelayMs + $jitter)
    }
}

$reclaimed = 0
try {
    $reader = New-Object System.IO.StreamReader($stream, $utf8)
    $content = $reader.ReadToEnd()
    $lines = $content -split "`r?`n" | Where-Object { $_.Trim().Length -gt 0 }
    $rows = @()
    foreach ($line in $lines) {
        $obj = $line | ConvertFrom-Json
        if ($obj.batch_id -eq $BatchId -and $obj.status -eq 'claimed') {
            if (Test-SlugDone -Slug $obj.slug) {
                # Tracker shows ✅ - leave claimed; this slug DID ship
            } else {
                $obj.status = 'pending'
                $obj | Add-Member -NotePropertyName agent_id   -NotePropertyValue $null -Force
                $obj | Add-Member -NotePropertyName claimed_at -NotePropertyValue $null -Force
                $reclaimed++
            }
        }
        $rows += $obj
    }
    # Write back
    $stream.SetLength(0); $stream.Position = 0
    $writer = New-Object System.IO.StreamWriter($stream, $utf8)
    foreach ($r in $rows) { $writer.WriteLine(($r | ConvertTo-Json -Compress -Depth 10)) }
    $writer.Flush()
} finally {
    if ($stream) { $stream.Dispose() }
}

Write-Output $reclaimed
