import cheerio from "cheerio";
import puppeteer from "puppeteer";
import { sendServerMessage } from "../discord";
import { sendMailToUser } from "../email";

const url =
  "https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452";

// puppeteer is a chrome browser libray, using chromium (similar to selenium)
// allows us to access browsers from command line

async function launchBrowser() {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(url);

  return page;
}

async function checkAvailability(page, user) {
  // a-size-medium a-color-price

  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  // console.log(html);
  console.log("running before");
  cheerio("#availability", html).each(function () {
    let availability = cheerio(this).text();
    console.log("running");
    console.log(availability.trim());

    let messageText;
    let subject;
    let email = user.email;

    sendServerMessage();

    if (availability.includes("unavailable")) {
      console.log("yeepp not in stock");
      subject = "Item Not In Stock";
      messageText = "Your Item is still not in stock";
      // sendMailToUser(email, subject, messageText);
      console.log(`not in stock at ${Date.now().toLocaleString()}`);
    } else {
      console.log("in stock");
      subject = "We've Found Your Item!";
      messageText = `Your Item is in stock, find it here! ${url} `;
      sendMailToUser(email, subject, messageText);
    }
  });
}

async function monitorWebscrape(user) {
  let page = await launchBrowser();

  await checkAvailability(page, user);
}

export { monitorWebscrape };
