#requires -Version 5.1
<#
.SYNOPSIS
  Shared site-configuration loader for the wave + rolling-orchestrator scripts.

.DESCRIPTION
  Provides Get-SiteConfig $Site, which loads sites/<site>.json and returns
  a hashtable with all paths, conventions, and project IDs the wave scripts
  need. Single source of truth per site.

  Designed for cross-site templating: same scripts run for property /
  dentists / medical / solicitors / contractors-ir35 / generalist /
  agency-founder-finance by switching -Site.

  Backward-compatible: every script that takes -Site defaults to 'property'
  so existing invocations continue to work unchanged.

  Path resolution: paths in the JSON are stored relative to repoRoot
  (except repoRoot + worktreeBase which are absolute). Use
  Resolve-SitePath to combine. Worktree + branch patterns use
  {site}/{wavekind}/{wave}/{bucket} placeholders; use Resolve-WorktreePath
  + Resolve-BranchName to substitute.

.EXAMPLE
  . "$PSScriptRoot\_lib\site-config.ps1"
  $cfg = Get-SiteConfig 'property'
  $tracker = Join-Path $cfg.paths.repoRoot ($cfg.paths.docsDir + '/' + (Resolve-Naming $cfg.naming.trackerFile -Wave 9))
#>

# Path to the sites directory, computed once at load
$script:SitesDir = Join-Path (Split-Path -Parent (Split-Path -Parent $PSScriptRoot)) 'sites'

function Get-SiteConfig {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)]
        [string]$Site
    )

    $configPath = Join-Path $script:SitesDir "$Site.json"
    if (-not (Test-Path $configPath)) {
        throw "Site config missing: $configPath. Run bootstrap-site.ps1 -Site $Site to scaffold one, or check the site name."
    }

    $utf8 = [System.Text.UTF8Encoding]::new($false)
    $json = [System.IO.File]::ReadAllText($configPath, $utf8)
    # ConvertFrom-Json in PS 5.1 returns PSCustomObject. Convert to nested
    # hashtable for dot-notation + .ContainsKey() usability.
    $obj = $json | ConvertFrom-Json
    return ConvertTo-NestedHashtable $obj
}

function ConvertTo-NestedHashtable {
    param($Object)
    if ($null -eq $Object) { return $null }
    if ($Object -is [System.Management.Automation.PSCustomObject]) {
        $ht = @{}
        foreach ($p in $Object.PSObject.Properties) {
            $ht[$p.Name] = ConvertTo-NestedHashtable $p.Value
        }
        return $ht
    }
    if ($Object -is [System.Collections.IEnumerable] -and -not ($Object -is [string])) {
        return @($Object | ForEach-Object { ConvertTo-NestedHashtable $_ })
    }
    return $Object
}

function Resolve-SitePath {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)] [hashtable]$Config,
        [Parameter(Mandatory=$true)] [string]$RelativePath
    )
    # Absolute path passthrough
    if ($RelativePath -match '^[A-Za-z]:[\\/]') { return $RelativePath }
    return (Join-Path $Config.paths.repoRoot $RelativePath) -replace '/', '\'
}

function Resolve-Naming {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)] [string]$Template,
        [int]$Wave,
        [string]$Bucket,
        [string]$BucketUpper,
        [string]$Site,
        [string]$WaveKind = 'wave'
    )
    $out = $Template
    if ($PSBoundParameters.ContainsKey('Wave'))        { $out = $out -replace '\{wave\}', "$Wave" }
    if ($PSBoundParameters.ContainsKey('Bucket'))      { $out = $out -replace '\{bucket\}', $Bucket }
    if ($PSBoundParameters.ContainsKey('BucketUpper')) { $out = $out -replace '\{bucketUpper\}', $BucketUpper }
    if ($PSBoundParameters.ContainsKey('Site'))        { $out = $out -replace '\{site\}', $Site }
    if ($PSBoundParameters.ContainsKey('WaveKind'))    { $out = $out -replace '\{wavekind\}', $WaveKind }
    return $out
}

function Resolve-WorktreePath {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)] [hashtable]$Config,
        [Parameter(Mandatory=$true)] [int]$Wave,
        [Parameter(Mandatory=$true)] [string]$Bucket,
        [string]$WaveKind = 'wave'
    )
    $name = Resolve-Naming $Config.paths.worktreePattern `
        -Site $Config.site -Wave $Wave -Bucket $Bucket -WaveKind $WaveKind
    return (Join-Path $Config.paths.worktreeBase $name) -replace '/', '\'
}

function Resolve-BranchName {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)] [hashtable]$Config,
        [Parameter(Mandatory=$true)] [int]$Wave,
        [Parameter(Mandatory=$true)] [string]$Bucket,
        [string]$WaveKind = 'wave'
    )
    return Resolve-Naming $Config.paths.branchPattern `
        -Site $Config.site -Wave $Wave -Bucket $Bucket -WaveKind $WaveKind
}

# Convenience: resolve a wave-specific artefact path from config.naming
function Get-WaveArtefactPath {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory=$true)] [hashtable]$Config,
        [Parameter(Mandatory=$true)] [int]$Wave,
        [Parameter(Mandatory=$true)]
        [ValidateSet('tracker','flags','qa','discovery','launchPrompts','startHere','promptExtractDir','briefDir','cannibCheck')]
        [string]$Kind,
        [string]$Bucket,
        [string]$BucketUpper
    )

    $namingKey = switch ($Kind) {
        'tracker'          { 'trackerFile' }
        'flags'            { 'flagsFile' }
        'qa'               { 'qaFile' }
        'discovery'        { 'discoveryFile' }
        'launchPrompts'    { 'launchPromptsFile' }
        'startHere'        { 'startHereFile' }
        'promptExtractDir' { 'promptExtractDir' }
        'briefDir'         { 'briefSubdir' }
        'cannibCheck'      { 'cannibCheckFile' }
    }
    $template = $Config.naming.$namingKey
    $name = Resolve-Naming $template -Wave $Wave -Bucket $Bucket -BucketUpper $BucketUpper

    # Directory of the artefact varies by kind
    $dir = switch ($Kind) {
        'tracker'          { $Config.paths.docsDir }
        'flags'            { $Config.paths.docsDir }
        'qa'               { $Config.paths.docsDir }
        'discovery'        { $Config.paths.docsDir }
        'launchPrompts'    { $Config.paths.sessionsDir }
        'startHere'        { $Config.paths.sessionsDir }
        'promptExtractDir' { $Config.paths.sessionsDir }
        'briefDir'         { $Config.paths.briefsDir }
        'cannibCheck'      { $Config.paths.docsDir }
    }
    return Resolve-SitePath -Config $Config -RelativePath ("$dir/$name")
}
