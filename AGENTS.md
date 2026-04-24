# Repository Guidelines

## Project Structure & Module Organization
This repository is currently minimal: the root contains Git metadata, `.gitignore`, and contributor docs only. `.omx/` is local OMX runtime state and is intentionally ignored. Keep new tracked root files limited to repo-wide documents or configuration. When code is added, prefer `src/` for application code, `tests/` for automated checks, and `assets/` for static files. Mirror feature names across folders (for example, `src/invitations/` and `tests/invitations/`).

## Build, Test, and Development Commands
No build or test toolchain is committed yet. Until one exists, use:
- `git status` — confirm the working tree before committing.
- `git diff --stat` — review the scope of your changes.
- `find . -maxdepth 2 -type f` — verify the repository layout stays intentional.

If you introduce a runtime or test framework, add a single top-level entry point (for example `make test` or `npm test`) and document it here in the same change.

## Coding Style & Naming Conventions
Use Markdown with ATX headings (`#`, `##`) and short, task-oriented bullets. Keep prose direct and repository-specific. Use uppercase filenames for repo-wide docs (`AGENTS.md`, `README.md`), and kebab-case for general files and directories unless a language ecosystem requires otherwise. Prefer ASCII unless a file already uses non-ASCII text intentionally.

## Testing Guidelines
There is no automated test suite yet. For documentation-only changes, manually verify Markdown renders cleanly and examples are accurate. When adding code, add tests in `tests/` or alongside the module using a clear pattern such as `feature-name.test.<ext>`, and document how to run them before opening a PR.

## Commit & Pull Request Guidelines
The repository has no project history yet, so start with the workspace Lore commit format: an intent-first subject line, a short rationale paragraph, and useful trailers such as `Constraint:`, `Confidence:`, `Scope-risk:`, and `Tested:`. Keep PRs narrow, describe the change and verification performed, link related issues, and include screenshots when UI or rendered output changes.

## Security & Configuration Tips
Do not commit `.omx/`, secrets, local caches, or machine-specific configuration. Keep the root tidy; if you add new workflow conventions or tooling, update this guide in the same PR so future contributors inherit the right defaults.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
