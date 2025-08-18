MSBuild AI Task (AppSettingsTask)

Concept
- A build step can invoke AI to produce structured JSON and merge it into appsettings.* for consistent configuration across environments.

Current status
- The task compiles from `.examples/templates/msbuild/AppSettingsTask` and runs if you opt-in with `EnableAiAppSettings=true`.
- For safety, it reads a prepared JSON file via `PromptPath` instead of calling a model.

How to use
1. Import `AppSettingsTask.targets` in your project file.
2. Set `EnableAiAppSettings=true` in a Directory.Build.props or via command line.
3. Provide `AiAppSettingsPromptPath` pointing to a JSON file that matches your intended schema.

Future
- Connect to local Ollama with a small client.
- Integrate Semantic Kernel for plans/skills.
- Add schema validation and richer merge strategies.
