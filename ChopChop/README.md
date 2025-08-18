# ChopChop Blazor PWA

Run locally (Windows PowerShell):

```powershell
# Requires .NET 8 SDK
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
- Already wired in this project. To enable in a shell: set `USE_TELERIK=true` and ensure your NuGet source has credentials.
- Env-based setup (PowerShell):
	```powershell
	# one-time: copy license
	Copy-Item g:\GitHubMCP\ChopChop\telerik-license.txt "$env:APPDATA\Telerik\telerik-license.txt" -Force
	# per-shell: enable and configure source (username can be your Telerik email; token is your API key)
	$env:USE_TELERIK = 'true'
	$env:TELERIK_NUGET_SOURCE = 'https://nuget.telerik.com/v3/index.json'
	$env:TELERIK_NUGET_USERNAME = '<your-email>'
	$env:TELERIK_NUGET_TOKEN = '<your-api-key>'
	dotnet nuget update source telerik.com --username $env:TELERIK_NUGET_USERNAME --password $env:TELERIK_NUGET_TOKEN --store-password-in-clear-text
	```
- Pages converted to Telerik: Services, Pricing, Booking (with FloatingLabels and validation messages). The layout is wrapped in `TelerikRootComponent`.
- If you don’t want Telerik, unset or set `USE_TELERIK=false`.

AI integrations
- Dev page: navigate to `/ai` to test an Ollama-compatible endpoint (defaults to `http://localhost:11434`).
	- Enter a model (e.g., `llama3.2:1b`) and prompt, then Run. For production, front with a secure proxy/provider.
- GitHub Action: `.github/workflows/ai-run.yml`.
	- Dispatch with inputs: `provider=ollama|huggingface`, `model`, `prompt`, and optionally `ollama_endpoint`.
	- For Hugging Face, add repo secret `HF_TOKEN`.

Secret bootstrap
- Optional helper to sync local .env or APPDATA license to repo secrets using GitHub CLI:
	- `scripts/sync-gh-secrets.ps1 [-EnvFile g:\GitHubMCP\.env] [-IncludeHF]`
	- Requires `gh auth login` beforehand.

.env
- Place non-committed settings in `g:\GitHubMCP\.env`. The build reads `USE_TELERIK` when present. Other sample keys:
	- `TELERIK_NUGET_SOURCE`, `TELERIK_NUGET_USERNAME`, `TELERIK_NUGET_TOKEN`
	- `PUBLIC_*` branding options
