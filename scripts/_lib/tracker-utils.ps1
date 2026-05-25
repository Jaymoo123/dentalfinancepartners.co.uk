#requires -Version 5.1
<#
.SYNOPSIS
  Shared helper for reading wave page-tracker status counts.

.DESCRIPTION
  Replaces the brittle pattern `[regex]::Matches($content, '<emoji>').Count - 1`
  that returned 0 in PS 5.1 even when many rows had the emoji. Two root causes:
    (a) PS 5.1 reads .ps1 files as ANSI (Windows-1252) unless they have a
        UTF-8 BOM, so emoji literals in the script get mangled before
        comparison against UTF-8 file content. This helper constructs the
        symbols from Unicode codepoints (BMP via [char]0xXXXX, non-BMP via
        [System.Char]::ConvertFromUtf32) so the comparison is encoding-
        agnostic regardless of how the .ps1 itself is stored.
    (b) The previous "subtract 1 for legend" hack was fragile. This helper
        walks the tracker line-by-line and matches table rows by structural
        pattern (^\| <token> \|), not by free-form symbol count.

  Symbol legend (must match wave tracker convention):
    ⬜ U+2B1C  todo
    🟦 U+1F7E6 in_progress
    ✅ U+2705  done
    ⚠  U+26A0  blocked
    🔁 U+1F501 needs_backpatch

.PARAMETER TrackerPath
  Absolute path to wave{N}_page_tracker.md.

.EXAMPLE
  . "$PSScriptRoot\_lib\tracker-utils.ps1"
  $c = Get-TrackerCounts -TrackerPath "C:\...\wave8_page_tracker.md"
  Write-Host "done=$($c.done), todo=$($c.todo)"
#>

function Get-TrackerCounts {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string]$TrackerPath
    )

    if (-not (Test-Path $TrackerPath)) {
        throw "Tracker not found: $TrackerPath"
    }

    $utf8 = [System.Text.UTF8Encoding]::new($false)
    $content = [System.IO.File]::ReadAllText($TrackerPath, $utf8)

    # Build status symbols from Unicode codepoints (encoding-agnostic).
    $sym = @{
        todo            = [string][char]0x2B1C
        in_progress     = [System.Char]::ConvertFromUtf32(0x1F7E6)
        done            = [string][char]0x2705
        blocked         = [string][char]0x26A0
        needs_backpatch = [System.Char]::ConvertFromUtf32(0x1F501)
    }

    $counts = @{
        todo            = 0
        in_progress     = 0
        done            = 0
        blocked         = 0
        needs_backpatch = 0
        unknown         = 0
        total_rows      = 0
    }

    foreach ($line in ($content -split "`r?`n")) {
        # Match table rows: pipe, whitespace, status token (no pipe chars),
        # whitespace, pipe. Header rows ("| Status | Pos | ...") would
        # capture "Status" which is filtered below. Legend line
        # ("**Status legend:** ...") doesn't start with `|`.
        if ($line -match '^\|\s+(?<status>[^\|\s]+)\s+\|') {
            $captured = $Matches['status']

            if ($captured -eq $sym.todo) {
                $counts.todo++; $counts.total_rows++
            }
            elseif ($captured -eq $sym.in_progress) {
                $counts.in_progress++; $counts.total_rows++
            }
            elseif ($captured -eq $sym.done) {
                $counts.done++; $counts.total_rows++
            }
            elseif ($captured -eq $sym.blocked) {
                $counts.blocked++; $counts.total_rows++
            }
            elseif ($captured -eq $sym.needs_backpatch) {
                $counts.needs_backpatch++; $counts.total_rows++
            }
            else {
                # Header rows ("| Status | ...") and any non-status first
                # column land here. Only flag as 'unknown' if it looks like
                # an attempted status (short non-ASCII), not a header word.
                if ($captured.Length -le 2 -and $captured -notmatch '^[A-Za-z]+$') {
                    $counts.unknown++
                }
            }
        }
    }

    return $counts
}
