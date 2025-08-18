param(
  [string]$EnvPath = (Join-Path -Path $PSScriptRoot -ChildPath (Join-Path -Path '..' -ChildPath '.env')),
  [string]$Repo = ''
)
$ErrorActionPreference = 'Stop'
if (-not $Repo) {
  try {
    $remoteUrl = git config --get remote.origin.url
    if ($LASTEXITCODE -eq 0 -and $remoteUrl) {
      if ($remoteUrl -match 'github.com[:/](?<owner>[^/]+)/(?<repo>[^/.]+)') {
        $Repo = "$($Matches['owner'])/$($Matches['repo'])"
      }
    }
  } catch {}
}
if (-not $Repo) { throw 'Repo not provided and could not infer from git remote. Provide as owner/repo.' }

if (!(Test-Path -LiteralPath $EnvPath)) { throw "Missing .env at $EnvPath" }

Write-Host "Reading env from $EnvPath" -ForegroundColor Cyan
$envMap = @{}
Get-Content -LiteralPath $EnvPath -Encoding UTF8 | ForEach-Object {
  if ([string]::IsNullOrWhiteSpace($_)) { return }
  $t = $_.Trim(); if ($t.StartsWith('#')) { return }
  $idx = $t.IndexOf('='); if ($idx -lt 1) { return }
  $name = $t.Substring(0,$idx).Trim(); $value = $t.Substring($idx+1).Trim()
  $envMap[$name] = $value
}

# Resolve username/token with legacy fallbacks
$username = $envMap['TELERIK_NUGET_USERNAME']
if ([string]::IsNullOrWhiteSpace($username)) { $username = $envMap['TELERIK_USERNAME'] }
$token = $envMap['TELERIK_NUGET_TOKEN']
if ([string]::IsNullOrWhiteSpace($token)) { $token = $envMap['TELERIK_PASSWORD'] }

if ([string]::IsNullOrWhiteSpace($username) -or [string]::IsNullOrWhiteSpace($token)) {
  throw 'Missing TELERIK_NUGET_USERNAME/TELERIK_USERNAME or TELERIK_NUGET_TOKEN/TELERIK_PASSWORD in .env'
}
if ($envMap['TELERIK_PASSWORD'] -and -not $envMap['TELERIK_NUGET_TOKEN']) {
  Write-Warning 'Using TELERIK_PASSWORD as the secret token. Consider generating a Telerik NuGet API key and setting TELERIK_NUGET_TOKEN instead.'
}

Write-Host "Pushing GitHub Actions secrets to $Repo" -ForegroundColor Cyan
& gh secret set TELERIK_NUGET_USERNAME --repo $Repo --body $username | Out-Null
& gh secret set TELERIK_NUGET_TOKEN --repo $Repo --body $token | Out-Null
if ($envMap.ContainsKey('TELERIK_NUGET_SOURCE') -and -not [string]::IsNullOrWhiteSpace($envMap['TELERIK_NUGET_SOURCE'])) {
  & gh secret set TELERIK_NUGET_SOURCE --repo $Repo --body $envMap['TELERIK_NUGET_SOURCE'] | Out-Null
}
Write-Host "Done." -ForegroundColor Green
