const { clickElement, putText, getText } = require("./lib/commands.js");

let page;

describe("Booking tickets", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  test("Booking ticket for tomorrow 'The witcher'", async () => {
    const expected = "Электронный билет";

    await clickElement(page, "a:nth-child(2)");
    await getText(page, "body main section:nth-child(2) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='225']");
    await clickElement(page, "div:nth-child(7) span:nth-child(5)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain(expected);
    }); 
  
  test("Booking free places for 'Mickey Mouse' at 11:00", async () => {
    const expected = "Микки маус";

    await clickElement(page, "a:nth-child(7)");
    await getText(page, "body main section:nth-child(3) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='198']");
    await clickElement(page, "div:nth-child(3) span:nth-child(3)");
    await clickElement(page, "div:nth-child(3) span:nth-child(2)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__details.ticket__title");
    expect(actual).toContain(expected);
    });

  test("Booking occupied seats", async () => {
    const expected = "Микки маус";

    await clickElement(page, "a:nth-child(7)");
    await getText(page, "body main section:nth-child(3) div:nth-child(1) div:nth-child(2) h2:nth-child(1)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='198']");
    await clickElement(page, "div:nth-child(3) span:nth-child(3)");
    await clickElement(page, "div:nth-child(3) span:nth-child(2)");
    await clickElement(page, ".acceptin-button");
    await clickElement(page, ".acceptin-button");
    const actual = await getText(page, ".ticket__details.ticket__title");
    expect(actual).toContain(expected);
  });
})



