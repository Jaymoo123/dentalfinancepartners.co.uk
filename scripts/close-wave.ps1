#requires -Version 5.1
<#
.SYNOPSIS
  Phase 2b of the wave pipeline: WRAP. Step-based wave close.

.DESCRIPTION
  Closes a wave once sub-agent sessions have completed all briefs.
  Step-based (no `-Step all` in Phase 2b - judgment-heavy steps stay
  under conductor control):

    validate : tracker all done + no open Q-N + branch HEADs ahead
    audit    : commit tracker + flags + Q&A + discovery to main
    merge    : git merge property-wave{N}-{a,b,c} into main (one by one)
    build    : npm run build in Property/web/

  Pre-merge HP corrections and post-merge back-patch sweeps are NOT
  mechanized in 2b - conductor handles those per NETNEW_PROGRAM §16.45.

.PARAMETER Wave
  Wave number (e.g. 8). Required.

.PARAMETER Step
  Which close step to run: validate, audit, merge, or build. Required.

.PARAMETER DryRun
  Show what would be done without making changes.

.EXAMPLE
  ./scripts/close-wave.ps1 -Wave 8 -Step validate
  ./scripts/close-wave.ps1 -Wave 8 -Step audit
  ./scripts/close-wave.ps1 -Wave 8 -Step merge
  ./scripts/close-wave.ps1 -Wave 8 -Step build
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [int]$Wave,

    [Parameter(Mandatory=$true)]
    [ValidateSet('validate','audit','merge','build')]
    [string]$Step,

    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

# Shared tracker reader (Bug #1 fix - PS 5.1 emoji-regex was unreliable)
. "$PSScriptRoot\_lib\tracker-utils.ps1"

$accountingRoot = 'C:\Users\user\Documents\Accounting'
$wtBase         = 'C:\Users\user\Documents'
$buckets        = @('a','b','c')
$bucketsUpper   = @('A','B','C')
$utf8NoBom      = [System.Text.UTF8Encoding]::new($false)

$trackerFile    = "$accountingRoot\docs\property\wave${Wave}_page_tracker.md"
$flagsFile      = "$accountingRoot\docs\property\wave${Wave}_site_wide_flags.md"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

if ($DryRun) {
    Write-Host "[DRY-RUN MODE - no changes will be made]" -ForegroundColor Magenta
}

Write-Step "Wave $Wave close: step '$Step'"
Write-Host ""

# =====================================================================
# Step: validate
# =====================================================================
if ($Step -eq 'validate') {
    Write-Step "Tracker completion check"
    if (-not (Test-Path $trackerFile)) {
        Write-Fail "Tracker missing: $trackerFile"
    }
    # Structural row-by-status counts via shared helper (Bug #1 fix)
    $c = Get-TrackerCounts -TrackerPath $trackerFile

    if ($c.todo            -gt 0) { Write-Warn "$($c.todo) row(s) status todo" }
    if ($c.in_progress     -gt 0) { Write-Warn "$($c.in_progress) row(s) status in_progress" }
    if ($c.blocked         -gt 0) { Write-Warn "$($c.blocked) row(s) status blocked" }
    if ($c.needs_backpatch -gt 0) { Write-Warn "$($c.needs_backpatch) row(s) status needs back-patch" }
    if ($c.unknown         -gt 0) { Write-Warn "$($c.unknown) row(s) unrecognised status symbol" }

    $totalIncomplete = $c.todo + $c.in_progress + $c.blocked + $c.needs_backpatch + $c.unknown
    if ($totalIncomplete -gt 0) {
        Write-Fail "Tracker has $totalIncomplete incomplete row(s); wave not done"
    }
    Write-OK "Tracker: $($c.done) done / $($c.total_rows) total rows"

    Write-Step "Open Q-N check"
    $openCount = 0
    foreach ($u in $bucketsUpper) {
        $qFile = "$accountingRoot\docs\property\wave${Wave}_questions_session_${u}.md"
        if (-not (Test-Path $qFile)) { continue }
        $q = [System.IO.File]::ReadAllText($qFile, $utf8NoBom)
        $matches = [regex]::Matches($q, '(?im)STATUS:\s*open')
        if ($matches.Count -gt 0) {
            Write-Warn "Session $u : $($matches.Count) open Q-N"
            $openCount += $matches.Count
        } else {
            Write-OK "Session $u : 0 open Q-N"
        }
    }
    if ($openCount -gt 0) {
        Write-Fail "$openCount open Q-N across sessions; resolve before merge"
    }

    Write-Step "Worktree branch HEAD check (must be ahead of main)"
    foreach ($bucket in $buckets) {
        $branch = "property-wave${Wave}-${bucket}"
        $ahead  = (git -C $accountingRoot rev-list --count "main..$branch" 2>$null).Trim()
        $behind = (git -C $accountingRoot rev-list --count "$branch..main" 2>$null).Trim()
        if ([int]$ahead -eq 0) {
            Write-Fail "$branch has no commits ahead of main; sub-agent may not have committed"
        }
        if ([int]$behind -gt 0) {
            Write-Warn "$branch is $behind commit(s) behind main - may need rebase before merge"
        }
        Write-OK "$branch : $ahead ahead, $behind behind"
    }

    Write-Step "Flag review reminder"
    if (Test-Path $flagsFile) {
        $flagCount = ([regex]::Matches((Get-Content $flagsFile -Raw), '(?m)^## F-\d+')).Count
        Write-OK "$flagCount flag(s) in $flagsFile"
        Write-Warn "Conductor: review CRITICAL/HIGH flags BEFORE running -Step merge (§16.45)"
    }

    Write-Host ""
    Write-Host "=== Wave $Wave validate: GREEN ===" -ForegroundColor Green
    Write-Host "Next: ./scripts/close-wave.ps1 -Wave $Wave -Step audit"
    exit 0
}

# =====================================================================
# Step: audit
# =====================================================================
if ($Step -eq 'audit') {
    Write-Step "Staging audit-trail files on main"
    $auditPaths = @(
        "docs/property/wave${Wave}_page_tracker.md",
        "docs/property/wave${Wave}_site_wide_flags.md",
        "docs/property/wave${Wave}_questions_session_A.md",
        "docs/property/wave${Wave}_questions_session_B.md",
        "docs/property/wave${Wave}_questions_session_C.md",
        "docs/property/wave${Wave}_discovery_log_session_A.md",
        "docs/property/wave${Wave}_discovery_log_session_B.md",
        "docs/property/wave${Wave}_discovery_log_session_C.md"
    )

    # Check we're on main
    $branch = (git -C $accountingRoot rev-parse --abbrev-ref HEAD).Trim()
    if ($branch -ne 'main') {
        Write-Fail "Not on main (on '$branch'). Switch to main before audit commit."
    }
    Write-OK "On branch main"

    if ($DryRun) {
        Write-Warn "Would: git add $($auditPaths -join ' ')"
        Write-Warn "Would: git commit -m 'Wave $Wave audit-trail ...'"
        exit 0
    }

    foreach ($p in $auditPaths) {
        if (Test-Path "$accountingRoot\$($p -replace '/','\')") {
            git -C $accountingRoot add $p | Out-Null
        }
    }
    $staged = git -C $accountingRoot diff --cached --name-only
    if (-not $staged) {
        Write-OK "Nothing to commit (audit-trail files already up to date)"
        exit 0
    }
    Write-OK "Staged: $($staged.Count) file(s)"

    $msg = @"
Wave $Wave audit-trail: tracker + flags + Q&A + discoveries

Pre-merge snapshot of wave artefacts after sub-agent sessions completed.
Bucket branches still to merge via close-wave.ps1 -Step merge.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
"@
    git -C $accountingRoot commit -m $msg | Out-Null
    if ($LASTEXITCODE -ne 0) { Write-Fail "git commit failed" }
    $sha = (git -C $accountingRoot rev-parse --short HEAD).Trim()
    Write-OK "Committed as $sha"

    Write-Host ""
    Write-Host "=== Wave $Wave audit complete ===" -ForegroundColor Green
    Write-Host "Next: ./scripts/close-wave.ps1 -Wave $Wave -Step merge"
    exit 0
}

# =====================================================================
# Step: merge
# =====================================================================
if ($Step -eq 'merge') {
    Write-Step "Pre-merge HP-corrections reminder"
    Write-Warn "Per §16.45 - conductor must have applied any pre-merge HP corrections"
    Write-Warn "from wave${Wave}_site_wide_flags.md BEFORE this step. Continuing..."
    Write-Host ""

    $branch = (git -C $accountingRoot rev-parse --abbrev-ref HEAD).Trim()
    if ($branch -ne 'main') {
        Write-Fail "Not on main (on '$branch'). Switch to main before merging."
    }
    Write-OK "On branch main"

    foreach ($bucket in $buckets) {
        $bucketUpper = $bucket.ToUpper()
        $bucketBranch = "property-wave${Wave}-${bucket}"

        Write-Step "Merging $bucketBranch"
        if ($DryRun) {
            Write-Warn "Would: git merge --no-ff $bucketBranch"
            continue
        }

        # PS 5.1 wraps native stderr into ErrorRecord under Stop preference; do NOT
        # redirect git stderr (2>&1). Git output goes straight to console; we
        # check LASTEXITCODE after.
        & git -C $accountingRoot merge --no-ff -m "Merge wave $Wave bucket $bucketUpper ($bucketBranch)" $bucketBranch
        $mergeExit = $LASTEXITCODE
        if ($mergeExit -ne 0) {
            Write-Fail "Merge of $bucketBranch had conflicts or failed (exit $mergeExit). Resolve manually, then continue with remaining buckets."
        }
        $sha = (git -C $accountingRoot rev-parse --short HEAD).Trim()
        $aheadOfMain = (git -C $accountingRoot rev-list --count "main..$bucketBranch").Trim()
        if ([int]$aheadOfMain -eq 0 -and $sha -ne (git -C $accountingRoot rev-parse --short "$bucketBranch").Trim()) {
            Write-OK "$bucketBranch merged as $sha"
        } else {
            Write-OK "$bucketBranch processed (HEAD now $sha)"
        }
    }

    Write-Host ""
    Write-Host "=== Wave $Wave merge complete (3/3 buckets) ===" -ForegroundColor Green
    Write-Host "Next: ./scripts/close-wave.ps1 -Wave $Wave -Step build"
    exit 0
}

# =====================================================================
# Step: build
# =====================================================================
if ($Step -eq 'build') {
    Write-Step "npm run build in Property/web/"
    $buildDir = "$accountingRoot\Property\web"
    if (-not (Test-Path $buildDir)) {
        Write-Fail "Build dir missing: $buildDir"
    }

    if ($DryRun) {
        Write-Warn "Would: cd $buildDir; npm run build"
        exit 0
    }

    Push-Location $buildDir
    try {
        Write-OK "Running 'npm run build' (this can take a few minutes)..."
        # Windows: invoke npm.cmd explicitly. Calling bare `npm` via & on PS 5.1
        # mangles argv ('npm' splits to 'n' + 'pm') depending on PATH resolution.
        & npm.cmd run build
        $buildExit = $LASTEXITCODE
    } finally {
        Pop-Location
    }

    if ($buildExit -ne 0) {
        Write-Fail "npm.cmd run build returned exit code $buildExit"
    }

    Write-Host ""
    Write-Host "=== Wave $Wave build: PASS ===" -ForegroundColor Green
    Write-Host ""
    Write-Host "Phase 2b complete. Manual next steps (Phase 2c will automate):"
    Write-Host "  1. Review post-merge back-patch flags (cross-bucket hyperlinks, site-wide STALE sweeps)"
    Write-Host "  2. Deploy:  cd Property/web; vercel deploy --prod"
    Write-Host "  3. IndexNow:  python -m optimisation_engine.indexing.submit_indexnow --site property --from-queue"
    Write-Host "  4. Update NETNEW_PROGRAM §3 heartbeat with wave totals"
    exit 0
}
