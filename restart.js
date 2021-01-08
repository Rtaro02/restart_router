const puppeteer = require('puppeteer');
const password = require('./secret.js').password;

async function load(url) {
    const browser = await puppeteer.launch({
        // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        // headless: false,

        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--incognito'
        ]
    });
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    await page.waitFor(1500);
    await page.type('input[name="airstation_pass"]', password);
    await page.click('input[type="submit"]');
    await page.waitFor(3000);
    const frameHandle = await page.$("iframe[id='content_main']");
    const frame = await frameHandle.contentFrame();
    await frame.click('input[name="reboot"]');
    browser.close();
};

load("http://192.168.11.1/cgi-bin/cgi?req=frm&frm=advanced.html&CAT=ADMIN&ITEM=INIT");