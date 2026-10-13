# Academy Skills

Academy Skills is a collection of reusable procedural skills maintained in the **Academy** module of [Code Awareness](https://github.com/ericrocha001/code_awareness). The skills guide engineering workflows, architecture decisions, repository navigation, implementation validation, and other agent tasks.

## Source of truth

**The local Academy database is the canonical source.** This GitHub repository is a managed distribution projection, not the primary editing location. Only active, global skills are included in its managed `skills/` directory.

Create and update skills through the Academy interface in Code Awareness. The GitHub Sync operation projects validated canonical content into this repository and publishes it to the configured branch.

Do not treat a GitHub-only edit as a canonical skill update. Doing so can introduce drift and require reconciliation before the next sync.

## Repository structure

- `skills/<skill-name>/SKILL.md` — each skill's instructions.
- `skills/<skill-name>/...` — optional supporting artifacts.
- `plugin.json` — Academy Skills plugin manifest.
- `assets/logo.png` — plugin identity asset.
- `.agents/plugins/marketplace.json` — marketplace discovery metadata.

## Distribution and versioning

The Academy supports different distribution paths:

- **GitHub:** the repository projection for Git-based integrations and discovery.
- **Native destinations:** filesystem projections managed by the Academy for supported environments.
- **ChatGPT plugin package:** a separately prepared release archive produced from the canonical Academy data, with its own upload and verification workflow.

The version in `plugin.json` describes the **GitHub projection**, and may temporarily differ from the latest canonical package revision or the version installed in ChatGPT. An existing GitHub commit alone does not prove that a ChatGPT-hosted plugin has been updated.

## Development and experiments

Use isolated branches or worktrees for experimental integrations. Keep experimental files and verification skills out of `main` until validated and intentionally approved. Avoid changing managed skill files directly while GitHub Sync is active.

## Rights and permissions

This repository is publicly visible but **does not include an open-source license**. All rights are reserved by the respective rights holders. Public availability is not a general grant of permission to reproduce, modify, or redistribute the contents, except where applicable platform terms or law permit.
