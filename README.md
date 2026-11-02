# Academy Skills

Academy Skills is a collection of reusable procedural skills maintained through Git and the **Academy** module of [Code Awareness](https://github.com/ericrocha001/code_awareness). The skills guide engineering workflows, architecture decisions, repository navigation, implementation validation, and other agent tasks.

## Source of truth

The observed commit of this repository's publication branch (`main` by default) is the versioned authority for published GLOBAL skills and authored plugin inputs. Both direct Git contributions and edits saved through Academy are supported. An unpushed local commit, a candidate branch, or an open pull request is not official content.

Academy stores edits as private commits in an isolated Git workspace. Publication uses a normal fast-forward push when permitted, or a separate candidate branch for an explicitly reviewed pull request. Remote updates and merged contributions are validated and materialized in SQLite before local distribution. Automatic publication and remote updates are separate, explicit, revocable preferences; offline operation preserves pending work without claiming synchronization.

SQLite retains the last accepted Git snapshot, immutable legacy skill versions, identifiers, local activation preferences, assignments, delivery state, and release receipts. Migration preserves all historical version numbers and package bytes. Subsequent skill versions follow effective package transitions along the publication branch's first-parent history, including reverts, without duplicate numbering on refresh or restart.

Local ACTIVE/DISABLED preferences affect local consumers only. Disabling a published skill does not remove it from Git or from the ChatGPT package. Removing published content requires an explicit Git change. Private legacy skills absent from the public branch are not automatically published by migration. PROJECT skills remain independent of this global repository.

## Repository structure

- `skills/<skill-name>/SKILL.md` — each skill's instructions.
- `skills/<skill-name>/...` — optional supporting artifacts.
- `plugin.json` — authored Academy Skills plugin manifest and release version.
- `assets/logo.png` — authored plugin identity asset.
- `.agents/plugins/marketplace.json` — marketplace discovery metadata.

## Distribution and versioning

- **Git:** approved published source for Git integrations and discovery.
- **Native destinations:** local projections from the accepted snapshot, respecting activation preferences.
- **ChatGPT plugin package:** a separate deterministic release archive derived from one verified Git commit, including its skill resources, manifest, assets, and declared version.

Skill version numbers and the plugin's semantic version are independent. A new release with changed content requires an appropriate version change in `plugin.json` on the publication branch. Local drafts and activation preferences do not select the release contents. An offline rebuild identifies a previously verified commit and does not claim to be the latest remote version. A prepared ZIP, a manually uploaded package, and a verified ChatGPT installation are distinct states; neither Git push nor synchronization uploads a plugin.

## Development and experiments

Use isolated branches or worktrees for experiments and contributions. Keep experimental files and verification skills out of `main` until validated and intentionally approved. Incoming Git content is validated as data; synchronization does not execute synchronized scripts. Conflicting changes require explicit reconciliation and never select a local or remote winner automatically.

## Rights and permissions

This repository is publicly visible but **does not include an open-source license**. All rights are reserved by the respective rights holders. Public availability is not a general grant of permission to reproduce, modify, or redistribute the contents, except where applicable platform terms or law permit.

