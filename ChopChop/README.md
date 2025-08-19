# ChopChop Blazor PWA (Telerik-first)

Run locally (Windows PowerShell):

```powershell
# Requires .NET 10 SDK (Preview)
cd g:\GitHubMCP\ChopChop
# Restore and run
dotnet restore
dotnet run
```

Deploy low-cost
- Azure Static Web Apps: build `dotnet publish -c Release` and deploy `wwwroot`
- Firebase Hosting: export via `dotnet publish -c Release` and copy `wwwroot` to hosting public

PWA
- Manifest: `wwwroot/manifest.webmanifest` (primary) and optional `wwwroot/manifest.json`
- Icons: ensure `wwwroot/android-icon-*.png` and `wwwroot/apple-icon-*.png` exist for install prompts
- Service worker auto-registered; offline caching in published build

Favicons & App Icons
- The app head includes links to favicon/app icon files in `wwwroot/` (apple-icon-*, android-icon-*, favicon-*, ms-icon-*).
- If you regenerate, keep the file names/paths the same or update `wwwroot/index.html` accordingly.
- SVG branding lives under `wwwroot/icons/Branding/`. Use SVGs in markup or export PNGs for favicon usage.

Domains
- Point `tooensure.com` and `shawndelainrbellazan.com` via Cloudflare to hosting origin

Telemetry
- Client-side local buffer in `wwwroot/js/telemetry.js`

Feedback
- Open `docs/DESIGN-SPECS.md` and edit colors/typography as needed.

Telerik UI for Blazor
- Required by default. Configure the private Telerik NuGet feed once, then restore/build.
- Setup (with credentials in `.env`):
	```powershell
	# 1) Fill g:\GitHubMCP\.env from .env.example (username = your Telerik account email, token = API key)
	# 2) Run the helper to add the Telerik feed and restore
	powershell -NoProfile -ExecutionPolicy Bypass -File g:\GitHubMCP\scripts\setup-telerik-feed.ps1
	# 3) Build/Run
	dotnet build .\ChopChop\ChopChop.csproj -c Release
	dotnet run --project .\ChopChop\ChopChop.csproj
	```

AI integrations
- Dev page: navigate to `/ai` to test an Ollama-compatible endpoint (defaults to `http://localhost:11434`).
	- Enter a model (e.g., `llama3.2:1b`) and prompt, then Run. For production, front with a secure proxy/provider.
- GitHub Action: `.github/workflows/ai-run.yml`.
	- Dispatch with inputs: `provider=ollama|huggingface`, `model`, `prompt`, and optionally `ollama_endpoint`.
	- For Hugging Face, add repo secret `HF_TOKEN`.

Secret bootstrap
- Optional helper to sync local `.env` secrets to repo secrets using GitHub CLI:
	- `scripts/sync-gh-secrets.ps1 [-EnvFile g:\GitHubMCP\.env] [-IncludeHF]`
	- Requires `gh auth login` beforehand.

.env
- Place non-committed settings in `g:\GitHubMCP\.env`. Keys:
	- `TELERIK_NUGET_SOURCE` (optional), `TELERIK_NUGET_USERNAME`, `TELERIK_NUGET_TOKEN`
	- `PUBLIC_*` branding options

CI (GitHub Actions)
- Add repo Secrets:
	- `TELERIK_NUGET_USERNAME` = your Telerik account email
	- `TELERIK_NUGET_TOKEN` = your Telerik API key
	- `TELERIK_LICENSE` = your Telerik license token (or set `TELERIK_LICENSE_FILE` with a secure file provision)
- Workflow: `.github/workflows/build-chopchop.yml`
	- Builds ChopChop with .NET 10 preview on Windows, configures the Telerik feed, and publishes artifacts.
