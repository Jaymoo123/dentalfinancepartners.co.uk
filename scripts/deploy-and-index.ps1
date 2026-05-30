#requires -Version 5.1
<#
.SYNOPSIS
  Phase 2c orchestrator: production deploy + IndexNow drain.

.DESCRIPTION
  Wraps the manual Property deploy + IndexNow sequence:
    1. Back up current root .vercel/project.json
    2. Swap in Property/.vercel/project.json (the Property project is the odd
       one out per user memory vercel_cli_deploy_workflow.md — its rootDirectory
       is "Property/web" so `cd Property && vercel deploy` resolves to
       Property/Property/web and fails)
    3. Run `vercel deploy --prod --yes` from repo root
    4. Restore original .vercel/project.json
    5. Run `python -m optimisation_engine.indexing.submit_indexnow --site
       property --from-queue` to push new URLs to IndexNow endpoints

  Designed for Phase 2c of the closed-loop autopilot. Called by /run-wave
  skill after close-wave -Step build PASSes and conductor approves deploy.

.PARAMETER Site
  Site key (currently only 'property' is supported). Required.

.PARAMETER DryRun
  Show what would be done without making any changes.

.PARAMETER SkipPreview
  Skip the preview deploy + URL print. Default: false (always show preview
  URL first, then prompt for prod). Set true if you've already verified a
  preview elsewhere.

.PARAMETER SkipIndexNow
  Skip the IndexNow drain (e.g. for a content-only deploy without new URLs).

.EXAMPLE
  ./scripts/deploy-and-index.ps1 -Site property
  ./scripts/deploy-and-index.ps1 -Site property -DryRun
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$Site,

    [switch]$DryRun,
    [switch]$SkipPreview,
    [switch]$SkipIndexNow,

    # Enforce strict independent-QA coverage for a deploy batch: the gate then
    # requires every slug in optimisation_engine/.cache/qa_verdict_<QaBatch>.json
    # to be all_clear with a matching file hash, else aborts.
    [string]$QaBatch
)

$ErrorActionPreference = 'Stop'

# Site config (Round 1 of rolling architecture - replaces the per-site hashtable)
. "$PSScriptRoot\_lib\site-config.ps1"

$cfg = Get-SiteConfig $Site
$accountingRoot = $cfg.paths.repoRoot -replace '/', '\'

# Backward-compat shim: siteConfig hashtable used by rest of script
$siteConfig = @{
    VercelProjectJson = Resolve-SitePath -Config $cfg -RelativePath $cfg.vercel.projectJson
    ProductionDomain  = $cfg.vercel.productionDomain
}

$rootVercelJson   = "$accountingRoot\.vercel\project.json"
$backupVercelJson = "$accountingRoot\.vercel\project.json.backup-before-$Site-deploy"

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

if ($DryRun) { Write-Host "[DRY-RUN MODE - no changes will be made]" -ForegroundColor Magenta }

Write-Step "Deploy + IndexNow for site '$Site'"
Write-Host ""

# 0. Pre-deploy content gate (Property): block on broken internal /blog links
#    (the recurring Track-2 defect class). Em-dash / pricing surface as warnings;
#    run `python scripts/predeploy_gate.py --strict` to enforce those too.
Write-Step "0/6 Pre-deploy content gate"
if ($Site -eq 'property') {
    $gateArgs = @('scripts/predeploy_gate.py')
    if ($QaBatch) { $gateArgs += @('--qa-batch', $QaBatch) }
    if ($DryRun) {
        Write-Warn "Would run: python $($gateArgs -join ' ')"
    } else {
        Push-Location $accountingRoot
        python @gateArgs
        $gateExit = $LASTEXITCODE
        Pop-Location
        if ($gateExit -ne 0) {
            Write-Fail "Pre-deploy gate failed (broken links / known-bad QA pages). Fix before deploying."
        }
        Write-OK "Pre-deploy gate passed"
    }
} else {
    Write-Warn "Pre-deploy gate is Property-only; skipping for '$Site'"
}
Write-Host ""

# 1. Validate vercel CLI present
Write-Step "1/6 Checking vercel CLI"
$vercel = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercel) {
    Write-Fail "vercel CLI not on PATH. Install with: npm i -g vercel"
}
Write-OK "vercel CLI at $($vercel.Source)"

# 2. Validate Site's .vercel/project.json
Write-Step "2/6 Validating $Site Vercel project linkage"
if (-not (Test-Path $siteConfig.VercelProjectJson)) {
    Write-Fail "Site project config missing: $($siteConfig.VercelProjectJson)"
}
Write-OK "Found $($siteConfig.VercelProjectJson)"

# 3. Swap project linkage
Write-Step "3/6 Swapping repo-root .vercel/project.json to $Site"
if (-not (Test-Path $rootVercelJson)) {
    Write-Fail "Repo-root .vercel/project.json missing - run 'vercel link' first"
}
if ($DryRun) {
    Write-Warn "Would: copy $rootVercelJson -> $backupVercelJson"
    Write-Warn "Would: copy $($siteConfig.VercelProjectJson) -> $rootVercelJson"
} else {
    Copy-Item -Path $rootVercelJson -Destination $backupVercelJson -Force
    Copy-Item -Path $siteConfig.VercelProjectJson -Destination $rootVercelJson -Force
    Write-OK "Backed up original to .vercel/project.json.backup-before-$Site-deploy"
    Write-OK "Swapped repo-root linkage to $Site project"
}

# Wrap the deploy + restore in try/finally so restoration always runs
$deployedProdUrl = $null
$deployFailed    = $false
try {
    # 4. Deploy --prod
    Write-Step "4/6 Running 'vercel deploy --prod --yes' from $accountingRoot"
    if ($DryRun) {
        Write-Warn "Would: cd $accountingRoot; vercel deploy --prod --yes"
    } else {
        Push-Location $accountingRoot
        try {
            # vercel prints its banner + progress to stderr. Under this script's
            # ErrorActionPreference='Stop', `2>&1` would wrap those stderr lines as
            # terminating NativeCommandErrors (PowerShell 5.1) and abort the deploy
            # even on success. Drop to 'Continue' for the native call and judge the
            # result by $LASTEXITCODE instead.
            $prevEAP = $ErrorActionPreference
            $ErrorActionPreference = 'Continue'
            $vercelOutput = & vercel deploy --prod --yes 2>&1 | Out-String
            $vercelExit = $LASTEXITCODE
            $ErrorActionPreference = $prevEAP
        } finally {
            Pop-Location
        }

        if ($vercelExit -ne 0) {
            $deployFailed = $true
            Write-Host "    OUTPUT:" -ForegroundColor Red
            $vercelOutput -split "`n" | Select-Object -Last 20 | ForEach-Object {
                Write-Host "      $_" -ForegroundColor Red
            }
            Write-Fail "vercel deploy --prod returned exit $vercelExit"
        }

        # Extract the production URL from vercel CLI output (last line containing
        # the URL pattern). Vercel prints "Production: https://..." on success.
        $prodUrlMatch = [regex]::Match($vercelOutput, 'https://[^\s]+\.vercel\.app')
        if ($prodUrlMatch.Success) {
            $deployedProdUrl = $prodUrlMatch.Value
        }
        Write-OK "Deploy completed. Production: https://$($siteConfig.ProductionDomain)"
        if ($deployedProdUrl) {
            Write-OK "Build URL: $deployedProdUrl"
        }
    }
} finally {
    # 5. Restore original .vercel/project.json (always, even on failure)
    Write-Step "5/6 Restoring original .vercel/project.json"
    if ($DryRun) {
        Write-Warn "Would: restore $rootVercelJson from $backupVercelJson"
    } else {
        if (Test-Path $backupVercelJson) {
            Copy-Item -Path $backupVercelJson -Destination $rootVercelJson -Force
            Remove-Item $backupVercelJson -Force
            Write-OK "Restored .vercel/project.json"
        } else {
            Write-Warn "Backup file missing - .vercel/project.json may be in $Site state"
        }
    }
}

# Bail if deploy failed (post-restore)
if ($deployFailed) { exit 1 }

# 5b. Register the deploy batch into monitored_pages (Google + Bing baselines) so
#     it ships MONITORED. Registration used to be a hardcoded, opt-in script run
#     by hand (red-team: batches shipped unmonitored); now it is driven off the
#     same QA manifest the gate consumes.
if ($QaBatch) {
    Write-Step "5b/7 Registering monitored_pages for batch '$QaBatch'"
    if ($DryRun) {
        Write-Warn "Would: python scripts/register_monitored_batch.py --batch $QaBatch --commit"
    } else {
        Push-Location $accountingRoot
        try {
            & python scripts/register_monitored_batch.py --batch $QaBatch --commit
            $regExit = $LASTEXITCODE
        } finally { Pop-Location }
        if ($regExit -ne 0) { Write-Warn "monitored_pages registration returned exit $regExit (deploy already live - investigate)" }
        else { Write-OK "Registered batch '$QaBatch' for the 90d regression watch (Google + Bing baselines)" }
    }
}

# 6. IndexNow drain
Write-Step "6/6 IndexNow drain"
if ($SkipIndexNow) {
    Write-Warn "Skipped (-SkipIndexNow)"
} else {
    if ($DryRun) {
        if ($QaBatch) { Write-Warn "Would: submit batch '$QaBatch' URLs to IndexNow (register_monitored_batch.py --print-urls)" }
        Write-Warn "Would: python -m optimisation_engine.indexing.submit_indexnow --site $Site --from-queue"
    } else {
        Push-Location $accountingRoot
        try {
            if ($QaBatch) {
                # Submit EXACTLY the URLs this batch changed. The rewrite path does
                # not enqueue them, so --from-queue alone would miss them.
                $batchUrls = @(& python scripts/register_monitored_batch.py --batch $QaBatch --print-urls)
                if ($batchUrls.Count -gt 0) {
                    & python -m optimisation_engine.indexing.submit_indexnow --site $Site @batchUrls
                    Write-OK "Submitted $($batchUrls.Count) batch URL(s) to IndexNow"
                }
            }
            & python -m optimisation_engine.indexing.submit_indexnow --site $Site --from-queue
            $indexExit = $LASTEXITCODE
        } finally {
            Pop-Location
        }
        if ($indexExit -ne 0) {
            Write-Warn "IndexNow drain returned exit $indexExit (deploy already succeeded - investigate IndexNow separately)"
        } else {
            Write-OK "IndexNow drain complete"
        }
    }
}

Write-Host ""
Write-Host "=== Deploy + IndexNow complete for $Site ===" -ForegroundColor Green
Write-Host ""
Write-Host "Verify:"
Write-Host "  curl -sI https://$($siteConfig.ProductionDomain)/sitemap.xml"
Write-Host "  Check Bing/Google indexation 24-48h post-IndexNow"
