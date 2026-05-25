#requires -Version 5.1
<#
.SYNOPSIS
  Round 3 of rolling architecture: hydrate a per-batch sub-agent prompt
  from the appropriate phase template.

.DESCRIPTION
  Reads templates/rolling/<phase>.tmpl.md, substitutes per-batch tokens
  (site config + bucket + picks list + F-range + paths + batch ID +
  signal dir), and writes the result to stdout (or to a file via -OutFile).

  Replaces per-wave bespoke prompt authoring (Stage 1, Stage 2, RUN).
  Conductor edits the template ONCE per architectural change; per-wave
  per-batch prompts generated mechanically.

.PARAMETER Site
  Site key (default: property).

.PARAMETER Wave
  MegaWave number (matches queue file directory).

.PARAMETER Phase
  Pipeline phase: stage1, stage2, or run.

.PARAMETER Bucket
  Bucket letter: a, b, or c (lowercase).

.PARAMETER BatchId
  Batch identifier as assigned by slice-megawave (e.g. M1-A-B2).

.PARAMETER PicksJson
  JSON array of pick objects {slug, label, ...} for this batch.
  Typically the output of batch-claim.ps1.

.PARAMETER OutFile
  Optional output file path. If omitted, prompt is written to stdout.

.EXAMPLE
  $picks = ./scripts/batch-claim.ps1 -QueueFile q.jsonl -BatchSize 6 -AgentId $g
  ./scripts/make-batch-prompt.ps1 -Wave 1 -Phase stage1 -Bucket a `
      -BatchId M1-A-B1 -PicksJson $picks -OutFile prompt.txt
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)] [int]$Wave,
    [Parameter(Mandatory=$true)] [ValidateSet('stage1','stage2','run')] [string]$Phase,
    [Parameter(Mandatory=$true)] [ValidateSet('a','b','c')] [string]$Bucket,
    [Parameter(Mandatory=$true)] [string]$BatchId,
    [Parameter(Mandatory=$true)] [string]$PicksJson,

    [string]$Site = 'property',
    [string]$OutFile
)

$ErrorActionPreference = 'Stop'

. "$PSScriptRoot\_lib\site-config.ps1"

$cfg = Get-SiteConfig $Site
$utf8 = [System.Text.UTF8Encoding]::new($false)

# Locate template
$templatePath = Join-Path (Split-Path -Parent $PSScriptRoot) "templates/rolling/$Phase.tmpl.md"
if (-not (Test-Path $templatePath)) {
    throw "Template missing: $templatePath"
}
$template = [System.IO.File]::ReadAllText($templatePath, $utf8)

# Resolve bucket variants
$bucketUpper = $Bucket.ToUpper()
$bucketIdx = @('a','b','c').IndexOf($Bucket)

# Parse picks
$picks = $PicksJson | ConvertFrom-Json

# Build picks_list_md (numbered list with slug + label)
$picksList = @()
$i = 1
foreach ($p in $picks) {
    $picksList += "$i. ``$($p.slug)`` - $($p.label)"
    $i++
}
$picksListMd = $picksList -join "`n"

# Affinity-based HP touchpoints (load from affinity JSON if present)
$affinityPath = Join-Path (Split-Path -Parent $PSScriptRoot) "sites/$Site.megawave-affinity.json"
$hpTouchpoints = ''
if (Test-Path $affinityPath) {
    $aff = [System.IO.File]::ReadAllText($affinityPath, $utf8) | ConvertFrom-Json
    $mwKey = "M$Wave"
    if ($aff.megawaves.$mwKey) {
        $hpTouchpoints = ($aff.megawaves.$mwKey.hp_touchpoints -join ', ')
    }
}

# Wave-subdir for paths inside this mega-wave
$waveSubdir = "megawave$Wave"

# Resolve all paths
$worktreePath  = Resolve-WorktreePath -Config $cfg -Wave $Wave -Bucket $Bucket -WaveKind 'megawave'
$branchName    = Resolve-BranchName -Config $cfg -Wave $Wave -Bucket $Bucket -WaveKind 'megawave'
$briefsDir     = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.briefsDir + '/' + $waveSubdir)
$signalDir     = Join-Path $briefsDir '_signals'

# Wave artefacts (using "megawave" naming convention by wavekind)
$trackerPath   = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.docsDir + "/${waveSubdir}_page_tracker.md")
$flagsPath     = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.docsDir + "/${waveSubdir}_site_wide_flags.md")
$qaPath        = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.docsDir + "/${waveSubdir}_questions_session_$bucketUpper.md")
$discoveryPath = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.docsDir + "/${waveSubdir}_discovery_log_session_$bucketUpper.md")
$picksYamlPath = Join-Path $briefsDir 'picks.yaml'
$cannibPath    = Resolve-SitePath -Config $cfg -RelativePath ($cfg.paths.docsDir + "/${waveSubdir}_cannibalisation_check.md")
$blogContent   = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.blogContentDir
$blogRoutes    = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.blogRoutesDir
$buildDir      = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.buildDir
$housePos      = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.housePositions
$netnewProg    = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.netnewProgram

# Bucket label from picks.yaml if present
$bucketLabel = "Bucket $bucketUpper"
if (Test-Path $picksYamlPath) {
    try {
        $yamlText = [System.IO.File]::ReadAllText($picksYamlPath, $utf8)
        if ($yamlText -match "(?ms)^\s*${bucketUpper}:\s*\n\s*label:\s*[`"']?([^`"'\n]+)") {
            $bucketLabel = $matches[1].Trim()
        }
    } catch {}
}

# F-range from config
$fRange = $cfg.wave.fRangePerBucket.$Bucket

# Build substitution map
$subs = @{
    'site'                       = $cfg.site
    'site_displayName'           = $cfg.displayName
    'wave'                       = $Wave
    'phase'                      = $Phase
    'bucket'                     = $Bucket
    'bucket_id'                  = $bucketUpper
    'bucket_label'               = $bucketLabel
    'batch_id'                   = $BatchId
    'batch_size'                 = $picks.Count
    'picks_list_md'              = $picksListMd
    'f_range'                    = $fRange
    'hp_touchpoints'             = $hpTouchpoints
    'wave_subdir'                = $waveSubdir
    'worktree_path'              = $worktreePath
    'branch_name'                = $branchName
    'briefs_dir'                 = $briefsDir
    'signal_dir'                 = $signalDir
    'tracker_path'               = $trackerPath
    'flags_file_absolute_path'   = $flagsPath
    'qa_file_absolute_path'      = $qaPath
    'discovery_file_absolute_path' = $discoveryPath
    'picks_yaml_path'            = $picksYamlPath
    'cannib_check_path'          = $cannibPath
    'blog_content_dir'           = $blogContent
    'blog_routes_dir'            = $blogRoutes
    'build_dir'                  = $buildDir
    'house_positions_path'       = $housePos
    'netnew_program_path'        = $netnewProg
}

# Token substitution: {{token}} pattern
$out = $template
foreach ($key in $subs.Keys) {
    $token = '\{\{' + [regex]::Escape($key) + '\}\}'
    $value = $subs[$key]
    $out = [regex]::Replace($out, $token, [string]$value)
}

# Detect unresolved tokens + warn (non-fatal)
$unresolved = [regex]::Matches($out, '\{\{[a-z_]+\}\}') | ForEach-Object { $_.Value } | Sort-Object -Unique
if ($unresolved.Count -gt 0) {
    Write-Warning "Unresolved template tokens: $($unresolved -join ', ')"
}

if ($OutFile) {
    [System.IO.File]::WriteAllText($OutFile, $out, $utf8)
    Write-Host "Wrote $($out.Length) chars to $OutFile" -ForegroundColor Green
} else {
    Write-Output $out
}
