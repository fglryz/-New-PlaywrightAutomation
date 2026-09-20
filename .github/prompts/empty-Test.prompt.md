---
name: empty-Test
description: Generate an empty Playwright test
agent: ask
---

Generate an empty Playwright test using TypeScript.

Requirements:

- Import `test` from `@playwright/test` using ES Module syntax.
- Use the `test()` function.
- Leave the test description as an empty string.
  Use the Playwright `page` fixture as a parameter in the async test function: `async ({ page }) =>`.
- Use an async test function.
- Leave the test body completely empty.
- Return only the code snippet with no explanation.
