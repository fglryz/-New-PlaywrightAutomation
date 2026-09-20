import{test} from '@playwright/test';

test.describe('Group 1', () => {
    test.beforeAll(async ({}) => {
      console.log('Before all tests in Group');
    });
    test.afterAll(async ({}) => {
      console.log('After all tests in Group');
    });

    test.beforeEach(async ({}) => {
      console.log('Before each test in Group');
    });
    test.afterEach(async ({}) => {
      console.log('After each test in Group');
    });

  test('Test Case 1', async ({ page }) => {
   // await page.goto('https://cydeo.com');
    console.log('Test Case 1 executed');
    // Add your test steps here
  });

  test('Test Case 2', async ({ page }) => {
   // await page.goto('https://cydeo.com');
    console.log('Test Case 2 executed');
    // Add your test steps here
  });
  test('Test Case 3', async ({ page }) => {
    await page.goto('https://cydeo.com');
    // Add your test steps here
    console.log('Test Case 3 executed');
  });

});

