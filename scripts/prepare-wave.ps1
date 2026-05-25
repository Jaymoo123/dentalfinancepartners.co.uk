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

    [string]$Site = 'property',
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

# Site config (Round 1 of rolling architecture)
. "$PSScriptRoot\_lib\site-config.ps1"

$cfg = Get-SiteConfig $Site
$accountingRoot    = $cfg.paths.repoRoot -replace '/', '\'
$wtBase            = $cfg.paths.worktreeBase -replace '/', '\'
$buckets           = $cfg.wave.buckets
$launchPromptsFile = Get-WaveArtefactPath -Config $cfg -Wave $Wave -Kind launchPrompts
$promptOutDir      = Get-WaveArtefactPath -Config $cfg -Wave $Wave -Kind promptExtractDir
$trackerFile       = Get-WaveArtefactPath -Config $cfg -Wave $Wave -Kind tracker
$blogRoutesDir     = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.blogRoutesDir

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
Write-Step "1/6 Launch prompts file"
if (-not (Test-Path $launchPromptsFile)) {
    Write-Fail "Not found: $launchPromptsFile"
}
Write-OK "Found $launchPromptsFile"

# 1b. Category validation against live blog routes (Bug #4 fix - prevents
#     F-4(C) Wave 8 trap where Bucket C used non-existent 'vat-for-landlords'
#     category and 9 pages would have 404'd at the category route layer)
Write-Step "2/6 Category validation against live blog routes"
if (-not (Test-Path $trackerFile)) {
    Write-Warn "Tracker not yet built ($trackerFile missing) - skipping category check"
} elseif (-not (Test-Path $blogRoutesDir)) {
    Write-Warn "Blog routes dir missing ($blogRoutesDir) - skipping category check"
} else {
    # Live categories = direct subdirs under blog/ excluding dynamic [...] and files
    $liveCategories = Get-ChildItem $blogRoutesDir -Directory |
        Where-Object { $_.Name -notmatch '^\[' } |
        Select-Object -ExpandProperty Name
    Write-OK "Live blog routes: $($liveCategories.Count) ($($liveCategories -join ', '))"

    # Parse tracker for Category column (5th cell in `| status | pos | slug | category | ...`)
    $utf8 = [System.Text.UTF8Encoding]::new($false)
    $trackerLines = [System.IO.File]::ReadAllText($trackerFile, $utf8) -split "`r?`n"
    $trackerCategories = @{}
    foreach ($line in $trackerLines) {
        # Skip header rows + separator rows
        if ($line -notmatch '^\|\s*[^\|\s]+\s*\|') { continue }
        if ($line -match '^\|\s*Status\s*\|' -or $line -match '^\|\s*-+\s*\|') { continue }
        $cells = ($line -split '\|') | ForEach-Object { $_.Trim() }
        # After split: cells[0]=empty, [1]=status, [2]=pos, [3]=slug, [4]=category
        if ($cells.Count -ge 5) {
            $cat = $cells[4]
            if ($cat -and $cat -notmatch '^-+$' -and $cat.Length -gt 0) {
                if (-not $trackerCategories.ContainsKey($cat)) { $trackerCategories[$cat] = 0 }
                $trackerCategories[$cat]++
            }
        }
    }

    $unknownCategories = @($trackerCategories.Keys | Where-Object { $liveCategories -notcontains $_ })
    if ($unknownCategories.Count -eq 0) {
        Write-OK "All tracker categories ($($trackerCategories.Keys.Count) distinct) map to live routes"
    } else {
        Write-Warn "$($unknownCategories.Count) tracker categor(y/ies) NOT a live blog route:"
        foreach ($cat in $unknownCategories) {
            $rowCount = $trackerCategories[$cat]
            Write-Host "          - '$cat' (used in $rowCount row(s))" -ForegroundColor Yellow
        }
        Write-Warn "Sub-agents must override category in page frontmatter, OR create the route in Property/web/src/app/blog/<cat>/page.tsx, OR conductor revises the tracker pre-launch. Not blocking PREP."
    }
}

# 2. Worktree existence + ff-mergeability
Write-Step "3/6 Validating worktrees"
$mainHead = (git -C $accountingRoot rev-parse main).Trim()
Write-OK "main HEAD: $mainHead"

foreach ($bucket in $buckets) {
    $wtDir  = Resolve-WorktreePath -Config $cfg -Wave $Wave -Bucket $bucket
    $branch = Resolve-BranchName -Config $cfg -Wave $Wave -Bucket $bucket

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
Write-Step "4/6 Fast-forward merging main into worktree branches"
foreach ($bucket in $buckets) {
    $wtDir  = Resolve-WorktreePath -Config $cfg -Wave $Wave -Bucket $bucket
    $branch = Resolve-BranchName -Config $cfg -Wave $Wave -Bucket $bucket

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
Write-Step "5/6 Extracting launch prompts"
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
Write-Step "6/6 Verifying artefacts"
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
$briefDir = (Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.briefsDir + '/' + (Resolve-Naming $cfg.naming.briefSubdir -Wave $Wave)))
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
    Write-Host "       $(Resolve-WorktreePath -Config $cfg -Wave $Wave -Bucket $bucket)"
}
Write-Host "  2. In each, run: claude (Get-Content ../Accounting/docs/sessions/property/wave${Wave}_prompts/<bucket>.txt -Raw)"
Write-Host ""
Write-Host "Or wait for scripts/launch-wave.ps1 to be built (phase 2b)."
Write-Host ""
