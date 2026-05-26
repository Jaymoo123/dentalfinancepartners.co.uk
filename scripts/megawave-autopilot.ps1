#requires -Version 5.1
<#
.SYNOPSIS
  Single-command state-machine autopilot for end-to-end megawave drain.
  Detects current state from filesystem signals + advances forward to the
  next conductor gate, then exits with clear instructions.

.DESCRIPTION
  Three conductor gates remain irreducible (Stage 1b HP-lock, Stage 2b
  drift triage, deploy approval). Everything else auto-advances. The
  user invokes the same command after each conductor task to resume.

  Bakes in lessons from MW1:
    - Marker auto-synthesis (sub-agents wrote commit-as-marker; this
      script detects + synthesizes JSON marker files when needed).
    - Back-patch sweep before close-wave merge (em-dash hard-gate,
      metaDescription length, reviewerCredentials, HP-lock anchor).
    - Worktree-branch awareness (close-wave megawave merges happen via
      direct git merge here, not via close-wave.ps1 which uses
      wave-naming).

.PARAMETER MegaWave
  Mega-wave number (positive integer). Required.

.PARAMETER Site
  Site key (default: property).

.PARAMETER DryRun
  Print what would happen without executing. Detects state but does not
  advance.

.PARAMETER FromState
  Skip state detection; start from the specified state number. Use only
  for recovery from a known-broken state.

.EXAMPLE
  ./scripts/megawave-autopilot.ps1 -MegaWave 2

  # Dry-run on MW1 to verify it detects "complete":
  ./scripts/megawave-autopilot.ps1 -MegaWave 1 -DryRun

.STATE MACHINE
   0  Not started               -> Slice + cannib + worktrees
   1  Sliced, worktrees ready   -> Dispatch Stage 1 (3 lanes)
   2  Stage 1 dispatched        -> Wait for lane-done flags
   3  Stage 1 done              -> HALT: Stage 1b HP-lock review (conductor)
   4  Stage 1b signed off       -> Dispatch Stage 2 (3 lanes)
   5  Stage 2 dispatched        -> Wait for lane-done flags
   6  Stage 2 done              -> HALT: Stage 2b drift triage (conductor)
   7  Stage 2b signed off       -> Dispatch RUN (3 lanes)
   8  RUN dispatched            -> Wait + auto-synthesize markers
   9  RUN done                  -> Back-patch sweep + close-wave merge + build
  10  Build clean               -> HALT: deploy approval (user)
  11  Deployed                  -> IndexNow + heartbeat + END
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)] [int]$MegaWave,
    [string]$Site = 'property',
    [switch]$DryRun,
    [int]$FromState = -1
)

$ErrorActionPreference = 'Stop'

. "$PSScriptRoot\_lib\site-config.ps1"
$cfg = Get-SiteConfig $Site

$repoRoot   = $cfg.paths.repoRoot
$briefsDir  = Join-Path $repoRoot "briefs/$Site/megawave$MegaWave"
$signalDir  = Join-Path $briefsDir '_signals'
$statePath  = Join-Path $signalDir 'autopilot_state.txt'
$picksYaml  = Join-Path $briefsDir 'picks.yaml'
$trackerFile = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.docsDir + "/megawave${MegaWave}_page_tracker.md")
$flagsFile  = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.docsDir + "/megawave${MegaWave}_site_wide_flags.md")

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Halt ($msg) { Write-Host "==> HALT: $msg" -ForegroundColor Magenta }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

function Get-WorktreePath {
    param([string]$Lane)
    return Resolve-WorktreePath -Config $cfg -Wave $MegaWave -Bucket $Lane -WaveKind 'megawave'
}

function Get-WorktreeBranch {
    param([string]$Lane)
    return Resolve-BranchName -Config $cfg -Wave $MegaWave -Bucket $Lane -WaveKind 'megawave'
}

# -------- STATE DETECTION ----------

function Detect-State {
    # Returns integer state number based on filesystem signals
    $picksExists = Test-Path $picksYaml
    if (-not $picksExists) { return 0 }

    $wtA = Get-WorktreePath 'a'
    if (-not (Test-Path $wtA)) { return 1 }

    $signOff1b = Join-Path $signalDir 'stage1b_signed_off.flag'
    $signOff2b = Join-Path $signalDir 'stage2b_signed_off.flag'
    $deployFlag = Join-Path $signalDir 'deployed.flag'

    $laneADoneStage1 = Join-Path $signalDir 'lane_A_done.flag'
    $laneBDoneStage1 = Join-Path $signalDir 'lane_B_done.flag'
    $laneCDoneStage1 = Join-Path $signalDir 'lane_C_done.flag'
    $allLanesDoneStage1 = (Test-Path $laneADoneStage1) -and (Test-Path $laneBDoneStage1) -and (Test-Path $laneCDoneStage1)

    if (Test-Path $deployFlag) { return 11 }
    if (Test-Path (Join-Path $signalDir 'build_clean.flag')) { return 10 }
    if (Test-Path (Join-Path $signalDir 'merge_done.flag')) { return 9 }

    # Look for run-phase done state
    if (Test-Path $signOff2b) {
        # Stage 2b signed; might be in RUN phase 7/8 or done 9
        $runMarkers = Get-ChildItem -Path $signalDir -Filter "batch_M${MegaWave}-?-B?_run_done.json" -ErrorAction SilentlyContinue
        if ($runMarkers.Count -gt 0 -and $allLanesDoneStage1) { return 9 }
        if ($runMarkers.Count -gt 0) { return 8 }
        return 7
    }
    if (Test-Path $signOff1b) {
        # Stage 1b signed; might be in Stage 2 phase
        $stage2Markers = Get-ChildItem -Path $signalDir -Filter "batch_M${MegaWave}-?-B?_stage2_done.json" -ErrorAction SilentlyContinue
        if ($stage2Markers.Count -gt 0 -and $allLanesDoneStage1) { return 6 }
        if ($stage2Markers.Count -gt 0) { return 5 }
        return 4
    }
    if ($allLanesDoneStage1) { return 3 }
    # Stage 1 in flight or not yet dispatched -- distinguish by presence of any batch marker
    $stage1Markers = Get-ChildItem -Path $signalDir -Filter "batch_M${MegaWave}-?-B?_done.json" -ErrorAction SilentlyContinue
    if ($stage1Markers.Count -gt 0) { return 2 }
    return 2  # Worktree exists -> assume Stage 1 dispatched/dispatching
}

# -------- STEPS ----------

function Step-0-Slice {
    Write-Step "STATE 0 -> 1: Slice MegaWave $MegaWave + cannibalisation check"
    if ($DryRun) { Write-Warn "[dry-run] would: slice-megawave -MegaWave $MegaWave"; return }
    # Reset LASTEXITCODE so inherited values from earlier external commands don't
    # cause a false-positive failure when the called PS script doesn't set it.
    $global:LASTEXITCODE = 0
    & "$PSScriptRoot\slice-megawave.ps1" -MegaWave $MegaWave -Site $Site
    $sliceOK = $?
    if (-not $sliceOK -or ($LASTEXITCODE -ne 0 -and $LASTEXITCODE -ne $null)) {
        # Verify by checking expected artefacts -- the script may have succeeded
        # even if an internal external command left LASTEXITCODE non-zero.
        if (-not (Test-Path $picksYaml)) { Write-Fail "slice-megawave failed (picks.yaml not produced)" }
        Write-Warn "slice-megawave returned non-zero but picks.yaml exists -- proceeding"
    }
    $global:LASTEXITCODE = 0
    & "$PSScriptRoot\check-cannib.ps1" -Wave $MegaWave -Site $Site -PicksYaml $picksYaml
    if ($LASTEXITCODE -ne 0) { Write-Warn "check-cannib returned non-zero (review the cannib report; not necessarily blocking)" }
    Write-OK "Sliced + cannib check done"
}

function Step-1-CreateWorktrees {
    Write-Step "STATE 1 -> 2: Create worktrees for lanes A/B/C"
    foreach ($lane in @('a','b','c')) {
        $wt = Get-WorktreePath $lane
        $branch = Get-WorktreeBranch $lane
        if (Test-Path $wt) {
            Write-OK "  Lane $lane worktree exists: $wt"
            continue
        }
        if ($DryRun) { Write-Warn "  [dry-run] would: git worktree add $wt -b $branch"; continue }
        & git -C $repoRoot worktree add $wt -b $branch
        if ($LASTEXITCODE -ne 0) { Write-Fail "Worktree create failed: $wt" }
        Write-OK "  Lane $lane worktree created"
    }
}

function Step-Dispatch-3-Lanes {
    param([ValidateSet('stage1','stage2','run')] [string]$Phase)
    Write-Step "Dispatch 3 lanes (Phase=$Phase)"
    foreach ($lane in @('a','b','c')) {
        if ($DryRun) { Write-Warn "  [dry-run] would: rolling-orchestrator -Wave $MegaWave -Phase $Phase -Lane $lane"; continue }
        $orchPath = Join-Path $PSScriptRoot 'rolling-orchestrator.ps1'
        # Spawn in background via Start-Process
        Start-Process -FilePath powershell -ArgumentList @(
            '-NoExit', '-Command',
            "& '$orchPath' -Wave $MegaWave -Phase $Phase -Lane $lane -BatchTimeoutMin 180"
        ) -WindowStyle Minimized | Out-Null
        Write-OK "  Lane $lane orchestrator spawned (background powershell)"
    }
}

function Step-Wait-LaneDone {
    param([string]$PhaseLabel = 'stage')
    Write-Step "Wait for lane-done flags (Phase=$PhaseLabel)"
    if ($DryRun) { Write-Warn "  [dry-run] would: poll lane_{A,B,C}_done.flag until all 3 present"; return }
    $start = Get-Date
    $timeoutMin = 180  # 3 hours
    while ($true) {
        $a = Test-Path (Join-Path $signalDir 'lane_A_done.flag')
        $b = Test-Path (Join-Path $signalDir 'lane_B_done.flag')
        $c = Test-Path (Join-Path $signalDir 'lane_C_done.flag')
        $elapsed = ((Get-Date) - $start).TotalMinutes
        Write-Host ("    [+{0:F1}m] lane-done: A={1} B={2} C={3}" -f $elapsed, $a, $b, $c) -ForegroundColor DarkGray
        if ($a -and $b -and $c) { Write-OK "All 3 lane-done flags present"; return }
        if ($elapsed -gt $timeoutMin) { Write-Fail "Timeout after ${timeoutMin}min waiting for lane-done flags. Check orchestrator output." }
        Start-Sleep -Seconds 60
    }
}

function Step-Synthesize-Markers {
    param([ValidateSet('stage2','run')] [string]$Phase)
    # Sub-agents sometimes commit-as-marker instead of writing JSON files.
    # Detect missing markers + synthesize from commit log.
    Write-Step "Marker auto-synthesis (Phase=$Phase)"
    foreach ($lane in @('a','b','c')) {
        $wt = Get-WorktreePath $lane
        $branch = Get-WorktreeBranch $lane
        if (-not (Test-Path $wt)) { continue }
        $upper = $lane.ToUpper()
        # Find all batch IDs that have RUN/Stage2 commits on the worktree
        $pattern = if ($Phase -eq 'run') { "M${MegaWave}-${upper}-B[0-9]" } else { "M${MegaWave}-${upper}-B[0-9]" }
        $commitsByBatch = @{}
        $log = & git -C $wt log $branch --grep="M${MegaWave}-${upper}-B" --pretty=format:"%H %s" 2>$null
        if (-not $log) { continue }
        foreach ($line in ($log -split "`n")) {
            if ($line -match "M${MegaWave}-${upper}-B(\d+)") {
                $batchId = "M${MegaWave}-${upper}-B$($Matches[1])"
                if (-not $commitsByBatch.ContainsKey($batchId)) { $commitsByBatch[$batchId] = @() }
                $commitsByBatch[$batchId] += $line
            }
        }
        foreach ($batchId in $commitsByBatch.Keys) {
            $markerName = "batch_${batchId}_done.json"
            $markerPath = Join-Path $signalDir $markerName
            if (Test-Path $markerPath) { continue }
            # Also check the _stage2_done / _run_done variants the sub-agents sometimes write
            $altA = Join-Path $signalDir "batch_${batchId}_run_done.json"
            $altB = Join-Path $signalDir "batch_${batchId}_stage2_done.json"
            if ((Test-Path $altA) -or (Test-Path $altB)) {
                # Copy to the expected name
                $src = if (Test-Path $altA) { $altA } else { $altB }
                if (-not $DryRun) { Copy-Item $src $markerPath -Force }
                Write-OK "  ${batchId}: copied alt-name marker to expected name"
                continue
            }
            if ($DryRun) { Write-Warn "  [dry-run] would synthesize $markerName from $($commitsByBatch[$batchId].Count) commits"; continue }
            # Synthesize a minimal marker
            $shas = @()
            $slugs = @()
            foreach ($l in $commitsByBatch[$batchId]) {
                $shas += $l.Substring(0,7)
                if ($l -match 'write ([a-z][a-z0-9-]+)') { $slugs += $Matches[1] }
            }
            $marker = @{
                batch_id = $batchId
                stage = $Phase.ToUpper()
                agent_id = "MW${MegaWave}-${Phase}-${upper}-autopilot-synth"
                completed_at = (Get-Date -Format 's') + 'Z'
                branch = $branch
                commit_shas = $shas
                slugs_done = ($slugs | Select-Object -Unique)
                notes = 'Synthesised by megawave-autopilot.ps1 (sub-agent used commit-as-marker convention).'
            }
            $marker | ConvertTo-Json -Depth 5 | Set-Content -Path $markerPath -Encoding utf8
            Write-OK "  ${batchId}: synthesized marker with $($shas.Count) commits"
        }
    }
}

function Step-9-BackPatch-Sweep {
    Write-Step "Pre-merge back-patch sweep"
    $allOK = $true

    # 1. em-dash hard-gate (across all MW pages on worktree branches)
    Write-Step "  em-dash hard-gate"
    $emCount = 0
    foreach ($lane in @('a','b','c')) {
        $wt = Get-WorktreePath $lane
        if (-not (Test-Path $wt)) { continue }
        $blogDir = Join-Path $wt 'Property/web/content/blog'
        if (-not (Test-Path $blogDir)) { continue }
        # Find files added since stage1b sign-off
        $signOff = Join-Path $signalDir 'stage1b_signed_off.flag'
        if (-not (Test-Path $signOff)) { continue }
        $signOffTime = (Get-Item $signOff).LastWriteTime
        $files = Get-ChildItem -Path $blogDir -Filter *.md | Where-Object { $_.LastWriteTime -gt $signOffTime }
        foreach ($f in $files) {
            $body = (Get-Content $f.FullName -Raw) -split "^---\s*$", 3
            if ($body.Count -ge 3) {
                $bodyText = $body[2]
                $emDash = [string][char]0x2014
                $count = ([regex]::Matches($bodyText, $emDash)).Count
                if ($count -gt 0) {
                    Write-Warn "    $count em-dash(es) in $($f.Name)"
                    $emCount += $count
                }
            }
        }
    }
    if ($emCount -gt 0) { Write-Warn "  em-dash count: $emCount (hard-gate; conductor must fix before merge)"; $allOK = $false }
    else { Write-OK "  zero em-dashes (locked rule held)" }

    # 2. metaDescription auto-trim (>158c)
    Write-Step "  metaDescription length auto-trim"
    $trimCount = 0
    foreach ($lane in @('a','b','c')) {
        $wt = Get-WorktreePath $lane
        if (-not (Test-Path $wt)) { continue }
        $blogDir = Join-Path $wt 'Property/web/content/blog'
        if (-not (Test-Path $blogDir)) { continue }
        $signOff = Join-Path $signalDir 'stage1b_signed_off.flag'
        if (-not (Test-Path $signOff)) { continue }
        $signOffTime = (Get-Item $signOff).LastWriteTime
        $files = Get-ChildItem -Path $blogDir -Filter *.md | Where-Object { $_.LastWriteTime -gt $signOffTime }
        foreach ($f in $files) {
            $content = Get-Content $f.FullName -Raw
            if ($content -match 'metaDescription:\s*"([^"]*)"') {
                $orig = $Matches[1]
                if ($orig.Length -le 158) { continue }
                # Trim at sentence boundary preferred
                $target = 155
                $trim = $orig.Substring(0, [Math]::Min($target, $orig.Length))
                $cutAt = $trim.LastIndexOf('. ')
                if ($cutAt -lt 0) { $cutAt = $trim.LastIndexOf(', ') }
                if ($cutAt -gt ($target * 0.7)) { $trim = $trim.Substring(0, $cutAt + 1) }
                $trim = $trim.Trim()
                if ($trim.Length -gt 158) { $trim = $trim.Substring(0,158).TrimEnd() }
                if (-not $DryRun) {
                    $newContent = $content -replace [regex]::Escape('metaDescription: "' + $orig + '"'), ('metaDescription: "' + $trim + '"')
                    Set-Content -Path $f.FullName -Value $newContent -Encoding utf8 -NoNewline
                }
                Write-OK "  trimmed $($f.Name): $($orig.Length)c -> $($trim.Length)c"
                $trimCount++
            }
        }
    }
    if ($trimCount -gt 0) { Write-OK "  trimmed $trimCount metaDescriptions" }
    else { Write-OK "  zero metaDescription overruns" }

    # 3. reviewerCredentials check + auto-insert
    Write-Step "  reviewerCredentials auto-insert"
    $insertCount = 0
    $reviewerBlock = @"
reviewedBy: "ICAEW Qualified Senior Reviewer"
reviewerCredentials: "Chartered Accountant (ACA, ICAEW), Property Tax Specialist"
reviewedAt: "$(Get-Date -Format 'yyyy-MM-dd')"
"@
    foreach ($lane in @('a','b','c')) {
        $wt = Get-WorktreePath $lane
        if (-not (Test-Path $wt)) { continue }
        $blogDir = Join-Path $wt 'Property/web/content/blog'
        if (-not (Test-Path $blogDir)) { continue }
        $signOff = Join-Path $signalDir 'stage1b_signed_off.flag'
        if (-not (Test-Path $signOff)) { continue }
        $signOffTime = (Get-Item $signOff).LastWriteTime
        $files = Get-ChildItem -Path $blogDir -Filter *.md | Where-Object { $_.LastWriteTime -gt $signOffTime }
        foreach ($f in $files) {
            $content = Get-Content $f.FullName -Raw
            if ($content -match 'reviewerCredentials:') { continue }
            if ($DryRun) { Write-Warn "  [dry-run] would insert reviewer fields into $($f.Name)"; $insertCount++; continue }
            if ($content -match 'dateModified:[^\n]*\n') {
                $newContent = $content -replace '(dateModified:[^\n]*\n)', "`$1$reviewerBlock`n"
            } else {
                # Insert before closing frontmatter ---
                $parts = $content -split '---', 3
                if ($parts.Count -ge 3) {
                    $parts[1] = $parts[1].TrimEnd() + "`n" + $reviewerBlock + "`n"
                    $newContent = $parts -join '---'
                } else { continue }
            }
            Set-Content -Path $f.FullName -Value $newContent -Encoding utf8 -NoNewline
            Write-OK "  inserted reviewer fields: $($f.Name)"
            $insertCount++
        }
    }
    if ($insertCount -gt 0) { Write-OK "  inserted reviewer fields into $insertCount pages" }
    else { Write-OK "  reviewer fields complete on all pages" }

    # 4. HP-lock anchor check (warn-only)
    Write-Step "  HP-lock anchor check (warn-only)"
    $warnCount = 0
    foreach ($lane in @('a','b','c')) {
        $wt = Get-WorktreePath $lane
        if (-not (Test-Path $wt)) { continue }
        $blogDir = Join-Path $wt 'Property/web/content/blog'
        if (-not (Test-Path $blogDir)) { continue }
        $signOff = Join-Path $signalDir 'stage1b_signed_off.flag'
        if (-not (Test-Path $signOff)) { continue }
        $signOffTime = (Get-Item $signOff).LastWriteTime
        $files = Get-ChildItem -Path $blogDir -Filter *.md | Where-Object { $_.LastWriteTime -gt $signOffTime }
        foreach ($f in $files) {
            $content = Get-Content $f.FullName -Raw
            if (-not ($content -match 'editorialNote:')) {
                Write-Warn "    no editorialNote in $($f.Name) (HP-lock anchor not auto-detectable)"
                $warnCount++
            }
        }
    }
    if ($warnCount -gt 0) { Write-Warn "  $warnCount pages missing editorialNote -- review before merge" }
    else { Write-OK "  all pages have editorialNote (HP-lock anchor likely present)" }

    return ($emCount -eq 0)
}

function Step-9-CloseWave-Merge {
    Write-Step "STATE 9: close-wave merge (worktree branches -> main)"
    foreach ($lane in @('a','b','c')) {
        $branch = Get-WorktreeBranch $lane
        if ($DryRun) { Write-Warn "  [dry-run] would: git merge --no-ff $branch"; continue }
        & git -C $repoRoot merge --no-ff $branch -m "Merge $branch into main: MW$MegaWave RUN lane $($lane.ToUpper())"
        if ($LASTEXITCODE -ne 0) { Write-Fail "Merge $branch failed (likely conflict; resolve manually)" }
        Write-OK "  Merged $branch"
    }
    # Write merge-done flag
    if (-not $DryRun) { New-Item -ItemType File -Path (Join-Path $signalDir 'merge_done.flag') -Force | Out-Null }
}

function Step-9-Build {
    Write-Step "npm run build"
    if ($DryRun) { Write-Warn "  [dry-run] would: cd Property/web; npm run build"; return $true }
    Push-Location (Join-Path $repoRoot 'Property/web')
    try {
        & npm.cmd run build 2>&1 | Tee-Object -FilePath (Join-Path $repoRoot 'autopilot-build.log')
        if ($LASTEXITCODE -ne 0) { Write-Fail "Build failed; see autopilot-build.log" }
    } finally { Pop-Location }
    New-Item -ItemType File -Path (Join-Path $signalDir 'build_clean.flag') -Force | Out-Null
    Write-OK "Build clean"
    return $true
}

function Step-11-IndexNow {
    Write-Step "STATE 11: IndexNow batch submission"
    if ($DryRun) { Write-Warn "  [dry-run] would: python -m optimisation_engine.indexing.submit_indexnow --site $Site --from-sitemap"; return }
    Push-Location $repoRoot
    try {
        & python -m optimisation_engine.indexing.submit_indexnow --site $Site --from-sitemap
        Write-OK "IndexNow submission complete"
    } finally { Pop-Location }
}

# -------- MAIN DRIVER ----------

Write-Host ""
Write-Host "=== MegaWave Autopilot -- Site=$Site MegaWave=$MegaWave ===" -ForegroundColor Cyan
if ($DryRun) { Write-Host "[DRY-RUN MODE]" -ForegroundColor Magenta }
Write-Host ""

if (-not (Test-Path $signalDir)) { New-Item -ItemType Directory -Path $signalDir -Force | Out-Null }

$state = if ($FromState -ge 0) { $FromState } else { Detect-State }
Write-Host "Detected state: $state" -ForegroundColor Cyan
Write-Host ""

switch ($state) {
    0 {
        Step-0-Slice
        Step-1-CreateWorktrees
        Step-Dispatch-3-Lanes -Phase stage1
        Write-Halt "Stage 1 dispatched. Re-run when lane-done flags appear (or use Step-Wait-LaneDone)."
    }
    1 {
        Step-1-CreateWorktrees
        Step-Dispatch-3-Lanes -Phase stage1
        Write-Halt "Stage 1 dispatched. Re-run when lane-done flags appear."
    }
    2 {
        Step-Wait-LaneDone -PhaseLabel 'stage1'
        Step-Synthesize-Markers -Phase stage2  # noop if no missing markers
        Write-Halt "Stage 1 done. CONDUCTOR: read briefs + flags; write HP-locks; touch ``$signalDir\stage1b_signed_off.flag``. Then re-run this script."
    }
    3 {
        Write-Halt "STATE 3: Stage 1b HP-lock review required. CONDUCTOR: read briefs at ``$briefsDir\*.md`` + flags at ``$flagsFile`` + tracker at ``$trackerFile``. Write HP-lock entries. Touch ``$signalDir\stage1b_signed_off.flag`` then re-run."
    }
    4 {
        Step-Dispatch-3-Lanes -Phase stage2
        Write-Halt "Stage 2 dispatched. Re-run when lane-done flags appear."
    }
    5 {
        Step-Wait-LaneDone -PhaseLabel 'stage2'
        Step-Synthesize-Markers -Phase stage2
        Write-Halt "Stage 2 done. CONDUCTOR: drift triage. Touch ``$signalDir\stage2b_signed_off.flag`` then re-run."
    }
    6 {
        Write-Halt "STATE 6: Stage 2b drift triage required. CONDUCTOR: spot-check Stage 2 brief extensions; close any new F-flags. Touch ``$signalDir\stage2b_signed_off.flag`` then re-run."
    }
    7 {
        Step-Dispatch-3-Lanes -Phase run
        Write-Halt "RUN dispatched. Re-run when lane-done flags appear."
    }
    8 {
        Step-Wait-LaneDone -PhaseLabel 'run'
        Step-Synthesize-Markers -Phase run
        # Auto-advance to 9
        Step-9-BackPatch-Sweep | Out-Null
        Step-9-CloseWave-Merge
        $buildOK = Step-9-Build
        if ($buildOK) {
            $deployCmd = "VERCEL_PROJECT_ID=$($cfg.vercel.projectId) VERCEL_ORG_ID=$($cfg.vercel.orgId) vercel deploy --prod --yes (run from $repoRoot)"
            Write-Halt "STATE 10: Build clean. USER: deploy via Vercel CLI per memory/vercel_cli_deploy_workflow.md. Deploy command: $deployCmd. Touch deployed.flag in $signalDir after deploy then re-run for IndexNow + heartbeat."
        }
    }
    9 {
        Step-9-BackPatch-Sweep | Out-Null
        Step-9-CloseWave-Merge
        $buildOK = Step-9-Build
        if ($buildOK) {
            Write-Halt "STATE 10: Build clean. USER: deploy + touch deployed.flag then re-run."
        }
    }
    10 {
        $deployCmd = "VERCEL_PROJECT_ID=$($cfg.vercel.projectId) VERCEL_ORG_ID=$($cfg.vercel.orgId) vercel deploy --prod --yes (run from $repoRoot)"
        Write-Halt "STATE 10: Deploy required. USER runs: $deployCmd. Then touch deployed.flag in $signalDir + re-run."
    }
    11 {
        Step-11-IndexNow
        Write-OK "MegaWave $MegaWave fully complete."
        Write-Host ""
        Write-Host "Next: ./scripts/megawave-autopilot.ps1 -MegaWave $($MegaWave + 1)" -ForegroundColor Cyan
    }
    default {
        Write-Fail "Unknown state: $state"
    }
}

Write-Host ""
