# Runs basic build, publish, and outputs key PWA artifacts
param(
  [string]$Project = "g:\GitHubMCP\ChopChop\ChopChop.csproj"
)

dotnet build $Project -c Release
if($LASTEXITCODE -ne 0){ Write-Error "Build failed"; exit 1 }

$p = Join-Path (Split-Path $Project -Parent) 'publish'
dotnet publish $Project -c Release -o $p
if($LASTEXITCODE -ne 0){ Write-Error "Publish failed"; exit 1 }

Get-ChildItem $p -Recurse -Include service-worker*.js,manifest.webmanifest,offline.html,index.html | Select-Object FullName,Length | Format-Table -AutoSize
Write-Host "QA check complete."
