import { expect, test } from "@playwright/test";

test("Web Table", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/web-tables");

  let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");

  let rows = await table.locator("//tr").all();

  let columns = await table.locator("//th").all();

  let cells = await table.locator("//td").all();

  expect(columns.length).toBe(13);
  expect(rows.length).toBe(9);
  expect(cells.length).toBe(104);

  for(let cell of cells){

console.log(await cell.textContent());

  }
});

test("Web Table 2", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/web-tables");

  let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");
  let rows = await table.locator("//tr").all();

//   for (let row of rows) {
//     let cells = await row.locator("td").all();

//     for (let cell of cells.slice(1, -1)) {
//       let cellData = await cell.textContent();

//       console.log(cellData?.trim());
//     }

  //  console.log(
    //  "---------------------------------------------------------------",
   // );
 // }

 //create a loop that can prit each cell's data of each row

  for (let row of rows) {
     let cells = await row.locator("td").all();
     if(cells.length>2){
        for (let i = 0; i < cells.length-1; i++) {
            console.log(await cells[i].textContent());

        }
    }
     }

});
test("Web Table 3", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/web-tables");

  let table = page.locator("//table[@id='ctl00_MainContent_orderGrid']");
  let  checkboxes = await table.locator("//input[@type='checkbox']").all();
  for(let checkbox of checkboxes){
    await checkbox.check();
    expect(checkbox.isChecked);

  }

  });
