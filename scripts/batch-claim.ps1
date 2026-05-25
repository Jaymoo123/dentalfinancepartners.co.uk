#requires -Version 5.1
<#
.SYNOPSIS
  Atomic batch claim primitive for the rolling orchestrator (Round 2).

.DESCRIPTION
  Opens a JSONL queue file with exclusive lock, finds the first N rows
  where status="pending", flips them to status="claimed" with the
  provided agent_id + ISO claimed_at, writes back, releases the lock.
  Returns the claimed rows as a JSON array to stdout.

  This is the ONLY writer to queue files. Multiple orchestrator instances
  (one per bucket lane) can call this primitive concurrently without
  double-claiming because of the exclusive FileStream + retry loop.

.PARAMETER QueueFile
  Path to the JSONL queue file (e.g. briefs/property/megawave1/queue_A.jsonl).

.PARAMETER BatchSize
  Number of pending rows to claim (typically 5-7 per mega-wave plan).

.PARAMETER AgentId
  Identifier for the claiming agent (typically a GUID). Stamped onto
  claimed rows so we can reclaim if a specific agent dies.

.PARAMETER MaxRetries
  Maximum number of file-lock retry attempts. Default 50 = ~5s with
  100ms jitter.

.PARAMETER RetryDelayMs
  Base delay between retries in ms. Actual delay has +/- 50ms jitter.
  Default 100ms.

.EXAMPLE
  $agentId = [Guid]::NewGuid().ToString()
  $claimed = ./scripts/batch-claim.ps1 -QueueFile q.jsonl -BatchSize 6 -AgentId $agentId | ConvertFrom-Json
  # $claimed is array of {slug, label, batch_id, status, agent_id, claimed_at}

.NOTES
  Returns empty JSON array [] if no pending rows remain (graceful queue
  drain). Throws if QueueFile missing or unparseable.
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$QueueFile,

    [Parameter(Mandatory=$true)]
    [int]$BatchSize,

    [Parameter(Mandatory=$true)]
    [string]$AgentId,

    [int]$MaxRetries = 50,
    [int]$RetryDelayMs = 100
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path $QueueFile)) {
    throw "QueueFile missing: $QueueFile"
}

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)

# Acquire exclusive lock with retry
$stream = $null
$attempt = 0
while ($null -eq $stream) {
    try {
        $stream = [System.IO.File]::Open(
            $QueueFile,
            [System.IO.FileMode]::Open,
            [System.IO.FileAccess]::ReadWrite,
            [System.IO.FileShare]::None
        )
    } catch [System.IO.IOException] {
        $attempt++
        if ($attempt -ge $MaxRetries) {
            throw "Could not acquire exclusive lock on $QueueFile after $MaxRetries attempts: $_"
        }
        $jitter = Get-Random -Minimum (-50) -Maximum 50
        Start-Sleep -Milliseconds ($RetryDelayMs + $jitter)
    }
}

try {
    # Read all lines
    $reader = New-Object System.IO.StreamReader($stream, $utf8NoBom)
    $content = $reader.ReadToEnd()
    $lines = $content -split "`r?`n" | Where-Object { $_.Trim().Length -gt 0 }

    # Parse + find first N pending
    $rows = @()
    $claimed = @()
    $remainingClaim = $BatchSize
    $nowIso = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')

    foreach ($line in $lines) {
        $obj = $line | ConvertFrom-Json
        if ($remainingClaim -gt 0 -and $obj.status -eq 'pending') {
            $obj | Add-Member -NotePropertyName status        -NotePropertyValue 'claimed'   -Force
            $obj | Add-Member -NotePropertyName agent_id      -NotePropertyValue $AgentId    -Force
            $obj | Add-Member -NotePropertyName claimed_at    -NotePropertyValue $nowIso     -Force
            $claimed += $obj
            $remainingClaim--
        }
        $rows += $obj
    }

    # Write back ALL rows (atomic - same file handle, truncate + rewrite)
    $stream.SetLength(0)
    $stream.Position = 0
    $writer = New-Object System.IO.StreamWriter($stream, $utf8NoBom)
    foreach ($r in $rows) {
        $writer.WriteLine(($r | ConvertTo-Json -Compress -Depth 10))
    }
    $writer.Flush()

    # Emit claimed rows to stdout as JSON array. PS 5.1's ConvertTo-Json
    # has no -AsArray flag and collapses single-element arrays to objects,
    # so build the array bracket-wrapping manually.
    if ($claimed.Count -eq 0) {
        Write-Output '[]'
    } else {
        $items = $claimed | ForEach-Object { $_ | ConvertTo-Json -Compress -Depth 10 }
        Write-Output ('[' + ($items -join ',') + ']')
    }
} finally {
    if ($stream) { $stream.Dispose() }
}
