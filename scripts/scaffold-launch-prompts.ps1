#requires -Version 5.1
<#
.SYNOPSIS
  Round 3 of PRE-launch automation: scaffold WAVE{N}_LAUNCH_PROMPTS.md +
  3 START_HERE files from prior-wave templates.

.DESCRIPTION
  Generates the RUN-phase sub-agent prompts the conductor needs before
  prepare-wave.ps1:
    docs/sessions/property/WAVE{N}_LAUNCH_PROMPTS.md
    docs/sessions/property/WAVE{N}_SESSION_A_START_HERE.md
    docs/sessions/property/WAVE{N}_SESSION_B_START_HERE.md
    docs/sessions/property/WAVE{N}_SESSION_C_START_HERE.md

  Reads prior wave's files (default N-1) as templates. Substitutes
  wave-number tokens. INJECTS the Bug #2 fix (per-bucket F-number ranges
  to prevent duplicate numbering across sessions like Wave 8 had):

    Session A: F-1 to F-9
    Session B: F-10 to F-19
    Session C: F-20 to F-29

  Per-wave content (bucket themes, specific drift watchpoints, brief
  slugs) is NOT updated by this script - the conductor edits the
  generated files to substitute wave-specific theme/bucket descriptions
  + drift watchpoints based on the Stage 1b + Stage 2b discoveries.

  The scaffold is structural; the content is judgment-driven.

.PARAMETER Wave
  New wave number (e.g. 9). Required.

.PARAMETER PriorWave
  Source wave number for templates (default: Wave - 1).

.PARAMETER Force
  Overwrite if WAVE{N} files already exist.

.PARAMETER DryRun
  Show what would be created without writing.

.EXAMPLE
  ./scripts/scaffold-launch-prompts.ps1 -Wave 9
  ./scripts/scaffold-launch-prompts.ps1 -Wave 9 -PriorWave 8 -DryRun
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
$sessionsDir    = "$accountingRoot\docs\sessions\property"

# Per-bucket F-number range (Bug #2 fix)
$fRanges = @{
    A = 'F-1 to F-9'
    B = 'F-10 to F-19'
    C = 'F-20 to F-29'
}

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

function Convert-WaveTokens {
    param([string]$Text, [int]$From, [int]$To)
    $Text = $Text -replace "Wave $From\b",   "Wave $To"
    $Text = $Text -replace "WAVE${From}\b",  "WAVE${To}"
    $Text = $Text -replace "wave${From}_",   "wave${To}_"
    $Text = $Text -replace "wave/?${From}/", "wave${To}/"
    $Text = $Text -replace "property-wave${From}-", "property-wave${To}-"
    $Text = $Text -replace "Accounting-wt-property-wave${From}-", "Accounting-wt-property-wave${To}-"
    return $Text
}

function Add-FRangeNote {
    param([string]$Text, [string]$Bucket)
    # Idempotency: if F-range note already present, leave it
    if ($Text -match 'F-numbering range') { return $Text }
    $range = $fRanges[$Bucket]
    # Inject after the first Q&A discipline reminder line (per-bucket prompts have one)
    $injection = "`n`n**F-numbering range (Bug #2 fix - prevents cross-session F-number collisions like Wave 8 F-4 dupe):** when raising flags in this session's bucket, use F-numbers in the range **$range** ONLY. Do not use F-numbers outside this range even if the next available number sequentially appears free.`n"
    # Find a stable anchor - the Q&A discipline reminder block
    if ($Text -match '(?ms)(\*\*Q&A discipline[^*]+\*\*[^\n]+\n[^\n]+\n)') {
        $anchor = $Matches[1]
        return $Text.Replace($anchor, $anchor + $injection)
    }
    # Fallback: append at end
    return $Text + $injection
}

function Add-AutonomyClause {
    param([string]$Text)
    # Idempotency: if autonomy clause already present, leave it
    if ($Text -match 'Work autonomously') { return $Text }
    # Inject IMMEDIATELY after the acknowledgment-line instruction so it's clear
    # that ack is the ONLY pause-point
    $injection = "`n`n**Work autonomously (Bug #7 fix from Wave 9 - sub-agents B + C sat idle for 3h waiting for 'continue'):** the acknowledgment line above is the ONLY user-facing pause-point. After acknowledging, immediately claim the first page/brief and run the full workflow through to commit. After committing one work unit (page or brief + tracker flip to in-progress/done), IMMEDIATELY claim the next unit and continue. Do NOT pause between units. Do NOT ask 'should I proceed?' or 'ready for the next one?' - proceed. Stop ONLY when: (a) ALL units in your bucket are committed and tracker shows all done; (b) you hit a real blocker requiring a manager Q-N (use bracketed ## [Q-N] format per Bug #6); (c) you encounter a build failure you cannot resolve.`n"
    # Find a stable anchor - the acknowledgment-line instruction
    if ($Text -match '(?ms)(Acknowledge with one short status line[^\n]+\n)') {
        $anchor = $Matches[1]
        return $Text.Replace($anchor, $anchor + $injection)
    }
    # Fallback: append near end
    return $Text + $injection
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

Write-Step "Scaffold launch prompts: Wave $Wave (from Wave $PriorWave templates)"
Write-Host ""

# 1. WAVE{N}_LAUNCH_PROMPTS.md
Write-Step "1/4 WAVE${Wave}_LAUNCH_PROMPTS.md"
$priorLaunchFile = "$sessionsDir\WAVE${PriorWave}_LAUNCH_PROMPTS.md"
if (-not (Test-Path $priorLaunchFile)) {
    Write-Fail "Prior launch prompts file missing: $priorLaunchFile"
}
$priorLaunch = [System.IO.File]::ReadAllText($priorLaunchFile, $utf8NoBom)
$launchOut = Convert-WaveTokens -Text $priorLaunch -From $PriorWave -To $Wave

# Inject F-range note AND autonomy clause into each bucket's fenced code block
# Strategy: split into segments by "## Session X" markers, process each, rejoin
$segments = [regex]::Split($launchOut, '(?ms)(?=^## Session [A-C])')
for ($i = 0; $i -lt $segments.Count; $i++) {
    if ($segments[$i] -match '^## Session ([A-C])') {
        $bucket = $Matches[1]
        # Within this segment, inject F-range note + autonomy clause
        $segments[$i] = Add-FRangeNote -Text $segments[$i] -Bucket $bucket
        $segments[$i] = Add-AutonomyClause -Text $segments[$i]
    }
}
$launchOut = $segments -join ''

# Mark status as needs-conductor-review (the bucket descriptions + drift
# watchpoints need per-wave updating; this scaffold is structural only)
if ($launchOut -match '(?m)^\*\*Status as of[^*]+\*\*\s+([^\n]+)') {
    $launchOut = $launchOut -replace '(?m)^\*\*Status as of[^*]+\*\*\s+[^\n]+', "**Status as of $(Get-Date -Format 'yyyy-MM-dd'):** SCAFFOLDED FROM WAVE $PriorWave - conductor must update bucket descriptions, drift watchpoints, brief lineup, and Status header before launch. F-numbering ranges injected per bucket (Bug #2 fix)."
}

Write-Artefact "$sessionsDir\WAVE${Wave}_LAUNCH_PROMPTS.md" $launchOut

# 2-4. Per-bucket START_HERE files
for ($i = 0; $i -lt $buckets.Count; $i++) {
    $X = $buckets[$i]
    $stepNum = $i + 2
    Write-Step "$stepNum/4 WAVE${Wave}_SESSION_${X}_START_HERE.md"
    $priorSHFile = "$sessionsDir\WAVE${PriorWave}_SESSION_${X}_START_HERE.md"
    if (-not (Test-Path $priorSHFile)) {
        Write-Warn "Prior START_HERE missing: $priorSHFile (skipping bucket $X)"
        continue
    }
    $priorSH = [System.IO.File]::ReadAllText($priorSHFile, $utf8NoBom)
    $shOut = Convert-WaveTokens -Text $priorSH -From $PriorWave -To $Wave
    $shOut = Add-FRangeNote -Text $shOut -Bucket $X
    $shOut = Add-AutonomyClause -Text $shOut
    Write-Artefact "$sessionsDir\WAVE${Wave}_SESSION_${X}_START_HERE.md" $shOut
}

Write-Host ""
Write-Host "=== Wave $Wave launch prompts SCAFFOLDED ===" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT: this is a STRUCTURAL scaffold only. Conductor MUST review + update:"
Write-Host "  - Bucket A/B/C topic descriptions (currently still Wave $PriorWave themes)"
Write-Host "  - Per-bucket brief slug lineup (currently Wave $PriorWave slugs)"
Write-Host "  - Critical drift watchpoints (currently Wave $PriorWave catches)"
Write-Host "  - Cross-bucket sequencing constraints"
Write-Host "  - Status header line (auto-set to SCAFFOLDED placeholder)"
Write-Host ""
Write-Host "Per-bucket F-numbering ranges have been injected automatically (Bug #2 fix)."
Write-Host ""
Write-Host "Next: edit the generated files, then ./scripts/prepare-wave.ps1 -Wave $Wave"
