# Deployment

This app is a Blazor WebAssembly PWA. Publish outputs land in `bin/Release/net8.0/wwwroot`.

## Prereqs
- Telerik NuGet feed credentials
- Telerik license via TELERIK_LICENSE or TELERIK_LICENSE_PATH

## GitHub Actions: CI
- Workflow: `.github/workflows/ci.yml`
- Artifacts: `site` (static site output)
- Secrets required (optional if you keep Telerik feed public on the runner):
  - `TELERIK_LICENSE`
  - `TELERIK_NUGET_SOURCE` (default: `https://nuget.telerik.com/v3/index.json`)
  - `TELERIK_NUGET_USERNAME`
  - `TELERIK_NUGET_TOKEN`

## Cloudflare Pages
- Workflow: `.github/workflows/deploy-cloudflare.yml`
- Secrets required:
  - `CLOUDFLARE_API_TOKEN` (Pages:Edit)
  - `CF_ACCOUNT_ID`
  - `CF_PAGES_PROJECT`
  - `TELERIK_*` as above
- Output directory: `ChopChop/bin/Release/net8.0/wwwroot`
- DNS: Create a CNAME for your subdomain to `<project>.pages.dev` in Cloudflare. Point apex via CNAME flattening if desired.

## Firebase Hosting
- Workflow: `.github/workflows/deploy-firebase.yml`
- Secrets required:
  - `FIREBASE_SERVICE_ACCOUNT` (JSON)
  - `FIREBASE_PROJECT_ID`
  - `TELERIK_*` as above
- `firebase.json` configured to deploy the publish output folder.
- DNS: Add an A record to Firebase provided endpoints or use TXT verification in Firebase console for custom domains.

## GitHub Pages
- Workflow: `.github/workflows/deploy-pages.yml`
- Permissions: Pages (write), ID Token (write)
- Secrets required (same as CI if private Telerik feed):
  - `TELERIK_LICENSE`
  - `TELERIK_NUGET_SOURCE` (default: `https://nuget.telerik.com/v3/index.json`)
  - `TELERIK_NUGET_USERNAME`
  - `TELERIK_NUGET_TOKEN`
- Repository variables (optional):
  - `PAGES_BASE_PATH` (e.g., `/owner-repo/` for project pages; leave empty for user/org pages)
  - `PAGES_CUSTOM_DOMAIN` (e.g., `app.example.com` to generate CNAME)
- Notes:
  - Workflow rewrites `<base href="/" />` in `index.html` when `PAGES_BASE_PATH` is set.
  - SPA fallback `404.html` is created automatically.
  - Output directory: `ChopChop/publish/wwwroot` (workflow uses `-o publish`).

## Manual publish
```powershell
$env:USE_TELERIK='true'
dotnet publish ChopChop.csproj -c Release --nologo
# Deploy ChopChop/bin/Release/net8.0/wwwroot to your static host
```
