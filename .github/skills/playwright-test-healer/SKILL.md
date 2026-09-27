---
name: playwright-test-healer
description: Diagnose, reproduce, and fix a failing Playwright spec from a user-provided file path by examining test output, reports and traces, and exploring the application with Playwright CLI when useful.
---

# Playwright Test Healer

Use this skill when the user provides a path to a failing Playwright spec and asks to debug, fix, or heal it.

The goal is to identify the cause from evidence, make the smallest correct change, and verify the exact spec.

Do not stop at generic debugging advice when the repository and environment permit a fix.

## Input and Scope

Treat the path supplied by the user as the target spec.

- Resolve relative paths from the repository root.
- Verify that the file exists.
- Confirm that the file is a Playwright test before running it.
- If no path is supplied, request one.
- If the path is ambiguous or does not exist, report that and request a corrected path rather than guessing.
- Keep investigation within the repository and the failing test's relevant application/test code.
- Preserve unrelated staged, unstaged, and untracked work.

Before editing, read:

- The target spec.
- Its fixtures and helpers.
- The applicable Playwright configuration.
- Relevant package scripts.
- Directly relevant application code.

Follow the repository's existing instructions, structure, and testing conventions.

Keep fixes within automation code, including:

- Specs
- Test fixtures
- Page objects
- Test helpers
- Playwright test configuration

Do not edit product application code, backend/service code, or external test data merely to make a test pass.

If evidence indicates that the failure is caused by a defect outside automation code, explain the evidence and ask the user before broadening the scope.

Do not make changes outside the repository.

Never expose credentials, cookies, tokens, authorization headers, environment secrets, or other sensitive data in output.

## Workflow

### 1. Establish the Baseline

Inspect the worktree before running commands.

Note existing modifications and whether report/result directories already contain user data. Do not clean, delete, revert, or overwrite unrelated work or existing artifacts.

Identify the repository's:

- Package manager.
- Installed Playwright dependency and version.
- Playwright configuration.
- Test scripts.
- Environment-loading approach.
- Browser/project configuration.
- Retry settings.
- Reporter settings.
- Test output directories.

Reuse the repository's existing conventions whenever possible.

Before running the target spec, inspect its setup and relevant helpers for externally visible or destructive side effects, such as:

- Modifying shared accounts.
- Creating or deleting records.
- Sending emails or messages.
- Making payments or purchases.
- Invoking non-test services.
- Changing persistent shared data.

Confirm that the configured target is an intended test environment.

If the target environment or potential impact is unclear, do not run the test until the user clarifies or approves it.

Run only the requested spec first.

Prefer the repository's existing package-manager test script when it correctly accepts and forwards a file path.

Otherwise, use the repository-local Playwright executable:

```bash
./node_modules/.bin/playwright test <spec-path>
```

Confirm that Playwright is installed locally before invoking it.

Do not use `npx` in a way that may automatically download a missing Playwright package.

If Playwright or a required browser/dependency is missing, stop and ask the user before installing anything.

Record:

- The exact error or failed assertion.
- Source file and line number.
- Failing Playwright action or step.
- Retry status.
- Browser/project involved.
- Relevant report, screenshot, video, and trace paths.

Determine whether the failure appears:

- Deterministic.
- Flaky.
- Timing-dependent.
- Browser-specific.
- Environment-dependent.

A retry passing once does not establish that the issue is fixed.

### 2. Diagnose From Evidence

Use the most informative available evidence in this order:

1. Test output and Playwright's error context or snapshot.
2. Corresponding trace, screenshot, and video.
3. Existing or newly generated HTML report.
4. Spec, fixtures, configuration, page objects, helpers, relevant application implementation, and browser-visible behavior.

Use Playwright CLI commands supported by the repository's installed Playwright version.

#### Inspect a Trace

```bash
<local-playwright> show-trace <path-to-trace.zip>
```

Use the trace to investigate:

- Action order.
- Locator resolution.
- Navigation.
- DOM snapshots.
- Network-related timing when relevant.
- Assertion failures.
- Browser-visible state around the failure.

#### Inspect the HTML Report

```bash
<local-playwright> show-report [report-directory]
```

Use it to inspect:

- Test attempts.
- Errors.
- Retry behavior.
- Screenshots.
- Videos.
- Traces.
- Other attachments.

#### Explore the Application

When UI behavior is unclear, use:

```bash
<local-playwright> codegen <url>
```

Prefer the application's configured URL and existing authentication approach.

Never place credentials, tokens, or other secrets directly in command arguments or generated files.

#### Narrow a Project-Specific Failure

When necessary:

```bash
<local-playwright> test <spec-path> --project=<project-name>
```

Use other supported Playwright CLI filters when appropriate.

`<local-playwright>` means either:

- The repository-local Playwright executable, or
- An existing package-manager script that invokes the locally installed Playwright version.

Do not assume that a GUI launched by `show-trace`, `show-report`, or `codegen` can be interactively inspected through the terminal.

If GUI inspection is unavailable, use the trace archive and existing test artifacts directly.

Create a narrowly scoped temporary diagnostic test or script only when necessary.

Remove only temporary files created specifically for the diagnosis. Never remove pre-existing user artifacts.

### Trace Archive Inspection

If a trace cannot be opened with Trace Viewer, inspect the ZIP archive locally.

Use tools such as Python's standard-library:

- `zipfile`
- `json`

Inspect only the information needed to diagnose the failure, such as:

- Relevant `trace.trace` event records.
- Failing action.
- Locator information.
- Nearby log entries.
- Relevant snapshot references.

Do not dump the entire trace archive.

Do not expose:

- Request or response authorization headers.
- Cookies.
- Storage state.
- Credentials.
- Tokens.
- Unrelated private page data.

If the available trace does not contain enough evidence, state that limitation instead of guessing.

### Root Cause Classification

Classify the root cause before editing.

Possible categories include:

- Incorrect Playwright API usage.
- Incorrect test setup or fixture lifecycle.
- Locator ambiguity.
- Brittle locator.
- Locator mismatch with the accessible UI.
- Missing synchronization.
- Incorrect navigation expectation.
- Incorrect popup expectation.
- Incorrect download expectation.
- Stale assertion.
- Incorrect test data.
- Authentication issue.
- Browser-specific issue.
- Environment issue.
- Network/service issue.
- Test isolation problem.
- Genuine application defect.

Clearly distinguish between a faulty automated test and a real application defect.

A product, backend/service, or external test-data defect is outside this skill's automation-only editing scope.

If evidence points to such a defect, explain the evidence and ask for approval before broadening the scope.

Never modify those systems merely to make the automated test pass.

### 3. Make a Focused Fix

Fix the underlying cause with the smallest maintainable change consistent with repository conventions.

For UI tests, prefer user-facing Playwright locators when they reliably express the behavior:

```typescript
page.getByRole()
page.getByLabel()
page.getByText()
page.getByPlaceholder()
page.getByTestId()
```

Prefer Playwright web-first assertions:

```typescript
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Expected text');
await expect(page).toHaveURL(/expected-url/);
```

Register event waits before the action that triggers them.

For example:

```typescript
const popupPromise = page.waitForEvent('popup');

await link.click();

const popup = await popupPromise;

await expect(
  popup.getByRole('heading', { name: 'Expected heading' })
).toBeVisible();
```

Remember that a popup event resolves to a Playwright `Page`.

Correct:

```typescript
popup.getByRole('button', { name: 'Continue' });
```

Incorrect:

```typescript
popup.page.getByRole('button', { name: 'Continue' });
```

Wait for observable application state instead of using fixed sleeps.

Avoid:

```typescript
await page.waitForTimeout(5000);
```

Prefer waiting for the actual expected state:

```typescript
await expect(
  page.getByRole('heading', { name: 'Payment Plan' })
).toBeVisible();
```

Avoid using the following merely to hide an underlying problem:

- Arbitrary timeouts.
- Forced clicks.
- Broad CSS/XPath selectors.
- `.first()`.
- `.nth()`.
- Retry loops.
- Excessive explicit waits.

Use them only when the application's actual behavior requires them and the reason is documented.

Keep assertions meaningful.

Do not:

- Delete the failing assertion.
- Skip the failing test.
- Weaken a valid assertion.
- Silently bypass the failure.
- Disable strictness.
- Turn off relevant checks.
- Change an expected result solely to obtain a green test.

Do not reformat, restructure, or refactor unrelated code.

Preserve all changes that existed before this task.

### 4. Verify the Exact Behavior

After applying the fix, rerun the exact target spec using the same relevant project and environment.

For example:

```bash
./node_modules/.bin/playwright test <spec-path>
```

If the failure may be flaky or timing-sensitive, run the relevant test multiple times or use the repository's normal retry configuration.

Do not treat a test that only succeeds on retry as repaired.

Run directly relevant adjacent tests when the change affects shared:

- Fixtures.
- Page objects.
- Helpers.
- Test configuration.
- Shared automation utilities.

Avoid running the entire suite unless necessary.

If a changed shared module has direct consumers in other specs, identify those consumers and run the relevant tests when feasible.

If they cannot be run, state:

- Why they could not be run.
- Which behavior remains unverified.

Inspect the final diff.

Confirm that only intended files were changed.

Distinguish environment failures from test-code failures, including failures caused by:

- Missing credentials.
- Missing browsers.
- Unavailable services.
- Network problems.
- Incorrect environment configuration.
- Authentication failures.

## Reporting

Provide a concise handoff after diagnosis and repair.

Include:

### Root Cause

Explain the root cause established from the test run, report, trace, screenshots, source code, or other available evidence.

### Changes Made

List the file or files changed and briefly explain what was corrected.

### Verification

Provide the exact verification command used.

For example:

```bash
./node_modules/.bin/playwright test tests/checkout.spec.ts
```

Report the actual result.

### Remaining Limitations

Mention any remaining:

- Uncertainty.
- Environment limitation.
- Missing artifact.
- Unavailable service.
- Unverified related test.

Do not claim to have inspected a report, trace, screenshot, video, or browser session unless it was actually inspected.

If no trace or report was available, state which evidence was available and base the diagnosis only on that evidence.