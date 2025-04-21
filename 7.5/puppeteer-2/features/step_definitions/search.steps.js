const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { getText, clickElement, button} = require("../../lib/commands.js");

setDefaultTimeout (10000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;

  await this.page.goto("https://qamid.tmweb.ru/client/index.php", {
    setTimeout: 10000,
  });
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user selects a movie for tomorrow", async function () {
  return await clickElement(this.page, "a:nth-child(2)", {
    setTimeout: 3000,
  });
});

When("user booking ticket for tomorrow {string} at 17:00", async function (string) {
  await getText(this.page, "body main section:nth-child(2) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='225']");
  await clickElement(this.page, "div:nth-child(5) span:nth-child(5)");
  await clickElement(this.page, ".acceptin-button");
  await clickElement(this.page, ".acceptin-button");
  return  await getText(this.page, "body main p:nth-child(5)");
});

Then("user has booked seat and sees his {string}", async function (string) {
  await clickElement(this.page, ".acceptin-button");
  const actual = await getText(this.page, ".ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Given("user selects a session after a week VV", async function () {
  await clickElement(this.page, "a:nth-child(7)");
  return await getText(this.page, "body main section:nth-child(3) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
});

When("user booking tickets {string} at 11:00", async function (string) {
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='198']");
  await clickElement(this.page, "div:nth-child(4) span:nth-child(4)");
  await clickElement(this.page, "div:nth-child(4) span:nth-child(5)");
  await clickElement(this.page, ".acceptin-button");
  return await clickElement(this.page, ".acceptin-button");
});

Then("user has booked two tickets and sees a session on {string}", async function (string) {
  const actual = await getText(this.page, ".ticket__details.ticket__title");
  const expected = await string;
  expect(actual).contains(expected);
});

Given("user selects a session after a week", async function () {
  return await clickElement(this.page, "a:nth-child(7)");
});

When("user cannot book tickets {string} at 11:00", async function (string) {
  await getText(this.page, "body main section:nth-child(3) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
  await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='198']");
  return await getText(this.page, ".buying__info-start");
});

Then("user cannot receive the tickets because they are booked", async function () {
  await this.page.click("div:nth-child(4) span:nth-child(4)");
  await this.page.click("div:nth-child(4) span:nth-child(5)");
  const actual = await button(this.page, "button[class='acceptin-button'][disabled='true']");
  const expected = true;
  expect(actual).to.equal(expected);
});