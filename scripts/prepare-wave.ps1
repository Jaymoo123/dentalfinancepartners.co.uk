#requires -Version 5.1
<#
.SYNOPSIS
  Phase 1 of the wave pipeline: PREP. Run before launch-wave.ps1.

.DESCRIPTION
  Prepares a Property net-new wave for launch:
    1. Validates the launch prompts file exists
    2. Validates the 3 worktrees exist and are clean fast-forward against main
    3. Fast-forward merges main into each worktree branch (so worktrees have
       latest START_HERE docs, briefs, and permission settings)
    4. Extracts the 3 session prompts from WAVE{N}_LAUNCH_PROMPTS.md into
       docs/sessions/property/wave{N}_prompts/{a,b,c}.txt
    5. Verifies expected artefacts (tracker, flags, Q&A shells, discovery
       logs, START_HERE docs, briefs) exist

.PARAMETER Wave
  Wave number (e.g. 8 for Wave 8). Required.

.PARAMETER DryRun
  Show what would be done without making any changes.

.EXAMPLE
  ./scripts/prepare-wave.ps1 -Wave 8 -DryRun
  ./scripts/prepare-wave.ps1 -Wave 8
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [int]$Wave,

    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$accountingRoot    = 'C:\Users\user\Documents\Accounting'
$wtBase            = 'C:\Users\user\Documents'
$buckets           = @('a','b','c')
$launchPromptsFile = "$accountingRoot\docs\sessions\property\WAVE${Wave}_LAUNCH_PROMPTS.md"
$promptOutDir      = "$accountingRoot\docs\sessions\property\wave${Wave}_prompts"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

if ($DryRun) {
    Write-Host "[DRY-RUN MODE - no changes will be made]" -ForegroundColor Magenta
}

Write-Step "Preparing Wave $Wave"
Write-Host ""

# 1. Launch prompts file
Write-Step "1/5 Launch prompts file"
if (-not (Test-Path $launchPromptsFile)) {
    Write-Fail "Not found: $launchPromptsFile"
}
Write-OK "Found $launchPromptsFile"

# 2. Worktree existence + ff-mergeability
Write-Step "2/5 Validating worktrees"
$mainHead = (git -C $accountingRoot rev-parse main).Trim()
Write-OK "main HEAD: $mainHead"

foreach ($bucket in $buckets) {
    $wtDir  = "$wtBase\Accounting-wt-property-wave${Wave}-${bucket}"
    $branch = "property-wave${Wave}-${bucket}"

    if (-not (Test-Path $wtDir)) {
        Write-Fail "Worktree missing: $wtDir"
    }

    $ahead  = (git -C $accountingRoot rev-list --count "main..$branch").Trim()
    $behind = (git -C $accountingRoot rev-list --count "$branch..main").Trim()

    if ([int]$ahead -gt 0) {
        Write-Fail "Branch $branch is $ahead commit(s) ahead of main - not a clean ff. Resolve manually."
    }
    Write-OK "$branch : $behind behind main (clean ff)"
}

# 3. Fast-forward merge
Write-Step "3/5 Fast-forward merging main into worktree branches"
foreach ($bucket in $buckets) {
    $wtDir  = "$wtBase\Accounting-wt-property-wave${Wave}-${bucket}"
    $branch = "property-wave${Wave}-${bucket}"

    if ($DryRun) {
        Write-Warn "Would: git -C `"$wtDir`" merge --ff-only main"
        continue
    }

    $output = & git -C $wtDir merge --ff-only main 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Fail "ff-merge failed for ${branch}: $output"
    }
    $newHead = (git -C $wtDir rev-parse HEAD).Trim()
    Write-OK "$branch ff-merged to $newHead"
}

# 4. Extract prompts from WAVE{N}_LAUNCH_PROMPTS.md
Write-Step "4/5 Extracting launch prompts"
if (-not (Test-Path $promptOutDir)) {
    if ($DryRun) {
        Write-Warn "Would create directory: $promptOutDir"
    } else {
        New-Item -ItemType Directory -Path $promptOutDir -Force | Out-Null
        Write-OK "Created $promptOutDir"
    }
}

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
$content = [System.IO.File]::ReadAllText($launchPromptsFile, $utf8NoBom)
$pattern = '(?ms)## Session (?<bucket>[A-C]) [^\r\n]+\r?\n.*?```\r?\n(?<prompt>.*?)\r?\n```'
$promptMatches = [regex]::Matches($content, $pattern)

if ($promptMatches.Count -ne 3) {
    Write-Fail "Expected 3 session prompts in launch file, found $($promptMatches.Count)"
}

foreach ($m in $promptMatches) {
    $bucketLetter = $m.Groups['bucket'].Value.ToLower()
    $promptText   = $m.Groups['prompt'].Value.Trim()
    $outFile      = "$promptOutDir\$bucketLetter.txt"

    if ($DryRun) {
        Write-Warn "Would write: $outFile ($($promptText.Length) chars)"
    } else {
        [System.IO.File]::WriteAllText($outFile, $promptText, $utf8NoBom)
        Write-OK "Wrote $outFile ($($promptText.Length) chars)"
    }
}

# 5. Verify artefacts
Write-Step "5/5 Verifying artefacts"
$artefacts = @(
    "docs\property\wave${Wave}_page_tracker.md",
    "docs\property\wave${Wave}_site_wide_flags.md",
    "docs\property\wave${Wave}_questions_session_A.md",
    "docs\property\wave${Wave}_questions_session_B.md",
    "docs\property\wave${Wave}_questions_session_C.md",
    "docs\property\wave${Wave}_discovery_log_session_A.md",
    "docs\property\wave${Wave}_discovery_log_session_B.md",
    "docs\property\wave${Wave}_discovery_log_session_C.md",
    "docs\sessions\property\WAVE${Wave}_SESSION_A_START_HERE.md",
    "docs\sessions\property\WAVE${Wave}_SESSION_B_START_HERE.md",
    "docs\sessions\property\WAVE${Wave}_SESSION_C_START_HERE.md"
)

$missing = @()
foreach ($a in $artefacts) {
    if (-not (Test-Path "$accountingRoot\$a")) {
        $missing += $a
    }
}

if ($missing.Count -eq 0) {
    Write-OK "All $($artefacts.Count) artefacts present"
} else {
    Write-Warn "Missing $($missing.Count) artefact(s):"
    foreach ($m in $missing) { Write-Host "          - $m" -ForegroundColor Yellow }
}

# Brief count
$briefDir = "$accountingRoot\briefs\property\wave${Wave}"
if (Test-Path $briefDir) {
    $briefCount = (Get-ChildItem $briefDir -Filter '*.md' -File | Measure-Object).Count
    Write-OK "Briefs in $briefDir : $briefCount"
} else {
    Write-Warn "Brief dir missing: $briefDir"
}

Write-Host ""
Write-Host "=== Wave $Wave PREP complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. (Manual for now) Open 3 Windows Terminal tabs, one per worktree:"
foreach ($bucket in $buckets) {
    Write-Host "       $wtBase\Accounting-wt-property-wave${Wave}-${bucket}"
}
Write-Host "  2. In each, run: claude (Get-Content ../Accounting/docs/sessions/property/wave${Wave}_prompts/<bucket>.txt -Raw)"
Write-Host ""
Write-Host "Or wait for scripts/launch-wave.ps1 to be built (phase 2b)."
Write-Host ""
