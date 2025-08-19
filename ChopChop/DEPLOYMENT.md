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
- DNS: In the Cloudflare Pages project, add your custom domain; Cloudflare will create the proxied CNAME in your zone. For apex, Cloudflare handles CNAME flattening. If adding manually, CNAME your subdomain to `<project>.pages.dev`.

## Firebase Hosting
- Workflow: `.github/workflows/deploy-firebase.yml`
- Secrets required:
  - `FIREBASE_TOKEN` (for CLI) or `FIREBASE_SERVICE_ACCOUNT` (JSON) if using a service account workflow
  - `FIREBASE_PROJECT`
  - `TELERIK_*` as above
- `firebase.json` configured to deploy the publish output folder.
- Cloudflare DNS for custom domains:
  1) In Firebase Console > Hosting > Add custom domain. Follow the wizard; it will show exact DNS records (TXT for verification, and CNAME for subdomains or A records for apex).
  2) In Cloudflare DNS, create the records exactly as shown. Set proxy to DNS only (gray cloud) until Firebase verifies and provisions SSL.
  3) After SSL is active in Firebase, you may enable the Cloudflare proxy (orange cloud). Keep SSL/TLS mode at Full (strict).
  4) Optional: add Cache Rules for static assets (`**/*.wasm, **/*.dll, **/*.js, **/*.css, **/*.woff2`) and enable Brotli + HTTP/3.

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
