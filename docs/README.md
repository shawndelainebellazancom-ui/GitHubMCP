Docs overview

This folder contains project documentation. It’s organized to be DocFX-ready while remaining simple to browse in GitHub.

- articles/ – human-authored guides and how-tos
- api/ – API docs output (DocFX generates here)
- docfx.json – DocFX config (optional; customize later)
- toc.yml – top-level table of contents

Topics covered:
- AI prompt templates and reusable patterns
- MSBuild AI Task (AppSettingsTask) for structured JSON generation/merge
- Using local Ollama by default
- MCP notes and architecture ideas

To build with DocFX (optional):
1. Install DocFX
2. From repo root: docfx docs/docfx.json
3. Serve docs/_site
