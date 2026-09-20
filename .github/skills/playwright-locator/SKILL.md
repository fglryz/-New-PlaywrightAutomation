---
name: playwright-locator
description: Analyze HTML and choose the most reliable Playwright locator strategy using accessibility-first best practices.
---

# Playwright Locator Strategy

Use this skill when the user provides an HTML element or DOM fragment and asks for a Playwright locator. The input may contain one element, its associated label, or a small amount of surrounding markup.

## Objective

Return the shortest **unique, readable, and resilient** locator that reflects how a real user would identify the element. Prefer accessibility semantics and explicit application contracts over implementation details such as CSS classes, DOM depth, or generated IDs.

Do not guess from an incomplete snippet. If the supplied HTML does not contain enough information to establish a stable locator, say what context is missing and provide the safest qualified fallback only when one is demonstrably unique.

## Delegation workflow

1. Parse the HTML and identify the target element, its semantic role, accessible name, associated label, visible text, placeholder, test ID, and stable attributes.
2. Check whether the candidate is likely unique. Treat generated values, volatile text, styling classes, positional selectors, and framework-generated IDs as unstable.
3. Select exactly one strategy using the decision policy below.
4. If prompt-agent delegation is supported in the current environment, delegate generation to the matching prompt agent. Pass the original HTML plus the relevant surrounding context; do not reduce the input to only the target tag. Otherwise, apply the matching prompt contract directly in this skill. A skill must never claim that a prompt was delegated when the environment cannot actually invoke prompt files.
5. Validate the delegated result against the HTML:
   - It must target the intended element.
   - It must use valid Playwright syntax.
   - It must use single-quoted string literals.
   - It must not rely on an unstable attribute or accidental ancestor text.
   - It must be unique, or explicitly scope it with a stable parent locator when the snippet supports that.
6. If the delegated result is unsuitable, correct it using the same strategy. Do not silently switch strategies without stating the reason.

## Strategy decision policy

First classify the target as a form control, named interactive control, semantic text element, or generic element. Then choose the first applicable option below. This prevents a generic role such as `textbox` from displacing a clear explicit form label:

| Priority | Use when | Delegate to |
| --- | --- | --- |
| 1 | The target is a form control with a real associated `<label>`, or a usable `aria-label`/`aria-labelledby`, and that label is the clearest stable user-facing identifier. | `.github/prompts/getByLabel-locator.prompt.md` |
| 2 | The element has a meaningful implicit or explicit ARIA role and a stable accessible name. This is preferred for buttons, links, headings, checkboxes, radios, tabs, menus, dialogs, and named interactive controls without a clearer form label. | `.github/prompts/getByRole-locator.prompt.md` |
| 3 | The element has meaningful, stable, user-visible text and is not better identified by role or label. Use the smallest text value that remains unique. | `.github/prompts/getByText-locator.prompt.md` |
| 4 | The element is a form control with a meaningful, stable placeholder and no better label or role/name locator. A placeholder is a hint, not a substitute for an accessible label. | `.github/prompts/getByPlaceHolder-locator.prompt.md` |
| 5 | The element exposes an intentional, stable `data-testid` (or the project's configured test ID attribute) and semantic/user-facing locators are unavailable or ambiguous. | `.github/prompts/getByTestID-locator.prompt.md` |
| 6 | No semantic, text, placeholder, or test ID locator is reliable, but a stable unique `id`, `name`, `data-*`, or other attribute exists. Use the smallest CSS selector possible. | `.github/prompts/css-locator.prompt.md` |

### Important precedence rules

- Prefer `getByRole()` for a named button or link even when its visible text could also produce `getByText()`.
- Prefer `getByLabel()` for a form control with an explicit label; use `getByRole()` for buttons, links, headings, and other named non-form controls.
- Treat `aria-label` and `aria-labelledby` as accessible names. Use `getByLabel()` for form controls and `getByRole()` for other named elements.
- Do not use `getByText()` for icon-only controls, dynamic data, timestamps, generated IDs, or long prose.
- Do not use `getByTestId()` merely because it is easy; use it when the test ID is an intentional stable contract.
- Never choose CSS because a class happens to be short. CSS is the fallback for elements that cannot be identified reliably through user-facing semantics.
- Avoid `nth()`, `first()`, `last()`, positional CSS, broad substring matches, and selectors based on `class`, `style`, or DOM structure unless the HTML proves no safer choice exists.
- Do not invent an accessible name, role, test ID, or surrounding container that is not present in the input.
- HTML alone cannot prove uniqueness across an entire page unless the caller supplies the relevant page or container context. Report `Confidence: medium` when uniqueness is inferred only from the fragment, and `Confidence: low` when a stable uniqueness signal is absent.

## Prompt-agent contracts

The mapped prompt is a specialist generator, not the decision-maker. Its output must be treated as a candidate and validated against this skill's policy. Use these exact mappings:

- Role: `.github/prompts/getByRole-locator.prompt.md`
- Label: `.github/prompts/getByLabel-locator.prompt.md`
- Placeholder: `.github/prompts/getByPlaceHolder-locator.prompt.md`
- Test ID: `.github/prompts/getByTestID-locator.prompt.md`
- Text: `.github/prompts/getByText-locator.prompt.md`
- CSS fallback: `.github/prompts/css-locator.prompt.md`

If a mapped prompt is missing, use the same contract locally. Do not delegate to an unrelated locator prompt.

## Output format

Unless the user explicitly requests locator-only output, respond with:

```text
Strategy: <getByRole | getByLabel | getByText | getByPlaceholder | getByTestId | CSS>
Locator: <one Playwright locator expression in a code span>
Why: <one concise sentence explaining the stability and uniqueness signal>
Confidence: <high | medium | low>
```

For locator-only requests, output only the locator in a single code block. If no mapped strategy is suitable, state `No reliable locator can be generated from the supplied HTML` and identify the missing signal.

## Quality examples

For `<button type="submit">Save</button>`, choose:

```js
page.getByRole('button', { name: 'Save' })
```

For `<label for="email">Email address</label><input id="email" type="email">`, choose:

```js
page.getByLabel('Email address')
```

For `<input data-testid="account-search" placeholder="Search accounts">` with no label, choose the test ID only when it is the project's intentional stable test contract:

```js
page.getByTestId('account-search')
```

For `<div id="status-panel" data-state="ready"></div>` with no accessible name or text, use:

```js
page.locator('#status-panel')
```
