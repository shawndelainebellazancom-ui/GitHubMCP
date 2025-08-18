param(
  [string]$EnvPath = (Join-Path -Path $PSScriptRoot -ChildPath (Join-Path -Path '..' -ChildPath '.env')),
  [string]$Project = (Join-Path -Path $PSScriptRoot -ChildPath (Join-Path -Path '..' -ChildPath (Join-Path -Path 'ChopChop' -ChildPath 'ChopChop.csproj')))
)
$ErrorActionPreference = 'Stop'

if (!(Test-Path -LiteralPath $EnvPath)) { throw "Missing .env at $EnvPath" }

Write-Host "Loading env from $EnvPath" -ForegroundColor Cyan
Get-Content -LiteralPath $EnvPath -Encoding UTF8 | ForEach-Object {
  if ([string]::IsNullOrWhiteSpace($_)) { return }
  $t = $_.Trim(); if ($t.StartsWith('#')) { return }
  $idx = $t.IndexOf('='); if ($idx -lt 1) { return }
  $name = $t.Substring(0,$idx).Trim(); $value = $t.Substring($idx+1).Trim()
  [Environment]::SetEnvironmentVariable($name, $value, 'Process')
}

# Enable Telerik for this session
$env:USE_TELERIK = 'true'

# Pick username/token
$uname = $env:TELERIK_NUGET_USERNAME; if (-not $uname) { $uname = $env:TELERIK_USERNAME }
$token = $env:TELERIK_NUGET_TOKEN; if (-not $token) { $token = $env:TELERIK_PASSWORD }

# Choose source URL from env or default
$sourceUrl = $env:TELERIK_NUGET_SOURCE
if ([string]::IsNullOrWhiteSpace($sourceUrl)) { $sourceUrl = 'https://nuget.telerik.com/v3/index.json' }

if (-not $uname -or -not $token) {
  throw 'Missing Telerik username or token in .env (expected TELERIK_NUGET_USERNAME/TELERIK_USERNAME and TELERIK_NUGET_TOKEN/TELERIK_PASSWORD).'
}

Write-Host "Configuring Telerik feed ($sourceUrl) with provided credentials..." -ForegroundColor Cyan
# Recreate the source for a clean slate
try { dotnet nuget remove source TelerikNuGetV3 | Out-Null } catch {}
try {
  # Store credentials securely (Windows DPAPI/credential store) by omitting --store-password-in-clear-text
  $addOut = dotnet nuget add source $sourceUrl --name TelerikNuGetV3 --username "$uname" --password "$token"
  Write-Host $addOut
} catch {
  Write-Warning $_
}

Write-Host "Restoring $Project" -ForegroundColor Cyan
$restoreOut = dotnet restore $Project
Write-Host $restoreOut

Write-Host "Checking for outdated packages (including Telerik)..." -ForegroundColor Cyan
try {
  $listOut = dotnet list $Project package --outdated --source TelerikNuGetV3 --source nuget.org
  Write-Host $listOut
} catch {
  if ($_.Exception.Message -match '401' -or $_.ToString() -match 'Unauthorized') {
    Write-Warning "Outdated check against Telerik feed returned 401. Restore/build may still work if credentials are valid or packages are cached."
  } else {
    Write-Warning $_
  }
}

Write-Host "Done." -ForegroundColor Green
