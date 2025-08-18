AI architecture overview

This doc captures the high-level approach we’re using across projects:

- Local runtime by default via Ollama; cloud providers can be added later
- MCP for tool/services abstraction
- Semantic Kernel for orchestration:
  - Agent Framework (skills/plugins, planners)
  - Process Framework (flows, steps, guards)
- Reusable prompt templates and solution templates in `.examples`
- Optional DocFX site for docs

Key patterns:
- Structured outputs (JSON schemas) to enable MSBuild tasks and appsettings generation
- Deterministic prompting: system + instructions + tests
- Idempotent merge to appsettings.json
- “Design-first” prompts to produce UI + data contracts for rapid SPA scaffolds
