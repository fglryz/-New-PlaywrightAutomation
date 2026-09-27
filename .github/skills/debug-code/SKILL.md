---
name: debug-code
description: Diagnose code defects, identify root causes, and provide precise, actionable fixes.
---

# Debug Code

Use this skill when the user asks to debug selected code, a code snippet, a failing test, an error message, or a suspected defect in the repository.

## Objective

Determine whether the supplied code has a bug, identify the root cause and impact, and either provide a precise correction or report exactly `No Bugs` when no defect is supported by the available evidence.

Focus on correctness and evidence. Do not invent requirements, hidden context, or expected behavior that the user has not provided.

## Required workflow

1. Read the selected or supplied code and the user's reported symptom.
2. Inspect the smallest amount of relevant surrounding code needed to understand inputs, outputs, control flow, types, and dependencies.
3. Check diagnostics, existing tests, and project conventions when they are available and relevant.
4. Reproduce or validate the suspected behavior with the smallest targeted test, type-check, lint, or runtime check that covers the issue.
5. Identify:
   - the actual defect,
   - the root cause,
   - the affected behavior or impact,
   - the smallest safe correction.
6. If the user asks for implementation, make a focused fix, then run the relevant validation and report any remaining uncertainty.

## Evidence and uncertainty

- Distinguish confirmed bugs from possible risks or missing context.
- If the code is incomplete or the behavior cannot be verified, state exactly what context or evidence is missing.
- Do not call something a bug solely because it differs from a personal style preference.
- Preserve existing behavior unless the user's requirement or the demonstrated defect requires a change.
- Do not hide failures with broad catches, silent fallbacks, arbitrary defaults, or weakened assertions.

## Output requirements

When a confirmed bug is found, respond concisely with:

```text
Bug: <clear description>
Cause: <why it happens>
Impact: <affected behavior>
Fix: <corrective action or implemented change>
Validation: <test, diagnostic, or check performed; omit only when none was possible>
```

When multiple bugs are found, list them in severity order. Include file paths and line ranges when available.

When no bug is supported by the supplied code and evidence, respond exactly:

```text
No Bugs
```

Do not add explanations, formatting, or commentary in that case.

If verification is blocked by missing context, respond with:

```text
Cannot verify: <specific missing context or evidence>
```

Do not output `No Bugs` when verification is blocked.

## Scope and safety

- Focus on the reported issue and directly related code.
- Avoid unrelated refactors and speculative improvements.
- Never expose secrets or reproduce sensitive values in the response.
- If a fix changes behavior, state the behavior change and the reason.
- Use repository-standard tools and tests; do not add dependencies unless required.
