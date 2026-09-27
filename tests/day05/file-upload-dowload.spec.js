import path from "path";
import { test, expect } from "@playwright/test";
import fs from "fs";

test("download files", async ({ page }) => {
  //create event listener for download

  let promisedDowloadEvent = page.waitForEvent("download");

  await page.goto("https://the-internet-5chk.onrender.com/download");
  await page.click("text='Utility bill.pdf'"); //triggers the download event

  let download = await promisedDowloadEvent;
  let downloadPath = path.join(__dirname,"./downloads", download.suggestedFilename(),);
  await download.saveAs(downloadPath);

  expect(fs.existsSync(downloadPath)).toBeTruthy();
});

test("uploads files", async ({ page }) => {
  await page.goto("https://the-internet-5chk.onrender.com/upload");

  let filePath = path.join(__dirname, "./uploads", "TestUpload.txt");

  await page.setInputFiles(
    "//input[@id='file-upload']",
    filePath,
  );

 await page.getByRole("button", { name: "Upload" }).click();
  await expect(page.getByText("File Uploaded!")).toBeVisible();
});
