param(
  [string]$EnvFile = "g:\GitHubMCP\.env",
  [switch]$IncludeHF
)

# Purpose: Sync local secrets into the current repo using GitHub CLI.
# Run from the ChopChop repo root. Requires `gh auth login` already done.

function Set-RepoSecret {
  param(
    [Parameter(Mandatory=$true)][string]$Name,
    [Parameter(Mandatory=$true)][string]$Value
  )
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($Value)
  $p = Start-Process -FilePath gh -ArgumentList @('secret','set',$Name,'--body','-') -NoNewWindow -PassThru -RedirectStandardInput Pipe -Wait
  $p.StandardInput.BaseStream.Write($bytes,0,$bytes.Length)
  $p.StandardInput.Close()
  if ($p.ExitCode -ne 0) { throw "gh secret set $Name failed with exit code $($p.ExitCode)" }
}

Write-Host "Checking gh auth..." -ForegroundColor Cyan
& gh auth status 1>$null 2>$null
if ($LASTEXITCODE -ne 0) { throw "GitHub CLI is not authenticated. Run 'gh auth login' first." }

if (-not (Test-Path $EnvFile)) {
  Write-Warning "Env file not found at $EnvFile. Continuing with environment variables only."
}

# Load .env values if present
$envMap = @{}
if (Test-Path $EnvFile) {
  Get-Content $EnvFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith('#')) {
      $kv = $line -split '=',2
      if ($kv.Length -eq 2) { $envMap[$kv[0]] = $kv[1] }
    }
  }
}

# Helper to get value from .env or process env
function Get-Val([string]$key) {
  if ($envMap.ContainsKey($key)) { return $envMap[$key] }
  return [Environment]::GetEnvironmentVariable($key, 'Process')
}

# Telerik secrets
$t_source = (Get-Val 'TELERIK_NUGET_SOURCE'); if (-not $t_source) { $t_source = 'https://nuget.telerik.com/v3/index.json' }
$t_user   = (Get-Val 'TELERIK_NUGET_USERNAME')
$t_token  = (Get-Val 'TELERIK_NUGET_TOKEN')

# License content: prefer TELERIK_LICENSE; else try APPDATA path
$t_license = (Get-Val 'TELERIK_LICENSE')
if (-not $t_license) {
  $licensePath = Join-Path $env:APPDATA 'Telerik\telerik-license.txt'
  if (Test-Path $licensePath) {
    $t_license = Get-Content $licensePath -Raw
  }
}

if ($t_license) { Set-RepoSecret -Name 'TELERIK_LICENSE' -Value $t_license; Write-Host "Set TELERIK_LICENSE" -ForegroundColor Green }
if ($t_source) { Set-RepoSecret -Name 'TELERIK_NUGET_SOURCE' -Value $t_source; Write-Host "Set TELERIK_NUGET_SOURCE" -ForegroundColor Green }
if ($t_user)   { Set-RepoSecret -Name 'TELERIK_NUGET_USERNAME' -Value $t_user; Write-Host "Set TELERIK_NUGET_USERNAME" -ForegroundColor Green }
if ($t_token)  { Set-RepoSecret -Name 'TELERIK_NUGET_TOKEN' -Value $t_token; Write-Host "Set TELERIK_NUGET_TOKEN" -ForegroundColor Green }

if ($IncludeHF) {
  $hf = (Get-Val 'HF_TOKEN')
  if ($hf) { Set-RepoSecret -Name 'HF_TOKEN' -Value $hf; Write-Host "Set HF_TOKEN" -ForegroundColor Green }
  else { Write-Warning "HF_TOKEN not found in .env or environment. Skipping." }
}

Write-Host "Done." -ForegroundColor Cyan
