#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const REPO_REGEX = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function sanitizeOutput(text) {
  if (!text) return '';
  return String(text).replace(/(?:ghp_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+|bearer\s+[A-Za-z0-9._-]+|token\s+[A-Za-z0-9._-]+)/gi, '[REDACTED]');
}

function parseArgs(rawArgs) {
  const options = {
    repo: '',
    head: '',
    base: '',
    title: '',
    body: '',
    bodyFile: '',
    expectedHeadSha: '',
    cwd: process.cwd()
  };

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === '--help' || arg === '-h') {
      return { help: true };
    }
    if (arg === '--repo') {
      options.repo = rawArgs[++i] || '';
    } else if (arg === '--head') {
      options.head = rawArgs[++i] || '';
    } else if (arg === '--base') {
      options.base = rawArgs[++i] || '';
    } else if (arg === '--title') {
      options.title = rawArgs[++i] || '';
    } else if (arg === '--body') {
      options.body = rawArgs[++i] || '';
    } else if (arg === '--body-file') {
      options.bodyFile = rawArgs[++i] || '';
    } else if (arg === '--expected-head-sha') {
      options.expectedHeadSha = rawArgs[++i] || '';
    } else if (arg === '--cwd') {
      options.cwd = rawArgs[++i] || process.cwd();
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (options.bodyFile && !options.body) {
    try {
      options.body = fs.readFileSync(path.resolve(options.cwd, options.bodyFile), 'utf8');
    } catch (err) {
      throw new Error(`Cannot read body file: ${err.message}`);
    }
  }

  return options;
}

function defaultExec(cmd, args, opts = {}) {
  return execFileSync(cmd, args, {
    encoding: 'utf8',
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    ...opts
  });
}

async function openPrSafe(options, injected = {}) {
  const execFn = injected.exec || defaultExec;
  const ghBin = injected.ghBin || process.env.GH_BIN || 'gh';

  // 1. Validate inputs
  if (!options.repo || !REPO_REGEX.test(options.repo.trim())) {
    return {
      status: 'BLOCKED',
      reason: 'INVALID_ARGUMENT',
      message: 'Invalid or missing --repo. Expected format OWNER/REPO.'
    };
  }
  const repo = options.repo.trim();

  if (!options.head || typeof options.head !== 'string' || !options.head.trim()) {
    return {
      status: 'BLOCKED',
      reason: 'INVALID_ARGUMENT',
      message: 'Missing or empty --head branch.'
    };
  }
  const head = options.head.trim();

  if (!options.base || typeof options.base !== 'string' || !options.base.trim()) {
    return {
      status: 'BLOCKED',
      reason: 'INVALID_ARGUMENT',
      message: 'Missing or empty --base branch.'
    };
  }
  const base = options.base.trim();

  if (head === base) {
    return {
      status: 'BLOCKED',
      reason: 'INVALID_ARGUMENT',
      message: `Head branch "${head}" cannot be the same as base branch "${base}".`
    };
  }

  if (!options.title || typeof options.title !== 'string' || !options.title.trim()) {
    return {
      status: 'BLOCKED',
      reason: 'INVALID_ARGUMENT',
      message: 'Missing or empty --title.'
    };
  }
  const title = options.title.trim();
  const body = typeof options.body === 'string' ? options.body : '';

  // 2. Confirm gh accessible
  try {
    execFn(ghBin, ['--version']);
  } catch (err) {
    return {
      status: 'BLOCKED',
      reason: 'GH_CLI_NOT_FOUND',
      message: `GitHub CLI (${ghBin}) is not accessible or not installed in PATH.`
    };
  }

  // 3. Confirm gh auth status
  try {
    execFn(ghBin, ['auth', 'status']);
  } catch (err) {
    return {
      status: 'BLOCKED',
      reason: 'GH_AUTH_REQUIRED',
      message: 'GitHub CLI is not authenticated. Please run `gh auth login`.'
    };
  }

  // 4. Confirm repository reachable
  try {
    execFn(ghBin, ['repo', 'view', repo, '--json', 'nameWithOwner']);
  } catch (err) {
    return {
      status: 'BLOCKED',
      reason: 'REPO_ACCESS_DENIED',
      message: `Repository ${repo} is not accessible: ${sanitizeOutput(err.stderr || err.message)}`
    };
  }

  // 5. Confirm remote base branch exists
  try {
    execFn(ghBin, ['api', `repos/${repo}/branches/${encodeURIComponent(base)}`]);
  } catch (err) {
    return {
      status: 'BLOCKED',
      reason: 'BASE_BRANCH_NOT_FOUND',
      message: `Base branch "${base}" does not exist on remote ${repo}.`
    };
  }

  // 6. Confirm remote head branch exists & get commit SHA
  let remoteHeadSha = '';
  try {
    const headDataStr = execFn(ghBin, ['api', `repos/${repo}/branches/${encodeURIComponent(head)}`]);
    const headData = JSON.parse(headDataStr);
    remoteHeadSha = headData.commit?.sha || '';
  } catch (err) {
    return {
      status: 'BLOCKED',
      reason: 'HEAD_NOT_PUSHED',
      message: `Head branch "${head}" has not been pushed to remote ${repo}.`
    };
  }

  // 7. Verify published commit matches local HEAD if available
  let localHeadSha = options.expectedHeadSha || '';
  if (!localHeadSha) {
    try {
      localHeadSha = execFn('git', ['rev-parse', 'HEAD'], { cwd: options.cwd }).trim();
    } catch {
      // not in a git repo or git not in path; continue with remote sha
    }
  }

  if (localHeadSha && remoteHeadSha && !remoteHeadSha.startsWith(localHeadSha) && !localHeadSha.startsWith(remoteHeadSha)) {
    return {
      status: 'BLOCKED',
      reason: 'HEAD_SHA_MISMATCH',
      message: `Remote branch HEAD (${remoteHeadSha}) does not match expected local HEAD (${localHeadSha}). Push your changes before opening a PR.`
    };
  }

  // Helper to list PRs matching head and base
  const listMatchingPrs = () => {
    try {
      const out = execFn(ghBin, [
        'pr', 'list',
        '--repo', repo,
        '--head', head,
        '--base', base,
        '--state', 'all',
        '--json', 'number,url,state,isDraft,headRefName,baseRefName,headRefOid'
      ]);
      const prs = JSON.parse(out);
      if (!Array.isArray(prs)) return [];
      return prs.filter(p => {
        const matchesHead = p.headRefName === head || p.headRefName?.endsWith(`:${head}`);
        const matchesBase = p.baseRefName === base;
        return matchesHead && matchesBase;
      });
    } catch (err) {
      return null;
    }
  };

  // 8. List existing PRs before creating
  const existingPrs = listMatchingPrs();
  if (existingPrs && existingPrs.length > 0) {
    const openPr = existingPrs.find(p => p.state === 'OPEN');
    if (openPr) {
      return {
        status: 'EXISTING_OPEN',
        message: 'An open pull request already exists for this branch.',
        pr: {
          number: openPr.number,
          url: openPr.url,
          state: openPr.state,
          isDraft: Boolean(openPr.isDraft),
          headRefName: openPr.headRefName,
          baseRefName: openPr.baseRefName,
          headRefOid: openPr.headRefOid || remoteHeadSha
        }
      };
    }

    const closedOrMerged = existingPrs.find(p => p.state === 'CLOSED' || p.state === 'MERGED');
    if (closedOrMerged) {
      return {
        status: 'BLOCKED',
        reason: 'PR_ALREADY_CLOSED_OR_MERGED',
        message: `A pull request for ${head} -> ${base} already exists with state ${closedOrMerged.state} (#${closedOrMerged.number}: ${closedOrMerged.url}). Explicit decision required; will not reopen or duplicate.`,
        pr: {
          number: closedOrMerged.number,
          url: closedOrMerged.url,
          state: closedOrMerged.state,
          isDraft: Boolean(closedOrMerged.isDraft),
          headRefName: closedOrMerged.headRefName,
          baseRefName: closedOrMerged.baseRefName,
          headRefOid: closedOrMerged.headRefOid || remoteHeadSha
        }
      };
    }
  }

  // 9. Create PR
  let createError = null;
  try {
    execFn(ghBin, [
      'pr', 'create',
      '--repo', repo,
      '--head', head,
      '--base', base,
      '--title', title,
      '--body', body
    ]);
  } catch (err) {
    createError = err;
  }

  // 10. Reconcile on GitHub
  const reconciledPrs = listMatchingPrs();
  const createdPr = reconciledPrs?.find(p => p.state === 'OPEN');

  if (createdPr) {
    // Verify required properties
    const isValidUrl = typeof createdPr.url === 'string' && /^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+$/.test(createdPr.url);
    if (createdPr.number && isValidUrl && !createdPr.isDraft) {
      return {
        status: 'CREATED',
        message: 'Pull request successfully created and verified.',
        pr: {
          number: createdPr.number,
          url: createdPr.url,
          state: createdPr.state,
          isDraft: false,
          headRefName: createdPr.headRefName,
          baseRefName: createdPr.baseRefName,
          headRefOid: createdPr.headRefOid || remoteHeadSha
        }
      };
    }
  }

  // If reconcile did not find open PR
  if (createError) {
    const errorMsg = sanitizeOutput(createError.stderr || createError.message);
    const isPolicyDenied = /policy|forbidden|not authorized|permission denied|denied/i.test(errorMsg);
    return {
      status: isPolicyDenied ? 'BLOCKED' : 'UNKNOWN',
      reason: isPolicyDenied ? 'POLICY_OR_PERMISSION_DENIED' : 'PR_CREATION_FAILED',
      message: `Failed to create pull request: ${errorMsg}`
    };
  }

  return {
    status: 'UNKNOWN',
    reason: 'PR_STATE_UNVERIFIED',
    message: 'Pull request was submitted but could not be verified on remote.'
  };
}

async function main() {
  let parsed;
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (err) {
    process.stderr.write(JSON.stringify({ status: 'BLOCKED', reason: 'INVALID_ARGUMENT', message: err.message }) + '\n');
    process.exit(1);
  }

  if (parsed.help) {
    process.stdout.write(`Usage: node open-pr-safe.cjs --repo OWNER/REPO --head HEAD --base BASE --title "TITLE" [--body "BODY" | --body-file PATH] [--expected-head-sha SHA]\n`);
    process.exit(0);
  }

  const result = await openPrSafe(parsed);
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');

  if (result.status === 'CREATED' || result.status === 'EXISTING_OPEN') {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(err => {
    process.stderr.write(JSON.stringify({ status: 'UNKNOWN', message: sanitizeOutput(err.message) }) + '\n');
    process.exit(1);
  });
}

module.exports = {
  openPrSafe,
  parseArgs,
  sanitizeOutput
};
