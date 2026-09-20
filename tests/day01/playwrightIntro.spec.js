
import { test, expect } from '@playwright/test';

test('test',async({page})=>{

});

test('test1',async({page})=>{
  await page.goto('https://google.com/');
  await expect(page).toHaveTitle(/Google/);
  //await page.getByRole('link',{name:'Get started'}).click();
  //await expect(page.getByRole('heading',{name:'Installation'})).toBeVisible();
});
