import { firefox, test } from '@playwright/test';

test('Context fixture', async ({ context }) => {
     const tab1 = await context.newPage();
     const tab2 = await context.newPage();
     const tab3 = await context.newPage();
     const tab4 = await context.newPage();
     
//await tab1.bringToFront();
     await tab1.goto('https://www.google.com');
     //await tab2.bringToFront();
     await tab2.goto('https://www.youtube.com');
     //await tab3.bringToFront();
     await tab3.goto('https://www.github.com');
     //await tab4.bringToFront();
     await tab4.goto('https://www.stackoverflow.com');


});

test('Browswer fixture', async ({ browser }) => {
   const context1 = await browser.newContext();
   const context2 = await browser.newContext();

   const page1= await context1.newPage();
   const page2= await context1.newPage();
   await page1.goto('https://www.google.com');
   await page2.goto('https://www.youtube.com');

   const page3= await context2.newPage();
    await page3.goto('https://www.github.com');
    const page4= await context2.newPage();
    await page4.goto('https://www.stackoverflow.com');

   
   
  

});



test('Custom fixture @custom', async () => {
    const browser = await firefox.launch();
    const context= await browser.newContext();
    const page1= await context.newPage();
    const page2= await context.newPage();
    await page1.goto('https://www.google.com');
    await page2.goto('https://www.youtube.com');
    


});