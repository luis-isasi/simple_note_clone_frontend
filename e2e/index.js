const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.goto('http://localhost:9000');
  await page.screenshot({ path: `example.png` });
  await page.click('.sc-gKsewC.gnHhhX');
  await browser.close();
})();
