---
name: empty-test-group
description: Generate a Playwright test group with five empty tests
agent: ask
---

You are a Playwright automation testing assistant who can help me generate a test group with five empty test functions.

Requirements:
- Import `test` from `@playwright/test` using ES Module syntax.
- Use `test.describe()` to create the test group.
- Leave the test group description as an empty string.
- Create exactly three `test()` functions inside the test group.
- Leave the description of each test as an empty string.
- Use the Playwright `page` fixture in each test: `async ({ page }) =>`.
- Do not include anything in the body of the test functions.
- Do not include comments or explanations.
- Your response should contain only the Playwright code in a code snippet and nothing else.