#requires -Version 5.1
<#
.SYNOPSIS
  Round 3 of rolling architecture: slice a mega-wave from the topic pool.

.DESCRIPTION
  One-time slicer per mega-wave. Reads topic_gaps_final.md, excludes
  already-shipped slugs, applies cluster->mega-wave affinity from
  sites/<site>.megawave-affinity.json, distributes picks across buckets
  A/B/C per the affinity's bucketAssignment, emits:
    briefs/<site>/megawave{M}/picks.yaml (schema compatible with check-cannib.ps1)
    briefs/<site>/megawave{M}/queue_{A,B,C}.jsonl (one row per pick:
        {slug, label, batch_id: 'M{M}-{bucket}-B{n}', status: 'pending'})

  Refuses to overwrite existing queue files if any row shows
  status: claimed, unless -Force.

.PARAMETER Site
  Site key (default: property).

.PARAMETER MegaWave
  Mega-wave number (1, 2, 3, ...) - matches key in
  sites/<site>.megawave-affinity.json under .megawaves.

.PARAMETER PoolFile
  Path to the topic pool markdown (default: from site config topicPool).

.PARAMETER AffinityFile
  Path to the affinity JSON (default: sites/<site>.megawave-affinity.json).

.PARAMETER BatchSize
  Picks per batch (default: from site config wave.batchSize, normally 6).

.PARAMETER MaxBucketSize
  Max picks per bucket (default: site config wave.megaWaveSize / 3 = 20).

.PARAMETER DryRun
  Print intended slicing without writing any files.

.PARAMETER Force
  Overwrite existing picks.yaml + queue files even if claims exist.

.EXAMPLE
  ./scripts/slice-megawave.ps1 -MegaWave 1 -DryRun
  ./scripts/slice-megawave.ps1 -MegaWave 1
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [int]$MegaWave,

    [string]$Site = 'property',
    [string]$PoolFile,
    [string]$AffinityFile,
    [int]$BatchSize,
    [int]$MaxBucketSize,
    [switch]$DryRun,
    [switch]$Force
)

$ErrorActionPreference = 'Stop'

. "$PSScriptRoot\_lib\site-config.ps1"

$cfg = Get-SiteConfig $Site
$utf8 = [System.Text.UTF8Encoding]::new($false)

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-OK   ($msg) { Write-Host "    OK:   $msg" -ForegroundColor Green }
function Write-Warn ($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }
function Write-Fail ($msg) { Write-Host "    FAIL: $msg" -ForegroundColor Red; exit 1 }

# Resolve defaults from config
if (-not $PoolFile)     { $PoolFile     = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.topicPool }
if (-not $AffinityFile) { $AffinityFile = Join-Path (Split-Path -Parent $PSScriptRoot) "sites/$Site.megawave-affinity.json" }
if (-not $BatchSize)    { $BatchSize    = $cfg.wave.batchSize }
if (-not $MaxBucketSize){ $MaxBucketSize = [math]::Ceiling($cfg.wave.megaWaveSize / 3) }

if ($DryRun) { Write-Host "[DRY-RUN MODE - no files will be written]" -ForegroundColor Magenta }

Write-Step "Slice MegaWave $MegaWave for site '$Site'"
Write-Host ""

# 1. Load + validate inputs
Write-Step "1/5 Validating inputs"
if (-not (Test-Path $PoolFile))     { Write-Fail "Pool file missing: $PoolFile" }
if (-not (Test-Path $AffinityFile)) { Write-Fail "Affinity file missing: $AffinityFile" }
Write-OK "Pool: $PoolFile"
Write-OK "Affinity: $AffinityFile"

$affinity = [System.IO.File]::ReadAllText($AffinityFile, $utf8) | ConvertFrom-Json
$mwKey = "M$MegaWave"
if (-not $affinity.megawaves.$mwKey) {
    Write-Fail "Affinity file has no entry for $mwKey. Add a .megawaves.$mwKey object with .clusters[] + .bucketAssignment.{A,B,C}[]."
}
$mwAffinity = $affinity.megawaves.$mwKey
Write-OK "MegaWave $MegaWave label: $($mwAffinity.label)"

# 2. Parse pool: extract cluster -> [slug] map from net-new sections only
Write-Step "2/5 Parsing topic pool"
$poolText = [System.IO.File]::ReadAllText($PoolFile, $utf8)
$poolLines = $poolText -split "`r?`n"

# State machine: track current cluster + whether we're in the net-new subsection
$clusterPicks = @{}
$currentCluster = $null
$inNetNew = $false

foreach ($line in $poolLines) {
    # New cluster heading (## Cluster name)
    if ($line -match '^##\s+(.+)$') {
        $currentCluster = $matches[1].Trim()
        $clusterPicks[$currentCluster] = @()
        $inNetNew = $false
        continue
    }
    # Net-new subsection marker (### ✅ Net-new (write these))
    # Pool format uses various subsection markers; treat anything with "net-new" + no checkmark as scope start
    if ($line -match '^###\s+.*[Nn]et-new') {
        $inNetNew = $true
        continue
    }
    # Other subsection marker (### ⚠️ Partial / ### ❌ Already covered) ends net-new
    if ($line -match '^###\s+') {
        $inNetNew = $false
        continue
    }
    # Pick line: - `slug-here` (...) - https://url
    # Only top-level bullets (no leading spaces), only when in net-new
    if ($inNetNew -and $line -match '^-\s+`([a-z0-9][a-z0-9\-]*)`') {
        $slug = $matches[1]
        $clusterPicks[$currentCluster] += $slug
    }
}

$totalPickedFromPool = ($clusterPicks.Values | ForEach-Object { $_.Count } | Measure-Object -Sum).Sum
Write-OK "Parsed $($clusterPicks.Count) clusters with $totalPickedFromPool total net-new slugs"

# 3. Load shipped slugs (exclude from pool)
Write-Step "3/5 Identifying shipped slugs (to exclude)"
$blogContentDir = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.blogContentDir
if (-not (Test-Path $blogContentDir)) {
    Write-Fail "Blog content dir missing: $blogContentDir"
}
$shippedSlugs = @{}
foreach ($file in Get-ChildItem $blogContentDir -Filter '*.md' -File) {
    $shippedSlugs[$file.BaseName] = $true
}
Write-OK "Shipped pages on disk: $($shippedSlugs.Count)"

# 4. Build mega-wave pick set per bucket
Write-Step "4/5 Building mega-wave pick set per bucket"
$bucketPicks = @{ A = @(); B = @(); C = @() }
$bucketClusterMap = @{ A = @(); B = @(); C = @() }
$shippedSkipped = 0
$bucketsFromAffinity = $mwAffinity.bucketAssignment

foreach ($bucket in @('A','B','C')) {
    $assignedClusters = $bucketsFromAffinity.$bucket
    if (-not $assignedClusters) {
        Write-Warn "Bucket $bucket has no clusters in affinity for $mwKey"
        continue
    }
    foreach ($cluster in $assignedClusters) {
        if (-not $clusterPicks.ContainsKey($cluster)) {
            Write-Warn "Cluster '$cluster' (assigned to bucket $bucket) not found in pool - skipping"
            continue
        }
        $clusterSlugs = $clusterPicks[$cluster]
        $remaining = $clusterSlugs | Where-Object { -not $shippedSlugs.ContainsKey($_) }
        $shippedInCluster = $clusterSlugs.Count - $remaining.Count
        $shippedSkipped += $shippedInCluster
        if ($shippedInCluster -gt 0) {
            Write-Host "    Cluster '$cluster' (bucket $bucket): $($clusterSlugs.Count) total, $shippedInCluster already shipped, $($remaining.Count) remaining" -ForegroundColor DarkGray
        }
        foreach ($slug in $remaining) {
            $bucketPicks.$bucket += @{ slug = $slug; cluster = $cluster }
            $bucketClusterMap.$bucket += $cluster
        }
    }
}

# Apply per-bucket cap (deterministic: alphabetical by slug)
foreach ($bucket in @('A','B','C')) {
    if ($bucketPicks.$bucket.Count -gt $MaxBucketSize) {
        $overflow = $bucketPicks.$bucket.Count - $MaxBucketSize
        Write-Warn "Bucket $bucket has $($bucketPicks.$bucket.Count) picks, capping to $MaxBucketSize (overflow $overflow roll to MegaWave $($MegaWave + 1))"
        $bucketPicks.$bucket = @($bucketPicks.$bucket | Sort-Object -Property { $_.slug } | Select-Object -First $MaxBucketSize)
    }
}

$totalAssigned = ($bucketPicks.Values | ForEach-Object { $_.Count } | Measure-Object -Sum).Sum
Write-OK "MegaWave $MegaWave total: $totalAssigned picks (A:$($bucketPicks.A.Count) B:$($bucketPicks.B.Count) C:$($bucketPicks.C.Count)); $shippedSkipped shipped slugs excluded"

# 5. Emit picks.yaml + queue files
Write-Step "5/5 Emitting picks.yaml + queue_{A,B,C}.jsonl"
$briefsDir = Resolve-SitePath -Config $cfg -RelativePath $cfg.paths.briefsDir
$mwDir = Join-Path $briefsDir "megawave$MegaWave"

if ((Test-Path $mwDir) -and -not $Force -and -not $DryRun) {
    # Check existing queues for claimed rows
    $existingQueues = Get-ChildItem $mwDir -Filter 'queue_*.jsonl' -ErrorAction SilentlyContinue
    foreach ($q in $existingQueues) {
        $content = [System.IO.File]::ReadAllText($q.FullName, $utf8)
        if ($content -match '"status":"claimed"') {
            Write-Fail "Existing queue $($q.Name) has claimed rows. Use -Force to overwrite (will lose claim state)."
        }
    }
}

if ($DryRun) {
    Write-Warn "Would create dir: $mwDir"
    Write-Warn "Would write: $mwDir\picks.yaml ($totalAssigned picks)"
    foreach ($bucket in @('A','B','C')) {
        $batchCount = [math]::Ceiling($bucketPicks.$bucket.Count / $BatchSize)
        Write-Warn "Would write: $mwDir\queue_$bucket.jsonl ($($bucketPicks.$bucket.Count) picks in $batchCount batches)"
    }
} else {
    if (-not (Test-Path $mwDir)) { New-Item -ItemType Directory -Path $mwDir -Force | Out-Null }

    # picks.yaml (check-cannib.ps1-compatible schema)
    $yamlLines = @()
    $yamlLines += "wave: $MegaWave"
    $yamlLines += "# MegaWave $MegaWave - $($mwAffinity.label)"
    $yamlLines += "# Sliced by slice-megawave.ps1 on $((Get-Date).ToString('yyyy-MM-dd'))"
    $yamlLines += "# Total: $totalAssigned picks (A:$($bucketPicks.A.Count) B:$($bucketPicks.B.Count) C:$($bucketPicks.C.Count))"
    $yamlLines += ""
    $yamlLines += "buckets:"
    foreach ($bucket in @('A','B','C')) {
        if ($bucketPicks.$bucket.Count -eq 0) { continue }
        $clustersInBucket = ($bucketsFromAffinity.$bucket -join ' + ')
        $yamlLines += "  ${bucket}:"
        $yamlLines += "    label: ""Bucket $bucket - $clustersInBucket"""
        $yamlLines += "    picks:"
        $idx = 1
        foreach ($pick in $bucketPicks.$bucket) {
            $picId = "$bucket$idx"
            $labelEsc = $pick.cluster -replace '"', '\"'
            $yamlLines += "      - { id: $picId, slug: ""$($pick.slug)"", label: ""[$($pick.cluster)] $($pick.slug)"" }"
            $idx++
        }
    }
    [System.IO.File]::WriteAllText("$mwDir\picks.yaml", ($yamlLines -join "`n") + "`n", $utf8)
    Write-OK "Wrote $mwDir\picks.yaml ($totalAssigned picks)"

    # queue files per bucket
    foreach ($bucket in @('A','B','C')) {
        $picks = $bucketPicks.$bucket
        if ($picks.Count -eq 0) { continue }
        $queuePath = "$mwDir\queue_$bucket.jsonl"
        $jsonLines = @()
        $batchNum = 1
        $pickInBatch = 0
        foreach ($pick in $picks) {
            $pickInBatch++
            if ($pickInBatch -gt $BatchSize) {
                $batchNum++
                $pickInBatch = 1
            }
            $batchId = "M${MegaWave}-${bucket}-B${batchNum}"
            $picId = "$bucket$([Array]::IndexOf($picks, $pick) + 1)"
            $row = [ordered]@{
                slug     = $pick.slug
                label    = "[$($pick.cluster)] $($pick.slug)"
                batch_id = $batchId
                pick_id  = $picId
                cluster  = $pick.cluster
                status   = 'pending'
            }
            $jsonLines += ($row | ConvertTo-Json -Compress -Depth 10)
        }
        [System.IO.File]::WriteAllText($queuePath, ($jsonLines -join "`n") + "`n", $utf8)
        $batchCount = $batchNum
        Write-OK "Wrote $queuePath ($($picks.Count) picks in $batchCount batches)"
    }
}

Write-Host ""
Write-Host "=== MegaWave $MegaWave slice complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. Manager reviews picks.yaml (drops/moves picks as needed)"
Write-Host "  2. ./scripts/check-cannib.ps1 -Wave $MegaWave -Site $Site -PicksYaml `"$mwDir\picks.yaml`""
Write-Host "  3. Triage any partial-overlap rows in cannib report"
Write-Host "  4. (Round 4) ./scripts/rolling-orchestrator.ps1 -Site $Site -Wave $MegaWave -Phase stage1"
Write-Host ""
