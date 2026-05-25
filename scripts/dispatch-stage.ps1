#requires -Version 5.1
<#
.SYNOPSIS
  Round 3 of PRE-launch automation: dispatch sub-agents for Stage 1 (brief
  seeds) or Stage 2 (full briefs). Mirror of launch-wave.ps1 pattern.

.DESCRIPTION
  Spawns 3 Windows Terminal tabs, one per worktree (or ephemeral worktrees
  for Stage 1 - see note below), each running `claude --name
  "Wave{N}-Stage{1|2}-{X}"` with the bucket's stage-specific prompt
  pre-loaded.

  Reads prompts from docs/sessions/property/wave{N}_stage{1|2}_prompts/
  {a,b,c}.txt. Those prompt files are extracted via scaffold-launch-prompts.ps1
  -Stage {stage} from WAVE{N}_STAGE{1|2}_PROMPTS.md (the conductor's
  per-stage source-of-truth markdown).

  Stage 1 (brief seeds): sub-agents read picks.yaml + house_positions.md,
  emit skeleton briefs to briefs/property/wave{N}/<slug>.md (title, slug,
  statutory anchors, manager pre-decisions placeholder). Sequential per
  bucket - no parallel write conflicts because each bucket writes its own
  subset.

  Stage 2 (full briefs): sub-agents extend the Stage 1 seeds with
  competitor URLs, closest-existing pages Jaccard, authority links,
  universal rules, workflow, work-log stubs. The Stage 2 prompt template
  MUST contain the Bug #3 URL-liveness guardrail: "For each competitor URL
  you propose listing, WebFetch + confirm HTTP 200 + on-topic content;
  delete URLs that 404/403/off-topic; do not invent plausible URLs."

  Worktree usage: same wave{N}-{a,b,c} worktrees are reused across Stage
  1 + Stage 2 + RUN. Stage 1 commits seeds; Stage 2 commits extensions;
  RUN commits actual pages.

.PARAMETER Wave
  Wave number (e.g. 9). Required.

.PARAMETER Stage
  Stage number: 1 (brief seeds) or 2 (full briefs). Required.

.PARAMETER DryRun
  Show what would be spawned without launching.

.PARAMETER Force
  Skip the cold-start protection (e.g. relaunch after stall).

.EXAMPLE
  ./scripts/dispatch-stage.ps1 -Wave 9 -Stage 1
  ./scripts/dispatch-stage.ps1 -Wave 9 -Stage 2 -DryRun
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [int]$Wave,

    [Parameter(Mandatory=$true)]
    [ValidateSet(1,2)]
    [int]$Stage,

    [switch]$DryRun,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'

# Shared tracker reader (Bug #1 helper)
. "$PSScriptRoot\_lib\tracker-utils.ps1"

$accountingRoot = 'C:\Users\user\Documents\Accounting'
$wtBase         = 'C:\Users\user\Documents'
$buckets        = @('a','b','c')
$promptDir      = "$accountingRoot\docs\sessions\property\wave${Wave}_stage${Stage}_prompts"
$briefsDir      = "$accountingRoot\briefs\property\wave${Wave}"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

if ($DryRun) { Write-Host "[DRY-RUN MODE - no tabs will be spawned]" -ForegroundColor Magenta }

Write-Step "Dispatching Wave $Wave Stage $Stage sub-agents"
Write-Host ""

# 1. wt.exe available
Write-Step "1/4 Checking wt.exe"
$wt = Get-Command wt -ErrorAction SilentlyContinue
if (-not $wt) {
    Write-Fail "wt.exe not on PATH. Install Windows Terminal or dispatch sessions manually."
}
Write-OK "wt.exe at $($wt.Source)"

# 2. Prompts + worktrees exist
Write-Step "2/4 Validating prompts + worktrees"
if (-not (Test-Path $promptDir)) {
    Write-Fail "Stage $Stage prompt dir missing: $promptDir`n          Run: ./scripts/scaffold-launch-prompts.ps1 -Wave $Wave -Stage $Stage"
}
foreach ($bucket in $buckets) {
    $wtDir      = "$wtBase\Accounting-wt-property-wave${Wave}-${bucket}"
    $promptFile = "$promptDir\$bucket.txt"

    if (-not (Test-Path $wtDir))      { Write-Fail "Worktree missing: $wtDir`n          Create via: git worktree add $wtDir -b property-wave${Wave}-${bucket}" }
    if (-not (Test-Path $promptFile)) { Write-Fail "Prompt missing: $promptFile" }

    $size = (Get-Item $promptFile).Length
    Write-OK "bucket $bucket | worktree present | prompt $size bytes"
}

# 3. Stage-specific cold-start protection
Write-Step "3/4 Cold-start check"
if ($Stage -eq 1) {
    # Stage 1 produces brief skeletons; refuse if briefs already exist
    if (Test-Path $briefsDir) {
        $existingBriefs = @(Get-ChildItem $briefsDir -Filter '*.md' -File -ErrorAction SilentlyContinue)
        $briefCount = $existingBriefs.Count
        if ($briefCount -gt 0 -and -not $Force) {
            Write-Fail "Stage 1 cold-start: $briefCount brief(s) already exist in $briefsDir`n          Re-run with -Force only if you intend to overwrite seed briefs."
        }
        if ($briefCount -gt 0) {
            Write-Warn "$briefCount existing brief(s); proceeding due to -Force"
        } else {
            Write-OK "briefs/wave${Wave}/ exists but is empty"
        }
    } else {
        Write-OK "briefs/wave${Wave}/ does not yet exist (will be created by sub-agents)"
    }
} else {
    # Stage 2 expects Stage 1 seeds to exist
    if (-not (Test-Path $briefsDir)) {
        Write-Fail "Stage 2 expects Stage 1 seeds at $briefsDir but directory missing.`n          Run Stage 1 first: ./scripts/dispatch-stage.ps1 -Wave $Wave -Stage 1"
    }
    $seedBriefs = @(Get-ChildItem $briefsDir -Filter '*.md' -File -ErrorAction SilentlyContinue)
    $seedCount = $seedBriefs.Count
    if ($seedCount -eq 0) {
        Write-Fail "Stage 2 expects Stage 1 seeds at $briefsDir but no .md files present.`n          Run Stage 1 first."
    }
    Write-OK "Stage 1 seeds present: $seedCount brief file(s)"
}

# 4. Spawn 3 tabs
Write-Step "4/4 Spawning 3 Windows Terminal tabs"
foreach ($bucket in $buckets) {
    $bucketUpper = $bucket.ToUpper()
    $wtDir       = "$wtBase\Accounting-wt-property-wave${Wave}-${bucket}"
    $promptFile  = "$promptDir\$bucket.txt"
    $sessionName = "Wave${Wave}-Stage${Stage}-${bucketUpper}"

    # Inner command runs inside spawned tab. Single quotes around session name
    # and prompt path so inner shell takes them literally.
    $innerCmd = "claude --name '$sessionName' (Get-Content '$promptFile' -Raw)"

    if ($DryRun) {
        Write-Warn "Would spawn: wt new-tab -d `"$wtDir`" --title `"$sessionName`""
        Write-Host "              inner: $innerCmd" -ForegroundColor DarkGray
        continue
    }

    try {
        Start-Process -FilePath wt -ArgumentList @(
            'new-tab',
            '-d', $wtDir,
            '--title', $sessionName,
            '--',
            'powershell', '-NoExit', '-Command', $innerCmd
        ) | Out-Null
        Write-OK "Spawned $sessionName in $wtDir"
    } catch {
        Write-Warn "wt new-tab failed for ${sessionName}: $_"
        Write-Host "          Fallback - open a Windows Terminal tab manually at:" -ForegroundColor Yellow
        Write-Host "            $wtDir" -ForegroundColor Yellow
        Write-Host "          Then run:" -ForegroundColor Yellow
        Write-Host "            $innerCmd" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== Wave $Wave Stage $Stage DISPATCHED ===" -ForegroundColor Green
Write-Host ""
$nextHint = if ($Stage -eq 1) {
    @"
  1. Sub-agents emit Stage 1 brief seeds to briefs/property/wave${Wave}/<slug>.md
  2. When all 3 sessions complete: conductor reviews Stage 1b drift catches in
     wave${Wave}_site_wide_flags.md (statute-citation drift per Section 16.36)
  3. Manager applies any HP-lock corrections from drift
  4. Then: ./scripts/dispatch-stage.ps1 -Wave $Wave -Stage 2
"@
} else {
    @"
  1. Sub-agents extend Stage 1 seeds with full Stage 2 content
     (Bug #3 fix MUST be in Stage 2 prompt: every competitor URL WebFetch-verified)
  2. When all 3 sessions complete: conductor reviews Stage 2b drift catches
  3. Manager applies HP-lock corrections + spot-checks 3-5 briefs per bucket
  4. Then: ./scripts/scaffold-launch-prompts.ps1 -Wave $Wave (build RUN prompts)
  5. Then: ./scripts/prepare-wave.ps1 -Wave $Wave
  6. Then: ./scripts/launch-wave.ps1 -Wave $Wave
"@
}
Write-Host $nextHint
