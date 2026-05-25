#requires -Version 5.1
<#
.SYNOPSIS
  Round 2 of PRE-launch automation: scaffold a new wave's artefact files
  from a prior wave's templates.

.DESCRIPTION
  Creates the empty wave-N artefact shells the conductor + sub-agents need:
    docs/property/wave{N}_page_tracker.md
    docs/property/wave{N}_site_wide_flags.md
    docs/property/wave{N}_questions_session_{A,B,C}.md
    docs/property/wave{N}_discovery_log_session_{A,B,C}.md
    briefs/property/wave{N}/ (empty directory)

  Reads the prior wave (default N-1) as template, strips wave-specific
  content (tracker rows, F-XX flags, Q-N posts, D-N discoveries), keeps
  the structural scaffold (headers, legend, columns, format docs, type
  enumerations), substitutes wave number throughout.

  Picks-and-rows are NOT pre-populated - they're decided after scaffold
  via the topic-cluster judgment step (manual conductor work), then
  filled in via the next round of dispatch-stage1.ps1.

.PARAMETER Wave
  New wave number to scaffold (e.g. 9). Required.

.PARAMETER PriorWave
  Source wave number to use as template (default: Wave - 1).

.PARAMETER Force
  Overwrite if any wave-N artefacts already exist. Default: refuse with
  error to prevent accidentally clobbering an in-flight wave.

.PARAMETER DryRun
  Show what would be created without writing anything.

.EXAMPLE
  ./scripts/scaffold-wave.ps1 -Wave 9
  ./scripts/scaffold-wave.ps1 -Wave 9 -PriorWave 8 -DryRun
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [int]$Wave,

    [int]$PriorWave = 0,

    [switch]$Force,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

if ($PriorWave -eq 0) { $PriorWave = $Wave - 1 }

$accountingRoot = 'C:\Users\user\Documents\Accounting'
$buckets        = @('A','B','C')
$utf8NoBom      = [System.Text.UTF8Encoding]::new($false)

$docsProperty   = "$accountingRoot\docs\property"
$briefsWaveDir  = "$accountingRoot\briefs\property\wave${Wave}"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

# Substitute wave-number tokens in template text. Order matters: most-specific first.
function Convert-WaveTokens {
    param([string]$Text, [int]$From, [int]$To)
    $Text = $Text -replace "Wave $From\b",  "Wave $To"
    $Text = $Text -replace "WAVE${From}\b", "WAVE${To}"
    $Text = $Text -replace "wave${From}_",  "wave${To}_"
    $Text = $Text -replace "wave/?${From}/", "wave${To}/"
    # Common date stamp in '# Created' / 'Created:' lines should be cleared (today's date)
    $today = (Get-Date -Format 'yyyy-MM-dd')
    $Text = $Text -replace '\*\*Created:\*\*\s+\d{4}-\d{2}-\d{2}\.', "**Created:** $today."
    return $Text
}

# Read + transform helper
function Read-Template($path) {
    if (-not (Test-Path $path)) { Write-Fail "Prior-wave template missing: $path" }
    return [System.IO.File]::ReadAllText($path, $utf8NoBom)
}

function Write-Artefact($path, $content) {
    if ((Test-Path $path) -and -not $Force) {
        Write-Fail "Already exists (use -Force to overwrite): $path"
    }
    if ($DryRun) {
        Write-Warn "Would write: $path ($($content.Length) chars)"
    } else {
        [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
        Write-OK "Wrote $path ($($content.Length) chars)"
    }
}

if ($DryRun) { Write-Host "[DRY-RUN MODE - no files will be written]" -ForegroundColor Magenta }

Write-Step "Scaffold wave $Wave from wave $PriorWave templates"
Write-Host ""

# ============================================================
# 1. Page tracker — strip data rows, keep section headers + column rows
# ============================================================
Write-Step "1/5 wave${Wave}_page_tracker.md"
$priorTracker = Read-Template "$docsProperty\wave${PriorWave}_page_tracker.md"

$out = [System.Text.StringBuilder]::new()
$inDataTable = $false
foreach ($line in ($priorTracker -split "`r?`n")) {
    # Drop data rows: start with `| ` and column-1 is a status symbol
    if ($line -match '^\|\s+(?:[^\|\s]+)\s+\|' -and $inDataTable) {
        # Skip data row (table header + separator already passed)
        continue
    }
    # Identify table header (| Status | ...) - keep + flip flag
    if ($line -match '^\|\s*Status\s*\|') {
        $null = $out.AppendLine($line)
        $inDataTable = $true
        continue
    }
    # Identify table separator (|---|---|) just after header - keep
    if ($line -match '^\|\s*-+' -and $inDataTable) {
        $null = $out.AppendLine($line)
        continue
    }
    # ## Session X heading resets state (new table starts)
    if ($line -match '^## Session') {
        $inDataTable = $false
        $null = $out.AppendLine($line)
        continue
    }
    # All other lines: keep
    $null = $out.AppendLine($line)
}
$trackerOut = Convert-WaveTokens -Text $out.ToString() -From $PriorWave -To $Wave
Write-Artefact "$docsProperty\wave${Wave}_page_tracker.md" $trackerOut

# ============================================================
# 2. Site-wide flags — strip ## F-N blocks below the "(Sessions append flags below)" marker
# ============================================================
Write-Step "2/5 wave${Wave}_site_wide_flags.md"
$priorFlags = Read-Template "$docsProperty\wave${PriorWave}_site_wide_flags.md"

# Truncate at the "(Sessions append flags below this line ...)" marker + following ---
$truncMatch = [regex]::Match($priorFlags, '(?ms)^(.*?\(Sessions append flags below this line[^\)]*\)\s*\r?\n+---\s*\r?\n)')
if ($truncMatch.Success) {
    $flagsOut = $truncMatch.Groups[1].Value + "`n"
} else {
    # Fallback: truncate at first ## F- block
    $fnMatch = [regex]::Match($priorFlags, '(?m)^## F-')
    if ($fnMatch.Success) {
        $flagsOut = $priorFlags.Substring(0, $fnMatch.Index)
    } else {
        $flagsOut = $priorFlags
    }
}
$flagsOut = Convert-WaveTokens -Text $flagsOut -From $PriorWave -To $Wave
# Reset status note
$flagsOut = $flagsOut -replace '\*\*Status:\*\*[^\n]+', "**Status:** Pre-launch (no flags yet)."
Write-Artefact "$docsProperty\wave${Wave}_site_wide_flags.md" $flagsOut

# ============================================================
# 3 + 4. Q&A files + Discovery logs (one per bucket) — strip data blocks
# ============================================================
Write-Step "3/5 wave${Wave}_questions_session_{A,B,C}.md (3 files)"
foreach ($X in $buckets) {
    $priorQ = Read-Template "$docsProperty\wave${PriorWave}_questions_session_${X}.md"
    # Truncate at first ## Q-N or end-of-format-doc marker
    $qnMatch = [regex]::Match($priorQ, '(?m)^## Q-\d+')
    if ($qnMatch.Success) {
        $qOut = $priorQ.Substring(0, $qnMatch.Index)
    } else {
        $qOut = $priorQ
    }
    $qOut = Convert-WaveTokens -Text $qOut -From $PriorWave -To $Wave
    Write-Artefact "$docsProperty\wave${Wave}_questions_session_${X}.md" $qOut
}

Write-Step "4/5 wave${Wave}_discovery_log_session_{A,B,C}.md (3 files)"
foreach ($X in $buckets) {
    $priorD = Read-Template "$docsProperty\wave${PriorWave}_discovery_log_session_${X}.md"
    # Truncate at first ## D-N
    $dnMatch = [regex]::Match($priorD, '(?m)^## D-\d+')
    if ($dnMatch.Success) {
        $dOut = $priorD.Substring(0, $dnMatch.Index)
    } else {
        $dOut = $priorD
    }
    $dOut = Convert-WaveTokens -Text $dOut -From $PriorWave -To $Wave
    Write-Artefact "$docsProperty\wave${Wave}_discovery_log_session_${X}.md" $dOut
}

# ============================================================
# 5. briefs/property/wave{N}/ empty directory
# ============================================================
Write-Step "5/5 briefs/property/wave${Wave}/ directory"
if (Test-Path $briefsWaveDir) {
    $existingFiles = (Get-ChildItem $briefsWaveDir -File -ErrorAction SilentlyContinue | Measure-Object).Count
    if ($existingFiles -gt 0 -and -not $Force) {
        Write-Fail "Already exists with $existingFiles files (use -Force to keep): $briefsWaveDir"
    }
    Write-Warn "Directory already exists: $briefsWaveDir ($existingFiles file(s) preserved)"
} else {
    if ($DryRun) {
        Write-Warn "Would create directory: $briefsWaveDir"
    } else {
        New-Item -ItemType Directory -Path $briefsWaveDir -Force | Out-Null
        Write-OK "Created $briefsWaveDir"
    }
}

Write-Host ""
Write-Host "=== Wave $Wave scaffold complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps in PRE-launch chain:"
Write-Host "  1. Manager decides topic clusters + picks (judgment work; not scriptable)"
Write-Host "  2. Write picks to briefs/property/wave${Wave}/picks.yaml"
Write-Host "  3. ./scripts/check-cannib.ps1 -Wave $Wave"
Write-Host "  4. ./scripts/dispatch-stage1.ps1 -Wave $Wave  (Round 3)"
Write-Host "  5. Conductor reviews Stage 1b drift catches"
Write-Host "  6. ./scripts/dispatch-stage2.ps1 -Wave $Wave  (Round 3)"
Write-Host "  7. Conductor reviews Stage 2b drift catches"
Write-Host "  8. ./scripts/scaffold-launch-prompts.ps1 -Wave $Wave  (Round 3)"
Write-Host "  9. ./scripts/prepare-wave.ps1 -Wave $Wave"
Write-Host " 10. ./scripts/launch-wave.ps1 -Wave $Wave"
Write-Host ""
